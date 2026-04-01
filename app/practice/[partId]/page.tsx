import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  FileText,
  Eye,
  ArrowRight,
  ArrowLeft,
  Image as ImageIcon,
  MessageCircle,
  Users,
  Mic,
  PenTool,
  BookMarked
} from "lucide-react"
import Link from "next/link"
import { createClient } from "@supabase/supabase-js"
import { notFound } from "next/navigation"

export const revalidate = 3600 // Thực hiện ISR Cache tự động cập nhật Database

// Part data
const partsData: Record<string, {
  title: string
  description: string
  icon: typeof BookOpen
}> = {
  "part-1": {
    title: "Part 1 - Photos",
    description: "Listen to four statements about a photograph and choose the one that best describes what you see in the picture.",
    icon: ImageIcon,
  },
  "part-2": {
    title: "Part 2 - Question-Response",
    description: "Listen to a question or statement and three possible responses, then choose the best response.",
    icon: MessageCircle,
  },
  "part-3": {
    title: "Part 3 - Conversations",
    description: "Listen to conversations between two or more people and answer three questions about each conversation.",
    icon: Users,
  },
  "part-4": {
    title: "Part 4 - Short Talks",
    description: "Listen to short talks such as announcements, advertisements, or news items and answer three questions about each.",
    icon: Mic,
  },
  "part-5": {
    title: "Part 5 - Incomplete Sentences",
    description: "Choose the word or phrase that best completes the sentence.",
    icon: PenTool,
  },
  "part-6": {
    title: "Part 6 - Text Completion",
    description: "Read passages with missing words or sentences and choose the best option to complete them.",
    icon: FileText,
  },
  "part-7": {
    title: "Part 7 - Reading Comprehension",
    description: "Read various texts and answer questions about them. Includes single passages, double passages, and triple passages.",
    icon: BookMarked,
  },
}

function LessonCard({ orderNumber, testDbId, partId }: { orderNumber: number, testDbId: number, partId: string }) {
  return (
    <Link
      href={`/practice/${partId}/test-${testDbId}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-[0_8px_0_0_rgba(24,24,28,0.08)] transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#5ecde6]/18" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-[#ffb82e]/16" />
      <div className="relative mb-5 -mx-6 -mt-6 overflow-hidden rounded-t-3xl bg-[#5ecde6] px-6 py-6 text-center">
        <h3 className="text-xl font-black tracking-tight text-[#111116]">
          Test {orderNumber}
        </h3>
        <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.14em] text-[#111116]/70">
          Lesson • Practice
        </p>
      </div>

      <div className="relative space-y-2.5">
        <div className="flex items-center gap-2.5 text-sm font-semibold text-[#111116]/60">
          <BookOpen className="h-4 w-4 text-[#111116]/60" />
          <span>1 Learning Phases</span>
        </div>

        <div className="flex items-center gap-2.5 text-sm font-semibold text-[#111116]/60">
          <FileText className="h-4 w-4 text-[#111116]/60" />
          <span>tests 1</span>
        </div>

        <div className="flex items-center gap-2.5 text-sm font-semibold text-[#111116]/60">
          <Users className="h-4 w-4 text-[#111116]/60" />
          <span>1 participants</span>
        </div>

        <div className="flex items-center gap-2.5 text-sm font-semibold text-[#111116]/60">
          <Eye className="h-4 w-4 text-[#111116]/60" />
          <span>views 1</span>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center">
        <Button className="inline-flex w-full items-center justify-center gap-1 rounded-2xl bg-[#111116] font-extrabold text-white hover:bg-[#111116]/90 py-5">
          Bắt đầu làm bài
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </Link>
  )
}

export default async function PartDetailPage({ params }: { params: Promise<{ partId: string }> }) {
  const { partId } = await params
  const part = partsData[partId]

  if (!part) {
    return notFound()
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(supabaseUrl, supabaseKey)

  // Load tests where type_test is practice
  const { data: tests, error } = await supabase
    .from('tests')
    .select('id')
    .eq('type_test', 'PRACTICE')
    .order('id', { ascending: true })

  const Icon = part.icon

  return (
    <div className="min-h-screen bg-[#eaf0f2]">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1">
          <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
            <Link
              href="/practice"
              className="mb-6 inline-flex items-center gap-1 text-sm font-bold text-[#111116]/60 transition-colors hover:text-[#111116]"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại Practice
            </Link>

            <section className="relative mb-8 overflow-hidden rounded-3xl bg-white p-6 shadow-[0_8px_0_0_rgba(24,24,28,0.08)] md:p-8">
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#7fe0a8]/25" />
              <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-[#5ecde6]/18" />
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-[#eaf0f2] shadow-[0_8px_0_0_rgba(24,24,28,0.10)]">
                  <Icon className="h-8 w-8 text-[#111116]" />
                </div>

                <div className="relative flex-1">
                  <h1 className="text-2xl font-black tracking-tight text-[#111116] md:text-3xl">
                    {part.title}
                  </h1>
                  <p className="mt-2 font-semibold leading-relaxed text-[#111116]/60">
                    {part.description}
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              {error ? (
                <div className="py-8 text-center font-semibold text-red-600">Lỗi: {error.message}</div>
              ) : !tests || tests.length === 0 ? (
                <div className="py-8 text-center font-semibold text-[#111116]/60">Chưa có bài kiểm tra nào.</div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {tests.map((test, index) => (
                    <LessonCard key={test.id} orderNumber={index + 1} testDbId={test.id} partId={partId} />
                  ))}
                </div>
              )}
            </section>

            <section className="rounded-3xl bg-[#ffb82e] p-6 shadow-[0_10px_0_0_rgba(24,24,28,0.18)] md:p-8">
              <ul className="space-y-2 font-semibold text-[#111116]/70">
                <li className="flex items-center gap-2">
                  <PenTool className="h-6 w-6 text-[#111116]/60" />
                  <span>Luyện tập đều đặn mỗi ngày, mỗi lần 15-30 phút</span>
                </li>
                <li className="flex items-center gap-2">
                  <Eye className="h-6 w-6 text-[#111116]/60" />
                  <span>Xem lại những câu trả lời sai để hiểu rõ hơn</span>
                </li>
                <li className="flex items-center gap-2">
                  <BookMarked className="h-6 w-6 text-[#111116]/60" />
                  <span>Sử dụng Mock Test để kiểm tra trình độ tổng thể</span>
                </li>
              </ul>
            </section>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  )
}
