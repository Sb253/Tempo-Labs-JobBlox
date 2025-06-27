import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Plus,
  Users,
  FileText,
  Calendar,
  DollarSign,
  Camera,
  MessageSquare,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const QuickActionsPanel = () => {
  const navigate = useNavigate();
  const { tenant } = useAuth();

  const quickActions = [
    {
      icon: <Plus className="h-5 w-5" />,
      label: "New Project",
      description: "Start a new construction project",
      action: () => navigate(`/${tenant?.tenantId}/job-form`),
      color: "bg-blue-500",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Add Client",
      description: "Register a new customer",
      action: () => navigate(`/${tenant?.tenantId}/customer-intake`),
      color: "bg-green-500",
      gradient: "from-green-500 to-green-600",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Create Estimate",
      description: "Generate project estimate",
      action: () => navigate(`/${tenant?.tenantId}/estimates`),
      color: "bg-purple-500",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Schedule Task",
      description: "Plan upcoming activities",
      action: () => navigate(`/${tenant?.tenantId}/scheduling`),
      color: "bg-orange-500",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      label: "Create Invoice",
      description: "Bill clients for work",
      action: () => navigate(`/${tenant?.tenantId}/invoices`),
      color: "bg-emerald-500",
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      icon: <Camera className="h-5 w-5" />,
      label: "Upload Photos",
      description: "Document project progress",
      action: () => navigate(`/${tenant?.tenantId}/photos`),
      color: "bg-pink-500",
      gradient: "from-pink-500 to-pink-600",
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: "Team Chat",
      description: "Communicate with team",
      action: () => navigate(`/${tenant?.tenantId}/team-chat`),
      color: "bg-cyan-500",
      gradient: "from-cyan-500 to-cyan-600",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      description: "Configure your account",
      action: () => navigate(`/${tenant?.tenantId}/user-management`),
      color: "bg-slate-500",
      gradient: "from-slate-500 to-slate-600",
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 p-4 lg:p-6">
      <Card className="border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">
            Quick Actions
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            Common tasks and shortcuts for faster workflow
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Mobile Grid */}
          <div className="grid grid-cols-2 gap-3 lg:hidden">
            {quickActions.slice(0, 6).map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-20 flex-col space-y-2 hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 touch-manipulation"
                onClick={action.action}
              >
                <div className={`p-2 ${action.color} rounded-lg text-white`}>
                  {action.icon}
                </div>
                <span className="text-xs font-medium text-slate-900 dark:text-white">
                  {action.label}
                </span>
              </Button>
            ))}
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 cursor-pointer border-slate-200 dark:border-slate-700 group"
                onClick={action.action}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div
                      className={`p-3 bg-gradient-to-r ${action.gradient} rounded-lg text-white group-hover:scale-110 transition-transform`}
                    >
                      {action.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                        {action.label}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActionsPanel;
