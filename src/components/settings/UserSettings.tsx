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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Bell,
  Eye,
  Lock,
  Save,
  Camera,
} from "lucide-react";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  department: string;
  location: string;
  bio: string;
  avatar: string;
  employeeId: string;
  startDate: string;
  role: string;
}

interface UserPreferences {
  theme: string;
  language: string;
  timezone: string;
  dateFormat: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    projectUpdates: boolean;
    taskAssignments: boolean;
    deadlineReminders: boolean;
    teamMessages: boolean;
  };
  privacy: {
    profileVisibility: string;
    showEmail: boolean;
    showPhone: boolean;
    showLocation: boolean;
  };
}

const UserSettings = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@abcconstruction.com",
    phone: "(555) 987-6543",
    jobTitle: "Project Manager",
    department: "Construction",
    location: "Springfield, IL",
    bio: "Experienced project manager with 10+ years in construction management. Specializes in residential and commercial projects.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    employeeId: "EMP-001",
    startDate: "2020-03-15",
    role: "Manager",
  });

  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: "dark",
    language: "en",
    timezone: "America/Chicago",
    dateFormat: "MM/DD/YYYY",
    notifications: {
      email: true,
      push: true,
      sms: false,
      projectUpdates: true,
      taskAssignments: true,
      deadlineReminders: true,
      teamMessages: true,
    },
    privacy: {
      profileVisibility: "team",
      showEmail: true,
      showPhone: false,
      showLocation: true,
    },
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSave = () => {
    console.log("Saving user settings...", { userProfile, preferences });
    // Here you would typically save to your backend
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    console.log("Changing password...");
    // Here you would handle password change
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleProfileChange = (field: keyof UserProfile, value: string) => {
    setUserProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (
    field: keyof UserPreferences["notifications"],
    value: boolean,
  ) => {
    setPreferences((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [field]: value },
    }));
  };

  const handlePrivacyChange = (
    field: keyof UserPreferences["privacy"],
    value: string | boolean,
  ) => {
    setPreferences((prev) => ({
      ...prev,
      privacy: { ...prev.privacy, [field]: value },
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
              <User className="h-8 w-8 text-blue-600" />
              User Settings
            </h1>
            <p className="text-slate-600 mt-1">
              Manage your profile and account preferences
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

        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Update your personal information and profile details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={userProfile.avatar}
                  alt={`${userProfile.firstName} ${userProfile.lastName}`}
                />
                <AvatarFallback className="text-lg">
                  {userProfile.firstName[0]}
                  {userProfile.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button variant="outline" size="sm">
                  <Camera className="h-4 w-4 mr-2" />
                  Change Photo
                </Button>
                <p className="text-sm text-slate-600">
                  JPG, PNG or GIF. Max size 2MB.
                </p>
              </div>
            </div>

            <Separator />

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={userProfile.firstName}
                  onChange={(e) =>
                    handleProfileChange("firstName", e.target.value)
                  }
                  placeholder="Enter first name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={userProfile.lastName}
                  onChange={(e) =>
                    handleProfileChange("lastName", e.target.value)
                  }
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={userProfile.email}
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                  placeholder="Enter email address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={userProfile.phone}
                  onChange={(e) => handleProfileChange("phone", e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  value={userProfile.jobTitle}
                  onChange={(e) =>
                    handleProfileChange("jobTitle", e.target.value)
                  }
                  placeholder="Enter job title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={userProfile.department}
                  onChange={(e) =>
                    handleProfileChange("department", e.target.value)
                  }
                  placeholder="Enter department"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={userProfile.location}
                onChange={(e) =>
                  handleProfileChange("location", e.target.value)
                }
                placeholder="Enter location"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={userProfile.bio}
                onChange={(e) => handleProfileChange("bio", e.target.value)}
                placeholder="Tell us about yourself"
                rows={3}
              />
            </div>

            {/* Employee Information */}
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Employee ID</Label>
                <Input
                  value={userProfile.employeeId}
                  disabled
                  className="bg-slate-100"
                />
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  value={userProfile.startDate}
                  disabled
                  className="bg-slate-100"
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Badge variant="secondary" className="w-fit">
                  <Shield className="h-3 w-3 mr-1" />
                  {userProfile.role}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-green-600" />
              Preferences
            </CardTitle>
            <CardDescription>
              Customize your application experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <Select
                  value={preferences.theme}
                  onValueChange={(value) =>
                    setPreferences((prev) => ({ ...prev, theme: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Language</Label>
                <Select
                  value={preferences.language}
                  onValueChange={(value) =>
                    setPreferences((prev) => ({ ...prev, language: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Timezone</Label>
                <Select
                  value={preferences.timezone}
                  onValueChange={(value) =>
                    setPreferences((prev) => ({ ...prev, timezone: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/Chicago">
                      Central Time
                    </SelectItem>
                    <SelectItem value="America/New_York">
                      Eastern Time
                    </SelectItem>
                    <SelectItem value="America/Los_Angeles">
                      Pacific Time
                    </SelectItem>
                    <SelectItem value="America/Denver">
                      Mountain Time
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date Format</Label>
                <Select
                  value={preferences.dateFormat}
                  onValueChange={(value) =>
                    setPreferences((prev) => ({ ...prev, dateFormat: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-purple-600" />
              Notification Settings
            </CardTitle>
            <CardDescription>
              Choose how you want to be notified about updates
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
                  checked={preferences.notifications.email}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("email", checked)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-slate-600">
                    Receive push notifications in browser
                  </p>
                </div>
                <Switch
                  checked={preferences.notifications.push}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("push", checked)
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
                  checked={preferences.notifications.sms}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("sms", checked)
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
                  checked={preferences.notifications.projectUpdates}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("projectUpdates", checked)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Task Assignments</Label>
                  <p className="text-sm text-slate-600">
                    Get notified when tasks are assigned to you
                  </p>
                </div>
                <Switch
                  checked={preferences.notifications.taskAssignments}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("taskAssignments", checked)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Deadline Reminders</Label>
                  <p className="text-sm text-slate-600">
                    Get reminded about upcoming deadlines
                  </p>
                </div>
                <Switch
                  checked={preferences.notifications.deadlineReminders}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("deadlineReminders", checked)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-orange-600" />
              Privacy Settings
            </CardTitle>
            <CardDescription>
              Control who can see your information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Profile Visibility</Label>
              <Select
                value={preferences.privacy.profileVisibility}
                onValueChange={(value) =>
                  handlePrivacyChange("profileVisibility", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">
                    Public - Everyone can see
                  </SelectItem>
                  <SelectItem value="team">Team - Only team members</SelectItem>
                  <SelectItem value="private">Private - Only you</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show Email Address</Label>
                  <p className="text-sm text-slate-600">
                    Allow others to see your email
                  </p>
                </div>
                <Switch
                  checked={preferences.privacy.showEmail}
                  onCheckedChange={(checked) =>
                    handlePrivacyChange("showEmail", checked)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show Phone Number</Label>
                  <p className="text-sm text-slate-600">
                    Allow others to see your phone number
                  </p>
                </div>
                <Switch
                  checked={preferences.privacy.showPhone}
                  onCheckedChange={(checked) =>
                    handlePrivacyChange("showPhone", checked)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show Location</Label>
                  <p className="text-sm text-slate-600">
                    Allow others to see your location
                  </p>
                </div>
                <Switch
                  checked={preferences.privacy.showLocation}
                  onCheckedChange={(checked) =>
                    handlePrivacyChange("showLocation", checked)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-red-600" />
              Security Settings
            </CardTitle>
            <CardDescription>
              Manage your account security and password
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      currentPassword: e.target.value,
                    }))
                  }
                  placeholder="Enter current password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
                  placeholder="Enter new password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                  placeholder="Confirm new password"
                />
              </div>
              <Button
                onClick={handlePasswordChange}
                variant="outline"
                className="w-full"
              >
                <Lock className="h-4 w-4 mr-2" />
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserSettings;
