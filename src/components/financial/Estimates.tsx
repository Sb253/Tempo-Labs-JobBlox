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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  Download,
  Send,
  Calculator,
  Calendar,
  DollarSign,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Building,
  User,
} from "lucide-react";

interface Estimate {
  id: string;
  estimateNumber: string;
  clientId: string;
  clientName: string;
  projectName: string;
  amount: number;
  tax: number;
  total: number;
  status: "draft" | "sent" | "accepted" | "rejected" | "expired";
  createdDate: string;
  expiryDate: string;
  acceptedDate?: string;
  items: EstimateItem[];
  notes?: string;
}

interface EstimateItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  category: string;
}

const Estimates = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEstimate, setSelectedEstimate] = useState<Estimate | null>(
    null,
  );
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const estimates: Estimate[] = [
    {
      id: "est_001",
      estimateNumber: "EST-2024-001",
      clientId: "client_001",
      clientName: "Johnson Family",
      projectName: "Kitchen Renovation",
      amount: 18000,
      tax: 1440,
      total: 19440,
      status: "accepted",
      createdDate: "2024-01-15",
      expiryDate: "2024-02-15",
      acceptedDate: "2024-01-20",
      items: [
        {
          id: "item_001",
          description: "Kitchen Cabinets Installation",
          quantity: 1,
          rate: 8000,
          amount: 8000,
          category: "Labor",
        },
        {
          id: "item_002",
          description: "Premium Countertops",
          quantity: 1,
          rate: 5000,
          amount: 5000,
          category: "Materials",
        },
        {
          id: "item_003",
          description: "Appliance Installation",
          quantity: 1,
          rate: 3000,
          amount: 3000,
          category: "Labor",
        },
        {
          id: "item_004",
          description: "Electrical Work",
          quantity: 1,
          rate: 2000,
          amount: 2000,
          category: "Subcontractor",
        },
      ],
      notes: "Includes all materials and labor for complete kitchen renovation",
    },
    {
      id: "est_002",
      estimateNumber: "EST-2024-002",
      clientId: "client_002",
      clientName: "ABC Corporation",
      projectName: "Office Building Renovation",
      amount: 45000,
      tax: 3600,
      total: 48600,
      status: "sent",
      createdDate: "2024-01-20",
      expiryDate: "2024-02-20",
      items: [
        {
          id: "item_005",
          description: "Flooring Installation",
          quantity: 2000,
          rate: 15,
          amount: 30000,
          category: "Materials",
        },
        {
          id: "item_006",
          description: "Painting and Finishing",
          quantity: 1,
          rate: 15000,
          amount: 15000,
          category: "Labor",
        },
      ],
      notes: "Commercial grade materials and finishes",
    },
    {
      id: "est_003",
      estimateNumber: "EST-2024-003",
      clientId: "client_003",
      clientName: "Smith Residence",
      projectName: "Bathroom Remodel",
      amount: 12000,
      tax: 960,
      total: 12960,
      status: "draft",
      createdDate: "2024-01-25",
      expiryDate: "2024-02-25",
      items: [
        {
          id: "item_007",
          description: "Bathroom Fixtures",
          quantity: 1,
          rate: 6000,
          amount: 6000,
          category: "Materials",
        },
        {
          id: "item_008",
          description: "Plumbing Work",
          quantity: 1,
          rate: 4000,
          amount: 4000,
          category: "Subcontractor",
        },
        {
          id: "item_009",
          description: "Tile Installation",
          quantity: 1,
          rate: 2000,
          amount: 2000,
          category: "Labor",
        },
      ],
    },
  ];

  const estimateStats = {
    totalEstimates: estimates.length,
    totalValue: estimates.reduce((sum, est) => sum + est.total, 0),
    acceptedEstimates: estimates.filter((est) => est.status === "accepted")
      .length,
    pendingEstimates: estimates.filter((est) => est.status === "sent").length,
    acceptanceRate:
      estimates.length > 0
        ? (estimates.filter((est) => est.status === "accepted").length /
            estimates.length) *
          100
        : 0,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="mr-1 h-3 w-3" />
            Accepted
          </Badge>
        );
      case "sent":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Send className="mr-1 h-3 w-3" />
            Sent
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <AlertCircle className="mr-1 h-3 w-3" />
            Rejected
          </Badge>
        );
      case "expired":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            <Clock className="mr-1 h-3 w-3" />
            Expired
          </Badge>
        );
      case "draft":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <FileText className="mr-1 h-3 w-3" />
            Draft
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredEstimates = estimates.filter((estimate) => {
    const matchesSearch =
      estimate.estimateNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      estimate.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estimate.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || estimate.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Estimates
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Create and manage project estimates and quotes
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Estimate
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {estimateStats.totalEstimates}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total Estimates
                  </p>
                </div>
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    ${estimateStats.totalValue.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {estimateStats.acceptedEstimates}
                  </p>
                  <p className="text-sm text-muted-foreground">Accepted</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-600">
                    {estimateStats.pendingEstimates}
                  </p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-purple-600">
                    {estimateStats.acceptanceRate.toFixed(1)}%
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Acceptance Rate
                  </p>
                </div>
                <Calculator className="h-8 w-8 text-purple-500" />
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="estimates">All Estimates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Estimates</CardTitle>
                <CardDescription>Latest estimate activity</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Estimate #</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {estimates.slice(0, 5).map((estimate) => (
                      <TableRow key={estimate.id}>
                        <TableCell>
                          <p className="font-medium">
                            {estimate.estimateNumber}
                          </p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Building className="h-4 w-4" />
                            <span>{estimate.clientName}</span>
                          </div>
                        </TableCell>
                        <TableCell>{estimate.projectName}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              ${estimate.total.toLocaleString()}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              +${estimate.tax.toLocaleString()} tax
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(estimate.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(
                                estimate.createdDate,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedEstimate(estimate);
                                setIsViewDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
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

          <TabsContent value="estimates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Estimates</CardTitle>
                <CardDescription>
                  Manage and track all project estimates
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search estimates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="sent">Sent</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Estimates Table */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Estimate #</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Expires</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEstimates.map((estimate) => (
                      <TableRow key={estimate.id}>
                        <TableCell>
                          <p className="font-medium">
                            {estimate.estimateNumber}
                          </p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>{estimate.clientName}</span>
                          </div>
                        </TableCell>
                        <TableCell>{estimate.projectName}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              ${estimate.total.toLocaleString()}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              ${estimate.amount.toLocaleString()} + $
                              {estimate.tax.toLocaleString()} tax
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(estimate.status)}</TableCell>
                        <TableCell>
                          {new Date(estimate.createdDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(
                                estimate.expiryDate,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedEstimate(estimate);
                                setIsViewDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Send className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
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

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Estimate Performance</CardTitle>
                  <CardDescription>
                    Track estimate acceptance and conversion rates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Acceptance Rate</span>
                      <span className="font-bold text-green-600">
                        {estimateStats.acceptanceRate.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Estimate Value</span>
                      <span className="font-bold">
                        $
                        {estimates.length > 0
                          ? (
                              estimateStats.totalValue / estimates.length
                            ).toLocaleString()
                          : "0"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Total Potential Revenue</span>
                      <span className="font-bold text-blue-600">
                        ${estimateStats.totalValue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Status Distribution</CardTitle>
                  <CardDescription>
                    Breakdown of estimates by status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["draft", "sent", "accepted", "rejected", "expired"].map(
                      (status) => {
                        const count = estimates.filter(
                          (est) => est.status === status,
                        ).length;
                        const percentage =
                          estimates.length > 0
                            ? (count / estimates.length) * 100
                            : 0;
                        return (
                          <div
                            key={status}
                            className="flex items-center space-x-3"
                          >
                            {getStatusBadge(status)}
                            <div className="flex-1">
                              <div className="flex justify-between text-sm">
                                <span>{count} estimates</span>
                                <span>{percentage.toFixed(1)}%</span>
                              </div>
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* View Estimate Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Estimate Details</DialogTitle>
              <DialogDescription>
                Complete information for estimate{" "}
                {selectedEstimate?.estimateNumber}
              </DialogDescription>
            </DialogHeader>
            {selectedEstimate && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Estimate Information</h4>
                    <div className="space-y-2 text-sm">
                      <div>Number: {selectedEstimate.estimateNumber}</div>
                      <div>Client: {selectedEstimate.clientName}</div>
                      <div>Project: {selectedEstimate.projectName}</div>
                      <div>
                        Status: {getStatusBadge(selectedEstimate.status)}
                      </div>
                      <div>
                        Created:{" "}
                        {new Date(
                          selectedEstimate.createdDate,
                        ).toLocaleDateString()}
                      </div>
                      <div>
                        Expires:{" "}
                        {new Date(
                          selectedEstimate.expiryDate,
                        ).toLocaleDateString()}
                      </div>
                      {selectedEstimate.acceptedDate && (
                        <div>
                          Accepted:{" "}
                          {new Date(
                            selectedEstimate.acceptedDate,
                          ).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Financial Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${selectedEstimate.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax:</span>
                        <span>${selectedEstimate.tax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>${selectedEstimate.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Line Items</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Rate</TableHead>
                        <TableHead>Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedEstimate.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.description}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{item.category}</Badge>
                          </TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>${item.rate.toLocaleString()}</TableCell>
                          <TableCell>${item.amount.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {selectedEstimate.notes && (
                  <div>
                    <h4 className="font-medium mb-2">Notes</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedEstimate.notes}
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
              <Button>Edit Estimate</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Estimates;
