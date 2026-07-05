"use client"

import { motion, useReducedMotion } from "framer-motion"
import DesignTeam from "@/components/design-team"
import Footer from "@/components/footer"

export default function DesignTeamPage() {
  const reducedMotion = useReducedMotion()

  return (
    <motion.main
      className="min-h-screen bg-background pt-20"
      initial={reducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <DesignTeam />
      <Footer />
    </motion.main>
  )
}
