import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'
import './styles/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')

const authStore = useAuthStore(pinia)

authStore.initializeSession().catch((error: unknown) => {
  console.error('Failed to initialize auth session', error)
})
