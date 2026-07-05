"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion"

interface Tilt3DProps {
  children: React.ReactNode
  className?: string
  /** Max rotation in degrees when the pointer reaches a card edge. */
  maxTilt?: number
  /** transformPerspective in px — higher = flatter, subtler. */
  perspective?: number
  /** Scale while hovered. Keep 1 for text-heavy cards so glyphs stay crisp. */
  hoverScale?: number
}

// Critically damped: snappy, no bounce — fits the terminal aesthetic.
const SPRING = { stiffness: 300, damping: 30, mass: 0.6 }

export function Tilt3D({
  children,
  className,
  maxTilt = 3.5,
  perspective = 900,
  hoverScale = 1,
}: Tilt3DProps) {
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const rectRef = useRef<DOMRect | null>(null)
  // Only enable on devices with a real hover pointer (mouse/trackpad).
  const [canHover, setCanHover] = useState(false)

  // Normalized pointer position within the card, 0..1 (0.5 = rest).
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const hovered = useMotionValue(0)

  // "Pressed toward the cursor": the edge under the pointer recedes.
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), SPRING)
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), SPRING)
  const scale = useSpring(useTransform(hovered, [0, 1], [1, hoverScale]), SPRING)

  useEffect(() => {
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)")
    const update = () => setCanHover(mql.matches)
    update()
    mql.addEventListener("change", update)
    return () => mql.removeEventListener("change", update)
  }, [])

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  const handlePointerEnter = () => {
    if (!canHover) return
    rectRef.current = ref.current?.getBoundingClientRect() ?? null
    hovered.set(1)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canHover) return
    const rect = rectRef.current
    if (!rect || rect.width === 0 || rect.height === 0) return
    px.set(Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1))
    py.set(Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1))
  }

  const handlePointerLeave = () => {
    px.set(0.5)
    py.set(0.5)
    hovered.set(0)
    rectRef.current = null
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, scale, transformPerspective: perspective }}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
    >
      {children}
    </motion.div>
  )
}
