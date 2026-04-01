"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    name: "Sarah Chen",
    avatar: "SC",
    rating: 5,
    comment: "The interface is intuitive and the exercises are very close to the real TOEIC test. Improved my score by 150 points!",
  },
  {
    name: "John Park",
    avatar: "JP",
    rating: 5,
    comment: "Best vocabulary learning platform I've used. The topic-based approach makes it easy to remember new words.",
  },
  {
    name: "Minh Nguyen",
    avatar: "MN",
    rating: 4,
    comment: "Great practice materials with detailed explanations. The progress tracking keeps me motivated.",
  },
  {
    name: "Emily Wang",
    avatar: "EW",
    rating: 5,
    comment: "Love the mock tests! They really simulate the real exam experience. Highly recommended for TOEIC preparation.",
  },
  {
    name: "David Kim",
    avatar: "DK",
    rating: 5,
    comment: "The listening exercises are excellent. Audio quality is great and the questions are well-designed.",
  },
  {
    name: "Lisa Tran",
    avatar: "LT",
    rating: 4,
    comment: "Clean design and easy to navigate. Perfect for daily practice sessions. My reading speed has improved a lot.",
  },
]

const avatarColors = [
  "bg-primary text-primary-foreground",
  "bg-accent text-accent-foreground",
  "bg-secondary text-secondary-foreground",
  "bg-primary/80 text-primary-foreground",
  "bg-accent/80 text-accent-foreground",
  "bg-secondary/80 text-secondary-foreground",
]

export function Testimonials() {
  return (
    <div className="mt-8 rounded-2xl border border-border bg-card p-6 md:col-span-2 lg:col-span-2">
      <h2 className="mb-6 text-xl font-bold text-card-foreground">What Our Students Say</h2>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.name}
            className="rounded-xl border border-border bg-background p-4 transition-colors hover:bg-muted/50"
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium",
                  avatarColors[index % avatarColors.length]
                )}
              >
                {testimonial.avatar}
              </div>
              <div>
                <p className="font-medium text-foreground">{testimonial.name}</p>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-3.5 w-3.5",
                        i < testimonial.rating
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {testimonial.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
