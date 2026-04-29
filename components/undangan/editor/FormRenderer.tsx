import { Edit3, X, Link2, Palette } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { useEditor } from "@/components/undangan/lib/hooks/useEditor";
import { ImageUploadInput } from "./ImageUploadInput";

/** Small helper to show a tip box for certain field types */
function FieldTip({ fieldType }: { fieldType: string }) {
  if (fieldType === "url") {
    return (
      <div className="mb-3 rounded-lg bg-secondary/50 p-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Link2 className="size-4 text-primary" />
          <span className="font-medium text-foreground">Tips:</span>
        </div>
        <p className="mt-1">Masukkan URL lengkap dengan https:// atau path lokal</p>
      </div>
    );
  }
  if (fieldType === "color") {
    return (
      <div className="mb-3 rounded-lg bg-secondary/50 p-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Palette className="size-4 text-primary" />
          <span className="font-medium text-foreground">Tips:</span>
        </div>
        <p className="mt-1">Pilih warna atau masukkan kode hex manual</p>
      </div>
    );
  }
  return null;
}

export function FormRenderer() {
  const { isEditable, activeField, getValue, setActiveField, setValue, getFieldType, getFieldLabel } = useEditor();

  if (!isEditable || !activeField) return null;

  const fieldType = getFieldType(activeField);
  const label = getFieldLabel(activeField);

  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="fixed bottom-5 left-1/2 z-50 w-[min(calc(100vw-2rem),28rem)] -translate-x-1/2 rounded-xl border bg-popover/95 p-4 text-popover-foreground shadow-editor backdrop-blur-md"
    >
      <div className="mb-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Edit3 className="size-4 text-primary" aria-hidden="true" />
          <span>{label}</span>
        </div>
        <Button variant="ghost" size="icon" type="button" onClick={() => setActiveField(null)} aria-label="Close editor">
          <X className="size-4" aria-hidden="true" />
        </Button>
      </div>

      <FieldTip fieldType={fieldType} />

      {fieldType === "image" ? (
        <ImageUploadInput field={activeField} />
      ) : fieldType === "textarea" ? (
        <textarea
          autoFocus
          rows={4}
          value={getValue(activeField)}
          onChange={(event) => setValue(activeField, event.target.value)}
          className="w-full resize-none rounded-lg border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
        />
      ) : fieldType === "color" ? (
        <div className="flex items-center gap-3">
          <input
            autoFocus
            type="color"
            value={getValue(activeField) || "#000000"}
            onChange={(event) => setValue(activeField, event.target.value)}
            className="h-11 w-11 cursor-pointer rounded-lg border bg-background p-1 outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
          />
          <input
            type="text"
            value={getValue(activeField)}
            onChange={(event) => setValue(activeField, event.target.value)}
            placeholder="#1a5c3a"
            className="h-11 flex-1 rounded-lg border bg-background px-3 text-sm text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      ) : fieldType === "url" ? (
        <div className="relative">
          <Link2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            autoFocus
            type="url"
            placeholder="https://..."
            value={getValue(activeField)}
            onChange={(event) => setValue(activeField, event.target.value)}
            className="h-11 w-full rounded-lg border bg-background pl-9 pr-3 text-sm text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      ) : fieldType === "date" ? (
        <input
          autoFocus
          type="date"
          value={getValue(activeField)}
          onChange={(event) => setValue(activeField, event.target.value)}
          className="h-11 w-full rounded-lg border bg-background px-3 text-sm text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
        />
      ) : fieldType === "time" ? (
        <input
          autoFocus
          type="time"
          value={getValue(activeField)}
          onChange={(event) => setValue(activeField, event.target.value)}
          className="h-11 w-full rounded-lg border bg-background px-3 text-sm text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
        />
      ) : fieldType === "number" ? (
        <input
          autoFocus
          type="number"
          value={getValue(activeField)}
          onChange={(event) => setValue(activeField, event.target.value)}
          className="h-11 w-full rounded-lg border bg-background px-3 text-sm text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
        />
      ) : fieldType === "email" ? (
        <input
          autoFocus
          type="email"
          value={getValue(activeField)}
          onChange={(event) => setValue(activeField, event.target.value)}
          className="h-11 w-full rounded-lg border bg-background px-3 text-sm text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
        />
      ) : (
        <input
          autoFocus
          value={getValue(activeField)}
          onChange={(event) => setValue(activeField, event.target.value)}
          className="h-11 w-full rounded-lg border bg-background px-3 text-sm text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
        />
      )}
    </motion.aside>
  );
}
