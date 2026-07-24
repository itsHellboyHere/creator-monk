/* ============================================================
   CREATORMONK — central SEO config
   Every page pulls from here. Change once, updates everywhere.
   ============================================================ */

export const SITE = {
  name: "CreatorMonk",
  legalName: "CreatorMonk",
  url: "https://creatormonk.in",
  tagline: "Web, AI & Automation Agency",

  description:
    "CreatorMonk builds websites, apps, AI systems and automation for growing businesses — designed clean, shipped fast.",

  ogImage: "/og.png",
  logo: "/logo1.png",

  locale: "en_IN",
  lang: "en",

  /* TODO: fill in the real handles */
  socials: [
    "https://www.instagram.com/creatormonk.in",
    "https://www.linkedin.com/company/creatormonk",
    // "https://www.youtube.com/@creatormonk",
  ],

  contact: {
    phones: ["+917827332337", "+917004671676"],
    whatsapp: "917827332337",
    email: "hello@creatormonk.in", // TODO: confirm
  },

  address: {
    locality: "Greater Noida",
    region: "Uttar Pradesh",
    country: "IN",
  },

  /* Areas we actually serve — helps local intent queries */
  serviceAreas: ["Greater Noida", "Noida", "Delhi NCR", "India"],
};

/* ---------- helpers ---------- */

export function absoluteUrl(path = "/") {
  if (!path.startsWith("/")) path = `/${path}`;
  return `${SITE.url}${path === "/" ? "" : path}`;
}

/**
 * Build a Next.js metadata object for any page.
 * Only pass what differs — everything else falls back to SITE.
 */
export function buildMetadata({
  title,
  description = SITE.description,
  path = "/",
  image = SITE.ogImage,
  keywords,
  type = "website",
  noIndex = false,
} = {}) {
  const url = absoluteUrl(path);

  /* Homepage uses the full title; inner pages get the "%s | CreatorMonk"
   * template from the root layout, so we pass the bare title there. */
  const ogTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} – ${SITE.tagline}`;

  return {
    ...(title ? { title } : {}),
    description,
    ...(keywords ? { keywords } : {}),

    alternates: { canonical: url },

    openGraph: {
      type,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      title: ogTitle,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${SITE.name} — ${SITE.tagline}`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [image],
    },

    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : {
          robots: {
            index: true,
            follow: true,
            googleBot: {
              index: true,
              follow: true,
              "max-image-preview": "large",
              "max-snippet": -1,
              "max-video-preview": -1,
            },
          },
        }),
  };
}

/* ---------- JSON-LD builders ---------- */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: absoluteUrl(SITE.logo),
    image: absoluteUrl(SITE.ogImage),
    description: SITE.description,
    sameAs: SITE.socials,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    contactPoint: SITE.contact.phones.map((phone) => ({
      "@type": "ContactPoint",
      telephone: phone,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: "en-IN",
  };
}

/** Local intent — "web development agency in Greater Noida" style queries */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#localbusiness`,
    name: SITE.name,
    url: SITE.url,
    image: absoluteUrl(SITE.ogImage),
    telephone: SITE.contact.phones[0],
    description: SITE.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    areaServed: SITE.serviceAreas.map((name) => ({ "@type": "Place", name })),
    priceRange: "$$",
  };
}

export function breadcrumbSchema(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema({ name, description, path }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    serviceType: name,
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: SITE.serviceAreas.map((n) => ({ "@type": "Place", name: n })),
  };
}

export function faqSchema(faqs = []) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q ?? f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a ?? f.answer,
      },
    })),
  };
}

/* ---------- render helper ---------- */

/**
 * Drop <JsonLd data={...} /> anywhere in a server component.
 * Accepts a single schema object or an array.
 */
export function JsonLd({ data }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

/* ---------- Cloudinary OG crop ---------- */

/** Turn any Cloudinary image URL into a 1200x630 OG-ready crop. */
export function ogFromCloudinary(url) {
  if (!url) return SITE.ogImage;
  if (url.includes("img.youtube.com")) return url; // already 1280x720
  if (!url.includes("res.cloudinary.com")) return SITE.ogImage;
  return url.replace(
    "/upload/",
    "/upload/c_fill,g_auto,w_1200,h_630,f_jpg,q_auto/"
  );
}