"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "@/app/css/ChatWindow.module.css";

const SUGGESTED = [
  "What services do you offer?",
  "How do I get started?",
  "Do you build AI systems?",
];

function TypingDots() {
  return (
    <div className={styles.typingWrap}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className={styles.typingDot}
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 0.7,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hey! 👋 I'm the CreatorMonk AI. Ask me anything about what we do, how we work, or how we can help your brand.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggested, setShowSuggested] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const userMsg = (text || input).trim();
    if (!userMsg || loading) return;

    setInput("");
    setShowSuggested(false);
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chat/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: userMsg }),
        }
      );
      const data = await response.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Service temporarily unavailable. Please reach us at hello@creatormonk.in 🛠️",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className={styles.chatWindow}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.96 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── HEADER ── */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.avatarWrap}>
            <Image
              src="/logo1.png"
              alt="CreatorMonk"
              width={38}
              height={38}
              className={styles.avatarImg}
            />
            <span className={styles.onlineDot} />
          </div>
          <div className={styles.headerText}>
            <p className={styles.title}>
              CREATOR<span className={styles.gold}>MONK</span> AI
            </p>
            <p className={styles.status}>● Online · Replies instantly</p>
          </div>
        </div>
        <button onClick={onClose} className={styles.closeBtn} aria-label="Close">
          ✕
        </button>
      </div>

      {/* ── MESSAGES ── */}
      <div className={styles.messages}>
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            className={msg.role === "user" ? styles.userWrapper : styles.botWrapper}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div className={msg.role === "user" ? styles.userMessage : styles.botMessage}>
              {msg.text}
            </div>
          </motion.div>
        ))}

        {loading && (
          <motion.div
            className={styles.botWrapper}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={styles.botMessage}>
              <TypingDots />
            </div>
          </motion.div>
        )}

        {showSuggested && !loading && (
          <motion.div
            className={styles.suggestedWrap}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            {SUGGESTED.map((q) => (
              <button
                key={q}
                className={styles.suggestedBtn}
                onClick={() => sendMessage(q)}
              >
                {q}
              </button>
            ))}
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── INPUT ── */}
      <div className={styles.inputContainer}>
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Message..."
          className={styles.textarea}
        />
        <button
          onClick={() => sendMessage()}
          className={styles.sendButton}
          disabled={loading || !input.trim()}
          aria-label="Send message"
        >
          {/* Simple clean up arrow — no SVG path issues */}
          <span style={{ fontSize: "18px", fontWeight: 700, lineHeight: 1 }}>↑</span>
        </button>
      </div>

      {/* ── POWERED BY ── */}
      <div className={styles.poweredBy}>
        <span>Powered by</span>
        <span className={styles.poweredMonk}>
          CREATOR<span style={{ color: "#ffae00" }}>MONK</span> AI
        </span>
      </div>
    </motion.div>
  );
}