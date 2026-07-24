"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Zap,
  Globe2,
  Sparkles,
  ArrowRight,
  Heart,
  Play,
  ThumbsUp,
} from "lucide-react";
import styles from "@/app/css/Impact.module.css";
import SectionWave from "@/app/components/SectionWave";

const EASE = [0.22, 1, 0.36, 1];

const IMPACTS = [
  {
    id: "reach",
    icon: TrendingUp,
    tint: "violet",
    visual: "bars",
    title: "Get found by more people",
    desc: "Smart content and search put your business in front of the right customers every day — not just when you remember to post.",
  },
  {
    id: "performance",
    icon: Zap,
    tint: "blue",
    visual: "gauge",
    title: "Turn visitors into customers",
    desc: "A fast, clean website builds instant trust and makes people act — so more of your traffic actually becomes sales.",
  },
  {
    id: "presence",
    icon: Globe2,
    tint: "peach",
    visual: "dots",
    title: "Look professional everywhere",
    desc: "When your website, social and search all match, people take you seriously the moment they find you.",
  },
  {
    id: "branding",
    icon: Sparkles,
    tint: "gold",
    visual: "star",
    title: "Become the brand people remember",
    desc: "A strong, consistent identity makes you the obvious choice — even next to bigger competitors.",
  },
];

export default function Impact() {
  return (
    <section className={styles.section}>
      <SectionWave
        position="top"
        floats={[
          { icon: <Heart />, left: "18%", size: 26 },
          { icon: <Play />, left: "52%", size: 28, delay: 1.5, color: "#f0946c" },
          { icon: <ThumbsUp />, left: "80%", size: 26, delay: 3 },
        ]}
      />

      <div className={styles.bgWash} aria-hidden />

      <motion.div
        className={styles.head}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <span className={styles.eyebrow}>Why it matters</span>

        <h2 className={styles.title}>
          Good work doesn&apos;t just look nice.{" "}
          <span className={styles.accent}>It grows your business.</span>
        </h2>

        <p className={styles.sub}>
          Here&apos;s what actually changes once your website, content and brand
          start working together.
        </p>
      </motion.div>

      <div className={styles.grid}>
        {IMPACTS.map((it, i) => {
          const Icon = it.icon;

          return (
            <motion.article
              key={it.id}
              className={`${styles.card} ${styles[`tint_${it.tint}`]}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
            >
              <div className={styles.cardGlow} aria-hidden />

              <div className={styles.cardTop}>
                <span className={styles.iconChip}>
                  <Icon size={18} strokeWidth={2.2} />
                </span>
                <span className={styles.cardNum}>0{i + 1}</span>
              </div>

              <div className={styles.visualWrap}>
                <Visual type={it.visual} />
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{it.title}</h3>
                <p className={styles.cardDesc}>{it.desc}</p>
              </div>
            </motion.article>
          );
        })}
      </div>

      <motion.div
        className={styles.footer}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
      >
        <p className={styles.footerText}>
          Ready to see this happen for your brand?
        </p>

        <Link href="/contact" className={styles.cta}>
          <span>Start a Project</span>
          <ArrowRight size={18} strokeWidth={2.4} />
        </Link>
      </motion.div>
    </section>
  );
}

/* ---------------- Coded mini-visuals ---------------- */

function Visual({ type }) {
  if (type === "bars") return <BarsVisual />;
  if (type === "gauge") return <GaugeVisual />;
  if (type === "dots") return <DotsVisual />;
  if (type === "star") return <StarVisual />;
  return null;
}

function BarsVisual() {
  const heights = [34, 52, 44, 70, 88];

  return (
    <div className={styles.bars}>
      {heights.map((h, i) => (
        <span
          key={i}
          style={{
            "--h": `${h}%`,
            animationDelay: `${i * 0.12}s`,
          }}
        />
      ))}
    </div>
  );
}

function GaugeVisual() {
  return (
    <svg viewBox="0 0 100 60" className={styles.gauge}>
      <path d="M 10 55 A 40 40 0 0 1 90 55" className={styles.gaugeTrack} />
      <path d="M 10 55 A 40 40 0 0 1 90 55" className={styles.gaugeFill} />
      <circle cx="50" cy="55" r="4" className={styles.gaugeHub} />
      <line x1="50" y1="55" x2="74" y2="30" className={styles.gaugeNeedle} />
    </svg>
  );
}

function DotsVisual() {
  return (
    <svg viewBox="0 0 100 70" className={styles.dots}>
      <line x1="50" y1="35" x2="18" y2="16" className={styles.dotLine} />
      <line x1="50" y1="35" x2="82" y2="16" className={styles.dotLine} />
      <line x1="50" y1="35" x2="20" y2="58" className={styles.dotLine} />
      <line x1="50" y1="35" x2="80" y2="58" className={styles.dotLine} />
      <circle cx="18" cy="16" r="6" className={styles.dotNode} />
      <circle cx="82" cy="16" r="6" className={styles.dotNode} />
      <circle cx="20" cy="58" r="6" className={styles.dotNode} />
      <circle cx="80" cy="58" r="6" className={styles.dotNode} />
      <circle cx="50" cy="35" r="9" className={styles.dotCore} />
    </svg>
  );
}

function StarVisual() {
  return (
    <div className={styles.starWrap}>
      <svg viewBox="0 0 24 24" className={styles.star}>
        <path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.8 5.9 20.4l1.5-6.8L2.2 9l6.9-.7z" />
      </svg>
      <span className={styles.spark} style={{ top: "8%", left: "78%" }} />
      <span className={styles.spark} style={{ top: "70%", left: "14%" }} />
    </div>
  );
}