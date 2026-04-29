"use client"
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  MapPin,
  Navigation,
  Shirt,
  ImageIcon,
  Heart,
  ScrollText,
} from "lucide-react";

import { Editable } from "@/components/undangan/editor/Editable";
import { FormRenderer } from "@/components/undangan/editor/FormRenderer";

import "./islami-lux-theme.css";
import { EditorProvider } from "@/components/undangan/lib/hooks/useEditor";
import { defaultDataIslamiLux } from "@/components/undangan/lib/config/defaultData";
import { mockUserDataIslamiLux } from "@/components/undangan/lib/config/mockUserDataIslamiLux";
import { islamiLuxMapping } from "./mapping";
import type { EditorMode } from "@/components/undangan/lib/engine/generator";

import { BismillahDecorative, CornerFrame, CrescentStar, FloatingOrnaments, FloralArabesque, GeometricBorder, OrnamentDivider, RotatingMandala } from "./components/islami-lux/AnimatedDecorations";
import { DecorativeImage } from "./components/islami-lux/DecorativeImage";
import { CountdownTimer } from "./components/islami-lux/CountdownTimer";
import { RSVPForm } from "./components/islami-lux/RSVPForm";

const fade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

function Section({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.section
      variants={slideUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export function IslamicLuxuryInvitationPage({ 
  mode = "editor",
  userConfig,
  onUserDataChange,
  userTemplateId,
}: { 
  mode?: EditorMode;
  userConfig?: Record<string, unknown>;
  onUserDataChange?: (userData: Record<string, unknown>) => void;
  userTemplateId?: string;
}) {
  return (
    <EditorProvider
      defaultData={defaultDataIslamiLux}
      initialUserData={userConfig || mockUserDataIslamiLux}
      mapping={islamiLuxMapping}
      mode={mode}
      userTemplateId={userTemplateId}
      onChange={onUserDataChange}
    >


      <main className="theme-islami-lux relative min-h-screen overflow-hidden bg-background font-serif text-foreground">
        <FloatingOrnaments />

        {/* ===== HERO ===== */}
        <section className="relative flex min-h-screen items-center justify-center px-5 py-20">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 20%, oklch(0.7 0.15 85 / 20%) 0%, transparent 40%), radial-gradient(circle at 70% 80%, oklch(0.6 0.1 90 / 15%) 0%, transparent 40%)",
            }}
          />

          <CornerFrame className="left-6 top-6" />
          <CornerFrame className="bottom-6 right-6 rotate-180" />

          <motion.div
            variants={fade}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute inset-x-10 top-12 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          />

          <motion.div
            variants={slideUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mx-auto flex w-full max-w-4xl flex-col items-center text-center"
          >
            <BismillahDecorative className="mb-8" />

            {/* Decorative hero image */}
            <div className="mb-6">
              <DecorativeImage
                field="decorative.heroImage"
                alt="Hero"
                size="xl"
                shape="circle"
                className="mx-auto ring-4 ring-primary/20 ring-offset-4 ring-offset-background"
              />
            </div>

            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Undangan Pernikahan
            </p>
            <h1 className="max-w-4xl text-5xl leading-tight text-foreground sm:text-7xl md:text-8xl">
              <Editable as="span" field="groom.nickname" className="text-gold-gradient" />
              <span className="mx-3 text-primary">&</span>
              <Editable as="span" field="bride.nickname" className="text-gold-gradient" />
            </h1>

            <GeometricBorder className="my-6 max-w-md" />

            <motion.div
              variants={fade}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1, delay: 0.35, ease: "easeOut" }}
              className="mt-4"
            >
              <Editable as="p" field="event.date" className="text-lg font-medium text-foreground sm:text-xl" />
              <Editable
                as="p"
                field="event.dateHijri"
                className="mt-1 text-sm text-muted-foreground"
              />
            </motion.div>

            <motion.div
              variants={slideUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              <Editable as="p" field="opening.salam" />
            </motion.div>
          </motion.div>
        </section>

        {/* ===== SALAM & AYAT ===== */}
        <Section className="relative px-5 py-24">
          <FloralArabesque className="mb-6" />
          <div className="mx-auto max-w-3xl text-center">
            <OrnamentDivider />
            <Editable
              as="p"
              field="quran.verse"
              className="mb-4 text-2xl leading-loose text-primary sm:text-3xl"
            />
            <Editable
              as="p"
              field="quran.translation"
              className="text-base italic leading-relaxed text-muted-foreground sm:text-lg"
            />
            <p className="mt-3 text-sm text-muted-foreground">— QS. Ar-Rum: 21 —</p>
            <OrnamentDivider />
          </div>
          <FloralArabesque className="mt-6 rotate-180" />
        </Section>

        {/* ===== MEMPELAI ===== */}
        <Section className="px-5 py-24">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <CrescentStar className="mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Kedua Mempelai</h2>
              <OrnamentDivider />
            </div>

            <div className="grid items-center gap-10 md:grid-cols-3">
              {/* Groom */}
              <motion.div
                variants={slideUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center text-center"
              >
                <DecorativeImage
                  field="decorative.groomImage"
                  alt="Mempelai Pria"
                  size="xl"
                  shape="circle"
                  className="mb-6 ring-4 ring-primary/15 ring-offset-4 ring-offset-background"
                />
                <Editable
                  as="h3"
                  field="groom.fullName"
                  className="text-xl font-semibold text-foreground"
                />
                <div className="mt-3 text-sm text-muted-foreground">
                  <p>Putra dari</p>
                  <Editable as="p" field="groom.father" className="font-medium text-foreground" />
                  <Editable as="p" field="groom.mother" className="font-medium text-foreground" />
                </div>
              </motion.div>

              {/* Center ornament */}
              <div className="flex flex-col items-center justify-center">
                <RotatingMandala />
                <span className="mt-4 text-4xl font-light text-primary/40">&</span>
              </div>

              {/* Bride */}
              <motion.div
                variants={slideUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="flex flex-col items-center text-center"
              >
                <DecorativeImage
                  field="decorative.brideImage"
                  alt="Mempelai Wanita"
                  size="xl"
                  shape="circle"
                  className="mb-6 ring-4 ring-primary/15 ring-offset-4 ring-offset-background"
                />
                <Editable
                  as="h3"
                  field="bride.fullName"
                  className="text-xl font-semibold text-foreground"
                />
                <div className="mt-3 text-sm text-muted-foreground">
                  <p>Putri dari</p>
                  <Editable as="p" field="bride.father" className="font-medium text-foreground" />
                  <Editable as="p" field="bride.mother" className="font-medium text-foreground" />
                </div>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* ===== DETAIL ACARA ===== */}
        <Section className="bg-secondary/20 px-5 py-24">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <ScrollText className="mx-auto mb-4 size-8 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Detail Acara</h2>
              <OrnamentDivider />
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Akad */}
              <motion.div
                variants={slideUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card relative overflow-hidden rounded-3xl p-8"
              >
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5" />
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <CalendarDays className="size-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Akad Nikah</h3>
                    <p className="text-xs text-muted-foreground">Ijab Qabul</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="size-4 shrink-0 text-primary/60" />
                    <Editable as="span" field="akad.date" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="size-4 shrink-0 text-primary/60" />
                    <Editable as="span" field="akad.time" />
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-primary/60" />
                    <div>
                      <Editable as="p" field="akad.location" className="font-medium text-foreground" />
                      <Editable as="p" field="akad.address" className="text-xs" />
                    </div>
                  </div>
                </div>
                <a
                  href={defaultDataIslamiLux.akadMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                >
                  <Navigation className="size-4" />
                  Lihat Peta Lokasi
                </a>
              </motion.div>

              {/* Resepsi */}
              <motion.div
                variants={slideUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="glass-card relative overflow-hidden rounded-3xl p-8"
              >
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5" />
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Heart className="size-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Resepsi</h3>
                    <p className="text-xs text-muted-foreground">Walimatul Ursy</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="size-4 shrink-0 text-primary/60" />
                    <Editable as="span" field="resepsi.date" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="size-4 shrink-0 text-primary/60" />
                    <Editable as="span" field="resepsi.time" />
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-primary/60" />
                    <div>
                      <Editable as="p" field="resepsi.location" className="font-medium text-foreground" />
                      <Editable as="p" field="resepsi.address" className="text-xs" />
                    </div>
                  </div>
                </div>
                <a
                  href={defaultDataIslamiLux.resepsiMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                >
                  <Navigation className="size-4" />
                  Lihat Peta Lokasi
                </a>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* ===== COUNTDOWN ===== */}
        <Section className="px-5 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-2 text-2xl font-semibold text-foreground sm:text-3xl">
              Menuju Hari Bahagia
            </h2>
            <OrnamentDivider />
            <CountdownTimer targetDate="2026-12-15T08:00:00" />
          </div>
        </Section>

        {/* ===== DRESS CODE ===== */}
        <Section className="bg-secondary/20 px-5 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Shirt className="mx-auto mb-4 size-10 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Kode Busana</h2>
            <OrnamentDivider />
            <div className="glass-card rounded-2xl p-8">
              <Editable
                as="p"
                field="dressCode"
                className="text-lg text-muted-foreground"
              />
              <div className="mt-6 flex justify-center gap-4">
                {["Putih", "Emas", "Hijau", "Coklat"].map((color) => (
                  <div key={color} className="flex flex-col items-center gap-2">
                    <div
                      className="h-10 w-10 rounded-full border-2 border-white shadow-md"
                      style={{
                        backgroundColor:
                          color === "Putih"
                            ? "#f5f5f0"
                            : color === "Emas"
                            ? "#d4af37"
                            : color === "Hijau"
                            ? "#1a5c3a"
                            : "#8b6914",
                      }}
                    />
                    <span className="text-xs text-muted-foreground">{color}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ===== GALERI ===== */}
        <Section className="px-5 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <ImageIcon className="mx-auto mb-4 size-10 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Galeri Momen</h2>
              <OrnamentDivider />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  variants={fade}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="group relative aspect-[3/4] overflow-hidden rounded-2xl border bg-muted shadow-sm"
                >
                  <img
                    src={`/images/gallery-${i + 1}.jpg`}
                    alt={`Foto ${i + 1}`}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/80 text-muted-foreground transition group-hover:bg-muted/60">
                    <ImageIcon className="mb-2 size-8 opacity-40" />
                    <span className="text-xs font-medium">Foto {i + 1}</span>
                    <span className="mt-1 text-[10px] opacity-60">Taruh di public/images/</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ===== DOA & HADITS ===== */}
        <Section className="bg-secondary/20 px-5 py-24">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <CrescentStar className="mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Doa & Hadits</h2>
              <OrnamentDivider />
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <motion.div
                variants={slideUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card rounded-3xl p-8 text-center"
              >
                <p className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">Hadits</p>
                <Editable
                  as="p"
                  field="hadith"
                  className="mb-4 text-xl leading-loose text-primary sm:text-2xl"
                />
                <Editable
                  as="p"
                  field="hadith.translation"
                  className="text-sm italic leading-relaxed text-muted-foreground"
                />
              </motion.div>

              <motion.div
                variants={slideUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="glass-card rounded-3xl p-8 text-center"
              >
                <p className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">Doa</p>
                <Editable
                  as="p"
                  field="doa"
                  className="mb-4 text-xl leading-loose text-primary sm:text-2xl"
                />
                <Editable
                  as="p"
                  field="doa.translation"
                  className="text-sm italic leading-relaxed text-muted-foreground"
                />
              </motion.div>
            </div>
          </div>
        </Section>

        {/* ===== PESAN ===== */}
        <Section className="px-5 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <OrnamentDivider />
            <Editable
              as="p"
              field="message"
              className="text-lg leading-relaxed text-muted-foreground sm:text-xl"
            />
            <OrnamentDivider />
          </div>
        </Section>

        {/* ===== RSVP BUILT-IN ===== */}
        <Section className="bg-secondary/20 px-5 py-24">
          <div className="mx-auto max-w-2xl">
            <div className="mb-10 text-center">
              <Heart className="mx-auto mb-4 size-10 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Konfirmasi Kehadiran</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Mohon konfirmasi kehadiran Anda melalui form di bawah ini
              </p>
              <OrnamentDivider />
            </div>
            <div className="glass-card rounded-3xl p-6 sm:p-10">
              <RSVPForm />
            </div>
          </div>
        </Section>

        {/* ===== PENUTUP ===== */}
        <Section className="relative px-5 py-24">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="mx-auto max-w-2xl text-center">
            <BismillahDecorative />
            <Editable
              as="p"
              field="closing.message"
              className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl"
            />
            <p className="mt-8 text-sm text-muted-foreground">
              Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh
            </p>
            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground/60">
              <span className="h-px w-8 bg-primary/20" />
              <span>Dibuat dengan cinta</span>
              <span className="h-px w-8 bg-primary/20" />
            </div>
          </div>
        </Section>

        <FormRenderer />
      </main>
    </EditorProvider>
  );
}
