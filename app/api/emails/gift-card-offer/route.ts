import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { isAdmin } from "@/lib/auth/roles";
import { resend } from "@/lib/email/resend";
import { giftCardOfferEmail } from "@/lib/email/templates/gift-card-offer";

/**
 * Marks a submission as "offer_sent" and emails the offer to the
 * customer. Restricted to authenticated admins (see lib/auth/roles.ts) —
 * the caller's session cookie is checked first; the service-role client
 * is only used afterwards, to read/update rows outside the admin's own
 * RLS scope.
 */
export async function POST(request: NextRequest) {
  const sessionClient = createClient();
  const {
    data: { user },
  } = await sessionClient.auth.getUser();

  if (!isAdmin(user)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { submissionId, offerAmountFcfa } = await request.json();
  if (!submissionId || !offerAmountFcfa) {
    return NextResponse.json(
      { error: "submissionId and offerAmountFcfa are required" },
      { status: 400 },
    );
  }

  const supabase = createAdminClient();

  const { data: submission, error } = await supabase
    .from("gift_card_submissions")
    .select("id, brand, user_id")
    .eq("id", submissionId)
    .single();

  if (error || !submission) {
    return NextResponse.json({ error: "submission not found" }, { status: 404 });
  }

  const { data: userResult, error: userError } = await supabase.auth.admin.getUserById(
    submission.user_id,
  );

  if (userError || !userResult.user?.email) {
    return NextResponse.json({ error: "customer not found" }, { status: 404 });
  }

  const { subject, html } = giftCardOfferEmail({
    fullName: (userResult.user.user_metadata?.full_name as string | undefined) ?? null,
    brandSlug: submission.brand,
    offerAmountFcfa,
    submissionId: submission.id,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  });

  const { error: sendError } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: userResult.user.email,
    subject,
    html,
  });

  if (sendError) {
    console.error("Failed to send gift card offer email:", sendError);
    return NextResponse.json({ error: "email failed to send" }, { status: 502 });
  }

  const { error: updateError } = await supabase
    .from("gift_card_submissions")
    .update({ status: "offer_sent", offer_amount_fcfa: offerAmountFcfa })
    .eq("id", submissionId);

  if (updateError) {
    console.error("Failed to update submission after sending offer:", updateError);
  }

  return NextResponse.json({ ok: true });
}
