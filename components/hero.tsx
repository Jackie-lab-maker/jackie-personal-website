"use client"

import { useEffect, useState, useMemo } from "react"

interface HeroProps {
  data: {
    name: string
    occupation: string
  }
}

// ASCII art for "JACKIE SHAO"
const NAME_ASCII = [
  "     ██╗ █████╗  ██████╗██╗  ██╗██╗███████╗    ███████╗██╗  ██╗ █████╗  ██████╗ ",
  "     ██║██╔══██╗██╔════╝██║ ██╔╝██║██╔════╝    ██╔════╝██║  ██║██╔══██╗██╔═══██╗",
  "     ██║███████║██║     █████╔╝ ██║█████╗      ███████╗███████║███████║██║   ██║",
  "██   ██║██╔══██║██║     ██╔═██╗ ██║██╔══╝      ╚════██║██╔══██║██╔══██║██║   ██║",
  "╚█████╔╝██║  ██║╚██████╗██║  ██╗██║███████╗    ███████║██║  ██║██║  ██║╚██████╔╝",
  " ╚════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝╚══════╝    ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ",
]

// ASCII art for "AVAILABLE FOR INTERNSHIPS" (smaller, cleaner font)
const TAGLINE_TEXT = "> Available for Internships"

export default function Hero({ data }: HeroProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [nameCharIndex, setNameCharIndex] = useState(0)
  const [taglineCharIndex, setTaglineCharIndex] = useState(0)
  const [phase, setPhase] = useState<"typing_name" | "typing_tagline" | "paused" | "deleting_tagline" | "deleting_name">("typing_name")

  const totalNameChars = NAME_ASCII[0].length
  const totalTaglineChars = TAGLINE_TEXT.length

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
    let timeout: NodeJS.Timeout

    switch (phase) {
      case "typing_name":
        if (nameCharIndex < totalNameChars) {
          const speed = 8 + Math.random() * 12
          timeout = setTimeout(() => {
            setNameCharIndex((prev) => Math.min(totalNameChars, prev + 3))
          }, speed)
        } else {
          timeout = setTimeout(() => setPhase("typing_tagline"), 300)
        }
        break

      case "typing_tagline":
        if (taglineCharIndex < totalTaglineChars) {
          const speed = 50 + Math.random() * 80
          timeout = setTimeout(() => {
            setTaglineCharIndex((prev) => prev + 1)
          }, speed)
        } else {
          timeout = setTimeout(() => setPhase("paused"), 2000)
        }
        break

      case "paused":
        timeout = setTimeout(() => setPhase("deleting_tagline"), 500)
        break

      case "deleting_tagline":
        if (taglineCharIndex > 0) {
          const speed = 20 + Math.random() * 20
          timeout = setTimeout(() => {
            setTaglineCharIndex((prev) => prev - 1)
          }, speed)
        } else {
          timeout = setTimeout(() => setPhase("deleting_name"), 200)
        }
        break

      case "deleting_name":
        if (nameCharIndex > 0) {
          const speed = 3 + Math.random() * 5
          timeout = setTimeout(() => {
            setNameCharIndex((prev) => Math.max(0, prev - 6))
          }, speed)
        } else {
          timeout = setTimeout(() => setPhase("typing_name"), 400)
        }
        break
    }

    return () => clearTimeout(timeout)
  }, [phase, nameCharIndex, taglineCharIndex, totalNameChars, totalTaglineChars])

  const renderedNameLines = useMemo(() => {
    return NAME_ASCII.map((line) => {
      if (nameCharIndex <= 0) return ""
      return line.slice(0, nameCharIndex)
    })
  }, [nameCharIndex])

  const renderedTagline = useMemo(() => {
    return TAGLINE_TEXT.slice(0, taglineCharIndex)
  }, [taglineCharIndex])

  return (
    <section className="container mx-auto px-4 py-16 md:py-24 relative scan-line">
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="font-mono leading-tight text-center">
          {/* Name ASCII Art */}
          <pre className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm neon-text whitespace-pre inline-block text-left">
{renderedNameLines.map((line, i) => (
  <span key={i}>
    {line || " "}
    {i < renderedNameLines.length - 1 && "\n"}
  </span>
))}
          </pre>
          
          {/* Tagline with typewriter effect */}
          <div className="mt-6 h-8 flex items-center justify-center">
            <span className="text-sm sm:text-base md:text-lg lg:text-xl font-mono text-accent tracking-wider">
              {renderedTagline}
              <span className="animate-pulse">{"█"}</span>
            </span>
          </div>
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
