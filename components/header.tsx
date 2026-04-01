"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, User, Home, BookOpen, FileText, Library, LayoutDashboard, HelpCircle, LogOut, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Practice", href: "/practice", icon: BookOpen },
  { name: "Mock Test", href: "/mock-test", icon: FileText },
  { name: "Vocabulary", href: "/vocabulary", icon: Library },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "About/Help", href: "/about", icon: HelpCircle },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuth()

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#fdfcf6] backdrop-blur">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-2 md:gap-4">
            {/* Left: Menu icon */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex items-center justify-center rounded-2xl p-2 text-[#111116] transition-colors hover:bg-black/5 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            {/* Desktop: Logo */}
            <div className="items-center gap-4 lg:flex">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#5ecde6] shadow-[0_6px_0_0_rgba(24,24,28,0.14)]">
                  <span className="text-lg font-black text-[#ffb82e]">P</span>
                </div>
                <div>
                  <span className="text-xl font-black tracking-tight text-[#7fe0a8]">Poly</span>
                  <span className="text-xl font-black tracking-tight text-[#ffb82e]">toon</span>
                  <span className="text-xl font-black tracking-tight text-[#5ecde6]">English</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Right: Login/Signup or Avatar */}
          <div className="flex items-center gap-2">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-full p-1 transition-colors bg-[#7fe0a8]/30 hover:bg-secondary"
                  aria-label="User menu"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ffb82e]/40">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={64}
                        height={64}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-4 w-4 text-accent" />
                    )}
                  </div>
                  <ChevronDown className="hidden h-4 w-4 text-muted-foreground sm:block" />
                </button>

                {/* User dropdown menu */}
                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
                      <div className="border-b border-border p-3">
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="p-1">
                        <Link
                          href="/dashboard"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          Dashboard
                        </Link>
                        <button
                          onClick={() => {
                            logout()
                            setUserMenuOpen(false)
                          }}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden rounded-full font-extrabold text-[#111116]/70 hover:bg-black/5 hover:text-[#111116] sm:flex"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    size="sm"
                    className="rounded-full bg-[#ffb82e] font-extrabold text-[#111116] shadow-[0_6px_0_0_rgba(24,24,28,0.14)] hover:bg-[#ffb82e]/90"
                  >
                    <span className="hidden sm:inline">Sign Up</span>
                    <User className="h-4 w-4 sm:hidden" />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/25 backdrop-blur-sm transition-opacity lg:hidden",
          mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Slide-out */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-[#f4f7f8] shadow-xl transition-transform duration-300 lg:hidden",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <span className="text-lg font-black text-[#111116]">Menu</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-2xl p-2 text-[#111116] transition-colors hover:bg-black/5"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-3 py-3 transition-colors",
                  isActive(item.href)
                    ? "bg-white text-[#111116] shadow-[0_6px_0_0_rgba(24,24,28,0.10)]"
                    : "text-[#111116] hover:bg-black/5"
                )}
              >
                <Icon className={cn(
                  "h-5 w-5",
                  isActive(item.href) ? "text-[#111116]" : "text-[#111116]/70"
                )} />
                <span className={cn(
                  "font-medium",
                  isActive(item.href) && "font-semibold"
                )}>{item.name}</span>
                {isActive(item.href) && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-[#111116]" />
                )}
              </Link>
            )
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex flex-col gap-2">
            <Link
              href="/about"
              className="text-sm font-semibold text-[#111116]/60 hover:text-[#111116]"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/blog"
              className="text-sm font-semibold text-[#111116]/60 hover:text-[#111116]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/faq"
              className="text-sm font-semibold text-[#111116]/60 hover:text-[#111116]"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
