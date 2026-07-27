import styles from "./page.module.css";
import { buildMetadata, absoluteUrl, JsonLd } from "../lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How CreatorMonk collects, uses and protects your personal data.",
  path: "/privacy",
});

const EFFECTIVE = "January 2026";

const sections = [
  {
    id: "01",
    title: "Information we collect",
    content: [
      "When you visit our site or get in touch, we may collect:",
      "• <strong>Details you share:</strong> your name, email, phone number and anything you tell us about your project through forms, WhatsApp or our chat.",
      "• <strong>Usage data:</strong> pages you visit, your browser and device type, and general location, collected automatically through analytics.",
      "• <strong>Messages:</strong> the content of what you send us, so we can actually help.",
    ],
  },
  {
    id: "02",
    title: "How we use it",
    content: [
      "We use your information to:",
      "• Reply to you and do the work you asked for.",
      "• Send project updates and anything you need along the way.",
      "• Understand how people use the site so we can make it better.",
      "• Meet our legal obligations.",
      "We never sell, rent or trade your personal information to anyone.",
    ],
  },
  {
    id: "03",
    title: "Our chat assistant",
    content: [
      "Our website chat is powered by AI, and its replies are generated automatically.",
      "If you share your email or phone number in the chat, we use it only to have a real person from our team follow up with you.",
      "Please don't share passwords, payment details or other sensitive information in the chat.",
    ],
  },
  {
    id: "04",
    title: "Cookies & analytics",
    content: [
      "We use cookies to keep the site working smoothly and to understand traffic through Google Analytics.",
      "• They help remember your preferences.",
      "• They show us which pages people find useful.",
      "You can turn cookies off in your browser at any time — some parts of the site may work less smoothly without them.",
    ],
  },
  {
    id: "05",
    title: "Third-party services",
    content: [
      "We rely on a few trusted services to run our business:",
      "• <strong>Google Analytics</strong> — to understand site traffic.",
      "• <strong>Email providers</strong> — to send you updates and replies.",
      "• <strong>WhatsApp (Meta)</strong> — to talk with you directly.",
      "Each has its own privacy policy. We only share the minimum needed for these to work.",
    ],
  },
  {
    id: "06",
    title: "Data retention",
    content: [
      "We keep your data only as long as we need it, or as the law requires.",
      "Project-related data is usually kept for a couple of years after a project ends, for our records.",
      "You can ask us to delete your data any time — just email us.",
    ],
  },
  {
    id: "07",
    title: "Your rights",
    content: [
      "You can always:",
      "• <strong>Access</strong> the data we hold about you.",
      "• <strong>Correct</strong> anything that's wrong.",
      "• <strong>Delete</strong> your data.",
      "• <strong>Object</strong> to how we use it.",
      "To do any of these, email us at <strong>hello@creatormonk.in</strong>.",
    ],
  },
  {
    id: "08",
    title: "Data security",
    content: [
      "We take security seriously:",
      "• Everything runs over encrypted HTTPS.",
      "• Access to your data is limited to people who need it.",
      "• We review our setup regularly.",
      "No system online is ever 100% secure, but if anything goes wrong, we'll act on it quickly.",
    ],
  },
  {
    id: "09",
    title: "Contact us",
    content: [
      "Any questions about this policy? Reach us at:",
      "• <strong>Email:</strong> hello@creatormonk.in",
      "• <strong>WhatsApp:</strong> +91 78273 32337",
      "• <strong>Location:</strong> Greater Noida, Uttar Pradesh, India",
      "We reply to privacy queries within a few business days.",
    ],
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "PrivacyPolicy",
  name: "Privacy Policy",
  url: absoluteUrl("/privacy"),
  dateModified: "2026-01-01",
};

export default function PrivacyPolicy() {
  return (
    <main className={styles.main}>
      <JsonLd data={schema} />

      {/* Hero */}
      <section className={styles.hero}>
        <span className={styles.mesh} aria-hidden="true" />
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>Legal</span>
          <h1 className={styles.heroTitle}>
            Privacy <span className={styles.heroAccent}>Policy</span>
          </h1>
          <p className={styles.heroMeta}>
            Last updated: <strong>{EFFECTIVE}</strong>
          </p>
          <p className={styles.heroSubtitle}>
            Your trust matters to us. Here's what we collect, why we collect it,
            and how we keep it safe — in plain language, no legal maze.
          </p>
        </div>
      </section>

      {/* Sections */}
      <section className={styles.content}>
        <div className={styles.grid}>
          {sections.map((sec) => (
            <article key={sec.id} className={styles.card}>
              <span className={styles.cardNum} aria-hidden="true">
                {sec.id}
              </span>
              <h2 className={styles.cardTitle}>{sec.title}</h2>
              <div className={styles.cardBody}>
                {sec.content.map((para, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Footer note */}
      <section className={styles.footerNote}>
        <p>
          We may update this policy from time to time. Any changes will appear
          on this page with a new date. Using our site or services means you're
          okay with the current version.
        </p>
      </section>
    </main>
  );
}