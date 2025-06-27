import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Loader2, Save, X, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormField {
  id: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select";
  value: string;
  error?: string;
  success?: boolean;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

const FormValidationStates = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const [formFields, setFormFields] = useState<FormField[]>([
    {
      id: "name",
      label: "Full Name",
      type: "text",
      value: "",
      required: true,
      placeholder: "Enter your full name",
    },
    {
      id: "email",
      label: "Email Address",
      type: "email",
      value: "john@example.com",
      success: true,
      placeholder: "Enter your email",
    },
    {
      id: "phone",
      label: "Phone Number",
      type: "tel",
      value: "123-456",
      error: "Please enter a valid phone number",
      placeholder: "Enter your phone number",
    },
    {
      id: "company",
      label: "Company Type",
      type: "select",
      value: "",
      required: true,
      options: [
        { value: "residential", label: "Residential Construction" },
        { value: "commercial", label: "Commercial Construction" },
        { value: "industrial", label: "Industrial Construction" },
        { value: "renovation", label: "Renovation & Remodeling" },
      ],
    },
    {
      id: "description",
      label: "Project Description",
      type: "textarea",
      value: "",
      placeholder: "Describe your project requirements...",
    },
  ]);

  const updateField = (id: string, value: string) => {
    setFormFields((prev) =>
      prev.map((field) => {
        if (field.id === id) {
          // Simple validation examples
          let error: string | undefined;
          let success = false;

          if (field.required && !value.trim()) {
            error = `${field.label} is required`;
          } else if (field.type === "email" && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
              error = "Please enter a valid email address";
            } else {
              success = true;
            }
          } else if (field.type === "tel" && value) {
            const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
            if (!phoneRegex.test(value)) {
              error = "Please enter a valid phone number";
            } else {
              success = true;
            }
          } else if (value.trim()) {
            success = true;
          }

          return { ...field, value, error, success };
        }
        return field;
      }),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate random success/error
    const success = Math.random() > 0.3;
    setSubmitStatus(success ? "success" : "error");
    setIsSubmitting(false);
  };

  const getFieldIcon = (field: FormField) => {
    if (field.error) {
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
    if (field.success) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    return null;
  };

  const getFieldClasses = (field: FormField) => {
    if (field.error) {
      return "border-red-500 focus-visible:ring-red-500";
    }
    if (field.success) {
      return "border-green-500 focus-visible:ring-green-500";
    }
    return "";
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 lg:p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <Card className="border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
              Form Validation States
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Interactive form with real-time validation, success states, and
              error handling
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Form */}
        <Card className="border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
              Project Information Form
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Fill out the form to see different validation states in action
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {formFields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label
                    htmlFor={field.id}
                    className="text-sm font-medium text-slate-900 dark:text-white"
                  >
                    {field.label}
                    {field.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </Label>

                  <div className="relative">
                    {field.type === "textarea" ? (
                      <Textarea
                        id={field.id}
                        value={field.value}
                        onChange={(e) => updateField(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        className={cn(
                          "min-h-[100px] resize-none",
                          getFieldClasses(field),
                        )}
                        rows={4}
                      />
                    ) : field.type === "select" ? (
                      <Select
                        value={field.value}
                        onValueChange={(value) => updateField(field.id, value)}
                      >
                        <SelectTrigger
                          className={cn("w-full", getFieldClasses(field))}
                        >
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id={field.id}
                        type={field.type}
                        value={field.value}
                        onChange={(e) => updateField(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        className={cn("pr-10", getFieldClasses(field))}
                      />
                    )}

                    {/* Field Icon */}
                    {getFieldIcon(field) && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {getFieldIcon(field)}
                      </div>
                    )}
                  </div>

                  {/* Field Message */}
                  {field.error && (
                    <div className="flex items-center space-x-2 text-sm text-red-600 dark:text-red-400">
                      <AlertCircle className="h-4 w-4" />
                      <span>{field.error}</span>
                    </div>
                  )}
                  {field.success && !field.error && (
                    <div className="flex items-center space-x-2 text-sm text-green-600 dark:text-green-400">
                      <CheckCircle className="h-4 w-4" />
                      <span>Looks good!</span>
                    </div>
                  )}
                </div>
              ))}

              {/* Submit Status */}
              {submitStatus === "success" && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">
                      Form submitted successfully!
                    </span>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    <span className="text-sm font-medium text-red-800 dark:text-red-200">
                      Failed to submit form. Please try again.
                    </span>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 touch-manipulation"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Submit Form
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 sm:flex-none touch-manipulation"
                  onClick={() => {
                    setFormFields((prev) =>
                      prev.map((field) => ({
                        ...field,
                        value: "",
                        error: undefined,
                        success: false,
                      })),
                    );
                    setSubmitStatus("idle");
                  }}
                >
                  <X className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Validation States Info */}
        <Card className="border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white flex items-center">
              <Info className="mr-2 h-5 w-5" />
              Validation States Demo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    Valid input
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    Invalid input
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    Processing
                  </span>
                </div>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                <p>
                  This form demonstrates real-time validation with visual
                  feedback. Try entering different values to see validation
                  states change dynamically.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FormValidationStates;
