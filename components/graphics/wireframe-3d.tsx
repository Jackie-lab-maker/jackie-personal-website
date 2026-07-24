"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "framer-motion"

type Vec3 = [number, number, number]
type Edge = [number, number]

interface Mesh {
  vertices: Vec3[]
  edges: Edge[]
}

export type WireframeShape = "robotArm" | "aircraft" | "globe" | "school" | "icosahedron" | "drone"

interface Wireframe3DProps {
  shape: WireframeShape
  /** Canvas size in CSS px (square). */
  size?: number
  /** Small mono caption rendered under the canvas, e.g. "> wireframe: gear.stl" */
  label?: string
  className?: string
}

const icosahedron = (): Mesh => {
  const p = (1 + Math.sqrt(5)) / 2
  const s = 1.25 / Math.sqrt(1 + p * p)
  const raw: Vec3[] = [
    [-1, p, 0], [1, p, 0], [-1, -p, 0], [1, -p, 0],
    [0, -1, p], [0, 1, p], [0, -1, -p], [0, 1, -p],
    [p, 0, -1], [p, 0, 1], [-p, 0, -1], [-p, 0, 1],
  ]
  const vertices = raw.map((v) => [v[0] * s, v[1] * s, v[2] * s] as Vec3)
  const edges: Edge[] = []
  const limit = (2 * s) ** 2 * 1.01
  for (let i = 0; i < vertices.length; i++) {
    for (let j = i + 1; j < vertices.length; j++) {
      const [a, b] = [vertices[i], vertices[j]]
      const d2 = (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2
      if (d2 <= limit) edges.push([i, j])
    }
  }
  return { vertices, edges }
}

const robotArm = (): Mesh => {
  const vertices: Vec3[] = []
  const edges: Edge[] = []

  const addCollar = (center: Vec3, r: number, seg = 10) => {
    const start = vertices.length
    for (let i = 0; i < seg; i++) {
      const a = (i / seg) * Math.PI * 2
      vertices.push([center[0] + r * Math.cos(a), center[1] + r * Math.sin(a), center[2]])
    }
    for (let i = 0; i < seg; i++) edges.push([start + i, start + ((i + 1) % seg)])
  }

  // rotating base plate
  const baseY = -0.95, baseR = 0.4, baseSeg = 8
  const baseRingStart = vertices.length
  for (let i = 0; i < baseSeg; i++) {
    const a = (i / baseSeg) * Math.PI * 2
    vertices.push([baseR * Math.cos(a), baseY, baseR * Math.sin(a)])
  }
  for (let i = 0; i < baseSeg; i++) edges.push([baseRingStart + i, baseRingStart + ((i + 1) % baseSeg)])

  const baseCenter = vertices.length
  vertices.push([0, baseY, 0])

  // articulated arm: base -> shoulder -> elbow -> wrist -> gripper, bending up and outward.
  // Each joint sweeps a different angle around the base axis (not just distance) so the
  // silhouette never collapses to a flat line at any yaw angle as the shape spins.
  const shoulder: Vec3 = [0, -0.55, 0]
  const elbow: Vec3 = [0.46 * Math.cos(0.33), 0.05, 0.46 * Math.sin(0.33)]
  const wrist: Vec3 = [0.72 * Math.cos(0.62), 0.48, 0.72 * Math.sin(0.62)]
  const gripperBase: Vec3 = [0.85 * Math.cos(0.72), 0.66, 0.85 * Math.sin(0.72)]

  const shoulderIdx = vertices.length
  vertices.push(shoulder)
  edges.push([baseCenter, shoulderIdx])
  addCollar(shoulder, 0.14)

  const elbowIdx = vertices.length
  vertices.push(elbow)
  edges.push([shoulderIdx, elbowIdx])
  addCollar(elbow, 0.12)

  const wristIdx = vertices.length
  vertices.push(wrist)
  edges.push([elbowIdx, wristIdx])
  addCollar(wrist, 0.1)

  const gripperBaseIdx = vertices.length
  vertices.push(gripperBase)
  edges.push([wristIdx, gripperBaseIdx])

  // tool-mount block at the wrist
  const [gx, gy, gz] = gripperBase
  const bs = 0.07
  const toolBase = vertices.length
  const toolCorners: [number, number][] = [[bs, bs], [bs, -bs], [-bs, -bs], [-bs, bs]]
  for (const y of [gy + bs, gy - bs]) {
    for (const [dx, dz] of toolCorners) vertices.push([gx + dx, y, gz + dz])
  }
  for (let i = 0; i < 4; i++) {
    edges.push([toolBase + i, toolBase + ((i + 1) % 4)])
    edges.push([toolBase + 4 + i, toolBase + 4 + ((i + 1) % 4)])
    edges.push([toolBase + i, toolBase + 4 + i])
  }

  // open two-finger gripper, with a small pad tick at each fingertip
  const tips: Vec3[] = [
    [gx + 0.32 * Math.cos(0.55), gy + 0.22, gz + 0.32 * Math.sin(0.55)],
    [gx + 0.32 * Math.cos(1.0), gy + 0.22, gz + 0.32 * Math.sin(1.0)],
  ]
  for (const tip of tips) {
    const tipIdx = vertices.length
    vertices.push(tip)
    edges.push([gripperBaseIdx, tipIdx])
    const padStart = vertices.length
    vertices.push([tip[0] - 0.05, tip[1] - 0.05, tip[2]], [tip[0] + 0.05, tip[1] - 0.05, tip[2]])
    edges.push([padStart, padStart + 1])
  }

  return { vertices, edges }
}

const school = (): Mesh => {
  const hw = 0.75, hd = 0.55
  const yBase = -0.75, yWall = 0.15, yRidge = 0.65
  const vertices: Vec3[] = []
  const edges: Edge[] = []

  // walls: base rectangle (0-3) + wall-top rectangle (4-7)
  const corners: [number, number][] = [[hw, hd], [hw, -hd], [-hw, -hd], [-hw, hd]]
  for (const y of [yBase, yWall]) {
    for (const [x, z] of corners) vertices.push([x, y, z])
  }
  for (let i = 0; i < 4; i++) {
    edges.push([i, (i + 1) % 4])
    edges.push([4 + i, 4 + ((i + 1) % 4)])
    edges.push([i, 4 + i])
  }

  // gable roof ridge (8 front, 9 back) + sloped roof panels
  const ridgeFront = vertices.length
  const ridgeBack = ridgeFront + 1
  vertices.push([0, yRidge, hd], [0, yRidge, -hd])
  edges.push([ridgeFront, ridgeBack])
  edges.push([4, ridgeFront], [7, ridgeFront], [5, ridgeBack], [6, ridgeBack])

  // front door
  const doorBase = vertices.length
  const doorTop = -0.15
  vertices.push([0.11, yBase, hd], [0.11, doorTop, hd], [-0.11, doorTop, hd], [-0.11, yBase, hd])
  for (let i = 0; i < 4; i++) edges.push([doorBase + i, doorBase + ((i + 1) % 4)])

  // front windows (right + left)
  for (const side of [1, -1]) {
    const wBase = vertices.length
    const x0 = side * 0.30, x1 = side * 0.54
    vertices.push([x0, -0.10, hd], [x0, -0.35, hd], [x1, -0.35, hd], [x1, -0.10, hd])
    for (let i = 0; i < 4; i++) edges.push([wBase + i, wBase + ((i + 1) % 4)])
  }

  // chimney
  const cx = 0.35, cz = -0.25, cs = 0.09
  const cyBot = 0.30, cyTop = 0.60
  const chimBase = vertices.length
  const chimCorners: [number, number][] = [[cx - cs, cz - cs], [cx + cs, cz - cs], [cx + cs, cz + cs], [cx - cs, cz + cs]]
  for (const y of [cyBot, cyTop]) {
    for (const [x, z] of chimCorners) vertices.push([x, y, z])
  }
  for (let i = 0; i < 4; i++) {
    edges.push([chimBase + i, chimBase + ((i + 1) % 4)])
    edges.push([chimBase + 4 + i, chimBase + 4 + ((i + 1) % 4)])
    edges.push([chimBase + i, chimBase + 4 + i])
  }

  // flagpole on the ridge
  const poleBase = vertices.length
  vertices.push([0, yRidge, 0], [0, yRidge + 0.35, 0], [0.15, yRidge + 0.35, 0], [0.15, yRidge + 0.22, 0])
  edges.push([poleBase, poleBase + 1], [poleBase + 1, poleBase + 2], [poleBase + 2, poleBase + 3], [poleBase + 3, poleBase + 1])

  return { vertices, edges }
}

const aircraft = (): Mesh => {
  const vertices: Vec3[] = [
    [1.35, 0, 0], // 0 nose
    [0.25, 0.18, 0], // 1 spine top
    [0.25, -0.14, 0], // 2 belly
    [0.25, 0.02, 0.18], // 3 starboard mid
    [0.25, 0.02, -0.18], // 4 port mid
    [-1.05, 0.08, 0], // 5 tail cone
    [0.4, 0.02, 0.14], [-0.15, 0.06, 1.25], [-0.42, 0.06, 1.18], [-0.05, 0.02, 0.14], // 6-9 starboard wing
    [0.4, 0.02, -0.14], [-0.15, 0.06, -1.25], [-0.42, 0.06, -1.18], [-0.05, 0.02, -0.14], // 10-13 port wing
    [-0.85, 0.08, 0.05], [-1.15, 0.1, 0.45], [-1.25, 0.1, 0.38], // 14-16 starboard stabilizer
    [-0.85, 0.08, -0.05], [-1.15, 0.1, -0.45], [-1.25, 0.1, -0.38], // 17-19 port stabilizer
    [-0.88, 0.1, 0], [-1.22, 0.55, 0], // 20-21 vertical stabilizer
  ]
  const edges: Edge[] = [
    [0, 1], [0, 2], [0, 3], [0, 4],
    [1, 5], [2, 5], [3, 5], [4, 5],
    [1, 3], [3, 2], [2, 4], [4, 1],
    [6, 7], [7, 8], [8, 9], [9, 6],
    [10, 11], [11, 12], [12, 13], [13, 10],
    [14, 15], [15, 16], [16, 14],
    [17, 18], [18, 19], [19, 17],
    [20, 21], [21, 5],
  ]
  return { vertices, edges }
}

const globe = (): Mesh => {
  const R = 1.2
  const seg = 20
  const vertices: Vec3[] = []
  const edges: Edge[] = []
  for (const lat of [-60, -30, 0, 30, 60]) {
    const phi = (lat * Math.PI) / 180
    const r = R * Math.cos(phi)
    const y = R * Math.sin(phi)
    const base = vertices.length
    for (let i = 0; i < seg; i++) {
      const a = (i / seg) * Math.PI * 2
      vertices.push([r * Math.cos(a), y, r * Math.sin(a)])
    }
    for (let i = 0; i < seg; i++) edges.push([base + i, base + ((i + 1) % seg)])
  }
  for (let k = 0; k < 4; k++) {
    const a = (k * Math.PI) / 4
    const base = vertices.length
    for (let i = 0; i < seg; i++) {
      const t = (i / seg) * Math.PI * 2
      vertices.push([R * Math.cos(t) * Math.cos(a), R * Math.sin(t), R * Math.cos(t) * Math.sin(a)])
    }
    for (let i = 0; i < seg; i++) edges.push([base + i, base + ((i + 1) % seg)])
  }
  return { vertices, edges }
}

const drone = (): Mesh => {
  const vertices: Vec3[] = []
  const edges: Edge[] = []

  // central hub
  const hx = 0.16, hy = 0.16, hz = 0.09
  const hubBase = vertices.length
  const hubCorners: [number, number][] = [[hx, hy], [-hx, hy], [-hx, -hy], [hx, -hy]]
  for (const z of [hz, -hz]) {
    for (const [x, y] of hubCorners) vertices.push([x, y, z])
  }
  for (let i = 0; i < 4; i++) {
    edges.push([hubBase + i, hubBase + ((i + 1) % 4)])
    edges.push([hubBase + 4 + i, hubBase + 4 + ((i + 1) % 4)])
    edges.push([hubBase + i, hubBase + 4 + i])
  }

  // 4 arms in X configuration, each ending in an enclosed propeller ring + landing leg
  const armLen = 1.05
  const propR = 0.4
  const propSeg = 12
  const legDrop = 0.35

  for (let k = 0; k < 4; k++) {
    const a = Math.PI / 4 + k * (Math.PI / 2)
    const ex = Math.cos(a) * armLen
    const ey = Math.sin(a) * armLen

    const armTop = vertices.length
    vertices.push([ex, ey, hz * 0.6])
    const armBot = vertices.length
    vertices.push([ex, ey, -hz * 0.6])
    edges.push([hubBase + k, armTop])
    edges.push([hubBase + 4 + k, armBot])
    edges.push([armTop, armBot])

    const ringBase = vertices.length
    for (let i = 0; i < propSeg; i++) {
      const t = (i / propSeg) * Math.PI * 2
      vertices.push([ex + propR * Math.cos(t), ey + propR * Math.sin(t), 0])
    }
    for (let i = 0; i < propSeg; i++) edges.push([ringBase + i, ringBase + ((i + 1) % propSeg)])
    edges.push([armTop, ringBase])
    edges.push([armBot, ringBase + Math.floor(propSeg / 2)])

    const legBot = vertices.length
    vertices.push([ex, ey, -hz * 0.6 - legDrop])
    edges.push([armBot, legBot])
  }

  return { vertices, edges }
}

const SHAPES: Record<WireframeShape, { build: () => Mesh; rotate: (t: number) => Vec3 }> = {
  icosahedron: { build: icosahedron, rotate: (t) => [0.35 + Math.sin(t * 0.4) * 0.15, t * 0.5, 0] },
  robotArm: { build: robotArm, rotate: (t) => [0.28 + Math.sin(t * 0.5) * 0.06, t * 0.35, 0] },
  aircraft: { build: aircraft, rotate: (t) => [0.3 + Math.sin(t * 0.5) * 0.08, t * 0.4, 0] },
  globe: { build: globe, rotate: (t) => [0.35, t * 0.35, 0] },
  school: { build: school, rotate: (t) => [0.32, t * 0.4, 0] },
  drone: { build: drone, rotate: (t) => [0.85, t * 0.45, 0.1] },
}

export function Wireframe3D({ shape, size = 130, label, className }: Wireframe3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { build, rotate } = SHAPES[shape]
    const mesh = build()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = size * dpr
    canvas.height = size * dpr

    const cx = (size * dpr) / 2
    const cy = (size * dpr) / 2
    const focal = size * dpr * 1.05
    const camDist = 3.4

    const draw = (elapsedSec: number) => {
      const [rx, ry, rz] = rotate(elapsedSec)
      const cosX = Math.cos(rx), sinX = Math.sin(rx)
      const cosY = Math.cos(ry), sinY = Math.sin(ry)
      const cosZ = Math.cos(rz), sinZ = Math.sin(rz)

      const projected: [number, number, number][] = mesh.vertices.map(([x0, y0, z0]) => {
        // rotate Z, then Y, then X
        const x1 = x0 * cosZ - y0 * sinZ
        const y1 = x0 * sinZ + y0 * cosZ
        const x2 = x1 * cosY + z0 * sinY
        const z2 = -x1 * sinY + z0 * cosY
        const y3 = y1 * cosX - z2 * sinX
        const z3 = y1 * sinX + z2 * cosX
        const depth = z3 + camDist
        return [cx + (x2 * focal) / depth, cy - (y3 * focal) / depth, z3]
      })

      const color = getComputedStyle(canvas).color
      ctx.clearRect(0, 0, size * dpr, size * dpr)
      ctx.lineWidth = 1.1 * dpr
      ctx.strokeStyle = color
      ctx.shadowColor = color
      ctx.shadowBlur = 5 * dpr

      let zMin = Infinity, zMax = -Infinity
      for (const [, , z] of projected) {
        if (z < zMin) zMin = z
        if (z > zMax) zMax = z
      }
      const zRange = Math.max(zMax - zMin, 1e-6)

      for (const [i, j] of mesh.edges) {
        const a = projected[i]
        const b = projected[j]
        const zAvg = (a[2] + b[2]) / 2
        // closer edges brighter — retro depth cue
        ctx.globalAlpha = 0.28 + 0.6 * (1 - (zAvg - zMin) / zRange)
        ctx.beginPath()
        ctx.moveTo(a[0], a[1])
        ctx.lineTo(b[0], b[1])
        ctx.stroke()
      }

      if (mesh.vertices.length <= 30) {
        ctx.globalAlpha = 0.45
        ctx.fillStyle = color
        for (const [x, y] of projected) ctx.fillRect(x - dpr, y - dpr, 2 * dpr, 2 * dpr)
      }
      ctx.globalAlpha = 1
    }

    // Always render one frame immediately so the graphic exists even
    // when the frame loop can't run (reduced motion, hidden tab).
    draw(0)

    if (reducedMotion) return

    let raf = 0
    let running = false
    const start = performance.now()
    const loop = (now: number) => {
      draw((now - start) / 1000)
      raf = requestAnimationFrame(loop)
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true
        raf = requestAnimationFrame(loop)
      } else if (!entry.isIntersecting && running) {
        running = false
        cancelAnimationFrame(raf)
      }
    })
    io.observe(canvas)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [shape, size, reducedMotion])

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        className="text-accent"
        style={{ width: size, height: size }}
        aria-hidden="true"
      />
      {label && (
        <div className="font-mono text-[10px] text-muted-foreground text-center mt-1 select-none" aria-hidden="true">
          {label}
        </div>
      )}
    </div>
  )
}
