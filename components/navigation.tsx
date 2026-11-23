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
  { href: "/education", label: "education" },
  { href: "/contact", label: "contact" },
]

export function Navigation() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  // The Instagram QR page is a standalone page without site navigation
  if (pathname === "/instagram") {
    return null
  }

  const isDetailPage = /^\/(projects|experience)\/./.test(pathname ?? "")

  // A section stays highlighted on its detail pages too (e.g. /projects/... -> projects)
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || !!pathname?.startsWith(`${href}/`)

  return (
    <>
      {/* Menu: just the items, fixed on the left and vertically centered, directly on the page background.
          The `site-menu` class reserves room for it in globals.css. z-[2] matches the page's own layer
          (globals.css `body > *`), so page overlays such as lightboxes still cover it. */}
      <nav
        aria-label="Main navigation"
        className="site-menu fixed inset-y-0 left-0 z-[2] flex bg-background w-[52px] flex-col justify-center overflow-y-auto md:w-56"
      >
        <ul className="flex flex-col items-center md:items-start md:pl-10">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href)
            return (
              <li key={link.href}>
                {/* Phones: the word runs vertically so the menu column stays narrow (px spaces the words there, since padding follows the text direction) */}
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`block px-3 font-mono text-xs [writing-mode:vertical-rl] rotate-180 md:px-0 md:py-3.5 md:text-sm md:[writing-mode:horizontal-tb] md:rotate-0 transition-colors duration-200 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    active ? "text-accent" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Theme toggle keeps its old top-right spot (not on detail pages, where it would cover the lightbox close button) */}
      {mounted && !isDetailPage && (
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="fixed top-3 right-4 z-40 flex items-center gap-2 border border-border bg-card px-3 py-1.5 font-mono text-xs text-foreground transition-all duration-200 hover:bg-secondary hover:text-accent hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          <span>{theme === "dark" ? "[☀]" : "[☾]"}</span>
          <span className="hidden sm:inline uppercase">{theme === "dark" ? "light" : "dark"}</span>
        </button>
      )}
    </>
  )
}
