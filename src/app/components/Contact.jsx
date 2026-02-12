"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import styles from "@/app/css/Contact.module.css";
import SocialLinks from "@/app/components/SocialLinks";
import { sendContactEmail } from "@/app/actions/sendContactEmail";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.submit} disabled={pending}>
      <span>{pending ? "ENCRYPTING..." : "INITIALIZE_MISSION"}</span>
      <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity }}>→</motion.span>
    </button>
  );
}

export default function Contact() {
  const [state, formAction] = useActionState(sendContactEmail, null);

  return (
    <section className={styles.section}>
      <div className={styles.navGuard} />
      <div className={styles.bgGrid} />

      <div className={styles.svgContainer}>
        <svg width="100%" height="100%" viewBox="0 0 1440 900" fill="none">
          <motion.path
            d="M 100 250 Q 400 250 600 550 T 1300 750"
            stroke="#ffae00" 
            strokeWidth="4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 4, ease: "linear", repeat: Infinity }}
          />
        </svg>
      </div>

      <div className={styles.container}>
        <div className={styles.heroArea}>
          <span className={styles.protocol}>PROTOCOL_04</span>
          <h1 className={styles.headline}>
            LET'S <br /> <span className={styles.outline}>CONNECT</span>.
          </h1>
          <div className={styles.locData}>
            <p>BOKARO_STATION</p>
            <p>23.66° N, 86.15° E</p>
          </div>
           <div className={styles.socialBar}>
            <SocialLinks variant="contact" />
          </div>
        </div>

        <div className={styles.formArea}>
          <div className={styles.terminalWrapper}>
            {/* The "Overlapping Square" Decorative Layer */}
            <div className={styles.terminalBackdrop} />
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={styles.terminal}
            >
              <form action={formAction} className={styles.form}>
                <div className={styles.inputGroup}>
                  <label>IDENT_01</label>
                  <input name="name" placeholder="FULL_NAME" required />
                </div>
                <div className={styles.inputGroup}>
                  <label>IDENT_02</label>
                  <input name="email" type="email" placeholder="SECURE_EMAIL" required />
                </div>
                <div className={styles.inputGroup}>
                  <label>IDENT_03</label>
                  <textarea name="message" rows="3" placeholder="MISSION_BRIEF..." required />
                </div>
                <SubmitButton />
                <AnimatePresence>
                  {state?.success && (
                    <motion.p 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className={styles.success}
                    >
                      TRANSMISSION_COMPLETE_
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
          
         
        </div>
      </div>
    </section>
  );
}