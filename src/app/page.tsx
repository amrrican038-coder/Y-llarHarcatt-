"use client";

import React, { useEffect, useRef } from "react";

export default function HomePage() {
  const mainVideoRef = useRef<HTMLVideoElement | null>(null);
  const bgVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const mainVid = mainVideoRef.current;
    const bgVid = bgVideoRef.current;
    if (!mainVid) return;

    mainVid.muted = false;
    mainVid.volume = 1.0;
    mainVid.loop = true;
    mainVid.playsInline = true;

    if (bgVid) {
      bgVid.muted = true;
      bgVid.loop = true;
      bgVid.playsInline = true;
    }

    mainVid.play().catch(() => {
      mainVid.muted = true;
      mainVid.play().catch(() => {});
    });

    if (bgVid) {
      bgVid.play().catch(() => {});
    }
  }, []);

  const handleTap = async () => {
    const mainVid = mainVideoRef.current;
    const bgVid = bgVideoRef.current;
    if (!mainVid) return;

    try {
      mainVid.muted = false;
      mainVid.volume = 1.0;
      mainVid.loop = true;

      if (mainVid.paused) {
        await mainVid.play();
      }
      if (bgVid && bgVid.paused) {
        await bgVid.play();
      }
    } catch {
      // Hata durumunda mevcut oynatmayi koru
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
        ref={bgVideoRef}
        src="/video.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        controls={false}
        style={{
          position: "absolute",
          inset: "-24px",
          width: "calc(100% + 48px)",
          height: "calc(100% + 48px)",
          objectFit: "cover",
          filter: "blur(24px) brightness(0.65)",
          transform: "scale(1.12)",
          pointerEvents: "none",
        }}
      />

      <video
        ref={mainVideoRef}
        src="/video.mp4"
        autoPlay
        loop
        playsInline
        preload="auto"
        controls={false}
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
        }}
      />
    </main>
  );
}
