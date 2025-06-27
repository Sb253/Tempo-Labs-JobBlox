import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  tenantId: string;
  avatar?: string;
  permissions?: string[];
}

interface TenantContext {
  tenantId: string;
  tenantName: string;
  features: string[];
  limits: Record<string, number>;
}

interface AuthContextType {
  user: User | null;
  tenant: TenantContext | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  switchTenant: (tenantId: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUser: User = {
  id: "mobile-user-1",
  name: "John Mobile",
  email: "john@jobblox.mobile",
  role: "admin",
  tenantId: "tenant-mobile-1",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  permissions: ["admin:*", "tenant:*"],
};

const mockTenant: TenantContext = {
  tenantId: "tenant-mobile-1",
  tenantName: "Mobile Construction Co.",
  features: ["ai_assistant", "advanced_reporting", "mobile_app"],
  limits: {
    users: 50,
    projects: 500,
    storage: 5000,
    apiCalls: 5000,
  },
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [tenant, setTenant] = useState<TenantContext | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("user");
      const savedTenant = await AsyncStorage.getItem("tenant");

      if (savedUser && savedTenant) {
        setUser(JSON.parse(savedUser));
        setTenant(JSON.parse(savedTenant));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error checking auth state:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful login
      const loggedInUser = {
        ...mockUser,
        email,
        name: email.split("@")[0] || "User",
      };

      const userTenant = {
        ...mockTenant,
        tenantName: `${email.split("@")[0]}'s Company`,
      };

      await AsyncStorage.setItem("user", JSON.stringify(loggedInUser));
      await AsyncStorage.setItem("tenant", JSON.stringify(userTenant));

      setUser(loggedInUser);
      setTenant(userTenant);
      setIsAuthenticated(true);

      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove(["user", "tenant"]);
      setUser(null);
      setTenant(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const switchTenant = async (tenantId: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newTenant: TenantContext = {
        tenantId,
        tenantName: `Tenant ${tenantId}`,
        features: ["basic_features"],
        limits: {
          users: 25,
          projects: 250,
          storage: 2500,
          apiCalls: 2500,
        },
      };

      await AsyncStorage.setItem("tenant", JSON.stringify(newTenant));
      setTenant(newTenant);

      return true;
    } catch (error) {
      console.error("Tenant switch failed:", error);
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    tenant,
    isAuthenticated,
    isLoading,
    login,
    logout,
    switchTenant,
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
