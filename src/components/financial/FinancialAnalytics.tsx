import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  DollarSign,
  Calendar,
} from "lucide-react";

interface FinancialMetric {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  unit: string;
  trend: "up" | "down" | "stable";
}

const mockMetrics: FinancialMetric[] = [
  {
    id: "1",
    name: "Revenue",
    value: 125000,
    previousValue: 110000,
    unit: "USD",
    trend: "up",
  },
  {
    id: "2",
    name: "Profit Margin",
    value: 18.5,
    previousValue: 16.2,
    unit: "%",
    trend: "up",
  },
  {
    id: "3",
    name: "Operating Expenses",
    value: 85000,
    previousValue: 92000,
    unit: "USD",
    trend: "down",
  },
  {
    id: "4",
    name: "Cash Flow",
    value: 45000,
    previousValue: 38000,
    unit: "USD",
    trend: "up",
  },
];

const FinancialAnalytics = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const calculatePercentageChange = (current: number, previous: number) => {
    return (((current - previous) / previous) * 100).toFixed(1);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <BarChart3 className="w-4 h-4 text-gray-600" />;
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

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Financial Analytics
            </h1>
            <p className="text-slate-600 mt-2">
              Comprehensive financial performance insights
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <BarChart3 className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockMetrics.map((metric) => {
            const percentageChange = calculatePercentageChange(
              metric.value,
              metric.previousValue,
            );
            const isPositiveChange = metric.value > metric.previousValue;

            return (
              <Card key={metric.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {metric.name}
                  </CardTitle>
                  {getTrendIcon(metric.trend)}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {metric.unit === "USD"
                      ? formatCurrency(metric.value)
                      : `${metric.value}${metric.unit}`}
                  </div>
                  <div
                    className={`text-xs flex items-center mt-1 ${getTrendColor(metric.trend)}`}
                  >
                    <span
                      className={
                        isPositiveChange ? "text-green-600" : "text-red-600"
                      }
                    >
                      {isPositiveChange ? "+" : ""}
                      {percentageChange}%
                    </span>
                    <span className="text-muted-foreground ml-1">
                      from last period
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
            <TabsTrigger value="expenses">Expense Analysis</TabsTrigger>
            <TabsTrigger value="profitability">Profitability</TabsTrigger>
            <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Performance Summary</CardTitle>
                  <CardDescription>
                    Key performance indicators for this period
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        Revenue Growth
                      </span>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        +13.6%
                      </Badge>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        Cost Efficiency
                      </span>
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-800"
                      >
                        +7.6%
                      </Badge>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Profit Margin</span>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        +14.2%
                      </Badge>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Financial Health Score</CardTitle>
                  <CardDescription>
                    Overall financial performance rating
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      8.7
                    </div>
                    <div className="text-sm text-muted-foreground mb-4">
                      out of 10
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      Excellent
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Liquidity</span>
                      <span className="font-medium">9.2/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Profitability</span>
                      <span className="font-medium">8.5/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Efficiency</span>
                      <span className="font-medium">8.1/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Growth</span>
                      <span className="font-medium">9.0/10</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analysis</CardTitle>
                <CardDescription>
                  Detailed revenue breakdown and trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Revenue analysis charts coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Expense Analysis</CardTitle>
                <CardDescription>
                  Expense categorization and optimization opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <PieChart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Expense analysis charts coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profitability" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profitability Analysis</CardTitle>
                <CardDescription>
                  Profit margins and profitability trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Profitability analysis coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forecasting" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Financial Forecasting</CardTitle>
                <CardDescription>
                  Predictive financial modeling and projections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Financial forecasting coming soon
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

export default FinancialAnalytics;
