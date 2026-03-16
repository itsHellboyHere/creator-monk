"use client";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "@/app/css/JingleBand.module.css";

const JINGLE_URL =
  "https://res.cloudinary.com/dgifa4wgb/video/upload/v1773684304/creator-monk-video_jg9kuf.mov";

export default function JingleBand() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);
  const [hovering, setHovering] = useState(false);

  /* ── Audio event handlers ── */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onMeta  = () => setDuration(v.duration);
    const onTime  = () => {
      setCurrentTime(v.currentTime);
      setProgress(v.currentTime / v.duration || 0);
    };
    const onEnded = () => { setPlaying(false); setProgress(0); setCurrentTime(0); };

    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", onEnded);
    return () => {
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    playing ? v.pause() : v.play();
    setPlaying(!playing);
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !muted;
    setMuted(!muted);
  };

  const seek = (e) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    v.currentTime = ratio * duration;
    setProgress(ratio);
  };

  const fmt = (s) => {
    if (!s || isNaN(s)) return "0:00";
    return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
  };

  return (
    <section className={styles.section}>
      <div className={styles.noise} />

      <div className={styles.inner}>

        {/* ── LEFT: Brand copy ── */}
        <motion.div
          className={styles.brandSide}
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.eyebrow}>THE SOUND OF</span>
          <h2 className={styles.brandName}>
            CREATOR<span className={styles.gold}>MONK</span>
          </h2>
          <p className={styles.brandDesc}>Our identity in 30 seconds.</p>

          {/* Live pill — visible on desktop beside brand text */}
          <AnimatePresence>
            {playing && (
              <motion.div
                className={styles.liveTag}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
              >
                <span className={styles.liveDot} />
                NOW PLAYING
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── RIGHT: Video player ── */}
        <motion.div
          className={styles.playerSide}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          {/* Video frame */}
          <div
            className={styles.videoWrap}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onClick={togglePlay}
          >
            <video
              ref={videoRef}
              src={JINGLE_URL}
              className={styles.video}
              playsInline
              preload="metadata"
              muted={muted}
                poster="https://res.cloudinary.com/dgifa4wgb/video/upload/so_29/v1773684304/creator-monk-video_jg9kuf.jpg"
            />

            {/* Overlay — shows play button when paused / hovered */}
            <AnimatePresence>
              {(!playing || hovering) && (
                <motion.div
                  className={styles.videoOverlay}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className={styles.bigPlayBtn}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {playing ? (
                      <span className={styles.pauseIcon}>
                        <span /><span />
                      </span>
                    ) : (
                      <span className={styles.playIcon}>▶</span>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Gold corner accent */}
            <div className={styles.cornerTL} />
            <div className={styles.cornerBR} />
          </div>

          {/* ── Controls bar ── */}
          <div className={styles.controls}>

            {/* Small play/pause */}
            <button
              className={styles.smallPlayBtn}
              onClick={togglePlay}
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <span className={styles.smallPause}><span /><span /></span>
              ) : (
                <span className={styles.smallPlay}>▶</span>
              )}
            </button>

            {/* Time */}
            <span className={styles.time}>{fmt(currentTime)}</span>

            {/* Seek track */}
            <div className={styles.seekTrack} onClick={seek}>
              <div className={styles.seekFill} style={{ width: `${progress * 100}%` }} />
              <div className={styles.seekThumb} style={{ left: `${progress * 100}%` }} />
            </div>

            <span className={styles.time}>{fmt(duration)}</span>

            {/* Mute */}
            <button
              className={styles.muteBtn}
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <line x1="23" y1="9" x2="17" y2="15"/>
                  <line x1="17" y1="9" x2="23" y2="15"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                </svg>
              )}
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}