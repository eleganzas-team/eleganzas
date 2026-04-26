"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Loader2, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { createClient } from "@/lib/supabase/client";
import bcrypt from "bcryptjs";
import { toast } from "sonner";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const supabase = createClient();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);
  const [tokenError, setTokenError] = useState("");

  // Validate token on mount
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValidToken(false);
        setTokenError("Token tidak ditemukan");
        setIsValidating(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("password_resets")
          .select("*, users(email)")
          .eq("token", token)
          .is("used_at", null)
          .gt("expires_at", new Date().toISOString())
          .single();

        if (error || !data) {
          setIsValidToken(false);
          setTokenError("Token tidak valid atau sudah kadaluarsa");
        } else {
          setIsValidToken(true);
        }
      } catch (error) {
        setIsValidToken(false);
        setTokenError("Gagal memvalidasi token");
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [token, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      toast.error("Password diperlukan");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Password tidak cocok");
      return;
    }
    
    if (password.length < 6) {
      toast.error("Password minimal 6 karakter");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Get reset token data
      const { data: resetData, error: resetError } = await supabase
        .from("password_resets")
        .select("user_id")
        .eq("token", token)
        .single();

      if (resetError || !resetData) {
        throw new Error("Token tidak valid");
      }

      // Hash new password
      const passwordHash = await bcrypt.hash(password, 10);

      // Update user password
      const { error: updateError } = await supabase
        .from("users")
        .update({ 
          password_hash: passwordHash,
          updated_at: new Date().toISOString(),
        })
        .eq("id", resetData.user_id);

      if (updateError) throw updateError;

      // Mark token as used
      await supabase
        .from("password_resets")
        .update({ used_at: new Date().toISOString() })
        .eq("token", token);

      setIsSuccess(true);
      toast.success("Password berhasil direset!");
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error(error instanceof Error ? error.message : "Gagal mereset password");
    } finally {
      setIsLoading(false);
    }
  };

  if (isValidating) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardContent className="p-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <XCircle className="h-8 w-8 text-destructive" />
            </div>
            <h2 className="font-cormorant text-2xl font-bold">Token Tidak Valid</h2>
            <p className="mt-2 text-muted-foreground">
              {tokenError || "Link reset password tidak valid atau sudah kadaluarsa."}
            </p>
            <Button variant="outline" className="mt-6 w-full" asChild>
              <Link href="/forgot-password">
                Minta Link Baru
              </Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardContent className="p-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h2 className="font-cormorant text-2xl font-bold">Password Berhasil Direset!</h2>
            <p className="mt-2 text-muted-foreground">
              Password Anda telah berhasil diperbarui.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Mengarahkan ke halaman login...
            </p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="font-cormorant text-3xl">Reset Password</CardTitle>
          <CardDescription>Masukkan password baru Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password Baru (min. 6 karakter)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Konfirmasi Password Baru"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <Button type="submit" variant="default" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Memproses...</>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}