import ServiceAbout from "./comp/ServiceAbout";
import ServiceDynamicIntro from "./comp/ServiceDynamicIntro";
import ServicePricing from "./comp/ServicePricing";
import ServiceProcess from "./comp/ServiceProcess";

const SERVICE_DATA = {
  "social-media": {
    title: (
      <>
        जन-जन तक पहुँच,{" "}
        <br />
        <span style={{ color: "var(--monk-orange)" }}>SOCIAL_OS की शक्ति से।</span>
      </>
    ),
    os: "SOCIAL_OS",
    dept: "DEPT_01",
    watermark: "REACH",
    tagline: "REACH ENGINE FOR THE MODERN EMPIRE.",
    image:
      "https://res.cloudinary.com/dgifa4wgb/image/upload/v1770541729/Gemini_Generated_Image_60g4e260g4e260g4-Photoroom_uebar1.png",
    accent: "#ffae00",
    accentRgb: "255,174,0",
    mission:
      "To architect a digital presence that doesn't just attract attention, but commands authority across the social battlefield.",
    stat: { value: "1M+", label: "Organic Reach Delivered" },
    about: {
      headline: "We don't post content. We engineer movements.",
      body: "Most brands treat social media like a billboard. We treat it like a growth system. Every Reel, every caption, every campaign is designed with one goal — compounding attention that converts into real business outcomes.",
      points: [
        {
          id: "LOGIC_01",
          head: "Algorithmic Dominance",
          desc: "We reverse-engineer platform logic — Reels, Shorts, feeds — so your content reaches people who actually care, not just your existing followers.",
        },
        {
          id: "LOGIC_02",
          head: "Narrative Architecture",
          desc: "Every post is a brick. We build a consistent content system where each piece reinforces your brand story and drives the next action.",
        },
        {
          id: "LOGIC_03",
          head: "Mass Influence at Scale",
          desc: "From zero to movement — we've taken brands from invisible to unavoidable. 10M+ organic reach delivered across creator and business accounts.",
        },
      ],
    },
    process: [
      { step: "01", title: "Brand Audit", desc: "We analyse your current presence, competitors, and audience before touching a single piece of content." },
      { step: "02", title: "Strategy Sprint", desc: "Content pillars, posting cadence, platform priorities, and hooks — all mapped out in a 30-day plan." },
      { step: "03", title: "Production", desc: "Scripts, shoots, edits, captions — the full pipeline handled by our team." },
      { step: "04", title: "Publish & Optimise", desc: "We post, track performance, and iterate every week based on real data." },
      { step: "05", title: "Monthly Report", desc: "Full breakdown of reach, engagement, follower growth, and what we're doing next." },
    ],
    plans: [
      {
        id: "S1",
        name: "Insta Launch",
        tag: "For brands starting out",
        features: [
          "Instagram Profile Optimisation",
          "Reels Content Strategy",
          "Posting Schedule & Hashtags",
          "Basic Performance Insights",
        ],
      },
      {
        id: "S2",
        name: "Reels Growth",
        tag: "For brands ready to scale",
        features: [
          "Viral Reels Strategy",
          "Reels Editing & Optimisation",
          "Audience Engagement Tactics",
          "Trend & Audio Research",
          "Growth Analytics Dashboard",
        ],
      },
      {
        id: "S3",
        name: "Social Scale",
        tag: "For brands going all-in",
        features: [
          "High-Volume Reels System",
          "Cross-Platform Social Promotion",
          "Monetisation Strategy",
          "Brand Collaboration Setup",
          "1:1 Growth Mentorship",
        ],
      },
    ],
  },

  "web-software": {
    title: (
      <>
        तकनीकी नींव,{" "}
        <br />
        <span style={{ color: "#4287f5" }}>BUILD_OS के साथ।</span>
      </>
    ),
    os: "BUILD_OS",
    dept: "DEPT_02",
    watermark: "BUILD",
    tagline: "CODE-DRIVEN SCALING INFRASTRUCTURE.",
    image:
      "https://res.cloudinary.com/dgifa4wgb/image/upload/v1770542917/Gemini_Generated_Image_lu3o8ilu3o8ilu3o-Photoroom_hl676a.png",
    accent: "#4287f5",
    accentRgb: "66,135,245",
    mission:
      "Building unshakeable software foundations that support rapid business scaling and complex user interactions.",
    stat: { value: "20+", label: "Products Shipped" },
    about: {
      headline: "We don't just write code. We build products that last.",
      body: "Most agencies hand you a website and disappear. We architect full digital products — with clean code, scalable infrastructure, and UX that converts. From a simple landing page to a complex SaaS with thousands of users, we build for the long term.",
      points: [
        {
          id: "CODE_01",
          head: "Full-Stack Mastery",
          desc: "Next.js on the front, Node.js or Python on the back, PostgreSQL underneath — production-grade stack every time.",
        },
        {
          id: "CODE_02",
          head: "Scalable Infrastructure",
          desc: "Systems designed to grow with your user base. We think about load, latency, and reliability from day one.",
        },
        {
          id: "CODE_03",
          head: "Intuitive UX/UI",
          desc: "Complex logic wrapped in interfaces people actually understand. Design and engineering work together, not against each other.",
        },
      ],
    },
    process: [
      { step: "01", title: "Discovery", desc: "We map your requirements, user flows, and technical constraints before writing a single line." },
      { step: "02", title: "Design", desc: "Wireframes to high-fidelity UI — approved by you before we build." },
      { step: "03", title: "Development", desc: "Agile sprints, weekly check-ins, and clean code that your team can maintain." },
      { step: "04", title: "QA & Testing", desc: "Cross-device, cross-browser, and stress-tested before launch." },
      { step: "05", title: "Deploy & Support", desc: "We ship, monitor, and stay on call for the first 30 days post-launch." },
    ],
    plans: [
      {
        id: "C1",
        name: "Starter Build",
        tag: "Landing pages & portfolios",
        features: [
          "Next.js Frontend",
          "Basic Backend Service",
          "Database Configuration",
          "Project Deployment",
        ],
      },
      {
        id: "C2",
        name: "Growth Build",
        tag: "Web apps & platforms",
        features: [
          "Advanced Frontend Architecture",
          "Backend API Design",
          "Database Design & Optimisation",
          "Object Storage Integration",
          "Secure Production Deployment",
        ],
      },
      {
        id: "C3",
        name: "Platform Build",
        tag: "Full SaaS & enterprise",
        features: [
          "Scalable Frontend System",
          "Full Backend Infrastructure",
          "Database + Object Storage",
          "Real-Time Features",
          "Production-Ready Architecture",
        ],
      },
    ],
  },

  "ai-automation": {
    title: (
      <>
        बुद्धिमान तंत्र,{" "}
        <br />
        <span style={{ color: "#10b981" }}>AUTO_OS के द्वारा।</span>
      </>
    ),
    os: "AUTO_OS",
    dept: "DEPT_03",
    watermark: "AUTO",
    tagline: "INTELLIGENT SYSTEMS THAT WORK WHILE YOU SLEEP.",
    image:
      "https://res.cloudinary.com/dgifa4wgb/image/upload/v1770543260/Gemini_Generated_Image_7dix3h7dix3h7dix-Photoroom_kshvpu.png",
    accent: "#10b981",
    accentRgb: "16,185,129",
    mission:
      "We build intelligent systems that replace repetitive work, scale operations, and give your team leverage they've never had before.",
    stat: { value: "24/7", label: "Systems Running Autonomously" },
    about: {
      headline: "We don't automate tasks. We eliminate entire workflows.",
      body: "Automation isn't about saving a few clicks. Done right, it restructures how your entire business operates. We build custom AI agents, intelligent pipelines, and deep integrations that replace whole categories of manual work — permanently.",
      points: [
        {
          id: "AUTO_01",
          head: "Custom AI Agents",
          desc: "LLM-powered agents trained on your data and wired into your workflows — not generic chatbots, but actual intelligent assistants.",
        },
        {
          id: "AUTO_02",
          head: "Workflow Elimination",
          desc: "We map every repetitive process in your business and replace it with automated systems that run without human input.",
        },
        {
          id: "AUTO_03",
          head: "Deep Integrations",
          desc: "CRMs, communication tools, data sources, payment systems — we connect everything so your team never has to copy-paste between tools again.",
        },
      ],
    },
    process: [
      { step: "01", title: "Workflow Audit", desc: "We map your current processes and identify exactly where AI and automation will have the highest ROI." },
      { step: "02", title: "System Design", desc: "We architect the automation flow — tools, triggers, data sources, and fallback logic." },
      { step: "03", title: "Build & Train", desc: "We build the pipelines, train any AI components on your data, and integrate with your existing tools." },
      { step: "04", title: "Test & Harden", desc: "Edge cases, failure modes, and security — we stress-test before anything goes live." },
      { step: "05", title: "Deploy & Monitor", desc: "Live systems with dashboards so you can see exactly what's running and what it's saving you." },
    ],
    plans: [
      {
        id: "A1",
        name: "Automation Starter",
        tag: "Simple workflow automation",
        features: [
          "Up to 3 Automated Workflows",
          "Tool Integrations",
          "Basic Notification Systems",
          "Setup & Documentation",
        ],
      },
      {
        id: "A2",
        name: "AI Agent Build",
        tag: "Custom AI for your business",
        features: [
          "Custom LLM Agent",
          "RAG System on Company Data",
          "API & CRM Integration",
          "AI Chatbot Deployment",
          "Performance Dashboard",
        ],
      },
      {
        id: "A3",
        name: "Full AI Stack",
        tag: "End-to-end AI-powered operations",
        features: [
          "Full Stack AI Software",
          "Custom Dashboard & Analytics",
          "RAG + Multi-Agent Systems",
          "Full System & Tool Integration",
          "Data Pipelines",
          "Ongoing Maintenance & Updates",
        ],
      },
    ],
  },
};

export default async function Page({ params }) {
  const { slug } = await params;
  const data = SERVICE_DATA[slug] || SERVICE_DATA["social-media"];

  return (
    <main style={{ backgroundColor: "#020203", minHeight: "200vh" }}>
      <ServiceDynamicIntro
        title={data.title}
        imageSrc={data.image}
        tagline={data.tagline}
      />
      <ServiceAbout
        os={data.os}
        dept={data.dept}
        watermark={data.watermark}
        mission={data.mission}
        stat={data.stat}
        about={data.about}
        accent={data.accent}
        accentRgb={data.accentRgb}
      />
      <ServiceProcess
        steps={data.process}
        accent={data.accent}
        accentRgb={data.accentRgb}
        os={data.os}
      />
      <ServicePricing
        plans={data.plans}
        accent={data.accent}
        os={data.os}
      />
    </main>
  );
}