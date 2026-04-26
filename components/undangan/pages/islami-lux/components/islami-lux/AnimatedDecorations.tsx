import { cn } from "@/lib/utils";

/* ========== ORNAMENT DIVIDER ========== */
export function OrnamentDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-4 py-6", className)}>
      <span className="h-px w-20 bg-primary/40" />
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-primary animate-pulse-glow">
        <path d="M16 2L19 12.5L30 16L19 19.5L16 30L13 19.5L2 16L13 12.5L16 2Z" fill="currentColor" opacity="0.3" />
        <circle cx="16" cy="16" r="4" fill="currentColor" />
      </svg>
      <span className="h-px w-20 bg-primary/40" />
    </div>
  );
}

/* ========== BISMILLAH DECORATIVE ========== */
export function BismillahDecorative({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-3 text-center", className)}>
      <span className="text-xl font-semibold tracking-[0.2em] text-primary/90 sm:text-2xl">
        بِسْمِ اللّهِ الرَّحْمَنِ الرَّحِيمِ
      </span>
      <OrnamentDivider />
    </div>
  );
}

/* ========== FLOATING GEOMETRIC ORNAMENTS ========== */
export function FloatingOrnaments({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <svg className="absolute -left-8 top-20 h-32 w-32 animate-float text-primary/10" viewBox="0 0 100 100">
        <path d="M50 5L95 50L50 95L5 50Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M50 20L80 50L50 80L20 50Z" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.2" />
      </svg>
      <svg className="absolute -right-6 bottom-32 h-28 w-28 animate-float text-primary/10" style={{ animationDelay: "2s" }} viewBox="0 0 100 100">
        <path d="M50 5L95 50L50 95L5 50Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M50 20L80 50L50 80L20 50Z" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      <svg className="absolute right-12 top-12 h-20 w-20 animate-float text-accent/15" style={{ animationDelay: "4s" }} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );
}

/* ========== CORNER FRAME ORNAMENT ========== */
export function CornerFrame({ className }: { className?: string }) {
  return (
    <svg className={cn("absolute h-16 w-16 text-primary/20", className)} viewBox="0 0 64 64" fill="none">
      <path d="M2 2V20M2 2H20" stroke="currentColor" strokeWidth="2" />
      <path d="M2 8V14M2 8H8" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/* ========== GEOMETRIC BORDER ========== */
export function GeometricBorder({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <svg width="100%" height="24" viewBox="0 0 400 24" preserveAspectRatio="none" className="text-primary/30">
        <path d="M0 12 L20 2 L40 12 L60 2 L80 12 L100 2 L120 12 L140 2 L160 12 L180 2 L200 12 L220 2 L240 12 L260 2 L280 12 L300 2 L320 12 L340 2 L360 12 L380 2 L400 12" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M0 12 L20 22 L40 12 L60 22 L80 12 L100 22 L120 12 L140 22 L160 12 L180 22 L200 12 L220 22 L240 12 L260 22 L280 12 L300 22 L320 12 L340 22 L360 12 L380 22 L400 12" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );
}

/* ========== CRESCENT MOON & STAR ========== */
export function CrescentStar({ className }: { className?: string }) {
  return (
    <svg className={cn("h-12 w-12 text-primary/40", className)} viewBox="0 0 48 48" fill="none">
      <path d="M36 8C36 8 28 14 28 24C28 34 36 40 36 40C26 40 18 32 18 22C18 12 26 8 36 8Z" fill="currentColor" opacity="0.3" />
      <path d="M38 6L40 12L46 12L41 16L43 22L38 18L33 22L35 16L30 12L36 12L38 6Z" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

/* ========== FLORAL ARABESQUE ========== */
export function FloralArabesque({ className }: { className?: string }) {
  return (
    <svg className={cn("h-20 w-full text-primary/20", className)} viewBox="0 0 200 40" preserveAspectRatio="none">
      <path d="M0 20 Q25 5 50 20 T100 20 T150 20 T200 20" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M0 20 Q25 35 50 20 T100 20 T150 20 T200 20" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="50" cy="20" r="3" fill="currentColor" opacity="0.4" />
      <circle cx="100" cy="20" r="3" fill="currentColor" opacity="0.4" />
      <circle cx="150" cy="20" r="3" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

/* ========== ROTATING MANDALA ========== */
export function RotatingMandala({ className }: { className?: string }) {
  return (
    <svg className={cn("h-40 w-40 animate-rotate-slow text-primary/10", className)} viewBox="0 0 100 100">
      <path d="M50 5 L55 20 L70 15 L60 30 L80 35 L60 40 L75 55 L55 50 L60 70 L45 55 L35 75 L35 55 L15 60 L30 45 L10 40 L30 35 L20 20 L35 25 L40 10 L45 25 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.15" />
    </svg>
  );
}

