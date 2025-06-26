import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Calendar,
  Clock,
  FileText,
  Award,
  TrendingUp,
  DollarSign,
  Target,
  BookOpen,
  Shield,
} from "lucide-react";

const HRFeatures = () => {
  const hrModules = [
    {
      title: "Employee Management",
      description: "Comprehensive employee records and profiles",
      icon: Users,
      features: [
        "Employee Profiles",
        "Contact Information",
        "Emergency Contacts",
        "Document Storage",
      ],
    },
    {
      title: "Time & Attendance",
      description: "Track work hours and attendance patterns",
      icon: Clock,
      features: [
        "Time Tracking",
        "Attendance Reports",
        "Overtime Management",
        "Schedule Planning",
      ],
    },
    {
      title: "Leave Management",
      description: "Manage vacation, sick leave, and time off requests",
      icon: Calendar,
      features: [
        "Leave Requests",
        "Approval Workflow",
        "Leave Balance",
        "Holiday Calendar",
      ],
    },
    {
      title: "Performance Management",
      description: "Track employee performance and goals",
      icon: TrendingUp,
      features: [
        "Performance Reviews",
        "Goal Setting",
        "360 Feedback",
        "Development Plans",
      ],
    },
    {
      title: "Payroll Management",
      description: "Comprehensive payroll processing and reporting",
      icon: DollarSign,
      features: [
        "Salary Management",
        "Tax Calculations",
        "Direct Deposit",
        "Pay Stubs",
      ],
    },
    {
      title: "Training & Development",
      description: "Employee training programs and certifications",
      icon: BookOpen,
      features: [
        "Training Programs",
        "Certifications",
        "Skill Tracking",
        "Learning Paths",
      ],
    },
    {
      title: "Compliance & Safety",
      description: "Ensure workplace safety and regulatory compliance",
      icon: Shield,
      features: [
        "Safety Training",
        "Incident Reports",
        "Compliance Tracking",
        "Audit Trails",
      ],
    },
    {
      title: "Recruitment",
      description: "Streamline hiring and onboarding processes",
      icon: Target,
      features: [
        "Job Postings",
        "Applicant Tracking",
        "Interview Scheduling",
        "Onboarding",
      ],
    },
  ];

  const hrStats = {
    totalEmployees: 45,
    activeProjects: 12,
    pendingLeaveRequests: 8,
    upcomingReviews: 15,
    trainingCompleted: 32,
    safetyIncidents: 2,
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">HR Features</h1>
            <p className="text-slate-600 mt-2">
              Comprehensive human resources management system
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Users className="w-4 h-4 mr-2" />
            HR Dashboard
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Employees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{hrStats.totalEmployees}</div>
              <p className="text-xs text-muted-foreground">Total staff</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projects</CardTitle>
              <Target className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {hrStats.activeProjects}
              </div>
              <p className="text-xs text-muted-foreground">Active projects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Leave Requests
              </CardTitle>
              <Calendar className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {hrStats.pendingLeaveRequests}
              </div>
              <p className="text-xs text-muted-foreground">Pending approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reviews</CardTitle>
              <Award className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {hrStats.upcomingReviews}
              </div>
              <p className="text-xs text-muted-foreground">Due this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Training</CardTitle>
              <BookOpen className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {hrStats.trainingCompleted}
              </div>
              <p className="text-xs text-muted-foreground">Completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Safety</CardTitle>
              <Shield className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {hrStats.safetyIncidents}
              </div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* HR Modules */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="modules">HR Modules</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Common HR tasks and shortcuts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Add New Employee
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Approve Leave Requests
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Payroll Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Award className="w-4 h-4 mr-2" />
                    Schedule Performance Reviews
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest HR system activities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="text-sm">
                      <span className="font-medium">John Smith</span> completed
                      safety training
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="text-sm">
                      <span className="font-medium">Sarah Johnson</span>{" "}
                      submitted leave request
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="text-sm">
                      Performance review scheduled for{" "}
                      <span className="font-medium">Mike Wilson</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="text-sm">
                      New employee{" "}
                      <span className="font-medium">Lisa Brown</span> onboarded
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="modules" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {hrModules.map((module, index) => {
                const IconComponent = module.icon;
                return (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <IconComponent className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {module.title}
                          </CardTitle>
                        </div>
                      </div>
                      <CardDescription>{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {module.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center space-x-2"
                          >
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            <span className="text-sm text-muted-foreground">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full mt-4" variant="outline">
                        Access Module
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>HR Reports</CardTitle>
                <CardDescription>
                  Generate comprehensive HR reports and analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    HR reporting dashboard coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>HR System Settings</CardTitle>
                <CardDescription>
                  Configure HR system preferences and policies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    HR settings panel coming soon
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

export default HRFeatures;
