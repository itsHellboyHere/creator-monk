"use client";
import { useState, useRef, useEffect } from "react";
import styles from "@/app/css/ChatWindow.module.css";

export default function ChatWindow({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hey! 👋 Ask me anything about CreatorMonk!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMsg }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.answer }]);
    } catch (e) {
      setMessages((prev) => [...prev, { role: "bot", text: "Service temporarily unavailable. 🛠️" }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.chatWindow}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <div className={styles.avatar}>🤖</div>
          <div>
            <p className={styles.title}>CreatorMonk AI</p>
            <p className={styles.status}>● Online</p>
          </div>
        </div>
        <button onClick={onClose} style={{background:'none', border:'none', color:'#fff', cursor:'pointer', fontSize:'18px'}}>✕</button>
      </div>

      <div className={styles.messages}>
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "user" ? styles.userWrapper : styles.botWrapper}>
            <div className={msg.role === "user" ? styles.userMessage : styles.botMessage}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className={styles.botWrapper}>
            <div className={`${styles.botMessage} ${styles.loading}`}>CreatorMonk is thinking...</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className={styles.inputContainer}>
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}
          placeholder="Message..."
          className={styles.textarea}
        />
        <button onClick={sendMessage} className={styles.sendButton}>↑</button>
      </div>
    </div>
  );
}