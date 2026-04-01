"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

interface HeroPros {
  color: string;
  badge1: string;
  badge2: string;
  title: string;
  description: string;
}

export function HeroSection({ color, badge1, badge2, title, description }: HeroPros) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-3xl bg-[${color}] p-6 shadow-[0_10px_0_0_rgba(24,24,28,0.18)] md:col-span-2 md:p-8`}
    >
      {/* decorative blobs */}
      <div className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-white/20" />
      <div className="pointer-events-none absolute -bottom-16 right-20 h-40 w-40 rounded-full bg-white/15" />
      <div className="pointer-events-none absolute left-10 top-12 h-20 w-20 rounded-full bg-white/10 blur-[1px]" />

      <div className="relative flex items-start gap-4">
        <div className="h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-black/15 hidden md:flex">
          <Sparkles className="h-5 w-5 text-[#0e3b24]" />
        </div>

        <div className="min-w-0">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/40 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#0e3b24]">
            <span>{badge1}</span>
            <span className="h-1 w-1 rounded-full bg-[#0e3b24]/60" />
            <span>{badge2}</span>
          </div>

          <h1 className="text-balance text-3xl font-black tracking-tight text-[#111116] md:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-md font-semibold leading-relaxed text-[#0e3b24]/85 md:text-[15px]">
            {description}
          </p>
        </div>
      </div>
    </motion.section>
  )
}
