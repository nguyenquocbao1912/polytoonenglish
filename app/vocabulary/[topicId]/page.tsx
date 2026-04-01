import Link from "next/link"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { createClient } from "@supabase/supabase-js"
import { VocabularyFlashcardInteractive } from "@/components/vocabulary-flashcards"
import { notFound } from "next/navigation"

export const revalidate = 3600 // Tự Rebuild sau mỗi 1 giờ

// 1. Dùng createClient từ @supabase/supabase-js cho Server Components (public data)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseAdmin = createClient(supabaseUrl, supabaseKey)

// 2. generateStaticParams để Pre-render tất cả các danh mục từ vựng có sẵn
export async function generateStaticParams() {
  const { data: topics } = await supabaseAdmin
    .from('vocab_categories')
    .select('id')

  if (!topics) return []

  // Trả về mảng các topicId (ví dụ [{topicId: "list-1"}, {topicId: "list-2"}])
  return topics.map((topic) => ({
    topicId: `list-${topic.id}`,
  }))
}

export default async function VocabularyFlashcardPage({
  params,
}: {
  params: Promise<{ topicId: string }>
}) {
  const { topicId } = await params

  // 3. Trích xuất ID thật từ URL, ví dụ "list-1" -> 1
  const actualIdMatch = topicId.match(/\d+/)
  const actualId = actualIdMatch ? parseInt(actualIdMatch[0], 10) : 1

  // 4. Promise.all tải song song dữ liệu topic và danh sách từ vựng trên Server
  const [topicRes, vocabRes] = await Promise.all([
    supabaseAdmin
      .from('vocab_categories')
      .select('id, name, description')
      .eq('id', actualId)
      .single(),
    supabaseAdmin
      .from('vocabularies')
      .select('id, word, part_of_speech, phonetic, definition_vi, example_en, example_vi')
      .eq('category_id', actualId)
      .order('id', { ascending: true })
  ])

  if (topicRes.error || !topicRes.data) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-[#eaf0f2]">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          {vocabRes.data && vocabRes.data.length > 0 ? (
            <VocabularyFlashcardInteractive
              topicInfo={topicRes.data}
              dataVocab={vocabRes.data}
            />
          ) : (
            <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8 text-center">
              <h1 className="text-2xl font-bold text-[#111116]">Topic has no vocabulary</h1>
              <Link href="/vocabulary" className="mt-4 inline-block">
                <Button className="rounded-2xl bg-[#111116] font-extrabold text-white hover:bg-[#111116]/90">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return list topic
                </Button>
              </Link>
            </div>
          )}
          <Footer />
        </main>
      </div>
    </div>
  )
}
