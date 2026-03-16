"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import styles from "@/app/css/OurServices.module.css";

const services = [
  {
    id: "01",
    os: "SOCIAL_OS",
    dept: "DEPT_01",
    label: "Social Media & Content",
    tagline: "We turn your brand into a scroll-stopping machine.",
    description:
      "Full-spectrum social management built for growth. We script, shoot, edit, post, and report — every month, consistently. You stay focused on your business while we engineer attention at scale.",
    stat: { value: "1M+", label: "Organic Reach Delivered" },
    what: [
      { icon: "▶", title: "Reel & Short-form Production", sub: "Script to upload — full pipeline managed" },
      { icon: "◈", title: "Content Calendar & Strategy", sub: "Monthly planning, trend research, scheduling" },
      { icon: "◎", title: "Community Management", sub: "DMs, comments, engagement handled daily" },
      { icon: "◆", title: "Paid Ads & Performance Analytics", sub: "Meta & Google campaigns with monthly reports" },
      { icon: "◇", title: "Brand Storytelling & Copywriting", sub: "Captions, hooks, and brand voice across platforms" },
    ],
    img: "https://res.cloudinary.com/dgifa4wgb/image/upload/v1773681431/Gemini_Generated_Image_adi1vradi1vradi1-2_irlqd3.jpg",
    color: "#ffae00",
    colorRgb: "255,174,0",
    route: "/services/social-media",
    flip: false,
  },
  {
    id: "02",
    os: "BUILD_OS",
    dept: "DEPT_02",
    label: "Web Apps & Software",
    tagline: "From idea to scalable product — we build it.",
    description:
      "We design and engineer digital products that perform under pressure. From a landing page that converts on day one to a full SaaS platform built for thousands of users — we architect, build, and ship.",
    stat: { value: "20+", label: "Products Shipped" },
    what: [
      { icon: "▶", title: "Business & Portfolio Websites", sub: "Fast, conversion-optimised, built in Next.js" },
      { icon: "◈", title: "SaaS Platforms & Web Apps", sub: "Full-stack products with auth, billing, dashboards" },
      // { icon: "◎", title: "Mobile Apps (iOS & Android)", sub: "React Native apps from design to App Store" },
      { icon: "◆", title: "Backend APIs & Databases", sub: "Node.js, Python, PostgreSQL, scalable infra" },
      { icon: "◇", title: "E-commerce & Custom Portals", sub: "Shopify, custom carts, B2B client portals" },
    ],
    img: "https://res.cloudinary.com/dgifa4wgb/image/upload/v1773681247/Gemini_Generated_Image_trdipqtrdipqtrdi_oskvnw.jpg",
    color: "#4287f5",
    colorRgb: "66,135,245",
    route: "/services/web-software",
    flip: true,
  },
  {
    id: "03",
    os: "AUTO_OS",
    dept: "DEPT_03",
    label: "AI & Automation",
    tagline: "Intelligent systems that work while you sleep.",
    description:
      "We build AI that replaces repetitive work. Custom agents, automated pipelines, smart chatbots, deep integrations — systems designed to cut overhead, scale operations, and give your team leverage.",
    stat: { value: "24/7", label: "Systems Running Autonomously" },
    what: [
      { icon: "▶", title: "Custom AI Agents & Assistants", sub: "LLM-powered agents for your specific workflows" },
      { icon: "◈", title: "Workflow & Process Automation", sub: "custom pipelines — no manual steps" },
      { icon: "◎", title: "AI Chatbots for Support & Sales", sub: "Trained on your data, live on your site" },
      { icon: "◆", title: "CRM & Third-party Integrations", sub: "API connections" },
      { icon: "◇", title: "Data Pipelines & Auto-Reporting", sub: "Automated dashboards and scheduled insights" },
    ],
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1400&auto=format&fit=crop",
    color: "#10b981",
    colorRgb: "16,185,129",
    route: "/services/ai-automation",
    flip: false,
  },
];

function ServiceBlock({ service }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const blockOpacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0.7]);

  return (
    <motion.div
      ref={ref}
      className={`${styles.block} ${service.flip ? styles.blockFlip : ""}`}
      style={{
        "--accent": service.color,
        "--accent-rgb": service.colorRgb,
        opacity: blockOpacity,
      }}
    >
      {/* Big faded number — background depth */}
      <span className={styles.bgNum}>{service.id}</span>

      {/* Subtle accent tint wash across whole block */}
      <div
        className={styles.blockTint}
        style={{ background: `rgba(${service.colorRgb}, 0.03)` }}
      />

      {/* ═══ IMAGE COLUMN ═══ */}
      <div className={styles.imgCol}>
        <div className={styles.imgFrame}>
          <motion.div style={{ y: imgY }} className={styles.imgInner}>
            <img src={service.img} alt={service.os} className={styles.img} />
          </motion.div>

          {/* Dark gradient overlay */}
          <div className={styles.imgOverlay} />

          {/* Color tint overlay */}
          <div
            className={styles.imgTint}
            style={{ background: `rgba(${service.colorRgb}, 0.25)` }}
          />

          {/* Dept tag — top */}
          <div className={styles.imgDept}>
            <span
              className={styles.deptDot}
              style={{ background: service.color }}
            />
            <span className={styles.deptText}>{service.dept}</span>
          </div>

          {/* Floating stat card — bottom */}
          <motion.div
            className={styles.statCard}
            initial={{ opacity: 0, y: 18, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className={styles.statValue}
              style={{ color: service.color }}
            >
              {service.stat.value}
            </span>
            <span className={styles.statLabel}>{service.stat.label}</span>
          </motion.div>
        </div>
      </div>

      {/* ═══ CONTENT COLUMN ═══ */}
      <div className={styles.contentCol}>
        <motion.div
          className={styles.contentInner}
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* OS identifier row */}
          <div className={styles.osRow}>
            <div
              className={styles.osLine}
              style={{ background: service.color }}
            />
            <span className={styles.osLabel} style={{ color: service.color }}>
              {service.os}
            </span>
          </div>

          {/* Heading */}
          <h2 className={styles.heading}>{service.label}</h2>

          {/* Tagline */}
          <p className={styles.tagline}>{service.tagline}</p>

          {/* Description */}
          <p className={styles.desc}>{service.description}</p>

          {/* Divider */}
          <div
            className={styles.divider}
            style={{ background: `rgba(${service.colorRgb}, 0.2)` }}
          />

          {/* Includes label */}
          <p className={styles.includesLabel}>WHAT'S INCLUDED</p>

          {/* Services list */}
          <ul className={styles.whatList}>
            {service.what.map((item, i) => (
              <motion.li
                key={item.title}
                className={styles.whatItem}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 + i * 0.075, duration: 0.5 }}
              >
                <span
                  className={styles.whatIcon}
                  style={{ color: service.color }}
                >
                  {item.icon}
                </span>
                <div className={styles.whatBody}>
                  <span className={styles.whatTitle}>{item.title}</span>
                  <span className={styles.whatSub}>{item.sub}</span>
                </div>
              </motion.li>
            ))}
          </ul>

          {/* CTA link */}
          <Link href={service.route} className={styles.cta}>
            <span className={styles.ctaLabel}>EXPLORE {service.os}</span>
            <span
              className={styles.ctaUnderline}
              style={{ background: service.color }}
            />
            <span className={styles.ctaArrow} style={{ color: service.color }}>
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function OurServices() {
  return (
    <section className={styles.section}>

      {/* ── Header ── */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.headerBadgeRow}>
          <span className={styles.headerDash} />
          <span className={styles.headerBadge}>OUR SERVICES</span>
          <span className={styles.headerDash} />
        </div>
        <h2 className={styles.headerTitle}>
          What We{" "}
          <span className={styles.headerThin}>Build For You</span>
        </h2>
        <p className={styles.headerDesc}>
          Three divisions. One agency. Everything your brand needs to grow,
          scale, and automate — delivered end-to-end, under one roof.
        </p>
      </motion.div>

      {/* ── Blocks ── */}
      <div className={styles.blocks}>
        {services.map((service, i) => (
          <ServiceBlock key={service.id} service={service} />
        ))}
      </div>

      {/* ── Bottom CTA ── */}
      <motion.div
        className={styles.consultCta}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, delay: 0.15 }}
      >
        <div className={styles.consultInner}>
          <div className={styles.consultLeft}>
            <span className={styles.consultBadge}>READY TO START?</span>
            <h3 className={styles.consultTitle}>
              Let's build something remarkable.
            </h3>
            <p className={styles.consultSub}>
              Free 30-min strategy call. No pitch — just honest advice on
              what will actually move the needle for your brand.
            </p>
          </div>
          <div className={styles.consultRight}>
            <Link href="/contact" className={styles.consultBtn}>
              BOOK FREE CONSULTATION
              <span className={styles.consultArrow}>→</span>
            </Link>
            <p className={styles.consultNote}>Usually responds within 2 hours</p>
          </div>
        </div>
      </motion.div>

    </section>
  );
}