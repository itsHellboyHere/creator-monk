"use client";
import { useRef, useState } from "react";
import styles from "@/app/css/PricingPlans.module.css";

export default function PlanCards({ plans, onSelect }) {
  const sliderRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (plans.length <= 2) return; // ✅ no scroll logic needed

    const slider = sliderRef.current;
    const center = slider.scrollLeft + slider.offsetWidth / 2;

    let closest = 0;
    let minDist = Infinity;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(center - cardCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });

    setActiveIndex(closest);
  };

  return (
    <div
      ref={sliderRef}
      onScroll={handleScroll}
      className={`${styles.slider} ${
        plans.length <= 3 ? styles.centered : ""
      }`}
    >
      {plans.map((plan, i) => (
        <div
          key={plan.name}
          ref={(el) => (cardRefs.current[i] = el)}
          className={`${styles.card} ${
            plans.length > 2 && activeIndex === i ? styles.active : ""
          }`}
        >
          <h3>{plan.name}</h3>

          <p className={styles.price}>{plan.priceLabel}</p>

          <ul>
            {plan.features.map((f) => (
              <li key={f}>✅ {f}</li>
            ))}
          </ul>

          <button onClick={() => onSelect(plan)}>
            Check Plans
          </button>
        </div>
      ))}
    </div>
  );
}