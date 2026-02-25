"use client";
import styles from "@/app/css/ChatBubble.module.css";

export default function ChatBubble({ isOpen, onClick }) {
  return (
    <button onClick={onClick} className={styles.bubble}>
      {isOpen ? "✕" : "🤖"}
    </button>
  );
}