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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Code,
  Key,
  Activity,
  Shield,
  Copy,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";

interface APIKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  lastUsed: string;
  status: "active" | "inactive" | "expired";
  createdAt: string;
}

interface APIEndpoint {
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  description: string;
  usage: number;
  responseTime: string;
}

const apiKeys: APIKey[] = [
  {
    id: "1",
    name: "Production API Key",
    key: "jb_live_1234567890abcdef",
    permissions: ["read", "write", "admin"],
    lastUsed: "2 minutes ago",
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Development API Key",
    key: "jb_test_abcdef1234567890",
    permissions: ["read", "write"],
    lastUsed: "1 hour ago",
    status: "active",
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    name: "Mobile App Key",
    key: "jb_mobile_9876543210fedcba",
    permissions: ["read"],
    lastUsed: "1 day ago",
    status: "inactive",
    createdAt: "2024-01-05",
  },
];

const apiEndpoints: APIEndpoint[] = [
  {
    method: "GET",
    endpoint: "/api/v1/projects",
    description: "Retrieve all projects",
    usage: 1247,
    responseTime: "120ms",
  },
  {
    method: "POST",
    endpoint: "/api/v1/projects",
    description: "Create a new project",
    usage: 89,
    responseTime: "250ms",
  },
  {
    method: "GET",
    endpoint: "/api/v1/customers",
    description: "Retrieve customer data",
    usage: 892,
    responseTime: "95ms",
  },
  {
    method: "PUT",
    endpoint: "/api/v1/customers/{id}",
    description: "Update customer information",
    usage: 156,
    responseTime: "180ms",
  },
  {
    method: "GET",
    endpoint: "/api/v1/invoices",
    description: "Retrieve invoices",
    usage: 634,
    responseTime: "110ms",
  },
  {
    method: "DELETE",
    endpoint: "/api/v1/projects/{id}",
    description: "Delete a project",
    usage: 23,
    responseTime: "200ms",
  },
];

const APIManagement = () => {
  const [showKeys, setShowKeys] = useState<{ [key: string]: boolean }>({});

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys((prev) => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const maskApiKey = (key: string) => {
    return (
      key.substring(0, 8) + "••••••••••••••••" + key.substring(key.length - 4)
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400 bg-green-500/10 border-green-500/20";
      case "inactive":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
      case "expired":
        return "text-red-400 bg-red-500/10 border-red-500/20";
      default:
        return "text-gray-400 bg-gray-500/10 border-gray-500/20";
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "text-green-400 bg-green-500/10";
      case "POST":
        return "text-blue-400 bg-blue-500/10";
      case "PUT":
        return "text-yellow-400 bg-yellow-500/10";
      case "DELETE":
        return "text-red-400 bg-red-500/10";
      default:
        return "text-gray-400 bg-gray-500/10";
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              API Management
            </h1>
            <p className="text-slate-400">
              Manage API keys, monitor usage, and configure integrations
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create API Key
          </Button>
        </div>

        {/* API Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Key className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">3</div>
                  <div className="text-sm text-slate-400">Active Keys</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Activity className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">3,041</div>
                  <div className="text-sm text-slate-400">API Calls Today</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Shield className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">99.8%</div>
                  <div className="text-sm text-slate-400">Uptime</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <Code className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">145ms</div>
                  <div className="text-sm text-slate-400">Avg Response</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* API Management Tabs */}
        <Tabs defaultValue="keys" className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger
              value="keys"
              className="data-[state=active]:bg-slate-700"
            >
              API Keys
            </TabsTrigger>
            <TabsTrigger
              value="endpoints"
              className="data-[state=active]:bg-slate-700"
            >
              Endpoints
            </TabsTrigger>
            <TabsTrigger
              value="usage"
              className="data-[state=active]:bg-slate-700"
            >
              Usage Analytics
            </TabsTrigger>
            <TabsTrigger
              value="docs"
              className="data-[state=active]:bg-slate-700"
            >
              Documentation
            </TabsTrigger>
          </TabsList>

          {/* API Keys Tab */}
          <TabsContent value="keys">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">API Keys</CardTitle>
                <CardDescription className="text-slate-400">
                  Manage your API keys and their permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiKeys.map((apiKey) => (
                    <div
                      key={apiKey.id}
                      className="bg-slate-700/30 p-4 rounded-lg border border-slate-600"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-white">
                              {apiKey.name}
                            </h3>
                            <Badge
                              variant="outline"
                              className={getStatusColor(apiKey.status)}
                            >
                              {apiKey.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <Input
                              value={
                                showKeys[apiKey.id]
                                  ? apiKey.key
                                  : maskApiKey(apiKey.key)
                              }
                              readOnly
                              className="bg-slate-800 border-slate-600 text-slate-300 font-mono text-sm"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleKeyVisibility(apiKey.id)}
                              className="border-slate-600 text-slate-300 hover:bg-slate-700"
                            >
                              {showKeys[apiKey.id] ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-slate-600 text-slate-300 hover:bg-slate-700"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-400">
                            <span>Created: {apiKey.createdAt}</span>
                            <span>Last used: {apiKey.lastUsed}</span>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {apiKey.permissions.map((permission, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-slate-600 text-slate-200"
                              >
                                {permission}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-slate-600 text-slate-300 hover:bg-slate-700"
                          >
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-600 text-red-400 hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Endpoints Tab */}
          <TabsContent value="endpoints">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">API Endpoints</CardTitle>
                <CardDescription className="text-slate-400">
                  Available API endpoints and their usage statistics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {apiEndpoints.map((endpoint, index) => (
                    <div
                      key={index}
                      className="bg-slate-700/30 p-4 rounded-lg border border-slate-600"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Badge
                            className={`${getMethodColor(endpoint.method)} border-0 font-mono`}
                          >
                            {endpoint.method}
                          </Badge>
                          <div>
                            <div className="text-white font-mono text-sm">
                              {endpoint.endpoint}
                            </div>
                            <div className="text-slate-400 text-sm">
                              {endpoint.description}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                          <div className="text-center">
                            <div className="text-white font-medium">
                              {endpoint.usage.toLocaleString()}
                            </div>
                            <div className="text-slate-400">Calls</div>
                          </div>
                          <div className="text-center">
                            <div className="text-white font-medium">
                              {endpoint.responseTime}
                            </div>
                            <div className="text-slate-400">Avg Time</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Usage Analytics Tab */}
          <TabsContent value="usage">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Usage Analytics</CardTitle>
                <CardDescription className="text-slate-400">
                  API usage statistics and performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-700/30 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Request Volume
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Today</span>
                        <span className="text-white font-medium">
                          3,041 requests
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">This Week</span>
                        <span className="text-white font-medium">
                          18,247 requests
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">This Month</span>
                        <span className="text-white font-medium">
                          89,156 requests
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-700/30 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Response Times
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Average</span>
                        <span className="text-white font-medium">145ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">95th Percentile</span>
                        <span className="text-white font-medium">320ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">99th Percentile</span>
                        <span className="text-white font-medium">580ms</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documentation Tab */}
          <TabsContent value="docs">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">API Documentation</CardTitle>
                <CardDescription className="text-slate-400">
                  Complete API reference and integration guides
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-slate-700/30 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Getting Started
                    </h3>
                    <p className="text-slate-400 mb-4">
                      Learn how to authenticate and make your first API call to
                      JobBlox.
                    </p>
                    <Button
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      View Guide
                    </Button>
                  </div>

                  <div className="bg-slate-700/30 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-3">
                      API Reference
                    </h3>
                    <p className="text-slate-400 mb-4">
                      Complete reference documentation for all available
                      endpoints.
                    </p>
                    <Button
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      Browse Reference
                    </Button>
                  </div>

                  <div className="bg-slate-700/30 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-3">
                      SDKs & Libraries
                    </h3>
                    <p className="text-slate-400 mb-4">
                      Official SDKs and community libraries for popular
                      programming languages.
                    </p>
                    <Button
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      Download SDKs
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default APIManagement;
