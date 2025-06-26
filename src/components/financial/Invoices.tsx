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
  Calendar,
  DollarSign,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Building,
  User,
  Mail,
  CreditCard,
} from "lucide-react";

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  projectName: string;
  amount: number;
  tax: number;
  total: number;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  paymentMethod?: string;
  items: InvoiceItem[];
  notes?: string;
}

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  category: string;
}

const Invoices = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const invoices: Invoice[] = [
    {
      id: "inv_001",
      invoiceNumber: "INV-2024-001",
      clientId: "client_001",
      clientName: "Johnson Family",
      projectName: "Kitchen Renovation",
      amount: 18000,
      tax: 1440,
      total: 19440,
      status: "paid",
      issueDate: "2024-01-15",
      dueDate: "2024-02-15",
      paidDate: "2024-02-10",
      paymentMethod: "Bank Transfer",
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
      notes: "Payment received on time. Excellent client communication.",
    },
    {
      id: "inv_002",
      invoiceNumber: "INV-2024-002",
      clientId: "client_002",
      clientName: "ABC Corporation",
      projectName: "Office Building Renovation",
      amount: 45000,
      tax: 3600,
      total: 48600,
      status: "sent",
      issueDate: "2024-01-20",
      dueDate: "2024-02-20",
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
      notes: "Commercial project with Net 30 payment terms.",
    },
    {
      id: "inv_003",
      invoiceNumber: "INV-2024-003",
      clientId: "client_003",
      clientName: "Smith Residence",
      projectName: "Bathroom Remodel",
      amount: 12000,
      tax: 960,
      total: 12960,
      status: "overdue",
      issueDate: "2024-01-10",
      dueDate: "2024-02-10",
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
      notes: "Follow up required for overdue payment.",
    },
    {
      id: "inv_004",
      invoiceNumber: "INV-2024-004",
      clientId: "client_004",
      clientName: "Green Valley HOA",
      projectName: "Community Center Repairs",
      amount: 8500,
      tax: 680,
      total: 9180,
      status: "draft",
      issueDate: "2024-01-25",
      dueDate: "2024-02-25",
      items: [
        {
          id: "item_010",
          description: "Roof Repairs",
          quantity: 1,
          rate: 5000,
          amount: 5000,
          category: "Labor",
        },
        {
          id: "item_011",
          description: "HVAC Maintenance",
          quantity: 1,
          rate: 3500,
          amount: 3500,
          category: "Subcontractor",
        },
      ],
    },
  ];

  const invoiceStats = {
    totalInvoices: invoices.length,
    totalValue: invoices.reduce((sum, inv) => sum + inv.total, 0),
    paidInvoices: invoices.filter((inv) => inv.status === "paid").length,
    overdueInvoices: invoices.filter((inv) => inv.status === "overdue").length,
    pendingInvoices: invoices.filter((inv) => inv.status === "sent").length,
    totalPaid: invoices
      .filter((inv) => inv.status === "paid")
      .reduce((sum, inv) => sum + inv.total, 0),
    totalOutstanding: invoices
      .filter((inv) => inv.status === "sent" || inv.status === "overdue")
      .reduce((sum, inv) => sum + inv.total, 0),
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="mr-1 h-3 w-3" />
            Paid
          </Badge>
        );
      case "sent":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Send className="mr-1 h-3 w-3" />
            Sent
          </Badge>
        );
      case "overdue":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <AlertCircle className="mr-1 h-3 w-3" />
            Overdue
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            <AlertCircle className="mr-1 h-3 w-3" />
            Cancelled
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

  const getDaysOverdue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = today.getTime() - due.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Invoices
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Manage client invoices and track payments
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Invoice
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {invoiceStats.totalInvoices}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total Invoices
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
                    ${invoiceStats.totalPaid.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Paid</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-orange-600">
                    ${invoiceStats.totalOutstanding.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Outstanding</p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-red-600">
                    {invoiceStats.overdueInvoices}
                  </p>
                  <p className="text-sm text-muted-foreground">Overdue</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-500" />
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="invoices">All Invoices</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Invoices</CardTitle>
                <CardDescription>Latest invoice activity</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.slice(0, 5).map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>
                          <p className="font-medium">{invoice.invoiceNumber}</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Building className="h-4 w-4" />
                            <span>{invoice.clientName}</span>
                          </div>
                        </TableCell>
                        <TableCell>{invoice.projectName}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              ${invoice.total.toLocaleString()}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              +${invoice.tax.toLocaleString()} tax
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(invoice.dueDate).toLocaleDateString()}
                            </span>
                            {invoice.status === "overdue" && (
                              <Badge variant="destructive" className="text-xs">
                                {getDaysOverdue(invoice.dueDate)} days
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedInvoice(invoice);
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

          <TabsContent value="invoices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Invoices</CardTitle>
                <CardDescription>
                  Manage and track all client invoices
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search invoices..."
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
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Invoices Table */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Issue Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>
                          <p className="font-medium">{invoice.invoiceNumber}</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>{invoice.clientName}</span>
                          </div>
                        </TableCell>
                        <TableCell>{invoice.projectName}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              ${invoice.total.toLocaleString()}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              ${invoice.amount.toLocaleString()} + $
                              {invoice.tax.toLocaleString()} tax
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                        <TableCell>
                          {new Date(invoice.issueDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(invoice.dueDate).toLocaleDateString()}
                            </span>
                            {invoice.status === "overdue" && (
                              <Badge variant="destructive" className="text-xs">
                                {getDaysOverdue(invoice.dueDate)} days overdue
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedInvoice(invoice);
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

          <TabsContent value="overdue" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span>Overdue Invoices</span>
                </CardTitle>
                <CardDescription>
                  Invoices that require immediate attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Days Overdue</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices
                      .filter((invoice) => invoice.status === "overdue")
                      .map((invoice) => (
                        <TableRow key={invoice.id} className="bg-red-50">
                          <TableCell>
                            <p className="font-medium">
                              {invoice.invoiceNumber}
                            </p>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4" />
                              <span>{invoice.clientName}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="font-medium text-red-600">
                              ${invoice.total.toLocaleString()}
                            </p>
                          </TableCell>
                          <TableCell>
                            {new Date(invoice.dueDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge variant="destructive">
                              {getDaysOverdue(invoice.dueDate)} days
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                <Mail className="mr-2 h-4 w-4" />
                                Send Reminder
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
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
                  <CardTitle>Payment Performance</CardTitle>
                  <CardDescription>
                    Track payment patterns and collection rates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Collection Rate</span>
                      <span className="font-bold text-green-600">
                        {invoices.length > 0
                          ? (
                              (invoiceStats.paidInvoices / invoices.length) *
                              100
                            ).toFixed(1)
                          : "0"}
                        %
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Invoice Value</span>
                      <span className="font-bold">
                        $
                        {invoices.length > 0
                          ? (
                              invoiceStats.totalValue / invoices.length
                            ).toLocaleString()
                          : "0"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Outstanding Amount</span>
                      <span className="font-bold text-orange-600">
                        ${invoiceStats.totalOutstanding.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Status Distribution</CardTitle>
                  <CardDescription>
                    Breakdown of invoices by status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["draft", "sent", "paid", "overdue", "cancelled"].map(
                      (status) => {
                        const count = invoices.filter(
                          (inv) => inv.status === status,
                        ).length;
                        const percentage =
                          invoices.length > 0
                            ? (count / invoices.length) * 100
                            : 0;
                        return (
                          <div
                            key={status}
                            className="flex items-center space-x-3"
                          >
                            {getStatusBadge(status)}
                            <div className="flex-1">
                              <div className="flex justify-between text-sm">
                                <span>{count} invoices</span>
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

        {/* View Invoice Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Invoice Details</DialogTitle>
              <DialogDescription>
                Complete information for invoice{" "}
                {selectedInvoice?.invoiceNumber}
              </DialogDescription>
            </DialogHeader>
            {selectedInvoice && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Invoice Information</h4>
                    <div className="space-y-2 text-sm">
                      <div>Number: {selectedInvoice.invoiceNumber}</div>
                      <div>Client: {selectedInvoice.clientName}</div>
                      <div>Project: {selectedInvoice.projectName}</div>
                      <div>
                        Status: {getStatusBadge(selectedInvoice.status)}
                      </div>
                      <div>
                        Issue Date:{" "}
                        {new Date(
                          selectedInvoice.issueDate,
                        ).toLocaleDateString()}
                      </div>
                      <div>
                        Due Date:{" "}
                        {new Date(selectedInvoice.dueDate).toLocaleDateString()}
                      </div>
                      {selectedInvoice.paidDate && (
                        <div>
                          Paid Date:{" "}
                          {new Date(
                            selectedInvoice.paidDate,
                          ).toLocaleDateString()}
                        </div>
                      )}
                      {selectedInvoice.paymentMethod && (
                        <div>
                          Payment Method: {selectedInvoice.paymentMethod}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Financial Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${selectedInvoice.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax:</span>
                        <span>${selectedInvoice.tax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>${selectedInvoice.total.toLocaleString()}</span>
                      </div>
                      {selectedInvoice.status === "overdue" && (
                        <div className="flex justify-between text-red-600">
                          <span>Days Overdue:</span>
                          <span>
                            {getDaysOverdue(selectedInvoice.dueDate)} days
                          </span>
                        </div>
                      )}
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
                      {selectedInvoice.items.map((item) => (
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

                {selectedInvoice.notes && (
                  <div>
                    <h4 className="font-medium mb-2">Notes</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedInvoice.notes}
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
              <Button>Edit Invoice</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Invoices;
