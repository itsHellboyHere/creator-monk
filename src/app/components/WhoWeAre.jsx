"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "@/app/css/WhoWeAre.module.css";

export default function WhoWeAre() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  // Parallax for the background element
  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={container} className={styles.section}>
      {/* Cinematic Blueprint Background */}
      <motion.div style={{ y }} className={styles.parallaxBg}>
        संस्थान
      </motion.div>

      <div className={styles.container}>
        <div className={styles.contentWrap}>
          {/* Top Row: The "Identity" */}
          <header className={styles.header}>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className={styles.badge}
            >
              WHO WE ARE? • मिशन सुपरस्टार
            </motion.span>
            
            <div className={styles.mainHeading}>
              <motion.h2 
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={styles.title}
              >
                CREATIVE <br/>
                <span className={styles.outline}>ENGINEERS.</span>
              </motion.h2>
            </div>
          </header>

          {/* Bottom Row: The "Manifesto" */}
          <div className={styles.manifesto}>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={styles.leftDesc}
            >
              <p>
                CreatorMonk isn&apos;t just another agency. We are a collective 
                that breathes amongst common people to build systems 
                that turn creators into <strong>Superstars.</strong>
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={styles.rightStats}
            >
              <div className={styles.statBox}>
                <span className={styles.statTag}>EST. 2026</span>
                <p>Strategizing long-term growth <br/> beyond the algorithm.</p>
              </div>
              <div className={styles.signature}>THE MONK WAY</div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className={styles.blueprintLine} />
    </section>
  );
}