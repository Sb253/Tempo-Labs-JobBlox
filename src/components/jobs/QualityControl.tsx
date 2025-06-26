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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  Camera,
  FileText,
  Calendar,
  User,
  MapPin,
  Plus,
  Eye,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface QualityInspection {
  id: string;
  jobId: string;
  inspectionType: "pre-work" | "in-progress" | "final" | "punch-list";
  inspectorName: string;
  inspectionDate: string;
  status: "pending" | "in-progress" | "completed" | "failed";
  overallRating: number;
  categories: {
    name: string;
    rating: number;
    maxRating: number;
    notes: string;
    photos: string[];
  }[];
  defects: QualityDefect[];
  recommendations: string[];
  approvedBy?: string;
  approvalDate?: string;
}

interface QualityDefect {
  id: string;
  title: string;
  description: string;
  severity: "minor" | "major" | "critical";
  status: "open" | "in-progress" | "resolved" | "verified";
  location: string;
  category:
    | "workmanship"
    | "materials"
    | "safety"
    | "code-compliance"
    | "design";
  reportedBy: string;
  reportedDate: string;
  assignedTo?: string;
  dueDate?: string;
  resolvedDate?: string;
  photos: string[];
  cost?: number;
}

interface QualityStandard {
  id: string;
  name: string;
  description: string;
  category: string;
  criteria: {
    item: string;
    requirement: string;
    tolerance: string;
  }[];
  applicablePhases: string[];
}

const QualityControl = () => {
  const [inspections, setInspections] = useState<QualityInspection[]>([
    {
      id: "1",
      jobId: "JOB-001",
      inspectionType: "in-progress",
      inspectorName: "Robert Chen",
      inspectionDate: "2024-01-20T10:00:00Z",
      status: "completed",
      overallRating: 4.2,
      categories: [
        {
          name: "Foundation Work",
          rating: 4.5,
          maxRating: 5,
          notes: "Excellent concrete pour, proper curing observed",
          photos: ["foundation1.jpg", "foundation2.jpg"],
        },
        {
          name: "Framing",
          rating: 4.0,
          maxRating: 5,
          notes: "Good overall quality, minor adjustments needed",
          photos: ["framing1.jpg"],
        },
        {
          name: "Electrical Rough-in",
          rating: 4.0,
          maxRating: 5,
          notes: "Code compliant, proper spacing maintained",
          photos: [],
        },
      ],
      defects: [],
      recommendations: [
        "Schedule electrical inspection",
        "Review framing tolerances",
      ],
      approvedBy: "Project Manager",
      approvalDate: "2024-01-20T16:00:00Z",
    },
    {
      id: "2",
      jobId: "JOB-002",
      inspectionType: "final",
      inspectorName: "Maria Rodriguez",
      inspectionDate: "2024-01-22T14:00:00Z",
      status: "failed",
      overallRating: 2.8,
      categories: [
        {
          name: "Finish Work",
          rating: 2.5,
          maxRating: 5,
          notes: "Multiple defects in paint finish and trim work",
          photos: ["finish1.jpg", "finish2.jpg"],
        },
        {
          name: "Flooring",
          rating: 3.0,
          maxRating: 5,
          notes: "Acceptable quality with minor imperfections",
          photos: ["flooring1.jpg"],
        },
      ],
      defects: [
        {
          id: "D1",
          title: "Paint streaks on living room wall",
          description: "Visible brush marks and uneven coverage on main wall",
          severity: "major",
          status: "open",
          location: "Living room, north wall",
          category: "workmanship",
          reportedBy: "Maria Rodriguez",
          reportedDate: "2024-01-22T14:30:00Z",
          assignedTo: "Paint Contractor",
          dueDate: "2024-01-25T17:00:00Z",
          photos: ["paint_defect1.jpg"],
          cost: 250,
        },
      ],
      recommendations: [
        "Re-inspect after defect resolution",
        "Consider additional quality training for paint crew",
      ],
    },
  ]);

  const [defects, setDefects] = useState<QualityDefect[]>([
    {
      id: "D1",
      title: "Paint streaks on living room wall",
      description: "Visible brush marks and uneven coverage on main wall",
      severity: "major",
      status: "open",
      location: "Living room, north wall",
      category: "workmanship",
      reportedBy: "Maria Rodriguez",
      reportedDate: "2024-01-22T14:30:00Z",
      assignedTo: "Paint Contractor",
      dueDate: "2024-01-25T17:00:00Z",
      photos: ["paint_defect1.jpg"],
      cost: 250,
    },
    {
      id: "D2",
      title: "Uneven tile spacing in bathroom",
      description: "Inconsistent grout lines in master bathroom shower",
      severity: "minor",
      status: "in-progress",
      location: "Master bathroom shower",
      category: "workmanship",
      reportedBy: "John Smith",
      reportedDate: "2024-01-18T11:00:00Z",
      assignedTo: "Tile Contractor",
      dueDate: "2024-01-24T17:00:00Z",
      photos: ["tile_defect1.jpg", "tile_defect2.jpg"],
    },
  ]);

  const [standards] = useState<QualityStandard[]>([
    {
      id: "1",
      name: "Concrete Foundation Standards",
      description: "Quality requirements for concrete foundation work",
      category: "Foundation",
      criteria: [
        {
          item: "Concrete Strength",
          requirement: "Minimum 3000 PSI",
          tolerance: "±200 PSI",
        },
        {
          item: "Surface Finish",
          requirement: "Smooth, level surface",
          tolerance: "±1/4 inch in 10 feet",
        },
        {
          item: "Curing Time",
          requirement: "Minimum 7 days moist curing",
          tolerance: "No deviation",
        },
      ],
      applicablePhases: ["Foundation", "Structural"],
    },
  ]);

  const [newInspectionOpen, setNewInspectionOpen] = useState(false);
  const [newDefectOpen, setNewDefectOpen] = useState(false);
  const [newInspection, setNewInspection] = useState({
    jobId: "JOB-001",
    inspectionType: "in-progress" as QualityInspection["inspectionType"],
    inspectorName: "",
  });
  const [newDefect, setNewDefect] = useState({
    title: "",
    description: "",
    severity: "minor" as QualityDefect["severity"],
    location: "",
    category: "workmanship" as QualityDefect["category"],
  });

  const getSeverityColor = (severity: QualityDefect["severity"]) => {
    switch (severity) {
      case "minor":
        return "bg-yellow-100 text-yellow-800";
      case "major":
        return "bg-orange-100 text-orange-800";
      case "critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: QualityDefect["status"]) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "resolved":
        return "bg-yellow-100 text-yellow-800";
      case "verified":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getInspectionStatusColor = (status: QualityInspection["status"]) => {
    switch (status) {
      case "pending":
        return "bg-gray-100 text-gray-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderStarRating = (rating: number, maxRating: number = 5) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-yellow-200 text-yellow-400" />,
      );
    }

    const remainingStars = maxRating - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return <div className="flex space-x-1">{stars}</div>;
  };

  const openDefects = defects.filter(
    (d) => d.status === "open" || d.status === "in-progress",
  );
  const resolvedDefects = defects.filter(
    (d) => d.status === "resolved" || d.status === "verified",
  );
  const averageRating =
    inspections.reduce((acc, inspection) => acc + inspection.overallRating, 0) /
    inspections.length;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Quality Control
            </h1>
            <p className="text-slate-600 mt-1">
              Manage inspections, defects, and quality standards
            </p>
          </div>
          <div className="flex space-x-2">
            <Dialog open={newDefectOpen} onOpenChange={setNewDefectOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Report Defect
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Report Quality Defect</DialogTitle>
                  <DialogDescription>
                    Document a quality issue or defect
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="defect-title">Defect Title</Label>
                    <Input
                      id="defect-title"
                      value={newDefect.title}
                      onChange={(e) =>
                        setNewDefect({ ...newDefect, title: e.target.value })
                      }
                      placeholder="Brief description of defect"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="defect-category">Category</Label>
                    <Select
                      value={newDefect.category}
                      onValueChange={(value) =>
                        setNewDefect({
                          ...newDefect,
                          category: value as QualityDefect["category"],
                        })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="workmanship">Workmanship</SelectItem>
                        <SelectItem value="materials">Materials</SelectItem>
                        <SelectItem value="safety">Safety</SelectItem>
                        <SelectItem value="code-compliance">
                          Code Compliance
                        </SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="defect-severity">Severity</Label>
                    <Select
                      value={newDefect.severity}
                      onValueChange={(value) =>
                        setNewDefect({
                          ...newDefect,
                          severity: value as QualityDefect["severity"],
                        })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minor">Minor</SelectItem>
                        <SelectItem value="major">Major</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="defect-location">Location</Label>
                    <Input
                      id="defect-location"
                      value={newDefect.location}
                      onChange={(e) =>
                        setNewDefect({ ...newDefect, location: e.target.value })
                      }
                      placeholder="Where is this defect located?"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="defect-description">Description</Label>
                    <Textarea
                      id="defect-description"
                      value={newDefect.description}
                      onChange={(e) =>
                        setNewDefect({
                          ...newDefect,
                          description: e.target.value,
                        })
                      }
                      placeholder="Detailed description of the defect..."
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Report Defect
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog
              open={newInspectionOpen}
              onOpenChange={setNewInspectionOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  New Inspection
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Schedule Quality Inspection</DialogTitle>
                  <DialogDescription>
                    Create a new quality inspection
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="inspection-type">Inspection Type</Label>
                    <Select
                      value={newInspection.inspectionType}
                      onValueChange={(value) =>
                        setNewInspection({
                          ...newInspection,
                          inspectionType:
                            value as QualityInspection["inspectionType"],
                        })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pre-work">Pre-Work</SelectItem>
                        <SelectItem value="in-progress">In-Progress</SelectItem>
                        <SelectItem value="final">Final</SelectItem>
                        <SelectItem value="punch-list">Punch List</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="inspector-name">Inspector Name</Label>
                    <Input
                      id="inspector-name"
                      value={newInspection.inspectorName}
                      onChange={(e) =>
                        setNewInspection({
                          ...newInspection,
                          inspectorName: e.target.value,
                        })
                      }
                      placeholder="Who will conduct this inspection?"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="job-id">Job ID</Label>
                    <Select
                      value={newInspection.jobId}
                      onValueChange={(value) =>
                        setNewInspection({ ...newInspection, jobId: value })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="JOB-001">JOB-001</SelectItem>
                        <SelectItem value="JOB-002">JOB-002</SelectItem>
                        <SelectItem value="JOB-003">JOB-003</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule Inspection
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Quality Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Average Rating
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {averageRating.toFixed(1)}/5
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Inspections
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {inspections.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Open Defects
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {openDefects.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-slate-600">Resolved</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {resolvedDefects.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="inspections" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="inspections">Inspections</TabsTrigger>
            <TabsTrigger value="defects">Defects</TabsTrigger>
            <TabsTrigger value="standards">Standards</TabsTrigger>
          </TabsList>

          <TabsContent value="inspections" className="space-y-6">
            <div className="grid gap-6">
              {inspections.map((inspection) => (
                <Card key={inspection.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <FileText className="w-5 h-5" />
                          <span>
                            {inspection.inspectionType
                              .replace("-", " ")
                              .toUpperCase()}{" "}
                            Inspection - {inspection.jobId}
                          </span>
                        </CardTitle>
                        <CardDescription>
                          Conducted by {inspection.inspectorName} on{" "}
                          {new Date(
                            inspection.inspectionDate,
                          ).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={getInspectionStatusColor(
                            inspection.status,
                          )}
                        >
                          {inspection.status}
                        </Badge>
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            {renderStarRating(inspection.overallRating)}
                            <span className="text-sm text-slate-600">
                              ({inspection.overallRating.toFixed(1)})
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Category Ratings */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-900">
                        Category Ratings
                      </h4>
                      {inspection.categories.map((category, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 bg-slate-50 rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">
                                {category.name}
                              </span>
                              <div className="flex items-center space-x-2">
                                {renderStarRating(
                                  category.rating,
                                  category.maxRating,
                                )}
                                <span className="text-sm text-slate-600">
                                  ({category.rating.toFixed(1)}/
                                  {category.maxRating})
                                </span>
                              </div>
                            </div>
                            {category.notes && (
                              <p className="text-sm text-slate-600">
                                {category.notes}
                              </p>
                            )}
                            {category.photos.length > 0 && (
                              <div className="flex items-center space-x-1 mt-2">
                                <Camera className="w-4 h-4 text-slate-400" />
                                <span className="text-xs text-slate-500">
                                  {category.photos.length} photos
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Defects */}
                    {inspection.defects.length > 0 && (
                      <div className="p-4 bg-red-50 rounded-lg">
                        <h4 className="font-semibold text-red-900 mb-2">
                          Defects Found
                        </h4>
                        <div className="space-y-2">
                          {inspection.defects.map((defect, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center"
                            >
                              <span className="text-sm text-red-800">
                                {defect.title}
                              </span>
                              <Badge
                                className={getSeverityColor(defect.severity)}
                              >
                                {defect.severity}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recommendations */}
                    {inspection.recommendations.length > 0 && (
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">
                          Recommendations
                        </h4>
                        <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
                          {inspection.recommendations.map(
                            (recommendation, index) => (
                              <li key={index}>{recommendation}</li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-4 border-t">
                      <div className="text-sm text-slate-500">
                        {inspection.approvedBy && inspection.approvalDate && (
                          <span>
                            Approved by {inspection.approvedBy} on{" "}
                            {new Date(
                              inspection.approvalDate,
                            ).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        {inspection.status === "failed" && (
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Schedule Re-inspection
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="defects" className="space-y-6">
            <div className="grid gap-4">
              {defects.map((defect) => (
                <Card
                  key={defect.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-slate-900">
                            {defect.title}
                          </h3>
                          <Badge className={getSeverityColor(defect.severity)}>
                            {defect.severity}
                          </Badge>
                          <Badge className={getStatusColor(defect.status)}>
                            {defect.status}
                          </Badge>
                        </div>
                        <p className="text-slate-600 mb-3">
                          {defect.description}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-500">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{defect.reportedBy}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{defect.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(
                                defect.reportedDate,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          {defect.cost && (
                            <div>
                              <span className="font-medium">
                                ${defect.cost}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {defect.assignedTo && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-blue-900">
                            Assigned to: {defect.assignedTo}
                          </span>
                          {defect.dueDate && (
                            <span className="text-sm text-blue-700">
                              Due:{" "}
                              {new Date(defect.dueDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        {defect.photos.length > 0 && (
                          <Badge variant="secondary">
                            <Camera className="w-3 h-3 mr-1" />
                            {defect.photos.length} photos
                          </Badge>
                        )}
                        <Badge variant="outline">{defect.category}</Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        {defect.status === "open" && (
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Update Status
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="standards" className="space-y-6">
            <div className="grid gap-6">
              {standards.map((standard) => (
                <Card key={standard.id}>
                  <CardHeader>
                    <CardTitle>{standard.name}</CardTitle>
                    <CardDescription>{standard.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">
                        Quality Criteria
                      </h4>
                      <div className="space-y-3">
                        {standard.criteria.map((criterion, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-3 gap-4 p-3 bg-slate-50 rounded-lg"
                          >
                            <div>
                              <span className="font-medium text-slate-900">
                                {criterion.item}
                              </span>
                            </div>
                            <div>
                              <span className="text-slate-600">
                                {criterion.requirement}
                              </span>
                            </div>
                            <div>
                              <Badge variant="outline">
                                {criterion.tolerance}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">
                        Applicable Phases
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {standard.applicablePhases.map((phase, index) => (
                          <Badge key={index} variant="secondary">
                            {phase}
                          </Badge>
                        ))}
                      </div>
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

export default QualityControl;
