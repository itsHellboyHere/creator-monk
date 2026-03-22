"use client";
import { useRef, useState, useEffect } from "react";
import styles from "@/app/css/JingleBand.module.css";

const JINGLE_URL =
  "https://res.cloudinary.com/dgifa4wgb/video/upload/f_mp4,q_35,vc_h264,w_720/v1773684304/creator-monk-video_jg9kuf.mov";

const POSTER_URL =
  "https://res.cloudinary.com/dgifa4wgb/video/upload/so_29/v1773684304/creator-monk-video_jg9kuf.jpg";

export default function JingleBand() {
  const videoRef   = useRef(null);
  const sectionRef = useRef(null);

  const [playing,     setPlaying]     = useState(false);
  const [progress,    setProgress]    = useState(0);
  const [duration,    setDuration]    = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted,       setMuted]       = useState(false);
  const [hovering,    setHovering]    = useState(false);
  const [visible,     setVisible]     = useState(false);

  // Scroll-in animation — IntersectionObserver replaces whileInView
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Video event listeners
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
    const rect  = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    v.currentTime = ratio * duration;
    setProgress(ratio);
  };

  const fmt = (s) => {
    if (!s || isNaN(s)) return "0:00";
    return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
  };

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.noise} />

      <div className={`${styles.inner} ${visible ? styles.innerVisible : ""}`}>

        {/* ── LEFT: Brand copy ── */}
        <div className={styles.brandSide}>
          <span className={styles.eyebrow}>THE SOUND OF</span>
          <h2 className={styles.brandName}>
            CREATOR<span className={styles.gold}>MONK</span>
          </h2>
          <p className={styles.brandDesc}>Our identity in 30 seconds.</p>

          {/* Live tag — CSS show/hide replaces AnimatePresence */}
          <div className={`${styles.liveTag} ${playing ? styles.liveTagActive : ""}`}>
            <span className={styles.liveDot} />
            NOW PLAYING
          </div>
        </div>

        {/* ── RIGHT: Video player ── */}
        <div className={styles.playerSide}>

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
              preload="none"
              muted={muted}
              poster={POSTER_URL}
            />

            {/* Overlay — CSS opacity replaces AnimatePresence */}
            <div className={`${styles.videoOverlay} ${!playing || hovering ? styles.overlayVisible : ""}`}>
              <div className={styles.bigPlayBtn}>
                {playing ? (
                  <span className={styles.pauseIcon}><span /><span /></span>
                ) : (
                  <span className={styles.playIcon}>▶</span>
                )}
              </div>
            </div>

            <div className={styles.cornerTL} />
            <div className={styles.cornerBR} />
          </div>

          {/* ── Controls ── */}
          <div className={styles.controls}>
            <button className={styles.smallPlayBtn} onClick={togglePlay} aria-label={playing ? "Pause" : "Play"}>
              {playing ? (
                <span className={styles.smallPause}><span /><span /></span>
              ) : (
                <span className={styles.smallPlay}>▶</span>
              )}
            </button>

            <span className={styles.time}>{fmt(currentTime)}</span>

            <div className={styles.seekTrack} onClick={seek}>
              <div className={styles.seekFill} style={{ width: `${progress * 100}%` }} />
              <div className={styles.seekThumb} style={{ left: `${progress * 100}%` }} />
            </div>

            <span className={styles.time}>{fmt(duration)}</span>

            <button className={styles.muteBtn} onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"}>
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
        </div>

      </div>
    </section>
  );
}