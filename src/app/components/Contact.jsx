"use client";
import { useEffect } from "react";
import styles from "@/app/css/Contact.module.css";
import SocialLinks from "@/app/components/SocialLinks";
import { sendContactEmail } from "@/app/actions/sendContactEmail";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={styles.submit}
      disabled={pending}
    >
      {pending ? "Sending..." : "Send Message"}
    </button>
  );
}

export default function ContactPage() {
  const [state, formAction] = useActionState(sendContactEmail, null);
useEffect(() => {
  if (state?.success && window.gtag) {
    window.gtag("event", "contact_form_submit", {
      event_category: "engagement",
      event_label: "contact_page",
    });
  }
}, [state]);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* HEADER */}
        <div className={styles.header}>
          <h1>
            Let’s <span>Connect</span>
          </h1>
          <p>
            Have a question, idea, or collaboration in mind?
            Drop us a message — we’d love to hear from you.
          </p>
        </div>

        {/* CONTENT */}
        <div className={styles.content}>

          {/* FORM */}
          <form action={formAction} className={styles.form}>
            <div className={styles.field}>
              <label>Name</label>
              <input name="name" required />
            </div>

            <div className={styles.field}>
              <label>Email</label>
              <input name="email" type="email" required />
            </div>

            <div className={styles.field}>
              <label>Message</label>
              <textarea name="message" rows="5" required />
            </div>

            <SubmitButton />

            {/* FEEDBACK */}
            {state?.success && (
              <p className={styles.success}>
                ✅ Message sent successfully!
              </p>
            )}

            {state?.error && (
              <p className={styles.error}>
                ❌ {state.error}
              </p>
            )}

            <p className={styles.note}>
              We usually reply within 24–48 hours.
            </p>
          </form>

          {/* INFO */}
          <div className={styles.info}>
            <h3>Other ways to reach us</h3>
            <p className={styles.email}>📩 creatormonkstudio@gmail.com</p>
            <SocialLinks variant="contact" />
          </div>

        </div>
      </div>
    </section>
  );
}