import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarDays,
  Clock,
  Users,
  MapPin,
  Plus,
  Edit,
  Trash2,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  AlertCircle,
  CheckCircle,
  User,
  Briefcase,
  Phone,
  Mail,
} from "lucide-react";
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isToday,
} from "date-fns";

interface ScheduleEvent {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  type: "job" | "appointment" | "meeting" | "maintenance";
  status: "scheduled" | "in_progress" | "completed" | "cancelled";
  assignedTo: string[];
  customer?: {
    name: string;
    phone: string;
    email: string;
  };
  location?: string;
  priority: "low" | "medium" | "high" | "urgent";
  color: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  availability: "available" | "busy" | "unavailable";
  skills: string[];
}

const Scheduling = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week");
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<ScheduleEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(
    null,
  );
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterTeamMember, setFilterTeamMember] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const teamMembers: TeamMember[] = [
    {
      id: "emp_001",
      name: "John Smith",
      role: "Project Manager",
      avatar: "JS",
      availability: "available",
      skills: ["Project Management", "Construction"],
    },
    {
      id: "emp_002",
      name: "Mike Johnson",
      role: "Lead Carpenter",
      avatar: "MJ",
      availability: "busy",
      skills: ["Carpentry", "Framing"],
    },
    {
      id: "emp_003",
      name: "Sarah Davis",
      role: "Electrician",
      avatar: "SD",
      availability: "available",
      skills: ["Electrical", "Wiring"],
    },
    {
      id: "emp_004",
      name: "Tom Wilson",
      role: "Plumber",
      avatar: "TW",
      availability: "available",
      skills: ["Plumbing", "HVAC"],
    },
  ];

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockEvents: ScheduleEvent[] = [
      {
        id: "event_001",
        title: "Kitchen Renovation - Johnson Family",
        description: "Continue cabinet installation and electrical work",
        startTime: new Date(2024, 0, 15, 8, 0),
        endTime: new Date(2024, 0, 15, 17, 0),
        type: "job",
        status: "scheduled",
        assignedTo: ["emp_001", "emp_002"],
        customer: {
          name: "Johnson Family",
          phone: "+1 (555) 123-4567",
          email: "sarah.johnson@email.com",
        },
        location: "123 Oak Street, Springfield, IL",
        priority: "high",
        color: "bg-blue-500",
      },
      {
        id: "event_002",
        title: "Client Consultation - Davis Residence",
        description: "Initial consultation for bathroom remodel",
        startTime: new Date(2024, 0, 16, 10, 0),
        endTime: new Date(2024, 0, 16, 11, 30),
        type: "appointment",
        status: "scheduled",
        assignedTo: ["emp_001"],
        customer: {
          name: "Davis Family",
          phone: "+1 (555) 987-6543",
          email: "davis@email.com",
        },
        location: "456 Elm Avenue, Chicago, IL",
        priority: "medium",
        color: "bg-green-500",
      },
      {
        id: "event_003",
        title: "Emergency Roof Repair",
        description: "Urgent roof leak repair",
        startTime: new Date(2024, 0, 17, 7, 0),
        endTime: new Date(2024, 0, 17, 12, 0),
        type: "job",
        status: "in_progress",
        assignedTo: ["emp_002", "emp_004"],
        customer: {
          name: "Smith Family",
          phone: "+1 (555) 456-7890",
          email: "smith@email.com",
        },
        location: "321 Pine Street, Springfield, IL",
        priority: "urgent",
        color: "bg-red-500",
      },
      {
        id: "event_004",
        title: "Team Meeting",
        description: "Weekly team standup and project updates",
        startTime: new Date(2024, 0, 18, 9, 0),
        endTime: new Date(2024, 0, 18, 10, 0),
        type: "meeting",
        status: "scheduled",
        assignedTo: ["emp_001", "emp_002", "emp_003", "emp_004"],
        location: "Office Conference Room",
        priority: "medium",
        color: "bg-purple-500",
      },
      {
        id: "event_005",
        title: "Equipment Maintenance",
        description: "Scheduled maintenance for construction equipment",
        startTime: new Date(2024, 0, 19, 14, 0),
        endTime: new Date(2024, 0, 19, 16, 0),
        type: "maintenance",
        status: "scheduled",
        assignedTo: ["emp_003"],
        location: "Equipment Yard",
        priority: "low",
        color: "bg-gray-500",
      },
    ];

    setTimeout(() => {
      setEvents(mockEvents);
      setFilteredEvents(mockEvents);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter events based on search and filters
  useEffect(() => {
    let filtered = events;

    if (searchQuery) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          event.customer?.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
    }

    if (filterType !== "all") {
      filtered = filtered.filter((event) => event.type === filterType);
    }

    if (filterTeamMember !== "all") {
      filtered = filtered.filter((event) =>
        event.assignedTo.includes(filterTeamMember),
      );
    }

    setFilteredEvents(filtered);
  }, [events, searchQuery, filterType, filterTeamMember]);

  const getWeekDays = (date: Date) => {
    const start = startOfWeek(date, { weekStartsOn: 0 });
    const end = endOfWeek(date, { weekStartsOn: 0 });
    return eachDayOfInterval({ start, end });
  };

  const getEventsForDay = (date: Date) => {
    return filteredEvents.filter((event) => isSameDay(event.startTime, date));
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      scheduled: { color: "bg-blue-500", label: "Scheduled" },
      in_progress: { color: "bg-orange-500", label: "In Progress" },
      completed: { color: "bg-green-500", label: "Completed" },
      cancelled: { color: "bg-red-500", label: "Cancelled" },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={`${config.color} text-white text-xs`}>
        {config.label}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { color: "bg-gray-400", label: "Low" },
      medium: { color: "bg-blue-400", label: "Medium" },
      high: { color: "bg-orange-400", label: "High" },
      urgent: { color: "bg-red-400", label: "Urgent" },
    };
    const config = priorityConfig[priority as keyof typeof priorityConfig];
    return (
      <Badge className={`${config.color} text-white text-xs`}>
        {config.label}
      </Badge>
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "job":
        return <Briefcase className="h-4 w-4" />;
      case "appointment":
        return <User className="h-4 w-4" />;
      case "meeting":
        return <Users className="h-4 w-4" />;
      case "maintenance":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <CalendarDays className="h-4 w-4" />;
    }
  };

  const handleCreateEvent = () => {
    setIsCreateDialogOpen(true);
  };

  const handleEditEvent = (event: ScheduleEvent) => {
    setSelectedEvent(event);
    setIsEditDialogOpen(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((event) => event.id !== eventId));
    }
  };

  const navigateDate = (direction: "prev" | "next") => {
    const days = viewMode === "day" ? 1 : viewMode === "week" ? 7 : 30;
    const newDate = addDays(currentDate, direction === "next" ? days : -days);
    setCurrentDate(newDate);
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays(currentDate);
    const hours = Array.from({ length: 12 }, (_, i) => i + 7); // 7 AM to 6 PM

    return (
      <div className="grid grid-cols-8 gap-1 h-96 overflow-auto">
        {/* Time column */}
        <div className="border-r">
          <div className="h-12 border-b flex items-center justify-center font-medium">
            Time
          </div>
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-12 border-b flex items-center justify-center text-sm text-gray-500"
            >
              {hour}:00
            </div>
          ))}
        </div>

        {/* Day columns */}
        {weekDays.map((day) => {
          const dayEvents = getEventsForDay(day);
          return (
            <div key={day.toISOString()} className="border-r">
              <div
                className={`h-12 border-b flex flex-col items-center justify-center font-medium ${
                  isToday(day) ? "bg-blue-50 text-blue-600" : ""
                }`}
              >
                <span className="text-xs">{format(day, "EEE")}</span>
                <span
                  className={`text-lg ${isToday(day) ? "bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center" : ""}`}
                >
                  {format(day, "d")}
                </span>
              </div>
              <div className="relative">
                {hours.map((hour) => (
                  <div key={hour} className="h-12 border-b"></div>
                ))}
                {/* Events overlay */}
                {dayEvents.map((event, index) => {
                  const startHour = event.startTime.getHours();
                  const duration =
                    (event.endTime.getTime() - event.startTime.getTime()) /
                    (1000 * 60 * 60);
                  const top = (startHour - 7) * 48; // 48px per hour
                  const height = duration * 48;

                  return (
                    <div
                      key={event.id}
                      className={`absolute left-1 right-1 ${event.color} text-white text-xs p-1 rounded cursor-pointer hover:opacity-80`}
                      style={{
                        top: `${top}px`,
                        height: `${height}px`,
                        zIndex: 10 + index,
                      }}
                      onClick={() => handleEditEvent(event)}
                    >
                      <div className="font-medium truncate">{event.title}</div>
                      <div className="truncate">
                        {format(event.startTime, "h:mm a")} -{" "}
                        {format(event.endTime, "h:mm a")}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderDayView = () => {
    const dayEvents = getEventsForDay(currentDate);
    const hours = Array.from({ length: 12 }, (_, i) => i + 7);

    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <h3 className="font-medium mb-2">Timeline</h3>
          <div className="border rounded-lg">
            <div className="h-12 border-b flex items-center justify-center font-medium bg-gray-50">
              {format(currentDate, "EEEE, MMMM d, yyyy")}
            </div>
            <div className="relative">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="h-16 border-b flex items-center px-4 text-sm text-gray-500"
                >
                  {hour}:00
                </div>
              ))}
              {/* Events overlay */}
              {dayEvents.map((event, index) => {
                const startHour = event.startTime.getHours();
                const duration =
                  (event.endTime.getTime() - event.startTime.getTime()) /
                  (1000 * 60 * 60);
                const top = (startHour - 7) * 64; // 64px per hour
                const height = duration * 64;

                return (
                  <div
                    key={event.id}
                    className={`absolute left-16 right-4 ${event.color} text-white p-2 rounded cursor-pointer hover:opacity-80`}
                    style={{
                      top: `${top}px`,
                      height: `${height}px`,
                      zIndex: 10 + index,
                    }}
                    onClick={() => handleEditEvent(event)}
                  >
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm">
                      {format(event.startTime, "h:mm a")} -{" "}
                      {format(event.endTime, "h:mm a")}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Events ({dayEvents.length})</h3>
          {dayEvents.map((event) => (
            <Card
              key={event.id}
              className="cursor-pointer hover:shadow-md"
              onClick={() => handleEditEvent(event)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(event.type)}
                    <h4 className="font-medium">{event.title}</h4>
                  </div>
                  {getPriorityBadge(event.priority)}
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-3 w-3" />
                    <span>
                      {format(event.startTime, "h:mm a")} -{" "}
                      {format(event.endTime, "h:mm a")}
                    </span>
                  </div>
                  {event.location && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-3 w-3" />
                      <span>{event.location}</span>
                    </div>
                  )}
                  {event.customer && (
                    <div className="flex items-center space-x-2">
                      <User className="h-3 w-3" />
                      <span>{event.customer.name}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between mt-2">
                  {getStatusBadge(event.status)}
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {event.assignedTo.length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    return (
      <div className="space-y-4">
        <Calendar
          mode="single"
          selected={currentDate}
          onSelect={(date) => date && setCurrentDate(date)}
          className="rounded-md border"
        />
        <div className="space-y-2">
          <h3 className="font-medium">
            Events for {format(currentDate, "MMMM d, yyyy")}
          </h3>
          {getEventsForDay(currentDate).map((event) => (
            <Card
              key={event.id}
              className="cursor-pointer hover:shadow-md"
              onClick={() => handleEditEvent(event)}
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(event.type)}
                    <span className="font-medium">{event.title}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(event.status)}
                    {getPriorityBadge(event.priority)}
                  </div>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {format(event.startTime, "h:mm a")} -{" "}
                  {format(event.endTime, "h:mm a")}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Scheduling</h1>
          <p className="text-gray-600">
            Manage job schedules, appointments, and team assignments
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button onClick={handleCreateEvent}>
            <Plus className="mr-2 h-4 w-4" />
            New Event
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search events, customers, or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Event Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="job">Jobs</SelectItem>
                <SelectItem value="appointment">Appointments</SelectItem>
                <SelectItem value="meeting">Meetings</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filterTeamMember}
              onValueChange={setFilterTeamMember}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Team Member" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Members</SelectItem>
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateDate("prev")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateDate("next")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <h2 className="text-xl font-semibold">
            {viewMode === "day" && format(currentDate, "EEEE, MMMM d, yyyy")}
            {viewMode === "week" &&
              `Week of ${format(startOfWeek(currentDate), "MMMM d, yyyy")}`}
            {viewMode === "month" && format(currentDate, "MMMM yyyy")}
          </h2>
        </div>
        <Tabs
          value={viewMode}
          onValueChange={(value) =>
            setViewMode(value as "day" | "week" | "month")
          }
        >
          <TabsList>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Calendar View */}
      <Card>
        <CardContent className="p-6">
          {viewMode === "day" && renderDayView()}
          {viewMode === "week" && renderWeekView()}
          {viewMode === "month" && renderMonthView()}
        </CardContent>
      </Card>

      {/* Create Event Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
            <DialogDescription>
              Schedule a new job, appointment, or meeting.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button className="justify-start" variant="outline">
                <Briefcase className="mr-2 h-4 w-4" />
                New Job
              </Button>
              <Button className="justify-start" variant="outline">
                <User className="mr-2 h-4 w-4" />
                Appointment
              </Button>
              <Button className="justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Meeting
              </Button>
              <Button className="justify-start" variant="outline">
                <AlertCircle className="mr-2 h-4 w-4" />
                Maintenance
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Event Dialog */}
      {selectedEvent && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Event Details</DialogTitle>
              <DialogDescription>
                View and edit event information.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Title</Label>
                  <Input value={selectedEvent.title} readOnly />
                </div>
                <div>
                  <Label>Type</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    {getTypeIcon(selectedEvent.type)}
                    <span className="capitalize">{selectedEvent.type}</span>
                  </div>
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea value={selectedEvent.description || ""} readOnly />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Start Time</Label>
                  <Input
                    value={format(selectedEvent.startTime, "yyyy-MM-dd HH:mm")}
                    readOnly
                  />
                </div>
                <div>
                  <Label>End Time</Label>
                  <Input
                    value={format(selectedEvent.endTime, "yyyy-MM-dd HH:mm")}
                    readOnly
                  />
                </div>
              </div>
              {selectedEvent.location && (
                <div>
                  <Label>Location</Label>
                  <Input value={selectedEvent.location} readOnly />
                </div>
              )}
              {selectedEvent.customer && (
                <div className="space-y-2">
                  <Label>Customer</Label>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">
                        {selectedEvent.customer.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {selectedEvent.customer.email}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-center space-x-4">
                {getStatusBadge(selectedEvent.status)}
                {getPriorityBadge(selectedEvent.priority)}
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Close
              </Button>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDeleteEvent(selectedEvent.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Scheduling;
