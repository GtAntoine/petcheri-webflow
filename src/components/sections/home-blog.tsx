import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SectionHeader } from "./section-header";
import { BlogCard } from "@/components/ui/blog-card";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { ArrowRight } from "lucide-react";

export async function HomeBlog({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "home" });
  const recent = [...BLOG_POSTS]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label={t("blog_label")}
          title={t("blog_title")}
          className="mb-12"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recent.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[--color-or] hover:text-[--color-chocolat] transition-colors"
          >
            {t("blog_cta")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
