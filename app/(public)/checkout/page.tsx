"use client";

import { motion } from "framer-motion";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ArrowLeft,
  Shield,
  CreditCard,
  Building2,
  CheckCircle2,
  Loader2,
  Banknote,
  Landmark,
  Info,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Import dari services/client
import { orderService } from "@/services/order.service";
import { invitationService } from "@/services/user-template.service";
import { templateService } from "@/services/template.service";
import { WhatsappIcon } from "@/components/SocialIcons";

// Bank accounts for transfer
const bankAccounts = [
  {
    id: "bca",
    name: "Bank BCA",
    accountNumber: "1234567890",
    accountName: "PT Undangan Digital Nusantara",
    icon: Building2,
  },
  {
    id: "mandiri",
    name: "Bank Mandiri",
    accountNumber: "9876543210",
    accountName: "PT Undangan Digital Nusantara",
    icon: Landmark,
  },
  {
    id: "bri",
    name: "Bank BRI",
    accountNumber: "5551234567",
    accountName: "PT Undangan Digital Nusantara",
    icon: Banknote,
  },
];

// WhatsApp configuration
const WHATSAPP_NUMBER = "6283851787713"; // Ganti dengan nomor WhatsApp admin

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const [selectedBank, setSelectedBank] = useState("bca");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdInvitationId, setCreatedInvitationId] = useState<string | null>(
    null,
  );
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [paymentProofPreview, setPaymentProofPreview] = useState<string | null>(
    null,
  );
  const [orderData, setOrderData] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: user?.full_name || "",
    email: user?.email || "",
    phone: (user as any)?.phone || "",
    weddingDate: (user as any)?.wedding_date || "",
    subdomain: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatPrice = (price: number) => `Rp ${price.toLocaleString("id-ID")}`;
  const total = subtotal;

  // Generate order ID
  const generateOrderId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `INV/${new Date().getFullYear()}/${timestamp}/${random}`;
  };

  // Generate unique subdomain if empty
  const generateSubdomain = (templateName: string, userName: string) => {
    const base = templateName.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const nameSlug = userName.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const random = Math.random().toString(36).substring(2, 8);
    return `${base}-${nameSlug}-${random}`;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama lengkap harus diisi";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email harus diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email tidak valid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor telepon harus diisi";
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = "Nomor telepon tidak valid";
    }

    if (!paymentProof) {
      newErrors.paymentProof = "Bukti transfer harus diupload";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Ukuran file terlalu besar", {
          description: "Maksimal ukuran file adalah 5MB",
        });
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        toast.error("Format file tidak valid", {
          description: "Hanya file gambar yang diperbolehkan (JPG, PNG)",
        });
        return;
      }

      setPaymentProof(file);
      const preview = URL.createObjectURL(file);
      setPaymentProofPreview(preview);
    }
  };

  const removeFile = () => {
    if (paymentProofPreview) {
      URL.revokeObjectURL(paymentProofPreview);
    }
    setPaymentProof(null);
    setPaymentProofPreview(null);
  };

  const getBankDetails = () => {
    return bankAccounts.find((bank) => bank.id === selectedBank);
  };

  const getWhatsAppMessage = (orderInfo: any) => {
    const bankDetails = getBankDetails();
    return `Halo Admin,%0A%0A*KONFIRMASI PEMBAYARAN UNDANGAN DIGITAL*%0A%0A*Detail Pesanan:*%0AOrder ID: ${orderInfo.orderId}%0ATemplate: ${orderInfo.templateNames}%0ATotal Harga: ${formatPrice(orderInfo.total)}%0A%0A*Data Pembeli:*%0ANama: ${formData.name}%0AEmail: ${formData.email}%0ATelepon: ${formData.phone}%0ATanggal Acara: ${formData.weddingDate || "-"}%0A%0A*Metode Pembayaran:*%0ABank: ${bankDetails?.name}%0AAtas Nama: ${bankDetails?.accountName}%0ANomor Rekening: ${bankDetails?.accountNumber}%0A%0A*Catatan:* ${formData.notes || "-"}%0A%0ASaya sudah melakukan transfer sesuai dengan total pembayaran. Mohon segera diproses.%0A%0ATerima kasih.`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Silakan login terlebih dahulu");
      router.push("/login?redirect=/checkout");
      return;
    }

    if (items.length === 0) {
      toast.error("Keranjang kosong");
      return;
    }

    if (!validateForm()) {
      toast.error("Mohon lengkapi data yang diperlukan", {
        description: "Periksa kembali form isian Anda",
      });
      return;
    }

    setIsLoading(true);

    try {
      const orderId = generateOrderId();
      const bankDetails = getBankDetails();
      const templateNames = items.map((item) => item.name).join(", ");

      const orderInfo = {
        orderId,
        templateNames,
        total,
        bankDetails,
      };

      // Simpan data untuk WhatsApp
      setOrderData(orderInfo);

      // Proses pembuatan pesanan untuk setiap item di keranjang
      const createdOrders = [];
      const createdInvitations = [];

      for (const item of items) {
        // 1. Create order dengan status pending
        const order = await orderService.create({
          user_id: user.id,
          template_id: item.id,
          total_amount: item.price * item.quantity,
          customer_name: formData.name || user.full_name || user.email,
          customer_email: formData.email || user.email,
          customer_phone: formData.phone || null,
          wedding_date: formData.weddingDate || null,
          payment_method: `transfer_${selectedBank}`,
          payment_proof: paymentProof ? paymentProof.name : null,
          notes: formData.notes,
          status: "pending", // Pending until payment confirmation
        });

        // Get template config for default content
        const templateWithConfig = await templateService.getByIdWithConfig(
          item.id,
        );
        
        // Prepare default settings/content
        const defaultSettings = {
          content: {
            coupleName: formData.name || user.full_name || "",
            groomName: user.full_name || "",
            brideName: "",
            weddingDate: formData.weddingDate || (user as any)?.wedding_date || "",
            weddingTime: "10:00 WIB",
            location: "",
            address: "",
            googleMapsUrl: "",
            story: "",
            gallery: [],
            songs: [],
            wishes: [],
          },
          features: {
            rsvp: true,
            gallery: true,
            maps: true,
            music: true,
            wishes: true,
          },
          featureSettings: {
            rsvp: {
              enabled: true,
              maxGuests: 100,
            },
            gallery: {
              enabled: true,
              maxPhotos: 50,
            },
            music: {
              enabled: true,
              autoPlay: false,
            },
          },
        };

        // Merge with template config if exists
        const finalSettings = templateWithConfig.config?.config 
          ? { ...defaultSettings, ...(templateWithConfig.config.config as any) }
          : defaultSettings;

        // Generate subdomain if empty
        const subdomain = formData.subdomain || generateSubdomain(item.name, formData.name);

        // 2. Create invitation (user_template) using invitationService
        const invitation = await invitationService.create({
          user_id: user.id,
          template_id: item.id,
          order_id: order.id,
          config: {},
          subdomain: subdomain,
          is_published: false,
        });

        createdOrders.push({ order, invitation });
        createdInvitations.push(invitation);
        setCreatedInvitationId(invitation.id);
      }

      // Save checkout data to localStorage for success page
      const checkoutData = {
        orderId,
        templateNames,
        total,
        buyerName: formData.name,
        buyerEmail: formData.email,
        buyerPhone: formData.phone,
        weddingDate: formData.weddingDate,
        bank: bankDetails?.name,
        bankAccountNumber: bankDetails?.accountNumber,
        bankAccountName: bankDetails?.accountName,
        notes: formData.notes,
        items: items,
        invitations: createdInvitations,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem("lastCheckout", JSON.stringify(checkoutData));

      // Save order history
      const existingOrders = JSON.parse(
        localStorage.getItem("orderHistory") || "[]",
      );
      existingOrders.push(checkoutData);
      localStorage.setItem("orderHistory", JSON.stringify(existingOrders));

      // Show success and prepare for WhatsApp
      setIsSuccess(true);

      toast.success("Pesanan berhasil dibuat!", {
        description: "Silakan konfirmasi pembayaran via WhatsApp",
      });

      // Clear cart after successful order creation
      clearCart();
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error(error.message || "Gagal membuat pesanan");
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppConfirmation = () => {
    if (!orderData) return;

    const message = getWhatsAppMessage(orderData);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  if (items.length === 0 && !isSuccess) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-cormorant text-3xl font-bold">Keranjang Kosong</h1>
        <p className="mt-2 text-muted-foreground">
          Silakan tambahkan template ke keranjang
        </p>
        <Button variant="default" className="mt-6" asChild>
          <Link href="/templates">Jelajahi Template</Link>
        </Button>
      </div>
    );
  }

  if (isSuccess) {
    const bankDetails = getBankDetails();
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="container mx-auto max-w-2xl px-4 py-20"
      >
        <Card className="border-green-500/30 bg-green-500/5">
          <CardContent className="p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
            <h2 className="font-cormorant text-3xl font-bold">
              Pesanan Berhasil Dibuat!
            </h2>
            <p className="mt-2 text-muted-foreground">
              Silakan konfirmasi pembayaran Anda melalui WhatsApp
            </p>

            <div className="mt-6 rounded-lg bg-muted/30 p-4 text-left">
              <h3 className="mb-2 font-semibold">Detail Rekening Transfer:</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bank:</span>
                  <span className="font-medium">{bankDetails?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nomor Rekening:</span>
                  <span className="font-mono font-medium">
                    {bankDetails?.accountNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Atas Nama:</span>
                  <span className="font-medium">{bankDetails?.accountName}</span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span className="text-muted-foreground">
                    Total Transfer:
                  </span>
                  <span className="font-bold text-rose-600">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Button
                size="lg"
                className="gap-2 bg-green-600 hover:bg-green-700"
                onClick={handleWhatsAppConfirmation}
              >
                <WhatsappIcon className="h-5 w-5" />
                Konfirmasi via WhatsApp
              </Button>

              {createdInvitationId && (
                <Button variant="default" size="lg" asChild>
                  <Link href={`/dashboard/editor/${createdInvitationId}`}>
                    Mulai Edit Undangan
                  </Link>
                </Button>
              )}

              <Button variant="outline" asChild>
                <Link href="/dashboard/invitations">Lihat Semua Undangan</Link>
              </Button>

              <Button variant="ghost" asChild>
                <Link href="/templates">Lanjut Belanja</Link>
              </Button>
            </div>

            <Alert className="mt-6 bg-yellow-50 dark:bg-yellow-950/30">
              <Info className="h-4 w-4" />
              <AlertDescription className="text-xs">
                Pesanan akan diproses setelah kami menerima konfirmasi
                pembayaran. Template akan segera dapat diakses setelah
                pembayaran dikonfirmasi.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const bankDetails = getBankDetails();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <Link
        href="/templates"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali
      </Link>

      <h1 className="mt-6 font-cormorant text-3xl font-bold">Checkout</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="font-cormorant text-xl">
                Data Pemesan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Contoh: Budi Santoso"
                    required
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="budi@example.com"
                      required
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">
                      Nomor Telepon/WA <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="08123456789"
                      required
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                    )}
                    <p className="mt-1 text-xs text-muted-foreground">
                      Nomor ini akan digunakan untuk konfirmasi pesanan
                    </p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="subdomain">
                    Subdomain Undangan (Opsional)
                  </Label>
                  <div className="flex items-center gap-1">
                    <Input
                      id="subdomain"
                      placeholder="nama-anda"
                      value={formData.subdomain}
                      onChange={(e) =>
                        setFormData({ ...formData, subdomain: e.target.value })
                      }
                    />
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      .eleganzas.id
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Kosongkan untuk generate otomatis
                  </p>
                </div>

                <div>
                  <Label htmlFor="weddingDate">Tanggal Acara (Opsional)</Label>
                  <Input
                    id="weddingDate"
                    type="date"
                    value={formData.weddingDate}
                    onChange={(e) =>
                      setFormData({ ...formData, weddingDate: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Catatan (Opsional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Tulis catatan jika ada..."
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="font-cormorant text-xl">
                Metode Pembayaran
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Saat ini pembayaran hanya dapat dilakukan melalui transfer
                  bank. Silakan transfer ke salah satu rekening di bawah ini.
                </AlertDescription>
              </Alert>

              <RadioGroup value={selectedBank} onValueChange={setSelectedBank}>
                <div className="grid gap-3 sm:grid-cols-3">
                  {bankAccounts.map((bank) => {
                    const Icon = bank.icon;
                    return (
                      <div key={bank.id}>
                        <RadioGroupItem
                          value={bank.id}
                          id={bank.id}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={bank.id}
                          className="flex cursor-pointer flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-rose-500 [&:has([data-state=checked])]:border-rose-500"
                        >
                          <Icon className="mb-3 h-8 w-8" />
                          <span className="text-sm font-semibold">
                            {bank.name}
                          </span>
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </RadioGroup>

              {/* Bank Account Details */}
              {bankDetails && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg bg-muted/30 p-4"
                >
                  <h4 className="mb-2 font-semibold">Detail Rekening:</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bank:</span>
                      <span className="font-medium">{bankDetails.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Nomor Rekening:
                      </span>
                      <span className="font-mono font-medium">
                        {bankDetails.accountNumber}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Atas Nama:</span>
                      <span className="font-medium">
                        {bankDetails.accountName}
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2 mt-2">
                      <span className="text-muted-foreground">
                        Total Transfer:
                      </span>
                      <span className="font-bold text-rose-600">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>

          {/* Upload Payment Proof */}
          <Card>
            <CardHeader>
              <CardTitle className="font-cormorant text-xl">
                Upload Bukti Transfer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                className={`flex items-center justify-center w-full ${
                  errors.paymentProof ? "border-red-500" : ""
                }`}
              >
                {!paymentProofPreview ? (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                      <p className="mb-1 text-sm text-muted-foreground">
                        <span className="font-semibold">Klik untuk upload</span>{" "}
                        atau drag & drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG (MAX. 5MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                  </label>
                ) : (
                  <div className="relative w-full">
                    <img
                      src={paymentProofPreview}
                      alt="Preview bukti transfer"
                      className="max-h-48 w-full object-contain rounded-lg border"
                    />
                    <button
                      onClick={removeFile}
                      className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              {errors.paymentProof && (
                <p className="text-xs text-red-500 text-center">
                  {errors.paymentProof}
                </p>
              )}
              <p className="text-xs text-muted-foreground text-center">
                * Upload bukti transfer untuk mempercepat proses konfirmasi
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="font-cormorant text-xl">
                Ringkasan Pesanan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-sm text-primary">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Biaya Admin</span>
                  <span>Gratis</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-xl text-primary">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <AlertDescription className="text-xs text-blue-600 dark:text-blue-400">
                  Transfer sesuai dengan total pembayaran. Konfirmasi akan
                  dilakukan via WhatsApp setelah upload bukti transfer.
                </AlertDescription>
              </Alert>

              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-3 w-3" />
                <span>Pembayaran aman dengan enkripsi SSL</span>
              </div>

              <Button
                size="lg"
                className="w-full gap-2 bg-rose-500 hover:bg-rose-600"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4" />
                    Buat Pesanan
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Dengan melakukan pemesanan, Anda menyetujui{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Syarat & Ketentuan
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}