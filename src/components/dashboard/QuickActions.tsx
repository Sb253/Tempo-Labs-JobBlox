import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  FileText,
  Calendar,
  Users,
  DollarSign,
  Camera,
  MapPin,
  Phone,
  Mail,
  Settings,
  Zap,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  category: string;
  urgent?: boolean;
  count?: number;
}

const QuickActions = () => {
  const quickActions: QuickAction[] = [
    {
      id: "create-project",
      title: "New Project",
      description: "Start a new construction project",
      icon: <Plus className="h-5 w-5" />,
      color: "bg-blue-500 hover:bg-blue-600",
      category: "Projects",
    },
    {
      id: "create-estimate",
      title: "Create Estimate",
      description: "Generate project estimate",
      icon: <FileText className="h-5 w-5" />,
      color: "bg-green-500 hover:bg-green-600",
      category: "Financial",
    },
    {
      id: "schedule-job",
      title: "Schedule Job",
      description: "Book new appointment",
      icon: <Calendar className="h-5 w-5" />,
      color: "bg-purple-500 hover:bg-purple-600",
      category: "Scheduling",
    },
    {
      id: "add-customer",
      title: "Add Customer",
      description: "Create customer profile",
      icon: <Users className="h-5 w-5" />,
      color: "bg-orange-500 hover:bg-orange-600",
      category: "Customers",
    },
    {
      id: "create-invoice",
      title: "Create Invoice",
      description: "Generate new invoice",
      icon: <DollarSign className="h-5 w-5" />,
      color: "bg-teal-500 hover:bg-teal-600",
      category: "Financial",
    },
    {
      id: "site-photos",
      title: "Upload Photos",
      description: "Add site documentation",
      icon: <Camera className="h-5 w-5" />,
      color: "bg-pink-500 hover:bg-pink-600",
      category: "Documentation",
    },
    {
      id: "track-location",
      title: "Track Team",
      description: "View team locations",
      icon: <MapPin className="h-5 w-5" />,
      color: "bg-indigo-500 hover:bg-indigo-600",
      category: "Tracking",
    },
    {
      id: "quick-call",
      title: "Quick Call",
      description: "Call customer or team",
      icon: <Phone className="h-5 w-5" />,
      color: "bg-red-500 hover:bg-red-600",
      category: "Communication",
    },
  ];

  const recentActions = [
    {
      action: "Created estimate for Kitchen Remodel",
      time: "2 minutes ago",
      urgent: false,
    },
    {
      action: "Scheduled inspection for Bathroom Project",
      time: "15 minutes ago",
      urgent: true,
    },
    {
      action: "Added new customer: John Smith",
      time: "1 hour ago",
      urgent: false,
    },
    {
      action: "Uploaded site photos for Deck Build",
      time: "2 hours ago",
      urgent: false,
    },
    {
      action: "Sent invoice to Sarah Johnson",
      time: "3 hours ago",
      urgent: false,
    },
  ];

  const pendingTasks = [
    { task: "Follow up on pending estimates", count: 5, urgent: true },
    { task: "Schedule material deliveries", count: 3, urgent: true },
    { task: "Update project timelines", count: 8, urgent: false },
    { task: "Review safety reports", count: 2, urgent: true },
    { task: "Process payment receipts", count: 12, urgent: false },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold gradient-text">Quick Actions</h1>
          <p className="text-slate-400">
            Streamline your workflow with one-click actions
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              className={cn(
                "h-24 flex flex-col items-center justify-center space-y-2 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg",
                action.color,
              )}
            >
              {action.icon}
              <div className="text-center">
                <div className="font-medium text-sm">{action.title}</div>
                <div className="text-xs opacity-90">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>

        {/* Action Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Actions */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Recent Actions</span>
              </CardTitle>
              <CardDescription className="text-slate-400">
                Your latest activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActions.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-slate-700 rounded-lg"
                  >
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                        item.urgent ? "bg-red-500" : "bg-green-500",
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-200 truncate">
                        {item.action}
                      </p>
                      <p className="text-xs text-slate-400">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Tasks */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Pending Tasks</span>
              </CardTitle>
              <CardDescription className="text-slate-400">
                Items requiring attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingTasks.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={cn(
                          "w-3 h-3 rounded-full",
                          item.urgent ? "bg-red-500" : "bg-yellow-500",
                        )}
                      />
                      <span className="text-sm text-slate-200">
                        {item.task}
                      </span>
                    </div>
                    <Badge variant={item.urgent ? "destructive" : "secondary"}>
                      {item.count}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Settings */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Quick Settings</span>
              </CardTitle>
              <CardDescription className="text-slate-400">
                Frequently used settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    setting: "Notification Preferences",
                    icon: <Mail className="h-4 w-4" />,
                  },
                  {
                    setting: "Default Project Settings",
                    icon: <Settings className="h-4 w-4" />,
                  },
                  {
                    setting: "Team Permissions",
                    icon: <Users className="h-4 w-4" />,
                  },
                  {
                    setting: "Invoice Templates",
                    icon: <FileText className="h-4 w-4" />,
                  },
                  {
                    setting: "Safety Protocols",
                    icon: <Zap className="h-4 w-4" />,
                  },
                ].map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-slate-200 hover:bg-slate-700"
                  >
                    {item.icon}
                    <span className="ml-2">{item.setting}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Templates */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Action Templates</CardTitle>
            <CardDescription className="text-slate-400">
              Pre-configured workflows for common tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  name: "New Residential Project",
                  description: "Complete setup for home renovation",
                  color: "bg-blue-500",
                },
                {
                  name: "Commercial Estimate",
                  description: "Business project estimation",
                  color: "bg-green-500",
                },
                {
                  name: "Emergency Repair",
                  description: "Urgent repair workflow",
                  color: "bg-red-500",
                },
                {
                  name: "Maintenance Schedule",
                  description: "Routine maintenance setup",
                  color: "bg-purple-500",
                },
              ].map((template, index) => (
                <Card
                  key={index}
                  className="bg-slate-700 border-slate-600 hover:bg-slate-650 transition-colors cursor-pointer"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={cn("w-3 h-3 rounded-full", template.color)}
                      />
                      <div>
                        <h4 className="text-sm font-medium text-white">
                          {template.name}
                        </h4>
                        <p className="text-xs text-slate-400">
                          {template.description}
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
    </div>
  );
};

export default QuickActions;
