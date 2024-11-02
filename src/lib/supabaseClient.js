import { createClient } from '@supabase/supabase-js';

const VITE_SUPABASE_URL = "https://ikqzxknjqayiwicpfdha.supabase.co"; 
const VITE_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrcXp4a25qcWF5aXdpY3BmZGhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2NjYxNTYsImV4cCI6MjA0NTI0MjE1Nn0.R6sYvpC0JmR07N_ktN8dWB8F_YTqLdxWMUJg6HBOQrw"; // Replace with your Supabase anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// console.log("Supabase URL:", supabaseUrl);
// console.log("Supabase Anon Key:", supabaseAnonKey);


if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anonymous Key must be defined in environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
