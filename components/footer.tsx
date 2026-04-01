import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#eaf0f2]">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="rounded-3xl bg-[#5ecde6]/20 p-6 shadow-[0_8px_0_0_rgba(24,24,28,0.08)] md:p-7">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#111116] shadow-[0_6px_0_0_rgba(24,24,28,0.14)]">
                <span className="text-lg font-black text-white">P</span>
              </div>
              <span className="text-lg font-black tracking-tight text-[#111116]">PolytoonEnglish</span>
            </div>

            <nav className="flex flex-wrap items-center justify-center gap-4 text-sm font-bold text-[#111116]/60 md:gap-6">
              <Link href="#" className="transition-colors hover:text-[#111116]">
                About
              </Link>
              <Link href="#" className="transition-colors hover:text-[#111116]">
                Privacy
              </Link>
              <Link href="#" className="transition-colors hover:text-[#111116]">
                Terms
              </Link>
              <Link href="#" className="transition-colors hover:text-[#111116]">
                Contact
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="#"
                className="rounded-2xl bg-[#eaf0f2] p-2.5 text-[#111116]/60 transition-colors hover:bg-black/5 hover:text-[#111116]"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="rounded-2xl bg-[#eaf0f2] p-2.5 text-[#111116]/60 transition-colors hover:bg-black/5 hover:text-[#111116]"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="rounded-2xl bg-[#eaf0f2] p-2.5 text-[#111116]/60 transition-colors hover:bg-black/5 hover:text-[#111116]"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="mailto:contact@polytoonenglish.com"
                className="rounded-2xl bg-[#eaf0f2] p-2.5 text-[#111116]/60 transition-colors hover:bg-black/5 hover:text-[#111116]"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-[#eaf0f2] px-4 py-3 text-center text-sm font-semibold text-[#111116]/60">
            <p>&copy; {new Date().getFullYear()} PolytoonEnglish. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
