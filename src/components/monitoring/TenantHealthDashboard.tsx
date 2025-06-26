import React, { useState, useEffect } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  Users,
  Database,
  Clock,
  RefreshCw,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Zap,
  Shield,
  Server,
  Wifi,
  HardDrive,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { TenantHealth, HealthCheck, SystemError } from "@/types/backend";
import SystemHealthMonitor from "./SystemHealthMonitor";

interface TenantHealthDashboardProps {
  className?: string;
}

const TenantHealthDashboard: React.FC<TenantHealthDashboardProps> = ({
  className = "",
}) => {
  const auth = useAuth();
  const { user, tenant, session } = auth || {
    user: null,
    tenant: null,
    session: null,
  };
  const [healthData, setHealthData] = useState<TenantHealth[]>([]);
  const [systemHealth, setSystemHealth] = useState<HealthCheck[]>([]);
  const [errors, setErrors] = useState<SystemError[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Mock data for demonstration
  const mockTenantHealth: TenantHealth[] = [
    {
      tenantId: "tenant-1",
      status: "healthy",
      lastCheck: new Date(),
      metrics: {
        activeUsers: 45,
        apiCalls: 1250,
        errorRate: 0.02,
        responseTime: 120,
        storageUsed: 2500,
        storageLimit: 5000,
      },
      issues: [],
      alerts: [],
    },
    {
      tenantId: "tenant-2",
      status: "degraded",
      lastCheck: new Date(),
      metrics: {
        activeUsers: 23,
        apiCalls: 890,
        errorRate: 0.08,
        responseTime: 350,
        storageUsed: 4200,
        storageLimit: 5000,
      },
      issues: ["High error rate", "Slow response times"],
      alerts: ["Storage approaching limit"],
    },
    {
      tenantId: "tenant-3",
      status: "unhealthy",
      lastCheck: new Date(),
      metrics: {
        activeUsers: 12,
        apiCalls: 450,
        errorRate: 0.15,
        responseTime: 800,
        storageUsed: 4900,
        storageLimit: 5000,
      },
      issues: ["Critical error rate", "Database connection issues"],
      alerts: ["Storage limit exceeded", "Service degradation"],
    },
  ];

  const mockSystemHealth: HealthCheck[] = [
    {
      service: "API Gateway",
      status: "healthy",
      timestamp: new Date(),
      responseTime: 45,
      details: { uptime: "99.9%", requests: 15420 },
    },
    {
      service: "Database",
      status: "healthy",
      timestamp: new Date(),
      responseTime: 12,
      details: { connections: 156, queryTime: "8ms" },
    },
    {
      service: "Redis Cache",
      status: "degraded",
      timestamp: new Date(),
      responseTime: 89,
      details: { hitRate: "85%", memory: "78%" },
    },
    {
      service: "Message Queue",
      status: "healthy",
      timestamp: new Date(),
      responseTime: 23,
      details: { pending: 12, processed: 8945 },
    },
  ];

  const mockErrors: SystemError[] = [
    {
      id: "err-1",
      code: "TENANT_ISOLATION_VIOLATION",
      message: "Cross-tenant data access detected",
      context: {
        requestId: "req-123",
        traceId: "trace-456",
        sessionId: "session-789",
        tenantId: "tenant-2",
        userId: "user-456",
        endpoint: "/api/customers",
        method: "GET",
        timestamp: new Date(),
      },
      severity: "critical",
      category: "tenant",
      resolved: false,
      createdAt: new Date(Date.now() - 300000), // 5 minutes ago
    },
    {
      id: "err-2",
      code: "AUTH_TOKEN_EXPIRED",
      message: "Authentication token has expired",
      context: {
        requestId: "req-124",
        traceId: "trace-457",
        sessionId: "session-790",
        tenantId: "tenant-1",
        userId: "user-123",
        endpoint: "/api/jobs",
        method: "POST",
        timestamp: new Date(),
      },
      severity: "medium",
      category: "auth",
      resolved: true,
      createdAt: new Date(Date.now() - 600000), // 10 minutes ago
      resolvedAt: new Date(Date.now() - 300000),
    },
  ];

  useEffect(() => {
    const fetchHealthData = async () => {
      setLoading(true);
      try {
        // Simulate API calls
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setHealthData(mockTenantHealth);
        setSystemHealth(mockSystemHealth);
        setErrors(mockErrors);
        setLastUpdate(new Date());

        console.info("Health data refreshed", {
          tenantCount: mockTenantHealth.length,
          systemServices: mockSystemHealth.length,
          errorCount: mockErrors.filter((e) => !e.resolved).length,
          traceId: session?.traceId || "unknown",
        });
      } catch (error) {
        console.error("Failed to fetch health data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthData();

    // Auto-refresh every 30 seconds
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(fetchHealthData, 30000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, session?.traceId]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "degraded":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "unhealthy":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-500";
      case "degraded":
        return "bg-yellow-500";
      case "unhealthy":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleRecoveryAction = async (tenantId: string, action: string) => {
    console.info("Recovery action initiated", {
      tenantId,
      action,
      initiatedBy: user?.id || "unknown",
      traceId: session?.traceId || "unknown",
    });

    try {
      // Simulate recovery action
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update tenant status
      setHealthData((prev) =>
        prev.map((tenant) =>
          tenant.tenantId === tenantId
            ? { ...tenant, status: "healthy" as const, issues: [], alerts: [] }
            : tenant,
        ),
      );

      console.info("Recovery action completed", { tenantId, action });
    } catch (error) {
      console.error("Recovery action failed", { tenantId, action, error });
    }
  };

  const handleErrorResolve = (errorId: string) => {
    setErrors((prev) =>
      prev.map((error) =>
        error.id === errorId
          ? { ...error, resolved: true, resolvedAt: new Date() }
          : error,
      ),
    );

    console.info("Error marked as resolved", {
      errorId,
      resolvedBy: user?.id || "unknown",
      traceId: session?.traceId || "unknown",
    });
  };

  const activeErrors = errors.filter((e) => !e.resolved);
  const healthyTenants = healthData.filter(
    (t) => t.status === "healthy",
  ).length;
  const degradedTenants = healthData.filter(
    (t) => t.status === "degraded",
  ).length;
  const unhealthyTenants = healthData.filter(
    (t) => t.status === "unhealthy",
  ).length;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Tenant Health Dashboard
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Monitor tenant health and system performance
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${autoRefresh ? "animate-spin" : ""}`}
            />
            {autoRefresh ? "Auto" : "Manual"}
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Healthy Tenants
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {healthyTenants}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Degraded Tenants
                </p>
                <p className="text-2xl font-bold text-yellow-600">
                  {degradedTenants}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Unhealthy Tenants
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {unhealthyTenants}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Active Errors
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {activeErrors.length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tenants" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tenants">Tenant Health</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
          <TabsTrigger value="metrics">System Metrics</TabsTrigger>
          <TabsTrigger value="errors">Error Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="tenants" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {healthData.map((tenant) => (
              <Card key={tenant.tenantId}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{tenant.tenantId}</CardTitle>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(tenant.status)}
                      <Badge className={getStatusColor(tenant.status)}>
                        {tenant.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span>{tenant.metrics.activeUsers} users</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-green-500" />
                      <span>{tenant.metrics.apiCalls} calls</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-purple-500" />
                      <span>{tenant.metrics.responseTime}ms</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span>
                        {(tenant.metrics.errorRate * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  {/* Storage Usage */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Storage Usage</span>
                      <span>
                        {tenant.metrics.storageUsed}MB /{" "}
                        {tenant.metrics.storageLimit}MB
                      </span>
                    </div>
                    <Progress
                      value={
                        (tenant.metrics.storageUsed /
                          tenant.metrics.storageLimit) *
                        100
                      }
                      className="h-2"
                    />
                  </div>

                  {/* Issues and Alerts */}
                  {tenant.issues.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-red-600">
                        Issues:
                      </p>
                      {tenant.issues.map((issue, index) => (
                        <Badge
                          key={index}
                          variant="destructive"
                          className="text-xs"
                        >
                          {issue}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {tenant.alerts.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-yellow-600">
                        Alerts:
                      </p>
                      {tenant.alerts.map((alert, index) => (
                        <Badge
                          key={index}
                          className="bg-yellow-100 text-yellow-800 text-xs"
                        >
                          {alert}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Recovery Actions */}
                  {tenant.status !== "healthy" && (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleRecoveryAction(tenant.tenantId, "restart")
                        }
                      >
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Restart
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleRecoveryAction(tenant.tenantId, "clear_cache")
                        }
                      >
                        <Database className="h-3 w-3 mr-1" />
                        Clear Cache
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {systemHealth.map((service) => (
              <Card key={service.service}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{service.service}</CardTitle>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(service.status)}
                      <Badge className={getStatusColor(service.status)}>
                        {service.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Response Time:</span>
                      <span className="font-medium">
                        {service.responseTime}ms
                      </span>
                    </div>
                    {service.details &&
                      Object.entries(service.details).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="capitalize">
                            {key.replace(/([A-Z])/g, " $1")}:
                          </span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    <div className="text-xs text-slate-500">
                      Last checked: {service.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <SystemHealthMonitor />
        </TabsContent>

        <TabsContent value="errors" className="space-y-4">
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {errors.map((error) => (
                <Card
                  key={error.id}
                  className={error.resolved ? "opacity-60" : ""}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge className={getSeverityColor(error.severity)}>
                          {error.severity}
                        </Badge>
                        <Badge variant="outline">{error.category}</Badge>
                        {error.resolved && (
                          <Badge className="bg-green-100 text-green-800">
                            Resolved
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-slate-500">
                        {error.createdAt.toLocaleString()}
                      </div>
                    </div>
                    <CardTitle className="text-base">{error.code}</CardTitle>
                    <CardDescription>{error.message}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="font-medium">Tenant:</span>{" "}
                          {error.context.tenantId}
                        </div>
                        <div>
                          <span className="font-medium">User:</span>{" "}
                          {error.context.userId}
                        </div>
                        <div>
                          <span className="font-medium">Endpoint:</span>{" "}
                          {error.context.endpoint}
                        </div>
                        <div>
                          <span className="font-medium">Method:</span>{" "}
                          {error.context.method}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div>
                          <span className="font-medium">Request ID:</span>{" "}
                          {error.context.requestId}
                        </div>
                        <div>
                          <span className="font-medium">Trace ID:</span>{" "}
                          {error.context.traceId}
                        </div>
                        <div>
                          <span className="font-medium">Session ID:</span>{" "}
                          {error.context.sessionId}
                        </div>
                      </div>
                      {!error.resolved && (
                        <Button
                          size="sm"
                          onClick={() => handleErrorResolve(error.id)}
                          className="mt-2"
                        >
                          Mark as Resolved
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TenantHealthDashboard;
