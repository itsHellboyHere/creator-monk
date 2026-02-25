"use client";
import { useState, useRef, useEffect } from "react";
import styles from "@/app/css/ChatWindow.module.css";

export default function ChatWindow({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hey! 👋 I'm the CreatorMonk assistant. Ask me anything about our services!",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chat/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: userMessage }),
        }
      );

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.answer }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Something went wrong. Please try again!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.chatWindow}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.avatar}>🤖</div>
        <div>
          <p className={styles.title}>CreatorMonk AI</p>
          <p className={styles.status}>● Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className={styles.messages}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={
              msg.role === "user"
                ? styles.userWrapper
                : styles.botWrapper
            }
          >
            <div
              className={
                msg.role === "user"
                  ? styles.userMessage
                  : styles.botMessage
              }
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className={styles.botWrapper}>
            <div className={styles.botMessageMuted}>
              Thinking...
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className={styles.inputContainer}>
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about our services..."
          className={styles.textarea}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className={styles.sendButton}
        >
          ↑
        </button>
      </div>
    </div>
  );
}