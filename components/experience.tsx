"use client"

import { useState } from "react"
import Link from "next/link"

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

// Map company names to their detail page routes
const EXPERIENCE_PAGES: Record<string, { route: string; title?: string }> = {
  "Chart Industries": { route: "/experience/chart-industries" },
  "OPmobility": { route: "/experience/opmobility-manufacturing", title: "Manufacturing Controls Engineering Intern" },
}

// Helper to match company and optionally title
const getExperiencePageKey = (company: string, title: string): string | null => {
  for (const [key, value] of Object.entries(EXPERIENCE_PAGES)) {
    if (company.includes(key)) {
      if (value.title) {
        if (title.includes(value.title)) {
          return key
        }
      } else {
        return key
      }
    }
  }
  return null
}

export default function Experience({ data }: ExperienceProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const getExperiencePage = (company: string, title: string): string | null => {
    const key = getExperiencePageKey(company, title)
    if (key) {
      return EXPERIENCE_PAGES[key].route
    }
    return null
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
          {data.work?.map((job, index) => {
            const detailPage = getExperiencePage(job.company, job.title)
            
            return (
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
                    {detailPage ? (
                      <Link
                        href={detailPage}
                        className="font-mono text-xs text-accent hover:text-foreground transition-colors border border-border px-3 py-1 hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        [view experience]
                      </Link>
                    ) : (
                      <button
                        onClick={() => toggleExpand(index)}
                        className="font-mono text-xs text-accent hover:text-foreground transition-colors border border-border px-3 py-1 hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-ring"
                        aria-expanded={expandedIndex === index}
                        aria-controls={`experience-details-${index}`}
                      >
                        {expandedIndex === index ? "[hide]" : "[view experience]"}
                      </button>
                    )}
                  </div>
                  
                  {/* Expandable Description - only for entries without detail pages */}
                  {!detailPage && (
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
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
