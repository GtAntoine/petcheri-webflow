  import type { NextConfig } from "next";
  import createNextIntlPlugin from "next-intl/plugin";

  const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

  const nextConfig: NextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "cdn.prod.website-files.com",
        },
      ],
    },

    /**
     * 301 redirects: /ebook/[slug] → /blog/[slug]
     * The old Webflow site used /ebook/ as the blog path.
     * These permanent redirects preserve SEO juice and backlinks when the
     * new site goes live at petcheri.com.
     */
    async redirects() {
      return [
        {
          source: "/ebook/:slug",
          destination: "/blog/:slug",
          permanent: true,
        },
        {
          source: "/en/ebook/:slug",
          destination: "/en/blog/:slug",
          permanent: true,
        },
      ];
    },
  };

  export default withNextIntl(nextConfig);
