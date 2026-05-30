"use client";

import Link from "next/link";
import type { BlogPost } from "@/lib/blog-posts";
import { Clock, User, Tag } from "lucide-react";

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

function CategoryBadge({ category }: { category: string }) {
  const color = CATEGORY_COLORS[category] ?? "#C9A96E";
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-semibold rounded-full px-3 py-1 text-white"
      style={{ background: color }}
    >
      <Tag className="w-3 h-3" />
      {category}
    </span>
  );
}

// ─── Regular card (grid) ─────────────────────────────────────────────────────

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group card-base flex flex-col overflow-hidden hover:shadow-[--shadow-card-hover] transition-all duration-300 hover:-translate-y-1"
    >
      {/* Cover image */}
      <div className="relative w-full aspect-[3/2] overflow-hidden bg-[--color-creme]">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        <div className="flex items-center justify-between">
          <CategoryBadge category={post.category} />
          <span className="flex items-center gap-1 text-xs text-[--color-muted-foreground]">
            <Clock className="w-3 h-3" />
            {post.readTime} min
          </span>
        </div>

        <h3 className="text-h3 text-[--color-chocolat] leading-snug line-clamp-2 group-hover:text-[--color-or] transition-colors">
          {post.title}
        </h3>

        <p className="text-sm text-[--color-muted-foreground] leading-relaxed line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-2 pt-2 border-t border-[--color-border]">
          <div className="w-7 h-7 rounded-full bg-[--color-creme] flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-[--color-muted-foreground]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-[--color-chocolat]">{post.author}</span>
            <span className="text-xs text-[--color-muted-foreground]">{formatDate(post.date)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Featured card (hero) ────────────────────────────────────────────────────

interface FeaturedBlogCardProps {
  post: BlogPost;
}

export function FeaturedBlogCard({ post }: FeaturedBlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group card-base overflow-hidden flex flex-col lg:flex-row hover:shadow-[--shadow-card-hover] transition-all duration-300"
    >
      {/* Cover image */}
      <div className="relative w-full lg:w-1/2 aspect-[3/2] lg:aspect-auto overflow-hidden bg-[--color-creme] shrink-0">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="eager"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center p-8 lg:p-12 gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-[--color-or]">
            Article à la une
          </span>
          <span className="w-1 h-1 rounded-full bg-[--color-border]" />
          <CategoryBadge category={post.category} />
        </div>

        <h2
          className="text-[--color-chocolat] font-normal leading-snug group-hover:text-[--color-or] transition-colors"
          style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
        >
          {post.title}
        </h2>

        <p className="text-[--color-muted-foreground] leading-relaxed max-w-lg">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-4 text-sm text-[--color-muted-foreground]">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            {post.author}
          </span>
          <span className="w-1 h-1 rounded-full bg-[--color-border]" />
          <span>{formatDate(post.date)}</span>
          <span className="w-1 h-1 rounded-full bg-[--color-border]" />
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {post.readTime} min
          </span>
        </div>

        <div className="mt-2">
          <span
            className="inline-flex items-center gap-2 text-sm font-semibold rounded-full px-6 py-2.5 text-white shadow-sm group-hover:shadow-md group-hover:brightness-110 transition-all"
            style={{ background: "#E8705A" }}
          >
            Lire l&apos;article
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
