<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  href: string
  label: string
  icon: Component
}>()
</script>

<template>
  <li class="flex flex-1 flex-col gap-1 overflow-y-auto">
    <RouterLink
      :to="href"
      class="flex items-center gap-3 rounded px-3 py-2 font-mono text-sm text-muted transition-colors hover:bg-primary/10 hover:text-primary"
      active-class="bg-primary/10 text-primary"
      style="text-shadow: 0 0 8px rgba(255, 154, 60, 0.45)"
    >
      <component :is="icon" :size="16" />
      {{ label }}
    </RouterLink>
  </li>
</template>
