"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BLOG_POSTS, BLOG_CATEGORIES, getFeaturedPosts } from "@/lib/blog-posts";
import { BlogCard, FeaturedBlogCard } from "@/components/ui/blog-card";
import { CategoryPills } from "@/components/ui/category-pills";

export function BlogListing() {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const featured = getFeaturedPosts();
  const filtered =
    activeCategory === "Tous"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === activeCategory);

  // For "Tous": show featured separately + rest in grid; otherwise show all filtered
  const heroPost = activeCategory === "Tous" ? featured[0] : null;
  const gridPosts =
    activeCategory === "Tous"
      ? BLOG_POSTS.filter((p) => !p.featured || BLOG_POSTS.indexOf(p) > 0)
      : filtered;

  return (
    <>
      {/* ── Category filters ──────────────────────────────────────── */}
      <CategoryPills
        items={BLOG_CATEGORIES.map((label) => ({ label }))}
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
          Aucun article dans cette catégorie pour le moment.
        </div>
      )}
    </>
  );
}
