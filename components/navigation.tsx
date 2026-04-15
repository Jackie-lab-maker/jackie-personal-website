"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"

const NAV_LINKS = [
  { href: "#about", label: "about" },
  { href: "#experience", label: "experience" },
  { href: "#projects", label: "projects" },
  { href: "#skills", label: "skills" },
  { href: "#education", label: "education" },
  { href: "#contact", label: "contact" },
]

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  // Hide navigation on experience detail pages
  if (pathname?.startsWith("/experience/")) {
    return null
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isMenuOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
      }`}
      role="banner"
    >
      <nav
        className="container mx-auto px-4 py-3 flex items-center justify-between"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Menu Toggle Button - Left */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 border border-border bg-card px-3 py-1.5 font-mono text-xs text-foreground transition-all hover:bg-secondary hover:text-accent focus:outline-none focus:ring-2 focus:ring-ring"
          aria-expanded={isMenuOpen}
          aria-controls="nav-menu"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <span>{isMenuOpen ? "[✕]" : "[≡]"}</span>
          <span className="uppercase">menu</span>
        </button>

        {/* Theme Toggle - Right */}
        {mounted && (
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 border border-border bg-card px-3 py-1.5 font-mono text-xs text-foreground transition-all hover:bg-secondary hover:text-accent focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <span>{theme === "dark" ? "[☀]" : "[☾]"}</span>
            <span className="hidden sm:inline uppercase">
              {theme === "dark" ? "light" : "dark"}
            </span>
          </button>
        )}
      </nav>

      {/* Dropdown Menu */}
      <div
        id="nav-menu"
        className={`fixed left-0 right-0 top-[49px] bg-background/98 backdrop-blur-sm border-b border-border transition-all duration-300 ${
          isMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2">
            {NAV_LINKS.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-mono text-xs text-muted-foreground hover:text-accent px-3 py-2 border border-border hover:border-accent transition-all focus:outline-none focus:ring-2 focus:ring-ring"
                tabIndex={isMenuOpen ? 0 : -1}
              >
                <span className="text-accent mr-1">{String(index + 1).padStart(2, "0")}.</span>
                [{link.label}]
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay to close menu when clicking outside */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 top-[49px] z-[-1]"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  )
}
