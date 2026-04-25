"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Shield, FileText, CheckCircle, AlertCircle,
  Clock, CreditCard, Database, Globe, UserCheck,
  Mail, Lock, Server, RefreshCw, Scale, BookOpen
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const sections = [
  {
    icon: FileText,
    title: "1. Penggunaan Layanan",
    content: `Dengan menggunakan layanan Eleganzas, Anda menyetujui untuk mematuhi semua ketentuan yang tercantum dalam dokumen ini. Layanan kami meliputi penjualan template website, jasa instalasi, layanan hosting (opsional), dan jasa pengembangan custom.`
  },
  {
    icon: CreditCard,
    title: "2. Pembayaran",
    content: `Harga template bersifat one-time purchase. Pembayaran dilakukan di awal sebelum template diserahkan. Metode pembayaran yang diterima: transfer bank (BCA, Mandiri, BRI, BNI), kartu kredit, dan e-wallet (OVO, GoPay, Dana).`
  },
  {
    icon: Clock,
    title: "3. Pengiriman & Setup",
    content: `Setelah pembayaran dikonfirmasi, tim kami akan melakukan setup dalam waktu 1-3 hari kerja. Anda akan menerima akses ke source code template yang telah diinstal di server pilihan Anda.`
  },
  {
    icon: Shield,
    title: "4. Garansi",
    content: `Kami memberikan garansi 30 hari untuk bug dan error yang disebabkan oleh kode template. Garansi tidak mencakup masalah yang timbul dari modifikasi kode oleh pengguna atau masalah dari pihak hosting.`
  },
  {
    icon: RefreshCw,
    title: "5. Refund & Pembatalan",
    content: `Karena produk digital, template tidak dapat direfund setelah source code diserahkan. Namun, jika terjadi masalah teknis yang tidak dapat kami selesaikan dalam 14 hari, refund akan dipertimbangkan.`
  },
  {
    icon: Database,
    title: "6. Hak Kekayaan Intelektual",
    content: `Setelah pembelian, Anda memiliki hak untuk menggunakan template untuk website Anda sendiri. Source code adalah milik Eleganzas. Anda tidak diperbolehkan menjual kembali, mendistribusikan, atau mengklaim template sebagai karya Anda sendiri.`
  },
  {
    icon: Server,
    title: "7. Hosting & Domain",
    content: `Biaya hosting dan domain tidak termasuk dalam harga template. Klien bebas menggunakan hosting sendiri atau menggunakan layanan hosting dari kami dengan biaya terpisah.`
  },
  {
    icon: Mail,
    title: "8. Dukungan",
    content: `Dukungan teknis diberikan sesuai dengan paket yang dipilih. Dukungan meliputi bantuan instalasi, troubleshooting, dan konsultasi penggunaan.`
  },
  {
    icon: Lock,
    title: "9. Perubahan Layanan",
    content: `Eleganzas berhak untuk mengubah, menangguhkan, atau menghentikan layanan dengan pemberitahuan sebelumnya. Perubahan harga akan diinformasikan melalui email.`
  },
  {
    icon: UserCheck,
    title: "10. Tanggung Jawab Pengguna",
    content: `Pengguna bertanggung jawab untuk menjaga keamanan akses ke website dan melakukan backup data secara rutin. Eleganzas tidak bertanggung jawab atas kehilangan data akibat kelalaian pengguna.`
  },
  {
    icon: Scale,
    title: "11. Hukum yang Berlaku",
    content: `Ketentuan ini diatur oleh hukum Republik Indonesia. Setiap sengketa akan diselesaikan melalui jalur musyawarah atau pengadilan di Jakarta Selatan.`
  },
  {
    icon: BookOpen,
    title: "12. Perubahan Ketentuan",
    content: `Eleganzas berhak untuk mengubah ketentuan ini sewaktu-waktu. Perubahan akan diumumkan melalui website dan email. Penggunaan layanan setelah perubahan dianggap sebagai persetujuan.`
  }
];

const lastUpdated = "1 Januari 2024";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge className="mb-4 bg-accent/10 text-accent-foreground">
              <Shield className="mr-1 h-3 w-3" />
              Legal
            </Badge>
            <h1 className="mb-4 font-cormorant text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Syarat & Ketentuan
            </h1>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Terakhir diperbarui: {lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-2 rounded-lg border border-border p-4">
              <p className="mb-3 text-sm font-semibold">Daftar Isi</p>
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <a
                    key={section.title}
                    href={`#${section.title.replace(/\s+/g, "-").toLowerCase()}`}
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground"
                  >
                    <Icon className="h-3 w-3" />
                    {section.title}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-accent" />
                  Informasi Penting
                </CardTitle>
                <CardDescription>
                  Harap baca Syarat & Ketentuan ini dengan seksama sebelum menggunakan layanan Eleganzas.
                  Dengan mengakses atau menggunakan layanan kami, Anda menyetujui untuk terikat dengan ketentuan ini.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <div
                      key={section.title}
                      id={section.title.replace(/\s+/g, "-").toLowerCase()}
                      className="scroll-mt-24"
                    >
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-accent/10 p-2">
                          <Icon className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{section.title}</h3>
                          <div className="mt-2 text-sm text-muted-foreground whitespace-pre-line">
                            {section.content}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Contact for Questions */}
            <div className="mt-8 rounded-lg border border-border bg-muted/30 p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Jika Anda memiliki pertanyaan tentang Syarat & Ketentuan ini, silakan hubungi kami di{' '}
                <Link href="/contact" className="text-accent hover:underline">
                  halaman kontak
                </Link>
                {' '}atau email ke{' '}
                <a href="mailto:legal@eleganzas.com" className="text-accent hover:underline">
                  legal@eleganzas.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}