import Link from "next/link";
import styles from "./blog.module.css";
import { getAllPosts } from "../lib/posts";
import { buildMetadata, absoluteUrl, breadcrumbSchema, JsonLd } from "../lib/seo";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Plain-English guides on websites, apps, AI automation and growing a business online — from the CreatorMonk team.",
  path: "/blog",
});

function fmtDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "CreatorMonk Blog",
      url: absoluteUrl("/blog"),
      description:
        "Guides on websites, apps, AI automation and growing a business online.",
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
    ]),
  ];

  return (
    <main className={styles.main}>
      <JsonLd data={schema} />

      <section className={styles.hero}>
        <span className={styles.mesh} aria-hidden="true" />
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>The blog</span>
          <h1 className={styles.title}>
            Guides, not <span className={styles.accent}>fluff.</span>
          </h1>
          <p className={styles.sub}>
            Plain-English writing on websites, apps, AI and growing online —
            the stuff we'd tell you on a call.
          </p>
        </div>
      </section>

      <section className={styles.list}>
        {posts.length === 0 ? (
          <p className={styles.empty}>New writing is on the way.</p>
        ) : (
          <div className={styles.grid}>
            {posts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className={styles.card}>
                {p.image && (
                  <div className={styles.cardImg}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt="" loading="lazy" />
                  </div>
                )}
                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <span>{fmtDate(p.date)}</span>
                    <span className={styles.dot}>·</span>
                    <span>{p.readingTime}</span>
                  </div>
                  <h2 className={styles.cardTitle}>{p.title}</h2>
                  <p className={styles.cardDesc}>{p.description}</p>
                  <span className={styles.cardLink}>Read more →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}