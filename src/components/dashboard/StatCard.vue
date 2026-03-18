<script setup lang="ts">
defineProps<{
  label: string
  value: string
  status: string
  active: boolean
  loading?: boolean
}>()
</script>

<template>
  <div
    class="flex flex-col gap-2 rounded border border-primary/25 bg-surface/70 p-5"
    :class="{ 'opacity-60': loading }"
    style="
      box-shadow:
        0 0 14px rgba(255, 154, 60, 0.06),
        inset 0 0 20px rgba(255, 154, 60, 0.03);
    "
  >
    <p class="font-mono text-xs tracking-widest text-muted/70 uppercase">{{ label }}</p>
    <p
      class="font-display text-3xl text-primary"
      style="text-shadow: 0 0 14px rgba(255, 154, 60, 0.5)"
    >
      {{ value }}
    </p>
    <p class="font-mono text-xs" :class="active ? 'text-primary' : 'text-accent'">● {{ status }}</p>
  </div>
</template>
