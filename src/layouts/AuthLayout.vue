<script setup lang="ts">
import HeroBackground from '@/components/landing/HeroBackground.vue'
import AppLogo from '@/components/shared/AppLogo.vue'
import { COPYRIGHT } from '@/constants/app'
</script>

<template>
  <div
    class="relative min-h-screen bg-background text-text flex flex-col items-center justify-center px-6"
  >
    <HeroBackground />

    <div class="z-10 mb-10">
      <AppLogo />
    </div>

    <main class="relative z-10 w-full max-w-sm">
      <RouterView />
    </main>

    <footer class="relative z-10 mt-10 font-mono text-sm text-muted/50">{{ COPYRIGHT }}</footer>
  </div>
</template>
