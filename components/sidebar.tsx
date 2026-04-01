"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight, Home, BookOpen, FileText, Library, LayoutDashboard, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Practice", href: "/practice", icon: BookOpen },
  { name: "Mock Test", href: "/mock-test", icon: FileText },
  { name: "Vocabulary", href: "/vocabulary", icon: Library },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "About Us", href: "/about", icon: HelpCircle },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <aside
      className={cn(
        "sticky top-16 hidden h-[calc(100vh-4rem)] flex-col bg-[#fdfcf6] transition-all duration-300 lg:flex",
        collapsed ? "w-16" : "w-48",
        className
      )}
    >
      <nav className="flex flex-1 flex-col gap-2 p-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors",
                collapsed && "justify-center px-2",
                active
                  ? "bg-[#7fe0a8]/20 text-[#111116] shadow-[0_6px_0_0_rgba(24,24,28,0.10)]"
                  : "text-[#111116]/80 hover:bg-black/5"
              )}
              title={collapsed ? item.name : undefined}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-[#111116]" />
              )}
              <Icon className={cn(
                "h-5 w-5 shrink-0",
                active ? "text-[#111116]" : "text-[#111116]/65"
              )} />
              {!collapsed && (
                <span className={cn(
                  "text-sm",
                  active ? "font-extrabold" : "font-bold"
                )}>{item.name}</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Toggle button */}
      <div className="p-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-2xl bg-[#5ecde6]/20 px-3 py-2 text-sm font-extrabold text-[#111116] shadow-[0_6px_0_0_rgba(24,24,28,0.10)] transition-colors hover:bg-white/90",
            collapsed && "px-2"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
