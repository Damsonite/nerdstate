<script setup lang="ts">
import { PageHeader, StatCard } from '@/components/dashboard'
import RetroPanel from '@/components/dashboard/RetroPanel.vue'
import { useDashboardStats } from '@/composables/useDashboardStats'

const { stats, loading } = useDashboardStats()

const logEntries = [
  { time: '00:00:01', msg: 'System initialized.', dim: false },
  { time: '00:00:02', msg: 'Auth module loaded.', dim: false },
  { time: '00:00:03', msg: 'Awaiting user input...', dim: true },
]
</script>

<template>
  <div class="flex flex-col gap-8">
    <PageHeader title="DASHBOARD" subtitle="System overview and quick access to your content." />

    <!-- Stat cards -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard
        v-for="card in stats"
        :key="card.label"
        :label="card.label"
        :value="card.value"
        :status="card.status"
        :active="card.active"
        :loading="loading"
      />
    </div>

    <RetroPanel title="SYSTEM LOG" status="[ LIVE ]">
      <div class="px-5 py-4 space-y-2">
        <div v-for="entry in logEntries" :key="entry.time" class="flex gap-4 font-mono text-sm">
          <span class="text-muted/50 shrink-0 select-none">{{ entry.time }}</span>
          <span :class="entry.dim ? 'text-muted' : 'text-text'">{{ entry.msg }}</span>
        </div>
      </div>
    </RetroPanel>
  </div>
</template>
