"use client"

import { motion, useReducedMotion } from "framer-motion"
import Projects from "@/components/projects"
import Footer from "@/components/footer"
import { useResumeData } from "@/hooks/use-resume-data"

export default function ProjectsPage() {
  const data = useResumeData()
  const reducedMotion = useReducedMotion()

  if (!data) return null

  return (
    <motion.main
      className="min-h-screen bg-background pt-20"
      style={{ transformOrigin: "top center" }}
      initial={reducedMotion ? false : { opacity: 0, y: 8, rotateX: 2, transformPerspective: 1400 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, transformPerspective: 1400 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Projects data={data.portfolio} />
      <Footer />
    </motion.main>
  )
}
