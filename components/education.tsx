import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"

interface EducationProps {
  data: {
    education: Array<{
      school: string
      degree: string
      graduated: string
      description: string
    }>
  }
}

export default function Education({ data }: EducationProps) {
  return (
    <section className="container mx-auto px-4 py-12" id="education">
      <div className="max-w-4xl mx-auto">
        <Reveal variant="blur-up">
          <div className="font-mono text-accent mb-6 flex flex-col items-center">
            <pre className="text-xs md:text-sm">╔════════════════════════════════════════════════╗</pre>
            <pre className="text-xs md:text-sm font-bold">║ EDUCATION ║</pre>
            <pre className="text-xs md:text-sm">╚════════════════════════════════════════════════╝</pre>
          </div>
        </Reveal>

        <Stagger className="space-y-4">
          {data.education?.map((edu, index) => (
            <StaggerItem
              key={index}
              className="border-2 border-border bg-card p-6 md:p-8 hover:border-accent transition-colors duration-300 hover-lift"
            >
              <div className="font-mono text-xs md:text-sm space-y-2">
                <div className="text-accent">┌─ INSTITUTION ────────────────────┐</div>
                <div className="text-foreground font-bold pl-2">{edu.school}</div>
                <div className="text-accent">├─ DEGREE ────────────────────────┤</div>
                <div className="text-foreground pl-2">{edu.degree}</div>
                <div className="text-accent">├─ GRADUATION ────────────────────┤</div>
                <div className="text-muted-foreground pl-2">{edu.graduated}</div>
                <div className="text-accent">└──────────────────────────────────┘</div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
