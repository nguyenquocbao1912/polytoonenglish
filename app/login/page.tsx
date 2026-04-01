import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { LoginForm } from "@/components/auth-forms"

export default function LoginPage() {

  return (
    <div className="flex min-h-screen flex-col bg-[#eaf0f2]">
      {/* Simple Header */}
      <header className="flex h-16 items-center justify-between px-4 lg:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#111116] shadow-[0_6px_0_0_rgba(24,24,28,0.14)]">
            <span className="text-lg font-black text-white">P</span>
          </div>
          <span className="text-xl font-black tracking-tight text-[#111116]">PolytoonEnglish</span>
        </Link>

        <Link href="/" className="flex items-center gap-1 text-sm font-bold text-[#111116]/60 hover:text-[#111116]">
          <ArrowLeft className="h-4 w-4" />
          Return to Home
        </Link>
      </header>

      {/* Login Form */}
      <main className="flex flex-1 items-center justify-center p-4">
        <LoginForm />
      </main>
    </div>
  )
}
