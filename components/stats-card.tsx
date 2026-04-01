"use client"

import { motion } from "framer-motion"
import { Users, BookCheck, Trophy, Target } from "lucide-react"

const stats = [
  {
    label: "Active Learners",
    value: "100+",
    icon: Users,
    color: "bg-[#5ecde6]/40",
  },
  {
    label: "Practice Questions",
    value: "500+",
    icon: BookCheck,
    color: "bg-[#ffb82e]/45",
  },
  {
    label: "Average Score Increase",
    value: "120pts",
    icon: Trophy,
    color: "bg-[#7fe0a8]/55",
  },
  {
    label: "Success Rate",
    value: "70%",
    icon: Target,
    color: "bg-[#ffb82e]/55",
  },
]

export function StatsCard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-3xl bg-[#fdfcf6] p-5 shadow-[0_8px_0_0_rgba(24,24,28,0.08)] md:col-span-2 md:p-6"
    >
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.14 + idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group rounded-2xl bg-[#eaf0f2] p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${stat.color} shadow-[0_6px_0_0_rgba(24,24,28,0.10)]`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-3 text-3xl font-black tracking-tight text-[#111116] md:text-[34px]">
                {stat.value}
              </div>
              <div className="mt-1 text-xs font-bold tracking-wide text-[#111116]/60">
                {stat.label}
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}
