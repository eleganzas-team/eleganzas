"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Lock, Eye, Database, Cookie, Mail, Shield,
  UserCheck, Server, Clock, AlertCircle, Key,
  Globe, Smartphone, FileText, CheckCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const sections = [
  {
    icon: Database,
    title: "1. Informasi yang Kami Kumpulkan",
    content: `Kami mengumpulkan informasi yang Anda berikan secara langsung saat menggunakan layanan kami, termasuk:
    • Informasi pribadi (nama, email, nomor telepon, alamat)
    • Informasi pembayaran (melalui payment gateway terpercaya)
    • Informasi teknis (IP address, browser, perangkat)
    • Data penggunaan website`
  },
  {
    icon: Lock,
    title: "2. Cara Kami Menggunakan Informasi",
    content: `Informasi yang kami kumpulkan digunakan untuk:
    • Memproses pesanan dan pembayaran
    • Memberikan dukungan teknis
    • Mengirimkan update dan informasi penting
    • Meningkatkan layanan kami
    • Mematuhi kewajiban hukum`
  },
  {
    icon: UserCheck,
    title: "3. Pengungkapan Informasi",
    content: `Kami tidak menjual, memperdagangkan, atau mentransfer informasi pribadi Anda ke pihak luar tanpa persetujuan, kecuali:
    • Untuk mematuhi hukum dan peraturan
    • Untuk melindungi hak dan keamanan Eleganzas
    • Dengan penyedia layanan terpercaya yang membantu operasional kami`
  },
  {
    icon: Shield,
    title: "4. Keamanan Data",
    content: `Kami mengambil langkah-langkah keamanan yang wajar untuk melindungi informasi Anda, termasuk:
    • Enkripsi SSL untuk transmisi data
    • Firewall dan sistem keamanan server
    • Akses terbatas ke data pengguna
    • Backup data secara rutin`
  },
  {
    icon: Cookie,
    title: "5. Cookie",
    content: `Kami menggunakan cookie untuk meningkatkan pengalaman Anda di website kami. Cookie membantu kami memahami perilaku pengguna, menyimpan preferensi, dan mengingat sesi login. Anda dapat mengatur browser untuk menolak cookie.`
  },
  {
    icon: Globe,
    title: "6. Tautan ke Pihak Ketiga",
    content: `Website kami mungkin berisi tautan ke situs pihak ketiga. Kami tidak bertanggung jawab atas praktik privasi atau konten situs tersebut.`
  },
  {
    icon: Clock,
    title: "7. Penyimpanan Data",
    content: `Data Anda akan disimpan selama akun Anda aktif atau selama diperlukan untuk memberikan layanan. Anda dapat meminta penghapusan data dengan menghubungi tim support kami.`
  },
  {
    icon: Key,
    title: "8. Hak Anda",
    content: `Anda memiliki hak untuk:
    • Mengakses data pribadi Anda
    • Memperbaiki data yang tidak akurat
    • Meminta penghapusan data
    • Menolak pemrosesan data
    • Mencabut persetujuan kapan saja`
  }
];

const lastUpdated = "1 Januari 2024";

export default function PrivacyPage() {
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
              <Lock className="mr-1 h-3 w-3" />
              Privasi
            </Badge>
            <h1 className="mb-4 font-cormorant text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Kebijakan Privasi
            </h1>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Terakhir diperbarui: {lastUpdated}
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground">
              Di Eleganzas, privasi Anda adalah prioritas kami. Kebijakan ini menjelaskan bagaimana 
              kami mengumpulkan, menggunakan, dan melindungi informasi Anda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-accent" />
                Komitmen Privasi Kami
              </CardTitle>
              <CardDescription>
                Kami berkomitmen untuk melindungi data pribadi Anda dan hanya menggunakannya untuk meningkatkan layanan kami.
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
              Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami di{' '}
              <Link href="/contact" className="text-accent hover:underline">
                halaman kontak
              </Link>
              {' '}atau email ke{' '}
              <a href="mailto:privacy@eleganzas.com" className="text-accent hover:underline">
                privacy@eleganzas.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}