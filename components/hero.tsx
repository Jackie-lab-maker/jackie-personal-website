"use client"

import { useEffect, useState, useMemo } from "react"
import { SplineScene } from "@/components/ui/splite"

interface HeroProps {
  data: {
    name: string
    occupation: string
  }
}

const ASCII_LINES = [
  "     ██╗ █████╗  ██████╗██╗  ██╗██╗███████╗    ███████╗██╗  ██╗ █████╗  ██████╗ ",
  "     ██║██╔══██╗██╔════╝██║ ██╔╝██║██╔════╝    ██╔════╝██║  ██║██╔══██╗██╔═══██╗",
  "     ██║███████║██║     █████╔╝ ██║█████╗      ███████╗███████║███████║██║   ██║",
  "██   ██║██╔══██║██║     ██╔═██╗ ██║██╔══╝      ╚════██║██╔══██║██╔══██║██║   ██║",
  "╚█████╔╝██║  ██║╚██████╗██║  ██╗██║███████╗    ███████║██║  ██║██║  ██║╚██████╔╝",
  " ╚════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝╚══════╝    ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ",
]

// Column boundaries for each letter: J, A, C, K, I, E, (space), S, H, A, O
const LETTER_COLUMNS = [0, 8, 18, 27, 36, 39, 48, 52, 61, 70, 79, 88]

export default function Hero({ data }: HeroProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const totalLetters = LETTER_COLUMNS.length - 1

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(!isDeleting)
      }, isDeleting ? 400 : 1500)
      return () => clearTimeout(pauseTimeout)
    }

    // Typewriter timing with natural variation
    const baseSpeed = isDeleting ? 60 : 120
    const variation = Math.random() * (isDeleting ? 30 : 80)
    const speed = baseSpeed + variation

    const timeout = setTimeout(() => {
      if (isDeleting) {
        if (currentLetterIndex > 0) {
          setCurrentLetterIndex((prev) => prev - 1)
        } else {
          setIsPaused(true)
        }
      } else {
        if (currentLetterIndex < totalLetters) {
          setCurrentLetterIndex((prev) => prev + 1)
        } else {
          setIsPaused(true)
        }
      }
    }, speed)

    return () => clearTimeout(timeout)
  }, [currentLetterIndex, isDeleting, isPaused, totalLetters])

  const renderedLines = useMemo(() => {
    const visibleColumns = LETTER_COLUMNS[currentLetterIndex] || 0
    return ASCII_LINES.map((line) => {
      if (visibleColumns <= 0) return ""
      return line.slice(0, visibleColumns)
    })
  }, [currentLetterIndex])

  return (
    <section className="container mx-auto px-4 py-16 md:py-24 relative scan-line">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left: name */}
        <div className="flex flex-col items-start gap-6 order-2 md:order-1">
          <div className="font-mono leading-tight">
            <pre className="text-[6px] sm:text-[8px] md:text-[10px] lg:text-xs neon-text whitespace-pre">
{renderedLines.map((line, i) => (
  <span key={i}>
    {line || " "}
    {i < renderedLines.length - 1 && "\n"}
  </span>
))}
              <span className="animate-pulse">{"█"}</span>
            </pre>
          </div>

          <div className="text-left space-y-4">
            <h1 className="font-mono text-xl md:text-2xl lg:text-3xl font-bold text-foreground">{data.name}</h1>
            <div className="font-mono text-xs md:text-sm text-muted-foreground border-t-2 border-b-2 pulse-border py-2 px-4 inline-block">
              <span className="neon-cyan">{">"}</span> {data.occupation}
            </div>
          </div>
        </div>

        {/* Right: interactive 3D bot */}
        <div className="relative h-[300px] sm:h-[380px] md:h-[460px] order-1 md:order-2">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-8 mt-8">
        {/* Scroll indicator */}
        <div
          className={`mt-8 transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex flex-col items-center gap-2 font-mono text-accent">
            <span className="text-xs text-muted-foreground tracking-wider">[SCROLL]</span>
            <div className="flex flex-col items-center animate-bounce">
              <span className="text-sm">{"▼"}</span>
              <span className="text-xs opacity-60">{"▼"}</span>
              <span className="text-[10px] opacity-30">{"▼"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-4 left-4 text-accent/30 font-mono text-xs md:text-sm">╔═══</div>
      <div className="absolute top-4 right-4 text-accent/30 font-mono text-xs md:text-sm">═══╗</div>
      <div className="absolute bottom-4 left-4 text-accent/30 font-mono text-xs md:text-sm">╚═══</div>
      <div className="absolute bottom-4 right-4 text-accent/30 font-mono text-xs md:text-sm">═══╝</div>
    </section>
  )
}
