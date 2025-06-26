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
  AlertTriangle,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  User,
  MapPin,
  Camera,
  FileText,
  Plus,
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

interface SafetyIncident {
  id: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "open" | "investigating" | "resolved" | "closed";
  reportedBy: string;
  reportedDate: string;
  location: string;
  jobId: string;
  category: "injury" | "near-miss" | "hazard" | "violation" | "equipment";
  assignedTo?: string;
  resolvedDate?: string;
  photos: string[];
  corrective_actions: string[];
}

interface SafetyInspection {
  id: string;
  jobId: string;
  inspectorName: string;
  inspectionDate: string;
  overallScore: number;
  categories: {
    name: string;
    score: number;
    maxScore: number;
    notes: string;
  }[];
  violations: string[];
  recommendations: string[];
  nextInspectionDate: string;
}

const Safety = () => {
  const [incidents, setIncidents] = useState<SafetyIncident[]>([
    {
      id: "1",
      title: "Worker slip on wet surface",
      description:
        "Employee slipped on wet concrete surface near entrance. Minor injury to knee.",
      severity: "medium",
      status: "investigating",
      reportedBy: "John Smith",
      reportedDate: "2024-01-20T10:30:00Z",
      location: "Main entrance area",
      jobId: "JOB-001",
      category: "injury",
      assignedTo: "Safety Manager",
      photos: ["photo1.jpg", "photo2.jpg"],
      corrective_actions: ["Install non-slip mats", "Add warning signs"],
    },
    {
      id: "2",
      title: "Scaffolding not properly secured",
      description:
        "Scaffolding on east side of building found to be improperly secured. Potential fall hazard.",
      severity: "high",
      status: "open",
      reportedBy: "Mike Johnson",
      reportedDate: "2024-01-22T14:15:00Z",
      location: "East building facade",
      jobId: "JOB-001",
      category: "hazard",
      photos: ["scaffolding1.jpg"],
      corrective_actions: [],
    },
    {
      id: "3",
      title: "Missing hard hat violation",
      description:
        "Subcontractor worker observed without required hard hat in active construction zone.",
      severity: "medium",
      status: "resolved",
      reportedBy: "Sarah Wilson",
      reportedDate: "2024-01-18T09:45:00Z",
      resolvedDate: "2024-01-18T11:00:00Z",
      location: "Construction zone B",
      jobId: "JOB-002",
      category: "violation",
      assignedTo: "Site Supervisor",
      photos: [],
      corrective_actions: [
        "Worker provided with hard hat",
        "Safety briefing conducted",
      ],
    },
  ]);

  const [inspections, setInspections] = useState<SafetyInspection[]>([
    {
      id: "1",
      jobId: "JOB-001",
      inspectorName: "David Brown",
      inspectionDate: "2024-01-15T09:00:00Z",
      overallScore: 85,
      categories: [
        {
          name: "Personal Protective Equipment",
          score: 90,
          maxScore: 100,
          notes: "Good compliance overall",
        },
        {
          name: "Fall Protection",
          score: 80,
          maxScore: 100,
          notes: "Some scaffolding issues noted",
        },
        {
          name: "Electrical Safety",
          score: 95,
          maxScore: 100,
          notes: "Excellent compliance",
        },
        {
          name: "Housekeeping",
          score: 75,
          maxScore: 100,
          notes: "Needs improvement in debris removal",
        },
      ],
      violations: [
        "Scaffolding not properly secured",
        "Debris accumulation in walkways",
      ],
      recommendations: [
        "Implement daily scaffolding checks",
        "Increase housekeeping frequency",
      ],
      nextInspectionDate: "2024-02-15T09:00:00Z",
    },
  ]);

  const [newIncidentOpen, setNewIncidentOpen] = useState(false);
  const [newIncident, setNewIncident] = useState({
    title: "",
    description: "",
    severity: "medium" as SafetyIncident["severity"],
    category: "hazard" as SafetyIncident["category"],
    location: "",
    jobId: "JOB-001",
  });

  const getSeverityColor = (severity: SafetyIncident["severity"]) => {
    switch (severity) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: SafetyIncident["status"]) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800";
      case "investigating":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-blue-100 text-blue-800";
      case "closed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: SafetyIncident["status"]) => {
    switch (status) {
      case "open":
        return <XCircle className="w-4 h-4" />;
      case "investigating":
        return <Clock className="w-4 h-4" />;
      case "resolved":
        return <CheckCircle className="w-4 h-4" />;
      case "closed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleCreateIncident = () => {
    const incident: SafetyIncident = {
      id: Date.now().toString(),
      ...newIncident,
      status: "open",
      reportedBy: "Current User",
      reportedDate: new Date().toISOString(),
      photos: [],
      corrective_actions: [],
    };
    setIncidents([...incidents, incident]);
    setNewIncidentOpen(false);
    setNewIncident({
      title: "",
      description: "",
      severity: "medium",
      category: "hazard",
      location: "",
      jobId: "JOB-001",
    });
  };

  const openIncidents = incidents.filter(
    (i) => i.status === "open" || i.status === "investigating",
  );
  const resolvedIncidents = incidents.filter(
    (i) => i.status === "resolved" || i.status === "closed",
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Safety Management
            </h1>
            <p className="text-slate-600 mt-1">
              Monitor incidents, inspections, and safety compliance
            </p>
          </div>
          <Dialog open={newIncidentOpen} onOpenChange={setNewIncidentOpen}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Report Incident
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Report Safety Incident</DialogTitle>
                <DialogDescription>
                  Document a safety incident or hazard
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Incident Title</Label>
                  <Input
                    id="title"
                    value={newIncident.title}
                    onChange={(e) =>
                      setNewIncident({ ...newIncident, title: e.target.value })
                    }
                    placeholder="Brief description of incident"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newIncident.category}
                    onValueChange={(value) =>
                      setNewIncident({
                        ...newIncident,
                        category: value as SafetyIncident["category"],
                      })
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="injury">Injury</SelectItem>
                      <SelectItem value="near-miss">Near Miss</SelectItem>
                      <SelectItem value="hazard">Hazard</SelectItem>
                      <SelectItem value="violation">Violation</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="severity">Severity</Label>
                  <Select
                    value={newIncident.severity}
                    onValueChange={(value) =>
                      setNewIncident({
                        ...newIncident,
                        severity: value as SafetyIncident["severity"],
                      })
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newIncident.location}
                    onChange={(e) =>
                      setNewIncident({
                        ...newIncident,
                        location: e.target.value,
                      })
                    }
                    placeholder="Where did this occur?"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newIncident.description}
                    onChange={(e) =>
                      setNewIncident({
                        ...newIncident,
                        description: e.target.value,
                      })
                    }
                    placeholder="Detailed description of the incident..."
                    className="mt-1"
                    rows={3}
                  />
                </div>
                <Button
                  onClick={handleCreateIncident}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Report Incident
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Safety Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Open Incidents
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {openIncidents.length}
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
                  <p className="text-sm font-medium text-slate-600">
                    Resolved This Month
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {resolvedIncidents.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Safety Score
                  </p>
                  <p className="text-2xl font-bold text-slate-900">85%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-purple-600" />
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
        </div>

        {/* Main Content */}
        <Tabs defaultValue="incidents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="incidents">Safety Incidents</TabsTrigger>
            <TabsTrigger value="inspections">Safety Inspections</TabsTrigger>
          </TabsList>

          <TabsContent value="incidents" className="space-y-6">
            {/* Incidents List */}
            <div className="grid gap-4">
              {incidents.map((incident) => (
                <Card
                  key={incident.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-slate-900">
                            {incident.title}
                          </h3>
                          <Badge
                            className={getSeverityColor(incident.severity)}
                          >
                            {incident.severity}
                          </Badge>
                          <Badge className={getStatusColor(incident.status)}>
                            {getStatusIcon(incident.status)}
                            <span className="ml-1">{incident.status}</span>
                          </Badge>
                        </div>
                        <p className="text-slate-600 mb-3">
                          {incident.description}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-500">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{incident.reportedBy}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{incident.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>
                              {new Date(
                                incident.reportedDate,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div>
                            <Badge variant="outline">{incident.jobId}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {incident.corrective_actions.length > 0 && (
                      <div className="mt-4 p-3 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-green-900 mb-2">
                          Corrective Actions:
                        </h4>
                        <ul className="list-disc list-inside text-sm text-green-800 space-y-1">
                          {incident.corrective_actions.map((action, index) => (
                            <li key={index}>{action}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex justify-between items-center mt-4">
                      <div className="flex space-x-2">
                        {incident.photos.length > 0 && (
                          <Badge variant="secondary">
                            <Camera className="w-3 h-3 mr-1" />
                            {incident.photos.length} photos
                          </Badge>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        {incident.status === "open" && (
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

          <TabsContent value="inspections" className="space-y-6">
            {/* Inspections List */}
            <div className="grid gap-6">
              {inspections.map((inspection) => (
                <Card key={inspection.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <Shield className="w-5 h-5" />
                          <span>Safety Inspection - {inspection.jobId}</span>
                        </CardTitle>
                        <CardDescription>
                          Conducted by {inspection.inspectorName} on{" "}
                          {new Date(
                            inspection.inspectionDate,
                          ).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-slate-900">
                          {inspection.overallScore}%
                        </div>
                        <div className="text-sm text-slate-500">
                          Overall Score
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Category Scores */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-900">
                        Category Scores
                      </h4>
                      {inspection.categories.map((category, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              {category.name}
                            </span>
                            <span className="text-sm text-slate-600">
                              {category.score}/{category.maxScore}
                            </span>
                          </div>
                          <Progress
                            value={(category.score / category.maxScore) * 100}
                            className="h-2"
                          />
                          {category.notes && (
                            <p className="text-xs text-slate-500">
                              {category.notes}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Violations */}
                    {inspection.violations.length > 0 && (
                      <div className="p-4 bg-red-50 rounded-lg">
                        <h4 className="font-semibold text-red-900 mb-2">
                          Violations Found
                        </h4>
                        <ul className="list-disc list-inside text-sm text-red-800 space-y-1">
                          {inspection.violations.map((violation, index) => (
                            <li key={index}>{violation}</li>
                          ))}
                        </ul>
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
                        Next inspection:{" "}
                        {new Date(
                          inspection.nextInspectionDate,
                        ).toLocaleDateString()}
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          View Full Report
                        </Button>
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Schedule Follow-up
                        </Button>
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

export default Safety;
