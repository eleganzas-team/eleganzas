"use client";

import { motion } from "framer-motion";

export function BookPage({ children, animation, id }: { children: React.ReactNode; animation: string; id?: string }) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="scroll-mt-20"
    >
      {children}
    </motion.div>
  );
}
