"use client";

export default function ChatBubble({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: "28px",
        right: "28px",
        zIndex: 1000,
        width: "58px",
        height: "58px",
        borderRadius: "50%",
        border: "1px solid rgba(255, 165, 0, 0.4)",
        background: "rgba(255, 165, 0, 0.15)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        boxShadow: "0 0 20px rgba(255, 165, 0, 0.25)",
        transition: "all 0.3s ease",
        color:"#3661d7"
      }}
    >
      {isOpen ? "✕" : "🤖"}
    </button>
  );
}