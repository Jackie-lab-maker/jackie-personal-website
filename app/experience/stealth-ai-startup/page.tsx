"use client"

import Link from "next/link"
import Image from "next/image"
import { Reveal } from "@/components/motion/reveal"
import { Tilt3D } from "@/components/motion/tilt-3d"

export default function StealthAIStartupPage() {
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

      {/* Banner: company logo centered on black (logo is 200px at source, so it is shown at native size to stay sharp) */}
      <div className="relative w-full bg-black flex justify-center py-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.10),transparent_65%)]" />
        <Image
          src="/images/stealth-ai-startup/logo.jpg"
          alt="Stealth AI Startup logo"
          width={200}
          height={200}
          className="relative rounded-full ring-1 ring-white/20"
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
              <pre className="text-xs md:text-sm font-bold">║ STEALTH AI STARTUP ║</pre>
              <pre className="text-xs md:text-sm">╚══════════════════════════════════════════════════════════════╝</pre>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              Co-Founder and CEO
            </h1>
            <p className="text-muted-foreground text-sm">
              October 2026 - Present
            </p>
          </div>
          </Reveal>

          {/* Role Section */}
          <Reveal variant="tilt-up" delay={0.05}>
          <Tilt3D>
          <div className="border border-border bg-card p-6 hover-lift">
            <div className="font-mono text-xs md:text-sm">
              <div className="text-accent mb-2">{">"} ROLE</div>
              <p className="text-muted-foreground pl-4 leading-relaxed">
                Co-founder and CEO of an AI startup that is still in stealth. Details are not public yet and
                will be added here once the company launches.
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
