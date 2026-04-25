"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Search, Filter, ChevronDown, Sparkles, Star, Clock, 
  Check, ArrowRight, X, Briefcase, ShoppingBag, Store,
  CreditCard, Truck, Users, Eye, TrendingUp, Award,
  Building, Coffee, Hotel, Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Data Template Bisnis
const businessTemplates = [
  {
    id: 1,
    name: "UMKM Store",
    slug: "umkm-store",
    category: "ecommerce",
    type: "standard",
    price: 899000,
    originalPrice: 1799000,
    rating: 4.8,
    reviews: 342,
    sales: 2456,
    isPopular: true,
    isNew: false,
    isBestSeller: true,
    features: ["Product Catalog", "Cart & Checkout", "Payment Gateway", "Order Management", "Invoice"],
    duration: "5 hari",
    demoUrl: "/demo/umkm-store"
  },
  {
    id: 2,
    name: "Company Profile",
    slug: "company-profile",
    category: "company",
    type: "standard",
    price: 599000,
    originalPrice: 1199000,
    rating: 4.7,
    reviews: 234,
    sales: 1234,
    isPopular: false,
    isNew: false,
    isBestSeller: false,
    features: ["Portfolio Gallery", "Team Section", "Testimonials", "Contact Form", "Blog"],
    duration: "3 hari",
    demoUrl: "/demo/company-profile"
  },
  {
    id: 3,
    name: "Resto POS",
    slug: "resto-pos",
    category: "restaurant",
    type: "premium",
    price: 1299000,
    originalPrice: 2499000,
    rating: 4.9,
    reviews: 189,
    sales: 567,
    isPopular: true,
    isNew: true,
    isBestSeller: false,
    features: ["Menu Management", "Order System", "Reservation", "POS Integration", "Kitchen Display"],
    duration: "7 hari",
    demoUrl: "/demo/resto-pos"
  },
  {
    id: 4,
    name: "Hotel Booking",
    slug: "hotel-booking",
    category: "hotel",
    type: "premium",
    price: 1999000,
    originalPrice: 3999000,
    rating: 4.8,
    reviews: 98,
    sales: 234,
    isPopular: false,
    isNew: false,
    isBestSeller: false,
    features: ["Room Booking", "Payment Gateway", "Calendar System", "Room Management", "Guest Check-in"],
    duration: "10 hari",
    demoUrl: "/demo/hotel-booking"
  },
  {
    id: 5,
    name: "Clinic Medical",
    slug: "clinic-medical",
    category: "medical",
    type: "premium",
    price: 1499000,
    originalPrice: 2999000,
    rating: 4.8,
    reviews: 156,
    sales: 345,
    isPopular: false,
    isNew: true,
    isBestSeller: false,
    features: ["Appointment", "Patient Record", "Online Queue", "Doctor Schedule", "Medical History"],
    duration: "7 hari",
    demoUrl: "/demo/clinic-medical"
  },
  {
    id: 6,
    name: "Wedding Organizer",
    slug: "wedding-organizer",
    category: "service",
    type: "standard",
    price: 799000,
    originalPrice: 1599000,
    rating: 4.7,
    reviews: 123,
    sales: 456,
    isPopular: true,
    isNew: false,
    isBestSeller: false,
    features: ["Package Showcase", "Booking System", "Portfolio Gallery", "Testimonials", "Inquiry Form"],
    duration: "5 hari",
    demoUrl: "/demo/wedding-organizer"
  },
  {
    id: 7,
    name: "Coworking Space",
    slug: "coworking-space",
    category: "service",
    type: "premium",
    price: 999000,
    originalPrice: 1999000,
    rating: 4.6,
    reviews: 89,
    sales: 234,
    isPopular: false,
    isNew: false,
    isBestSeller: false,
    features: ["Space Booking", "Membership Plan", "Facility Management", "Event Calendar", "Community Forum"],
    duration: "7 hari",
    demoUrl: "/demo/coworking"
  },
  {
    id: 8,
    name: "Fitness Center",
    slug: "fitness-center",
    category: "gym",
    type: "standard",
    price: 699000,
    originalPrice: 1399000,
    rating: 4.7,
    reviews: 156,
    sales: 345,
    isPopular: false,
    isNew: true,
    isBestSeller: false,
    features: ["Class Schedule", "Trainer Profile", "Membership", "Booking System", "Progress Tracker"],
    duration: "5 hari",
    demoUrl: "/demo/fitness-center"
  },
  {
    id: 9,
    name: "Salon & Spa",
    slug: "salon-spa",
    category: "beauty",
    type: "standard",
    price: 649000,
    originalPrice: 1299000,
    rating: 4.8,
    reviews: 234,
    sales: 567,
    isPopular: true,
    isNew: false,
    isBestSeller: false,
    features: ["Service Menu", "Booking System", "Price List", "Gallery", "Loyalty Program"],
    duration: "5 hari",
    demoUrl: "/demo/salon-spa"
  },
  {
    id: 10,
    name: "Event Organizer",
    slug: "event-organizer",
    category: "service",
    type: "premium",
    price: 899000,
    originalPrice: 1799000,
    rating: 4.7,
    reviews: 123,
    sales: 345,
    isPopular: false,
    isNew: false,
    isBestSeller: false,
    features: ["Event Gallery", "Package List", "Booking System", "Client Testimonials", "Blog"],
    duration: "5 hari",
    demoUrl: "/demo/event-organizer"
  },
  {
    id: 11,
    name: "Property Agency",
    slug: "property-agency",
    category: "property",
    type: "premium",
    price: 1499000,
    originalPrice: 2999000,
    rating: 4.8,
    reviews: 98,
    sales: 234,
    isPopular: false,
    isNew: true,
    isBestSeller: false,
    features: ["Property Listing", "Agent Profile", "Virtual Tour", "Inquiry Form", "Mortgage Calculator"],
    duration: "7 hari",
    demoUrl: "/demo/property-agency"
  },
  {
    id: 12,
    name: "Digital Agency",
    slug: "digital-agency",
    category: "company",
    type: "standard",
    price: 749000,
    originalPrice: 1499000,
    rating: 4.9,
    reviews: 189,
    sales: 567,
    isPopular: true,
    isNew: false,
    isBestSeller: true,
    features: ["Service Showcase", "Portfolio", "Team Member", "Case Study", "Contact Form"],
    duration: "5 hari",
    demoUrl: "/demo/digital-agency"
  }
];

const categories = [
  { id: "all", label: "Semua", count: 12 },
  { id: "ecommerce", label: "E-Commerce", count: 1 },
  { id: "company", label: "Company Profile", count: 2 },
  { id: "restaurant", label: "Restoran", count: 1 },
  { id: "hotel", label: "Hotel", count: 1 },
  { id: "medical", label: "Klinik", count: 1 },
  { id: "service", label: "Service", count: 3 },
  { id: "property", label: "Properti", count: 1 },
  { id: "beauty", label: "Beauty", count: 1 }
];

const sortOptions = [
  { id: "popular", label: "Terpopuler" },
  { id: "newest", label: "Terbaru" },
  { id: "price-low", label: "Harga Termurah" },
  { id: "price-high", label: "Harga Termahal" },
  { id: "rating", label: "Rating Tertinggi" }
];

const priceRanges = [
  { id: "all", label: "Semua", min: 0, max: Infinity },
  { id: "under500", label: "Under Rp 500rb", min: 0, max: 500000 },
  { id: "500-1m", label: "Rp 500rb - 1jt", min: 500000, max: 1000000 },
  { id: "1m-2m", label: "Rp 1jt - 2jt", min: 1000000, max: 2000000 },
  { id: "above2m", label: "Above Rp 2jt", min: 2000000, max: Infinity }
];

export default function BisnisPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const filteredTemplates = businessTemplates.filter(template => {
    if (selectedCategory !== "all" && template.category !== selectedCategory) return false;
    if (searchQuery && !template.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    const range = priceRanges.find(r => r.id === selectedPriceRange);
    if (range && (template.price < range.min || template.price > range.max)) return false;
    return true;
  });

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case "popular": return b.sales - a.sales;
      case "newest": return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "rating": return b.rating - a.rating;
      default: return 0;
    }
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(price);
  };

  const activeFiltersCount = [
    selectedCategory !== "all",
    searchQuery !== "",
    selectedPriceRange !== "all"
  ].filter(Boolean).length;

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSelectedPriceRange("all");
    setSortBy("popular");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-br from-emerald-500/5 via-background to-teal-500/5 px-4 py-8 sm:py-12 md:py-16">
        <div className="mx-auto max-w-7xl text-center">
          <Badge className="mb-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Briefcase className="mr-1 h-3 w-3" />
            Website Bisnis
          </Badge>
          <h1 className="font-cormorant text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
            Template Website Bisnis
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Tingkatkan bisnis Anda dengan website profesional. Mulai dari UMKM hingga enterprise.
          </p>

          <div className="mx-auto mt-6 max-w-xl sm:mt-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari template bisnis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 pl-9 pr-20 text-sm sm:h-11"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category & Filter Section */}
      <section className="sticky top-16 z-30 border-b border-border bg-background/95 backdrop-blur px-4">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-x-auto py-2 md:py-3">
            <div className="flex gap-1.5 min-w-max">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "shrink-0 gap-1.5 text-xs sm:text-sm",
                    selectedCategory === category.id && "bg-emerald-500 hover:bg-emerald-600"
                  )}
                >
                  {category.label}
                  <Badge variant="secondary" className="ml-1 text-[10px]">{category.count}</Badge>
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 py-2 pb-3">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="relative h-8 gap-1 text-xs"
              >
                <Filter className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Filter</span>
                {activeFiltersCount > 0 && (
                  <Badge className="absolute -right-1.5 -top-1.5 h-4 w-4 rounded-full bg-emerald-500 p-0 text-[10px]">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>

              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="h-8 gap-1 text-xs"
                >
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span className="hidden xs:inline">{sortOptions.find(s => s.id === sortBy)?.label}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
                <AnimatePresence>
                  {showSortDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 top-full z-50 mt-1 w-36 rounded-lg border border-border bg-popover shadow-lg"
                    >
                      {sortOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            setSortBy(option.id);
                            setShowSortDropdown(false);
                          }}
                          className={cn(
                            "flex w-full items-center px-3 py-1.5 text-xs hover:bg-accent",
                            sortBy === option.id && "bg-accent text-accent-foreground"
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">{sortedTemplates.length}</span> template
            </p>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-border py-3"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                  <div className="flex-1">
                    <label className="mb-1.5 block text-xs font-medium">Harga</label>
                    <div className="flex flex-wrap gap-1.5">
                      {priceRanges.map((range) => (
                        <Button
                          key={range.id}
                          variant={selectedPriceRange === range.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedPriceRange(range.id)}
                          className={cn("h-7 text-xs", selectedPriceRange === range.id && "bg-emerald-500")}
                        >
                          {range.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                {activeFiltersCount > 0 && (
                  <div className="mt-3 flex justify-end">
                    <Button variant="ghost" size="sm" onClick={resetFilters} className="h-7 text-xs">
                      Reset Filter
                    </Button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="px-4 py-6 sm:py-8 md:py-10">
        <div className="mx-auto max-w-7xl">
          {sortedTemplates.length === 0 ? (
            <div className="py-12 text-center">
              <Briefcase className="mx-auto h-10 w-10 text-muted-foreground" />
              <h3 className="mt-3 text-base font-semibold">Tidak ada template</h3>
              <Button onClick={resetFilters} className="mt-4 bg-emerald-500 hover:bg-emerald-600">
                Reset Filter
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sortedTemplates.map((template, idx) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950/30 dark:to-teal-950/30">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Briefcase className="h-10 w-10 text-emerald-400/50" />
                      </div>
                      <div className="absolute left-2 top-2 flex gap-1">
                        {template.isBestSeller && <Badge className="bg-amber-500 text-[10px]">Best Seller</Badge>}
                        {template.isNew && <Badge className="bg-emerald-500 text-[10px]">New</Badge>}
                      </div>
                    </div>
                    <CardHeader className="p-3 pb-1">
                      <CardTitle className="text-sm font-semibold">{template.name}</CardTitle>
                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="capitalize">{template.category}</span>
                        <span>•</span>
                        <span>{template.sales} terjual</span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <div className="flex flex-wrap gap-1">
                        {template.features.slice(0, 3).map((feature, i) => (
                          <Badge key={i} variant="outline" className="text-[10px]">{feature}</Badge>
                        ))}
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div>
                          <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                            {formatPrice(template.price)}
                          </span>
                          <span className="ml-1 text-[10px] text-muted-foreground line-through">
                            {formatPrice(template.originalPrice)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{template.duration}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2 p-3 pt-0">
                      <Button asChild variant="outline" size="sm" className="h-8 flex-1 text-xs">
                        <Link href={`/templates/bisnis/${template.id}`}>Detail</Link>
                      </Button>
                      <Button asChild size="sm" className="h-8 flex-1 bg-emerald-500 text-xs hover:bg-emerald-600">
                        <Link href={template.demoUrl}>Demo</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}