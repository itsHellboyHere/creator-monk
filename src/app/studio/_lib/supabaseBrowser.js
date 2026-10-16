'use client';

// Browser Supabase client for Studio web pages (OAuth consent).
// Uses ONLY the public publishable/anon key — safe to ship to the browser.
// Env (Vercel → Project → Settings → Environment Variables):
//   NEXT_PUBLIC_STUDIO_SUPABASE_URL   https://qeofaomogrobeprwcdkf.supabase.co
//   NEXT_PUBLIC_STUDIO_SUPABASE_KEY   sb_publishable_…  (or the legacy anon key)
import { createClient } from '@supabase/supabase-js';

let client = null;

export function studioSupabase() {
  if (client) return client;
  const url = process.env.NEXT_PUBLIC_STUDIO_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_STUDIO_SUPABASE_KEY;
  if (!url || !key) {
    throw new Error('Studio Supabase env is missing (NEXT_PUBLIC_STUDIO_SUPABASE_URL / _KEY).');
  }
  client = createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
      storageKey: 'cm-studio-web-auth', // separate from anything else on creatormonk.in
    },
  });
  return client;
}
