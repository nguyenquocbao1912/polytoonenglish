"use client"

import { motion } from "framer-motion"
import { Star, Target, Users, HeartHandshake } from "lucide-react"

export function AboutMissions() {
  return (
    <section className="mt-6 grid gap-6 md:grid-cols-3">
      {[
        {
          title: "Our mission",
          desc: "Turn TOEIC prep into a daily habit with bite-sized practice and clear progress.",
          icon: Target,
          bgColor: "bg-[#7fe0a8]/60"
        },
        {
          title: "For learners",
          desc: "Practice all 7 parts, track improvement, and get confidence for the real exam.",
          icon: Users,
          bgColor: "bg-[#ffb82e]/60"
        },
        {
          title: "Support",
          desc: "We listen to feedback and keep improving the learning flow and question quality.",
          icon: HeartHandshake,
          bgColor: "bg-[#5ecde6]/60"
        },
      ].map((c, idx) => {
        const Icon = c.icon
        return (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, delay: 0.05 * idx, ease: [0.16, 1, 0.3, 1] }}
            className={`relative overflow-hidden rounded-3xl bg-[#fdfcf6] p-6 shadow-[0_8px_0_0_rgba(24,24,28,0.08)]`}
          >
            <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-3xl ${c.bgColor} shadow-[0_6px_0_0_rgba(24,24,28,0.10)]`}>
              <Icon className="h-6 w-6 text-[#111116]" />
            </div>
            <h2 className="text-lg font-black tracking-tight text-[#111116]">{c.title}</h2>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-[#111116]/60">
              {c.desc}
            </p>
          </motion.div>
        )
      })}
    </section>
  )
}

export function AboutReviews() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {[
        {
          name: "Minh Khoa",
          role: "TOEIC 2025",
          rating: 5,
          color: "bg-[#5ecde6]",
          text:
            "Bố cục bento nhìn rất đã mắt. Mình luyện nhanh từng part, track tiến độ rõ ràng nên học đều hơn hẳn.",
        },
        {
          name: "Thuỳ Linh",
          role: "Beginner → Intermediate",
          rating: 5,
          color: "bg-[#7fe0a8]",
          text:
            "Vocabulary theo topic + ví dụ thực tế giúp mình nhớ lâu. UI màu pastel tạo cảm giác dễ chịu, không bị ngợp.",
        },
        {
          name: "Quang Huy",
          role: "Busy professional",
          rating: 5,
          color: "bg-[#ffb82e]",
          text:
            "Mini practice ngắn gọn, đúng trọng tâm. Mình thích cách đáp án highlight theo màu, nhìn phát biết chọn gì.",
        },
        {
          name: "Ngọc Mai",
          role: "Daily streak",
          rating: 5,
          color: "bg-[#5ecde6]",
          text:
            "Tốc độ load nhanh, layout sạch. Các thẻ to, bo góc lớn nên dùng mobile cũng rất thoải mái.",
        },
        {
          name: "Thanh Tùng",
          role: "Mock test lover",
          rating: 4,
          color: "bg-[#7fe0a8]",
          text:
            "Mock test có timer + review khá tiện. Nếu thêm nhiều đề hơn nữa thì quá tuyệt.",
        },
        {
          name: "Hà My",
          role: "Vocabulary focus",
          rating: 5,
          color: "bg-[#ffb82e]",
          text:
            "Flashcard lật thẻ + phát âm ổn. Mình dùng mỗi tối 10 phút, từ vựng lên đều.",
        },
      ].map((r, idx) => (
        <motion.article
          key={`${r.name}-${idx}`}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, delay: 0.04 * idx, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-[0_8px_0_0_rgba(24,24,28,0.08)]"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-black/5" />

          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`flex h-12 w-12 items-center justify-center rounded-3xl ${r.color} shadow-[0_8px_0_0_rgba(24,24,28,0.14)]`}>
                <span className="text-sm font-black text-[#111116]">
                  {r.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                </span>
              </div>
              <div>
                <div className="text-sm font-black text-[#111116]">{r.name}</div>
                <div className="text-xs font-bold text-[#111116]/55">{r.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={
                    i < r.rating
                      ? "h-4 w-4 fill-[#ffb82e] text-[#ffb82e]"
                      : "h-4 w-4 fill-black/10 text-black/10"
                  }
                />
              ))}
            </div>
          </div>

          <p className="relative mt-4 text-sm font-semibold leading-relaxed text-[#111116]/70">
            “{r.text}”
          </p>
        </motion.article>
      ))}
    </div>
  )
}
