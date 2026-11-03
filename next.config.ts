import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Pre-built static sizes (scripts/optimize-images.mjs), no on-demand optimisation.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [480, 800, 1200, 1600, 2400],
    imageSizes: [240, 320, 400],
    qualities: [75, 85],
  },
  async headers() {
    return [
      {
        // Filenames are not content-hashed, so cache for a week rather than forever.
        source: "/images/home/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
