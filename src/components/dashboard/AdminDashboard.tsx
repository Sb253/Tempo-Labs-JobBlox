import React, { useState } from "react";
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
import {
  Shield,
  Users,
  Settings,
  Database,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Server,
  Lock,
  Key,
  Bell,
  FileText,
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user, tenant } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const systemMetrics = [
    {
      title: "Active Users",
      value: "142",
      change: "+8.2%",
      icon: <Users className="h-6 w-6" />,
      color: "bg-blue-500",
    },
    {
      title: "System Uptime",
      value: "99.9%",
      change: "Stable",
      icon: <Server className="h-6 w-6" />,
      color: "bg-green-500",
    },
    {
      title: "Security Alerts",
      value: "3",
      change: "-2 today",
      icon: <Shield className="h-6 w-6" />,
      color: "bg-orange-500",
    },
    {
      title: "Data Usage",
      value: "2.4TB",
      change: "+12.5%",
      icon: <Database className="h-6 w-6" />,
      color: "bg-purple-500",
    },
  ];

  const recentUsers = [
    {
      id: 1,
      name: "John Smith",
      email: "john@company.com",
      role: "Manager",
      status: "Active",
      lastLogin: "2 hours ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah@company.com",
      role: "Field Worker",
      status: "Active",
      lastLogin: "5 minutes ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@company.com",
      role: "Sales Rep",
      status: "Inactive",
      lastLogin: "2 days ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    },
  ];

  const systemAlerts = [
    {
      id: 1,
      type: "warning",
      title: "High CPU Usage",
      message: "Server CPU usage is at 85%. Consider scaling resources.",
      time: "10 minutes ago",
      severity: "medium",
    },
    {
      id: 2,
      type: "info",
      title: "Backup Completed",
      message: "Daily backup completed successfully at 2:00 AM.",
      time: "6 hours ago",
      severity: "low",
    },
    {
      id: 3,
      type: "error",
      title: "Failed Login Attempts",
      message: "Multiple failed login attempts detected from IP 192.168.1.100.",
      time: "1 hour ago",
      severity: "high",
    },
  ];

  const permissions = [
    {
      module: "User Management",
      description: "Create, edit, and delete user accounts",
      enabled: true,
    },
    {
      module: "System Configuration",
      description: "Modify system settings and configurations",
      enabled: true,
    },
    {
      module: "Security Settings",
      description: "Manage security policies and access controls",
      enabled: true,
    },
    {
      module: "Data Export",
      description: "Export system data and generate reports",
      enabled: false,
    },
    {
      module: "API Management",
      description: "Manage API keys and integrations",
      enabled: true,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "manager":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "field worker":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "sales rep":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "info":
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl text-white">
              <Shield className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                System administration and user management
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => navigate("/user-management")}
              className="touch-manipulation"
            >
              <Users className="mr-2 h-4 w-4" />
              Manage Users
            </Button>
            <Button
              onClick={() => navigate("/admin/settings")}
              className="touch-manipulation"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemMetrics.map((metric, index) => (
            <Card
              key={index}
              className="border-slate-200 dark:border-slate-700"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 ${metric.color} rounded-lg text-white`}>
                    {metric.icon}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {metric.change}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {metric.title}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Users */}
              <Card className="border-slate-200 dark:border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Users</CardTitle>
                    <CardDescription>
                      Latest user activity and registrations
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab("users")}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="font-medium text-slate-900 dark:text-white">
                            {user.name}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            {user.email}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getRoleColor(user.role)}>
                          {user.role}
                        </Badge>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* System Alerts */}
              <Card className="border-slate-200 dark:border-slate-700">
                <CardHeader>
                  <CardTitle>System Alerts</CardTitle>
                  <CardDescription>
                    Recent system notifications and alerts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {systemAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-start space-x-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg"
                    >
                      <div className="flex-shrink-0 mt-1">
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-slate-900 dark:text-white">
                            {alert.title}
                          </h4>
                          <span className="text-xs text-slate-500">
                            {alert.time}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {alert.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="border-slate-200 dark:border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Manage user accounts, roles, and permissions
                  </CardDescription>
                </div>
                <Button onClick={() => navigate("/user-management")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white">
                            {user.name}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            {user.email}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            Last login: {user.lastLogin}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col items-end space-y-2">
                          <Badge className={getRoleColor(user.role)}>
                            {user.role}
                          </Badge>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Security Status */}
              <Card className="border-slate-200 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lock className="h-5 w-5" />
                    <span>Security Status</span>
                  </CardTitle>
                  <CardDescription>
                    Current security configuration and status
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-medium text-green-900 dark:text-green-100">
                          SSL Certificate
                        </div>
                        <div className="text-sm text-green-700 dark:text-green-300">
                          Valid until Dec 2024
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-medium text-green-900 dark:text-green-100">
                          Two-Factor Authentication
                        </div>
                        <div className="text-sm text-green-700 dark:text-green-300">
                          Enabled for all admin users
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      <div>
                        <div className="font-medium text-yellow-900 dark:text-yellow-100">
                          Password Policy
                        </div>
                        <div className="text-sm text-yellow-700 dark:text-yellow-300">
                          3 users with weak passwords
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Admin Permissions */}
              <Card className="border-slate-200 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Key className="h-5 w-5" />
                    <span>Admin Permissions</span>
                  </CardTitle>
                  <CardDescription>
                    Your current administrative permissions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {permissions.map((permission, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">
                          {permission.module}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          {permission.description}
                        </div>
                      </div>
                      <Badge
                        className={`${
                          permission.enabled
                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
                        }`}
                      >
                        {permission.enabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Health */}
              <Card className="border-slate-200 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>System Health</span>
                  </CardTitle>
                  <CardDescription>
                    Current system performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>CPU Usage</span>
                        <span className="font-medium">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Memory Usage</span>
                        <span className="font-medium">62%</span>
                      </div>
                      <Progress value={62} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Storage Usage</span>
                        <span className="font-medium">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Network I/O</span>
                        <span className="font-medium">23%</span>
                      </div>
                      <Progress value={23} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Database Status */}
              <Card className="border-slate-200 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="h-5 w-5" />
                    <span>Database Status</span>
                  </CardTitle>
                  <CardDescription>
                    Database performance and statistics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        2.4TB
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Total Size
                      </div>
                    </div>
                    <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        45,231
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Total Records
                      </div>
                    </div>
                    <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        12ms
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Avg Query Time
                      </div>
                    </div>
                    <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        99.9%
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Uptime
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
