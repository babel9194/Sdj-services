import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase client for use in Client Components.
 * Server Components / Route Handlers should create their own client
 * with `createServerClient` from `@supabase/ssr` so cookies are handled
 * per-request (see lib/supabase-server.ts once auth is implemented).
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
