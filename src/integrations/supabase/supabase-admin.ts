import { createClient } from "@supabase/supabase-js";

import { env } from "@/shared/config/env";
import { logServerInfo } from "@/shared/lib/server-log";

export function hasSupabaseAdminEnv() {
  return Boolean(env.supabaseUrl && env.supabaseServiceRoleKey);
}

export function createSupabaseAdminClient() {
  if (!hasSupabaseAdminEnv()) {
    throw new Error("Supabase admin environment is not configured.");
  }

  logServerInfo("supabase", "Creating admin client", {
    urlConfigured: Boolean(env.supabaseUrl),
    serviceRoleConfigured: Boolean(env.supabaseServiceRoleKey)
  });

  return createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
