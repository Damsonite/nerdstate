<script setup lang="ts">
import FormField from '@/components/shared/FormField.vue'
import { useLoginForm } from '@/composables/useLoginForm'

const { email, password, error, loading, handleSubmit } = useLoginForm()
</script>

<template>
  <div class="rounded border border-primary/20 bg-surface/60 p-8 backdrop-blur-sm">
    <div class="mb-8 text-center">
      <p class="font-mono text-xs tracking-[0.3em] text-secondary">── AUTHENTICATION ──</p>
      <h1 class="mt-3 font-display text-xl tracking-wide text-primary">LOG IN</h1>
    </div>

    <form novalidate @submit.prevent="handleSubmit" class="flex flex-col gap-5">
      <FormField
        id="email"
        v-model="email"
        label="EMAIL"
        type="email"
        autocomplete="email"
        placeholder="player@nerdstate.io"
      />

      <FormField
        id="password"
        v-model="password"
        label="PASSWORD"
        type="password"
        autocomplete="current-password"
        placeholder="••••••••"
      >
        <template #label-end>
          <RouterLink
            to="/forgot-password"
            class="font-mono text-xs text-muted/60 hover:text-primary transition-colors"
          >
            Forgot password?
          </RouterLink>
        </template>
      </FormField>

      <p v-if="error" role="alert" class="font-mono text-xs text-accent">⚠ {{ error }}</p>

      <button
        type="submit"
        :disabled="loading"
        class="btn-primary mt-1 w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ loading ? 'LOADING...' : 'LOG IN' }}
      </button>
    </form>

    <p class="mt-6 text-center font-mono text-xs text-muted/60">
      No account yet?
      <RouterLink to="/register" class="text-primary hover:text-secondary transition-colors ml-1">
        CREATE ONE
      </RouterLink>
    </p>
  </div>
</template>
