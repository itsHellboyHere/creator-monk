"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "@/app/css/Services.module.css";
import Link from "next/link";

const services = [
  {
    id: "01",
    title: "Social Growth",
    desc: "We manage your entire social presence — from scripting Reels & Shorts to posting, engagement, and analytics. 10M+ organic reach delivered.",
    pills: ["Reels & Shorts", "Strategy", "Community Mgmt", "Analytics"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop",
    color: "#ffae00",
    href: "/services/social-media",
  },
  {
    id: "02",
    title: "Web & Software",
    desc: "Custom websites, SaaS platforms, mobile apps & scalable backend systems. Built with Next.js, Python & Node.js — from landing page to full product.",
    pills: ["Websites", "SaaS Platforms", "Mobile Apps", "APIs & Backend"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    color: "#4287f5",
    href: "/services/web-software",
  },
  {
    id: "03",
    title: "AI & Automation",
    desc: "AI agents, smart chatbots, workflow automation & custom integrations. We replace repetitive work with intelligent systems that run 24/7 for your business.",
    pills: ["AI Agents", "Workflow Automation", "Chatbots", "API Integrations"],
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1200&auto=format&fit=crop",
    color: "#10b981",
    href: "/services/ai-automation",
  },
];

const ServiceCard = ({ service, i, progress, range, targetScale }) => {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className={styles.stickyTrack}>
      <Link href={service.href} className={styles.cardLink}>
        <motion.div
          style={{
            scale,
            top: `calc(15vh + ${i * 40}px)`,
            zIndex: i,
          }}
          className={styles.card}
        >
          <div className={styles.cardInner}>
            <div className={styles.cardBg}>
              <img src={service.image} alt={service.title} />
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <span className={styles.num}>{service.id}</span>
                <div className={styles.indicator} style={{ background: service.color }} />
              </div>

              <h2 className={styles.serviceTitle}>{service.title}</h2>
              <p className={styles.desc}>{service.desc}</p>

              {/* Service Pills — what we actually do */}
              <div className={styles.pillRow}>
                {service.pills.map((pill) => (
                  <span
                    key={pill}
                    className={styles.pill}
                    style={{ borderColor: service.color, color: service.color }}
                  >
                    {pill}
                  </span>
                ))}
              </div>

              <button className={styles.cardBtn}>
                <span>SEE ALL SERVICES</span>
                <div className={styles.btnLine} />
              </button>
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  );
};

export default function ServicesStack() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["rgba(255, 174, 0, 0.1)", "rgba(66, 135, 245, 0.1)", "rgba(16, 185, 129, 0.1)"]
  );

  return (
    <section ref={container} className={styles.stackWrapper}>
      <motion.div style={{ background: bgColor }} className={styles.ambientBg} />

      <div className={styles.contentWrap}>
        {/* Section Header */}
        <header className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>OUR EXPERTISE</span>
          <h2 className={styles.sectionTitle}>
            SERVICES <span className={styles.thin}>&</span> SOLUTIONS
          </h2>
          <p className={styles.sectionSubtitle}>
            Everything your brand needs — content, code, and AI — under one roof.
          </p>
        </header>

        {services.map((service, i) => {
          const targetScale = 1 - (services.length - i) * 0.04;
          return (
            <ServiceCard
              key={service.id}
              i={i}
              service={service}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}