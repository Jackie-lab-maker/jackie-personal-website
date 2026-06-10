const designTeams = [
  {
    name: "WATFlight",
    role: "Team Lead",
    description: "University of Waterloo's competitive design team focused on unmanned aerial vehicles and drone systems.",
    url: "https://watflight.com/",
  },
  {
    name: "Waterloo Rocketry",
    role: "Propulsion Team Member",
    description: "Student-run design team building and launching high-powered rockets, competing in the Spaceport America Cup.",
    url: "https://www.waterloorocketry.com/",
  },
]

export default function DesignTeam() {
  return (
    <section className="container mx-auto px-4 py-12" id="design-team">
      <div className="max-w-5xl mx-auto">
        <div className="font-mono text-accent mb-6 flex flex-col items-center">
          <pre className="text-xs md:text-sm">╔════════════════════════════════════════════════╗</pre>
          <pre className="text-xs md:text-sm font-bold">║ DESIGN TEAM ║</pre>
          <pre className="text-xs md:text-sm">╚════════════════════════════════════════════════╝</pre>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {designTeams.map((team, index) => (
            <div
              key={index}
              className="border-2 border-border bg-card hover:border-accent transition-all duration-300 group"
            >
              <div className="font-mono p-4 md:p-6">
                <div className="text-accent text-xs md:text-sm mb-2">╔═════════════════════════════════╗</div>
                <h3 className="text-foreground font-bold text-sm md:text-base mb-1 pl-2">║ {team.name}</h3>
                <p className="text-accent text-xs mb-2 pl-2">║ {team.role}</p>
                <p className="text-muted-foreground text-xs leading-relaxed mb-3 pl-2">║ {team.description}</p>
                <div className="text-accent text-xs md:text-sm mb-2">╚═════════════════════════════════╝</div>
                <a
                  href={team.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-mono text-xs text-accent hover:text-foreground transition-colors border border-border px-3 py-1 mt-2 hover:bg-accent/10"
                >
                  [visit team →]
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
