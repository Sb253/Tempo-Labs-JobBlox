import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Smartphone,
  Download,
  Settings,
  Bell,
  MapPin,
  Camera,
  Wifi,
  Battery,
  Shield,
  RefreshCw,
  Users,
  Clock,
  Save,
} from "lucide-react";

interface MobileSettingsProps {
  className?: string;
}

const MobileSettings: React.FC<MobileSettingsProps> = ({ className = "" }) => {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    locationTracking: true,
    offlineMode: true,
    autoSync: true,
    cameraAccess: true,
    biometricAuth: false,
    darkMode: false,
    dataUsage: "wifi-only",
    syncFrequency: "real-time",
    storageLimit: "5GB",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Mobile settings saved:", settings);
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 p-6 ${className}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Smartphone className="h-8 w-8 text-white" />
                </div>
                Mobile Settings
              </h1>
              <p className="text-gray-600 mt-2">
                Configure mobile app settings and preferences
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Config
              </Button>
              <Button
                onClick={handleSaveSettings}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile App Status */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Mobile App Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="p-4 bg-green-100 rounded-lg mb-3">
                  <Download className="h-8 w-8 text-green-600 mx-auto" />
                </div>
                <h3 className="font-semibold text-gray-900">App Version</h3>
                <p className="text-sm text-gray-600">v2.1.4 (Latest)</p>
                <Badge className="mt-2 bg-green-500 text-white">
                  Up to Date
                </Badge>
              </div>
              <div className="text-center">
                <div className="p-4 bg-blue-100 rounded-lg mb-3">
                  <Users className="h-8 w-8 text-blue-600 mx-auto" />
                </div>
                <h3 className="font-semibold text-gray-900">Active Users</h3>
                <p className="text-sm text-gray-600">12 team members</p>
                <Badge className="mt-2 bg-blue-500 text-white">Connected</Badge>
              </div>
              <div className="text-center">
                <div className="p-4 bg-purple-100 rounded-lg mb-3">
                  <RefreshCw className="h-8 w-8 text-purple-600 mx-auto" />
                </div>
                <h3 className="font-semibold text-gray-900">Last Sync</h3>
                <p className="text-sm text-gray-600">2 minutes ago</p>
                <Badge className="mt-2 bg-purple-500 text-white">Synced</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Tabs */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="sync">Sync & Storage</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  General Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Dark Mode</Label>
                    <p className="text-sm text-gray-600">
                      Enable dark theme for the mobile app
                    </p>
                  </div>
                  <Switch
                    checked={settings.darkMode}
                    onCheckedChange={(checked) =>
                      handleSettingChange("darkMode", checked)
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">
                      Offline Mode
                    </Label>
                    <p className="text-sm text-gray-600">
                      Allow app to work without internet connection
                    </p>
                  </div>
                  <Switch
                    checked={settings.offlineMode}
                    onCheckedChange={(checked) =>
                      handleSettingChange("offlineMode", checked)
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">
                      Camera Access
                    </Label>
                    <p className="text-sm text-gray-600">
                      Allow camera for photo capture and scanning
                    </p>
                  </div>
                  <Switch
                    checked={settings.cameraAccess}
                    onCheckedChange={(checked) =>
                      handleSettingChange("cameraAccess", checked)
                    }
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label className="text-base font-medium">Data Usage</Label>
                  <p className="text-sm text-gray-600">
                    Control when the app uses mobile data
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant={
                        settings.dataUsage === "wifi-only"
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        handleSettingChange("dataUsage", "wifi-only")
                      }
                    >
                      <Wifi className="mr-2 h-4 w-4" />
                      WiFi Only
                    </Button>
                    <Button
                      variant={
                        settings.dataUsage === "always" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => handleSettingChange("dataUsage", "always")}
                    >
                      <Smartphone className="mr-2 h-4 w-4" />
                      Always
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">
                      Push Notifications
                    </Label>
                    <p className="text-sm text-gray-600">
                      Receive notifications on your mobile device
                    </p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) =>
                      handleSettingChange("pushNotifications", checked)
                    }
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">
                    Notification Types
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">New job assignments</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Schedule changes</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Customer messages</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Equipment alerts</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Payment reminders</span>
                      <Switch />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">
                      Biometric Authentication
                    </Label>
                    <p className="text-sm text-gray-600">
                      Use fingerprint or face recognition to unlock
                    </p>
                  </div>
                  <Switch
                    checked={settings.biometricAuth}
                    onCheckedChange={(checked) =>
                      handleSettingChange("biometricAuth", checked)
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">
                      Location Tracking
                    </Label>
                    <p className="text-sm text-gray-600">
                      Track location for job site check-ins
                    </p>
                  </div>
                  <Switch
                    checked={settings.locationTracking}
                    onCheckedChange={(checked) =>
                      handleSettingChange("locationTracking", checked)
                    }
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label className="text-base font-medium">
                    Auto-lock Timer
                  </Label>
                  <p className="text-sm text-gray-600">
                    Automatically lock the app after inactivity
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      1 min
                    </Button>
                    <Button variant="default" size="sm">
                      5 min
                    </Button>
                    <Button variant="outline" size="sm">
                      15 min
                    </Button>
                    <Button variant="outline" size="sm">
                      Never
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sync & Storage */}
          <TabsContent value="sync" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5" />
                  Sync & Storage Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Auto Sync</Label>
                    <p className="text-sm text-gray-600">
                      Automatically sync data when connected
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoSync}
                    onCheckedChange={(checked) =>
                      handleSettingChange("autoSync", checked)
                    }
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label className="text-base font-medium">
                    Sync Frequency
                  </Label>
                  <p className="text-sm text-gray-600">
                    How often to sync data with the server
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant={
                        settings.syncFrequency === "real-time"
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        handleSettingChange("syncFrequency", "real-time")
                      }
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      Real-time
                    </Button>
                    <Button
                      variant={
                        settings.syncFrequency === "hourly"
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        handleSettingChange("syncFrequency", "hourly")
                      }
                    >
                      Hourly
                    </Button>
                    <Button
                      variant={
                        settings.syncFrequency === "daily"
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        handleSettingChange("syncFrequency", "daily")
                      }
                    >
                      Daily
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label className="text-base font-medium">Storage Limit</Label>
                  <p className="text-sm text-gray-600">
                    Maximum storage for offline data
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant={
                        settings.storageLimit === "1GB" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => handleSettingChange("storageLimit", "1GB")}
                    >
                      1GB
                    </Button>
                    <Button
                      variant={
                        settings.storageLimit === "5GB" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => handleSettingChange("storageLimit", "5GB")}
                    >
                      5GB
                    </Button>
                    <Button
                      variant={
                        settings.storageLimit === "10GB" ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        handleSettingChange("storageLimit", "10GB")
                      }
                    >
                      10GB
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Storage Usage
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Photos & Documents</span>
                      <span>2.3 GB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Offline Data</span>
                      <span>1.1 GB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Cache</span>
                      <span>0.4 GB</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-sm font-medium">
                      <span>Total Used</span>
                      <span>3.8 GB of 5 GB</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3">
                    Clear Cache
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MobileSettings;
