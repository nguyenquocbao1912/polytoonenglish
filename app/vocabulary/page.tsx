import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import {
  Briefcase,
  Building2,
  Plane,
  MessageSquare,
  BookOpen,
  Volume2,
  Lightbulb
} from "lucide-react"
import { createClient } from "@supabase/supabase-js"
import { TopicCard, VocabularyTopic } from "@/components/vocabulary-topics"

export const revalidate = 3600 // Thực hiện ISR, tự làm mới sau mỗi 1 giờ

const TOPIC_ICONS = [
  Briefcase,
  Building2,
  Plane,
  MessageSquare,
  BookOpen,
  Volume2,
  Lightbulb
]

export default async function VocabularyPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(supabaseUrl, supabaseKey)

  // Fetch dữ liệu ở phía Server một cách siêu tốc
  const { data: vocabData, error } = await supabase
    .from('vocab_categories')
    .select('id, name, description')
    .order('id', { ascending: true })

  const vocab = vocabData || []

  return (
    <div className="min-h-screen bg-[#eaf0f2]">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1">
          <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
            {/* Hero Section */}
            <HeroSection
              color="#7fe0a8"
              badge1="Master TOEIC"
              badge2="PolytoonEnglish"
              title="Vocabulary Library"
              description="Learn vocabulary by topic with illustrative examples and pronunciation guides. 
              Build your word bank systematically for TOEIC success.">
            </HeroSection>

            {/* Topics Grid */}
            <section className="my-12">
              {error ? (
                <div className="py-8 text-center font-semibold text-red-600">Lỗi: {error.message}</div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {vocab.map((dbTopic: VocabularyTopic, index: number) => {
                    return <TopicCard key={dbTopic.id} topic={dbTopic} index={index} />
                  })}
                </div>
              )}
            </section>

            {/* Features Section */}
            <section className="rounded-3xl bg-[#fdfcf6] p-6 shadow-[0_8px_0_0_rgba(24,24,28,0.08)] md:p-8">
              <h2 className="text-xl font-black tracking-tight text-[#111116] md:text-2xl">
                Learning Features
              </h2>
              <p className="mt-2 font-semibold text-[#111116]/60">
                Our vocabulary system is designed to help you learn effectively and retain words long-term.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="flex flex-col items-center rounded-2xl bg-[#eaf0f2] p-5 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffb82e] shadow-[0_6px_0_0_rgba(24,24,28,0.10)]">
                    <BookOpen className="h-6 w-6 text-[#111116]" />
                  </div>
                  <h3 className="mt-3 font-extrabold text-[#111116]">Context Examples</h3>
                  <p className="mt-1 text-sm font-semibold text-[#111116]/60">
                    Learn how to use words in real sentences, not just memorizing their meanings.
                  </p>
                </div>

                <div className="flex flex-col items-center rounded-2xl bg-[#eaf0f2] p-5 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5ecde6] shadow-[0_6px_0_0_rgba(24,24,28,0.10)]">
                    <Volume2 className="h-6 w-6 text-[#111116]" />
                  </div>
                  <h3 className="mt-3 font-extrabold text-[#111116]">Pronunciation</h3>
                  <p className="mt-1 text-sm font-semibold text-[#111116]/60">
                    Listen to correct pronunciation and read phonetic transcripts to speak confidently.
                  </p>
                </div>

                <div className="flex flex-col items-center rounded-2xl bg-[#eaf0f2] p-5 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7fe0a8] shadow-[0_6px_0_0_rgba(24,24,28,0.10)]">
                    <Lightbulb className="h-6 w-6 text-[#111116]" />
                  </div>
                  <h3 className="mt-3 font-extrabold text-[#111116]">Smart Tracking</h3>
                  <p className="mt-1 text-sm font-semibold text-[#111116]/60">
                    Mark words as learned and focus your time on the vocabulary you haven't mastered yet.
                  </p>
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  )
}
