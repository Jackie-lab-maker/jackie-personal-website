"use client"

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion"

export function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const reducedMotion = useReducedMotion()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-accent z-[60] origin-left"
      style={{ scaleX: reducedMotion ? scrollYProgress : scaleX }}
      aria-hidden="true"
    />
  )
}
