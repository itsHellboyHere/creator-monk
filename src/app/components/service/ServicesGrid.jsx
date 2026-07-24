"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EASE } from "@/app/lib/reveal";
import { SERVICES } from "@/app/data/servicesData";
import styles from "@/app/css/service/ServicesGrid.module.css";

// bento order: 2 wide up top, 4 small below
const CARDS = [
  { slug: "web-development", size: "wide", img: "/sketch/website-sketch.png", tint: "violet" },
  { slug: "app-development", size: "wide", img: "/sketch/app-sketch.png",     tint: "blue" },
  { slug: "ai-automation",   size: "small", img: "/sketch/ai-sketch.png",      tint: "violet" },
  { slug: "social-media",    size: "small", img: "/sketch/Social-sketch.png",  tint: "peach" },
  { slug: "branding",        size: "small", img: "/sketch/brand-sketch.png",   tint: "blue" },
  { slug: "video-editing",   size: "small", img: "/sketch/video-sketch.png",   tint: "violet" },
];

export default function ServicesGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {CARDS.map((card, i) => {
          const data = SERVICES[card.slug];
          return (
           <motion.div
              key={card.slug}
              className={`${styles.card} ${styles[`size_${card.size}`]} ${styles[`tint_${card.tint}`]}`}
              initial={{ opacity: 0, y: 30 }}
              {...(i < 2
                ? { animate: { opacity: 1, y: 0 } }
                : {
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, amount: 0.15 },
                  })}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
            >
              <Link href={`/services/${card.slug}`} className={styles.cardInner}>
                <div className={styles.text}>
                  <span className={styles.badge}>{data.eyebrow}</span>
                  <h3 className={styles.title}>{data.title}</h3>
                  <p className={styles.desc}>{data.hero.sub}</p>
                  <span className={styles.learn}>
                    Learn more
                    <ArrowUpRight size={16} strokeWidth={2.4} />
                  </span>
                </div>

                <div className={styles.artWrap}>
                  <div className={styles.artGlow} aria-hidden />
                  <Image
                    src={card.img}
                    alt={data.title}
                    width={520}
                    height={340}
                    className={styles.art}
                  />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}