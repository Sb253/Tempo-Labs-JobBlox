import { Suspense, useEffect } from "react";
import {
  useRoutes,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Button } from "@/components/ui/button";
import Home from "./components/home";
import SubscriptionPage from "./components/SubscriptionPage";
import LoginForm from "./components/auth/LoginForm";
import SaasLandingPage from "./components/admin/SaasLandingPage";
import TenantLandingPage from "./components/tenants/TenantLandingPage";
import TenantHealthDashboard from "./components/monitoring/TenantHealthDashboard";
import TenantLayout from "./components/layouts/TenantLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import TenantDashboard from "./components/TenantDashboard";
import BackOfficeDashboard from "./components/backoffice/BackOfficeDashboard";
import SaasAdminDashboard from "./components/admin/SaasAdminDashboard";
import TempoWebsite from "./components/TempoWebsite";

// Dashboard Components
import KPIs from "./components/dashboard/KPIs";
import QuickActions from "./components/dashboard/QuickActions";

// Customer Components
import CustomerManagement from "./components/customers/CustomerManagement";
import CustomerProfile from "./components/customers/CustomerProfile";
import CustomerIntakeForm from "./components/customers/CustomerIntakeForm";
import Pipeline from "./components/customers/Pipeline";
import ClientAppointment from "./components/customers/ClientAppointment";
import Reviews from "./components/communications/Reviews";

// Job Components
import JobManagement from "./components/jobs/JobManagement";
import JobDetail from "./components/jobs/JobDetail";
import JobForm from "./components/jobs/JobForm";
import Scheduling from "./components/jobs/Scheduling";
import TimeTracking from "./components/jobs/TimeTracking";
import Photos from "./components/jobs/Photos";
import Safety from "./components/jobs/Safety";
import QualityControl from "./components/jobs/QualityControl";

// Financial Components
import Estimates from "./components/financial/Estimates";
import Invoices from "./components/financial/Invoices";
import Expenses from "./components/financial/Expenses";
import Goals from "./components/financial/Goals";
import TaxFinancial from "./components/financial/TaxFinancial";
import FinancialAnalytics from "./components/financial/FinancialAnalytics";
import PaymentIntegration from "./components/financial/PaymentIntegration";
import ProfitAnalysis from "./components/financial/ProfitAnalysis";
import QuickBooksIntegration from "./components/financial/QuickBooksIntegration";
import AccountingIntegration from "./components/financial/AccountingIntegration";

// HR Components
import TeamManagement from "./components/hr/TeamManagement";
import HRFeatures from "./components/hr/HRFeatures";
import SubcontractorManagement from "./components/hr/SubcontractorManagement";

// Inventory Components
import MaterialsServices from "./components/inventory/MaterialsServices";
import Inventory from "./components/inventory/Inventory";
import AdvancedInventory from "./components/inventory/AdvancedInventory";

// Equipment Components
import Equipment from "./components/equipment/Equipment";
import Vehicles from "./components/equipment/Vehicles";

// Location Components
import EmployeeLocations from "./components/location/EmployeeLocations";
import RadiusAssignment from "./components/location/RadiusAssignment";
import LocationManagement from "./components/location/LocationManagement";

// Reports Components
import Reports from "./components/reports/Reports";
import Analytics from "./components/reports/Analytics";
import MapView from "./components/reports/MapView";
import PredictiveAnalytics from "./components/reports/PredictiveAnalytics";
import AdvancedReporting from "./components/reports/AdvancedReporting";

// Communication Components
import CustomerCommunication from "./components/communications/CustomerCommunication";
import TeamChat from "./components/communications/TeamChat";

// AI Components
import AIChat from "./components/ai/AIChat";
import DocumentGeneration from "./components/ai/DocumentGeneration";
import PredictiveInsights from "./components/ai/PredictiveInsights";

// Integration Components
import QuickBooksIntegrationPage from "./components/integrations/QuickBooksIntegrationPage";
import PaymentProcessingIntegration from "./components/integrations/PaymentProcessingIntegration";
import APIManagement from "./components/integrations/APIManagement";

// Settings Components
import CompanySettings from "./components/settings/CompanySettings";
import UserSettings from "./components/settings/UserSettings";
import SystemConfig from "./components/settings/SystemConfig";
import BackOfficeSettings from "./components/settings/BackOfficeSettings";
import MobileSettings from "./components/settings/MobileSettings";
import BranchManagement from "./components/settings/BranchManagement";

import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { RoleProvider } from "./contexts/RoleContext";
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
  const { isAuthenticated, updateActivity, tenant } = useAuth();
  const location = useLocation();

  // Update user activity on route changes
  useEffect(() => {
    if (isAuthenticated) {
      updateActivity();
    }
  }, [location.pathname, isAuthenticated, updateActivity]);

  // Redirect authenticated users to their tenant dashboard
  const getDefaultTenantRoute = () => {
    if (isAuthenticated && tenant) {
      return `/${tenant.tenantId}/dashboard`;
    }
    return "/";
  };

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        {/* Tempo routes for storyboards */}
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}

        <Routes>
          {/* Root redirect */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to={getDefaultTenantRoute()} replace />
              ) : (
                <Home />
              )
            }
          />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/subscription" element={<SubscriptionPage />} />

          {/* Tenant-specific routes */}
          <Route path="/:tenantId" element={<TenantLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<TenantDashboard />} />
            <Route path="kpis" element={<KPIs />} />
            <Route path="quick-actions" element={<QuickActions />} />
            <Route path="customers" element={<CustomerManagement />} />
            <Route path="customer-profile" element={<CustomerProfile />} />
            <Route path="customer-intake" element={<CustomerIntakeForm />} />
            <Route path="pipeline" element={<Pipeline />} />
            <Route path="client-appointment" element={<ClientAppointment />} />
            <Route path="communication" element={<CustomerCommunication />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="jobs" element={<JobManagement />} />
            <Route path="job-detail" element={<JobDetail />} />
            <Route path="job-form" element={<JobForm />} />
            <Route path="scheduling" element={<Scheduling />} />
            <Route path="time-tracking" element={<TimeTracking />} />
            <Route path="photos" element={<Photos />} />
            <Route path="safety" element={<Safety />} />
            <Route path="quality-control" element={<QualityControl />} />
            <Route path="estimates" element={<Estimates />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="goals" element={<Goals />} />
            <Route path="tax-financial" element={<TaxFinancial />} />
            <Route
              path="financial-analytics"
              element={<FinancialAnalytics />}
            />
            <Route
              path="payment-integration"
              element={<PaymentIntegration />}
            />
            <Route path="profit-analysis" element={<ProfitAnalysis />} />
            <Route
              path="quickbooks-integration"
              element={<QuickBooksIntegration />}
            />
            <Route
              path="accounting-integration"
              element={<AccountingIntegration />}
            />
            <Route path="team-management" element={<TeamManagement />} />
            <Route path="hr-features" element={<HRFeatures />} />
            <Route
              path="subcontractor-management"
              element={<SubcontractorManagement />}
            />
            <Route path="materials-services" element={<MaterialsServices />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="advanced-inventory" element={<AdvancedInventory />} />
            <Route path="equipment" element={<Equipment />} />
            <Route path="vehicles" element={<Vehicles />} />
            <Route path="employee-locations" element={<EmployeeLocations />} />
            <Route path="radius-assignment" element={<RadiusAssignment />} />
            <Route
              path="location-management"
              element={<LocationManagement />}
            />
            <Route path="reports" element={<Reports />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="map-view" element={<MapView />} />
            <Route
              path="predictive-analytics"
              element={<PredictiveAnalytics />}
            />
            <Route path="advanced-reporting" element={<AdvancedReporting />} />
            <Route path="team-chat" element={<TeamChat />} />
            <Route path="ai-chat" element={<AIChat />} />
            <Route
              path="document-generation"
              element={<DocumentGeneration />}
            />
            <Route
              path="predictive-insights"
              element={<PredictiveInsights />}
            />
            <Route path="quickbooks" element={<QuickBooksIntegrationPage />} />
            <Route
              path="payment-processing"
              element={<PaymentProcessingIntegration />}
            />
            <Route path="api-management" element={<APIManagement />} />
            <Route path="company-settings" element={<CompanySettings />} />
            <Route path="user-management" element={<UserSettings />} />
            <Route path="system-config" element={<SystemConfig />} />
            <Route path="back-office" element={<BackOfficeSettings />} />
            <Route path="mobile-settings" element={<MobileSettings />} />
            <Route path="branch-management" element={<BranchManagement />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<SaasAdminDashboard />} />
            <Route path="dashboard" element={<SaasAdminDashboard />} />
            <Route path="tenants" element={<SaasAdminDashboard />} />
            <Route path="users" element={<SaasAdminDashboard />} />
            <Route path="monitoring" element={<TenantHealthDashboard />} />
            <Route path="settings" element={<SaasAdminDashboard />} />
            <Route
              path="*"
              element={<Navigate to="/admin/dashboard" replace />}
            />
          </Route>

          {/* Monitoring Routes */}
          <Route
            path="/monitoring/health"
            element={<TenantHealthDashboard />}
          />

          {/* Public Routes */}
          <Route path="/saas" element={<SaasLandingPage />} />
          <Route path="/tenants" element={<TenantLandingPage />} />
          <Route path="/tempo-website" element={<TempoWebsite />} />

          {/* Authentication Routes */}
          <Route
            path="/login/tenant"
            element={
              isAuthenticated ? (
                <Navigate to={getDefaultTenantRoute()} replace />
              ) : (
                <LoginForm loginType="tenant" />
              )
            }
          />
          <Route
            path="/login/admin"
            element={
              isAuthenticated ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <LoginForm loginType="admin" />
              )
            }
          />
          <Route
            path="/login"
            element={<Navigate to="/login/tenant" replace />}
          />

          {/* Tempo storyboard routes - must come before catch-all */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" element={<div />} />
          )}

          {/* Catch-all route for 404 */}
          <Route
            path="*"
            element={
              <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
                <div className="text-center space-y-4">
                  <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
                  <p className="text-slate-400">
                    The page you're looking for doesn't exist.
                  </p>
                  <Button
                    onClick={() =>
                      (window.location.href = isAuthenticated
                        ? getDefaultTenantRoute()
                        : "/")
                    }
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    Go Home
                  </Button>
                </div>
              </div>
            }
          />
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
        <RoleProvider>
          <AppContent />
        </RoleProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
