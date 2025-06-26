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
  Users,
  Clock,
  Navigation,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  User,
} from "lucide-react";

interface EmployeeLocation {
  id: string;
  employeeName: string;
  employeeId: string;
  position: string;
  currentLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  status: "on_site" | "traveling" | "off_duty" | "break";
  assignedSite: string;
  lastUpdate: string;
  workingHours: {
    start: string;
    end: string;
  };
  phoneNumber: string;
}

const mockEmployeeLocations: EmployeeLocation[] = [
  {
    id: "emp_001",
    employeeName: "John Smith",
    employeeId: "EMP001",
    position: "Site Supervisor",
    currentLocation: {
      lat: 40.7128,
      lng: -74.006,
      address: "123 Construction Ave, New York, NY",
    },
    status: "on_site",
    assignedSite: "Downtown Office Building",
    lastUpdate: "2024-01-22 14:30:00",
    workingHours: {
      start: "07:00",
      end: "16:00",
    },
    phoneNumber: "(555) 123-4567",
  },
  {
    id: "emp_002",
    employeeName: "Sarah Johnson",
    employeeId: "EMP002",
    position: "Project Manager",
    currentLocation: {
      lat: 40.7589,
      lng: -73.9851,
      address: "456 Business Blvd, New York, NY",
    },
    status: "traveling",
    assignedSite: "Residential Complex A",
    lastUpdate: "2024-01-22 14:25:00",
    workingHours: {
      start: "08:00",
      end: "17:00",
    },
    phoneNumber: "(555) 234-5678",
  },
  {
    id: "emp_003",
    employeeName: "Mike Wilson",
    employeeId: "EMP003",
    position: "Field Worker",
    currentLocation: {
      lat: 40.7505,
      lng: -73.9934,
      address: "789 Work Site Rd, New York, NY",
    },
    status: "break",
    assignedSite: "Highway Bridge Project",
    lastUpdate: "2024-01-22 14:15:00",
    workingHours: {
      start: "06:00",
      end: "15:00",
    },
    phoneNumber: "(555) 345-6789",
  },
];

const EmployeeLocations = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "on_site":
        return <Badge className="bg-green-100 text-green-800">On Site</Badge>;
      case "traveling":
        return <Badge className="bg-blue-100 text-blue-800">Traveling</Badge>;
      case "break":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">On Break</Badge>
        );
      case "off_duty":
        return <Badge className="bg-gray-100 text-gray-800">Off Duty</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on_site":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "traveling":
        return <Navigation className="w-4 h-4 text-blue-600" />;
      case "break":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "off_duty":
        return <AlertTriangle className="w-4 h-4 text-gray-600" />;
      default:
        return <User className="w-4 h-4 text-gray-600" />;
    }
  };

  const totalEmployees = mockEmployeeLocations.length;
  const onSiteEmployees = mockEmployeeLocations.filter(
    (emp) => emp.status === "on_site",
  ).length;
  const travelingEmployees = mockEmployeeLocations.filter(
    (emp) => emp.status === "traveling",
  ).length;
  const onBreakEmployees = mockEmployeeLocations.filter(
    (emp) => emp.status === "break",
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Employee Locations
            </h1>
            <p className="text-slate-600 mt-2">
              Track real-time employee locations and work status
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Location Reports
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Employees
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEmployees}</div>
              <p className="text-xs text-muted-foreground">Active employees</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On Site</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {onSiteEmployees}
              </div>
              <p className="text-xs text-muted-foreground">Working on site</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Traveling</CardTitle>
              <Navigation className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {travelingEmployees}
              </div>
              <p className="text-xs text-muted-foreground">En route</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On Break</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {onBreakEmployees}
              </div>
              <p className="text-xs text-muted-foreground">Taking break</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="employees">All Employees</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Employee Status</CardTitle>
                  <CardDescription>
                    Current status and location of all employees
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockEmployeeLocations.map((employee) => (
                    <div
                      key={employee.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(employee.status)}
                        <div>
                          <p className="font-medium">{employee.employeeName}</p>
                          <p className="text-sm text-muted-foreground">
                            {employee.position} • {employee.assignedSite}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(employee.status)}
                        <p className="text-xs text-muted-foreground mt-1">
                          Updated:{" "}
                          {new Date(employee.lastUpdate).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest employee location updates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockEmployeeLocations
                    .sort(
                      (a, b) =>
                        new Date(b.lastUpdate).getTime() -
                        new Date(a.lastUpdate).getTime(),
                    )
                    .map((employee) => (
                      <div
                        key={employee.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          <div>
                            <p className="font-medium">
                              {employee.employeeName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {employee.currentLocation.address}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {new Date(employee.lastUpdate).toLocaleTimeString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(employee.lastUpdate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="employees" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Employee Directory</CardTitle>
                <CardDescription>
                  Complete list of all employees with location data
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search employees..."
                      className="pl-10"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-48">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="on_site">On Site</SelectItem>
                      <SelectItem value="traveling">Traveling</SelectItem>
                      <SelectItem value="break">On Break</SelectItem>
                      <SelectItem value="off_duty">Off Duty</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Positions</SelectItem>
                      <SelectItem value="supervisor">Supervisor</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="worker">Field Worker</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Current Location</TableHead>
                      <TableHead>Assigned Site</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Update</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockEmployeeLocations.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium">
                              {employee.employeeName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              ID: {employee.employeeId}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{employee.position}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs">
                            <p className="text-sm truncate">
                              {employee.currentLocation.address}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{employee.assignedSite}</TableCell>
                        <TableCell>{getStatusBadge(employee.status)}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-sm">
                              {new Date(
                                employee.lastUpdate,
                              ).toLocaleTimeString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(
                                employee.lastUpdate,
                              ).toLocaleDateString()}
                            </p>
                          </div>
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

          <TabsContent value="map" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Employee Location Map</CardTitle>
                <CardDescription>
                  Interactive map showing real-time employee locations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Interactive map integration coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Location Reports</CardTitle>
                <CardDescription>
                  Generate employee location and attendance reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Location reporting coming soon
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

export default EmployeeLocations;
