"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Smartphone,
  Bot,
  TrendingUp,
  Palette,
  Video,
  ArrowRight,
} from "lucide-react";
import styles from "@/app/css/Features.module.css";

const SERVICES = [
  {
    id: "websites",
    label: "Websites",
    icon: Globe,
    badge: "Websites & Software",
    title: "A website that works as hard as you do.",
    desc: "Fast, modern and mobile-ready. We build sites that look premium and turn visitors into paying customers.",
    href: "/services/web-development",
    img: "/sketch/website-sketch.png",
    tint: "violet",
  },
  {
    id: "apps",
    label: "Apps",
    icon: Smartphone,
    badge: "App Development",
    title: "Your idea, live on every phone.",
    desc: "iOS and Android apps that feel smooth and native — built clean and ready to grow with you.",
    href: "/services/app-development",
    img: "/sketch/app-sketch.png",
    tint: "blue",
  },
  {
    id: "ai",
    label: "AI",
    icon: Bot,
    badge: "AI & Automation",
    title: "Let AI handle the boring work.",
    desc: "Chatbots, voice agents and smart workflows that reply, follow up and save your team hours every week.",
    href: "/services/ai-automation",
    img: "/sketch/ai-sketch.png",
    tint: "violet",
  },
  {
    id: "social",
    label: "Social",
    icon: TrendingUp,
    badge: "Social Media",
    title: "Show up everywhere, grow every day.",
    desc: "We plan, design and post content that gets seen — so your brand keeps growing while you focus on the work.",
    href: "/services/social-media",
    img: "/sketch/Social-sketch.png",
    tint: "peach",
  },
  {
    id: "branding",
    label: "Branding",
    icon: Palette,
    badge: "Branding",
    title: "A brand people remember.",
    desc: "Logo, colours and a full visual identity that make you look established from the very first day.",
    href: "/services/branding",
    img: "/sketch/brand-sketch.png",
    tint: "blue",
  },
  {
    id: "video",
    label: "Video",
    icon: Video,
    badge: "Video Editing",
    title: "Videos people actually watch.",
    desc: "Reels, shorts and brand films edited to hook attention in the first three seconds.",
    href: "/services/video-editing",
    img: "/sketch/video-sketch.png",
    tint: "violet",
  },
];

const EASE = [0.22, 1, 0.36, 1];

export default function Features() {
  const [active, setActive] = useState(0);
  const s = SERVICES[active];

  return (
    <section className={styles.section}>
      <motion.div
        className={styles.head}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <span className={styles.eyebrow}>What we do</span>
        <h2 className={styles.title}>Everything your brand needs to grow.</h2>
        <p className={styles.sub}>
          One team for your website, apps, content and automation — tap a
          service to see how we help.
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        className={styles.tabs}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
      >
        {SERVICES.map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`${styles.tab} ${i === active ? styles.tabActive : ""}`}
              onClick={() => setActive(i)}
            >
              <Icon size={17} strokeWidth={2.2} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </motion.div>

      {/* Card */}
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
      >
        <div className={styles.cardInner}>
          {/* Left: text */}
          <div className={styles.left}>
            <AnimatePresence mode="wait">
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <span className={styles.badge}>{s.badge}</span>
                <h3 className={styles.cardTitle}>{s.title}</h3>
                <p className={styles.cardDesc}>{s.desc}</p>
                <Link href={s.href} className={styles.cardCta}>
                  <span>Learn more</span>
                  <ArrowRight size={17} strokeWidth={2.4} />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: illustration */}
          <div className={`${styles.right} ${styles[`tint_${s.tint}`]}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={s.id}
                className={styles.stage}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <Image
                  src={s.img}
                  alt={s.badge}
                  width={620}
                  height={414}
                  className={styles.art}
                  priority={active === 0}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}