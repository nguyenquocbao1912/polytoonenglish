import { TestEngine } from "@/components/test-engine"
import { fetchTest } from "@/lib/fetchTest"
import { notFound } from "next/navigation"
import { headers } from "next/headers"

export const revalidate = 3600 // Thực hiện ISR Cache

export default async function MiniMockTestPage({ params }: {
  params: Promise<{ testId: string }>
}) {
  const { testId } = await params

  const testNumberMatch = testId.replace("test-", "");
  const testNumber = testNumberMatch ? parseInt(testNumberMatch, 10) : 1;

  const headersList = await headers()
  if (headersList.get('x-unauthenticated-test') === 'true') {
    return <TestEngine testId={testNumber} backUrl="/mock-test/mini" mode="mini" initialData={null} />
  }

  // 1. Lấy bài thi "sạch" ngay trên Server (đỡ mất 2 nhịp waterfall ở client)
  const initialData = await fetchTest(testNumber)

  if (!initialData) {
    return notFound()
  }

  // 2. Bắn luồng dữ liệu tinh khiết xuống Client Engine
  return <TestEngine testId={testNumber} backUrl="/mock-test/mini" mode="mini" initialData={initialData} /> // Chú ý: Mode mini cần được xử lý phù hợp bên TestEngine nều cần thiết. Hiện tại truyền biến config mode.
}
