import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  FlatGroup,
  TOEIC_ASSET_BASE_URL,
  formatPassage,
  optionClasses,
  optionBadgeClasses,
  parseTranscript,
} from "./test-engine-utils"

interface QuestionLayoutProps {
  currentGroup: FlatGroup
  answers: Record<number, "A" | "B" | "C" | "D">
  showReview: boolean
  handleSelect: (questionId: number, selectedOpt: "A" | "B" | "C" | "D") => void
}

/** 
 * Layout cho Part 3, 4, 6, 7
 * Chia làm 2 cột nếu có hình ảnh/đoạn văn, cột bên phải là danh sách câu hỏi.
 */
export function ComplexQuestionLayout({ currentGroup, answers, showReview, handleSelect }: QuestionLayoutProps) {
  const hasMedia = !!currentGroup.imageUrl || (currentGroup.passageText && currentGroup.passageText !== "NULL")

  return (
    <section className={`mb-8 grid gap-6 ${hasMedia ? "lg:grid-cols-2" : "grid-cols-1"}`}>
      {hasMedia && (
        <div className="space-y-4 pb-4 lg:max-h-[calc(100vh-280px)] lg:overflow-y-auto w-full">
          {currentGroup.imageUrl && (
            <div className="overflow-hidden rounded-3xl shadow-[0_8px_0_0_rgba(24,24,28,0.08)]">
              <Image
                src={`${TOEIC_ASSET_BASE_URL}/${currentGroup.imageUrl.replace(/^\/+/, "")}`}
                alt="Question image"
                width={900}
                height={600}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full object-cover"
              />
            </div>
          )}
          {currentGroup.passageText && currentGroup.passageText !== "NULL" && (
            <div className="rounded-3xl bg-[#fdfcf6] p-5 shadow-[0_8px_0_0_rgba(24,24,28,0.08)] border border-[#ffb82e]/40">
              <div className="prose prose-sm whitespace-pre-wrap font-semibold text-[#111116]/65">
                {formatPassage(currentGroup.passageText)}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="space-y-4 pb-4 lg:max-h-[calc(100vh-280px)] lg:overflow-y-auto w-full">
        {currentGroup.questions.map((q) => (
          <div key={q.id} className="rounded-3xl bg-[#eff6ff] p-5 shadow-[0_8px_0_0_rgba(24,24,28,0.08)]">
            <div className="mb-2 text-md font-extrabold text-[#111116]/55 leading-relaxed">
              <span className="whitespace-nowrap mr-2">Question {q.number}</span>
              {q.text && q.text !== "NULL" && (
                <span className="font-semibold text-[#111116] leading-relaxed">{q.text}</span>
              )}
            </div>
            <div className={cn(
              "space-y-3 sm:space-y-0 sm:grid sm:gap-3",
              hasMedia ? "lg:grid-cols-1 sm:grid-cols-2" : "sm:grid-cols-2"
            )}>
              {q.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => { if (!showReview) handleSelect(q.id, opt.id) }}
                  className={optionClasses(opt.id, answers[q.id] === opt.id, showReview, q.correctAnswer === opt.id)}
                  disabled={showReview}
                >
                  <span className={optionBadgeClasses(opt.id, answers[q.id] === opt.id, showReview, q.correctAnswer === opt.id)}>
                    {opt.id}
                  </span>
                  {opt.text && (
                    <span className="text-foreground">{opt.text}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/** 
 * Layout cho Part 1, 2, 5
 * Hình ảnh/đoạn văn (nếu có) hiển thị ngang hàng phía trên, câu hỏi bên dưới (không chia 2 cột dọc).
 */
export function SimpleQuestionLayout({ currentGroup, answers, showReview, handleSelect }: QuestionLayoutProps) {
  return (
    <section className="mb-8 space-y-4">
      {currentGroup.imageUrl && (
        <div className="grid gap-4 grid-cols-1">
          <div className="overflow-hidden rounded-3xl shadow-[0_8px_0_0_rgba(24,24,28,0.08)] max-w-xl mx-auto w-full">
            <Image
              src={`${TOEIC_ASSET_BASE_URL}/${currentGroup.imageUrl.replace(/^\/+/, "")}`}
              alt="Question image"
              width={900}
              height={600}
              sizes="(max-width: 640px) 100vw, 540px"
              priority={currentGroup.partNumber === 1}
              className="w-full object-cover"
            />
          </div>
        </div>
      )}
      {currentGroup.partNumber >= 5 && currentGroup.passageText && currentGroup.passageText !== "NULL" && (
        <div className="rounded-3xl bg-[#eff6ff] p-5 shadow-[0_8px_0_0_rgba(24,24,28,0.08)] w-full">
          <div className="prose prose-sm max-h-96 overflow-y-auto whitespace-pre-wrap font-semibold text-[#111116]/65">
            {formatPassage(currentGroup.passageText)}
          </div>
        </div>
      )}
      {currentGroup.questions.map((q) => {
        // Lấy câu hỏi từ transcript (trong Part 2 Review)
        const isPart2 = currentGroup.partNumber === 2
        let part2QuestionLine: string | null = null
        if (isPart2 && showReview && currentGroup.transcript) {
          const td = parseTranscript(currentGroup.transcript)
          const questionEntry = td?.content?.find(c => c.speaker === "Question")
          part2QuestionLine = questionEntry?.text ?? null
        }

        return (
          <div key={q.id} className="rounded-3xl bg-[#eff6ff] p-5 shadow-[0_8px_0_0_rgba(24,24,28,0.08)] w-full">
            <div className="mb-2 text-md font-extrabold text-[#111116]/55 leading-relaxed">
              <span className="whitespace-nowrap mr-2">Question {q.number}</span>
              {q.text && q.text !== "NULL" && (<span className="font-semibold text-[#111116]">{q.text}</span>)}
              {part2QuestionLine && (<span className="font-semibold text-[#111116] leading-relaxed italic">{part2QuestionLine}</span>)}
            </div>

            <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-3">
              {q.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => { if (!showReview) handleSelect(q.id, opt.id) }}
                  className={cn(
                    "w-full flex items-center",
                    optionClasses(opt.id, answers[q.id] === opt.id, showReview, q.correctAnswer === opt.id)
                  )}
                  disabled={showReview}
                >
                  <span className={optionBadgeClasses(opt.id, answers[q.id] === opt.id, showReview, q.correctAnswer === opt.id)}>
                    {opt.id}
                  </span>
                  {(showReview || [5, 6, 7].includes(currentGroup.partNumber)) && opt.text && (
                    <span className="text-foreground">{opt.text}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )
      })}
    </section>
  )
}
