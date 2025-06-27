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
  Briefcase,
  Users,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  FileText,
  MessageSquare,
  Settings,
  Plus,
  Eye,
  Edit,
  Target,
  BarChart3,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ManagerDashboard = () => {
  const { user, tenant } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const managerMetrics = [
    {
      title: "Assigned Projects",
      value: "12",
      change: "+2 this month",
      icon: <Briefcase className="h-6 w-6" />,
      color: "bg-blue-500",
    },
    {
      title: "Team Members",
      value: "24",
      change: "+3 new hires",
      icon: <Users className="h-6 w-6" />,
      color: "bg-green-500",
    },
    {
      title: "Tasks Completed",
      value: "89%",
      change: "+5% this week",
      icon: <CheckCircle className="h-6 w-6" />,
      color: "bg-purple-500",
    },
    {
      title: "On-Time Delivery",
      value: "94%",
      change: "Above target",
      icon: <Target className="h-6 w-6" />,
      color: "bg-orange-500",
    },
  ];

  const assignedProjects = [
    {
      id: 1,
      name: "Downtown Office Complex",
      client: "Metro Corp",
      progress: 75,
      status: "On Track",
      deadline: "Dec 15, 2024",
      budget: "$850K",
      team: 8,
      priority: "High",
    },
    {
      id: 2,
      name: "Residential Villa",
      client: "Johnson Family",
      progress: 45,
      status: "At Risk",
      deadline: "Jan 30, 2025",
      budget: "$420K",
      team: 5,
      priority: "Medium",
    },
    {
      id: 3,
      name: "Shopping Center Renovation",
      client: "Retail Partners",
      progress: 90,
      status: "Ahead",
      deadline: "Nov 30, 2024",
      budget: "$650K",
      team: 12,
      priority: "High",
    },
  ];

  const teamMembers = [
    {
      id: 1,
      name: "John Smith",
      role: "Senior Worker",
      status: "Active",
      currentProject: "Downtown Office Complex",
      tasksCompleted: 23,
      efficiency: 94,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      role: "Field Supervisor",
      status: "Active",
      currentProject: "Residential Villa",
      tasksCompleted: 18,
      efficiency: 89,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Specialist",
      status: "On Leave",
      currentProject: "Shopping Center Renovation",
      tasksCompleted: 15,
      efficiency: 92,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    },
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: "Review project blueprints",
      project: "Downtown Office Complex",
      priority: "High",
      dueDate: "Today, 3:00 PM",
      assignee: "John Smith",
      status: "Pending",
    },
    {
      id: 2,
      title: "Client meeting - Villa project",
      project: "Residential Villa",
      priority: "Medium",
      dueDate: "Tomorrow, 10:00 AM",
      assignee: "Sarah Wilson",
      status: "Scheduled",
    },
    {
      id: 3,
      title: "Site inspection",
      project: "Shopping Center Renovation",
      priority: "High",
      dueDate: "Dec 1, 2:00 PM",
      assignee: "Mike Johnson",
      status: "Pending",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "on track":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "at risk":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "ahead":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "on leave":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white">
              <Briefcase className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Manager Dashboard
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Manage your projects and team efficiently
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => navigate("/scheduling")}
              className="touch-manipulation"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Schedule
            </Button>
            <Button
              onClick={() => navigate("/job-form")}
              className="touch-manipulation"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>
        </div>

        {/* Manager Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {managerMetrics.map((metric, index) => (
            <Card
              key={index}
              className="border-slate-200 dark:border-slate-700"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 ${metric.color} rounded-lg text-white`}>
                    {metric.icon}
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">
                    {metric.change}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {metric.title}
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
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Project Status Overview */}
              <Card className="border-slate-200 dark:border-slate-700">
                <CardHeader>
                  <CardTitle>Project Status Overview</CardTitle>
                  <CardDescription>
                    Current status of your assigned projects
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {assignedProjects.slice(0, 3).map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg"
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
                          {project.client} • Due: {project.deadline}
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

              {/* Team Performance */}
              <Card className="border-slate-200 dark:border-slate-700">
                <CardHeader>
                  <CardTitle>Team Performance</CardTitle>
                  <CardDescription>
                    Overview of your team members' performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {teamMembers.slice(0, 3).map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="font-medium text-slate-900 dark:text-white">
                            {member.name}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            {member.role}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-slate-900 dark:text-white">
                          {member.efficiency}%
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          Efficiency
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card className="border-slate-200 dark:border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Assigned Projects</CardTitle>
                  <CardDescription>
                    All projects under your management
                  </CardDescription>
                </div>
                <Button onClick={() => navigate("/job-form")}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assignedProjects.map((project) => (
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
                          <div className="flex items-center space-x-2">
                            <Badge
                              className={getPriorityColor(project.priority)}
                            >
                              {project.priority}
                            </Badge>
                            <Badge className={getStatusColor(project.status)}>
                              {project.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-slate-600 dark:text-slate-400">
                          <div>
                            <span className="font-medium">Client:</span>{" "}
                            {project.client}
                          </div>
                          <div>
                            <span className="font-medium">Budget:</span>{" "}
                            {project.budget}
                          </div>
                          <div>
                            <span className="font-medium">Team:</span>{" "}
                            {project.team} members
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
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Team Management</CardTitle>
                  <CardDescription>
                    Manage your team members and their assignments
                  </CardDescription>
                </div>
                <Button onClick={() => navigate("/team-management")}>
                  <Users className="mr-2 h-4 w-4" />
                  Manage Team
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
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
                          <p className="text-xs text-slate-500 mt-1">
                            Current: {member.currentProject}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-lg font-bold text-slate-900 dark:text-white">
                            {member.tasksCompleted}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            Tasks
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-slate-900 dark:text-white">
                            {member.efficiency}%
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            Efficiency
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(member.status)}>
                            {member.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <Card className="border-slate-200 dark:border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Upcoming Tasks</CardTitle>
                  <CardDescription>
                    Tasks requiring your attention and approval
                  </CardDescription>
                </div>
                <Button onClick={() => navigate("/tasks")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Task
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-slate-900 dark:text-white">
                            {task.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <Badge className={getPriorityColor(task.priority)}>
                              {task.priority}
                            </Badge>
                            <Badge className={getStatusColor(task.status)}>
                              {task.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600 dark:text-slate-400">
                          <div>
                            <span className="font-medium">Project:</span>{" "}
                            {task.project}
                          </div>
                          <div>
                            <span className="font-medium">Assignee:</span>{" "}
                            {task.assignee}
                          </div>
                          <div>
                            <span className="font-medium">Due:</span>{" "}
                            {task.dueDate}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ManagerDashboard;
