import React from "react";
import { Navigate, useParams, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import MegaMenu from "@/components/ui/mega-menu";

const TenantLayout: React.FC = () => {
  const { isAuthenticated, tenant, user } = useAuth();
  const { tenantId } = useParams<{ tenantId: string }>();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login/tenant" replace />;
  }

  // Validate tenant context
  if (!tenant) {
    console.error("Tenant context missing for tenant route", {
      tenantId,
      userId: user?.id,
    });
    return <Navigate to="/login/tenant" replace />;
  }

  // Validate tenant ID matches URL
  if (tenant.tenantId !== tenantId) {
    console.warn("Tenant ID mismatch", {
      urlTenantId: tenantId,
      contextTenantId: tenant.tenantId,
      userId: user?.id,
    });
    return <Navigate to={`/${tenant.tenantId}/dashboard`} replace />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <MegaMenu isAdmin={false} />
      <div className="transition-all duration-300">
        <Outlet />
      </div>
    </div>
  );
};

export default TenantLayout;
