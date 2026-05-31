import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { BOOKING_URL } from "@/lib/site-stats";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { routing } from "@/i18n/routing";
import {
  BLOG_POSTS,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog-posts";
import { getPromotionsByIds } from "@/lib/promotions";
import { BlogCard } from "@/components/ui/blog-card";
import { PromoCard } from "@/components/ui/promo-card";
import { Clock, User, ArrowLeft, Gift } from "lucide-react";

// ─── Static generation ───────────────────────────────────────────────────────

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    BLOG_POSTS.map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const post = getPostBySlug(slug);
  if (!post) return { title: t("blog_post.not_found_title") };
  return {
    title: `${post.title} — Petcheri Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
    },
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(iso: string, locale: string): string {
  return new Date(iso).toLocaleDateString(locale === "en" ? "en-GB" : "fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const CATEGORY_COLORS: Record<string, string> = {
  Santé:        "#E8705A",
  Comportement: "#C9A96E",
  Voyage:       "#5B8FD6",
  Guide:        "#6DB57A",
  Entreprises:  "#A07CC5",
  Lifestyle:    "#D46B9A",
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });

  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post, 3);
  const promos = getPromotionsByIds(post.promotionIds ?? []);
  const categoryColor = CATEGORY_COLORS[post.category] ?? "#C9A96E";

  return (
    <>
      <Navbar />

      {/* ── Hero : titre à gauche, cover à droite ───────────────── */}
      <section
        className="pt-28 pb-16 px-6"
        style={{ background: "linear-gradient(135deg, #fde0d4 0%, #fdeee7 45%, #fdf6f2 100%)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Colonne gauche */}
            <div>
              {/* Retour + catégorie */}
              <div className="flex items-center gap-3 mb-5">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[--color-muted-foreground] hover:text-[--color-chocolat] transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  {t("blog_post.back_link")}
                </Link>
                <span className="text-[--color-border]">·</span>
                <span
                  className="text-xs font-semibold rounded-full px-3 py-1 text-white"
                  style={{ background: categoryColor }}
                >
                  {post.category}
                </span>
              </div>

              {/* Titre */}
              <h1
                className="text-[--color-chocolat] font-normal mb-5"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
                  lineHeight: 1.15,
                }}
              >
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-lead mb-7">{post.excerpt}</p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-[--color-muted-foreground]">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="w-1 h-1 rounded-full bg-[--color-border]" />
                <span>{formatDate(post.date, locale)}</span>
                <span className="w-1 h-1 rounded-full bg-[--color-border]" />
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {t("blog_post.read_time", { minutes: post.readTime })}
                </span>
              </div>
            </div>

            {/* Colonne droite — cover image */}
            <div className="relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden shadow-xl">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── Article layout ───────────────────────────────────────── */}
      <section className="bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12 items-start">

            {/* ── Main article ─────────────────────────────────── */}
            <article>
              {/* Content */}
              <div
                className="prose-blog"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-10 pt-8 border-t border-[--color-border] flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium rounded-full px-3 py-1 bg-[--color-creme] text-[--color-chocolat]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </article>

            {/* ── Sidebar ──────────────────────────────────────── */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 flex flex-col gap-6">

                {/* Author card */}
                <div className="card-base p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[--color-or] mb-3">
                    {t("blog_post.author_label")}
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold"
                      style={{ background: "linear-gradient(135deg, #E8705A, #C9A96E)" }}
                    >
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-[--color-chocolat]">{post.author}</p>
                      <p className="text-xs text-[--color-muted-foreground]">{t("blog_post.author_team")}</p>
                    </div>
                  </div>
                </div>

                {/* Article details */}
                <div className="card-base p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[--color-or] mb-4">
                    {t("blog_post.details_label")}
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[--color-muted-foreground]">{t("blog_post.category_label")}</span>
                      <span
                        className="font-medium text-white rounded-full px-2.5 py-0.5 text-xs"
                        style={{ background: categoryColor }}
                      >
                        {post.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[--color-muted-foreground]">{t("blog_post.reading_label")}</span>
                      <span className="font-medium text-[--color-chocolat]">{post.readTime} {t("blog_post.reading_unit")}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[--color-muted-foreground]">{t("blog_post.published_label")}</span>
                      <span className="font-medium text-[--color-chocolat]">{formatDate(post.date, locale)}</span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div
                  className="card-base p-6 text-center"
                  style={{ background: "linear-gradient(135deg, #fde0d4, #fdeee7)" }}
                >
                  <p className="text-sm font-semibold text-[--color-chocolat] mb-2">
                    {t("blog_post.cta_title")}
                  </p>
                  <p className="text-xs text-[--color-muted-foreground] mb-4 leading-relaxed">
                    {t("blog_post.cta_desc")}
                  </p>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:shadow-md hover:brightness-110 transition-all"
                    style={{ background: "#E8705A" }}
                  >
                    {t("blog_post.cta_btn")}
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Linked promotions ────────────────────────────────────── */}
      {promos.length > 0 && (
        <section className="bg-[--color-ivoire] pb-2">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #fde0d4, #fdeee7)" }}
                >
                  <Gift className="w-4 h-4" style={{ color: "#E8705A" }} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[--color-or]">
                    {t("blog_post.promos_label")}
                  </p>
                  <p className="text-sm text-[--color-muted-foreground]">
                    {t("blog_post.promos_desc")}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {promos.map((promo) => (
                  <PromoCard key={promo.id} promo={promo} variant="inline" />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Related articles ─────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="section-padding bg-[--color-creme]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-10 text-center">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[--color-or]">
                {t("blog_post.related_label")}
              </span>
              <h2
                className="text-[--color-chocolat] font-normal mt-2"
                style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
              >
                {t("blog_post.related_title")}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((relPost) => (
                <BlogCard key={relPost.id} post={relPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
