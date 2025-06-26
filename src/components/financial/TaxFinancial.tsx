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
import {
  FileText,
  Calculator,
  Calendar,
  AlertTriangle,
  Download,
} from "lucide-react";

interface TaxRecord {
  id: string;
  year: number;
  quarter: string;
  type: "income" | "payroll" | "sales" | "property";
  amount: number;
  status: "filed" | "pending" | "overdue";
  dueDate: string;
}

const mockTaxRecords: TaxRecord[] = [
  {
    id: "1",
    year: 2024,
    quarter: "Q3",
    type: "income",
    amount: 15000,
    status: "filed",
    dueDate: "2024-10-15",
  },
  {
    id: "2",
    year: 2024,
    quarter: "Q4",
    type: "payroll",
    amount: 8500,
    status: "pending",
    dueDate: "2024-12-15",
  },
  {
    id: "3",
    year: 2024,
    quarter: "Q4",
    type: "sales",
    amount: 3200,
    status: "overdue",
    dueDate: "2024-11-30",
  },
];

const TaxFinancial = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "filed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "overdue":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const totalTaxLiability = mockTaxRecords.reduce(
    (sum, record) => sum + record.amount,
    0,
  );
  const pendingTaxes = mockTaxRecords
    .filter((r) => r.status === "pending")
    .reduce((sum, record) => sum + record.amount, 0);
  const overdueTaxes = mockTaxRecords
    .filter((r) => r.status === "overdue")
    .reduce((sum, record) => sum + record.amount, 0);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Tax & Financial Management
            </h1>
            <p className="text-slate-600 mt-2">
              Manage tax obligations and financial compliance
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Reports
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <FileText className="w-4 h-4 mr-2" />
              File Tax Return
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Tax Liability
              </CardTitle>
              <Calculator className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(totalTaxLiability)}
              </div>
              <p className="text-xs text-muted-foreground">Current year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Taxes
              </CardTitle>
              <Calendar className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {formatCurrency(pendingTaxes)}
              </div>
              <p className="text-xs text-muted-foreground">Due soon</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Overdue Taxes
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {formatCurrency(overdueTaxes)}
              </div>
              <p className="text-xs text-muted-foreground">
                Immediate attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Filed Returns
              </CardTitle>
              <FileText className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {mockTaxRecords.filter((r) => r.status === "filed").length}
              </div>
              <p className="text-xs text-muted-foreground">This year</p>
            </CardContent>
          </Card>
        </div>

        {/* Tax Management Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="quarterly">Quarterly Returns</TabsTrigger>
            <TabsTrigger value="deductions">Deductions</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tax Calendar</CardTitle>
                  <CardDescription>
                    Upcoming tax deadlines and obligations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockTaxRecords.map((record) => (
                    <div
                      key={record.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">
                          {record.type.toUpperCase()} Tax - {record.quarter}{" "}
                          {record.year}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Due: {new Date(record.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="font-semibold">
                          {formatCurrency(record.amount)}
                        </p>
                        <Badge
                          variant="secondary"
                          className={`${getStatusColor(record.status)} text-white text-xs`}
                        >
                          {record.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tax Planning Tools</CardTitle>
                  <CardDescription>
                    Resources to help with tax planning
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Calculator className="w-4 h-4 mr-2" />
                    Tax Calculator
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Deduction Tracker
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Payment Scheduler
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Form Downloads
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="quarterly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quarterly Tax Returns</CardTitle>
                <CardDescription>
                  Manage quarterly tax filings and payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Quarterly tax return management coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deductions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tax Deductions</CardTitle>
                <CardDescription>
                  Track and manage tax-deductible expenses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calculator className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Deduction tracking coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tax Compliance</CardTitle>
                <CardDescription>
                  Ensure compliance with tax regulations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Compliance monitoring coming soon
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

export default TaxFinancial;
