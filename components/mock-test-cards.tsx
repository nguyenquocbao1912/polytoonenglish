"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  FileText,
  Clock,
  HelpCircle,
  ArrowRight,
  Zap
} from "lucide-react"

export function MockTestCards() {
  return (
    <section className="my-12 grid gap-6 md:grid-cols-2">
      {/* Full Test Card */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -6 }}
        className="group relative flex flex-col overflow-hidden rounded-3xl bg-[#5ecde6] p-6 shadow-[0_10px_0_0_rgba(24,24,28,0.18)] md:p-8"
      >
        <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/18" />
        <div className="pointer-events-none absolute -bottom-16 left-12 h-52 w-52 rounded-full bg-white/18" />

        <div className="relative">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-white/45 shadow-[0_8px_0_0_rgba(24,24,28,0.14)]">
            <FileText className="h-7 w-7 text-[#0a5f78]" />
          </div>

          <h2 className="text-2xl font-black tracking-tight text-[#111116]">Full TOEIC Test</h2>

          <p className="mt-3 flex-1 font-semibold leading-relaxed text-[#111116]/70">
            200 questions - 120 minutes. Simulates the actual TOEIC exam format with
            complete Listening and Reading sections.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm font-bold text-[#111116]/65">
              <HelpCircle className="h-4 w-4 text-[#111116]/65" />
              <span>200 questions</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-[#111116]/65">
              <Clock className="h-4 w-4 text-[#111116]/65" />
              <span>120 minutes</span>
            </div>
          </div>

          <Link href="/mock-test/full" className="mt-6 block">
            <Button size="lg" className="w-full rounded-2xl bg-[#111116] font-extrabold text-[#5ecde6] hover:bg-[#111116]/90">
              Start Full Test
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Mini Test Card */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -6 }}
        className="group relative flex flex-col overflow-hidden rounded-3xl bg-[#7fe0a8] p-6 shadow-[0_8px_0_0_rgba(24,24,28,0.08)] md:p-8"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/18" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-white/18" />

        <div className="relative">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-white/45 shadow-[0_8px_0_0_rgba(24,24,28,0.14)]">
            <Zap className="h-7 w-7 text-[#0e3b24]" />
          </div>

          <h2 className="relative text-2xl font-black tracking-tight text-[#111116]">Mini Test</h2>

          <p className="relative mt-3 flex-1 font-semibold leading-relaxed text-[#111116]/60">
            Random selected questions. Great for quick daily practice and maintaining steady progress.
          </p>

          <div className="relative mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm font-bold text-[#111116]/60">
              <HelpCircle className="h-4 w-4 text-[#111116]/60" />
              <span>100 questions</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-[#111116]/60">
              <Clock className="h-4 w-4 text-[#111116]/60" />
              <span>60 minutes</span>
            </div>
          </div>

          <Link href="/mock-test/mini" className="mt-6 block">
            <Button size="lg" className="w-full rounded-2xl bg-[#111116] font-extrabold text-[#7fe0a8] hover:bg-[#111116]/90 mt-auto">
              Try Mini Test
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
