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
  BarChart3,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Minus,
} from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  location: string;
  quantity: number;
  minQuantity: number;
  maxQuantity: number;
  unitCost: number;
  totalValue: number;
  lastUpdated: string;
  status: "in_stock" | "low_stock" | "out_of_stock" | "overstock";
  supplier: string;
  reorderPoint: number;
}

const mockInventoryItems: InventoryItem[] = [
  {
    id: "inv_001",
    name: "Hammer - 16oz Claw",
    sku: "TOOL-HAM-16",
    category: "Hand Tools",
    location: "Warehouse A - Shelf 12",
    quantity: 25,
    minQuantity: 10,
    maxQuantity: 50,
    unitCost: 24.99,
    totalValue: 624.75,
    lastUpdated: "2024-01-15",
    status: "in_stock",
    supplier: "Tool Supply Co",
    reorderPoint: 15,
  },
  {
    id: "inv_002",
    name: "Safety Helmet - Hard Hat",
    sku: "PPE-HEL-001",
    category: "Safety Equipment",
    location: "Warehouse B - Bin 5",
    quantity: 8,
    minQuantity: 15,
    maxQuantity: 40,
    unitCost: 18.5,
    totalValue: 148.0,
    lastUpdated: "2024-01-14",
    status: "low_stock",
    supplier: "Safety First Inc",
    reorderPoint: 20,
  },
  {
    id: "inv_003",
    name: "Drill Bits Set - 20pc",
    sku: "TOOL-DRL-20",
    category: "Power Tool Accessories",
    location: "Warehouse A - Drawer 8",
    quantity: 0,
    minQuantity: 5,
    maxQuantity: 25,
    unitCost: 45.99,
    totalValue: 0.0,
    lastUpdated: "2024-01-12",
    status: "out_of_stock",
    supplier: "Power Tools Direct",
    reorderPoint: 8,
  },
  {
    id: "inv_004",
    name: "Work Gloves - Large",
    sku: "PPE-GLV-L",
    category: "Safety Equipment",
    location: "Warehouse B - Shelf 3",
    quantity: 75,
    minQuantity: 20,
    maxQuantity: 60,
    unitCost: 8.99,
    totalValue: 674.25,
    lastUpdated: "2024-01-13",
    status: "overstock",
    supplier: "Safety First Inc",
    reorderPoint: 30,
  },
];

const Inventory = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in_stock":
        return <Badge className="bg-green-100 text-green-800">In Stock</Badge>;
      case "low_stock":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Low Stock</Badge>
        );
      case "out_of_stock":
        return <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>;
      case "overstock":
        return <Badge className="bg-blue-100 text-blue-800">Overstock</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "in_stock":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "low_stock":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case "out_of_stock":
        return <Minus className="w-4 h-4 text-red-600" />;
      case "overstock":
        return <TrendingUp className="w-4 h-4 text-blue-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const totalItems = mockInventoryItems.length;
  const totalValue = mockInventoryItems.reduce(
    (sum, item) => sum + item.totalValue,
    0,
  );
  const lowStockItems = mockInventoryItems.filter(
    (item) => item.status === "low_stock" || item.status === "out_of_stock",
  ).length;
  const inStockItems = mockInventoryItems.filter(
    (item) => item.status === "in_stock",
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Inventory Management
            </h1>
            <p className="text-slate-600 mt-2">
              Track and manage your inventory levels and stock
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Reports
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
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalItems}</div>
              <p className="text-xs text-muted-foreground">Inventory items</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${totalValue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Inventory value</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Stock</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {inStockItems}
              </div>
              <p className="text-xs text-muted-foreground">Items available</p>
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
              <p className="text-xs text-muted-foreground">Need attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="items">All Items</TabsTrigger>
            <TabsTrigger value="movements">Stock Movements</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Stock Status Overview</CardTitle>
                  <CardDescription>
                    Current inventory status by category
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockInventoryItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(item.status)}
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.sku}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{item.quantity} units</p>
                        {getStatusBadge(item.status)}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest inventory movements and updates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="text-sm">
                      <span className="font-medium">Hammer - 16oz Claw</span>{" "}
                      stock updated
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="text-sm">
                      <span className="font-medium">Safety Helmet</span> low
                      stock alert
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="text-sm">
                      <span className="font-medium">Drill Bits Set</span> out of
                      stock
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="text-sm">
                      <span className="font-medium">Work Gloves</span> overstock
                      detected
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="items" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Items</CardTitle>
                <CardDescription>
                  Complete list of all inventory items
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search inventory..."
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
                      <SelectItem value="hand-tools">Hand Tools</SelectItem>
                      <SelectItem value="safety">Safety Equipment</SelectItem>
                      <SelectItem value="power-tools">Power Tools</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="in_stock">In Stock</SelectItem>
                      <SelectItem value="low_stock">Low Stock</SelectItem>
                      <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Unit Cost</TableHead>
                      <TableHead>Total Value</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockInventoryItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.category}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            {item.sku}
                          </code>
                        </TableCell>
                        <TableCell>
                          <p className="text-sm">{item.location}</p>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium">{item.quantity}</p>
                            <p className="text-xs text-muted-foreground">
                              Min: {item.minQuantity} | Max: {item.maxQuantity}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">
                            ${item.unitCost.toFixed(2)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">
                            ${item.totalValue.toFixed(2)}
                          </span>
                        </TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
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

          <TabsContent value="movements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Stock Movements</CardTitle>
                <CardDescription>
                  Track inventory movements and transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Stock movement tracking coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Reports</CardTitle>
                <CardDescription>
                  Generate detailed inventory reports and analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Inventory reporting coming soon
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

export default Inventory;
