import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

const BASE_URL = SITE_URL;

// Must match the locales in src/i18n/routing.ts
const LOCALES = ["da"] as const;

// TODO: Add your service page slugs
const SERVICE_SLUGS: string[] = [
  // "consulting",
  // "implementation",
];

// TODO: Add your case study slugs
const CASE_SLUGS: string[] = [
  // "client-name",
];

type StaticRoute = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

// TODO: Update with your actual routes
const staticRoutes: StaticRoute[] = [
  { path: "", priority: 1.0, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/cases", priority: 0.8, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/cookies", priority: 0.2, changeFrequency: "yearly" },
];

function makeAlternates(path: string) {
  return {
    languages: Object.fromEntries([
      ...LOCALES.map((l) => [l, `${BASE_URL}/${l}${path}`]),
      ["x-default", `${BASE_URL}/${LOCALES[0]}${path}`],
    ]),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of staticRoutes) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: makeAlternates(route.path),
      });
    }
  }

  for (const slug of SERVICE_SLUGS) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: makeAlternates(`/services/${slug}`),
      });
    }
  }

  for (const slug of CASE_SLUGS) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/cases/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: makeAlternates(`/cases/${slug}`),
      });
    }
  }

  return entries;
}
