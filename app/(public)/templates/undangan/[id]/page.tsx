"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Star,
  Clock,
  Check,
  Share2,
  Eye,
  Shield,
  Download,
  MessageCircle,
  Award,
  TrendingUp,
  Settings,
  Smartphone,
  Globe,
  Zap,
  Edit,
  ShoppingBag,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { templateService } from "@/services/template.service";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";

interface Template {
  id?: string;
  name?: string;
  tagline?: string | null;
  description?: string | null;
  price?: number;
  type_template?: string;
  category?: string;
  tags?: string[] | null;
  theme?: string | null;
  thumbnail?: string | null;
  images?: string[] | null;
  features?: string[] | null;
  demo_url?: string | null;
  rating?: number;
  sales?: number;
  created_at?: string;
  updated_at?: string;
}

export default function TemplateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem, items } = useCart();
  const { user } = useAuth();
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const templateId = params.id as string;

  useEffect(() => {
    const fetchTemplate = async () => {
      if (!templateId) return;

      try {
        setLoading(true);
        const data = await templateService.getById(templateId);

        if (!data) {
          setError("Template tidak ditemukan");
        } else {
          setTemplate(data);
        }
      } catch (err) {
        console.error("Error fetching template:", err);
        setError("Gagal memuat detail template");
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [templateId]);

  const formatPrice = (price: number = 0) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const copyToClipboard = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link tersalin!", {
        description: "Link template berhasil disalin ke clipboard",
        duration: 2000,
      });
    } catch (err) {
      toast.error("Gagal menyalin", {
        description: "Silakan coba lagi",
        duration: 2000,
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: template?.name,
          text: template?.tagline || "Template undangan digital yang menarik",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      copyToClipboard();
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      toast.success("Ditambahkan ke wishlist", {
        description: "Template telah disimpan ke wishlist Anda",
        icon: <Heart className="h-4 w-4" />,
      });
    } else {
      toast.info("Dihapus dari wishlist", {
        description: "Template telah dihapus dari wishlist Anda",
      });
    }
  };

  const handleAddToCart = () => {
    if (!template) return;

    setIsAddingToCart(true);

    // Simulate adding to cart
    setTimeout(() => {
      // Add item to cart with quantity
      // Note: addItem adds 1 quantity each time, so we need to call it multiple times for quantity > 1
      for (let i = 0; i < quantity; i++) {
        addItem({
          id: template.id!,
          name: template.name!,
          price: template.price!,
          image: template.thumbnail || "/placeholder.jpg",
        });
      }

      toast.success("Ditambahkan ke keranjang!", {
        description: `${quantity} ${template.name} berhasil ditambahkan ke keranjang`,
        action: {
          label: "Lihat Keranjang",
          onClick: () => router.push("/cart"),
        },
      });

      setIsAddingToCart(false);
    }, 500);
  };

  const handleBuyNow = () => {
    if (!template) return;

    // Check if user is logged in
    if (!user) {
      toast.error("Silakan login terlebih dahulu", {
        description: "Anda perlu login untuk melanjutkan checkout",
        action: {
          label: "Login",
          onClick: () => router.push(`/login?redirect=/checkout?template=${template.id}`),
        },
      });
      return;
    }

    // Add to cart first (with quantity)
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: template.id!,
        name: template.name!,
        price: template.price!,
        image: template.thumbnail || "/placeholder.jpg",
      });
    }

    // Redirect to checkout
    router.push("/checkout");
  };

  // Check if template is in cart
  const cartItem = items.find((item) => item.id === template?.id);
  const isInCart = !!cartItem;

  if (loading) {
    return <TemplateDetailSkeleton />;
  }

  if (error || !template) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <Heart className="mx-auto h-12 w-12 text-rose-500" />
          <h3 className="mt-4 text-lg font-semibold">Template Tidak Ditemukan</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {error || "Template yang Anda cari tidak tersedia atau telah dihapus."}
          </p>
          <div className="mt-6 flex gap-3 justify-center">
            <Button onClick={() => router.back()} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Button>
            <Button
              onClick={() => router.push("/marketplace")}
              className="bg-rose-500 hover:bg-rose-600"
            >
              Lihat Template Lain
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const images = template.images || (template.thumbnail ? [template.thumbnail] : []);
  const originalPrice = template.price ? template.price * 2 : 0;
  const discount = template.price ? Math.round(((template.price * 2 - template.price) / (template.price * 2)) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Kembali</span>
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleShare} className="gap-1">
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Bagikan</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleWishlist}
                className="gap-1"
              >
                <Heart
                  className={cn(
                    "h-4 w-4",
                    isWishlisted && "fill-rose-500 text-rose-500"
                  )}
                />
                <span className="hidden sm:inline">{isWishlisted ? "Tersimpan" : "Simpan"}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-gradient-to-br from-rose-100 to-amber-100 dark:from-rose-950/30 dark:to-amber-950/30">
              {images.length > 0 && images[selectedImage] ? (
                <img
                  src={images[selectedImage]}
                  alt={template.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Heart className="h-16 w-16 text-rose-400/50" />
                </div>
              )}
              {discount > 0 && (
                <Badge className="absolute left-2 top-2 bg-rose-500">
                  -{discount}%
                </Badge>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={cn(
                      "relative aspect-[4/3] w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                      selectedImage === idx
                        ? "border-rose-500"
                        : "border-transparent hover:border-rose-300"
                    )}
                  >
                    <img
                      src={img}
                      alt={`${template.name} - ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Features Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Fitur Lengkap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {(template.features || []).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Title & Badges */}
            <div>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h1 className="text-2xl font-bold sm:text-3xl">{template.name}</h1>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold">{template.rating || 0}</span>
                  <span className="text-sm text-muted-foreground">/5</span>
                </div>
              </div>

              {template.tagline && (
                <p className="mt-2 text-muted-foreground">{template.tagline}</p>
              )}

              <div className="mt-3 flex flex-wrap gap-2">
                {template.sales && template.sales > 500 && (
                  <Badge className="bg-amber-500">Best Seller</Badge>
                )}
                {template.created_at &&
                  new Date(template.created_at) >
                    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) && (
                    <Badge className="bg-emerald-500">New</Badge>
                  )}
                <Badge variant="outline">{template.type_template || template.category}</Badge>
                {template.theme && <Badge variant="outline">{template.theme}</Badge>}
              </div>
            </div>

            {/* Price Section */}
            <div className="rounded-lg bg-gradient-to-r from-rose-500/10 to-amber-500/10 p-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl font-bold text-rose-600 dark:text-rose-400 sm:text-3xl">
                    {formatPrice(template.price)}
                  </span>
                  {originalPrice > 0 && (
                    <span className="ml-2 text-sm text-muted-foreground line-through">
                      {formatPrice(originalPrice)}
                    </span>
                  )}
                  <p className="mt-1 text-xs text-muted-foreground">
                    Harga sudah termasuk PPN dan akses lifetime
                  </p>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>Akses Lifetime</span>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Kuantitas:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
              {isInCart && (
                <Badge variant="secondary" className="gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  {cartItem?.quantity} di keranjang
                </Badge>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <Button
                size="lg"
                variant="outline"
                className="flex-1 gap-2"
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                {isAddingToCart ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : isInCart ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <ShoppingBag className="h-4 w-4" />
                )}
                {isInCart ? "Tambah Lagi" : "Tambah ke Keranjang"}
              </Button>
              <Button
                size="lg"
                className="flex-1 gap-2 bg-rose-500 hover:bg-rose-600"
                onClick={handleBuyNow}
              >
                <ShoppingBag className="h-4 w-4" />
                Beli Sekarang
              </Button>
            </div>

            {/* Demo Button */}
            {template.demo_url && (
              <Button asChild variant="secondary" className="w-full gap-2">
                <Link href={template.demo_url} target="_blank">
                  <Eye className="h-4 w-4" />
                  Live Demo
                </Link>
              </Button>
            )}

            {/* Sales Stats */}
            <div className="flex items-center justify-between rounded-lg border border-border p-3 text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span>{template.sales || 0}+ pengguna telah membeli</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="h-4 w-4 text-muted-foreground" />
                <span>Garansi 7 hari</span>
              </div>
            </div>

            {/* Description Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Deskripsi</TabsTrigger>
                <TabsTrigger value="details">Detail</TabsTrigger>
                <TabsTrigger value="reviews">Ulasan</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-4 space-y-4">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p>
                    {template.description ||
                      "Template undangan digital yang elegan dan modern untuk momen spesial Anda."}
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold">Keunggulan Template Ini:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm">
                      <Zap className="mt-0.5 h-4 w-4 text-rose-500" />
                      <span>Responsive di semua perangkat (Mobile, Tablet, Desktop)</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Smartphone className="mt-0.5 h-4 w-4 text-rose-500" />
                      <span>Tampilan modern dan elegan</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Edit className="mt-0.5 h-4 w-4 text-rose-500" />
                      <span>Mudah dikustomisasi sesuai kebutuhan</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Globe className="mt-0.5 h-4 w-4 text-rose-500" />
                      <span>Support multi bahasa</span>
                    </li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="details" className="mt-4 space-y-4">
                <div className="grid gap-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Kategori</span>
                    <span className="font-medium">
                      {template.category || template.type_template || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Theme/Style</span>
                    <span className="font-medium">{template.theme || "-"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Tags</span>
                    <div className="flex flex-wrap gap-1">
                      {(template.tags || []).map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Jumlah Fitur</span>
                    <span className="font-medium">{(template.features || []).length} fitur</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Terakhir Update</span>
                    <span className="font-medium">
                      {template.updated_at
                        ? new Date(template.updated_at).toLocaleDateString("id-ID")
                        : "-"}
                    </span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-4">
                <div className="text-center py-8">
                  <Star className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Belum ada ulasan untuk template ini
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() =>
                      toast.info("Fitur akan segera hadir", {
                        description: "Kami sedang mengembangkan fitur review",
                      })
                    }
                  >
                    Beri Ulasan
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            {/* Support Info */}
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-rose-500" />
                    <div>
                      <p className="text-sm font-medium">Dukungan 24/7</p>
                      <p className="text-xs text-muted-foreground">Tim support siap membantu</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-rose-500" />
                    <div>
                      <p className="text-sm font-medium">Garansi Kepuasan</p>
                      <p className="text-xs text-muted-foreground">7 hari garansi uang kembali</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Download className="h-5 w-5 text-rose-500" />
                    <div>
                      <p className="text-sm font-medium">Instan Download</p>
                      <p className="text-xs text-muted-foreground">
                        Akses langsung setelah pembayaran
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5 text-rose-500" />
                    <div>
                      <p className="text-sm font-medium">Mudah Diedit</p>
                      <p className="text-xs text-muted-foreground">Customisasi tanpa coding</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Skeleton Component
function TemplateDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-20" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-4">
            <Skeleton className="aspect-[4/3] w-full rounded-xl" />
            <div className="flex gap-2">
              <Skeleton className="h-20 w-20 rounded-lg" />
              <Skeleton className="h-20 w-20 rounded-lg" />
              <Skeleton className="h-20 w-20 rounded-lg" />
            </div>
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="mt-2 h-4 w-full" />
              <div className="mt-3 flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
            <Skeleton className="h-24 w-full rounded-lg" />
            <Skeleton className="h-11 w-full rounded-lg" />
            <div className="flex gap-3">
              <Skeleton className="h-11 flex-1" />
              <Skeleton className="h-11 flex-1" />
            </div>
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Utility function for className merging
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}