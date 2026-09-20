"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "framer-motion"

type Vec3 = [number, number, number]
type Edge = [number, number]

interface Mesh {
  vertices: Vec3[]
  edges: Edge[]
}

export type WireframeShape = "chip" | "aircraft" | "globe" | "gradCap" | "icosahedron" | "drone" | "gear"

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

const chip = (): Mesh => {
  const hw = 0.6, hd = 0.6, ht = 0.1
  const vertices: Vec3[] = []
  const edges: Edge[] = []

  // chip body (thin box)
  const bodyCorners: [number, number][] = [[hw, hd], [hw, -hd], [-hw, -hd], [-hw, hd]]
  for (const y of [ht, -ht]) {
    for (const [x, z] of bodyCorners) vertices.push([x, y, z])
  }
  for (let i = 0; i < 4; i++) {
    edges.push([i, (i + 1) % 4])
    edges.push([4 + i, 4 + ((i + 1) % 4)])
    edges.push([i, 4 + i])
  }

  // gull-wing pins on all 4 sides
  const pinsPerSide = 4
  const pinOut = 0.18
  const pinDrop = 0.15
  const spread = 0.42
  type Side = { axis: "x" | "z"; sign: 1 | -1 }
  const sides: Side[] = [
    { axis: "x", sign: 1 },
    { axis: "x", sign: -1 },
    { axis: "z", sign: 1 },
    { axis: "z", sign: -1 },
  ]
  for (const { axis, sign } of sides) {
    for (let i = 0; i < pinsPerSide; i++) {
      const t = (i / (pinsPerSide - 1) - 0.5) * spread
      const attach = vertices.length
      const tip = attach + 1
      const bend = attach + 2
      if (axis === "x") {
        vertices.push([sign * hw, 0, t], [sign * (hw + pinOut), 0, t], [sign * (hw + pinOut), -pinDrop, t])
      } else {
        vertices.push([t, 0, sign * hd], [t, 0, sign * (hd + pinOut)], [t, -pinDrop, sign * (hd + pinOut)])
      }
      edges.push([attach, tip], [tip, bend])
    }
  }

  // pin-1 index mark (small X) near one corner of the top face
  const nx = -hw + 0.15, nz = hd - 0.15, ns = 0.06
  const markBase = vertices.length
  vertices.push([nx - ns, ht, nz - ns], [nx + ns, ht, nz + ns], [nx - ns, ht, nz + ns], [nx + ns, ht, nz - ns])
  edges.push([markBase, markBase + 1], [markBase + 2, markBase + 3])

  // die outline inset on the top face
  const dw = 0.3
  const dieBase = vertices.length
  const dieCorners: [number, number][] = [[dw, dw], [dw, -dw], [-dw, -dw], [-dw, dw]]
  for (const [x, z] of dieCorners) vertices.push([x, ht, z])
  for (let i = 0; i < 4; i++) edges.push([dieBase + i, dieBase + ((i + 1) % 4)])

  return { vertices, edges }
}

const gradCap = (): Mesh => {
  const vertices: Vec3[] = []
  const edges: Edge[] = []

  // flat square mortarboard, with both diagonals for a bit of surface detail
  const yBoard = 0.15, sw = 0.85
  const boardStart = vertices.length
  vertices.push([sw, yBoard, sw], [sw, yBoard, -sw], [-sw, yBoard, -sw], [-sw, yBoard, sw])
  for (let i = 0; i < 4; i++) edges.push([boardStart + i, boardStart + ((i + 1) % 4)])
  edges.push([boardStart, boardStart + 2], [boardStart + 1, boardStart + 3])

  const centerIdx = vertices.length
  vertices.push([0, yBoard, 0])

  // skull cap band beneath the board
  const rBase = 0.32, capSeg = 10
  const capTopY = -0.02, capBotY = -0.42
  const capTopStart = vertices.length
  for (let i = 0; i < capSeg; i++) {
    const a = (i / capSeg) * Math.PI * 2
    vertices.push([rBase * Math.cos(a), capTopY, rBase * Math.sin(a)])
  }
  const capBotStart = vertices.length
  for (let i = 0; i < capSeg; i++) {
    const a = (i / capSeg) * Math.PI * 2
    vertices.push([rBase * Math.cos(a), capBotY, rBase * Math.sin(a)])
  }
  for (let i = 0; i < capSeg; i++) {
    edges.push([capTopStart + i, capTopStart + ((i + 1) % capSeg)])
    edges.push([capBotStart + i, capBotStart + ((i + 1) % capSeg)])
    if (i % 2 === 0) edges.push([capTopStart + i, capBotStart + i])
  }

  // center post connecting the board to the cap
  edges.push([centerIdx, capTopStart])

  // button + tassel cord hanging to one side, ending in a fringe
  const buttonIdx = vertices.length
  vertices.push([0, yBoard + 0.06, 0])
  edges.push([centerIdx, buttonIdx])

  const cordEndIdx = vertices.length
  const cordEnd: Vec3 = [sw * 0.75, yBoard - 0.4, sw * 0.55]
  vertices.push(cordEnd)
  edges.push([buttonIdx, cordEndIdx])

  const fringeDirs: [number, number][] = [[-0.08, -0.05], [-0.03, 0.02], [0.03, 0.03], [0.08, -0.02], [0, -0.08]]
  for (const [dx, dz] of fringeDirs) {
    const tipIdx = vertices.length
    vertices.push([cordEnd[0] + dx, cordEnd[1] - 0.18, cordEnd[2] + dz])
    edges.push([cordEndIdx, tipIdx])
  }

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

const gear = (): Mesh => {
  const vertices: Vec3[] = []
  const edges: Edge[] = []

  const teeth = 12
  const rOuter = 1.0
  const rRoot = 0.78
  const rHub = 0.32
  const ht = 0.18

  // gear profile: root -> rising edge -> tip -> falling edge -> root, per tooth
  const profile: [number, number][] = []
  for (let i = 0; i < teeth; i++) {
    const a0 = (i / teeth) * Math.PI * 2
    const step = (Math.PI * 2) / teeth
    profile.push([a0, rRoot])
    profile.push([a0 + step * 0.15, rOuter])
    profile.push([a0 + step * 0.5, rOuter])
    profile.push([a0 + step * 0.65, rRoot])
  }

  const n = profile.length
  const frontBase = vertices.length
  for (const [a, r] of profile) vertices.push([r * Math.cos(a), r * Math.sin(a), ht])
  const backBase = vertices.length
  for (const [a, r] of profile) vertices.push([r * Math.cos(a), r * Math.sin(a), -ht])
  for (let i = 0; i < n; i++) {
    edges.push([frontBase + i, frontBase + ((i + 1) % n)])
    edges.push([backBase + i, backBase + ((i + 1) % n)])
    if (i % 2 === 0) edges.push([frontBase + i, backBase + i])
  }

  // center hub (front + back rings)
  const hubSeg = 12
  const hubFrontBase = vertices.length
  for (let i = 0; i < hubSeg; i++) {
    const a = (i / hubSeg) * Math.PI * 2
    vertices.push([rHub * Math.cos(a), rHub * Math.sin(a), ht])
  }
  const hubBackBase = vertices.length
  for (let i = 0; i < hubSeg; i++) {
    const a = (i / hubSeg) * Math.PI * 2
    vertices.push([rHub * Math.cos(a), rHub * Math.sin(a), -ht])
  }
  for (let i = 0; i < hubSeg; i++) {
    edges.push([hubFrontBase + i, hubFrontBase + ((i + 1) % hubSeg)])
    edges.push([hubBackBase + i, hubBackBase + ((i + 1) % hubSeg)])
    edges.push([hubFrontBase + i, hubBackBase + i])
  }

  // spokes connecting the hub to the root circle
  const spokeCount = 4
  for (let k = 0; k < spokeCount; k++) {
    const a = (k / spokeCount) * Math.PI * 2
    const hubIdx = hubFrontBase + Math.round((a / (Math.PI * 2)) * hubSeg) % hubSeg
    const rimIdx = vertices.length
    vertices.push([rRoot * Math.cos(a), rRoot * Math.sin(a), ht])
    edges.push([hubIdx, rimIdx])
  }

  return { vertices, edges }
}

const SHAPES: Record<WireframeShape, { build: () => Mesh; rotate: (t: number) => Vec3 }> = {
  icosahedron: { build: icosahedron, rotate: (t) => [0.35 + Math.sin(t * 0.4) * 0.15, t * 0.5, 0] },
  chip: { build: chip, rotate: (t) => [0.5, t * 0.4, 0] },
  aircraft: { build: aircraft, rotate: (t) => [0.3 + Math.sin(t * 0.5) * 0.08, t * 0.4, 0] },
  globe: { build: globe, rotate: (t) => [0.35, t * 0.35, 0] },
  gradCap: { build: gradCap, rotate: (t) => [0.45, t * 0.4, 0] },
  drone: { build: drone, rotate: (t) => [0.85, t * 0.45, 0.1] },
  gear: { build: gear, rotate: (t) => [0.55, t * 0.4, 0] },
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
