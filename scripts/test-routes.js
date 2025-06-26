#!/usr/bin/env node

// Comprehensive route testing script for CI/CD pipeline
const { spawn } = require("child_process");
const http = require("http");
const https = require("https");

class RouteTestRunner {
  constructor(baseUrl = "http://localhost:3000") {
    this.baseUrl = baseUrl;
    this.results = [];
  }

  async testRoute(path) {
    return new Promise((resolve) => {
      const url = `${this.baseUrl}${path}`;
      const client = url.startsWith("https") ? https : http;

      const startTime = Date.now();

      const req = client.get(url, (res) => {
        const duration = Date.now() - startTime;
        const result = {
          path,
          status: res.statusCode,
          success: res.statusCode >= 200 && res.statusCode < 400,
          duration,
          headers: res.headers,
          timestamp: new Date().toISOString(),
        };

        resolve(result);
      });

      req.on("error", (error) => {
        resolve({
          path,
          status: 0,
          success: false,
          error: error.message,
          duration: Date.now() - startTime,
          timestamp: new Date().toISOString(),
        });
      });

      req.setTimeout(10000, () => {
        req.destroy();
        resolve({
          path,
          status: 0,
          success: false,
          error: "Request timeout",
          duration: Date.now() - startTime,
          timestamp: new Date().toISOString(),
        });
      });
    });
  }

  async runAllTests() {
    console.log("🚀 Starting comprehensive route testing...");
    console.log(`📍 Base URL: ${this.baseUrl}`);

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

      // Admin routes
      "/admin",
      "/admin/dashboard",
      "/admin/tenants",
      "/admin/users",
      "/admin/monitoring",
      "/admin/settings",

      // Monitoring routes
      "/monitoring/health",

      // Tenant routes
      "/test-tenant/dashboard",
      "/test-tenant/customers",
      "/test-tenant/jobs",
      "/test-tenant/estimates",
      "/test-tenant/invoices",
      "/test-tenant/payments",
      "/test-tenant/employees",
      "/test-tenant/reports",
      "/test-tenant/settings",

      // Invalid routes (should return 200 with index.html for SPA)
      "/invalid-route",
      "/test-tenant/invalid",
      "/admin/invalid",

      // Deep nested routes
      "/test-tenant/customers/123",
      "/test-tenant/jobs/456/edit",
      "/admin/tenants/789/settings",
    ];

    this.results = [];

    for (const route of testRoutes) {
      try {
        console.log(`🧪 Testing: ${route}`);
        const result = await this.testRoute(route);
        this.results.push(result);

        const status = result.success ? "✅" : "❌";
        console.log(
          `${status} ${route} -> ${result.status} (${result.duration}ms)`,
        );

        if (!result.success && result.error) {
          console.log(`   Error: ${result.error}`);
        }
      } catch (error) {
        console.error(`❌ Failed to test ${route}:`, error.message);
        this.results.push({
          path: route,
          status: 0,
          success: false,
          error: error.message,
          timestamp: new Date().toISOString(),
        });
      }
    }

    return this.generateReport();
  }

  generateReport() {
    const totalTests = this.results.length;
    const successCount = this.results.filter((r) => r.success).length;
    const failureCount = totalTests - successCount;
    const averageDuration =
      this.results.reduce((sum, r) => sum + (r.duration || 0), 0) / totalTests;

    const report = {
      summary: {
        total: totalTests,
        success: successCount,
        failure: failureCount,
        successRate: ((successCount / totalTests) * 100).toFixed(1),
        averageDuration: Math.round(averageDuration),
      },
      results: this.results,
      timestamp: new Date().toISOString(),
    };

    console.log("\n📊 TEST SUMMARY");
    console.log("================");
    console.log(`Total Routes Tested: ${report.summary.total}`);
    console.log(`Successful: ${report.summary.success}`);
    console.log(`Failed: ${report.summary.failure}`);
    console.log(`Success Rate: ${report.summary.successRate}%`);
    console.log(`Average Response Time: ${report.summary.averageDuration}ms`);

    if (failureCount > 0) {
      console.log("\n❌ FAILED ROUTES:");
      this.results
        .filter((r) => !r.success)
        .forEach((r) => {
          console.log(`   ${r.path}: ${r.error || `HTTP ${r.status}`}`);
        });
    }

    console.log("\n✅ SUCCESSFUL ROUTES:");
    this.results
      .filter((r) => r.success)
      .forEach((r) => {
        console.log(`   ${r.path} (${r.duration}ms)`);
      });

    return report;
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const baseUrl = args[0] || "http://localhost:3000";

  console.log("🏗️  JobBlox Route Testing Suite");
  console.log("================================\n");

  const runner = new RouteTestRunner(baseUrl);

  try {
    const report = await runner.runAllTests();

    // Write report to file
    const fs = require("fs");
    const reportPath = "route-test-report.json";
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 Report saved to: ${reportPath}`);

    // Exit with error code if tests failed
    if (report.summary.failure > 0) {
      console.log("\n❌ Some routes failed. Check the report for details.");
      process.exit(1);
    } else {
      console.log("\n🎉 All routes passed!");
      process.exit(0);
    }
  } catch (error) {
    console.error("💥 Route testing failed:", error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { RouteTestRunner };
