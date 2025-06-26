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
  Truck,
  Car,
  Fuel,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  BarChart3,
  MapPin,
  Wrench,
} from "lucide-react";

interface Vehicle {
  id: string;
  name: string;
  type: "truck" | "van" | "pickup" | "trailer" | "other";
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  vin: string;
  status: "available" | "in_use" | "maintenance" | "out_of_service";
  location: string;
  mileage: number;
  fuelType: string;
  lastService: string;
  nextService: string;
  assignedTo?: string;
  purchasePrice: number;
}

const mockVehicles: Vehicle[] = [
  {
    id: "veh_001",
    name: "Ford F-150 Work Truck",
    type: "pickup",
    make: "Ford",
    model: "F-150",
    year: 2023,
    licensePlate: "ABC-1234",
    vin: "1FTFW1ET5NFC12345",
    status: "available",
    location: "Main Office",
    mileage: 15420,
    fuelType: "Gasoline",
    lastService: "2024-01-10",
    nextService: "2024-04-10",
    purchasePrice: 45000,
  },
  {
    id: "veh_002",
    name: "Chevy Silverado 2500",
    type: "truck",
    make: "Chevrolet",
    model: "Silverado 2500HD",
    year: 2022,
    licensePlate: "XYZ-5678",
    vin: "1GC4YYE73NF123456",
    status: "in_use",
    location: "Site A",
    mileage: 28750,
    fuelType: "Diesel",
    lastService: "2024-01-05",
    nextService: "2024-03-05",
    assignedTo: "John Smith",
    purchasePrice: 52000,
  },
  {
    id: "veh_003",
    name: "Transit Connect Van",
    type: "van",
    make: "Ford",
    model: "Transit Connect",
    year: 2021,
    licensePlate: "DEF-9012",
    vin: "NM0GE9F75M1234567",
    status: "maintenance",
    location: "Service Center",
    mileage: 45200,
    fuelType: "Gasoline",
    lastService: "2024-01-20",
    nextService: "2024-02-20",
    purchasePrice: 32000,
  },
  {
    id: "veh_004",
    name: "Equipment Trailer",
    type: "trailer",
    make: "Big Tex",
    model: "14GN-20+5",
    year: 2023,
    licensePlate: "TRL-3456",
    vin: "5SAAK2425NP123456",
    status: "available",
    location: "Yard B",
    mileage: 0,
    fuelType: "N/A",
    lastService: "2024-01-15",
    nextService: "2024-07-15",
    purchasePrice: 18000,
  },
];

const Vehicles = () => {
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
        return <Car className="w-4 h-4 text-gray-600" />;
    }
  };

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case "truck":
        return <Truck className="w-5 h-5 text-blue-600" />;
      case "van":
        return <Car className="w-5 h-5 text-green-600" />;
      case "pickup":
        return <Truck className="w-5 h-5 text-purple-600" />;
      case "trailer":
        return <Truck className="w-5 h-5 text-orange-600" />;
      default:
        return <Car className="w-5 h-5 text-gray-600" />;
    }
  };

  const totalVehicles = mockVehicles.length;
  const availableVehicles = mockVehicles.filter(
    (v) => v.status === "available",
  ).length;
  const inUseVehicles = mockVehicles.filter(
    (v) => v.status === "in_use",
  ).length;
  const maintenanceVehicles = mockVehicles.filter(
    (v) => v.status === "maintenance",
  ).length;

  const totalValue = mockVehicles.reduce((sum, v) => sum + v.purchasePrice, 0);
  const totalMileage = mockVehicles.reduce((sum, v) => sum + v.mileage, 0);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Vehicle Management
            </h1>
            <p className="text-slate-600 mt-2">
              Track and manage company vehicles and fleet
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Fleet Reports
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Vehicle
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Vehicles
              </CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVehicles}</div>
              <p className="text-xs text-muted-foreground">Fleet size</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {availableVehicles}
              </div>
              <p className="text-xs text-muted-foreground">Ready to use</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Use</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {inUseVehicles}
              </div>
              <p className="text-xs text-muted-foreground">
                Currently deployed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fleet Value</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${totalValue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Total asset value</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Miles</CardTitle>
              <MapPin className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {totalMileage.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Fleet mileage</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="vehicles">All Vehicles</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="tracking">GPS Tracking</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Vehicle Status</CardTitle>
                  <CardDescription>
                    Current status of all vehicles
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockVehicles.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        {getVehicleIcon(vehicle.type)}
                        <div>
                          <p className="font-medium">{vehicle.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {vehicle.licensePlate} • {vehicle.location}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(vehicle.status)}
                        {vehicle.assignedTo && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {vehicle.assignedTo}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Service Schedule</CardTitle>
                  <CardDescription>
                    Upcoming vehicle maintenance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockVehicles
                    .filter((v) => v.nextService)
                    .map((vehicle) => (
                      <div
                        key={vehicle.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <div>
                            <p className="font-medium">{vehicle.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Next: {vehicle.nextService}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">Scheduled</Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            {vehicle.mileage.toLocaleString()} miles
                          </p>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="vehicles" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Fleet</CardTitle>
                <CardDescription>
                  Complete list of all company vehicles
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search vehicles..." className="pl-10" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-48">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="truck">Trucks</SelectItem>
                      <SelectItem value="van">Vans</SelectItem>
                      <SelectItem value="pickup">Pickups</SelectItem>
                      <SelectItem value="trailer">Trailers</SelectItem>
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
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>License Plate</TableHead>
                      <TableHead>Mileage</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Next Service</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockVehicles.map((vehicle) => (
                      <TableRow key={vehicle.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            {getVehicleIcon(vehicle.type)}
                            <div>
                              <p className="font-medium">{vehicle.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {vehicle.year} {vehicle.make} {vehicle.model}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {vehicle.type.charAt(0).toUpperCase() +
                              vehicle.type.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            {vehicle.licensePlate}
                          </code>
                        </TableCell>
                        <TableCell>
                          {vehicle.mileage > 0
                            ? `${vehicle.mileage.toLocaleString()} mi`
                            : "N/A"}
                        </TableCell>
                        <TableCell>{vehicle.location}</TableCell>
                        <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
                        <TableCell>{vehicle.nextService}</TableCell>
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
                <CardTitle>Vehicle Maintenance</CardTitle>
                <CardDescription>
                  Schedule and track vehicle maintenance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Wrench className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Vehicle maintenance management coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tracking" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>GPS Tracking</CardTitle>
                <CardDescription>
                  Real-time vehicle location and tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    GPS tracking integration coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Fleet Reports</CardTitle>
                <CardDescription>
                  Generate vehicle utilization and maintenance reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Fleet reporting coming soon
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

export default Vehicles;
