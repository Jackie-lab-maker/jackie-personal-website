"use client"

import Link from "next/link"
import Image from "next/image"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { Tilt3D } from "@/components/motion/tilt-3d"

export default function AutomationDigitalBrainPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/projects"
            className="font-mono text-xs text-accent hover:text-foreground transition-colors inline-flex items-center gap-2 border border-border px-3 py-2 hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Navigate back to projects page"
            role="button"
          >
            <span aria-hidden="true">{"<"}</span>
            <span>Back to Projects</span>
          </Link>
        </div>
      </header>

      {/* Micron logo banner (official vector logo, crisp at any size) */}
      <div className="w-full bg-black flex justify-center py-12">
        <div className="relative w-[320px] h-[69px]">
          <Image
            src="/images/micron-logo/micron-logo-white.svg"
            alt="Micron logo"
            fill
            className="object-contain"
            sizes="320px"
            priority
          />
        </div>
      </div>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <Reveal variant="blur-up">
          <div className="font-mono text-center mb-12">
            <div className="text-accent mb-4 flex flex-col items-center">
              <pre className="text-xs md:text-sm">╔══════════════════════════════════════════════════════════════╗</pre>
              <pre className="text-xs md:text-sm font-bold">║ AUTOMATION DIGITAL BRAIN ║</pre>
              <pre className="text-xs md:text-sm">╚══════════════════════════════════════════════════════════════╝</pre>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-yellow-500 mb-2">
              [IN PROGRESS]
            </h1>
            <p className="text-muted-foreground text-sm">
              Micron Technology — Robotics &amp; Manufacturing Automation Team
            </p>
          </div>
          </Reveal>

          {/* Project Info Section */}
          <Reveal variant="tilt-up" delay={0.05}>
          <Tilt3D>
          <div className="border border-border bg-card p-6 mb-6 hover-lift">
            <div className="font-mono text-xs md:text-sm">
              <div className="text-accent mb-2">{">"} PROJECT_INFO</div>
              <p className="text-muted-foreground pl-4 leading-relaxed">
                An operational source-of-truth web app for the team: project execution, controlled
                engineering knowledge, and an AI assistant agent in one governed home. The goal is a single
                unified tool that replaces having to check across all the team&rsquo;s other separate
                software, using AI to surface what matters.
              </p>
            </div>
          </div>
          </Tilt3D>
          </Reveal>

          {/* Description Section */}
          <Reveal variant="tilt-up" delay={0.1}>
          <Tilt3D>
          <div className="border border-border bg-card p-6 mb-12 hover-lift">
            <div className="font-mono text-xs md:text-sm">
              <div className="text-accent mb-2">{">"} PROJECT_OVERVIEW</div>
              <p className="text-muted-foreground pl-4 leading-relaxed mb-3">
                Built the frontend prototype — a home dashboard, a searchable project portfolio, per-project
                workspaces (KPIs, timeline, risks, vendor, files), a knowledge hub, and portfolio analytics —
                with an AI agent panel present on every screen. Currently connecting that agent panel to
                real agent logic rather than a mocked conversation, the next step toward a working backend.
              </p>
              <p className="text-accent pl-4 text-[11px] md:text-xs">
                Next.js · React · TypeScript · Tailwind CSS · Vercel
              </p>
            </div>
          </div>
          </Tilt3D>
          </Reveal>

          {/* Links Section */}
          <Reveal variant="fade" delay={0.1}>
          <Stagger className="flex flex-wrap justify-center gap-3">
            <StaggerItem variant="tilt-up">
              <a
                href="https://project-management-software-ruby.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-mono text-xs text-accent hover:text-foreground transition-all duration-200 border border-border px-3 py-1 hover:bg-accent/10 hover:-translate-y-0.5 active:translate-y-0"
              >
                [live demo →]
              </a>
            </StaggerItem>
            <StaggerItem variant="tilt-up">
              <a
                href="https://github.com/Jackie-lab-maker/project-management-software"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-mono text-xs text-accent hover:text-foreground transition-all duration-200 border border-border px-3 py-1 hover:bg-accent/10 hover:-translate-y-0.5 active:translate-y-0"
              >
                [view source →]
              </a>
            </StaggerItem>
          </Stagger>
          </Reveal>
        </div>
      </div>
    </main>
  )
}
