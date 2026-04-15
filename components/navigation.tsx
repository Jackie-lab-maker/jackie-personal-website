"use client"

import { useState, useEffect } from "react"
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
        {/* Desktop Navigation - Left */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-mono text-xs text-muted-foreground hover:text-accent px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
            >
              [{link.label}]
            </a>
          ))}
        </div>
          
        {/* Theme Toggle - Right */}
        <div className="hidden md:flex">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 border border-border bg-card px-3 py-1.5 font-mono text-xs text-foreground transition-all hover:bg-secondary hover:text-accent focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <span>{theme === "dark" ? "[☀]" : "[☾]"}</span>
              <span className="hidden lg:inline uppercase">
                {theme === "dark" ? "light" : "dark"}
              </span>
            </button>
          )}
        </div>

        {/* Mobile Menu Button - Left */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center border border-border bg-card px-2 py-1.5 font-mono text-xs text-foreground transition-all hover:bg-secondary hover:text-accent focus:outline-none focus:ring-2 focus:ring-ring"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <span>{isMenuOpen ? "[✕]" : "[≡]"}</span>
          </button>
        </div>

        {/* Mobile Theme Toggle - Right */}
        <div className="flex md:hidden">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="flex items-center border border-border bg-card px-2 py-1.5 font-mono text-xs text-foreground transition-all hover:bg-secondary hover:text-accent focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <span>{theme === "dark" ? "[☀]" : "[☾]"}</span>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 top-[49px] bg-background/98 backdrop-blur-sm transition-all duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-2 border border-border p-4">
            <pre className="text-xs text-muted-foreground mb-2">{"// navigation"}</pre>
            {NAV_LINKS.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-mono text-sm text-foreground hover:text-accent py-2 px-3 border-l-2 border-transparent hover:border-accent transition-all focus:outline-none focus:ring-2 focus:ring-ring"
                tabIndex={isMenuOpen ? 0 : -1}
              >
                <span className="text-muted-foreground mr-2">{String(index + 1).padStart(2, "0")}.</span>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
