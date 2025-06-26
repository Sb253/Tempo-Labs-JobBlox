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
  Building,
  Users,
  Settings,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Clock,
  Navigation,
  Trash2,
  Star,
} from "lucide-react";

interface Location {
  id: string;
  name: string;
  type: "office" | "warehouse" | "construction_site" | "client_site" | "branch";
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  status: "active" | "inactive" | "under_construction" | "closed";
  manager: string;
  employeeCount: number;
  establishedDate: string;
  operatingHours: {
    start: string;
    end: string;
    days: string[];
  };
  contactInfo: {
    phone: string;
    email: string;
  };
  facilities: string[];
  isHeadquarters: boolean;
}

const mockLocations: Location[] = [
  {
    id: "loc_001",
    name: "Corporate Headquarters",
    type: "office",
    address: {
      street: "123 Business Plaza",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    coordinates: {
      lat: 40.7128,
      lng: -74.006,
    },
    status: "active",
    manager: "Sarah Johnson",
    employeeCount: 45,
    establishedDate: "2020-01-15",
    operatingHours: {
      start: "08:00",
      end: "18:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
    contactInfo: {
      phone: "(555) 123-4567",
      email: "headquarters@company.com",
    },
    facilities: ["Conference Rooms", "Parking", "Cafeteria", "IT Support"],
    isHeadquarters: true,
  },
  {
    id: "loc_002",
    name: "Downtown Construction Site",
    type: "construction_site",
    address: {
      street: "456 Construction Ave",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      country: "USA",
    },
    coordinates: {
      lat: 40.7589,
      lng: -73.9851,
    },
    status: "active",
    manager: "Mike Wilson",
    employeeCount: 25,
    establishedDate: "2023-06-01",
    operatingHours: {
      start: "07:00",
      end: "17:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
    contactInfo: {
      phone: "(555) 234-5678",
      email: "downtown.site@company.com",
    },
    facilities: ["Tool Storage", "Safety Equipment", "First Aid Station"],
    isHeadquarters: false,
  },
  {
    id: "loc_003",
    name: "Equipment Warehouse",
    type: "warehouse",
    address: {
      street: "789 Storage Way",
      city: "Brooklyn",
      state: "NY",
      zipCode: "11201",
      country: "USA",
    },
    coordinates: {
      lat: 40.7505,
      lng: -73.9934,
    },
    status: "active",
    manager: "John Smith",
    employeeCount: 12,
    establishedDate: "2021-03-10",
    operatingHours: {
      start: "06:00",
      end: "16:00",
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
    contactInfo: {
      phone: "(555) 345-6789",
      email: "warehouse@company.com",
    },
    facilities: ["Loading Dock", "Crane", "Security System", "Climate Control"],
    isHeadquarters: false,
  },
  {
    id: "loc_004",
    name: "Client Site - Residential Complex",
    type: "client_site",
    address: {
      street: "321 Residential Blvd",
      city: "Queens",
      state: "NY",
      zipCode: "11375",
      country: "USA",
    },
    coordinates: {
      lat: 40.7282,
      lng: -73.7949,
    },
    status: "under_construction",
    manager: "Lisa Davis",
    employeeCount: 18,
    establishedDate: "2024-01-05",
    operatingHours: {
      start: "07:30",
      end: "16:30",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
    contactInfo: {
      phone: "(555) 456-7890",
      email: "residential.site@company.com",
    },
    facilities: ["Temporary Office", "Material Storage", "Portable Restrooms"],
    isHeadquarters: false,
  },
];

const LocationManagement = () => {
  const getTypeBadge = (type: string) => {
    switch (type) {
      case "office":
        return <Badge className="bg-blue-100 text-blue-800">Office</Badge>;
      case "warehouse":
        return (
          <Badge className="bg-purple-100 text-purple-800">Warehouse</Badge>
        );
      case "construction_site":
        return (
          <Badge className="bg-orange-100 text-orange-800">
            Construction Site
          </Badge>
        );
      case "client_site":
        return (
          <Badge className="bg-green-100 text-green-800">Client Site</Badge>
        );
      case "branch":
        return <Badge className="bg-cyan-100 text-cyan-800">Branch</Badge>;
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
      case "under_construction":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            Under Construction
          </Badge>
        );
      case "closed":
        return <Badge className="bg-red-100 text-red-800">Closed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "office":
        return <Building className="w-4 h-4 text-blue-600" />;
      case "warehouse":
        return <Settings className="w-4 h-4 text-purple-600" />;
      case "construction_site":
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case "client_site":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "branch":
        return <Navigation className="w-4 h-4 text-cyan-600" />;
      default:
        return <MapPin className="w-4 h-4 text-gray-600" />;
    }
  };

  const totalLocations = mockLocations.length;
  const activeLocations = mockLocations.filter(
    (loc) => loc.status === "active",
  ).length;
  const totalEmployees = mockLocations.reduce(
    (sum, loc) => sum + loc.employeeCount,
    0,
  );
  const constructionSites = mockLocations.filter(
    (loc) => loc.type === "construction_site" || loc.type === "client_site",
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Location Management
            </h1>
            <p className="text-slate-600 mt-2">
              Manage all company locations, sites, and facilities
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Location Reports
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Location
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
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLocations}</div>
              <p className="text-xs text-muted-foreground">All facilities</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Sites
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {activeLocations}
              </div>
              <p className="text-xs text-muted-foreground">Operational</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Employees
              </CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {totalEmployees}
              </div>
              <p className="text-xs text-muted-foreground">Across all sites</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Construction Sites
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {constructionSites}
              </div>
              <p className="text-xs text-muted-foreground">Active projects</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="locations">All Locations</TabsTrigger>
            <TabsTrigger value="facilities">Facilities</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Location Status</CardTitle>
                  <CardDescription>
                    Current status of all company locations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockLocations.map((location) => (
                    <div
                      key={location.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        {location.isHeadquarters && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                        {getTypeIcon(location.type)}
                        <div>
                          <p className="font-medium">{location.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {location.address.city}, {location.address.state} •{" "}
                            {location.employeeCount} employees
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(location.status)}
                        <p className="text-xs text-muted-foreground mt-1">
                          {location.manager}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Updates</CardTitle>
                  <CardDescription>
                    Latest location updates and changes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockLocations
                    .sort(
                      (a, b) =>
                        new Date(b.establishedDate).getTime() -
                        new Date(a.establishedDate).getTime(),
                    )
                    .map((location) => (
                      <div
                        key={location.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <div>
                            <p className="font-medium">{location.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Established:{" "}
                              {new Date(
                                location.establishedDate,
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          {getTypeBadge(location.type)}
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="locations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Locations</CardTitle>
                <CardDescription>
                  Complete directory of company locations and facilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search locations..."
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
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="warehouse">Warehouse</SelectItem>
                      <SelectItem value="construction_site">
                        Construction Site
                      </SelectItem>
                      <SelectItem value="client_site">Client Site</SelectItem>
                      <SelectItem value="branch">Branch</SelectItem>
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
                      <SelectItem value="under_construction">
                        Under Construction
                      </SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Manager</TableHead>
                      <TableHead>Employees</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockLocations.map((location) => (
                      <TableRow key={location.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {location.isHeadquarters && (
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            )}
                            <div>
                              <p className="font-medium">{location.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Est.{" "}
                                {new Date(
                                  location.establishedDate,
                                ).getFullYear()}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getTypeBadge(location.type)}</TableCell>
                        <TableCell>
                          <div className="max-w-xs">
                            <p className="text-sm">{location.address.street}</p>
                            <p className="text-xs text-muted-foreground">
                              {location.address.city}, {location.address.state}{" "}
                              {location.address.zipCode}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{location.manager}</p>
                            <p className="text-xs text-muted-foreground">
                              {location.contactInfo.phone}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span>{location.employeeCount}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(location.status)}</TableCell>
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

          <TabsContent value="facilities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Facility Management</CardTitle>
                <CardDescription>
                  Manage facilities and amenities at each location
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Facility management features coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Location Map</CardTitle>
                <CardDescription>
                  Interactive map showing all company locations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Interactive location map coming soon
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

export default LocationManagement;
