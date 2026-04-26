"use client";

import { motion } from "framer-motion";
import { User, Lock, Bell, CreditCard, Save, Loader2, Eye, EyeOff, Camera } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/auth-context";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const { user, updateProfile, changePassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "profile");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const userData = user;
  const name = user?.full_name || "";
  const email = user?.email || "";
  const avatarUrl = user?.avatar_url;
  
  const initials = name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Profile form state
  const [profile, setProfile] = useState({
    full_name: name,
    email: email,
    phone: (user as any)?.phone || "",
    wedding_date: (user as any)?.wedding_date || "",
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    paymentConfirmations: true,
    rsvpAlerts: true,
    newsletter: false,
    promotions: true,
  });

  useEffect(() => {
    if (user) {
      setProfile({
        full_name: user.full_name || "",
        email: user.email || "",
        phone: (user as any)?.phone || "",
        wedding_date: (user as any)?.wedding_date || "",
      });
    }
  }, [user]);

  const handleSaveProfile = async () => {
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

  const handleChangePassword = async () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast.error("Semua field password harus diisi");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Password baru tidak cocok");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error("Password minimal 6 karakter");
      return;
    }

    setIsLoading(true);
    
    try {
      await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
      
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      
      toast.success("Password berhasil diubah");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal mengubah password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 2MB");
      return;
    }

    setIsUploading(true);
    const supabase = createClient();

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      await updateProfile({ avatar_url: publicUrl } as any);
      
      toast.success("Foto profil berhasil diupload");
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Gagal mengupload foto");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveNotifications = () => {
    localStorage.setItem("notification-settings", JSON.stringify(notifications));
    toast.success("Preferensi notifikasi disimpan");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="font-cormorant text-4xl font-bold text-page-heading">Pengaturan</h1>
        <p className="mt-1 text-page-subtext">Kelola preferensi dan pengaturan akun Anda</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Profil
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Lock className="h-4 w-4" />
            Keamanan
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifikasi
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Pembayaran
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Profil</CardTitle>
              <CardDescription>Perbarui informasi profil Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={avatarUrl || undefined} />
                    <AvatarFallback className="bg-user-avatar-bg text-user-avatar-text text-xl">
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
                <div>
                  <p className="text-sm text-muted-foreground">
                    Klik ikon kamera untuk mengganti foto profil
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG, GIF (Maks 2MB)
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                <div>
                  <Label>Nama Lengkap</Label>
                  <Input 
                    value={profile.full_name} 
                    onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} 
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" value={profile.email} disabled />
                  <p className="mt-1 text-xs text-muted-foreground">Email tidak dapat diubah</p>
                </div>
                <div>
                  <Label>Nomor Telepon</Label>
                  <Input 
                    type="tel" 
                    value={profile.phone} 
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })} 
                    placeholder="+628123456789"
                  />
                </div>
                <div>
                  <Label>Tanggal Pernikahan (Opsional)</Label>
                  <Input 
                    type="date" 
                    value={profile.wedding_date} 
                    onChange={(e) => setProfile({ ...profile, wedding_date: e.target.value })} 
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="default" onClick={handleSaveProfile} disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Simpan Perubahan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Ubah Password</CardTitle>
              <CardDescription>Perbarui password untuk keamanan akun Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Password Saat Ini</Label>
                <div className="relative">
                  <Input 
                    type={showPasswords.current ? "text" : "password"} 
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <div>
                <Label>Password Baru</Label>
                <div className="relative">
                  <Input 
                    type={showPasswords.new ? "text" : "password"} 
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Minimal 6 karakter</p>
              </div>
              
              <div>
                <Label>Konfirmasi Password Baru</Label>
                <div className="relative">
                  <Input 
                    type={showPasswords.confirm ? "text" : "password"} 
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button variant="default" onClick={handleChangePassword} disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Sesi Aktif</CardTitle>
              <CardDescription>Perangkat yang sedang login ke akun Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  <div>
                    <p className="font-medium">Perangkat Saat Ini</p>
                    <p className="text-sm text-muted-foreground">Login pada {new Date().toLocaleDateString('id-ID')}</p>
                  </div>
                </div>
                <Badge variant="success">Aktif</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Preferensi Notifikasi</CardTitle>
              <CardDescription>Atur notifikasi yang ingin Anda terima</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Update Pesanan</Label>
                  <p className="text-sm text-muted-foreground">Notifikasi saat status pesanan berubah</p>
                </div>
                <Switch 
                  checked={notifications.orderUpdates} 
                  onCheckedChange={(checked) => setNotifications({ ...notifications, orderUpdates: checked })}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Konfirmasi Pembayaran</Label>
                  <p className="text-sm text-muted-foreground">Notifikasi saat pembayaran dikonfirmasi</p>
                </div>
                <Switch 
                  checked={notifications.paymentConfirmations} 
                  onCheckedChange={(checked) => setNotifications({ ...notifications, paymentConfirmations: checked })}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Alert RSVP</Label>
                  <p className="text-sm text-muted-foreground">Notifikasi saat tamu melakukan RSVP</p>
                </div>
                <Switch 
                  checked={notifications.rsvpAlerts} 
                  onCheckedChange={(checked) => setNotifications({ ...notifications, rsvpAlerts: checked })}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Newsletter</Label>
                  <p className="text-sm text-muted-foreground">Tips pernikahan dan inspirasi</p>
                </div>
                <Switch 
                  checked={notifications.newsletter} 
                  onCheckedChange={(checked) => setNotifications({ ...notifications, newsletter: checked })}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Promo & Diskon</Label>
                  <p className="text-sm text-muted-foreground">Info promo dan penawaran khusus</p>
                </div>
                <Switch 
                  checked={notifications.promotions} 
                  onCheckedChange={(checked) => setNotifications({ ...notifications, promotions: checked })}
                />
              </div>
              
              <div className="flex justify-end pt-4">
                <Button variant="default" onClick={handleSaveNotifications}>
                  Simpan Preferensi
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Paket Saat Ini</CardTitle>
              <CardDescription>Status langganan Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">
                        {user?.role === "premium" ? "Premium" : "Gratis"}
                      </h3>
                      {user?.role === "premium" ? (
                        <Badge className="bg-amber-500">PRO</Badge>
                      ) : (
                        <Badge variant="outline">Basic</Badge>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {user?.role === "premium" 
                        ? "Akses semua fitur premium tanpa batas" 
                        : "Fitur dasar untuk memulai"}
                    </p>
                  </div>
                  {user?.role !== "premium" && (
                    <Button variant="default" asChild>
                      <a href="/pricing">Upgrade ke Premium</a>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Metode Pembayaran</CardTitle>
              <CardDescription>Kelola metode pembayaran Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border p-6 text-center">
                <CreditCard className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 font-medium">Belum ada metode pembayaran</p>
                <p className="text-sm text-muted-foreground">
                  Tambahkan kartu atau rekening untuk memudahkan transaksi
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  + Tambah Metode Pembayaran
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Riwayat Transaksi</CardTitle>
              <CardDescription>Daftar transaksi Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Riwayat transaksi akan muncul di sini
                </p>
                <Button variant="link" asChild>
                  <a href="/dashboard/orders">Lihat Pesanan Saya</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}