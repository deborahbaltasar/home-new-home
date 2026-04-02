import { hasSupabaseAdminEnv } from "@/integrations/supabase/supabase-admin";
import { cookieHouseRepository } from "@/features/houses/infrastructure/cookie-house-repository";
import { supabaseHouseRepository } from "@/features/houses/infrastructure/supabase-house-repository";
import { logServerInfo } from "@/shared/lib/server-log";

export function getHouseRepository() {
  const useSupabase = hasSupabaseAdminEnv();

  logServerInfo("houses.repository", useSupabase ? "Using Supabase repository" : "Using cookie fallback repository");

  return useSupabase ? supabaseHouseRepository : cookieHouseRepository;
}
