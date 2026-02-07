"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";
import styles from "@/app/css/FinalCTA.module.css";

export default function FinalCTA() {
  return (
    <section className={styles.ctaSection}>
      {/* Blueprint Grid matches Roadmap/Footer */}
      <div className={styles.gridOverlay} />
      
      <div className={styles.container}>
        <div className={styles.powerBox}>
          
          <div className={styles.content}>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={styles.label}
            >
              HAVE A PROJECT IN MIND? • मिशन सुपरस्टार
            </motion.p>

            <h2 className={styles.mainTitle}>
              LET&apos;S CREATE SOMETHING <br /> 
              <span className={styles.gold}>EXTRAORDINARY.</span>
            </h2>

            <div className={styles.actionArea}>
              <Magnetic strength={0.2}>
                <Link href="/contact" className={styles.ctaButton}>
                  <div className={styles.btnContent}>
                    <span>GET IN TOUCH</span>
                    <span className={styles.arrow}>→</span>
                  </div>
                  <div className={styles.btnFill}></div>
                </Link>
              </Magnetic>
            </div>
          </div>

          {/* Hiding Watermark inside the box for depth */}
          <div className={styles.boxWatermark}>ASLI</div>
        </div>
      </div>
    </section>
  );
}