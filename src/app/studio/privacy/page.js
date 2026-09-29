import Link from 'next/link';
import LegalShell, { Section, legalStyles as s } from '../_components/LegalShell';
import { STUDIO_LEGAL as L } from '../_content/company';

export const metadata = {
  title: `Privacy Policy — ${L.product}`,
  description: `How ${L.product} collects, uses, stores and protects your data, including data from Facebook and Instagram.`,
  alternates: { canonical: '/studio/privacy' },
};

const toc = [
  { id: 'who-we-are', label: 'Who we are' },
  { id: 'what-we-collect', label: 'What we collect' },
  { id: 'how-we-use', label: 'How we use it' },
  { id: 'meta-data', label: 'Facebook & Instagram data' },
  { id: 'sharing', label: 'Who we share it with' },
  { id: 'storage', label: 'Storage & security' },
  { id: 'retention', label: 'How long we keep it' },
  { id: 'your-rights', label: 'Your rights & choices' },
  { id: 'children', label: 'Children' },
  { id: 'changes', label: 'Changes to this policy' },
  { id: 'contact', label: 'Contact & grievances' },
];

export default function StudioPrivacyPage() {
  return (
    <LegalShell
      eyebrow="Privacy Policy"
      title="Your content, handled with care."
      lead={`${L.product} helps agencies create, review and publish social media content with their clients. This policy explains exactly what we collect, why, and how you stay in control.`}
      toc={toc}
    >
      <Section id="who-we-are" title="1. Who we are">
        <p>
          {L.product} (“Studio”, “we”, “us”) is a content-approval and publishing app built and operated by{' '}
          <strong>{L.company}</strong>, {L.city}. Studio is available as a mobile app for Android and iOS.
        </p>
        <p>
          Studio is used by <strong>agencies</strong> (admins and staff) and by their <strong>clients</strong>. When an
          agency adds a client, the agency decides what content is created and shared with that client.
        </p>
      </Section>

      <Section id="what-we-collect" title="2. What we collect">
        <div className={s.tableWrap}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>Type</th>
                <th>Examples</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Account</td>
                <td>Name, email address, profile photo, role (agency admin, staff or client), password (stored only as a secure hash by our authentication provider).</td>
              </tr>
              <tr>
                <td>Workspace content</td>
                <td>Agency and client names and logos, content plans, posts, captions, schedules, comments, change requests, approvals and post requests.</td>
              </tr>
              <tr>
                <td>Media</td>
                <td>Images and videos you upload for posts, and photos attached to comments.</td>
              </tr>
              <tr>
                <td>Support</td>
                <td>Messages you send to our support team from inside the app, and “Request access” form details (agency name, contact name, email, WhatsApp number, city).</td>
              </tr>
              <tr>
                <td>Device</td>
                <td>A push-notification token for your device and basic platform info (Android or iOS), so we can send you notifications.</td>
              </tr>
              <tr>
                <td>Connected accounts</td>
                <td>If you connect a Facebook Page or Instagram account — see section 4.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          We do <strong>not</strong> collect your contacts, precise location, or anything from your device that you don’t
          choose to upload.
        </p>
      </Section>

      <Section id="how-we-use" title="3. How we use it">
        <ul>
          <li>To run Studio: sign you in, show your workspace, and let agencies and clients review and approve content.</li>
          <li>To publish content to the social accounts you connect, only when you ask us to (for example, after a post is approved and scheduled).</li>
          <li>To send notifications about activity that concerns you, such as a new post to review, a comment or an approval.</li>
          <li>To keep Studio safe: prevent abuse, apply rate limits and investigate problems.</li>
          <li>To respond to support requests.</li>
        </ul>
        <p>
          We do <strong>not</strong> sell your data, use it for advertising, or use your content to train AI models.
        </p>
      </Section>

      <Section id="meta-data" title="4. Facebook & Instagram data">
        <p>
          If you (an agency or a client) choose to connect a Facebook Page or Instagram professional account, you sign in
          with Meta and approve the permissions yourself. We receive only what those permissions allow:
        </p>
        <ul>
          <li>The names and IDs of the Pages and Instagram accounts you select, and their profile pictures.</li>
          <li>An access token that lets Studio publish content to those accounts on your behalf.</li>
          <li>The ID and link of each post Studio publishes, so we can show it as “Published”.</li>
        </ul>
        <div className={s.callout}>
          <strong>How we use it:</strong> only to publish the posts you or your agency create and approve in Studio, to the
          accounts you selected. We don’t read your private messages, don’t run ads, don’t access your followers’ data, and
          never sell or share Meta data with anyone else. Access tokens are stored encrypted on our servers and are never
          sent to the app.
        </div>
        <p>
          You can disconnect at any time from Studio (client → Connections), or from Facebook: <strong>Settings &amp;
          privacy → Settings → Business integrations</strong>, then remove <strong>{L.product}</strong>. When you
          disconnect, we delete the stored tokens for that account. To delete everything, see our{' '}
          <Link href="/studio/data-deletion">data deletion instructions</Link>.
        </p>
      </Section>

      <Section id="sharing" title="5. Who we share it with">
        <p>We share data only with service providers that run Studio for us, under their own security and privacy terms:</p>
        <ul>
          <li><strong>Supabase</strong> — database and sign-in (hosted in Mumbai, India).</li>
          <li><strong>Amazon Web Services</strong> — secure storage for post media and attachments.</li>
          <li><strong>Google Firebase</strong> — delivering push notifications.</li>
          <li><strong>Meta</strong> — only when publishing to accounts you connected.</li>
        </ul>
        <p>
          Inside a workspace, content is visible to the agency’s team and to the specific client it belongs to — never to
          other clients or other agencies. We may disclose data if required by law.
        </p>
      </Section>

      <Section id="storage" title="6. Storage & security">
        <ul>
          <li>All traffic is encrypted in transit (HTTPS/TLS).</li>
          <li>Media is stored privately; files open only through short-lived, signed links for people who have access.</li>
          <li>Every database row is protected by access rules, so users only reach data their role allows.</li>
          <li>Social account tokens are kept on the server only and are encrypted at rest.</li>
        </ul>
        <p>No system is perfectly secure, but we work to protect your data and will notify you of any breach as required by law.</p>
      </Section>

      <Section id="retention" title="7. How long we keep it">
        <p>
          We keep your data while your account or your agency’s workspace is active. Uploaded media may be removed from
          storage automatically after a post’s working period ends. When an account or workspace is deleted, we remove its
          personal data within <strong>30 days</strong>, except where we must keep limited records by law.
        </p>
      </Section>

      <Section id="your-rights" title="8. Your rights & choices">
        <p>Under India’s Digital Personal Data Protection Act, 2023 and other applicable laws, you can:</p>
        <ul>
          <li>Access the personal data we hold about you and get it corrected or updated.</li>
          <li>Ask us to delete your data — see <Link href="/studio/data-deletion">data deletion</Link>.</li>
          <li>Withdraw consent, for example by disconnecting a social account or turning off notifications on your device.</li>
          <li>Raise a grievance with us (section 11).</li>
        </ul>
        <p>
          Clients: your agency manages your workspace, so some requests may be handled together with your agency.
        </p>
      </Section>

      <Section id="children" title="9. Children">
        <p>Studio is a business tool and is not meant for anyone under 18. We don’t knowingly collect data from children.</p>
      </Section>

      <Section id="changes" title="10. Changes to this policy">
        <p>
          If we change this policy, we’ll update the date at the top and, for important changes, let you know in the app.
        </p>
      </Section>

      <Section id="contact" title="11. Contact & grievances">
        <p>
          Questions, requests or complaints about your data — write to our grievance contact. We reply within 7 working days.
        </p>
        <div className={s.contact}>
          <a className="btn btn-primary" href={`mailto:${L.email}?subject=Studio%20privacy%20request`}>
            Email {L.email}
          </a>
          <Link className="btn btn-ghost" href="/studio/data-deletion">
            Delete my data
          </Link>
        </div>
        <p style={{ marginTop: '1.2rem' }}>
          {L.company}, {L.city}
        </p>
      </Section>
    </LegalShell>
  );
}