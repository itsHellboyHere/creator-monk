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
      from: "CreatorMonk <onboarding@resend.dev>",
      to: ["visalkr976@gmail.com"],
      reply_to: email,
      subject: `New Contact Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6">
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
    });

    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Failed to send message. Please try again later." };
  }
}