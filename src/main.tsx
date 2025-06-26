import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { TempoDevtools } from "tempo-devtools";

// Enhanced error handling for container issues
const initializeApp = async () => {
  try {
    console.log("Initializing Tempo DevTools...");
    TempoDevtools.init();
    console.log("Tempo DevTools initialized successfully");
  } catch (error) {
    console.error("Failed to initialize Tempo DevTools:", error);
    // Continue without DevTools if initialization fails
  }

  try {
    const basename = import.meta.env.BASE_URL;
    console.log("Base URL:", basename);
    console.log("Environment:", import.meta.env.MODE);

    const rootElement = document.getElementById("root");
    if (!rootElement) {
      throw new Error("Root element not found");
    }

    console.log("Creating React root...");
    const root = ReactDOM.createRoot(rootElement);

    console.log("Rendering application...");
    root.render(
      <React.StrictMode>
        <BrowserRouter basename={basename}>
          <App />
        </BrowserRouter>
      </React.StrictMode>,
    );

    console.log("Application rendered successfully");
  } catch (error) {
    console.error("Failed to initialize application:", error);

    // Fallback error display
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 20px; font-family: Arial, sans-serif; color: #333;">
          <h1 style="color: #e74c3c;">Application Error</h1>
          <p>Failed to initialize the application. Please check the console for details.</p>
          <details style="margin-top: 10px;">
            <summary>Error Details</summary>
            <pre style="background: #f8f9fa; padding: 10px; border-radius: 4px; overflow: auto;">${error instanceof Error ? error.stack : String(error)}</pre>
          </details>
          <button onclick="window.location.reload()" style="margin-top: 10px; padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Reload Page</button>
        </div>
      `;
    }
  }
};

// Global error handlers
window.addEventListener("error", (event) => {
  console.error("Global error:", event.error);
  console.error("Error details:", {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error,
  });
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);
  console.error("Promise:", event.promise);
});

// Initialize the application
initializeApp();

// Import route testing utilities in development
if (import.meta.env.DEV) {
  import("./utils/routeTest")
    .then(({ runComprehensiveRouteTests }) => {
      // Auto-run route tests if URL parameter is present
      if (window.location.search.includes("test-routes")) {
        console.info("🧪 Route testing enabled via URL parameter");
        setTimeout(runComprehensiveRouteTests, 3000);
      }

      // Add global function for manual testing
      (window as any).testRoutes = runComprehensiveRouteTests;
      console.info("💡 Run window.testRoutes() to test all routes manually");
    })
    .catch((error) => {
      console.warn("Failed to load route testing utilities:", error);
    });
}
