import { onMounted, ref } from 'vue'

import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth'

export interface Stat {
  label: string
  value: string
  status: string
  active: boolean
}

export function useDashboardStats() {
  const auth = useAuthStore()

  const stats = ref<Stat[]>([
    { label: 'BACKLOG', value: '…', status: 'LOADING', active: true },
    { label: 'PLAYING', value: '…', status: 'LOADING', active: true },
    { label: 'COMPLETED', value: '…', status: 'LOADING', active: false },
  ])

  const loading = ref(true)
  const error = ref<string | null>(null)

  async function fetchStats() {
    loading.value = true
    error.value = null

    try {
      if (!auth.user?.id) {
        stats.value = [
          { label: 'BACKLOG', value: '0', status: 'OFFLINE', active: false },
          { label: 'PLAYING', value: '0', status: 'OFFLINE', active: false },
          { label: 'COMPLETED', value: '0', status: 'OFFLINE', active: false },
        ]
        return
      }

      const { data, error: queryError } = await supabase
        .from('user_games')
        .select('status, play_count')
        .eq('user_id', auth.user.id)

      if (queryError) {
        throw queryError
      }

      const rows = data ?? []
      const backlogTotal = rows.length
      const playingCount = rows.filter((row) => row.status === 'playing').length
      const completedCount = rows.filter((row) => row.status === 'completed').length
      const totalPlayCount = rows.reduce((sum, row) => sum + (row.play_count ?? 0), 0)

      stats.value = [
        {
          label: 'BACKLOG',
          value: String(backlogTotal),
          status: backlogTotal > 0 ? 'TRACKING' : 'EMPTY',
          active: backlogTotal > 0,
        },
        {
          label: 'PLAYING',
          value: String(playingCount),
          status: playingCount > 0 ? 'IN PROGRESS' : 'IDLE',
          active: playingCount > 0,
        },
        {
          label: 'COMPLETED',
          value: String(completedCount),
          status: `${totalPlayCount} RUNS`,
          active: completedCount > 0,
        },
      ]
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
      stats.value = stats.value.map((s) => ({ ...s, value: 'ERR', status: 'FAULT', active: false }))
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchStats)

  return { stats, loading, error, fetchStats }
}
