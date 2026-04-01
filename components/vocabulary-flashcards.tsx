"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronLeft, ChevronRight, Volume2, CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabaseClient"

function playPronunciation(word: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(word)
  u.lang = "en-US"
  u.rate = 0.9
  window.speechSynthesis.speak(u)
}

interface VocabularyCard {
  id: number
  word: string
  part_of_speech: string
  phonetic: string
  definition_vi: string
  example_en: string
  example_vi: string
}

function Flashcard({
  card,
  isFlipped,
  onFlip,
  onMarkKnown,
  onMarkUnknown,
  known,
}: {
  card: VocabularyCard
  isFlipped: boolean
  onFlip: () => void
  onMarkKnown: () => void
  onMarkUnknown: () => void
  known: boolean | null
}) {
  return (
    <div className="perspective-[1000px] w-full max-w-md mx-auto">
      <div className="relative w-full min-h-[300px]" style={{ transformStyle: "preserve-3d" }}>
        <div
          role="button"
          tabIndex={0}
          onClick={onFlip}
          onKeyDown={(e) => e.key === "Enter" && onFlip()}
          className={cn(
            "relative w-full min-h-[300px] rounded-3xl border-0 bg-[#7fe0a8]/20 shadow-[0_12px_0_0_rgba(24,24,28,0.12)] transition-[transform,box-shadow] duration-500 cursor-pointer",
            "hover:shadow-[0_16px_0_0_rgba(24,24,28,0.14)]",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
          )}
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front face */}
          <div
            className="absolute inset-0 flex flex-col rounded-2xl p-6 md:p-8"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(0deg)",
            }}
          >
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <h2 className="text-3xl font-black tracking-tight text-[#111116]">{card.word}</h2>
              <p className="mt-2 font-semibold text-[#111116]/55">Click to view details</p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  playPronunciation(card.word)
                }}
                className="mt-4 flex items-center gap-2 rounded-2xl bg-[#5ecde6]/50 px-4 py-2 text-sm font-extrabold text-[#0a5f78] transition-colors hover:bg-[#5ecde6]/40"
                aria-label="Phát âm"
              >
                <Volume2 className="h-5 w-5" />
                Pronounce
              </button>
            </div>
          </div>

          {/* Back face */}
          <div
            className="absolute inset-0 flex flex-col rounded-2xl px-6 py-4 text-left"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="flex flex-1 flex-col justify-center">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-black tracking-tight text-[#111116]">{card.word} {`(${card.part_of_speech})`}</h2>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    playPronunciation(card.word)
                  }}
                  className="rounded-full bg-[#ffb82e]/35 p-2 text-sm font-extrabold text-[#0e3b24] transition-colors hover:bg-[#7fe0a8]/45"
                  aria-label="Phát âm"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm font-semibold text-[#111116]/55">/{card.phonetic.replace(/^\/|\/$/g, "")}/</p>
              <p className="mt-3 text-base font-extrabold text-[#111116]">{card.definition_vi}</p>
              <div className="mt-5 rounded-2xl bg-[#eaf0f2] p-4 text-left shadow-[0_8px_0_0_rgba(24,24,28,0.08)]">
                <p className="text-sm font-semibold leading-relaxed text-[#111116] italic text-left">"{card.example_en}"</p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-[#111116]/60 text-left">{card.example_vi}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Đã thuộc / Chưa thuộc */}
      <div className="mt-6 flex justify-center gap-3">
        <Button
          type="button"
          size="sm"
          onClick={(e) => {
            e.preventDefault()
            onMarkUnknown()
          }}
          className={cn(
            "gap-2 rounded-2xl border-0 bg-white font-extrabold text-[#111116] shadow-[0_6px_0_0_rgba(24,24,28,0.10)] hover:bg-white",
            known === false && "bg-[#ffb82e]/45"
          )}
        >
          <XCircle className="h-4 w-4" />
          Unknown
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={(e) => {
            e.preventDefault()
            onMarkKnown()
          }}
          className={cn(
            "gap-2 rounded-2xl border-0 bg-white font-extrabold text-[#111116] shadow-[0_6px_0_0_rgba(24,24,28,0.10)] hover:bg-white",
            known === true && "bg-[#7fe0a8]/55"
          )}
        >
          <CheckCircle2 className="h-4 w-4" />
          Known
        </Button>
      </div>
    </div>
  )
}

export function VocabularyFlashcardInteractive({
  topicInfo,
  dataVocab,
}: {
  topicInfo: { id: number; name: string; description: string }
  dataVocab: VocabularyCard[]
}) {
  const [index, setIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [knownMap, setKnownMap] = useState<Record<number, boolean | null>>({})

  const [currentUser, setCurrentUser] = useState<any>(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setCurrentUser(user)
      setAuthLoading(false)
    })
  }, [])

  useEffect(() => {
    if (authLoading || !currentUser || dataVocab.length === 0) return

    const fetchProgress = async () => {
      const vocabIds = dataVocab.map((v) => v.id)
      const { data: progressData, error } = await supabase
        .from('user_vocabulary_progress')
        .select('vocab_id, is_learned')
        .eq('user_id', currentUser.id)
        .in('vocab_id', vocabIds)

      if (error) {
        console.error("Lỗi fetch tiến độ từ vựng:", error.message)
        return
      }
      if (progressData) {
        const map: Record<number, boolean | null> = {}
        progressData.forEach((p: any) => { map[p.vocab_id] = p.is_learned })
        setKnownMap(map)
      }
    }

    fetchProgress()
  }, [authLoading, currentUser, dataVocab])

  const cards = dataVocab
  const total = cards.length

  if (total === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8 text-center">
        <h1 className="text-2xl font-bold text-foreground">Topic has no vocabulary</h1>
        <Link href="/vocabulary" className="mt-4 inline-block">
          <Button className="rounded-2xl bg-[#111116] font-extrabold text-white hover:bg-[#111116]/90">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return list topic
          </Button>
        </Link>
      </div>
    )
  }

  const card = cards[index]

  const goPrev = () => {
    setIndex((i) => (i <= 0 ? total - 1 : i - 1))
    setIsFlipped(false)
  }
  const goNext = () => {
    setIndex((i) => (i >= total - 1 ? 0 : i + 1))
    setIsFlipped(false)
  }

  const handleMarkKnown = async (vocabId: number) => {
    setKnownMap((m) => ({ ...m, [vocabId]: true }))
    if (!currentUser) return

    const { error } = await supabase.from('user_vocabulary_progress').upsert(
      { user_id: currentUser.id, vocab_id: vocabId, is_learned: true },
      { onConflict: 'user_id,vocab_id' }
    )

    if (error) console.error("Lỗi lưu từ vựng:", error.message)
  }

  const handleMarkUnknown = async (vocabId: number) => {
    setKnownMap((m) => ({ ...m, [vocabId]: false }))
    if (!currentUser) return

    await supabase.from('user_vocabulary_progress').upsert(
      { user_id: currentUser.id, vocab_id: vocabId, is_learned: false },
      { onConflict: 'user_id,vocab_id' }
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
      <Link
        href="/vocabulary"
        className="mb-6 inline-flex items-center gap-1 text-sm font-bold text-[#111116]/60 transition-colors hover:text-[#111116]"
      >
        <ArrowLeft className="h-4 w-4" />
        Return list topic
      </Link>

      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-6 overflow-hidden rounded-3xl bg-[#ffb82e] px-5 py-4 shadow-[0_10px_0_0_rgba(24,24,28,0.18)]"
      >
        <div className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-white/22" />
        <h1 className="relative text-xl font-black tracking-tight text-[#111116] text-center">{topicInfo.name}</h1>
      </motion.section>

      <Flashcard
        card={card}
        isFlipped={isFlipped}
        onFlip={() => setIsFlipped((f) => !f)}
        onMarkKnown={() => handleMarkKnown(card.id)}
        onMarkUnknown={() => handleMarkUnknown(card.id)}
        known={knownMap[card.id] ?? null}
      />

      <div className="mt-8 flex items-center justify-between rounded-3xl bg-[#5ecde6] p-4 shadow-[0_8px_0_0_rgba(24,24,28,0.08)]">
        <Button onClick={goPrev} className="gap-1 rounded-2xl bg-[#eaf0f2] font-extrabold text-[#111116] hover:bg-white">
          <ChevronLeft className="h-4 w-4" />
          Prev
        </Button>
        <span className="text-sm font-extrabold text-[#111116]/60">
          {index + 1} / {total}
        </span>
        <Button onClick={goNext} className="gap-1 rounded-2xl bg-[#eaf0f2] font-extrabold text-[#111116] hover:bg-white">
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
