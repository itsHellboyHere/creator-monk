"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "@/app/css/ChatBubble.module.css";

export default function ChatBubble({ isOpen, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className={styles.bubble}
      aria-label="Toggle Chat"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
    >
      {/* Pulse rings — only when closed */}
      <AnimatePresence>
        {!isOpen && (
          <>
            <motion.span
              className={styles.ring}
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.9, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
              className={styles.ring}
              initial={{ scale: 1, opacity: 0.35 }}
              animate={{ scale: 2.4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Inner icon */}
      <div className={styles.inner}>
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              className={styles.closeIcon}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              ✕
            </motion.span>
          ) : (
            <motion.div
              key="logo"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src="/logo1.png"
                alt="CreatorMonk"
                width={36}
                height={36}
                className={styles.logoImg}
                priority
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}