'use client';

// Same email + password as the CreatorMonk Studio app.
import { useState } from 'react';
import { studioSupabase } from '../../_lib/supabaseBrowser';
import styles from './consent.module.css';

export default function SignInForm({ onSignedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError('');
    const { error: err } = await studioSupabase().auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setBusy(false);
    if (err) {
      setError(
        /invalid login|invalid credentials/i.test(err.message)
          ? 'Email or password is wrong.'
          : 'Couldn’t sign in. Please try again.',
      );
      return;
    }
    onSignedIn();
  };

  return (
    <form className={styles.card} onSubmit={submit}>
      <span className={styles.badge}>
        <span className={styles.dot} aria-hidden />
        CreatorMonk Studio
      </span>
      <h1 className={styles.title}>Sign in to connect</h1>
      <p className={styles.muted}>
        An AI app wants to work with your Studio workspace. Sign in with the same email and password you use in the
        Studio app.
      </p>

      <label className={styles.label} htmlFor="cm-email">Email</label>
      <input
        id="cm-email"
        className={styles.input}
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@agency.com"
      />

      <label className={styles.label} htmlFor="cm-password">Password</label>
      <input
        id="cm-password"
        className={styles.input}
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
      />

      {error && <p className={styles.error}>{error}</p>}

      <button className={`btn btn-primary ${styles.full}`} type="submit" disabled={busy}>
        {busy ? 'Signing in…' : 'Sign in'}
      </button>
      <p className={styles.fine}>Forgot your password? Ask your agency admin to reset it from the Studio app.</p>
    </form>
  );
}
