import React, { useState, useEffect } from "react";
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
  X,
  ChevronRight,
  Zap,
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
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);

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
          "sticky top-0 z-50 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 px-4 py-3 lg:hidden shadow-sm",
          className,
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="touch-manipulation p-2"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-80 p-0 bg-white dark:bg-slate-900"
              >
                <div className="flex flex-col h-full">
                  <SheetHeader className="p-6 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                      <SheetTitle className="flex items-center space-x-2">
                        <Building2 className="h-6 w-6 text-blue-500" />
                        <span>JobBlox</span>
                      </SheetTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsSheetOpen(false)}
                        className="touch-manipulation p-1"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                    <SheetDescription className="text-left">
                      {tenant?.tenantName || "Construction Management Platform"}
                    </SheetDescription>
                  </SheetHeader>

                  {/* User Info */}
                  <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-slate-200 dark:border-slate-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                        {user?.name?.charAt(0) || "U"}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900 dark:text-white">
                          {user?.name || "User"}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                          {user?.role || "Member"}
                        </p>
                        <div className="flex items-center mt-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-xs text-green-600 dark:text-green-400">
                            Online
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="touch-manipulation"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                        Quick Actions
                      </h3>
                      <Badge variant="secondary" className="text-xs">
                        <Zap className="w-3 h-3 mr-1" />
                        Fast
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {quickActions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="h-14 flex-col space-y-1 hover:bg-slate-50 dark:hover:bg-slate-800 touch-manipulation transition-all duration-200 hover:scale-105"
                          onClick={() => {
                            action.action();
                            setIsSheetOpen(false);
                          }}
                        >
                          <div
                            className={`p-2 ${action.color} rounded-lg text-white shadow-sm`}
                          >
                            {action.icon}
                          </div>
                          <span className="text-xs font-medium">
                            {action.label}
                          </span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Navigation */}
                  <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                      Navigation
                    </h3>
                    {navigationItems.map((item, index) => {
                      const isActive = isActivePath(item.path);
                      return (
                        <Button
                          key={index}
                          variant={isActive ? "default" : "ghost"}
                          className={cn(
                            "w-full justify-start h-12 touch-manipulation transition-all duration-200",
                            isActive
                              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-md"
                              : "hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105",
                          )}
                          onClick={() => {
                            handleNavigation(item.path);
                            setIsSheetOpen(false);
                          }}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center space-x-3">
                              {item.icon}
                              <span className="font-medium">{item.label}</span>
                            </div>
                            {item.badge && (
                              <Badge
                                variant={isActive ? "secondary" : "outline"}
                                className={cn(
                                  "text-xs font-semibold",
                                  isActive
                                    ? "bg-white/20 text-white border-white/30"
                                    : "bg-red-100 text-red-800 border-red-200",
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
            <Button
              variant="ghost"
              size="sm"
              className="touch-manipulation p-2"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="relative touch-manipulation p-2"
            >
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">
                    {notifications}
                  </span>
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Bottom Navigation for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-700 lg:hidden shadow-lg">
        <div className="grid grid-cols-5 h-16 px-2">
          {navigationItems.slice(0, 5).map((item, index) => {
            const isActive = isActivePath(item.path);
            return (
              <Button
                key={index}
                variant="ghost"
                className={cn(
                  "h-full rounded-lg mx-1 flex-col space-y-1 relative touch-manipulation transition-all duration-200",
                  isActive
                    ? "text-blue-500 bg-blue-50 dark:bg-blue-900/30 scale-105"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700",
                )}
                onClick={() => handleNavigation(item.path)}
              >
                <div className="relative">
                  {React.cloneElement(item.icon, {
                    className: cn(
                      "h-5 w-5 transition-transform duration-200",
                      isActive && "scale-110",
                    ),
                  })}
                  {item.badge && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs flex items-center justify-center animate-pulse"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium transition-all duration-200",
                    isActive ? "font-semibold" : "",
                  )}
                >
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                )}
              </Button>
            );
          })}
        </div>
      </nav>

      {/* Floating Action Button */}
      <Button
        className="fixed bottom-20 right-4 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-xl hover:shadow-2xl lg:hidden touch-manipulation transition-all duration-300 hover:scale-110 active:scale-95"
        onClick={() => navigate("/job-form")}
      >
        <Plus className="h-6 w-6" />
      </Button>
    </>
  );
};

export default MobileNavigation;
