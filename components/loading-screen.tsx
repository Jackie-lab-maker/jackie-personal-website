"use client"

import { useEffect, useState, useRef, useMemo, useCallback } from "react"

const HACKER_LINES = [
  "$ initializing system...",
  "$ connecting to server...",
  "[OK] connection established",
  "$ loading modules...",
  "[OK] modules loaded",
  "$ decrypting data...",
  "[OK] decryption complete",
  "$ launching interface...",
]

// Pre-computed matrix characters for better performance
const MATRIX_CHARS = "アイウエオカキクケコ0123456789"

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState("")
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)
  const [progress, setProgress] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const columnsRef = useRef<{ x: number; y: number; speed: number; char: string }[]>([])

  // Memoized line count for progress calculation
  const totalLines = useMemo(() => HACKER_LINES.length, [])

  // Optimized matrix rain effect with reduced columns and simpler rendering
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    // Use device pixel ratio for crisp rendering but cap it
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    
    const resizeCanvas = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)
      
      // Reinitialize columns on resize
      const columnWidth = 25
      const numColumns = Math.ceil(width / columnWidth)
      columnsRef.current = Array.from({ length: numColumns }, (_, i) => ({
        x: i * columnWidth,
        y: Math.random() * height,
        speed: 3 + Math.random() * 4,
        char: MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
      }))
    }
    
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    ctx.font = "14px monospace"
    
    let lastTime = 0
    const targetFPS = 30
    const frameInterval = 1000 / targetFPS

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime
      
      if (deltaTime >= frameInterval) {
        lastTime = currentTime - (deltaTime % frameInterval)
        
        // Fade effect
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
        ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr)

        // Draw columns
        ctx.fillStyle = "rgba(0, 255, 136, 0.7)"
        const columns = columnsRef.current
        const height = canvas.height / dpr
        
        for (let i = 0; i < columns.length; i++) {
          const col = columns[i]
          ctx.fillText(col.char, col.x, col.y)
          
          col.y += col.speed
          if (col.y > height) {
            col.y = 0
            col.char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  // Optimized terminal typing effect
  useEffect(() => {
    if (lineIndex >= totalLines) {
      const fadeTimeout = setTimeout(() => {
        setFadeOut(true)
        setTimeout(onComplete, 300)
      }, 100)
      return () => clearTimeout(fadeTimeout)
    }

    const currentFullLine = HACKER_LINES[lineIndex]
    
    if (charIndex < currentFullLine.length) {
      const timeout = setTimeout(() => {
        setCurrentLine(currentFullLine.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      }, 6 + Math.random() * 8)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setTerminalLines((prev) => [...prev, currentFullLine])
        setCurrentLine("")
        setCharIndex(0)
        setLineIndex(lineIndex + 1)
        setProgress(((lineIndex + 1) / totalLines) * 100)
      }, 20)
      return () => clearTimeout(timeout)
    }
  }, [lineIndex, charIndex, onComplete, totalLines])

  // Memoized line renderer to prevent unnecessary re-renders
  const renderedLines = useMemo(() => (
    terminalLines.map((line, i) => (
      <div
        key={i}
        className={
          line.startsWith("[OK]")
            ? "text-[#00ff88]"
            : "text-[#00ff88]/70"
        }
      >
        {line}
      </div>
    ))
  ), [terminalLines])

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-300 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Matrix rain canvas - optimized */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-25"
      />

      {/* Terminal window - simplified structure */}
      <div className="relative z-10 w-full max-w-xl mx-4">
        <div className="border border-[#00ff88]/30 bg-black/90">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-[#00ff88]/30 bg-[#00ff88]/10">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <span className="ml-2 text-[#00ff88]/70 text-xs font-mono">
              jackie@portfolio:~
            </span>
          </div>

          {/* Terminal content - reduced height */}
          <div className="p-3 h-48 overflow-hidden font-mono text-xs">
            {renderedLines}
            {currentLine && (
              <div className="text-[#00ff88]/70">
                {currentLine}
                <span className="animate-pulse">_</span>
              </div>
            )}
          </div>

          {/* Progress bar */}
          <div className="px-3 pb-3">
            <div className="flex items-center justify-between text-[10px] text-[#00ff88]/50 mb-1 font-mono">
              <span>LOADING</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-0.5 bg-[#00ff88]/20 overflow-hidden">
              <div
                className="h-full bg-[#00ff88] transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Simplified corner decorations */}
      <div className="absolute top-3 left-3 text-[#00ff88]/15 font-mono text-[10px]">
        SYS://INIT
      </div>
      <div className="absolute bottom-3 right-3 text-[#00ff88]/15 font-mono text-[10px]">
        STATUS: OK
      </div>
    </div>
  )
}
