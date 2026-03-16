"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import styles from "@/app/css/Contact.module.css";
import SocialLinks from "@/app/components/SocialLinks";
import { sendContactEmail } from "@/app/actions/sendContactEmail";
import { useEffect, useState } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.submit} disabled={pending}>
      <span>{pending ? "TRANSMITTING..." : "INITIALIZE_MISSION"}</span>
      <motion.span
        animate={{ x: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
      >
        →
      </motion.span>
    </button>
  );
}

const services = [
  "Social Media & Content",
  "Web & Software Development",
  "AI & Automation",
  "Full Package — All Three",
  "Not Sure Yet",
];

const stats = [
  { value: "30+", label: "Projects Delivered" },
  { value: "2hr", label: "Avg. Response" },
  { value: "3", label: "Core Services" },
];

export default function Contact() {
  const [state, formAction] = useActionState(sendContactEmail, null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.navGuard} />
      <div className={styles.bgGrid} />

      {/* SVG animated handshake line — kept */}
      <div className={styles.svgContainer}>
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          className={styles.svg}
          fill="none"
        >
          <motion.path
            d={
              isMobile
                ? "M 730 920 Q 590 590 720 350 T 720 0"
                : "M 100 250 Q 400 250 600 550 T 1300 750"
            }
            stroke="#ffae00"
            strokeWidth={isMobile ? 2 : 4}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.35 }}
            transition={{
              duration: isMobile ? 6 : 4,
              ease: "linear",
              repeat: Infinity,
            }}
          />
        </svg>
      </div>

      {/* ══════════════════════════════════
          MAIN LAYOUT
      ══════════════════════════════════ */}
      <div className={styles.container}>

        {/* ── LEFT ── */}
        <div className={styles.left}>

          {/* Big headline */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className={styles.headlineWrap}
          >
            <h1 className={styles.headline}>
              LET'S
              <br />
              <span className={styles.outline}>BUILD</span>
              <br />
              TOGETHER.
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className={styles.tagline}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Tell us what you're working on. We respond with honest advice — not a sales pitch.
          </motion.p>

          {/* Stats — vertical stack, large type */}
          <motion.div
            className={styles.statsStack}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.8 }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={i}
                className={styles.statRow}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
              >
                <span className={styles.statVal}>{s.value}</span>
                <span className={styles.statLbl}>{s.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* WhatsApp CTA */}
          <motion.a
            href="https://wa.me/7827332337?text=Hi%20Creator%20Monk"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.waCta}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <span className={styles.waPulse} />
            <span className={styles.waText}>Chat on WhatsApp</span>
            <span className={styles.waArrow}>→</span>
          </motion.a>

          {/* Social */}
          <motion.div
            className={styles.socialBar}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <SocialLinks variant="contact" />
          </motion.div>
        </div>

        {/* ── RIGHT — Terminal Form ── */}
        <div className={styles.right}>
          <div className={styles.terminalWrapper}>
            {/* Gold shadow card — kept */}
            <div className={styles.terminalBackdrop} />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={styles.terminal}
            >
              {/* macOS bar */}
              <div className={styles.terminalBar}>
                <span className={styles.dot} style={{ background: "#ff5f57" }} />
                <span className={styles.dot} style={{ background: "#febc2e" }} />
                <span className={styles.dot} style={{ background: "#28c840" }} />
                <span className={styles.terminalFile}>NEW_PROJECT_BRIEF.exe</span>
              </div>

              <form action={formAction} className={styles.form}>

                {/* Name + Phone */}
                <div className={styles.inputRow}>
                  <div className={styles.inputGroup}>
                    <label>NAME</label>
                    <input name="name" placeholder="FULL_NAME" required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>PHONE</label>
                    <input name="phone" type="tel" placeholder="YOUR_NUMBER" />
                  </div>
                </div>

                {/* Email */}
                <div className={styles.inputGroup}>
                  <label>EMAIL</label>
                  <input name="email" type="email" placeholder="SECURE_EMAIL" required />
                </div>

                {/* Service */}
                <div className={styles.inputGroup}>
                  <label>SERVICE REQUIRED</label>
                  <select name="service" className={styles.select} defaultValue="">
                    <option value="" disabled>SELECT_MODULE</option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className={styles.inputGroup}>
                  <label>PROJECT BRIEF</label>
                  <textarea
                    name="message"
                    rows="3"
                    placeholder="DESCRIBE_YOUR_PROJECT..."
                    required
                  />
                </div>

                <SubmitButton />

                <AnimatePresence>
                  {state?.success && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={styles.success}
                    >
                      ✓ TRANSMISSION_COMPLETE — We'll be in touch shortly.
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          BOTTOM DARK BAND
      ══════════════════════════════════ */}
      <motion.div
        className={styles.bottomBand}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.bandInner}>
          <div className={styles.bandLeft}>
            <span className={styles.bandLabel}>WORKING HOURS</span>
            <span className={styles.bandValue}>Mon – Sat &nbsp;·&nbsp; 10am – 8pm IST</span>
          </div>
          <div className={styles.bandDivider} />
          <div className={styles.bandLeft}>
            <span className={styles.bandLabel}>RESPONSE TIME</span>
            <span className={styles.bandValue}>Usually within 2 hours</span>
          </div>
          <div className={styles.bandDivider} />
          <div className={styles.bandLeft}>
            <span className={styles.bandLabel}>EMAIL</span>
            <a href="mailto:hello@creatormonk.in" className={styles.bandEmail}>
              hello@creatormonk.in
            </a>
          </div>
          <a
            href="https://wa.me/7827332337?text=Hi%20Creator%20Monk"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.bandCta}
          >
            QUICK CHAT →
          </a>
        </div>
      </motion.div>
    </section>
  );
}