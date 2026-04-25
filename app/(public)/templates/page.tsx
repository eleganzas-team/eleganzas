"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Sparkles, Heart, School, Briefcase, Database, 
  ArrowRight, Check, Star, Clock, Users, Building,
  Gift, FileText, Calendar, Shield, TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const categories = [
  {
    id: "undangan",
    title: "Undangan Digital",
    slug: "undangan",
    icon: Heart,
    description: "Template undangan digital elegan untuk berbagai acara spesial",
    longDescription: "Buat undangan digital yang berkesan untuk pernikahan, ulang tahun, baby shower, dan acara spesial lainnya. Dengan desain yang memukau dan fitur interaktif.",
    features: [
      "RSVP Online Real-time",
      "Galeri Foto & Video",
      "Maps Lokasi Acara",
      "Amplop Digital",
      "Background Music",
      "Countdown Timer"
    ],
    stats: { templates: 15, users: "2.5k+", rating: 4.8 },
    color: "rose",
    bgGradient: "from-rose-500/10 to-amber-500/10",
    iconBg: "bg-rose-100 dark:bg-rose-950/30",
    iconColor: "text-rose-600 dark:text-rose-400",
    btnColor: "bg-rose-500 hover:bg-rose-600"
  },
  {
    id: "sekolah",
    title: "Website Sekolah",
    slug: "sekolah",
    icon: School,
    description: "Solusi lengkap manajemen sekolah digital modern",
    longDescription: "Transformasi digital sekolah dengan sistem manajemen terintegrasi. Mulai dari website profil, e-learning, hingga sistem pembayaran SPP online.",
    features: [
      "Website Profil Sekolah",
      "E-Learning System",
      "Manajemen Siswa & Guru",
      "Pembayaran SPP Digital",
      "Perpustakaan Digital",
      "Laporan Nilai Online"
    ],
    stats: { templates: 8, users: "1.2k+", rating: 4.7 },
    color: "blue",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    iconBg: "bg-blue-100 dark:bg-blue-950/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    btnColor: "bg-blue-500 hover:bg-blue-600"
  },
  {
    id: "bisnis",
    title: "Website Bisnis",
    slug: "bisnis",
    icon: Briefcase,
    description: "Tingkatkan bisnis dengan website profesional",
    longDescription: "Solusi website untuk UMKM, perusahaan, restoran, hotel, dan klinik. Lengkap dengan fitur e-commerce, booking system, dan manajemen pelanggan.",
    features: [
      "Company Profile",
      "Toko Online (E-commerce)",
      "Sistem Booking/Pemesanan",
      "Manajemen Produk",
      "Payment Gateway",
      "CRM Pelanggan"
    ],
    stats: { templates: 12, users: "3.1k+", rating: 4.9 },
    color: "emerald",
    bgGradient: "from-emerald-500/10 to-teal-500/10",
    iconBg: "bg-emerald-100 dark:bg-emerald-950/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    btnColor: "bg-emerald-500 hover:bg-emerald-600"
  },
  {
    id: "manajemen",
    title: "Sistem Manajemen",
    slug: "manajemen",
    icon: Database,
    description: "Kelola bisnis Anda lebih efisien",
    longDescription: "Sistem manajemen terintegrasi untuk inventory, HRD, keuangan, dan project management. Solusi digital untuk operasional bisnis yang lebih baik.",
    features: [
      "Inventory Management",
      "HRIS & Payroll",
      "Akuntansi & Keuangan",
      "Project Management",
      "CRM & Customer Support",
      "Laporan & Analitik"
    ],
    stats: { templates: 10, users: "890+", rating: 4.8 },
    color: "purple",
    bgGradient: "from-purple-500/10 to-pink-500/10",
    iconBg: "bg-purple-100 dark:bg-purple-950/30",
    iconColor: "text-purple-600 dark:text-purple-400",
    btnColor: "bg-purple-500 hover:bg-purple-600"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

export default function TemplatesLandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge className="mb-4 bg-accent/10 text-accent-foreground">
              <Sparkles className="mr-1 h-3 w-3" />
              45+ Template Premium
            </Badge>
            <h1 className="mb-4 font-cormorant text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Solusi Digital untuk
              <br />
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Bisnis & Kebutuhan Anda
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
              Pilih template yang sesuai dengan kebutuhan Anda. Mulai dari undangan digital,
              website sekolah, website bisnis, hingga sistem manajemen terintegrasi.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link href="#categories">
                  Lihat Semua Template
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Konsultasi Gratis</Link>
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-12 flex flex-wrap justify-center gap-8 sm:gap-12 md:mt-16"
          >
            {[
              { label: "Template Aktif", value: "45+", icon: FileText },
              { label: "Klien Puas", value: "7.5k+", icon: Users },
              { label: "Rating", value: "4.8/5", icon: Star },
              { label: "Support 24/7", value: "100%", icon: Shield }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="mb-2 flex justify-center">
                  <stat.icon className="h-5 w-5 text-accent sm:h-6 sm:w-6" />
                </div>
                <div className="text-xl font-bold sm:text-2xl">{stat.value}</div>
                <div className="text-xs text-muted-foreground sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <Badge className="mb-4 bg-accent/10 text-accent-foreground">Kategori Template</Badge>
          <h2 className="mb-4 font-cormorant text-2xl font-bold sm:text-3xl md:text-4xl">
            Pilih Kategori yang Sesuai
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
            Kami menyediakan berbagai template untuk memenuhi kebutuhan digital Anda
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:gap-8"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div key={category.id} variants={itemVariants}>
                <Card className={cn(
                  "group h-full overflow-hidden transition-all duration-300 hover:shadow-xl",
                  "border-border hover:border-accent/30"
                )}>
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100", category.bgGradient)} />
                  
                  <CardHeader className="relative">
                    <div className="flex items-start justify-between">
                      <div className={cn("rounded-xl p-3", category.iconBg)}>
                        <Icon className={cn("h-6 w-6 sm:h-7 sm:w-7", category.iconColor)} />
                      </div>
                      <Badge variant="outline" className="bg-background/50">
                        {category.stats.templates} Template
                      </Badge>
                    </div>
                    <CardTitle className="mt-4 text-xl sm:text-2xl">{category.title}</CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      {category.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative">
                    <p className="mb-4 text-sm text-muted-foreground">
                      {category.longDescription}
                    </p>
                    
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {category.features.slice(0, 4).map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          <Check className="mr-1 h-2.5 w-2.5" />
                          {feature}
                        </Badge>
                      ))}
                      {category.features.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{category.features.length - 4} fitur
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 border-t border-border pt-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{category.stats.users} pengguna</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                        <span>{category.stats.rating} rating</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>Top rated</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="relative flex gap-3">
                    <Button asChild className={cn("flex-1", category.btnColor)}>
                      <Link href={`/templates/${category.slug}`}>
                        Lihat Template
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="flex-1">
                      <Link href={`/templates/${category.slug}/demo`}>
                        Demo Preview
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="border-t border-border bg-muted/30 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 font-cormorant text-2xl font-bold sm:text-3xl md:text-4xl">
              Kenapa Memilih Template Kami?
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Template berkualitas tinggi dengan dukungan penuh untuk kesuksesan digital Anda
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Shield, title: "Keamanan Terjamin", desc: "SSL Certificate & Data Protection" },
              { icon: Clock, title: "Fast Delivery", desc: "Pengerjaan cepat 2-14 hari" },
              { icon: Calendar, title: "Free Update", desc: "Update fitur & keamanan 1 tahun" },
              { icon: Users, title: "Support 24/7", desc: "Tim support siap membantu Anda" }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="mb-1 font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl"
        >
          <h2 className="mb-4 font-cormorant text-2xl font-bold sm:text-3xl md:text-4xl">
            Siap Memulai Digitalisasi?
          </h2>
          <p className="mb-8 text-muted-foreground">
            Konsultasikan kebutuhan Anda dengan tim ahli kami secara gratis
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact">Hubungi Kami</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/pricing">Lihat Harga</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}