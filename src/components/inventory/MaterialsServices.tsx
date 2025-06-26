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
  Package,
  Wrench,
  ShoppingCart,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Truck,
} from "lucide-react";

interface Material {
  id: string;
  name: string;
  category: string;
  unit: string;
  unitPrice: number;
  quantityInStock: number;
  minStockLevel: number;
  supplier: string;
  status: "in_stock" | "low_stock" | "out_of_stock";
  lastOrdered: string;
}

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  hourlyRate: number;
  estimatedHours: number;
  skillLevel: "basic" | "intermediate" | "advanced";
  status: "available" | "unavailable";
}

const mockMaterials: Material[] = [
  {
    id: "mat_001",
    name: "2x4 Lumber - 8ft",
    category: "Lumber",
    unit: "piece",
    unitPrice: 4.5,
    quantityInStock: 150,
    minStockLevel: 50,
    supplier: "Home Depot",
    status: "in_stock",
    lastOrdered: "2024-01-10",
  },
  {
    id: "mat_002",
    name: "Concrete Mix - 80lb",
    category: "Concrete",
    unit: "bag",
    unitPrice: 5.25,
    quantityInStock: 25,
    minStockLevel: 30,
    supplier: "Lowes",
    status: "low_stock",
    lastOrdered: "2024-01-08",
  },
  {
    id: "mat_003",
    name: "Roofing Shingles",
    category: "Roofing",
    unit: "bundle",
    unitPrice: 32.99,
    quantityInStock: 0,
    minStockLevel: 10,
    supplier: "ABC Supply",
    status: "out_of_stock",
    lastOrdered: "2024-01-05",
  },
];

const mockServices: Service[] = [
  {
    id: "svc_001",
    name: "Electrical Installation",
    category: "Electrical",
    description: "Complete electrical system installation",
    hourlyRate: 85.0,
    estimatedHours: 8,
    skillLevel: "advanced",
    status: "available",
  },
  {
    id: "svc_002",
    name: "Plumbing Repair",
    category: "Plumbing",
    description: "General plumbing repairs and maintenance",
    hourlyRate: 75.0,
    estimatedHours: 4,
    skillLevel: "intermediate",
    status: "available",
  },
  {
    id: "svc_003",
    name: "HVAC Maintenance",
    category: "HVAC",
    description: "Heating and cooling system maintenance",
    hourlyRate: 90.0,
    estimatedHours: 6,
    skillLevel: "advanced",
    status: "unavailable",
  },
];

const MaterialsServices = () => {
  const getStockStatusBadge = (status: string) => {
    switch (status) {
      case "in_stock":
        return <Badge className="bg-green-100 text-green-800">In Stock</Badge>;
      case "low_stock":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Low Stock</Badge>
        );
      case "out_of_stock":
        return <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getServiceStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-100 text-green-800">Available</Badge>;
      case "unavailable":
        return <Badge className="bg-gray-100 text-gray-800">Unavailable</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getSkillLevelBadge = (level: string) => {
    switch (level) {
      case "basic":
        return <Badge variant="outline">Basic</Badge>;
      case "intermediate":
        return (
          <Badge className="bg-blue-100 text-blue-800">Intermediate</Badge>
        );
      case "advanced":
        return (
          <Badge className="bg-purple-100 text-purple-800">Advanced</Badge>
        );
      default:
        return <Badge variant="secondary">{level}</Badge>;
    }
  };

  const totalMaterialValue = mockMaterials.reduce(
    (sum, material) => sum + material.unitPrice * material.quantityInStock,
    0,
  );

  const lowStockItems = mockMaterials.filter(
    (material) =>
      material.status === "low_stock" || material.status === "out_of_stock",
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Materials & Services
            </h1>
            <p className="text-slate-600 mt-2">
              Manage inventory, materials, and service offerings
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Truck className="w-4 h-4 mr-2" />
              Order Materials
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Materials
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockMaterials.length}</div>
              <p className="text-xs text-muted-foreground">Items in catalog</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Inventory Value
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${totalMaterialValue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Current stock value
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Low Stock Alerts
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {lowStockItems}
              </div>
              <p className="text-xs text-muted-foreground">
                Items need reorder
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Services Available
              </CardTitle>
              <Wrench className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {mockServices.filter((s) => s.status === "available").length}
              </div>
              <p className="text-xs text-muted-foreground">Active services</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="materials" className="space-y-4">
          <TabsList>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          </TabsList>

          <TabsContent value="materials" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Material Inventory</CardTitle>
                <CardDescription>
                  Track and manage construction materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search materials..."
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
                      <SelectItem value="lumber">Lumber</SelectItem>
                      <SelectItem value="concrete">Concrete</SelectItem>
                      <SelectItem value="roofing">Roofing</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Material</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Unit Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockMaterials.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium">{material.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {material.unit}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{material.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">
                            ${material.unitPrice.toFixed(2)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium">
                              {material.quantityInStock}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Min: {material.minStockLevel}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStockStatusBadge(material.status)}
                        </TableCell>
                        <TableCell>{material.supplier}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <ShoppingCart className="h-4 w-4" />
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

          <TabsContent value="services" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Service Catalog</CardTitle>
                <CardDescription>
                  Manage available services and pricing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Hourly Rate</TableHead>
                      <TableHead>Est. Hours</TableHead>
                      <TableHead>Skill Level</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockServices.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium">{service.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {service.description}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{service.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">
                            ${service.hourlyRate.toFixed(2)}/hr
                          </span>
                        </TableCell>
                        <TableCell>{service.estimatedHours}h</TableCell>
                        <TableCell>
                          {getSkillLevelBadge(service.skillLevel)}
                        </TableCell>
                        <TableCell>
                          {getServiceStatusBadge(service.status)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
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

          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Purchase Orders</CardTitle>
                <CardDescription>
                  Manage material purchase orders and deliveries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Truck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Purchase order management coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suppliers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Supplier Management</CardTitle>
                <CardDescription>
                  Manage supplier relationships and contacts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Supplier management coming soon
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

export default MaterialsServices;
