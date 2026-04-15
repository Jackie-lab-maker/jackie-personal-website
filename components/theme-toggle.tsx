"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2 border border-border bg-card px-3 py-2 font-mono text-xs text-foreground">
        <pre className="leading-none">[...]</pre>
      </div>
    )
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 border border-border bg-card px-3 py-2 font-mono text-xs text-foreground transition-all hover:bg-secondary hover:text-accent focus:outline-none focus:ring-2 focus:ring-ring"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <pre className="leading-none">
        {theme === "dark" ? `[☀]` : `[☾]`}
      </pre>
      <span className="hidden sm:inline uppercase">
        {theme === "dark" ? "light_mode" : "dark_mode"}
      </span>
    </button>
  )
}
