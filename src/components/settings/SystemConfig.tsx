import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Settings,
  Database,
  Shield,
  Globe,
  Server,
  HardDrive,
  Cpu,
  Memory,
  Network,
  Lock,
  Key,
  AlertTriangle,
  CheckCircle,
  Save,
  RefreshCw,
  Download,
  Upload,
} from "lucide-react";

interface SystemStatus {
  database: {
    status: "healthy" | "warning" | "error";
    connections: number;
    maxConnections: number;
    responseTime: number;
  };
  server: {
    status: "healthy" | "warning" | "error";
    uptime: string;
    cpuUsage: number;
    memoryUsage: number;
    diskUsage: number;
  };
  security: {
    lastSecurityScan: string;
    vulnerabilities: number;
    sslStatus: "valid" | "expiring" | "expired";
    sslExpiry: string;
  };
}

interface SystemConfig {
  general: {
    systemName: string;
    environment: string;
    maintenanceMode: boolean;
    debugMode: boolean;
    logLevel: string;
    sessionTimeout: number;
    maxFileSize: number;
  };
  database: {
    host: string;
    port: number;
    name: string;
    connectionPool: number;
    backupFrequency: string;
    retentionDays: number;
  };
  security: {
    passwordPolicy: {
      minLength: number;
      requireUppercase: boolean;
      requireNumbers: boolean;
      requireSpecialChars: boolean;
      expirationDays: number;
    };
    twoFactorAuth: boolean;
    ipWhitelist: string;
    rateLimiting: {
      enabled: boolean;
      requestsPerMinute: number;
    };
  };
  notifications: {
    emailServer: string;
    emailPort: number;
    emailSecurity: string;
    smsProvider: string;
    webhookUrl: string;
  };
  backup: {
    enabled: boolean;
    frequency: string;
    retention: number;
    location: string;
  };
}

const SystemConfig = () => {
  const [systemStatus] = useState<SystemStatus>({
    database: {
      status: "healthy",
      connections: 45,
      maxConnections: 100,
      responseTime: 12,
    },
    server: {
      status: "healthy",
      uptime: "15 days, 8 hours",
      cpuUsage: 35,
      memoryUsage: 68,
      diskUsage: 42,
    },
    security: {
      lastSecurityScan: "2024-01-15",
      vulnerabilities: 0,
      sslStatus: "valid",
      sslExpiry: "2024-12-31",
    },
  });

  const [config, setConfig] = useState<SystemConfig>({
    general: {
      systemName: "JobBlox CRM",
      environment: "production",
      maintenanceMode: false,
      debugMode: false,
      logLevel: "info",
      sessionTimeout: 30,
      maxFileSize: 10,
    },
    database: {
      host: "localhost",
      port: 5432,
      name: "jobblox_crm",
      connectionPool: 20,
      backupFrequency: "daily",
      retentionDays: 30,
    },
    security: {
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        expirationDays: 90,
      },
      twoFactorAuth: true,
      ipWhitelist: "",
      rateLimiting: {
        enabled: true,
        requestsPerMinute: 100,
      },
    },
    notifications: {
      emailServer: "smtp.gmail.com",
      emailPort: 587,
      emailSecurity: "tls",
      smsProvider: "twilio",
      webhookUrl: "",
    },
    backup: {
      enabled: true,
      frequency: "daily",
      retention: 30,
      location: "cloud",
    },
  });

  const handleSave = () => {
    console.log("Saving system configuration...", config);
    // Here you would typically save to your backend
  };

  const handleBackup = () => {
    console.log("Starting manual backup...");
    // Here you would trigger a manual backup
  };

  const handleSecurityScan = () => {
    console.log("Starting security scan...");
    // Here you would trigger a security scan
  };

  const getStatusColor = (status: "healthy" | "warning" | "error") => {
    switch (status) {
      case "healthy":
        return "text-green-600";
      case "warning":
        return "text-yellow-600";
      case "error":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: "healthy" | "warning" | "error") => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4" />;
      case "error":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
              <Settings className="h-8 w-8 text-blue-600" />
              System Configuration
            </h1>
            <p className="text-slate-600 mt-1">
              Manage system settings and monitor health
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleBackup} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Backup Now
            </Button>
            <Button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* System Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Database
                  className={`h-5 w-5 ${getStatusColor(systemStatus.database.status)}`}
                />
                Database
                {getStatusIcon(systemStatus.database.status)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Connections:</span>
                <span>
                  {systemStatus.database.connections}/
                  {systemStatus.database.maxConnections}
                </span>
              </div>
              <Progress
                value={
                  (systemStatus.database.connections /
                    systemStatus.database.maxConnections) *
                  100
                }
                className="h-2"
              />
              <div className="flex justify-between text-sm">
                <span>Response Time:</span>
                <span>{systemStatus.database.responseTime}ms</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Server
                  className={`h-5 w-5 ${getStatusColor(systemStatus.server.status)}`}
                />
                Server
                {getStatusIcon(systemStatus.server.status)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uptime:</span>
                <span>{systemStatus.server.uptime}</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>CPU:</span>
                  <span>{systemStatus.server.cpuUsage}%</span>
                </div>
                <Progress
                  value={systemStatus.server.cpuUsage}
                  className="h-2"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Memory:</span>
                  <span>{systemStatus.server.memoryUsage}%</span>
                </div>
                <Progress
                  value={systemStatus.server.memoryUsage}
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="h-5 w-5 text-green-600" />
                Security
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Last Scan:</span>
                <span>{systemStatus.security.lastSecurityScan}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Vulnerabilities:</span>
                <Badge
                  variant={
                    systemStatus.security.vulnerabilities === 0
                      ? "default"
                      : "destructive"
                  }
                >
                  {systemStatus.security.vulnerabilities}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>SSL Status:</span>
                <Badge variant="default">Valid</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" />
              General Settings
            </CardTitle>
            <CardDescription>
              Basic system configuration and operational settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="systemName">System Name</Label>
                <Input
                  id="systemName"
                  value={config.general.systemName}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      general: { ...prev.general, systemName: e.target.value },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Environment</Label>
                <Select
                  value={config.general.environment}
                  onValueChange={(value) =>
                    setConfig((prev) => ({
                      ...prev,
                      general: { ...prev.general, environment: value },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="staging">Staging</SelectItem>
                    <SelectItem value="production">Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Log Level</Label>
                <Select
                  value={config.general.logLevel}
                  onValueChange={(value) =>
                    setConfig((prev) => ({
                      ...prev,
                      general: { ...prev.general, logLevel: value },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debug">Debug</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">
                  Session Timeout (minutes)
                </Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={config.general.sessionTimeout}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      general: {
                        ...prev.general,
                        sessionTimeout: parseInt(e.target.value) || 30,
                      },
                    }))
                  }
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-slate-600">
                    Enable to prevent user access during updates
                  </p>
                </div>
                <Switch
                  checked={config.general.maintenanceMode}
                  onCheckedChange={(checked) =>
                    setConfig((prev) => ({
                      ...prev,
                      general: { ...prev.general, maintenanceMode: checked },
                    }))
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Debug Mode</Label>
                  <p className="text-sm text-slate-600">
                    Enable detailed logging and error reporting
                  </p>
                </div>
                <Switch
                  checked={config.general.debugMode}
                  onCheckedChange={(checked) =>
                    setConfig((prev) => ({
                      ...prev,
                      general: { ...prev.general, debugMode: checked },
                    }))
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Database Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-green-600" />
              Database Configuration
            </CardTitle>
            <CardDescription>
              Database connection and performance settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dbHost">Host</Label>
                <Input
                  id="dbHost"
                  value={config.database.host}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      database: { ...prev.database, host: e.target.value },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dbPort">Port</Label>
                <Input
                  id="dbPort"
                  type="number"
                  value={config.database.port}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      database: {
                        ...prev.database,
                        port: parseInt(e.target.value) || 5432,
                      },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dbName">Database Name</Label>
                <Input
                  id="dbName"
                  value={config.database.name}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      database: { ...prev.database, name: e.target.value },
                    }))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="connectionPool">Connection Pool Size</Label>
                <Input
                  id="connectionPool"
                  type="number"
                  value={config.database.connectionPool}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      database: {
                        ...prev.database,
                        connectionPool: parseInt(e.target.value) || 20,
                      },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Backup Frequency</Label>
                <Select
                  value={config.database.backupFrequency}
                  onValueChange={(value) =>
                    setConfig((prev) => ({
                      ...prev,
                      database: { ...prev.database, backupFrequency: value },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-600" />
              Security Configuration
            </CardTitle>
            <CardDescription>
              Security policies and authentication settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Password Policy */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Key className="h-4 w-4" />
                Password Policy
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minLength">Minimum Length</Label>
                  <Input
                    id="minLength"
                    type="number"
                    value={config.security.passwordPolicy.minLength}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        security: {
                          ...prev.security,
                          passwordPolicy: {
                            ...prev.security.passwordPolicy,
                            minLength: parseInt(e.target.value) || 8,
                          },
                        },
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expirationDays">Expiration (days)</Label>
                  <Input
                    id="expirationDays"
                    type="number"
                    value={config.security.passwordPolicy.expirationDays}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        security: {
                          ...prev.security,
                          passwordPolicy: {
                            ...prev.security.passwordPolicy,
                            expirationDays: parseInt(e.target.value) || 90,
                          },
                        },
                      }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Require Uppercase Letters</Label>
                  <Switch
                    checked={config.security.passwordPolicy.requireUppercase}
                    onCheckedChange={(checked) =>
                      setConfig((prev) => ({
                        ...prev,
                        security: {
                          ...prev.security,
                          passwordPolicy: {
                            ...prev.security.passwordPolicy,
                            requireUppercase: checked,
                          },
                        },
                      }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Require Numbers</Label>
                  <Switch
                    checked={config.security.passwordPolicy.requireNumbers}
                    onCheckedChange={(checked) =>
                      setConfig((prev) => ({
                        ...prev,
                        security: {
                          ...prev.security,
                          passwordPolicy: {
                            ...prev.security.passwordPolicy,
                            requireNumbers: checked,
                          },
                        },
                      }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Require Special Characters</Label>
                  <Switch
                    checked={config.security.passwordPolicy.requireSpecialChars}
                    onCheckedChange={(checked) =>
                      setConfig((prev) => ({
                        ...prev,
                        security: {
                          ...prev.security,
                          passwordPolicy: {
                            ...prev.security.passwordPolicy,
                            requireSpecialChars: checked,
                          },
                        },
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Authentication Settings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-slate-600">
                    Require 2FA for all users
                  </p>
                </div>
                <Switch
                  checked={config.security.twoFactorAuth}
                  onCheckedChange={(checked) =>
                    setConfig((prev) => ({
                      ...prev,
                      security: { ...prev.security, twoFactorAuth: checked },
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ipWhitelist">IP Whitelist</Label>
                <Textarea
                  id="ipWhitelist"
                  value={config.security.ipWhitelist}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      security: {
                        ...prev.security,
                        ipWhitelist: e.target.value,
                      },
                    }))
                  }
                  placeholder="Enter IP addresses, one per line"
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Rate Limiting</Label>
                  <p className="text-sm text-slate-600">
                    Limit API requests per minute
                  </p>
                </div>
                <Switch
                  checked={config.security.rateLimiting.enabled}
                  onCheckedChange={(checked) =>
                    setConfig((prev) => ({
                      ...prev,
                      security: {
                        ...prev.security,
                        rateLimiting: {
                          ...prev.security.rateLimiting,
                          enabled: checked,
                        },
                      },
                    }))
                  }
                />
              </div>

              {config.security.rateLimiting.enabled && (
                <div className="space-y-2">
                  <Label htmlFor="requestsPerMinute">Requests per Minute</Label>
                  <Input
                    id="requestsPerMinute"
                    type="number"
                    value={config.security.rateLimiting.requestsPerMinute}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        security: {
                          ...prev.security,
                          rateLimiting: {
                            ...prev.security.rateLimiting,
                            requestsPerMinute: parseInt(e.target.value) || 100,
                          },
                        },
                      }))
                    }
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Backup Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-purple-600" />
              Backup Configuration
            </CardTitle>
            <CardDescription>
              Automated backup settings and data retention policies
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Automated Backups</Label>
                <p className="text-sm text-slate-600">
                  Automatically backup system data
                </p>
              </div>
              <Switch
                checked={config.backup.enabled}
                onCheckedChange={(checked) =>
                  setConfig((prev) => ({
                    ...prev,
                    backup: { ...prev.backup, enabled: checked },
                  }))
                }
              />
            </div>

            {config.backup.enabled && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Backup Frequency</Label>
                    <Select
                      value={config.backup.frequency}
                      onValueChange={(value) =>
                        setConfig((prev) => ({
                          ...prev,
                          backup: { ...prev.backup, frequency: value },
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="retention">Retention Period (days)</Label>
                    <Input
                      id="retention"
                      type="number"
                      value={config.backup.retention}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          backup: {
                            ...prev.backup,
                            retention: parseInt(e.target.value) || 30,
                          },
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Backup Location</Label>
                  <Select
                    value={config.backup.location}
                    onValueChange={(value) =>
                      setConfig((prev) => ({
                        ...prev,
                        backup: { ...prev.backup, location: value },
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Local Storage</SelectItem>
                      <SelectItem value="cloud">Cloud Storage</SelectItem>
                      <SelectItem value="both">Both Local and Cloud</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* System Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-orange-600" />
              System Actions
            </CardTitle>
            <CardDescription>
              Perform system maintenance and diagnostic operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={handleSecurityScan}
                variant="outline"
                className="h-20 flex-col"
              >
                <Shield className="h-6 w-6 mb-2" />
                Run Security Scan
              </Button>
              <Button
                onClick={handleBackup}
                variant="outline"
                className="h-20 flex-col"
              >
                <Download className="h-6 w-6 mb-2" />
                Manual Backup
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Upload className="h-6 w-6 mb-2" />
                System Restore
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Alerts */}
        {config.general.maintenanceMode && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Maintenance mode is currently enabled. Users will not be able to
              access the system.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default SystemConfig;
