import Image from "next/image"
import Link from "next/link"
import { Reveal } from "@/components/motion/reveal"
import { Tilt3D } from "@/components/motion/tilt-3d"
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
        <Tilt3D>
        <Link href="/projects/cryogenics-systems-modeling" className="block">
        <div className="border-2 border-border bg-card hover:border-accent transition-all duration-300 hover-lift overflow-hidden">
          <div className="relative aspect-video">
            <Image
              src="/images/cryogenics-systems-modeling/lng-isometric-view-1.png"
              alt="Isometric view of an LNG cryogenic storage tank"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
          <div className="font-mono p-6 md:p-8">
            <div className="text-accent text-xs md:text-sm mb-2">╔═════════════════════════════════╗</div>
            <h3 className="text-foreground font-bold text-sm md:text-base mb-1 pl-2">║ Cryogenics Systems Modeling</h3>
            <p className="text-accent text-xs mb-2 pl-2">║ Completed — Baker Hughes (Chart Industries)</p>
            <p className="text-muted-foreground text-xs leading-relaxed mb-3 pl-2">
              ║ Designed 3D models of LNG cryogenic storage tanks and industrial bulk cryogenic tanks in
              SolidWorks, including external piping layouts and section views for clear engineering
              visualization.
            </p>
            <div className="text-accent text-xs md:text-sm mb-2">╚═════════════════════════════════╝</div>
            <span className="inline-block font-mono text-xs text-accent border border-border px-3 py-1">
              [view project →]
            </span>
          </div>
        </div>
        </Link>
        </Tilt3D>
        </Reveal>

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
