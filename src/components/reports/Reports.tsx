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
  PieChart,
  TrendingUp,
  Calendar,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
} from "lucide-react";

interface Report {
  id: string;
  name: string;
  type: "financial" | "project" | "employee" | "client" | "inventory";
  description: string;
  lastGenerated: string;
  status: "ready" | "generating" | "scheduled";
  frequency: "daily" | "weekly" | "monthly" | "quarterly" | "annual";
  format: "pdf" | "excel" | "csv";
  recipients: string[];
}

const mockReports: Report[] = [
  {
    id: "rpt_001",
    name: "Monthly Financial Summary",
    type: "financial",
    description:
      "Comprehensive financial overview including revenue, expenses, and profit margins",
    lastGenerated: "2024-01-22 09:00:00",
    status: "ready",
    frequency: "monthly",
    format: "pdf",
    recipients: ["finance@company.com", "ceo@company.com"],
  },
  {
    id: "rpt_002",
    name: "Project Progress Report",
    type: "project",
    description: "Status updates on all active construction projects",
    lastGenerated: "2024-01-22 08:30:00",
    status: "ready",
    frequency: "weekly",
    format: "excel",
    recipients: ["pm@company.com", "operations@company.com"],
  },
  {
    id: "rpt_003",
    name: "Employee Performance Analytics",
    type: "employee",
    description:
      "Detailed analysis of employee productivity and performance metrics",
    lastGenerated: "2024-01-21 16:45:00",
    status: "generating",
    frequency: "monthly",
    format: "pdf",
    recipients: ["hr@company.com", "managers@company.com"],
  },
  {
    id: "rpt_004",
    name: "Client Satisfaction Survey",
    type: "client",
    description: "Analysis of client feedback and satisfaction ratings",
    lastGenerated: "2024-01-20 14:20:00",
    status: "scheduled",
    frequency: "quarterly",
    format: "excel",
    recipients: ["sales@company.com", "support@company.com"],
  },
  {
    id: "rpt_005",
    name: "Inventory Status Report",
    type: "inventory",
    description:
      "Current inventory levels, usage patterns, and reorder recommendations",
    lastGenerated: "2024-01-22 07:15:00",
    status: "ready",
    frequency: "weekly",
    format: "csv",
    recipients: ["inventory@company.com", "procurement@company.com"],
  },
];

const Reports = () => {
  const getTypeBadge = (type: string) => {
    switch (type) {
      case "financial":
        return <Badge className="bg-green-100 text-green-800">Financial</Badge>;
      case "project":
        return <Badge className="bg-blue-100 text-blue-800">Project</Badge>;
      case "employee":
        return (
          <Badge className="bg-purple-100 text-purple-800">Employee</Badge>
        );
      case "client":
        return <Badge className="bg-orange-100 text-orange-800">Client</Badge>;
      case "inventory":
        return <Badge className="bg-cyan-100 text-cyan-800">Inventory</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return <Badge className="bg-green-100 text-green-800">Ready</Badge>;
      case "generating":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Generating</Badge>
        );
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "financial":
        return <DollarSign className="w-4 h-4 text-green-600" />;
      case "project":
        return <BarChart3 className="w-4 h-4 text-blue-600" />;
      case "employee":
        return <Users className="w-4 h-4 text-purple-600" />;
      case "client":
        return <TrendingUp className="w-4 h-4 text-orange-600" />;
      case "inventory":
        return <PieChart className="w-4 h-4 text-cyan-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const totalReports = mockReports.length;
  const readyReports = mockReports.filter(
    (report) => report.status === "ready",
  ).length;
  const generatingReports = mockReports.filter(
    (report) => report.status === "generating",
  ).length;
  const scheduledReports = mockReports.filter(
    (report) => report.status === "scheduled",
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Reports</h1>
            <p className="text-slate-600 mt-2">
              Generate and manage business reports and analytics
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Report
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Reports
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalReports}</div>
              <p className="text-xs text-muted-foreground">All reports</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ready</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {readyReports}
              </div>
              <p className="text-xs text-muted-foreground">
                Available for download
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Generating</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {generatingReports}
              </div>
              <p className="text-xs text-muted-foreground">In progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {scheduledReports}
              </div>
              <p className="text-xs text-muted-foreground">Upcoming</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Reports</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="project">Project</TabsTrigger>
            <TabsTrigger value="employee">Employee</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Reports</CardTitle>
                <CardDescription>
                  Complete list of all generated and scheduled reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search reports..." className="pl-10" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-48">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="project">Project</SelectItem>
                      <SelectItem value="employee">Employee</SelectItem>
                      <SelectItem value="client">Client</SelectItem>
                      <SelectItem value="inventory">Inventory</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="ready">Ready</SelectItem>
                      <SelectItem value="generating">Generating</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Last Generated</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(report.type)}
                            <div>
                              <p className="font-medium">{report.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {report.format.toUpperCase()} format
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getTypeBadge(report.type)}</TableCell>
                        <TableCell>
                          <div className="max-w-xs">
                            <p className="text-sm truncate">
                              {report.description}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-sm">
                              {new Date(
                                report.lastGenerated,
                              ).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(
                                report.lastGenerated,
                              ).toLocaleTimeString()}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {report.frequency.charAt(0).toUpperCase() +
                              report.frequency.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(report.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4" />
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

          <TabsContent value="financial" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Financial Reports</CardTitle>
                <CardDescription>
                  Revenue, expenses, profit analysis, and financial summaries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Financial reporting features coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="project" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Reports</CardTitle>
                <CardDescription>
                  Project progress, timeline analysis, and resource utilization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Project reporting features coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employee" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Employee Reports</CardTitle>
                <CardDescription>
                  Performance metrics, attendance, and productivity analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Employee reporting features coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Report Templates</CardTitle>
                <CardDescription>
                  Create and manage custom report templates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Report template management coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;
