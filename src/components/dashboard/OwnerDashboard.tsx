import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  Crown,
  Shield,
  Briefcase,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  Plus,
  Eye,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const { user, tenant } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const kpis = [
    {
      title: "Total Revenue",
      value: "$2.4M",
      change: "+18.2%",
      trend: "up",
      icon: <DollarSign className="h-6 w-6" />,
      color: "bg-green-500",
    },
    {
      title: "Active Projects",
      value: "47",
      change: "+12.5%",
      trend: "up",
      icon: <Briefcase className="h-6 w-6" />,
      color: "bg-blue-500",
    },
    {
      title: "Team Members",
      value: "156",
      change: "+8.3%",
      trend: "up",
      icon: <Users className="h-6 w-6" />,
      color: "bg-purple-500",
    },
    {
      title: "Profit Margin",
      value: "24.8%",
      change: "+2.1%",
      trend: "up",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "bg-orange-500",
    },
  ];

  const recentProjects = [
    {
      id: 1,
      name: "Downtown Office Complex",
      client: "Metro Corp",
      value: "$850K",
      progress: 75,
      status: "On Track",
      manager: "Sarah Johnson",
      deadline: "Dec 15, 2024",
    },
    {
      id: 2,
      name: "Residential Development",
      client: "Green Valley Homes",
      value: "$1.2M",
      progress: 45,
      status: "At Risk",
      manager: "Mike Chen",
      deadline: "Feb 28, 2025",
    },
    {
      id: 3,
      name: "Shopping Center Renovation",
      client: "Retail Partners",
      value: "$650K",
      progress: 90,
      status: "Ahead",
      manager: "Lisa Rodriguez",
      deadline: "Nov 30, 2024",
    },
  ];

  const teamPerformance = [
    {
      name: "Sarah Johnson",
      role: "Project Manager",
      projects: 8,
      efficiency: 94,
      revenue: "$420K",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    {
      name: "Mike Chen",
      role: "Senior Manager",
      projects: 12,
      efficiency: 89,
      revenue: "$680K",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    },
    {
      name: "Lisa Rodriguez",
      role: "Operations Manager",
      projects: 6,
      efficiency: 96,
      revenue: "$380K",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
    },
  ];

  const financialMetrics = [
    {
      title: "Monthly Recurring Revenue",
      value: "$180K",
      change: "+15.2%",
      trend: "up",
    },
    {
      title: "Operating Expenses",
      value: "$120K",
      change: "+3.1%",
      trend: "up",
    },
    {
      title: "Net Profit",
      value: "$60K",
      change: "+22.8%",
      trend: "up",
    },
    {
      title: "Cash Flow",
      value: "$340K",
      change: "+8.7%",
      trend: "up",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "At Risk":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "Ahead":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-3 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 lg:p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl text-white">
              <Crown className="h-6 w-6 lg:h-8 lg:w-8" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
                Owner Dashboard
              </h1>
              <p className="text-sm lg:text-base text-slate-600 dark:text-slate-400">
                Welcome back, {user?.name}. Here's your business overview.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <Button
              variant="outline"
              onClick={() => navigate("/reports")}
              className="touch-manipulation h-10 lg:h-auto"
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">View Reports</span>
              <span className="sm:hidden">Reports</span>
            </Button>
            <Button
              onClick={() => navigate("/user-management")}
              className="touch-manipulation h-10 lg:h-auto"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {kpis.map((kpi, index) => (
            <Card
              key={index}
              className="border-slate-200 dark:border-slate-700"
            >
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between mb-3 lg:mb-4">
                  <div
                    className={`p-2 lg:p-3 ${kpi.color} rounded-lg text-white`}
                  >
                    {kpi.icon}
                  </div>
                  <div
                    className={`flex items-center space-x-1 text-sm ${
                      kpi.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {kpi.trend === "up" ? (
                      <ArrowUp className="h-4 w-4" />
                    ) : (
                      <ArrowDown className="h-4 w-4" />
                    )}
                    <span>{kpi.change}</span>
                  </div>
                </div>
                <div>
                  <div className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    {kpi.value}
                  </div>
                  <div className="text-xs lg:text-sm text-slate-600 dark:text-slate-400">
                    {kpi.title}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
            <TabsTrigger
              value="overview"
              className="text-xs lg:text-sm py-2 lg:py-3 touch-manipulation"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="text-xs lg:text-sm py-2 lg:py-3 touch-manipulation"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="team"
              className="text-xs lg:text-sm py-2 lg:py-3 touch-manipulation"
            >
              Team
            </TabsTrigger>
            <TabsTrigger
              value="financials"
              className="text-xs lg:text-sm py-2 lg:py-3 touch-manipulation"
            >
              Financials
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              {/* Recent Projects */}
              <Card className="border-slate-200 dark:border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Projects</CardTitle>
                    <CardDescription>
                      Latest project updates and status
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/jobs")}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentProjects.slice(0, 3).map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between p-3 lg:p-4 bg-slate-50 dark:bg-slate-800 rounded-lg touch-manipulation"
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-slate-900 dark:text-white">
                            {project.name}
                          </h4>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          {project.client} • {project.value}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress
                            value={project.progress}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium">
                            {project.progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Company Health */}
              <Card className="border-slate-200 dark:border-slate-700">
                <CardHeader>
                  <CardTitle>Company Health</CardTitle>
                  <CardDescription>
                    Key business indicators and alerts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="font-medium text-green-900 dark:text-green-100">
                          Cash Flow Positive
                        </div>
                        <div className="text-sm text-green-700 dark:text-green-300">
                          Strong financial position
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-blue-900 dark:text-blue-100">
                          Project Timeline
                        </div>
                        <div className="text-sm text-blue-700 dark:text-blue-300">
                          85% of projects on schedule
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      <div>
                        <div className="font-medium text-yellow-900 dark:text-yellow-100">
                          Resource Allocation
                        </div>
                        <div className="text-sm text-yellow-700 dark:text-yellow-300">
                          3 projects need attention
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card className="border-slate-200 dark:border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>All Projects</CardTitle>
                  <CardDescription>
                    Complete overview of all company projects
                  </CardDescription>
                </div>
                <Button onClick={() => navigate("/job-form")}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                      onClick={() => navigate(`/jobs/${project.id}`)}
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                            {project.name}
                          </h3>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-slate-600 dark:text-slate-400">
                          <div>
                            <span className="font-medium">Client:</span>{" "}
                            {project.client}
                          </div>
                          <div>
                            <span className="font-medium">Value:</span>{" "}
                            {project.value}
                          </div>
                          <div>
                            <span className="font-medium">Manager:</span>{" "}
                            {project.manager}
                          </div>
                          <div>
                            <span className="font-medium">Deadline:</span>{" "}
                            {project.deadline}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mt-3">
                          <Progress
                            value={project.progress}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium">
                            {project.progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card className="border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
                <CardDescription>
                  Overview of team member performance and contributions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamPerformance.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white">
                            {member.name}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {member.role}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-8 text-center">
                        <div>
                          <div className="text-lg font-bold text-slate-900 dark:text-white">
                            {member.projects}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            Projects
                          </div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-slate-900 dark:text-white">
                            {member.efficiency}%
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            Efficiency
                          </div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-slate-900 dark:text-white">
                            {member.revenue}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            Revenue
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financials" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {financialMetrics.map((metric, index) => (
                <Card
                  key={index}
                  className="border-slate-200 dark:border-slate-700"
                >
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {metric.title}
                      </h3>
                      <div
                        className={`flex items-center space-x-1 text-sm ${
                          metric.trend === "up"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {metric.trend === "up" ? (
                          <ArrowUp className="h-4 w-4" />
                        ) : (
                          <ArrowDown className="h-4 w-4" />
                        )}
                        <span>{metric.change}</span>
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white">
                      {metric.value}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OwnerDashboard;
