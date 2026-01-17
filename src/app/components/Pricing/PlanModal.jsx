"use client";
import styles from "@/app/css/PricingPlans.module.css"

export default function PlanModal({ plan, onClose }) {
  const { pricing } = plan;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>{plan.name}</h3>

        {pricing.oneTime ? (
          <p className={styles.modalPrice}>
            ₹{pricing.oneTime} <span>(One-Time)</span>
          </p>
        ) : (
          <div className={styles.modalGrid}>
            <div>
              <h4>Monthly</h4>
              <p>₹{pricing.monthly}</p>
            </div>
            <div className={styles.highlight}>
              <h4>6 Months</h4>
              <p>₹{pricing.sixMonths}</p>
              <span>🔥 Best Value</span>
            </div>
          </div>
        )}

        <button className={styles.primaryBtn}>Proceed</button>
        <button className={styles.closeBtn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
