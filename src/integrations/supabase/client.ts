import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// Public keys — safe to ship to the browser.
const SUPABASE_URL = "https://tmvdiqeluqyretmemwsr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_pneLfsz1zCMaor0ucMzghA_dVMevZwj";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
  },
});

export const SUPABASE_PROJECT_URL = SUPABASE_URL;
