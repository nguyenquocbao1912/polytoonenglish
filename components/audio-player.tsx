"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, RotateCcw, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AudioPlayerProps {
  src: string
  className?: string
}

export function AudioPlayer({ src, className }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
      setProgress((audio.currentTime / audio.duration) * 100)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
      setProgress(0)
    }

    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const skip = (seconds: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.max(0, Math.min(audio.currentTime + seconds, duration))
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newProgress = (clickX / rect.width) * 100
    const newTime = (newProgress / 100) * duration
    audio.currentTime = newTime
  }

  return (
    <div className={cn("rounded-xl bg-[#7fe0a8] p-4", className)}>
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="flex items-center md:gap-3">
        {/* Skip backward */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={() => skip(-5)}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        {/* Play/Pause */}
        <Button
          variant="default"
          size="icon"
          className="h-10 w-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5 ml-0.5" />
          )}
        </Button>

        {/* Skip forward */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={() => skip(5)}
        >
          <RotateCw className="h-4 w-4" />
        </Button>

        {/* Progress bar */}
        <div className="flex flex-1 items-center gap-3">
          <span className="text-xs text-muted-foreground w-10 text-right">
            {formatTime(currentTime)}
          </span>

          <div
            className="relative h-2 flex-1 cursor-pointer rounded-full bg-border"
            onClick={handleProgressClick}
          >
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-primary shadow-sm transition-all"
              style={{ left: `calc(${progress}% - 6px)` }}
            />
          </div>

          <span className="text-xs text-muted-foreground w-10">
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  )
}
