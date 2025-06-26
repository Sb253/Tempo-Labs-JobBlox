import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useRole } from "@/contexts/RoleContext";

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
      <Outlet />
    </div>
  );
};

export default AdminLayout;
