// utils/supabase/server.ts
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

export const createClient = () => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key) => cookies().get(key)?.value,
        set: (key, value, options) => cookies().set(key, value, options),
        remove: (key, options) => cookies().delete(key, options),
      },
    }
  )
}
