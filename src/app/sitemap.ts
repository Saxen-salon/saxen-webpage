import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

const BASE_URL = SITE_URL;
const LOCALES = ["da"] as const;

type StaticRoute = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const staticRoutes: StaticRoute[] = [
  { path: "", priority: 1.0, changeFrequency: "monthly" },
  { path: "/ydelser", priority: 0.9, changeFrequency: "monthly" },
  { path: "/team", priority: 0.8, changeFrequency: "monthly" },
  { path: "/om-os", priority: 0.7, changeFrequency: "monthly" },
  { path: "/kontakt", priority: 0.8, changeFrequency: "yearly" },
  { path: "/cookie-politik", priority: 0.2, changeFrequency: "yearly" },
  { path: "/privatlivspolitik", priority: 0.2, changeFrequency: "yearly" },
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

  return entries;
}
