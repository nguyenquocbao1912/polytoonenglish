import { Headphones, FileText, BookMarked, BarChart3, Clock, CheckCircle2 } from "lucide-react"

const features = [
  {
    title: "Listening Practice",
    description: "Part 1-4 with native audio",
    icon: Headphones,
  },
  {
    title: "Reading Practice",
    description: "Part 5-7 comprehension",
    icon: FileText,
  },
  {
    title: "Vocabulary Topics",
    description: "Business, Travel & more",
    icon: BookMarked,
  },
  {
    title: "Progress Tracking",
    description: "Monitor your improvement",
    icon: BarChart3,
  },
  {
    title: "Timed Tests",
    description: "Simulate real exam conditions",
    icon: Clock,
  },
  {
    title: "Instant Feedback",
    description: "Detailed explanations",
    icon: CheckCircle2,
  },
]

export function FeaturesGrid() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:col-span-2 lg:col-span-2">
      <h2 className="mb-4 text-xl font-bold text-card-foreground">Platform Features</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <div
              key={feature.title}
              className="flex flex-col items-center rounded-xl border border-border bg-background p-4 text-center transition-colors hover:bg-muted/50"
            >
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <Icon className="h-5 w-5 text-secondary-foreground" />
              </div>
              <h3 className="text-sm font-medium text-foreground">{feature.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{feature.description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
