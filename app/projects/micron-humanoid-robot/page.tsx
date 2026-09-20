"use client"

import Link from "next/link"
import Image from "next/image"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { Tilt3D } from "@/components/motion/tilt-3d"

export default function MicronHumanoidRobotPage() {
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

      {/* Base Platform Image */}
      <div className="relative w-full aspect-[3/2] max-h-96 bg-white">
        <Image
          src="/images/micron-humanoid-robot/alohamini-base.png"
          alt="AlohaMini open-source dual-arm mobile robot with motorized lift, the base platform for this project"
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
              <pre className="text-xs md:text-sm font-bold">║ HUMANOID PACKAGING ROBOT ║</pre>
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
                A dual-arm mobile robot for Micron&rsquo;s Robotics &amp; Manufacturing Automation team, built
                by modifying the open-source AlohaMini platform for a factory packaging task rather than
                its original teleoperation/research use case.
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
                At the output lot of the LPA (Line Packaging Automation) production line, the robot picks
                small boxes and packs them into a larger shipping box — automating a step currently done by
                hand. Work in progress: adapting the AlohaMini hardware/software stack (dual-arm
                manipulation, LeRobot-based control) to this pick-and-pack task.
              </p>
            </div>
          </div>
          </Tilt3D>
          </Reveal>

          {/* Base Platform / Citation Section */}
          <Reveal variant="blur-up">
          <div className="font-mono text-accent mb-6 flex flex-col items-center">
            <pre className="text-xs md:text-sm">╔════════════════════════════════════════════════╗</pre>
            <pre className="text-xs md:text-sm font-bold">║ BASE PLATFORM ║</pre>
            <pre className="text-xs md:text-sm">╚════════════════════════════════════════════════╝</pre>
          </div>
          </Reveal>

          <Stagger className="grid grid-cols-1">
            <Tilt3D>
            <StaggerItem
              variant="tilt-up"
              className="border border-border bg-card p-6 hover-lift"
            >
              <div className="font-mono text-xs md:text-sm">
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Built on top of{" "}
                  <a
                    href="https://github.com/liyiteng/AlohaMini/tree/main/software"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-foreground underline"
                  >
                    AlohaMini
                  </a>{" "}
                  by Li Yiteng and Wu Zhiyong — an open-source dual-arm mobile robot with a motorized lift,
                  released under the Apache-2.0 License. This project modifies AlohaMini&rsquo;s hardware
                  and LeRobot-based software stack for an industrial pick-and-pack application.
                </p>
                <a
                  href="https://github.com/liyiteng/AlohaMini/tree/main/software"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-mono text-xs text-accent hover:text-foreground transition-all duration-200 border border-border px-3 py-1 hover:bg-accent/10 hover:-translate-y-0.5 active:translate-y-0"
                >
                  [base project: liyiteng/AlohaMini →]
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
