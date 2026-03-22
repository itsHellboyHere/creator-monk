"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import ChatBubble from "./ChatBubble";

const ChatWindow = dynamic(() => import("./ChatWindow"), { ssr: false });

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
      <ChatBubble isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
    </>
  );
}