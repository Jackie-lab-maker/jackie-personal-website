"use client"

import { useEffect, useState, useRef } from "react"

const HACKER_LINES = [
  "$ initializing system...",
  "$ connecting to secure server...",
  "[OK] connection established",
  "$ loading kernel modules...",
  "[OK] kernel loaded successfully",
  "$ decrypting portfolio data...",
  "[OK] decryption complete",
  "$ mounting file systems...",
  "[OK] /home/jackie mounted",
  "$ starting display server...",
  "[OK] graphics initialized",
  "$ loading user profile...",
  "[OK] welcome, visitor",
  "$ launching interface...",
]

const MATRIX_CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF"

interface MatrixColumn {
  x: number
  y: number
  speed: number
  chars: string[]
}

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState("")
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)
  const [progress, setProgress] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const columns: MatrixColumn[] = []
    const columnWidth = 20
    const numColumns = Math.ceil(canvas.width / columnWidth)

    for (let i = 0; i < numColumns; i++) {
      columns.push({
        x: i * columnWidth,
        y: Math.random() * canvas.height,
        speed: 2 + Math.random() * 4,
        chars: Array.from({ length: 20 }, () => 
          MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
        ),
      })
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      columns.forEach((col) => {
        col.chars.forEach((char, i) => {
          const y = col.y - i * 20
          if (y > 0 && y < canvas.height) {
            const opacity = 1 - i / col.chars.length
            ctx.fillStyle = `rgba(0, 255, 136, ${opacity * 0.8})`
            ctx.font = "14px monospace"
            ctx.fillText(char, col.x, y)
          }
        })

        col.y += col.speed
        if (col.y - col.chars.length * 20 > canvas.height) {
          col.y = 0
          col.chars = Array.from({ length: 20 }, () =>
            MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
          )
        }

        // Randomly change characters
        if (Math.random() < 0.1) {
          const idx = Math.floor(Math.random() * col.chars.length)
          col.chars[idx] = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
        }
      })

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  // Terminal typing effect
  useEffect(() => {
    if (lineIndex >= HACKER_LINES.length) {
      setTimeout(() => {
        setFadeOut(true)
        setTimeout(onComplete, 800)
      }, 500)
      return
    }

    const currentFullLine = HACKER_LINES[lineIndex]
    
    if (charIndex < currentFullLine.length) {
      const timeout = setTimeout(() => {
        setCurrentLine(currentFullLine.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      }, 20 + Math.random() * 30)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setTerminalLines((prev) => [...prev, currentFullLine])
        setCurrentLine("")
        setCharIndex(0)
        setLineIndex(lineIndex + 1)
        setProgress(((lineIndex + 1) / HACKER_LINES.length) * 100)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [lineIndex, charIndex, onComplete])

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-800 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Matrix rain canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-30"
      />

      {/* Scanline overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 136, 0.03) 2px, rgba(0, 255, 136, 0.03) 4px)",
        }}
      />

      {/* Terminal window */}
      <div className="relative z-10 w-full max-w-2xl mx-4">
        <div className="border border-[#00ff88]/30 bg-black/80 backdrop-blur-sm">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-[#00ff88]/30 bg-[#00ff88]/10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="ml-2 text-[#00ff88]/70 text-xs font-mono">
              jackie@portfolio:~
            </span>
          </div>

          {/* Terminal content */}
          <div className="p-4 h-80 overflow-hidden font-mono text-sm">
            {terminalLines.map((line, i) => (
              <div
                key={i}
                className={`${
                  line.startsWith("[OK]")
                    ? "text-[#00ff88]"
                    : line.startsWith("$")
                    ? "text-[#00ff88]/70"
                    : "text-white/80"
                }`}
              >
                {line}
              </div>
            ))}
            {currentLine && (
              <div className="text-[#00ff88]/70">
                {currentLine}
                <span className="animate-pulse">_</span>
              </div>
            )}
          </div>

          {/* Progress bar */}
          <div className="px-4 pb-4">
            <div className="flex items-center justify-between text-xs text-[#00ff88]/50 mb-2 font-mono">
              <span>LOADING PORTFOLIO</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1 bg-[#00ff88]/20 overflow-hidden">
              <div
                className="h-full bg-[#00ff88] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* ASCII art decoration */}
        <pre className="text-[#00ff88]/30 text-[8px] mt-4 text-center font-mono leading-tight">
{`╔═══════════════════════════════════════════════════════════════╗
║  ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄  ║
║  █ SECURE CONNECTION ESTABLISHED • ENCRYPTION: AES-256-GCM █  ║
║  ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀  ║
╚═══════════════════════════════════════════════════════════════╝`}
        </pre>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 text-[#00ff88]/20 font-mono text-xs">
        <div>SYS://INIT</div>
        <div>VER: 2.0.26</div>
      </div>
      <div className="absolute top-4 right-4 text-[#00ff88]/20 font-mono text-xs text-right">
        <div>NODE: ACTIVE</div>
        <div>PING: 12ms</div>
      </div>
      <div className="absolute bottom-4 left-4 text-[#00ff88]/20 font-mono text-xs">
        <div>MEM: 847MB</div>
        <div>CPU: 23%</div>
      </div>
      <div className="absolute bottom-4 right-4 text-[#00ff88]/20 font-mono text-xs text-right">
        <div>UPTIME: 99.9%</div>
        <div>STATUS: OK</div>
      </div>
    </div>
  )
}
