"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "../css/ServiceAbout.module.css";

export default function ServiceAbout({ mission, benefits, accent, title }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Fixed Watermark opacity logic
    const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 0.08, 0.08, 0]);

    return (
        <section ref={containerRef} className={styles.aboutWrapper}>
            {/* FIXED WATERMARK: Pinned in the background */}
            <motion.div style={{ opacity }} className={styles.fixedWatermark}>
                {typeof title === 'string' ? title : "SYSTEM_CORE"}
            </motion.div>

            <div className={styles.contentContainer}>
                <div className={styles.mainGrid}>


                    {/* Left Side: Mission */}
                    <div className={styles.missionZone}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                            className={styles.missionContent}
                        >
                            <span className={styles.missionEyebrow} style={{ color: accent }}>
                                ARCHITECTING DOMINANCE
                            </span>

                            <h2 className={styles.missionStatement}>
                                {mission}
                            </h2>

                            <div className={styles.missionRule} style={{ backgroundColor: accent }} />
                        </motion.div>
                    </div>

                    {/* Right Side: Styled Technical Cards */}
                    <div className={styles.technicalZone}>
                        {benefits.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className={styles.specCard}
                            >
                                <div className={styles.specHeader}>
                                    <span className={styles.specId}>{item.id}</span>
                                    <div className={styles.indicator} style={{ backgroundColor: accent }} />
                                </div>
                                <h3 className={styles.specTitle}>{item.head}</h3>
                                <p className={styles.specDesc}>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}