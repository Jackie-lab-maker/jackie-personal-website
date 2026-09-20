import Image from "next/image"
import Link from "next/link"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { Tilt3D } from "@/components/motion/tilt-3d"
import { Wireframe3D } from "@/components/graphics/wireframe-3d"

const PROJECTS = [
  {
    href: "/projects/micron-humanoid-robot",
    image: "/images/micron-humanoid-robot/alohamini-base.png",
    imageAlt: "AlohaMini open-source dual-arm mobile robot, the base platform for this project",
    title: "Humanoid Packaging Robot",
    status: "In Progress — Micron Technology, Robotics & Manufacturing Automation",
    inProgress: true,
    about:
      "Modifying the open-source AlohaMini dual-arm mobile robot to pack small boxes into a larger shipping box at the output lot of the LPA production line.",
  },
  {
    href: "/projects/cryogenics-systems-modeling",
    image: "/images/cryogenics-systems-modeling/lng-isometric-view-1.png",
    imageAlt: "Isometric view of an LNG cryogenic storage tank",
    title: "Cryogenics Systems Modeling",
    status: "Completed — Baker Hughes (Chart Industries)",
    about:
      "Designed 3D models of LNG cryogenic storage tanks and industrial bulk cryogenic tanks in SolidWorks, plus a TRIFLEX pipe stress analysis on the bulk tank's internal piping.",
  },
  {
    href: "/projects/design-of-tooling",
    image: "/images/design-of-tooling/jig-assembled.jpg",
    imageAlt: "Assembled drill jig for guiding consistent hole locations",
    title: "Design of Tooling (Jigs & Fixtures)",
    status: "Completed — University of Waterloo Engineering Workshop",
    about:
      "Designed a jig with spring-loaded hold-down clamps (DFA) and a fixture with single-motion clamping (DFM) in SolidWorks, reducing manufacturing cost by 10%.",
  },
  {
    href: "/projects/watflight-project-management",
    image: "/images/watflight-project-management/wordmark-banner.png",
    imageAlt: "WATFlight wordmark logo",
    title: "WATFlight Launch Control Center",
    status: "Built for WATFlight — Founder & Team Director",
    about:
      "Full-stack task-management platform for the WATFlight design team: a Kanban board per sub-team with drag-and-drop, realtime Supabase-backed collaboration, and row-level security.",
  },
]

export default function Projects() {
  return (
    <section className="container mx-auto px-4 py-12" id="projects">
      <div className="max-w-4xl mx-auto">
        <Reveal variant="fade">
          <div className="flex justify-center mb-4">
            <Wireframe3D shape="gear" label="> wireframe: gear.stl" />
          </div>
        </Reveal>

        <Reveal variant="blur-up">
          <div className="font-mono text-accent mb-6 flex flex-col items-center">
            <pre className="text-xs md:text-sm">╔════════════════════════════════════════════════╗</pre>
            <pre className="text-xs md:text-sm font-bold">║ PROJECTS ║</pre>
            <pre className="text-xs md:text-sm">╚════════════════════════════════════════════════╝</pre>
          </div>
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-6">
          {PROJECTS.map((project) => (
            <Tilt3D key={project.href}>
            <StaggerItem variant="tilt-up">
            <Link href={project.href} className="block">
            <div className="border-2 border-border bg-card hover:border-accent transition-all duration-300 hover-lift overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
              <div className="font-mono p-6 md:p-8">
                <div className="text-accent text-xs md:text-sm mb-2">╔═════════════════════════════════╗</div>
                <h3 className="text-foreground font-bold text-sm md:text-base mb-1 pl-2">║ {project.title}</h3>
                <p className={`text-xs mb-2 pl-2 ${project.inProgress ? "text-yellow-500" : "text-accent"}`}>
                  ║ {project.status}
                </p>
                <p className="text-muted-foreground text-xs leading-relaxed mb-3 pl-2">║ {project.about}</p>
                <div className="text-accent text-xs md:text-sm mb-2">╚═════════════════════════════════╝</div>
                <span className="inline-block font-mono text-xs text-accent border border-border px-3 py-1">
                  [view project →]
                </span>
              </div>
            </div>
            </Link>
            </StaggerItem>
            </Tilt3D>
          ))}
        </Stagger>

        <Reveal variant="tilt-up" delay={0.15}>
          <div className="mt-6 border border-dashed border-border p-8 text-center">
            <p className="font-mono text-xs md:text-sm text-muted-foreground">
              {"// More projects coming soon..."}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
