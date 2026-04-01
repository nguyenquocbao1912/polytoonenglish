import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  ChevronLeft,
  Layers,
  Clock,
} from "lucide-react"
import { formatTime, partIcons } from "./test-engine-utils"

interface TestHeaderProps {
  backUrl: string
  submitted: boolean
  showReview: boolean
  currentGroupIdx: number
  totalGroups: number
  loading: boolean
  availableParts: number[]
  showPartPicker: boolean
  setShowPartPicker: React.Dispatch<React.SetStateAction<boolean>>
  jumpToPart: (partNum: number) => void
  currentPartNumber?: number
  timeLeft: number
  mode?: "mini" | "full" | "practice"
}

export function TestHeader({
  backUrl,
  submitted,
  showReview,
  currentGroupIdx,
  totalGroups,
  loading,
  availableParts,
  showPartPicker,
  setShowPartPicker,
  jumpToPart,
  currentPartNumber,
  timeLeft,
  mode,
}: TestHeaderProps) {
  return (
    <div className="sticky top-16 z-40 bg-[#eaf0f2]/85 px-4 py-3 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href={backUrl}
            className="flex items-center gap-1 text-sm font-bold text-[#111116]/60 hover:text-[#111116]"
          >
            <ChevronLeft className="h-4 w-4" />
            Exit
          </Link>
          <div className="h-4 w-px bg-black/10" />
          <span className="font-extrabold text-[#111116]">
            {submitted && !showReview
              ? "Result"
              : `Group ${Math.min(currentGroupIdx + 1, Math.max(totalGroups, 1))} / ${Math.max(totalGroups, 1)}`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Part jump picker */}
          {loading && availableParts.length > 1 && (
            <div className="relative">
              <button
                id="part-picker-btn"
                onClick={() => setShowPartPicker(v => !v)}
                className={cn(
                  "flex items-center gap-1.5 rounded-2xl bg-white px-3 py-1.5 font-extrabold shadow-[0_6px_0_0_rgba(24,24,28,0.10)] transition-colors hover:bg-[#f2f7f8]",
                  showPartPicker ? "text-[#0a5f78]" : "text-[#111116]"
                )}
                title="Jump to part"
              >
                <Layers className="h-4 w-4" />
                <span className="text-sm hidden sm:inline">Part {currentPartNumber}</span>
              </button>
              {showPartPicker && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowPartPicker(false)} />
                  <div className="absolute right-0 top-full z-50 mt-2 min-w-[130px] overflow-hidden rounded-2xl bg-white p-1.5 shadow-[0_6px_0_0_rgba(24,24,28,0.14)]">
                    {availableParts.map((p, index) => {
                      const Icon = partIcons[index % partIcons.length]
                      return (
                        <button
                          key={p}
                          onClick={() => { jumpToPart(p); setShowPartPicker(false) }}
                          className={cn(
                            "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-extrabold transition-colors",
                            currentPartNumber === p
                              ? "bg-[#5ecde6]/30 text-[#0a5f78]"
                              : "text-[#111116] hover:bg-[#f2f7f8]"
                          )}
                        >
                          <Icon className="flex h-5 w-5 items-center justify-center text-xs font-black" />
                          Part {p}
                          {currentPartNumber === p && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#0a5f78]" />}
                        </button>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          )}
          {/* Timer */}
          {mode !== "practice" && (
            <div
              className={cn(
                "flex items-center gap-2 rounded-2xl bg-white px-3 py-1.5 font-extrabold shadow-[0_6px_0_0_rgba(24,24,28,0.10)]",
                timeLeft <= 60 ? "text-red-700" : "text-[#111116]"
              )}
            >
              <Clock className="h-4 w-4" />
              {formatTime(timeLeft)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
