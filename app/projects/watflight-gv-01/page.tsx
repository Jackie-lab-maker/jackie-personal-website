"use client"

import Link from "next/link"
import Image from "next/image"
import { Reveal } from "@/components/motion/reveal"
import { Tilt3D } from "@/components/motion/tilt-3d"

export default function WATFlightGV01Page() {
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

      {/* Wordmark Banner */}
      <div className="relative w-full aspect-[16/9] max-h-96 bg-black">
        <Image
          src="/images/watflight-project-management/wordmark-banner.png"
          alt="WATFlight wordmark logo"
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
      </div>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <Reveal variant="blur-up">
          <div className="font-mono text-center mb-12">
            <div className="text-accent mb-4 flex flex-col items-center">
              <pre className="text-xs md:text-sm">╔══════════════════════════════════════════════════════════════╗</pre>
              <pre className="text-xs md:text-sm font-bold">║ GV-01 ║</pre>
              <pre className="text-xs md:text-sm">╚══════════════════════════════════════════════════════════════╝</pre>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-yellow-500 mb-2">
              [IN PROGRESS — EARLY STAGE]
            </h1>
            <p className="text-muted-foreground text-sm">
              WATFlight — Co-Founder &amp; Team Director
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
                GV-01 is a WATFlight vehicle project for sustainable aviation, currently being built by the
                Mechanical, Electrical, and Software sub-teams of WATFlight, the student design team I
                co-founded and direct.
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
              <p className="text-muted-foreground pl-4 leading-relaxed">
                Very early stage — currently writing the Engineering Design Specification (EDS) document
                that will drive the rest of the design. No hardware or detailed design work yet; this page
                will be updated as GV-01 moves past the specification phase.
              </p>
            </div>
          </div>
          </Tilt3D>
          </Reveal>
        </div>
      </div>
    </main>
  )
}
