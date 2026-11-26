"use client";

import React, { useEffect, useRef, useState } from "react";

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [sesAcik, setSesAcik] = useState<boolean>(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) {
      return;
    }

    // Sayfa ilk acildiginda videonun sesi ve oynatilmasi hazirlanir
    videoElement.muted = false;
    videoElement.volume = 1.0;
    videoElement.loop = true;
    videoElement.playsInline = true;

    videoElement
      .play()
      .then(() => {
        setSesAcik(true);
      })
      .catch(() => {
        // Mobil tarayicilar sesli oto-oynatmayi ilk dokunusa kadar engelleyebilir
        videoElement.muted = true;
        videoElement
          .play()
          .then(() => {
            setSesAcik(false);
          })
          .catch(() => {});
      });
  }, []);

  const handleScreenClick = async () => {
    const videoElement = videoRef.current;
    if (!videoElement) {
      return;
    }

    try {
      // Ekrana dokunuldugunda sesi ac, sesi en yuksege cek ve oynatmaya devam et
      videoElement.muted = false;
      videoElement.volume = 1.0;
      videoElement.loop = true;

      if (videoElement.paused) {
        await videoElement.play();
      }

      setSesAcik(true);
    } catch {
      // Hata olursa mevcut oynatma durumunu bozma
    }
  };

  return (
    <main
      onClick={handleScreenClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100dvh",
        minWidth: "100%",
        minHeight: "100%",
        backgroundColor: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        margin: 0,
        padding: 0,
        userSelect: "none",
        WebkitUserSelect: "none",
        WebkitTapHighlightColor: "transparent",
        cursor: "pointer",
      }}
    >
      <video
        ref={videoRef}
        src="/video.mp4"
        autoPlay
        loop
        muted={!sesAcik}
        playsInline
        preload="auto"
        controls={false}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          minWidth: "100%",
          minHeight: "100%",
          maxWidth: "none",
          maxHeight: "none",
          objectFit: "cover",
          objectPosition: "center center",
          display: "block",
          margin: 0,
          padding: 0,
          border: "none",
          outline: "none",
          backgroundColor: "#000000",
        }}
      />
    </main>
  );
}
