<script setup lang="ts">
import { PublicFooter, PublicHeader } from '@/components/landing'
import { CrtOverlay } from '@/components/shared'
</script>

<template>
  <div class="min-h-screen bg-background text-text">
    <CrtOverlay />

    <PublicHeader />

    <main>
      <RouterView />
    </main>

    <PublicFooter />
  </div>
</template>
