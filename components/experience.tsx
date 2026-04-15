"use client"

import { useState } from "react"

interface ExperienceProps {
  data: {
    work: Array<{
      company: string
      title: string
      years: string
      description?: string
    }>
  }
}

export default function Experience({ data }: ExperienceProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

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
                  <button
                    onClick={() => toggleExpand(index)}
                    className="font-mono text-xs text-accent hover:text-foreground transition-colors border border-border px-3 py-1 hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-ring"
                    aria-expanded={expandedIndex === index}
                    aria-controls={`experience-details-${index}`}
                  >
                    {expandedIndex === index ? "[hide]" : "[view experience]"}
                  </button>
                </div>
                
                {/* Expandable Description */}
                <div
                  id={`experience-details-${index}`}
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedIndex === index ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="border-t border-border pt-4 pl-4">
                    <div className="text-muted-foreground italic">
                      <span className="text-accent">{">"}</span> Details coming soon...
                    </div>
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
