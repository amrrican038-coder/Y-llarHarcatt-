"use client";

import React, { useEffect, useRef } from "react";

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.muted = false;
    vid.volume = 1.0;
    vid.loop = true;
    vid.playsInline = true;

    vid.play().catch(() => {
      vid.muted = true;
      vid.play().catch(() => {});
    });
  }, []);

  const handleTap = async () => {
    const vid = videoRef.current;
    if (!vid) return;

    try {
      vid.muted = false;
      vid.volume = 1.0;
      vid.loop = true;
      if (vid.paused) {
        await vid.play();
      }
    } catch {
      // Hata durumunda sessiz devam et
    }
  };

  return (
    <main
      onClick={handleTap}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000000",
        overflow: "hidden",
        margin: 0,
        padding: 0,
      }}
    >
      <video
        ref={videoRef}
        src="/video.mp4"
        autoPlay
        loop
        playsInline
        preload="auto"
        controls={false}
        style={{
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          objectPosition: "center",
          display: "block",
        }}
      />
    </main>
  );
}
