"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BLOG_POSTS, BLOG_CATEGORIES, getFeaturedPosts } from "@/lib/blog-posts";
import { BlogCard, FeaturedBlogCard } from "@/components/ui/blog-card";

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
      <div className="flex items-center gap-2 flex-wrap justify-center mb-10">
        {BLOG_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="rounded-full px-5 py-2 text-sm font-medium transition-all duration-200"
            style={
              activeCategory === cat
                ? { background: "#E8705A", color: "#fff", boxShadow: "0 2px 8px rgba(232,112,90,0.35)" }
                : { background: "var(--color-white, #fff)", color: "var(--color-chocolat)", border: "1px solid var(--color-border)" }
            }
          >
            {cat}
          </button>
        ))}
      </div>

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
