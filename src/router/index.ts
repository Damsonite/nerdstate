import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
  ],
})

export default router
