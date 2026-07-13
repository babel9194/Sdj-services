import "server-only";
import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  // Fail loudly at boot in development rather than silently dropping emails.
  console.warn("RESEND_API_KEY is not set — transactional emails will fail to send.");
}

export const resend = new Resend(process.env.RESEND_API_KEY);
