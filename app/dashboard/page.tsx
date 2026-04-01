"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { HeroSection } from "@/components/hero-section"
import { cn } from "@/lib/utils"
import {
  Calendar,
  Trophy,
  Eye,
  CheckCircle2,
  Target,
  Image as ImageIcon,
  MessageCircle,
  Users,
  Mic,
  PenTool,
  FileText,
  BookMarked,
} from "lucide-react"
import Link from "next/link"
import { useDashboardData } from "@/hooks/use-dashboard-data"
import { FullPageLoader } from "@/components/loading-wavy-text"

const nameColumns = [
  { id: 0, name: "Data" },
  { id: 1, name: "Type Test" },
  { id: 2, name: "Score L - R" },
  { id: 3, name: "Details" }
]

const partStatistics = [
  { part: "Part 1", correct: 5, total: 6, label: "Photos" },
  { part: "Part 2", correct: 20, total: 25, label: "Q&A" },
  { part: "Part 3", correct: 30, total: 39, label: "Conversations" },
  { part: "Part 4", correct: 22, total: 30, label: "Talks" },
  { part: "Part 5", correct: 24, total: 30, label: "Sentences" },
  { part: "Part 6", correct: 12, total: 16, label: "Completion" },
  { part: "Part 7", correct: 40, total: 54, label: "Reading" },
]

const completedParts = [
  { part: "Part 1", completed: true },
  { part: "Part 2", completed: true },
  { part: "Part 3", completed: false },
  { part: "Part 4", completed: false },
  { part: "Part 5", completed: true },
  { part: "Part 6", completed: false },
  { part: "Part 7", completed: false },
]

const partIcons = [
  ImageIcon,
  MessageCircle,
  Users,
  Mic,
  PenTool,
  FileText,
  BookMarked,
]

export default function DashboardPage() {
  const { user, isAuthenticated, loading } = useAuth()
  const router = useRouter()

  // Dùng hook tập trung, tải song song (Promise.all)
  const { data, loading: dataLoading } = useDashboardData(user?.id)
  const { testHistory: dataTestHist, masteredVocab, masteredCount, totalTests, bestScore } = data

  const quickStats = [
    { id: 1, icon: Trophy, title: "Best Score", value: bestScore, color: "bg-[#ffb82e]/45", bgColor: "bg-[#5ecde6]/45" },
    { id: 2, icon: Target, title: "Total Tests", value: totalTests, color: "bg-[#7fe0a8]/55", bgColor: "bg-[#ffb82e]/55" },
    { id: 3, icon: BookMarked, title: "Total Words", value: masteredCount, color: "bg-[#5ecde6]/40", bgColor: "bg-[#7fe0a8]/40" },
  ]

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }
  }, [loading, isAuthenticated, router])

  // Hiển thị loading cho đến khi xác thực VÀ dữ liệu sẵn sàng
  if (loading || (isAuthenticated && dataLoading)) {
    return <FullPageLoader />
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#eaf0f2]">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1">
          <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
            {/* Hero Section */}
            <HeroSection
              color="#5ecde6"
              badge1="Master TOEIC"
              badge2="PolytoonEnglish"
              title="Your history progress"
              description="Manage your account, track your progress, and review your study history."
            />

            {/* Dashboard Grid */}
            <div className="mt-6 flex flex-col gap-6">
              {/* Quick Stats */}
              <div className="grid gap-4 sm:grid-cols-3">
                {quickStats.map((q) => {
                  const Icon = q.icon
                  return (
                    <div key={q.id} className={`flex flex-col justify-center items-center gap-4 rounded-3xl ${q.bgColor} p-4 shadow-[0_8px_0_0_rgba(24,24,28,0.08)]`}>
                      <div className={`flex h-12 w-12 items-center justify-center rounded-3xl ${q.color} shadow-[0_8px_0_0_rgba(24,24,28,0.10)]`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-black text-[#111116]">
                          {q.value}
                        </p>
                        <p className="text-sm font-semibold text-[#111116]/60">{q.title}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Mastered Vocabulary Section */}
              <div className="rounded-3xl bg-[#fdfcf6] p-6 shadow-[0_8px_0_0_rgba(24,24,28,0.08)]">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-lg font-black tracking-tight text-[#111116]">
                    <BookMarked className="h-5 w-5 text-[#111116]" />
                    Vocabularies learned
                  </h2>
                  <Link href="/vocabulary">
                    <Button variant="ghost" size="sm" className="font-bold text-[#111116]/60 hover:text-[#111116]">
                      View all
                    </Button>
                  </Link>
                </div>

                {masteredVocab.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {masteredVocab.map((vocab, idx) => {
                      const colors = [
                        { bg: "bg-[#7fe0a8]/20", border: "border-[#7fe0a8]/30", badge: "bg-[#7fe0a8]/40", text: "text-[#0e3b24]" }, // Green
                        { bg: "bg-[#5ecde6]/20", border: "border-[#5ecde6]/30", badge: "bg-[#5ecde6]/40", text: "text-[#0a5f78]" }, // Blue
                        { bg: "bg-[#ffb82e]/20", border: "border-[#ffb82e]/30", badge: "bg-[#ffb82e]/40", text: "text-[#8a5800]" }  // Orange
                      ];
                      const color = colors[idx % colors.length];

                      return (
                        <div key={vocab.id} className={`flex flex-col rounded-3xl p-5 shadow-[0_8px_0_0_rgba(24,24,28,0.06)] border ${color.bg} ${color.border}`}>
                          <div className="flex items-starts gap-2">
                            <h3 className={`text-xl font-black ${color.text}`}>{vocab.vocabularies?.word}</h3>
                            <span className={`text-xl font-bold ${color.text}`}>{`(${vocab.vocabularies?.part_of_speech})`}</span>
                          </div>

                          <p className="mt-2 text-md font-bold text-[#111116]">{vocab.vocabularies?.definition_vi}</p>

                          <div className="mt-3 flex-1">
                            <p className="text-md font-medium italic text-[#111116]/70 leading-relaxed">
                              Ex: {vocab.vocabularies?.example_en}
                            </p>
                            <p className="text-md font-medium italic text-[#111116]/70 leading-relaxed">
                              {`(${vocab.vocabularies?.example_vi})`}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="mb-3 rounded-full bg-[#eaf0f2] p-4">
                      <BookMarked className="h-8 w-8 text-[#111116]/30" />
                    </div>
                    <p className="text-sm font-semibold text-[#111116]/50">
                      You haven't marked any vocabulary as learned.
                    </p>
                    <Link href="/vocabulary" className="mt-4">
                      <Button className="rounded-2xl bg-[#111116] font-extrabold text-white">
                        Learn new vocabulary now
                      </Button>
                    </Link>
                  </div>
                )}
              </div>


              {/* Score History */}
              <div className="rounded-3xl bg-[#fdfcf6] p-6 shadow-[0_8px_0_0_rgba(24,24,28,0.08)] lg:col-span-2">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-black tracking-tight text-[#111116]">
                  <Calendar className="h-5 w-5 text-[#111116]" />
                  History Tests
                </h2>

                {/* Desktop table */}
                <div className="hidden overflow-hidden rounded-3xl bg-[#eaf0f2] md:block">
                  <table className="w-full">
                    <thead className="bg-[#fdfcf6]">
                      <tr>
                        {nameColumns.map((item) => (
                          <th key={item.id} className="px-4 py-3 text-center text-sm font-extrabold text-[#111116]/55">{item.name}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                      {dataTestHist.map((item) => {
                        const testInfo = Array.isArray(item.tests) ? item.tests[0] : item.tests;
                        const testType = testInfo?.type_test === "PRACTICE" ? "Mini Test" : "Full Test";
                        const completedDate = new Date(item.completed_at);

                        return (
                          <tr key={item.id} className="transition-colors hover:bg-black/5">
                            <td className="px-4 py-3 text-sm text-center font-semibold text-[#111116]">
                              {completedDate.toLocaleDateString('vi-VN',
                                {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                }
                              )}
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${testType === "Full Test"
                                ? "bg-[#5ecde6]/35 text-[#0a5f78]"
                                : "bg-[#ffb82e]/35 text-[#8a5800]"
                                }`}>
                                {testType}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-center font-black text-[#111116]">
                              {item.listening_score} - {item.reading_score}
                            </td>
                            <td className="px-4 py-3 text-center">
                              <Button size="sm" className="rounded-2xl bg-white font-extrabold text-[#111116] bg-[#7fe0a8]/35 hover:bg-white/90">
                                <Eye className="h-4 w-4" />
                                View
                              </Button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="flex flex-col gap-3 md:hidden">
                  {dataTestHist.map((item) => {
                    const testInfo = Array.isArray(item.tests) ? item.tests[0] : item.tests;
                    const testType = testInfo?.type_test || "Mini Test";
                    const completedDate = new Date(item.completed_at);

                    return (
                      <div key={item.id} className="rounded-3xl bg-[#eaf0f2] p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-[#111116]/60">
                            {completedDate.toLocaleDateString('vi-VN')}
                          </span>
                          <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${testType === "Full Test"
                            ? "bg-[#5ecde6]/35 text-[#0a5f78]"
                            : "bg-[#ffb82e]/35 text-[#8a5800]"
                            }`}>
                            {testType}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <p className="text-xl font-black text-[#111116]">
                            L: {item.listening_score} | R: {item.reading_score}
                          </p>
                          <Button size="sm" className="rounded-2xl bg-white font-extrabold text-[#111116] hover:bg-white/90">
                            <Eye className="mr-1 h-4 w-4" />
                            View
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Part Statistics */}
              <div className="rounded-3xl bg-[#fdfcf6] p-6 shadow-[0_8px_0_0_rgba(24,24,28,0.08)]">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-black tracking-tight text-[#111116]">
                  <Target className="h-5 w-5 text-[#111116]" />
                  Statistics by Part
                </h2>

                <div className="flex flex-col gap-3">
                  {partStatistics.map((stat) => {
                    const percentage = Math.round((stat.correct / stat.total) * 100)
                    return (
                      <div key={stat.part}>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span className="font-extrabold text-[#111116]">{stat.part}</span>
                          <span className="font-bold text-[#111116]/55">{stat.correct}/{stat.total}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-[#eaf0f2]">
                          <div
                            className="h-full rounded-full bg-[#5ecde6] transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Completed Parts */}
              <div className="rounded-3xl bg-[#fdfcf6] p-6 shadow-[0_8px_0_0_rgba(24,24,28,0.08)] lg:col-span-3">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-black tracking-tight text-[#111116]">
                  <CheckCircle2 className="h-5 w-5 text-[#111116]" />
                  Parts completed
                </h2>

                <div className="flex flex-wrap gap-3">
                  {completedParts.map((item, index) => {
                    const Icon = partIcons[index % partIcons.length]
                    return (
                      <div
                        key={item.part}
                        className={`flex items-center gap-2 rounded-2xl px-4 py-3 shadow-[0_6px_0_0_rgba(24,24,28,0.08)] ${item.completed
                          ? "bg-[#7fe0a8]/45"
                          : "bg-[#eaf0f2]"
                          }`}
                      >
                        <Icon className="h-6 w-6" />
                        <span className={cn(
                          "font-extrabold",
                          item.completed ? "text-[#111116]" : "text-[#111116]/60"
                        )}>
                          {item.part}
                        </span>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-6">
                  <Link href="/practice">
                    <Button className="rounded-2xl bg-[#111116] font-extrabold text-white hover:bg-[#111116]/90">
                      Continue Practice
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div >
    </div >
  )
}