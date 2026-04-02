import { hasSupabaseAdminEnv } from "@/integrations/supabase/supabase-admin";
import { cookieOrganizationRepository } from "@/features/organization/infrastructure/cookie-organization-repository";
import { supabaseOrganizationRepository } from "@/features/organization/infrastructure/supabase-organization-repository";
import { logServerInfo } from "@/shared/lib/server-log";

export function getOrganizationRepository() {
  const useSupabase = hasSupabaseAdminEnv();

  logServerInfo(
    "organization.repository",
    useSupabase ? "Using Supabase repository" : "Using cookie fallback repository"
  );

  return useSupabase ? supabaseOrganizationRepository : cookieOrganizationRepository;
}
