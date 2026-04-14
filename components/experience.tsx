interface ExperienceProps {
  data: {
    work: Array<{
      company: string
      title: string
      years: string
    }>
  }
}

export default function Experience({ data }: ExperienceProps) {
  return (
    <section className="container mx-auto px-4 py-12" id="experience">
      <div className="max-w-4xl mx-auto">
        <div className="font-mono text-accent mb-6 flex flex-col items-center">
          <pre className="text-xs md:text-sm">╔════════════════════════════════════════════════╗</pre>
          <pre className="text-xs md:text-sm font-bold">║ EXPERIENCE ║</pre>
          <pre className="text-xs md:text-sm">╚════════════════════════════════════════════════╝</pre>
        </div>

        <div className="space-y-4">
          {data.work?.map((job, index) => (
            <div
              key={index}
              className="border border-border bg-card hover:border-accent transition-colors duration-300"
            >
              <div className="font-mono text-xs md:text-sm p-4 md:p-6">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1">
                    <div className="text-accent mb-1">╔═══ {job.company}</div>
                    <div className="text-foreground font-semibold pl-4">║ {job.title}</div>
                    <div className="text-muted-foreground pl-4 mt-1">╚═══ {job.years}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
