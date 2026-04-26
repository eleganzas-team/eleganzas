"use client";

import { useEffect, useRef, useState } from "react";

export function MusicPlayer({ src, title, artist }: { src: string; title: string; artist: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    };
    window.addEventListener("ethereal-open-invitation", handleOpen);
    return () => window.removeEventListener("ethereal-open-invitation", handleOpen);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <audio ref={audioRef} src={src} loop />
      <button
        onClick={() => {
          if (audioRef.current) {
            if (isPlaying) {
              audioRef.current.pause();
            } else {
              audioRef.current.play().catch(() => {});
            }
            setIsPlaying(!isPlaying);
          }
        }}
        className="w-10 h-10 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-lg"
      >
        {isPlaying ? "⏸" : "▶"}
      </button>
    </div>
  );
}
