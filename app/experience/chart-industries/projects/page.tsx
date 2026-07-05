"use client"

import Link from "next/link"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"

const PROJECTS: { title: string; description: string }[] = []

export default function ChartIndustriesProjectsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground font-mono">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Back button */}
        <Link
          href="/experience"
          className="inline-flex items-center gap-2 border border-border bg-card px-3 py-1.5 text-xs text-foreground hover:bg-secondary hover:text-accent transition-all mb-10"
        >
          &lt; Back to Experience
        </Link>

        {/* Header */}
        <Reveal variant="blur-up">
          <div className="font-mono text-accent mb-10 flex flex-col items-center">
            <pre className="text-xs md:text-sm">╔════════════════════════════════════════════════╗</pre>
            <pre className="text-xs md:text-sm font-bold">║ BAKER HUGHES (CHART INDUSTRIES) — PROJECTS ║</pre>
            <pre className="text-xs md:text-sm">╚════════════════════════════════════════════════╝</pre>
          </div>
        </Reveal>

        {/* Projects grid */}
        {PROJECTS.length === 0 ? (
          <Reveal delay={0.1}>
            <div className="border-2 border-border bg-card p-8 text-center hover-lift">
              <p className="text-muted-foreground text-sm">&gt; Projects coming soon...</p>
            </div>
          </Reveal>
        ) : (
          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROJECTS.map((project, index) => (
              <StaggerItem key={index} className="border-2 border-border bg-card hover:border-accent transition-all duration-300 p-6 hover-lift">
                <div className="text-accent text-xs mb-2">╔═════════════════════════════════╗</div>
                <h3 className="text-foreground font-bold text-sm md:text-base mb-2 pl-2">║ {project.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed pl-2">║ {project.description}</p>
                <div className="text-accent text-xs mt-2">╚═════════════════════════════════╝</div>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>
    </main>
  )
}
