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
import { Textarea } from "@/components/ui/textarea";
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  Download,
  Upload,
  Camera,
  Calendar,
  DollarSign,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Receipt,
  Building,
  User,
  CreditCard,
  Trash2,
} from "lucide-react";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  subcategory: string;
  date: string;
  vendor: string;
  paymentMethod: string;
  status: "draft" | "pending_approval" | "approved" | "rejected";
  approver?: string;
  notes?: string;
  tags: string[];
  projectId?: string;
  projectName?: string;
  receipt?: ReceiptData;
  taxAmount: number;
  taxRate: number;
  isRecurring: boolean;
  recurringFrequency?: "weekly" | "monthly" | "quarterly" | "yearly";
}

interface ReceiptData {
  id: string;
  filename: string;
  url: string;
  uploadDate: string;
  extractedData?: {
    vendor: string;
    amount: number;
    date: string;
    items: string[];
    taxAmount?: number;
  };
}

const Expenses = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isExpenseSheetOpen, setIsExpenseSheetOpen] = useState(false);

  const expenses: Expense[] = [
    {
      id: "exp_001",
      description: "Office Supplies - Stationery and Equipment",
      amount: 450.75,
      category: "Office Expenses",
      subcategory: "Supplies",
      date: "2024-01-30",
      vendor: "Office Depot",
      paymentMethod: "Company Credit Card",
      status: "approved",
      approver: "John Manager",
      notes: "Monthly office supply restock",
      tags: ["office", "supplies", "monthly"],
      taxAmount: 36.06,
      taxRate: 0.08,
      isRecurring: true,
      recurringFrequency: "monthly",
      receipt: {
        id: "receipt_001",
        filename: "office_supplies_jan_2024.pdf",
        url: "/receipts/office_supplies_jan_2024.pdf",
        uploadDate: "2024-01-30",
        extractedData: {
          vendor: "Office Depot",
          amount: 450.75,
          date: "2024-01-30",
          items: ["Paper", "Pens", "Folders", "Printer Ink"],
          taxAmount: 36.06,
        },
      },
    },
    {
      id: "exp_002",
      description: "Fuel for Company Vehicles",
      amount: 280.5,
      category: "Transportation",
      subcategory: "Fuel",
      date: "2024-01-29",
      vendor: "Shell Gas Station",
      paymentMethod: "Fleet Card",
      status: "pending_approval",
      notes: "Weekly fuel expenses for project sites",
      tags: ["fuel", "transportation", "vehicles"],
      taxAmount: 22.44,
      taxRate: 0.08,
      isRecurring: false,
      projectId: "proj_001",
      projectName: "Office Building Construction",
    },
    {
      id: "exp_003",
      description: "Software Subscription - Project Management",
      amount: 199.99,
      category: "Software & Technology",
      subcategory: "Subscriptions",
      date: "2024-01-28",
      vendor: "ProjectPro Software",
      paymentMethod: "Auto-pay Credit Card",
      status: "approved",
      approver: "Sarah Admin",
      notes: "Monthly subscription for project management software",
      tags: ["software", "subscription", "project-management"],
      taxAmount: 16.0,
      taxRate: 0.08,
      isRecurring: true,
      recurringFrequency: "monthly",
    },
    {
      id: "exp_004",
      description: "Client Lunch Meeting",
      amount: 125.0,
      category: "Meals & Entertainment",
      subcategory: "Client Meals",
      date: "2024-01-27",
      vendor: "The Steakhouse",
      paymentMethod: "Personal Card (Reimbursement)",
      status: "draft",
      notes: "Lunch meeting with ABC Corporation executives",
      tags: ["meals", "client", "business-development"],
      taxAmount: 10.0,
      taxRate: 0.08,
      isRecurring: false,
      projectId: "proj_002",
      projectName: "ABC Corporation Project",
    },
    {
      id: "exp_005",
      description: "Equipment Rental - Excavator",
      amount: 850.0,
      category: "Equipment",
      subcategory: "Rental",
      date: "2024-01-26",
      vendor: "Heavy Equipment Rentals Inc",
      paymentMethod: "Check",
      status: "approved",
      approver: "Mike Supervisor",
      notes: "3-day excavator rental for foundation work",
      tags: ["equipment", "rental", "construction"],
      taxAmount: 68.0,
      taxRate: 0.08,
      isRecurring: false,
      projectId: "proj_001",
      projectName: "Office Building Construction",
    },
    {
      id: "exp_006",
      description: "Marketing Materials - Brochures",
      amount: 320.0,
      category: "Marketing",
      subcategory: "Print Materials",
      date: "2024-01-25",
      vendor: "PrintShop Pro",
      paymentMethod: "Company Credit Card",
      status: "rejected",
      approver: "Lisa Marketing",
      notes: "Rejected - Need approval for marketing budget increase",
      tags: ["marketing", "brochures", "print"],
      taxAmount: 25.6,
      taxRate: 0.08,
      isRecurring: false,
    },
  ];

  const expenseStats = {
    totalExpenses: expenses.length,
    totalAmount: expenses.reduce((sum, exp) => sum + exp.amount, 0),
    approvedExpenses: expenses.filter((exp) => exp.status === "approved")
      .length,
    pendingExpenses: expenses.filter((exp) => exp.status === "pending_approval")
      .length,
    rejectedExpenses: expenses.filter((exp) => exp.status === "rejected")
      .length,
    totalApproved: expenses
      .filter((exp) => exp.status === "approved")
      .reduce((sum, exp) => sum + exp.amount, 0),
    totalPending: expenses
      .filter((exp) => exp.status === "pending_approval")
      .reduce((sum, exp) => sum + exp.amount, 0),
  };

  const categories = [
    "Office Expenses",
    "Transportation",
    "Software & Technology",
    "Meals & Entertainment",
    "Equipment",
    "Marketing",
    "Materials",
    "Subcontractors",
    "Utilities",
    "Insurance",
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="mr-1 h-3 w-3" />
            Approved
          </Badge>
        );
      case "pending_approval":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <AlertCircle className="mr-1 h-3 w-3" />
            Rejected
          </Badge>
        );
      case "draft":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            <FileText className="mr-1 h-3 w-3" />
            Draft
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || expense.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || expense.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Expenses
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Track and manage business expenses with receipt capture
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline">
              <Camera className="mr-2 h-4 w-4" />
              Scan Receipt
            </Button>
            <Sheet
              open={isExpenseSheetOpen}
              onOpenChange={setIsExpenseSheetOpen}
            >
              <SheetTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Expense
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[600px] sm:w-[800px]">
                <SheetHeader>
                  <SheetTitle>Add New Expense</SheetTitle>
                  <SheetDescription>
                    Create a new expense entry with receipt capture and
                    categorization
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-6 py-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Input placeholder="Enter expense description" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Amount</label>
                      <Input type="number" placeholder="0.00" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Vendor</label>
                      <Input placeholder="Vendor name" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Payment Method
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="credit_card">
                            Credit Card
                          </SelectItem>
                          <SelectItem value="debit_card">Debit Card</SelectItem>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="check">Check</SelectItem>
                          <SelectItem value="bank_transfer">
                            Bank Transfer
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date</label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Receipt Upload
                    </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">
                        Drop receipt here or click to upload
                      </p>
                      <Button variant="outline" className="mt-2">
                        <Camera className="mr-2 h-4 w-4" />
                        Take Photo
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Notes</label>
                    <Textarea placeholder="Additional notes or comments" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="recurring" />
                    <label htmlFor="recurring" className="text-sm font-medium">
                      This is a recurring expense
                    </label>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsExpenseSheetOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button>Save Expense</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {expenseStats.totalExpenses}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total Expenses
                  </p>
                </div>
                <Receipt className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-red-600">
                    ${expenseStats.totalAmount.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                </div>
                <DollarSign className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    ${expenseStats.totalApproved.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Approved</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-yellow-600">
                    ${expenseStats.totalPending.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-red-600">
                    {expenseStats.rejectedExpenses}
                  </p>
                  <p className="text-sm text-muted-foreground">Rejected</p>
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
            <TabsTrigger value="expenses">All Expenses</TabsTrigger>
            <TabsTrigger value="pending">Pending Approval</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Expenses</CardTitle>
                <CardDescription>Latest expense submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Receipt</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenses.slice(0, 5).map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(expense.date).toLocaleDateString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{expense.description}</p>
                            {expense.projectName && (
                              <p className="text-sm text-muted-foreground">
                                Project: {expense.projectName}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{expense.category}</Badge>
                        </TableCell>
                        <TableCell>{expense.vendor}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              ${expense.amount.toFixed(2)}
                            </p>
                            {expense.taxAmount > 0 && (
                              <p className="text-xs text-muted-foreground">
                                +${expense.taxAmount.toFixed(2)} tax
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(expense.status)}</TableCell>
                        <TableCell>
                          {expense.receipt ? (
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button variant="ghost" size="sm" disabled>
                              <Upload className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedExpense(expense);
                                setIsViewDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
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

          <TabsContent value="expenses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Expenses</CardTitle>
                <CardDescription>
                  Manage and track all business expenses
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search expenses..."
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
                      <SelectItem value="pending_approval">
                        Pending Approval
                      </SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={categoryFilter}
                    onValueChange={setCategoryFilter}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Expenses Table */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Receipt</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredExpenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell>
                          {new Date(expense.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{expense.description}</p>
                            {expense.projectName && (
                              <p className="text-sm text-muted-foreground">
                                Project: {expense.projectName}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{expense.category}</Badge>
                        </TableCell>
                        <TableCell>{expense.vendor}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              ${expense.amount.toFixed(2)}
                            </p>
                            {expense.taxAmount > 0 && (
                              <p className="text-xs text-muted-foreground">
                                +${expense.taxAmount.toFixed(2)} tax
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(expense.status)}</TableCell>
                        <TableCell>
                          {expense.receipt ? (
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button variant="ghost" size="sm" disabled>
                              <Upload className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedExpense(expense);
                                setIsViewDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            {expense.status === "pending_approval" && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-green-600"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600"
                                >
                                  <AlertCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <span>Pending Approval</span>
                </CardTitle>
                <CardDescription>
                  Expenses awaiting approval from managers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Receipt</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenses
                      .filter(
                        (expense) => expense.status === "pending_approval",
                      )
                      .map((expense) => (
                        <TableRow key={expense.id} className="bg-yellow-50">
                          <TableCell>
                            {new Date(expense.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">
                                {expense.description}
                              </p>
                              {expense.projectName && (
                                <p className="text-sm text-muted-foreground">
                                  Project: {expense.projectName}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{expense.category}</Badge>
                          </TableCell>
                          <TableCell>{expense.vendor}</TableCell>
                          <TableCell>
                            <p className="font-medium text-yellow-600">
                              ${expense.amount.toFixed(2)}
                            </p>
                          </TableCell>
                          <TableCell>
                            {expense.receipt ? (
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button variant="ghost" size="sm" disabled>
                                <Upload className="h-4 w-4" />
                              </Button>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-green-600 border-green-600"
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 border-red-600"
                              >
                                <AlertCircle className="mr-2 h-4 w-4" />
                                Reject
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
                  <CardTitle>Expense Trends</CardTitle>
                  <CardDescription>
                    Track spending patterns and approval rates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Approval Rate</span>
                      <span className="font-bold text-green-600">
                        {expenses.length > 0
                          ? (
                              (expenseStats.approvedExpenses /
                                expenses.length) *
                              100
                            ).toFixed(1)
                          : "0"}
                        %
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Expense Amount</span>
                      <span className="font-bold">
                        $
                        {expenses.length > 0
                          ? (
                              expenseStats.totalAmount / expenses.length
                            ).toFixed(2)
                          : "0"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Total Tax Amount</span>
                      <span className="font-bold text-orange-600">
                        $
                        {expenses
                          .reduce((sum, exp) => sum + exp.taxAmount, 0)
                          .toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Category Breakdown</CardTitle>
                  <CardDescription>Expenses by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categories.map((category) => {
                      const categoryExpenses = expenses.filter(
                        (exp) => exp.category === category,
                      );
                      const categoryTotal = categoryExpenses.reduce(
                        (sum, exp) => sum + exp.amount,
                        0,
                      );
                      const percentage =
                        expenseStats.totalAmount > 0
                          ? (categoryTotal / expenseStats.totalAmount) * 100
                          : 0;

                      if (categoryExpenses.length === 0) return null;

                      return (
                        <div
                          key={category}
                          className="flex items-center space-x-3"
                        >
                          <Badge variant="outline">{category}</Badge>
                          <div className="flex-1">
                            <div className="flex justify-between text-sm">
                              <span>
                                {categoryExpenses.length} expense
                                {categoryExpenses.length !== 1 ? "s" : ""}
                              </span>
                              <span>
                                ${categoryTotal.toFixed(2)} (
                                {percentage.toFixed(1)}%)
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* View Expense Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Expense Details</DialogTitle>
              <DialogDescription>
                Complete information for expense {selectedExpense?.id}
              </DialogDescription>
            </DialogHeader>
            {selectedExpense && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Expense Information</h4>
                    <div className="space-y-2 text-sm">
                      <div>Description: {selectedExpense.description}</div>
                      <div>Category: {selectedExpense.category}</div>
                      <div>Subcategory: {selectedExpense.subcategory}</div>
                      <div>Vendor: {selectedExpense.vendor}</div>
                      <div>Payment Method: {selectedExpense.paymentMethod}</div>
                      <div>
                        Status: {getStatusBadge(selectedExpense.status)}
                      </div>
                      <div>
                        Date:{" "}
                        {new Date(selectedExpense.date).toLocaleDateString()}
                      </div>
                      {selectedExpense.approver && (
                        <div>Approver: {selectedExpense.approver}</div>
                      )}
                      {selectedExpense.projectName && (
                        <div>Project: {selectedExpense.projectName}</div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Financial Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <span>${selectedExpense.amount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>
                          Tax ({(selectedExpense.taxRate * 100).toFixed(1)}%):
                        </span>
                        <span>${selectedExpense.taxAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>
                          $
                          {(
                            selectedExpense.amount + selectedExpense.taxAmount
                          ).toFixed(2)}
                        </span>
                      </div>
                      {selectedExpense.isRecurring && (
                        <div className="flex justify-between">
                          <span>Recurring:</span>
                          <span className="capitalize">
                            {selectedExpense.recurringFrequency}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {selectedExpense.tags.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedExpense.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedExpense.receipt && (
                  <div>
                    <h4 className="font-medium mb-3">Receipt Information</h4>
                    <div className="space-y-2 text-sm">
                      <div>Filename: {selectedExpense.receipt.filename}</div>
                      <div>
                        Upload Date:{" "}
                        {new Date(
                          selectedExpense.receipt.uploadDate,
                        ).toLocaleDateString()}
                      </div>
                      {selectedExpense.receipt.extractedData && (
                        <div>
                          <p className="font-medium mt-2 mb-1">
                            Extracted Data:
                          </p>
                          <div className="pl-4 space-y-1">
                            <div>
                              Vendor:{" "}
                              {selectedExpense.receipt.extractedData.vendor}
                            </div>
                            <div>
                              Amount: $
                              {selectedExpense.receipt.extractedData.amount.toFixed(
                                2,
                              )}
                            </div>
                            <div>
                              Date:{" "}
                              {new Date(
                                selectedExpense.receipt.extractedData.date,
                              ).toLocaleDateString()}
                            </div>
                            {selectedExpense.receipt.extractedData.items
                              .length > 0 && (
                              <div>
                                Items:{" "}
                                {selectedExpense.receipt.extractedData.items.join(
                                  ", ",
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedExpense.notes && (
                  <div>
                    <h4 className="font-medium mb-2">Notes</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedExpense.notes}
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
              <Button>Edit Expense</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Expenses;
