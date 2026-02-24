"use client";
import { useState } from "react";
import ChatBubble from "./ChatBubble";
import ChatWindow from "./ChatWindow";

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <ChatBubble isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
    </>
  );
}