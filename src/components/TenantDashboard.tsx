import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  Users,
  Calendar,
  FileText,
  DollarSign,
  Settings,
  LogOut,
  Home,
  Briefcase,
  Receipt,
  CreditCard,
  UserCheck,
  BarChart3,
} from "lucide-react";

const TenantDashboard: React.FC = () => {
  const { user, tenant, logout } = useAuth();
  const { tenantId } = useParams<{ tenantId: string }>();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navigationItems = [
    { path: "dashboard", label: "Dashboard", icon: Home },
    { path: "customers", label: "Customers", icon: Users },
    { path: "jobs", label: "Jobs", icon: Briefcase },
    { path: "estimates", label: "Estimates", icon: FileText },
    { path: "invoices", label: "Invoices", icon: Receipt },
    { path: "payments", label: "Payments", icon: CreditCard },
    { path: "employees", label: "Employees", icon: UserCheck },
    { path: "reports", label: "Reports", icon: BarChart3 },
    { path: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-3 lg:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Building2 className="h-6 w-6 text-blue-500" />
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                {tenant?.tenantName || "JobBlox"}
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden lg:block bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Building2 className="h-8 w-8 text-blue-500" />
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                {tenant?.tenantName || "JobBlox"}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Tenant ID: {tenantId}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-600 dark:text-slate-300">
              Welcome, {user?.name || user?.email}
            </span>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <nav className="hidden lg:block w-64 bg-white dark:bg-slate-800 min-h-screen border-r border-slate-200 dark:border-slate-700 p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={`/${tenantId}/${item.path}`}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
              Dashboard
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Welcome to your construction management dashboard
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Active Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  12
                </div>
                <p className="text-xs text-green-600 dark:text-green-400">
                  +2 from last month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Total Customers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  48
                </div>
                <p className="text-xs text-green-600 dark:text-green-400">
                  +5 from last month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Pending Invoices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  $24,500
                </div>
                <p className="text-xs text-yellow-600 dark:text-yellow-400">
                  3 overdue
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  This Month Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  $89,200
                </div>
                <p className="text-xs text-green-600 dark:text-green-400">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-slate-700 dark:text-slate-300 text-sm">
                    New project "Downtown Office Renovation" created
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 ml-auto">
                    2 hours ago
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-slate-700 dark:text-slate-300 text-sm">
                    Invoice #INV-2024-001 sent to ABC Construction
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 ml-auto">
                    4 hours ago
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-slate-700 dark:text-slate-300 text-sm">
                    Payment received from XYZ Developers
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 ml-auto">
                    1 day ago
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mobile Bottom Navigation Spacer */}
          <div className="h-20 lg:hidden"></div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 lg:hidden">
        <div className="grid grid-cols-5 h-16">
          {navigationItems.slice(0, 5).map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={`/${tenantId}/${item.path}`}
                className="flex flex-col items-center justify-center space-y-1 text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors touch-manipulation"
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Floating Action Button */}
      <Link
        to={`/${tenantId}/job-form`}
        className="fixed bottom-20 right-4 z-40 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white lg:hidden touch-manipulation"
      >
        <Plus className="h-6 w-6" />
      </Link>
    </div>
  );
};

export default TenantDashboard;
