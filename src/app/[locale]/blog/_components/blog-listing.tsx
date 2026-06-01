"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  getBlogPosts,
  getBlogCategories,
  getFeaturedPosts,
} from "@/lib/blog-posts";
import { BlogCard, FeaturedBlogCard } from "@/components/ui/blog-card";
import { CategoryPills } from "@/components/ui/category-pills";

interface BlogListingProps {
  locale: string;
}

export function BlogListing({ locale }: BlogListingProps) {
  const t = useTranslations("pages");

  const categories = getBlogCategories(locale);
  /** Internal French key used for filtering ("Tous", "Santé", …) */
  const ALL_VALUE = categories[0].value;

  const [activeCategory, setActiveCategory] = useState(ALL_VALUE);

  const posts    = getBlogPosts(locale);
  const featured = getFeaturedPosts(locale);

  const filtered =
    activeCategory === ALL_VALUE
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  // "Tous" view: show first featured post as hero; everything else in grid
  const heroPost  = activeCategory === ALL_VALUE ? featured[0] : null;
  const gridPosts =
    activeCategory === ALL_VALUE
      ? posts.filter((p) => !p.featured || posts.indexOf(p) > 0)
      : filtered;

  return (
    <>
      {/* ── Category filters ──────────────────────────────────────── */}
      <CategoryPills
        items={categories}
        active={activeCategory}
        onChange={setActiveCategory}
        className="mb-10"
      />

      {/* ── Featured article (Tous only) ──────────────────────────── */}
      <AnimatePresence mode="wait">
        {heroPost && (
          <motion.div
            key="featured"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <FeaturedBlogCard post={heroPost} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Grid ─────────────────────────────────────────────────── */}
      {gridPosts.length > 0 ? (
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {gridPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-20 text-[--color-muted-foreground]">
          {t("blog.no_articles")}
        </div>
      )}
    </>
  );
}
