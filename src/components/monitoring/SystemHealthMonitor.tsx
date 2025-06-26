import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Database,
  Server,
  Wifi,
  HardDrive,
  Clock,
  Zap,
  Shield,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { tracingService } from "@/utils/tracing";

interface SystemMetrics {
  cpu: {
    usage: number;
    cores: number;
    load: number[];
  };
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  disk: {
    used: number;
    total: number;
    percentage: number;
  };
  network: {
    inbound: number;
    outbound: number;
    latency: number;
  };
  database: {
    connections: number;
    maxConnections: number;
    queryTime: number;
    slowQueries: number;
  };
  redis: {
    memory: number;
    hitRate: number;
    connectedClients: number;
  };
  api: {
    requestsPerSecond: number;
    averageResponseTime: number;
    errorRate: number;
    activeConnections: number;
  };
}

interface HealthStatus {
  status: "healthy" | "degraded" | "unhealthy";
  message: string;
  lastCheck: Date;
  uptime: number;
}

interface SystemHealthMonitorProps {
  className?: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

const SystemHealthMonitor: React.FC<SystemHealthMonitorProps> = ({
  className = "",
  autoRefresh = true,
  refreshInterval = 30000,
}) => {
  const auth = useAuth();
  const { user, tenant, session } = auth || {
    user: null,
    tenant: null,
    session: null,
  };
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [healthStatus, setHealthStatus] = useState<HealthStatus>({
    status: "healthy",
    message: "All systems operational",
    lastCheck: new Date(),
    uptime: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Mock system metrics for demonstration
  const generateMockMetrics = useCallback((): SystemMetrics => {
    const baseTime = Date.now();
    const variation = () => 0.8 + Math.random() * 0.4; // 0.8 to 1.2 multiplier

    return {
      cpu: {
        usage: Math.min(95, 45 * variation()),
        cores: 8,
        load: [1.2, 1.5, 1.8].map((l) => l * variation()),
      },
      memory: {
        used: Math.floor(8192 * 0.65 * variation()),
        total: 16384,
        percentage: Math.min(95, 65 * variation()),
      },
      disk: {
        used: Math.floor(500 * 0.75 * variation()),
        total: 1000,
        percentage: Math.min(95, 75 * variation()),
      },
      network: {
        inbound: Math.floor(150 * variation()),
        outbound: Math.floor(120 * variation()),
        latency: Math.floor(25 * variation()),
      },
      database: {
        connections: Math.floor(45 * variation()),
        maxConnections: 100,
        queryTime: Math.floor(12 * variation()),
        slowQueries: Math.floor(3 * variation()),
      },
      redis: {
        memory: Math.floor(512 * 0.4 * variation()),
        hitRate: Math.min(99, 92 * variation()),
        connectedClients: Math.floor(25 * variation()),
      },
      api: {
        requestsPerSecond: Math.floor(450 * variation()),
        averageResponseTime: Math.floor(180 * variation()),
        errorRate: Math.min(10, 2.1 * variation()),
        activeConnections: Math.floor(120 * variation()),
      },
    };
  }, []);

  const determineHealthStatus = useCallback(
    (metrics: SystemMetrics): HealthStatus => {
      const issues: string[] = [];
      let status: "healthy" | "degraded" | "unhealthy" = "healthy";

      // Check critical thresholds
      if (metrics.cpu.usage > 90) {
        issues.push("High CPU usage");
        status = "unhealthy";
      } else if (metrics.cpu.usage > 75) {
        issues.push("Elevated CPU usage");
        if (status === "healthy") status = "degraded";
      }

      if (metrics.memory.percentage > 90) {
        issues.push("High memory usage");
        status = "unhealthy";
      } else if (metrics.memory.percentage > 80) {
        issues.push("Elevated memory usage");
        if (status === "healthy") status = "degraded";
      }

      if (metrics.disk.percentage > 95) {
        issues.push("Disk space critical");
        status = "unhealthy";
      } else if (metrics.disk.percentage > 85) {
        issues.push("Disk space low");
        if (status === "healthy") status = "degraded";
      }

      if (metrics.api.errorRate > 5) {
        issues.push("High API error rate");
        status = "unhealthy";
      } else if (metrics.api.errorRate > 2) {
        issues.push("Elevated API error rate");
        if (status === "healthy") status = "degraded";
      }

      if (metrics.database.queryTime > 100) {
        issues.push("Slow database queries");
        if (status === "healthy") status = "degraded";
      }

      const message =
        issues.length > 0 ? issues.join(", ") : "All systems operational";

      return {
        status,
        message,
        lastCheck: new Date(),
        uptime: 99.9, // Mock uptime
      };
    },
    [],
  );

  const fetchMetrics = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call with tracing
      const traceId = session?.traceId || tracingService.generateTraceId();
      const span = tracingService.startSpan(
        "fetch-system-metrics",
        traceId,
        undefined,
        {
          "tenant.id": tenant?.tenantId || "unknown",
          "user.id": user?.id || "unknown",
          operation: "system-health-check",
        },
      );

      // Simulate network delay
      await new Promise((resolve) =>
        setTimeout(resolve, 500 + Math.random() * 1000),
      );

      const newMetrics = generateMockMetrics();
      const newHealthStatus = determineHealthStatus(newMetrics);

      setMetrics(newMetrics);
      setHealthStatus(newHealthStatus);
      setLastUpdate(new Date());

      tracingService.addLog(
        span.spanId,
        "info",
        "System metrics fetched successfully",
        {
          status: newHealthStatus.status,
          cpuUsage: newMetrics.cpu.usage,
          memoryUsage: newMetrics.memory.percentage,
          errorRate: newMetrics.api.errorRate,
        },
      );

      tracingService.finishSpan(span.spanId, "success");

      console.info("System health metrics updated", {
        status: newHealthStatus.status,
        traceId,
        tenantId: tenant?.tenantId || "unknown",
        userId: user?.id || "unknown",
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch metrics";
      setError(errorMessage);
      console.error("Failed to fetch system metrics", {
        error: errorMessage,
        tenantId: tenant?.tenantId || "unknown",
        userId: user?.id || "unknown",
      });
    } finally {
      setLoading(false);
    }
  }, [
    generateMockMetrics,
    determineHealthStatus,
    session?.traceId,
    tenant?.tenantId,
    user?.id,
  ]);

  useEffect(() => {
    fetchMetrics();

    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(fetchMetrics, refreshInterval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [fetchMetrics, autoRefresh, refreshInterval]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "degraded":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "unhealthy":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-600 bg-green-50 border-green-200";
      case "degraded":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "unhealthy":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  if (loading && !metrics) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center justify-center p-8">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
          <span className="ml-2 text-lg">Loading system metrics...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`space-y-4 ${className}`}>
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-700">
            Failed to load system metrics: {error}
          </AlertDescription>
        </Alert>
        <Button onClick={fetchMetrics} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* System Status Overview */}
      <Card className={`border-2 ${getStatusColor(healthStatus.status)}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStatusIcon(healthStatus.status)}
              <div>
                <CardTitle className="text-xl">
                  System Status:{" "}
                  {healthStatus.status.charAt(0).toUpperCase() +
                    healthStatus.status.slice(1)}
                </CardTitle>
                <CardDescription>{healthStatus.message}</CardDescription>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">
                Uptime: {healthStatus.uptime}%
              </div>
              <div className="text-xs text-gray-400">
                Last check: {lastUpdate.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* System Metrics Grid */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* CPU Metrics */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-blue-500" />
                <span>CPU Usage</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Usage</span>
                  <span className="font-medium">
                    {metrics.cpu.usage.toFixed(1)}%
                  </span>
                </div>
                <Progress
                  value={metrics.cpu.usage}
                  className={`h-2 ${metrics.cpu.usage > 80 ? "bg-red-100" : metrics.cpu.usage > 60 ? "bg-yellow-100" : "bg-green-100"}`}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Cores:</span>
                  <span className="ml-1 font-medium">{metrics.cpu.cores}</span>
                </div>
                <div>
                  <span className="text-gray-500">Load:</span>
                  <span className="ml-1 font-medium">
                    {metrics.cpu.load[0].toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Memory Metrics */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2">
                <HardDrive className="h-5 w-5 text-green-500" />
                <span>Memory Usage</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Used</span>
                  <span className="font-medium">
                    {formatBytes(metrics.memory.used * 1024 * 1024)} /{" "}
                    {formatBytes(metrics.memory.total * 1024 * 1024)}
                  </span>
                </div>
                <Progress
                  value={metrics.memory.percentage}
                  className={`h-2 ${metrics.memory.percentage > 85 ? "bg-red-100" : metrics.memory.percentage > 70 ? "bg-yellow-100" : "bg-green-100"}`}
                />
              </div>
              <div className="text-center">
                <span className="text-2xl font-bold">
                  {metrics.memory.percentage.toFixed(1)}%
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Disk Metrics */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-purple-500" />
                <span>Disk Usage</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Used</span>
                  <span className="font-medium">
                    {metrics.disk.used} GB / {metrics.disk.total} GB
                  </span>
                </div>
                <Progress
                  value={metrics.disk.percentage}
                  className={`h-2 ${metrics.disk.percentage > 90 ? "bg-red-100" : metrics.disk.percentage > 75 ? "bg-yellow-100" : "bg-green-100"}`}
                />
              </div>
              <div className="text-center">
                <span className="text-2xl font-bold">
                  {metrics.disk.percentage.toFixed(1)}%
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Network Metrics */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2">
                <Wifi className="h-5 w-5 text-cyan-500" />
                <span>Network</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Inbound:</span>
                  <div className="font-medium">
                    {metrics.network.inbound} MB/s
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Outbound:</span>
                  <div className="font-medium">
                    {metrics.network.outbound} MB/s
                  </div>
                </div>
              </div>
              <div className="text-center pt-2">
                <span className="text-gray-500">Latency:</span>
                <div className="text-xl font-bold">
                  {metrics.network.latency}ms
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Database Metrics */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2">
                <Server className="h-5 w-5 text-indigo-500" />
                <span>Database</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Connections</span>
                  <span className="font-medium">
                    {metrics.database.connections} /{" "}
                    {metrics.database.maxConnections}
                  </span>
                </div>
                <Progress
                  value={
                    (metrics.database.connections /
                      metrics.database.maxConnections) *
                    100
                  }
                  className="h-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Query Time:</span>
                  <div className="font-medium">
                    {metrics.database.queryTime}ms
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Slow Queries:</span>
                  <div className="font-medium">
                    {metrics.database.slowQueries}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Metrics */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-orange-500" />
                <span>API Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Requests/sec:</span>
                  <div className="font-medium">
                    {metrics.api.requestsPerSecond}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Avg Response:</span>
                  <div className="font-medium">
                    {metrics.api.averageResponseTime}ms
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Error Rate:</span>
                  <div
                    className={`font-medium ${
                      metrics.api.errorRate > 5
                        ? "text-red-600"
                        : metrics.api.errorRate > 2
                          ? "text-yellow-600"
                          : "text-green-600"
                    }`}
                  >
                    {metrics.api.errorRate.toFixed(2)}%
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Connections:</span>
                  <div className="font-medium">
                    {metrics.api.activeConnections}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Refresh Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs">
            Auto-refresh: {autoRefresh ? "On" : "Off"}
          </Badge>
          <Badge variant="outline" className="text-xs">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </Badge>
        </div>
        <Button
          onClick={fetchMetrics}
          variant="outline"
          size="sm"
          disabled={loading}
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>
    </div>
  );
};

export default SystemHealthMonitor;
