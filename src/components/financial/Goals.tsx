import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, Calendar, DollarSign } from "lucide-react";

interface Goal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  status: "on-track" | "behind" | "completed";
}

const mockGoals: Goal[] = [
  {
    id: "1",
    title: "Q4 Revenue Target",
    description: "Achieve $500K in revenue for Q4",
    targetAmount: 500000,
    currentAmount: 375000,
    deadline: "2024-12-31",
    category: "Revenue",
    status: "on-track",
  },
  {
    id: "2",
    title: "Cost Reduction",
    description: "Reduce operational costs by 15%",
    targetAmount: 50000,
    currentAmount: 32000,
    deadline: "2024-11-30",
    category: "Cost Savings",
    status: "behind",
  },
  {
    id: "3",
    title: "New Client Acquisition",
    description: "Acquire 25 new clients this quarter",
    targetAmount: 25,
    currentAmount: 25,
    deadline: "2024-10-31",
    category: "Growth",
    status: "completed",
  },
];

const Goals = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "on-track":
        return "bg-blue-500";
      case "behind":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Financial Goals
            </h1>
            <p className="text-slate-600 mt-2">
              Track and manage your financial objectives
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Target className="w-4 h-4 mr-2" />
            Add New Goal
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Goals</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockGoals.length}</div>
              <p className="text-xs text-muted-foreground">Active objectives</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {mockGoals.filter((g) => g.status === "completed").length}
              </div>
              <p className="text-xs text-muted-foreground">Goals achieved</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On Track</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {mockGoals.filter((g) => g.status === "on-track").length}
              </div>
              <p className="text-xs text-muted-foreground">Progressing well</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Behind Schedule
              </CardTitle>
              <DollarSign className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {mockGoals.filter((g) => g.status === "behind").length}
              </div>
              <p className="text-xs text-muted-foreground">Need attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Goals List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockGoals.map((goal) => {
            const progressPercentage = getProgressPercentage(
              goal.currentAmount,
              goal.targetAmount,
            );

            return (
              <Card key={goal.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      <CardDescription>{goal.description}</CardDescription>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`${getStatusColor(goal.status)} text-white`}
                    >
                      {goal.status.replace("-", " ").toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{progressPercentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Current</p>
                      <p className="font-semibold">
                        {goal.category === "Growth"
                          ? goal.currentAmount
                          : formatCurrency(goal.currentAmount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Target</p>
                      <p className="font-semibold">
                        {goal.category === "Growth"
                          ? goal.targetAmount
                          : formatCurrency(goal.targetAmount)}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t">
                    <div className="text-sm">
                      <p className="text-muted-foreground">Deadline</p>
                      <p className="font-medium">
                        {new Date(goal.deadline).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline">{goal.category}</Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Goals;
