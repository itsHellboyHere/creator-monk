"use client";

import { useState } from "react";
import styles from "@/app/css/PricingPlans.module.css";

export default function PlanCards({ plans = [], onSelect }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <div
      className={`${styles.slider} ${
        plans.length <= 2 ? styles.centered : ""
      }`}
    >
      {plans.map((plan, i) => (
        <div
          key={plan.name}
          className={`${styles.card} ${
            selectedIndex === i ? styles.active : ""
          }`}
          onClick={() => setSelectedIndex(i)}
        >
          <h3>{plan.name}</h3>

          <p className={styles.price}>{plan.priceLabel}</p>

          <ul>
            {plan.features.map((f) => (
              <li key={f}>✅ {f}</li>
            ))}
          </ul>

          <button onClick={() => onSelect?.(plan)}>
            Check Plans
          </button>
        </div>
      ))}
    </div>
  );
}