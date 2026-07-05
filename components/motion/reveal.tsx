"use client"

import type React from "react"
import { motion, useReducedMotion, type Variants } from "framer-motion"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const VIEWPORT = { once: true, margin: "-60px" } as const

type RevealVariant = "fade-up" | "fade" | "scale" | "blur-up" | "tilt-up" | "swing-in"

const variantDefs: Record<RevealVariant, { hidden: object; visible: object }> = {
  "fade-up": {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
  },
  "blur-up": {
    hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  "tilt-up": {
    hidden: { opacity: 0, y: 24, rotateX: 8, transformPerspective: 900 },
    visible: { opacity: 1, y: 0, rotateX: 0, transformPerspective: 900 },
  },
  "swing-in": {
    hidden: { opacity: 0, x: -16, rotateY: 12, transformPerspective: 900 },
    visible: { opacity: 1, x: 0, rotateY: 0, transformPerspective: 900 },
  },
}

interface RevealProps {
  children: React.ReactNode
  variant?: RevealVariant
  delay?: number
  duration?: number
  className?: string
}

export function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.6,
  className,
}: RevealProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  const def = variantDefs[variant]

  return (
    <motion.div
      className={className}
      initial={def.hidden}
      whileInView={def.visible}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}

const staggerContainer = (staggerDelay: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: staggerDelay },
  },
})

const staggerItemVariants: Record<RevealVariant, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
  },
  "blur-up": {
    hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: EASE },
    },
  },
  "tilt-up": {
    hidden: { opacity: 0, y: 24, rotateX: 8, transformPerspective: 900 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transformPerspective: 900,
      transition: { duration: 0.6, ease: EASE },
    },
  },
  "swing-in": {
    hidden: { opacity: 0, x: -16, rotateY: 12, transformPerspective: 900 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transformPerspective: 900,
      transition: { duration: 0.6, ease: EASE },
    },
  },
}

export function Stagger({ children, className, staggerDelay = 0.08 }: StaggerProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={staggerContainer(staggerDelay)}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: React.ReactNode
  variant?: RevealVariant
  className?: string
}

export function StaggerItem({ children, variant = "fade-up", className }: StaggerItemProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div className={className} variants={staggerItemVariants[variant]}>
      {children}
    </motion.div>
  )
}
