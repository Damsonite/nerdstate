<script setup lang="ts">
import FormField from '@/components/shared/FormField.vue'
import { useRegisterForm } from '@/composables/useRegisterForm'

const { email, password, confirmPassword, error, info, loading, handleSubmit } = useRegisterForm()
</script>

<template>
  <div class="p-8 rounded border border-primary/20 bg-surface/60 backdrop-blur-sm">
    <div class="mb-8 text-center">
      <p class="font-mono text-xs tracking-[0.3em] text-secondary">── AUTHENTICATION ──</p>
      <h1 class="mt-3 font-display text-xl tracking-wide text-primary">REGISTER</h1>
    </div>

    <form novalidate class="flex flex-col gap-5" @submit.prevent="handleSubmit">
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
        autocomplete="new-password"
        placeholder="••••••••"
      />

      <FormField
        id="confirmPassword"
        v-model="confirmPassword"
        label="CONFIRM PASSWORD"
        type="password"
        autocomplete="new-password"
        placeholder="••••••••"
      />

      <p v-if="error" role="alert" class="font-mono text-xs text-accent">{{ error }}</p>
      <p v-if="info" role="status" class="font-mono text-xs text-secondary">{{ info }}</p>

      <button
        type="submit"
        :disabled="loading"
        class="btn-primary mt-1 w-full justify-center disabled:cursor-not-allowed disabled:opacity-50"
      >
        {{ loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT' }}
      </button>
    </form>

    <p class="mt-6 text-center font-mono text-xs text-muted/60">
      Already have an account?

      <RouterLink to="/login" class="ml-1 text-primary transition-colors hover:text-secondary">
        LOG IN
      </RouterLink>
    </p>
  </div>
</template>
