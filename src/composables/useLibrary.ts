import { onMounted, ref } from 'vue'

import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth'

interface GameSummary {
  id: string
  rawg_id: number | null
  title: string | null
  slug: string | null
  release_date: string | null
  cover_url: string | null
  rating: number | null
}

interface UserGameRow {
  id: string
  game_id: string | null
  status: 'wishlist' | 'playing' | 'completed' | 'dropped' | null
  rating: number | null
  notes: string | null
  play_count: number | null
  started_at: string | null
  completed_at: string | null
  created_at: string | null
  game: GameSummary | GameSummary[] | null
}

export interface LibraryEntry {
  id: string
  gameId: string
  status: 'wishlist' | 'playing' | 'completed' | 'dropped'
  rating: number | null
  notes: string | null
  playCount: number
  startedAt: string | null
  completedAt: string | null
  createdAt: string | null
  game: GameSummary
}

export interface UpdateLibraryEntryInput {
  status: 'wishlist' | 'playing' | 'completed' | 'dropped'
  rating: number | null
  notes: string | null
  playCount: number
  startedAt: string | null
  completedAt: string | null
}

export function useLibrary() {
  const auth = useAuthStore()

  const backlog = ref<LibraryEntry[]>([])
  const loadingBacklog = ref(true)
  const mutating = ref(false)
  const error = ref<string | null>(null)

  async function fetchBacklog() {
    if (!auth.user?.id) {
      backlog.value = []
      loadingBacklog.value = false
      return
    }

    loadingBacklog.value = true
    error.value = null

    try {
      const { data, error: queryError } = await supabase
        .from('user_games')
        .select(
          'id, game_id, status, rating, notes, play_count, started_at, completed_at, created_at, game:games(id, rawg_id, title, slug, release_date, cover_url, rating)',
        )
        .eq('user_id', auth.user.id)
        .order('created_at', { ascending: false })

      if (queryError) {
        throw queryError
      }

      backlog.value = ((data ?? []) as UserGameRow[])
        .map((row) => ({
          ...row,
          game: Array.isArray(row.game) ? (row.game[0] ?? null) : row.game,
        }))
        .filter((row) => row.game_id && row.game)
        .map((row) => ({
          id: row.id,
          gameId: row.game_id as string,
          status: row.status ?? 'wishlist',
          rating: row.rating,
          notes: row.notes,
          playCount: row.play_count ?? 0,
          startedAt: row.started_at,
          completedAt: row.completed_at,
          createdAt: row.created_at,
          game: row.game as GameSummary,
        }))
    } catch (fetchError) {
      error.value = fetchError instanceof Error ? fetchError.message : 'Unknown error'
      backlog.value = []
    } finally {
      loadingBacklog.value = false
    }
  }

  async function addToBacklog(gameId: string) {
    if (!auth.user?.id) return

    mutating.value = true
    error.value = null

    try {
      const { error: upsertError } = await supabase
        .from('user_games')
        .upsert([{ user_id: auth.user.id, game_id: gameId, status: 'wishlist', play_count: 0 }], {
          onConflict: 'user_id,game_id',
        })

      if (upsertError) {
        throw upsertError
      }

      await fetchBacklog()
    } catch (upsertError) {
      error.value = upsertError instanceof Error ? upsertError.message : 'Unknown error'
    } finally {
      mutating.value = false
    }
  }

  async function updateBacklogEntry(entryId: string, input: UpdateLibraryEntryInput) {
    if (!auth.user?.id) return

    mutating.value = true
    error.value = null

    try {
      const payload = {
        status: input.status,
        rating: input.rating,
        notes: input.notes,
        play_count: input.playCount,
        started_at: input.startedAt,
        completed_at: input.completedAt,
      }

      const { data, error: updateError } = await supabase
        .from('user_games')
        .update(payload)
        .eq('id', entryId)
        .eq('user_id', auth.user.id)
        .select(
          'id, game_id, status, rating, notes, play_count, started_at, completed_at, created_at, game:games(id, rawg_id, title, slug, release_date, cover_url, rating)',
        )
        .single()

      if (updateError) {
        throw updateError
      }

      const normalizedGame = Array.isArray(data.game) ? (data.game[0] ?? null) : data.game

      if (!data.game_id || !normalizedGame) {
        return
      }

      const updatedEntry: LibraryEntry = {
        id: data.id,
        gameId: data.game_id,
        status: data.status ?? 'wishlist',
        rating: data.rating,
        notes: data.notes,
        playCount: data.play_count ?? 0,
        startedAt: data.started_at,
        completedAt: data.completed_at,
        createdAt: data.created_at,
        game: normalizedGame,
      }

      backlog.value = backlog.value.map((entry) => (entry.id === entryId ? updatedEntry : entry))
    } catch (updateError) {
      error.value = updateError instanceof Error ? updateError.message : 'Unknown error'
    } finally {
      mutating.value = false
    }
  }

  async function removeFromBacklog(entryId: string) {
    if (!auth.user?.id) return

    mutating.value = true
    error.value = null

    try {
      const { error: deleteError } = await supabase
        .from('user_games')
        .delete()
        .eq('id', entryId)
        .eq('user_id', auth.user.id)

      if (deleteError) {
        throw deleteError
      }

      backlog.value = backlog.value.filter((entry) => entry.id !== entryId)
    } catch (deleteError) {
      error.value = deleteError instanceof Error ? deleteError.message : 'Unknown error'
    } finally {
      mutating.value = false
    }
  }

  onMounted(async () => {
    await fetchBacklog()
  })

  return {
    backlog,
    loadingBacklog,
    mutating,
    error,
    fetchBacklog,
    addToBacklog,
    updateBacklogEntry,
    removeFromBacklog,
  }
}
