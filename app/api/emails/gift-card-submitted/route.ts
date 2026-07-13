import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { resend } from "@/lib/email/resend";
import { giftCardSubmittedEmail } from "@/lib/email/templates/gift-card-submitted";

/**
 * Sends the "gift card received" confirmation email.
 * Called by the authenticated user's browser right after their
 * submission is inserted. Re-fetches the submission server-side
 * (scoped to the caller's own row via RLS) so the email content can't
 * be spoofed from the client.
 */
export async function POST(request: NextRequest) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { submissionId } = await request.json();
  if (!submissionId) {
    return NextResponse.json({ error: "submissionId is required" }, { status: 400 });
  }

  const { data: submission, error } = await supabase
    .from("gift_card_submissions")
    .select("id, brand, value_amount, user_id")
    .eq("id", submissionId)
    .eq("user_id", user.id)
    .single();

  if (error || !submission) {
    return NextResponse.json({ error: "submission not found" }, { status: 404 });
  }

  const { subject, html } = giftCardSubmittedEmail({
    fullName: (user.user_metadata?.full_name as string | undefined) ?? null,
    brandSlug: submission.brand,
    valueAmount: submission.value_amount,
    submissionId: submission.id,
  });

  const { error: sendError } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: user.email!,
    subject,
    html,
  });

  if (sendError) {
    console.error("Failed to send gift card confirmation email:", sendError);
    return NextResponse.json({ error: "email failed to send" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
