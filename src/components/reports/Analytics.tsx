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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Calendar,
  Target,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

interface MetricCard {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: React.ReactNode;
  description: string;
}

const mockMetrics: MetricCard[] = [
  {
    title: "Total Revenue",
    value: "$2,847,392",
    change: "+12.5%",
    trend: "up",
    icon: <DollarSign className="h-4 w-4" />,
    description: "vs last month",
  },
  {
    title: "Active Projects",
    value: "24",
    change: "+3",
    trend: "up",
    icon: <Target className="h-4 w-4" />,
    description: "vs last month",
  },
  {
    title: "Team Productivity",
    value: "87%",
    change: "-2.1%",
    trend: "down",
    icon: <Users className="h-4 w-4" />,
    description: "vs last month",
  },
  {
    title: "Client Satisfaction",
    value: "4.8/5",
    change: "+0.2",
    trend: "up",
    icon: <CheckCircle className="h-4 w-4" />,
    description: "average rating",
  },
  {
    title: "Project Completion Rate",
    value: "94%",
    change: "+5.3%",
    trend: "up",
    icon: <Activity className="h-4 w-4" />,
    description: "on-time delivery",
  },
  {
    title: "Average Project Duration",
    value: "45 days",
    change: "-3 days",
    trend: "up",
    icon: <Clock className="h-4 w-4" />,
    description: "vs last quarter",
  },
];

interface ChartData {
  name: string;
  value: number;
  color: string;
}

const revenueData: ChartData[] = [
  { name: "Jan", value: 245000, color: "#3b82f6" },
  { name: "Feb", value: 289000, color: "#3b82f6" },
  { name: "Mar", value: 312000, color: "#3b82f6" },
  { name: "Apr", value: 278000, color: "#3b82f6" },
  { name: "May", value: 334000, color: "#3b82f6" },
  { name: "Jun", value: 298000, color: "#3b82f6" },
];

const projectTypeData: ChartData[] = [
  { name: "Residential", value: 45, color: "#10b981" },
  { name: "Commercial", value: 30, color: "#f59e0b" },
  { name: "Industrial", value: 15, color: "#ef4444" },
  { name: "Infrastructure", value: 10, color: "#8b5cf6" },
];

const Analytics = () => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
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
            <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
            <p className="text-slate-600 mt-2">
              Business intelligence and performance analytics
            </p>
          </div>
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-48">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <BarChart3 className="w-4 h-4 mr-2" />
              Export Analytics
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockMetrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                {metric.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center space-x-2 mt-2">
                  {getTrendIcon(metric.trend)}
                  <span
                    className={`text-sm font-medium ${getTrendColor(metric.trend)}`}
                  >
                    {metric.change}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {metric.description}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Analytics */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>
                    Monthly revenue performance over the last 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueData.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="text-sm font-medium">
                            {item.name}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            ${item.value.toLocaleString()}
                          </p>
                          <div className="w-24 h-2 bg-gray-200 rounded-full mt-1">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                backgroundColor: item.color,
                                width: `${(item.value / Math.max(...revenueData.map((d) => d.value))) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Project Distribution</CardTitle>
                  <CardDescription>
                    Breakdown of projects by type and category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projectTypeData.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="text-sm font-medium">
                            {item.name}
                          </span>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">{item.value}%</Badge>
                          <div className="w-16 h-2 bg-gray-200 rounded-full mt-1">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                backgroundColor: item.color,
                                width: `${item.value}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Alerts</CardTitle>
                  <CardDescription>
                    Important metrics requiring attention
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="text-sm font-medium">Budget Variance</p>
                      <p className="text-xs text-muted-foreground">
                        Project Alpha is 15% over budget
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Schedule Delay</p>
                      <p className="text-xs text-muted-foreground">
                        2 projects behind schedule
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">Quality Score</p>
                      <p className="text-xs text-muted-foreground">
                        Above target for Q1
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performers</CardTitle>
                  <CardDescription>
                    Highest performing team members
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Sarah Johnson</p>
                        <p className="text-xs text-muted-foreground">
                          Project Manager
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">98%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Mike Wilson</p>
                        <p className="text-xs text-muted-foreground">
                          Site Supervisor
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">95%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Lisa Davis</p>
                        <p className="text-xs text-muted-foreground">
                          Field Engineer
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">92%</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Insights</CardTitle>
                  <CardDescription>
                    AI-generated business insights
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <p className="text-sm font-medium mb-1">
                      Cost Optimization
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Material costs can be reduced by 8% through bulk
                      purchasing
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="text-sm font-medium mb-1">
                      Resource Allocation
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Team productivity peaks on Tuesday-Thursday
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="text-sm font-medium mb-1">Client Patterns</p>
                    <p className="text-xs text-muted-foreground">
                      Residential projects show 23% higher satisfaction
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Financial Analytics</CardTitle>
                <CardDescription>
                  Detailed financial performance and trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Advanced financial analytics coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Analytics</CardTitle>
                <CardDescription>
                  Project performance metrics and analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Project analytics dashboard coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>
                  Team and operational performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Performance analytics coming soon
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

export default Analytics;
