"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { useRouter } from "next/navigation";
import { authService} from "@/services/auth.service";
import { toast } from "sonner";
import { User } from "@/lib/supabase/types";

interface AuthContextType {
  user: UserPublic | null;
  isLoading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<UserPublic>) => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserPublic | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  // Load user from localStorage on mount (sync)
  useEffect(() => {
    const loadUser = () => {
      try {
        const currentUser = authService.getCurrentUser();
        console.log("Initial user load:", currentUser?.email || "No user");
        setUser(currentUser);
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    loadUser();
  }, []);

  // Validate session with server (async)
  useEffect(() => {
    if (!isInitialized) return;

    const validateSession = async () => {
      try {
        const validatedUser = await authService.validateSession();
        if (validatedUser) {
          console.log("Session validated:", validatedUser.email);
          setUser(validatedUser);
        } else if (user) {
          // Session invalid, clear user
          console.log("Session invalid, clearing user");
          setUser(null);
        }
      } catch (error) {
        console.error("Session validation error:", error);
      }
    };

    validateSession();
  }, [isInitialized, user?.id]);

  const signUp = useCallback(async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    try {
      const newUser = await authService.register(email, password, name);
      setUser(newUser);
      toast.success("Registrasi berhasil!");
      
      // Gunakan window.location untuk hard redirect
      window.location.href = "/dashboard";
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal mendaftar");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const { user: loggedInUser } = await authService.login(email, password);
      setUser(loggedInUser);
      toast.success("Berhasil login!");
      
      // Gunakan window.location untuk hard redirect
      window.location.href = "/dashboard";
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal login");
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await authService.logout();
      setUser(null);
      toast.success("Berhasil logout");
      
      // Gunakan window.location untuk hard redirect
      window.location.href = "/";
    } catch (error) {
      toast.error("Gagal logout");
    }
  }, []);

  const updateProfile = useCallback(async (data: Partial<User>) => {
    if (!user) throw new Error("Not authenticated");
    
    try {
      const updatedUser = await authService.updateProfile(user.id, data);
      setUser(updatedUser);
      toast.success("Profil berhasil diperbarui");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal memperbarui profil");
      throw error;
    }
  }, [user]);

  const changePassword = useCallback(async (oldPassword: string, newPassword: string) => {
    if (!user) throw new Error("Not authenticated");
    
    try {
      await authService.changePassword(user.id, oldPassword, newPassword);
      toast.success("Password berhasil diubah");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal mengubah password");
      throw error;
    }
  }, [user]);

  

  const isAuthenticated = user !== null;

  const value = {
    user,
    isLoading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    changePassword,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}