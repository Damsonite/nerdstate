<script setup lang="ts">
import AppLogo from '@/components/shared/AppLogo.vue'
</script>

<template>
  <header class="fixed top-0 z-50 w-full border-b border-muted/20 bg-surface/40 backdrop-blur-sm">
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <RouterLink to="/" class="flex items-center gap-2">
        <AppLogo />
      </RouterLink>

      <div class="flex items-center gap-6 font-mono text-muted">
        <a href="#featured" class="link">Featured</a>
        <a href="#about" class="link">About</a>
        <a href="#articles" class="link">Articles</a>
        <a href="#contribute" class="link">Contribute</a>
        <RouterLink to="/login" class="btn-primary">LOG IN</RouterLink>
      </div>
    </nav>
  </header>
</template>
