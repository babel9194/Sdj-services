"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";
import { isAdmin } from "@/lib/auth/roles";
import type { GiftCardSubmissionStatus } from "@/types";

type ManualStatus = Extract<GiftCardSubmissionStatus, "paid" | "rejected">;

/**
 * Updates a submission's status. Restricted to admins — checked against
 * the caller's own session before any privileged write happens via the
 * service-role client.
 */
export async function updateSubmissionStatus(submissionId: string, status: ManualStatus) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAdmin(user)) {
    return { error: "unauthorized" as const };
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("gift_card_submissions")
    .update({ status })
    .eq("id", submissionId);

  if (error) {
    return { error: "update_failed" as const };
  }

  revalidatePath(`/admin/cartes-cadeaux/${submissionId}`);
  revalidatePath("/admin/cartes-cadeaux");
  revalidatePath("/admin");

  return { error: null };
}
