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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Building2,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Bell,
  Search,
  Menu,
  Plus,
  Settings,
  User,
  LogOut,
  Home,
  Briefcase,
  FileText,
  BarChart3,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowRight,
  Filter,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const MobileDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Active Projects",
      value: "12",
      change: "+2 this week",
      icon: <Briefcase className="h-5 w-5" />,
      color: "bg-blue-500",
      trend: "up",
    },
    {
      title: "Total Revenue",
      value: "$48.2K",
      change: "+12% this month",
      icon: <DollarSign className="h-5 w-5" />,
      color: "bg-green-500",
      trend: "up",
    },
    {
      title: "Team Members",
      value: "24",
      change: "3 new hires",
      icon: <Users className="h-5 w-5" />,
      color: "bg-purple-500",
      trend: "up",
    },
    {
      title: "Completion Rate",
      value: "94%",
      change: "+5% improvement",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "bg-orange-500",
      trend: "up",
    },
  ];

  const recentProjects = [
    {
      id: 1,
      name: "Downtown Office Complex",
      client: "ABC Corp",
      status: "In Progress",
      progress: 75,
      dueDate: "Dec 15, 2024",
      priority: "high",
    },
    {
      id: 2,
      name: "Residential Villa",
      client: "Johnson Family",
      status: "Planning",
      progress: 25,
      dueDate: "Jan 30, 2025",
      priority: "medium",
    },
    {
      id: 3,
      name: "Shopping Center Renovation",
      client: "Retail Group",
      status: "Review",
      progress: 90,
      dueDate: "Nov 28, 2024",
      priority: "high",
    },
  ];

  const quickActions = [
    {
      icon: <Plus className="h-5 w-5" />,
      label: "New Project",
      action: () => navigate("/job-form"),
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Add Client",
      action: () => navigate("/customer-intake"),
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Create Estimate",
      action: () => navigate("/estimates"),
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Schedule",
      action: () => navigate("/scheduling"),
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "in progress":
        return "bg-blue-500";
      case "planning":
        return "bg-yellow-500";
      case "review":
        return "bg-purple-500";
      case "completed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-2">
                    <Building2 className="h-6 w-6 text-blue-500" />
                    <span>JobBlox</span>
                  </SheetTitle>
                  <SheetDescription>
                    Construction Management Platform
                  </SheetDescription>
                </SheetHeader>
                <nav className="mt-8 space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => navigate("/dashboard")}
                  >
                    <Home className="mr-3 h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => navigate("/jobs")}
                  >
                    <Briefcase className="mr-3 h-4 w-4" />
                    Projects
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => navigate("/customers")}
                  >
                    <Users className="mr-3 h-4 w-4" />
                    Customers
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => navigate("/reports")}
                  >
                    <BarChart3 className="mr-3 h-4 w-4" />
                    Reports
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => navigate("/team-chat")}
                  >
                    <MessageSquare className="mr-3 h-4 w-4" />
                    Messages
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => navigate("/user-management")}
                  >
                    <Settings className="mr-3 h-4 w-4" />
                    Settings
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>

            <div className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-blue-500" />
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                JobBlox
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email || "user@example.com"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/user-management")}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/user-management")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">
            Welcome back, {user?.name?.split(" ")[0] || "User"}!
          </h1>
          <p className="text-blue-100 mb-4">
            Here's what's happening with your projects today.
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate("/job-form")}
            className="bg-white/20 hover:bg-white/30 text-white border-0"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${stat.color} text-white`}>
                    {stat.icon}
                  </div>
                  {stat.trend === "up" && (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    {stat.title}
                  </p>
                  <p className="text-xs text-green-600">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-16 flex-col space-y-2 hover:bg-slate-50 dark:hover:bg-slate-800"
                  onClick={action.action}
                >
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    {action.icon}
                  </div>
                  <span className="text-xs font-medium">{action.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Different Views */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Recent Projects */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-lg">Recent Projects</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/jobs")}
                >
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="space-y-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium text-slate-900 dark:text-white">
                          {project.name}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {project.client}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(project.priority)}>
                          {project.priority}
                        </Badge>
                        <Badge
                          className={`${getStatusColor(project.status)} text-white`}
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">
                          Progress
                        </span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">
                        Due: {project.dueDate}
                      </span>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-lg">All Projects</CardTitle>
                <Button variant="ghost" size="sm">
                  <Filter className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Briefcase className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 dark:text-slate-400">
                    Project list would be displayed here
                  </p>
                  <Button className="mt-4" onClick={() => navigate("/jobs")}>
                    View All Projects
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Today's Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      task: "Review project proposals",
                      status: "pending",
                      time: "9:00 AM",
                    },
                    {
                      task: "Client meeting - Downtown Office",
                      status: "completed",
                      time: "11:00 AM",
                    },
                    {
                      task: "Site inspection - Villa project",
                      status: "pending",
                      time: "2:00 PM",
                    },
                    {
                      task: "Team standup meeting",
                      status: "pending",
                      time: "4:00 PM",
                    },
                  ].map((task, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                    >
                      <div className="flex-shrink-0">
                        {task.status === "completed" ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Clock className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p
                          className={`text-sm font-medium ${
                            task.status === "completed"
                              ? "line-through text-slate-500"
                              : "text-slate-900 dark:text-white"
                          }`}
                        >
                          {task.task}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          {task.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default MobileDashboard;
