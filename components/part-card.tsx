"use client"

import Link from "next/link"
import { GraduationCap, FileText, Eye } from "lucide-react"

interface PartCardProps {
  partNumber: number
  type: "listening" | "reading"
  title: string
  learningPhases?: number
  tests?: number
  views?: number
  correctPercent?: number
  href: string
}

export function PartCard({
  partNumber,
  type,
  title,
  learningPhases = 5,
  tests = 35,
  views = 50742,
  correctPercent = 0,
  href,
}: PartCardProps) {
  // Gradient theo màu chủ đạo hiện tại
  const gradientClass =
    "bg-gradient-to-b from-primary to-primary/80"
  
  const typeLabel = type === "listening" ? "TOEIC® LISTENING" : "TOEIC® READING"
  
  return (
    <Link href={href} className="block">
      <div className="group flex flex-col overflow-hidden rounded-xl bg-card shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        {/* Header with gradient */}
        <div className={`${gradientClass} px-6 py-6 text-center`}>
          <h2 className="text-2xl font-bold text-white drop-shadow-sm">
            Part {partNumber}
          </h2>
          <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/80">
            {typeLabel}
          </p>
        </div>
        
        {/* Content */}
        <div className="flex flex-1 flex-col px-5 py-5">
          {/* Part Title */}
          <h3 className="text-base font-bold text-foreground">
            {title}
          </h3>
          
          {/* Stats List */}
          <div className="mt-4 space-y-2.5">
            <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <GraduationCap className="h-4 w-4 text-primary" />
              <span>{learningPhases} Learning Phases</span>
            </div>
            
            <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <FileText className="h-4 w-4 text-primary" />
              <span>tests {tests}</span>
            </div>
            
            <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <Eye className="h-4 w-4 text-primary" />
              <span>views {views.toLocaleString()}</span>
            </div>
          </div>
          
          {/* Correct Percentage */}
          {/* <div className="mt-4 pt-3 border-t border-border">
            <span className="text-sm font-semibold text-primary">
              {correctPercent}% correct
            </span>
          </div> */}
        </div>
      </div>
    </Link>
  )
}
