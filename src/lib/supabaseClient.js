import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// console.log("Supabase URL:", supabaseUrl);
// console.log("Supabase Anon Key:", supabaseAnonKey);


if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anonymous Key must be defined in environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);