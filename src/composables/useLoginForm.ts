import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

export function useLoginForm() {
  const router = useRouter()
  const authStore = useAuthStore()

  const email = ref('')
  const password = ref('')
  const error = ref('')
  const loading = ref(false)

  async function handleSubmit() {
    error.value = ''

    if (!email.value || !password.value) {
      error.value = 'Please fill in all fields.'
      return
    }

    loading.value = true

    try {
      await authStore.signIn(email.value, password.value)
      await router.push('/')
    } catch (caughtError) {
      if (caughtError instanceof Error) {
        error.value = caughtError.message
      } else {
        error.value = 'Invalid credentials. Please try again.'
      }
    } finally {
      loading.value = false
    }
  }

  return { email, password, error, loading, handleSubmit }
}
