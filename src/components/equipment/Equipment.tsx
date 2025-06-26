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
  Wrench,
  Settings,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  BarChart3,
} from "lucide-react";

interface Equipment {
  id: string;
  name: string;
  type: string;
  model: string;
  serialNumber: string;
  status: "available" | "in_use" | "maintenance" | "out_of_service";
  location: string;
  purchaseDate: string;
  purchasePrice: number;
  lastMaintenance: string;
  nextMaintenance: string;
  assignedTo?: string;
}

const mockEquipment: Equipment[] = [
  {
    id: "eq_001",
    name: "Excavator CAT 320",
    type: "Heavy Machinery",
    model: "CAT 320D",
    serialNumber: "CAT320D001",
    status: "available",
    location: "Main Yard",
    purchaseDate: "2023-01-15",
    purchasePrice: 125000,
    lastMaintenance: "2024-01-10",
    nextMaintenance: "2024-04-10",
  },
  {
    id: "eq_002",
    name: "Concrete Mixer",
    type: "Concrete Equipment",
    model: "CM-500",
    serialNumber: "CM500-2023",
    status: "in_use",
    location: "Site A",
    purchaseDate: "2023-03-20",
    purchasePrice: 45000,
    lastMaintenance: "2024-01-05",
    nextMaintenance: "2024-03-05",
    assignedTo: "Project Alpha",
  },
  {
    id: "eq_003",
    name: "Generator 50kW",
    type: "Power Equipment",
    model: "GEN-50K",
    serialNumber: "GEN50K-001",
    status: "maintenance",
    location: "Maintenance Shop",
    purchaseDate: "2022-11-10",
    purchasePrice: 15000,
    lastMaintenance: "2024-01-20",
    nextMaintenance: "2024-02-20",
  },
];

const Equipment = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-100 text-green-800">Available</Badge>;
      case "in_use":
        return <Badge className="bg-blue-100 text-blue-800">In Use</Badge>;
      case "maintenance":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Maintenance</Badge>
        );
      case "out_of_service":
        return (
          <Badge className="bg-red-100 text-red-800">Out of Service</Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "in_use":
        return <Clock className="w-4 h-4 text-blue-600" />;
      case "maintenance":
        return <Wrench className="w-4 h-4 text-yellow-600" />;
      case "out_of_service":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Settings className="w-4 h-4 text-gray-600" />;
    }
  };

  const totalEquipment = mockEquipment.length;
  const availableEquipment = mockEquipment.filter(
    (eq) => eq.status === "available",
  ).length;
  const inUseEquipment = mockEquipment.filter(
    (eq) => eq.status === "in_use",
  ).length;
  const maintenanceEquipment = mockEquipment.filter(
    (eq) => eq.status === "maintenance",
  ).length;

  const totalValue = mockEquipment.reduce(
    (sum, eq) => sum + eq.purchasePrice,
    0,
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Equipment Management
            </h1>
            <p className="text-slate-600 mt-2">
              Track and manage construction equipment and machinery
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Reports
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Equipment
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Equipment
              </CardTitle>
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEquipment}</div>
              <p className="text-xs text-muted-foreground">Equipment items</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {availableEquipment}
              </div>
              <p className="text-xs text-muted-foreground">Ready for use</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Use</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {inUseEquipment}
              </div>
              <p className="text-xs text-muted-foreground">
                Currently deployed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${totalValue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Asset value</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="equipment">All Equipment</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Equipment Status</CardTitle>
                  <CardDescription>
                    Current status of all equipment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockEquipment.map((equipment) => (
                    <div
                      key={equipment.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(equipment.status)}
                        <div>
                          <p className="font-medium">{equipment.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {equipment.model} • {equipment.location}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(equipment.status)}
                        {equipment.assignedTo && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {equipment.assignedTo}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Maintenance Schedule</CardTitle>
                  <CardDescription>
                    Upcoming maintenance activities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockEquipment
                    .filter((eq) => eq.nextMaintenance)
                    .map((equipment) => (
                      <div
                        key={equipment.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <div>
                            <p className="font-medium">{equipment.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Next: {equipment.nextMaintenance}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline">Scheduled</Badge>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="equipment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Equipment Inventory</CardTitle>
                <CardDescription>
                  Complete list of all equipment
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search equipment..."
                      className="pl-10"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-48">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="heavy">Heavy Machinery</SelectItem>
                      <SelectItem value="concrete">
                        Concrete Equipment
                      </SelectItem>
                      <SelectItem value="power">Power Equipment</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="in_use">In Use</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Equipment</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Serial Number</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Next Maintenance</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockEquipment.map((equipment) => (
                      <TableRow key={equipment.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium">{equipment.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {equipment.model}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{equipment.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            {equipment.serialNumber}
                          </code>
                        </TableCell>
                        <TableCell>{equipment.location}</TableCell>
                        <TableCell>
                          {getStatusBadge(equipment.status)}
                        </TableCell>
                        <TableCell>{equipment.nextMaintenance}</TableCell>
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

          <TabsContent value="maintenance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Management</CardTitle>
                <CardDescription>
                  Schedule and track equipment maintenance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Wrench className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Maintenance management coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Equipment Reports</CardTitle>
                <CardDescription>
                  Generate equipment utilization and maintenance reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Equipment reporting coming soon
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

export default Equipment;
