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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Search,
  Filter,
  Layers,
  Navigation,
  Maximize,
  Users,
  Building,
  Truck,
  CheckCircle,
  Settings,
  Eye,
  Target,
} from "lucide-react";

interface MapLocation {
  id: string;
  name: string;
  type:
    | "project"
    | "office"
    | "warehouse"
    | "employee"
    | "vehicle"
    | "equipment";
  coordinates: {
    lat: number;
    lng: number;
  };
  address: string;
  status: "active" | "inactive" | "in_progress" | "completed";
  details: {
    description: string;
    manager?: string;
    employees?: number;
    lastUpdate: string;
  };
}

const mockMapLocations: MapLocation[] = [
  {
    id: "loc_001",
    name: "Downtown Office Building",
    type: "project",
    coordinates: { lat: 40.7128, lng: -74.006 },
    address: "123 Construction Ave, New York, NY",
    status: "in_progress",
    details: {
      description: "25-story commercial building construction",
      manager: "John Smith",
      employees: 15,
      lastUpdate: "2024-01-22 14:30:00",
    },
  },
  {
    id: "loc_002",
    name: "Corporate Headquarters",
    type: "office",
    coordinates: { lat: 40.7589, lng: -73.9851 },
    address: "456 Business Blvd, New York, NY",
    status: "active",
    details: {
      description: "Main office and administrative center",
      manager: "Sarah Johnson",
      employees: 45,
      lastUpdate: "2024-01-22 15:00:00",
    },
  },
  {
    id: "loc_003",
    name: "Equipment Warehouse",
    type: "warehouse",
    coordinates: { lat: 40.7505, lng: -73.9934 },
    address: "789 Storage Way, Brooklyn, NY",
    status: "active",
    details: {
      description: "Main equipment storage and maintenance facility",
      manager: "Mike Wilson",
      employees: 8,
      lastUpdate: "2024-01-22 13:45:00",
    },
  },
  {
    id: "loc_004",
    name: "Residential Complex A",
    type: "project",
    coordinates: { lat: 40.7282, lng: -73.7949 },
    address: "321 Residential Blvd, Queens, NY",
    status: "in_progress",
    details: {
      description: "150-unit residential complex development",
      manager: "Lisa Davis",
      employees: 22,
      lastUpdate: "2024-01-22 12:20:00",
    },
  },
  {
    id: "loc_005",
    name: "Highway Bridge Project",
    type: "project",
    coordinates: { lat: 40.6892, lng: -74.0445 },
    address: "Highway 95 Bridge, Staten Island, NY",
    status: "completed",
    details: {
      description: "Bridge renovation and safety upgrades",
      manager: "Robert Chen",
      employees: 0,
      lastUpdate: "2024-01-20 16:00:00",
    },
  },
];

const MapView = () => {
  const getTypeBadge = (type: string) => {
    switch (type) {
      case "project":
        return <Badge className="bg-blue-100 text-blue-800">Project</Badge>;
      case "office":
        return <Badge className="bg-green-100 text-green-800">Office</Badge>;
      case "warehouse":
        return (
          <Badge className="bg-purple-100 text-purple-800">Warehouse</Badge>
        );
      case "employee":
        return (
          <Badge className="bg-orange-100 text-orange-800">Employee</Badge>
        );
      case "vehicle":
        return <Badge className="bg-cyan-100 text-cyan-800">Vehicle</Badge>;
      case "equipment":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Equipment</Badge>
        );
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "project":
        return <Building className="w-4 h-4 text-blue-600" />;
      case "office":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "warehouse":
        return <Settings className="w-4 h-4 text-purple-600" />;
      case "employee":
        return <Users className="w-4 h-4 text-orange-600" />;
      case "vehicle":
        return <Truck className="w-4 h-4 text-cyan-600" />;
      case "equipment":
        return <Target className="w-4 h-4 text-yellow-600" />;
      default:
        return <MapPin className="w-4 h-4 text-gray-600" />;
    }
  };

  const totalLocations = mockMapLocations.length;
  const activeProjects = mockMapLocations.filter(
    (loc) => loc.type === "project" && loc.status === "in_progress",
  ).length;
  const totalEmployees = mockMapLocations.reduce(
    (sum, loc) => sum + (loc.details.employees || 0),
    0,
  );
  const completedProjects = mockMapLocations.filter(
    (loc) => loc.type === "project" && loc.status === "completed",
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Map View</h1>
            <p className="text-slate-600 mt-2">
              Geographic visualization of projects, locations, and resources
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Layers className="w-4 h-4 mr-2" />
              Layers
            </Button>
            <Button variant="outline">
              <Maximize className="w-4 h-4 mr-2" />
              Fullscreen
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Navigation className="w-4 h-4 mr-2" />
              Get Directions
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Locations
              </CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLocations}</div>
              <p className="text-xs text-muted-foreground">Mapped locations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Projects
              </CardTitle>
              <Building className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {activeProjects}
              </div>
              <p className="text-xs text-muted-foreground">In progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Employees
              </CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {totalEmployees}
              </div>
              <p className="text-xs text-muted-foreground">Across all sites</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {completedProjects}
              </div>
              <p className="text-xs text-muted-foreground">Finished projects</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Interactive Map</CardTitle>
                    <CardDescription>
                      Real-time view of all locations and activities
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Select>
                      <SelectTrigger className="w-32">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="projects">Projects</SelectItem>
                        <SelectItem value="offices">Offices</SelectItem>
                        <SelectItem value="warehouses">Warehouses</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Placeholder for interactive map */}
                <div className="w-full h-96 bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
                  <div className="text-center space-y-4">
                    <MapPin className="w-16 h-16 text-slate-400 mx-auto" />
                    <div>
                      <p className="text-lg font-medium text-slate-600">
                        Interactive Map Integration
                      </p>
                      <p className="text-sm text-slate-500">
                        Google Maps or Mapbox integration coming soon
                      </p>
                    </div>
                    <div className="flex justify-center space-x-4 mt-4">
                      {mockMapLocations.slice(0, 3).map((location, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg shadow-sm border"
                        >
                          {getTypeIcon(location.type)}
                          <span className="text-xs font-medium">
                            {location.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Location List */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Locations</CardTitle>
                <CardDescription>
                  All mapped locations and their details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search locations..."
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {mockMapLocations.map((location) => (
                    <div
                      key={location.id}
                      className="p-3 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(location.type)}
                          <div>
                            <p className="font-medium text-sm">
                              {location.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {location.address}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          {getTypeBadge(location.type)}
                          {getStatusBadge(location.status)}
                        </div>
                        {location.details.employees && (
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Users className="w-3 h-3" />
                            <span>{location.details.employees}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {location.details.description}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-muted-foreground">
                          Manager: {location.details.manager || "N/A"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(
                            location.details.lastUpdate,
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Controls and Filters */}
        <Tabs defaultValue="layers" className="space-y-4">
          <TabsList>
            <TabsTrigger value="layers">Map Layers</TabsTrigger>
            <TabsTrigger value="filters">Filters</TabsTrigger>
            <TabsTrigger value="analytics">Location Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="layers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Map Layer Controls</CardTitle>
                <CardDescription>
                  Toggle different data layers on the map
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="projects"
                      defaultChecked
                      className="rounded"
                    />
                    <label htmlFor="projects" className="text-sm font-medium">
                      Projects
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="offices"
                      defaultChecked
                      className="rounded"
                    />
                    <label htmlFor="offices" className="text-sm font-medium">
                      Offices
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="warehouses"
                      defaultChecked
                      className="rounded"
                    />
                    <label htmlFor="warehouses" className="text-sm font-medium">
                      Warehouses
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="employees" className="rounded" />
                    <label htmlFor="employees" className="text-sm font-medium">
                      Employees
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="vehicles" className="rounded" />
                    <label htmlFor="vehicles" className="text-sm font-medium">
                      Vehicles
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="equipment" className="rounded" />
                    <label htmlFor="equipment" className="text-sm font-medium">
                      Equipment
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="traffic" className="rounded" />
                    <label htmlFor="traffic" className="text-sm font-medium">
                      Traffic
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="weather" className="rounded" />
                    <label htmlFor="weather" className="text-sm font-medium">
                      Weather
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="filters" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Filters</CardTitle>
                <CardDescription>
                  Filter locations by various criteria
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Status
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Type
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="project">Projects</SelectItem>
                        <SelectItem value="office">Offices</SelectItem>
                        <SelectItem value="warehouse">Warehouses</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Manager
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All Managers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Managers</SelectItem>
                        <SelectItem value="john">John Smith</SelectItem>
                        <SelectItem value="sarah">Sarah Johnson</SelectItem>
                        <SelectItem value="mike">Mike Wilson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Location Analytics</CardTitle>
                <CardDescription>
                  Geographic insights and location-based metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Location analytics and insights coming soon
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

export default MapView;
