import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/shows-server";

// Show sign-up pages stay crawlable: admin-added shows only exist there.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
