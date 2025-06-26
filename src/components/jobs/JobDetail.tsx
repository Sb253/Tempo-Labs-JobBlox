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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Edit,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Clock,
  FileText,
  Camera,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Play,
  Pause,
  Square,
  Phone,
  Mail,
  Download,
  Upload,
  Share,
  MoreHorizontal,
  Package,
  Wrench,
  Shield,
  Target,
} from "lucide-react";
import { format } from "date-fns";

interface JobDetail {
  id: string;
  name: string;
  description: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  type: string;
  status: string;
  priority: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  estimatedHours: number;
  actualHours: number;
  location: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  assignedTeam: {
    id: string;
    name: string;
    role: string;
    avatar: string;
    hourlyRate: number;
  }[];
  materials: {
    id: string;
    name: string;
    quantity: number;
    unit: string;
    unitCost: number;
    totalCost: number;
    status: string;
  }[];
  timeline: {
    id: string;
    date: Date;
    event: string;
    description: string;
    user: string;
    type: "info" | "warning" | "success" | "error";
  }[];
  documents: {
    id: string;
    name: string;
    type: string;
    size: string;
    uploadedBy: string;
    uploadedAt: Date;
  }[];
  photos: {
    id: string;
    url: string;
    caption: string;
    takenBy: string;
    takenAt: Date;
  }[];
  notes: {
    id: string;
    content: string;
    author: string;
    createdAt: Date;
    isInternal: boolean;
  }[];
  progress: {
    overall: number;
    phases: {
      name: string;
      progress: number;
      status: string;
    }[];
  };
}

const JobDetail = () => {
  const [job, setJob] = useState<JobDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [newNote, setNewNote] = useState("");
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockJob: JobDetail = {
      id: "job_001",
      name: "Kitchen Renovation - Johnson Family",
      description:
        "Complete kitchen renovation including new cabinets, countertops, appliances, flooring, and electrical work. Modern design with island and breakfast bar.",
      customer: {
        name: "Johnson Family",
        email: "sarah.johnson@email.com",
        phone: "+1 (555) 123-4567",
        address: "123 Oak Street, Springfield, IL 62701",
      },
      type: "renovation",
      status: "in_progress",
      priority: "high",
      startDate: new Date("2024-01-15"),
      endDate: new Date("2024-02-28"),
      budget: 25000,
      estimatedHours: 120,
      actualHours: 85,
      location: {
        street: "123 Oak Street",
        city: "Springfield",
        state: "IL",
        zipCode: "62701",
      },
      assignedTeam: [
        {
          id: "emp_001",
          name: "John Smith",
          role: "Project Manager",
          avatar: "JS",
          hourlyRate: 75,
        },
        {
          id: "emp_002",
          name: "Mike Johnson",
          role: "Lead Carpenter",
          avatar: "MJ",
          hourlyRate: 45,
        },
        {
          id: "emp_003",
          name: "Sarah Davis",
          role: "Electrician",
          avatar: "SD",
          hourlyRate: 55,
        },
      ],
      materials: [
        {
          id: "mat_001",
          name: "Kitchen Cabinets",
          quantity: 12,
          unit: "units",
          unitCost: 450,
          totalCost: 5400,
          status: "delivered",
        },
        {
          id: "mat_002",
          name: "Granite Countertop",
          quantity: 35,
          unit: "sq ft",
          unitCost: 85,
          totalCost: 2975,
          status: "ordered",
        },
        {
          id: "mat_003",
          name: "Hardwood Flooring",
          quantity: 200,
          unit: "sq ft",
          unitCost: 12,
          totalCost: 2400,
          status: "delivered",
        },
      ],
      timeline: [
        {
          id: "t1",
          date: new Date("2024-01-15"),
          event: "Project Started",
          description: "Demolition phase began",
          user: "John Smith",
          type: "success",
        },
        {
          id: "t2",
          date: new Date("2024-01-18"),
          event: "Materials Delivered",
          description: "Kitchen cabinets and flooring delivered",
          user: "Mike Johnson",
          type: "info",
        },
        {
          id: "t3",
          date: new Date("2024-01-22"),
          event: "Electrical Work Completed",
          description: "New wiring and outlets installed",
          user: "Sarah Davis",
          type: "success",
        },
        {
          id: "t4",
          date: new Date("2024-01-25"),
          event: "Delay Notice",
          description: "Countertop delivery delayed by 3 days",
          user: "John Smith",
          type: "warning",
        },
      ],
      documents: [
        {
          id: "doc_001",
          name: "Kitchen Design Plans.pdf",
          type: "PDF",
          size: "2.4 MB",
          uploadedBy: "John Smith",
          uploadedAt: new Date("2024-01-10"),
        },
        {
          id: "doc_002",
          name: "Material Specifications.xlsx",
          type: "Excel",
          size: "1.2 MB",
          uploadedBy: "Mike Johnson",
          uploadedAt: new Date("2024-01-12"),
        },
        {
          id: "doc_003",
          name: "Electrical Permit.pdf",
          type: "PDF",
          size: "856 KB",
          uploadedBy: "Sarah Davis",
          uploadedAt: new Date("2024-01-14"),
        },
      ],
      photos: [
        {
          id: "photo_001",
          url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
          caption: "Before - Original kitchen",
          takenBy: "John Smith",
          takenAt: new Date("2024-01-15"),
        },
        {
          id: "photo_002",
          url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
          caption: "Demolition in progress",
          takenBy: "Mike Johnson",
          takenAt: new Date("2024-01-16"),
        },
        {
          id: "photo_003",
          url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
          caption: "New electrical work",
          takenBy: "Sarah Davis",
          takenAt: new Date("2024-01-22"),
        },
      ],
      notes: [
        {
          id: "note_001",
          content:
            "Customer requested additional outlet near the island. Added to scope.",
          author: "John Smith",
          createdAt: new Date("2024-01-20"),
          isInternal: false,
        },
        {
          id: "note_002",
          content:
            "Need to coordinate with plumber for dishwasher installation.",
          author: "Mike Johnson",
          createdAt: new Date("2024-01-21"),
          isInternal: true,
        },
      ],
      progress: {
        overall: 70,
        phases: [
          { name: "Demolition", progress: 100, status: "completed" },
          { name: "Electrical", progress: 100, status: "completed" },
          { name: "Plumbing", progress: 80, status: "in_progress" },
          { name: "Flooring", progress: 60, status: "in_progress" },
          { name: "Cabinets", progress: 40, status: "in_progress" },
          { name: "Countertops", progress: 0, status: "pending" },
          { name: "Final Touches", progress: 0, status: "pending" },
        ],
      },
    };

    setTimeout(() => {
      setJob(mockJob);
      setIsLoading(false);
    }, 1000);
  }, []);

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

  const handleAddNote = () => {
    if (newNote.trim() && job) {
      const note = {
        id: `note_${Date.now()}`,
        content: newNote,
        author: "Current User",
        createdAt: new Date(),
        isInternal: false,
      };
      setJob({ ...job, notes: [note, ...job.notes] });
      setNewNote("");
      setIsNoteDialogOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-4">
              <div className="h-48 bg-gray-200 rounded"></div>
              <div className="h-48 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="bg-white p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Job not found</h2>
          <p className="text-gray-600">The requested job could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{job.name}</h1>
            <div className="flex items-center space-x-2 mt-1">
              {getStatusBadge(job.status)}
              {getPriorityBadge(job.priority)}
              <span className="text-sm text-gray-500">#{job.id}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Share className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Job
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Progress Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Project Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">
                          Overall Progress
                        </span>
                        <span className="text-sm text-gray-500">
                          {job.progress.overall}%
                        </span>
                      </div>
                      <Progress value={job.progress.overall} className="h-3" />
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      {job.progress.phases.map((phase, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                phase.status === "completed"
                                  ? "bg-green-500"
                                  : phase.status === "in_progress"
                                    ? "bg-blue-500"
                                    : "bg-gray-300"
                              }`}
                            />
                            <span className="text-sm">{phase.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${phase.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-500 w-10">
                              {phase.progress}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Job Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{job.description}</p>
                </CardContent>
              </Card>

              {/* Team */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Assigned Team</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {job.assignedTeam.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>{member.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-gray-500">
                              {member.role}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            ${member.hourlyRate}/hr
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline">
              <Card>
                <CardHeader>
                  <CardTitle>Project Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {job.timeline.map((event) => (
                      <div key={event.id} className="flex space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full mt-2 ${
                            event.type === "success"
                              ? "bg-green-500"
                              : event.type === "warning"
                                ? "bg-yellow-500"
                                : event.type === "error"
                                  ? "bg-red-500"
                                  : "bg-blue-500"
                          }`}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{event.event}</h4>
                            <span className="text-sm text-gray-500">
                              {format(event.date, "MMM dd, yyyy")}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {event.description}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            by {event.user}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="materials">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="h-5 w-5" />
                    <span>Materials & Supplies</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Unit Cost</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {job.materials.map((material) => (
                        <TableRow key={material.id}>
                          <TableCell className="font-medium">
                            {material.name}
                          </TableCell>
                          <TableCell>
                            {material.quantity} {material.unit}
                          </TableCell>
                          <TableCell>${material.unitCost}</TableCell>
                          <TableCell>${material.totalCost}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                material.status === "delivered"
                                  ? "bg-green-500"
                                  : material.status === "ordered"
                                    ? "bg-blue-500"
                                    : "bg-gray-500"
                              }
                            >
                              {material.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Documents</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {job.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <FileText className="h-8 w-8 text-blue-500" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-gray-500">
                              {doc.size} • Uploaded by {doc.uploadedBy} on{" "}
                              {format(doc.uploadedAt, "MMM dd, yyyy")}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="photos">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Camera className="h-5 w-5" />
                    <span>Project Photos</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {job.photos.map((photo) => (
                      <div key={photo.id} className="space-y-2">
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div>
                          <p className="text-sm font-medium">{photo.caption}</p>
                          <p className="text-xs text-gray-500">
                            by {photo.takenBy} •{" "}
                            {format(photo.takenAt, "MMM dd")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <MessageSquare className="h-5 w-5" />
                      <span>Notes & Comments</span>
                    </CardTitle>
                    <Dialog
                      open={isNoteDialogOpen}
                      onOpenChange={setIsNoteDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button size="sm">Add Note</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Note</DialogTitle>
                          <DialogDescription>
                            Add a note or comment about this job.
                          </DialogDescription>
                        </DialogHeader>
                        <Textarea
                          placeholder="Enter your note..."
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          className="min-h-[100px]"
                        />
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setIsNoteDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button onClick={handleAddNote}>Add Note</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {job.notes.map((note) => (
                      <div
                        key={note.id}
                        className="border-l-4 border-blue-500 pl-4 py-2"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">
                            {note.author}
                          </span>
                          <div className="flex items-center space-x-2">
                            {note.isInternal && (
                              <Badge variant="outline" className="text-xs">
                                Internal
                              </Badge>
                            )}
                            <span className="text-xs text-gray-500">
                              {format(
                                note.createdAt,
                                "MMM dd, yyyy 'at' h:mm a",
                              )}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700">{note.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Job Info */}
          <Card>
            <CardHeader>
              <CardTitle>Job Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Schedule</p>
                  <p className="text-sm text-gray-600">
                    {format(job.startDate, "MMM dd")} -{" "}
                    {format(job.endDate, "MMM dd, yyyy")}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-gray-600">
                    {job.location.street}, {job.location.city},{" "}
                    {job.location.state} {job.location.zipCode}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Budget</p>
                  <p className="text-sm text-gray-600">
                    ${job.budget.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Hours</p>
                  <p className="text-sm text-gray-600">
                    {job.actualHours} / {job.estimatedHours} hours
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle>Customer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium">{job.customer.name}</p>
                <p className="text-sm text-gray-600">{job.customer.address}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Phone className="h-4 w-4 mr-1" />
                  Call
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Mail className="h-4 w-4 mr-1" />
                  Email
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Play className="mr-2 h-4 w-4" />
                Start Timer
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Camera className="mr-2 h-4 w-4" />
                Add Photos
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Add Note
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
