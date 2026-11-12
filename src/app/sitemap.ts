import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

/** Every public page, for search engines. */
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about", "/listening-hub", "/media-communication", "/real-estate", "/contact", "/privacy"].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
