"use client";

import { Bell, Search, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { UserDropdown } from "./user-dropdown";
import { motion } from "framer-motion";

export function Topbar() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-topbar-border bg-topbar px-4 md:px-6">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-topbar-icon" />
          <input
            type="search"
            placeholder="Cari template..."
            className="w-full rounded-md border border-input bg-background pl-9 pr-4 py-1.5 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-topbar-icon hover:text-topbar-icon-hover hover:bg-topbar-btn-bg-hover"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Notification */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-topbar-icon hover:text-topbar-icon-hover hover:bg-topbar-btn-bg-hover"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
        </Button>

        {/* Divider */}
        <div className="mx-2 h-6 w-px bg-topbar-divider" />

        {/* User Dropdown */}
        <UserDropdown />
      </div>
    </header>
  );
}