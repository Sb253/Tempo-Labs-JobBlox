import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Briefcase,
  Calendar,
  Target,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface KPIMetric {
  id: string;
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ReactNode;
  color: string;
  progress?: number;
  target?: string;
}

const KPIs = () => {
  const kpiMetrics: KPIMetric[] = [
    {
      id: "revenue",
      title: "Monthly Revenue",
      value: "$127,450",
      change: 12.5,
      changeLabel: "vs last month",
      icon: <DollarSign className="h-5 w-5" />,
      color: "bg-green-500",
      progress: 85,
      target: "$150,000",
    },
    {
      id: "projects",
      title: "Active Projects",
      value: "24",
      change: 8.3,
      changeLabel: "new this month",
      icon: <Briefcase className="h-5 w-5" />,
      color: "bg-blue-500",
      progress: 75,
      target: "32",
    },
    {
      id: "customers",
      title: "Total Customers",
      value: "156",
      change: 15.2,
      changeLabel: "growth rate",
      icon: <Users className="h-5 w-5" />,
      color: "bg-purple-500",
      progress: 92,
      target: "170",
    },
    {
      id: "completion",
      title: "Project Completion",
      value: "89%",
      change: 5.7,
      changeLabel: "efficiency gain",
      icon: <Target className="h-5 w-5" />,
      color: "bg-orange-500",
      progress: 89,
      target: "95%",
    },
    {
      id: "schedule",
      title: "On-Time Delivery",
      value: "94%",
      change: 3.2,
      changeLabel: "improvement",
      icon: <Calendar className="h-5 w-5" />,
      color: "bg-teal-500",
      progress: 94,
      target: "98%",
    },
    {
      id: "safety",
      title: "Safety Score",
      value: "98.5",
      change: -1.2,
      changeLabel: "incidents down",
      icon: <AlertTriangle className="h-5 w-5" />,
      color: "bg-red-500",
      progress: 98.5,
      target: "100",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold gradient-text">
            Key Performance Indicators
          </h1>
          <p className="text-slate-400">
            Monitor your construction business performance in real-time
          </p>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpiMetrics.map((metric) => (
            <Card
              key={metric.id}
              className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-all duration-300 hover:scale-105"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-200">
                  {metric.title}
                </CardTitle>
                <div className={cn("p-2 rounded-lg", metric.color)}>
                  {metric.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div className="text-2xl font-bold text-white">
                      {metric.value}
                    </div>
                    {metric.target && (
                      <div className="text-xs text-slate-400">
                        Target: {metric.target}
                      </div>
                    )}
                  </div>

                  {metric.progress && (
                    <div className="space-y-1">
                      <Progress value={metric.progress} className="h-2" />
                      <div className="text-xs text-slate-400">
                        {metric.progress}% of target
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    {metric.change > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <Badge
                      variant={metric.change > 0 ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {metric.change > 0 ? "+" : ""}
                      {metric.change}%
                    </Badge>
                    <span className="text-xs text-slate-400">
                      {metric.changeLabel}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Performance Trends</CardTitle>
              <CardDescription className="text-slate-400">
                Track your key metrics over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-slate-700 rounded-lg flex items-center justify-center">
                <p className="text-slate-400">
                  Chart visualization would go here
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Goal Progress</CardTitle>
              <CardDescription className="text-slate-400">
                Track progress towards quarterly goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { goal: "Revenue Target", progress: 85, target: "$500K" },
                  { goal: "New Customers", progress: 67, target: "50" },
                  { goal: "Project Completion", progress: 92, target: "95%" },
                  { goal: "Safety Standards", progress: 98, target: "100%" },
                ].map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-200">{goal.goal}</span>
                      <span className="text-slate-400">
                        {goal.progress}% of {goal.target}
                      </span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default KPIs;
