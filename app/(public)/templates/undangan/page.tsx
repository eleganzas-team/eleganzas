"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Search, Filter, ChevronDown, Sparkles, Star, Clock, 
  Check, ArrowRight, X, Heart, Calendar, MapPin, Users,
  Music, Gift, Camera, Eye, TrendingUp, Award, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Data Template Undangan
const invitationTemplates = [
  {
    id: 1,
    name: "Eternal Vows",
    slug: "eternal-vows",
    category: "pernikahan",
    style: "elegan",
    price: 299000,
    originalPrice: 599000,
    rating: 4.9,
    reviews: 234,
    sales: 1234,
    isPopular: true,
    isNew: false,
    isBestSeller: true,
    features: ["RSVP Online", "Galeri Foto", "Maps Lokasi", "Amplop Digital", "Background Music", "Countdown Timer"],
    colors: ["Gold", "Putih", "Burgundy"],
    duration: "3 hari",
    demoUrl: "/demo/wedding-elegant"
  },
  {
    id: 2,
    name: "Rustic Love",
    slug: "rustic-love",
    category: "pernikahan",
    style: "rustic",
    price: 249000,
    originalPrice: 499000,
    rating: 4.7,
    reviews: 189,
    sales: 892,
    isPopular: false,
    isNew: false,
    isBestSeller: false,
    features: ["RSVP Online", "Galeri Foto", "Maps Lokasi", "Story of Us", "Guest Book", "Photo Booth"],
    colors: ["Coklat", "Krem", "Hijau"],
    duration: "3 hari",
    demoUrl: "/demo/wedding-rustic"
  },
  {
    id: 3,
    name: "Modern Minimalis",
    slug: "modern-minimalis",
    category: "pernikahan",
    style: "modern",
    price: 349000,
    originalPrice: 699000,
    rating: 4.8,
    reviews: 156,
    sales: 567,
    isPopular: true,
    isNew: true,
    isBestSeller: false,
    features: ["RSVP Online", "Galeri Video", "Live Streaming", "Digital Gift", "E-Ticket", "Analytics"],
    colors: ["Hitam", "Putih", "Abu-abu"],
    duration: "3 hari",
    demoUrl: "/demo/wedding-modern"
  },
  {
    id: 4,
    name: "Glamour Gold",
    slug: "glamour-gold",
    category: "pernikahan",
    style: "mewah",
    price: 499000,
    originalPrice: 999000,
    rating: 4.9,
    reviews: 98,
    sales: 345,
    isPopular: false,
    isNew: false,
    isBestSeller: true,
    features: ["3D Animation", "Virtual Tour", "AI Photo", "Premium Music", "Custom Domain", "Priority Support"],
    colors: ["Emas", "Hitam", "Maroon"],
    duration: "5 hari",
    demoUrl: "/demo/wedding-gold"
  },
  {
    id: 5,
    name: "Happy Birthday",
    slug: "happy-birthday",
    category: "ulang tahun",
    style: "fun",
    price: 199000,
    originalPrice: 399000,
    rating: 4.8,
    reviews: 278,
    sales: 2456,
    isPopular: true,
    isNew: false,
    isBestSeller: true,
    features: ["Countdown", "Galeri Foto", "Wishlist", "Virtual Gift", "Party Playlist", "Games"],
    colors: ["Pelangi", "Kuning", "Merah Muda"],
    duration: "2 hari",
    demoUrl: "/demo/birthday-fun"
  },
  {
    id: 6,
    name: "Sweet 17",
    slug: "sweet-17",
    category: "ulang tahun",
    style: "glamour",
    price: 249000,
    originalPrice: 499000,
    rating: 4.7,
    reviews: 189,
    sales: 1123,
    isPopular: false,
    isNew: true,
    isBestSeller: false,
    features: ["Photo Gallery", "Video Montage", "Guest Book", "Birthday Wishes", "Donation Link", "Social Share"],
    colors: ["Rose Gold", "Putih", "Merah Muda"],
    duration: "2 hari",
    demoUrl: "/demo/birthday-sweet"
  },
  {
    id: 7,
    name: "Milestone 50",
    slug: "milestone-50",
    category: "ulang tahun",
    style: "elegan",
    price: 229000,
    originalPrice: 459000,
    rating: 4.6,
    reviews: 67,
    sales: 234,
    isPopular: false,
    isNew: false,
    isBestSeller: false,
    features: ["Timeline", "Photo Gallery", "Memory Video", "Guest Book", "Digital Card"],
    colors: ["Emas", "Navy", "Silver"],
    duration: "2 hari",
    demoUrl: "/demo/birthday-milestone"
  },
  {
    id: 8,
    name: "Corporate Summit",
    slug: "corporate-summit",
    category: "corporate",
    style: "formal",
    price: 599000,
    originalPrice: 1199000,
    rating: 4.8,
    reviews: 89,
    sales: 456,
    isPopular: true,
    isNew: false,
    isBestSeller: false,
    features: ["Registration", "QR Code", "Live Stream", "E-Certificate", "Speaker Profile", "Sponsor Section"],
    colors: ["Biru", "Putih", "Abu-abu"],
    duration: "5 hari",
    demoUrl: "/demo/corporate-summit"
  },
  {
    id: 9,
    name: "Grand Opening",
    slug: "grand-opening",
    category: "corporate",
    style: "professional",
    price: 449000,
    originalPrice: 899000,
    rating: 4.7,
    reviews: 45,
    sales: 234,
    isPopular: false,
    isNew: true,
    isBestSeller: false,
    features: ["Event Schedule", "Guest List", "Media Kit", "Press Release", "Gallery", "Contact Form"],
    colors: ["Merah", "Emas", "Putih"],
    duration: "4 hari",
    demoUrl: "/demo/corporate-opening"
  },
  {
    id: 10,
    name: "Product Launch",
    slug: "product-launch",
    category: "corporate",
    style: "modern",
    price: 549000,
    originalPrice: 1099000,
    rating: 4.7,
    reviews: 67,
    sales: 345,
    isPopular: false,
    isNew: false,
    isBestSeller: false,
    features: ["Product Showcase", "Countdown", "Live Demo", "Order Form", "Testimonials", "Media Gallery"],
    colors: ["Hitam", "Emas", "Putih"],
    duration: "5 hari",
    demoUrl: "/demo/corporate-launch"
  },
  {
    id: 11,
    name: "Baby Shower",
    slug: "baby-shower",
    category: "baby",
    style: "cute",
    price: 179000,
    originalPrice: 359000,
    rating: 4.8,
    reviews: 156,
    sales: 789,
    isPopular: true,
    isNew: false,
    isBestSeller: true,
    features: ["Gender Reveal", "Wishlist", "Baby Registry", "Photo Gallery", "Guest Book", "Virtual Shower"],
    colors: ["Baby Blue", "Pink", "Putih"],
    duration: "2 hari",
    demoUrl: "/demo/baby-shower"
  },
  {
    id: 12,
    name: "Welcome Baby",
    slug: "welcome-baby",
    category: "baby",
    style: "modern",
    price: 199000,
    originalPrice: 399000,
    rating: 4.7,
    reviews: 98,
    sales: 456,
    isPopular: false,
    isNew: true,
    isBestSeller: false,
    features: ["Baby Timeline", "Photo Album", "Name Reveal", "Birth Announcement", "Digital Card", "Memory Book"],
    colors: ["Pastel", "Putih", "Krem"],
    duration: "2 hari",
    demoUrl: "/demo/baby-welcome"
  },
  {
    id: 13,
    name: "Graduation Day",
    slug: "graduation-day",
    category: "wisuda",
    style: "formal",
    price: 249000,
    originalPrice: 499000,
    rating: 4.6,
    reviews: 123,
    sales: 567,
    isPopular: false,
    isNew: false,
    isBestSeller: false,
    features: ["Countdown", "Gallery", "Achievements", "Guest Book", "Digital Card", "Social Share"],
    colors: ["Maroon", "Hitam", "Emas"],
    duration: "3 hari",
    demoUrl: "/demo/graduation"
  },
  {
    id: 14,
    name: "Engagement Party",
    slug: "engagement-party",
    category: "tunangan",
    style: "romantic",
    price: 279000,
    originalPrice: 559000,
    rating: 4.8,
    reviews: 89,
    sales: 345,
    isPopular: true,
    isNew: false,
    isBestSeller: false,
    features: ["Love Story", "Photo Gallery", "RSVP", "Wishlist", "Virtual Gift", "Countdown"],
    colors: ["Rose Gold", "Putih", "Merah Muda"],
    duration: "3 hari",
    demoUrl: "/demo/engagement"
  },
  {
    id: 15,
    name: "Anniversary",
    slug: "anniversary",
    category: "anniversary",
    style: "elegant",
    price: 229000,
    originalPrice: 459000,
    rating: 4.7,
    reviews: 67,
    sales: 234,
    isPopular: false,
    isNew: true,
    isBestSeller: false,
    features: ["Timeline", "Photo Gallery", "Memory Video", "Guest Book", "Virtual Toast", "Digital Card"],
    colors: ["Emas", "Silver", "Putih"],
    duration: "2 hari",
    demoUrl: "/demo/anniversary"
  }
];

const categories = [
  { id: "all", label: "Semua", count: 15 },
  { id: "pernikahan", label: "Pernikahan", count: 4 },
  { id: "ulang tahun", label: "Ulang Tahun", count: 3 },
  { id: "corporate", label: "Corporate", count: 3 },
  { id: "baby", label: "Baby Shower", count: 2 },
  { id: "tunangan", label: "Tunangan", count: 1 },
  { id: "wisuda", label: "Wisuda", count: 1 },
  { id: "anniversary", label: "Anniversary", count: 1 }
];

const styles = [
  { id: "all", label: "Semua Style" },
  { id: "elegan", label: "Elegan" },
  { id: "modern", label: "Modern" },
  { id: "rustic", label: "Rustic" },
  { id: "mewah", label: "Mewah" },
  { id: "fun", label: "Fun" },
  { id: "cute", label: "Cute" },
  { id: "formal", label: "Formal" },
  { id: "romantic", label: "Romantic" }
];

const sortOptions = [
  { id: "popular", label: "Terpopuler" },
  { id: "newest", label: "Terbaru" },
  { id: "price-low", label: "Harga Termurah" },
  { id: "price-high", label: "Harga Termahal" },
  { id: "rating", label: "Rating Tertinggi" }
];

const priceRanges = [
  { id: "all", label: "Semua Harga", min: 0, max: Infinity },
  { id: "under200", label: "Under Rp 200rb", min: 0, max: 200000 },
  { id: "200-300", label: "Rp 200rb - Rp 300rb", min: 200000, max: 300000 },
  { id: "300-400", label: "Rp 300rb - Rp 400rb", min: 300000, max: 400000 },
  { id: "above400", label: "Above Rp 400rb", min: 400000, max: Infinity }
];

export default function UndanganPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStyle, setSelectedStyle] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filteredTemplates = invitationTemplates.filter(template => {
    if (selectedCategory !== "all" && template.category !== selectedCategory) return false;
    if (selectedStyle !== "all" && template.style !== selectedStyle) return false;
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
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const activeFiltersCount = [
    selectedCategory !== "all",
    selectedStyle !== "all",
    searchQuery !== "",
    selectedPriceRange !== "all"
  ].filter(Boolean).length;

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedStyle("all");
    setSearchQuery("");
    setSelectedPriceRange("all");
    setSortBy("popular");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-br from-rose-500/5 via-background to-amber-500/5 px-4 py-8 sm:py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Badge className="mb-3 bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <Heart className="mr-1 h-3 w-3" />
              Undangan Digital
            </Badge>
            <h1 className="font-cormorant text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
              Template Undangan Digital
            </h1>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Pilih template undangan digital untuk momen spesial Anda. Elegant, modern, dan penuh fitur.
            </p>
          </motion.div>

          {/* Search Bar */}
          <div className="mx-auto mt-6 max-w-xl sm:mt-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari template undangan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 pl-9 pr-20 text-sm sm:h-11"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs - Horizontal Scroll on Mobile */}
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
                    selectedCategory === category.id && "bg-rose-500 hover:bg-rose-600"
                  )}
                >
                  {category.label}
                  <Badge variant="secondary" className="ml-1 text-[10px]">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2 py-2 pb-3">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="relative h-8 gap-1 text-xs sm:h-9"
              >
                <Filter className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Filter</span>
                {activeFiltersCount > 0 && (
                  <Badge className="absolute -right-1.5 -top-1.5 h-4 w-4 rounded-full bg-rose-500 p-0 text-[10px]">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>

              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="h-8 gap-1 text-xs sm:h-9"
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

            <p className="text-xs text-muted-foreground sm:text-sm">
              <span className="font-semibold text-foreground">{sortedTemplates.length}</span> template
            </p>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-border py-3"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                  {/* Style Filter */}
                  <div className="flex-1">
                    <label className="mb-1.5 block text-xs font-medium sm:text-sm">Style</label>
                    <div className="flex flex-wrap gap-1.5">
                      {styles.map((style) => (
                        <Button
                          key={style.id}
                          variant={selectedStyle === style.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedStyle(style.id)}
                          className={cn("h-7 text-xs", selectedStyle === style.id && "bg-rose-500")}
                        >
                          {style.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div className="flex-1">
                    <label className="mb-1.5 block text-xs font-medium sm:text-sm">Harga</label>
                    <div className="flex flex-wrap gap-1.5">
                      {priceRanges.map((range) => (
                        <Button
                          key={range.id}
                          variant={selectedPriceRange === range.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedPriceRange(range.id)}
                          className={cn("h-7 text-xs", selectedPriceRange === range.id && "bg-rose-500")}
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 text-center sm:py-16"
            >
              <Heart className="mx-auto h-10 w-10 text-muted-foreground sm:h-12 sm:w-12" />
              <h3 className="mt-3 text-base font-semibold sm:mt-4 sm:text-lg">Tidak ada template</h3>
              <p className="mt-1 text-sm text-muted-foreground">Coba ubah filter pencarian Anda</p>
              <Button onClick={resetFilters} className="mt-4 bg-rose-500 hover:bg-rose-600">
                Reset Filter
              </Button>
            </motion.div>
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
                    {/* Image Placeholder */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-rose-100 to-amber-100 dark:from-rose-950/30 dark:to-amber-950/30">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Heart className="h-10 w-10 text-rose-400/50" />
                      </div>
                      <div className="absolute left-2 top-2 flex gap-1">
                        {template.isBestSeller && (
                          <Badge className="bg-amber-500 text-[10px] text-white">Best Seller</Badge>
                        )}
                        {template.isNew && (
                          <Badge className="bg-emerald-500 text-[10px] text-white">New</Badge>
                        )}
                      </div>
                    </div>

                    <CardHeader className="p-3 pb-1 sm:p-4 sm:pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-sm font-semibold sm:text-base">{template.name}</CardTitle>
                        <div className="flex items-center gap-0.5">
                          <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                          <span className="text-xs font-medium">{template.rating}</span>
                        </div>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{template.category}</span>
                        <span>•</span>
                        <span>{template.style}</span>
                        <span>•</span>
                        <span>{template.sales} terjual</span>
                      </div>
                    </CardHeader>

                    <CardContent className="p-3 pt-0 sm:p-4 sm:pt-0">
                      <div className="flex flex-wrap gap-1">
                        {template.features.slice(0, 3).map((feature, i) => (
                          <Badge key={i} variant="outline" className="text-[10px] sm:text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {template.features.length > 3 && (
                          <Badge variant="outline" className="text-[10px] sm:text-xs">
                            +{template.features.length - 3}
                          </Badge>
                        )}
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div>
                          <span className="text-base font-bold text-rose-600 dark:text-rose-400 sm:text-lg">
                            {formatPrice(template.price)}
                          </span>
                          <span className="ml-1 text-[10px] text-muted-foreground line-through sm:text-xs">
                            {formatPrice(template.originalPrice)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground sm:text-xs">
                          <Clock className="h-3 w-3" />
                          <span>{template.duration}</span>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="flex gap-2 p-3 pt-0 sm:p-4 sm:pt-0">
                      <Button asChild variant="outline" size="sm" className="h-8 flex-1 text-xs sm:h-9">
                        <Link href={`/templates/undangan/${template.id}`}>Detail</Link>
                      </Button>
                      <Button asChild size="sm" className="h-8 flex-1 bg-rose-500 text-xs hover:bg-rose-600 sm:h-9">
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