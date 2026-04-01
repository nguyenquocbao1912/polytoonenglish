import { cn } from "@/lib/utils"
import {
  Image as ImageIcon,
  MessageCircle,
  Users,
  Mic,
  PenTool,
  FileText,
  BookMarked,
} from "lucide-react"

export const TOEIC_ASSET_BASE_URL =
  "https://ndnoijrgnfuygswkditt.supabase.co/storage/v1/object/public/toeic-assets"
export const LISTENING_AUDIO_FALLBACK_URL =
  "https://ndnoijrgnfuygswkditt.supabase.co/storage/v1/object/public/toeic-assets/listening_test_1_2019/test_1.mp3"

export const OPTION_TONE: Record<"A" | "B" | "C" | "D", { bg: string; fg: string }> = {
  A: { bg: "bg-[#5ecde6]/35", fg: "text-[#0a5f78]" }, // blue
  B: { bg: "bg-[#7fe0a8]/40", fg: "text-[#0e3b24]" }, // green
  C: { bg: "bg-[#ffb82e]/40", fg: "text-[#8a5800]" }, // orange
  D: { bg: "bg-[#5ecde6]/25", fg: "text-[#0a5f78]" }, // blue (alt)
}

export function optionClasses(optId: "A" | "B" | "C" | "D", selected: boolean, isReviewMode: boolean = false, isCorrect: boolean = false) {
  if (isReviewMode) {
    if (isCorrect) return "w-full rounded-2xl border-0 p-4 text-left font-semibold transition-all bg-[#7fe0a8]/40 shadow-[0_8px_0_0_rgba(24,24,28,0.14)] text-[#111116] ring-2 ring-green-500"
    if (selected) return "w-full rounded-2xl border-0 p-4 text-left font-semibold transition-all bg-red-100 shadow-[0_8px_0_0_rgba(24,24,28,0.14)] text-red-800 ring-2 ring-red-400 opacity-90"
    return "w-full rounded-2xl border-0 p-4 text-left font-semibold transition-all bg-[#fffcf5] text-[#111116]/40 opacity-70"
  }
  const tone = OPTION_TONE[optId]
  return cn(
    "w-full rounded-2xl border-0 p-4 text-left font-semibold transition-all",
    selected
      ? cn(tone.bg, "shadow-[0_8px_0_0_rgba(24,24,28,0.14)]", "text-[#111116]")
      : "bg-[#fdfcf6] text-[#111116] shadow-[0_6px_0_0_rgba(24,24,28,0.08)] hover:bg-[#f3f4ef]"
  )
}

export function optionBadgeClasses(optId: "A" | "B" | "C" | "D", selected: boolean, isReviewMode: boolean = false, isCorrect: boolean = false) {
  if (isReviewMode) {
    if (isCorrect) return "mr-3 inline-flex h-7 w-7 items-center justify-center rounded-2xl text-sm font-black bg-green-500 text-white"
    if (selected) return "mr-3 inline-flex h-7 w-7 items-center justify-center rounded-2xl text-sm font-black bg-red-500 text-white"
    return "mr-3 inline-flex h-7 w-7 items-center justify-center rounded-2xl text-sm font-black bg-[#f2f7f8] text-[#111116]/30"
  }
  const tone = OPTION_TONE[optId]
  return cn(
    "mr-3 inline-flex h-7 w-7 items-center justify-center rounded-2xl text-sm font-black",
    selected ? cn(tone.bg, tone.fg) : cn("bg-[#f2f7f8]", tone.fg)
  )
}

export type DbQuestion = {
  id: number
  group_id: number
  question_text: string | null
  option_a: string | null
  option_b: string | null
  option_c: string | null
  option_d: string | null
  correct_answer: string | null
  explanation: string | null
}
export type DbGroup = {
  id: number
  part_id: number
  passage_text: string | null
  transcript: string | null
  image_url: string | null
  questions: DbQuestion[]
}
export type DbPart = {
  id: number
  test_id: number
  part_number: number
  audio_url: string | null
  question_groups: DbGroup[]
}
export type DbTest = {
  id: number
  title: string
  time_limit: number | null
  audio_url: string | null
  test_parts: DbPart[]
}
export type FlatQuestion = {
  id: number
  number: number
  options: { id: "A" | "B" | "C" | "D"; text: string }[]
  correctAnswer: "A" | "B" | "C" | "D" | null
  explanation: string | null
  text: string | null
}
export type FlatGroup = {
  id: number
  partNumber: number
  imageUrl: string | null
  passageText: string | null
  transcript: string | null
  questions: FlatQuestion[]
}

export function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export function normalizeTimeLimitToSeconds(timeLimit: number | null) {
  if (!timeLimit) return 120 * 60
  if (timeLimit <= 300) return timeLimit * 60
  return timeLimit
}

export function formatPassage(passage: any) {
  // Xử lý an toàn: Nếu dữ liệu tải về từ Supabase là dạng JSON Object/Array thay vì text
  let text = typeof passage === "string" ? passage : JSON.stringify(passage, null, 2);

  const paragraphs = text.split(/\s*\|\|\s*|\s*\|\s*/);
  return (
    <div className="flex flex-col gap-4">
      {paragraphs.map((para, index) => {
        const trimmed = para.trim();
        if (!trimmed) return null;
        return (
          <p key={index} className="leading-relaxed">
            {trimmed}
          </p>
        )
      })}
    </div>
  );
}

export type TranscriptData = {
  content?: { speaker: string; text: string }[]
  audio_choices?: { label: string; text: string }[]
}

export function parseTranscript(raw: string | null | any): TranscriptData | null {
  if (!raw || raw === "NULL") return null
  try {
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw
    if (typeof parsed === "object" && parsed !== null) {
      return parsed as TranscriptData
    }
  } catch {
    // not JSON
  }
  return null
}

export const SPEAKER_COLORS: Record<string, { bg: string; text: string }> = {
  Question: { bg: "bg-[#5ecde6]/30", text: "text-[#0a5f78]" },
  Man: { bg: "bg-[#7fe0a8]/35", text: "text-[#0e3b24]" },
  Woman: { bg: "bg-[#ffb82e]/35", text: "text-[#8a5800]" },
  Narrator: { bg: "bg-[#e8e0fb]/50", text: "text-[#4a3891]" },
  Speaker: { bg: "bg-[#e8e0fb]/50", text: "text-[#4a3891]" },
}
export function getSpeakerStyle(speaker: string) {
  return SPEAKER_COLORS[speaker] ?? { bg: "bg-[#5ecde6]/30", text: "text-[#0a5f78]" }
}

export function TranscriptDialogue({ data }: { data: TranscriptData }) {
  const lines = data.content ?? []
  if (lines.length === 0) return null
  return (
    <div className="flex flex-col gap-3">
      {lines.map((line, i) => {
        const style = getSpeakerStyle(line.speaker)
        return (
          <p key={i}>
            <span
              className={cn(
                "inline-block w-24 mr-2 rounded-xl px-2 py-0.5 text-center text-xs font-black uppercase tracking-wide",
                style.bg,
                style.text
              )}
            >
              {line.speaker}
            </span>
            <span className="leading-relaxed text-[#111116]/80 font-semibold">{line.text}</span>
          </p>
        )
      })}
    </div>
  )
}

export const PART_INTRODUCTIONS = [
  "For each question in this part, you will hear four statements about a picture in your test book. When you hear the statements, you must select the one statement that best describes what you see in the picture. Then find the number of the question on your answer sheet and mark your answer. The statements will not be printed in your test book and will be spoken only one time.",
  "You will hear a question or statement and three responses spoken in English. They will not be printed in your test book and will be spoken only one time. Select the best response to the question or statement and mark the letter (A), (B), or (C) on your answer sheet.",
  "You will hear some conversations between two or more people. You will be asked to answer three questions about what the speakers say in each conversation. Select the best response to each question and mark the letter (A), (B), (C), or (D) on your answer sheet. The conversations will not be printed in your test book and will be spoken only one time.",
  "You will hear some talks given by a single speaker. You will be asked to answer three questions about what the speaker says in each talk. Select the best response to each question and mark the letter (A), (B), (C), or (D) on your answer sheet. The talks will not be printed in your test book and will be spoken only one time.",
  "A word or phrase is missing in each of the sentences below. Four answer choices are given below each sentence. Select the best answer to complete the sentence. Then mark the letter (A), (B), (C), or (D) on your answer sheet.",
  "Read the texts that follow. A word, phrase, or sentence is missing in parts of each text. Four answer choices for each question are given below the text. Select the best answer to complete the text. Then mark the letter (A), (B), (C), or (D) on your answer sheet.",
  "In this part you will read a selection of texts, such as magazine and newspaper articles, e-mails, and instant messages. Each text or set of texts is followed by several questions. Select the best answer for each question and mark the letter (A), (B), (C), or (D) on your answer sheet.",
]

export const partIcons = [
  ImageIcon,
  MessageCircle,
  Users,
  Mic,
  PenTool,
  FileText,
  BookMarked,
]
