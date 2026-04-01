"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, LogIn, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AuthBentoCard() {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-[0_8px_0_0_rgba(24,24,28,0.08)] md:p-7"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#ffb82e]/25" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-52 w-52 rounded-full bg-[#5ecde6]/20" />

      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#eaf0f2] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#111116]/70">
          Welcome
        </div>

        <h2 className="mt-3 text-pretty text-2xl font-black tracking-tight text-[#111116]">
          Start learning today
        </h2>
        <p className="mt-2 text-sm font-semibold leading-relaxed text-[#111116]/60">
          Log in to save your progress, or create a new account in seconds.
        </p>

        <div className="mt-6 grid gap-3">
          <Link href="/login">
            <Button
              className="w-full rounded-2xl bg-[#111116] font-extrabold text-white hover:bg-[#111116]/90"
              size="lg"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Login
              <ArrowRight className="ml-2 h-4 w-4 opacity-80" />
            </Button>
          </Link>

          <Link href="/register">
            <Button
              variant="outline"
              className="w-full rounded-2xl border-0 bg-[#ffb82e] font-extrabold text-[#111116] shadow-[0_6px_0_0_rgba(24,24,28,0.12)] hover:bg-[#ffb82e]/90"
              size="lg"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </motion.aside>
  )
}

