import { supabase } from '@lib/supabaseClient.ts'
import type { SignInWithIdTokenCredentials } from '@supabase/supabase-js'

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw error
  }

  return data
}

export async function signInWithIdToken(
  credentials: SignInWithIdTokenCredentials,
) {
  const { data, error } = await supabase.auth.signInWithIdToken(credentials)

  if (error) {
    throw error
  }

  return data
}
