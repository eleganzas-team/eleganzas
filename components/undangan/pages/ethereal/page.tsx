import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Calendar,
  Clock,
  MapPin,
  Navigation,
  BookHeart,
  MessageSquareHeart,
  Sparkles,
  Send,
} from "lucide-react";

import { Editable } from "@/components/editor/Editable";
import { FormRenderer } from "@/components/editor/FormRenderer";
import { etherealMapping } from "@/app/ethereal/mapping";
import { defaultDataEthereal } from "@/lib/config/defaultData";
import { mockUserDataEthereal } from "@/lib/config/mockUserDataEthereal";
import { EditorProvider } from "@/lib/hooks/useEditor";

import { SplashGate } from "@/components/ethereal/SplashGate";
import { MusicPlayer } from "@/components/ethereal/MusicPlayer";
import { ProgressScroll } from "@/components/ethereal/ProgressScroll";
import { BookPage } from "@/components/ethereal/BookPage";
import { LightboxGallery } from "@/components/ethereal/LightboxGallery";
import { GiftDigital } from "@/components/ethereal/GiftDigital";
import { WishWall } from "@/components/ethereal/WishWall";
import { FloatingElements } from "@/components/ethereal/ParallaxLayer";
import { CountdownTimer } from "@/components/ethereal/CountdownTimer";
import { GlobalSettings } from "@/components/ethereal/GlobalSettings";
import { ImageUploader } from "@/components/ethereal/ImageUploader";

const COUPLE_FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128'%3E%3Crect fill='%23f5f0e8' width='128' height='128'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-size='14' fill='%23999'%3EFoto%3C/text%3E%3C/svg%3E";
const GROOM_FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='112' height='112'%3E%3Crect fill='%23e8e0d5' width='112' height='112'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-size='12' fill='%23888'%3EMempelai Pria%3C/text%3E%3C/svg%3E";
const BRIDE_FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='112' height='112'%3E%3Crect fill='%23e8d5d5' width='112' height='112'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-size='12' fill='%23888'%3EMempelai Wanita%3C/text%3E%3C/svg%3E";

const OrnamentDivider = () => (
  <div className="flex items-center justify-center gap-4 py-6">
    <span className="h-px w-12 sm:w-16 bg-primary/30" />
    <Heart className="size-3 sm:size-4 text-primary/50 fill-primary/30" />
    <span className="h-px w-12 sm:w-16 bg-primary/30" />
  </div>
);

function AnimatedSection({ children, animation, id }: { children: React.ReactNode; animation: string; id?: string }) {
  const key = `${id}-${animation}-${Date.now()}`;
  return <BookPage key={key} animation={animation} id={id}>{children}</BookPage>;
}

export function EtherealInvitationPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [animation, setAnimation] = useState("fade");
  const [musicUrl, setMusicUrl] = useState("/music/background.mp3");
  const [coupleImage, setCoupleImage] = useState("/images/couple.jpg");
  const [groomImage, setGroomImage] = useState("/images/groom.jpg");
  const [brideImage, setBrideImage] = useState("/images/bride.jpg");
  const [galleryImages] = useState([
    "/images/gallery-1.jpg", "/images/gallery-2.jpg", "/images/gallery-3.jpg",
    "/images/gallery-4.jpg", "/images/gallery-5.jpg", "/images/gallery-6.jpg",
  ]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    window.dispatchEvent(new CustomEvent("ethereal-open-invitation"));
  }, []);

  const eventDate = "2025-12-20";

  return (
    <EditorProvider defaultData={defaultDataEthereal} initialUserData={mockUserDataEthereal} mapping={etherealMapping}>
      <div className="theme-ethereal min-h-screen bg-background font-serif text-foreground relative overflow-x-hidden">
        {isOpen && <FloatingElements />}
        <AnimatePresence>{!isOpen && <SplashGate onOpen={handleOpen} />}</AnimatePresence>
        {isOpen && <ProgressScroll />}
        {isOpen && <MusicPlayer src={musicUrl} title="Beautiful in White" artist="Shane Filan" />}
        {isOpen && <GlobalSettings animation={animation} onAnimationChange={setAnimation} onMusicUpload={setMusicUrl} />}

        {isOpen && (
          <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}
            className="relative z-10 py-4 sm:py-8 px-3 sm:px-4 space-y-4 sm:space-y-8">

            {/* COVER */}
            <AnimatedSection animation={animation} id="cover">
              <div className="text-center py-8 sm:py-12">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-muted-foreground mb-4 sm:mb-6">Undangan Pernikahan</p>
                  <h1 className="font-script text-4xl sm:text-6xl md:text-7xl lg:text-8xl ethereal-gold-text mb-3 sm:mb-4 leading-tight">
                    <Editable as="span" field="groom.nickname" />
                    <span className="mx-2 sm:mx-3 text-2xl sm:text-4xl md:text-5xl">&</span>
                    <Editable as="span" field="bride.nickname" />
                  </h1>
                  <OrnamentDivider />
                  <p className="text-base sm:text-lg text-muted-foreground mb-1 sm:mb-2"><Editable as="span" field="event.date" /></p>
                  <p className="text-xs sm:text-sm text-muted-foreground/70"><Editable as="span" field="event.dateHijri" /></p>
                  <div className="mt-6 sm:mt-8 flex justify-center">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-gold/30 shadow-xl">
                      <ImageUploader src={coupleImage} alt="Couple" onImageChange={setCoupleImage} fallbackSvg={COUPLE_FALLBACK} className="w-full h-full object-cover" containerClassName="w-full h-full" />
                    </div>
                    </div>
                </motion.div>
              </div>
            </AnimatedSection>

            {/* MEMPELAI */}
            <AnimatedSection animation={animation} id="mempelai">
              <div className="text-center py-6 sm:py-8">
                <Sparkles className="size-5 sm:size-6 text-gold mx-auto mb-3 sm:mb-4" />
                <h2 className="text-2xl sm:text-3xl font-serif font-medium mb-2">Mempelai</h2>
                <p className="text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8 px-4">Dengan memohon rahmat dan ridho Allah SWT</p>
                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                  <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-center">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-primary/20 mx-auto mb-3 sm:mb-4 shadow-lg">
                      <ImageUploader src={groomImage} alt="Groom" onImageChange={setGroomImage} fallbackSvg={GROOM_FALLBACK} className="w-full h-full object-cover" containerClassName="w-full h-full" />
                    </div>
                    <h3 className="font-script text-2xl sm:text-3xl text-primary mb-1"><Editable as="span" field="groom.nickname" /></h3>
                    <p className="font-medium text-sm sm:text-base mb-1"><Editable as="span" field="groom.fullName" /></p>
                    <p className="text-xs sm:text-sm text-muted-foreground px-4">Putra dari <Editable as="span" field="groom.father" /> & <Editable as="span" field="groom.mother" /></p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-center">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-rose/30 mx-auto mb-3 sm:mb-4 shadow-lg">
                      <ImageUploader src={brideImage} alt="Bride" onImageChange={setBrideImage} fallbackSvg={BRIDE_FALLBACK} className="w-full h-full object-cover" containerClassName="w-full h-full" />
                    </div>
                    <h3 className="font-script text-2xl sm:text-3xl text-primary mb-1"><Editable as="span" field="bride.nickname" /></h3>
                    <p className="font-medium text-sm sm:text-base mb-1"><Editable as="span" field="bride.fullName" /></p>
                    <p className="text-xs sm:text-sm text-muted-foreground px-4">Putri dari <Editable as="span" field="bride.father" /> & <Editable as="span" field="bride.mother" /></p>
                  </motion.div>
                </div>
                </div>
            </AnimatedSection>

            {/* KISAH */}
            <AnimatedSection animation={animation} id="kisah">
              <div className="text-center py-6 sm:py-8">
                <BookHeart className="size-5 sm:size-6 text-primary mx-auto mb-3 sm:mb-4" />
                <h2 className="text-2xl sm:text-3xl font-serif font-medium mb-6 sm:mb-8"><Editable as="span" field="story.title" /></h2>
                <div className="space-y-6 sm:space-y-8 max-w-lg mx-auto px-2">
                  {[{ field: "story.meet", icon: "💫", year: "2019" }, { field: "story.date", icon: "💕", year: "2021" }, { field: "story.proposal", icon: "💍", year: "2024" }, { field: "story.wedding", icon: "🤵👰", year: "2025" }].map((item, index) => (
                    <motion.div key={item.field} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }} className="relative pl-6 sm:pl-8 border-l-2 border-primary/20">
                      <div className="absolute -left-2 top-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center text-[10px] sm:text-xs">{item.icon}</div>
                      <p className="text-xs sm:text-sm font-medium text-primary mb-1">{item.year}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed"><Editable as="span" field={item.field} /></p>
                    </motion.div>
                  ))}
                </div>
                </div>
            </AnimatedSection>

            {/* ACARA */}
            <AnimatedSection animation={animation} id="acara">
              <div className="text-center py-6 sm:py-8">
                <Calendar className="size-5 sm:size-6 text-primary mx-auto mb-3 sm:mb-4" />
                <h2 className="text-2xl sm:text-3xl font-serif font-medium mb-6 sm:mb-8">Detail Acara</h2>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 px-2">
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="ethereal-book-page ethereal-page-curl p-4 sm:p-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4"><Heart className="size-5 sm:size-6 text-primary" /></div>
                    <h3 className="font-medium text-base sm:text-lg mb-3 sm:mb-4">Akad Nikah</h3>
                    <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="size-3 sm:size-4 flex-shrink-0" /><Editable as="span" field="akad.date" /></div>
                      <div className="flex items-center gap-2 text-muted-foreground"><Clock className="size-3 sm:size-4 flex-shrink-0" /><Editable as="span" field="akad.time" /></div>
                      <div className="flex items-start gap-2 text-muted-foreground"><MapPin className="size-3 sm:size-4 flex-shrink-0 mt-0.5" /><div><Editable as="span" field="akad.location" /><p className="text-[10px] sm:text-xs mt-1"><Editable as="span" field="akad.address" /></p></div>
                    </div>
                    </div>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-3 sm:mt-4 px-3 sm:px-4 py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm hover:bg-primary/20 transition-colors"><Navigation className="size-3 sm:size-4" />Google Maps</a>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="ethereal-book-page ethereal-page-curl p-4 sm:p-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-rose/10 flex items-center justify-center mx-auto mb-3 sm:mb-4"><Sparkles className="size-5 sm:size-6 text-rose" /></div>
                    <h3 className="font-medium text-base sm:text-lg mb-3 sm:mb-4">Resepsi</h3>
                    <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="size-3 sm:size-4 flex-shrink-0" /><Editable as="span" field="resepsi.date" /></div>
                      <div className="flex items-center gap-2 text-muted-foreground"><Clock className="size-3 sm:size-4 flex-shrink-0" /><Editable as="span" field="resepsi.time" /></div>
                      <div className="flex items-start gap-2 text-muted-foreground"><MapPin className="size-3 sm:size-4 flex-shrink-0 mt-0.5" /><div><Editable as="span" field="resepsi.location" /><p className="text-[10px] sm:text-xs mt-1"><Editable as="span" field="resepsi.address" /></p></div>
                    </div>
                    </div>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-3 sm:mt-4 px-3 sm:px-4 py-2 rounded-full bg-rose/10 text-rose text-xs sm:text-sm hover:bg-rose/20 transition-colors"><Navigation className="size-3 sm:size-4" />Google Maps</a>
                  </motion.div>
                </div>
                <div className="mt-8 sm:mt-12 px-2">
                  <h3 className="text-base sm:text-lg font-medium mb-4 sm:mb-6">Menuju Hari Bahagia</h3>
                  <CountdownTimer targetDate={eventDate} />
                </div>
                </div>
            </AnimatedSection>

            {/* GALERI */}
            <AnimatedSection animation={animation} id="galeri">
              <div className="text-center py-6 sm:py-8">
                <Sparkles className="size-5 sm:size-6 text-gold mx-auto mb-3 sm:mb-4" />
                <h2 className="text-2xl sm:text-3xl font-serif font-medium mb-6 sm:mb-8">Galeri Momen</h2>
                <LightboxGallery images={galleryImages} />
              </div>
            </AnimatedSection>

            {/* KADO */}
            <AnimatedSection animation={animation} id="kado">
              <div className="py-6 sm:py-8 px-2">
                <GiftDigital title="Kado Digital" message="Doa restu Anda adalah kado terindah. Bagi yang ingin memberikan tanda kasih, dapat melalui:"
                  accounts={[{ bank: "Bank Mandiri", number: "123-456-7890", name: "Muhammad Rizky Al-Farabi" }, { bank: "Bank BCA", number: "098-765-4321", name: "Aisyah Nuraini Putri" }]} />
              </div>
            </AnimatedSection>

            {/* RSVP */}
            <AnimatedSection animation={animation} id="rsvp">
              <div className="text-center py-6 sm:py-8">
                <Calendar className="size-5 sm:size-6 text-primary mx-auto mb-3 sm:mb-4" />
                <h2 className="text-2xl sm:text-3xl font-serif font-medium mb-2"><Editable as="span" field="rsvp.title" /></h2>
                <p className="text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto px-4"><Editable as="span" field="rsvp.subtitle" /></p>
                <div className="ethereal-book-page ethereal-page-curl p-4 sm:p-6 md:p-8 max-w-md mx-auto">
                  <form onSubmit={(e) => { e.preventDefault(); alert("Terima kasih!"); }} className="space-y-3 sm:space-y-4 text-left">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">Nama Lengkap</label>
                      <input type="text" placeholder="Nama Anda" className="w-full h-10 px-3 rounded-lg border bg-background text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" required />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">Kehadiran</label>
                      <div className="flex gap-2 sm:gap-3">
                        <label className="flex-1 flex items-center gap-2 p-2.5 sm:p-3 rounded-lg border cursor-pointer hover:border-primary/50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                          <input type="radio" name="attendance" value="yes" className="accent-primary" defaultChecked /><span className="text-xs sm:text-sm">Hadir</span>
                        </label>
                        <label className="flex-1 flex items-center gap-2 p-2.5 sm:p-3 rounded-lg border cursor-pointer hover:border-primary/50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                          <input type="radio" name="attendance" value="no" className="accent-primary" /><span className="text-xs sm:text-sm">Tidak Hadir</span>
                        </label>
                      </div>
                      </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">Jumlah Tamu</label>
                      <select className="w-full h-10 px-3 rounded-lg border bg-background text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"><option>1 orang</option><option>2 orang</option></select>
                    </div>
                    <button type="submit" className="w-full h-10 flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"><Send className="size-4" />Konfirmasi Kehadiran</button>
                  </form>
                </div>
                </div>
            </AnimatedSection>

            {/* UCAPAN */}
            <AnimatedSection animation={animation} id="ucapan">
              <div className="text-center py-6 sm:py-8 px-2">
                <MessageSquareHeart className="size-5 sm:size-6 text-rose mx-auto mb-3 sm:mb-4" />
                <h2 className="text-2xl sm:text-3xl font-serif font-medium mb-2"><Editable as="span" field="wishes.title" /></h2>
                <p className="text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8"><Editable as="span" field="wishes.subtitle" /></p>
                <WishWall />
              </div>
            </AnimatedSection>

            {/* PENUTUP */}
            <AnimatedSection animation={animation} id="penutup">
              <div className="text-center py-10 sm:py-12">
                <OrnamentDivider />
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto mb-4 sm:mb-6 px-4"><Editable as="span" field="closing.message" /></p>
                  <p className="text-xs sm:text-sm text-muted-foreground/70 mb-6 sm:mb-8"><Editable as="span" field="closing.thankYou" /></p>
                  <h2 className="font-script text-3xl sm:text-5xl md:text-6xl ethereal-gold-text mb-3 sm:mb-4"><Editable as="span" field="closing.coupleNames" /></h2>
                  <OrnamentDivider />
                  <p className="text-[10px] sm:text-xs text-muted-foreground/50 mt-6 sm:mt-8">Dibuat dengan ❤️ untuk hari istimewa kami</p>
                </motion.div>
              </div>
            </AnimatedSection>

          </motion.main>
        )}

        <FormRenderer />
      </div>
    </EditorProvider>
  );
}