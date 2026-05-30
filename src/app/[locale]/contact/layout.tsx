/**
 * Contact page metadata lives here because the page itself is a Client Component
 * ("use client") which cannot export generateMetadata.
 * A layout.tsx in the same segment is the correct pattern for this case.
 */
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return {
    title: t("contact.meta_title"),
    description: t("contact.meta_description"),
    alternates: buildAlternates("/contact", locale),
  };
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
