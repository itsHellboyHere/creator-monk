"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/app/css/Services.module.css";

const services = [
  {
    id: "01",
    os: "SOCIAL_OS",
    title: "Social\nGrowth",
    desc: "Full-spectrum social management — Reels, strategy, community & analytics. You focus on the business, we handle the noise.",
    pills: ["Reels & Shorts", "Strategy", "Community Mgmt", "Analytics"],
    stat: "1M+",
    statLabel: "Organic Reach",
    image: "https://res.cloudinary.com/dgifa4wgb/image/upload/f_webp,q_50,w_1200/v1773681431/Gemini_Generated_Image_adi1vradi1vradi1-2_irlqd3.jpg",
    color: "#ffae00",
    href: "/services/social-media",
  },
  {
    id: "02",
    os: "BUILD_OS",
    title: "Web &\nSoftware",
    desc: "Custom websites, SaaS platforms & scalable backend systems. Next.js, Python & Node.js — from landing page to full product.",
    pills: ["Websites", "SaaS Platforms", "Full Stack", "APIs & Backend"],
    stat: "20+",
    statLabel: "Products Shipped",
    image: "https://res.cloudinary.com/dgifa4wgb/image/upload/f_webp,q_50,w_1200/v1773681247/Gemini_Generated_Image_trdipqtrdipqtrdi_oskvnw.jpg",
    color: "#4287f5",
    href: "/services/web-software",
  },
  {
    id: "03",
    os: "AUTO_OS",
    title: "AI &\nAutomation",
    desc: "AI agents, smart chatbots & workflow automation. Intelligent systems that replace repetitive work and run 24/7.",
    pills: ["AI Agents", "Workflow Automation", "Chatbots", "RAG Systems"],
    stat: "24/7",
    statLabel: "Systems Running",
    image: "https://res.cloudinary.com/dgifa4wgb/image/upload/f_webp,q_40,w_1200/v1774172813/ChatGPT_Image_Mar_22_2026_at_03_15_41_PM_qidvkj.jpg",
    color: "#10b981",
    href: "/services/ai-automation",
  },
];

export default function ServicesStack() {
  const bgRefs      = useRef([]);
  const sectionRefs = useRef([]);
  const dotRefs     = useRef([]);
  const wrapperRef  = useRef(null);

  // Controls dot visibility — only show when services wrapper is in view
  const [dotsVisible, setDotsVisible] = useState(false);

  useEffect(() => {
    // Parallax on scroll
    const onScroll = () => {
      sectionRefs.current.forEach((sec, i) => {
        if (!sec || !bgRefs.current[i]) return;
        const rect     = sec.getBoundingClientRect();
        const progress = -rect.top / window.innerHeight;
        const shift    = progress * 80;
        bgRefs.current[i].style.transform = `translateY(${shift}px)`;
      });
    };

    // Active dot per section
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.dataset.index);
          if (entry.isIntersecting) {
            dotRefs.current.forEach((d, i) => {
              if (!d) return;
              d.classList.toggle(styles.dotActive, i === idx);
              d.style.setProperty("--dc", services[idx].color);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    // Show/hide dots based on whether the whole services block is visible
    const wrapperObserver = new IntersectionObserver(
      ([entry]) => setDotsVisible(entry.isIntersecting),
      // Trigger as soon as ANY part of the services wrapper enters/exits view
      { threshold: 0 }
    );

    sectionRefs.current.forEach((sec) => sec && sectionObserver.observe(sec));
    if (wrapperRef.current) wrapperObserver.observe(wrapperRef.current);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      sectionObserver.disconnect();
      wrapperObserver.disconnect();
    };
  }, []);

  const scrollToSection = (idx) => {
    sectionRefs.current[idx]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.stackWrapper} ref={wrapperRef}>

      {/* Progress dots — CSS opacity controlled by dotsVisible state */}
      <div className={`${styles.progressDots} ${dotsVisible ? styles.dotsVisible : ""}`}>
        {services.map((s, i) => (
          <button
            key={i}
            ref={(el) => (dotRefs.current[i] = el)}
            className={`${styles.dot} ${i === 0 ? styles.dotActive : ""}`}
            style={{ "--dc": s.color }}
            onClick={() => scrollToSection(i)}
            aria-label={`Go to ${s.os}`}
          />
        ))}
      </div>

      {services.map((s, i) => (
        <div
          key={s.id}
          ref={(el) => (sectionRefs.current[i] = el)}
          data-index={i}
          className={styles.section}
          style={{ "--c": s.color }}
        >
          <div ref={(el) => (bgRefs.current[i] = el)} className={styles.bg}>
            <Image
              src={s.image}
              alt={s.os}
              fill
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
              quality={75}
            />
          </div>

          <div className={styles.tint} style={{ background: s.color }} />
          <div className={styles.grad} />

          <div className={styles.content}>
            <div className={styles.meta}>
              <span className={styles.metaLine} />
              <span className={styles.metaNum}>{s.id} / 0{services.length}</span>
            </div>

            <span className={styles.osLabel}>{s.os}</span>

            <h2 className={styles.title}>
              {s.title.split("\n").map((line, li) => (
                <span key={li} className={styles.titleLine}>{line}</span>
              ))}
            </h2>

            <p className={styles.desc}>{s.desc}</p>

            <div className={styles.pills}>
              {s.pills.map((p) => (
                <span key={p} className={styles.pill}>{p}</span>
              ))}
            </div>

            <Link href={s.href} className={styles.cta}>
              EXPLORE {s.os}
              <span className={styles.ctaArrow}>→</span>
            </Link>
          </div>

          <div className={styles.stat}>
            <span className={styles.statVal}>{s.stat}</span>
            <span className={styles.statLbl}>{s.statLabel}</span>
          </div>

          {i === 0 && (
            <div className={styles.scrollHint}>
              <span>Scroll</span>
              <div className={styles.scrollLine}>
                <div className={styles.scrollDot} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}