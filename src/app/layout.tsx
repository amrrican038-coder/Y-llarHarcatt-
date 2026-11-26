import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Video",
  description: "Tam ekran mobil uyumlu video oynatıcı",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="w-screen h-[100dvh] overflow-hidden bg-black select-none">
        {children}
      </body>
    </html>
  );
}
