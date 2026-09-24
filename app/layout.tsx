import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { SITE } from "@/lib/site";
import "./globals.css";

// One standard typeface for the whole site: Inter (variable, all weights).
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Serafin Drones | Smarter Farming, From Above",
    template: "%s | Serafin Drones",
  },
  description:
    "Serafin Drones improves farm yields through advanced agricultural drone services: precision chemical spraying and fertilizer spreading for commercial farms across Malawi.",
  keywords: ["agricultural drones", "Malawi", "Lilongwe", "drone spraying", "fertilizer spreading", "precision agriculture"],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "Serafin Drones | Smarter Farming, From Above",
    description: "Improving farm yields through advanced agricultural drone services.",
    images: ["/images/hero-drone-field.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#194649",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only z-[100] rounded-lg bg-green-brand px-4 py-2 font-semibold text-teal-brand-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Providers>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
