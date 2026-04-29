"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const testimonials = [
  {
    name: "Sarah & Fadil",
    role: "Pernikahan - Jan 2026",
    content: "Undangan digital eleganzas sangat memudahkan kami. Tamu-tamu suka dengan desainnya yang cantik!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616c710cd93?w=100&h=100&fit=crop",
  },
  // {
  //   name: "Diana & Andi",
  //   role: "Pernikahan - Des 2023",
  //   content: "Fitur RSVP digital sangat membantu tracking tamu yang hadir. Recommended!",
  //   rating: 5,
  //   image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  // },
  // {
  //   name: "Maya & Budi",
  //   role: "Pernikahan - Nov 2023",
  //   content: "Template-nya banyak pilihan dan semua elegant. Customer service juga responsif.",
  //   rating: 5,
  //   image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  // },
];

export function TestimonialsSection() {
  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <motion.div variants={fadeInUp} className="mb-12 text-center">
          <h2 className="font-cormorant text-4xl font-bold text-foreground">
            Cerita Bahagia Mereka
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Ribuan pasangan telah mempercayakan momen spesial mereka kepada kami
          </p>
        </motion.div>

        <motion.div variants={staggerContainer} className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className="relative rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-lg"
            >
              <Quote className="absolute right-6 top-6 h-8 w-8 text-muted-foreground/20" />
              
              <div className="mb-4 flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              
              <p className="mb-6 text-muted-foreground">{testimonial.content}</p>
              
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}