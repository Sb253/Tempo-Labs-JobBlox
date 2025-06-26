// Core entity types for multi-tenant CRM
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: "active" | "inactive" | "suspended";
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  avatar?: string;
  phone?: string;
  preferences?: Record<string, any>;
}

export interface Customer {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  type: "residential" | "commercial" | "industrial";
  status: "active" | "inactive" | "prospect" | "archived";
  notes?: string;
  tags?: string[];
  customFields?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  source?: string;
  lifetime_value?: number;
}

export interface Job {
  id: string;
  tenantId: string;
  customerId: string;
  title: string;
  description: string;
  status: "draft" | "scheduled" | "in_progress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high" | "urgent";
  estimatedStartDate: Date;
  estimatedEndDate: Date;
  actualStartDate?: Date;
  actualEndDate?: Date;
  assignedTo: string[];
  location?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: { lat: number; lng: number };
  };
  materials?: JobMaterial[];
  laborHours?: number;
  totalCost?: number;
  notes?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface JobMaterial {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unitCost: number;
  totalCost: number;
  supplier?: string;
  notes?: string;
}

export interface Estimate {
  id: string;
  tenantId: string;
  customerId: string;
  jobId?: string;
  title: string;
  description: string;
  status: "draft" | "sent" | "viewed" | "approved" | "rejected" | "expired";
  validUntil: Date;
  lineItems: EstimateLineItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountAmount?: number;
  totalAmount: number;
  notes?: string;
  terms?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  sentAt?: Date;
  viewedAt?: Date;
  approvedAt?: Date;
}

export interface EstimateLineItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  category?: string;
}

export interface Invoice {
  id: string;
  tenantId: string;
  customerId: string;
  jobId?: string;
  estimateId?: string;
  invoiceNumber: string;
  title: string;
  description: string;
  status: "draft" | "sent" | "viewed" | "paid" | "overdue" | "cancelled";
  issueDate: Date;
  dueDate: Date;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountAmount?: number;
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;
  notes?: string;
  terms?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  sentAt?: Date;
  viewedAt?: Date;
  paidAt?: Date;
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  category?: string;
}

export interface Payment {
  id: string;
  tenantId: string;
  customerId: string;
  invoiceId: string;
  amount: number;
  method: "cash" | "check" | "credit_card" | "bank_transfer" | "other";
  status: "pending" | "completed" | "failed" | "refunded";
  transactionId?: string;
  reference?: string;
  notes?: string;
  processedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface Employee {
  id: string;
  tenantId: string;
  userId: string;
  employeeNumber: string;
  department: string;
  position: string;
  hireDate: Date;
  hourlyRate?: number;
  salaryAmount?: number;
  status: "active" | "inactive" | "terminated";
  skills?: string[];
  certifications?: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InventoryItem {
  id: string;
  tenantId: string;
  name: string;
  description?: string;
  sku: string;
  category: string;
  unit: string;
  currentStock: number;
  minStock: number;
  maxStock?: number;
  unitCost: number;
  unitPrice: number;
  supplier?: string;
  location?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimeEntry {
  id: string;
  tenantId: string;
  employeeId: string;
  jobId?: string;
  description: string;
  startTime: Date;
  endTime?: Date;
  duration?: number; // in minutes
  hourlyRate?: number;
  totalAmount?: number;
  status: "active" | "completed" | "approved";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  tenantId: string;
  name: string;
  description?: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  url: string;
  category: string;
  relatedType?: "customer" | "job" | "estimate" | "invoice" | "employee";
  relatedId?: string;
  tags?: string[];
  isPublic: boolean;
  uploadedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// Enhanced API Response Types with validation
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: PaginationInfo;
  metadata?: ResponseMetadata;
  validation?: ValidationResult;
}

// Data validation interfaces
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  schema: string;
  version: string;
}

export interface ValidationError {
  field: string;
  code: string;
  message: string;
  value?: any;
  constraint?: string;
}

export interface ValidationWarning {
  field: string;
  code: string;
  message: string;
  suggestion?: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ResponseMetadata {
  requestId: string;
  traceId: string;
  timestamp: string;
  processingTime: number;
  tenantId: string;
  userId: string;
  sessionId: string;
  version: string;
  rateLimit?: RateLimitInfo;
  cacheInfo?: CacheInfo;
}

export interface RateLimitInfo {
  limit: number;
  remaining: number;
  resetTime: Date;
  retryAfter?: number;
}

export interface CacheInfo {
  hit: boolean;
  ttl: number;
  key: string;
  source: "memory" | "redis" | "database";
}

// Request types
export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phone?: string;
  avatar?: string;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  role?: string;
  status?: "active" | "inactive" | "suspended";
  phone?: string;
  avatar?: string;
  preferences?: Record<string, any>;
}

export interface CreateCustomerRequest {
  name: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  type: "residential" | "commercial" | "industrial";
  notes?: string;
  tags?: string[];
  customFields?: Record<string, any>;
  assignedTo?: string;
  source?: string;
}

export interface CreateJobRequest {
  customerId: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  estimatedStartDate: Date;
  estimatedEndDate: Date;
  assignedTo: string[];
  location?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: { lat: number; lng: number };
  };
  materials?: Omit<JobMaterial, "id">[];
  laborHours?: number;
  notes?: string;
  tags?: string[];
}

export interface CreateEstimateRequest {
  customerId: string;
  jobId?: string;
  title: string;
  description: string;
  validUntil: Date;
  lineItems: Omit<EstimateLineItem, "id">[];
  taxRate: number;
  discountAmount?: number;
  notes?: string;
  terms?: string;
}

export interface CreateInvoiceRequest {
  customerId: string;
  jobId?: string;
  estimateId?: string;
  title: string;
  description: string;
  dueDate: Date;
  lineItems: Omit<InvoiceLineItem, "id">[];
  taxRate: number;
  discountAmount?: number;
  notes?: string;
  terms?: string;
}

// Request validation schemas
export interface RequestValidation {
  schema: string;
  version: string;
  required: string[];
  optional: string[];
  constraints: Record<string, any>;
  sanitization: SanitizationRules;
}

export interface SanitizationRules {
  stripHtml: string[];
  trimWhitespace: string[];
  toLowerCase: string[];
  normalizeEmail: string[];
  sanitizePhone: string[];
  removeSpecialChars: string[];
}

// JSON Schema validation
export interface JsonSchema {
  $schema: string;
  type: string;
  properties: Record<string, JsonSchemaProperty>;
  required?: string[];
  additionalProperties?: boolean;
  definitions?: Record<string, JsonSchema>;
}

export interface JsonSchemaProperty {
  type: string | string[];
  format?: string;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  enum?: any[];
  items?: JsonSchemaProperty;
  properties?: Record<string, JsonSchemaProperty>;
  description?: string;
  examples?: any[];
}

// System health and monitoring types
export interface TenantHealth {
  tenantId: string;
  status: "healthy" | "degraded" | "unhealthy";
  lastCheck: Date;
  metrics: {
    activeUsers: number;
    apiCalls: number;
    errorRate: number;
    responseTime: number;
    storageUsed: number;
    storageLimit: number;
  };
  issues: string[];
  alerts: string[];
}

export interface HealthIssue {
  id: string;
  severity: "low" | "medium" | "high" | "critical";
  category: string;
  message: string;
  details?: string;
  timestamp: Date;
  resolved: boolean;
  resolvedAt?: Date;
}

export interface HealthCheck {
  service: string;
  status: "healthy" | "degraded" | "unhealthy";
  responseTime: number;
  timestamp: Date;
  details?: Record<string, any>;
}

export interface SystemError {
  id: string;
  code: string;
  message: string;
  context: {
    requestId: string;
    traceId: string;
    sessionId: string;
    tenantId: string;
    userId: string;
    endpoint: string;
    method: string;
    timestamp: Date;
  };
  severity: "low" | "medium" | "high" | "critical";
  category: string;
  resolved: boolean;
  createdAt: Date;
  resolvedAt?: Date;
}
