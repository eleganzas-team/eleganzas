"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function CTASection() {
  return (
    <section className="container mx-auto px-4">
      <motion.div
        variants={fadeInUp}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-accent p-12 text-center text-primary-foreground"
      >
        <div className="absolute inset-0 bg-black/10" />
        
        <div className="relative z-10">
          <h2 className="font-cormorant text-4xl font-bold md:text-5xl">
            Siap Membuat Undangan Impian Anda?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90">
            Mulai sekarang dan dapatkan diskon 20% untuk pembelian pertama Anda
          </p>
          
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register">
                Mulai Gratis
                <Sparkles className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Gratis selamanya</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Tidak perlu kartu kredit</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Support 24/7</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}