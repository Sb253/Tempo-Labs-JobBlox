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
  TrendingUp,
  TrendingDown,
  Brain,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  Activity,
  Calendar,
  Settings,
} from "lucide-react";

interface Prediction {
  id: string;
  title: string;
  category: "financial" | "operational" | "risk" | "opportunity";
  confidence: number;
  impact: "high" | "medium" | "low";
  timeframe: string;
  description: string;
  recommendation: string;
  trend: "up" | "down" | "stable";
  value: string;
}

const mockPredictions: Prediction[] = [
  {
    id: "pred_001",
    title: "Revenue Growth Forecast",
    category: "financial",
    confidence: 87,
    impact: "high",
    timeframe: "Next 3 months",
    description:
      "Based on current project pipeline and market trends, revenue is expected to increase by 15-18%",
    recommendation:
      "Prepare for increased resource allocation and consider expanding team capacity",
    trend: "up",
    value: "+15-18%",
  },
  {
    id: "pred_002",
    title: "Material Cost Increase",
    category: "risk",
    confidence: 92,
    impact: "medium",
    timeframe: "Next 6 weeks",
    description:
      "Steel and concrete prices are predicted to rise by 8-12% due to supply chain constraints",
    recommendation:
      "Consider bulk purchasing agreements and alternative material sourcing",
    trend: "up",
    value: "+8-12%",
  },
  {
    id: "pred_003",
    title: "Project Completion Optimization",
    category: "opportunity",
    confidence: 78,
    impact: "high",
    timeframe: "Next 2 months",
    description:
      "AI analysis suggests 23% improvement in project completion times with workflow optimization",
    recommendation:
      "Implement suggested workflow changes and resource reallocation strategies",
    trend: "up",
    value: "+23%",
  },
  {
    id: "pred_004",
    title: "Employee Turnover Risk",
    category: "risk",
    confidence: 71,
    impact: "medium",
    timeframe: "Next 4 months",
    description:
      "Predictive model indicates potential 15% increase in employee turnover in Q2",
    recommendation:
      "Review compensation packages and implement retention strategies",
    trend: "up",
    value: "+15%",
  },
  {
    id: "pred_005",
    title: "Equipment Maintenance Savings",
    category: "opportunity",
    confidence: 84,
    impact: "medium",
    timeframe: "Next 12 months",
    description:
      "Predictive maintenance could reduce equipment downtime by 35% and save $45K annually",
    recommendation:
      "Implement IoT sensors and predictive maintenance scheduling",
    trend: "down",
    value: "-35%",
  },
];

interface Insight {
  id: string;
  title: string;
  type: "trend" | "anomaly" | "pattern" | "forecast";
  priority: "high" | "medium" | "low";
  description: string;
  actionable: boolean;
}

const mockInsights: Insight[] = [
  {
    id: "insight_001",
    title: "Peak Productivity Hours",
    type: "pattern",
    priority: "medium",
    description:
      "Team productivity is 34% higher between 10 AM - 2 PM on Tuesday through Thursday",
    actionable: true,
  },
  {
    id: "insight_002",
    title: "Client Payment Delay Pattern",
    type: "trend",
    priority: "high",
    description:
      "Commercial clients show 18% longer payment cycles during Q4, affecting cash flow",
    actionable: true,
  },
  {
    id: "insight_003",
    title: "Weather Impact Correlation",
    type: "pattern",
    priority: "medium",
    description:
      "Project delays increase by 45% during rainy seasons, particularly for outdoor work",
    actionable: true,
  },
  {
    id: "insight_004",
    title: "Resource Utilization Anomaly",
    type: "anomaly",
    priority: "high",
    description:
      "Equipment utilization dropped 22% last week without corresponding project changes",
    actionable: true,
  },
];

const PredictiveAnalytics = () => {
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "financial":
        return <Badge className="bg-green-100 text-green-800">Financial</Badge>;
      case "operational":
        return <Badge className="bg-blue-100 text-blue-800">Operational</Badge>;
      case "risk":
        return <Badge className="bg-red-100 text-red-800">Risk</Badge>;
      case "opportunity":
        return (
          <Badge className="bg-purple-100 text-purple-800">Opportunity</Badge>
        );
      default:
        return <Badge variant="secondary">{category}</Badge>;
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">High Impact</Badge>;
      case "medium":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Medium Impact</Badge>
        );
      case "low":
        return (
          <Badge className="bg-green-100 text-green-800">Low Impact</Badge>
        );
      default:
        return <Badge variant="secondary">{impact}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">High Priority</Badge>;
      case "medium":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            Medium Priority
          </Badge>
        );
      case "low":
        return (
          <Badge className="bg-green-100 text-green-800">Low Priority</Badge>
        );
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "trend":
        return <TrendingUp className="w-4 h-4 text-blue-600" />;
      case "anomaly":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case "pattern":
        return <Target className="w-4 h-4 text-green-600" />;
      case "forecast":
        return <Brain className="w-4 h-4 text-purple-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const highImpactPredictions = mockPredictions.filter(
    (p) => p.impact === "high",
  ).length;
  const riskPredictions = mockPredictions.filter(
    (p) => p.category === "risk",
  ).length;
  const opportunityPredictions = mockPredictions.filter(
    (p) => p.category === "opportunity",
  ).length;
  const avgConfidence = Math.round(
    mockPredictions.reduce((sum, p) => sum + p.confidence, 0) /
      mockPredictions.length,
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Predictive Analytics
            </h1>
            <p className="text-slate-600 mt-2">
              AI-powered insights and forecasting for business optimization
            </p>
          </div>
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-48">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Forecast Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">Next Month</SelectItem>
                <SelectItem value="3m">Next 3 Months</SelectItem>
                <SelectItem value="6m">Next 6 Months</SelectItem>
                <SelectItem value="1y">Next Year</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Brain className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Impact</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {highImpactPredictions}
              </div>
              <p className="text-xs text-muted-foreground">
                Critical predictions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risk Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {riskPredictions}
              </div>
              <p className="text-xs text-muted-foreground">Potential risks</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Opportunities
              </CardTitle>
              <Target className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {opportunityPredictions}
              </div>
              <p className="text-xs text-muted-foreground">
                Growth opportunities
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Confidence
              </CardTitle>
              <Brain className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {avgConfidence}%
              </div>
              <p className="text-xs text-muted-foreground">
                Prediction accuracy
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="predictions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="models">Models</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="predictions" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockPredictions.map((prediction) => (
                <Card key={prediction.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-lg">
                          {prediction.title}
                        </CardTitle>
                        <div className="flex space-x-2">
                          {getCategoryBadge(prediction.category)}
                          {getImpactBadge(prediction.impact)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          {getTrendIcon(prediction.trend)}
                          <span className="font-bold text-lg">
                            {prediction.value}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {prediction.confidence}% confidence
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Prediction</p>
                      <p className="text-sm text-muted-foreground">
                        {prediction.description}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Recommendation</p>
                      <p className="text-sm text-muted-foreground">
                        {prediction.recommendation}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {prediction.timeframe}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button size="sm">Take Action</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Insights</CardTitle>
                <CardDescription>
                  Automated insights discovered from your business data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockInsights.map((insight) => (
                    <div
                      key={insight.id}
                      className="flex items-start justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-start space-x-3">
                        {getTypeIcon(insight.type)}
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <p className="font-medium">{insight.title}</p>
                            {getPriorityBadge(insight.priority)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {insight.description}
                          </p>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {insight.type.charAt(0).toUpperCase() +
                                insight.type.slice(1)}
                            </Badge>
                            {insight.actionable && (
                              <Badge className="bg-blue-100 text-blue-800 text-xs">
                                Actionable
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Explore
                        </Button>
                        {insight.actionable && (
                          <Button size="sm">Act Now</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="models" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span>Revenue Forecasting</span>
                  </CardTitle>
                  <CardDescription>
                    Predicts future revenue based on historical data and market
                    trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Accuracy</span>
                      <span className="text-sm font-medium">87%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Last Updated</span>
                      <span className="text-sm font-medium">2 hours ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Status</span>
                      <Badge className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span>Resource Optimization</span>
                  </CardTitle>
                  <CardDescription>
                    Optimizes team allocation and resource utilization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Accuracy</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Last Updated</span>
                      <span className="text-sm font-medium">1 hour ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Status</span>
                      <Badge className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <span>Risk Assessment</span>
                  </CardTitle>
                  <CardDescription>
                    Identifies potential risks and their probability
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Accuracy</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Last Updated</span>
                      <span className="text-sm font-medium">4 hours ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Status</span>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        Training
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Predictive Analytics Settings</CardTitle>
                <CardDescription>
                  Configure AI models and prediction parameters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Advanced model configuration coming soon
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

export default PredictiveAnalytics;
