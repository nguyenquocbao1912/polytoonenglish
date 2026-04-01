import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export interface ScoreHistory {
  id: number
  user_id: string
  listening_score: number
  reading_score: number
  completed_at: string
  tests: { id: number; type_test: string }[]
}

export interface MasteredVocab {
  id: number
  vocabularies: {
    word: string
    part_of_speech: string
    definition_vi: string
    example_en: string
    example_vi: string
  } | null
}

// Supabase trả về nested 1:N dưới dạng mảng,
// nhưng user_vocabulary_progress → vocabularies là 1:1 nên ta cast về kiểu đúng
type SupabaseMasteredVocabRow = {
  id: number
  vocabularies: MasteredVocab["vocabularies"]
}

export interface DashboardData {
  testHistory: ScoreHistory[]
  masteredVocab: MasteredVocab[]
  masteredCount: number
  totalTests: number
  bestScore: number
}

/**
 * Custom hook để tải song song tất cả dữ liệu Dashboard (Promise.all).
 * Chỉ tắt cờ `loading` khi CẢ HAI request đã hoàn tất.
 */
export function useDashboardData(userId: string | undefined) {
  const [data, setData] = useState<DashboardData>({
    testHistory: [],
    masteredVocab: [],
    masteredCount: 0,
    totalTests: 0,
    bestScore: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) return

    let cancelled = false

    async function fetchAll() {
      setLoading(true)
      setError(null)

      try {
        // Các request chạy SONG SONG – không bị thác nước (waterfall)
        const [histResult, vocabResult, allScoresResult] = await Promise.all([
          supabase
            .from("user_attempts")
            .select(`id, user_id, listening_score, reading_score, completed_at, tests ( id, type_test )`, { count: "exact" })
            .eq("user_id", userId)
            .order("completed_at", { ascending: false })
            .limit(5),

          supabase
            .from("user_vocabulary_progress")
            .select(`id, vocabularies ( word, part_of_speech, definition_vi, example_en, example_vi )`, { count: "exact" })
            .eq("user_id", userId)
            .eq("is_learned", true)
            .limit(4),
          
          supabase
            .from("user_attempts")
            .select("listening_score, reading_score")
            .eq("user_id", userId)
        ])

        if (cancelled) return

        if (histResult.error) throw histResult.error
        if (vocabResult.error) throw vocabResult.error
        if (allScoresResult.error) throw allScoresResult.error

        const masteredVocab = (vocabResult.data ?? []) as unknown as MasteredVocab[]
        
        const allScores = allScoresResult.data ?? []
        const bestScore = allScores.length > 0 
          ? Math.max(...allScores.map(t => (t.listening_score || 0) + (t.reading_score || 0)))
          : 0

        setData({
          testHistory: (histResult.data ?? []) as ScoreHistory[],
          masteredVocab,
          masteredCount: vocabResult.count ?? masteredVocab.length,
          totalTests: histResult.count ?? ((histResult.data ?? []).length),
          bestScore,
        })
      } catch (err: any) {
        if (!cancelled) setError(err.message ?? "Lỗi tải dữ liệu")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchAll()
    return () => { cancelled = true }
  }, [userId])

  return { data, loading, error }
}
