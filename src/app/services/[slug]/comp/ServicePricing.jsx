"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import styles from "../css/ServicePricing.module.css";

export default function ServicePricing({ plans, accent }) {
    const targetRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Disable horizontal movement on mobile to prevent layout breaking
    const x = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "0%" : "-55%"]);

    return (
        <section ref={targetRef} className={styles.pricingWrapper}>
            <div className={styles.stickyContainer}>
                
                <div className={styles.sidebarHeader}>
                    <div className={styles.titleGroup}>
                        <span className={styles.label} style={{ color: accent }}>// SYSTEM_TIERS_v2.6</span>
                        <h2 className={styles.mainTitle}>UPGRADE<br/>YOUR_STACK</h2>
                    </div>

                    {/* Technical Disclaimer for Bokaro Agency */}
                    <div className={styles.disclaimerBox}>
                        <p className={styles.disclaimerText}>
                            * Base pricing shown. Final deployment costs vary based on system complexity, 
                            API requirements, and asset volume.
                        </p>
                    </div>
                </div>

                <motion.div style={{ x }} className={styles.cardTrack}>
                    {plans.map((plan, index) => (
                        <div key={plan.id || index} className={styles.pricingCard}>
                            <div className={styles.cardTop}>
                                <div className={styles.idBadge} style={{ borderColor: accent, color: accent }}>
                                    {plan.id || `0${index + 1}`}
                                </div>
                                <div className={styles.statusIndicator}>
                                    <span className={styles.pulse} style={{ backgroundColor: accent }} />
                                    <span className={styles.statusText}>READY</span>
                                </div>
                            </div>

                            <h3 className={styles.planName}>{plan.name}</h3>

                            <div className={styles.priceBox}>
                                <span className={styles.investmentLabel}>// INITIAL_INVESTMENT</span>
                                <h4 className={styles.amount}>{plan.price}</h4>
                            </div>

                            <ul className={styles.featureList}>
                                {plan.features.map((feat, i) => (
                                    <li key={i} className={styles.featureItem}>
                                        <div className={styles.featureDot} style={{ backgroundColor: accent }} />
                                        <span className={styles.featureText}>{feat}</span>
                                    </li>
                                ))}
                                <li className={styles.plusMore}>+ Full Architecture Support</li>
                            </ul>

                            <Link href="/contact" className={styles.upgradeBtn} style={{ "--accent": accent }}>
                                <span className={styles.btnText}>INITIALIZE_UPGRADE</span>
                            </Link>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}