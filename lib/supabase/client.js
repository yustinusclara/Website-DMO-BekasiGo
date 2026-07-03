'use client'

// Supabase browser client — singleton, safe for React strict mode.
// Uses the public anon key (RLS enforced server-side by Supabase).

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let _client = null

export function getSupabase() {
  if (_client) return _client
  if (!supabaseUrl || !supabaseKey) {
    // In dev this may fire on first render before env is ready. We soft-fail
    // and return null so callers can render a disabled UI instead of crashing.
    // eslint-disable-next-line no-console
    console.warn('[supabase] Missing NEXT_PUBLIC_SUPABASE_URL / ANON_KEY — auth features disabled.')
    return null
  }
  _client = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
    },
  })
  return _client
}

// Backwards-compat default export (works with `import supabase from '@/lib/supabase/client'`).
export const supabase = typeof window !== 'undefined' ? getSupabase() : null

export default supabase
