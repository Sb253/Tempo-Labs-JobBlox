import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, useInRouterContext } from "react-router-dom";
import { TempoDevtools } from "tempo-devtools";

// Initialize Tempo Devtools
TempoDevtools.init();

// Base URL + environment logging
try {
  const basename = import.meta.env.BASE_URL;
  console.log("Base URL:", basename);
  console.log("Environment:", import.meta.env.MODE);
} catch (e) {
  console.warn("Could not read BASE_URL or MODE:", e);
}

// Avoid double <Router> if wrapped by e.g. Tempo Preview
const AppWrapper = () => {
  const inRouter = useInRouterContext?.();
  return inRouter ? (
    <App />
  ) : (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
);

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

// Initialize the application if needed
if (typeof initializeApp === "function") {
  initializeApp();
}

// Route testing utilities for development
if (import.meta.env.DEV) {
  import("./utils/routeTest")
    .then(({ runComprehensiveRouteTests }) => {
      if (window.location.search.includes("test-routes")) {
        console.info("🧪 Route testing enabled via URL parameter");
        setTimeout(runComprehensiveRouteTests, 3000);
      }

      (window as any).testRoutes = runComprehensiveRouteTests;
      console.info("💡 Run window.testRoutes() to test all routes manually");
    })
    .catch((error) => {
      console.warn("Failed to load route testing utilities:", error);
    });
}
