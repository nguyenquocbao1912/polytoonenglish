import { motion } from "framer-motion"
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TestResultProps {
  score: number
  totalQuestions: number
  setShowReview: (val: boolean) => void
  handleRetry: () => void
}

export function TestResultCard({ score, totalQuestions, setShowReview, handleRetry }: TestResultProps) {
  return (
    <div className="mx-auto max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-3xl bg-white p-8 text-center shadow-[0_12px_0_0_rgba(24,24,28,0.10)]"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#7fe0a8]/25" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-[#ffb82e]/18" />
        <div className="relative mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#eaf0f2] shadow-[0_8px_0_0_rgba(24,24,28,0.08)]">
          {totalQuestions > 0 && score / totalQuestions >= 0.6 ? (
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          ) : (
            <XCircle className="h-10 w-10 text-[#111116]" />
          )}
        </div>
        <h2 className="relative text-2xl font-black text-[#111116]">Complete the test</h2>
        <p className="relative mt-2 font-semibold text-[#111116]/60">Your result</p>
        <div className="relative mt-6 text-5xl font-black text-[#111116]">
          {score}/{totalQuestions}
        </div>
        <div className="relative mt-2 text-lg font-semibold text-[#111116]/60">
          {totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0}% correct
        </div>
        <div className="relative mt-8 flex flex-col sm:flex-row gap-4">
          <Button className="flex-1 rounded-2xl bg-[#5ecde6] font-extrabold text-[#111116] hover:bg-[#5ecde6]/90 transition-all shadow-[0_6px_0_0_rgba(24,24,28,0.12)] hover:-translate-y-1 py-6" onClick={() => setShowReview(true)}>
            <CheckCircle2 className="mr-2 h-5 w-5" />
            View explanations
          </Button>
          <Button className="flex-1 rounded-2xl bg-[#7fe0a8] font-extrabold text-[#111116] hover:bg-[#7fe0a8]/90 transition-all shadow-[0_6px_0_0_rgba(24,24,28,0.12)] hover:-translate-y-1 py-6" onClick={handleRetry}>
            <RotateCcw className="mr-2 h-5 w-5" />
            Retake
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
