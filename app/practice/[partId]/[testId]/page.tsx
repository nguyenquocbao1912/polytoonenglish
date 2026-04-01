import { TestEngine } from "@/components/test-engine"
import { fetchTest } from "@/lib/fetchTest"
import { notFound } from "next/navigation"

export const revalidate = 3600 // Thực hiện ISR Cache tự động cập nhật Database

export default async function PracticeTestPage({ params }: { params: Promise<{ partId: string, testId: string }> }) {
  const { partId, testId } = await params

  // Trích xuất số bài test (testId: "test-1" -> 1)
  const testNumberPatch = testId.replace('test-', '')
  const testNumber = testNumberPatch ? parseInt(testNumberPatch, 10) : 1

  // Trích xuất số part (partId: "part-3" -> 3)
  const partNumberMatch = partId.match(/\d+/)
  const partNumber = partNumberMatch ? parseInt(partNumberMatch[0], 10) : 1

  // 1. Kéo toàn bộ dữ liệu Test từ Server một cách siêu mượt
  const initialData = await fetchTest(testNumber)

  if (!initialData) {
    return notFound()
  }

  // 2. Chuyển cục JSON xuống Client. Client tự động dùng thẻ practicePartNumber để lọc. 
  // Waterfall Loading đã hoàn toàn bị triệt tiêu!
  return (
    <TestEngine
      testId={testNumber}
      practicePartNumber={partNumber}
      mode="practice"
      backUrl={`/practice/${partId}`}
      initialData={initialData}
    />
  )
}
