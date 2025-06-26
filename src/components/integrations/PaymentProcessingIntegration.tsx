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
import {
  CreditCard,
  Shield,
  Zap,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Settings,
} from "lucide-react";

interface PaymentProvider {
  name: string;
  description: string;
  status: "connected" | "available" | "disabled";
  icon: React.ReactNode;
  fees: string;
  features: string[];
}

const paymentProviders: PaymentProvider[] = [
  {
    name: "Stripe",
    description: "Accept credit cards, ACH, and digital wallets",
    status: "connected",
    icon: <CreditCard className="h-5 w-5" />,
    fees: "2.9% + 30¢",
    features: ["Credit Cards", "ACH", "Apple Pay", "Google Pay"],
  },
  {
    name: "Square",
    description: "In-person and online payment processing",
    status: "available",
    icon: <CreditCard className="h-5 w-5" />,
    fees: "2.6% + 10¢",
    features: ["Credit Cards", "Tap to Pay", "Invoicing"],
  },
  {
    name: "PayPal",
    description: "Accept PayPal and credit card payments",
    status: "available",
    icon: <CreditCard className="h-5 w-5" />,
    fees: "2.9% + 30¢",
    features: ["PayPal", "Credit Cards", "Buy Now Pay Later"],
  },
];

const PaymentProcessingIntegration = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "text-green-400 bg-green-500/10 border-green-500/20";
      case "available":
        return "text-blue-400 bg-blue-500/10 border-blue-500/20";
      case "disabled":
        return "text-gray-400 bg-gray-500/10 border-gray-500/20";
      default:
        return "text-gray-400 bg-gray-500/10 border-gray-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Payment Processing
            </h1>
            <p className="text-slate-400">
              Manage payment methods and processing integrations
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Settings className="h-4 w-4 mr-2" />
            Payment Settings
          </Button>
        </div>

        {/* Payment Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">$24,580</div>
                  <div className="text-sm text-slate-400">This Month</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <CreditCard className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">156</div>
                  <div className="text-sm text-slate-400">Transactions</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Zap className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">98.5%</div>
                  <div className="text-sm text-slate-400">Success Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <Shield className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">$712</div>
                  <div className="text-sm text-slate-400">Processing Fees</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Providers */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Payment Providers</CardTitle>
            <CardDescription className="text-slate-400">
              Configure and manage your payment processing integrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentProviders.map((provider, index) => (
                <div
                  key={index}
                  className="bg-slate-700/30 p-6 rounded-lg border border-slate-600"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-slate-600 rounded-lg">
                        {provider.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">
                            {provider.name}
                          </h3>
                          <Badge
                            variant="outline"
                            className={getStatusColor(provider.status)}
                          >
                            {provider.status === "connected" && (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            )}
                            {provider.status === "available" && (
                              <AlertTriangle className="h-3 w-3 mr-1" />
                            )}
                            {provider.status.replace("-", " ")}
                          </Badge>
                        </div>
                        <p className="text-slate-400 mb-3">
                          {provider.description}
                        </p>
                        <div className="flex items-center gap-4 mb-3">
                          <div className="text-sm">
                            <span className="text-slate-400">
                              Processing Fee:{" "}
                            </span>
                            <span className="text-white font-medium">
                              {provider.fees}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {provider.features.map((feature, featureIndex) => (
                            <Badge
                              key={featureIndex}
                              variant="secondary"
                              className="bg-slate-600 text-slate-200"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={provider.status === "connected"}
                        disabled={provider.status === "disabled"}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        {provider.status === "connected"
                          ? "Configure"
                          : "Connect"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Transactions</CardTitle>
            <CardDescription className="text-slate-400">
              Latest payment transactions across all providers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  id: "TXN-001",
                  customer: "ABC Construction",
                  amount: "$2,450.00",
                  method: "Credit Card",
                  status: "completed",
                  time: "2 minutes ago",
                },
                {
                  id: "TXN-002",
                  customer: "Smith Renovations",
                  amount: "$1,200.00",
                  method: "ACH",
                  status: "completed",
                  time: "15 minutes ago",
                },
                {
                  id: "TXN-003",
                  customer: "Johnson Builders",
                  amount: "$3,750.00",
                  method: "Credit Card",
                  status: "pending",
                  time: "1 hour ago",
                },
                {
                  id: "TXN-004",
                  customer: "Davis Contractors",
                  amount: "$890.00",
                  method: "PayPal",
                  status: "completed",
                  time: "2 hours ago",
                },
                {
                  id: "TXN-005",
                  customer: "Wilson Construction",
                  amount: "$5,200.00",
                  method: "Credit Card",
                  status: "failed",
                  time: "3 hours ago",
                },
              ].map((transaction, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        transaction.status === "completed"
                          ? "bg-green-500"
                          : transaction.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    />
                    <div>
                      <div className="text-white font-medium">
                        {transaction.id}
                      </div>
                      <div className="text-sm text-slate-400">
                        {transaction.customer}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">
                      {transaction.amount}
                    </div>
                    <div className="text-sm text-slate-400">
                      {transaction.method}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant="outline"
                      className={`${
                        transaction.status === "completed"
                          ? "text-green-400 bg-green-500/10 border-green-500/20"
                          : transaction.status === "pending"
                            ? "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
                            : "text-red-400 bg-red-500/10 border-red-500/20"
                      }`}
                    >
                      {transaction.status}
                    </Badge>
                    <div className="text-sm text-slate-400 mt-1">
                      {transaction.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentProcessingIntegration;
