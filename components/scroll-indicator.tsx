"use client"

import { useEffect, useState } from "react"

export function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      
      setScrollProgress(progress)
      
      if (scrollTop > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Side progress bar */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-2">
        <div className="font-mono text-[10px] text-muted-foreground">[{Math.round(scrollProgress).toString().padStart(3, "0")}%]</div>
        <div className="w-1 h-32 bg-muted/30 rounded-full overflow-hidden">
          <div
            className="w-full bg-accent transition-all duration-150 rounded-full"
            style={{ height: `${scrollProgress}%` }}
          />
        </div>
        <div className="font-mono text-[10px] text-muted-foreground rotate-90 mt-4">SCROLL</div>
      </div>

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-4 z-40 font-mono text-xs px-3 py-2 border border-accent/50 bg-background/80 backdrop-blur-sm text-accent hover:bg-accent hover:text-background transition-all duration-300 ${
          scrollProgress > 10 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <span className="flex items-center gap-2">
          <span>{"▲"}</span>
          <span className="hidden sm:inline">[TOP]</span>
        </span>
      </button>
    </>
  )
}
