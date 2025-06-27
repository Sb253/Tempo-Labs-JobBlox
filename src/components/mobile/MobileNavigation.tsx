import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Home,
  Briefcase,
  Users,
  Calendar,
  FileText,
  BarChart3,
  MessageSquare,
  Settings,
  Bell,
  Search,
  Plus,
  Menu,
  Building2,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface MobileNavigationProps {
  className?: string;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ className }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, tenant } = useAuth();

  const navigationItems = [
    {
      icon: <Home className="h-5 w-5" />,
      label: "Dashboard",
      path: "/dashboard",
      badge: null,
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      label: "Projects",
      path: "/jobs",
      badge: "12",
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Customers",
      path: "/customers",
      badge: null,
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Schedule",
      path: "/scheduling",
      badge: "3",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Estimates",
      path: "/estimates",
      badge: null,
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      label: "Reports",
      path: "/reports",
      badge: null,
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: "Messages",
      path: "/team-chat",
      badge: "5",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      path: "/user-management",
      badge: null,
    },
  ];

  const quickActions = [
    {
      icon: <Plus className="h-4 w-4" />,
      label: "New Project",
      action: () => navigate("/job-form"),
      color: "bg-blue-500",
    },
    {
      icon: <Users className="h-4 w-4" />,
      label: "Add Client",
      action: () => navigate("/customer-intake"),
      color: "bg-green-500",
    },
    {
      icon: <FileText className="h-4 w-4" />,
      label: "Create Estimate",
      action: () => navigate("/estimates"),
      color: "bg-purple-500",
    },
    {
      icon: <Calendar className="h-4 w-4" />,
      label: "Schedule Task",
      action: () => navigate("/scheduling"),
      color: "bg-orange-500",
    },
  ];

  const isActivePath = (path: string) => {
    const currentPath = location.pathname;
    const tenantPath = tenant ? `/${tenant.tenantId}${path}` : path;
    return (
      currentPath === tenantPath || currentPath.startsWith(tenantPath + "/")
    );
  };

  const handleNavigation = (path: string) => {
    const fullPath = tenant ? `/${tenant.tenantId}${path}` : path;
    navigate(fullPath);
  };

  return (
    <>
      {/* Mobile Header */}
      <header
        className={cn(
          "sticky top-0 z-50 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-3 lg:hidden",
          className,
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <div className="flex flex-col h-full">
                  <SheetHeader className="p-6 border-b">
                    <SheetTitle className="flex items-center space-x-2">
                      <Building2 className="h-6 w-6 text-blue-500" />
                      <span>JobBlox</span>
                    </SheetTitle>
                    <SheetDescription>
                      {tenant?.tenantName || "Construction Management Platform"}
                    </SheetDescription>
                  </SheetHeader>

                  {/* User Info */}
                  <div className="p-4 border-b bg-slate-50 dark:bg-slate-800">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {user?.name?.charAt(0) || "U"}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {user?.name || "User"}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {user?.role || "Member"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="p-4 border-b">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                      Quick Actions
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {quickActions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="h-12 flex-col space-y-1 hover:bg-slate-50 dark:hover:bg-slate-800"
                          onClick={action.action}
                        >
                          <div
                            className={`p-1.5 ${action.color} rounded text-white`}
                          >
                            {action.icon}
                          </div>
                          <span className="text-xs">{action.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Navigation */}
                  <nav className="flex-1 p-4 space-y-1">
                    {navigationItems.map((item, index) => {
                      const isActive = isActivePath(item.path);
                      return (
                        <Button
                          key={index}
                          variant={isActive ? "default" : "ghost"}
                          className={cn(
                            "w-full justify-start h-12",
                            isActive
                              ? "bg-blue-500 text-white hover:bg-blue-600"
                              : "hover:bg-slate-100 dark:hover:bg-slate-800",
                          )}
                          onClick={() => handleNavigation(item.path)}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center space-x-3">
                              {item.icon}
                              <span>{item.label}</span>
                            </div>
                            {item.badge && (
                              <Badge
                                variant={isActive ? "secondary" : "outline"}
                                className={cn(
                                  "text-xs",
                                  isActive ? "bg-white/20 text-white" : "",
                                )}
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                        </Button>
                      );
                    })}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-blue-500" />
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                JobBlox
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>
          </div>
        </div>
      </header>

      {/* Bottom Navigation for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 lg:hidden">
        <div className="grid grid-cols-5 h-16">
          {navigationItems.slice(0, 5).map((item, index) => {
            const isActive = isActivePath(item.path);
            return (
              <Button
                key={index}
                variant="ghost"
                className={cn(
                  "h-full rounded-none flex-col space-y-1 relative",
                  isActive
                    ? "text-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white",
                )}
                onClick={() => handleNavigation(item.path)}
              >
                <div className="relative">
                  {item.icon}
                  {item.badge && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs flex items-center justify-center"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
                {isActive && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-500 rounded-b"></div>
                )}
              </Button>
            );
          })}
        </div>
      </nav>

      {/* Floating Action Button */}
      <Button
        className="fixed bottom-20 right-4 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg lg:hidden"
        onClick={() => navigate("/job-form")}
      >
        <Plus className="h-6 w-6" />
      </Button>
    </>
  );
};

export default MobileNavigation;
