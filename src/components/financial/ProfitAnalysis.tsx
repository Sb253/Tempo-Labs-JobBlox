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
  DollarSign,
  PieChart,
  BarChart3,
  Target,
} from "lucide-react";

interface ProfitData {
  period: string;
  revenue: number;
  costs: number;
  grossProfit: number;
  netProfit: number;
  margin: number;
}

const mockProfitData: ProfitData[] = [
  {
    period: "Q1 2024",
    revenue: 125000,
    costs: 85000,
    grossProfit: 40000,
    netProfit: 32000,
    margin: 25.6,
  },
  {
    period: "Q2 2024",
    revenue: 142000,
    costs: 92000,
    grossProfit: 50000,
    netProfit: 38000,
    margin: 26.8,
  },
  {
    period: "Q3 2024",
    revenue: 158000,
    costs: 98000,
    grossProfit: 60000,
    netProfit: 45000,
    margin: 28.5,
  },
];

interface CostBreakdown {
  category: string;
  amount: number;
  percentage: number;
  trend: "up" | "down" | "stable";
}

const mockCostBreakdown: CostBreakdown[] = [
  { category: "Labor", amount: 45000, percentage: 46, trend: "up" },
  { category: "Materials", amount: 28000, percentage: 29, trend: "down" },
  { category: "Equipment", amount: 15000, percentage: 15, trend: "stable" },
  { category: "Overhead", amount: 10000, percentage: 10, trend: "down" },
];

const ProfitAnalysis = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const currentQuarter = mockProfitData[mockProfitData.length - 1];
  const previousQuarter = mockProfitData[mockProfitData.length - 2];

  const profitGrowth = (
    ((currentQuarter.netProfit - previousQuarter.netProfit) /
      previousQuarter.netProfit) *
    100
  ).toFixed(1);
  const marginImprovement = (
    currentQuarter.margin - previousQuarter.margin
  ).toFixed(1);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-red-600" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-green-600" />;
      default:
        return <BarChart3 className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Profit Analysis
            </h1>
            <p className="text-slate-600 mt-2">
              Comprehensive profitability insights and cost analysis
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Target className="w-4 h-4 mr-2" />
              Set Targets
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(currentQuarter.netProfit)}
              </div>
              <div className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />+{profitGrowth}% from
                last quarter
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Profit Margin
              </CardTitle>
              <PieChart className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {currentQuarter.margin}%
              </div>
              <div className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />+{marginImprovement}%
                improvement
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {formatCurrency(currentQuarter.revenue)}
              </div>
              <div className="text-xs text-muted-foreground">
                Current quarter
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Costs</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(currentQuarter.costs)}
              </div>
              <div className="text-xs text-muted-foreground">
                Current quarter
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Profit Trends</TabsTrigger>
            <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
            <TabsTrigger value="margins">Margin Analysis</TabsTrigger>
            <TabsTrigger value="projections">Projections</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quarterly Performance</CardTitle>
                  <CardDescription>
                    Profit and loss summary by quarter
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockProfitData.map((data, index) => (
                    <div key={data.period} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{data.period}</span>
                        <Badge
                          variant={
                            index === mockProfitData.length - 1
                              ? "default"
                              : "secondary"
                          }
                        >
                          {data.margin}% margin
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Revenue</p>
                          <p className="font-semibold text-green-600">
                            {formatCurrency(data.revenue)}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Costs</p>
                          <p className="font-semibold text-red-600">
                            {formatCurrency(data.costs)}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Net Profit</p>
                          <p className="font-semibold text-blue-600">
                            {formatCurrency(data.netProfit)}
                          </p>
                        </div>
                      </div>
                      {index < mockProfitData.length - 1 && (
                        <hr className="my-3" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cost Breakdown</CardTitle>
                  <CardDescription>
                    Current quarter cost distribution
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockCostBreakdown.map((cost) => (
                    <div key={cost.category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{cost.category}</span>
                          {getTrendIcon(cost.trend)}
                        </div>
                        <span className="text-sm font-semibold">
                          {formatCurrency(cost.amount)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress
                          value={cost.percentage}
                          className="flex-1 h-2"
                        />
                        <span className="text-sm text-muted-foreground w-12">
                          {cost.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profit Trends</CardTitle>
                <CardDescription>
                  Historical profit performance and trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Profit trend charts coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="costs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Cost Analysis</CardTitle>
                <CardDescription>
                  In-depth cost breakdown and optimization opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <PieChart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Detailed cost analysis coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="margins" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Margin Analysis</CardTitle>
                <CardDescription>
                  Profit margin trends and benchmarking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Margin analysis charts coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projections" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profit Projections</CardTitle>
                <CardDescription>
                  Future profit forecasts and scenarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Profit projections coming soon
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

export default ProfitAnalysis;
