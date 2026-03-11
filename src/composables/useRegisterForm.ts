import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

export function useRegisterForm() {
  const router = useRouter()
  const authStore = useAuthStore()

  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const error = ref('')
  const info = ref('')
  const loading = ref(false)

  async function handleSubmit() {
    error.value = ''
    info.value = ''

    if (!email.value || !password.value || !confirmPassword.value) {
      error.value = 'Please fill in all fields.'
      return
    }

    if (password.value.length < 6) {
      error.value = 'Password must be at least 6 characters.'
      return
    }

    if (password.value !== confirmPassword.value) {
      error.value = 'Passwords do not match.'
      return
    }

    loading.value = true

    try {
      const data = await authStore.signUp(email.value, password.value)

      if (data.session) {
        await router.push('/')
        return
      }

      info.value = 'Account created. Check your email to confirm your registration.'
    } catch (caughtError) {
      if (caughtError instanceof Error) {
        error.value = caughtError.message
      } else {
        error.value = 'Unable to register. Please try again.'
      }
    } finally {
      loading.value = false
    }
  }

  return { email, password, confirmPassword, error, info, loading, handleSubmit }
}
