import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Building,
  MapPin,
  Phone,
  Mail,
  Users,
  Plus,
  Edit,
  Trash2,
  Settings,
  Eye,
  Save,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
} from "lucide-react";

interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  manager: string;
  employees: number;
  status: "active" | "inactive" | "pending";
  revenue: number;
  projects: number;
  established: string;
}

interface BranchManagementProps {
  className?: string;
}

const BranchManagement: React.FC<BranchManagementProps> = ({
  className = "",
}) => {
  const [branches, setBranches] = useState<Branch[]>([
    {
      id: "branch-1",
      name: "Downtown Office",
      address: "123 Main Street",
      city: "Springfield",
      state: "IL",
      zipCode: "62701",
      phone: "(555) 123-4567",
      email: "downtown@company.com",
      manager: "John Smith",
      employees: 15,
      status: "active",
      revenue: 450000,
      projects: 23,
      established: "2018",
    },
    {
      id: "branch-2",
      name: "Westside Branch",
      address: "456 Oak Avenue",
      city: "Springfield",
      state: "IL",
      zipCode: "62704",
      phone: "(555) 987-6543",
      email: "westside@company.com",
      manager: "Sarah Johnson",
      employees: 12,
      status: "active",
      revenue: 320000,
      projects: 18,
      established: "2020",
    },
    {
      id: "branch-3",
      name: "North Valley Office",
      address: "789 Pine Road",
      city: "Rockford",
      state: "IL",
      zipCode: "61101",
      phone: "(555) 456-7890",
      email: "northvalley@company.com",
      manager: "Mike Wilson",
      employees: 8,
      status: "pending",
      revenue: 180000,
      projects: 12,
      established: "2023",
    },
  ]);

  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Branch>>({});

  const handleCreateBranch = () => {
    setSelectedBranch(null);
    setFormData({});
    setIsDialogOpen(true);
  };

  const handleEditBranch = (branch: Branch) => {
    setSelectedBranch(branch);
    setFormData(branch);
    setIsDialogOpen(true);
  };

  const handleSaveBranch = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (selectedBranch) {
        // Update existing branch
        setBranches((prev) =>
          prev.map((branch) =>
            branch.id === selectedBranch.id
              ? { ...branch, ...formData }
              : branch,
          ),
        );
      } else {
        // Create new branch
        const newBranch: Branch = {
          id: `branch-${Date.now()}`,
          name: formData.name || "",
          address: formData.address || "",
          city: formData.city || "",
          state: formData.state || "",
          zipCode: formData.zipCode || "",
          phone: formData.phone || "",
          email: formData.email || "",
          manager: formData.manager || "",
          employees: formData.employees || 0,
          status: "pending",
          revenue: 0,
          projects: 0,
          established: new Date().getFullYear().toString(),
        };
        setBranches((prev) => [...prev, newBranch]);
      }

      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to save branch:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBranch = async (branchId: string) => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
      setBranches((prev) => prev.filter((branch) => branch.id !== branchId));
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: {
        color: "bg-green-500",
        label: "Active",
        icon: <CheckCircle className="h-3 w-3" />,
      },
      inactive: {
        color: "bg-red-500",
        label: "Inactive",
        icon: <AlertCircle className="h-3 w-3" />,
      },
      pending: {
        color: "bg-yellow-500",
        label: "Pending",
        icon: <Clock className="h-3 w-3" />,
      },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <Badge className={`${config.color} text-white flex items-center gap-1`}>
        {config.icon}
        {config.label}
      </Badge>
    );
  };

  const totalEmployees = branches.reduce(
    (sum, branch) => sum + branch.employees,
    0,
  );
  const totalRevenue = branches.reduce(
    (sum, branch) => sum + branch.revenue,
    0,
  );
  const totalProjects = branches.reduce(
    (sum, branch) => sum + branch.projects,
    0,
  );
  const activeBranches = branches.filter(
    (branch) => branch.status === "active",
  ).length;

  return (
    <div className={`min-h-screen bg-gray-50 p-6 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Building className="h-8 w-8 text-white" />
                </div>
                Branch Management
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your company branches and locations
              </p>
            </div>
            <Button
              onClick={handleCreateBranch}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Branch
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Branches
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {branches.length}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Building className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Branches
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {activeBranches}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Employees
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalEmployees}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Revenue
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${(totalRevenue / 1000).toFixed(0)}K
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Branches List */}
        <Card>
          <CardHeader>
            <CardTitle>Branch Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {branches.map((branch) => (
                <div
                  key={branch.id}
                  className="border rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {branch.name}
                        </h3>
                        {getStatusBadge(branch.status)}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>
                            {branch.address}, {branch.city}, {branch.state}{" "}
                            {branch.zipCode}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="h-4 w-4" />
                          <span>{branch.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="h-4 w-4" />
                          <span>{branch.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="h-4 w-4" />
                          <span>Manager: {branch.manager}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Building className="h-4 w-4" />
                          <span>{branch.employees} employees</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>Est. {branch.established}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="font-medium">
                            ${(branch.revenue / 1000).toFixed(0)}K revenue
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">
                            {branch.projects} projects
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditBranch(branch)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteBranch(branch.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Add/Edit Branch Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {selectedBranch ? "Edit Branch" : "Add New Branch"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Branch Name</Label>
                  <Input
                    id="name"
                    value={formData.name || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Enter branch name"
                  />
                </div>
                <div>
                  <Label htmlFor="manager">Manager</Label>
                  <Input
                    id="manager"
                    value={formData.manager || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        manager: e.target.value,
                      }))
                    }
                    placeholder="Enter manager name"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  placeholder="Enter street address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, city: e.target.value }))
                    }
                    placeholder="Enter city"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        state: e.target.value,
                      }))
                    }
                    placeholder="Enter state"
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        zipCode: e.target.value,
                      }))
                    }
                    placeholder="Enter ZIP code"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="employees">Number of Employees</Label>
                <Input
                  id="employees"
                  type="number"
                  value={formData.employees || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      employees: parseInt(e.target.value) || 0,
                    }))
                  }
                  placeholder="Enter number of employees"
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveBranch} disabled={isLoading}>
                  {isLoading ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  {selectedBranch ? "Update" : "Create"} Branch
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default BranchManagement;
