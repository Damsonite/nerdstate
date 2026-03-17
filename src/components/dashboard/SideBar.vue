<script setup lang="ts">
import { Gamepad2, LayoutDashboard, LogOut, Settings, User } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

import AppLogo from '@/components/shared/AppLogo.vue'
import { useAuthStore } from '@/stores/auth'
import NavItem from './NavItem.vue'

const auth = useAuthStore()
const router = useRouter()

async function handleSignOut() {
  await auth.signOut()
  router.push('/login')
}
</script>

<template>
  <aside
    class="fixed inset-y-0 left-0 z-40 flex flex-col w-60 bg-surface border-r border-primary/20"
    style="box-shadow: 0 0 28px rgba(255, 154, 60, 0.04) inset"
  >
    <!-- Logo -->
    <div class="flex items-center justify-center h-16 border-b border-primary/20">
      <AppLogo />
    </div>

    <!-- Navigation -->
    <nav class="flex flex-col flex-1 px-3 py-4">
      <NavItem href="/dashboard" label="Dashboard" :icon="LayoutDashboard" />

      <NavItem href="/dashboard/games" label="Gallery" :icon="Gamepad2" />
    </nav>

    <!-- User actions -->
    <div class="flex flex-col gap-1 px-3 pt-4 pb-8 border-t border-primary/20">
      <NavItem href="/dashboard/profile" label="Profile" :icon="User" />

      <NavItem href="/dashboard/settings" label="Settings" :icon="Settings" />

      <NavItem @press="handleSignOut" label="Log out" :icon="LogOut" />
    </div>
  </aside>
</template>
