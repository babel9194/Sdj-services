import type { User } from "@supabase/supabase-js";

/**
 * Admin status is read from `app_metadata`, not `user_metadata`.
 * `app_metadata` can only be written with the service-role key, so a
 * regular user can never grant themselves admin access — unlike
 * `user_metadata`, which the user's own client can update.
 */
export function isAdmin(user: User | null | undefined): boolean {
  return user?.app_metadata?.role === "admin";
}
