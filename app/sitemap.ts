import type { MetadataRoute } from "next";

import { SHOWS, signUpPath } from "@/lib/shows";
import { STORE_PRODUCTS } from "@/lib/store-products";
import { SITE_URL, getPublishedDbShows } from "@/lib/shows-server";

// Rebuilt at most hourly, so shows published from the admin appear without a
// redeploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/booking`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/biography`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/watch`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/gallery`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/store`, changeFrequency: "weekly", priority: 0.7 },
    ...STORE_PRODUCTS.map((product) => ({
      url: `${SITE_URL}/store/${product.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ];

  // Hard-coded shows have a detail page; admin-added shows only a sign-up page.
  const staticShows: MetadataRoute.Sitemap = SHOWS.map((show) => ({
    url: `${SITE_URL}/shows/${show.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));
  const dbShows: MetadataRoute.Sitemap = (await getPublishedDbShows()).map(
    (show) => ({
      url: `${SITE_URL}${signUpPath(show.slug)}`,
      changeFrequency: "weekly",
      priority: 0.8,
    }),
  );

  return [...pages, ...staticShows, ...dbShows];
}
