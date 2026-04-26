"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, Check, Heart, School, Briefcase, Database,
  Star, Clock, Users, Eye, Download, ShoppingCart,
  Calendar, MapPin, Music, Camera, Gift, MessageCircle,
  Shield, Server, Code, Smartphone, Globe, Zap,
  Award, TrendingUp, ChevronRight, FileText, Layers,
  Settings, Palette, Sparkles, Share2, ExternalLink,
  DollarSign, Package, Truck, Headphones, RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

// Data lengkap untuk semua template berdasarkan kategori
const templateData: Record<string, Record<string, any>> = {
  undangan: {
    "eternal-vows": {
      id: 1,
      name: "Eternal Vows",
      category: "undangan",
      categoryName: "Undangan Digital",
      subcategory: "Pernikahan",
      style: "Elegan",
      price: 299000,
      originalPrice: 599000,
      rating: 4.9,
      reviews: 234,
      sales: 1234,
      isPopular: true,
      isNew: false,
      isBestSeller: true,
      features: [
        "RSVP Online real-time",
        "Galeri foto & video",
        "Maps lokasi acara",
        "Amplop digital (e-wallet)",
        "Background music",
        "Countdown timer",
        "Buku tamu digital",
        "Kirim ucapan & doa",
        "Share ke sosial media",
        "Export data tamu"
      ],
      colors: ["Gold", "Putih", "Burgundy"],
      duration: "3 hari",
      demoUrl: "/demo/undangan/eternal-vows",
      description: "Template undangan pernikahan elegan dengan sentuhan emas yang mewah. Cocok untuk pasangan yang menginginkan undangan digital berkelas.",
      longDescription: "Eternal Vows adalah template undangan pernikahan digital dengan desain elegan dan fitur lengkap. Template ini dirancang untuk memberikan pengalaman terbaik bagi tamu undangan dengan antarmuka yang intuitif dan navigasi yang mudah. Dilengkapi dengan berbagai fitur interaktif seperti RSVP online, amplop digital, dan galeri foto yang membuat undangan Anda semakin spesial.",
      techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "MySQL", "Prisma"],
      includes: [
        "Source code lengkap",
        "Setup & instalasi oleh tim",
        "Dokumentasi penggunaan",
        "Free update 1 tahun",
        "Support teknis 3 bulan"
      ],
      screenshots: ["/screenshots/wedding-1.jpg", "/screenshots/wedding-2.jpg", "/screenshots/wedding-3.jpg"],
      testimonials: [
        { name: "Ahmad & Siti", rating: 5, comment: "Template sangat bagus, tamu undangan puas dengan kemudahan RSVP online!", date: "2 minggu lalu" },
        { name: "Budi & Dewi", rating: 5, comment: "Fitur lengkap, support cepat respons. Amplop digital sangat membantu!", date: "1 bulan lalu" },
        { name: "Rina", rating: 4, comment: "Desainnya elegan, tamu banyak yang komentar bagus.", date: "2 bulan lalu" }
      ]
    },
    "rustic-love": {
      id: 2,
      name: "Rustic Love",
      category: "undangan",
      categoryName: "Undangan Digital",
      subcategory: "Pernikahan",
      style: "Rustic",
      price: 249000,
      originalPrice: 499000,
      rating: 4.7,
      reviews: 189,
      sales: 892,
      isPopular: false,
      isNew: false,
      isBestSeller: false,
      features: [
        "RSVP Online",
        "Galeri foto",
        "Maps lokasi",
        "Story of Us",
        "Guest book",
        "Photo booth virtual"
      ],
      colors: ["Coklat", "Krem", "Hijau"],
      duration: "3 hari",
      demoUrl: "/demo/undangan/rustic-love",
      description: "Template undangan pernikahan dengan tema rustic yang hangat dan natural.",
      longDescription: "Rustic Love menghadirkan nuansa pedesaan yang hangat dan natural. Template ini cocok untuk pernikahan outdoor dengan tema rustic. Dilengkapi fitur story of us untuk menceritakan perjalanan cinta Anda.",
      techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "MySQL", "Prisma"],
      includes: ["Source code lengkap", "Setup & instalasi", "Dokumentasi", "Free update 6 bulan", "Support 1 bulan"],
      screenshots: ["/screenshots/rustic-1.jpg", "/screenshots/rustic-2.jpg"],
      testimonials: [
        { name: "Andi & Sarah", rating: 5, comment: "Sesuai dengan yang diinginkan, tampilannya sangat natural!", date: "1 minggu lalu" }
      ]
    },
    "happy-birthday": {
      id: 5,
      name: "Happy Birthday",
      category: "undangan",
      categoryName: "Undangan Digital",
      subcategory: "Ulang Tahun",
      style: "Fun",
      price: 199000,
      originalPrice: 399000,
      rating: 4.8,
      reviews: 278,
      sales: 2456,
      isPopular: true,
      isNew: false,
      isBestSeller: true,
      features: [
        "Countdown timer",
        "Galeri foto & video",
        "Wishlist hadiah",
        "Virtual gift",
        "Party playlist",
        "Games interaktif",
        "Guest book",
        "Social share"
      ],
      colors: ["Pelangi", "Kuning", "Merah Muda"],
      duration: "2 hari",
      demoUrl: "/demo/undangan/happy-birthday",
      description: "Template undangan ulang tahun yang ceria dan penuh warna.",
      longDescription: "Happy Birthday adalah template undangan digital untuk pesta ulang tahun dengan desain yang ceria dan fitur interaktif. Tamu dapat mengirimkan hadiah virtual, ucapan, dan berpartisipasi dalam games seru.",
      techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "MySQL"],
      includes: ["Source code lengkap", "Setup & instalasi", "Dokumentasi", "Free update 1 tahun", "Support 1 bulan"],
      screenshots: ["/screenshots/birthday-1.jpg", "/screenshots/birthday-2.jpg"],
      testimonials: [
        { name: "Diana", rating: 5, comment: "Anak-anak suka dengan games-nya!", date: "3 hari lalu" }
      ]
    }
  },
  sekolah: {
    "school-pro": {
      id: 7,
      name: "School Pro",
      category: "sekolah",
      categoryName: "Website Sekolah",
      subcategory: "Website Profil",
      style: "Modern",
      price: 1499000,
      originalPrice: 2999000,
      rating: 4.8,
      reviews: 156,
      sales: 234,
      isPopular: true,
      isNew: false,
      isBestSeller: true,
      features: [
        "E-Learning system",
        "Payment gateway SPP",
        "Report card online",
        "Parent access portal",
        "Announcement module",
        "Gallery kegiatan",
        "Manajemen siswa",
        "Manajemen guru"
      ],
      colors: ["Biru", "Putih", "Abu-abu"],
      duration: "7 hari",
      demoUrl: "/demo/sekolah/school-pro",
      description: "Template website sekolah lengkap dengan fitur e-learning dan pembayaran online.",
      longDescription: "School Pro adalah solusi digital untuk sekolah modern. Dilengkapi dengan sistem e-learning, pembayaran SPP online, dan laporan nilai digital. Memudahkan komunikasi antara sekolah, guru, siswa, dan orang tua.",
      techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma"],
      includes: ["Source code lengkap", "Setup & instalasi", "Dokumentasi", "Free update 1 tahun", "Support 3 bulan"],
      screenshots: ["/screenshots/school-1.jpg", "/screenshots/school-2.jpg"],
      testimonials: [
        { name: "Kepala Sekolah SMA N 1", rating: 5, comment: "Sistem sangat membantu pengelolaan sekolah!", date: "1 bulan lalu" }
      ]
    }
  },
  bisnis: {
    "umkm-store": {
      id: 11,
      name: "UMKM Store",
      category: "bisnis",
      categoryName: "Website Bisnis",
      subcategory: "E-Commerce",
      style: "Modern",
      price: 899000,
      originalPrice: 1799000,
      rating: 4.8,
      reviews: 342,
      sales: 2456,
      isPopular: true,
      isNew: false,
      isBestSeller: true,
      features: [
        "Product catalog",
        "Shopping cart",
        "Payment gateway",
        "Order management",
        "Customer management",
        "Invoice generator",
        "Stock management",
        "Sales report"
      ],
      colors: ["Hijau", "Putih", "Hitam"],
      duration: "5 hari",
      demoUrl: "/demo/bisnis/umkm-store",
      description: "Template toko online lengkap untuk UMKM dengan fitur pembayaran terintegrasi.",
      longDescription: "UMKM Store adalah template e-commerce siap pakai untuk bisnis Anda. Dilengkapi dengan sistem manajemen produk, keranjang belanja, dan berbagai metode pembayaran. Cocok untuk toko online yang ingin segera berjualan.",
      techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma", "Midtrans"],
      includes: ["Source code lengkap", "Setup & instalasi", "Dokumentasi", "Free update 1 tahun", "Support 3 bulan"],
      screenshots: ["/screenshots/store-1.jpg", "/screenshots/store-2.jpg"],
      testimonials: [
        { name: "Toko Bunda", rating: 5, comment: "Penjualan meningkat setelah pakai template ini!", date: "2 minggu lalu" }
      ]
    }
  },
  manajemen: {
    "hris-system": {
      id: 17,
      name: "HRIS System",
      category: "manajemen",
      categoryName: "Sistem Manajemen",
      subcategory: "HRD",
      style: "Professional",
      price: 3499000,
      originalPrice: 6999000,
      rating: 4.9,
      reviews: 67,
      sales: 89,
      isPopular: true,
      isNew: false,
      isBestSeller: true,
      features: [
        "Employee database",
        "Payroll system",
        "Attendance tracking",
        "Performance appraisal",
        "Recruitment module",
        "Training management",
        "Leave management",
        "Report analytics"
      ],
      colors: ["Ungu", "Putih", "Abu-abu"],
      duration: "14 hari",
      demoUrl: "/demo/manajemen/hris-system",
      description: "Sistem manajemen HRD lengkap untuk kelola karyawan dan payroll.",
      longDescription: "HRIS System adalah solusi digital untuk mengelola sumber daya manusia perusahaan. Dilengkapi dengan database karyawan, sistem penggajian, tracking absensi, dan modul penilaian kinerja.",
      techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma"],
      includes: ["Source code lengkap", "Setup & instalasi", "Dokumentasi", "Free update 1 tahun", "Support 6 bulan"],
      screenshots: ["/screenshots/hris-1.jpg", "/screenshots/hris-2.jpg"],
      testimonials: [
        { name: "PT Maju Jaya", rating: 5, comment: "Sistem sangat membantu mengelola karyawan!", date: "1 bulan lalu" }
      ]
    }
  }
};

// Fungsi untuk mendapatkan warna berdasarkan kategori
const getCategoryColor = (category: string) => {
  const colors = {
    undangan: { bg: "bg-rose-500", hover: "hover:bg-rose-600", light: "bg-rose-50 dark:bg-rose-950/20", text: "text-rose-600 dark:text-rose-400", border: "border-rose-200 dark:border-rose-800" },
    sekolah: { bg: "bg-blue-500", hover: "hover:bg-blue-600", light: "bg-blue-50 dark:bg-blue-950/20", text: "text-blue-600 dark:text-blue-400", border: "border-blue-200 dark:border-blue-800" },
    bisnis: { bg: "bg-emerald-500", hover: "hover:bg-emerald-600", light: "bg-emerald-50 dark:bg-emerald-950/20", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-200 dark:border-emerald-800" },
    manajemen: { bg: "bg-purple-500", hover: "hover:bg-purple-600", light: "bg-purple-50 dark:bg-purple-950/20", text: "text-purple-600 dark:text-purple-400", border: "border-purple-200 dark:border-purple-800" }
  };
  return colors[category as keyof typeof colors] || colors.undangan;
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "undangan": return Heart;
    case "sekolah": return School;
    case "bisnis": return Briefcase;
    case "manajemen": return Database;
    default: return Sparkles;
  }
};

export default function TemplateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const category = params.category as string;
  const slug = params.slug as string;
  
  const template = templateData[category]?.[slug];
  const colorStyle = getCategoryColor(category);
  const CategoryIcon = getCategoryIcon(category);

  const [activeTab, setActiveTab] = useState("overview");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  if (!template) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Template tidak ditemukan</h1>
          <Button asChild>
            <Link href="/templates">Kembali ke Templates</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">Beranda</Link>
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
            <Link href="/templates" className="text-muted-foreground hover:text-foreground">Templates</Link>
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
            <Link href={`/templates/${category}`} className="text-muted-foreground hover:text-foreground">
              {template.categoryName}
            </Link>
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
            <span className="font-medium">{template.name}</span>
          </div>
        </div>
      </div>

      {/* Template Info Section */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column - Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className={cn(
              "relative aspect-video overflow-hidden rounded-xl border",
              colorStyle.light
            )}>
              <div className="absolute inset-0 flex items-center justify-center">
                <CategoryIcon className={cn("h-20 w-20", colorStyle.text, "opacity-50")} />
              </div>
              <div className="absolute left-3 top-3 flex gap-2">
                {template.isBestSeller && (
                  <Badge className="bg-amber-500 text-white">Best Seller</Badge>
                )}
                {template.isNew && (
                  <Badge className="bg-emerald-500 text-white">New</Badge>
                )}
                {template.isPopular && (
                  <Badge className={cn(colorStyle.bg, "text-white")}>Popular</Badge>
                )}
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[1, 2, 3].map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "h-20 w-28 flex-shrink-0 rounded-lg border",
                    colorStyle.light,
                    "cursor-pointer transition-all hover:opacity-80"
                  )}
                >
                  <div className="flex h-full items-center justify-center">
                    <CategoryIcon className={cn("h-6 w-6", colorStyle.text, "opacity-50")} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Template Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Title & Rating */}
            <div>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h1 className="font-cormorant text-3xl font-bold md:text-4xl">
                  {template.name}
                </h1>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    <span className="ml-1 font-semibold">{template.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({template.reviews} ulasan)
                  </span>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="secondary">{template.subcategory}</Badge>
                <Badge variant="outline">{template.style}</Badge>
              </div>
            </div>

            {/* Price */}
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-accent">
                  {formatPrice(template.price)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(template.originalPrice)}
                </span>
                <Badge className="bg-emerald-500 text-white">
                  Hemat {Math.round((1 - template.price / template.originalPrice) * 100)}%
                </Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Harga sekali bayar, template selamanya menjadi milik Anda
              </p>
            </div>

            {/* Description */}
            <p className="text-muted-foreground">{template.description}</p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-lg border border-border p-2 text-center">
                <Users className="mx-auto h-4 w-4 text-muted-foreground" />
                <p className="mt-1 text-sm font-semibold">{template.sales}+</p>
                <p className="text-xs text-muted-foreground">Terjual</p>
              </div>
              <div className="rounded-lg border border-border p-2 text-center">
                <Clock className="mx-auto h-4 w-4 text-muted-foreground" />
                <p className="mt-1 text-sm font-semibold">{template.duration}</p>
                <p className="text-xs text-muted-foreground">Pengerjaan</p>
              </div>
              <div className="rounded-lg border border-border p-2 text-center">
                <RefreshCw className="mx-auto h-4 w-4 text-muted-foreground" />
                <p className="mt-1 text-sm font-semibold">Free Update</p>
                <p className="text-xs text-muted-foreground">1 Tahun</p>
              </div>
              <div className="rounded-lg border border-border p-2 text-center">
                <Headphones className="mx-auto h-4 w-4 text-muted-foreground" />
                <p className="mt-1 text-sm font-semibold">Support</p>
                <p className="text-xs text-muted-foreground">3 Bulan</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className={cn("flex-1", colorStyle.bg, colorStyle.hover)}>
                <Link href="/register">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Beli Sekarang - {formatPrice(template.price)}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={template.demoUrl} target="_blank">
                  <Eye className="mr-2 h-4 w-4" />
                  Demo Template
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Includes */}
            <div className="rounded-lg border border-border p-4">
              <p className="mb-2 font-semibold">✓ Termasuk dalam pembelian:</p>
              <div className="grid gap-1.5 sm:grid-cols-2">
                {template.includes.map((item: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="border-t border-border bg-muted/30 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Fitur</TabsTrigger>
              <TabsTrigger value="tech-stack">Teknologi</TabsTrigger>
              <TabsTrigger value="reviews">Ulasan</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tentang {template.name}</CardTitle>
                  <CardDescription>
                    Informasi lengkap tentang template ini
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="mb-2 font-semibold">Deskripsi</h3>
                    <p className="text-muted-foreground">{template.longDescription}</p>
                  </div>
                  
                  <div>
                    <h3 className="mb-2 font-semibold">Warna Tersedia</h3>
                    <div className="flex flex-wrap gap-2">
                      {template.colors.map((color: string) => (
                        <Badge key={color} variant="outline">{color}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 font-semibold">Yang Anda Dapatkan</h3>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {template.includes.map((item: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-emerald-500" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Features Tab */}
            <TabsContent value="features" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Fitur Lengkap</CardTitle>
                  <CardDescription>
                    Semua fitur yang tersedia di template {template.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {template.features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 rounded-lg border border-border p-3">
                        <Check className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tech Stack Tab */}
            <TabsContent value="tech-stack" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Teknologi yang Digunakan</CardTitle>
                  <CardDescription>
                    Stack teknologi modern untuk performa terbaik
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {template.techStack.map((tech: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 rounded-lg border border-border p-3">
                        <div className={cn("rounded-lg p-2", colorStyle.light)}>
                          <Code className={cn("h-4 w-4", colorStyle.text)} />
                        </div>
                        <span className="font-medium">{tech}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 rounded-lg border border-border p-4">
                    <h3 className="mb-2 font-semibold">Persyaratan Server</h3>
                    <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                      <li>Node.js 18+ atau lebih baru</li>
                      <li>MySQL 8+ atau PostgreSQL 14+</li>
                      <li>RAM minimal 1GB</li>
                      <li>Storage minimal 500MB</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ulasan Pelanggan</CardTitle>
                  <CardDescription>
                    {template.reviews} ulasan dari pelanggan yang puas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {template.testimonials.map((testimonial: any, idx: number) => (
                      <div key={idx} className="border-b border-border pb-4 last:border-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold">{testimonial.name}</p>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    "h-3 w-3",
                                    i < testimonial.rating
                                      ? "fill-yellow-500 text-yellow-500"
                                      : "text-muted-foreground"
                                  )}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">{testimonial.date}</span>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          "{testimonial.comment}"
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 text-center">
            <h2 className="font-cormorant text-2xl font-bold">
              Pertanyaan Umum
            </h2>
            <p className="text-muted-foreground">
              Seputar pembelian dan penggunaan template
            </p>
          </div>

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Apakah ada biaya bulanan setelah beli template?</AccordionTrigger>
              <AccordionContent>
                Tidak ada. Template bersifat one-time purchase. Anda bayar sekali, template selamanya menjadi milik Anda. Biaya hosting terpisah jika menggunakan jasa hosting kami.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Apakah bisa custom template setelah dibeli?</AccordionTrigger>
              <AccordionContent>
                Bisa. Karena Anda mendapatkan source code lengkap, Anda bebas melakukan kustomisasi sendiri atau menggunakan jasa custom development dari kami dengan biaya sesuai permintaan.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Berapa lama proses setup?</AccordionTrigger>
              <AccordionContent>
                Proses setup memakan waktu {template.duration} setelah pembayaran dikonfirmasi dan data lengkap diterima.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Apakah ada garansi?</AccordionTrigger>
              <AccordionContent>
                Ya, kami memberikan garansi 30 hari untuk bug dan error yang disebabkan oleh kode template.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-gradient-to-r from-primary/5 to-accent/5 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-cormorant text-2xl font-bold">
            Siap Memiliki Template {template.name}?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
            Beli sekarang dan dapatkan website impian Anda dengan harga terjangkau
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className={cn(colorStyle.bg, colorStyle.hover)}>
              <Link href="/register">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Beli Sekarang
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">
                <MessageCircle className="mr-2 h-4 w-4" />
                Tanya via WhatsApp
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}