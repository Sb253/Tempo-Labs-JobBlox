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
  RefreshCw,
  FileText,
  DollarSign,
  Settings,
  Plus,
} from "lucide-react";

interface AccountingProvider {
  id: string;
  name: string;
  logo: string;
  status: "connected" | "disconnected" | "error";
  features: string[];
  lastSync?: string;
}

const mockProviders: AccountingProvider[] = [
  {
    id: "1",
    name: "QuickBooks Online",
    logo: "📊",
    status: "connected",
    features: ["Invoicing", "Expenses", "Reports", "Tax Prep"],
    lastSync: "2024-01-15 10:30 AM",
  },
  {
    id: "2",
    name: "Xero",
    logo: "🔵",
    status: "disconnected",
    features: ["Bank Reconciliation", "Invoicing", "Payroll", "Inventory"],
  },
  {
    id: "3",
    name: "FreshBooks",
    logo: "🟢",
    status: "error",
    features: ["Time Tracking", "Invoicing", "Expenses", "Projects"],
    lastSync: "2024-01-14 3:45 PM",
  },
  {
    id: "4",
    name: "Wave Accounting",
    logo: "🌊",
    status: "disconnected",
    features: ["Free Accounting", "Invoicing", "Payments", "Receipts"],
  },
];

interface SyncModule {
  name: string;
  enabled: boolean;
  lastSync?: string;
  recordCount: number;
  status: "success" | "pending" | "error";
}

const mockSyncModules: SyncModule[] = [
  {
    name: "Chart of Accounts",
    enabled: true,
    lastSync: "10:30 AM",
    recordCount: 45,
    status: "success",
  },
  {
    name: "Customers",
    enabled: true,
    lastSync: "10:25 AM",
    recordCount: 234,
    status: "success",
  },
  {
    name: "Vendors",
    enabled: true,
    lastSync: "10:20 AM",
    recordCount: 67,
    status: "success",
  },
  {
    name: "Items/Services",
    enabled: false,
    recordCount: 89,
    status: "pending",
  },
  {
    name: "Invoices",
    enabled: true,
    lastSync: "10:15 AM",
    recordCount: 1456,
    status: "success",
  },
  {
    name: "Bills",
    enabled: true,
    lastSync: "10:10 AM",
    recordCount: 234,
    status: "error",
  },
];

const AccountingIntegration = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
      case "success":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "error":
        return "text-red-600";
      case "disconnected":
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pending":
        return <RefreshCw className="w-4 h-4 text-yellow-600 animate-spin" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
      case "success":
        return <Badge className="bg-green-100 text-green-800">Connected</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "error":
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      case "disconnected":
      default:
        return <Badge variant="secondary">Disconnected</Badge>;
    }
  };

  const connectedProviders = mockProviders.filter(
    (p) => p.status === "connected",
  ).length;
  const enabledModules = mockSyncModules.filter((m) => m.enabled).length;
  const totalRecords = mockSyncModules.reduce(
    (sum, module) => sum + module.recordCount,
    0,
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Accounting Integration
            </h1>
            <p className="text-slate-600 mt-2">
              Connect and sync with your accounting software
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Integration
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Connected Providers
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{connectedProviders}</div>
              <p className="text-xs text-muted-foreground">
                Active integrations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Sync Modules
              </CardTitle>
              <RefreshCw className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {enabledModules}/{mockSyncModules.length}
              </div>
              <p className="text-xs text-muted-foreground">Enabled modules</p>
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
              <p className="text-xs text-muted-foreground">Synchronized</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sync Health</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">95%</div>
              <p className="text-xs text-muted-foreground">Success rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Integration Tabs */}
        <Tabs defaultValue="providers" className="space-y-4">
          <TabsList>
            <TabsTrigger value="providers">Providers</TabsTrigger>
            <TabsTrigger value="sync-modules">Sync Modules</TabsTrigger>
            <TabsTrigger value="mapping">Field Mapping</TabsTrigger>
            <TabsTrigger value="logs">Sync Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="providers" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockProviders.map((provider) => (
                <Card
                  key={provider.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{provider.logo}</div>
                        <div>
                          <CardTitle className="text-lg">
                            {provider.name}
                          </CardTitle>
                          <CardDescription>
                            {provider.features.slice(0, 2).join(", ")}
                            {provider.features.length > 2 &&
                              ` +${provider.features.length - 2} more`}
                          </CardDescription>
                        </div>
                      </div>
                      {getStatusBadge(provider.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {provider.lastSync && (
                      <div className="text-sm">
                        <p className="text-muted-foreground">
                          Last synchronized:
                        </p>
                        <p className="font-medium">{provider.lastSync}</p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1">
                      {provider.features.map((feature, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(provider.status)}
                        <span
                          className={`text-sm ${getStatusColor(provider.status)}`}
                        >
                          {provider.status.charAt(0).toUpperCase() +
                            provider.status.slice(1)}
                        </span>
                      </div>
                      <Button
                        variant={
                          provider.status === "connected"
                            ? "outline"
                            : "default"
                        }
                        size="sm"
                      >
                        {provider.status === "connected"
                          ? "Configure"
                          : "Connect"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sync-modules" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Synchronization Modules</CardTitle>
                <CardDescription>
                  Configure which data modules to sync with your accounting
                  software
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockSyncModules.map((module, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(module.status)}
                      <div>
                        <p className="font-medium">{module.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {module.recordCount.toLocaleString()} records
                          {module.lastSync &&
                            ` • Last sync: ${module.lastSync}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Switch checked={module.enabled} />
                      <Button variant="outline" size="sm">
                        {module.status === "error" ? "Retry" : "Sync"}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
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

          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Synchronization Logs</CardTitle>
                <CardDescription>
                  View detailed sync history and troubleshoot issues
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

export default AccountingIntegration;
