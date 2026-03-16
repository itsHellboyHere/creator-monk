"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatBubble from "./ChatBubble";
import ChatWindow from "./ChatWindow";

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen && (
          <ChatWindow key="window" onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>

      <ChatBubble isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
    </>
  );
}