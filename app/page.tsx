"use client"

import { useEffect, useState } from "react"
import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Education from "@/components/education"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

interface ResumeData {
  main: any
  resume: any
  portfolio: any
}

export default function Page() {
  const [data, setData] = useState<ResumeData | null>(null)

  useEffect(() => {
    fetch("/resumeData.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("[v0] Failed to load resume data:", err))
  }, [])

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="font-mono text-sm text-accent animate-pulse">
          <pre className="text-center">
            {`╔════════════════╗
║   LOADING...   ║
╚════════════════╝`}
          </pre>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Hero data={data.main} />
      <About data={data.main} />
      <Experience data={data.resume} />
      <Projects data={data.portfolio} />
      <Skills data={data.resume} />
      <Education data={data.resume} />
      <Contact data={data.main} />
      <Footer />
    </main>
  )
}
