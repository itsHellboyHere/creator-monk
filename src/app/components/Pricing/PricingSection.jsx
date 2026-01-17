"use client";
import { useState } from "react";
import styles from "@/app/css/PricingPlans.module.css";
import PlanCards from "./PlansCard";
import PlanModal from "./PlanModal";
import { PLANS } from "./pricingdata"; 

export default function PricingSection() {
  const [service, setService] = useState("instagram");
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>
        Our <span>Plans</span>
      </h2>

      <div className={styles.tabs}>
        {["instagram", "youtube", "website"].map((s) => (
          <button
            key={s}
            className={service === s ? styles.activeTab : ""}
            onClick={() => setService(s)}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </div>

     
      <PlanCards
        plans={PLANS[service]}
        onSelect={setSelectedPlan}
      />

      {selectedPlan && (
        <PlanModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </section>
  );
}