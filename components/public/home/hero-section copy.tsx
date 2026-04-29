"use client";

import { motion, TargetAndTransition, useAnimation, useInView, Variants } from "framer-motion"; // ← Import Variants
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Star, ArrowRight, Palette, Monitor, Image as ImageIcon, CheckCircle2 } from "lucide-react";

// ✅ Definisikan variants dengan tipe Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

// ✅ Untuk animation props (bukan variants), gunakan TargetAndTransition
const float: TargetAndTransition = {
  y: [0, -12, 0],
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
};

interface HeroSectionProps {
  stats: {
    totalTemplates: number;
    totalOrders: number;
    rating: number;
  };
}

export function HeroSection({ stats }: HeroSectionProps) {
  const [activeService, setActiveService] = useState<"invitations" | "portfolio" | "websites">("invitations");
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null); // ✅ Tambahkan tipe HTMLDivElement
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start("show");
    }
  }, [controls, isInView]);

  const services = [
    {
      id: "invitations" as const,
      label: "Undangan Digital",
      icon: Sparkles,
      description: "Template premium untuk pernikahan, ulang tahun & acara spesial",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop",
      gradient: "from-amber-500/20 to-yellow-500/10",
    },
    {
      id: "portfolio" as const,
      icon: Palette,
      label: "Portofolio Kreatif",
      description: "Tampilkan karya Anda dengan website portofolio yang memukau",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop",
      gradient: "from-rose-500/20 to-pink-500/10",
    },
    {
      id: "websites" as const,
      icon: Monitor,
      label: "Website Custom",
      description: "Website sekolah, bisnis, atau organisasi dengan desain eksklusif",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      gradient: "from-emerald-500/20 to-teal-500/10",
    },
  ];

  const currentService = services.find((s) => s.id === activeService)!;

  const displayStats = [
    { value: `${stats.totalOrders}+`, label: "Klien Puas", icon: CheckCircle2 },
    { value: `${stats.totalTemplates}+`, label: "Template Premium", icon: Sparkles },
    { value: stats.rating.toFixed(1), label: "Rating ⭐", icon: Star },
  ];

  return (
    <section className="relative overflow-hidden bg-background" ref={ref}>
      {/* Animated Background Elements */}
      {/* <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-accent/15 to-primary/10 blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-primary/10 to-accent/15 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div> */}

      <div className="container mx-auto px-4 py-10 relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <motion.div variants={staggerContainer} initial="hidden" animate={controls} className="space-y-8">
            {/* Badge */}
            <motion.div variants={fadeInUp} className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-4 py-2 backdrop-blur-sm">
              <Sparkles className="mr-2 h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">
                ✨ Platform Premium #1 Indonesia
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <h1 className="font-cormorant text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl xl:text-7xl">
                Wujudkan Momen Spesial dengan
                <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  Desain Elegan & Personal
                </span>
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl max-w-xl">
                Undangan digital, portofolio kreatif, hingga website custom — 
                semua dibuat dengan sentuhan premium, mudah disesuaikan, dan siap dalam hitungan menit.
              </p>
            </motion.div>

            {/* Service Pills */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
              {services.map((service) => {
                const Icon = service.icon;
                const isActive = activeService === service.id;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveService(service.id)}
                    className={`group relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-accent text-primary-foreground shadow-lg shadow-accent/25"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border"
                    }`}
                  >
                    <Icon className={`h-4 w-4 transition-transform group-hover:scale-110 ${isActive ? "animate-pulse" : ""}`} />
                    {service.label}
                    {isActive && (
                      <motion.span
                        layoutId="active-pill"
                        className="absolute inset-0 rounded-full bg-accent"
                        style={{ zIndex: -1 }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="group relative overflow-hidden">
                <Link href="/templates">
                  <span className="relative z-10 flex items-center">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Jelajahi Template
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-accent to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="group">
                <Link href="/pricing">
                  Lihat Harga
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex -space-x-2.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    className="h-11 w-11 rounded-full border-2 border-background bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center text-xs font-medium text-primary-foreground"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    {String.fromCharCode(64 + i)}
                  </motion.div>
                ))}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-accent text-accent" />
                  ))}
                  <span className="ml-1 font-semibold text-foreground">{stats.rating}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Dipercaya oleh <span className="font-medium text-foreground">{stats.totalOrders}+</span> klien di seluruh Indonesia
                </p>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
              {displayStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Icon className="h-4 w-4 text-accent" />
                      <p className="font-cormorant text-xl md:text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Content - Preview Card */}
          <motion.div 
            variants={fadeInUp} 
            initial="hidden" 
            animate={controls}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md">
              {/* Main Preview Card */}
              <motion.div
                className="relative rounded-3xl bg-gradient-to-br from-primary/10 via-background to-accent/10 p-1.5 shadow-2xl shadow-primary/10"
                animate={float} // ✅ Menggunakan TargetAndTransition untuk animate prop
              >
                <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${currentService.gradient}`}>
                  {/* Service Description Overlay */}
                  <div className="absolute inset-x-0 top-0 z-10 p-4 bg-gradient-to-b from-background/80 to-transparent">
                    <div className="flex items-center gap-2">
                      <currentService.icon className="h-4 w-4 text-accent" />
                      <span className="text-sm font-medium text-foreground">{currentService.label}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{currentService.description}</p>
                  </div>
                  
                  <img
                    src={currentService.image}
                    alt={`${currentService.label} Preview`}
                    className="w-full aspect-[4/3] object-cover transition-opacity duration-500"
                  />
                  
                  {/* Floating Badge */}
                  <motion.div
                    className="absolute bottom-4 right-4 rounded-xl bg-background/90 backdrop-blur-sm px-3 py-2 shadow-lg border border-border"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                      <span className="text-xs font-medium text-foreground">Live Preview</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 h-16 w-16 rounded-2xl bg-accent/20 backdrop-blur-sm border border-accent/30 flex items-center justify-center"
                animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="h-7 w-7 text-accent" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-3 -left-3 h-14 w-14 rounded-xl bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center"
                animate={{ y: [0, 8, 0], rotate: [0, -3, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <Star className="h-6 w-6 text-primary" />
              </motion.div>

              {/* Decorative Blur Orbs */}
              <div className="absolute -z-10 -bottom-8 -right-8 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />
              <div className="absolute -z-10 -top-8 -left-8 h-28 w-28 rounded-full bg-primary/20 blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-muted-foreground"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-xs">Scroll untuk jelajahi</span>
        <motion.div
          className="h-6 w-px bg-gradient-to-b from-accent to-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}