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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Search,
  Filter,
  Download,
  FileText,
  BarChart3,
  Settings,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Database,
  Zap,
  Eye,
} from "lucide-react";

interface ReportTemplate {
  id: string;
  name: string;
  category: "financial" | "operational" | "compliance" | "custom";
  description: string;
  fields: string[];
  frequency:
    | "daily"
    | "weekly"
    | "monthly"
    | "quarterly"
    | "annual"
    | "on-demand";
  format: "pdf" | "excel" | "csv" | "json";
  status: "active" | "draft" | "archived";
  lastUsed: string;
  usageCount: number;
}

const mockTemplates: ReportTemplate[] = [
  {
    id: "tpl_001",
    name: "Executive Summary Dashboard",
    category: "financial",
    description:
      "Comprehensive executive overview with key financial metrics and KPIs",
    fields: [
      "Revenue",
      "Profit Margin",
      "Active Projects",
      "Client Satisfaction",
    ],
    frequency: "monthly",
    format: "pdf",
    status: "active",
    lastUsed: "2024-01-22 09:00:00",
    usageCount: 45,
  },
  {
    id: "tpl_002",
    name: "Project Performance Analysis",
    category: "operational",
    description:
      "Detailed analysis of project timelines, resource utilization, and deliverables",
    fields: [
      "Project Status",
      "Timeline Adherence",
      "Resource Usage",
      "Budget Variance",
    ],
    frequency: "weekly",
    format: "excel",
    status: "active",
    lastUsed: "2024-01-21 14:30:00",
    usageCount: 32,
  },
  {
    id: "tpl_003",
    name: "Compliance Audit Report",
    category: "compliance",
    description: "Regulatory compliance tracking and audit trail documentation",
    fields: [
      "Safety Incidents",
      "Permit Status",
      "Inspection Results",
      "Violations",
    ],
    frequency: "quarterly",
    format: "pdf",
    status: "active",
    lastUsed: "2024-01-15 11:20:00",
    usageCount: 12,
  },
  {
    id: "tpl_004",
    name: "Custom ROI Analysis",
    category: "custom",
    description:
      "Customizable return on investment analysis for specific projects or clients",
    fields: [
      "Investment Amount",
      "Revenue Generated",
      "Cost Savings",
      "ROI Percentage",
    ],
    frequency: "on-demand",
    format: "excel",
    status: "draft",
    lastUsed: "2024-01-18 16:45:00",
    usageCount: 8,
  },
  {
    id: "tpl_005",
    name: "Employee Productivity Metrics",
    category: "operational",
    description: "Comprehensive employee performance and productivity analysis",
    fields: [
      "Hours Worked",
      "Tasks Completed",
      "Quality Score",
      "Efficiency Rating",
    ],
    frequency: "monthly",
    format: "csv",
    status: "active",
    lastUsed: "2024-01-20 08:15:00",
    usageCount: 28,
  },
];

interface DataSource {
  id: string;
  name: string;
  type: "database" | "api" | "file" | "integration";
  status: "connected" | "disconnected" | "error";
  lastSync: string;
  recordCount: number;
}

const mockDataSources: DataSource[] = [
  {
    id: "ds_001",
    name: "Main Database",
    type: "database",
    status: "connected",
    lastSync: "2024-01-22 15:30:00",
    recordCount: 15420,
  },
  {
    id: "ds_002",
    name: "QuickBooks Integration",
    type: "integration",
    status: "connected",
    lastSync: "2024-01-22 14:45:00",
    recordCount: 3280,
  },
  {
    id: "ds_003",
    name: "Time Tracking API",
    type: "api",
    status: "connected",
    lastSync: "2024-01-22 15:00:00",
    recordCount: 8950,
  },
  {
    id: "ds_004",
    name: "Project Files",
    type: "file",
    status: "error",
    lastSync: "2024-01-21 10:20:00",
    recordCount: 0,
  },
];

const AdvancedReporting = () => {
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "financial":
        return <Badge className="bg-green-100 text-green-800">Financial</Badge>;
      case "operational":
        return <Badge className="bg-blue-100 text-blue-800">Operational</Badge>;
      case "compliance":
        return (
          <Badge className="bg-purple-100 text-purple-800">Compliance</Badge>
        );
      case "custom":
        return <Badge className="bg-orange-100 text-orange-800">Custom</Badge>;
      default:
        return <Badge variant="secondary">{category}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>;
      case "archived":
        return <Badge className="bg-gray-100 text-gray-800">Archived</Badge>;
      case "connected":
        return <Badge className="bg-green-100 text-green-800">Connected</Badge>;
      case "disconnected":
        return (
          <Badge className="bg-gray-100 text-gray-800">Disconnected</Badge>
        );
      case "error":
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "database":
        return <Database className="w-4 h-4 text-blue-600" />;
      case "api":
        return <Zap className="w-4 h-4 text-green-600" />;
      case "file":
        return <FileText className="w-4 h-4 text-orange-600" />;
      case "integration":
        return <Settings className="w-4 h-4 text-purple-600" />;
      default:
        return <Database className="w-4 h-4 text-gray-600" />;
    }
  };

  const totalTemplates = mockTemplates.length;
  const activeTemplates = mockTemplates.filter(
    (t) => t.status === "active",
  ).length;
  const connectedSources = mockDataSources.filter(
    (ds) => ds.status === "connected",
  ).length;
  const totalRecords = mockDataSources.reduce(
    (sum, ds) => sum + ds.recordCount,
    0,
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Advanced Reporting
            </h1>
            <p className="text-slate-600 mt-2">
              Create custom reports, manage templates, and configure data
              sources
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              New Template
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Templates
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTemplates}</div>
              <p className="text-xs text-muted-foreground">Report templates</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Templates
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {activeTemplates}
              </div>
              <p className="text-xs text-muted-foreground">Ready to use</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Data Sources
              </CardTitle>
              <Database className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {connectedSources}
              </div>
              <p className="text-xs text-muted-foreground">Connected sources</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Records
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {totalRecords.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Available data</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="templates" className="space-y-4">
          <TabsList>
            <TabsTrigger value="templates">Report Templates</TabsTrigger>
            <TabsTrigger value="builder">Report Builder</TabsTrigger>
            <TabsTrigger value="sources">Data Sources</TabsTrigger>
            <TabsTrigger value="scheduler">Scheduler</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Report Templates</CardTitle>
                <CardDescription>
                  Manage and customize your report templates
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search templates..."
                      className="pl-10"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-48">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="operational">Operational</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Template Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTemplates.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{template.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {template.format.toUpperCase()} format
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getCategoryBadge(template.category)}
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs">
                            <p className="text-sm truncate">
                              {template.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {template.fields
                                .slice(0, 2)
                                .map((field, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {field}
                                  </Badge>
                                ))}
                              {template.fields.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{template.fields.length - 2} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {template.frequency.charAt(0).toUpperCase() +
                              template.frequency.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-center">
                            <p className="font-medium">{template.usageCount}</p>
                            <p className="text-xs text-muted-foreground">
                              times used
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(template.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="builder" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Report Builder</CardTitle>
                <CardDescription>
                  Create custom reports with drag-and-drop interface
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Visual Report Builder
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Drag and drop interface for creating custom reports
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Start Building
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Data Sources</CardTitle>
                <CardDescription>
                  Manage connections to your data sources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockDataSources.map((source) => (
                    <div
                      key={source.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        {getTypeIcon(source.type)}
                        <div>
                          <p className="font-medium">{source.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {source.recordCount.toLocaleString()} records
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            Last sync:{" "}
                            {new Date(source.lastSync).toLocaleString()}
                          </p>
                        </div>
                        {getStatusBadge(source.status)}
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduler" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Report Scheduler</CardTitle>
                <CardDescription>
                  Schedule automated report generation and delivery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Automated Scheduling
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Set up automated report generation and email delivery
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdvancedReporting;
