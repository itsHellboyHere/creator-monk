"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import styles from "@/app/css/Hero.module.css";

const maskVars = {
  initial: { 
    x: "-100%", 
    opacity: 0,
    scale: 0.9
  },
  animate: (i) => ({
    x: "0%", 
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      delay: 0.3 + i * 0.2,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30 });

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <section className={styles.hero}>
      {/* Bollywood Style Moving Mesh - Increased Opacity */}
      <div className={styles.movingGradient} />
      
      <motion.div
        className={styles.spotlight}
        style={{ x: springX, y: springY }}
      />

      <div className={styles.content}>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.badge}
        >
          INFULENCE • ENGINEERING • IMPACT
        </motion.div>

        <div className={styles.titleContainer}>
          {["WE BUILD", "DIGITAL", "SUPERSTARS."].map((text, i) => (
            <div key={i} className={styles.mask}>
              <motion.h1
                custom={i}
                variants={maskVars}
                initial="initial"
                animate="animate"
                className={i === 2 ? styles.goldText : styles.whiteText}
              >
                {text}
              </motion.h1>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className={styles.bottomRow}
        >
          <p className={styles.description}>
      We engineer growth for creators who are built to last —
not fade with trends or algorithms.
          </p>
        </motion.div>
      </div>

      <div className={styles.scrollHint}>
        <p>कहानी यहीं खत्म नहीं होती</p>
        <div className={styles.scrollLine}>
           <motion.div 
             animate={{ y: [0, 20, 0] }} 
             transition={{ duration: 2, repeat: Infinity }} 
             className={styles.scrollDot} 
           />
        </div>
      </div>

      <div className={styles.vignette} />
      <div className={styles.grain} />
    </section>
  );
}