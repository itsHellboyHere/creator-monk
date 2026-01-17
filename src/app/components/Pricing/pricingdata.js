// pricingData.js
export const PLANS = {
  instagram: [
    {
      name: "Starter Pack – Insta",
      priceLabel: "₹9,999",
      features: [
        "Basic strategy + Content Calendar",
        "Reels Editing + Post Design",
        "6 Reels + 8 Posts / Month",
        "Captions + Hashtags (SEO – Basic)",
      ],
      pricing: { monthly: 9999, sixMonths: 49999 },
    },
    {
      name: "Growth Pack – Insta",
      priceLabel: "₹19,999",
      features: [
        "Weekly Trend Research + Content Planning",
        "Better Reels Structure (Hook + Retention)",
        "Insta SEO Captions + Hashtags Research",
        "Monthly Analytics Report",
        "12 Reels / Month",
        "16 Posts / Month",
        "8 Stories / Month",
      ],
      pricing: { monthly: 19999, sixMonths: 99999 },
      popular: true,
    },
    {
      name: "Premium – Insta",
      priceLabel: "₹34,999",
      features: [
        "Full account handling + Scheduling",
        "Weekly strategy + Trend prediction",
        "Advanced growth tracking",
        "Dedicated support",
        "20 Reels / Month",
        "25 Posts / Month",
        "12 Stories / Month",
      ],
      pricing: { monthly: 34999, sixMonths: 174999 },
    },
  ],

  youtube: [
    {
      name: "Starter – YouTube",
      priceLabel: "₹14,999",
      features: [
        "Channel audit + Strategy",
        "4 Videos / Month",
        "SEO titles & descriptions",
        "Basic thumbnail design",
      ],
      pricing: { monthly: 14999, sixMonths: 74999 },
    },
    {
      name: "Growth – YouTube",
      priceLabel: "₹29,999",
      features: [
        "8 Videos / Month",
        "Advanced SEO & CTR",
        "Thumbnail optimization",
        "Analytics & improvement report",
      ],
      pricing: { monthly: 29999, sixMonths: 149999 },
    },
  ],

  website: [
    {
      name: "Website – Basic",
      priceLabel: "₹24,999",
      features: [
        "Static website (5 pages)",
        "Mobile responsive",
        "Basic SEO setup",
        "Contact form",
      ],
      pricing: { oneTime: 24999 },
    },
    {
      name: "Website – Advanced",
      priceLabel: "₹59,999",
      features: [
        "Dynamic website",
        "Admin panel",
        "SEO optimization",
        "1 year support",
      ],
      pricing: { oneTime: 59999 },
    },
  ],
};