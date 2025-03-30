import { createClient } from '@supabase/supabase-js'
import type { Database } from '@lib/databaseSchema.ts'

const key = import.meta.env.VITE_SUPABASE_ANON_KEY
if (!key) {
  throw new Error('SUPABASE_ANON_KEY not found')
}

const url = import.meta.env.VITE_SUPABASE_URL
if (!url) {
  throw new Error('SUPABASE_URL not found')
}

export const supabase = createClient<Database>(url, key)
