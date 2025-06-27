import React, { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Settings,
  Users,
  Shield,
  Database,
  Bell,
  Mail,
  Globe,
  Lock,
  Key,
  Server,
  Activity,
  AlertTriangle,
  CheckCircle,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRole } from "@/contexts/RoleContext";
import { useNavigate } from "react-router-dom";

const AdminSettings = () => {
  const { user } = useAuth();
  const { validateRoleAccess } = useRole();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("general");
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  // Mock data
  const systemUsers = [
    {
      id: "1",
      name: "John Admin",
      email: "john@company.com",
      role: "admin",
      status: "active",
      lastLogin: "2024-01-28 10:30 AM",
      permissions: ["manage_users", "system_config", "view_reports"],
    },
    {
      id: "2",
      name: "Sarah Manager",
      email: "sarah@company.com",
      role: "manager",
      status: "active",
      lastLogin: "2024-01-28 09:15 AM",
      permissions: ["view_projects", "manage_team", "client_communication"],
    },
    {
      id: "3",
      name: "Mike Worker",
      email: "mike@company.com",
      role: "worker",
      status: "inactive",
      lastLogin: "2024-01-27 04:45 PM",
      permissions: ["view_tasks", "update_status", "upload_files"],
    },
  ];

  const systemSettings = {
    companyName: "JobBlox Construction",
    timezone: "America/New_York",
    currency: "USD",
    language: "en",
    dateFormat: "MM/DD/YYYY",
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false,
    apiKey: "jb_live_sk_1234567890abcdef",
    webhookUrl: "https://api.company.com/webhooks/jobblox",
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      admin: { color: "bg-red-500", label: "Admin" },
      manager: { color: "bg-blue-500", label: "Manager" },
      worker: { color: "bg-green-500", label: "Worker" },
    };
    const config = roleConfig[role as keyof typeof roleConfig];
    return (
      <Badge className={`${config.color} text-white`}>{config.label}</Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
        <CheckCircle className="mr-1 h-3 w-3" />
        Active
      </Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">
        <AlertTriangle className="mr-1 h-3 w-3" />
        Inactive
      </Badge>
    );
  };

  // Check if user has admin access
  if (!validateRoleAccess("admin")) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
        <Card className="max-w-md border-slate-200 dark:border-slate-700">
          <CardContent className="p-6 text-center">
            <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Access Denied
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              You don't have permission to access admin settings.
            </p>
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="touch-manipulation"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-3 lg:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="touch-manipulation"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                Admin Settings
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Desktop Header */}
          <Card className="hidden lg:block border-slate-200 dark:border-slate-700">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg text-white">
                  <Settings className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                    Admin Settings
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Manage system configuration, users, and security settings
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Settings Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-2 shadow-lg border border-slate-200 dark:border-slate-700">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 bg-slate-100 dark:bg-slate-700">
                <TabsTrigger
                  value="general"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">General</span>
                </TabsTrigger>
                <TabsTrigger
                  value="users"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600"
                >
                  <Users className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Users</span>
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Security</span>
                </TabsTrigger>
                <TabsTrigger
                  value="integrations"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600"
                >
                  <Globe className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">API</span>
                </TabsTrigger>
                <TabsTrigger
                  value="system"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600"
                >
                  <Server className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">System</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* General Settings */}
            <TabsContent value="general" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
                      Company Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        defaultValue={systemSettings.companyName}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select defaultValue={systemSettings.timezone}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="America/New_York">
                              Eastern Time
                            </SelectItem>
                            <SelectItem value="America/Chicago">
                              Central Time
                            </SelectItem>
                            <SelectItem value="America/Denver">
                              Mountain Time
                            </SelectItem>
                            <SelectItem value="America/Los_Angeles">
                              Pacific Time
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currency">Currency</Label>
                        <Select defaultValue={systemSettings.currency}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD ($)</SelectItem>
                            <SelectItem value="EUR">EUR (€)</SelectItem>
                            <SelectItem value="GBP">GBP (£)</SelectItem>
                            <SelectItem value="CAD">CAD (C$)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button className="w-full touch-manipulation">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
                      Notification Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                        <span className="text-sm font-medium">
                          Email Notifications
                        </span>
                      </div>
                      <Badge
                        className={`${
                          systemSettings.emailNotifications
                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
                        }`}
                      >
                        {systemSettings.emailNotifications
                          ? "Enabled"
                          : "Disabled"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bell className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                        <span className="text-sm font-medium">
                          SMS Notifications
                        </span>
                      </div>
                      <Badge
                        className={`${
                          systemSettings.smsNotifications
                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
                        }`}
                      >
                        {systemSettings.smsNotifications
                          ? "Enabled"
                          : "Disabled"}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full touch-manipulation"
                    >
                      Configure Notifications
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* User Management */}
            <TabsContent value="users" className="space-y-6">
              <Card className="border-slate-200 dark:border-slate-700">
                <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                  <div>
                    <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
                      System Users
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">
                      Manage user accounts and permissions
                    </CardDescription>
                  </div>
                  <Dialog
                    open={isAddUserDialogOpen}
                    onOpenChange={setIsAddUserDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button className="touch-manipulation">
                        <Plus className="mr-2 h-4 w-4" />
                        Add User
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md mx-4">
                      <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription>
                          Create a new user account with appropriate
                          permissions.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="userName">Full Name</Label>
                            <Input
                              id="userName"
                              placeholder="Enter full name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="userEmail">Email</Label>
                            <Input
                              id="userEmail"
                              type="email"
                              placeholder="Enter email"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="userRole">Role</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="manager">Manager</SelectItem>
                              <SelectItem value="worker">Worker</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter className="flex-col sm:flex-row gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsAddUserDialogOpen(false)}
                          className="w-full sm:w-auto touch-manipulation"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => setIsAddUserDialogOpen(false)}
                          className="w-full sm:w-auto touch-manipulation"
                        >
                          Create User
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="hidden lg:table-cell">
                            Last Login
                          </TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {systemUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium text-slate-900 dark:text-white">
                                  {user.name}
                                </p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                  {user.email}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>{getRoleBadge(user.role)}</TableCell>
                            <TableCell>{getStatusBadge(user.status)}</TableCell>
                            <TableCell className="hidden lg:table-cell text-sm text-slate-600 dark:text-slate-400">
                              {user.lastLogin}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="touch-manipulation"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="touch-manipulation"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white flex items-center">
                      <Lock className="mr-2 h-5 w-5" />
                      Security Policies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Password Requirements</Label>
                      <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <p>• Minimum 8 characters</p>
                        <p>• At least one uppercase letter</p>
                        <p>• At least one number</p>
                        <p>• At least one special character</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Session Timeout</Label>
                      <Select defaultValue="24">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 hour</SelectItem>
                          <SelectItem value="8">8 hours</SelectItem>
                          <SelectItem value="24">24 hours</SelectItem>
                          <SelectItem value="168">7 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full touch-manipulation">
                      Update Security Settings
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white flex items-center">
                      <Activity className="mr-2 h-5 w-5" />
                      System Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Maintenance Mode
                      </span>
                      <Badge
                        className={`${
                          systemSettings.maintenanceMode
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                            : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                        }`}
                      >
                        {systemSettings.maintenanceMode
                          ? "Enabled"
                          : "Disabled"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">System Health</span>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Healthy
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Last Backup</span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        2 hours ago
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full touch-manipulation"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Run System Check
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* API & Integrations */}
            <TabsContent value="integrations" className="space-y-6">
              <Card className="border-slate-200 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white flex items-center">
                    <Key className="mr-2 h-5 w-5" />
                    API Configuration
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Manage API keys and webhook endpoints
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">API Key</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="apiKey"
                        type={showApiKey ? "text" : "password"}
                        value={systemSettings.apiKey}
                        readOnly
                        className="font-mono flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="touch-manipulation"
                      >
                        {showApiKey ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="webhookUrl">Webhook URL</Label>
                    <Input
                      id="webhookUrl"
                      defaultValue={systemSettings.webhookUrl}
                      placeholder="https://your-domain.com/webhooks/jobblox"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <Button className="flex-1 touch-manipulation">
                      <Save className="mr-2 h-4 w-4" />
                      Save Configuration
                    </Button>
                    <Button variant="outline" className="touch-manipulation">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Regenerate Key
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* System Settings */}
            <TabsContent value="system" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white flex items-center">
                      <Database className="mr-2 h-5 w-5" />
                      Database Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Database Size</span>
                        <span className="font-medium">2.4 GB</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Total Records</span>
                        <span className="font-medium">45,231</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Last Optimization</span>
                        <span className="font-medium">Yesterday</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full touch-manipulation"
                      >
                        <Database className="mr-2 h-4 w-4" />
                        Backup Database
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full touch-manipulation"
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Optimize Database
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white flex items-center">
                      <Server className="mr-2 h-5 w-5" />
                      System Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>CPU Usage</span>
                          <span className="font-medium">45%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: "45%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Memory Usage</span>
                          <span className="font-medium">62%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: "62%" }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Storage Usage</span>
                          <span className="font-medium">78%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: "78%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full touch-manipulation"
                    >
                      <Activity className="mr-2 h-4 w-4" />
                      View Detailed Metrics
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Mobile Bottom Spacer */}
        <div className="h-20 lg:hidden"></div>
      </div>
    </div>
  );
};

export default AdminSettings;
