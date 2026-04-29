"use client";

import { useState, useRef, useCallback } from "react";
import { ImagePlus, Loader2, X, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEditor } from "@/components/undangan/lib/hooks/useEditor";
import { createClient } from "@/lib/supabase/client";

interface ImageUploadInputProps {
  field: string;
}

export function ImageUploadInput({ field }: ImageUploadInputProps) {
  const { getValue, setValue, userTemplateId } = useEditor();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentValue = getValue(field);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        setError("File harus berupa gambar");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("Ukuran file maksimal 5MB");
        return;
      }

      setError(null);
      setIsUploading(true);

      try {
        let url: string;

        if (userTemplateId) {
          // Upload to Supabase Storage
          const supabase = createClient();
          const ext = file.name.split(".").pop() ?? "jpg";
          const path = `uploads/${userTemplateId}/${field.replace(/\./g, "-")}-${Date.now()}.${ext}`;

          const { error: uploadError } = await supabase.storage
            .from("templates")
            .upload(path, file, {
              cacheControl: "3600",
              upsert: true,
            });

          if (uploadError) throw uploadError;

          const { data } = supabase.storage.from("templates").getPublicUrl(path);
          url = data.publicUrl;
        } else {
          // Fallback: use object URL for preview (won't persist across reloads)
          url = URL.createObjectURL(file);
        }

        setValue(field, url);
      } catch (err) {
        console.error("Upload error:", err);
        setError("Gagal mengupload gambar. Coba lagi.");
      } finally {
        setIsUploading(false);
      }
    },
    [field, setValue, userTemplateId],
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      e.target.value = ""; // reset input
    },
    [handleFile],
  );

  const onClear = useCallback(() => {
    setValue(field, "");
    setError(null);
  }, [field, setValue]);

  return (
    <div className="space-y-3">
      {currentValue ? (
        <div className="relative overflow-hidden rounded-lg border bg-background">
          <img
            src={currentValue}
            alt="Preview"
            className="max-h-48 w-full object-contain"
            onError={() => setError("Gambar tidak dapat dimuat")}
          />
          <button
            type="button"
            onClick={onClear}
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
            aria-label="Hapus gambar"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : null}

      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50 hover:bg-secondary/50",
        )}
      >
        {isUploading ? (
          <>
            <Loader2 className="size-6 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">Mengupload...</span>
          </>
        ) : (
          <>
            <Upload className="size-6 text-muted-foreground transition-colors group-hover:text-primary" />
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                Klik atau seret gambar ke sini
              </p>
              <p className="text-xs text-muted-foreground">
                JPG, PNG, WebP — maksimal 5MB
              </p>
            </div>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileChange}
          disabled={isUploading}
        />
      </div>

      {!currentValue && !userTemplateId && (
        <p className="text-xs text-amber-600">
          Mode preview: gambar tidak akan tersimpan permanen.
        </p>
      )}

      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}

