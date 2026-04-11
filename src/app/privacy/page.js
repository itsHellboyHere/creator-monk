import styles from "./page.module.css";

export const metadata = {
  title: "Privacy Policy | CreatorMonk",
  description:
    "Learn how CreatorMonk collects, uses, and protects your personal data.",
};

const sections = [
  {
    id: "01",
    title: "Information We Collect",
    content: [
      "When you visit our website or use our services, we may collect the following types of information:",
      "• <strong>Personal Information:</strong> Name, email address, phone number, and business details you provide when filling out forms or contacting us.",
      "• <strong>Usage Data:</strong> Pages visited, time spent, browser type, device information, and IP address collected automatically via cookies and analytics tools.",
      "• <strong>Communication Data:</strong> Messages, queries, and any content you share with us through email, WhatsApp, or our contact forms.",
    ],
  },
  {
    id: "02",
    title: "How We Use Your Data",
    content: [
      "We use the information we collect for the following purposes:",
      "• To respond to your inquiries and deliver our services effectively.",
      "• To send you project updates, invoices, and relevant communications.",
      "• To improve our website experience and understand how visitors interact with our content.",
      "• To comply with legal obligations and protect our legal rights.",
      "We do not sell, rent, or trade your personal information to third parties.",
    ],
  },
  {
    id: "03",
    title: "Cookies & Tracking",
    content: [
      "Our website uses cookies to enhance your browsing experience. Cookies are small files stored on your device that help us:",
      "• Remember your preferences and settings.",
      "• Analyse website traffic through tools like Google Analytics.",
      "• Deliver relevant content and improve site performance.",
      "You can disable cookies in your browser settings at any time. Note that some features of our site may not function correctly without cookies.",
    ],
  },
  {
    id: "04",
    title: "Third-Party Services",
    content: [
      "We may use trusted third-party services to operate our business, including:",
      "• <strong>Google Analytics</strong> — for website traffic analysis.",
      "• <strong>Zoho / Nodemailer</strong> — for transactional email communications.",
      "• <strong>Meta (WhatsApp Business API)</strong> — for client communication.",
      "• <strong>Razorpay</strong> — for payment processing.",
      "These third parties have their own privacy policies and we encourage you to review them. We only share the minimum data required for these services to function.",
    ],
  },
  {
    id: "05",
    title: "Data Retention",
    content: [
      "We retain your personal data only as long as necessary to fulfill the purposes outlined in this policy, or as required by applicable law.",
      "Client project data is retained for a minimum of 2 years post-project completion for legal and audit purposes.",
      "You may request deletion of your data at any time by contacting us at the email below.",
    ],
  },
  {
    id: "06",
    title: "Your Rights",
    content: [
      "You have the following rights regarding your personal data:",
      "• <strong>Access:</strong> Request a copy of the data we hold about you.",
      "• <strong>Correction:</strong> Ask us to correct inaccurate or incomplete data.",
      "• <strong>Deletion:</strong> Request that we delete your personal data.",
      "• <strong>Objection:</strong> Object to how we process your data.",
      "To exercise any of these rights, contact us at <strong>hello@creatormonk.in</strong>.",
    ],
  },
  {
    id: "07",
    title: "Data Security",
    content: [
      "We take data security seriously. We implement industry-standard measures including:",
      "• HTTPS encryption across all web properties.",
      "• Restricted access to personal data on a need-to-know basis.",
      "• Regular security reviews of our infrastructure and third-party integrations.",
      "However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but commit to promptly addressing any breaches.",
    ],
  },
  {
    id: "08",
    title: "Contact Us",
    content: [
      "If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out to us:",
      "• <strong>Email:</strong> hello@creatormonk.in",
      "• <strong>Location:</strong> Greater Noida, Uttar Pradesh, India",
      "• <strong>Website:</strong> www.creatormonk.in",
      "We will respond to all privacy-related queries within 5 business days.",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <main className={styles.main}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Legal</p>
          <h1 className={styles.heroTitle}>
            Privacy
            <br />
            <span className={styles.heroAccent}>Policy</span>
          </h1>
          <p className={styles.heroMeta}>
            Effective Date: <strong>April 11, 2025</strong>&nbsp;&nbsp;|&nbsp;&nbsp;Last Updated:{" "}
            <strong>April 11, 2026</strong>
          </p>
          <p className={styles.heroSubtitle}>
            At CreatorMonk, your trust is everything. This policy explains what
            data we collect, why we collect it, and how we keep it safe.
          </p>
        </div>
        <div className={styles.heroDivider} />
      </section>

      {/* Sections */}
      <section className={styles.content}>
        <div className={styles.grid}>
          {sections.map((sec) => (
            <article key={sec.id} className={styles.card}>
              <div className={styles.cardNum}>{sec.id}</div>
              <h2 className={styles.cardTitle}>{sec.title}</h2>
              <div className={styles.cardBody}>
                {sec.content.map((para, i) => (
                  <p
                    key={i}
                    dangerouslySetInnerHTML={{ __html: para }}
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Footer note */}
      <section className={styles.footerNote}>
        <p>
          CreatorMonk reserves the right to update this Privacy Policy at any
          time. Changes will be posted on this page with a revised effective
          date. Continued use of our services constitutes acceptance of the
          updated policy.
        </p>
      </section>
    </main>
  );
}