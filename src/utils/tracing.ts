// Request tracing and correlation utilities

export interface TraceContext {
  traceId: string;
  spanId: string;
  parentSpanId?: string;
  requestId: string;
  sessionId: string;
  tenantId: string;
  userId: string;
  timestamp: Date;
  operation: string;
  metadata?: Record<string, any>;
}

export interface Span {
  traceId: string;
  spanId: string;
  parentSpanId?: string;
  operation: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  status: "pending" | "success" | "error";
  tags: Record<string, any>;
  logs: LogEntry[];
  error?: Error;
}

export interface LogEntry {
  timestamp: Date;
  level: "debug" | "info" | "warn" | "error";
  message: string;
  data?: any;
  traceId: string;
  spanId?: string;
}

class TracingService {
  private activeSpans: Map<string, Span> = new Map();
  private completedSpans: Span[] = [];
  private maxCompletedSpans = 1000;

  // Generate unique IDs
  generateTraceId(): string {
    return `trace_${Date.now()}_${Math.random().toString(36).substring(2, 18)}`;
  }

  generateSpanId(): string {
    return `span_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
  }

  generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substring(2, 12)}`;
  }

  // Create trace context
  createTraceContext(
    operation: string,
    sessionId: string,
    tenantId: string,
    userId: string,
    parentSpanId?: string,
    traceId?: string,
  ): TraceContext {
    return {
      traceId: traceId || this.generateTraceId(),
      spanId: this.generateSpanId(),
      parentSpanId,
      requestId: this.generateRequestId(),
      sessionId,
      tenantId,
      userId,
      timestamp: new Date(),
      operation,
    };
  }

  // Start a new span
  startSpan(
    operation: string,
    traceId: string,
    parentSpanId?: string,
    tags: Record<string, any> = {},
  ): Span {
    const span: Span = {
      traceId,
      spanId: this.generateSpanId(),
      parentSpanId,
      operation,
      startTime: new Date(),
      status: "pending",
      tags: {
        ...tags,
        "span.kind": "internal",
        "service.name": "jobblox-frontend",
      },
      logs: [],
    };

    this.activeSpans.set(span.spanId, span);

    console.debug("Span started", {
      traceId: span.traceId,
      spanId: span.spanId,
      parentSpanId: span.parentSpanId,
      operation: span.operation,
      tags: span.tags,
    });

    return span;
  }

  // Finish a span
  finishSpan(
    spanId: string,
    status: "success" | "error" = "success",
    error?: Error,
  ) {
    const span = this.activeSpans.get(spanId);
    if (!span) {
      console.warn("Attempted to finish non-existent span", { spanId });
      return;
    }

    span.endTime = new Date();
    span.duration = span.endTime.getTime() - span.startTime.getTime();
    span.status = status;
    span.error = error;

    if (error) {
      span.tags["error"] = true;
      span.tags["error.message"] = error.message;
      span.tags["error.stack"] = error.stack;
    }

    this.activeSpans.delete(spanId);
    this.completedSpans.push(span);

    // Limit memory usage
    if (this.completedSpans.length > this.maxCompletedSpans) {
      this.completedSpans.shift();
    }

    console.debug("Span finished", {
      traceId: span.traceId,
      spanId: span.spanId,
      operation: span.operation,
      duration: span.duration,
      status: span.status,
      error: error?.message,
    });
  }

  // Add log to span
  addLog(
    spanId: string,
    level: "debug" | "info" | "warn" | "error",
    message: string,
    data?: any,
  ) {
    const span = this.activeSpans.get(spanId);
    if (!span) {
      console.warn("Attempted to log to non-existent span", {
        spanId,
        message,
      });
      return;
    }

    const logEntry: LogEntry = {
      timestamp: new Date(),
      level,
      message,
      data,
      traceId: span.traceId,
      spanId,
    };

    span.logs.push(logEntry);

    // Also log to console with trace context
    const logMethod = console[level] || console.log;
    logMethod(`[${span.traceId}:${spanId}] ${message}`, data || "");
  }

  // Add tags to span
  addTags(spanId: string, tags: Record<string, any>) {
    const span = this.activeSpans.get(spanId);
    if (span) {
      Object.assign(span.tags, tags);
    }
  }

  // Get active span
  getActiveSpan(spanId: string): Span | undefined {
    return this.activeSpans.get(spanId);
  }

  // Get trace spans
  getTraceSpans(traceId: string): Span[] {
    const activeSpans = Array.from(this.activeSpans.values()).filter(
      (span) => span.traceId === traceId,
    );
    const completedSpans = this.completedSpans.filter(
      (span) => span.traceId === traceId,
    );
    return [...activeSpans, ...completedSpans];
  }

  // Export trace data
  exportTrace(traceId: string): any {
    const spans = this.getTraceSpans(traceId);
    return {
      traceId,
      spans: spans.map((span) => ({
        traceId: span.traceId,
        spanId: span.spanId,
        parentSpanId: span.parentSpanId,
        operation: span.operation,
        startTime: span.startTime.toISOString(),
        endTime: span.endTime?.toISOString(),
        duration: span.duration,
        status: span.status,
        tags: span.tags,
        logs: span.logs.map((log) => ({
          timestamp: log.timestamp.toISOString(),
          level: log.level,
          message: log.message,
          data: log.data,
        })),
        error: span.error
          ? {
              message: span.error.message,
              stack: span.error.stack,
            }
          : undefined,
      })),
      metadata: {
        exportedAt: new Date().toISOString(),
        spanCount: spans.length,
        totalDuration:
          Math.max(
            ...spans
              .filter((s) => s.duration)
              .map((s) => s.startTime.getTime() + (s.duration || 0)),
          ) - Math.min(...spans.map((s) => s.startTime.getTime())),
      },
    };
  }

  // Clear old traces
  cleanup(maxAge: number = 24 * 60 * 60 * 1000) {
    const cutoff = new Date(Date.now() - maxAge);
    const initialCount = this.completedSpans.length;

    this.completedSpans = this.completedSpans.filter(
      (span) => span.startTime > cutoff,
    );

    const removedCount = initialCount - this.completedSpans.length;
    if (removedCount > 0) {
      console.info(`Cleaned up ${removedCount} old spans`);
    }
  }

  // Get performance metrics
  getMetrics(): any {
    const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000;

    const recentSpans = this.completedSpans.filter(
      (span) => span.startTime.getTime() > oneHourAgo,
    );

    const durations = recentSpans
      .filter((span) => span.duration)
      .map((span) => span.duration!);

    const errorCount = recentSpans.filter(
      (span) => span.status === "error",
    ).length;

    return {
      totalSpans: recentSpans.length,
      activeSpans: this.activeSpans.size,
      errorRate: recentSpans.length > 0 ? errorCount / recentSpans.length : 0,
      averageDuration:
        durations.length > 0
          ? durations.reduce((a, b) => a + b, 0) / durations.length
          : 0,
      p95Duration:
        durations.length > 0
          ? durations.sort((a, b) => a - b)[Math.floor(durations.length * 0.95)]
          : 0,
      p99Duration:
        durations.length > 0
          ? durations.sort((a, b) => a - b)[Math.floor(durations.length * 0.99)]
          : 0,
    };
  }
}

// Global tracing service instance
export const tracingService = new TracingService();

// Enhanced logging with trace context
export class TracedLogger {
  constructor(private context: TraceContext) {}

  private formatMessage(level: string, message: string, data?: any): string {
    const timestamp = new Date().toISOString();
    const contextStr = `[${this.context.traceId}:${this.context.spanId}]`;
    const tenantStr = `[tenant:${this.context.tenantId}]`;
    const userStr = `[user:${this.context.userId}]`;

    return `${timestamp} ${level.toUpperCase()} ${contextStr} ${tenantStr} ${userStr} ${message}`;
  }

  debug(message: string, data?: any) {
    console.debug(this.formatMessage("debug", message), data || "");
  }

  info(message: string, data?: any) {
    console.info(this.formatMessage("info", message), data || "");
  }

  warn(message: string, data?: any) {
    console.warn(this.formatMessage("warn", message), data || "");
  }

  error(message: string, error?: Error | any) {
    const errorData =
      error instanceof Error
        ? { message: error.message, stack: error.stack }
        : error;
    console.error(this.formatMessage("error", message), errorData || "");
  }
}

// Utility functions
export const withTracing = async <T>(
  operation: string,
  traceContext: TraceContext,
  fn: (span: Span, logger: TracedLogger) => Promise<T>,
): Promise<T> => {
  const span = tracingService.startSpan(
    operation,
    traceContext.traceId,
    traceContext.spanId,
    {
      "tenant.id": traceContext.tenantId,
      "user.id": traceContext.userId,
      "session.id": traceContext.sessionId,
    },
  );

  const logger = new TracedLogger({
    ...traceContext,
    spanId: span.spanId,
  });

  try {
    logger.info(`Starting operation: ${operation}`);
    const result = await fn(span, logger);
    logger.info(`Completed operation: ${operation}`);
    tracingService.finishSpan(span.spanId, "success");
    return result;
  } catch (error) {
    logger.error(`Failed operation: ${operation}`, error);
    tracingService.finishSpan(span.spanId, "error", error as Error);
    throw error;
  }
};

// Cleanup interval
setInterval(
  () => {
    tracingService.cleanup();
  },
  60 * 60 * 1000,
); // Cleanup every hour

export default {
  tracingService,
  TracedLogger,
  withTracing,
};
