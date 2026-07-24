import Hero from "./components/Hero";
import Features from "./components/Features";
import Impact from "./components/Impact";
import TechStack from "./components/TechStack";
import Process from "./components/Process";
import TrustedBy from "./components/TrustedBy";
import FinalCTA from "./components/FinalCta";

import { SERVICES } from "./data/servicesData";
import { SITE, buildMetadata, absoluteUrl, JsonLd } from "./lib/seo";

export const metadata = buildMetadata({
  /* no title → inherits the full default from layout, not "Home | ..." */
  description:
    "CreatorMonk is a web, AI and automation agency in Greater Noida. We build websites, mobile apps, AI assistants, WhatsApp automation, branding and social media content for growing businesses.",
  path: "/",
  keywords: [
    "web development agency",
    "AI automation agency India",
    "website design Greater Noida",
    "WhatsApp automation",
    "AI chatbot development",
    "mobile app development",
    "social media management",
    "Noida web agency",
  ],
});

const servicesList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "CreatorMonk services",
  itemListElement: Object.values(SERVICES).map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title,
      description: s.hero.sub,
      url: absoluteUrl(`/services/${s.slug}`),
      provider: { "@id": `${SITE.url}/#organization` },
    },
  })),
};

export default function Home() {
  return (
    <>
      <JsonLd data={servicesList} />

      <Hero />
      <Features />
      <Impact />
      <TechStack />
      <Process />
      <TrustedBy />
      <FinalCTA />
    </>
  );
}