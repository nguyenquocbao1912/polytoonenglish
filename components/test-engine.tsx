"use client"
import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { AudioPlayer } from "@/components/audio-player"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import { LoadingDots } from "@/components/loading-dots"

import {
  TOEIC_ASSET_BASE_URL,
  LISTENING_AUDIO_FALLBACK_URL,
  normalizeTimeLimitToSeconds,
  parseTranscript,
  TranscriptDialogue,
  PART_INTRODUCTIONS,
  DbTest,
  FlatGroup,
  FlatQuestion,
} from "./test-engine-utils"

import { ComplexQuestionLayout, SimpleQuestionLayout } from "./test-engine-question-layout"
import { TestHeader } from "./test-engine-header"
import { TestResultCard } from "./test-engine-result"

interface TestEngineProps {
  testId: number
  backUrl: string
  practicePartNumber?: number
  mode?: "mini" | "full" | "practice"
  initialData?: DbTest | null
}

export function TestEngine({ testId, backUrl, practicePartNumber, mode = "full", initialData }: TestEngineProps) {
  const [test, setTest] = useState<DbTest | null>(initialData || null)
  const [loading, setLoading] = useState(!initialData)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<number, "A" | "B" | "C" | "D">>({})
  const [timeLeft, setTimeLeft] = useState(120 * 60)
  const [submitted, setSubmitted] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [currentGroupIdx, setCurrentGroupIdx] = useState(0)
  const [showPartPicker, setShowPartPicker] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      console.log("Đã lấy được User từ Supabase:", user);
      setCurrentUser(user)
      setAuthLoading(false)
    })
  }, [])

  useEffect(() => {
    // Nếu màn hình đã có sẵn initialData từ SSR thì thôi không fetch nữa
    if (initialData) {
      if (!timeLeft || timeLeft === 120 * 60) {
        setTimeLeft(normalizeTimeLimitToSeconds(initialData.time_limit))
      }
      return
    }

    let cancelled = false
    async function load() {
      setLoading(true)
      setLoadError(null)
      try {
        const { data, error } = await supabase
          .from("tests")
          .select(
            `
            id, title, time_limit, audio_url,
            test_parts (
              id, test_id, part_number, audio_url,
              question_groups (
                id, part_id, passage_text, transcript, image_url,
                questions (
                  id, group_id, question_text,
                  option_a, option_b, option_c, option_d,
                  correct_answer
                )
              )
            )
          `
          )
          .eq("id", testId)
          .single()
        if (error) throw error
        if (cancelled) return
        setTest(data as DbTest)
        setTimeLeft(normalizeTimeLimitToSeconds((data as DbTest).time_limit))
      } catch (e: any) {
        if (cancelled) return
        setLoadError(e?.message ?? "Failed to load test data")
      } finally {
        if (cancelled) return
        setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [testId])

  const flatGroups: FlatGroup[] = useMemo(() => {
    if (!test) return []
    const partsSorted = [...(test.test_parts ?? [])].sort((a, b) => a.part_number - b.part_number)
    const out: FlatGroup[] = []
    let globalQuestionNumber = 1 // Bộ đếm tự động

    for (const part of partsSorted) {
      // Nếu đang trong chế độ Practice của 1 Part cụ thể, thì bỏ qua các Part khác
      if (practicePartNumber && part.part_number !== practicePartNumber) {
        continue;
      }

      let groups = [...(part.question_groups ?? [])].sort((a, b) => a.id - b.id)

      // Giới hạn theo Nhóm/Đoạn văn cho bài Mini Test
      if (mode === "mini") {
        if (part.part_number === 3) groups = groups.slice(0, 6) // 18 câu
        if (part.part_number === 4) groups = groups.slice(0, 5) // 15 câu
        if (part.part_number === 6) groups = groups.slice(0, 2) // 8 câu
        if (part.part_number === 7) groups = groups.slice(0, 7) // Tuỳ chỉnh
      }

      let partQuestionCount = 0;
      for (const group of groups) {
        // Giới hạn từng câu trực tiếp cho bài Mini Test ở Part 1, 2, 5
        let qs = [...(group.questions ?? [])].sort((a, b) => a.id - b.id)
        if (mode === "mini") {
          let limit = 0;
          if (part.part_number === 1) limit = 3;
          else if (part.part_number === 2) limit = 12;
          else if (part.part_number === 5) limit = 15;

          if (limit > 0) {
            const remaining = limit - partQuestionCount;
            if (remaining <= 0) break; // Đã đủ số lượng câu, bỏ qua các group còn lại
            if (qs.length > remaining) {
              qs = qs.slice(0, remaining); // Cắt mảng questions của group này cho vừa đủ limit
            }
          }
        }

        const partNumber = part.part_number
        const questions: FlatQuestion[] = []
        for (const q of qs) {
          const optionLabels: ("A" | "B" | "C" | "D")[] =
            partNumber === 2 ? ["A", "B", "C"] : ["A", "B", "C", "D"]
          const optionTextByLabel: Record<"A" | "B" | "C" | "D", string> = {
            A: q.option_a ?? "",
            B: q.option_b ?? "",
            C: q.option_c ?? "",
            D: q.option_d ?? "",
          }
          // For Part 1/2, parse audio_choices from transcript to get option text
          let audioChoicesMap: Record<string, string> = {}
          if (partNumber === 1 || partNumber === 2) {
            const transcriptData = parseTranscript(group.transcript)
            if (transcriptData?.audio_choices) {
              for (const ac of transcriptData.audio_choices) {
                audioChoicesMap[ac.label] = ac.text
              }
            }
          }
          const options =
            partNumber === 1 || partNumber === 2
              ? optionLabels.map((id) => ({ id, text: audioChoicesMap[id] ?? "" }))
              : optionLabels.map((id) => ({ id, text: optionTextByLabel[id] }))
          partQuestionCount++;
          questions.push({
            id: q.id,
            number: globalQuestionNumber++, // Gán tự động tăng
            options,
            correctAnswer: (["A", "B", "C", "D"].includes(q.correct_answer ?? "")
              ? (q.correct_answer as any)
              : null) as any,
            explanation: q.explanation,
            text: q.question_text,
          })
        }

        if (questions.length > 0) {
          out.push({
            id: group.id,
            partNumber,
            imageUrl: group.image_url,
            passageText: group.passage_text,
            transcript: group.transcript,
            questions,
          })
        }
      }
    }
    return out
  }, [test])

  useEffect(() => {
    if (loading || submitted) return
    if (timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [loading, submitted, timeLeft])

  useEffect(() => {
    if (!submitted && timeLeft === 0 && flatGroups.length > 0) {
      setSubmitted(true)
    }
  }, [timeLeft, submitted, flatGroups.length])

  const totalGroups = flatGroups.length
  const currentGroup = flatGroups[currentGroupIdx]
  const totalQuestions = useMemo(
    () => flatGroups.reduce((acc, g) => acc + (g.questions?.length ?? 0), 0),
    [flatGroups]
  )
  const listeningAudioUrl =
    test?.audio_url
      ? test.audio_url.startsWith("http")
        ? test.audio_url
        : `${TOEIC_ASSET_BASE_URL}/${test.audio_url.replace(/^\/+/, "")}`
      : LISTENING_AUDIO_FALLBACK_URL
  const score = useMemo(() => {
    if (!submitted) return 0
    let s = 0
    for (const g of flatGroups) {
      for (const q of g.questions) {
        if (q.correctAnswer && answers[q.id] === q.correctAnswer) s++
      }
    }
    return s
  }, [submitted, flatGroups, answers])

  const handleSelect = (qid: number, choice: "A" | "B" | "C" | "D") => {
    setAnswers((prev) => ({ ...prev, [qid]: choice }))
  }
  const handlePrev = () => setCurrentGroupIdx((i) => Math.max(0, i - 1))
  const handleNext = () => setCurrentGroupIdx((i) => Math.min(totalGroups - 1, i + 1))
  const calculateScores = () => {
    let listeningScore = 0
    let readingScore = 0
    for (const g of flatGroups) {
      for (const q of g.questions) {
        if (q.correctAnswer && answers[q.id] === q.correctAnswer) {
          if (g.partNumber <= 4) listeningScore++
          else readingScore++
        }
      }
    }
    return { listeningScore, readingScore }
  }
  const handleSubmit = async () => {
    console.log("==> Đang nhấn Nộp bài...");
    console.log("User hiện tại:", currentUser);
    console.log("Practice Mode:", practicePartNumber);
    setSubmitted(true)
    // Không lưu nếu là chế độ Practice (luyện tập part)
    if (practicePartNumber) return
    // Không lưu nếu chưa đăng nhập (áp dụng cho Test 1 guest)
    if (!currentUser) return
    const { listeningScore, readingScore } = calculateScores()
    const { error } = await supabase.from('user_attempts').insert({
      user_id: currentUser.id, // Đảm bảo cột user_id trong DB là UUID
      test_id: testId,
      listening_score: listeningScore,
      reading_score: readingScore,
    })
    if (error) {
      console.error("Lỗi lưu kết quả bài test:", error.message, error.details)
    } else {
      console.log("Lưu kết quả thành công!")
    }
  }
  const handleRetry = () => {
    setSubmitted(false)
    setShowReview(false)
    setAnswers({})
    setCurrentGroupIdx(0)
    setTimeLeft(normalizeTimeLimitToSeconds(test?.time_limit ?? 120))
  }

  const IS_DEV_MODE = true
  const jumpToPart = (partNum: number) => {
    const idx = flatGroups.findIndex(g => g.partNumber === partNum)
    if (idx !== -1) {
      setCurrentGroupIdx(idx)
    }
  }
  const availableParts = useMemo(() => {
    const parts = new Set<number>()
    flatGroups.forEach(g => parts.add(g.partNumber))
    return Array.from(parts).sort((a, b) => a - b)
  }, [flatGroups])

  return (
    <div className="min-h-screen bg-[#eaf0f2]">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <TestHeader
            backUrl={backUrl}
            submitted={submitted}
            showReview={showReview}
            currentGroupIdx={currentGroupIdx}
            totalGroups={totalGroups}
            loading={loading}
            availableParts={availableParts}
            showPartPicker={showPartPicker}
            setShowPartPicker={setShowPartPicker}
            jumpToPart={jumpToPart}
            currentPartNumber={currentGroup?.partNumber}
            timeLeft={timeLeft}
          />
          <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
            {loading ? (
              <div className="flex h-[300px] flex-col items-center justify-center gap-4 rounded-3xl bg-white p-8 text-center shadow-[0_8px_0_0_rgba(24,24,28,0.08)]">
                <LoadingDots size="lg" />
                <p className="font-semibold text-[#111116]/60">Đang tải dữ liệu...</p>
              </div>
            ) : loadError ? (
              <div className="rounded-3xl bg-white p-8 text-center shadow-[0_8px_0_0_rgba(24,24,28,0.08)]">
                <h1 className="text-xl font-black text-[#111116]">Không tải được đề</h1>
                <p className="mt-2 text-sm font-semibold text-[#111116]/60">{loadError}</p>
                <div className="mt-6">
                  <Link href={backUrl}>
                    <Button className="rounded-2xl bg-[#111116] font-extrabold text-white hover:bg-[#111116]/90">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Quay lại trang trước
                    </Button>
                  </Link>
                </div>
              </div>
            ) : !loading && !authLoading && testId >= 2 && !currentUser ? (
              <div className="rounded-3xl bg-white p-8 text-center shadow-[0_8px_0_0_rgba(24,24,28,0.08)]">
                <h1 className="text-xl font-black text-[#111116]">Yêu cầu đăng nhập</h1>
                <p className="mt-2 text-sm font-semibold text-[#111116]/60">
                  Bạn cần đăng nhập để làm bài test này.
                </p>
                <div className="mt-6">
                  <Link href="/login">
                    <Button className="rounded-2xl bg-[#111116] font-extrabold text-white hover:bg-[#111116]/90">
                      Đăng nhập
                    </Button>
                  </Link>
                </div>
              </div>
            ) : totalGroups === 0 ? (
              <div className="rounded-3xl bg-white p-8 text-center shadow-[0_8px_0_0_rgba(24,24,28,0.08)]">
                <h1 className="text-xl font-black text-[#111116]">Đề hiện chưa có câu hỏi</h1>
                <p className="mt-2 text-sm font-semibold text-[#111116]/60">
                  Kiểm tra lại dữ liệu trong các bảng `tests`, `test_parts`, `question_groups`, `questions`.
                </p>
                <div className="mt-6">
                  <Link href={backUrl}>
                    <Button className="rounded-2xl bg-[#111116] font-extrabold text-white hover:bg-[#111116]/90">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Quay lại Mock Test
                    </Button>
                  </Link>
                </div>
              </div>
            ) : submitted && !showReview ? (
              <TestResultCard
                score={score}
                totalQuestions={totalQuestions}
                setShowReview={setShowReview}
                handleRetry={handleRetry}
              />
            ) : (
              <>
                <motion.section
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="relative mb-6 overflow-hidden rounded-3xl bg-[#5ecde6] p-6 shadow-[0_10px_0_0_rgba(24,24,28,0.18)]"
                >
                  <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/18" />
                  <div className="pointer-events-none absolute -bottom-20 left-8 h-56 w-56 rounded-full bg-white/12" />
                  <h1 className="relative text-xl font-black text-[#111116]">{test?.title ?? "Full Test"}</h1>
                  <p className="relative mt-3 text-sm font-extrabold text-[#111116]/70">
                    Part {currentGroup.partNumber}
                    {` • ${PART_INTRODUCTIONS[currentGroup.partNumber - 1]}`}
                  </p>
                </motion.section>
                {/* Listening audio */}
                {currentGroup.partNumber <= 4 && (() => {
                  // Vấn đề 2: Lấy Audio của tuỳ chọn Part (Practice Mode ưu tiên)
                  const currentPartInfo = test?.test_parts?.find(p => p.part_number === currentGroup.partNumber);
                  const rawAudioUrl = currentPartInfo?.audio_url || test?.audio_url;

                  const activeAudioUrl = rawAudioUrl
                    ? (rawAudioUrl.startsWith("http") ? rawAudioUrl : `${TOEIC_ASSET_BASE_URL}/${rawAudioUrl.replace(/^\/+/, "")}`)
                    : LISTENING_AUDIO_FALLBACK_URL;

                  return (
                    <section className="mb-6">
                      <AudioPlayer src={activeAudioUrl} className="w-full" />
                    </section>
                  )
                })()}
                {/* Review Transcript Block — only for Part 3/4 dialogue */}
                {showReview && currentGroup.transcript && currentGroup.transcript !== "NULL" && (() => {
                  const transcriptData = parseTranscript(currentGroup.transcript)
                  const isPart34 = currentGroup.partNumber === 3 || currentGroup.partNumber === 4
                  const hasDialogue = transcriptData?.content && transcriptData.content.length > 0
                  if (!transcriptData || !isPart34 || !hasDialogue) return null
                  return (
                    <section className="mb-8 rounded-3xl bg-[#fdfcf6] p-4 sm:p-6 shadow-[0_8px_0_0_rgba(24,24,28,0.08)] border border-[#ffb82e]/40">
                      <TranscriptDialogue data={transcriptData} />
                    </section>
                  )
                })()}
                {/* Layout by part */}
                {[3, 4, 6, 7].includes(currentGroup.partNumber) ? (
                  <ComplexQuestionLayout
                    currentGroup={currentGroup}
                    answers={answers}
                    showReview={showReview}
                    handleSelect={handleSelect}
                  />
                ) : (
                  <SimpleQuestionLayout
                    currentGroup={currentGroup}
                    answers={answers}
                    showReview={showReview}
                    handleSelect={handleSelect}
                  />
                )}

                <section className="flex items-center justify-between rounded-3xl bg-[#ffb82e] p-4 shadow-[0_10px_0_0_rgba(24,24,28,0.12)]">
                  <div className="flex gap-1 sm:gap-2">
                    <Button className="rounded-2xl bg-white font-extrabold text-[#111116] hover:bg-[#f2f7f8]" onClick={handlePrev} disabled={currentGroupIdx === 0}>
                      <ChevronLeft className="h-4 w-4" />
                      Prev
                    </Button>
                    <Button className="rounded-2xl bg-white font-extrabold text-[#111116] hover:bg-[#f2f7f8]" onClick={handleNext} disabled={currentGroupIdx === totalGroups - 1}>
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  {!showReview && (
                    <Button onClick={handleSubmit} className="rounded-2xl bg-[#111116] font-extrabold text-white hover:bg-[#111116]/90">
                      Submit
                    </Button>
                  )}
                </section>
              </>
            )}
          </div>
          <Footer />
        </main>
      </div>
    </div>
  )
}
