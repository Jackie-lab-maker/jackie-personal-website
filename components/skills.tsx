interface SkillsProps {
  data: {
    skills: Array<{
      name: string
      level: string
    }>
  }
}

export default function Skills({ data }: SkillsProps) {
  return (
    <section className="container mx-auto px-4 py-12" id="skills">
      <div className="max-w-4xl mx-auto">
        <div className="font-mono text-accent mb-6 flex flex-col items-center">
          <pre className="text-xs md:text-sm">╔════════════════════════════════════════════════╗</pre>
          <pre className="text-xs md:text-sm font-bold">║ SKILLS ║</pre>
          <pre className="text-xs md:text-sm">╚════════════════════════════════════════════════╝</pre>
        </div>

        <div className="border-2 border-border bg-card p-6 md:p-8 hover:border-accent transition-colors duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.skills?.map((skill, index) => (
              <div key={index} className="font-mono text-xs md:text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-accent">▸</span>
                  <span className="text-foreground">{skill.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
