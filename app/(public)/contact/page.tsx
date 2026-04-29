"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Mail, Phone, MapPin, Clock, Send, CheckCircle,
  MessageCircle, Sparkles, ArrowRight, User, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { FacebookIcon, GithubIcon, InstagramIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from "@/components/SocialIcons";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    info: "support@eleganzas.com",
    info2: "sales@eleganzas.com",
    action: "mailto:support@eleganzas.com",
    color: "rose"
  },
  {
    icon: Phone,
    title: "Telepon",
    info: "+62 812 3456 7890",
    info2: "+62 812 3456 7891",
    action: "tel:+6283851787713",
    color: "blue"
  },
  {
    icon: MapPin,
    title: "Alamat",
    info: "Jl. Teknologi No. 123",
    info2: "Jakarta Selatan, Indonesia",
    action: "https://maps.google.com",
    color: "emerald"
  },
  {
    icon: Clock,
    title: "Jam Operasional",
    info: "Senin - Jumat: 09:00 - 18:00",
    info2: "Sabtu: 09:00 - 14:00",
    color: "purple"
  }
];

const socialLinks = [
  { icon: InstagramIcon, name: "Instagram", href: "#", color: "rose" },
  { icon: FacebookIcon, name: "Facebook", href: "#", color: "blue" },
  { icon: TwitterIcon, name: "Twitter", href: "#", color: "blue" },
  { icon: LinkedinIcon, name: "LinkedIn", href: "#", color: "blue" },
  { icon: GithubIcon, name: "GitHub", href: "#", color: "purple" },
  { icon: YoutubeIcon, name: "YouTube", href: "#", color: "rose" }
];

const faqs = [
  {
    question: "Berapa lama respons dari tim support?",
    answer: "Tim support kami akan merespon dalam waktu maksimal 1x24 jam di hari kerja."
  },
  {
    question: "Apakah ada konsultasi gratis?",
    answer: "Ya, kami menyediakan konsultasi gratis untuk membantu Anda memilih template yang tepat."
  },
  {
    question: "Bagaimana cara order template?",
    answer: "Anda bisa langsung order melalui website, atau menghubungi tim sales kami."
  },
  {
    question: "Apakah bisa request fitur custom?",
    answer: "Tentu bisa. Silahkan diskusikan kebutuhan custom Anda dengan tim kami."
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getColorClass = (color: string) => {
    const colors = {
      rose: "bg-rose-500 text-white border-rose-500",
      blue: "bg-blue-500 text-white border-blue-500",
      emerald: "bg-emerald-500 text-white border-emerald-500",
      purple: "bg-purple-500 text-white border-purple-500"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getBgColorClass = (color: string) => {
    const colors = {
      rose: "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800",
      blue: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800",
      emerald: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800",
      purple: "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800"
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
              <MessageCircle className="mr-1 h-3 w-3" />
              Hubungi Kami
            </Badge>
            <h1 className="mb-4 font-cormorant text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Kami Siap
              <br />
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Membantu Anda
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
              Punya pertanyaan atau butuh bantuan? Tim kami siap membantu Anda.
              Isi form atau hubungi kami langsung.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="container mx-auto px-4 -mt-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((info, idx) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className={cn("h-full transition-all hover:shadow-lg", getBgColorClass(info.color))}>
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-2 rounded-full p-2 w-fit bg-background">
                      <Icon className={cn("h-5 w-5", getColorClass(info.color).split(" ")[0])} />
                    </div>
                    <CardTitle className="text-base">{info.title}</CardTitle>
                    <CardDescription className="text-xs">
                      {info.info}
                      <br />
                      {info.info2}
                    </CardDescription>
                  </CardHeader>
                  {info.action && (
                    <CardContent className="pt-0 text-center">
                      <Button variant="link" size="sm" asChild className="text-xs">
                        <Link href={info.action}>
                          Hubungi
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4">Kirim Pesan</Badge>
            <h2 className="mb-6 font-cormorant text-2xl font-bold sm:text-3xl">
              Kirim Pesan ke Kami
            </h2>
            
            {isSubmitted ? (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-center dark:bg-emerald-950/20">
                <CheckCircle className="mx-auto mb-3 h-12 w-12 text-emerald-500" />
                <h3 className="mb-2 text-lg font-semibold">Pesan Terkirim!</h3>
                <p className="text-sm text-muted-foreground">
                  Terima kasih telah menghubungi kami. Tim kami akan segera merespon pesan Anda.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Nama Anda"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="email@anda.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject">Subjek</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Subjek pesan"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Pesan</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tulis pesan Anda di sini..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <>Mengirim...</>
                  ) : (
                    <>
                      Kirim Pesan
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Map & Social */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Map */}
            <div>
              <Badge className="mb-4">Lokasi Kami</Badge>
              <div className="overflow-hidden rounded-lg border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.828561!3d-6.208747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f391c6cc8f83%3A0x5c6b7e2e5a5a5a5a!2sJakarta!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                />
              </div>
            </div>

            {/* Social Media */}
            <div>
              <Badge className="mb-4">Media Sosial</Badge>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Button
                      key={social.name}
                      variant="outline"
                      size="icon"
                      asChild
                      className={cn("h-10 w-10 rounded-full transition-all hover:scale-105")}
                    >
                      <Link href={social.href} target="_blank" rel="noopener noreferrer">
                        <Icon className="h-4 w-4" />
                        <span className="sr-only">{social.name}</span>
                      </Link>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Quick FAQ */}
            <div>
              <Badge className="mb-4">Pertanyaan Umum</Badge>
              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="rounded-lg border border-border p-3">
                    <p className="text-sm font-medium">{faq.question}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-center">
                <Button variant="link" size="sm" asChild>
                  <Link href="/faq">
                    Lihat semua FAQ
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
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
              Butuh Bantuan Langsung?
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
              Hubungi kami langsung melalui WhatsApp untuk respons lebih cepat
            </p>
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="https://wa.me/6283851787713">
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat WhatsApp
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}