"use client"

import Link from "next/link"
import { BookOpen, Library, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface PracticeCardProps {
  type: "toeic" | "vocabulary"
}

const cardData = {
  toeic: {
    title: "TOEIC Practice",
    description: "Practice all 7 parts of the TOEIC test with detailed exercises. Listening and Reading sections with real exam-style questions.",
    icon: BookOpen,
    href: "/practice",
    features: ["Part 1-4: Listening", "Part 5-7: Reading", "Detailed explanations"],
    cardClass: "bg-[#5ecde6] text-[#0a5f78]",
    iconWrapClass: "bg-white/45 text-[#0a5f78]",
    buttonClass: "bg-[#111116] text-[#5ecde6] hover:bg-[#111116]/90",
  },
  vocabulary: {
    title: "Vocabulary Builder",
    description: "Learn vocabulary through real-world contexts. Organized by topics including Business, Office, Travel, and Daily Communication.",
    icon: Library,
    href: "/vocabulary",
    features: ["Topic-based learning", "Context examples", "Spaced repetition"],
    cardClass: "bg-[#ffb82e] text-[#8a5800]",
    iconWrapClass: "bg-white/45 text-[#8a5800]",
    buttonClass: "bg-[#111116] text-[#ffb82e] hover:bg-[#111116]/90",
  },
}

export function PracticeCard({ type }: PracticeCardProps) {
  const data = cardData[type]
  const Icon = data.icon

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.55, delay: type === "toeic" ? 0.12 : 0.18, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl p-6 shadow-[0_10px_0_0_rgba(24,24,28,0.18)] md:p-7",
        data.cardClass
      )}
    >
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/18" />
      <div className="pointer-events-none absolute -bottom-16 left-10 h-44 w-44 rounded-full bg-white/12" />

      <div className="relative">
        <div className={cn("mb-4 flex h-12 w-12 items-center justify-center rounded-2xl", data.iconWrapClass)}>
          <Icon className="h-6 w-6" />
        </div>

        <h2 className="text-2xl font-black tracking-tight text-[#111116]">{data.title}</h2>

        <p className="mt-3 flex-1 text-pretty text-sm font-semibold leading-relaxed text-[#111116]/70">
          {data.description}
        </p>

        <ul className="mt-5 space-y-2">
          {data.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm font-bold text-[#111116]/75">
              <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#111116]/70" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Link href={data.href} className="mt-6 block">
          <Button className={cn("w-full rounded-2xl font-extrabold", data.buttonClass)}>
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </motion.section>
  )
}
