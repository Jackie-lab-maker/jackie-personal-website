"use client"

import Link from "next/link"
import Image from "next/image"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { Tilt3D } from "@/components/motion/tilt-3d"

export default function WATFlightPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/experience"
            className="font-mono text-xs text-accent hover:text-foreground transition-colors inline-flex items-center gap-2 border border-border px-3 py-2 hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Navigate back to portfolio page"
            role="button"
          >
            <span aria-hidden="true">{"<"}</span>
            <span>Back to Portfolio</span>
          </Link>
        </div>
      </header>

      {/* WATFlight Wordmark Banner */}
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
              <pre className="text-xs md:text-sm font-bold">║ WATFLIGHT ║</pre>
              <pre className="text-xs md:text-sm">╚══════════════════════════════════════════════════════════════╝</pre>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              Co-Founder &amp; Team Director
            </h1>
            <p className="text-muted-foreground text-sm">
              April 2026 - Present
            </p>
          </div>
          </Reveal>

          {/* Company Info Section */}
          <Reveal variant="tilt-up" delay={0.05}>
          <Tilt3D>
          <div className="border border-border bg-card p-6 mb-6 hover-lift">
            <div className="font-mono text-xs md:text-sm">
              <div className="text-accent mb-2">{">"} COMPANY_INFO</div>
              <p className="text-muted-foreground pl-4 leading-relaxed">
                WATFlight is the University of Waterloo&rsquo;s student design team focused on sustainable
                aviation. I co-founded the team and direct it, working across its Mechanical, Electrical, and
                Software sub-teams.
              </p>
              <div className="flex flex-wrap gap-2 mt-3 pl-4">
                <a
                  href="https://watflight.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-mono text-xs text-accent hover:text-foreground transition-all duration-200 border border-border px-3 py-1 hover:bg-accent/10 hover:-translate-y-0.5 active:translate-y-0"
                >
                  [visit watflight.com →]
                </a>
              </div>
            </div>
          </div>
          </Tilt3D>
          </Reveal>

          {/* Projects Section */}
          <Reveal variant="tilt-up" delay={0.1}>
          <Tilt3D>
          <div className="border border-border bg-card p-6 mb-12 hover-lift">
            <div className="font-mono text-xs md:text-sm">
              <div className="text-accent mb-2">{">"} PROJECTS</div>
              <p className="text-muted-foreground pl-4 leading-relaxed mb-3">
                GV-01, the team&rsquo;s sustainable aviation vehicle (early stage, writing the Engineering
                Design Specification), and the Launch Control Center, a task-management platform built for
                the team.
              </p>
              <Stagger className="flex flex-wrap gap-2 pl-4">
                <StaggerItem variant="tilt-up">
                  <Link
                    href="/projects/watflight-gv-01"
                    className="inline-block font-mono text-xs text-accent hover:text-foreground transition-all duration-200 border border-border px-3 py-1 hover:bg-accent/10 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    [GV-01 →]
                  </Link>
                </StaggerItem>
                <StaggerItem variant="tilt-up">
                  <Link
                    href="/projects/watflight-project-management"
                    className="inline-block font-mono text-xs text-accent hover:text-foreground transition-all duration-200 border border-border px-3 py-1 hover:bg-accent/10 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    [Launch Control Center →]
                  </Link>
                </StaggerItem>
              </Stagger>
            </div>
          </div>
          </Tilt3D>
          </Reveal>

          {/* Gallery Section: photos to be added */}
          <Reveal variant="blur-up">
          <div className="font-mono text-accent mb-6 flex flex-col items-center">
            <pre className="text-xs md:text-sm">╔════════════════════════════════════════════════╗</pre>
            <pre className="text-xs md:text-sm font-bold">║ PHOTO GALLERY ║</pre>
            <pre className="text-xs md:text-sm">╚════════════════════════════════════════════════╝</pre>
          </div>
          </Reveal>

          <div className="border border-dashed border-border p-8 text-center">
            <p className="font-mono text-xs text-muted-foreground">
              {"// Photos coming soon..."}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
