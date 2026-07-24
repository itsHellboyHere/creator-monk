"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ArrowUp, RotateCw, MessageSquare } from "lucide-react";
import styles from "@/app/css/Chat.module.css";

const API =
  process.env.NEXT_PUBLIC_CHAT_API || "https://api.creatormonk.in/api/chat/";
const WA = "https://wa.me/917827332337";
const STORE_KEY = "cm_chat_v1";

const GREETING =
  "Hi! I'm CreatorMonk's assistant. Ask me anything about what we build — English ya Hinglish, dono chalega.";

/* Two English, two Hinglish — shows the bot handles both without saying so */
const SUGGESTIONS = [
  "What do you build?",
  "Website banane mein kitna time lagta hai?",
  "Can you build an AI bot for my business?",
  "Kaam kaise shuru karein?",
];

const EASE = [0.22, 1, 0.36, 1];
const HISTORY_LIMIT = 12;

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

/* The API returns { answer, language, grounded }, but older builds and DRF
 * error payloads have other shapes. Always end up with a string. */
function pickText(data) {
  if (typeof data === "string") return data;
  if (!data || typeof data !== "object") return "";

  const candidate = data.answer ?? data.message ?? data.detail ?? data.error ?? "";
  if (typeof candidate === "string") return candidate;
  if (candidate && typeof candidate === "object") return pickText(candidate);
  return "";
}

export default function Chat() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [status, setStatus] = React.useState("idle"); // idle | sending | error | ratelimit
  const [rateMsg, setRateMsg] = React.useState("");
  const [online, setOnline] = React.useState(true);

  const listRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const stickRef = React.useRef(true);
  const lastSentRef = React.useRef("");

  /* ---------- restore session, or seed the greeting ---------- */
  React.useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length) {
          setMessages(parsed);
          return;
        }
      }
    } catch {}
    /* Greeting lives in messages (not hardcoded in the JSX) so it travels
     * to the backend as conversation history like any other turn. */
    setMessages([{ id: uid(), role: "bot", text: GREETING }]);
  }, []);

  React.useEffect(() => {
    if (!messages.length) return;
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify(messages.slice(-40)));
    } catch {}
  }, [messages]);

  /* ---------- online / offline ---------- */
  React.useEffect(() => {
    const set = () => setOnline(navigator.onLine);
    set();
    window.addEventListener("online", set);
    window.addEventListener("offline", set);
    return () => {
      window.removeEventListener("online", set);
      window.removeEventListener("offline", set);
    };
  }, []);

  /* ---------- lock body scroll while the sheet is open on mobile ---------- */
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    if (window.matchMedia("(max-width: 640px)").matches) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  /* ---------- auto-scroll, but never fight a user who scrolled up ---------- */
  const scrollToEnd = React.useCallback((smooth = true) => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: smooth ? "smooth" : "auto" });
  }, []);

  const onListScroll = () => {
    const el = listRef.current;
    if (!el) return;
    stickRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  };

  React.useEffect(() => {
    if (stickRef.current) scrollToEnd();
  }, [messages, status, scrollToEnd]);

  React.useEffect(() => {
    if (open) {
      scrollToEnd(false);
      /* don't autofocus on mobile — it yanks the keyboard up immediately */
      if (!window.matchMedia("(max-width: 640px)").matches) {
        setTimeout(() => inputRef.current?.focus(), 260);
      }
    }
  }, [open, scrollToEnd]);

  /* ---------- send ---------- */
  const send = React.useCallback(
    async (text) => {
      const question = (text ?? input).trim();
      if (!question || status === "sending") return;

      lastSentRef.current = question;
      stickRef.current = true;

      /* snapshot before adding the new turn — this is the history the
       * backend needs to know what was already said */
      const history = messages.slice(-HISTORY_LIMIT).map((m) => ({
        role: m.role,
        text: m.text,
      }));

      setMessages((m) => [...m, { id: uid(), role: "user", text: question }]);
      setInput("");
      setStatus("sending");
      setRateMsg("");

      try {
        const res = await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question, history }),
        });

        if (res.status === 429) {
          const data = await res.json().catch(() => ({}));
          setRateMsg(
            pickText(data) ||
              "You've hit the message limit for now. Please try again later, or message us on WhatsApp."
          );
          setStatus("ratelimit");
          return;
        }

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        const answer = pickText(data);
        if (!answer) throw new Error("Empty answer");

        setMessages((m) => [
          ...m,
          { id: uid(), role: "bot", text: answer, lang: data?.language },
        ]);
        setStatus("idle");
      } catch {
        setStatus("error");
      }
    },
    [input, status, messages]
  );

  const retry = () => {
    if (!lastSentRef.current) return;
    setMessages((m) => {
      const copy = [...m];
      /* drop the failed user message so it isn't duplicated */
      if (copy.at(-1)?.role === "user") copy.pop();
      return copy;
    });
    send(lastSentRef.current);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  /* only the greeting so far */
  const empty = messages.length <= 1;
  const busy = status === "sending";

  return (
    <>
      {/* ================= Launcher ================= */}
      <AnimatePresence>
        {!open && (
          <motion.button
            type="button"
            className={styles.launcher}
            onClick={() => setOpen(true)}
            aria-label="Open chat"
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 12 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <MessageCircle size={22} strokeWidth={2} />
            <span className={styles.launcherLabel}>Ask us anything</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ================= Panel ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.panel}
            role="dialog"
            aria-label="Chat with CreatorMonk"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {/* ---- Header ---- */}
            <header className={styles.header}>
              <div className={styles.headerLeft}>
                <span className={styles.avatar}>
                  <MessageSquare size={16} strokeWidth={2.2} />
                </span>
                <div className={styles.headerText}>
                  <strong className={styles.headerName}>CreatorMonk</strong>
                  <span className={styles.headerStatus}>
                    <i className={styles.pulse} aria-hidden="true" />
                    Usually replies instantly
                  </span>
                </div>
              </div>

              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                <X size={18} strokeWidth={2.2} />
              </button>
            </header>

            {/* ---- Messages ---- */}
            <div
              className={styles.list}
              ref={listRef}
              onScroll={onListScroll}
              aria-live="polite"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`${styles.row} ${
                    m.role === "user" ? styles.rowUser : styles.rowBot
                  }`}
                >
                  <div
                    className={`${styles.bubble} ${
                      m.role === "user" ? styles.bubbleUser : styles.bubbleBot
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {empty && (
                <div className={styles.chips}>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={styles.chip}
                      onClick={() => send(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {busy && (
                <div className={`${styles.row} ${styles.rowBot}`}>
                  <div className={`${styles.bubble} ${styles.bubbleBot} ${styles.typing}`}>
                    <i /><i /><i />
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className={styles.notice}>
                  <p>Couldn't reach us just now.</p>
                  <div className={styles.noticeActions}>
                    <button type="button" className={styles.retryBtn} onClick={retry}>
                      <RotateCw size={14} strokeWidth={2.2} />
                      Try again
                    </button>
                    <a href={WA} target="_blank" rel="noopener noreferrer" className={styles.noticeLink}>
                      or WhatsApp us
                    </a>
                  </div>
                </div>
              )}

              {status === "ratelimit" && (
                <div className={styles.notice}>
                  <p>{rateMsg}</p>
                  <div className={styles.noticeActions}>
                    <a href={WA} target="_blank" rel="noopener noreferrer" className={styles.noticeLink}>
                      Message us on WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* ---- Composer ---- */}
            <div className={styles.composer}>
              {!online ? (
                <div className={styles.offline}>
                  You're offline.{" "}
                  <a href={WA} target="_blank" rel="noopener noreferrer">
                    WhatsApp us instead
                  </a>
                </div>
              ) : (
                <div className={styles.inputWrap}>
                  <textarea
                    ref={inputRef}
                    className={styles.input}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Type your question…"
                    rows={1}
                    disabled={busy}
                    aria-label="Your message"
                  />
                  <button
                    type="button"
                    className={styles.sendBtn}
                    onClick={() => send()}
                    disabled={busy || !input.trim()}
                    aria-label="Send message"
                  >
                    <ArrowUp size={18} strokeWidth={2.4} />
                  </button>
                </div>
              )}

              <p className={styles.legal}>
                Replies are AI-generated. For a quote,{" "}
                <a href={WA} target="_blank" rel="noopener noreferrer">
                  talk to us directly
                </a>
                .
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}