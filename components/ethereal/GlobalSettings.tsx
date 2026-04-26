"use client";

import { Settings, Music, Sparkles } from "lucide-react";
import { useState } from "react";

export function GlobalSettings({
  animation,
  onAnimationChange,
  onMusicUpload,
}: {
  animation: string;
  onAnimationChange: (animation: string) => void;
  onMusicUpload: (url: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-lg"
      >
        <Settings className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute bottom-12 left-0 w-64 p-4 rounded-xl border bg-popover shadow-lg">
          <h4 className="font-medium mb-3">Pengaturan</h4>
          
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Animasi</label>
              <select
                value={animation}
                onChange={(e) => onAnimationChange(e.target.value)}
                className="w-full h-9 px-2 rounded-lg border bg-background text-sm"
              >
                <option value="fade">Fade</option>
                <option value="slide">Slide</option>
                <option value="zoom">Zoom</option>
              </select>
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Musik URL</label>
              <input
                type="url"
                placeholder="URL musik..."
                onChange={(e) => onMusicUpload(e.target.value)}
                className="w-full h-9 px-2 rounded-lg border bg-background text-sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
