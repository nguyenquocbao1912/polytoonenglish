import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { ArrowLeft, Target } from "lucide-react"
import Link from "next/link"
import { createClient } from "@supabase/supabase-js"
import { MockTestList } from "@/components/mock-test-list"

export const revalidate = 3600 // Thực hiện ISR, tự làm mới sau mỗi 1 giờ

export default async function FullTestsPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(supabaseUrl, supabaseKey)

  // Fetch dữ liệu Test ở Server
  const { data: testData, error } = await supabase
    .from('tests')
    .select('id, title, audio_url')
    .eq('type_test', 'FULL TEST')
    .order('id', { ascending: true })

  return (
    <div className="min-h-screen bg-[#eaf0f2]">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1">
          <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
            {/* Back Button */}
            <Link
              href="/mock-test"
              className="mb-6 inline-flex items-center gap-1 text-sm font-bold text-[#111116]/60 transition-colors hover:text-[#111116]"
            >
              <ArrowLeft className="h-4 w-4" />
              Return Mock Test
            </Link>

            {/* Header Section */}
            <section className="relative mb-8 overflow-hidden rounded-3xl bg-white p-6 shadow-[0_10px_0_0_rgba(24,24,28,0.12)] md:p-8">
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#5ecde6]/25" />
              <div className="pointer-events-none absolute -bottom-16 -left-12 h-44 w-44 rounded-full bg-[#ffb82e]/18" />

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-white/45 shadow-[0_8px_0_0_rgba(24,24,28,0.14)]">
                  <Target className="h-8 w-8 text-[#0a5f78]" />
                </div>

                <div className="relative flex-1">
                  <h1 className="text-2xl font-black tracking-tight text-[#111116] md:text-3xl">
                    List Full Test
                  </h1>
                  <p className="mt-2 font-semibold leading-relaxed text-[#111116]/70">
                    Practice with full tests, 200 questions, simulating the actual TOEIC test structure.
                  </p>
                </div>
              </div>
            </section>

            {/* Tests Grid */}
            <section className="mb-8">
              {error ? (
                <div className="py-8 text-center font-semibold text-red-600">Lỗi: {error.message}</div>
              ) : (
                <MockTestList tests={testData || []} type="full" />
              )}
            </section>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  )
}
