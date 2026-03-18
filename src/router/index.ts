import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      component: () => import('@/layouts/PrivateLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          component: () => import('@/views/dashboard/DashboardView.vue'),
        },
        {
          path: 'games',
          component: () => import('@/views/dashboard/GamesView.vue'),
        },
        {
          path: 'library',
          component: () => import('@/views/dashboard/LibraryView.vue'),
        },
        {
          path: 'profile',
          redirect: '/dashboard',
        },
        {
          path: 'settings',
          redirect: '/dashboard',
        },
      ],
    },
    {
      path: '/',
      component: () => import('@/layouts/PublicLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/public/LandingView.vue'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('@/layouts/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          component: () => import('@/views/auth/LoginView.vue'),
        },
        {
          path: 'register',
          component: () => import('@/views/auth/RegisterView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()
  if (!auth.initialized) {
    await auth.initializeSession()
  }

  if (to.meta.requiresAuth && !auth.session) {
    return { path: '/login' }
  }

  if (!to.meta.requiresAuth && auth.session) {
    return { path: '/dashboard' }
  }
})

export default router
