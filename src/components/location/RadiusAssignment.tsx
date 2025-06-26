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
  MapPin,
  Circle,
  Users,
  Settings,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Target,
  Trash2,
} from "lucide-react";

interface RadiusZone {
  id: string;
  name: string;
  centerLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  radius: number; // in meters
  type: "work_site" | "office" | "warehouse" | "restricted" | "break_area";
  status: "active" | "inactive" | "pending";
  assignedEmployees: string[];
  createdDate: string;
  description: string;
  workingHours?: {
    start: string;
    end: string;
  };
  notifications: boolean;
}

const mockRadiusZones: RadiusZone[] = [
  {
    id: "zone_001",
    name: "Downtown Construction Site",
    centerLocation: {
      lat: 40.7128,
      lng: -74.006,
      address: "123 Construction Ave, New York, NY",
    },
    radius: 100,
    type: "work_site",
    status: "active",
    assignedEmployees: ["EMP001", "EMP003", "EMP005"],
    createdDate: "2024-01-15",
    description: "Main construction site for downtown office building",
    workingHours: {
      start: "07:00",
      end: "17:00",
    },
    notifications: true,
  },
  {
    id: "zone_002",
    name: "Main Office Building",
    centerLocation: {
      lat: 40.7589,
      lng: -73.9851,
      address: "456 Business Blvd, New York, NY",
    },
    radius: 50,
    type: "office",
    status: "active",
    assignedEmployees: ["EMP002", "EMP004"],
    createdDate: "2024-01-10",
    description: "Corporate headquarters and administrative offices",
    workingHours: {
      start: "08:00",
      end: "18:00",
    },
    notifications: true,
  },
  {
    id: "zone_003",
    name: "Equipment Warehouse",
    centerLocation: {
      lat: 40.7505,
      lng: -73.9934,
      address: "789 Storage Way, New York, NY",
    },
    radius: 75,
    type: "warehouse",
    status: "active",
    assignedEmployees: ["EMP006", "EMP007"],
    createdDate: "2024-01-08",
    description: "Main equipment storage and maintenance facility",
    workingHours: {
      start: "06:00",
      end: "16:00",
    },
    notifications: false,
  },
  {
    id: "zone_004",
    name: "Restricted Area - Site B",
    centerLocation: {
      lat: 40.7282,
      lng: -74.0776,
      address: "321 Danger Zone Rd, New York, NY",
    },
    radius: 200,
    type: "restricted",
    status: "pending",
    assignedEmployees: [],
    createdDate: "2024-01-20",
    description: "High-risk construction area with safety restrictions",
    notifications: true,
  },
];

const RadiusAssignment = () => {
  const getTypeBadge = (type: string) => {
    switch (type) {
      case "work_site":
        return <Badge className="bg-blue-100 text-blue-800">Work Site</Badge>;
      case "office":
        return <Badge className="bg-green-100 text-green-800">Office</Badge>;
      case "warehouse":
        return (
          <Badge className="bg-purple-100 text-purple-800">Warehouse</Badge>
        );
      case "restricted":
        return <Badge className="bg-red-100 text-red-800">Restricted</Badge>;
      case "break_area":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Break Area</Badge>
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
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "work_site":
        return <Settings className="w-4 h-4 text-blue-600" />;
      case "office":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "warehouse":
        return <Target className="w-4 h-4 text-purple-600" />;
      case "restricted":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case "break_area":
        return <Circle className="w-4 h-4 text-yellow-600" />;
      default:
        return <MapPin className="w-4 h-4 text-gray-600" />;
    }
  };

  const totalZones = mockRadiusZones.length;
  const activeZones = mockRadiusZones.filter(
    (zone) => zone.status === "active",
  ).length;
  const totalEmployees = mockRadiusZones.reduce(
    (sum, zone) => sum + zone.assignedEmployees.length,
    0,
  );
  const restrictedZones = mockRadiusZones.filter(
    (zone) => zone.type === "restricted",
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Radius Assignment
            </h1>
            <p className="text-slate-600 mt-2">
              Manage geofenced zones and employee assignments
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Zone Reports
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Zone
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Zones</CardTitle>
              <Circle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalZones}</div>
              <p className="text-xs text-muted-foreground">Geofenced areas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Zones
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {activeZones}
              </div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Assigned Employees
              </CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {totalEmployees}
              </div>
              <p className="text-xs text-muted-foreground">Total assignments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Restricted Zones
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {restrictedZones}
              </div>
              <p className="text-xs text-muted-foreground">Safety zones</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="zones">All Zones</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Zone Status</CardTitle>
                  <CardDescription>
                    Current status of all geofenced zones
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockRadiusZones.map((zone) => (
                    <div
                      key={zone.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        {getTypeIcon(zone.type)}
                        <div>
                          <p className="font-medium">{zone.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {zone.radius}m radius •{" "}
                            {zone.assignedEmployees.length} employees
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(zone.status)}
                        {getTypeBadge(zone.type)}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest zone updates and assignments
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockRadiusZones
                    .sort(
                      (a, b) =>
                        new Date(b.createdDate).getTime() -
                        new Date(a.createdDate).getTime(),
                    )
                    .map((zone) => (
                      <div
                        key={zone.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          <div>
                            <p className="font-medium">{zone.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Created:{" "}
                              {new Date(zone.createdDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {zone.assignedEmployees.length} assigned
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {zone.radius}m radius
                          </p>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="zones" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Geofenced Zones</CardTitle>
                <CardDescription>
                  Complete list of all radius zones and their settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search zones..." className="pl-10" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-48">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="work_site">Work Site</SelectItem>
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="warehouse">Warehouse</SelectItem>
                      <SelectItem value="restricted">Restricted</SelectItem>
                      <SelectItem value="break_area">Break Area</SelectItem>
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
                      <TableHead>Zone Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Radius</TableHead>
                      <TableHead>Employees</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRadiusZones.map((zone) => (
                      <TableRow key={zone.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium">{zone.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {zone.description}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{getTypeBadge(zone.type)}</TableCell>
                        <TableCell>
                          <div className="max-w-xs">
                            <p className="text-sm truncate">
                              {zone.centerLocation.address}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{zone.radius}m</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span>{zone.assignedEmployees.length}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(zone.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
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

          <TabsContent value="assignments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Employee Assignments</CardTitle>
                <CardDescription>
                  Manage employee assignments to geofenced zones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Employee assignment management coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Zone Map View</CardTitle>
                <CardDescription>
                  Interactive map showing all geofenced zones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Interactive zone map coming soon
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

export default RadiusAssignment;
