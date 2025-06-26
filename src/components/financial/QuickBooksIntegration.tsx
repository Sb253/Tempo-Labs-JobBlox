import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  AlertCircle,
  Sync,
  FileText,
  DollarSign,
  Calendar,
  Settings,
} from "lucide-react";

interface SyncStatus {
  module: string;
  status: "synced" | "pending" | "error";
  lastSync: string;
  recordCount: number;
}

const mockSyncStatus: SyncStatus[] = [
  {
    module: "Customers",
    status: "synced",
    lastSync: "2024-01-15 10:30 AM",
    recordCount: 245,
  },
  {
    module: "Invoices",
    status: "synced",
    lastSync: "2024-01-15 10:25 AM",
    recordCount: 1234,
  },
  {
    module: "Expenses",
    status: "pending",
    lastSync: "2024-01-15 09:45 AM",
    recordCount: 567,
  },
  {
    module: "Items/Services",
    status: "error",
    lastSync: "2024-01-15 08:15 AM",
    recordCount: 89,
  },
];

const QuickBooksIntegration = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "synced":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "error":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "synced":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pending":
        return <Sync className="w-4 h-4 text-yellow-600 animate-spin" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "synced":
        return <Badge className="bg-green-100 text-green-800">Synced</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "error":
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const syncedModules = mockSyncStatus.filter(
    (s) => s.status === "synced",
  ).length;
  const totalRecords = mockSyncStatus.reduce(
    (sum, status) => sum + status.recordCount,
    0,
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">QB</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                QuickBooks Integration
              </h1>
              <p className="text-slate-600 mt-1">
                Sync your financial data with QuickBooks Online
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Sync className="w-4 h-4 mr-2" />
              Sync Now
            </Button>
          </div>
        </div>

        {/* Connection Status */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-800">
                    Connected to QuickBooks Online
                  </h3>
                  <p className="text-sm text-green-600">
                    Last connected: January 15, 2024 at 10:30 AM
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-green-300 text-green-700"
              >
                Reconnect
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Synced Modules
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {syncedModules}/{mockSyncStatus.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Active sync modules
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Records
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalRecords.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Synchronized records
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Sync</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10:30 AM</div>
              <p className="text-xs text-muted-foreground">Today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sync Health</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">98%</div>
              <p className="text-xs text-muted-foreground">Success rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Integration Tabs */}
        <Tabs defaultValue="sync-status" className="space-y-4">
          <TabsList>
            <TabsTrigger value="sync-status">Sync Status</TabsTrigger>
            <TabsTrigger value="mapping">Field Mapping</TabsTrigger>
            <TabsTrigger value="settings">Sync Settings</TabsTrigger>
            <TabsTrigger value="logs">Sync Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="sync-status" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockSyncStatus.map((sync) => (
                <Card
                  key={sync.module}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(sync.status)}
                        <div>
                          <CardTitle className="text-lg">
                            {sync.module}
                          </CardTitle>
                          <CardDescription>
                            {sync.recordCount.toLocaleString()} records
                          </CardDescription>
                        </div>
                      </div>
                      {getStatusBadge(sync.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm">
                      <p className="text-muted-foreground">
                        Last synchronized:
                      </p>
                      <p className="font-medium">{sync.lastSync}</p>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={sync.status !== "error"}
                          disabled={sync.status === "pending"}
                        />
                        <span className="text-sm">Auto-sync</span>
                      </div>
                      <Button variant="outline" size="sm">
                        {sync.status === "error" ? "Retry" : "Sync Now"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mapping" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Field Mapping</CardTitle>
                <CardDescription>
                  Configure how data fields are mapped between systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Field mapping configuration coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Synchronization Settings</CardTitle>
                <CardDescription>
                  Configure sync frequency and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">
                        Auto-sync enabled
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Automatically sync data every hour
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">
                        Real-time sync
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Sync changes immediately when they occur
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">
                        Sync notifications
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Get notified about sync status and errors
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Synchronization Logs</CardTitle>
                <CardDescription>
                  View detailed sync history and error logs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Sync logs coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default QuickBooksIntegration;
