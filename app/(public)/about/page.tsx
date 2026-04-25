"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  Sparkles, Heart, School, Briefcase, Database,
  Users, Award, Clock, Shield, Globe, Mail,
  Check, ArrowRight, Star, TrendingUp, Zap,
  Coffee, Rocket, Target, Eye, MessageCircle,
  Phone, MapPin, Calendar, FileText, Code,
  Layout, Smartphone, Server, Cloud
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Template Siap Pakai", value: "45+", icon: FileText, color: "rose" },
  { label: "Klien Puas", value: "7.500+", icon: Users, color: "blue" },
  { label: "Project Selesai", value: "1.200+", icon: Rocket, color: "emerald" },
  { label: "Rating", value: "4.9/5", icon: Star, color: "purple" }
];

const values = [
  {
    icon: Shield,
    title: "Kualitas Terjamin",
    description: "Setiap template kami uji coba secara menyeluruh sebelum dirilis ke pelanggan.",
    color: "rose"
  },
  {
    icon: Clock,
    title: "Dukungan Cepat",
    description: "Tim support siap membantu Anda kapan pun dibutuhkan, response cepat.",
    color: "blue"
  },
  {
    icon: Code,
    title: "Kode Bersih",
    description: "Source code rapi, terstruktur, dan mudah dikembangkan lebih lanjut.",
    color: "emerald"
  },
  {
    icon: Users,
    title: "Berfokus pada Klien",
    description: "Kami mendengarkan kebutuhan klien untuk terus mengembangkan produk.",
    color: "purple"
  }
];

const team = [
  {
    id:"1",
    name: "Muhammad Rivan",
    role: "Founder & Lead Developer",
    description: "Fullstack developer dengan 8+ tahun pengalaman di industri web development.",
    social: { twitter: "#", linkedin: "#", github: "#" },
    color: "rose"
  },
  {
    id:"2",
    name: "Muhammad Rivan",
    role: "UI/UX Designer",
    description: "Desainer dengan passion menciptakan antarmuka yang indah dan mudah digunakan.",
    color: "blue"
  },
  {
    id:"3",
    name: "Muhammad Rivan",
    role: "Backend Developer",
    description: "Ahli dalam membangun sistem backend yang robust dan scalable.",
    color: "emerald"
  },
  {
    
    id:"4",
    name: "Muhammad Rivan",
    role: "Project Manager",
    description: "Memastikan setiap project berjalan lancar dan sesuai timeline.",
    color: "purple"
  }
];

const milestones = [
  { year: "2020", title: "Awal Berdiri", description: "Memulai perjalanan sebagai jasa pembuatan website." },
  { year: "2021", title: "Launch Template Pertama", description: "Merilis 5 template undangan digital pertama." },
  { year: "2022", title: "Ekspansi Kategori", description: "Menambah template website sekolah dan bisnis." },
  { year: "2023", title: "Sistem Manajemen", description: "Meluncurkan template sistem manajemen ERP." },
  { year: "2024", title: "45+ Template", description: "Lebih dari 45 template tersedia untuk berbagai kebutuhan." }
];

export default function AboutPage() {
  const getColorClass = (color: string) => {
    const colors = {
      rose: "bg-rose-500 text-white",
      blue: "bg-blue-500 text-white",
      emerald: "bg-emerald-500 text-white",
      purple: "bg-purple-500 text-white",
      default: "bg-primary text-primary-foreground"
    };
    return colors[color as keyof typeof colors] || colors.default;
  };

  const getTextColorClass = (color: string) => {
    const colors = {
      rose: "text-rose-600 dark:text-rose-400",
      blue: "text-blue-600 dark:text-blue-400",
      emerald: "text-emerald-600 dark:text-emerald-400",
      purple: "text-purple-600 dark:text-purple-400",
      default: "text-primary"
    };
    return colors[color as keyof typeof colors] || colors.default;
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
              Tentang Kami
            </Badge>
            <h1 className="mb-4 font-cormorant text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Kami Membantu
              <br />
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Digitalisasi Bisnis Anda
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
              Eleganzas adalah platform penyedia template website dan sistem manajemen berkualitas tinggi,
              dengan fokus pada kemudahan penggunaan dan kustomisasi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className={cn("mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-opacity-10", getTextColorClass(stat.color))}>
                <stat.icon className={cn("h-6 w-6", getTextColorClass(stat.color))} />
              </div>
              <div className="text-2xl font-bold md:text-3xl">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4">Our Story</Badge>
            <h2 className="mb-4 font-cormorant text-2xl font-bold sm:text-3xl">
              Perjalanan Kami
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Eleganzas lahir pada tahun 2020 dari kebutuhan akan template website yang berkualitas 
                dengan harga terjangkau. Kami melihat banyak bisnis dan individu kesulitan memiliki 
                website karena biaya development yang mahal dan proses yang rumit.
              </p>
              <p>
                Berawal dari jasa pembuatan website custom, kami kemudian mengembangkan berbagai 
                template siap pakai yang bisa langsung digunakan. Hingga kini, kami sudah memiliki 
                lebih dari 45 template dengan berbagai kategori.
              </p>
              <p>
                Visi kami adalah membantu digitalisasi UMKM, sekolah, dan berbagai organisasi di 
                Indonesia dengan solusi teknologi yang mudah diakses dan terjangkau.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 p-8"
          >
            <div className="relative z-10">
              <h3 className="mb-4 font-cormorant text-xl font-bold">Misi Kami</h3>
              <p className="mb-6 text-muted-foreground">
                "Memberikan solusi website dan sistem manajemen yang berkualitas, mudah digunakan, 
                dan terjangkau untuk membantu bisnis dan organisasi berkembang di era digital."
              </p>
              <h3 className="mb-4 font-cormorant text-xl font-bold">Visi Kami</h3>
              <p className="text-muted-foreground">
                "Menjadi mitra terpercaya dalam transformasi digital untuk ribuan bisnis dan 
                organisasi di Indonesia."
              </p>
            </div>
            <div className="absolute bottom-0 right-0 opacity-10">
              <Target className="h-32 w-32" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Milestones */}
      <section className="border-t border-border bg-muted/30 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <Badge className="mb-4">Timeline</Badge>
            <h2 className="font-cormorant text-2xl font-bold sm:text-3xl">
              Perjalanan Kami
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border hidden md:block" />
            
            <div className="space-y-8 md:space-y-0">
              {milestones.map((milestone, idx) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className={cn(
                    "relative flex flex-col md:flex-row md:items-center",
                    idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                >
                  <div className="flex-1 md:px-8">
                    <div className={cn(
                      "rounded-lg border p-4",
                      idx % 2 === 0 ? "md:text-right" : ""
                    )}>
                      <div className="text-2xl font-bold text-accent">{milestone.year}</div>
                      <h3 className="mt-1 font-semibold">{milestone.title}</h3>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center md:w-12">
                    <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                      {idx + 1}
                    </div>
                  </div>
                  
                  <div className="hidden flex-1 md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <Badge className="mb-4">Nilai Kami</Badge>
          <h2 className="font-cormorant text-2xl font-bold sm:text-3xl">
            Prinsip yang Kami Pegang
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, idx) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center">
                  <CardHeader>
                    <div className={cn("mx-auto rounded-full p-3 w-fit bg-opacity-10", getTextColorClass(value.color))}>
                      <Icon className={cn("h-6 w-6", getTextColorClass(value.color))} />
                    </div>
                    <CardTitle className="mt-3">{value.title}</CardTitle>
                    <CardDescription>{value.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Team Section */}
      <section className="border-t border-border bg-muted/30 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <Badge className="mb-4">Tim Kami</Badge>
            <h2 className="font-cormorant text-2xl font-bold sm:text-3xl">
              Orang di Balik Eleganzas
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
              Tim profesional yang berdedikasi untuk memberikan yang terbaik bagi klien kami
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center">
                  <CardHeader>
                    <div className={cn(
                      "mx-auto flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold text-white",
                      getColorClass(member.color)
                    )}>
                      {member.name.charAt(0)}
                    </div>
                    <CardTitle className="mt-3">{member.name}</CardTitle>
                    <div className="text-sm font-medium text-accent">{member.role}</div>
                    <CardDescription className="text-xs">
                      {member.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-12 text-center md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl"
        >
          <Rocket className="mx-auto mb-4 h-12 w-12 text-accent" />
          <h2 className="mb-4 font-cormorant text-2xl font-bold sm:text-3xl">
            Siap Memulai Project Anda?
          </h2>
          <p className="mb-6 text-muted-foreground">
            Konsultasikan kebutuhan Anda dengan tim kami secara gratis
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/contact">
                Hubungi Kami
                <MessageCircle className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/templates">
                Lihat Template
                <Eye className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}