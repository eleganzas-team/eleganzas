"use client";

import { motion } from "framer-motion";
import { HeroSection } from "@/components/public/home/hero-section";
import { FeaturesSection } from "@/components/public/home/features-section";
// import { FeaturedTemplatesSection } from "@/components/home/featured-templates-section";
import { TestimonialsSection } from "@/components/public/home/testimonials-section";
import { CTASection } from "@/components/public/home/cta-section";
// import { NewsletterSection } from "@/components/marketing/newsletter-section";
import type { Database } from "@/lib/supabase/types";

type Template = Database["public"]["Tables"]["templates"]["Row"];

// interface HomeContentProps {
//   featuredTemplates: {
//     trending: Template[];
//     new: Template[];
//     premium: Template[];
//   };
//   stats: {
//     totalTemplates: number;
//     totalOrders: number;
//     rating: number;
//   };
// }
interface HomeContentProps {
  featuredTemplates: {
    trending: Template[];
    new: Template[];
    premium: Template[];
  };
  stats: {
    totalTemplates: number;
    totalOrders: number;
    rating: number;
  };
}
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function HomeContent({ featuredTemplates, stats }: HomeContentProps) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className=" pb-20"
    >
      <HeroSection stats={stats} />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      {/* <FeaturesSection />
      <FeaturedTemplatesSection templates={featuredTemplates} />
      <TestimonialsSection />
      <CTASection />
      <NewsletterSection /> */}
    </motion.div>
  );
}