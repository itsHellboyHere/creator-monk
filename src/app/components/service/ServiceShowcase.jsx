"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { EASE } from "@/app/lib/reveal";
import styles from "@/app/css/service/ServiceShowcase.module.css";

export default function ServiceShowcase({ data }) {
    const showcase = data.showcase;
    if (!showcase?.items?.length) return null;

    const [active, setActive] = useState(null);

    // ESC to close modal
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && setActive(null);
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, []);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    className={styles.head}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, ease: EASE }}
                >
                    <span className={styles.eyebrow}>Real work</span>
                    <h2 className={styles.title}>{showcase.title}</h2>
                    {showcase.sub && <p className={styles.sub}>{showcase.sub}</p>}
                </motion.div>

                <div className={styles.grid}>
                    {showcase.items.map((item, i) => (
                        <MediaCard
                            key={item.id}
                            item={item}
                            index={i}
                            onOpen={() => setActive(item)}
                        />
                    ))}
                </div>
            </div>

            {/* Fullscreen modal */}
            <AnimatePresence>
                {active && (
                    <MediaModal item={active} onClose={() => setActive(null)} />
                )}
            </AnimatePresence>
        </section>
    );
}

/* ─────────── Card ─────────── */

function MediaCard({ item, index, onOpen }) {
  const [loaded, setLoaded] = useState(false);
  const [hovering, setHovering] = useState(false);
  const videoRef = useRef(null);

  const handleEnter = () => {
    setHovering(true);
    if (item.type === "video" && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleLeave = () => {
    setHovering(false);
    if (item.type === "video" && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.button
      type="button"
      className={`${styles.card} ${styles[`span_${item.span || "square"}`]}`}
      onClick={onOpen}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: EASE }}
    >
      {!loaded && <div className={styles.loader} aria-hidden />}

      {item.type === "video" ? (
        <>
          {/* poster as a real <img> — always visible until hover */}
          {item.poster && (
            <img
              src={item.poster}
              alt={item.title}
              className={`${styles.media} ${styles.poster} ${hovering ? styles.posterHidden : ""}`}
              onLoad={() => setLoaded(true)}
              loading="lazy"
            />
          )}
          <video
            ref={videoRef}
            className={`${styles.media} ${styles.video} ${hovering ? styles.videoActive : ""}`}
            src={item.url}
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => setLoaded(true)}
          />
        </>
      ) : (
        <img
          src={item.url}
          alt={item.title}
          className={styles.media}
          onLoad={() => setLoaded(true)}
          loading="lazy"
        />
      )}

      <div className={styles.overlay}>
        <div className={styles.info}>
          {item.tag && <span className={styles.tag}>{item.tag}</span>}
          <span className={styles.name}>{item.title}</span>
        </div>
        {item.type === "video" && (
          <span className={styles.videoBadge} aria-hidden>▶</span>
        )}
      </div>
    </motion.button>
  );
}
/* ─────────── Fullscreen modal ─────────── */

function MediaModal({ item, onClose }) {
    return (
        <motion.div
            className={styles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <button
                type="button"
                className={styles.modalClose}
                onClick={onClose}
                aria-label="Close"
            >
                <X size={22} />
            </button>

            <motion.div
                className={styles.modalInner}
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.94, opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                onClick={(e) => e.stopPropagation()}
            >
                {item.type === "video" ? (
                    <video
                        className={styles.modalMedia}
                        src={item.url}
                        poster={item.poster}
                        autoPlay
                        loop
                        controls
                        playsInline
                    />
                ) : (
                    <img src={item.url} alt={item.title} className={styles.modalMedia} />
                )}

                <div className={styles.modalMeta}>
                    <div>
                        {item.tag && <span className={styles.tag}>{item.tag}</span>}
                        <h3 className={styles.modalTitle}>{item.title}</h3>
                    </div>
                    {item.href && (
                        <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.visitBtn}
                        >
                            <span>
                                {item.href.includes("youtu") ? "Watch on YouTube" : "Visit site"}
                            </span>
                            <ExternalLink size={15} strokeWidth={2.4} />
                        </a>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}