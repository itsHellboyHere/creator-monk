"use client";

import { useRef, useState } from "react";
import styles from "@/app/css/PricingPlans.module.css";

const plans = [
  { name: "Basic", price: "$19", features: ["Content roadmap", "Basic analytics", "Email support"] },
  { name: "Pro", price: "$49", features: ["Growth strategy", "Advanced analytics", "Priority support"] },
  { name: "Premium", price: "$99", features: ["Full monetization", "1:1 mentoring", "Dedicated support"] },
  { name: "Premium2", price: "$99", features: ["Full monetization", "1:1 mentoring", "Dedicated support"] },
  { name: "Premium3", price: "$99", features: ["Full monetization", "1:1 mentoring", "Dedicated support"] }
];

export default function PricingPlans() {
  const sliderRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(1); // start near center

  const handleScroll = () => {
    const slider = sliderRef.current;
    const center = slider.scrollLeft + slider.offsetWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cardRefs.current.forEach((card, index) => {
      const cardCenter =
        card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(center - cardCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Pricing <span>Plans</span></h2>

      <div
        className={styles.slider}
        ref={sliderRef}
        onScroll={handleScroll}
      >
        {plans.map((plan, i) => (
          <div
            key={plan.name}
            ref={(el) => (cardRefs.current[i] = el)}
            className={`${styles.card} ${
              activeIndex === i ? styles.active : ""
            }`}
          >
            <h3>{plan.name}</h3>
            <p className={styles.price}>{plan.price}/mo</p>

            <ul>
              {plan.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>

            <button>Buy Now</button>
          </div>
        ))}
      </div>
    </section>
  );
}