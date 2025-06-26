import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { tracingService } from "../utils/tracing";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  tenantId: string;
  sessionId: string;
  avatar?: string;
  permissions?: string[];
  lastActivity?: Date;
}

interface TenantContext {
  tenantId: string;
  tenantName: string;
  features: string[];
  limits: Record<string, number>;
}

interface SessionInfo {
  sessionId: string;
  traceId: string;
  startTime: Date;
  lastActivity: Date;
  ipAddress?: string;
  userAgent?: string;
}

interface AuthContextType {
  user: User | null;
  tenant: TenantContext | null;
  session: SessionInfo | null;
  isAuthenticated: boolean;
  bypassAuth: boolean;
  login: (
    email: string,
    password: string,
    tenantId?: string,
  ) => Promise<boolean>;
  logout: () => void;
  switchTenant: (tenantId: string) => Promise<boolean>;
  refreshSession: () => Promise<boolean>;
  updateActivity: () => void;
  toggleBypassAuth: () => void;
  setBypassAuth: (bypass: boolean) => void;
  getAuthHeaders: () => Record<string, string>;
  validateSession: () => boolean;
  clearTenantData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const BYPASS_AUTH_KEY = "jobblox_bypass_auth";
const MOCK_USER_KEY = "jobblox_mock_user";
const TENANT_KEY = "jobblox_tenant";
const SESSION_KEY = "jobblox_session";
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

// Generate unique trace ID for request correlation
const generateTraceId = (): string => {
  return tracingService.generateTraceId();
};

// Generate session ID
const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const mockUser: User = {
  id: "dev-user-1",
  name: "John Developer",
  email: "john@jobblox.dev",
  role: "admin",
  tenantId: "tenant-dev-1",
  sessionId: generateSessionId(),
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  permissions: ["admin:*", "tenant:*"],
  lastActivity: new Date(),
};

const mockTenant: TenantContext = {
  tenantId: "tenant-dev-1",
  tenantName: "Development Tenant",
  features: ["ai_assistant", "advanced_reporting", "api_access"],
  limits: {
    users: 100,
    projects: 1000,
    storage: 10000, // MB
    apiCalls: 10000,
  },
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [tenant, setTenant] = useState<TenantContext | null>(null);
  const [session, setSession] = useState<SessionInfo | null>(null);
  const [bypassAuth, setBypassAuthState] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Session validation and cleanup
  const validateSession = useCallback((): boolean => {
    if (!session) return false;

    const now = new Date();
    const timeSinceActivity = now.getTime() - session.lastActivity.getTime();

    if (timeSinceActivity > SESSION_TIMEOUT) {
      console.warn(`Session expired for user ${user?.id}`, {
        sessionId: session.sessionId,
        traceId: session.traceId,
        timeSinceActivity,
      });
      clearTenantData();
      return false;
    }

    return true;
  }, [session, user]);

  // Clear all tenant-specific data to prevent leaks
  const clearTenantData = useCallback(() => {
    console.info("Clearing tenant data for security", {
      userId: user?.id,
      tenantId: tenant?.tenantId,
      sessionId: session?.sessionId,
      traceId: session?.traceId,
    });

    setUser(null);
    setTenant(null);
    setSession(null);
    setIsAuthenticated(false);

    // Clear localStorage
    localStorage.removeItem(MOCK_USER_KEY);
    localStorage.removeItem(TENANT_KEY);
    localStorage.removeItem(SESSION_KEY);

    // Clear any cached API data
    if (typeof window !== "undefined") {
      // Clear any cached data that might contain tenant-specific information
      sessionStorage.clear();
    }
  }, [user, tenant, session]);

  // Update user activity timestamp
  const updateActivity = useCallback(() => {
    if (session && validateSession()) {
      const updatedSession = {
        ...session,
        lastActivity: new Date(),
      };
      setSession(updatedSession);
      localStorage.setItem(SESSION_KEY, JSON.stringify(updatedSession));
    }
  }, [session, validateSession]);

  // Initialize auth state from localStorage with validation
  useEffect(() => {
    const savedBypass = localStorage.getItem(BYPASS_AUTH_KEY);
    const savedUser = localStorage.getItem(MOCK_USER_KEY);
    const savedTenant = localStorage.getItem(TENANT_KEY);
    const savedSession = localStorage.getItem(SESSION_KEY);

    if (savedBypass === "true") {
      setBypassAuthState(true);

      try {
        let userToSet = mockUser;
        let tenantToSet = mockTenant;
        let sessionToSet: SessionInfo;

        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          // Ensure user has required security fields
          userToSet = {
            ...parsedUser,
            sessionId: parsedUser.sessionId || generateSessionId(),
            tenantId: parsedUser.tenantId || mockTenant.tenantId,
            lastActivity: new Date(),
          };
        }

        if (savedTenant) {
          tenantToSet = JSON.parse(savedTenant);
        }

        if (savedSession) {
          const parsedSession = JSON.parse(savedSession);
          sessionToSet = {
            ...parsedSession,
            lastActivity: new Date(parsedSession.lastActivity),
            startTime: new Date(parsedSession.startTime),
          };
        } else {
          sessionToSet = {
            sessionId: userToSet.sessionId,
            traceId: generateTraceId(),
            startTime: new Date(),
            lastActivity: new Date(),
            ipAddress: "localhost",
            userAgent: navigator.userAgent,
          };
        }

        // Validate session before setting state
        const now = new Date();
        const timeSinceActivity =
          now.getTime() - sessionToSet.lastActivity.getTime();

        if (timeSinceActivity <= SESSION_TIMEOUT) {
          setUser(userToSet);
          setTenant(tenantToSet);
          setSession(sessionToSet);
          setIsAuthenticated(true);

          // Update localStorage with validated data
          localStorage.setItem(MOCK_USER_KEY, JSON.stringify(userToSet));
          localStorage.setItem(TENANT_KEY, JSON.stringify(tenantToSet));
          localStorage.setItem(SESSION_KEY, JSON.stringify(sessionToSet));

          console.info("Session restored successfully", {
            userId: userToSet.id,
            tenantId: tenantToSet.tenantId,
            sessionId: sessionToSet.sessionId,
            traceId: sessionToSet.traceId,
          });
        } else {
          console.warn("Stored session expired, clearing data");
          clearTenantData();
        }
      } catch (error) {
        console.error("Failed to restore session, using defaults", error);
        // Fallback to mock data with new session
        const newSession: SessionInfo = {
          sessionId: generateSessionId(),
          traceId: generateTraceId(),
          startTime: new Date(),
          lastActivity: new Date(),
          ipAddress: "localhost",
          userAgent: navigator.userAgent,
        };

        const userWithSession = {
          ...mockUser,
          sessionId: newSession.sessionId,
        };

        setUser(userWithSession);
        setTenant(mockTenant);
        setSession(newSession);
        setIsAuthenticated(true);

        localStorage.setItem(MOCK_USER_KEY, JSON.stringify(userWithSession));
        localStorage.setItem(TENANT_KEY, JSON.stringify(mockTenant));
        localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
      }
    }
  }, [clearTenantData]);

  // Session timeout checker
  useEffect(() => {
    if (!isAuthenticated || !session) return;

    const interval = setInterval(() => {
      if (!validateSession()) {
        clearTenantData();
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [isAuthenticated, session, validateSession, clearTenantData]);

  const login = async (
    email: string,
    password: string,
    tenantId?: string,
  ): Promise<boolean> => {
    try {
      console.info("Login attempt started", { email, tenantId });

      // Clear any existing session data first
      clearTenantData();

      // Simulate API call with proper error handling
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create new session with security context
      const newSessionId = generateSessionId();
      const newTraceId = generateTraceId();

      // Generate tenant-friendly ID for URL routing
      const generatedTenantId =
        tenantId ||
        `tenant-${email
          .split("@")[0]
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "")}-${Date.now().toString().slice(-6)}`;

      const loggedInUser: User = {
        id: `user-${Date.now()}`,
        name: email.split("@")[0] || "User",
        email,
        role: "admin",
        tenantId: generatedTenantId,
        sessionId: newSessionId,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        permissions: ["admin:*", "tenant:*"],
        lastActivity: new Date(),
      };

      const userTenant: TenantContext = {
        tenantId: generatedTenantId,
        tenantName: `${email.split("@")[0]}'s Company`,
        features: ["ai_assistant", "advanced_reporting", "api_access"],
        limits: {
          users: 50,
          projects: 500,
          storage: 5000,
          apiCalls: 5000,
        },
      };

      const newSession: SessionInfo = {
        sessionId: newSessionId,
        traceId: newTraceId,
        startTime: new Date(),
        lastActivity: new Date(),
        ipAddress: "localhost",
        userAgent: navigator.userAgent,
      };

      // Set state atomically
      setUser(loggedInUser);
      setTenant(userTenant);
      setSession(newSession);
      setIsAuthenticated(true);

      // Persist to localStorage
      localStorage.setItem(MOCK_USER_KEY, JSON.stringify(loggedInUser));
      localStorage.setItem(TENANT_KEY, JSON.stringify(userTenant));
      localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));

      console.info("Login successful", {
        userId: loggedInUser.id,
        tenantId: userTenant.tenantId,
        sessionId: newSessionId,
        traceId: newTraceId,
      });

      // Trigger navigation to tenant dashboard
      setTimeout(() => {
        const targetUrl = `/${generatedTenantId}/dashboard`;
        console.info("Redirecting to tenant dashboard", { targetUrl });
        window.location.href = targetUrl;
      }, 100);

      return true;
    } catch (error) {
      console.error("Login failed", { email, error });
      clearTenantData();
      return false;
    }
  };

  const logout = useCallback(() => {
    console.info("Logout initiated", {
      userId: user?.id,
      tenantId: tenant?.tenantId,
      sessionId: session?.sessionId,
      traceId: session?.traceId,
    });

    clearTenantData();

    if (!bypassAuth) {
      localStorage.removeItem(BYPASS_AUTH_KEY);
    }
  }, [user, tenant, session, bypassAuth, clearTenantData]);

  const switchTenant = async (newTenantId: string): Promise<boolean> => {
    if (!user || !session) {
      console.error("Cannot switch tenant: no active session");
      return false;
    }

    try {
      console.info("Tenant switch initiated", {
        userId: user.id,
        fromTenant: tenant?.tenantId,
        toTenant: newTenantId,
        sessionId: session.sessionId,
        traceId: session.traceId,
      });

      // Clear current tenant data to prevent leaks
      const currentUser = user;
      const currentSession = session;

      // Simulate API call to validate tenant access
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Create new tenant context
      const newTenant: TenantContext = {
        tenantId: newTenantId,
        tenantName: `Tenant ${newTenantId}`,
        features: ["ai_assistant", "advanced_reporting"],
        limits: {
          users: 25,
          projects: 250,
          storage: 2500,
          apiCalls: 2500,
        },
      };

      // Update user with new tenant
      const updatedUser: User = {
        ...currentUser,
        tenantId: newTenantId,
        lastActivity: new Date(),
      };

      // Update session activity
      const updatedSession: SessionInfo = {
        ...currentSession,
        lastActivity: new Date(),
        traceId: generateTraceId(), // New trace ID for tenant switch
      };

      setUser(updatedUser);
      setTenant(newTenant);
      setSession(updatedSession);

      // Update localStorage
      localStorage.setItem(MOCK_USER_KEY, JSON.stringify(updatedUser));
      localStorage.setItem(TENANT_KEY, JSON.stringify(newTenant));
      localStorage.setItem(SESSION_KEY, JSON.stringify(updatedSession));

      console.info("Tenant switch successful", {
        userId: updatedUser.id,
        newTenantId,
        sessionId: updatedSession.sessionId,
        traceId: updatedSession.traceId,
      });

      return true;
    } catch (error) {
      console.error("Tenant switch failed", { newTenantId, error });
      return false;
    }
  };

  const refreshSession = async (): Promise<boolean> => {
    if (!user || !session) return false;

    try {
      const updatedSession: SessionInfo = {
        ...session,
        lastActivity: new Date(),
        traceId: generateTraceId(),
      };

      setSession(updatedSession);
      localStorage.setItem(SESSION_KEY, JSON.stringify(updatedSession));

      console.info("Session refreshed", {
        userId: user.id,
        sessionId: updatedSession.sessionId,
        traceId: updatedSession.traceId,
      });

      return true;
    } catch (error) {
      console.error("Session refresh failed", error);
      return false;
    }
  };

  const getAuthHeaders = useCallback((): Record<string, string> => {
    if (!user || !session || !tenant) {
      return {};
    }

    return {
      Authorization: `Bearer ${session.sessionId}`,
      "X-Tenant-ID": tenant.tenantId,
      "X-User-ID": user.id,
      "X-Session-ID": session.sessionId,
      "X-Trace-ID": session.traceId,
      "X-Request-ID": `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  }, [user, session, tenant]);

  const toggleBypassAuth = () => {
    const newBypass = !bypassAuth;
    setBypassAuth(newBypass);
  };

  const setBypassAuth = (bypass: boolean) => {
    console.info("Bypass auth mode changed", { bypass });

    setBypassAuthState(bypass);
    localStorage.setItem(BYPASS_AUTH_KEY, bypass.toString());

    if (bypass) {
      // Enable bypass mode - create mock user with proper session
      const newSession: SessionInfo = {
        sessionId: generateSessionId(),
        traceId: generateTraceId(),
        startTime: new Date(),
        lastActivity: new Date(),
        ipAddress: "localhost",
        userAgent: navigator.userAgent,
      };

      const userWithSession = { ...mockUser, sessionId: newSession.sessionId };

      setUser(userWithSession);
      setTenant(mockTenant);
      setSession(newSession);
      setIsAuthenticated(true);

      localStorage.setItem(MOCK_USER_KEY, JSON.stringify(userWithSession));
      localStorage.setItem(TENANT_KEY, JSON.stringify(mockTenant));
      localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
    } else {
      // Disable bypass mode - clear all auth state
      clearTenantData();
    }
  };

  const value: AuthContextType = {
    user,
    tenant,
    session,
    isAuthenticated,
    bypassAuth,
    login,
    logout,
    switchTenant,
    refreshSession,
    updateActivity,
    toggleBypassAuth,
    setBypassAuth,
    getAuthHeaders,
    validateSession,
    clearTenantData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
