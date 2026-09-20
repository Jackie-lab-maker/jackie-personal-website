"use client"

import Link from "next/link"
import Image from "next/image"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { Tilt3D } from "@/components/motion/tilt-3d"

const SUB_TEAMS = [
  { id: 1, src: "/images/watflight-project-management/team-mechanical.png", label: "Mechanical" },
  { id: 2, src: "/images/watflight-project-management/team-propulsion.png", label: "Propulsion" },
  { id: 3, src: "/images/watflight-project-management/team-software.png", label: "Software" },
  { id: 4, src: "/images/watflight-project-management/team-business.png", label: "Business" },
  { id: 5, src: "/images/watflight-project-management/team-electrical.png", label: "Electrical" },
]

export default function WATFlightProjectManagementPage() {
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
              <pre className="text-xs md:text-sm font-bold">║ WATFLIGHT LAUNCH CONTROL CENTER ║</pre>
              <pre className="text-xs md:text-sm">╚══════════════════════════════════════════════════════════════╝</pre>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              Completed — WATFlight, Founder &amp; Team Director
            </h1>
          </div>
          </Reveal>

          {/* Project Info Section */}
          <Reveal variant="tilt-up" delay={0.05}>
          <Tilt3D>
          <div className="border border-border bg-card p-6 mb-6 hover-lift">
            <div className="font-mono text-xs md:text-sm">
              <div className="text-accent mb-2">{">"} PROJECT_INFO</div>
              <p className="text-muted-foreground pl-4 leading-relaxed">
                A collaborative task-management platform built for the WATFlight design team at the
                University of Waterloo — a team dashboard plus a dedicated Kanban board for each sub-team,
                with realtime sync and role-based edit permissions.
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
                Designed and built the full stack: a Kanban board per sub-team (Backlog → To Do → In
                Progress → Review → Done) with drag-and-drop tasks, a team dashboard with productivity
                analytics and an upcoming-deadlines feed, Supabase-backed auth with realtime collaboration,
                and Postgres row-level security enforcing edit permissions server-side rather than just in
                the UI. Also built a member-approval gate and automated task-assignment email reminders.
              </p>
              <p className="text-accent pl-4 text-[11px] md:text-xs">
                Vite + React · Tailwind CSS · Supabase (Postgres, Auth, Realtime, Storage) · Resend · Vercel
              </p>
            </div>
          </div>
          </Tilt3D>
          </Reveal>

          {/* Sub-Teams Section */}
          <Reveal variant="blur-up">
          <div className="font-mono text-accent mb-6 flex flex-col items-center">
            <pre className="text-xs md:text-sm">╔════════════════════════════════════════════════╗</pre>
            <pre className="text-xs md:text-sm font-bold">║ SUB-TEAM BOARDS ║</pre>
            <pre className="text-xs md:text-sm">╚════════════════════════════════════════════════╝</pre>
          </div>
          </Reveal>

          <Stagger className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
            {SUB_TEAMS.map((team) => (
              <Tilt3D key={team.id} maxTilt={3}>
              <StaggerItem
                variant="swing-in"
                className="border border-border bg-black hover:border-accent transition-colors duration-300 overflow-hidden group"
              >
                <div className="relative aspect-square p-6">
                  <Image
                    src={team.src}
                    alt={`${team.label} sub-team icon`}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 33vw, 20vw"
                  />
                </div>
                <div className="p-2 font-mono text-[10px] md:text-xs text-center text-muted-foreground border-t border-border">
                  {team.label}
                </div>
              </StaggerItem>
              </Tilt3D>
            ))}
          </Stagger>

          <Reveal variant="fade" delay={0.1}>
          <div className="text-center">
            <a
              href="https://github.com/Jackie-lab-maker/watflight-project-management"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-mono text-xs text-accent hover:text-foreground transition-all duration-200 border border-border px-3 py-1 hover:bg-accent/10 hover:-translate-y-0.5 active:translate-y-0"
            >
              [view source →]
            </a>
          </div>
          </Reveal>
        </div>
      </div>
    </main>
  )
}
