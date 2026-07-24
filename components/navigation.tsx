"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"

const NAV_LINKS = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/experience", label: "experience" },
  { href: "/design-team", label: "design team" },
  { href: "/education", label: "education" },
  { href: "/contact", label: "contact" },
]

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

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

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Hide navigation on experience detail pages and the Instagram QR page
  if (pathname?.startsWith("/experience/") || pathname === "/instagram") {
    return null
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-lg shadow-black/20" : "bg-transparent"
      }`}
      role="banner"
    >
      <nav
        className={`container mx-auto px-4 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? "py-2" : "py-3"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Menu Toggle Button - Left */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 border border-border bg-card px-3 py-1.5 font-mono text-xs text-foreground transition-all duration-200 hover:bg-secondary hover:text-accent hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-ring"
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
            className="flex items-center gap-2 border border-border bg-card px-3 py-1.5 font-mono text-xs text-foreground transition-all duration-200 hover:bg-secondary hover:text-accent hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-ring"
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
        className={`fixed left-0 right-0 top-[49px] origin-top bg-background/98 backdrop-blur-sm border-b border-border transition-all duration-500 ease-out ${
          isMenuOpen
            ? "opacity-100 visible [transform:perspective(1100px)_translateY(0)_rotateX(0deg)]"
            : "opacity-0 invisible [transform:perspective(1100px)_translateY(-1rem)_rotateX(-7deg)]"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link, index) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`font-mono text-sm hover:text-accent hover:bg-accent/10 px-4 py-3 border-l-2 hover:border-accent transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring ${
                    isActive ? "text-accent border-accent" : "text-muted-foreground border-transparent"
                  } ${isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
                  }}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  <span className="text-accent mr-2">{String(index + 1).padStart(2, "0")}.</span>
                  [{link.label}]
                </Link>
              )
            })}
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
