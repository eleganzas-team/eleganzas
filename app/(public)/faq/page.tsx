"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  HelpCircle, Search, ChevronDown, ShoppingBag, 
  CreditCard, Server, Shield, Code, Users, Mail,
  Clock, Database, Globe, Smartphone, MessageCircle,
  FileText, Heart, School, Briefcase, Rocket,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const faqCategories = [
  { id: "all", label: "Semua", icon: HelpCircle, count: 24 },
  { id: "purchase", label: "Pembelian", icon: ShoppingBag, count: 6 },
  { id: "payment", label: "Pembayaran", icon: CreditCard, count: 4 },
  { id: "technical", label: "Teknis", icon: Server, count: 5 },
  { id: "hosting", label: "Hosting & Domain", icon: Globe, count: 4 },
  { id: "support", label: "Dukungan", icon: Users, count: 5 }
];

const faqs = [
  // Pembelian
  {
    category: "purchase",
    question: "Apa yang saya dapatkan saat membeli template?",
    answer: "Anda mendapatkan source code template lengkap, setup & instalasi oleh tim kami, dokumentasi penggunaan, free update sesuai paket, dan support teknis sesuai paket yang dipilih."
  },
  {
    category: "purchase",
    question: "Apakah template bisa digunakan untuk banyak website?",
    answer: "Setiap pembelian lisensi untuk 1 website/domain. Jika ingin digunakan untuk website lain, Anda perlu membeli lisensi tambahan."
  },
  {
    category: "purchase",
    question: "Apakah ada demo template sebelum beli?",
    answer: "Ya, setiap template memiliki halaman demo yang bisa Anda lihat sebelum memutuskan untuk membeli."
  },
  {
    category: "purchase",
    question: "Berapa lama proses setup setelah beli?",
    answer: "Proses setup memakan waktu 1-3 hari kerja setelah pembayaran dikonfirmasi, tergantung kompleksitas template."
  },
  {
    category: "purchase",
    question: "Apakah bisa request template custom?",
    answer: "Tentu bisa. Silahkan menggunakan jasa custom development kami untuk membuat website sesuai spesifikasi Anda."
  },
  {
    category: "purchase",
    question: "Apakah ada garansi setelah pembelian?",
    answer: "Kami memberikan garansi 30 hari untuk bug dan error yang disebabkan oleh kode template."
  },

  // Pembayaran
  {
    category: "payment",
    question: "Metode pembayaran apa saja yang diterima?",
    answer: "Kami menerima transfer bank (BCA, Mandiri, BRI, BNI), kartu kredit (Visa, Mastercard), dan e-wallet (OVO, GoPay, Dana)."
  },
  {
    category: "payment",
    question: "Apakah bisa cicilan?",
    answer: "Untuk template, kami hanya menerima pembayaran penuh. Untuk custom development, bisa diatur pembayaran bertahap."
  },
  {
    category: "payment",
    question: "Apakah ada biaya tersembunyi?",
    answer: "Tidak ada biaya tersembunyi. Harga yang tertera adalah harga final. Biaya hosting dan domain terpisah jika menggunakan jasa kami."
  },
  {
    category: "payment",
    question: "Bagaimana jika pembayaran gagal?",
    answer: "Silahkan hubungi tim support kami untuk dibantu proses pembayaran atau menggunakan metode pembayaran lain."
  },

  // Teknis
  {
    category: "technical",
    question: "Teknologi apa yang digunakan untuk template?",
    answer: "Template kami menggunakan teknologi modern: Next.js, React, Tailwind CSS, TypeScript, dan database MySQL/PostgreSQL."
  },
  {
    category: "technical",
    question: "Apakah source code bisa di-custom?",
    answer: "Ya, Anda bebas meng-custom source code sesuai kebutuhan karena Anda memiliki source code lengkap."
  },
  {
    category: "technical",
    question: "Apakah support mobile responsive?",
    answer: "Ya, semua template kami fully responsive dan mobile-friendly."
  },
  {
    category: "technical",
    question: "Butuh keahlian coding untuk mengelola?",
    answer: "Tidak perlu. Kami menyediakan dokumentasi dan admin panel yang mudah digunakan. Tapi jika ingin custom, pengetahuan coding akan membantu."
  },
  {
    category: "technical",
    question: "Apakah bisa integrasi dengan API lain?",
    answer: "Bisa. Template kami mendukung integrasi API untuk berbagai kebutuhan seperti payment gateway, CRM, dll."
  },

  // Hosting & Domain
  {
    category: "hosting",
    question: "Apakah hosting sudah termasuk?",
    answer: "Tidak. Harga template tidak termasuk hosting. Anda bisa menggunakan hosting sendiri atau menggunakan jasa hosting dari kami."
  },
  {
    category: "hosting",
    question: "Hosting apa yang direkomendasikan?",
    answer: "Kami merekomendasikan hosting dengan support Node.js dan database MySQL. Kami bisa bantu setup ke hosting pilihan Anda."
  },
  {
    category: "hosting",
    question: "Berapa biaya hosting dari Eleganzas?",
    answer: "Biaya hosting management mulai Rp 150.000 per bulan. Termasuk monitoring, backup, dan maintenance ringan."
  },
  {
    category: "hosting",
    question: "Apakah bisa pindah hosting?",
    answer: "Bisa. Anda bebas memindahkan website ke hosting manapun karena Anda memiliki source code lengkap."
  },

  // Dukungan
  {
    category: "support",
    question: "Bagaimana cara mendapatkan support?",
    answer: "Support bisa melalui email, WhatsApp, atau form kontak di website. Response time 1x24 jam di hari kerja."
  },
  {
    category: "support",
    question: "Apakah ada support di luar jam kerja?",
    answer: "Support reguler jam kerja. Untuk support emergency, tersedia paket premium dengan response lebih cepat."
  },
  {
    category: "support",
    question: "Berapa lama masa support?",
    answer: "Masa support tergantung paket yang dipilih, mulai dari 1 bulan hingga 1 tahun."
  },
  {
    category: "support",
    question: "Apakah support termasuk penambahan fitur?",
    answer: "Support mencakup bantuan teknis dan troubleshooting. Penambahan fitur dikenakan biaya terpisah."
  },
  {
    category: "support",
    question: "Bagaimana jika ada bug setelah masa support?",
    answer: "Untuk bug yang disebabkan kode template, kami tetap bantu perbaiki dengan biaya minimal atau gratis tergantung kompleksitas."
  }
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch = searchQuery === "" || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Group FAQs by category for display
  const categories = [
    { id: "purchase", label: "Pembelian", icon: ShoppingBag },
    { id: "payment", label: "Pembayaran", icon: CreditCard },
    { id: "technical", label: "Teknis", icon: Server },
    { id: "hosting", label: "Hosting & Domain", icon: Globe },
    { id: "support", label: "Dukungan", icon: Users }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge className="mb-4 bg-accent/10 text-accent-foreground">
              <HelpCircle className="mr-1 h-3 w-3" />
              FAQ
            </Badge>
            <h1 className="mb-4 font-cormorant text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Pertanyaan yang Sering Diajukan
            </h1>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
              Temukan jawaban untuk pertanyaan umum tentang template, pembayaran, hosting, dan dukungan.
            </p>
          </motion.div>

          {/* Search Bar */}
          <div className="mx-auto mt-8 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari pertanyaan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="sticky top-16 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="overflow-x-auto py-3">
            <div className="flex gap-2 min-w-max">
              {faqCategories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;
                return (
                  <Button
                    key={category.id}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveCategory(category.id)}
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {category.label}
                    <Badge variant="secondary" className="ml-1 text-[10px]">
                      {category.count}
                    </Badge>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          {filteredFaqs.length === 0 ? (
            <div className="py-12 text-center">
              <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">Tidak ada pertanyaan ditemukan</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Coba dengan kata kunci lain atau hubungi support kami
              </p>
              <Button asChild className="mt-4">
                <Link href="/contact">
                  Hubungi Support
                  <MessageCircle className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq, idx) => (
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
          )}

          {/* Still Have Questions */}
          <div className="mt-12 rounded-lg border border-border bg-muted/30 p-6 text-center">
            <h3 className="mb-2 font-semibold">Masih punya pertanyaan?</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Tim support kami siap membantu Anda
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild variant="outline" size="sm">
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Kami
                </Link>
              </Button>
              <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
                <Link href="https://wa.me/6283851787713">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: FileText, title: "Dokumentasi", href: "/docs", description: "Panduan lengkap penggunaan" },
              { icon: Rocket, title: "Mulai Cepat", href: "/getting-started", description: "Langkah cepat setup" },
              { icon: MessageCircle, title: "Support", href: "/contact", description: "Hubungi tim kami" },
              { icon: BookOpen, title: "Blog", href: "/blog", description: "Tips dan tutorial" }
            ].map((link, idx) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.title}
                  href={link.href}
                  className="group rounded-lg border border-border bg-background p-4 transition-all hover:shadow-md"
                >
                  <Icon className="mb-2 h-5 w-5 text-accent" />
                  <h4 className="font-semibold group-hover:text-accent">{link.title}</h4>
                  <p className="text-xs text-muted-foreground">{link.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}