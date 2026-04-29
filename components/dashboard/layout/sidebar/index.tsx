"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { menuConfig } from "@/lib/menu-config";

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 h-screen flex flex-col border-r border-sidebar-border bg-sidebar"
    >
      {/* Brand Area */}
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-sidebar-brand-bg flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-sidebar-brand-icon" />
          </div>
          <div>
            <h1 className="font-cormorant text-xl font-bold leading-tight text-sidebar-brand-text">
              eleganzas
            </h1>
            <p className="text-[10px] uppercase tracking-wider text-sidebar-brand-subtext">
              templates
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto py-4 space-y-6">
        {menuConfig.map((section, idx) => (
          <NavMain
            key={idx}
            section={section}
            pathname={pathname}
          />
        ))}
      </div>

      {/* Footer User */}
      <div className="border-t border-sidebar-footer-border p-4">
        <NavUser />
      </div>
    </motion.aside>
  );
}