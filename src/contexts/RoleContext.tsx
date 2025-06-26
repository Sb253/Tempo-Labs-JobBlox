import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";

type UserRole =
  | "owner"
  | "admin"
  | "manager"
  | "field_worker"
  | "sales_rep"
  | "subcontractor";

interface Permission {
  module: string;
  actions: string[];
}

interface RoleContextType {
  userRole: UserRole;
  permissions: Permission[];
  hasPermission: (module: string, action: string) => boolean;
  canAccess: (module: string) => boolean;
  setUserRole: (role: UserRole) => void;
  getAllRoles: () => UserRole[];
  getRoleDisplayName: (role: UserRole) => string;
  clearRoleData: () => void;
  validateRoleAccess: (requiredRole: UserRole) => boolean;
  getEffectivePermissions: () => string[];
}

const rolePermissions: Record<UserRole, Permission[]> = {
  owner: [
    { module: "dashboard", actions: ["view", "edit", "delete"] },
    { module: "users", actions: ["view", "create", "edit", "delete"] },
    { module: "customers", actions: ["view", "create", "edit", "delete"] },
    { module: "jobs", actions: ["view", "create", "edit", "delete"] },
    { module: "estimates", actions: ["view", "create", "edit", "delete"] },
    { module: "invoices", actions: ["view", "create", "edit", "delete"] },
    { module: "payments", actions: ["view", "create", "edit", "delete"] },
    { module: "reports", actions: ["view", "create", "edit", "delete"] },
    { module: "settings", actions: ["view", "create", "edit", "delete"] },
    { module: "integrations", actions: ["view", "create", "edit", "delete"] },
  ],
  admin: [
    { module: "dashboard", actions: ["view", "edit"] },
    { module: "users", actions: ["view", "create", "edit"] },
    { module: "customers", actions: ["view", "create", "edit", "delete"] },
    { module: "jobs", actions: ["view", "create", "edit", "delete"] },
    { module: "estimates", actions: ["view", "create", "edit", "delete"] },
    { module: "invoices", actions: ["view", "create", "edit", "delete"] },
    { module: "payments", actions: ["view", "create", "edit"] },
    { module: "reports", actions: ["view", "create"] },
    { module: "settings", actions: ["view", "edit"] },
    { module: "integrations", actions: ["view", "create", "edit"] },
  ],
  manager: [
    { module: "dashboard", actions: ["view"] },
    { module: "customers", actions: ["view", "create", "edit"] },
    { module: "jobs", actions: ["view", "create", "edit"] },
    { module: "estimates", actions: ["view", "create", "edit"] },
    { module: "invoices", actions: ["view", "create"] },
    { module: "payments", actions: ["view"] },
    { module: "reports", actions: ["view"] },
  ],
  field_worker: [
    { module: "dashboard", actions: ["view"] },
    { module: "jobs", actions: ["view", "edit"] },
    { module: "customers", actions: ["view"] },
  ],
  sales_rep: [
    { module: "dashboard", actions: ["view"] },
    { module: "customers", actions: ["view", "create", "edit"] },
    { module: "estimates", actions: ["view", "create", "edit"] },
    { module: "jobs", actions: ["view"] },
  ],
  subcontractor: [
    { module: "dashboard", actions: ["view"] },
    { module: "jobs", actions: ["view"] },
  ],
};

const roleDisplayNames: Record<UserRole, string> = {
  owner: "Owner",
  admin: "Administrator",
  manager: "Manager",
  field_worker: "Field Worker",
  sales_rep: "Sales Representative",
  subcontractor: "Subcontractor",
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user, tenant, session, isAuthenticated } = useAuth();
  const [userRole, setUserRoleState] = useState<UserRole>("admin");
  const [permissions, setPermissions] = useState<Permission[]>([]);

  // Clear role data when user logs out or switches tenants
  const clearRoleData = useCallback(() => {
    console.info("Clearing role data for security", {
      userId: user?.id,
      tenantId: tenant?.tenantId,
      sessionId: session?.sessionId,
    });
    setUserRoleState("admin");
    setPermissions([]);
  }, [user?.id, tenant?.tenantId, session?.sessionId]);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      clearRoleData();
      return;
    }

    // Validate tenant context for role assignment
    if (!tenant) {
      console.warn("No tenant context for role assignment", {
        userId: user.id,
        userRole: user.role,
      });
      clearRoleData();
      return;
    }

    // Ensure role is valid for this tenant
    const role = (user?.role as UserRole) || "admin";
    const tenantPermissions = rolePermissions[role] || [];

    console.info("Setting user role and permissions", {
      userId: user.id,
      tenantId: tenant.tenantId,
      role,
      permissionCount: tenantPermissions.length,
      sessionId: session?.sessionId,
    });

    setUserRoleState(role);
    setPermissions(tenantPermissions);
  }, [user, tenant, session, isAuthenticated, clearRoleData]);

  const hasPermission = useCallback(
    (module: string, action: string): boolean => {
      if (!isAuthenticated || !user || !tenant) {
        console.warn("Permission check without proper context", {
          module,
          action,
          isAuthenticated,
          hasUser: !!user,
          hasTenant: !!tenant,
        });
        return false;
      }

      const modulePermission = permissions.find((p) => p.module === module);
      const hasAccess = modulePermission
        ? modulePermission.actions.includes(action)
        : false;

      console.debug("Permission check", {
        module,
        action,
        hasAccess,
        userRole,
        tenantId: tenant?.tenantId,
        userId: user?.id,
      });

      return hasAccess;
    },
    [permissions, isAuthenticated, user, tenant, userRole],
  );

  const canAccess = useCallback(
    (module: string): boolean => {
      if (!isAuthenticated || !user || !tenant) {
        return false;
      }
      return permissions.some((p) => p.module === module);
    },
    [permissions, isAuthenticated, user, tenant],
  );

  const validateRoleAccess = useCallback(
    (requiredRole: UserRole): boolean => {
      if (!isAuthenticated || !user || !tenant) {
        return false;
      }

      // Define role hierarchy (higher index = more permissions)
      const roleHierarchy: UserRole[] = [
        "subcontractor",
        "field_worker",
        "sales_rep",
        "manager",
        "admin",
        "owner",
      ];

      const userRoleIndex = roleHierarchy.indexOf(userRole);
      const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);

      return userRoleIndex >= requiredRoleIndex;
    },
    [userRole, isAuthenticated, user, tenant],
  );

  const getEffectivePermissions = useCallback((): string[] => {
    return permissions.flatMap((p) =>
      p.actions.map((action) => `${p.module}:${action}`),
    );
  }, [permissions]);

  const setUserRole = useCallback(
    (role: UserRole) => {
      if (!tenant) {
        console.error("Cannot set role without tenant context");
        return;
      }

      console.info("Role change requested", {
        oldRole: userRole,
        newRole: role,
        tenantId: tenant.tenantId,
        userId: user?.id,
      });

      setUserRoleState(role);
      setPermissions(rolePermissions[role] || []);
    },
    [userRole, tenant, user?.id],
  );

  const getAllRoles = useCallback((): UserRole[] => {
    return Object.keys(rolePermissions) as UserRole[];
  }, []);

  const getRoleDisplayName = useCallback((role: UserRole): string => {
    return roleDisplayNames[role] || role;
  }, []);

  const value: RoleContextType = {
    userRole,
    permissions,
    hasPermission,
    canAccess,
    setUserRole,
    getAllRoles,
    getRoleDisplayName,
    clearRoleData,
    validateRoleAccess,
    getEffectivePermissions,
  };

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};

export const useRole = (): RoleContextType => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    // Return a safe default context to prevent null errors
    return {
      userRole: "admin",
      permissions: [],
      hasPermission: () => false,
      canAccess: () => false,
      setUserRole: () => {},
      getAllRoles: () => [],
      getRoleDisplayName: () => "Unknown",
      clearRoleData: () => {},
      validateRoleAccess: () => false,
      getEffectivePermissions: () => [],
    };
  }
  return context;
};

export type { UserRole, Permission };
