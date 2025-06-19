import { Suspense, useState, useEffect } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import SubscriptionPage from "./components/SubscriptionPage";
import LoginForm from "./components/auth/LoginForm";
import SaasAdminDashboard from "./components/admin/SaasAdminDashboard";
import BackOfficeDashboard from "./components/backoffice/BackOfficeDashboard";
import SaasLandingPage from "./components/admin/SaasLandingPage";
import TenantLandingPage from "./components/tenants/TenantLandingPage";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Toaster } from "@/components/ui/toaster";
import routes from "tempo-routes";

// Loading component with enhanced styling
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      <p className="text-slate-300 animate-pulse">Loading JobBlox...</p>
    </div>
  </div>
);

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        {/* Tempo routes for storyboards */}
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route
            path="/admin"
            element={
              isAuthenticated ? (
                <SaasAdminDashboard />
              ) : (
                <Navigate to="/login/admin" replace />
              )
            }
          />
          <Route
            path="/backoffice"
            element={
              isAuthenticated ? (
                <BackOfficeDashboard />
              ) : (
                <Navigate to="/login/tenant" replace />
              )
            }
          />
          <Route path="/saas" element={<SaasLandingPage />} />
          <Route path="/tenants" element={<TenantLandingPage />} />
          <Route
            path="/login/tenant"
            element={<LoginForm loginType="tenant" />}
          />
          <Route
            path="/login/admin"
            element={<LoginForm loginType="admin" />}
          />
          <Route
            path="/login"
            element={<Navigate to="/login/tenant" replace />}
          />
          {/* Catch-all route for 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Global toast notifications */}
        <Toaster />
      </div>
    </Suspense>
  );
};

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="jobblox-ui-theme">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
