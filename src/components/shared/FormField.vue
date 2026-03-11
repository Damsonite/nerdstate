<script setup lang="ts">
withDefaults(
  defineProps<{
    id: string
    label: string
    type?: string
    autocomplete?: string
    placeholder?: string
  }>(),
  { type: 'text' },
)

const model = defineModel<string>({ required: true })
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <div class="flex items-center justify-between">
      <label :for="id" class="font-mono text-xs tracking-widest text-muted">{{ label }}</label>
      <slot name="label-end" />
    </div>

    <input
      :id="id"
      v-model="model"
      :type="type"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      class="rounded border border-muted/30 bg-background px-4 py-2.5 font-mono text-sm text-text placeholder-muted/40 outline-none transition-colors focus:border-primary"
    />
  </div>
</template>
