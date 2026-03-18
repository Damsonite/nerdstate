import { onMounted, ref } from 'vue'

import { supabase } from '@/lib/supabase'

export interface GameRecord {
  id: string
  rawg_id: number | null
  title: string | null
  slug: string | null
  release_date: string | null
  cover_url: string | null
  rating: number | null
}

export function useGames() {
  const games = ref<GameRecord[]>([])
  const selectedGame = ref<GameRecord | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  async function fetchGames() {
    loading.value = true
    error.value = null

    try {
      const { data, error: queryError } = await supabase
        .from('games')
        .select('id, rawg_id, title, slug, release_date, cover_url, rating')
        .order('title', { ascending: true })

      if (queryError) {
        throw queryError
      }

      games.value = (data ?? []) as GameRecord[]
      selectedGame.value = null
    } catch (fetchError) {
      error.value = fetchError instanceof Error ? fetchError.message : 'Unknown error'
      games.value = []
      selectedGame.value = null
    } finally {
      loading.value = false
    }
  }

  function selectGame(game: GameRecord) {
    selectedGame.value = game
  }

  onMounted(fetchGames)

  return {
    games,
    selectedGame,
    loading,
    error,
    fetchGames,
    selectGame,
  }
}
