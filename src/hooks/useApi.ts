// Enhanced React hooks for API integration with tenant isolation
import { useState, useEffect, useCallback, useRef } from "react";
import { apiService } from "../services/api";
import { ApiResponse } from "../types/backend";
import { useAuth } from "../contexts/AuthContext";

// Generic hook for API calls with enhanced security
export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = [],
  options: {
    requiresAuth?: boolean;
    requiresTenant?: boolean;
    retryCount?: number;
    cacheKey?: string;
  } = {},
) {
  const {
    isAuthenticated,
    user,
    tenant,
    session,
    validateSession,
    getAuthHeaders,
    updateActivity,
  } = useAuth();

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryAttempt, setRetryAttempt] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const {
    requiresAuth = true,
    requiresTenant = true,
    retryCount = 3,
    cacheKey,
  } = options;

  const fetchData = useCallback(async () => {
    // Validate prerequisites
    if (requiresAuth && !isAuthenticated) {
      setError("Authentication required");
      setLoading(false);
      return;
    }

    if (requiresTenant && !tenant) {
      setError("Tenant context required");
      setLoading(false);
      return;
    }

    if (requiresAuth && !validateSession()) {
      setError("Invalid session");
      setLoading(false);
      return;
    }

    // Cancel previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    try {
      setLoading(true);
      setError(null);

      // Update API service with current auth context
      if (isAuthenticated && user && tenant && session) {
        apiService.setAuthToken(session.sessionId);
        apiService.setTenantId(tenant.tenantId);
        apiService.setSessionId(session.sessionId);
        apiService.setUserId(user.id);
      }

      console.info("API call initiated", {
        requiresAuth,
        requiresTenant,
        userId: user?.id,
        tenantId: tenant?.tenantId,
        sessionId: session?.sessionId,
        traceId: session?.traceId,
        cacheKey,
      });

      const response = await apiCall();

      // Update activity on successful API call
      if (isAuthenticated) {
        updateActivity();
      }

      if (response.success && response.data) {
        setData(response.data);
        setRetryAttempt(0); // Reset retry count on success

        console.info("API call successful", {
          userId: user?.id,
          tenantId: tenant?.tenantId,
          traceId: session?.traceId,
          cacheKey,
        });
      } else {
        const errorMessage = response.error || "Unknown error occurred";
        setError(errorMessage);

        console.warn("API call failed", {
          error: errorMessage,
          userId: user?.id,
          tenantId: tenant?.tenantId,
          traceId: session?.traceId,
        });
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        console.info("API call aborted");
        return;
      }

      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";

      console.error("API call error", {
        error: errorMessage,
        retryAttempt,
        maxRetries: retryCount,
        userId: user?.id,
        tenantId: tenant?.tenantId,
        traceId: session?.traceId,
      });

      // Implement retry logic for transient errors
      if (retryAttempt < retryCount && shouldRetry(err)) {
        console.info("Retrying API call", {
          attempt: retryAttempt + 1,
          maxRetries: retryCount,
        });
        setRetryAttempt((prev) => prev + 1);
        setTimeout(() => fetchData(), Math.pow(2, retryAttempt) * 1000); // Exponential backoff
        return;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [
    ...dependencies,
    isAuthenticated,
    user?.id,
    tenant?.tenantId,
    session?.sessionId,
    retryAttempt,
  ]);

  // Determine if error should trigger a retry
  const shouldRetry = (error: any): boolean => {
    if (error instanceof Error) {
      // Retry on network errors, timeouts, and 5xx server errors
      return (
        error.message.includes("fetch") ||
        error.message.includes("timeout") ||
        error.message.includes("network") ||
        (error as any).status >= 500
      );
    }
    return false;
  };

  useEffect(() => {
    fetchData();

    // Cleanup function to abort pending requests
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    retryAttempt,
    canRetry: retryAttempt < retryCount,
  };
}

// Hook for paginated data
export function usePaginatedApi<T>(
  apiCall: (params: {
    page: number;
    limit: number;
  }) => Promise<ApiResponse<T[]>>,
  initialPage = 1,
  initialLimit = 10,
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall({ page, limit });
      if (response.success && response.data) {
        setData(response.data);
        if (response.pagination) {
          setTotalPages(response.pagination.totalPages);
          setTotal(response.pagination.total);
        }
      } else {
        setError(response.error || "Unknown error occurred");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, [apiCall, page, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return {
    data,
    loading,
    error,
    page,
    limit,
    totalPages,
    total,
    nextPage,
    prevPage,
    goToPage,
    setLimit,
    refetch: fetchData,
  };
}

// Hook for mutations (create, update, delete)
export function useMutation<T, P>(
  mutationFn: (params: P) => Promise<ApiResponse<T>>,
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const mutate = useCallback(
    async (params: P) => {
      try {
        setLoading(true);
        setError(null);
        const response = await mutationFn(params);
        if (response.success && response.data) {
          setData(response.data);
          return response.data;
        } else {
          const errorMessage = response.error || "Unknown error occurred";
          setError(errorMessage);
          throw new Error(errorMessage);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [mutationFn],
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { mutate, loading, error, data, reset };
}

// Specific hooks for common entities
export function useCustomers(params?: {
  status?: string;
  type?: string;
  search?: string;
}) {
  return usePaginatedApi(
    ({ page, limit }) => apiService.getCustomers({ page, limit, ...params }),
    1,
    10,
  );
}

export function useCustomer(id: string) {
  return useApi(() => apiService.getCustomer(id), [id]);
}

export function useJobs(params?: {
  status?: string;
  customerId?: string;
  assignedTo?: string;
}) {
  return usePaginatedApi(
    ({ page, limit }) => apiService.getJobs({ page, limit, ...params }),
    1,
    10,
  );
}

export function useJob(id: string) {
  return useApi(() => apiService.getJob(id), [id]);
}

export function useEstimates(params?: {
  status?: string;
  customerId?: string;
}) {
  return usePaginatedApi(
    ({ page, limit }) => apiService.getEstimates({ page, limit, ...params }),
    1,
    10,
  );
}

export function useEstimate(id: string) {
  return useApi(() => apiService.getEstimate(id), [id]);
}

export function useInvoices(params?: { status?: string; customerId?: string }) {
  return usePaginatedApi(
    ({ page, limit }) => apiService.getInvoices({ page, limit, ...params }),
    1,
    10,
  );
}

export function useInvoice(id: string) {
  return useApi(() => apiService.getInvoice(id), [id]);
}

export function usePayments(params?: {
  status?: string;
  customerId?: string;
  invoiceId?: string;
}) {
  return usePaginatedApi(
    ({ page, limit }) => apiService.getPayments({ page, limit, ...params }),
    1,
    10,
  );
}

export function useEmployees(params?: {
  status?: string;
  department?: string;
}) {
  return usePaginatedApi(
    ({ page, limit }) => apiService.getEmployees({ page, limit, ...params }),
    1,
    10,
  );
}

export function useEmployee(id: string) {
  return useApi(() => apiService.getEmployee(id), [id]);
}

export function useInventoryItems(params?: {
  category?: string;
  lowStock?: boolean;
}) {
  return usePaginatedApi(
    ({ page, limit }) =>
      apiService.getInventoryItems({ page, limit, ...params }),
    1,
    10,
  );
}

export function useTimeEntries(params?: {
  employeeId?: string;
  jobId?: string;
  startDate?: string;
  endDate?: string;
}) {
  return usePaginatedApi(
    ({ page, limit }) => apiService.getTimeEntries({ page, limit, ...params }),
    1,
    10,
  );
}

export function useDocuments(params?: {
  category?: string;
  relatedType?: string;
  relatedId?: string;
}) {
  return usePaginatedApi(
    ({ page, limit }) => apiService.getDocuments({ page, limit, ...params }),
    1,
    10,
  );
}

export function useNotifications(unread?: boolean) {
  return usePaginatedApi(
    ({ page, limit }) => apiService.getNotifications({ page, limit, unread }),
    1,
    20,
  );
}

// Mutation hooks
export function useCreateCustomer() {
  return useMutation(apiService.createCustomer.bind(apiService));
}

export function useUpdateCustomer() {
  return useMutation(({ id, data }: { id: string; data: any }) =>
    apiService.updateCustomer(id, data),
  );
}

export function useDeleteCustomer() {
  return useMutation((id: string) => apiService.deleteCustomer(id));
}

export function useCreateJob() {
  return useMutation(apiService.createJob.bind(apiService));
}

export function useUpdateJob() {
  return useMutation(({ id, data }: { id: string; data: any }) =>
    apiService.updateJob(id, data),
  );
}

export function useCreateEstimate() {
  return useMutation(apiService.createEstimate.bind(apiService));
}

export function useSendEstimate() {
  return useMutation(({ id, email }: { id: string; email?: string }) =>
    apiService.sendEstimate(id, email),
  );
}

export function useApproveEstimate() {
  return useMutation((id: string) => apiService.approveEstimate(id));
}

export function useCreateInvoice() {
  return useMutation(apiService.createInvoice.bind(apiService));
}

export function useSendInvoice() {
  return useMutation(({ id, email }: { id: string; email?: string }) =>
    apiService.sendInvoice(id, email),
  );
}

export function useCreatePayment() {
  return useMutation(apiService.createPayment.bind(apiService));
}

export function useProcessPayment() {
  return useMutation((id: string) => apiService.processPayment(id));
}

export function useStartTimer() {
  return useMutation(
    ({
      employeeId,
      jobId,
      description,
    }: {
      employeeId: string;
      jobId?: string;
      description?: string;
    }) => apiService.startTimer(employeeId, jobId, description),
  );
}

export function useStopTimer() {
  return useMutation((id: string) => apiService.stopTimer(id));
}

export function useUploadDocument() {
  return useMutation(({ file, metadata }: { file: File; metadata: any }) =>
    apiService.uploadDocument(file, metadata),
  );
}
