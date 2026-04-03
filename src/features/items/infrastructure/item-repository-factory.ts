import { hasSupabaseAdminEnv } from "@/integrations/supabase/supabase-admin";
import { cookieItemRepository } from "@/features/items/infrastructure/cookie-item-repository";
import { supabaseItemRepository } from "@/features/items/infrastructure/supabase-item-repository";
import { logServerInfo } from "@/shared/lib/server-log";

export function getItemRepository() {
  const useSupabase = hasSupabaseAdminEnv();

  logServerInfo("items.repository", useSupabase ? "Using Supabase repository" : "Using cookie fallback repository");

  return useSupabase ? supabaseItemRepository : cookieItemRepository;
}
