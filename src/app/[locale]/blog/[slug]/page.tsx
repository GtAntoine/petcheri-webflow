import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { routing } from "@/i18n/routing";
import {
  BLOG_POSTS,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog-posts";
import { BlogCard } from "@/components/ui/blog-card";
import { Clock, User, ArrowLeft, Tag } from "lucide-react";

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
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article introuvable" };
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

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
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

  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post, 3);
  const categoryColor = CATEGORY_COLORS[post.category] ?? "#C9A96E";

  return (
    <>
      <Navbar />

      {/* ── Cover hero ───────────────────────────────────────────── */}
      <div className="relative w-full h-72 sm:h-96 lg:h-[480px] overflow-hidden bg-[--color-creme]">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Back link */}
        <div className="absolute top-24 left-6 sm:left-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full px-4 py-2 hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Tous les articles
          </Link>
        </div>

        {/* Category badge on cover */}
        <div className="absolute bottom-6 left-6 sm:left-10">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1.5 text-white shadow-sm"
            style={{ background: categoryColor }}
          >
            <Tag className="w-3 h-3" />
            {post.category}
          </span>
        </div>
      </div>

      {/* ── Article layout ───────────────────────────────────────── */}
      <section className="bg-[--color-ivoire]">
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12 items-start">

            {/* ── Main article ─────────────────────────────────── */}
            <article>
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-[--color-muted-foreground] mb-6">
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="w-1 h-1 rounded-full bg-[--color-border]" />
                <span>{formatDate(post.date)}</span>
                <span className="w-1 h-1 rounded-full bg-[--color-border]" />
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readTime} min de lecture
                </span>
              </div>

              {/* Title */}
              <h1
                className="text-[--color-chocolat] font-normal mb-6"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                  lineHeight: 1.2,
                }}
              >
                {post.title}
              </h1>

              {/* Excerpt lead */}
              <p
                className="text-lg text-[--color-muted-foreground] leading-relaxed mb-8 pb-8 border-b border-[--color-border]"
                style={{ fontStyle: "italic" }}
              >
                {post.excerpt}
              </p>

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
                    Auteur
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
                      <p className="text-xs text-[--color-muted-foreground]">Équipe Petcheri</p>
                    </div>
                  </div>
                </div>

                {/* Article details */}
                <div className="card-base p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[--color-or] mb-4">
                    Détails
                  </p>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[--color-muted-foreground]">Catégorie</span>
                      <span
                        className="font-medium text-white rounded-full px-2.5 py-0.5 text-xs"
                        style={{ background: categoryColor }}
                      >
                        {post.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[--color-muted-foreground]">Lecture</span>
                      <span className="font-medium text-[--color-chocolat]">{post.readTime} min</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[--color-muted-foreground]">Publié le</span>
                      <span className="font-medium text-[--color-chocolat]">{formatDate(post.date)}</span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div
                  className="card-base p-6 text-center"
                  style={{ background: "linear-gradient(135deg, #fde0d4, #fdeee7)" }}
                >
                  <p className="text-sm font-semibold text-[--color-chocolat] mb-2">
                    Besoin d&apos;une garde&nbsp;?
                  </p>
                  <p className="text-xs text-[--color-muted-foreground] mb-4 leading-relaxed">
                    Des professionnels certifiés, matchés selon le profil de votre animal.
                  </p>
                  <a
                    href="https://app.petcheri.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:shadow-md hover:brightness-110 transition-all"
                    style={{ background: "#E8705A" }}
                  >
                    Démarrer ma demande
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Related articles ─────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="section-padding bg-[--color-creme]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-10 text-center">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[--color-or]">
                Continuez votre lecture
              </span>
              <h2
                className="text-[--color-chocolat] font-normal mt-2"
                style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
              >
                Articles similaires
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
