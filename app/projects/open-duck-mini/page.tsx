"use client"

import Link from "next/link"
import Image from "next/image"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { Tilt3D } from "@/components/motion/tilt-3d"

const REPO_URL = "https://github.com/apirrone/Open_Duck_Mini"

export default function OpenDuckMiniPage() {
  return (
    <main className="min-h-screen bg-background">
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

      <div className="relative w-full h-96 md:h-[32rem] bg-black">
        <Image
          src="/images/open-duck-mini/duck.png"
          alt="Open Duck Mini, a miniature 3D-printed BDX droid with glowing eyes standing on a workbench"
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <Reveal variant="blur-up">
          <div className="font-mono text-center mb-12">
            <div className="text-accent mb-4 flex flex-col items-center">
              <pre className="text-xs md:text-sm">╔══════════════════════════════════════════════════════════════╗</pre>
              <pre className="text-xs md:text-sm font-bold">║ OPEN DUCK MINI ║</pre>
              <pre className="text-xs md:text-sm">╚══════════════════════════════════════════════════════════════╝</pre>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-yellow-500 mb-2">
              [IN PROGRESS]
            </h1>
            <p className="text-muted-foreground text-sm">Personal Project</p>
          </div>
          </Reveal>

          <Reveal variant="tilt-up" delay={0.05}>
          <Tilt3D>
          <div className="border border-border bg-card p-6 mb-6 hover-lift">
            <div className="font-mono text-xs md:text-sm">
              <div className="text-accent mb-2">{">"} PROJECT_INFO</div>
              <p className="text-muted-foreground pl-4 leading-relaxed">
                A miniature version of Disney&rsquo;s BDX droid: a roughly 42 cm tall, 3D-printed bipedal
                robot with a full bill of materials under $400, trained to walk with reinforcement learning
                and transferred from simulation to the real robot.
              </p>
            </div>
          </div>
          </Tilt3D>
          </Reveal>

          <Reveal variant="tilt-up" delay={0.1}>
          <Tilt3D>
          <div className="border border-border bg-card p-6 mb-12 hover-lift">
            <div className="font-mono text-xs md:text-sm">
              <div className="text-accent mb-2">{">"} PROJECT_OVERVIEW</div>
              <p className="text-muted-foreground pl-4 leading-relaxed">
                Work in progress: building my own Open Duck Mini from the open-source design.
              </p>
            </div>
          </div>
          </Tilt3D>
          </Reveal>

          <Reveal variant="blur-up">
          <div className="font-mono text-accent mb-6 flex flex-col items-center">
            <pre className="text-xs md:text-sm">╔════════════════════════════════════════════════╗</pre>
            <pre className="text-xs md:text-sm font-bold">║ BASE PROJECT ║</pre>
            <pre className="text-xs md:text-sm">╚════════════════════════════════════════════════╝</pre>
          </div>
          </Reveal>

          <Stagger className="grid grid-cols-1">
            <Tilt3D>
            <StaggerItem variant="tilt-up" className="border border-border bg-card p-6 hover-lift">
              <div className="font-mono text-xs md:text-sm">
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Based on{" "}
                  <a
                    href={REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-foreground underline"
                  >
                    Open Duck Mini
                  </a>{" "}
                  by apirrone and contributors, released under the Apache-2.0 License. Photo from the
                  original repository.
                </p>
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-mono text-xs text-accent hover:text-foreground transition-all duration-200 border border-border px-3 py-1 hover:bg-accent/10 hover:-translate-y-0.5 active:translate-y-0"
                >
                  [base project: apirrone/Open_Duck_Mini →]
                </a>
              </div>
            </StaggerItem>
            </Tilt3D>
          </Stagger>
        </div>
      </div>
    </main>
  )
}
