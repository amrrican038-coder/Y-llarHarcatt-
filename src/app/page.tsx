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
      // Sessiz devam et
    }
  };

  return (
    <div
      onClick={handleTap}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        minHeight: "100dvh",
        backgroundColor: "#000000",
        overflow: "hidden",
        zIndex: 9999,
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
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100vw",
          height: "100vh",
          minWidth: "100%",
          minHeight: "100%",
          objectFit: "cover",
          transform: "translate(-50%, -50%) scale(1.02)",
        }}
      />
    </div>
  );
}
