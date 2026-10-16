import { Suspense } from 'react';
import ConsentFlow from './ConsentFlow';
import styles from './consent.module.css';

// Supabase Auth (OAuth 2.1 server) sends people here when an AI app such as
// Claude or ChatGPT asks to connect to CreatorMonk Studio:
//   https://creatormonk.in/studio/oauth/consent?authorization_id=…
// (Site URL + "Authorization Path" in Supabase → Authentication → OAuth Server)

export const metadata = {
  title: 'Connect an AI app — CreatorMonk Studio',
  description: 'Allow an AI assistant to work with your CreatorMonk Studio workspace.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/studio/oauth/consent' },
};

export default function ConsentPage() {
  return (
    <main className={styles.page}>
      <div className={styles.wrap}>
        <Suspense fallback={<div className={styles.card}><p className={styles.muted}>Loading…</p></div>}>
          <ConsentFlow />
        </Suspense>
      </div>
    </main>
  );
}
