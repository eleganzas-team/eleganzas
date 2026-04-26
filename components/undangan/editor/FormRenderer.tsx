import { Edit3, X, ImagePlus, Link2 } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { useEditor } from "@/lib/hooks/useEditor";

const labels: Record<string, string> = {
  "couple.bride.name": "Bride name",
  "couple.groom.name": "Groom name",
  "event.date": "Event date",
  "event.location": "Location",
  "closing.message": "Closing message",

  // Islamic theme labels
  "opening.bismillah": "Bismillah",
  "opening.salam": "Salam Pembuka",
  "quran.verse": "Ayat Quran (Arab)",
  "quran.translation": "Terjemahan Ayat",
  "groom.fullName": "Nama Lengkap Mempelai Pria",
  "groom.nickname": "Panggilan Mempelai Pria",
  "groom.father": "Ayah Mempelai Pria",
  "groom.mother": "Ibu Mempelai Pria",
  "bride.fullName": "Nama Lengkap Mempelai Wanita",
  "bride.nickname": "Panggilan Mempelai Wanita",
  "bride.father": "Ayah Mempelai Wanita",
  "bride.mother": "Ibu Mempelai Wanita",
  "event.dateHijri": "Tanggal Hijriah",
  "akad.date": "Tanggal Akad",
  "akad.time": "Waktu Akad",
  "akad.location": "Lokasi Akad",
  "akad.address": "Alamat Akad",
  "akad.mapUrl": "Link Google Maps Akad",
  "resepsi.date": "Tanggal Resepsi",
  "resepsi.time": "Waktu Resepsi",
  "resepsi.location": "Lokasi Resepsi",
  "resepsi.address": "Alamat Resepsi",
  "resepsi.mapUrl": "Link Google Maps Resepsi",
  "dressCode": "Kode Busana",
  "message": "Ucapan / Pesan",
  "rsvp.link": "Link RSVP",
  "hadith": "Hadits (Arab)",
  "hadith.translation": "Terjemahan Hadits",
  "doa": "Doa (Arab)",
  "doa.translation": "Terjemahan Doa",

  // Islamic Luxury decorative labels
  "decorative.heroImage": "Foto Cover (URL Gambar)",
  "decorative.groomImage": "Foto Mempelai Pria (URL Gambar)",
  "decorative.brideImage": "Foto Mempelai Wanita (URL Gambar)",
  "decorative.ornamentStyle": "Gaya Ornamen (geometric|floral|star)",
  "decorative.accentColor": "Warna Aksen (hex)",

  // Ethereal theme labels
  "opening.title": "Judul Pembuka",
  "opening.subtitle": "Subjudul Pembuka",
  "opening.buttonText": "Teks Tombol Buka",
  "decorative.animation": "Animasi Scroll",
  "groom.instagram": "Instagram Mempelai Pria",
  "bride.instagram": "Instagram Mempelai Wanita",
  "story.title": "Judul Kisah",
  "story.meet": "Cerita Pertemuan",
  "story.date": "Cerita Pacaran",
  "story.proposal": "Cerita Lamaran",
  "story.wedding": "Cerita Pernikahan",
  "gift.title": "Judul Kado",
  "gift.message": "Pesan Kado",
  "gift.account1Bank": "Bank 1",
  "gift.account1Number": "Nomor Rekening 1",
  "gift.account1Name": "Nama Pemilik Rekening 1",
  "gift.account2Bank": "Bank 2",
  "gift.account2Number": "Nomor Rekening 2",
  "gift.account2Name": "Nama Pemilik Rekening 2",
  "gift.qrisUrl": "URL QRIS",
  "rsvp.title": "Judul RSVP",
  "rsvp.subtitle": "Subjudul RSVP",
  "wishes.title": "Judul Ucapan",
  "wishes.subtitle": "Subjudul Ucapan",
  "closing.thankYou": "Ucapan Terima Kasih",
  "closing.coupleNames": "Nama Pasangan Penutup",
  "music.url": "URL Musik",
  "music.title": "Judul Musik",
  "music.artist": "Artis Musik",
};

function isTextareaField(field: string) {
  const textareaKeys = [
    "message",
    "quran.verse",
    "quran.translation",
    "hadith",
    "hadith.translation",
    "doa",
    "doa.translation",
    "opening.bismillah",
    "opening.salam",
    "closing.message",
    "gift.message",
    "story.meet",
    "story.date",
    "story.proposal",
    "story.wedding",
  ];
  return textareaKeys.some((key) => field === key || field.endsWith(".message") || field.endsWith(".translation") || field.endsWith(".verse") || field.endsWith(".doa") || field.endsWith(".hadith"));
}

function isImageUrlField(field: string) {
  return field.startsWith("decorative.") && field.endsWith("Image");
}

function isUrlField(field: string) {
  return field.endsWith("Url") || field.endsWith(".url") || field.endsWith("Link") || field.endsWith(".link");
}

export function FormRenderer() {
  const { activeField, getValue, setActiveField, setValue } = useEditor();

  if (!activeField) return null;

  const useTextarea = isTextareaField(activeField);
  const useImageUrl = isImageUrlField(activeField);
  const useUrl = isUrlField(activeField);

  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="fixed bottom-5 left-1/2 z-50 w-[min(calc(100vw-2rem),28rem)] -translate-x-1/2 rounded-xl border bg-popover/95 p-4 text-popover-foreground shadow-editor backdrop-blur-md"
    >
      <div className="mb-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Edit3 className="size-4 text-primary" aria-hidden="true" />
          <span>{labels[activeField] ?? activeField}</span>
        </div>
        <Button variant="ghost" size="icon" type="button" onClick={() => setActiveField(null)} aria-label="Close editor">
          <X className="size-4" aria-hidden="true" />
        </Button>
      </div>

      {useImageUrl && (
        <div className="mb-3 rounded-lg bg-secondary/50 p-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <ImagePlus className="size-4 text-primary" />
            <span className="font-medium text-foreground">Tips menambah foto:</span>
          </div>
          <ul className="mt-1.5 list-disc space-y-1 pl-4">
            <li>Taruh foto ke folder <code>public/images/</code></li>
            <li>Lalu isi dengan path: <code>/images/nama-foto.jpg</code></li>
            <li>Atau gunakan URL gambar dari internet</li>
          </ul>
        </div>
      )}

      {useUrl && !useImageUrl && (
        <div className="mb-3 rounded-lg bg-secondary/50 p-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Link2 className="size-4 text-primary" />
            <span className="font-medium text-foreground">Tips:</span>
          </div>
          <p className="mt-1">Masukkan URL lengkap dengan https:// atau path lokal</p>
        </div>
      )}

      {useTextarea ? (
        <textarea
          autoFocus
          rows={4}
          value={getValue(activeField)}
          onChange={(event) => setValue(activeField, event.target.value)}
          className="w-full resize-none rounded-lg border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
        />
      ) : (useImageUrl || useUrl) ? (
        <div className="relative">
          <Link2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            autoFocus
            type="url"
            placeholder="/images/foto.jpg atau https://..."
            value={getValue(activeField)}
            onChange={(event) => setValue(activeField, event.target.value)}
            className="h-11 w-full rounded-lg border bg-background pl-9 pr-3 text-sm text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      ) : (
        <input
          autoFocus
          value={getValue(activeField)}
          onChange={(event) => setValue(activeField, event.target.value)}
          className="h-11 w-full rounded-lg border bg-background px-3 text-sm text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
        />
      )}
    </motion.aside>
  );
}

