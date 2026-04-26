"use client";

import { motion } from "framer-motion";

export function SplashGate({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="text-center">
        <h1 className="text-2xl font-serif mb-4">Undangan Pernikahan</h1>
        <button
          onClick={onOpen}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg"
        >
          Buka Undangan
        </button>
      </div>
    </motion.div>
  );
}
