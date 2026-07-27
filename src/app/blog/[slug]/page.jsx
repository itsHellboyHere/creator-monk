import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import styles from "../blog.module.css";
import { getPost, getPostSlugs, getPostMeta } from "../../lib/posts";
import {
  SITE,
  buildMetadata,
  absoluteUrl,
  ogFromCloudinary,
  breadcrumbSchema,
  JsonLd,
} from "../../lib/seo";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let meta;
  try {
    meta = getPostMeta(slug);
  } catch {
    return buildMetadata({ title: "Not found", path: "/blog", noIndex: true });
  }

  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: `/blog/${slug}`,
    image: meta.image ? ogFromCloudinary(meta.image) : SITE.ogImage,
    type: "article",
  });
}

function fmtDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function PostPage({ params }) {
  const { slug } = await params;

  let post;
  try {
    post = await getPost(slug);
  } catch {
    notFound();
  }

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      author: { "@type": "Organization", name: SITE.name },
      publisher: { "@id": `${SITE.url}/#organization` },
      mainEntityOfPage: absoluteUrl(`/blog/${slug}`),
      ...(post.image ? { image: post.image } : {}),
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${slug}` },
    ]),
  ];

  return (
    <main className={styles.main}>
      <JsonLd data={schema} />

      <article className={styles.article}>
        <div className={styles.articleHead}>
          <Link href="/blog" className={styles.back}>
            <ArrowLeft size={16} strokeWidth={2} />
            All posts
          </Link>

          <div className={styles.articleMeta}>
            <span>{fmtDate(post.date)}</span>
            <span className={styles.dot}>·</span>
            <span>{post.readingTime}</span>
          </div>

          <h1 className={styles.articleTitle}>{post.title}</h1>
          <p className={styles.articleLede}>{post.description}</p>
        </div>

        {post.image && (
          <div className={styles.articleHero}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.image} alt="" />
          </div>
        )}

        <div
          className={styles.prose}
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <div className={styles.articleCta}>
          <h3>Want this for your business?</h3>
          <p>Tell us what you're building — you'll get a clear quote after a short call.</p>
          <Link href="/contact" className={styles.ctaBtn}>
            Get a quote →
          </Link>
        </div>
      </article>
    </main>
  );
}