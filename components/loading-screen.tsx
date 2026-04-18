"use client"

import { useEffect, useState, useRef, useMemo, useCallback } from "react"

const INITIAL_LINES = [
  "$ initializing system...",
  "$ connecting to server...",
  "[OK] connection established",
  "$ loading modules...",
  "[OK] modules loaded",
  "$ system ready",
  "",
  "Type 'launch web' to enter portfolio...",
]

// Pre-computed matrix characters for better performance
const MATRIX_CHARS = "アイウエオカキクケコ0123456789"

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState("")
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)
  const [typingComplete, setTypingComplete] = useState(false)
  const [userInput, setUserInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [errorMessage, setErrorMessage] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const columnsRef = useRef<{ x: number; y: number; speed: number; char: string }[]>([])

  // Memoized line count for progress calculation
  const totalLines = useMemo(() => INITIAL_LINES.length, [])

  // Handle skip button
  const handleSkip = useCallback(() => {
    setFadeOut(true)
    setTimeout(onComplete, 300)
  }, [onComplete])

  // Handle command submission
  const handleCommand = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const command = userInput.trim().toLowerCase()
    
    if (command === "launch web") {
      setCommandHistory(prev => [...prev, `$ ${userInput}`, "[OK] launching portfolio..."])
      setUserInput("")
      setErrorMessage("")
      setTimeout(() => {
        setFadeOut(true)
        setTimeout(onComplete, 300)
      }, 500)
    } else if (command === "help") {
      setCommandHistory(prev => [...prev, `$ ${userInput}`, "Available commands:", "  launch web - Enter the portfolio", "  help - Show this message", "  clear - Clear terminal"])
      setUserInput("")
      setErrorMessage("")
    } else if (command === "clear") {
      setCommandHistory([])
      setUserInput("")
      setErrorMessage("")
    } else if (command !== "") {
      setCommandHistory(prev => [...prev, `$ ${userInput}`])
      setErrorMessage(`Command not found: ${userInput}. Type 'help' for available commands.`)
      setUserInput("")
    }
  }, [userInput, onComplete])

  // Focus input when typing is complete
  useEffect(() => {
    if (typingComplete && inputRef.current) {
      inputRef.current.focus()
    }
  }, [typingComplete])

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
      setTypingComplete(true)
      return
    }

    const currentFullLine = INITIAL_LINES[lineIndex]
    
    if (charIndex < currentFullLine.length) {
      const timeout = setTimeout(() => {
        setCurrentLine(currentFullLine.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      }, 8 + Math.random() * 12)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setTerminalLines((prev) => [...prev, currentFullLine])
        setCurrentLine("")
        setCharIndex(0)
        setLineIndex(lineIndex + 1)
      }, 30)
      return () => clearTimeout(timeout)
    }
  }, [lineIndex, charIndex, totalLines])

  // Memoized line renderer to prevent unnecessary re-renders
  const renderedLines = useMemo(() => (
    [...terminalLines, ...commandHistory].map((line, i) => (
      <div
        key={i}
        className={
          line.startsWith("[OK]")
            ? "text-[#00ff88]"
            : line.startsWith("$")
            ? "text-[#00ff88]/70"
            : line.startsWith("Command not found") || line.startsWith("Available") || line.startsWith("  ")
            ? "text-yellow-400/80"
            : line.startsWith("Type")
            ? "text-cyan-400"
            : "text-[#00ff88]/70"
        }
      >
        {line}
      </div>
    ))
  ), [terminalLines, commandHistory])

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

      {/* Terminal window */}
      <div className="relative z-10 w-full max-w-xl mx-4">
        <div className="border border-[#00ff88]/30 bg-black/90">
          {/* Terminal header */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-[#00ff88]/30 bg-[#00ff88]/10">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="ml-2 text-[#00ff88]/70 text-xs font-mono">
                jackie@portfolio:~
              </span>
            </div>
            <button
              onClick={handleSkip}
              className="text-[#00ff88]/50 hover:text-[#00ff88] text-xs font-mono transition-colors px-2 py-1 border border-[#00ff88]/30 hover:border-[#00ff88]/60 hover:bg-[#00ff88]/10"
              aria-label="Skip loading screen"
            >
              [SKIP]
            </button>
          </div>

          {/* Terminal content */}
          <div className="p-3 h-56 overflow-y-auto font-mono text-xs">
            {renderedLines}
            {currentLine && (
              <div className="text-[#00ff88]/70">
                {currentLine}
                <span className="animate-pulse">_</span>
              </div>
            )}
            {errorMessage && (
              <div className="text-red-400 mt-1">{errorMessage}</div>
            )}
          </div>

          {/* Command input */}
          {typingComplete && (
            <form onSubmit={handleCommand} className="px-3 pb-3">
              <div className="flex items-center gap-2 border border-[#00ff88]/30 bg-black/50 px-2 py-1.5">
                <span className="text-[#00ff88] text-xs font-mono">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="flex-1 bg-transparent text-[#00ff88] text-xs font-mono outline-none placeholder-[#00ff88]/30"
                  placeholder="type command..."
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Command input"
                />
                <span className="animate-pulse text-[#00ff88]">_</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] text-[#00ff88]/40 font-mono">
                  Hint: type &apos;launch web&apos; or &apos;help&apos;
                </span>
                <button
                  type="submit"
                  className="text-[10px] text-[#00ff88]/50 hover:text-[#00ff88] font-mono transition-colors"
                >
                  [ENTER]
                </button>
              </div>
            </form>
          )}

          {/* Progress indicator while typing */}
          {!typingComplete && (
            <div className="px-3 pb-3">
              <div className="flex items-center justify-between text-[10px] text-[#00ff88]/50 mb-1 font-mono">
                <span>INITIALIZING</span>
                <span>{Math.round((lineIndex / totalLines) * 100)}%</span>
              </div>
              <div className="h-0.5 bg-[#00ff88]/20 overflow-hidden">
                <div
                  className="h-full bg-[#00ff88] transition-all duration-200"
                  style={{ width: `${(lineIndex / totalLines) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-3 left-3 text-[#00ff88]/15 font-mono text-[10px]">
        SYS://INIT
      </div>
      <div className="absolute bottom-3 right-3 text-[#00ff88]/15 font-mono text-[10px]">
        STATUS: READY
      </div>
    </div>
  )
}
