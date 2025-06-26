import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Users,
  Settings,
  Save,
} from "lucide-react";

interface CompanyInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  employeeCount: number;
  businessType: string;
  taxId: string;
  licenseNumber: string;
}

const CompanySettings = () => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: "ABC Construction Co.",
    address: "123 Main Street",
    city: "Springfield",
    state: "IL",
    zipCode: "62701",
    phone: "(555) 123-4567",
    email: "info@abcconstruction.com",
    website: "www.abcconstruction.com",
    description:
      "Full-service construction company specializing in residential and commercial projects.",
    employeeCount: 25,
    businessType: "General Contractor",
    taxId: "12-3456789",
    licenseNumber: "GC-2024-001",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    projectUpdates: true,
    invoiceReminders: true,
    systemMaintenance: true,
  });

  const [businessSettings, setBusinessSettings] = useState({
    workingHours: "8:00 AM - 6:00 PM",
    workingDays: "Monday - Friday",
    timeZone: "Central Time (CT)",
    currency: "USD",
    dateFormat: "MM/DD/YYYY",
    measurementUnit: "Imperial",
  });

  const handleSave = () => {
    console.log("Saving company settings...", {
      companyInfo,
      notifications,
      businessSettings,
    });
    // Here you would typically save to your backend
  };

  const handleInputChange = (
    field: keyof CompanyInfo,
    value: string | number,
  ) => {
    setCompanyInfo((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
              <Settings className="h-8 w-8 text-blue-600" />
              Company Settings
            </h1>
            <p className="text-slate-600 mt-1">
              Manage your company information and preferences
            </p>
          </div>
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              Company Information
            </CardTitle>
            <CardDescription>
              Basic information about your construction company
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={companyInfo.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter company name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type</Label>
                <Input
                  id="businessType"
                  value={companyInfo.businessType}
                  onChange={(e) =>
                    handleInputChange("businessType", e.target.value)
                  }
                  placeholder="e.g., General Contractor"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={companyInfo.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Street address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={companyInfo.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="City"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={companyInfo.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  placeholder="State"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={companyInfo.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  placeholder="ZIP Code"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={companyInfo.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={companyInfo.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="company@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={companyInfo.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                placeholder="www.yourcompany.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Company Description</Label>
              <Textarea
                id="description"
                value={companyInfo.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Brief description of your company"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employeeCount">Employee Count</Label>
                <Input
                  id="employeeCount"
                  type="number"
                  value={companyInfo.employeeCount}
                  onChange={(e) =>
                    handleInputChange(
                      "employeeCount",
                      parseInt(e.target.value) || 0,
                    )
                  }
                  placeholder="25"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxId">Tax ID</Label>
                <Input
                  id="taxId"
                  value={companyInfo.taxId}
                  onChange={(e) => handleInputChange("taxId", e.target.value)}
                  placeholder="12-3456789"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">License Number</Label>
                <Input
                  id="licenseNumber"
                  value={companyInfo.licenseNumber}
                  onChange={(e) =>
                    handleInputChange("licenseNumber", e.target.value)
                  }
                  placeholder="GC-2024-001"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-green-600" />
              Business Settings
            </CardTitle>
            <CardDescription>
              Configure your business operations and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Working Hours</Label>
                <Input
                  value={businessSettings.workingHours}
                  onChange={(e) =>
                    setBusinessSettings((prev) => ({
                      ...prev,
                      workingHours: e.target.value,
                    }))
                  }
                  placeholder="8:00 AM - 6:00 PM"
                />
              </div>
              <div className="space-y-2">
                <Label>Working Days</Label>
                <Input
                  value={businessSettings.workingDays}
                  onChange={(e) =>
                    setBusinessSettings((prev) => ({
                      ...prev,
                      workingDays: e.target.value,
                    }))
                  }
                  placeholder="Monday - Friday"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Time Zone</Label>
                <Input
                  value={businessSettings.timeZone}
                  onChange={(e) =>
                    setBusinessSettings((prev) => ({
                      ...prev,
                      timeZone: e.target.value,
                    }))
                  }
                  placeholder="Central Time (CT)"
                />
              </div>
              <div className="space-y-2">
                <Label>Currency</Label>
                <Input
                  value={businessSettings.currency}
                  onChange={(e) =>
                    setBusinessSettings((prev) => ({
                      ...prev,
                      currency: e.target.value,
                    }))
                  }
                  placeholder="USD"
                />
              </div>
              <div className="space-y-2">
                <Label>Date Format</Label>
                <Input
                  value={businessSettings.dateFormat}
                  onChange={(e) =>
                    setBusinessSettings((prev) => ({
                      ...prev,
                      dateFormat: e.target.value,
                    }))
                  }
                  placeholder="MM/DD/YYYY"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-purple-600" />
              Notification Settings
            </CardTitle>
            <CardDescription>
              Manage how you receive notifications and updates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-slate-600">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({
                      ...prev,
                      emailNotifications: checked,
                    }))
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-slate-600">
                    Receive notifications via text message
                  </p>
                </div>
                <Switch
                  checked={notifications.smsNotifications}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({
                      ...prev,
                      smsNotifications: checked,
                    }))
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Project Updates</Label>
                  <p className="text-sm text-slate-600">
                    Get notified about project status changes
                  </p>
                </div>
                <Switch
                  checked={notifications.projectUpdates}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({
                      ...prev,
                      projectUpdates: checked,
                    }))
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Invoice Reminders</Label>
                  <p className="text-sm text-slate-600">
                    Receive reminders for overdue invoices
                  </p>
                </div>
                <Switch
                  checked={notifications.invoiceReminders}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({
                      ...prev,
                      invoiceReminders: checked,
                    }))
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-orange-600" />
              Company Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {companyInfo.employeeCount}
                </div>
                <div className="text-sm text-slate-600">Employees</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">15</div>
                <div className="text-sm text-slate-600">Active Projects</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">3</div>
                <div className="text-sm text-slate-600">Locations</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">8</div>
                <div className="text-sm text-slate-600">Years in Business</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanySettings;
