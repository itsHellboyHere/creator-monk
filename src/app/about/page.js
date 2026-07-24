import FoundersReel from "../components/FoundersReel";
import OurStory from "../components/OurStory";
import Values from "../components/Values";
import TeamStack from "../components/TeamStack";
import AboutCta from "../components/AboutCTA";
import {
  SITE,
  buildMetadata,
  absoluteUrl,
  breadcrumbSchema,
  JsonLd,
} from "../lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description:
    "CreatorMonk started with a single YouTube thumbnail and grew into a web, AI and automation studio in Greater Noida. Meet the founders you'll actually work with.",
  path: "/about",
  keywords: [
    "about CreatorMonk",
    "web agency Greater Noida",
    "digital agency founders",
    "AI automation team India",
  ],
});

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About CreatorMonk",
    url: absoluteUrl("/about"),
    description:
      "How CreatorMonk started, what we believe, and the people behind the work.",
    isPartOf: { "@id": `${SITE.url}/#website` },
    mainEntity: { "@id": `${SITE.url}/#organization` },
  },
  /* Founders — helps Google connect real people to the brand */
  {
    "@context": "https://schema.org",
    "@id": `${SITE.url}/#organization`,
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    founder: [
      { "@type": "Person", name: "Rohan Raj", jobTitle: "Tech & Growth" },
      { "@type": "Person", name: "Vishal Kumar", jobTitle: "Software & AI" },
      { "@type": "Person", name: "Kundan Choudhary", jobTitle: "Studio & Operations" },
    ],
  },
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]),
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={schema} />

      <FoundersReel />
      <OurStory />
      <Values />
      <TeamStack />
      <AboutCta />
    </>
  );
}