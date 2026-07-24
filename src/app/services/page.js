import ServicesHubHero from "../components/service/ServicesHubHero";
import ServicesGrid from "../components/service/ServicesGrid";
import ServicesCta from "../components/service/ServicesCta";
import { SERVICES } from "../data/servicesData";
import {
  SITE,
  buildMetadata,
  absoluteUrl,
  breadcrumbSchema,
  JsonLd,
} from "../lib/seo";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Websites, mobile apps, AI and automation, social media, branding and video editing — everything CreatorMonk builds for growing businesses.",
  path: "/services",
  keywords: [
    "web development services",
    "app development company",
    "AI automation services",
    "social media management agency",
    "branding services India",
    "video editing services",
  ],
});

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Services",
    url: absoluteUrl("/services"),
    description:
      "Everything CreatorMonk builds — websites, apps, AI automation, social media, branding and video.",
    isPartOf: { "@id": `${SITE.url}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: Object.values(SERVICES).map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.title,
        url: absoluteUrl(`/services/${s.slug}`),
      })),
    },
  },
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ]),
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={schema} />
      <ServicesHubHero />
      <ServicesGrid />
      <ServicesCta />
    </>
  );
}