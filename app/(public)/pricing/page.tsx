"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Check, Sparkles, Heart, School, Briefcase, Database,
  Star, Shield, Clock, Users, CreditCard, Gift,
  Rocket, Zap, Crown, HelpCircle, MessageCircle, Phone,
  ArrowRight, Download, FileText, Settings,
  ShoppingCart, Globe, Mail, Server, Wrench,
  Code, Palette, Layers, TrendingUp, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

// Data pricing per kategori - ONE TIME PURCHASE (Template Only)
const pricingData = {
  undangan: {
    name: "Undangan Digital",
    icon: Heart,
    color: "rose",
    description: "Template undangan digital siap pakai",
    badgeText: "Sekali Bayar - Template Selamanya",
    plans: [
      {
        id: "basic",
        name: "Basic",
        price: 299000,
        originalPrice: 599000,
        period: "sekali bayar",
        description: "1 template undangan pilihan",
        includes: [
          "1 template undangan digital pilihan",
          "Setup & instalasi oleh tim kami",
          "Source code template",
          "Dokumentasi penggunaan",
          "Free update 3 bulan",
          "Support 1 bulan"
        ],
        notIncludes: [
          "Biaya hosting & domain",
          "Biaya maintenance bulanan",
          "Penambahan fitur custom"
        ],
        buttonText: "Beli Template",
        buttonVariant: "outline",
        popular: false,
        recommended: false
      },
      {
        id: "premium",
        name: "Premium",
        price: 599000,
        originalPrice: 1199000,
        period: "sekali bayar",
        description: "3 template undangan pilihan",
        includes: [
          "3 template undangan digital pilihan",
          "Setup & instalasi oleh tim kami",
          "Source code semua template",
          "Dokumentasi lengkap",
          "Free update 1 tahun",
          "Support 3 bulan",
          "Bebas ganti template dalam 1 tahun"
        ],
        notIncludes: [
          "Biaya hosting & domain",
          "Biaya maintenance bulanan",
          "Penambahan fitur custom"
        ],
        buttonText: "Beli Template",
        buttonVariant: "default",
        popular: true,
        recommended: true,
        badge: "Best Value"
      },
      {
        id: "bundle",
        name: "Bundle",
        price: 899000,
        originalPrice: 1799000,
        period: "sekali bayar",
        description: "Semua template undangan",
        includes: [
          "ALL template undangan (15 template)",
          "Setup & instalasi oleh tim kami",
          "Source code semua template",
          "Dokumentasi lengkap",
          "Free update seumur hidup",
          "Support 1 tahun",
          "Bebas ganti template kapan saja"
        ],
        notIncludes: [
          "Biaya hosting & domain",
          "Biaya maintenance bulanan",
          "Penambahan fitur custom"
        ],
        buttonText: "Beli Bundle",
        buttonVariant: "outline",
        popular: false,
        recommended: false,
        badge: "Hemat 60%"
      }
    ]
  },
  sekolah: {
    name: "Website Sekolah",
    icon: School,
    color: "blue",
    description: "Template website sekolah siap pakai",
    badgeText: "Sekali Bayar - Template Selamanya",
    plans: [
      {
        id: "starter",
        name: "Starter",
        price: 999000,
        originalPrice: 1999000,
        period: "sekali bayar",
        description: "1 template website sekolah",
        includes: [
          "1 template website sekolah pilihan",
          "Setup & instalasi oleh tim kami",
          "Source code template",
          "Dokumentasi penggunaan",
          "Free update 3 bulan",
          "Support 1 bulan"
        ],
        notIncludes: [
          "Biaya hosting & domain",
          "Biaya maintenance bulanan",
          "Penambahan fitur custom"
        ],
        buttonText: "Beli Template",
        buttonVariant: "outline",
        popular: false,
        recommended: false
      },
      {
        id: "professional",
        name: "Professional",
        price: 2499000,
        originalPrice: 4999000,
        period: "sekali bayar",
        description: "1 template + fitur lengkap",
        includes: [
          "1 template website sekolah pilihan",
          "Fitur lengkap (e-learning, payment)",
          "Setup & instalasi oleh tim kami",
          "Source code template",
          "Dokumentasi lengkap",
          "Free update 1 tahun",
          "Support 3 bulan"
        ],
        notIncludes: [
          "Biaya hosting & domain",
          "Biaya maintenance bulanan",
          "Penambahan fitur custom"
        ],
        buttonText: "Beli Template",
        buttonVariant: "default",
        popular: true,
        recommended: true,
        badge: "Best Value"
      },
      {
        id: "complete",
        name: "Complete",
        price: 3999000,
        originalPrice: 7999000,
        period: "sekali bayar",
        description: "Bundle semua template sekolah",
        includes: [
          "ALL template website sekolah (8 template)",
          "Setup & instalasi oleh tim kami",
          "Source code semua template",
          "Dokumentasi lengkap",
          "Free update seumur hidup",
          "Support 1 tahun",
          "Bebas ganti template kapan saja"
        ],
        notIncludes: [
          "Biaya hosting & domain",
          "Biaya maintenance bulanan",
          "Penambahan fitur custom"
        ],
        buttonText: "Beli Bundle",
        buttonVariant: "outline",
        popular: false,
        recommended: false,
        badge: "Hemat 50%"
      }
    ]
  },
  bisnis: {
    name: "Website Bisnis",
    icon: Briefcase,
    color: "emerald",
    description: "Template website bisnis siap pakai",
    badgeText: "Sekali Bayar - Template Selamanya",
    plans: [
      {
        id: "basic",
        name: "Basic",
        price: 599000,
        originalPrice: 1199000,
        period: "sekali bayar",
        description: "1 template website bisnis",
        includes: [
          "1 template website bisnis pilihan",
          "Setup & instalasi oleh tim kami",
          "Source code template",
          "Dokumentasi penggunaan",
          "Free update 3 bulan",
          "Support 1 bulan"
        ],
        notIncludes: [
          "Biaya hosting & domain",
          "Biaya maintenance bulanan",
          "Penambahan fitur custom"
        ],
        buttonText: "Beli Template",
        buttonVariant: "outline",
        popular: false,
        recommended: false
      },
      {
        id: "business",
        name: "Business",
        price: 1499000,
        originalPrice: 2999000,
        period: "sekali bayar",
        description: "1 template + e-commerce",
        includes: [
          "1 template website bisnis pilihan",
          "Fitur e-commerce lengkap",
          "Setup & instalasi oleh tim kami",
          "Source code template",
          "Dokumentasi lengkap",
          "Free update 1 tahun",
          "Support 3 bulan"
        ],
        notIncludes: [
          "Biaya hosting & domain",
          "Biaya maintenance bulanan",
          "Penambahan fitur custom"
        ],
        buttonText: "Beli Template",
        buttonVariant: "default",
        popular: true,
        recommended: true,
        badge: "Best Value"
      },
      {
        id: "complete",
        name: "Complete",
        price: 2999000,
        originalPrice: 5999000,
        period: "sekali bayar",
        description: "Bundle semua template bisnis",
        includes: [
          "ALL template website bisnis (12 template)",
          "Setup & instalasi oleh tim kami",
          "Source code semua template",
          "Dokumentasi lengkap",
          "Free update seumur hidup",
          "Support 1 tahun",
          "Bebas ganti template kapan saja"
        ],
        notIncludes: [
          "Biaya hosting & domain",
          "Biaya maintenance bulanan",
          "Penambahan fitur custom"
        ],
        buttonText: "Beli Bundle",
        buttonVariant: "outline",
        popular: false,
        recommended: false,
        badge: "Hemat 50%"
      }
    ]
  },
  manajemen: {
    name: "Sistem Manajemen",
    icon: Database,
    color: "purple",
    description: "Template sistem manajemen siap pakai",
    badgeText: "Sekali Bayar - Template Selamanya",
    plans: [
      {
        id: "starter",
        name: "Starter",
        price: 1999000,
        originalPrice: 3999000,
        period: "sekali bayar",
        description: "1 template sistem manajemen",
        includes: [
          "1 template sistem manajemen pilihan",
          "Setup & instalasi oleh tim kami",
          "Source code template",
          "Dokumentasi penggunaan",
          "Free update 6 bulan",
          "Support 3 bulan"
        ],
        notIncludes: [
          "Biaya hosting & domain",
          "Biaya maintenance bulanan",
          "Penambahan fitur custom"
        ],
        buttonText: "Beli Template",
        buttonVariant: "outline",
        popular: false,
        recommended: false
      },
      {
        id: "professional",
        name: "Professional",
        price: 3999000,
        originalPrice: 7999000,
        period: "sekali bayar",
        description: "1 template + fitur lengkap",
        includes: [
          "1 template sistem manajemen pilihan",
          "Fitur lengkap (HRD, Finance)",
          "Setup & instalasi oleh tim kami",
          "Source code template",
          "Dokumentasi lengkap",
          "Free update 1 tahun",
          "Support 6 bulan"
        ],
        notIncludes: [
          "Biaya hosting & domain",
          "Biaya maintenance bulanan",
          "Penambahan fitur custom"
        ],
        buttonText: "Beli Template",
        buttonVariant: "default",
        popular: true,
        recommended: true,
        badge: "Best Value"
      },
      {
        id: "complete",
        name: "Complete",
        price: 6999000,
        originalPrice: 13999000,
        period: "sekali bayar",
        description: "Bundle semua template manajemen",
        includes: [
          "ALL template sistem manajemen (10 template)",
          "Setup & instalasi oleh tim kami",
          "Source code semua template",
          "Dokumentasi lengkap",
          "Free update seumur hidup",
          "Support 1 tahun",
          "Bebas ganti template kapan saja"
        ],
        notIncludes: [
          "Biaya hosting & domain",
          "Biaya maintenance bulanan",
          "Penambahan fitur custom"
        ],
        buttonText: "Beli Bundle",
        buttonVariant: "outline",
        popular: false,
        recommended: false,
        badge: "Hemat 50%"
      }
    ]
  }
};

// Hosting & Domain Services
const hostingServices = [
  {
    name: "Setup Hosting & Domain",
    price: "Rp 250.000",
    period: "sekali",
    description: "Setup awal hosting dan domain",
    features: [
      "Pembelian domain (biaya domain terpisah)",
      "Setup hosting server",
      "Instalasi template ke server",
      "Konfigurasi database",
      "Tes & debugging",
      "Dokumentasi akses"
    ]
  },
  {
    name: "Hosting Management",
    price: "Rp 150.000",
    period: "per bulan",
    description: "Kelola hosting untuk Anda",
    features: [
      "Monitoring server 24/7",
      "Backup data rutin",
      "Update keamanan",
      "Maintenance server",
      "Cek performa website",
      "Laporan bulanan"
    ]
  },
  {
    name: "Domain Management",
    price: "Rp 50.000",
    period: "per bulan",
    description: "Pengelolaan domain",
    features: [
      "Perpanjangan domain otomatis",
      "Konfigurasi DNS",
      "Manajemen SSL",
      "Email hosting setup",
      "Subdomain management"
    ]
  }
];

// Maintenance & Additional Services
const maintenanceServices = [
  {
    name: "Maintenance Paket Basic",
    price: "Rp 300.000",
    period: "per bulan",
    description: "Maintenance rutin website",
    features: [
      "Backup data mingguan",
      "Update security patch",
      "Cek error log",
      "Monitoring uptime",
      "1x revisi minor per bulan",
      "Response time 3x24 jam"
    ]
  },
  {
    name: "Maintenance Paket Premium",
    price: "Rp 500.000",
    period: "per bulan",
    description: "Maintenance lengkap website",
    features: [
      "Backup data harian",
      "Update security & fitur",
      "Optimasi performa",
      "Monitoring & alert",
      "3x revisi minor per bulan",
      "Response time 1x24 jam",
      "Laporan performa bulanan"
    ]
  },
  {
    name: "Add Feature / Custom Development",
    price: "Mulai Rp 500.000",
    period: "per fitur",
    description: "Penambahan fitur sesuai permintaan",
    features: [
      "Analisis kebutuhan",
      "Development fitur",
      "Testing & QA",
      "Integrasi ke sistem",
      "Dokumentasi fitur",
      "Garansi 30 hari"
    ]
  },
  {
    name: "Bug Fixing & Emergency",
    price: "Mulai Rp 200.000",
    period: "per kejadian",
    description: "Perbaikan bug atau error",
    features: [
      "Diagnosa masalah",
      "Perbaikan bug/error",
      "Testing & validasi",
      "Laporan perbaikan",
      "Response cepat"
    ]
  },
  {
    name: "Konsultasi & Training",
    price: "Rp 250.000",
    period: "per jam",
    description: "Konsultasi atau training penggunaan",
    features: [
      "Training penggunaan sistem",
      "Konsultasi pengembangan",
      "Best practice",
      "Diskusi per jam",
      "Online meeting"
    ]
  }
];

// Enterprise Custom Development
const enterprisePackages = [
  {
    name: "Custom Website Development",
    icon: Globe,
    price: "Mulai Rp 5.000.000",
    description: "Website custom sesuai spesifikasi",
    features: [
      "Desain custom sesuai branding",
      "Fitur sesuai kebutuhan bisnis",
      "Database & backend system",
      "Admin dashboard",
      "Mobile responsive",
      "Source code milik client",
      "Bebas hosting dimana saja"
    ],
    timeline: "4-8 minggu"
  },
  {
    name: "Custom Mobile App",
    icon: Smartphone,
    price: "Mulai Rp 15.000.000",
    description: "Aplikasi mobile custom",
    features: [
      "Aplikasi Android & iOS",
      "UI/UX design custom",
      "Backend & API",
      "Source code milik client",
      "App store submission"
    ],
    timeline: "8-12 minggu"
  },
  {
    name: "Custom ERP System",
    icon: Layers,
    price: "Mulai Rp 25.000.000",
    description: "ERP system custom",
    features: [
      "Module custom sesuai kebutuhan",
      "Multi company support",
      "Advanced reporting",
      "API integration",
      "Source code milik client"
    ],
    timeline: "12-20 minggu"
  }
];

const faqs = [
  {
    question: "Apa yang saya dapatkan saat membeli template?",
    answer: "Anda mendapatkan source code template, setup & instalasi oleh tim kami, dokumentasi penggunaan, free update sesuai paket, dan support sesuai paket yang dipilih. Hosting dan domain tidak termasuk."
  },
  {
    question: "Apakah setelah beli langsung bisa digunakan?",
    answer: "Setelah pembelian, tim kami akan melakukan setup dan instalasi template ke server Anda (atau server yang kami sediakan). Proses setup memakan waktu 1-3 hari kerja tergantung kompleksitas."
  },
  {
    question: "Bagaimana dengan hosting? Apakah wajib pakai hosting dari kami?",
    answer: "Tidak wajib. Anda bisa menggunakan hosting sendiri atau menggunakan jasa hosting dari kami. Biaya hosting terpisah dari harga template."
  },
  {
    question: "Apakah ada biaya bulanan setelah beli template?",
    answer: "Tidak ada biaya bulanan untuk template. Anda hanya perlu membayar biaya hosting (jika menggunakan hosting kami) dan maintenance (jika menggunakan jasa maintenance kami)."
  },
  {
    question: "Saya bisa mengelola website sendiri setelah setup?",
    answer: "Tentu bisa. Setelah setup selesai, kami akan serahkan akses penuh ke Anda. Anda bebas mengelola website sendiri di hosting Anda."
  },
  {
    question: "Kalau ada error atau bug setelah pembelian?",
    answer: "Kami memberikan garansi 30 hari untuk bug dan error yang disebabkan oleh kode template. Untuk masalah di luar itu, bisa menggunakan jasa bug fixing kami."
  },
  {
    question: "Bisa request penambahan fitur?",
    answer: "Bisa. Silahkan menggunakan jasa add feature / custom development. Harga sesuai dengan kompleksitas fitur yang diminta."
  },
  {
    question: "Metode pembayaran apa saja?",
    answer: "Transfer bank (BCA, Mandiri, BRI, BNI), kartu kredit, dan e-wallet (OVO, GoPay, Dana)."
  }
];

// Icons
function Smartphone(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

function GlobeIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export default function PricingPage() {
  const [selectedTab, setSelectedTab] = useState("undangan");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getColorClass = (color: string) => {
    const colors = {
      rose: "bg-rose-500 hover:bg-rose-600 text-white border-rose-500",
      blue: "bg-blue-500 hover:bg-blue-600 text-white border-blue-500",
      emerald: "bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-500",
      purple: "bg-purple-500 hover:bg-purple-600 text-white border-purple-500"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getBorderColorClass = (color: string) => {
    const colors = {
      rose: "border-rose-200 dark:border-rose-800",
      blue: "border-blue-200 dark:border-blue-800",
      emerald: "border-emerald-200 dark:border-emerald-800",
      purple: "border-purple-200 dark:border-purple-800"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const currentData = pricingData[selectedTab as keyof typeof pricingData];
  const Icon = currentData?.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge className="mb-4 bg-accent/10 text-accent-foreground">
              <Sparkles className="mr-1 h-3 w-3" />
              One Time Purchase
            </Badge>
            <h1 className="mb-4 font-cormorant text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Beli Template Sekali
              <br />
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Langsung Jadi Milik Anda
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
              Beli template, kami setup, lalu serahkan ke Anda. Bebas kelola sendiri 
              atau pakai jasa maintenance kami. Tidak ada biaya berlangganan bulanan!
            </p>
          </motion.div>

          {/* Simple Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-12 flex flex-wrap justify-center gap-6 sm:gap-10"
          >
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                1
              </div>
              <div className="text-sm font-medium">Beli Template</div>
              <div className="text-xs text-muted-foreground">Pilih & bayar sekali</div>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                2
              </div>
              <div className="text-sm font-medium">Kami Setup</div>
              <div className="text-xs text-muted-foreground">Instalasi & konfigurasi</div>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                3
              </div>
              <div className="text-sm font-medium">Kami Serahkan</div>
              <div className="text-xs text-muted-foreground">Akses & dokumentasi</div>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                4
              </div>
              <div className="text-sm font-medium">Anda Kelola</div>
              <div className="text-xs text-muted-foreground">Bebas di hosting Anda</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-16 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="overflow-x-auto py-3">
            <div className="flex gap-2 min-w-max">
              {Object.entries(pricingData).map(([key, data]) => {
                const TabIcon = data.icon;
                const isActive = selectedTab === key;
                return (
                  <Button
                    key={key}
                    variant={isActive ? "default" : "ghost"}
                    onClick={() => setSelectedTab(key)}
                    className={cn(
                      "gap-2",
                      isActive && getColorClass(data.color)
                    )}
                  >
                    <TabIcon className="h-4 w-4" />
                    {data.name}
                  </Button>
                );
              })}
              <Button
                variant={selectedTab === "hosting" ? "default" : "ghost"}
                onClick={() => setSelectedTab("hosting")}
                className="gap-2"
              >
                <Server className="h-4 w-4" />
                Hosting & Layanan
              </Button>
              <Button
                variant={selectedTab === "enterprise" ? "default" : "ghost"}
                onClick={() => setSelectedTab("enterprise")}
                className={cn(
                  "gap-2",
                  selectedTab === "enterprise" && "bg-gradient-to-r from-accent to-primary text-white"
                )}
              >
                <Crown className="h-4 w-4" />
                Custom Development
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Template Pricing Cards */}
      {selectedTab !== "hosting" && selectedTab !== "enterprise" && currentData && (
        <>
          <section className="container mx-auto px-4 pt-8">
            <div className={cn("rounded-lg border-2 border-dashed p-3 text-center", getBorderColorClass(currentData.color))}>
              <p className="text-sm font-medium">
                🎉 <span className="font-bold">{currentData.badgeText}</span> — Bayar sekali, template langsung jadi milik Anda!
              </p>
            </div>
          </section>

          <section className="container mx-auto px-4 py-8 pb-12">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {currentData.plans.map((plan, idx) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className={cn(
                    "relative h-full transition-all duration-300 hover:shadow-lg",
                    plan.recommended && "border-accent shadow-lg"
                  )}>
                    {plan.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className={cn(
                          "px-3 py-1 text-xs font-semibold",
                          plan.recommended ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                        )}>
                          {plan.badge}
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">{formatPrice(plan.price)}</span>
                        <span className="text-muted-foreground"> / {plan.period}</span>
                        {plan.originalPrice && (
                          <div className="mt-1 text-sm text-muted-foreground line-through">
                            {formatPrice(plan.originalPrice)}
                          </div>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div>
                        <p className="mb-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">✓ Termasuk:</p>
                        <div className="space-y-1.5">
                          {plan.includes.map((item, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="mb-2 text-sm font-semibold text-muted-foreground">✗ Tidak Termasuk:</p>
                        <div className="space-y-1.5">
                          {plan.notIncludes.map((item, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <div className="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-muted-foreground/30" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter>
                      <Button 
                        asChild 
                        variant={plan.buttonVariant as "default" | "outline"} 
                        className={cn(
                          "w-full",
                          plan.buttonVariant === "default" && getColorClass(currentData.color)
                        )}
                      >
                        <Link href="/register">
                          {plan.buttonText}
                          <ShoppingCart className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Hosting & Services Section */}
      {selectedTab === "hosting" && (
        <>
          {/* Hosting Services */}
          <section className="container mx-auto px-4 py-8">
            <div className="mb-8 text-center">
              <Server className="mx-auto mb-3 h-10 w-10 text-accent" />
              <h2 className="mb-2 font-cormorant text-2xl font-bold sm:text-3xl">
                Layanan Hosting & Domain
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Butuh bantuan setup hosting? Kami siap membantu. Atau Anda bisa pakai hosting sendiri.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {hostingServices.map((service, idx) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <div className="mt-2">
                        <span className="text-2xl font-bold text-accent">{service.price}</span>
                        <span className="text-muted-foreground"> / {service.period}</span>
                      </div>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1.5">
                        {service.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/contact">Pesan Layanan</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Maintenance Services */}
          <section className="container mx-auto px-4 py-8 border-t border-border">
            <div className="mb-8 text-center">
              <Wrench className="mx-auto mb-3 h-10 w-10 text-accent" />
              <h2 className="mb-2 font-cormorant text-2xl font-bold sm:text-3xl">
                Layanan Maintenance & Jasa
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Ingin kami yang kelola website Anda? Atau butuh tambahan fitur? Pilih layanan sesuai kebutuhan.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {maintenanceServices.map((service, idx) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <div className="mt-2">
                        <span className="text-2xl font-bold text-accent">{service.price}</span>
                        <span className="text-muted-foreground"> / {service.period}</span>
                      </div>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1.5">
                        {service.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/contact">Pesan Layanan</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Enterprise Section */}
      {selectedTab === "enterprise" && (
        <section className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <Crown className="mx-auto mb-3 h-10 w-10 text-accent" />
            <h2 className="mb-2 font-cormorant text-2xl font-bold sm:text-3xl">
              Custom Development
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Butuh sistem custom? Tim developer kami siap mewujudkan sesuai spesifikasi Anda.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {enterprisePackages.map((pkg, idx) => {
              const PkgIcon = pkg.icon;
              return (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="rounded-lg bg-accent/10 p-2 w-fit">
                        <PkgIcon className="h-6 w-6 text-accent" />
                      </div>
                      <CardTitle className="mt-3 text-xl">{pkg.name}</CardTitle>
                      <div className="mt-2">
                        <span className="text-2xl font-bold text-accent">{pkg.price}</span>
                      </div>
                      <CardDescription>{pkg.description}</CardDescription>
                      <Badge variant="outline" className="mt-2 w-fit">
                        ⏱️ Estimasi: {pkg.timeline}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1.5">
                        {pkg.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full bg-gradient-to-r from-accent to-primary">
                        <Link href="/contact">
                          Konsultasi Gratis
                          <MessageCircle className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Why Custom */}
          <div className="mt-12 rounded-2xl border border-border bg-muted/30 p-6 text-center">
            <h3 className="mb-4 font-cormorant text-xl font-bold">Kenapa Custom Development dengan Kami?</h3>
            <div className="grid gap-4 sm:grid-cols-4">
              {[
                { icon: Code, title: "Source Code Milik Anda" },
                { icon: Palette, title: "Desain Custom" },
                { icon: Server, title: "Bebas Hosting" },
                { icon: Users, title: "Dedicated Team" }
              ].map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <div key={idx} className="text-center">
                    <ItemIcon className="mx-auto mb-2 h-6 w-6 text-accent" />
                    <p className="text-sm font-medium">{item.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="mb-6 font-cormorant text-2xl font-bold">Proses Kerja Kami</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent font-bold">1</div>
                <p className="font-medium">Pilih Template</p>
                <p className="text-xs text-muted-foreground">Pilih template yang sesuai</p>
              </div>
              <div>
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent font-bold">2</div>
                <p className="font-medium">Pembayaran</p>
                <p className="text-xs text-muted-foreground">Bayar sekali, selamanya</p>
              </div>
              <div>
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent font-bold">3</div>
                <p className="font-medium">Setup oleh Kami</p>
                <p className="text-xs text-muted-foreground">Instalasi & konfigurasi</p>
              </div>
              <div>
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent font-bold">4</div>
                <p className="font-medium">Website Live</p>
                <p className="text-xs text-muted-foreground">Website siap digunakan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl"
        >
          <div className="mb-8 text-center">
            <HelpCircle className="mx-auto mb-3 h-10 w-10 text-accent" />
            <h2 className="mb-2 font-cormorant text-2xl font-bold">Pertanyaan Umum</h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Masih ada pertanyaan?{' '}
              <Link href="/contact" className="text-accent hover:underline">
                Hubungi tim support kami
              </Link>
            </p>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-gradient-to-r from-primary/5 to-accent/5 py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 font-cormorant text-2xl font-bold sm:text-3xl">
              Siap Punya Website atau Sistem Sendiri?
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
              Beli template sekarang, kami setup, serahkan ke Anda. Bebas kelola sendiri!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/register">
                  Beli Template
                  <ShoppingCart className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/templates">
                  Lihat Template
                  <Eye className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/contact">
                  Konsultasi
                  <MessageCircle className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}