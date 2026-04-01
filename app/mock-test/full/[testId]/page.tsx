import { TestEngine } from "@/components/test-engine"
import { fetchTest } from "@/lib/fetchTest"
import { notFound } from "next/navigation"

export const revalidate = 3600 // Thực hiện ISR Cache

export default async function FullMockTestPage({ params }: {
  params: Promise<{ testId: string }>
}) {
  const { testId } = await params

  const testNumberMatch = testId.replace('test-', '')
  const testNumber = testNumberMatch ? parseInt(testNumberMatch, 10) : 1

  // 1. Fetch dữ liệu siêu tốc trên server (Supabase Server Client)
  const initialData = await fetchTest(testNumber)

  if (!initialData) {
    return notFound()
  }

  // 2. Ném mảng dữ liệu đã chín muồi xuống Client Component để hiển thị 0ms loading
  return <TestEngine testId={testNumber} backUrl="/mock-test/full" initialData={initialData} />
}