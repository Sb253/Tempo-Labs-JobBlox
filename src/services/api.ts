// API Service Layer for Multi-Tenant CRM
import {
  User,
  Customer,
  Job,
  Estimate,
  Invoice,
  Payment,
  Employee,
  InventoryItem,
  TimeEntry,
  Document,
  ApiResponse,
  CreateUserRequest,
  UpdateUserRequest,
  CreateCustomerRequest,
  CreateJobRequest,
  CreateEstimateRequest,
  CreateInvoiceRequest,
  PaginationInfo,
  ValidationResult,
} from "../types/backend";
import {
  validateTenantIsolation,
  globalValidator,
  sanitizeData,
} from "../utils/validation";
import { tracingService, withTracing, TracedLogger } from "../utils/tracing";

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";
const API_VERSION = "v1";

// Request correlation and logging utilities
interface RequestContext {
  requestId: string;
  traceId: string;
  sessionId: string;
  tenantId: string;
  userId: string;
  timestamp: Date;
  endpoint: string;
  method: string;
}

interface ApiError extends Error {
  status?: number;
  code?: string;
  context?: RequestContext;
}

class ApiService {
  private baseUrl: string;
  private token: string | null = null;
  private tenantId: string | null = null;
  private sessionId: string | null = null;
  private userId: string | null = null;
  private requestQueue: Map<string, AbortController> = new Map();
  private rateLimitTracker: Map<string, { count: number; resetTime: number }> =
    new Map();

  constructor() {
    this.baseUrl = `${API_BASE_URL}/${API_VERSION}`;
    this.initializeFromStorage();
  }

  private initializeFromStorage() {
    this.token = localStorage.getItem("auth_token");
    this.tenantId = localStorage.getItem("tenant_id");
    this.sessionId = localStorage.getItem("session_id");
    this.userId = localStorage.getItem("user_id");
  }

  // Generate unique request ID for tracing
  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Create request context for logging
  private createRequestContext(
    endpoint: string,
    method: string,
  ): RequestContext {
    return {
      requestId: this.generateRequestId(),
      traceId: this.getTraceId(),
      sessionId: this.sessionId || "anonymous",
      tenantId: this.tenantId || "unknown",
      userId: this.userId || "anonymous",
      timestamp: new Date(),
      endpoint,
      method,
    };
  }

  // Get current trace ID from session or generate new one
  private getTraceId(): string {
    try {
      const sessionData = localStorage.getItem("jobblox_session");
      if (sessionData) {
        const session = JSON.parse(sessionData);
        return (
          session.traceId ||
          `trace_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        );
      }
    } catch (error) {
      console.warn("Failed to get trace ID from session", error);
    }
    return `trace_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Enhanced logging with structured data
  private logRequest(context: RequestContext, additionalData?: any) {
    console.info("API Request", {
      ...context,
      ...additionalData,
      timestamp: context.timestamp.toISOString(),
    });
  }

  private logResponse(
    context: RequestContext,
    response: any,
    duration: number,
  ) {
    console.info("API Response", {
      ...context,
      duration: `${duration}ms`,
      status: response?.status || "unknown",
      timestamp: new Date().toISOString(),
    });
  }

  private logError(context: RequestContext, error: any, duration: number) {
    console.error("API Error", {
      ...context,
      error: {
        message: error.message,
        status: error.status,
        code: error.code,
        stack: error.stack,
      },
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    });
  }

  // Rate limiting check
  private checkRateLimit(endpoint: string): boolean {
    const now = Date.now();
    const key = `${this.tenantId}:${endpoint}`;
    const limit = this.rateLimitTracker.get(key);

    if (!limit) {
      this.rateLimitTracker.set(key, { count: 1, resetTime: now + 60000 }); // 1 minute window
      return true;
    }

    if (now > limit.resetTime) {
      this.rateLimitTracker.set(key, { count: 1, resetTime: now + 60000 });
      return true;
    }

    if (limit.count >= 100) {
      // 100 requests per minute per tenant per endpoint
      console.warn("Rate limit exceeded", {
        endpoint,
        tenantId: this.tenantId,
        count: limit.count,
      });
      return false;
    }

    limit.count++;
    return true;
  }

  // Authentication methods with enhanced security
  setAuthToken(token: string) {
    this.token = token;
    localStorage.setItem("auth_token", token);
  }

  setTenantId(tenantId: string) {
    if (this.tenantId && this.tenantId !== tenantId) {
      console.warn("Tenant ID changed, clearing cached data", {
        oldTenantId: this.tenantId,
        newTenantId: tenantId,
      });
      // Clear any tenant-specific cached data
      this.clearTenantCache();
    }
    this.tenantId = tenantId;
    localStorage.setItem("tenant_id", tenantId);
  }

  setSessionId(sessionId: string) {
    this.sessionId = sessionId;
    localStorage.setItem("session_id", sessionId);
  }

  setUserId(userId: string) {
    this.userId = userId;
    localStorage.setItem("user_id", userId);
  }

  clearAuth() {
    console.info("Clearing authentication data", {
      tenantId: this.tenantId,
      userId: this.userId,
      sessionId: this.sessionId,
    });

    this.token = null;
    this.tenantId = null;
    this.sessionId = null;
    this.userId = null;

    localStorage.removeItem("auth_token");
    localStorage.removeItem("tenant_id");
    localStorage.removeItem("session_id");
    localStorage.removeItem("user_id");

    // Cancel any pending requests
    this.cancelAllRequests();

    // Clear tenant cache
    this.clearTenantCache();
  }

  private clearTenantCache() {
    // Clear any tenant-specific cached data
    this.rateLimitTracker.clear();
    // Additional cache clearing logic would go here
  }

  private cancelAllRequests() {
    this.requestQueue.forEach((controller, requestId) => {
      controller.abort();
      console.info("Cancelled request", { requestId });
    });
    this.requestQueue.clear();
  }

  // Enhanced HTTP request helper with comprehensive error handling and logging
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    const context = this.createRequestContext(
      endpoint,
      options.method || "GET",
    );
    const startTime = Date.now();

    // Start tracing span
    const span = tracingService.startSpan(
      `HTTP ${options.method || "GET"} ${endpoint}`,
      context.traceId,
      undefined,
      {
        "http.method": options.method || "GET",
        "http.url": endpoint,
        "tenant.id": this.tenantId,
        "user.id": this.userId,
        "session.id": this.sessionId,
      },
    );

    // Check rate limiting
    if (!this.checkRateLimit(endpoint)) {
      const error = new Error("Rate limit exceeded") as ApiError;
      error.status = 429;
      error.code = "RATE_LIMIT_EXCEEDED";
      error.context = context;
      tracingService.finishSpan(span.spanId, "error", error);
      throw error;
    }

    const url = `${this.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "X-Request-ID": context.requestId,
      "X-Trace-ID": context.traceId,
      "X-Timestamp": context.timestamp.toISOString(),
      ...options.headers,
    };

    // Add authentication headers
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    // Critical: Always include tenant isolation headers
    if (this.tenantId) {
      headers["X-Tenant-ID"] = this.tenantId;
    } else {
      console.warn("No tenant ID set for request", {
        endpoint,
        requestId: context.requestId,
      });
    }

    if (this.sessionId) {
      headers["X-Session-ID"] = this.sessionId;
    }

    if (this.userId) {
      headers["X-User-ID"] = this.userId;
    }

    // Create abort controller for request cancellation
    const abortController = new AbortController();
    this.requestQueue.set(context.requestId, abortController);

    // Log request initiation
    this.logRequest(context, {
      url,
      method: options.method || "GET",
      hasAuth: !!this.token,
      hasTenant: !!this.tenantId,
    });

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: abortController.signal,
        // Add timeout
        ...(options.signal ? {} : { signal: AbortSignal.timeout(30000) }), // 30 second timeout
      });

      const duration = Date.now() - startTime;

      // Remove from request queue
      this.requestQueue.delete(context.requestId);

      let data;
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      // Log response
      this.logResponse(
        context,
        { status: response.status, ok: response.ok },
        duration,
      );

      if (!response.ok) {
        const error = new Error(
          data?.error || data || `HTTP error! status: ${response.status}`,
        ) as ApiError;
        error.status = response.status;
        error.code = data?.code || "HTTP_ERROR";
        error.context = context;

        // Handle specific error cases
        if (response.status === 401) {
          console.warn("Authentication failed, clearing auth data", context);
          this.clearAuth();
        } else if (response.status === 403) {
          console.warn("Authorization failed", context);
        } else if (response.status === 404) {
          console.warn("Resource not found", context);
        }

        this.logError(context, error, duration);
        tracingService.finishSpan(span.spanId, "error", error);
        throw error;
      }

      // Validate response structure for tenant isolation
      if (data && typeof data === "object" && "data" in data) {
        const responseData = data as ApiResponse<T>;

        // Ensure response doesn't contain data from other tenants
        if (
          this.tenantId &&
          responseData.data &&
          typeof responseData.data === "object"
        ) {
          const validationResult = this.validateTenantIsolation(
            responseData.data,
            context,
          );
          if (!validationResult.isValid) {
            responseData.validation = validationResult;
            tracingService.addLog(
              span.spanId,
              "error",
              "Tenant isolation validation failed",
              validationResult.errors,
            );
          }
        }

        // Add tracing metadata
        if (!responseData.metadata) {
          responseData.metadata = {
            requestId: context.requestId,
            traceId: context.traceId,
            timestamp: new Date().toISOString(),
            processingTime: Date.now() - startTime,
            tenantId: this.tenantId || "unknown",
            userId: this.userId || "unknown",
            sessionId: this.sessionId || "unknown",
            version: "1.0.0",
          };
        }

        tracingService.finishSpan(span.spanId, "success");
        return responseData;
      }

      tracingService.finishSpan(span.spanId, "success");
      return {
        success: true,
        data: data as T,
        metadata: {
          requestId: context.requestId,
          traceId: context.traceId,
          timestamp: new Date().toISOString(),
          processingTime: Date.now() - startTime,
          tenantId: this.tenantId || "unknown",
          userId: this.userId || "unknown",
          sessionId: this.sessionId || "unknown",
          version: "1.0.0",
        },
      };
    } catch (error) {
      const duration = Date.now() - startTime;

      // Remove from request queue
      this.requestQueue.delete(context.requestId);

      // Handle different error types
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          console.info("Request aborted", context);
          const abortError = new Error("Request was cancelled") as ApiError;
          abortError.code = "REQUEST_CANCELLED";
          abortError.context = context;
          tracingService.finishSpan(span.spanId, "error", abortError);
          throw abortError;
        }

        if (error.name === "TimeoutError") {
          console.warn("Request timeout", context);
          const timeoutError = new Error("Request timed out") as ApiError;
          timeoutError.code = "REQUEST_TIMEOUT";
          timeoutError.context = context;
          tracingService.finishSpan(span.spanId, "error", timeoutError);
          throw timeoutError;
        }
      }

      this.logError(context, error, duration);

      // Enhance error with context and tracing
      const enhancedError = error as ApiError;
      enhancedError.context = context;

      tracingService.finishSpan(span.spanId, "error", enhancedError);
      throw enhancedError;
    }
  }

  // Validate that response data doesn't contain information from other tenants
  private validateTenantIsolation(
    data: any,
    context: RequestContext,
  ): ValidationResult {
    if (!this.tenantId) {
      return {
        isValid: true,
        errors: [],
        warnings: [],
        schema: "tenant-isolation-v1",
        version: "1.0.0",
      };
    }

    return validateTenantIsolation(data, this.tenantId, {
      userId: this.userId || "unknown",
      sessionId: this.sessionId || "unknown",
      traceId: context.traceId,
    });
  }

  // Authentication API
  async login(
    email: string,
    password: string,
  ): Promise<ApiResponse<{ user: User; token: string; tenantId: string }>> {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async register(
    userData: CreateUserRequest & { password: string; tenantName: string },
  ): Promise<ApiResponse<{ user: User; token: string; tenantId: string }>> {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async logout(): Promise<ApiResponse<void>> {
    return this.request("/auth/logout", {
      method: "POST",
    });
  }

  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    return this.request("/auth/refresh", {
      method: "POST",
    });
  }

  // User Management API with validation
  async getUsers(params?: {
    page?: number;
    limit?: number;
    role?: string;
  }): Promise<ApiResponse<User[]>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.role) queryParams.append("role", params.role);

    const response = await this.request<User[]>(
      `/users?${queryParams.toString()}`,
    );

    // Validate each user in the response
    if (response.success && response.data) {
      const validationErrors: any[] = [];
      response.data.forEach((user, index) => {
        const validation = globalValidator.validate(user, "user");
        if (!validation.isValid) {
          validationErrors.push({
            index,
            userId: user.id,
            errors: validation.errors,
          });
        }
      });

      if (validationErrors.length > 0) {
        console.warn("User data validation errors", validationErrors);
      }
    }

    return response;
  }

  async getUser(id: string): Promise<ApiResponse<User>> {
    return this.request(`/users/${id}`);
  }

  async createUser(userData: CreateUserRequest): Promise<ApiResponse<User>> {
    return this.request("/users", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async updateUser(
    id: string,
    userData: UpdateUserRequest,
  ): Promise<ApiResponse<User>> {
    return this.request(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id: string): Promise<ApiResponse<void>> {
    return this.request(`/users/${id}`, {
      method: "DELETE",
    });
  }

  // Customer Management API
  async getCustomers(params?: {
    page?: number;
    limit?: number;
    status?: string;
    type?: string;
    search?: string;
  }): Promise<ApiResponse<Customer[]>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.status) queryParams.append("status", params.status);
    if (params?.type) queryParams.append("type", params.type);
    if (params?.search) queryParams.append("search", params.search);

    return this.request(`/customers?${queryParams.toString()}`);
  }

  async getCustomer(id: string): Promise<ApiResponse<Customer>> {
    return this.request(`/customers/${id}`);
  }

  async createCustomer(
    customerData: CreateCustomerRequest,
  ): Promise<ApiResponse<Customer>> {
    // Sanitize input data
    const sanitizedData = sanitizeData(customerData, {
      stripHtml: ["name", "notes"],
      trimWhitespace: ["name", "email", "phone"],
      normalizeEmail: ["email"],
      sanitizePhone: ["phone"],
    });

    // Validate input data
    const validation = globalValidator.validate(
      {
        ...sanitizedData,
        id: "temp-id", // Temporary ID for validation
        tenantId: this.tenantId,
        status: "active",
      },
      "customer",
    );

    if (!validation.isValid) {
      return {
        success: false,
        error: "Validation failed",
        validation,
      };
    }

    return this.request("/customers", {
      method: "POST",
      body: JSON.stringify(sanitizedData),
    });
  }

  async updateCustomer(
    id: string,
    customerData: Partial<CreateCustomerRequest>,
  ): Promise<ApiResponse<Customer>> {
    return this.request(`/customers/${id}`, {
      method: "PUT",
      body: JSON.stringify(customerData),
    });
  }

  async deleteCustomer(id: string): Promise<ApiResponse<void>> {
    return this.request(`/customers/${id}`, {
      method: "DELETE",
    });
  }

  // Job Management API
  async getJobs(params?: {
    page?: number;
    limit?: number;
    status?: string;
    customerId?: string;
    assignedTo?: string;
  }): Promise<ApiResponse<Job[]>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.status) queryParams.append("status", params.status);
    if (params?.customerId) queryParams.append("customerId", params.customerId);
    if (params?.assignedTo) queryParams.append("assignedTo", params.assignedTo);

    return this.request(`/jobs?${queryParams.toString()}`);
  }

  async getJob(id: string): Promise<ApiResponse<Job>> {
    return this.request(`/jobs/${id}`);
  }

  async createJob(jobData: CreateJobRequest): Promise<ApiResponse<Job>> {
    return this.request("/jobs", {
      method: "POST",
      body: JSON.stringify(jobData),
    });
  }

  async updateJob(
    id: string,
    jobData: Partial<CreateJobRequest>,
  ): Promise<ApiResponse<Job>> {
    return this.request(`/jobs/${id}`, {
      method: "PUT",
      body: JSON.stringify(jobData),
    });
  }

  async deleteJob(id: string): Promise<ApiResponse<void>> {
    return this.request(`/jobs/${id}`, {
      method: "DELETE",
    });
  }

  // Additional API methods would continue here...
  // For brevity, I'm including just the core methods that demonstrate the patterns
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
