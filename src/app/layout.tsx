import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Petcheri — La conciergerie pour animaux",
    template: "%s | Petcheri",
  },
  description:
    "Conciergerie animalière haut de gamme — garde, éducation, toilettage et bien-être pour chiens, chats et NAC. 400 prestataires certifiés, assurance AXA.",
  keywords: ["conciergerie animaux", "garde chien", "garde chat", "petsitter", "toilettage", "Paris"],
  openGraph: {
    siteName: "Petcheri",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      suppressHydrationWarning
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
