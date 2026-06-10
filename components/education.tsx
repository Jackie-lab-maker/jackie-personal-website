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
        <div className="font-mono text-accent mb-6 flex flex-col items-center">
          <pre className="text-xs md:text-sm">╔════════════════════════════════════════════════╗</pre>
          <pre className="text-xs md:text-sm font-bold">║ EDUCATION ║</pre>
          <pre className="text-xs md:text-sm">╚════════════════════════════════════════════════╝</pre>
        </div>

        <div className="space-y-4">
          {data.education?.map((edu, index) => (
            <div
              key={index}
              className="border-2 border-border bg-card p-6 md:p-8 hover:border-accent transition-colors duration-300"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
