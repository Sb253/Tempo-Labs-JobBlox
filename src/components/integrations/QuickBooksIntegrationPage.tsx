import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  AlertCircle,
  Settings,
  Sync,
  DollarSign,
  FileText,
  Users,
  BarChart3,
} from "lucide-react";

interface IntegrationFeature {
  name: string;
  description: string;
  status: "connected" | "available" | "coming-soon";
  icon: React.ReactNode;
}

const integrationFeatures: IntegrationFeature[] = [
  {
    name: "Financial Sync",
    description: "Automatically sync invoices, payments, and expenses",
    status: "connected",
    icon: <DollarSign className="h-5 w-5" />,
  },
  {
    name: "Customer Data",
    description: "Sync customer information and contact details",
    status: "connected",
    icon: <Users className="h-5 w-5" />,
  },
  {
    name: "Invoice Management",
    description: "Create and manage invoices directly from JobBlox",
    status: "available",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    name: "Financial Reports",
    description: "Generate comprehensive financial reports",
    status: "coming-soon",
    icon: <BarChart3 className="h-5 w-5" />,
  },
];

const QuickBooksIntegrationPage = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-500";
      case "available":
        return "bg-blue-500";
      case "coming-soon":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "available":
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case "coming-soon":
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              QuickBooks Integration
            </h1>
            <p className="text-slate-400">
              Seamlessly connect your construction business with QuickBooks
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="bg-green-500/10 text-green-400 border-green-500/20"
            >
              <CheckCircle className="h-3 w-3 mr-1" />
              Connected
            </Badge>
            <Button
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Connection Status */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Sync className="h-5 w-5 text-blue-400" />
              Connection Status
            </CardTitle>
            <CardDescription className="text-slate-400">
              Your QuickBooks integration is active and syncing data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-400">98%</div>
                <div className="text-sm text-slate-400">Sync Success Rate</div>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">1,247</div>
                <div className="text-sm text-slate-400">Records Synced</div>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-400">2 min</div>
                <div className="text-sm text-slate-400">Last Sync</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integration Features */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Integration Features</CardTitle>
            <CardDescription className="text-slate-400">
              Manage your QuickBooks integration features and capabilities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {integrationFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-slate-700/30 p-4 rounded-lg border border-slate-600"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-600 rounded-lg">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">
                          {feature.name}
                        </h3>
                        <p className="text-sm text-slate-400">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(feature.status)}
                      <Badge
                        variant="outline"
                        className={`${getStatusColor(feature.status)}/10 text-white border-${getStatusColor(feature.status)}/20`}
                      >
                        {feature.status.replace("-", " ")}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      disabled={feature.status === "coming-soon"}
                    >
                      {feature.status === "connected"
                        ? "Configure"
                        : feature.status === "available"
                          ? "Enable"
                          : "Coming Soon"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sync History */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Sync Activity</CardTitle>
            <CardDescription className="text-slate-400">
              Latest synchronization events with QuickBooks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  type: "Invoice",
                  action: "Created",
                  time: "2 minutes ago",
                  status: "success",
                },
                {
                  type: "Customer",
                  action: "Updated",
                  time: "5 minutes ago",
                  status: "success",
                },
                {
                  type: "Payment",
                  action: "Synced",
                  time: "12 minutes ago",
                  status: "success",
                },
                {
                  type: "Expense",
                  action: "Created",
                  time: "1 hour ago",
                  status: "warning",
                },
                {
                  type: "Invoice",
                  action: "Updated",
                  time: "2 hours ago",
                  status: "success",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.status === "success"
                          ? "bg-green-500"
                          : activity.status === "warning"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    />
                    <div>
                      <span className="text-white font-medium">
                        {activity.type}
                      </span>
                      <span className="text-slate-400 ml-2">
                        {activity.action}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-slate-400">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Sync className="h-4 w-4 mr-2" />
            Force Sync Now
          </Button>
          <Button
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            View Sync Logs
          </Button>
          <Button
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            Integration Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickBooksIntegrationPage;
