import { Reveal } from "@/components/motion/reveal"
import { Wireframe3D } from "@/components/graphics/wireframe-3d"

export default function Projects() {
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

        <Reveal variant="tilt-up" delay={0.1}>
          <div className="border border-dashed border-border p-12 text-center">
            <p className="font-mono text-xs md:text-sm text-muted-foreground">
              {"// Project display incoming..."}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
