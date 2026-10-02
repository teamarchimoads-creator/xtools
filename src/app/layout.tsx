import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "XTOOL Diagnostic Store - Professional Auto Scanners",
    template: "%s | XTOOL Diagnostic Store"
  },
  description: "Shop authorized XTOOL professional automotive diagnostic scanners, OBD2 tools, key programmers, and ECU coding tools. Fast shipping and official support.",
  keywords: "XTOOL, auto diagnostic scanner, OBD2, car scanner, ECU coding, key programming, XT90, COMPASS, XT80",
  authors: [{ name: "XTOOL Store" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://xtool-store.com",
    title: "XTOOL Diagnostic Store - Professional Auto Scanners",
    description: "Shop authorized XTOOL professional automotive diagnostic scanners and tools.",
    siteName: "XTOOL Diagnostic Store",
  },
  twitter: {
    card: "summary_large_image",
    title: "XTOOL Diagnostic Store",
    description: "Professional Automotive Diagnostic Tools",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
