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
import {
  Users,
  DollarSign,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Plus,
  Edit,
  Eye,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Filter,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  projectType: string;
  estimatedValue: number;
  stage: "lead" | "qualified" | "proposal" | "negotiation" | "won" | "lost";
  priority: "low" | "medium" | "high";
  source: string;
  assignedTo: string;
  createdDate: string;
  lastContact: string;
  nextFollowUp: string;
  notes: string;
  avatar?: string;
  probability: number;
}

const Pipeline = () => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const leads: Lead[] = [
    {
      id: "lead_001",
      name: "Michael Chen",
      email: "michael.chen@email.com",
      phone: "+1 (555) 234-5678",
      address: "456 Pine Street, Chicago, IL",
      projectType: "Kitchen Renovation",
      estimatedValue: 25000,
      stage: "qualified",
      priority: "high",
      source: "Google Ads",
      assignedTo: "Sarah Johnson",
      createdDate: "2024-01-15",
      lastContact: "2024-01-28",
      nextFollowUp: "2024-02-05",
      notes:
        "Interested in high-end kitchen renovation. Budget confirmed. Wants to start in March.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      probability: 75,
    },
    {
      id: "lead_002",
      name: "Jennifer Martinez",
      email: "j.martinez@email.com",
      phone: "+1 (555) 345-6789",
      address: "789 Oak Avenue, Springfield, IL",
      projectType: "Bathroom Remodel",
      estimatedValue: 15000,
      stage: "proposal",
      priority: "medium",
      source: "Facebook",
      assignedTo: "Mike Thompson",
      createdDate: "2024-01-20",
      lastContact: "2024-01-30",
      nextFollowUp: "2024-02-02",
      notes:
        "Proposal sent. Waiting for decision. Has specific tile preferences.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer",
      probability: 60,
    },
    {
      id: "lead_003",
      name: "Robert Wilson",
      email: "rwilson@email.com",
      phone: "+1 (555) 456-7890",
      address: "321 Elm Street, Peoria, IL",
      projectType: "Deck Construction",
      estimatedValue: 12000,
      stage: "negotiation",
      priority: "high",
      source: "Referral",
      assignedTo: "Sarah Johnson",
      createdDate: "2024-01-10",
      lastContact: "2024-02-01",
      nextFollowUp: "2024-02-03",
      notes:
        "Negotiating timeline and materials. Very interested. Price sensitive.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
      probability: 85,
    },
    {
      id: "lead_004",
      name: "Lisa Thompson",
      email: "lisa.t@email.com",
      phone: "+1 (555) 567-8901",
      address: "654 Maple Drive, Rockford, IL",
      projectType: "Home Addition",
      estimatedValue: 45000,
      stage: "lead",
      priority: "low",
      source: "Website",
      assignedTo: "Mike Thompson",
      createdDate: "2024-01-25",
      lastContact: "2024-01-25",
      nextFollowUp: "2024-02-08",
      notes:
        "Initial inquiry. Needs more information about permits and timeline.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
      probability: 25,
    },
    {
      id: "lead_005",
      name: "David Brown",
      email: "d.brown@email.com",
      phone: "+1 (555) 678-9012",
      address: "987 Cedar Lane, Aurora, IL",
      projectType: "Basement Finishing",
      estimatedValue: 30000,
      stage: "won",
      priority: "high",
      source: "Home Show",
      assignedTo: "Sarah Johnson",
      createdDate: "2024-01-05",
      lastContact: "2024-01-29",
      nextFollowUp: "2024-02-15",
      notes:
        "Contract signed! Project starts February 15th. Very excited customer.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      probability: 100,
    },
  ];

  const stages = [
    {
      key: "lead",
      label: "New Leads",
      color: "bg-slate-500",
      count: leads.filter((l) => l.stage === "lead").length,
    },
    {
      key: "qualified",
      label: "Qualified",
      color: "bg-blue-500",
      count: leads.filter((l) => l.stage === "qualified").length,
    },
    {
      key: "proposal",
      label: "Proposal Sent",
      color: "bg-yellow-500",
      count: leads.filter((l) => l.stage === "proposal").length,
    },
    {
      key: "negotiation",
      label: "Negotiation",
      color: "bg-orange-500",
      count: leads.filter((l) => l.stage === "negotiation").length,
    },
    {
      key: "won",
      label: "Won",
      color: "bg-green-500",
      count: leads.filter((l) => l.stage === "won").length,
    },
    {
      key: "lost",
      label: "Lost",
      color: "bg-red-500",
      count: leads.filter((l) => l.stage === "lost").length,
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStageColor = (stage: string) => {
    const stageConfig = stages.find((s) => s.key === stage);
    return stageConfig?.color || "bg-gray-500";
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.projectType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === "all" || lead.stage === stageFilter;
    const matchesPriority =
      priorityFilter === "all" || lead.priority === priorityFilter;
    return matchesSearch && matchesStage && matchesPriority;
  });

  const totalPipelineValue = leads.reduce(
    (sum, lead) => sum + (lead.estimatedValue * lead.probability) / 100,
    0,
  );
  const averageDealSize =
    leads.length > 0
      ? leads.reduce((sum, lead) => sum + lead.estimatedValue, 0) / leads.length
      : 0;
  const conversionRate =
    leads.length > 0
      ? (leads.filter((l) => l.stage === "won").length / leads.length) * 100
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Sales Pipeline
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Track leads and opportunities through your sales process
              </p>
            </div>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              <Plus className="mr-2 h-4 w-4" />
              Add Lead
            </Button>
          </div>
        </div>

        {/* Pipeline Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    ${(totalPipelineValue / 1000).toFixed(0)}K
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    Pipeline Value
                  </p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {leads.length}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    Active Leads
                  </p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    ${(averageDealSize / 1000).toFixed(0)}K
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    Avg Deal Size
                  </p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <TrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-emerald-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {conversionRate.toFixed(1)}%
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    Conversion Rate
                  </p>
                </div>
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                  <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pipeline Stages Overview */}
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">
              Pipeline Overview
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Visual representation of leads in each stage
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {stages.map((stage) => (
                <div key={stage.key} className="text-center">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl",
                      stage.color,
                    )}
                  >
                    {stage.count}
                  </div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {stage.label}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {stage.count} {stage.count === 1 ? "lead" : "leads"}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600"
                />
              </div>
              <Select value={stageFilter} onValueChange={setStageFilter}>
                <SelectTrigger className="w-full md:w-48 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="All Stages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  {stages.map((stage) => (
                    <SelectItem key={stage.key} value={stage.key}>
                      {stage.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full md:w-48 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600">
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Leads List */}
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">
              Active Leads
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Manage and track your sales opportunities
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:shadow-md transition-all duration-200 border border-slate-200 dark:border-slate-600"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12 ring-2 ring-slate-200 dark:ring-slate-600">
                        <AvatarImage src={lead.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                          {lead.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                            {lead.name}
                          </h3>
                          <Badge
                            className={cn(
                              "text-xs",
                              getPriorityColor(lead.priority),
                            )}
                          >
                            {lead.priority} priority
                          </Badge>
                          <Badge
                            className={cn(
                              "text-white",
                              getStageColor(lead.stage),
                            )}
                          >
                            {stages.find((s) => s.key === lead.stage)?.label}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <div className="flex items-center space-x-1">
                            <Mail className="h-4 w-4" />
                            <span>{lead.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="h-4 w-4" />
                            <span>{lead.phone}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span className="truncate">{lead.address}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              Follow up:{" "}
                              {new Date(lead.nextFollowUp).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm font-medium text-slate-900 dark:text-white">
                            {lead.projectType} - $
                            {lead.estimatedValue.toLocaleString()}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            {lead.notes}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-right">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {lead.probability}% likely
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          $
                          {(
                            (lead.estimatedValue * lead.probability) /
                            100
                          ).toLocaleString()}{" "}
                          weighted
                        </p>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedLead(lead);
                            setIsViewDialogOpen(true);
                          }}
                          className="hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedLead(lead);
                            setIsEditDialogOpen(true);
                          }}
                          className="hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* View Lead Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Lead Details</DialogTitle>
              <DialogDescription>
                Complete information for {selectedLead?.name}
              </DialogDescription>
            </DialogHeader>
            {selectedLead && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={selectedLead.avatar} />
                        <AvatarFallback>
                          {selectedLead.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold">
                          {selectedLead.name}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge
                            className={cn(
                              "text-xs",
                              getPriorityColor(selectedLead.priority),
                            )}
                          >
                            {selectedLead.priority} priority
                          </Badge>
                          <Badge
                            className={cn(
                              "text-white",
                              getStageColor(selectedLead.stage),
                            )}
                          >
                            {
                              stages.find((s) => s.key === selectedLead.stage)
                                ?.label
                            }
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span>{selectedLead.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span>{selectedLead.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{selectedLead.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">
                          ${selectedLead.estimatedValue.toLocaleString()}
                        </p>
                        <p className="text-sm text-blue-600">Estimated Value</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">
                          {selectedLead.probability}%
                        </p>
                        <p className="text-sm text-green-600">
                          Win Probability
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Project Details</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Project Type: </span>
                          {selectedLead.projectType}
                        </div>
                        <div>
                          <span className="font-medium">Source: </span>
                          {selectedLead.source}
                        </div>
                        <div>
                          <span className="font-medium">Assigned To: </span>
                          {selectedLead.assignedTo}
                        </div>
                        <div>
                          <span className="font-medium">Next Follow-up: </span>
                          {new Date(
                            selectedLead.nextFollowUp,
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedLead.notes && (
                  <div>
                    <h4 className="font-medium mb-2">Notes</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                      {selectedLead.notes}
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
                Edit Lead
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Pipeline;
