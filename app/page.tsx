"use client"

import { useEffect, useState } from "react"
import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import DesignTeam from "@/components/design-team"
import Skills from "@/components/skills"
import Education from "@/components/education"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { LoadingScreen } from "@/components/loading-screen"
import { ScrollIndicator } from "@/components/scroll-indicator"

interface ResumeData {
  main: any
  resume: any
  portfolio: any
}

export default function Page() {
  const [data, setData] = useState<ResumeData | null>(null)
  const [showLoading, setShowLoading] = useState(true)
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    // Check if loading screen was already shown in this session
    const hasSeenLoading = sessionStorage.getItem("hasSeenLoading")
    if (hasSeenLoading === "true") {
      setShowLoading(false)
    }

    fetch("/resumeData.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json)
        setDataLoaded(true)
      })
      .catch((err) => console.error("[v0] Failed to load resume data:", err))
  }, [])

  const handleLoadingComplete = () => {
    if (dataLoaded) {
      sessionStorage.setItem("hasSeenLoading", "true")
      setShowLoading(false)
    }
  }

  if (showLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />
  }

  if (!data) {
    return null
  }

  return (
    <main className="min-h-screen bg-background">
      <ScrollIndicator />
      <Hero data={data.main} />
      <About data={data.main} />
      <Projects data={data.portfolio} />
      <Experience data={data.resume} />
      <DesignTeam />
      <Skills data={data.resume} />
      <Education data={data.resume} />
      <Contact data={data.main} />
      <Footer />
    </main>
  )
}
