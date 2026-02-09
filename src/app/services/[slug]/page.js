
import ServiceAbout from "./comp/ServiceAbout";
import ServiceDynamicIntro from "./comp/ServiceDynamicIntro";
import ServicePricing from "./comp/ServicePricing";

const SERVICE_DATA = {
  "social-os": {
    title: (
      <>जन-जन तक पहुँच, <br /><span style={{ color: "var(--monk-orange)" }}>SOCIAL_OS की शक्ति से।</span></>
    ),
    watermark: "REACH", // Precise architectural term
    tagline: "REACH ENGINE FOR THE MODERN EMPIRE.",
    image: "https://res.cloudinary.com/dgifa4wgb/image/upload/v1770541729/Gemini_Generated_Image_60g4e260g4e260g4-Photoroom_uebar1.png", 
    accent: "#ffae00",
    mission: "To architect a digital presence that doesn't just attract attention, but commands authority across the social battlefield.",
    benefits: [
      { id: "LOGIC_01", head: "Algorithmic Dominance", desc: "Reverse-engineering platform logic to center your message." },
      { id: "LOGIC_02", head: "Narrative Architecture", desc: "Every post is a brick in your digital empire, built with precision." },
      { id: "LOGIC_03", head: "Mass Influence", desc: "Scaling your voice from a single person to an unstoppable movement." }
    ],
    plans: [
  {
    id: "S1",
    name: "Insta Launch",
    price: "₹14,999",
    features: [
      "Instagram Profile Optimization",
      "Reels Content Strategy",
      "Posting Schedule & Hashtags",
      "Basic Performance Insights"
    ]
  },
  {
    id: "S2",
    name: "Reels Growth",
    price: "₹24,999",
    features: [
      "Viral Reels Strategy",
      "Reels Editing & Optimization",
      "Audience Engagement Tactics",
      "Trend & Audio Research",
      "Growth Analytics"
    ]
  },
  {
    id: "S3",
    name: "Social Scale",
    price: "₹49,999",
    features: [
      "High-Volume Reels System",
      "Cross-Platform Social Promotion",
      "Monetization Strategy",
      "Brand Collaboration Setup",
      "1:1 Growth Mentorship"
    ]
  }
],
  },
  "soft-os": {
    title: (
      <>तकनीकी नीव, <br /><span style={{ color: "#00f2ff" }}>SOFT_OS के साथ।</span></>
    ),
    watermark: "CORE", // Technical software term
    tagline: "CODE-DRIVEN SCALING INFRASTRUCTURE.",
    image: "https://res.cloudinary.com/dgifa4wgb/image/upload/v1770542917/Gemini_Generated_Image_lu3o8ilu3o8ilu3o-Photoroom_hl676a.png",
    accent: "#00f2ff",
    mission: "Building unshakeable software foundations that support rapid business scaling and complex user interactions.",
    benefits: [
      { id: "CODE_01", head: "Full-Stack Mastery", desc: "Leveraging Django and React for high-performance digital tools." },
      { id: "CODE_02", head: "Scalable Infrastructure", desc: "Systems designed to grow with your user base without breaking." },
      { id: "CODE_03", head: "Intuitive UX/UI", desc: "Complex logic wrapped in beautiful, user-centric interfaces." }
    ],
    plans: [
  {
    id: "C1",
    name: "Creator Monk – Starter",
    price: "₹10,000",
    features: [
      "Next.js Frontend ",
      "Basic Backend Service",
      "Database Configuration",
      "Project Deployment"
    ]
  },
  {
    id: "C2",
    name: "Creator Monk – Growth",
    price: "₹25,000",
    features: [
      "Advanced Search Container",
      "Backend API Architecture",
      "Database Design & Optimization",
      "Object Storage Integration",
      "Secure Deployment"
    ]
  },
  {
    id: "C3",
    name: "Creator Monk – Platform",
    price: "₹30,000",
    features: [
      "Search Container (Scalable)",
      "Full Backend System",
      "Database + Object Storage",
      "Real-Time Chat Service",
      "Production-Ready Architecture"
    ]
  }
],
  },
  "film-os": {
    title: (
      <>दृश्य कला की दृष्टि, <br /><span style={{ color: "#ff3e3e" }}>FILM_OS के माध्यम से।</span></>
    ),
    watermark: "LENS", 
    tagline: "CINEMATIC STORYTELLING FOR THE DIGITAL EMPIRE.",
    image: "https://res.cloudinary.com/dgifa4wgb/image/upload/v1770543260/Gemini_Generated_Image_7dix3h7dix3h7dix-Photoroom_kshvpu.png", 
    accent: "#ff3e3e",
    mission: "Translating divine vision into cinematic reality through high-end narrative content and visual effects.",
    benefits: [
      { id: "FILM_01", head: "Cinematic Narrative", desc: "Crafting stories that resonate deeply with your target audience." },
      { id: "FILM_02", head: "Visual Mastery", desc: "High-end production quality that sets your brand apart from competitors." },
      { id: "FILM_03", head: "Divine Vision", desc: "Merging spiritual storytelling with modern visual technology." }
    ],
    plans:[
       {
    id: "Y1",
    name: "YouTube Starter",
    price: "₹10,000 / month",
    features: [
      "Channel Audit & Content Strategy",
      "4 Long-Form Videos / Month",
      "SEO Titles & Descriptions",
      "Basic Thumbnail Design"
    ]
  },
  {
    id: "Y2",
    name: "YouTube Growth",
    price: "₹20,000 / month",
    features: [
      "8 Long-Form Videos / Month",
      "Advanced SEO & CTR Optimization",
      "Thumbnail Optimization",
      "Analytics & Improvement Report"
    ]
  },
    ]
  }
};

export default async function Page({params}) {
  const { slug } = await params;
  const data = SERVICE_DATA[slug] || SERVICE_DATA["social-os"];

  return (
    <main style={{ backgroundColor: "#020203", minHeight: "200vh" }}>
      <ServiceDynamicIntro 
        title={data.title} 
        imageSrc={data.image} 
        tagline={data.tagline} 
      />
      <ServiceAbout 
        title={data.watermark}
        mission={data.mission}
        benefits={data.benefits}
        accent={data.accent}
      />
<ServicePricing 
plans={data.plans}
accent={data.accent}
/>
    </main>
  );
}