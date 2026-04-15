"use client"

import { useEffect, useState, useMemo } from "react"

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

export default function Hero({ data }: HeroProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [displayedChars, setDisplayedChars] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const totalChars = useMemo(() => {
    return ASCII_LINES.reduce((sum, line) => sum + line.length, 0)
  }, [])

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
      }, isDeleting ? 500 : 2000)
      return () => clearTimeout(pauseTimeout)
    }

    const baseSpeed = isDeleting ? 2 : 8
    const variation = Math.random() * (isDeleting ? 2 : 6)
    const speed = baseSpeed + variation

    const timeout = setTimeout(() => {
      if (isDeleting) {
        if (displayedChars > 0) {
          setDisplayedChars((prev) => Math.max(0, prev - 8))
        } else {
          setIsPaused(true)
        }
      } else {
        if (displayedChars < totalChars) {
          setDisplayedChars((prev) => Math.min(totalChars, prev + 3))
        } else {
          setIsPaused(true)
        }
      }
    }, speed)

    return () => clearTimeout(timeout)
  }, [displayedChars, isDeleting, isPaused, totalChars])

  const renderedLines = useMemo(() => {
    let charsRemaining = displayedChars
    return ASCII_LINES.map((line) => {
      if (charsRemaining <= 0) return ""
      if (charsRemaining >= line.length) {
        charsRemaining -= line.length
        return line
      }
      const partial = line.slice(0, charsRemaining)
      charsRemaining = 0
      return partial
    })
  }, [displayedChars])

  return (
    <section className="container mx-auto px-4 py-16 md:py-24 relative scan-line">
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="font-mono leading-tight">
          <pre className="text-[10px] sm:text-xs md:text-sm lg:text-base neon-text whitespace-pre">
{renderedLines.map((line, i) => (
  <span key={i}>
    {line || " "}
    {i < renderedLines.length - 1 && "\n"}
  </span>
))}
            <span className="animate-pulse">{"█"}</span>
          </pre>
        </div>

        <div className="text-center space-y-4">
          <h1 className="font-mono text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">{data.name}</h1>
          <div className="font-mono text-sm md:text-base text-muted-foreground border-t-2 border-b-2 pulse-border py-2 px-4">
            <span className="neon-cyan">{">"}</span> {data.occupation}
          </div>
        </div>

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
