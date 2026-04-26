"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { authService } from "@/services/auth.service";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const { isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/dashboard";
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Email diperlukan");
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Format email tidak valid");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await authService.requestPasswordReset(email);
      setIsSuccess(true);
      toast.success("Link reset password telah dikirim ke email Anda");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal mengirim email");
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render if already authenticated
  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
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
            <h2 className="font-cormorant text-2xl font-bold">Email Terkirim!</h2>
            <p className="mt-2 text-muted-foreground">
              Silakan cek email Anda untuk link reset password.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              (Development: Cek console browser untuk link reset)
            </p>
            <Button variant="outline" className="mt-6 w-full" asChild>
              <Link href="/login">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Login
              </Link>
            </Button>
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
          <CardTitle className="font-cormorant text-3xl">Lupa Password</CardTitle>
          <CardDescription>
            Masukkan email Anda, kami akan mengirimkan link reset password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <Button type="submit" variant="default" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Mengirim...</>
              ) : (
                "Kirim Link Reset"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <Link href="/login" className="flex items-center text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Kembali ke Login
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}