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
  CreditCard,
  Smartphone,
  Globe,
  Shield,
  Settings,
  CheckCircle,
} from "lucide-react";

interface PaymentProvider {
  id: string;
  name: string;
  type: "credit_card" | "digital_wallet" | "bank_transfer" | "crypto";
  status: "connected" | "disconnected" | "pending";
  fees: string;
  processingTime: string;
  icon: string;
}

const mockProviders: PaymentProvider[] = [
  {
    id: "1",
    name: "Stripe",
    type: "credit_card",
    status: "connected",
    fees: "2.9% + $0.30",
    processingTime: "Instant",
    icon: "💳",
  },
  {
    id: "2",
    name: "PayPal",
    type: "digital_wallet",
    status: "connected",
    fees: "3.49% + $0.49",
    processingTime: "Instant",
    icon: "🅿️",
  },
  {
    id: "3",
    name: "Square",
    type: "credit_card",
    status: "disconnected",
    fees: "2.6% + $0.10",
    processingTime: "Instant",
    icon: "⬜",
  },
  {
    id: "4",
    name: "Apple Pay",
    type: "digital_wallet",
    status: "pending",
    fees: "2.9% + $0.30",
    processingTime: "Instant",
    icon: "🍎",
  },
];

const PaymentIntegration = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "disconnected":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "credit_card":
        return <CreditCard className="w-4 h-4" />;
      case "digital_wallet":
        return <Smartphone className="w-4 h-4" />;
      case "bank_transfer":
        return <Globe className="w-4 h-4" />;
      default:
        return <CreditCard className="w-4 h-4" />;
    }
  };

  const connectedProviders = mockProviders.filter(
    (p) => p.status === "connected",
  ).length;
  const totalTransactionVolume = 125000;
  const monthlyFees = 3250;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Payment Integration
            </h1>
            <p className="text-slate-600 mt-2">
              Manage payment providers and processing settings
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Settings className="w-4 h-4 mr-2" />
            Payment Settings
          </Button>
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
                Monthly Volume
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalTransactionVolume.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Transaction volume
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Processing Fees
              </CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${monthlyFees}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Success Rate
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">98.5%</div>
              <p className="text-xs text-muted-foreground">Payment success</p>
            </CardContent>
          </Card>
        </div>

        {/* Payment Integration Tabs */}
        <Tabs defaultValue="providers" className="space-y-4">
          <TabsList>
            <TabsTrigger value="providers">Payment Providers</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
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
                        <div className="text-2xl">{provider.icon}</div>
                        <div>
                          <CardTitle className="text-lg">
                            {provider.name}
                          </CardTitle>
                          <CardDescription className="flex items-center space-x-2">
                            {getTypeIcon(provider.type)}
                            <span className="capitalize">
                              {provider.type.replace("_", " ")}
                            </span>
                          </CardDescription>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className={`${getStatusColor(provider.status)} text-white`}
                      >
                        {provider.status.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Processing Fees</p>
                        <p className="font-semibold">{provider.fees}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Processing Time</p>
                        <p className="font-semibold">
                          {provider.processingTime}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={provider.status === "connected"}
                          disabled={provider.status === "pending"}
                        />
                        <span className="text-sm">Enable</span>
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

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
                <CardDescription>
                  Configure global payment processing settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">
                        Auto-capture payments
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Automatically capture authorized payments
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">
                        Send payment receipts
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Email receipts to customers automatically
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">
                        Enable recurring payments
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Allow subscription and recurring billing
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                  View and manage payment transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Transaction history coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security & Compliance</CardTitle>
                <CardDescription>
                  Payment security and compliance settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <Shield className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">
                        PCI DSS Compliant
                      </p>
                      <p className="text-sm text-green-600">
                        Your payment processing is secure and compliant
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Security Features</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• End-to-end encryption</li>
                      <li>• Fraud detection and prevention</li>
                      <li>• 3D Secure authentication</li>
                      <li>• Real-time transaction monitoring</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PaymentIntegration;
