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
  Edit,
  Eye,
  Mail,
  Phone,
  Building,
  Users,
  Calendar,
  DollarSign,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Star,
} from "lucide-react";

interface Subcontractor {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  specialty: string;
  status: "active" | "inactive" | "pending";
  rating: number;
  contractsCompleted: number;
  totalValue: number;
  lastProject: string;
  certifications: string[];
  insurance: {
    liability: boolean;
    workers_comp: boolean;
    expiry: string;
  };
}

const mockSubcontractors: Subcontractor[] = [
  {
    id: "sub_001",
    companyName: "Elite Electrical Services",
    contactPerson: "Robert Martinez",
    email: "robert@eliteelectrical.com",
    phone: "+1 (555) 123-4567",
    specialty: "Electrical",
    status: "active",
    rating: 4.8,
    contractsCompleted: 15,
    totalValue: 125000,
    lastProject: "Office Building Renovation",
    certifications: ["Licensed Electrician", "OSHA 30", "NECA Certified"],
    insurance: {
      liability: true,
      workers_comp: true,
      expiry: "2024-12-31",
    },
  },
  {
    id: "sub_002",
    companyName: "Premier Plumbing Solutions",
    contactPerson: "Lisa Thompson",
    email: "lisa@premierplumbing.com",
    phone: "+1 (555) 234-5678",
    specialty: "Plumbing",
    status: "active",
    rating: 4.6,
    contractsCompleted: 22,
    totalValue: 89000,
    lastProject: "Residential Complex",
    certifications: ["Master Plumber", "Backflow Certified", "Green Plumbing"],
    insurance: {
      liability: true,
      workers_comp: true,
      expiry: "2024-08-15",
    },
  },
  {
    id: "sub_003",
    companyName: "Apex HVAC Systems",
    contactPerson: "David Chen",
    email: "david@apexhvac.com",
    phone: "+1 (555) 345-6789",
    specialty: "HVAC",
    status: "pending",
    rating: 4.2,
    contractsCompleted: 8,
    totalValue: 67000,
    lastProject: "Commercial Plaza",
    certifications: ["EPA Certified", "NATE Certified", "HVAC Excellence"],
    insurance: {
      liability: true,
      workers_comp: false,
      expiry: "2024-06-30",
    },
  },
];

const SubcontractorManagement = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRatingStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-sm text-muted-foreground ml-1">{rating}</span>
      </div>
    );
  };

  const activeSubcontractors = mockSubcontractors.filter(
    (s) => s.status === "active",
  ).length;
  const totalValue = mockSubcontractors.reduce(
    (sum, s) => sum + s.totalValue,
    0,
  );
  const avgRating =
    mockSubcontractors.reduce((sum, s) => sum + s.rating, 0) /
    mockSubcontractors.length;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Subcontractor Management
            </h1>
            <p className="text-slate-600 mt-2">
              Manage subcontractors, contracts, and performance
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Subcontractor
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Subcontractors
              </CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockSubcontractors.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Registered companies
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {activeSubcontractors}
              </div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalValue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Contract value</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgRating.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">
                Performance rating
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subcontractors">All Subcontractors</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Subcontractors</CardTitle>
                <CardDescription>
                  Currently active subcontractor partnerships
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Specialty</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Contracts</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockSubcontractors.slice(0, 5).map((sub) => (
                      <TableRow key={sub.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium">{sub.companyName}</p>
                            <p className="text-sm text-muted-foreground">
                              {sub.contactPerson}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-1 text-sm">
                              <Mail className="h-3 w-3" />
                              <span>{sub.email}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm">
                              <Phone className="h-3 w-3" />
                              <span>{sub.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{sub.specialty}</Badge>
                        </TableCell>
                        <TableCell>{getRatingStars(sub.rating)}</TableCell>
                        <TableCell>
                          <div className="text-center">
                            <p className="font-medium">
                              {sub.contractsCompleted}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              completed
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(sub.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
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

          <TabsContent value="subcontractors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Subcontractors</CardTitle>
                <CardDescription>
                  Complete list of registered subcontractors
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search subcontractors..."
                      className="pl-10"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-48">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Specialties</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="plumbing">Plumbing</SelectItem>
                      <SelectItem value="hvac">HVAC</SelectItem>
                      <SelectItem value="roofing">Roofing</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Specialty</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Insurance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockSubcontractors.map((sub) => (
                      <TableRow key={sub.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium">{sub.companyName}</p>
                            <p className="text-sm text-muted-foreground">
                              {sub.contactPerson}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-1 text-sm">
                              <Mail className="h-3 w-3" />
                              <span>{sub.email}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm">
                              <Phone className="h-3 w-3" />
                              <span>{sub.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{sub.specialty}</Badge>
                        </TableCell>
                        <TableCell>{getRatingStars(sub.rating)}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">
                              ${sub.totalValue.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {sub.contractsCompleted} contracts
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-1">
                              {sub.insurance.liability ? (
                                <CheckCircle className="h-3 w-3 text-green-600" />
                              ) : (
                                <AlertCircle className="h-3 w-3 text-red-600" />
                              )}
                              <span className="text-xs">Liability</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              {sub.insurance.workers_comp ? (
                                <CheckCircle className="h-3 w-3 text-green-600" />
                              ) : (
                                <AlertCircle className="h-3 w-3 text-red-600" />
                              )}
                              <span className="text-xs">Workers Comp</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(sub.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
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

          <TabsContent value="contracts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contract Management</CardTitle>
                <CardDescription>
                  Manage subcontractor contracts and agreements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Contract management coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>
                  Track subcontractor performance and ratings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Performance analytics coming soon
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

export default SubcontractorManagement;
