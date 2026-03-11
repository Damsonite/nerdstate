import type { Session, User } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { supabase } from '@/lib/supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const session = ref<Session | null>(null)
  const initialized = ref(false)

  async function initializeSession() {
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      throw error
    }

    session.value = data.session
    user.value = data.session?.user ?? null
    initialized.value = true
  }

  async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      throw error
    }

    session.value = data.session
    user.value = data.user
  }

  async function signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) {
      throw error
    }

    session.value = data.session
    user.value = data.user

    return data
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw error
    }

    session.value = null
    user.value = null
  }

  return {
    user,
    session,
    initialized,
    initializeSession,
    signIn,
    signUp,
    signOut,
  }
})
