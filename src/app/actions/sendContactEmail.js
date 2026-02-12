"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(prevState, formData) {
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    if (!name || !email || !message) {
      return { error: "All fields are required." };
    }

    await resend.emails.send({
      from: "CreatorMonk System <onboarding@resend.dev>",
      to: ["visalkr976@gmail.com"],
      reply_to: email,
      subject: `[SYSTEM_INBOUND] New Protocol from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            .container { 
              font-family: 'Courier New', Courier, monospace; 
              line-height: 1.6; 
              color: #ffffff; 
              background-color: #0D0D0D; 
              padding: 40px; 
              max-width: 600px; 
              margin: auto;
              border: 1px solid #333;
            }
            .header { 
              border-bottom: 2px solid #ffae00; 
              padding-bottom: 20px; 
              margin-bottom: 30px; 
              display: flex; 
              align-items: center; 
            }
            .logo { width: 140px; filter: brightness(0) invert(1); }
            .favicon { width: 20px; margin-right: 10px; vertical-align: middle; }
            .label { color: #ffae00; font-weight: bold; font-size: 12px; letter-spacing: 2px; }
            .data-box { background: #1a1a1a; padding: 20px; border-left: 4px solid #ffae00; margin-bottom: 20px; }
            .footer { font-size: 10px; color: #666; margin-top: 40px; text-align: center; border-top: 1px solid #333; padding-top: 20px; }
            .highlight { color: #ffae00; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://www.creatormonk.in/logo.png" alt="CreatorMonk" class="logo">
            </div>
            
            <p><img src="https://www.creatormonk.in/favicon.ico" class="favicon"><span class="label">// INCOMING_TRANSMISSION</span></p>
            
            <div class="data-box">
              <p><span class="label">SENDER_ID:</span> <span class="highlight">${name}</span></p>
              <p><span class="label">RETURN_PATH:</span> ${email}</p>
            </div>

            <div class="data-box">
              <p><span class="label">MISSION_BRIEF:</span></p>
              <p style="color: #ccc; white-space: pre-wrap;">${message}</p>
            </div>

            <div class="footer">
              <p>CREATORMONK // BOKARO_STATION_01</p>
              <p>AUTO_GENERATED_LOG_V2.6</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Failed to send message. Please try again later." };
  }
}