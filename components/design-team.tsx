import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { Tilt3D } from "@/components/motion/tilt-3d"
import { Wireframe3D } from "@/components/graphics/wireframe-3d"

const designTeams = [
  {
    name: "WATFlight",
    role: "Team Director & Propulsion Lead",
    description: "University of Waterloo's student design team that focus on sustainable aviation.",
    url: "https://watflight.com/",
  },
]

export default function DesignTeam() {
  return (
    <section className="container mx-auto px-4 py-12" id="design-team">
      <div className="max-w-4xl mx-auto">
        <Reveal variant="fade">
          <div className="flex justify-center mb-4">
            <Wireframe3D shape="aircraft" size={150} label="> wireframe: aircraft.stl" />
          </div>
        </Reveal>

        <Reveal variant="blur-up">
          <div className="font-mono text-accent mb-6 flex flex-col items-center">
            <pre className="text-xs md:text-sm">╔════════════════════════════════════════════════╗</pre>
            <pre className="text-xs md:text-sm font-bold">║ DESIGN TEAM ║</pre>
            <pre className="text-xs md:text-sm">╚════════════════════════════════════════════════╝</pre>
          </div>
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-4">
          {designTeams.map((team, index) => (
            <Tilt3D key={index}>
            <StaggerItem
              variant="tilt-up"
              className="border-2 border-border bg-card hover:border-accent transition-all duration-300 group hover-lift"
            >
              <div className="font-mono p-6 md:p-8">
                <div className="text-accent text-xs md:text-sm mb-2">╔═════════════════════════════════╗</div>
                <h3 className="text-foreground font-bold text-sm md:text-base mb-1 pl-2">║ {team.name}</h3>
                <p className="text-accent text-xs mb-2 pl-2">║ {team.role}</p>
                <p className="text-muted-foreground text-xs leading-relaxed mb-3 pl-2">║ {team.description}</p>
                <div className="text-accent text-xs md:text-sm mb-2">╚═════════════════════════════════╝</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <a
                    href={team.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block font-mono text-xs text-accent hover:text-foreground transition-all duration-200 border border-border px-3 py-1 hover:bg-accent/10 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    [visit team →]
                  </a>
                </div>
              </div>
            </StaggerItem>
            </Tilt3D>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
