"use client"
import { motion } from "framer-motion"

const BRAND_COLORS = ["#5ecde6", "#7fe0a8", "#ffb82e"]
const TEXT = "POLYTOON ENGLISH"

// Hàm lấy màu xen kẽ theo index (bỏ qua dấu cách)
function getColor(charIndex: number, nonSpaceIndex: number): string {
  return BRAND_COLORS[nonSpaceIndex % BRAND_COLORS.length]
}

const letter = {
  initial: { y: 0 },
  animate: (i: number) => ({
    y: [0, -18, 0],
    transition: {
      duration: 0.9,
      repeat: Infinity,
      repeatType: "loop" as const,
      ease: "easeInOut" as const,
      delay: i * 0.07,
    },
  }),
}

interface LoadingWavyTextProps {
  className?: string
}

export function LoadingWavyText({ className = "" }: LoadingWavyTextProps) {
  let nonSpaceIdx = 0

  return (
    <div className={`flex flex-col items-center justify-center gap-6 ${className}`}>
      {/* Animated wavy text */}
      <div className="flex items-end">
        {TEXT.split("").map((char, i) => {
          if (char === " ") {
            return (
              <span key={i} className="w-4 inline-block" />  // khoảng trống giữa 2 từ
            )
          }
          const colorIdx = nonSpaceIdx
          nonSpaceIdx++
          return (
            <motion.span
              key={i}
              custom={colorIdx}
              variants={letter}
              initial="initial"
              animate="animate"
              style={{
                display: "inline-block",
                color: getColor(i, colorIdx),
                fontWeight: 900,
                fontSize: "clamp(1.5rem, 4.5vw, 2rem)",
                letterSpacing: "0.06em",
                lineHeight: 1,
              }}
            >
              {char}
            </motion.span>
          )
        })}
      </div>

      {/* Tagline dưới chữ */}
      <p
        style={{
          fontSize: "1rem",
          fontWeight: 700,
          color: "rgba(17,17,22,0.45)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        Loading...
      </p>
    </div>
  )
}

/**
 * Full-page overlay dùng cho màn hình xác nhận email hoặc
 * khi toàn bộ component của trang cần render lại.
 */
export function FullPageLoader({ className = "" }: { className?: string }) {
  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#eaf0f2] ${className}`}
    >
      <LoadingWavyText />
    </div>
  )
}
