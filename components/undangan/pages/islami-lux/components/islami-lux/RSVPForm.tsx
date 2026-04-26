import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, User, Users, MessageSquare, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RSVPData {
  name: string;
  attendance: "hadir" | "tidak-hadir" | "";
  guests: number;
  message: string;
}

interface StoredRSVP extends RSVPData {
  id: string;
  createdAt: string;
}

export function RSVPForm() {
  const [form, setForm] = useState<RSVPData>({
    name: "",
    attendance: "",
    guests: 1,
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [records, setRecords] = useState<StoredRSVP[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("islami-lux-rsvp");
    return stored ? JSON.parse(stored) : [];
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.attendance) return;

    const newRecord: StoredRSVP = {
      ...form,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    const updated = [newRecord, ...records];
    setRecords(updated);
    localStorage.setItem("islami-lux-rsvp", JSON.stringify(updated));
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", attendance: "", guests: 1, message: "" });
  };

  return (
    <div className="mx-auto max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-foreground">
            <User className="size-4 text-primary" />
            Nama Lengkap
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Masukkan nama Anda"
            className="h-12 w-full rounded-xl border bg-background px-4 text-sm text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>

        {/* Attendance */}
        <div>
          <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-foreground">
            <Heart className="size-4 text-primary" />
            Konfirmasi Kehadiran
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, attendance: "hadir" }))}
              className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition ${
                form.attendance === "hadir"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input bg-background text-foreground hover:bg-secondary"
              }`}
            >
              <CheckCircle className="size-4" />
              Hadir
            </button>
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, attendance: "tidak-hadir" }))}
              className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition ${
                form.attendance === "tidak-hadir"
                  ? "border-destructive bg-destructive text-destructive-foreground"
                  : "border-input bg-background text-foreground hover:bg-secondary"
              }`}
            >
              Tidak Hadir
            </button>
          </div>
        </div>

        {/* Guests */}
        {form.attendance === "hadir" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-foreground">
              <Users className="size-4 text-primary" />
              Jumlah Tamu (termasuk Anda)
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, guests: Math.max(1, f.guests - 1) }))}
                className="flex h-10 w-10 items-center justify-center rounded-lg border text-lg font-medium transition hover:bg-secondary"
              >
                −
              </button>
              <span className="w-8 text-center text-lg font-semibold">{form.guests}</span>
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, guests: Math.min(10, f.guests + 1) }))}
                className="flex h-10 w-10 items-center justify-center rounded-lg border text-lg font-medium transition hover:bg-secondary"
              >
                +
              </button>
            </div>
          </motion.div>
        )}

        {/* Message */}
        <div>
          <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-foreground">
            <MessageSquare className="size-4 text-primary" />
            Ucapan / Doa
          </label>
          <textarea
            rows={3}
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            placeholder="Tulis ucapan atau doa untuk mempelai..."
            className="w-full resize-none rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={!form.name.trim() || !form.attendance}
          className="w-full gap-2 rounded-xl py-6 text-sm font-semibold"
        >
          <Send className="size-4" />
          Kirim Konfirmasi
        </Button>
      </form>

      {/* Success toast */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-primary/10 p-4 text-sm font-medium text-primary"
          >
            <CheckCircle className="size-5" />
            Terima kasih! Konfirmasi Anda telah tersimpan.
          </motion.div>
        )}
      </AnimatePresence>

      {/* RSVP List */}
      {records.length > 0 && (
        <div className="mt-10">
          <h3 className="mb-4 text-center text-lg font-semibold text-foreground">
            Ucapan & Konfirmasi ({records.length})
          </h3>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {records.slice(0, 20).map((record) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-xl border bg-card/60 p-4 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">{record.name}</span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      record.attendance === "hadir"
                        ? "bg-primary/10 text-primary"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {record.attendance === "hadir" ? `Hadir (${record.guests})` : "Tidak Hadir"}
                  </span>
                </div>
                {record.message && (
                  <p className="mt-2 text-sm italic text-muted-foreground">"{record.message}"</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

