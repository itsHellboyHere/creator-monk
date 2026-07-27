import { SITE, absoluteUrl } from "./lib/seo";
import { SERVICE_SLUGS } from "./data/servicesData";
import { getPostSlugs } from "./lib/posts";

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
  const blogPages = getPostSlugs().map((slug) => ({
    path: `/blog/${slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogHub = [{ path: "/blog", changeFrequency: "weekly", priority: 0.7 }];

 return [...staticPages, ...blogHub, ...servicePages, ...blogPages].map(
    ({ path, changeFrequency, priority }) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency,
      priority,
    })
  );
}