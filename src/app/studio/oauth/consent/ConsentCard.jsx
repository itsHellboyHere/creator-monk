'use client';

// "Claude wants to access your CreatorMonk Studio" — what it can / can't do,
// who is signed in, Allow / Deny.
import styles from './consent.module.css';

const CAN = [
  'See your clients, their brand details and posts',
  'Look at post designs to write or check captions',
  'Create draft posts and edit drafts',
  'Add comments and send posts to your client for review',
];
const CANNOT = [
  'Approve or publish posts — your client approves, Studio publishes',
  'Delete anything, or change your team, billing or password',
];

export default function ConsentCard({ details, isAgency, busy, onAllow, onDeny, onSwitchAccount }) {
  const client = details?.client ?? {};
  const appName = client.name || 'An AI app';
  const email = details?.user?.email;

  return (
    <div className={styles.card}>
      <div className={styles.apps}>
        <div className={styles.appIcon}>
          {client.logo_uri ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={client.logo_uri} alt="" width={44} height={44} />
          ) : (
            <span>{appName.slice(0, 1).toUpperCase()}</span>
          )}
        </div>
        <span className={styles.link} aria-hidden>⟷</span>
        <div className={`${styles.appIcon} ${styles.studioIcon}`}>
          <span>CM</span>
        </div>
      </div>

      <h1 className={styles.title}>
        {appName} wants to access your CreatorMonk Studio
      </h1>
      {client.uri && (
        <p className={styles.muted}>
          {appName} ·{' '}
          <a href={client.uri} target="_blank" rel="noreferrer">
            {client.uri.replace(/^https?:\/\//, '')}
          </a>
        </p>
      )}

      {isAgency === false && (
        <div className={styles.warn}>
          This connector is for agency teams. <strong>{email}</strong> is a client login, so the AI app won’t be able to
          use Studio. Switch to your agency account, or ask your agency to use it.
        </div>
      )}

      <div className={styles.list}>
        <p className={styles.listTitle}>It will be able to</p>
        <ul>
          {CAN.map((t) => (
            <li key={t} className={styles.yes}>{t}</li>
          ))}
        </ul>
        <p className={styles.listTitle}>It can’t</p>
        <ul>
          {CANNOT.map((t) => (
            <li key={t} className={styles.no}>{t}</li>
          ))}
        </ul>
      </div>

      <p className={styles.fine}>
        It acts as you, with exactly your access. Everything it changes is marked “via AI app” in Studio. You can
        disconnect it anytime in the Studio app → Settings → Connected AI apps.
      </p>

      <div className={styles.actions}>
        <button className="btn btn-ghost" type="button" onClick={onDeny} disabled={busy}>
          Deny
        </button>
        <button className="btn btn-primary" type="button" onClick={onAllow} disabled={busy || isAgency === false}>
          {busy ? 'Connecting…' : 'Allow'}
        </button>
      </div>

      {email && (
        <p className={styles.account}>
          Signed in as <strong>{email}</strong> ·{' '}
          <button type="button" className={styles.textBtn} onClick={onSwitchAccount}>
            Not you?
          </button>
        </p>
      )}
    </div>
  );
}
