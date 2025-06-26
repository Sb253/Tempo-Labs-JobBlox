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
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Video,
  Home,
  Building,
  Filter,
  Search,
  DollarSign,
  Bell,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAvatar?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number; // in minutes
  type:
    | "consultation"
    | "site-visit"
    | "follow-up"
    | "presentation"
    | "virtual";
  status: "scheduled" | "confirmed" | "completed" | "cancelled" | "no-show";
  location: string;
  assignedTo: string;
  projectType: string;
  estimatedValue: number;
  notes: string;
  reminderSent: boolean;
  createdDate: string;
}

const ClientAppointment = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("calendar");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const appointments: Appointment[] = [
    {
      id: "apt_001",
      clientName: "Sarah Johnson",
      clientEmail: "sarah.johnson@email.com",
      clientPhone: "+1 (555) 123-4567",
      clientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      title: "Kitchen Renovation Consultation",
      description: "Initial consultation for kitchen renovation project",
      date: "2024-02-05",
      time: "10:00",
      duration: 90,
      type: "consultation",
      status: "confirmed",
      location: "123 Oak Street, Springfield, IL",
      assignedTo: "Mike Thompson",
      projectType: "Kitchen Renovation",
      estimatedValue: 25000,
      notes: "Client interested in modern design with quartz countertops",
      reminderSent: true,
      createdDate: "2024-01-28",
    },
    {
      id: "apt_002",
      clientName: "Robert Chen",
      clientEmail: "r.chen@email.com",
      clientPhone: "+1 (555) 234-5678",
      clientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
      title: "Bathroom Remodel Site Visit",
      description: "On-site assessment for bathroom renovation",
      date: "2024-02-06",
      time: "14:00",
      duration: 60,
      type: "site-visit",
      status: "scheduled",
      location: "456 Pine Avenue, Chicago, IL",
      assignedTo: "Sarah Davis",
      projectType: "Bathroom Remodel",
      estimatedValue: 15000,
      notes: "Focus on accessibility features and modern fixtures",
      reminderSent: false,
      createdDate: "2024-02-01",
    },
    {
      id: "apt_003",
      clientName: "Jennifer Martinez",
      clientEmail: "j.martinez@email.com",
      clientPhone: "+1 (555) 345-6789",
      clientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer",
      title: "Project Proposal Presentation",
      description: "Present detailed proposal and timeline",
      date: "2024-02-07",
      time: "16:00",
      duration: 120,
      type: "presentation",
      status: "confirmed",
      location: "Our Office - Conference Room A",
      assignedTo: "Mike Thompson",
      projectType: "Home Addition",
      estimatedValue: 45000,
      notes: "Bring 3D renderings and material samples",
      reminderSent: true,
      createdDate: "2024-01-30",
    },
    {
      id: "apt_004",
      clientName: "David Wilson",
      clientEmail: "d.wilson@email.com",
      clientPhone: "+1 (555) 456-7890",
      clientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      title: "Virtual Design Review",
      description: "Review design plans via video call",
      date: "2024-02-08",
      time: "11:00",
      duration: 45,
      type: "virtual",
      status: "scheduled",
      location: "Zoom Meeting",
      assignedTo: "Sarah Davis",
      projectType: "Deck Construction",
      estimatedValue: 12000,
      notes: "Client prefers virtual meetings due to work schedule",
      reminderSent: false,
      createdDate: "2024-02-02",
    },
    {
      id: "apt_005",
      clientName: "Lisa Brown",
      clientEmail: "lisa.brown@email.com",
      clientPhone: "+1 (555) 567-8901",
      clientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
      title: "Project Follow-up Meeting",
      description: "Discuss project progress and next steps",
      date: "2024-02-04",
      time: "13:30",
      duration: 60,
      type: "follow-up",
      status: "completed",
      location: "789 Elm Street, Peoria, IL",
      assignedTo: "Mike Thompson",
      projectType: "Basement Finishing",
      estimatedValue: 30000,
      notes: "Project on schedule, client very satisfied",
      reminderSent: true,
      createdDate: "2024-01-25",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400";
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400";
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400";
      case "no-show":
        return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "consultation":
        return <User className="h-4 w-4" />;
      case "site-visit":
        return <Home className="h-4 w-4" />;
      case "presentation":
        return <Building className="h-4 w-4" />;
      case "virtual":
        return <Video className="h-4 w-4" />;
      case "follow-up":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <CalendarDays className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "consultation":
        return "bg-blue-500";
      case "site-visit":
        return "bg-green-500";
      case "presentation":
        return "bg-purple-500";
      case "virtual":
        return "bg-indigo-500";
      case "follow-up":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.projectType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || appointment.status === statusFilter;
    const matchesType = typeFilter === "all" || appointment.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const todayAppointments = appointments.filter(
    (apt) => apt.date === new Date().toISOString().split("T")[0],
  );
  const upcomingAppointments = appointments.filter(
    (apt) => new Date(apt.date) > new Date() && apt.status !== "cancelled",
  );
  const totalValue = appointments.reduce(
    (sum, apt) => sum + apt.estimatedValue,
    0,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Client Appointments
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Schedule and manage client meetings and consultations
              </p>
            </div>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              <Plus className="mr-2 h-4 w-4" />
              Schedule Appointment
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {todayAppointments.length}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    Today's Appointments
                  </p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <CalendarDays className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {upcomingAppointments.length}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    Upcoming
                  </p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <Clock className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {
                      appointments.filter((apt) => apt.status === "confirmed")
                        .length
                    }
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    Confirmed
                  </p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <CheckCircle className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-emerald-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    ${(totalValue / 1000).toFixed(0)}K
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    Pipeline Value
                  </p>
                </div>
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                  <DollarSign className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <div className="bg-white dark:bg-slate-800 rounded-xl p-2 shadow-lg border border-slate-200 dark:border-slate-700">
            <TabsList className="grid w-full grid-cols-3 bg-slate-100 dark:bg-slate-700">
              <TabsTrigger
                value="calendar"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600"
              >
                Calendar View
              </TabsTrigger>
              <TabsTrigger
                value="list"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600"
              >
                List View
              </TabsTrigger>
              <TabsTrigger
                value="today"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600"
              >
                Today's Schedule
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">
                    Select Date
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border border-slate-200 dark:border-slate-700"
                  />
                </CardContent>
              </Card>

              <Card className="lg:col-span-2 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">
                    Appointments for {selectedDate?.toLocaleDateString()}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appointments
                      .filter(
                        (apt) =>
                          apt.date ===
                          selectedDate?.toISOString().split("T")[0],
                      )
                      .map((appointment) => (
                        <div
                          key={appointment.id}
                          className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 hover:shadow-md transition-all duration-200 border border-slate-200 dark:border-slate-600"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <div
                                className={cn(
                                  "p-2 rounded-lg text-white",
                                  getTypeColor(appointment.type),
                                )}
                              >
                                {getTypeIcon(appointment.type)}
                              </div>
                              <div>
                                <h3 className="font-semibold text-slate-900 dark:text-white">
                                  {appointment.title}
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                  {appointment.clientName} • {appointment.time}{" "}
                                  ({appointment.duration} min)
                                </p>
                                <p className="text-sm text-slate-500 dark:text-slate-500">
                                  {appointment.location}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                className={cn(
                                  "text-xs",
                                  getStatusColor(appointment.status),
                                )}
                              >
                                {appointment.status}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedAppointment(appointment);
                                  setIsViewDialogOpen(true);
                                }}
                              >
                                View
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    {appointments.filter(
                      (apt) =>
                        apt.date === selectedDate?.toISOString().split("T")[0],
                    ).length === 0 && (
                      <div className="text-center py-8">
                        <CalendarDays className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-500 dark:text-slate-400">
                          No appointments scheduled for this date
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="list" className="space-y-6">
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">
                  All Appointments
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Manage and filter your appointment schedule
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {/* Filters */}
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 mb-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Search appointments..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600"
                      />
                    </div>
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="w-full md:w-48 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="no-show">No Show</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-full md:w-48 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="consultation">
                          Consultation
                        </SelectItem>
                        <SelectItem value="site-visit">Site Visit</SelectItem>
                        <SelectItem value="presentation">
                          Presentation
                        </SelectItem>
                        <SelectItem value="virtual">Virtual</SelectItem>
                        <SelectItem value="follow-up">Follow-up</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Appointments List */}
                <div className="space-y-4">
                  {filteredAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:shadow-md transition-all duration-200 border border-slate-200 dark:border-slate-600"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-12 w-12 ring-2 ring-slate-200 dark:ring-slate-600">
                            <AvatarImage src={appointment.clientAvatar} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                              {appointment.clientName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                {appointment.title}
                              </h3>
                              <Badge
                                className={cn(
                                  "text-xs",
                                  getStatusColor(appointment.status),
                                )}
                              >
                                {appointment.status}
                              </Badge>
                              <div
                                className={cn(
                                  "flex items-center space-x-1 px-2 py-1 rounded text-xs text-white",
                                  getTypeColor(appointment.type),
                                )}
                              >
                                {getTypeIcon(appointment.type)}
                                <span className="capitalize">
                                  {appointment.type}
                                </span>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-slate-600 dark:text-slate-400">
                              <div className="flex items-center space-x-1">
                                <User className="h-4 w-4" />
                                <span>{appointment.clientName}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <CalendarDays className="h-4 w-4" />
                                <span>
                                  {new Date(
                                    appointment.date,
                                  ).toLocaleDateString()}{" "}
                                  at {appointment.time}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span className="truncate">
                                  {appointment.location}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <DollarSign className="h-4 w-4" />
                                <span>
                                  ${appointment.estimatedValue.toLocaleString()}
                                </span>
                              </div>
                            </div>
                            <div className="mt-3">
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {appointment.notes}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!appointment.reminderSent && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-yellow-50 dark:hover:bg-yellow-900/30 hover:text-yellow-600 dark:hover:text-yellow-400"
                            >
                              <Bell className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedAppointment(appointment);
                              setIsViewDialogOpen(true);
                            }}
                            className="hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            View
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedAppointment(appointment);
                              setIsEditDialogOpen(true);
                            }}
                            className="hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400"
                          >
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

          <TabsContent value="today" className="space-y-6">
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">
                  Today's Schedule
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {todayAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {todayAppointments
                      .sort((a, b) => a.time.localeCompare(b.time))
                      .map((appointment) => (
                        <div
                          key={appointment.id}
                          className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:shadow-md transition-all duration-200 border border-slate-200 dark:border-slate-600"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                                  {appointment.time}
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">
                                  {appointment.duration} min
                                </div>
                              </div>
                              <div
                                className={cn(
                                  "p-3 rounded-lg text-white",
                                  getTypeColor(appointment.type),
                                )}
                              >
                                {getTypeIcon(appointment.type)}
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                  {appointment.title}
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                  {appointment.clientName} •{" "}
                                  {appointment.projectType}
                                </p>
                                <p className="text-sm text-slate-500 dark:text-slate-500">
                                  {appointment.location}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Badge
                                className={cn(
                                  "text-xs",
                                  getStatusColor(appointment.status),
                                )}
                              >
                                {appointment.status}
                              </Badge>
                              <div className="text-right">
                                <p className="text-sm font-medium text-slate-900 dark:text-white">
                                  ${appointment.estimatedValue.toLocaleString()}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                  Est. Value
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedAppointment(appointment);
                                  setIsViewDialogOpen(true);
                                }}
                              >
                                View
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CalendarDays className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      No appointments today
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400">
                      Your schedule is clear for today. Time to catch up on
                      other tasks!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* View Appointment Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Appointment Details</DialogTitle>
              <DialogDescription>
                Complete information for {selectedAppointment?.title}
              </DialogDescription>
            </DialogHeader>
            {selectedAppointment && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={selectedAppointment.clientAvatar} />
                        <AvatarFallback>
                          {selectedAppointment.clientName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold">
                          {selectedAppointment.clientName}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge
                            className={cn(
                              "text-xs",
                              getStatusColor(selectedAppointment.status),
                            )}
                          >
                            {selectedAppointment.status}
                          </Badge>
                          <div
                            className={cn(
                              "flex items-center space-x-1 px-2 py-1 rounded text-xs text-white",
                              getTypeColor(selectedAppointment.type),
                            )}
                          >
                            {getTypeIcon(selectedAppointment.type)}
                            <span className="capitalize">
                              {selectedAppointment.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span>{selectedAppointment.clientEmail}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span>{selectedAppointment.clientPhone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{selectedAppointment.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {new Date(
                            selectedAppointment.date,
                          ).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                          Date
                        </p>
                      </div>
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {selectedAppointment.time}
                        </p>
                        <p className="text-sm text-green-600 dark:text-green-400">
                          {selectedAppointment.duration} min
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Appointment Details</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Project Type: </span>
                          {selectedAppointment.projectType}
                        </div>
                        <div>
                          <span className="font-medium">Estimated Value: </span>
                          ${selectedAppointment.estimatedValue.toLocaleString()}
                        </div>
                        <div>
                          <span className="font-medium">Assigned To: </span>
                          {selectedAppointment.assignedTo}
                        </div>
                        <div>
                          <span className="font-medium">Reminder Sent: </span>
                          {selectedAppointment.reminderSent ? "Yes" : "No"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedAppointment.description && (
                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded">
                      {selectedAppointment.description}
                    </p>
                  </div>
                )}

                {selectedAppointment.notes && (
                  <div>
                    <h4 className="font-medium mb-2">Notes</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded">
                      {selectedAppointment.notes}
                    </p>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsViewDialogOpen(false)}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setIsViewDialogOpen(false);
                  setIsEditDialogOpen(true);
                }}
              >
                Edit Appointment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ClientAppointment;
