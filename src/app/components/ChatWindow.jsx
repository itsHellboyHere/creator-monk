"use client";
import { useState, useRef, useEffect } from "react";
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
      <span className={styles.dot} style={{ animationDelay: "0s" }} />
      <span className={styles.dot} style={{ animationDelay: "0.15s" }} />
      <span className={styles.dot} style={{ animationDelay: "0.3s" }} />
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
  const [visible, setVisible] = useState(false);
  const bottomRef = useRef(null);

  // Trigger CSS open animation on mount
  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleClose = () => {
    setVisible(false);
    // Wait for CSS exit animation before unmounting
    setTimeout(onClose, 220);
  };

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
    <div className={`${styles.chatWindow} ${visible ? styles.chatVisible : ""}`}>

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
        <button onClick={handleClose} className={styles.closeBtn} aria-label="Close chat">
          ✕
        </button>
      </div>

      {/* ── MESSAGES ── */}
      <div className={styles.messages}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`${styles.msgRow} ${
              msg.role === "user" ? styles.userRow : styles.botRow
            }`}
          >
            <div
              className={
                msg.role === "user" ? styles.userMessage : styles.botMessage
              }
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className={`${styles.msgRow} ${styles.botRow}`}>
            <div className={styles.botMessage}>
              <TypingDots />
            </div>
          </div>
        )}

        {showSuggested && !loading && (
          <div className={styles.suggestedWrap}>
            {SUGGESTED.map((q) => (
              <button
                key={q}
                className={styles.suggestedBtn}
                onClick={() => sendMessage(q)}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── INPUT ── */}
      <div className={styles.inputArea}>
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
          className={styles.sendBtn}
          disabled={loading || !input.trim()}
          aria-label="Send"
        >
          ↑
        </button>
      </div>

      {/* ── POWERED BY ── */}
      <div className={styles.poweredBy}>
        <span>Powered by </span>
        <span className={styles.poweredMonk}>
          CREATOR<span style={{ color: "#ffae00" }}>MONK</span> AI
        </span>
      </div>
    </div>
  );
}