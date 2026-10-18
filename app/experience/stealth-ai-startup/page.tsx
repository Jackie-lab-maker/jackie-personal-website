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

      {/* Banner: cover image (752px wide at source, so it is capped at native width to stay sharp) */}
      <div className="w-full bg-black flex justify-center px-4 py-8">
        <div className="relative w-full max-w-[752px] aspect-[752/127]">
          <Image
            src="/images/stealth-ai-startup/banner.jpg"
            alt="Stealth AI Startup banner: a laptop, a head with a gear and circuits, a robot arm and a chip drawn in white line art"
            fill
            className="object-cover"
            sizes="(max-width: 752px) 100vw, 752px"
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
              <pre className="text-xs md:text-sm font-bold">║ STEALTH AI STARTUP ║</pre>
              <pre className="text-xs md:text-sm">╚══════════════════════════════════════════════════════════════╝</pre>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              Founding Engineer
            </h1>
            <p className="text-muted-foreground text-sm">
              Present
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
                Founding engineer at an AI startup that is still in stealth. Details are not public yet and
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
