import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export function getPostSlugs() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

/** Metadata only — fast, used for the list page and sitemap. */
export function getPostMeta(slug) {
  const full = path.join(POSTS_DIR, `${slug}.md`);
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date || null,
    author: data.author || "CreatorMonk",
    tags: data.tags || [],
    image: data.image || null,
    readingTime: readingTime(content).text,
  };
}

/** Full post with rendered HTML — used for the detail page. */
export async function getPost(slug) {
  const full = path.join(POSTS_DIR, `${slug}.md`);
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);

  const processed = await remark().use(gfm).use(html).process(content);

  return {
    ...getPostMeta(slug),
    contentHtml: processed.toString(),
  };
}

/** All posts, newest first — for the list page. */
export function getAllPosts() {
  return getPostSlugs()
    .map(getPostMeta)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}