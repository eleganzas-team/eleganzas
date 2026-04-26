import { useState } from "react";
import { motion } from "framer-motion";
import { ImagePlus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEditor } from "@/lib/hooks/useEditor";

interface DecorativeImageProps {
  field: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  shape?: "circle" | "rounded" | "square" | "hexagon";
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: "h-16 w-16",
  md: "h-24 w-24",
  lg: "h-32 w-32",
  xl: "h-48 w-48",
};

const shapeMap = {
  circle: "rounded-full",
  rounded: "rounded-2xl",
  square: "rounded-none",
  hexagon: "clip-hexagon",
};

export function DecorativeImage({
  field,
  alt,
  className,
  fallbackClassName,
  shape = "rounded",
  size = "lg",
}: DecorativeImageProps) {
  const { getValue, setActiveField, activeField } = useEditor();
  const [error, setError] = useState(false);
  const src = getValue(field);
  const isActive = activeField === field;

  if (!src || error) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setActiveField(field)}
        className={cn(
          "group relative flex flex-col items-center justify-center border-2 border-dashed border-primary/30 bg-primary/5 transition-colors hover:border-primary/50 hover:bg-primary/10",
          sizeMap[size],
          shapeMap[shape],
          isActive && "border-primary ring-2 ring-primary/30",
          fallbackClassName,
        )}
      >
        <ImagePlus className="mb-1 size-6 text-primary/40 transition-colors group-hover:text-primary/60" />
        <span className="text-[10px] text-primary/50">Klik untuk tambah foto</span>
      </motion.button>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={cn("group relative overflow-hidden", sizeMap[size], shapeMap[shape], className)}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        onError={() => setError(true)}
      />
      {/* Overlay edit button */}
      <button
        onClick={() => setActiveField(field)}
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/30",
          isActive && "bg-black/20",
        )}
      >
        <span className="flex scale-90 items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-foreground opacity-0 shadow-lg transition-all group-hover:scale-100 group-hover:opacity-100">
          <ImagePlus className="size-3" />
          Ganti Foto
        </span>
      </button>
    </motion.div>
  );
}

