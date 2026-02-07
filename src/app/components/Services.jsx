"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "@/app/css/Services.module.css";

const services = [
  {
    id: "01",
    title: "Social Growth",
    desc: "We engineer attention at scale. 100M+ organic reach across Reels, Shorts & feeds.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop",
    color: "#ffae00",
  },
  {
    id: "02",
    title: "Web & Software",
    desc: "Next.js platforms, funnels & internal systems built to scale creators.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    color: "#4287f5",
  },
  {
    id: "03",
    title: "Production",
    desc: "Cinematic systems for YouTube, brands & long-term storytelling.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
    color: "#10b981",
  },
];

const ServiceCard = ({ service, i, progress, range, targetScale }) => {
  const scale = useTransform(progress, range, [1, targetScale]);
  
  return (
    <div className={styles.stickyTrack}>
      <motion.div
        style={{
          scale,
          top: `calc(15vh + ${i * 40}px)`, // Lowered slightly to leave room for section title
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
            
            <button className={styles.cardBtn}>
              <span>EXPLORE STUDIO</span>
              <div className={styles.btnLine} />
            </button>
          </div>
        </div>
      </motion.div>
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
        {/* NEW: Section Identification Header */}
        <header className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>OUR EXPERTISE</span>
          <h2 className={styles.sectionTitle}>
            SERVICES <span className={styles.thin}>&</span> SOLUTIONS
          </h2>
        </header>

        {services.map((service, i) => {
          const targetScale = 1 - ((services.length - i) * 0.04); 
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