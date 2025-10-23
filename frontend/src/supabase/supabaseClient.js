import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-key";

// Debug logging
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Anon Key:", supabaseAnonKey ? "Loaded" : "Not loaded");

// Create client with placeholder values if env vars are not set
// This allows the app to load for development/testing
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Log a warning if using placeholder values
if (supabaseUrl === "https://placeholder.supabase.co") {
  console.warn("⚠️ Using placeholder Supabase credentials. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file for full functionality.");
}
