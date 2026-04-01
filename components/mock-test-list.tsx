"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, FileText, ArrowRight, Users, Eye } from "lucide-react"

export interface TestCase {
  id: number
  title?: string
  audio_url?: string
}

export function MockTestList({ tests, type }: { tests: TestCase[], type: "full" | "mini" }) {
  const isFull = type === "full"

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tests.map((test, index) => (
        <motion.div
          key={test.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href={`/mock-test/${type}/test-${test.id}`}
            className="group relative flex flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-[0_8px_0_0_rgba(24,24,28,0.08)] transition-transform duration-300 hover:-translate-y-1"
          >
            {isFull ? (
              <>
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#5ecde6]/18" />
                <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-[#ffb82e]/16" />
                <div className="relative mb-5 -mx-6 -mt-6 overflow-hidden rounded-t-3xl bg-[#5ecde6] px-6 py-6 text-center">
                  <h3 className="text-xl font-black tracking-tight text-[#111116]">
                    Test {test.id}
                  </h3>
                  <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.14em] text-[#111116]/70">
                    Lesson • Practice
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#7fe0a8]/18" />
                <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-[#5ecde6]/16" />
                <div className="relative mb-5 -mx-6 -mt-6 overflow-hidden rounded-t-3xl bg-[#7fe0a8] px-6 py-6 text-center">
                  <h3 className="text-xl font-black tracking-tight text-[#111116]">
                    Test {index + 1}
                  </h3>
                  <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.14em] text-[#111116]/70">
                    Mini • Practice
                  </p>
                </div>
              </>
            )}

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

            <div className="relative mt-4 flex items-center justify-center">
              <Button className="inline-flex w-full items-center gap-1 rounded-2xl bg-[#111116] font-extrabold text-white hover:bg-[#111116]/90">
                Start
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
