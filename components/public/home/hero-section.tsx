"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Star, ArrowRight, Palette, Monitor, CheckCircle2 } from "lucide-react";

// Minimalist animations
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

interface HeroSectionProps {
  stats: {
    totalTemplates: number;
    totalOrders: number;
    rating: number;
  };
}

export function HeroSection({ stats }: HeroSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const displayStats = [
    { value: `${stats.totalOrders}+`, label: "Klien Puas" },
    { value: `${stats.totalTemplates}+`, label: "Template Premium" },
    { value: stats.rating.toFixed(1), label: "Rating" },
  ];

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-background py-10 md:py-10">
      {/* Simple Background - Just one subtle gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge - Simple */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="inline-flex items-center rounded-full border border-accent/20 bg-accent/5 px-3 py-1 mb-6"
          >
            <Sparkles className="mr-1.5 h-3 w-3 text-accent" />
            <span className="text-xs font-medium text-accent">Premium Platform</span>
          </motion.div>

          {/* Headline - Clean */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="space-y-4"
          >
            <motion.h1 
              variants={fadeInUp}
              className="font-cormorant text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Wujudkan Momen Spesial dengan
              <span className="block text-accent mt-2">
                Desain Elegan & Personal
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Undangan digital, portofolio kreatif, hingga website custom — 
              mudah disesuaikan, tampil premium, dan siap dalam hitungan menit.
            </motion.p>
          </motion.div>

          {/* CTA Buttons - Simple */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Button asChild className="shadow-sm">
              <Link href="/templates">
                <Sparkles className="mr-2 h-4 w-4" />
                Jelajahi Template
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/pricing">
                Lihat Harga
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Stats - Clean & Simple */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="mt-12 flex flex-wrap items-center justify-center gap-8 border-t border-border/50 pt-8"
          >
            {/* {displayStats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="font-cormorant text-2xl font-bold text-foreground sm:text-3xl">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
              </div>
            ))}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
              ))}
              <span className="ml-1 text-sm font-medium text-foreground">{stats.rating}</span>
            </div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}