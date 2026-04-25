"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, Shield, Users, Palette, Clock } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const features = [
  {
    icon: Sparkles,
    title: "Desain Elegan",
    description: "Ratusan template premium yang dapat disesuaikan dengan tema pernikahan Anda",
    color: "from-amber-500 to-yellow-500",
  },
  {
    icon: Zap,
    title: "Setup Cepat",
    description: "Buat undangan dalam hitungan menit tanpa perlu keahlian teknis",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Shield,
    title: "Aman & Terpercaya",
    description: "Data dan privasi Anda terlindungi dengan enkripsi tingkat tinggi",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Users,
    title: "RSVP Digital",
    description: "Kelola tamu dan konfirmasi kehadiran dengan mudah",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Palette,
    title: "Kustomisasi Penuh",
    description: "Ubah warna, font, dan layout sesuai selera Anda",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Clock,
    title: "Aktif Selamanya",
    description: "Undangan Anda akan selalu online tanpa biaya tambahan",
    color: "from-teal-500 to-green-500",
  },
];

export function FeaturesSection() {
  return (
    <section className="container mx-auto px-4">
      <motion.div variants={fadeInUp} className="mb-12 text-center">
        <h2 className="font-cormorant text-4xl font-bold text-foreground md:text-5xl">
          Kenapa Memilih eleganzas?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Fitur lengkap untuk membuat undangan digital yang sempurna
        </p>
      </motion.div>

      <motion.div variants={staggerContainer} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            whileHover={{ y: -4 }}
            className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent/50 hover:shadow-lg"
          >
            <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} bg-opacity-10`}>
              <feature.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="mb-2 font-cormorant text-xl font-semibold text-foreground">
              {feature.title}
            </h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}