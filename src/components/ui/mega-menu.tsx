import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  X,
  Home,
  Users,
  Briefcase,
  DollarSign,
  UserCheck,
  Package,
  Truck,
  MapPin,
  BarChart3,
  MessageSquare,
  Bot,
  Zap,
  Settings,
  Building2,
  Calendar,
  FileText,
  Camera,
  Shield,
  CheckCircle,
  TrendingUp,
  CreditCard,
  Target,
  Calculator,
  PieChart,
  Banknote,
  BookOpen,
  Wrench,
  Car,
  Navigation,
  Map,
  Activity,
  Phone,
  Sparkles,
  FileImage,
  Brain,
  Link,
  User,
  Cog,
  Archive,
  Smartphone,
  GitBranch,
} from "lucide-react";

interface MegaMenuProps {
  isAdmin?: boolean;
}

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  path: string;
  description?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const MegaMenu: React.FC<MegaMenuProps> = ({ isAdmin = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { tenantId } = useParams<{ tenantId: string }>();
  const { user, logout } = useAuth();

  const handleNavigation = (path: string) => {
    if (isAdmin) {
      navigate(`/admin${path}`);
    } else {
      navigate(`/${tenantId}${path}`);
    }
    setIsOpen(false);
  };

  const tenantMenuSections: MenuSection[] = [
    {
      title: "Dashboard & Overview",
      items: [
        {
          title: "Dashboard",
          icon: <Home className="h-4 w-4" />,
          path: "/dashboard",
          description: "Main dashboard overview",
        },
        {
          title: "KPIs",
          icon: <TrendingUp className="h-4 w-4" />,
          path: "/kpis",
          description: "Key performance indicators",
        },
        {
          title: "Quick Actions",
          icon: <Zap className="h-4 w-4" />,
          path: "/quick-actions",
          description: "Frequently used actions",
        },
      ],
    },
    {
      title: "Customer Management",
      items: [
        {
          title: "Customers",
          icon: <Users className="h-4 w-4" />,
          path: "/customers",
          description: "Manage customer database",
        },
        {
          title: "Customer Profile",
          icon: <User className="h-4 w-4" />,
          path: "/customer-profile",
          description: "View customer details",
        },
        {
          title: "Customer Intake",
          icon: <FileText className="h-4 w-4" />,
          path: "/customer-intake",
          description: "New customer onboarding",
        },
        {
          title: "Pipeline",
          icon: <TrendingUp className="h-4 w-4" />,
          path: "/pipeline",
          description: "Sales pipeline management",
        },
        {
          title: "Appointments",
          icon: <Calendar className="h-4 w-4" />,
          path: "/client-appointment",
          description: "Schedule client meetings",
        },
        {
          title: "Reviews",
          icon: <MessageSquare className="h-4 w-4" />,
          path: "/reviews",
          description: "Customer feedback",
        },
      ],
    },
    {
      title: "Job Management",
      items: [
        {
          title: "Jobs",
          icon: <Briefcase className="h-4 w-4" />,
          path: "/jobs",
          description: "Manage all jobs",
        },
        {
          title: "Job Details",
          icon: <FileText className="h-4 w-4" />,
          path: "/job-detail",
          description: "View job information",
        },
        {
          title: "Create Job",
          icon: <Briefcase className="h-4 w-4" />,
          path: "/job-form",
          description: "Add new job",
        },
        {
          title: "Scheduling",
          icon: <Calendar className="h-4 w-4" />,
          path: "/scheduling",
          description: "Schedule jobs and resources",
        },
        {
          title: "Time Tracking",
          icon: <Activity className="h-4 w-4" />,
          path: "/time-tracking",
          description: "Track work hours",
        },
        {
          title: "Photos",
          icon: <Camera className="h-4 w-4" />,
          path: "/photos",
          description: "Job site photos",
        },
        {
          title: "Safety",
          icon: <Shield className="h-4 w-4" />,
          path: "/safety",
          description: "Safety protocols",
        },
        {
          title: "Quality Control",
          icon: <CheckCircle className="h-4 w-4" />,
          path: "/quality-control",
          description: "Quality assurance",
        },
      ],
    },
    {
      title: "Financial Management",
      items: [
        {
          title: "Estimates",
          icon: <Calculator className="h-4 w-4" />,
          path: "/estimates",
          description: "Create and manage estimates",
        },
        {
          title: "Invoices",
          icon: <FileText className="h-4 w-4" />,
          path: "/invoices",
          description: "Invoice management",
        },
        {
          title: "Expenses",
          icon: <CreditCard className="h-4 w-4" />,
          path: "/expenses",
          description: "Track expenses",
        },
        {
          title: "Goals",
          icon: <Target className="h-4 w-4" />,
          path: "/goals",
          description: "Financial goals",
        },
        {
          title: "Tax & Financial",
          icon: <Banknote className="h-4 w-4" />,
          path: "/tax-financial",
          description: "Tax management",
        },
        {
          title: "Analytics",
          icon: <PieChart className="h-4 w-4" />,
          path: "/financial-analytics",
          description: "Financial analytics",
        },
        {
          title: "Payments",
          icon: <CreditCard className="h-4 w-4" />,
          path: "/payment-integration",
          description: "Payment processing",
        },
        {
          title: "Profit Analysis",
          icon: <TrendingUp className="h-4 w-4" />,
          path: "/profit-analysis",
          description: "Analyze profitability",
        },
      ],
    },
    {
      title: "Team & HR",
      items: [
        {
          title: "Team Management",
          icon: <UserCheck className="h-4 w-4" />,
          path: "/team-management",
          description: "Manage team members",
        },
        {
          title: "HR Features",
          icon: <Users className="h-4 w-4" />,
          path: "/hr-features",
          description: "Human resources tools",
        },
        {
          title: "Subcontractors",
          icon: <Building2 className="h-4 w-4" />,
          path: "/subcontractor-management",
          description: "Manage subcontractors",
        },
      ],
    },
    {
      title: "Inventory & Equipment",
      items: [
        {
          title: "Materials & Services",
          icon: <Package className="h-4 w-4" />,
          path: "/materials-services",
          description: "Manage materials",
        },
        {
          title: "Inventory",
          icon: <Archive className="h-4 w-4" />,
          path: "/inventory",
          description: "Basic inventory",
        },
        {
          title: "Advanced Inventory",
          icon: <Package className="h-4 w-4" />,
          path: "/advanced-inventory",
          description: "Advanced inventory features",
        },
        {
          title: "Equipment",
          icon: <Wrench className="h-4 w-4" />,
          path: "/equipment",
          description: "Equipment management",
        },
        {
          title: "Vehicles",
          icon: <Car className="h-4 w-4" />,
          path: "/vehicles",
          description: "Fleet management",
        },
      ],
    },
    {
      title: "Location & Mapping",
      items: [
        {
          title: "Employee Locations",
          icon: <MapPin className="h-4 w-4" />,
          path: "/employee-locations",
          description: "Track employee locations",
        },
        {
          title: "Radius Assignment",
          icon: <Navigation className="h-4 w-4" />,
          path: "/radius-assignment",
          description: "Assign work areas",
        },
        {
          title: "Location Management",
          icon: <Map className="h-4 w-4" />,
          path: "/location-management",
          description: "Manage locations",
        },
      ],
    },
    {
      title: "Reports & Analytics",
      items: [
        {
          title: "Reports",
          icon: <BarChart3 className="h-4 w-4" />,
          path: "/reports",
          description: "Generate reports",
        },
        {
          title: "Analytics",
          icon: <TrendingUp className="h-4 w-4" />,
          path: "/analytics",
          description: "Business analytics",
        },
        {
          title: "Map View",
          icon: <Map className="h-4 w-4" />,
          path: "/map-view",
          description: "Geographic view",
        },
        {
          title: "Predictive Analytics",
          icon: <Brain className="h-4 w-4" />,
          path: "/predictive-analytics",
          description: "AI-powered insights",
        },
        {
          title: "Advanced Reporting",
          icon: <FileImage className="h-4 w-4" />,
          path: "/advanced-reporting",
          description: "Advanced report features",
        },
      ],
    },
    {
      title: "Communication & AI",
      items: [
        {
          title: "Customer Communication",
          icon: <Phone className="h-4 w-4" />,
          path: "/communication",
          description: "Customer messaging",
        },
        {
          title: "Team Chat",
          icon: <MessageSquare className="h-4 w-4" />,
          path: "/team-chat",
          description: "Internal team chat",
        },
        {
          title: "AI Chat",
          icon: <Bot className="h-4 w-4" />,
          path: "/ai-chat",
          description: "AI assistant",
        },
        {
          title: "Document Generation",
          icon: <FileText className="h-4 w-4" />,
          path: "/document-generation",
          description: "AI document creation",
        },
        {
          title: "Predictive Insights",
          icon: <Sparkles className="h-4 w-4" />,
          path: "/predictive-insights",
          description: "AI predictions",
        },
      ],
    },
    {
      title: "Integrations",
      items: [
        {
          title: "QuickBooks",
          icon: <BookOpen className="h-4 w-4" />,
          path: "/quickbooks",
          description: "QuickBooks integration",
        },
        {
          title: "Payment Processing",
          icon: <CreditCard className="h-4 w-4" />,
          path: "/payment-processing",
          description: "Payment integrations",
        },
        {
          title: "API Management",
          icon: <Link className="h-4 w-4" />,
          path: "/api-management",
          description: "API configurations",
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Company Settings",
          icon: <Building2 className="h-4 w-4" />,
          path: "/company-settings",
          description: "Company configuration",
        },
        {
          title: "User Management",
          icon: <Users className="h-4 w-4" />,
          path: "/user-management",
          description: "Manage users",
        },
        {
          title: "System Config",
          icon: <Cog className="h-4 w-4" />,
          path: "/system-config",
          description: "System settings",
        },
        {
          title: "Back Office",
          icon: <Archive className="h-4 w-4" />,
          path: "/back-office",
          description: "Back office settings",
        },
        {
          title: "Mobile Settings",
          icon: <Smartphone className="h-4 w-4" />,
          path: "/mobile-settings",
          description: "Mobile app settings",
        },
        {
          title: "Branch Management",
          icon: <GitBranch className="h-4 w-4" />,
          path: "/branch-management",
          description: "Manage branches",
        },
      ],
    },
  ];

  const adminMenuSections: MenuSection[] = [
    {
      title: "Admin Dashboard",
      items: [
        {
          title: "Dashboard",
          icon: <Home className="h-4 w-4" />,
          path: "/dashboard",
          description: "Admin overview",
        },
        {
          title: "Tenants",
          icon: <Building2 className="h-4 w-4" />,
          path: "/tenants",
          description: "Manage tenants",
        },
        {
          title: "Users",
          icon: <Users className="h-4 w-4" />,
          path: "/users",
          description: "User management",
        },
        {
          title: "Monitoring",
          icon: <Activity className="h-4 w-4" />,
          path: "/monitoring",
          description: "System monitoring",
        },
        {
          title: "Settings",
          icon: <Settings className="h-4 w-4" />,
          path: "/settings",
          description: "Admin settings",
        },
      ],
    },
  ];

  const menuSections = isAdmin ? adminMenuSections : tenantMenuSections;

  return (
    <>
      {/* Menu Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm border shadow-lg hover:bg-accent"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-background border-r shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b bg-gradient-to-r from-primary/10 to-secondary/10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  {isAdmin ? "Admin Panel" : "JobBlox"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {user?.email || "Welcome"}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleNavigation("/user-management")}
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleNavigation("/company-settings")}
                  >
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-destructive"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Menu Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {menuSections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  {section.title}
                </h3>
                <div className="grid gap-2">
                  {section.items.map((item, itemIndex) => (
                    <Button
                      key={itemIndex}
                      variant="ghost"
                      className="justify-start h-auto p-3 text-left hover:bg-accent/50 transition-colors"
                      onClick={() => handleNavigation(item.path)}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <div className="mt-0.5 text-muted-foreground">
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm text-foreground">
                            {item.title}
                          </div>
                          {item.description && (
                            <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {item.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-muted/20">
            <div className="text-xs text-muted-foreground text-center">
              JobBlox CRM v1.0
              <br />
              Construction Management Platform
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MegaMenu;
