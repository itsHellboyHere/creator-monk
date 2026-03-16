"use client";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import styles from "@/app/css/ServicesPortals.module.css";

const servicePortals = [
  {
    id: "01",
    title: "SOCIAL_OS",
    label: "Social Media & Content",
    sublabel: "Reels · Shorts · Strategy · Community",
    tagline: "We turn your brand into a scroll-stopping machine.",
    description:
      "Full-spectrum social management — scripting viral Reels, managing your community, running paid campaigns, and delivering monthly growth reports. You focus on the business, we handle the noise.",
    what: [
      { text: "Reel & Short-form Video Production", icon: "▶" },
      { text: "Content Calendar & Strategy", icon: "◈" },
      { text: "Community Management", icon: "◎" },
      { text: "Paid Ads & Performance Analytics", icon: "◆" },
      { text: "Brand Storytelling & Copywriting", icon: "◇" },
    ],
    img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000",
    color: "#ffae00",
    colorRgb: "255, 174, 0",
    route: "social-media",
  },
  {
    id: "02",
    title: "BUILD_OS",
    label: "Web, Apps & Software",
    sublabel: "Websites · SaaS · Mobile · APIs",
    tagline: "From idea to scalable product — we build it.",
    description:
      "Custom digital products built to perform. Landing page to full SaaS platform — we architect, design, and ship with Next.js, Python, and Node.js at the core.",
    what: [
      { text: "Business & Portfolio Websites", icon: "▶" },
      { text: "SaaS Platforms & Web Apps", icon: "◈" },
      // { text: "Mobile Apps (iOS & Android)", icon: "◎" },
      { text: "Backend APIs & Databases", icon: "◆" },
      { text: "E-commerce & Custom Portals", icon: "◇" },
    ],
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000",
    color: "#4287f5",
    colorRgb: "66, 135, 245",
    route: "web-software",
  },
  {
    id: "03",
    title: "AUTO_OS",
    label: "AI & Automation",
    sublabel: "Agents · Workflows · Chatbots · APIs",
    tagline: "Intelligent systems that work while you sleep.",
    description:
      "We replace repetitive work with AI. Custom agents, automated pipelines, smart chatbots, and deep integrations built to reduce overhead and scale your operations without scaling headcount.",
    what: [
      { text: "Custom AI Agents & Assistants", icon: "▶" },
      { text: "Workflow & Process Automation", icon: "◈" },
      { text: "AI Chatbots for Support & Sales", icon: "◎" },
      { text: "CRM & Third-party Integrations", icon: "◆" },
      { text: "Data Pipelines & Auto-Reporting", icon: "◇" },
    ],
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1000",
    color: "#10b981",
    colorRgb: "16, 185, 129",
    route: "ai-automation",
  },
];

function PortalCard({ item, i }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={styles.cardWrapper}
    >
      <Link
        href={`/services/${item.route}`}
        className={styles.glassCard}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ "--card-color": item.color, "--card-rgb": item.colorRgb }}
      >
        {/* ── Image Stack ── */}
        <div className={styles.visualStack}>
          <img
            src={item.img}
            alt={item.label}
            className={styles.glowImg}
            style={{ transform: hovered ? "scale(1.07)" : "scale(1)" }}
          />
          <div
            className={styles.colorTint}
            style={{ opacity: hovered ? 0.3 : 0 }}
          />
          <div className={styles.glassOverlay} />

          <div className={styles.cardTopMeta}>
            <span className={styles.deptTag}>DEPT_{item.id}</span>
          </div>

          <div
            className={styles.cardInfo}
            style={{ transform: hovered ? "translateY(-6px)" : "translateY(0)" }}
          >
            <h3 className={styles.title}>{item.title}</h3>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className={styles.footerArea}>
          <div className={styles.labelGroup}>
            <p className={styles.label}>{item.label}</p>
            <p className={styles.sublabel}>{item.sublabel}</p>
          </div>
          <div className={styles.launchBtn}>
            <span className={styles.launchText}>EXPLORE</span>
            <div className={styles.circle} />
          </div>
        </div>

        {/* ── Hover Reveal Panel ── */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="reveal"
              className={styles.hoverReveal}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Left accent bar */}
              <div
                className={styles.revealAccentBar}
                style={{ background: item.color }}
              />

              <div className={styles.revealInner}>
                <p className={styles.revealTagline} style={{ color: item.color }}>
                  {item.tagline}
                </p>
                <p className={styles.revealDesc}>{item.description}</p>

                <div className={styles.revealDivider} />

                <p className={styles.revealListLabel}>WHAT'S INCLUDED</p>
                <ul className={styles.whatList}>
                  {item.what.map((w, idx) => (
                    <motion.li
                      key={w.text}
                      className={styles.whatItem}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 + idx * 0.055, duration: 0.3 }}
                    >
                      <span
                        className={styles.whatIcon}
                        style={{ color: item.color }}
                      >
                        {w.icon}
                      </span>
                      <span className={styles.whatText}>{w.text}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className={styles.revealCta}>
                  <span
                    className={styles.revealCtaText}
                    style={{ color: item.color }}
                  >
                    View Full Service
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M2 7h10M8 3l4 4-4 4"
                      stroke={item.color}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Link>
    </motion.div>
  );
}

export default function ServicePortals() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const bgColor = useTransform(smoothProgress, [0.05, 0.35], ["#020203", "#F0F0EE"]);
  const cardScale = useTransform(smoothProgress, [0, 0.25], [0.94, 1]);
  const watermarkOpacity = useTransform(
    smoothProgress,
    [0.25, 0.42, 0.82, 0.96],
    [0, 0.055, 0.055, 0]
  );

  return (
    <motion.section
      ref={containerRef}
      style={{ backgroundColor: bgColor }}
      className={styles.section}
    >
      {/* Watermark — contained, never bleeds */}
      <motion.div style={{ opacity: watermarkOpacity }} className={styles.watermark}>
        STUDIO
      </motion.div>

      <div className={styles.container}>

        {/* ── Section Intro ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className={styles.sectionIntro}
        >
          <div className={styles.introBadgeRow}>
            <span className={styles.introDash} />
            <span className={styles.introBadge}>WHAT WE DO</span>
            <span className={styles.introDash} />
          </div>
          <h2 className={styles.introTitle}>
            Three Core{" "}
            <span className={styles.introThin}>Divisions</span>
          </h2>
          <p className={styles.introDesc}>
            CreatorMonk is a full-stack digital agency. Whether you need content
            that goes viral, software that scales, or AI that automates — we
            deliver end-to-end, under one roof.
          </p>
        </motion.div>

        {/* ── Cards Grid ── */}
        <motion.div style={{ scale: cardScale }} className={styles.grid}>
          {servicePortals.map((item, i) => (
            <PortalCard key={item.id} item={item} i={i} />
          ))}
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={styles.bottomCta}
        >
          <div className={styles.ctaInner}>
            <div className={styles.ctaLeft}>
              <p className={styles.ctaLabel}>NOT SURE WHERE TO START?</p>
              <p className={styles.ctaTitle}>Let's figure it out together.</p>
            </div>
            <Link href="/contact" className={styles.ctaBtn}>
              FREE CONSULTATION
              <span className={styles.ctaArrow}>→</span>
            </Link>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
}