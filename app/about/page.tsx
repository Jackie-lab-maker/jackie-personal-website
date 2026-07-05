"use client"

import { motion, useReducedMotion } from "framer-motion"
import About from "@/components/about"
import Footer from "@/components/footer"
import { useResumeData } from "@/hooks/use-resume-data"

export default function AboutPage() {
  const data = useResumeData()
  const reducedMotion = useReducedMotion()

  if (!data) return null

  return (
    <motion.main
      className="min-h-screen bg-background pt-20"
      initial={reducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <About data={data.main} />
      <Footer />
    </motion.main>
  )
}
