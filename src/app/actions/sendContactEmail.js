"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(prevState, formData) {
  try {
    const name    = formData.get("name")?.toString().trim();
    const email   = formData.get("email")?.toString().trim();
    const phone   = formData.get("phone")?.toString().trim() || "Not provided";
    const service = formData.get("service")?.toString().trim() || "Not specified";
    const message = formData.get("message")?.toString().trim();

    if (!name || !email || !message) {
      return { error: "Name, email and message are required." };
    }

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "short",
    });

    await resend.emails.send({
      from:     "CreatorMonk <onboarding@resend.dev>",
      to:       ["visalkr976@gmail.com"],
      reply_to: email,
      subject:  `New Project Inquiry — ${name} · ${service}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Inquiry — CreatorMonk</title>
</head>
<body style="
  margin: 0;
  padding: 0;
  background-color: #0a0a0a;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
">

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background-color: #0a0a0a; padding: 48px 20px;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="600" cellpadding="0" cellspacing="0" border="0"
          style="
            max-width: 600px;
            width: 100%;
            background-color: #111111;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid #222222;
          ">

          <!-- ══ TOP ACCENT BAR ══ -->
          <tr>
            <td style="background: #ffae00; height: 4px; font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <!-- ══ HEADER ══ -->
          <tr>
            <td style="padding: 36px 40px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <!-- Logo text -->
                    <span style="
                      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                      font-size: 18px;
                      font-weight: 900;
                      letter-spacing: 0.12em;
                      color: #ffffff;
                      text-transform: uppercase;
                    ">
                      CREATOR<span style="color: #ffae00;">MONK</span>
                    </span>
                  </td>
                  <td align="right">
                    <!-- Status badge -->
                    <span style="
                      background-color: rgba(255,174,0,0.12);
                      color: #ffae00;
                      font-size: 10px;
                      font-weight: 700;
                      letter-spacing: 0.2em;
                      padding: 5px 12px;
                      border-radius: 999px;
                      border: 1px solid rgba(255,174,0,0.25);
                      text-transform: uppercase;
                    ">
                      ● NEW INQUIRY
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ══ DIVIDER ══ -->
          <tr>
            <td style="padding: 0 40px;">
              <div style="height: 1px; background: #222; font-size: 0;">&nbsp;</div>
            </td>
          </tr>

          <!-- ══ HEADLINE ══ -->
          <tr>
            <td style="padding: 32px 40px 8px;">
              <p style="
                margin: 0 0 6px;
                font-size: 11px;
                font-weight: 700;
                letter-spacing: 0.35em;
                color: #ffae00;
                text-transform: uppercase;
              ">
                INCOMING TRANSMISSION
              </p>
              <h1 style="
                margin: 0;
                font-size: 28px;
                font-weight: 900;
                color: #ffffff;
                letter-spacing: -0.02em;
                line-height: 1.15;
              ">
                ${name} wants to<br/>work with you.
              </h1>
            </td>
          </tr>

          <!-- ══ TIMESTAMP ══ -->
          <tr>
            <td style="padding: 10px 40px 28px;">
              <p style="
                margin: 0;
                font-size: 11px;
                color: #555;
                font-family: 'Courier New', Courier, monospace;
                letter-spacing: 0.1em;
              ">
                ${timestamp} IST
              </p>
            </td>
          </tr>

          <!-- ══ SENDER INFO CARDS ══ -->
          <tr>
            <td style="padding: 0 40px 24px;">

              <!-- 2-col grid: Name + Service -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="48%" style="
                    background: #1a1a1a;
                    border: 1px solid #2a2a2a;
                    border-radius: 8px;
                    padding: 18px 20px;
                    vertical-align: top;
                  ">
                    <p style="margin: 0 0 6px; font-size: 10px; font-weight: 700; letter-spacing: 0.28em; color: #555; text-transform: uppercase;">
                      SENDER
                    </p>
                    <p style="margin: 0; font-size: 15px; font-weight: 700; color: #ffffff;">
                      ${name}
                    </p>
                  </td>
                  <td width="4%">&nbsp;</td>
                  <td width="48%" style="
                    background: #1a1a1a;
                    border: 1px solid #2a2a2a;
                    border-radius: 8px;
                    padding: 18px 20px;
                    vertical-align: top;
                  ">
                    <p style="margin: 0 0 6px; font-size: 10px; font-weight: 700; letter-spacing: 0.28em; color: #555; text-transform: uppercase;">
                      SERVICE
                    </p>
                    <p style="margin: 0; font-size: 15px; font-weight: 700; color: #ffae00;">
                      ${service}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- 2-col: Email + Phone -->
          <tr>
            <td style="padding: 0 40px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="48%" style="
                    background: #1a1a1a;
                    border: 1px solid #2a2a2a;
                    border-radius: 8px;
                    padding: 18px 20px;
                    vertical-align: top;
                  ">
                    <p style="margin: 0 0 6px; font-size: 10px; font-weight: 700; letter-spacing: 0.28em; color: #555; text-transform: uppercase;">
                      EMAIL
                    </p>
                    <p style="margin: 0; font-size: 14px; font-weight: 600; color: #ffffff; word-break: break-all;">
                      <a href="mailto:${email}" style="color: #ffffff; text-decoration: none;">${email}</a>
                    </p>
                  </td>
                  <td width="4%">&nbsp;</td>
                  <td width="48%" style="
                    background: #1a1a1a;
                    border: 1px solid #2a2a2a;
                    border-radius: 8px;
                    padding: 18px 20px;
                    vertical-align: top;
                  ">
                    <p style="margin: 0 0 6px; font-size: 10px; font-weight: 700; letter-spacing: 0.28em; color: #555; text-transform: uppercase;">
                      PHONE
                    </p>
                    <p style="margin: 0; font-size: 14px; font-weight: 600; color: #ffffff;">
                      ${phone}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ══ MESSAGE ══ -->
          <tr>
            <td style="padding: 0 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="
                    background: #141414;
                    border: 1px solid #2a2a2a;
                    border-left: 3px solid #ffae00;
                    border-radius: 8px;
                    padding: 22px 24px;
                  ">
                    <p style="margin: 0 0 10px; font-size: 10px; font-weight: 700; letter-spacing: 0.28em; color: #555; text-transform: uppercase;">
                      PROJECT BRIEF
                    </p>
                    <p style="
                      margin: 0;
                      font-size: 14px;
                      color: #cccccc;
                      line-height: 1.75;
                      white-space: pre-wrap;
                      word-break: break-word;
                    ">${message}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ══ CTA BUTTON ══ -->
          <tr>
            <td style="padding: 0 40px 36px;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="
                    background: #ffae00;
                    border-radius: 8px;
                    overflow: hidden;
                  ">
                    <a href="mailto:${email}?subject=Re: Your CreatorMonk Inquiry&body=Hi ${name},"
                      style="
                        display: inline-block;
                        padding: 14px 32px;
                        font-size: 12px;
                        font-weight: 900;
                        letter-spacing: 0.18em;
                        color: #000000;
                        text-decoration: none;
                        text-transform: uppercase;
                      ">
                      REPLY TO ${name} →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ══ DIVIDER ══ -->
          <tr>
            <td style="padding: 0 40px;">
              <div style="height: 1px; background: #1e1e1e; font-size: 0;">&nbsp;</div>
            </td>
          </tr>

          <!-- ══ FOOTER ══ -->
          <tr>
            <td style="padding: 24px 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="
                      margin: 0;
                      font-size: 11px;
                      color: #444;
                      font-family: 'Courier New', Courier, monospace;
                      letter-spacing: 0.1em;
                    ">
                      CREATORMONK — AUTO_GENERATED_LOG
                    </p>
                    <p style="
                      margin: 4px 0 0;
                      font-size: 11px;
                      color: #333;
                      font-family: 'Courier New', Courier, monospace;
                      letter-spacing: 0.08em;
                    ">
                      This email was sent from the contact form at creatormonk.in
                    </p>
                  </td>
                  <td align="right">
                    <span style="
                      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                      font-size: 13px;
                      font-weight: 900;
                      letter-spacing: 0.1em;
                      color: #333;
                      text-transform: uppercase;
                    ">
                      CREATOR<span style="color: #ffae00;">MONK</span>
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>

</body>
</html>
      `,
    });

    return { success: true };
  } catch (err) {
    console.error("Email send error:", err);
    return { error: "Failed to send message. Please try again later." };
  }
}