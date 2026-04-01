import Link from "next/link"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Quote, Star } from "lucide-react"
import { HeroSection } from "@/components/hero-section"
import { AboutMissions, AboutReviews } from "@/components/about-animations"
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#eaf0f2]">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1">
          <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
            { /* Hero Section */}
            <HeroSection
              color="#ffb82e"
              badge1="Master TOEIC"
              badge2="PolytoonEnglish"
              title="Learn TOEIC the fun way"
              description="We build a joyful TOEIC practice experience: clear structure, fast practice loops, and vocabulary learned in context. 
              Our goal is to help you improve consistently, not just cram."
            />

            <AboutMissions />

            {/* Reviews / Comments */}
            <section className="mt-6">
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#111116]/70 shadow-[0_6px_0_0_rgba(24,24,28,0.08)]">
                    <Quote className="h-4 w-4" />
                    Reviews
                  </div>
                  <h2 className="mt-3 text-2xl font-black tracking-tight text-[#111116]">
                    Learners love the bento flow
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-[#111116]/60">
                    Một vài bình luận từ người học về trải nghiệm luyện TOEIC và học từ vựng theo ngữ cảnh.
                  </p>
                </div>

                <div className="hidden rounded-3xl bg-white px-4 py-3 shadow-[0_10px_0_0_rgba(24,24,28,0.10)] lg:block">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-[#111116]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#ffb82e] text-[#ffb82e]" />
                      ))}
                    </div>
                    <div className="text-sm font-black text-[#111116]">4.9</div>
                    <div className="text-sm font-bold text-[#111116]/55">/ 5</div>
                  </div>
                </div>
              </div>

              <AboutReviews />
            </section>

            <section className="mt-6 rounded-3xl bg-[#7fe0a8] p-6 shadow-[0_10px_0_0_rgba(24,24,28,0.18)] md:p-8">
              <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-[#111116]">
                    Ready to practice?
                  </h3>
                  <p className="mt-2 font-semibold text-[#111116]/70">
                    Jump into TOEIC practice or build your vocabulary by topic.
                  </p>
                </div>
                <div className="flex w-full gap-3 md:w-auto">
                  <Link href="/practice" className="w-full md:w-auto">
                    <Button className="w-full rounded-2xl bg-[#111116] font-extrabold text-white hover:bg-[#111116]/90">
                      Practice
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/vocabulary" className="w-full md:w-auto">
                    <Button className="w-full rounded-2xl bg-white/45 font-extrabold text-[#111116] hover:bg-white/55">
                      Vocabulary
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
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