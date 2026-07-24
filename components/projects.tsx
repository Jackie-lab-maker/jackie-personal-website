import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { Tilt3D } from "@/components/motion/tilt-3d"
import { Wireframe3D } from "@/components/graphics/wireframe-3d"

interface ProjectsProps {
  data: {
    projects: Array<{
      title: string
      about: string
      url: string
      image?: string
    }>
  }
}

export default function Projects({ data }: ProjectsProps) {
  return (
    <section className="container mx-auto px-4 py-12" id="projects">
      <div className="max-w-4xl mx-auto">
        <Reveal variant="fade">
          <div className="flex justify-center mb-4">
            <Wireframe3D shape="drone" label="> wireframe: quadcopter.stl" />
          </div>
        </Reveal>

        <Reveal variant="blur-up">
          <div className="font-mono text-accent mb-6 flex flex-col items-center">
            <pre className="text-xs md:text-sm">╔════════════════════════════════════════════════╗</pre>
            <pre className="text-xs md:text-sm font-bold">║ PROJECTS ║</pre>
            <pre className="text-xs md:text-sm">╚════════════════════════════════════════════════╝</pre>
          </div>
        </Reveal>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.projects?.map((project, index) => (
            <Tilt3D key={index}>
              <StaggerItem
                variant="tilt-up"
                className="border-2 border-border bg-card hover:border-accent transition-colors duration-300 hover-lift h-full"
              >
                <div className="font-mono p-4 md:p-6 flex flex-col h-full">
                  <div className="text-accent text-xs md:text-sm mb-2">╔═════════════════════════════════╗</div>
                  <h3 className="text-foreground font-bold text-sm md:text-base mb-2 pl-2">║ {project.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-3 pl-2 flex-1">║ {project.about}</p>
                  <div className="text-accent text-xs md:text-sm mb-2">╚═════════════════════════════════╝</div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-fit font-mono text-xs text-accent hover:text-foreground transition-all duration-200 border border-border px-3 py-1 mt-2 hover:bg-accent/10 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    [view project →]
                  </a>
                </div>
              </StaggerItem>
            </Tilt3D>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
