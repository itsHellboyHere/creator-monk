import Link from 'next/link';
import LegalShell, { Section, legalStyles as s } from '../_components/LegalShell';
import { STUDIO_LEGAL as L } from '../_content/company';

export const metadata = {
  title: `Delete your data — ${L.product}`,
  description: `How to delete your ${L.product} account, workspace data and connected Facebook / Instagram data.`,
  alternates: { canonical: '/studio/data-deletion' },
};

const toc = [
  { id: 'disconnect', label: 'Disconnect Facebook / Instagram' },
  { id: 'delete-account', label: 'Delete your account' },
  { id: 'what-happens', label: 'What gets deleted' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'help', label: 'Need help?' },
];

export default function StudioDataDeletionPage() {
  const mail = `mailto:${L.email}?subject=Delete%20my%20Studio%20data&body=Registered%20email%3A%20%0AName%3A%20%0AAgency%20%2F%20workspace%3A%20`;

  return (
    <LegalShell
      eyebrow="Data deletion"
      title="Delete your data, any time."
      lead={`You're always in control of what ${L.product} keeps. Disconnect a social account in seconds, or ask us to delete everything.`}
      toc={toc}
    >
      <Section id="disconnect" title="1. Disconnect Facebook or Instagram">
        <p>Removes Studio’s access to your Page or Instagram account and deletes the stored access tokens.</p>
        <h3>From Facebook</h3>
        <ol className={s.steps}>
          <li>Open Facebook and go to <strong>Settings &amp; privacy → Settings</strong>.</li>
          <li>Open <strong>Business integrations</strong> (on some accounts: <strong>Apps and websites</strong>).</li>
          <li>Find <strong>{L.product}</strong> and tap <strong>Remove</strong>.</li>
        </ol>
        <h3>From Studio</h3>
        <ol className={s.steps}>
          <li>Open the client in Studio and go to <strong>Connections</strong>.</li>
          <li>Tap the connected account and choose <strong>Disconnect</strong>.</li>
        </ol>
        <div className={s.callout}>
          When Facebook tells us you removed the app, we automatically delete the tokens and account details we stored for it.
        </div>
      </Section>

      <Section id="delete-account" title="2. Delete your account and data">
        <ol className={s.steps}>
          <li>
            Email <a href={mail}>{L.email}</a> from your registered email, with the subject <strong>“Delete my Studio data”</strong>.
            Or, inside the app, go to <strong>Settings → Get help</strong> and send the same request.
          </li>
          <li>Tell us your name and agency / workspace name so we can find your account.</li>
          <li>We confirm the request from your registered email, then delete your data.</li>
        </ol>
        <p>
          <strong>Agency owners</strong> can ask us to delete the whole workspace — the agency, its team logins, clients,
          posts, media and connected accounts. <strong>Clients and staff</strong> can ask to delete their own login and
          personal details; content that belongs to the agency’s workspace is handled with the agency.
        </p>
      </Section>

      <Section id="what-happens" title="3. What gets deleted">
        <div className={s.tableWrap}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>Data</th>
                <th>Deleted</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Login &amp; profile</td><td>Name, email, photo, password hash, device notification tokens</td></tr>
              <tr><td>Connected accounts</td><td>Page / Instagram IDs, names, pictures and access tokens</td></tr>
              <tr><td>Workspace (owner request)</td><td>Clients, plans, posts, captions, comments, requests, approvals</td></tr>
              <tr><td>Media</td><td>Uploaded images, videos and comment attachments</td></tr>
              <tr><td>Support</td><td>Support conversations linked to your account</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Posts already published to Facebook or Instagram stay on those platforms — delete them there if you wish.
          We may keep minimal records (for example, that a deletion happened) where the law requires.
        </p>
      </Section>

      <Section id="timeline" title="4. Timeline">
        <p>
          We confirm your request within <strong>7 working days</strong> and complete deletion within <strong>30 days</strong>.
          Backups roll over and are cleared on their normal cycle after that.
        </p>
      </Section>

      <Section id="help" title="5. Need help?">
        <p>Write to us and a real person will help.</p>
        <div className={s.contact}>
          <a className="btn btn-primary" href={mail}>Request deletion</a>
          <Link className="btn btn-ghost" href="/studio/privacy">Read the privacy policy</Link>
        </div>
      </Section>
    </LegalShell>
  );
}