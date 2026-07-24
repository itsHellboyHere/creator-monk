import Contact from "../components/Contact";
import {
  SITE,
  buildMetadata,
  absoluteUrl,
  breadcrumbSchema,
  JsonLd,
} from "../lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Tell us what you're working on and we'll reply with honest advice, not a sales pitch. A short call, then a clear quote.",
  path: "/contact",
  keywords: [
    "contact CreatorMonk",
    "hire web developer Greater Noida",
    "get a website quote",
    "AI automation consultation",
  ],
});

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact CreatorMonk",
    url: absoluteUrl("/contact"),
    description:
      "Get in touch with CreatorMonk for websites, apps, AI automation, branding, social media and video.",
    isPartOf: { "@id": `${SITE.url}/#website` },
    mainEntity: {
      "@id": `${SITE.url}/#organization`,
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      email: SITE.contact.email,
      telephone: SITE.contact.phones[0],
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.address.locality,
        addressRegion: SITE.address.region,
        addressCountry: SITE.address.country,
      },
    },
  },
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]),
];

export default function ContactPage() {
  return (
    <main>
      <JsonLd data={schema} />
      <Contact />
    </main>
  );
}