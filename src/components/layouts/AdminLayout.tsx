import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useRole } from "@/contexts/RoleContext";
import MegaMenu from "@/components/ui/mega-menu";

const AdminLayout: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { validateRoleAccess } = useRole();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login/admin" replace />;
  }

  // Check if user has admin role
  if (!validateRoleAccess("admin")) {
    console.warn("Insufficient permissions for admin route", {
      userRole: user?.role,
      userId: user?.id,
    });
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <MegaMenu isAdmin={true} />
      <div className="transition-all duration-300">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
