"use client"

import { useState } from "react"
import Link from "next/link"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"

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

// Map company names to their detail page routes (use unique keys for multiple entries)
const EXPERIENCE_PAGES: Record<string, { route: string; projectsRoute: string; company: string; title?: string }> = {
  "Chart Industries": { route: "/experience/chart-industries", projectsRoute: "/experience/chart-industries/projects", company: "Chart Industries" },
  "OPmobility Manufacturing": { route: "/experience/opmobility-manufacturing", projectsRoute: "/experience/opmobility-manufacturing/projects", company: "OPmobility", title: "Manufacturing Engineering Intern" },
  "OPmobility Automation": { route: "/experience/opmobility-automation", projectsRoute: "/experience/opmobility-automation/projects", company: "OPmobility", title: "System Design & Automation Engineering Intern" },
  "WISA": { route: "/experience/wisa", projectsRoute: "/experience/wisa/projects", company: "Waterloo Institute for Sustainable Aeronautics" },
}

// Helper to match company and optionally title
const getExperiencePageKey = (company: string, title: string): string | null => {
  for (const [key, value] of Object.entries(EXPERIENCE_PAGES)) {
    if (company.includes(value.company)) {
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

  const getProjectsPage = (company: string, title: string): string | null => {
    const key = getExperiencePageKey(company, title)
    if (key) {
      return EXPERIENCE_PAGES[key].projectsRoute
    }
    return null
  }

  return (
    <section className="container mx-auto px-4 py-12" id="experience">
      <div className="max-w-4xl mx-auto">
        <Reveal variant="blur-up">
          <div className="font-mono text-accent mb-6 flex flex-col items-center">
            <pre className="text-xs md:text-sm">╔════════════════════════════════════════════════╗</pre>
            <pre className="text-xs md:text-sm font-bold">║ EXPERIENCE ║</pre>
            <pre className="text-xs md:text-sm">╚════════════════════════════════════════════════╝</pre>
          </div>
        </Reveal>

        <Stagger className="space-y-4">
          {data.work?.map((job, index) => {
            const detailPage = getExperiencePage(job.company, job.title)
            const projectsPage = getProjectsPage(job.company, job.title)

            return (
              <StaggerItem
                key={index}
                className="border border-border bg-card hover:border-accent transition-colors duration-300 hover-lift"
              >
                <div className="font-mono text-xs md:text-sm p-4 md:p-6">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1">
                      <div className="text-accent mb-1">╔═══ {job.company}</div>
                      <div className="text-foreground font-semibold pl-4">║ {job.title}</div>
                      <div className="text-muted-foreground pl-4 mt-1">╚═══ {job.years}</div>
                    </div>
                    <div className="flex flex-col items-stretch gap-2">
                      {detailPage ? (
                        <Link
                          href={detailPage}
                          className="font-mono text-xs text-accent hover:text-foreground transition-all duration-200 border border-border px-3 py-1 hover:bg-accent/10 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-ring text-center"
                        >
                          [view experience]
                        </Link>
                      ) : (
                        <button
                          onClick={() => toggleExpand(index)}
                          className="font-mono text-xs text-accent hover:text-foreground transition-all duration-200 border border-border px-3 py-1 hover:bg-accent/10 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-ring text-center"
                          aria-expanded={expandedIndex === index}
                          aria-controls={`experience-details-${index}`}
                        >
                          {expandedIndex === index ? "[hide]" : "[view experience]"}
                        </button>
                      )}
                      {projectsPage && (
                        <Link
                          href={projectsPage}
                          className="font-mono text-xs text-accent hover:text-foreground transition-all duration-200 border border-border px-3 py-1 hover:bg-accent/10 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-ring text-center"
                        >
                          [view projects →]
                        </Link>
                      )}
                    </div>
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
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
