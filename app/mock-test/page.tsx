import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { MockTestCards } from "@/components/mock-test-cards"
import {
  CheckCircle,
  BarChart3,
  Target
} from "lucide-react"

export default function MockTestPage() {
  return (
    <div className="min-h-screen bg-[#eaf0f2]">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1">
          <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
            {/* Hero Section */}
            <HeroSection
              color="#ffb82e"
              badge1="Master TOEIC"
              badge2="PolytoonEnglish"
              title="TOEIC Mock Test"
              description="Experience real exam conditions, get your score and review detailed answers immediately after completion.">
            </HeroSection>

            {/* Test Cards (Client Component) */}
            <MockTestCards />

            {/* Feature Section */}
            <section className="rounded-3xl bg-[#fdfcf6] p-6 shadow-[0_8px_0_0_rgba(24,24,28,0.08)] md:p-8">
              <h2 className="text-xl font-black tracking-tight text-[#111116] md:text-2xl">
                Why take our mock tests?
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#7fe0a8] shadow-[0_4px_0_0_rgba(24,24,28,0.08)]">
                    <Target className="h-5 w-5 text-[#0e3b24]" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#111116]">Real exam format</h3>
                    <p className="mt-1 text-sm font-semibold text-[#111116]/60">
                      Standard questions following the latest TOEIC format, carefully selected and verified.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#5ecde6] shadow-[0_4px_0_0_rgba(24,24,28,0.08)]">
                    <BarChart3 className="h-5 w-5 text-[#0a5f78]" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#111116]">Instant scoring</h3>
                    <p className="mt-1 text-sm font-semibold text-[#111116]/60">
                      Get your estimated band score immediately along with detailed analytics of your strengths.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#ffb82e] shadow-[0_4px_0_0_rgba(24,24,28,0.08)]">
                    <CheckCircle className="h-5 w-5 text-[#111116]" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#111116]">Detailed explanation</h3>
                    <p className="mt-1 text-sm font-semibold text-[#111116]/60">
                      Every question comes with step-by-step solutions and vocabulary highlights.
                    </p>
                  </div>
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
