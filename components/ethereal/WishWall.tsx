"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Heart } from "lucide-react";

interface Wish {
  id: number;
  name: string;
  message: string;
  createdAt: string;
}

export function WishWall() {
  const [wishes, setWishes] = useState<Wish[]>([
    { id: 1, name: "Keluarga Besar", message: "Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.", createdAt: "2024-01-01" },
  ]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    
    setWishes(prev => [{
      id: Date.now(),
      name,
      message,
      createdAt: new Date().toISOString(),
    }, ...prev]);
    
    setName("");
    setMessage("");
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="mb-8 space-y-3">
        <input
          type="text"
          placeholder="Nama Anda"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full h-10 px-3 rounded-lg border bg-background text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <textarea
          placeholder="Tulis ucapan dan doa..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="w-full resize-none rounded-lg border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <button
          type="submit"
          className="w-full h-10 flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Send className="w-4 h-4" />
          Kirim Ucapan
        </button>
      </form>

      <div className="space-y-4">
        {wishes.map((wish) => (
          <motion.div
            key={wish.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl border bg-card text-left"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">{wish.name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(wish.createdAt).toLocaleDateString("id-ID")}
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{wish.message}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
