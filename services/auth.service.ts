import { createClient } from "@/lib/supabase/client";
import bcrypt from "bcryptjs";
import type { User, Session } from "@/lib/supabase/types";

const SESSION_KEY = "eleganzas-session";

// Helper functions
const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

const generateToken = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const authService = {
  // Register new user
  async register(email: string, password: string, fullName: string): Promise<UserPublic> {
    const supabase = createClient();
    
    console.log("Registering user:", email);
    
    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();
    
    if (existing) {
      throw new Error("Email sudah terdaftar");
    }
    
    const passwordHash = await hashPassword(password);
    
    const { data: user, error } = await supabase
      .from("users")
      .insert({
        email,
        password_hash: passwordHash,
        full_name: fullName,
        role: 'user',
      })
      .select("id, email, full_name, avatar_url, role, phone, wedding_date, created_at")
      .single();
    
    if (error) {
      console.error("Insert user error:", error);
      throw new Error(`Gagal membuat akun: ${error.message}`);
    }
    
    console.log("User registered successfully:", user);
    return user as UserPublic;
  },

  // Login user
  async login(email: string, password: string): Promise<{ user: User; session: Session }> {
    const supabase = createClient();
    
    console.log("Logging in user:", email);
    
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();
    
    if (error || !user) {
      throw new Error("Email atau password salah");
    }
    
    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      throw new Error("Email atau password salah");
    }
    
    // Delete expired sessions
    await supabase
      .from("sessions")
      .delete()
      .eq("user_id", user.id)
      .lt("expires_at", new Date().toISOString());
    
    // Create new session
    const token = generateToken();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    
    const { data: session, error: sessionError } = await supabase
      .from("sessions")
      .insert({
        user_id: user.id,
        token,
        expires_at: expiresAt.toISOString(),
      })
      .select("*")
      .single();
    
    if (sessionError) {
      throw new Error(`Gagal membuat session: ${sessionError.message}`);
    }
    
    const { password_hash, ...userWithoutPassword } = user;
    
    const sessionData = {
      user: userWithoutPassword as User,
      session: {
        token: session.token,
        expires_at: session.expires_at,
      },
    };
    
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    console.log("Login successful");
    
    return { user: userWithoutPassword as User, session: session as Session };
  },

  // Logout
  async logout(): Promise<void> {
    const supabase = createClient();
    const sessionData = localStorage.getItem(SESSION_KEY);
    
    if (sessionData) {
      try {
        const { session } = JSON.parse(sessionData);
        await supabase.from("sessions").delete().eq("token", session.token);
      } catch (error) {
        console.error("Error deleting session:", error);
      }
    }
    
    localStorage.removeItem(SESSION_KEY);
    console.log("Logout successful");
  },

  // Get current session
  getSession(): { user: User; session: { token: string; expires_at: string } } | null {
    try {
      const sessionData = localStorage.getItem(SESSION_KEY);
      if (!sessionData) return null;
      
      const parsed = JSON.parse(sessionData);
      
      if (new Date(parsed.session.expires_at) < new Date()) {
        localStorage.removeItem(SESSION_KEY);
        return null;
      }
      
      return parsed;
    } catch {
      return null;
    }
  },

  // Validate session with server
  async validateSession(): Promise<User | null> {
    const sessionData = this.getSession();
    if (!sessionData) return null;
    
    const supabase = createClient();
    
    const { data: session, error } = await supabase
      .from("sessions")
      .select(`*, users(*)`)
      .eq("token", sessionData.session.token)
      .gt("expires_at", new Date().toISOString())
      .single();
    
    if (error || !session) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    
    const userData = session.users as any;
    const { password_hash, ...user } = userData;
    
    return user as User;
  },

  // Get current user
  getCurrentUser(): User | null {
    const session = this.getSession();
    return session?.user || null;
  },

  // Check if authenticated
  isAuthenticated(): boolean {
    return this.getSession() !== null;
  },

  // Update user profile
  async updateProfile(userId: string, data: Partial<User>): Promise<UserPublic> {
    const supabase = createClient();
    
    const allowedFields: Partial<User> = {};
    if (data.full_name !== undefined) allowedFields.full_name = data.full_name;
    if (data.phone !== undefined) allowedFields.phone = data.phone;
    if (data.avatar_url !== undefined) allowedFields.avatar_url = data.avatar_url;
    
    const { data: user, error } = await supabase
      .from("users")
      .update({
        ...allowedFields,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select("id, email, full_name, avatar_url, role, phone, wedding_date, created_at")
      .single();
    
    if (error) {
      throw new Error(`Gagal update profil: ${error.message}`);
    }
    
    const sessionData = this.getSession();
    if (sessionData) {
      sessionData.user = { ...sessionData.user, ...user };
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    }
    
    return user as UserPublic;
  },

  // Change password
  async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void> {
    const supabase = createClient();
    
    const { data: user, error } = await supabase
      .from("users")
      .select("password_hash")
      .eq("id", userId)
      .single();
    
    if (error || !user) {
      throw new Error("User tidak ditemukan");
    }
    
    const isValid = await verifyPassword(oldPassword, user.password_hash);
    if (!isValid) {
      throw new Error("Password lama salah");
    }
    
    const newHash = await hashPassword(newPassword);
    
    const { error: updateError } = await supabase
      .from("users")
      .update({ 
        password_hash: newHash,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);
    
    if (updateError) {
      throw new Error(`Gagal mengubah password: ${updateError.message}`);
    }
  },

  // Request password reset
  async requestPasswordReset(email: string): Promise<void> {
    const supabase = createClient();
    
    const { data: user } = await supabase
      .from("users")
      .select("id, email, full_name")
      .eq("email", email)
      .single();
    
    if (!user) {
      console.log("Password reset requested for non-existent email:", email);
      return;
    }
    
    const resetToken = generateToken();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);
    
    const { error } = await supabase
      .from("password_resets")
      .insert({
        user_id: user.id,
        token: resetToken,
        expires_at: expiresAt.toISOString(),
      });
    
    if (error) {
      throw new Error("Gagal membuat token reset");
    }
    
    const resetLink = `${window.location.origin}/reset-password?token=${resetToken}`;
    console.log("Password reset link:", resetLink);
  },

  // Reset password with token
  async resetPassword(token: string, newPassword: string): Promise<void> {
    const supabase = createClient();
    
    const { data: resetData, error: resetError } = await supabase
      .from("password_resets")
      .select("user_id")
      .eq("token", token)
      .is("used_at", null)
      .gt("expires_at", new Date().toISOString())
      .single();
    
    if (resetError || !resetData) {
      throw new Error("Token tidak valid atau sudah kadaluarsa");
    }
    
    const passwordHash = await hashPassword(newPassword);
    
    const { error: updateError } = await supabase
      .from("users")
      .update({ 
        password_hash: passwordHash,
        updated_at: new Date().toISOString(),
      })
      .eq("id", resetData.user_id);
    
    if (updateError) throw updateError;
    
    await supabase
      .from("password_resets")
      .update({ used_at: new Date().toISOString() })
      .eq("token", token);
  },
};