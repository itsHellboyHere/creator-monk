"use client";
import { useState, useRef, useEffect } from "react";

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

  // Auto scroll to latest message
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage }),
      });
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
    <div
      style={{
        position: "fixed",
        bottom: "100px",
        right: "28px",
        zIndex: 999,
        width: "360px",
        height: "500px",
        borderRadius: "20px",
        border: "1px solid rgba(255, 165, 0, 0.2)",
        background: "rgba(2, 2, 3, 0.75)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 30px rgba(255,165,0,0.08)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "var(--font-inter)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "rgba(255,165,0,0.15)",
            border: "1px solid rgba(255,165,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
          }}
        >
          🤖
        </div>
        <div>
          <p style={{ margin: 0, color: "#fff", fontWeight: 600, fontSize: "14px" }}>
            CreatorMonk AI
          </p>
          <p style={{ margin: 0, color: "rgba(255,165,0,0.8)", fontSize: "11px" }}>
            ● Online
          </p>
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          scrollbarWidth: "none",
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "80%",
                padding: "10px 14px",
                borderRadius: msg.role === "user"
                  ? "16px 16px 4px 16px"
                  : "16px 16px 16px 4px",
                background: msg.role === "user"
                  ? "linear-gradient(135deg, #ff6b00, #ffa500)"
                  : "rgba(255,255,255,0.06)",
                border: msg.role === "user"
                  ? "none"
                  : "1px solid rgba(255,255,255,0.08)",
                color: "#fff",
                fontSize: "13px",
                lineHeight: "1.5",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                padding: "10px 14px",
                borderRadius: "16px 16px 16px 4px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.5)",
                fontSize: "13px",
              }}
            >
              Thinking...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          gap: "8px",
          alignItems: "flex-end",
        }}
      >
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about our services..."
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            padding: "10px 14px",
            color: "#fff",
            fontSize: "13px",
            resize: "none",
            outline: "none",
            fontFamily: "var(--font-inter)",
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            background: loading
              ? "rgba(255,165,0,0.3)"
              : "linear-gradient(135deg, #ff6b00, #ffa500)",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            flexShrink: 0,
          }}
        >
          ↑
        </button>
      </div>
    </div>
  );
}