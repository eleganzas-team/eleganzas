"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Search, Filter, ChevronDown, Sparkles, Star, Clock, 
  Check, ArrowRight, X, Heart, Calendar, MapPin, Users,
  Music, Gift, Camera, Eye, TrendingUp, Award, Download,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { templateService } from "@/services/template.service";

// Interface untuk template dari database
interface Template {
  id?: string;
  name?: string;
  tagline?: string | null;
  description?: string | null;
  price?: number;
  type_template?: string;
  category?: string;
  tags?: string[] | null;
  theme?: string | null;
  thumbnail?: string | null;
  images?: string[] | null;
  features?: string[] | null;
  demo_url?: string | null;
  rating?: number;
  sales?: number;
  created_at?: string;
  updated_at?: string;
}

const categories = [
  { id: "all", label: "Semua" },
  { id: "pernikahan", label: "Pernikahan" },
  { id: "ulang tahun", label: "Ulang Tahun" },
  { id: "corporate", label: "Corporate" },
  { id: "baby", label: "Baby Shower" },
  { id: "tunangan", label: "Tunangan" },
  { id: "wisuda", label: "Wisuda" },
  { id: "anniversary", label: "Anniversary" }
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
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStyle, setSelectedStyle] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Fetch templates from database
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const data = await templateService.getAll();
        setTemplates(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching templates:", err);
        setError("Gagal memuat template. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Get category counts
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === "all") return templates.length;
    return templates.filter(t => t.category?.toLowerCase() === categoryId).length;
  };

  const filteredTemplates = templates.filter(template => {
    // Category filter
    if (selectedCategory !== "all" && template.category?.toLowerCase() !== selectedCategory) return false;
    
    // Style filter (menggunakan theme atau tags)
    if (selectedStyle !== "all") {
      const templateStyle = template.theme?.toLowerCase() || "";
      const hasStyle = template.tags?.some(tag => tag.toLowerCase() === selectedStyle) || 
                      templateStyle === selectedStyle;
      if (!hasStyle) return false;
    }
    
    // Search query
    if (searchQuery && !template.name?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    // Price range filter
    const range = priceRanges.find(r => r.id === selectedPriceRange);
    const price = template.price || 0;
    if (range && (price < range.min || price > range.max)) return false;
    
    return true;
  });

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case "popular": return (b.sales || 0) - (a.sales || 0);
      case "newest": return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      case "price-low": return (a.price || 0) - (b.price || 0);
      case "price-high": return (b.price || 0) - (a.price || 0);
      case "rating": return (b.rating || 0) - (a.rating || 0);
      default: return 0;
    }
  });

  const formatPrice = (price: number = 0) => {
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

  // Get unique styles from templates for dynamic style options
  const getUniqueStyles = () => {
    const stylesSet = new Set<string>();
    templates.forEach(template => {
      if (template.theme) stylesSet.add(template.theme);
      template.tags?.forEach(tag => stylesSet.add(tag));
    });
    return Array.from(stylesSet).map(style => ({ id: style.toLowerCase(), label: style }));
  };

  const dynamicStyles = getUniqueStyles();
  const displayStyles = dynamicStyles.length > 0 ? dynamicStyles : styles;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-rose-500" />
          <p className="mt-2 text-sm text-muted-foreground">Memuat template...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Heart className="mx-auto h-10 w-10 text-rose-500" />
          <h3 className="mt-3 text-base font-semibold">Error</h3>
          <p className="mt-1 text-sm text-muted-foreground">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4 bg-rose-500 hover:bg-rose-600">
            Coba Lagi
          </Button>
        </div>
      </div>
    );
  }

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
                    {getCategoryCount(category.id)}
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
                      {displayStyles.map((style) => (
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
                    {/* Image/Thumbnail */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-rose-100 to-amber-100 dark:from-rose-950/30 dark:to-amber-950/30">
                      {template.thumbnail ? (
                        <img 
                          src={template.thumbnail} 
                          alt={template.name}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Heart className="h-10 w-10 text-rose-400/50" />
                        </div>
                      )}
                      <div className="absolute left-2 top-2 flex gap-1">
                        {template.sales && template.sales > 500 && (
                          <Badge className="bg-amber-500 text-[10px] text-white">Best Seller</Badge>
                        )}
                        {template.created_at && new Date(template.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) && (
                          <Badge className="bg-emerald-500 text-[10px] text-white">New</Badge>
                        )}
                      </div>
                    </div>

                    <CardHeader className="p-3 pb-1 sm:p-4 sm:pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-sm font-semibold sm:text-base">
                          {template.name || "Template Undangan"}
                        </CardTitle>
                        <div className="flex items-center gap-0.5">
                          <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                          <span className="text-xs font-medium">{template.rating || 0}</span>
                        </div>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{template.type_template || template.category || "Umum"}</span>
                        {template.theme && (
                          <>
                            <span>•</span>
                            <span>{template.theme}</span>
                          </>
                        )}
                        <span>•</span>
                        <span>{template.sales || 0} terjual</span>
                      </div>
                    </CardHeader>

                    <CardContent className="p-3 pt-0 sm:p-4 sm:pt-0">
                      <div className="flex flex-wrap gap-1">
                        {(template.features || []).slice(0, 3).map((feature, i) => (
                          <Badge key={i} variant="outline" className="text-[10px] sm:text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {(template.features || []).length > 3 && (
                          <Badge variant="outline" className="text-[10px] sm:text-xs">
                            +{(template.features || []).length - 3}
                          </Badge>
                        )}
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div>
                          <span className="text-base font-bold text-rose-600 dark:text-rose-400 sm:text-lg">
                            {formatPrice(template.price)}
                          </span>
                          {template.price && (
                            <span className="ml-1 text-[10px] text-muted-foreground line-through sm:text-xs">
                              {formatPrice(template.price * 2)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground sm:text-xs">
                          <Clock className="h-3 w-3" />
                          <span>3 hari</span>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="flex gap-2 p-3 pt-0 sm:p-4 sm:pt-0">
                      <Button asChild variant="outline" size="sm" className="h-8 flex-1 text-xs sm:h-9">
                        <Link href={`/templates/undangan/${template.id}`}>Detail</Link>
                      </Button>
                      <Button asChild size="sm" className="h-8 flex-1 bg-rose-500 text-xs hover:bg-rose-600 sm:h-9">
                        <Link href={process.env.NEXT_PUBLIC_BASE_URL? process.env.NEXT_PUBLIC_BASE_URL+template.demo_url : "#"} target="_blank">Demo</Link>
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