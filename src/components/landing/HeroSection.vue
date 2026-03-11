<template>
  <section class="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
    <HeroBackground />

    <div class="relative z-10 mx-auto max-w-4xl text-center">
      <p class="font-mono text-sm tracking-[0.4em] text-secondary">
        ── FIND YOUR NEXT ADVENTURE ──
      </p>

      <h1 class="my-6 font-display leading-loose text-2xl md:text-4xl">
        <span class="text-primary">NERD</span>
        <span class="text-secondary">STATE</span>
      </h1>

      <p class="font-sans text-lg md:text-xl text-text mb-8 max-w-2xl mx-auto leading-relaxed">
        Discover retro video games, track your personal backlog, and explore the stories behind the
        classics.
      </p>

      <div class="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <RouterLink to="/register" class="btn-secondary">CREATE ACCOUNT </RouterLink>

        <RouterLink to="/login" class="btn-primary">LOG IN</RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import HeroBackground from './HeroBackground.vue'
</script>
