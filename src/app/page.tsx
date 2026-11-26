"use client";

import React, { useEffect, useRef, useState } from "react";

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState<boolean>(true);
  const [paused, setPaused] = useState<boolean>(false);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.muted = true;
    vid.play().catch(() => {
      setPaused(true);
    });
  }, []);

  const handleScreenTap = async () => {
    const vid = videoRef.current;
    if (!vid) return;

    try {
      if (vid.muted) {
        vid.muted = false;
        setMuted(false);
      }
      if (vid.paused) {
        await vid.play();
        setPaused(false);
      }
    } catch {
      // Sessiz devam et
    }
  };

  const togglePlay = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;

    if (vid.paused) {
      await vid.play().catch(() => {});
      setPaused(false);
    } else {
      vid.pause();
      setPaused(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;

    vid.muted = !vid.muted;
    setMuted(vid.muted);
  };

  return (
    <main
      onClick={handleScreenTap}
      className="relative w-full h-[100dvh] bg-black flex items-center justify-center overflow-hidden"
    >
      <video
        ref={videoRef}
        src="/video.mp4"
        playsInline
        loop
        preload="auto"
        className="w-full h-full object-contain"
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
      />

      {muted && (
        <div className="pointer-events-none fixed top-5 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs tracking-wide">
          Sesi açmak için ekrana dokun
        </div>
      )}

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        <button
          type="button"
          onClick={togglePlay}
          className="px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white text-sm font-medium transition"
        >
          {paused ? "Oynat" : "Duraklat"}
        </button>

        <button
          type="button"
          onClick={toggleMute}
          className="px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white text-sm font-medium transition"
        >
          {muted ? "Ses Aç" : "Sessiz"}
        </button>
      </div>
    </main>
  );
}
