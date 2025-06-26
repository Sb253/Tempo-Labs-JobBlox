import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Play,
  Pause,
  Square,
  Clock,
  Plus,
  Edit,
  Trash2,
  Calendar,
  User,
  Briefcase,
  DollarSign,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Timer,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Target,
} from "lucide-react";
import { format, differenceInMinutes, differenceInHours } from "date-fns";

interface TimeEntry {
  id: string;
  jobId: string;
  jobName: string;
  employeeId: string;
  employeeName: string;
  startTime: Date;
  endTime?: Date;
  duration?: number; // in minutes
  description: string;
  category: "regular" | "overtime" | "travel" | "break";
  status: "active" | "completed" | "approved" | "rejected";
  hourlyRate: number;
  totalCost: number;
  isRunning: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Employee {
  id: string;
  name: string;
  role: string;
  hourlyRate: number;
  avatar: string;
  isActive: boolean;
}

interface Job {
  id: string;
  name: string;
  customer: string;
  status: string;
  budget: number;
}

const TimeTracking = () => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<TimeEntry[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [activeTimers, setActiveTimers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [employeeFilter, setEmployeeFilter] = useState<string>("all");
  const [jobFilter, setJobFilter] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<TimeEntry | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second for active timers
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockEmployees: Employee[] = [
      {
        id: "emp_001",
        name: "John Smith",
        role: "Project Manager",
        hourlyRate: 75,
        avatar: "JS",
        isActive: true,
      },
      {
        id: "emp_002",
        name: "Mike Johnson",
        role: "Lead Carpenter",
        hourlyRate: 45,
        avatar: "MJ",
        isActive: true,
      },
      {
        id: "emp_003",
        name: "Sarah Davis",
        role: "Electrician",
        hourlyRate: 55,
        avatar: "SD",
        isActive: false,
      },
      {
        id: "emp_004",
        name: "Tom Wilson",
        role: "Plumber",
        hourlyRate: 50,
        avatar: "TW",
        isActive: true,
      },
    ];

    const mockJobs: Job[] = [
      {
        id: "job_001",
        name: "Kitchen Renovation - Johnson Family",
        customer: "Johnson Family",
        status: "in_progress",
        budget: 25000,
      },
      {
        id: "job_002",
        name: "Bathroom Remodel - Davis Residence",
        customer: "Davis Family",
        status: "scheduled",
        budget: 15000,
      },
      {
        id: "job_003",
        name: "New Deck Construction - ABC Corp",
        customer: "ABC Construction LLC",
        status: "quoted",
        budget: 18000,
      },
    ];

    const mockTimeEntries: TimeEntry[] = [
      {
        id: "time_001",
        jobId: "job_001",
        jobName: "Kitchen Renovation - Johnson Family",
        employeeId: "emp_001",
        employeeName: "John Smith",
        startTime: new Date(2024, 0, 15, 8, 0),
        endTime: new Date(2024, 0, 15, 17, 0),
        duration: 540, // 9 hours
        description: "Project management and coordination",
        category: "regular",
        status: "completed",
        hourlyRate: 75,
        totalCost: 675,
        isRunning: false,
        createdAt: new Date(2024, 0, 15, 8, 0),
        updatedAt: new Date(2024, 0, 15, 17, 0),
      },
      {
        id: "time_002",
        jobId: "job_001",
        jobName: "Kitchen Renovation - Johnson Family",
        employeeId: "emp_002",
        employeeName: "Mike Johnson",
        startTime: new Date(2024, 0, 15, 7, 30),
        endTime: new Date(2024, 0, 15, 16, 30),
        duration: 540, // 9 hours
        description: "Cabinet installation and carpentry work",
        category: "regular",
        status: "approved",
        hourlyRate: 45,
        totalCost: 405,
        isRunning: false,
        createdAt: new Date(2024, 0, 15, 7, 30),
        updatedAt: new Date(2024, 0, 15, 16, 30),
      },
      {
        id: "time_003",
        jobId: "job_001",
        jobName: "Kitchen Renovation - Johnson Family",
        employeeId: "emp_003",
        employeeName: "Sarah Davis",
        startTime: new Date(),
        description: "Electrical wiring and outlet installation",
        category: "regular",
        status: "active",
        hourlyRate: 55,
        totalCost: 0,
        isRunning: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "time_004",
        jobId: "job_002",
        jobName: "Bathroom Remodel - Davis Residence",
        employeeId: "emp_004",
        employeeName: "Tom Wilson",
        startTime: new Date(2024, 0, 16, 9, 0),
        endTime: new Date(2024, 0, 16, 15, 0),
        duration: 360, // 6 hours
        description: "Plumbing rough-in work",
        category: "regular",
        status: "completed",
        hourlyRate: 50,
        totalCost: 300,
        isRunning: false,
        createdAt: new Date(2024, 0, 16, 9, 0),
        updatedAt: new Date(2024, 0, 16, 15, 0),
      },
      {
        id: "time_005",
        jobId: "job_001",
        jobName: "Kitchen Renovation - Johnson Family",
        employeeId: "emp_002",
        employeeName: "Mike Johnson",
        startTime: new Date(2024, 0, 14, 18, 0),
        endTime: new Date(2024, 0, 14, 20, 0),
        duration: 120, // 2 hours
        description: "Emergency repair work after hours",
        category: "overtime",
        status: "approved",
        hourlyRate: 67.5, // 1.5x rate
        totalCost: 135,
        isRunning: false,
        createdAt: new Date(2024, 0, 14, 18, 0),
        updatedAt: new Date(2024, 0, 14, 20, 0),
      },
    ];

    setTimeout(() => {
      setEmployees(mockEmployees);
      setJobs(mockJobs);
      setTimeEntries(mockTimeEntries);
      setFilteredEntries(mockTimeEntries);
      setActiveTimers(
        mockTimeEntries
          .filter((entry) => entry.isRunning)
          .map((entry) => entry.id),
      );
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter time entries based on search and filters
  useEffect(() => {
    let filtered = timeEntries;

    if (searchQuery) {
      filtered = filtered.filter(
        (entry) =>
          entry.jobName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.employeeName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          entry.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((entry) => entry.status === statusFilter);
    }

    if (employeeFilter !== "all") {
      filtered = filtered.filter(
        (entry) => entry.employeeId === employeeFilter,
      );
    }

    if (jobFilter !== "all") {
      filtered = filtered.filter((entry) => entry.jobId === jobFilter);
    }

    setFilteredEntries(filtered);
  }, [timeEntries, searchQuery, statusFilter, employeeFilter, jobFilter]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: "bg-green-500", label: "Active" },
      completed: { color: "bg-blue-500", label: "Completed" },
      approved: { color: "bg-emerald-500", label: "Approved" },
      rejected: { color: "bg-red-500", label: "Rejected" },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={`${config.color} text-white`}>{config.label}</Badge>
    );
  };

  const getCategoryBadge = (category: string) => {
    const categoryConfig = {
      regular: { color: "bg-gray-500", label: "Regular" },
      overtime: { color: "bg-orange-500", label: "Overtime" },
      travel: { color: "bg-purple-500", label: "Travel" },
      break: { color: "bg-yellow-500", label: "Break" },
    };
    const config = categoryConfig[category as keyof typeof categoryConfig];
    return (
      <Badge className={`${config.color} text-white`}>{config.label}</Badge>
    );
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const calculateRunningTime = (startTime: Date) => {
    const minutes = differenceInMinutes(currentTime, startTime);
    return formatDuration(minutes);
  };

  const handleStartTimer = (employeeId: string, jobId: string) => {
    const newEntry: TimeEntry = {
      id: `time_${Date.now()}`,
      jobId,
      jobName: jobs.find((j) => j.id === jobId)?.name || "Unknown Job",
      employeeId,
      employeeName:
        employees.find((e) => e.id === employeeId)?.name || "Unknown Employee",
      startTime: new Date(),
      description: "",
      category: "regular",
      status: "active",
      hourlyRate: employees.find((e) => e.id === employeeId)?.hourlyRate || 0,
      totalCost: 0,
      isRunning: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setTimeEntries([newEntry, ...timeEntries]);
    setActiveTimers([...activeTimers, newEntry.id]);
  };

  const handleStopTimer = (entryId: string) => {
    const updatedEntries = timeEntries.map((entry) => {
      if (entry.id === entryId && entry.isRunning) {
        const endTime = new Date();
        const duration = differenceInMinutes(endTime, entry.startTime);
        const totalCost = (duration / 60) * entry.hourlyRate;

        return {
          ...entry,
          endTime,
          duration,
          totalCost: Math.round(totalCost * 100) / 100,
          isRunning: false,
          status: "completed" as const,
          updatedAt: new Date(),
        };
      }
      return entry;
    });

    setTimeEntries(updatedEntries);
    setActiveTimers(activeTimers.filter((id) => id !== entryId));
  };

  const handleEditEntry = (entry: TimeEntry) => {
    setSelectedEntry(entry);
    setIsEditDialogOpen(true);
  };

  const handleDeleteEntry = (entryId: string) => {
    if (confirm("Are you sure you want to delete this time entry?")) {
      setTimeEntries(timeEntries.filter((entry) => entry.id !== entryId));
      setActiveTimers(activeTimers.filter((id) => id !== entryId));
    }
  };

  const handleApproveEntry = (entryId: string) => {
    const updatedEntries = timeEntries.map((entry) =>
      entry.id === entryId
        ? { ...entry, status: "approved" as const, updatedAt: new Date() }
        : entry,
    );
    setTimeEntries(updatedEntries);
  };

  const handleRejectEntry = (entryId: string) => {
    const updatedEntries = timeEntries.map((entry) =>
      entry.id === entryId
        ? { ...entry, status: "rejected" as const, updatedAt: new Date() }
        : entry,
    );
    setTimeEntries(updatedEntries);
  };

  const stats = {
    totalHours:
      timeEntries.reduce((sum, entry) => sum + (entry.duration || 0), 0) / 60,
    totalCost: timeEntries.reduce((sum, entry) => sum + entry.totalCost, 0),
    activeTimers: activeTimers.length,
    pendingApproval: timeEntries.filter((entry) => entry.status === "completed")
      .length,
    thisWeekHours:
      timeEntries
        .filter((entry) => {
          const entryDate = new Date(entry.startTime);
          const now = new Date();
          const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
          return entryDate >= weekStart;
        })
        .reduce((sum, entry) => sum + (entry.duration || 0), 0) / 60,
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
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
          <h1 className="text-2xl font-bold text-gray-900">Time Tracking</h1>
          <p className="text-gray-600">
            Track work hours, manage timesheets, and monitor productivity
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Timesheet
          </Button>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Start Timer
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Start New Timer</DialogTitle>
                <DialogDescription>
                  Select an employee and job to start tracking time.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Employee</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees
                        .filter((emp) => emp.isActive)
                        .map((employee) => (
                          <SelectItem key={employee.id} value={employee.id}>
                            {employee.name} - {employee.role}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Job</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobs.map((job) => (
                        <SelectItem key={job.id} value={job.id}>
                          {job.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Description (Optional)</Label>
                  <Textarea placeholder="What are you working on?" />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>
                  <Play className="mr-2 h-4 w-4" />
                  Start Timer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Hours</p>
                <p className="text-2xl font-bold">
                  {stats.totalHours.toFixed(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Total Cost</p>
                <p className="text-2xl font-bold">
                  ${stats.totalCost.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Timer className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Active Timers</p>
                <p className="text-2xl font-bold">{stats.activeTimers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">Pending Approval</p>
                <p className="text-2xl font-bold">{stats.pendingApproval}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl font-bold">
                  {stats.thisWeekHours.toFixed(1)}h
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Timers */}
      {activeTimers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Timer className="h-5 w-5 text-green-500" />
              <span>Active Timers ({activeTimers.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {timeEntries
                .filter((entry) => entry.isRunning)
                .map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between p-4 border rounded-lg bg-green-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <div>
                        <p className="font-medium">{entry.employeeName}</p>
                        <p className="text-sm text-gray-600">{entry.jobName}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-mono text-lg font-bold text-green-600">
                          {calculateRunningTime(entry.startTime)}
                        </p>
                        <p className="text-sm text-gray-500">
                          Started at {format(entry.startTime, "h:mm a")}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStopTimer(entry.id)}
                      >
                        <Square className="mr-2 h-4 w-4" />
                        Stop
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search time entries, employees, or jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Employee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Employees</SelectItem>
                {employees.map((employee) => (
                  <SelectItem key={employee.id} value={employee.id}>
                    {employee.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={jobFilter} onValueChange={setJobFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Job" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jobs</SelectItem>
                {jobs.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Time Entries Table */}
      <Card>
        <CardHeader>
          <CardTitle>Time Entries ({filteredEntries.length})</CardTitle>
          <CardDescription>
            Track and manage all time entries across jobs and employees
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Job</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {employees.find((e) => e.id === entry.employeeId)
                          ?.avatar || "?"}
                      </div>
                      <div>
                        <p className="font-medium">{entry.employeeName}</p>
                        <p className="text-sm text-gray-500">
                          {
                            employees.find((e) => e.id === entry.employeeId)
                              ?.role
                          }
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{entry.jobName}</p>
                      <p className="text-sm text-gray-500">
                        {entry.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {format(entry.startTime, "MMM dd, yyyy")}
                      </p>
                      <p className="text-sm text-gray-500">
                        {format(entry.startTime, "h:mm a")}
                        {entry.endTime &&
                          ` - ${format(entry.endTime, "h:mm a")}`}
                        {entry.isRunning && " - Running"}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-mono">
                      {entry.isRunning ? (
                        <span className="text-green-600 font-bold">
                          {calculateRunningTime(entry.startTime)}
                        </span>
                      ) : (
                        entry.duration && formatDuration(entry.duration)
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getCategoryBadge(entry.category)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {entry.isRunning && (
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      )}
                      {getStatusBadge(entry.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">${entry.hourlyRate}/hr</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">
                      {entry.isRunning ? (
                        <span className="text-green-600">
                          $
                          {(
                            (differenceInMinutes(currentTime, entry.startTime) /
                              60) *
                            entry.hourlyRate
                          ).toFixed(2)}
                        </span>
                      ) : (
                        `$${entry.totalCost.toFixed(2)}`
                      )}
                    </p>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {entry.isRunning ? (
                          <DropdownMenuItem
                            onClick={() => handleStopTimer(entry.id)}
                          >
                            <Square className="mr-2 h-4 w-4" />
                            Stop Timer
                          </DropdownMenuItem>
                        ) : (
                          <>
                            <DropdownMenuItem
                              onClick={() => handleEditEntry(entry)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Entry
                            </DropdownMenuItem>
                            {entry.status === "completed" && (
                              <>
                                <DropdownMenuItem
                                  onClick={() => handleApproveEntry(entry.id)}
                                >
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleRejectEntry(entry.id)}
                                >
                                  <AlertCircle className="mr-2 h-4 w-4" />
                                  Reject
                                </DropdownMenuItem>
                              </>
                            )}
                          </>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteEntry(entry.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Entry Dialog */}
      {selectedEntry && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Time Entry</DialogTitle>
              <DialogDescription>
                Modify the details of this time entry.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Employee</Label>
                  <Input value={selectedEntry.employeeName} readOnly />
                </div>
                <div>
                  <Label>Job</Label>
                  <Input value={selectedEntry.jobName} readOnly />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Start Time</Label>
                  <Input
                    type="datetime-local"
                    value={format(
                      selectedEntry.startTime,
                      "yyyy-MM-dd'T'HH:mm",
                    )}
                  />
                </div>
                <div>
                  <Label>End Time</Label>
                  <Input
                    type="datetime-local"
                    value={
                      selectedEntry.endTime
                        ? format(selectedEntry.endTime, "yyyy-MM-dd'T'HH:mm")
                        : ""
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Select value={selectedEntry.category}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="regular">Regular</SelectItem>
                      <SelectItem value="overtime">Overtime</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="break">Break</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Hourly Rate</Label>
                  <Input
                    type="number"
                    value={selectedEntry.hourlyRate}
                    step="0.01"
                  />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={selectedEntry.description}
                  placeholder="Describe the work performed..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setIsEditDialogOpen(false)}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default TimeTracking;
