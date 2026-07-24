import { SITE, absoluteUrl } from "./lib/seo";
import { SERVICE_SLUGS } from "./data/servicesData";

export default function sitemap() {
  const now = new Date();

  const staticPages = [
    { path: "/",         changeFrequency: "weekly",  priority: 1 },
    { path: "/services", changeFrequency: "monthly", priority: 0.9 },
    { path: "/about",    changeFrequency: "monthly", priority: 0.7 },
    { path: "/contact",  changeFrequency: "yearly",  priority: 0.6 },
    { path: "/privacy",  changeFrequency: "yearly",  priority: 0.3 },
  ];

  /* every service detail page, straight from servicesData */
  const servicePages = SERVICE_SLUGS.map((slug) => ({
    path: `/services/${slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages].map(
    ({ path, changeFrequency, priority }) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency,
      priority,
    })
  );
}