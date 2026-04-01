import { TestEngine } from "@/components/test-engine"
import { fetchTest } from "@/lib/fetchTest"
import { notFound } from "next/navigation"
import { headers } from "next/headers"

export const revalidate = 3600 // Thực hiện ISR Cache

export default async function FullMockTestPage({ params }: {
  params: Promise<{ testId: string }>
}) {
  const { testId } = await params

  const testNumberMatch = testId.replace('test-', '')
  const testNumber = testNumberMatch ? parseInt(testNumberMatch, 10) : 1


  // Nhận tín hiệu từ proxy.ts
  const headersList = await headers()
  if (headersList.get('x-unauthenticated-test') === 'true') {
    // Chặn fetch, trả luôn giao diện với initialData null => Client Render báo Login!
    return <TestEngine testId={testNumber} backUrl="/mock-test/full" mode="full" initialData={null} />
  }

  // 1. Fetch dữ liệu siêu tốc trên server (Supabase Server Client)
  const initialData = await fetchTest(testNumber)

  if (!initialData) {
    return notFound()
  }

  // 2. Ném mảng dữ liệu đã chín muồi xuống Client Component để hiển thị 0ms loading
  return <TestEngine testId={testNumber} backUrl="/mock-test/full" initialData={initialData} />
}