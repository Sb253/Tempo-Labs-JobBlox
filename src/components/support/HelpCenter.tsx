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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HelpCircle,
  Search,
  MessageSquare,
  Phone,
  Mail,
  Book,
  Video,
  FileText,
  Users,
  Settings,
  Zap,
  ArrowRight,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  Headphones,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    priority: "medium",
    message: "",
  });

  const categories = [
    {
      id: "all",
      name: "All Topics",
      icon: <Book className="h-4 w-4" />,
      count: 45,
    },
    {
      id: "getting-started",
      name: "Getting Started",
      icon: <Zap className="h-4 w-4" />,
      count: 12,
    },
    {
      id: "projects",
      name: "Project Management",
      icon: <Settings className="h-4 w-4" />,
      count: 15,
    },
    {
      id: "billing",
      name: "Billing & Payments",
      icon: <FileText className="h-4 w-4" />,
      count: 8,
    },
    {
      id: "integrations",
      name: "Integrations",
      icon: <Users className="h-4 w-4" />,
      count: 6,
    },
    {
      id: "mobile",
      name: "Mobile App",
      icon: <MessageSquare className="h-4 w-4" />,
      count: 4,
    },
  ];

  const faqs = [
    {
      id: 1,
      category: "getting-started",
      question: "How do I create my first project?",
      answer:
        "To create your first project, navigate to the Projects section and click 'New Project'. Fill in the project details including name, client, timeline, and budget. You can also assign team members and set up project phases.",
      helpful: 24,
      views: 156,
    },
    {
      id: 2,
      category: "getting-started",
      question: "How do I invite team members?",
      answer:
        "Go to Settings > Team Management and click 'Invite Member'. Enter their email address and select their role (Admin, Manager, or Worker). They'll receive an invitation email to join your workspace.",
      helpful: 18,
      views: 89,
    },
    {
      id: 3,
      category: "projects",
      question: "How do I track project progress?",
      answer:
        "Use the Gantt chart view to visualize project timelines and dependencies. Update task statuses regularly and use the progress tracking features to monitor completion percentages.",
      helpful: 32,
      views: 203,
    },
    {
      id: 4,
      category: "billing",
      question: "How do I upgrade my subscription?",
      answer:
        "Visit the Billing section in your account settings. Choose your desired plan and payment method. Upgrades take effect immediately and you'll be prorated for the current billing period.",
      helpful: 15,
      views: 67,
    },
    {
      id: 5,
      category: "integrations",
      question: "Which accounting software can I integrate with?",
      answer:
        "JobBlox integrates with QuickBooks, Xero, FreshBooks, and other popular accounting platforms. Visit the Integrations page to set up connections and sync your financial data.",
      helpful: 21,
      views: 134,
    },
    {
      id: 6,
      category: "mobile",
      question: "Is there a mobile app available?",
      answer:
        "Yes! JobBlox has native mobile apps for iOS and Android. Download from the App Store or Google Play Store and sign in with your existing account credentials.",
      helpful: 28,
      views: 178,
    },
  ];

  const resources = [
    {
      title: "Getting Started Guide",
      description: "Complete walkthrough for new users",
      type: "guide",
      icon: <Book className="h-5 w-5" />,
      duration: "15 min read",
      url: "#",
    },
    {
      title: "Project Management Best Practices",
      description: "Tips for managing construction projects effectively",
      type: "video",
      icon: <Video className="h-5 w-5" />,
      duration: "12 min watch",
      url: "#",
    },
    {
      title: "API Documentation",
      description: "Technical documentation for developers",
      type: "docs",
      icon: <FileText className="h-5 w-5" />,
      duration: "Reference",
      url: "#",
    },
    {
      title: "Mobile App Tutorial",
      description: "Learn how to use JobBlox on mobile devices",
      type: "video",
      icon: <Video className="h-5 w-5" />,
      duration: "8 min watch",
      url: "#",
    },
  ];

  const supportOptions = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: <MessageCircle className="h-6 w-6" />,
      availability: "Available 24/7",
      action: "Start Chat",
      color: "bg-blue-500",
    },
    {
      title: "Email Support",
      description: "Send us a detailed message about your issue",
      icon: <Mail className="h-6 w-6" />,
      availability: "Response within 4 hours",
      action: "Send Email",
      color: "bg-green-500",
    },
    {
      title: "Phone Support",
      description: "Speak directly with our technical experts",
      icon: <Phone className="h-6 w-6" />,
      availability: "Mon-Fri 9AM-6PM EST",
      action: "Call Now",
      color: "bg-purple-500",
    },
    {
      title: "Schedule Demo",
      description: "Book a personalized walkthrough session",
      icon: <Headphones className="h-6 w-6" />,
      availability: "Available by appointment",
      action: "Book Demo",
      color: "bg-orange-500",
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", contactForm);
    setIsContactDialogOpen(false);
    // Reset form
    setContactForm({
      name: "",
      email: "",
      subject: "",
      category: "",
      priority: "medium",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="h-12 w-12 mr-4" />
            <h1 className="text-3xl lg:text-4xl font-bold">Help Center</h1>
          </div>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Find answers to your questions and get the help you need
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              placeholder="Search for help articles, guides, and FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:bg-white/20 focus:border-white/40"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-8">
        {/* Quick Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {supportOptions.map((option, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-12 h-12 ${option.color} rounded-lg flex items-center justify-center text-white mx-auto mb-4`}
                >
                  {option.icon}
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  {option.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  {option.description}
                </p>
                <p className="text-xs text-slate-500 mb-4">
                  {option.availability}
                </p>
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() =>
                    option.title === "Email Support" &&
                    setIsContactDialogOpen(true)
                  }
                >
                  {option.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="faqs" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="faqs" className="space-y-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center space-x-2"
                >
                  {category.icon}
                  <span>{category.name}</span>
                  <Badge variant="secondary" className="ml-2">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* FAQ List */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  {filteredFaqs.length} articles found
                  {searchQuery && ` for "${searchQuery}"`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-2">
                  {filteredFaqs.map((faq) => (
                    <AccordionItem
                      key={faq.id}
                      value={`item-${faq.id}`}
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left hover:no-underline">
                        <div className="flex items-start justify-between w-full pr-4">
                          <span className="font-medium">{faq.question}</span>
                          <div className="flex items-center space-x-2 text-xs text-slate-500">
                            <span className="flex items-center">
                              <Star className="h-3 w-3 mr-1" />
                              {faq.helpful}
                            </span>
                            <span>{faq.views} views</span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {faq.answer}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t">
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-slate-500">
                              Was this helpful?
                            </span>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                👍 Yes
                              </Button>
                              <Button size="sm" variant="outline">
                                👎 No
                              </Button>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Full Article
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guides" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        {resource.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                          {resource.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{resource.duration}</Badge>
                          <Button size="sm" variant="ghost">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>
                    Multiple ways to get in touch with our support team
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Email Support</p>
                        <p className="text-sm text-slate-600">
                          support@jobblox.com
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Phone Support</p>
                        <p className="text-sm text-slate-600">1-800-JOBBLOX</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="font-medium">Business Hours</p>
                        <p className="text-sm text-slate-600">
                          Mon-Fri 9AM-6PM EST
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form and we'll get back to you within 4 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog
                    open={isContactDialogOpen}
                    onOpenChange={setIsContactDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button className="w-full">
                        <Send className="mr-2 h-4 w-4" />
                        Open Contact Form
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Contact Support</DialogTitle>
                        <DialogDescription>
                          Please provide as much detail as possible to help us
                          assist you better.
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        onSubmit={handleContactSubmit}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                              id="name"
                              value={contactForm.name}
                              onChange={(e) =>
                                setContactForm((prev) => ({
                                  ...prev,
                                  name: e.target.value,
                                }))
                              }
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={contactForm.email}
                              onChange={(e) =>
                                setContactForm((prev) => ({
                                  ...prev,
                                  email: e.target.value,
                                }))
                              }
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Input
                            id="subject"
                            value={contactForm.subject}
                            onChange={(e) =>
                              setContactForm((prev) => ({
                                ...prev,
                                subject: e.target.value,
                              }))
                            }
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select
                              value={contactForm.category}
                              onValueChange={(value) =>
                                setContactForm((prev) => ({
                                  ...prev,
                                  category: value,
                                }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="technical">
                                  Technical Issue
                                </SelectItem>
                                <SelectItem value="billing">
                                  Billing Question
                                </SelectItem>
                                <SelectItem value="feature">
                                  Feature Request
                                </SelectItem>
                                <SelectItem value="general">
                                  General Inquiry
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="priority">Priority</Label>
                            <Select
                              value={contactForm.priority}
                              onValueChange={(value) =>
                                setContactForm((prev) => ({
                                  ...prev,
                                  priority: value,
                                }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="urgent">Urgent</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            value={contactForm.message}
                            onChange={(e) =>
                              setContactForm((prev) => ({
                                ...prev,
                                message: e.target.value,
                              }))
                            }
                            placeholder="Please describe your issue or question in detail..."
                            rows={4}
                            required
                          />
                        </div>

                        <DialogFooter>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsContactDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button type="submit">
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HelpCenter;
