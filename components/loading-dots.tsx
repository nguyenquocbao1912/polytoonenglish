"use client"
import { motion } from "framer-motion"

// 6 màu: mỗi cặp là màu gốc + nhạt của cùng 1 tông
const DOT_COLORS = [
  "#5ecde6",       // Xanh dương gốc
  "#7fe0a8",       // Xanh lá gốc
  "#ffb82e",       // Cam vàng gốc
  "#5ecde6",       // Xanh dương (pair) – sẽ dùng opacity để nhạt
  "#7fe0a8",       // Xanh lá (pair)
  "#ffb82e",       // Cam vàng (pair)
]
const DOT_OPACITY = [1, 1, 1, 0.4, 0.4, 0.4]

const container = {
  animate: {
    transition: {
      staggerChildren: 0.12,   // mỗi chấm bắt đầu trễ hơn 0.12s → hiệu ứng domino
    },
  },
}

const dot = {
  initial: { y: 0 },
  animate: {
    y: [0, -14, 0],
    transition: {
      duration: 0.7,
      repeat: Infinity,
      repeatDelay: 0.4,
      ease: "easeInOut" as const,
    },
  },
}

interface LoadingDotsProps {
  /** `"sm"` = 10px, `"md"` = 14px (default), `"lg"` = 18px */
  size?: "sm" | "md" | "lg"
  className?: string
}

export function LoadingDots({ size = "md", className = "" }: LoadingDotsProps) {
  const dim = size === "sm" ? 10 : size === "lg" ? 18 : 14

  return (
    <motion.div
      className={`flex items-end gap-2 ${className}`}
      variants={container}
      initial="initial"
      animate="animate"
    >
      {DOT_COLORS.map((color, i) => (
        <motion.span
          key={i}
          variants={dot}
          style={{
            width: dim,
            height: dim,
            borderRadius: "50%",
            display: "inline-block",
            backgroundColor: color,
            opacity: DOT_OPACITY[i],
          }}
        />
      ))}
    </motion.div>
  )
}
