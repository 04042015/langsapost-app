// admin/src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

// Ambil dari .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!

// Gunakan singleton supaya tidak bikin instance baru berkali-kali
let supabaseInstance

if (!supabaseInstance) {
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true, // Simpan session
      storage: localStorage, // Gunakan localStorage browser
      detectSessionInUrl: true, // Auto login jika lewat magic link
    },
  })
}

export const supabase = supabaseInstance
