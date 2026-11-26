"use client";

import React, { useEffect, useRef } from "react";

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.muted = false;
    vid.volume = 1;
    vid.play().catch(() => {});
  }, []);

  const handleTap = () => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.muted = false;
    vid.volume = 1;
    if (vid.paused) {
      vid.play().catch(() => {});
    }
  };

  return (
    <main
      onClick={handleTap}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100dvh",
        backgroundColor: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
          margin: "auto",
        }}
      />
    </main>
  );
}
