import { notFound } from "next/navigation";
import { SERVICES, SERVICE_SLUGS } from "@/app/data/servicesData";
import ServiceHero from "@/app/components/service/ServiceHero";
import ServiceValueProps from "@/app/components/service/ServiceValueProps";
import ServiceShowcase from "@/app/components/service/ServiceShowcase";
import ServiceProcess from "@/app/components/service/ServiceProcess";
import ServiceIncluded from "@/app/components/service/ServiceIncluded";
import ServiceFaq from "@/app/components/service/ServiceFaq";
import {
  buildMetadata,
  ogFromCloudinary,
  serviceSchema,
  breadcrumbSchema,
  faqSchema,
  JsonLd,
} from "@/app/lib/seo";

/* All 6 pages get pre-rendered at build time */
export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = SERVICES[slug];

  if (!data) {
    return buildMetadata({ title: "Not found", path: "/services", noIndex: true });
  }

  /* first showcase image doubles as this page's OG card */
  const firstImage = data.showcase?.items?.find((i) => i.type === "image")?.url;

  return buildMetadata({
    title: data.title,
    description: data.hero.sub,
    path: `/services/${slug}`,
    image: ogFromCloudinary(firstImage),
    keywords: [
      data.title,
      `${data.title} agency`,
      `${data.title} India`,
      `${data.title} Greater Noida`,
      `${data.title} company`,
    ],
  });
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const data = SERVICES[slug];
  if (!data) notFound();

  const schema = [
    serviceSchema({
      name: data.title,
      description: data.hero.sub,
      path: `/services/${slug}`,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: data.title, path: `/services/${slug}` },
    ]),
    faqSchema(data.faqs),
  ];

  return (
    <main>
      <JsonLd data={schema} />

      <ServiceHero data={data} />
      <ServiceValueProps data={data} />
      <ServiceShowcase data={data} />
      <ServiceProcess data={data} />
      <ServiceIncluded data={data} />
      <ServiceFaq data={data} />
    </main>
  );
}