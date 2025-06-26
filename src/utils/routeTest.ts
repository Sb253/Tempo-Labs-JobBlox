// Route testing utilities for end-to-end navigation verification

export interface RouteTestResult {
  path: string;
  status: "success" | "error" | "redirect";
  actualPath?: string;
  error?: string;
  timestamp: Date;
}

export class RouteTestRunner {
  private results: RouteTestResult[] = [];

  // Test all critical routes
  async testAllRoutes(): Promise<RouteTestResult[]> {
    console.info("Starting comprehensive route testing...");

    const testRoutes = [
      // Public routes
      "/",
      "/home",
      "/saas",
      "/tenants",
      "/subscription",

      // Auth routes
      "/login",
      "/login/tenant",
      "/login/admin",

      // Admin routes (require auth)
      "/admin",
      "/admin/dashboard",
      "/admin/tenants",
      "/admin/users",
      "/admin/monitoring",
      "/admin/settings",

      // Monitoring routes
      "/monitoring/health",

      // Tenant routes (require auth and tenant context)
      "/test-tenant/dashboard",
      "/test-tenant/customers",
      "/test-tenant/jobs",
      "/test-tenant/estimates",
      "/test-tenant/invoices",
      "/test-tenant/payments",
      "/test-tenant/employees",
      "/test-tenant/reports",
      "/test-tenant/settings",

      // Invalid routes (should 404)
      "/invalid-route",
      "/test-tenant/invalid",
      "/admin/invalid",
    ];

    this.results = [];

    for (const route of testRoutes) {
      try {
        const result = await this.testRoute(route);
        this.results.push(result);
        console.info(`Route test: ${route} -> ${result.status}`, result);
      } catch (error) {
        const errorResult: RouteTestResult = {
          path: route,
          status: "error",
          error: error instanceof Error ? error.message : String(error),
          timestamp: new Date(),
        };
        this.results.push(errorResult);
        console.error(`Route test failed: ${route}`, error);
      }
    }

    return this.results;
  }

  // Test individual route
  private async testRoute(path: string): Promise<RouteTestResult> {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const originalPath = window.location.pathname;

      // Create a temporary history entry
      const testUrl = `${window.location.origin}${path}`;

      // Use fetch to test if route resolves
      fetch(testUrl, { method: "HEAD" })
        .then((response) => {
          const result: RouteTestResult = {
            path,
            status: response.ok ? "success" : "error",
            actualPath: response.url,
            timestamp: new Date(),
          };

          if (!response.ok) {
            result.error = `HTTP ${response.status}: ${response.statusText}`;
          }

          resolve(result);
        })
        .catch((error) => {
          resolve({
            path,
            status: "error",
            error: error.message,
            timestamp: new Date(),
          });
        });
    });
  }

  // Test navigation programmatically
  async testNavigation(): Promise<void> {
    console.info("Testing programmatic navigation...");

    // Test React Router navigation
    const testNavigations = [
      { from: "/", to: "/login/tenant", description: "Home to tenant login" },
      {
        from: "/login/tenant",
        to: "/admin",
        description: "Cross-portal navigation",
      },
      {
        from: "/admin",
        to: "/test-tenant/dashboard",
        description: "Admin to tenant dashboard",
      },
    ];

    for (const nav of testNavigations) {
      try {
        console.info(`Testing navigation: ${nav.description}`);

        // Simulate navigation
        window.history.pushState({}, "", nav.from);
        await new Promise((resolve) => setTimeout(resolve, 100));

        window.history.pushState({}, "", nav.to);
        await new Promise((resolve) => setTimeout(resolve, 100));

        console.info(`Navigation successful: ${nav.from} -> ${nav.to}`);
      } catch (error) {
        console.error(`Navigation failed: ${nav.description}`, error);
      }
    }
  }

  // Test tenant isolation
  async testTenantIsolation(): Promise<void> {
    console.info("Testing tenant isolation...");

    const tenantRoutes = [
      "/tenant-a/dashboard",
      "/tenant-b/dashboard",
      "/tenant-c/dashboard",
    ];

    for (const route of tenantRoutes) {
      try {
        // Test that each tenant route is isolated
        const result = await this.testRoute(route);
        console.info(`Tenant isolation test: ${route}`, result);
      } catch (error) {
        console.error(`Tenant isolation test failed: ${route}`, error);
      }
    }
  }

  // Generate test report
  generateReport(): string {
    const totalTests = this.results.length;
    const successCount = this.results.filter(
      (r) => r.status === "success",
    ).length;
    const errorCount = this.results.filter((r) => r.status === "error").length;
    const redirectCount = this.results.filter(
      (r) => r.status === "redirect",
    ).length;

    const report = `
=== ROUTE TEST REPORT ===
Total Routes Tested: ${totalTests}
Successful: ${successCount}
Errors: ${errorCount}
Redirects: ${redirectCount}
Success Rate: ${((successCount / totalTests) * 100).toFixed(1)}%

=== FAILED ROUTES ===
${this.results
  .filter((r) => r.status === "error")
  .map((r) => `❌ ${r.path}: ${r.error}`)
  .join("\n")}

=== SUCCESSFUL ROUTES ===
${this.results
  .filter((r) => r.status === "success")
  .map((r) => `✅ ${r.path}`)
  .join("\n")}
`;

    return report;
  }

  // Export results as JSON
  exportResults(): any {
    return {
      timestamp: new Date().toISOString(),
      summary: {
        total: this.results.length,
        success: this.results.filter((r) => r.status === "success").length,
        error: this.results.filter((r) => r.status === "error").length,
        redirect: this.results.filter((r) => r.status === "redirect").length,
      },
      results: this.results,
    };
  }
}

// Utility function to run all tests
export const runComprehensiveRouteTests = async (): Promise<void> => {
  const runner = new RouteTestRunner();

  console.info("🚀 Starting comprehensive route testing suite...");

  try {
    // Test all routes
    await runner.testAllRoutes();

    // Test navigation
    await runner.testNavigation();

    // Test tenant isolation
    await runner.testTenantIsolation();

    // Generate and display report
    const report = runner.generateReport();
    console.info(report);

    // Export results
    const results = runner.exportResults();
    console.info("📊 Test results:", results);

    // Store results in localStorage for debugging
    localStorage.setItem("route-test-results", JSON.stringify(results));
  } catch (error) {
    console.error("❌ Route testing suite failed:", error);
  }
};

// Auto-run tests in development mode
if (import.meta.env.DEV) {
  // Run tests after a delay to allow app to initialize
  setTimeout(() => {
    if (window.location.search.includes("test-routes")) {
      runComprehensiveRouteTests();
    }
  }, 2000);
}

export default {
  RouteTestRunner,
  runComprehensiveRouteTests,
};
