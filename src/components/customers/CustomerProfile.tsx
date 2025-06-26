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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  Star,
  Edit,
  MessageCircle,
  History,
  Settings,
  Building,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CustomerProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const customerData = {
    id: "CUST-001",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Oak Street, Springfield, IL 62701",
    type: "Residential",
    status: "Active",
    joinDate: "March 15, 2023",
    totalProjects: 5,
    totalSpent: 45750,
    rating: 4.8,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  };

  const projects = [
    {
      id: "PRJ-001",
      name: "Kitchen Renovation",
      status: "Completed",
      value: 15000,
      startDate: "2023-03-20",
      endDate: "2023-04-15",
      progress: 100,
    },
    {
      id: "PRJ-002",
      name: "Bathroom Remodel",
      status: "In Progress",
      value: 8500,
      startDate: "2023-05-01",
      endDate: "2023-06-15",
      progress: 75,
    },
    {
      id: "PRJ-003",
      name: "Deck Construction",
      status: "Scheduled",
      value: 12000,
      startDate: "2023-07-01",
      endDate: "2023-07-30",
      progress: 0,
    },
  ];

  const communications = [
    {
      type: "email",
      subject: "Project Update - Kitchen Renovation",
      date: "2023-06-15",
      status: "sent",
    },
    {
      type: "call",
      subject: "Discussion about bathroom fixtures",
      date: "2023-06-10",
      status: "completed",
    },
    {
      type: "meeting",
      subject: "Site visit for deck project",
      date: "2023-06-05",
      status: "completed",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500";
      case "in progress":
        return "bg-blue-500";
      case "scheduled":
        return "bg-yellow-500";
      case "on hold":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold gradient-text">
              Customer Profile
            </h1>
            <p className="text-slate-400">
              Comprehensive customer information and project history
            </p>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="border-slate-600 text-slate-200"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Customer Overview Card */}
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={customerData.avatar} />
                <AvatarFallback className="bg-blue-500 text-white text-xl">
                  {customerData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {customerData.name}
                    </h2>
                    <p className="text-slate-400">
                      Customer ID: {customerData.id}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge
                      className={cn(
                        "px-3 py-1",
                        customerData.status === "Active"
                          ? "bg-green-500"
                          : "bg-gray-500",
                      )}
                    >
                      {customerData.status}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-slate-600 text-slate-200"
                    >
                      {customerData.type}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2 text-slate-300">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{customerData.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-300">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">{customerData.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-300">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm truncate">
                      {customerData.address}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-300">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">
                      Since {customerData.joinDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Projects</p>
                  <p className="text-2xl font-bold text-white">
                    {customerData.totalProjects}
                  </p>
                </div>
                <Building className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Spent</p>
                  <p className="text-2xl font-bold text-white">
                    ${customerData.totalSpent.toLocaleString()}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Customer Rating</p>
                  <div className="flex items-center space-x-1">
                    <p className="text-2xl font-bold text-white">
                      {customerData.rating}
                    </p>
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  </div>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Active Projects</p>
                  <p className="text-2xl font-bold text-white">2</p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-slate-700"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="data-[state=active]:bg-slate-700"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="communications"
              className="data-[state=active]:bg-slate-700"
            >
              Communications
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="data-[state=active]:bg-slate-700"
            >
              Documents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Project Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projects.map((project, index) => (
                      <div
                        key={project.id}
                        className="flex items-center space-x-4"
                      >
                        <div
                          className={cn(
                            "w-3 h-3 rounded-full",
                            getStatusColor(project.status),
                          )}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">
                            {project.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            {project.startDate} - {project.endDate}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-slate-600 text-slate-200"
                        >
                          {project.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">
                    Customer Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-slate-400">
                        Preferred Contact Method
                      </p>
                      <p className="text-white">Email</p>
                    </div>
                    <Separator className="bg-slate-700" />
                    <div>
                      <p className="text-sm text-slate-400">
                        Best Time to Contact
                      </p>
                      <p className="text-white">Weekdays 9 AM - 5 PM</p>
                    </div>
                    <Separator className="bg-slate-700" />
                    <div>
                      <p className="text-sm text-slate-400">
                        Special Requirements
                      </p>
                      <p className="text-white">
                        Pet-friendly materials, eco-friendly options
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="grid gap-6">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="bg-slate-800 border-slate-700"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {project.name}
                        </h3>
                        <p className="text-slate-400">
                          Project ID: {project.id}
                        </p>
                      </div>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-slate-400">Project Value</p>
                        <p className="text-lg font-semibold text-white">
                          ${project.value.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">Start Date</p>
                        <p className="text-white">{project.startDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">End Date</p>
                        <p className="text-white">{project.endDate}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Progress</span>
                        <span className="text-white">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="communications" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Communication History
                </CardTitle>
                <CardDescription className="text-slate-400">
                  All interactions with this customer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {communications.map((comm, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 bg-slate-700 rounded-lg"
                    >
                      <div
                        className={cn(
                          "p-2 rounded-lg",
                          comm.type === "email"
                            ? "bg-blue-500"
                            : comm.type === "call"
                              ? "bg-green-500"
                              : "bg-purple-500",
                        )}
                      >
                        {comm.type === "email" ? (
                          <Mail className="h-4 w-4" />
                        ) : comm.type === "call" ? (
                          <Phone className="h-4 w-4" />
                        ) : (
                          <Calendar className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{comm.subject}</p>
                        <p className="text-slate-400 text-sm">{comm.date}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-slate-600 text-slate-200"
                      >
                        {comm.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Customer Documents</CardTitle>
                <CardDescription className="text-slate-400">
                  Contracts, estimates, and project files
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      name: "Kitchen Renovation Contract",
                      type: "PDF",
                      size: "2.4 MB",
                      date: "2023-03-15",
                    },
                    {
                      name: "Bathroom Estimate",
                      type: "PDF",
                      size: "1.8 MB",
                      date: "2023-04-20",
                    },
                    {
                      name: "Site Photos - Kitchen",
                      type: "ZIP",
                      size: "15.2 MB",
                      date: "2023-04-10",
                    },
                    {
                      name: "Material Specifications",
                      type: "DOC",
                      size: "0.8 MB",
                      date: "2023-03-25",
                    },
                    {
                      name: "Final Invoice - Kitchen",
                      type: "PDF",
                      size: "1.2 MB",
                      date: "2023-04-15",
                    },
                    {
                      name: "Warranty Information",
                      type: "PDF",
                      size: "0.5 MB",
                      date: "2023-04-16",
                    },
                  ].map((doc, index) => (
                    <Card
                      key={index}
                      className="bg-slate-700 border-slate-600 hover:bg-slate-650 transition-colors cursor-pointer"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <FileText className="h-8 w-8 text-blue-500 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                              {doc.name}
                            </p>
                            <p className="text-xs text-slate-400">
                              {doc.type} • {doc.size}
                            </p>
                            <p className="text-xs text-slate-500">{doc.date}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
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

export default CustomerProfile;
