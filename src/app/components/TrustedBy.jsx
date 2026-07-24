"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import styles from "@/app/css/TrustedBy.module.css";

const EASE = [0.22, 1, 0.36, 1];

const LOGOS = [
  { name: "Unidecor", src: "https://res.cloudinary.com/dgifa4wgb/image/upload/v1784643171/logo-unidecor_yp3qaq.png" },
  { name: "Hexalam", src: "https://res.cloudinary.com/dgifa4wgb/image/upload/v1784643569/logo-hexalam_ihunf3.png" },
  { name: "Srishti Solar", src: "https://res.cloudinary.com/dgifa4wgb/image/upload/v1784643569/logo-srishti-solar_mjfcbx.webp" },
  { name: "Client", src: "https://res.cloudinary.com/dgifa4wgb/image/upload/v1784643559/79753315-7ad5-4cae-b6d7-69c38053f1df_vhcxug.png" },
  { name: "Rocky Shakti", src: "https://res.cloudinary.com/dgifa4wgb/image/upload/v1784643569/logo-roccky-shakti_ivb22h.webp" },
  { name: "Navyya Nirman", src: "https://res.cloudinary.com/dgifa4wgb/image/upload/v1784643570/logo-navyya-nirman_utvqg7.png" },
  { name: "Client", src: "https://res.cloudinary.com/dgifa4wgb/image/upload/v1784643628/logo_zytdj6.png" },
  { name: "Client", src: "https://res.cloudinary.com/dgifa4wgb/image/upload/v1784643712/WhatsApp_Image_2026-07-21_at_7.50.37_PM-Photoroom_covnrf.png" },
];

export default function TrustedBy() {
  return (
    <section className={styles.section}>
      <motion.div
        className={styles.head}
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <span className={styles.eyebrow}>Trusted by brands like</span>
        <h2 className={styles.title}>
          Real businesses. <span className={styles.accent}>Real results.</span>
        </h2>
        <p className={styles.sub}>
          From interior brands to solar companies — teams across India trust
          CreatorMonk with their websites, apps and growth.
        </p>
      </motion.div>

      {/* Logo marquee — crisp, full colour */}
      <motion.div
        className={styles.marquee}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
      >
        <div className={styles.track}>
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <div className={styles.cell} key={i}>
              <img
                src={logo.src}
                alt={logo.name}
                className={styles.logo}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        className={styles.ctaWrap}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
      >
        <Link href="/contact" className={styles.cta}>
          <span>Become our next success story</span>
          <ArrowRight size={18} strokeWidth={2.4} />
        </Link>
      </motion.div>
    </section>
  );
}