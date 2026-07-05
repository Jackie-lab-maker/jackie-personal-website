"use client"

import { useEffect, useState, useMemo, useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
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

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function Hero({ data }: HeroProps) {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const robotY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -30])
  const cornersY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 20])

  const totalLetters = LETTER_COLUMNS.length - 1

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
    <section ref={sectionRef} className="container mx-auto px-4 py-16 md:py-24 relative scan-line">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left: name */}
        <motion.div
          className="flex flex-col items-start gap-6 order-2 md:order-1"
          initial={reducedMotion ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
          }}
        >
          <motion.div
            className="font-mono leading-tight"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
            }}
          >
            <pre className="text-[6px] sm:text-[8px] md:text-[10px] lg:text-xs neon-text whitespace-pre">
{renderedLines.map((line, i) => (
  <span key={i}>
    {line || " "}
    {i < renderedLines.length - 1 && "\n"}
  </span>
))}
              <span className="animate-pulse">{"█"}</span>
            </pre>
          </motion.div>

          <motion.div
            className="text-left space-y-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
            }}
          >
            <h1 className="font-mono text-xl md:text-2xl lg:text-3xl font-bold text-foreground">{data.name}</h1>
            <div className="font-mono text-xs md:text-sm text-muted-foreground border-t-2 border-b-2 pulse-border py-2 px-4 inline-block">
              <span className="neon-cyan">{">"}</span> {data.occupation}
            </div>
          </motion.div>
        </motion.div>

        {/* Right: interactive 3D bot */}
        <motion.div
          className="relative h-[300px] sm:h-[380px] md:h-[460px] order-1 md:order-2"
          initial={reducedMotion ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          style={{ y: robotY }}
        >
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </motion.div>
      </div>

      <motion.div style={{ y: cornersY }} className="absolute top-4 left-4 text-accent/30 font-mono text-xs md:text-sm">╔═══</motion.div>
      <motion.div style={{ y: cornersY }} className="absolute top-4 right-4 text-accent/30 font-mono text-xs md:text-sm">═══╗</motion.div>
      <motion.div style={{ y: cornersY }} className="absolute bottom-4 left-4 text-accent/30 font-mono text-xs md:text-sm">╚═══</motion.div>
      <motion.div style={{ y: cornersY }} className="absolute bottom-4 right-4 text-accent/30 font-mono text-xs md:text-sm">═══╝</motion.div>
    </section>
  )
}
