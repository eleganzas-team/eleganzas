"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, Menu, X, Sun, Moon, ShoppingCart, ChevronDown, 
  Heart, School, Briefcase, Database, FileText, 
  Calendar, Users, Building, Package, LayoutDashboard,
  LogIn, UserPlus, Gift, Star, Phone, Info, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { CartSidebar } from "@/components/public/cart-sidebar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import logo from "@/assets/logos-transparent.png";

const navItems = [
  { label: "Beranda", href: "/", icon: Sparkles },
  { label: "Templates", href: "/templates", hasDropdown: true, icon: LayoutDashboard },
  // { label: "Harga", href: "/pricing", icon: Gift },
  { label: "Tentang", href: "/about", icon: Info },
  { label: "Kontak", href: "/contact", icon: Phone },
];

// Template dropdown items - only Undangan Digital is active
const templateItems = [
  {
    label: "Undangan Digital",
    href: "/templates/undangan",
    icon: Heart,
    description: "Undangan pernikahan, ulang tahun, baby shower & berbagai acara",
    color: "rose",
    badge: "15 Template",
    popular: true,
    active: true
  },
  {
    label: "Website Sekolah",
    href: "/templates/sekolah",
    icon: School,
    description: "Portal sekolah, e-learning, manajemen siswa & pembayaran SPP",
    color: "blue",
    badge: "8 Template",
    popular: false,
    active: false,
    comingSoon: true
  },
  {
    label: "Website Bisnis",
    href: "/templates/bisnis",
    icon: Briefcase,
    description: "Toko online, company profile, restoran, hotel & klinik",
    color: "emerald",
    badge: "12 Template",
    popular: true,
    active: false,
    comingSoon: true
  },
  {
    label: "Sistem Manajemen",
    href: "/templates/manajemen",
    icon: Database,
    description: "Inventory, HRD, keuangan, CRM & project management",
    color: "purple",
    badge: "10 Template",
    popular: false,
    active: false,
    comingSoon: true
  }
];

// Additional menu items for authenticated users
const userMenuItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Pesanan Saya", href: "/dashboard/orders", icon: ShoppingCart },
  { label: "Template Saya", href: "/dashboard/templates", icon: FileText },
  { label: "Profil", href: "/dashboard/profile", icon: Users },
];

export function PublicNavbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [isMobileTemplatesOpen, setIsMobileTemplatesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { totalItems, isCartOpen, openCart, closeCart } = useCart();
  const { user, signOut } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  // Handle hover dropdown with delay
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsTemplatesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsTemplatesOpen(false);
    }, 200);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsTemplatesOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const getColorClasses = (color: string) => {
    const colors = {
      rose: {
        bg: "bg-rose-50 dark:bg-rose-950/20",
        text: "text-rose-600 dark:text-rose-400",
        iconBg: "bg-rose-100 dark:bg-rose-950/40",
        hover: "hover:bg-rose-50 dark:hover:bg-rose-950/30"
      },
      blue: {
        bg: "bg-blue-50 dark:bg-blue-950/20",
        text: "text-blue-600 dark:text-blue-400",
        iconBg: "bg-blue-100 dark:bg-blue-950/40",
        hover: "hover:bg-blue-50 dark:hover:bg-blue-950/30"
      },
      emerald: {
        bg: "bg-emerald-50 dark:bg-emerald-950/20",
        text: "text-emerald-600 dark:text-emerald-400",
        iconBg: "bg-emerald-100 dark:bg-emerald-950/40",
        hover: "hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
      },
      purple: {
        bg: "bg-purple-50 dark:bg-purple-950/20",
        text: "text-purple-600 dark:text-purple-400",
        iconBg: "bg-purple-100 dark:bg-purple-950/40",
        hover: "hover:bg-purple-50 dark:hover:bg-purple-950/30"
      }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };
const handleLogout = async () => {
  // console.log("KELUAR");
    await signOut();
  };
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo - Simplified */}
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg shadow-md">
              <Image src={logo} alt="Eleganzas" className="h-6 w-6" />
            </div>
            <span className="font-cormorant text-xl font-bold tracking-tight text-foreground">
              ELEGANZAS
            </span>
          </Link>

          {/* Desktop Navigation - Minimalist */}
          <nav className="hidden md:flex md:items-center md:gap-1">
            {navItems.map((item) => (
              item.hasDropdown ? (
                <div
                  key={item.href}
                  className="relative"
                  ref={dropdownRef}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={cn(
                      "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                      "hover:text-accent-foreground",
                      pathname.startsWith("/templates") 
                        ? "text-accent-foreground" 
                        : "text-muted-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                    <ChevronDown className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      isTemplatesOpen && "rotate-180"
                    )} />
                  </button>

                  {/* Minimalist Dropdown Menu */}
                  <AnimatePresence>
                    {isTemplatesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full mt-2 w-[320px] overflow-hidden rounded-lg border border-border bg-popover shadow-lg"
                      >
                        <div className="py-2">
                          {templateItems.map((template) => {
                            const Icon = template.icon;
                            const colors = getColorClasses(template.color);
                            
                            if (!template.active) {
                              // Disabled menu item with "Segera" badge
                              return (
                                <div
                                  key={template.href}
                                  className="relative cursor-not-allowed opacity-60"
                                >
                                  <div className="flex items-start gap-3 px-4 py-3">
                                    <div className={cn("rounded-lg p-2", colors.iconBg)}>
                                      <Icon className={cn("h-4 w-4", colors.text)} />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <p className="text-sm font-medium">{template.label}</p>
                                        <Badge 
                                          variant="secondary" 
                                          className="bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 text-[9px] px-1.5"
                                        >
                                          <Clock className="mr-0.5 h-2.5 w-2.5" />
                                          Segera
                                        </Badge>
                                      </div>
                                      <p className="mt-0.5 text-xs text-muted-foreground">
                                        {template.description}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                            
                            // Active menu item
                            return (
                              <Link
                                key={template.href}
                                href={template.href}
                                onClick={() => setIsTemplatesOpen(false)}
                                className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-accent/5"
                              >
                                <div className={cn("rounded-lg p-2", colors.iconBg)}>
                                  <Icon className={cn("h-4 w-4", colors.text)} />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium">{template.label}</p>
                                    <Badge variant="outline" className="text-[9px]">
                                      {template.badge}
                                    </Badge>
                                  </div>
                                  <p className="mt-0.5 text-xs text-muted-foreground">
                                    {template.description}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                          
                          {/* View All Link - Only show active templates count */}
                          <div className="border-t border-border mt-2 pt-2 px-4">
                            <Link
                              href="/templates"
                              onClick={() => setIsTemplatesOpen(false)}
                              className="flex items-center justify-between text-xs font-medium text-accent transition-colors hover:text-accent/80"
                            >
                              <span>Lihat Semua Template</span>
                              <span className="text-xs text-muted-foreground">
                                {templateItems.filter(t => t.active).length} aktif
                              </span>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                    "hover:text-accent-foreground",
                    pathname === item.href 
                      ? "text-accent-foreground" 
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          {/* Right Side Actions - Minimalist */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {/* Theme Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full transition-all duration-200"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Cart Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={openCart} 
              className="relative rounded-full transition-all duration-200"
            >
              <ShoppingCart className="h-4 w-4" />
              {totalItems > 0 && (
                <Badge className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-accent p-0 text-[9px] font-bold text-accent-foreground">
                  {totalItems}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Button>

            {/* Auth Buttons or User Menu - Minimalist */}
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <Button
                  variant="ghost"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="gap-2 rounded-full pl-2 pr-3 transition-all duration-200"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary text-xs font-bold text-white">
                    {user.full_name?.charAt(0) || user.email?.charAt(0) || "U"}
                  </div>
                  <span className="max-w-[100px] truncate text-sm">
                    {user.full_name?.split(" ")[0] || "User"}
                  </span>
                  <ChevronDown className={cn(
                    "h-3 w-3 transition-transform duration-200",
                    isUserMenuOpen && "rotate-180"
                  )} />
                </Button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-lg border border-border bg-popover shadow-lg"
                    >
                      <div className="py-2">
                        <div className="border-b border-border px-4 py-2">
                          <p className="text-sm font-medium">{user.full_name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                        
                        {userMenuItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2 text-sm transition-colors hover:bg-accent/5"
                            >
                              <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                              {item.label}
                            </Link>
                          );
                        })}
                        
                        <div className="border-t border-border mt-1 pt-1">
                          <button
                            onClick={() => {
                              handleLogout();
                              setIsUserMenuOpen(false);
                              // Add logout logic here
                            }}
                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-rose-600 transition-colors hover:bg-rose-50 dark:hover:bg-rose-950/20"
                          >
                            <LogIn className="h-3.5 w-3.5 rotate-180" />
                            Logout
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Button variant="ghost" asChild className="rounded-full">
                  <Link href="/login" className="gap-2">
                    <LogIn className="h-4 w-4" />
                    Masuk
                  </Link>
                </Button>
                <Button variant="default" asChild className="rounded-full shadow-sm">
                  <Link href="/register" className="gap-2">
                    <UserPlus className="h-4 w-4" />
                    Daftar
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={openCart} 
              className="relative rounded-full"
            >
              <ShoppingCart className="h-4 w-4" />
              {totalItems > 0 && (
                <Badge className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-accent p-0 text-[9px]">
                  {totalItems}
                </Badge>
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-full"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu - Minimalist */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-border bg-background md:hidden overflow-hidden"
            >
              <nav className="flex flex-col p-4 gap-1">
                {navItems.map((item) => (
                  item.hasDropdown ? (
                    <div key={item.href}>
                      <button
                        onClick={() => setIsMobileTemplatesOpen(!isMobileTemplatesOpen)}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-accent/5"
                      >
                        <span className="flex items-center gap-3">
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </span>
                        <ChevronDown className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          isMobileTemplatesOpen && "rotate-180"
                        )} />
                      </button>
                      
                      <AnimatePresence>
                        {isMobileTemplatesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-1 ml-6 space-y-1 overflow-hidden"
                          >
                            {templateItems.map((template) => {
                              const Icon = template.icon;
                              const colors = getColorClasses(template.color);
                              
                              if (!template.active) {
                                return (
                                  <div key={template.href} className="flex items-start gap-3 rounded-lg px-3 py-2 opacity-60">
                                    <div className={cn("rounded-lg p-1.5", colors.iconBg)}>
                                      <Icon className={cn("h-3.5 w-3.5", colors.text)} />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <p className="text-sm">{template.label}</p>
                                        <Badge variant="secondary" className="text-[8px] px-1">
                                          Segera
                                        </Badge>
                                      </div>
                                      <p className="text-xs text-muted-foreground line-clamp-1">
                                        {template.description}
                                      </p>
                                    </div>
                                  </div>
                                );
                              }
                              
                              return (
                                <Link
                                  key={template.href}
                                  href={template.href}
                                  onClick={() => {
                                    setIsMobileTemplatesOpen(false);
                                    setIsMobileMenuOpen(false);
                                  }}
                                  className="flex items-start gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-accent/5"
                                >
                                  <div className={cn("rounded-lg p-1.5", colors.iconBg)}>
                                    <Icon className={cn("h-3.5 w-3.5", colors.text)} />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">{template.label}</p>
                                    <p className="text-xs text-muted-foreground line-clamp-1">
                                      {template.description}
                                    </p>
                                  </div>
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-accent/5",
                        pathname === item.href && "bg-accent/5"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  )
                ))}
                
                <div className="my-2 border-t border-border" />
                
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-accent/5"
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </button>
                
                <div className="mt-2 flex flex-col gap-1">
                  {user ? (
                    <>
                      <div className="flex items-center gap-3 rounded-lg bg-accent/5 px-3 py-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary text-xs font-bold text-white">
                          {user.full_name?.charAt(0) || user.email?.charAt(0) || "U"}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{user.full_name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      {userMenuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-accent/5"
                          >
                            <Icon className="h-4 w-4" />
                            {item.label}
                          </Link>
                        );
                      })}
                      <button
                        onClick={() => {
                          // Add logout logic
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-rose-600 transition-colors hover:bg-rose-50 dark:hover:bg-rose-950/20"
                      >
                        <LogIn className="h-4 w-4 rotate-180" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Button variant="ghost" asChild className="w-full justify-start gap-3">
                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                          <LogIn className="h-4 w-4" />
                          Masuk
                        </Link>
                      </Button>
                      <Button variant="default" asChild className="w-full justify-start gap-3 shadow-sm">
                        <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                          <UserPlus className="h-4 w-4" />
                          Daftar
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <CartSidebar isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
}