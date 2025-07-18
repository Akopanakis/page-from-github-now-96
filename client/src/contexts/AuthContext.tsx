import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { safeGetJSON, safeSetJSON, safeRemoveItem } from "../utils/safeStorage";

interface User {
  id: string;
  email: string;
  isPremium: boolean;
  subscriptionDate?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string) => Promise<void>;
  upgradeToPremium: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const storedUser = safeGetJSON<User | null>("kostopro_user", null);
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Mock authentication - in real app this would call your auth service
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser: User = {
        id: "1",
        email,
        isPremium: false,
      };

      setUser(mockUser);
      safeSetJSON("kostopro_user", mockUser);
    } catch (error) {
      throw new Error("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Mock signup - in real app this would call your auth service
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser: User = {
        id: Date.now().toString(),
        email,
        isPremium: false,
      };

      setUser(mockUser);
      safeSetJSON("kostopro_user", mockUser);
    } catch (error) {
      throw new Error("Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    safeRemoveItem("kostopro_user");
  };

  const upgradeToPremium = async (): Promise<void> => {
    if (!user) throw new Error("No user logged in");

    setIsLoading(true);
    try {
      // Mock premium upgrade - in real app this would call your payment service
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedUser: User = {
        ...user,
        isPremium: true,
        subscriptionDate: new Date().toISOString(),
      };

      setUser(updatedUser);
      safeSetJSON("kostopro_user", updatedUser);
    } catch (error) {
      throw new Error("Premium upgrade failed");
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    signup,
    upgradeToPremium,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
