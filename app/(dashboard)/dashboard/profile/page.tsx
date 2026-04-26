"use client";

import { motion } from "framer-motion";
import { User, Mail, Phone, Calendar, Save, Loader2, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/auth-context";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const name = user?.full_name || "";
  const email = user?.email || "";
  const avatarUrl = user?.avatar_url;
  
  const initials = name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const [profile, setProfile] = useState({
    full_name: name,
    email: email,
    phone: (user as any)?.phone || "",
    wedding_date: (user as any)?.wedding_date || "",
  });

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      await updateProfile({
        full_name: profile.full_name,
        phone: profile.phone,
        wedding_date: profile.wedding_date,
      } as any);
      
      toast.success("Profil berhasil disimpan");
    } catch (error) {
      toast.error("Gagal menyimpan profil");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 2MB");
      return;
    }

    setIsUploading(true);
    const supabase = createClient();

    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      // Update user profile with new avatar URL
      await updateProfile({ avatar_url: publicUrl } as any);
      
      toast.success("Foto profil berhasil diupload");
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Gagal mengupload foto");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="font-cormorant text-4xl font-bold text-page-heading">Profil Saya</h1>
        <p className="mt-1 text-page-subtext">Kelola informasi profil Anda</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Avatar Card */}
        <Card className="lg:col-span-1 h-fit">
          <CardHeader className="text-center">
            <div className="relative mx-auto">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatarUrl || undefined} alt={name} />
                <AvatarFallback className="text-2xl bg-user-avatar-bg text-user-avatar-text">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="absolute bottom-0 right-0 rounded-full bg-primary p-1.5 text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
              >
                {isUploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Camera className="h-4 w-4" />
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </div>
            <CardTitle className="mt-4">{name || "User"}</CardTitle>
            <CardDescription>{email}</CardDescription>
            <Badge className="mt-2" variant="outline">
              {user?.role === "premium" ? "Premium Member" : "Member"}
            </Badge>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-xs text-muted-foreground">
              Bergabung sejak {new Date(user?.created_at || Date.now()).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
            </p>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Informasi Pribadi</CardTitle>
            <CardDescription>Perbarui informasi pribadi Anda</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Nama Lengkap</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  className="pl-10"
                  value={profile.full_name}
                  onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                  placeholder="Nama lengkap Anda"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  id="email" 
                  className="pl-10" 
                  value={profile.email} 
                  disabled 
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Email tidak dapat diubah
              </p>
            </div>
            
            <div>
              <Label htmlFor="phone">Nomor Telepon</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="phone"
                  className="pl-10"
                  placeholder="+628123456789"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="weddingDate">Tanggal Pernikahan</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="weddingDate"
                  type="date"
                  className="pl-10"
                  value={profile.wedding_date}
                  onChange={(e) => setProfile({ ...profile, wedding_date: e.target.value })}
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Opsional - Digunakan untuk informasi undangan
              </p>
            </div>

            <Separator />

            <div className="flex justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={() => setProfile({
                  full_name: name,
                  email: email,
                  phone: (user as any)?.phone || "",
                  wedding_date: (user as any)?.wedding_date || "",
                })}
                disabled={isLoading}
              >
                Batal
              </Button>
              <Button variant="default" onClick={handleSave} disabled={isLoading}>
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menyimpan...</>
                ) : (
                  <><Save className="mr-2 h-4 w-4" /> Simpan Perubahan</>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Section */}
      <Card>
        <CardHeader>
          <CardTitle>Keamanan</CardTitle>
          <CardDescription>Kelola password dan keamanan akun Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" asChild>
            <Link href="/dashboard/settings?tab=security">
              Ubah Password
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Import Badge dan Link
import { Badge } from "@/components/ui/badge";
import Link from "next/link";