import { defineStore } from 'pinia'
import { computed } from 'vue'
import type { Session } from '@supabase/supabase-js'
import { signIn } from '@/api/auth.ts'
import { StorageSerializers, useStorage } from '@vueuse/core'

export const useUserStore = defineStore('user', () => {
  const supabaseId = import.meta.env.VITE_SUPABASE_ID
  if (!supabaseId) {
    throw new Error('VITE_SUPABASE_ID not found')
  }

  const session = useStorage<Session>(
    `sb-${supabaseId}-auth-token`,
    null,
    localStorage,
    { serializer: StorageSerializers.object },
  )

  const user = computed(() => session.value?.user)
  const isLoggedIn = computed(() => !!user.value)

  async function login(email: string, password: string) {
    const { session: _session } = await signIn(email, password)
    session.value = _session
  }

  async function logout() {
    session.value = null
  }

  return {
    isLoggedIn,
    user,
    session,
    login,
    logout,
  }
})
