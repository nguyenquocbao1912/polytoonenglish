"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { HeroSection } from "@/components/hero-section"
import {
  Headphones,
  BookOpen,
  Image as ImageIcon,
  MessageCircle,
  Users,
  Mic,
  PenTool,
  FileText,
  BookMarked,
  Clock,
  HelpCircle,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

const listeningParts = [
  {
    id: 1,
    title: "Part 1 - Photos",
    description: "6 questions - Photo description",
    icon: ImageIcon,
    questions: 6,
  },
  {
    id: 2,
    title: "Part 2 - Question-Response",
    description: "25 questions - Q&A format",
    icon: MessageCircle,
    questions: 25,
  },
  {
    id: 3,
    title: "Part 3 - Conversations",
    description: "39 questions - Dialogue comprehension",
    icon: Users,
    questions: 39,
  },
  {
    id: 4,
    title: "Part 4 - Short Talks",
    description: "30 questions - Monologue comprehension",
    icon: Mic,
    questions: 30,
  },
]

const readingParts = [
  {
    id: 5,
    title: "Part 5 - Incomplete Sentences",
    description: "30 questions - Fill in the blank",
    icon: PenTool,
    questions: 30,
  },
  {
    id: 6,
    title: "Part 6 - Text Completion",
    description: "16 questions - Passage completion",
    icon: FileText,
    questions: 16,
  },
  {
    id: 7,
    title: "Part 7 - Reading Comprehension",
    description: "54 questions - Reading passages",
    icon: BookMarked,
    questions: 54,
  },
]

function PartCard({ part }: { part: typeof listeningParts[0] }) {
  const Icon = part.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-[0_8px_0_0_rgba(24,24,28,0.08)] transition-transform md:p-7"
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#5ecde6]/25" />
      <div className="pointer-events-none absolute -bottom-16 -left-12 h-44 w-44 rounded-full bg-[#ffb82e]/18" />

      <div className="relative">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf0f2] shadow-[0_6px_0_0_rgba(24,24,28,0.10)]">
          <Icon className="h-6 w-6 text-[#111116]" />
        </div>

        <h3 className="text-lg font-black tracking-tight text-[#111116]">{part.title}</h3>

        <p className="mt-2 flex-1 text-sm font-semibold leading-relaxed text-[#111116]/60">
          {part.description}
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm font-bold text-[#111116]/60">
          <HelpCircle className="h-4 w-4 text-[#111116]/60" />
          <span>{part.questions} questions</span>
        </div>

        <Link href={`/practice/part-${part.id}`} className="mt-4 block">
          <Button className="w-full rounded-2xl bg-[#111116] font-extrabold text-white hover:bg-[#111116]/90">
            Start Practice
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}

export default function PracticePage() {
  const [activeTab, setActiveTab] = useState<"listening" | "reading">("listening")

  return (
    <div className="min-h-screen bg-[#eaf0f2]">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1">
          <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
            {/* Hero Section */}
            <HeroSection
              color="#5ecde6"
              badge1="Master TOEIC"
              badge2="PolytoonEnglish"
              title="Welcome to Practice"
              description="Get familiar with each question type in TOEIC through short exercises. 
              Choose a skill and start practicing right away!">
            </HeroSection>

            {/* Tab Switcher */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
            >
              <div className="my-8 mx-auto flex w-fit justify-center gap-2 overflow-x-auto rounded-3xl bg-[#ffb82e] p-1.5 shadow-[0_8px_0_0_rgba(24,24,28,0.10)]">
                <button
                  onClick={() => setActiveTab("listening")}
                  className={cn(
                    "flex items-center gap-2 whitespace-nowrap rounded-2xl px-4 py-2.5 text-sm font-extrabold transition-all",
                    activeTab === "listening"
                      ? "bg-[#111116] text-white"
                      : "text-[#111116]/60 hover:text-[#111116]"
                  )}
                >
                  <Headphones className="h-4 w-4" />
                  Listening
                </button>
                <button
                  onClick={() => setActiveTab("reading")}
                  className={cn(
                    "flex items-center gap-2 whitespace-nowrap rounded-2xl px-4 py-2.5 text-sm font-extrabold transition-all",
                    activeTab === "reading"
                      ? "bg-[#111116] text-white"
                      : "text-[#111116]/60 hover:text-[#111116]"
                  )}
                >
                  <BookOpen className="h-4 w-4" />
                  Reading
                </button>
              </div>
            </motion.div>

            {/* Parts Grid */}
            <section className="mb-12">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {activeTab === "listening"
                  ? listeningParts.map((part) => <PartCard key={part.id} part={part} />)
                  : readingParts.map((part) => <PartCard key={part.id} part={part} />)
                }
              </div>
            </section>

            {/* TOEIC Info Panel */}
            <section className="rounded-3xl bg-[#fdfcf6] p-6 shadow-[0_8px_0_0_rgba(24,24,28,0.08)] md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-[#7fe0a8] shadow-[0_8px_0_0_rgba(24,24,28,0.14)]">
                  <BookOpen className="h-7 w-7 text-[#0e3b24]" />
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-black tracking-tight text-[#111116] md:text-2xl">
                    TOEIC Listening & Reading Test
                  </h2>

                  <p className="mt-3 font-semibold leading-relaxed text-[#111116]/60">
                    The test consists of 200 multiple-choice questions with a total time of 120 minutes.
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3 rounded-2xl bg-[#eaf0f2] p-4">
                      <Headphones className="mt-0.5 h-5 w-5 text-[#111116]" />
                      <div>
                        <p className="font-extrabold text-[#111116]">Listening Section</p>
                        <p className="text-sm font-semibold text-[#111116]/60">45 minutes, 100 questions</p>
                        <p className="mt-1 text-sm font-semibold text-[#111116]/60">Parts 1-4</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-2xl bg-[#eaf0f2] p-4">
                      <BookOpen className="mt-0.5 h-5 w-5 text-[#111116]" />
                      <div>
                        <p className="font-extrabold text-[#111116]">Reading Section</p>
                        <p className="text-sm font-semibold text-[#111116]/60">75 minutes, 100 questions</p>
                        <p className="mt-1 text-sm font-semibold text-[#111116]/60">Parts 5-7</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-sm font-bold text-[#111116]/60">
                    <Clock className="h-4 w-4 text-[#111116]/60" />
                    <span>Total test duration: 2 hours</span>
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
