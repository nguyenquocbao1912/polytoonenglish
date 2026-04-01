import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { HeroSection } from "@/components/hero-section"
import { PracticeCard } from "@/components/practice-card"
import { StatsCard } from "@/components/stats-card"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#eaf0f2] text-foreground">
      <Header />

      <div className="flex flex-1">
        {/* Sidebar - visible on tablet and desktop */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1">
          <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
            {/* Bento Grid Layout */}
            <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
              {/* Hero Section */}
              <HeroSection
                color="#7fe0a8"
                badge1="Master TOEIC"
                badge2="PolytoonEnglish"
                title="Master TOEIC with PolytoonEnglish"
                description="Your ultimate platform for TOEIC practice and English vocabulary learning. 
                Practice all 7 parts of the TOEIC test with comprehensive exercises designed to help you achieve your target score. 
                Learn vocabulary in context and track your progress along the way." />

              {/* Stats Cards */}
              <StatsCard />

              {/* Practice Cards */}
              <PracticeCard type="toeic" />
              <PracticeCard type="vocabulary" />
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  )
}
