import { ref, watch } from 'vue'

import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth'

export function useProfile() {
  const authStore = useAuthStore()
  const username = ref<string | null>(null)

  watch(
    () => authStore.user?.id,
    async (userId) => {
      username.value = null

      if (!userId) {
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', userId)
        .maybeSingle()

      if (error) {
        return
      }

      if (typeof data?.username === 'string' && data.username.trim()) {
        username.value = data.username
      }
    },
    { immediate: true },
  )

  return {
    username,
  }
}
