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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Users,
  DollarSign,
  Clock,
  MapPin,
  Briefcase,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  RefreshCw,
} from "lucide-react";
import { format } from "date-fns";

interface Job {
  id: string;
  name: string;
  customer: string;
  type: string;
  status:
    | "draft"
    | "quoted"
    | "approved"
    | "scheduled"
    | "in_progress"
    | "on_hold"
    | "completed"
    | "cancelled";
  priority: "low" | "medium" | "high" | "urgent";
  startDate: Date;
  endDate: Date;
  budget: number;
  estimatedHours: number;
  actualHours?: number;
  location: string;
  assignedTeam: string[];
  progress: number;
  lastUpdated: Date;
}

const JobManagement = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockJobs: Job[] = [
      {
        id: "job_001",
        name: "Kitchen Renovation - Johnson Family",
        customer: "Johnson Family",
        type: "renovation",
        status: "in_progress",
        priority: "high",
        startDate: new Date("2024-01-15"),
        endDate: new Date("2024-02-28"),
        budget: 25000,
        estimatedHours: 120,
        actualHours: 85,
        location: "123 Oak Street, Springfield, IL",
        assignedTeam: ["John Smith", "Mike Johnson"],
        progress: 70,
        lastUpdated: new Date(),
      },
      {
        id: "job_002",
        name: "Bathroom Remodel - Davis Residence",
        customer: "Davis Family",
        type: "renovation",
        status: "scheduled",
        priority: "medium",
        startDate: new Date("2024-02-01"),
        endDate: new Date("2024-02-15"),
        budget: 15000,
        estimatedHours: 80,
        location: "456 Elm Avenue, Chicago, IL",
        assignedTeam: ["Sarah Davis", "Tom Wilson"],
        progress: 0,
        lastUpdated: new Date(),
      },
      {
        id: "job_003",
        name: "New Deck Construction - ABC Corp",
        customer: "ABC Construction LLC",
        type: "new_construction",
        status: "quoted",
        priority: "low",
        startDate: new Date("2024-03-01"),
        endDate: new Date("2024-03-20"),
        budget: 18000,
        estimatedHours: 100,
        location: "789 Business Park Drive, Chicago, IL",
        assignedTeam: ["Mike Johnson", "Lisa Brown"],
        progress: 0,
        lastUpdated: new Date(),
      },
      {
        id: "job_004",
        name: "Emergency Roof Repair - Smith House",
        customer: "Smith Family",
        type: "repair",
        status: "completed",
        priority: "urgent",
        startDate: new Date("2024-01-05"),
        endDate: new Date("2024-01-07"),
        budget: 5000,
        estimatedHours: 24,
        actualHours: 28,
        location: "321 Pine Street, Springfield, IL",
        assignedTeam: ["John Smith", "Tom Wilson"],
        progress: 100,
        lastUpdated: new Date(),
      },
    ];

    setTimeout(() => {
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter jobs based on search and filters
  useEffect(() => {
    let filtered = jobs;

    if (searchQuery) {
      filtered = filtered.filter(
        (job) =>
          job.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((job) => job.status === statusFilter);
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter((job) => job.priority === priorityFilter);
    }

    setFilteredJobs(filtered);
  }, [jobs, searchQuery, statusFilter, priorityFilter]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { color: "bg-gray-500", label: "Draft" },
      quoted: { color: "bg-blue-500", label: "Quoted" },
      approved: { color: "bg-green-500", label: "Approved" },
      scheduled: { color: "bg-purple-500", label: "Scheduled" },
      in_progress: { color: "bg-orange-500", label: "In Progress" },
      on_hold: { color: "bg-yellow-500", label: "On Hold" },
      completed: { color: "bg-emerald-500", label: "Completed" },
      cancelled: { color: "bg-red-500", label: "Cancelled" },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={`${config.color} text-white`}>{config.label}</Badge>
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
      <Badge className={`${config.color} text-white`}>{config.label}</Badge>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "on_hold":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  const handleCreateJob = () => {
    setIsCreateDialogOpen(true);
  };

  const handleViewJob = (job: Job) => {
    setSelectedJob(job);
    // Navigate to job detail page
    console.log("Viewing job:", job.id);
  };

  const handleEditJob = (job: Job) => {
    // Navigate to job edit page
    console.log("Editing job:", job.id);
  };

  const handleDeleteJob = (jobId: string) => {
    if (confirm("Are you sure you want to delete this job?")) {
      setJobs(jobs.filter((job) => job.id !== jobId));
    }
  };

  const stats = {
    total: jobs.length,
    active: jobs.filter((j) => j.status === "in_progress").length,
    scheduled: jobs.filter((j) => j.status === "scheduled").length,
    completed: jobs.filter((j) => j.status === "completed").length,
    totalBudget: jobs.reduce((sum, job) => sum + job.budget, 0),
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
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
          <h1 className="text-2xl font-bold text-gray-900">Job Management</h1>
          <p className="text-gray-600">
            Manage all construction jobs, schedules, and assignments
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button onClick={handleCreateJob}>
            <Plus className="mr-2 h-4 w-4" />
            New Job
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Jobs</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold">{stats.scheduled}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold">{stats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold">
                  ${stats.totalBudget.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search jobs, customers, or locations..."
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
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="quoted">Quoted</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="on_hold">On Hold</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Jobs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Jobs ({filteredJobs.length})</CardTitle>
          <CardDescription>
            Manage and track all construction jobs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{job.name}</p>
                      <p className="text-sm text-gray-500">{job.type}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{job.customer}</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {job.location.split(",")[0]}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(job.status)}
                      {getStatusBadge(job.status)}
                    </div>
                  </TableCell>
                  <TableCell>{getPriorityBadge(job.priority)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>
                        {format(job.startDate, "MMM dd")} -{" "}
                        {format(job.endDate, "MMM dd")}
                      </p>
                      <p className="text-gray-500">
                        {job.estimatedHours}h estimated
                        {job.actualHours && ` / ${job.actualHours}h actual`}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">
                      ${job.budget.toLocaleString()}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${job.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {job.progress}%
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{job.assignedTeam.length}</span>
                    </div>
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
                        <DropdownMenuItem onClick={() => handleViewJob(job)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditJob(job)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Job
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteJob(job.id)}
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

      {/* Create Job Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Job</DialogTitle>
            <DialogDescription>
              Choose how you'd like to create a new job.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Button className="w-full justify-start" variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Create from scratch
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Import from template
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Briefcase className="mr-2 h-4 w-4" />
              Duplicate existing job
            </Button>
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
    </div>
  );
};

export default JobManagement;
