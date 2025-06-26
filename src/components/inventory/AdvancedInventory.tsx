import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Search,
  Filter,
  Settings,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Package,
  Zap,
  Target,
  Calendar,
  Bell,
  Truck,
  QrCode,
  MapPin,
  Users,
  Clock,
} from "lucide-react";

interface AdvancedInventoryFeature {
  id: string;
  title: string;
  description: string;
  icon: any;
  enabled: boolean;
  category: string;
}

const advancedFeatures: AdvancedInventoryFeature[] = [
  {
    id: "auto_reorder",
    title: "Automatic Reordering",
    description:
      "Automatically create purchase orders when stock reaches minimum levels",
    icon: Zap,
    enabled: true,
    category: "Automation",
  },
  {
    id: "demand_forecasting",
    title: "Demand Forecasting",
    description: "AI-powered predictions for future inventory needs",
    icon: TrendingUp,
    enabled: false,
    category: "Analytics",
  },
  {
    id: "barcode_scanning",
    title: "Barcode Scanning",
    description: "Mobile barcode scanning for quick inventory updates",
    icon: QrCode,
    enabled: true,
    category: "Mobile",
  },
  {
    id: "multi_location",
    title: "Multi-Location Tracking",
    description: "Track inventory across multiple warehouses and job sites",
    icon: MapPin,
    enabled: true,
    category: "Locations",
  },
  {
    id: "batch_tracking",
    title: "Batch & Serial Tracking",
    description: "Track items by batch numbers and serial numbers",
    icon: Package,
    enabled: false,
    category: "Tracking",
  },
  {
    id: "expiry_management",
    title: "Expiry Date Management",
    description: "Monitor and alert on items approaching expiration",
    icon: Calendar,
    enabled: true,
    category: "Quality",
  },
  {
    id: "smart_alerts",
    title: "Smart Alerts",
    description:
      "Intelligent notifications for stock levels, deliveries, and issues",
    icon: Bell,
    enabled: true,
    category: "Notifications",
  },
  {
    id: "supplier_integration",
    title: "Supplier Integration",
    description:
      "Direct integration with supplier systems for seamless ordering",
    icon: Truck,
    enabled: false,
    category: "Integration",
  },
];

interface InventoryMetric {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "stable";
  icon: any;
}

const inventoryMetrics: InventoryMetric[] = [
  {
    label: "Inventory Turnover",
    value: "4.2x",
    change: "+0.3",
    trend: "up",
    icon: TrendingUp,
  },
  {
    label: "Stock Accuracy",
    value: "98.5%",
    change: "+1.2%",
    trend: "up",
    icon: Target,
  },
  {
    label: "Avg. Days on Hand",
    value: "87 days",
    change: "-5 days",
    trend: "down",
    icon: Clock,
  },
  {
    label: "Stockout Rate",
    value: "2.1%",
    change: "-0.8%",
    trend: "down",
    icon: AlertTriangle,
  },
];

const AdvancedInventory = () => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down":
        return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const enabledFeatures = advancedFeatures.filter((f) => f.enabled).length;
  const totalFeatures = advancedFeatures.length;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Advanced Inventory
            </h1>
            <p className="text-slate-600 mt-2">
              Advanced inventory management features and analytics
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Enable Feature
            </Button>
          </div>
        </div>

        {/* Feature Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Features
              </CardTitle>
              <Zap className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {enabledFeatures}/{totalFeatures}
              </div>
              <p className="text-xs text-muted-foreground">Features enabled</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Automation Level
              </CardTitle>
              <Target className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">85%</div>
              <p className="text-xs text-muted-foreground">
                Processes automated
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Locations Tracked
              </CardTitle>
              <MapPin className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">12</div>
              <p className="text-xs text-muted-foreground">Active locations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Smart Alerts
              </CardTitle>
              <Bell className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">3</div>
              <p className="text-xs text-muted-foreground">Active alerts</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="features" className="space-y-4">
          <TabsList>
            <TabsTrigger value="features">Advanced Features</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="automation">Automation Rules</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {advancedFeatures.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <Card
                    key={feature.id}
                    className={`hover:shadow-lg transition-shadow ${
                      feature.enabled ? "border-green-200 bg-green-50" : ""
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`p-2 rounded-lg ${
                              feature.enabled ? "bg-green-100" : "bg-gray-100"
                            }`}
                          >
                            <IconComponent
                              className={`w-6 h-6 ${
                                feature.enabled
                                  ? "text-green-600"
                                  : "text-gray-600"
                              }`}
                            />
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {feature.title}
                            </CardTitle>
                            <Badge variant="outline" className="mt-1">
                              {feature.category}
                            </Badge>
                          </div>
                        </div>
                        <Switch
                          checked={feature.enabled}
                          className="data-[state=checked]:bg-green-600"
                        />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">
                        {feature.description}
                      </CardDescription>
                      <div className="mt-4 flex justify-between items-center">
                        <Badge
                          className={
                            feature.enabled
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {feature.enabled ? "Active" : "Inactive"}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Performance Metrics</CardTitle>
                  <CardDescription>
                    Advanced inventory performance indicators
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {inventoryMetrics.map((metric, index) => {
                    const IconComponent = metric.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <IconComponent className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{metric.label}</p>
                            <p className="text-2xl font-bold">{metric.value}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getTrendIcon(metric.trend)}
                          <span
                            className={`text-sm font-medium ${getTrendColor(metric.trend)}`}
                          >
                            {metric.change}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Predictive Insights</CardTitle>
                  <CardDescription>
                    AI-powered inventory predictions and recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-blue-800">
                        Demand Forecast
                      </span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Based on historical data, expect 15% increase in lumber
                      demand next month.
                    </p>
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      <span className="font-medium text-yellow-800">
                        Reorder Alert
                      </span>
                    </div>
                    <p className="text-sm text-yellow-700">
                      3 items will reach minimum stock levels within 7 days.
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-800">
                        Optimization
                      </span>
                    </div>
                    <p className="text-sm text-green-700">
                      Consolidating orders could save $1,200 in shipping costs
                      this month.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="automation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Automation Rules</CardTitle>
                <CardDescription>
                  Configure automated inventory management rules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Automation rules configuration coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Integrations</CardTitle>
                <CardDescription>
                  Connect with external systems and suppliers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Integration management coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdvancedInventory;
