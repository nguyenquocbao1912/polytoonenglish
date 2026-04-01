"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, BookOpen, Briefcase, Building2, Plane, MessageSquare, Volume2, Lightbulb } from "lucide-react"

const TOPIC_ICONS = [
  Briefcase, Building2, Plane,
  MessageSquare, BookOpen, Volume2, Lightbulb
]

export interface VocabularyTopic {
  id: number;
  name: string;
  description: string;
}

export function TopicCard({ topic, index }: { topic: VocabularyTopic, index: number }) {
  const Icon = TOPIC_ICONS[index % TOPIC_ICONS.length]
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-[0_8px_0_0_rgba(24,24,28,0.08)] md:p-7"
    >
      <div className="pointer-events-none absolute -right-14 -top-14 h-48 w-48 rounded-full bg-[#ffb82e]/25" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-[#5ecde6]/18" />

      <div className="relative">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-[#ffb82e] shadow-[0_8px_0_0_rgba(24,24,28,0.14)]">
          <Icon className="h-7 w-7 text-[#111116]" />
        </div>

        <h3 className="text-xl font-black tracking-tight text-[#111116]">{topic.name}</h3>

        <p className="mt-2 flex-1 text-sm font-semibold leading-relaxed text-[#111116]/60">
          {topic.description || "Học từ vựng theo chủ đề để chuẩn bị tốt nhất cho bài thi TOEIC của bạn."}
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm font-extrabold text-[#111116]/70">
          <BookOpen className="h-4 w-4 text-[#111116]/70" />
          <span>25+ words</span>
        </div>

        <Link href={`/vocabulary/list-${topic.id}`} className="mt-4 block">
          <Button className="w-full rounded-2xl bg-[#111116] font-extrabold text-[#ffb82e] hover:bg-[#111116]/90">
            Start Learning
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}
