import type { Metadata } from "next";
import "./globals.css";
import { SITE_STATS } from "@/lib/site-stats";

/**
 * Root layout — minimal shell / fallback metadata.
 * The <html lang={locale}> and <body> are provided by [locale]/layout.tsx.
 * Each page overrides title + description via generateMetadata().
 */
export const metadata: Metadata = {
  title: {
    default: "Petcheri — La conciergerie pour animaux",
    template: "%s | Petcheri",
  },
  description: `Conciergerie animalière haut de gamme — garde, éducation, toilettage et bien-être pour chiens, chats et NAC. ${SITE_STATS.sittersNetwork}+ prestataires certifiés, assurance AXA.`,
  keywords: ["conciergerie animaux", "garde chien", "garde chat", "petsitter", "toilettage", "Paris"],
  openGraph: {
    siteName: "Petcheri",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // html/body come from [locale]/layout.tsx — this wrapper just passes through
  return <>{children}</>;
}
