"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  MessageCircle,
  Send,
  Zap,
  Clock,
  Shield,
} from "lucide-react";
import { sendContactEmail } from "@/app/actions/sendContactEmail";
import styles from "@/app/css/Contact.module.css";

const EASE = [0.22, 1, 0.36, 1];

// TODO: replace with your Cloudinary link
const HERO_IMG =
  "https://res.cloudinary.com/dgifa4wgb/image/upload/v1784650651/7f066fe8-b79b-47b0-89a5-cd927b0a3593-Photoroom_ly6qx7.png";

const SERVICES = [
  "Website & Software",
  "App Development",
  "AI & Automation",
  "Social Media",
  "Branding",
  "Video Editing",
  "Not sure yet",
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.submit} disabled={pending}>
      <span>{pending ? "Sending..." : "Send message"}</span>
      {!pending && <Send size={17} strokeWidth={2.4} />}
    </button>
  );
}

export default function Contact() {
  const [state, formAction] = useActionState(sendContactEmail, null);

  return (
    <section className={styles.section}>
      <div className={styles.mesh} aria-hidden />

      <div className={styles.container}>
        {/* LEFT — form */}
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className={styles.eyebrow}>Say hello</span>
          <h1 className={styles.title}>
            Let&apos;s <span className={styles.accent}>build together.</span>
          </h1>
          <p className={styles.desc}>
            Tell us what you&apos;re working on — a website, an app, a brand,
            or something you&apos;re still figuring out. We reply within a few
            hours with honest advice, not a sales pitch.
          </p>

          <form action={formAction} className={styles.form}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="name">Your name</label>
                <input
                  id="name"
                  name="name"
                  placeholder="e.g. Rohan Sharma"
                  required
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="service">What do you need?</label>
              <div className={styles.selectWrap}>
                <select id="service" name="service" defaultValue="" required>
                  <option value="" disabled>
                    Choose a service
                  </option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="message">Tell us about your project</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="A few lines about what you want to build, your timeline, or references you like."
                required
              />
            </div>

            <SubmitButton />

            <AnimatePresence>
              {state?.success && (
                <motion.p
                  className={styles.success}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✓ Got it — we&apos;ll be in touch shortly.
                </motion.p>
              )}
              {state?.error && (
                <motion.p
                  className={styles.error}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {state.error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Alternative — WhatsApp */}
            <a
              href="https://wa.me/917827332337?text=Hi%20CreatorMonk"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.waAlt}
            >
              <MessageCircle size={16} strokeWidth={2.2} />
              <span>
                Prefer WhatsApp? <b>Chat with us instead</b>
              </span>
            </a>
          </form>
        </motion.div>

        {/* RIGHT — visual */}
        <motion.aside
          className={styles.right}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
        >
          <div className={styles.visual}>
            <div className={styles.visualGlow} aria-hidden />
            <img
              src={HERO_IMG}
              alt="CreatorMonk team illustration"
              className={styles.visualImg}
            />

         

          
          </div>
        </motion.aside>
      </div>
    </section>
  );
}