"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "@/app/css/NotFound.module.css";

export default function NotFound() {
  return (
    <main className={styles.wrapper}>
      {/* The Technical Blueprint Background */}
      <div className={styles.blueprintGrid} />

      <div className={styles.container}>
        <div className={styles.visualSide}>
          {/* Construction Scene SVG */}
          <svg viewBox="0 0 400 300" className={styles.constructionSvg}>
            {/* The Base Foundation */}
            <path d="M50 250 L350 250" stroke="rgba(255,165,0,0.2)" strokeWidth="2" strokeDasharray="5 5" />
            
            {/* Moving Crane 01 - Lifting the '4' */}
            <motion.g
              animate={{ x: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <path d="M100 250 L100 50 L180 80" stroke="#444" strokeWidth="3" fill="none" />
              <motion.path 
                d="M180 80 L180 120" 
                stroke="var(--monk-orange)" 
                strokeWidth="1" 
                animate={{ height: [40, 60, 40] }}
              />
              <text x="170" y="150" className={styles.svgNumber}>4</text>
            </motion.g>

            {/* Flatbed Truck with '0' */}
            <motion.g
              animate={{ x: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              <rect x="220" y="230" width="80" height="20" fill="rgba(255,255,255,0.05)" />
              <text x="245" y="220" className={styles.svgNumber}>0</text>
            </motion.g>

            {/* Static Crane 02 - Holding the last '4' */}
            <g>
              <path d="M320 250 L320 100 L250 120" stroke="#444" strokeWidth="3" fill="none" />
              <line x1="250" y1="120" x2="250" y2="160" stroke="var(--monk-orange)" strokeWidth="1" />
              <text x="240" y="190" className={styles.svgNumber}>4</text>
            </g>
          </svg>
        </div>

        <div className={styles.textSide}>
          <span className={styles.errorCode}>STATUS: 404_EXPANSION_IN_PROGRESS</span>
          <h1 className={styles.title}>
            YOUR EMPIRE IS <br />
            <span className={styles.gold}>EXPANDING.</span>
          </h1>
          <p className={styles.description}>
            This sector is still under structural development. 
            Our engineers are currently laying the digital foundation.
          </p>
          <div className={styles.hindiRow}>
            <span className={styles.hindi}>निर्माण जारी है।</span>
            <span className={styles.dot} />
          </div>
          
          <Link href="/" className={styles.returnBtn}>
            RETURN TO HEADQUARTERS
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </main>
  );
}