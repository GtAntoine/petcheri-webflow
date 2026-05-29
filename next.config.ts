  import type { NextConfig } from "next";
  import createNextIntlPlugin from "next-intl/plugin";

  const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

  const nextConfig: NextConfig = {
    // All assets are local in /public/assets — no external image domains needed
    output: "export",
    
  };

  export default withNextIntl(nextConfig);
