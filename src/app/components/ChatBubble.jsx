"use client";
import Image from "next/image";
import styles from "@/app/css/ChatBubble.module.css";

export default function ChatBubble({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${styles.bubble} ${isOpen ? styles.bubbleOpen : ""}`}
      aria-label={isOpen ? "Close chat" : "Open chat"}
    >
      {/* Logo — hidden when open */}
      <span className={`${styles.iconWrap} ${isOpen ? styles.iconHide : styles.iconShow}`}>
        <Image
          src="/logo1.png"
          alt="CreatorMonk AI"
          width={40}
          height={40}
          className={styles.logoImg}
          priority
        />
      </span>

      {/* Close X — shown when open */}
      <span className={`${styles.closeIcon} ${isOpen ? styles.iconShow : styles.iconHide}`}>
        ✕
      </span>

      {/* Tooltip */}
      {!isOpen && (
        <span className={styles.tooltip} aria-hidden="true">
          Chat with us
        </span>
      )}
    </button>
  );
}