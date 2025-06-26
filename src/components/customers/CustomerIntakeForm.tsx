import React, { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Building,
  Calendar,
  FileText,
  Save,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  alternatePhone: string;

  // Address Information
  address: string;
  city: string;
  state: string;
  zipCode: string;

  // Project Information
  projectType: string;
  projectDescription: string;
  budget: string;
  timeline: string;
  urgency: string;

  // Business Information (for commercial clients)
  companyName: string;
  businessType: string;
  contactPerson: string;

  // Preferences
  preferredContactMethod: string;
  bestTimeToContact: string;
  referralSource: string;

  // Additional Information
  specialRequirements: string;
  previousWork: boolean;
  marketingConsent: boolean;
}

const CustomerIntakeForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    alternatePhone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    projectType: "",
    projectDescription: "",
    budget: "",
    timeline: "",
    urgency: "",
    companyName: "",
    businessType: "",
    contactPerson: "",
    preferredContactMethod: "",
    bestTimeToContact: "",
    referralSource: "",
    specialRequirements: "",
    previousWork: false,
    marketingConsent: false,
  });

  const totalSteps = 4;

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  const getStepIcon = (step: number) => {
    if (step < currentStep) {
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    } else if (step === currentStep) {
      return (
        <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
          {step}
        </div>
      );
    } else {
      return (
        <div className="h-6 w-6 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 text-sm">
          {step}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Customer Intake Form
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Help us understand your project needs and preferences
          </p>
        </div>

        {/* Progress Indicator */}
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className="flex flex-col items-center space-y-2">
                    {getStepIcon(step)}
                    <span
                      className={cn(
                        "text-sm font-medium",
                        step <= currentStep
                          ? "text-slate-900 dark:text-white"
                          : "text-slate-400",
                      )}
                    >
                      {step === 1 && "Personal Info"}
                      {step === 2 && "Project Details"}
                      {step === 3 && "Preferences"}
                      {step === 4 && "Review"}
                    </span>
                  </div>
                  {index < 3 && (
                    <div
                      className={cn(
                        "h-1 w-24 mx-4 rounded-full",
                        step < currentStep
                          ? "bg-green-500"
                          : "bg-slate-200 dark:bg-slate-600",
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Form Content */}
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-t-xl">
            <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">
              {currentStep === 1 && "Personal & Contact Information"}
              {currentStep === 2 && "Project Details"}
              {currentStep === 3 && "Preferences & Additional Info"}
              {currentStep === 4 && "Review & Submit"}
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              {currentStep === 1 &&
                "Please provide your contact details and address"}
              {currentStep === 2 && "Tell us about your construction project"}
              {currentStep === 3 &&
                "Help us serve you better with your preferences"}
              {currentStep === 4 && "Review your information before submitting"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstName"
                      className="text-slate-700 dark:text-slate-300 font-medium"
                    >
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="lastName"
                      className="text-slate-700 dark:text-slate-300 font-medium"
                    >
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-slate-700 dark:text-slate-300 font-medium"
                    >
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-slate-700 dark:text-slate-300 font-medium"
                    >
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="address"
                    className="text-slate-700 dark:text-slate-300 font-medium"
                  >
                    Street Address *
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600"
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="city"
                      className="text-slate-700 dark:text-slate-300 font-medium"
                    >
                      City *
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600"
                      placeholder="Springfield"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="state"
                      className="text-slate-700 dark:text-slate-300 font-medium"
                    >
                      State *
                    </Label>
                    <Select
                      value={formData.state}
                      onValueChange={(value) =>
                        handleInputChange("state", value)
                      }
                    >
                      <SelectTrigger className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AL">Alabama</SelectItem>
                        <SelectItem value="AK">Alaska</SelectItem>
                        <SelectItem value="AZ">Arizona</SelectItem>
                        <SelectItem value="AR">Arkansas</SelectItem>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="CO">Colorado</SelectItem>
                        <SelectItem value="CT">Connecticut</SelectItem>
                        <SelectItem value="DE">Delaware</SelectItem>
                        <SelectItem value="FL">Florida</SelectItem>
                        <SelectItem value="GA">Georgia</SelectItem>
                        <SelectItem value="HI">Hawaii</SelectItem>
                        <SelectItem value="ID">Idaho</SelectItem>
                        <SelectItem value="IL">Illinois</SelectItem>
                        <SelectItem value="IN">Indiana</SelectItem>
                        <SelectItem value="IA">Iowa</SelectItem>
                        <SelectItem value="KS">Kansas</SelectItem>
                        <SelectItem value="KY">Kentucky</SelectItem>
                        <SelectItem value="LA">Louisiana</SelectItem>
                        <SelectItem value="ME">Maine</SelectItem>
                        <SelectItem value="MD">Maryland</SelectItem>
                        <SelectItem value="MA">Massachusetts</SelectItem>
                        <SelectItem value="MI">Michigan</SelectItem>
                        <SelectItem value="MN">Minnesota</SelectItem>
                        <SelectItem value="MS">Mississippi</SelectItem>
                        <SelectItem value="MO">Missouri</SelectItem>
                        <SelectItem value="MT">Montana</SelectItem>
                        <SelectItem value="NE">Nebraska</SelectItem>
                        <SelectItem value="NV">Nevada</SelectItem>
                        <SelectItem value="NH">New Hampshire</SelectItem>
                        <SelectItem value="NJ">New Jersey</SelectItem>
                        <SelectItem value="NM">New Mexico</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="NC">North Carolina</SelectItem>
                        <SelectItem value="ND">North Dakota</SelectItem>
                        <SelectItem value="OH">Ohio</SelectItem>
                        <SelectItem value="OK">Oklahoma</SelectItem>
                        <SelectItem value="OR">Oregon</SelectItem>
                        <SelectItem value="PA">Pennsylvania</SelectItem>
                        <SelectItem value="RI">Rhode Island</SelectItem>
                        <SelectItem value="SC">South Carolina</SelectItem>
                        <SelectItem value="SD">South Dakota</SelectItem>
                        <SelectItem value="TN">Tennessee</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                        <SelectItem value="UT">Utah</SelectItem>
                        <SelectItem value="VT">Vermont</SelectItem>
                        <SelectItem value="VA">Virginia</SelectItem>
                        <SelectItem value="WA">Washington</SelectItem>
                        <SelectItem value="WV">West Virginia</SelectItem>
                        <SelectItem value="WI">Wisconsin</SelectItem>
                        <SelectItem value="WY">Wyoming</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="zipCode"
                      className="text-slate-700 dark:text-slate-300 font-medium"
                    >
                      ZIP Code *
                    </Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) =>
                        handleInputChange("zipCode", e.target.value)
                      }
                      className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600"
                      placeholder="12345"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Project Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="projectType"
                    className="text-slate-700 dark:text-slate-300 font-medium"
                  >
                    Project Type *
                  </Label>
                  <Select
                    value={formData.projectType}
                    onValueChange={(value) =>
                      handleInputChange("projectType", value)
                    }
                  >
                    <SelectTrigger className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kitchen-renovation">
                        Kitchen Renovation
                      </SelectItem>
                      <SelectItem value="bathroom-remodel">
                        Bathroom Remodel
                      </SelectItem>
                      <SelectItem value="home-addition">
                        Home Addition
                      </SelectItem>
                      <SelectItem value="basement-finishing">
                        Basement Finishing
                      </SelectItem>
                      <SelectItem value="deck-patio">
                        Deck/Patio Construction
                      </SelectItem>
                      <SelectItem value="roofing">Roofing</SelectItem>
                      <SelectItem value="siding">Siding</SelectItem>
                      <SelectItem value="flooring">Flooring</SelectItem>
                      <SelectItem value="windows-doors">
                        Windows & Doors
                      </SelectItem>
                      <SelectItem value="commercial">
                        Commercial Project
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="projectDescription"
                    className="text-slate-700 dark:text-slate-300 font-medium"
                  >
                    Project Description *
                  </Label>
                  <Textarea
                    id="projectDescription"
                    value={formData.projectDescription}
                    onChange={(e) =>
                      handleInputChange("projectDescription", e.target.value)
                    }
                    className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 min-h-[120px]"
                    placeholder="Please describe your project in detail, including specific requirements, materials, and any special considerations..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="budget"
                      className="text-slate-700 dark:text-slate-300 font-medium"
                    >
                      Budget Range *
                    </Label>
                    <Select
                      value={formData.budget}
                      onValueChange={(value) =>
                        handleInputChange("budget", value)
                      }
                    >
                      <SelectTrigger className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-5k">Under $5,000</SelectItem>
                        <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                        <SelectItem value="10k-25k">
                          $10,000 - $25,000
                        </SelectItem>
                        <SelectItem value="25k-50k">
                          $25,000 - $50,000
                        </SelectItem>
                        <SelectItem value="50k-100k">
                          $50,000 - $100,000
                        </SelectItem>
                        <SelectItem value="100k-250k">
                          $100,000 - $250,000
                        </SelectItem>
                        <SelectItem value="over-250k">Over $250,000</SelectItem>
                        <SelectItem value="flexible">
                          Flexible/Discuss
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="timeline"
                      className="text-slate-700 dark:text-slate-300 font-medium"
                    >
                      Desired Timeline *
                    </Label>
                    <Select
                      value={formData.timeline}
                      onValueChange={(value) =>
                        handleInputChange("timeline", value)
                      }
                    >
                      <SelectTrigger className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">ASAP</SelectItem>
                        <SelectItem value="1-month">Within 1 month</SelectItem>
                        <SelectItem value="2-3-months">2-3 months</SelectItem>
                        <SelectItem value="3-6-months">3-6 months</SelectItem>
                        <SelectItem value="6-12-months">6-12 months</SelectItem>
                        <SelectItem value="over-year">Over a year</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="urgency"
                    className="text-slate-700 dark:text-slate-300 font-medium"
                  >
                    Project Urgency
                  </Label>
                  <Select
                    value={formData.urgency}
                    onValueChange={(value) =>
                      handleInputChange("urgency", value)
                    }
                  >
                    <SelectTrigger className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600">
                      <SelectValue placeholder="Select urgency level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emergency">
                        Emergency (Immediate attention needed)
                      </SelectItem>
                      <SelectItem value="high">
                        High (Within 1-2 weeks)
                      </SelectItem>
                      <SelectItem value="medium">
                        Medium (Within 1 month)
                      </SelectItem>
                      <SelectItem value="low">Low (Planning phase)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 3: Preferences */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="preferredContactMethod"
                      className="text-slate-700 dark:text-slate-300 font-medium"
                    >
                      Preferred Contact Method *
                    </Label>
                    <Select
                      value={formData.preferredContactMethod}
                      onValueChange={(value) =>
                        handleInputChange("preferredContactMethod", value)
                      }
                    >
                      <SelectTrigger className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600">
                        <SelectValue placeholder="Select contact method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">Phone Call</SelectItem>
                        <SelectItem value="text">Text Message</SelectItem>
                        <SelectItem value="any">Any Method</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="bestTimeToContact"
                      className="text-slate-700 dark:text-slate-300 font-medium"
                    >
                      Best Time to Contact
                    </Label>
                    <Select
                      value={formData.bestTimeToContact}
                      onValueChange={(value) =>
                        handleInputChange("bestTimeToContact", value)
                      }
                    >
                      <SelectTrigger className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600">
                        <SelectValue placeholder="Select best time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">
                          Morning (8 AM - 12 PM)
                        </SelectItem>
                        <SelectItem value="afternoon">
                          Afternoon (12 PM - 5 PM)
                        </SelectItem>
                        <SelectItem value="evening">
                          Evening (5 PM - 8 PM)
                        </SelectItem>
                        <SelectItem value="weekends">Weekends</SelectItem>
                        <SelectItem value="anytime">Anytime</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="referralSource"
                    className="text-slate-700 dark:text-slate-300 font-medium"
                  >
                    How did you hear about us?
                  </Label>
                  <Select
                    value={formData.referralSource}
                    onValueChange={(value) =>
                      handleInputChange("referralSource", value)
                    }
                  >
                    <SelectTrigger className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600">
                      <SelectValue placeholder="Select referral source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google">Google Search</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="referral">
                        Friend/Family Referral
                      </SelectItem>
                      <SelectItem value="previous-customer">
                        Previous Customer
                      </SelectItem>
                      <SelectItem value="yellow-pages">Yellow Pages</SelectItem>
                      <SelectItem value="home-show">Home Show/Event</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="specialRequirements"
                    className="text-slate-700 dark:text-slate-300 font-medium"
                  >
                    Special Requirements or Considerations
                  </Label>
                  <Textarea
                    id="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={(e) =>
                      handleInputChange("specialRequirements", e.target.value)
                    }
                    className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600"
                    placeholder="Any special requirements, accessibility needs, pet considerations, etc."
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="previousWork"
                      checked={formData.previousWork}
                      onCheckedChange={(checked) =>
                        handleInputChange("previousWork", checked as boolean)
                      }
                    />
                    <Label
                      htmlFor="previousWork"
                      className="text-slate-700 dark:text-slate-300"
                    >
                      We have worked with your company before
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="marketingConsent"
                      checked={formData.marketingConsent}
                      onCheckedChange={(checked) =>
                        handleInputChange(
                          "marketingConsent",
                          checked as boolean,
                        )
                      }
                    />
                    <Label
                      htmlFor="marketingConsent"
                      className="text-slate-700 dark:text-slate-300"
                    >
                      I agree to receive marketing communications and project
                      updates
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Please review your information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium text-slate-800 dark:text-slate-200">
                        Personal Information
                      </h4>
                      <div className="text-sm space-y-1">
                        <p>
                          <span className="font-medium">Name:</span>{" "}
                          {formData.firstName} {formData.lastName}
                        </p>
                        <p>
                          <span className="font-medium">Email:</span>{" "}
                          {formData.email}
                        </p>
                        <p>
                          <span className="font-medium">Phone:</span>{" "}
                          {formData.phone}
                        </p>
                        <p>
                          <span className="font-medium">Address:</span>{" "}
                          {formData.address}, {formData.city}, {formData.state}{" "}
                          {formData.zipCode}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-slate-800 dark:text-slate-200">
                        Project Details
                      </h4>
                      <div className="text-sm space-y-1">
                        <p>
                          <span className="font-medium">Type:</span>{" "}
                          {formData.projectType}
                        </p>
                        <p>
                          <span className="font-medium">Budget:</span>{" "}
                          {formData.budget}
                        </p>
                        <p>
                          <span className="font-medium">Timeline:</span>{" "}
                          {formData.timeline}
                        </p>
                        <p>
                          <span className="font-medium">Urgency:</span>{" "}
                          {formData.urgency}
                        </p>
                      </div>
                    </div>
                  </div>

                  {formData.projectDescription && (
                    <div className="mt-4">
                      <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">
                        Project Description
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 p-3 rounded border">
                        {formData.projectDescription}
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div className="text-sm text-blue-800 dark:text-blue-200">
                      <p className="font-medium mb-1">What happens next?</p>
                      <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-300">
                        <li>We'll review your information within 24 hours</li>
                        <li>
                          A project specialist will contact you to discuss
                          details
                        </li>
                        <li>
                          We'll schedule a consultation at your convenience
                        </li>
                        <li>You'll receive a detailed project estimate</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={nextStep}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              <Save className="mr-2 h-4 w-4" />
              Submit Form
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerIntakeForm;
