import type { MetadataRoute } from "next";
import { SITE_URL, site } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Demo-Modus: nichts indexieren. Bei Go-Live `demo` in data/site.json aus.
  if (site.demo) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
