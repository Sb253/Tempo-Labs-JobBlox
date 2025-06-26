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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Users,
  FileText,
  Calculator,
  Calendar,
  Clock,
  DollarSign,
  Percent,
  Save,
  Settings,
} from "lucide-react";

interface BackOfficeConfig {
  accounting: {
    fiscalYearStart: string;
    defaultTaxRate: number;
    currencySymbol: string;
    decimalPlaces: number;
    invoicePrefix: string;
    invoiceNumbering: string;
    paymentTerms: number;
    lateFeeRate: number;
  };
  operations: {
    workingHours: {
      start: string;
      end: string;
    };
    workingDays: string[];
    timeZone: string;
    holidayCalendar: string;
    overtimeRate: number;
    breakDuration: number;
  };
  compliance: {
    licenseTracking: boolean;
    insuranceTracking: boolean;
    safetyReporting: boolean;
    environmentalCompliance: boolean;
    auditTrail: boolean;
    documentRetention: number;
  };
  reporting: {
    autoReports: boolean;
    reportFrequency: string;
    recipients: string;
    dashboardRefresh: number;
    dataRetention: number;
  };
  workflow: {
    approvalLevels: number;
    autoAssignment: boolean;
    escalationTime: number;
    notificationDelay: number;
    taskReminders: boolean;
  };
}

const BackOfficeSettings = () => {
  const [config, setConfig] = useState<BackOfficeConfig>({
    accounting: {
      fiscalYearStart: "01-01",
      defaultTaxRate: 8.5,
      currencySymbol: "$",
      decimalPlaces: 2,
      invoicePrefix: "INV",
      invoiceNumbering: "sequential",
      paymentTerms: 30,
      lateFeeRate: 1.5,
    },
    operations: {
      workingHours: {
        start: "08:00",
        end: "17:00",
      },
      workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      timeZone: "America/Chicago",
      holidayCalendar: "US",
      overtimeRate: 1.5,
      breakDuration: 60,
    },
    compliance: {
      licenseTracking: true,
      insuranceTracking: true,
      safetyReporting: true,
      environmentalCompliance: false,
      auditTrail: true,
      documentRetention: 7,
    },
    reporting: {
      autoReports: true,
      reportFrequency: "weekly",
      recipients: "admin@company.com",
      dashboardRefresh: 5,
      dataRetention: 365,
    },
    workflow: {
      approvalLevels: 2,
      autoAssignment: true,
      escalationTime: 24,
      notificationDelay: 15,
      taskReminders: true,
    },
  });

  const handleSave = () => {
    console.log("Saving back office settings...", config);
    // Here you would typically save to your backend
  };

  const workingDaysOptions = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const toggleWorkingDay = (day: string) => {
    setConfig((prev) => ({
      ...prev,
      operations: {
        ...prev.operations,
        workingDays: prev.operations.workingDays.includes(day)
          ? prev.operations.workingDays.filter((d) => d !== day)
          : [...prev.operations.workingDays, day],
      },
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
              <Settings className="h-8 w-8 text-blue-600" />
              Back Office Settings
            </h1>
            <p className="text-slate-600 mt-1">
              Configure operational and administrative settings
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

        {/* Accounting Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-green-600" />
              Accounting & Finance
            </CardTitle>
            <CardDescription>
              Configure financial settings and accounting preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fiscalYearStart">Fiscal Year Start</Label>
                <Input
                  id="fiscalYearStart"
                  value={config.accounting.fiscalYearStart}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      accounting: {
                        ...prev.accounting,
                        fiscalYearStart: e.target.value,
                      },
                    }))
                  }
                  placeholder="MM-DD"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="defaultTaxRate">Default Tax Rate (%)</Label>
                <Input
                  id="defaultTaxRate"
                  type="number"
                  step="0.1"
                  value={config.accounting.defaultTaxRate}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      accounting: {
                        ...prev.accounting,
                        defaultTaxRate: parseFloat(e.target.value) || 0,
                      },
                    }))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currencySymbol">Currency Symbol</Label>
                <Input
                  id="currencySymbol"
                  value={config.accounting.currencySymbol}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      accounting: {
                        ...prev.accounting,
                        currencySymbol: e.target.value,
                      },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="decimalPlaces">Decimal Places</Label>
                <Input
                  id="decimalPlaces"
                  type="number"
                  min="0"
                  max="4"
                  value={config.accounting.decimalPlaces}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      accounting: {
                        ...prev.accounting,
                        decimalPlaces: parseInt(e.target.value) || 2,
                      },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoicePrefix">Invoice Prefix</Label>
                <Input
                  id="invoicePrefix"
                  value={config.accounting.invoicePrefix}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      accounting: {
                        ...prev.accounting,
                        invoicePrefix: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Invoice Numbering</Label>
                <Select
                  value={config.accounting.invoiceNumbering}
                  onValueChange={(value) =>
                    setConfig((prev) => ({
                      ...prev,
                      accounting: {
                        ...prev.accounting,
                        invoiceNumbering: value,
                      },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sequential">Sequential</SelectItem>
                    <SelectItem value="date-based">Date-based</SelectItem>
                    <SelectItem value="custom">Custom Format</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentTerms">Payment Terms (days)</Label>
                <Input
                  id="paymentTerms"
                  type="number"
                  value={config.accounting.paymentTerms}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      accounting: {
                        ...prev.accounting,
                        paymentTerms: parseInt(e.target.value) || 30,
                      },
                    }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lateFeeRate">Late Fee Rate (%)</Label>
              <Input
                id="lateFeeRate"
                type="number"
                step="0.1"
                value={config.accounting.lateFeeRate}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    accounting: {
                      ...prev.accounting,
                      lateFeeRate: parseFloat(e.target.value) || 0,
                    },
                  }))
                }
                className="max-w-xs"
              />
            </div>
          </CardContent>
        </Card>

        {/* Operations Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Operations & Scheduling
            </CardTitle>
            <CardDescription>
              Configure working hours, schedules, and operational parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="workStart">Working Hours Start</Label>
                <Input
                  id="workStart"
                  type="time"
                  value={config.operations.workingHours.start}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      operations: {
                        ...prev.operations,
                        workingHours: {
                          ...prev.operations.workingHours,
                          start: e.target.value,
                        },
                      },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workEnd">Working Hours End</Label>
                <Input
                  id="workEnd"
                  type="time"
                  value={config.operations.workingHours.end}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      operations: {
                        ...prev.operations,
                        workingHours: {
                          ...prev.operations.workingHours,
                          end: e.target.value,
                        },
                      },
                    }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Working Days</Label>
              <div className="flex flex-wrap gap-2">
                {workingDaysOptions.map((day) => (
                  <Badge
                    key={day}
                    variant={
                      config.operations.workingDays.includes(day)
                        ? "default"
                        : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => toggleWorkingDay(day)}
                  >
                    {day}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Time Zone</Label>
                <Select
                  value={config.operations.timeZone}
                  onValueChange={(value) =>
                    setConfig((prev) => ({
                      ...prev,
                      operations: { ...prev.operations, timeZone: value },
                    }))
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
                <Label>Holiday Calendar</Label>
                <Select
                  value={config.operations.holidayCalendar}
                  onValueChange={(value) =>
                    setConfig((prev) => ({
                      ...prev,
                      operations: {
                        ...prev.operations,
                        holidayCalendar: value,
                      },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="overtimeRate">Overtime Rate Multiplier</Label>
                <Input
                  id="overtimeRate"
                  type="number"
                  step="0.1"
                  value={config.operations.overtimeRate}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      operations: {
                        ...prev.operations,
                        overtimeRate: parseFloat(e.target.value) || 1.5,
                      },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="breakDuration">Break Duration (minutes)</Label>
                <Input
                  id="breakDuration"
                  type="number"
                  value={config.operations.breakDuration}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      operations: {
                        ...prev.operations,
                        breakDuration: parseInt(e.target.value) || 60,
                      },
                    }))
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-red-600" />
              Compliance & Documentation
            </CardTitle>
            <CardDescription>
              Configure compliance tracking and documentation requirements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>License Tracking</Label>
                  <p className="text-sm text-slate-600">
                    Track and monitor license expiration dates
                  </p>
                </div>
                <Switch
                  checked={config.compliance.licenseTracking}
                  onCheckedChange={(checked) =>
                    setConfig((prev) => ({
                      ...prev,
                      compliance: {
                        ...prev.compliance,
                        licenseTracking: checked,
                      },
                    }))
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Insurance Tracking</Label>
                  <p className="text-sm text-slate-600">
                    Monitor insurance policies and renewals
                  </p>
                </div>
                <Switch
                  checked={config.compliance.insuranceTracking}
                  onCheckedChange={(checked) =>
                    setConfig((prev) => ({
                      ...prev,
                      compliance: {
                        ...prev.compliance,
                        insuranceTracking: checked,
                      },
                    }))
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Safety Reporting</Label>
                  <p className="text-sm text-slate-600">
                    Enable safety incident reporting and tracking
                  </p>
                </div>
                <Switch
                  checked={config.compliance.safetyReporting}
                  onCheckedChange={(checked) =>
                    setConfig((prev) => ({
                      ...prev,
                      compliance: {
                        ...prev.compliance,
                        safetyReporting: checked,
                      },
                    }))
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Environmental Compliance</Label>
                  <p className="text-sm text-slate-600">
                    Track environmental regulations and permits
                  </p>
                </div>
                <Switch
                  checked={config.compliance.environmentalCompliance}
                  onCheckedChange={(checked) =>
                    setConfig((prev) => ({
                      ...prev,
                      compliance: {
                        ...prev.compliance,
                        environmentalCompliance: checked,
                      },
                    }))
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Audit Trail</Label>
                  <p className="text-sm text-slate-600">
                    Maintain detailed audit logs for all activities
                  </p>
                </div>
                <Switch
                  checked={config.compliance.auditTrail}
                  onCheckedChange={(checked) =>
                    setConfig((prev) => ({
                      ...prev,
                      compliance: { ...prev.compliance, auditTrail: checked },
                    }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="documentRetention">
                Document Retention (years)
              </Label>
              <Input
                id="documentRetention"
                type="number"
                value={config.compliance.documentRetention}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    compliance: {
                      ...prev.compliance,
                      documentRetention: parseInt(e.target.value) || 7,
                    },
                  }))
                }
                className="max-w-xs"
              />
            </div>
          </CardContent>
        </Card>

        {/* Reporting Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              Reporting & Analytics
            </CardTitle>
            <CardDescription>
              Configure automated reporting and data retention settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Automated Reports</Label>
                <p className="text-sm text-slate-600">
                  Enable automatic report generation
                </p>
              </div>
              <Switch
                checked={config.reporting.autoReports}
                onCheckedChange={(checked) =>
                  setConfig((prev) => ({
                    ...prev,
                    reporting: { ...prev.reporting, autoReports: checked },
                  }))
                }
              />
            </div>

            {config.reporting.autoReports && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Report Frequency</Label>
                    <Select
                      value={config.reporting.reportFrequency}
                      onValueChange={(value) =>
                        setConfig((prev) => ({
                          ...prev,
                          reporting: {
                            ...prev.reporting,
                            reportFrequency: value,
                          },
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dashboardRefresh">
                      Dashboard Refresh (minutes)
                    </Label>
                    <Input
                      id="dashboardRefresh"
                      type="number"
                      value={config.reporting.dashboardRefresh}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          reporting: {
                            ...prev.reporting,
                            dashboardRefresh: parseInt(e.target.value) || 5,
                          },
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipients">Report Recipients</Label>
                  <Textarea
                    id="recipients"
                    value={config.reporting.recipients}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        reporting: {
                          ...prev.reporting,
                          recipients: e.target.value,
                        },
                      }))
                    }
                    placeholder="Enter email addresses, one per line"
                    rows={3}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="dataRetention">Data Retention (days)</Label>
              <Input
                id="dataRetention"
                type="number"
                value={config.reporting.dataRetention}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    reporting: {
                      ...prev.reporting,
                      dataRetention: parseInt(e.target.value) || 365,
                    },
                  }))
                }
                className="max-w-xs"
              />
            </div>
          </CardContent>
        </Card>

        {/* Workflow Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-orange-600" />
              Workflow & Automation
            </CardTitle>
            <CardDescription>
              Configure workflow automation and approval processes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="approvalLevels">Approval Levels</Label>
                <Input
                  id="approvalLevels"
                  type="number"
                  min="1"
                  max="5"
                  value={config.workflow.approvalLevels}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      workflow: {
                        ...prev.workflow,
                        approvalLevels: parseInt(e.target.value) || 2,
                      },
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="escalationTime">Escalation Time (hours)</Label>
                <Input
                  id="escalationTime"
                  type="number"
                  value={config.workflow.escalationTime}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      workflow: {
                        ...prev.workflow,
                        escalationTime: parseInt(e.target.value) || 24,
                      },
                    }))
                  }
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Assignment</Label>
                  <p className="text-sm text-slate-600">
                    Automatically assign tasks based on workload
                  </p>
                </div>
                <Switch
                  checked={config.workflow.autoAssignment}
                  onCheckedChange={(checked) =>
                    setConfig((prev) => ({
                      ...prev,
                      workflow: { ...prev.workflow, autoAssignment: checked },
                    }))
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Task Reminders</Label>
                  <p className="text-sm text-slate-600">
                    Send automatic reminders for pending tasks
                  </p>
                </div>
                <Switch
                  checked={config.workflow.taskReminders}
                  onCheckedChange={(checked) =>
                    setConfig((prev) => ({
                      ...prev,
                      workflow: { ...prev.workflow, taskReminders: checked },
                    }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notificationDelay">
                Notification Delay (minutes)
              </Label>
              <Input
                id="notificationDelay"
                type="number"
                value={config.workflow.notificationDelay}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    workflow: {
                      ...prev.workflow,
                      notificationDelay: parseInt(e.target.value) || 15,
                    },
                  }))
                }
                className="max-w-xs"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BackOfficeSettings;
