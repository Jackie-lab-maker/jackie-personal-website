"use client"

import { useEffect, useState } from "react"

export interface ResumeData {
  main: any
  resume: any
  portfolio: any
}

export function useResumeData() {
  const [data, setData] = useState<ResumeData | null>(null)

  useEffect(() => {
    fetch("/resumeData.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("[v0] Failed to load resume data:", err))
  }, [])

  return data
}
