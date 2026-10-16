'use client';

// State machine for the consent page:
//   loading → (no session) signin → details → (Allow / Deny) → redirecting
//   any step → error (expired request, server problem…)
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { studioSupabase } from '../../_lib/supabaseBrowser';
import SignInForm from './SignInForm';
import ConsentCard from './ConsentCard';
import StatusCard from './StatusCard';

function friendly(err) {
  const m = String(err?.message ?? err ?? '');
  if (/expired|not found|invalid authorization/i.test(m)) {
    return 'This connection request has expired. Go back to your AI app and start connecting again.';
  }
  if (/env is missing/i.test(m)) return 'This page is not configured yet. Please contact CreatorMonk support.';
  return 'Something went wrong. Go back to your AI app and try connecting again.';
}

export default function ConsentFlow() {
  const params = useSearchParams();
  const authorizationId = params.get('authorization_id');

  const [step, setStep] = useState('loading'); // loading | signin | details | redirecting | error
  const [details, setDetails] = useState(null);
  const [agency, setAgency] = useState(null); // true / false / null (unknown)
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const loadDetails = useCallback(async () => {
    const sb = studioSupabase();
    const { data, error: e } = await sb.auth.oauth.getAuthorizationDetails(authorizationId);
    if (e) throw e;
    if (data && 'redirect_url' in data && !('authorization_id' in data)) {
      // already approved before → straight back to the AI app
      setStep('redirecting');
      window.location.assign(data.redirect_url);
      return;
    }
    setDetails(data);

    // Heads-up for client logins: the MCP server only works for agency teams.
    // (RLS shows every membership of your orgs — filter to YOUR rows.)
    const { data: rows, error: mErr } = await sb
      .from('memberships')
      .select('role')
      .eq('user_id', data.user.id);
    setAgency(mErr ? null : (rows ?? []).some((r) => r.role === 'org_admin' || r.role === 'org_staff'));
    setStep('details');
  }, [authorizationId]);

  useEffect(() => {
    if (!authorizationId) {
      setError('This page is opened by an AI app (like Claude) when you connect CreatorMonk Studio. Start from there.');
      setStep('error');
      return;
    }
    (async () => {
      try {
        const { data } = await studioSupabase().auth.getSession();
        if (!data.session) {
          setStep('signin');
          return;
        }
        await loadDetails();
      } catch (e) {
        setError(friendly(e));
        setStep('error');
      }
    })();
  }, [authorizationId, loadDetails]);

  const onSignedIn = async () => {
    try {
      setStep('loading');
      await loadDetails();
    } catch (e) {
      setError(friendly(e));
      setStep('error');
    }
  };

  const decide = async (approve) => {
    setBusy(true);
    try {
      const sb = studioSupabase();
      const { data, error: e } = approve
        ? await sb.auth.oauth.approveAuthorization(authorizationId, { skipBrowserRedirect: true })
        : await sb.auth.oauth.denyAuthorization(authorizationId, { skipBrowserRedirect: true });
      if (e) throw e;
      setStep('redirecting');
      window.location.assign(data.redirect_url);
    } catch (e) {
      setError(friendly(e));
      setStep('error');
    } finally {
      setBusy(false);
    }
  };

  const signOut = async () => {
    await studioSupabase().auth.signOut();
    setDetails(null);
    setAgency(null);
    setStep('signin');
  };

  if (step === 'loading') return <StatusCard kind="loading" title="One moment…" />;
  if (step === 'redirecting') {
    return <StatusCard kind="loading" title="Taking you back…" text="You can close this tab if it doesn't close by itself." />;
  }
  if (step === 'error') return <StatusCard kind="error" title="Can't connect" text={error} />;
  if (step === 'signin') return <SignInForm onSignedIn={onSignedIn} />;

  return (
    <ConsentCard
      details={details}
      isAgency={agency}
      busy={busy}
      onAllow={() => decide(true)}
      onDeny={() => decide(false)}
      onSwitchAccount={signOut}
    />
  );
}
