import styles from "../privacy/page.module.css";
import { buildMetadata, absoluteUrl, JsonLd } from "../lib/seo";

export const metadata = buildMetadata({
  title: "WADRIP Privacy Policy",
  description:
    "How WADRIP, CreatorMonk's WhatsApp drip messaging service, handles the data we process on behalf of our clients.",
  path: "/wadrip-privacy",
});

const EFFECTIVE = "January 2026";

const sections = [
  {
    id: "01",
    title: "About WADRIP",
    content: [
      "WADRIP is a WhatsApp drip marketing service operated by <strong>CreatorMonk</strong>, based in Greater Noida, India.",
      "WADRIP is a fully managed service. We set up and run campaigns on behalf of our clients — clients do not create accounts or upload data themselves.",
      "This policy explains how we handle data while running WADRIP. For CreatorMonk's main website, see our <strong>creatormonk.in/privacy</strong> policy.",
    ],
  },
  {
    id: "02",
    title: "Data we process for clients",
    content: [
      "To run a WhatsApp campaign for a client, we process:",
      "• <strong>Contact lists:</strong> phone numbers and names our client provides for their campaign.",
      "• <strong>Message content:</strong> the messages and media a client wants sent.",
      "• <strong>Delivery data:</strong> which messages were sent, delivered, read or replied to.",
      "We process this data <strong>on behalf of our client</strong> — the client is the owner of their contact list, and we act only on their instructions.",
    ],
  },
  {
    id: "03",
    title: "Consent is the client's responsibility",
    content: [
      "Our clients are responsible for making sure they have permission to message every contact on their list.",
      "By giving us a contact list, a client confirms those people have agreed to receive messages, in line with WhatsApp's rules and applicable law.",
      "We do not buy, sell or source contact lists ourselves, and we do not use one client's contacts for anyone else.",
    ],
  },
  {
    id: "04",
    title: "How we use the data",
    content: [
      "We use the data a client gives us only to:",
      "• Run and deliver the campaigns they've asked for.",
      "• Report back on how those campaigns performed.",
      "• Improve delivery and troubleshoot issues.",
      "We never sell, rent or share client contact data with any third party beyond what's needed to send the messages.",
    ],
  },
  {
    id: "05",
    title: "WhatsApp & Meta",
    content: [
      "WADRIP campaigns are delivered through WhatsApp, which is operated by Meta.",
      "Message delivery is subject to WhatsApp's own terms and Meta's privacy policy, which we follow.",
      "Contacts can opt out at any time, and we honour opt-out requests promptly.",
    ],
  },
  {
    id: "06",
    title: "Data retention",
    content: [
      "We keep a client's contact lists and campaign data only while we're actively running campaigns for them, plus a short period afterwards for reporting.",
      "When a client stops working with us, we remove their contact data on request, or after a reasonable period once it's no longer needed.",
      "Delivery reports may be kept longer in summary form for our own records.",
    ],
  },
  {
    id: "07",
    title: "If you received a message",
    content: [
      "If you got a WADRIP message and want to stop, simply reply <strong>STOP</strong> or tell the sender — you'll be removed.",
      "The business that messaged you owns your contact details, not us. If you want your data removed entirely, contact them, or email us and we'll pass it on.",
      "You can reach us at <strong>hello@creatormonk.in</strong> for any concern.",
    ],
  },
  {
    id: "08",
    title: "Data security",
    content: [
      "We take security seriously:",
      "• Client data is stored securely and access is limited to people who need it.",
      "• Everything runs over encrypted connections.",
      "• We review our setup regularly.",
      "No online system is ever completely secure, but we act quickly if anything goes wrong.",
    ],
  },
  {
    id: "09",
    title: "Contact us",
    content: [
      "Questions about WADRIP or this policy? Reach us at:",
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
  name: "WADRIP Privacy Policy",
  url: absoluteUrl("/wadrip-privacy"),
  dateModified: "2026-01-01",
  publisher: { "@id": "https://creatormonk.in/#organization" },
};

export default function WadripPrivacyPolicy() {
  return (
    <main className={styles.main}>
      <JsonLd data={schema} />

      <section className={styles.hero}>
        <span className={styles.mesh} aria-hidden="true" />
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>WADRIP · Legal</span>
          <h1 className={styles.heroTitle}>
            Privacy <span className={styles.heroAccent}>Policy</span>
          </h1>
          <p className={styles.heroMeta}>
            Last updated: <strong>{EFFECTIVE}</strong>
          </p>
          <p className={styles.heroSubtitle}>
            WADRIP is a managed WhatsApp campaign service by CreatorMonk. Here's
            how we handle the data we process for our clients — in plain language.
          </p>
        </div>
      </section>

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

      <section className={styles.footerNote}>
        <p>
          WADRIP is operated by CreatorMonk. We may update this policy from time
          to time, with a new date shown above. Continued use of the service
          means you accept the current version.
        </p>
      </section>
    </main>
  );
}