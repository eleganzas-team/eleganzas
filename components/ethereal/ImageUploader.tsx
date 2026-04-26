"use client";

import { useState } from "react";
import { ImagePlus } from "lucide-react";

export function ImageUploader({
  src,
  alt,
  onImageChange,
  fallbackSvg,
  className,
  containerClassName,
}: {
  src: string;
  alt: string;
  onImageChange: (url: string) => void;
  fallbackSvg: string;
  className?: string;
  containerClassName?: string;
}) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className={`relative ${containerClassName}`}>
        <img
          src={fallbackSvg}
          alt={alt}
          className={className}
        />
        <button
          onClick={() => {
            const url = prompt("Masukkan URL gambar:");
            if (url) onImageChange(url);
          }}
          className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity"
        >
          <ImagePlus className="w-6 h-6 text-white" />
        </button>
      </div>
    );
  }

  return (
    <div className={`relative ${containerClassName}`}>
      <img
        src={src}
        alt={alt}
        className={className}
        onError={() => setError(true)}
      />
      <button
        onClick={() => {
          const url = prompt("Masukkan URL gambar:");
          if (url) onImageChange(url);
        }}
        className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity"
      >
        <ImagePlus className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
