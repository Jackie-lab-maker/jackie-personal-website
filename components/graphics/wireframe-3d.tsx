"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "framer-motion"

type Vec3 = [number, number, number]
type Edge = [number, number]

interface Mesh {
  vertices: Vec3[]
  edges: Edge[]
}

export type WireframeShape = "gear" | "aircraft" | "globe" | "atom" | "icosahedron" | "drone"

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

const gear = (): Mesh => {
  const teeth = 8
  const rOut = 1.28
  const rIn = 0.96
  const rHole = 0.42
  const h = 0.2
  const step = (Math.PI * 2) / teeth
  const profile: [number, number][] = []
  for (let i = 0; i < teeth; i++) {
    const a = i * step
    profile.push([rIn, a], [rIn, a + step * 0.18], [rOut, a + step * 0.3], [rOut, a + step * 0.6], [rIn, a + step * 0.72])
  }
  const vertices: Vec3[] = []
  const edges: Edge[] = []
  const n = profile.length
  for (const z of [h, -h]) {
    for (const [r, a] of profile) vertices.push([r * Math.cos(a), r * Math.sin(a), z])
  }
  for (let i = 0; i < n; i++) {
    edges.push([i, (i + 1) % n])
    edges.push([n + i, n + ((i + 1) % n)])
    // vertical edges only on tooth flanks so the wireframe stays readable
    if (i % 5 === 2 || i % 5 === 3) edges.push([i, n + i])
  }
  const hn = 12
  const base = vertices.length
  for (const z of [h, -h]) {
    for (let i = 0; i < hn; i++) {
      const a = (i / hn) * Math.PI * 2
      vertices.push([rHole * Math.cos(a), rHole * Math.sin(a), z])
    }
  }
  for (let i = 0; i < hn; i++) {
    edges.push([base + i, base + ((i + 1) % hn)])
    edges.push([base + hn + i, base + hn + ((i + 1) % hn)])
    if (i % 3 === 0) edges.push([base + i, base + hn + i])
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

const atom = (): Mesh => {
  const vertices: Vec3[] = []
  const edges: Edge[] = []
  const seg = 26
  const R = 1.25
  const tilt = (72 * Math.PI) / 180
  // three orbital rings, each tilted then spun 60° apart around Y
  for (let k = 0; k < 3; k++) {
    const spin = (k * Math.PI) / 3
    const base = vertices.length
    for (let i = 0; i < seg; i++) {
      const t = (i / seg) * Math.PI * 2
      const x = R * Math.cos(t)
      const z = R * Math.sin(t)
      const y1 = -z * Math.sin(tilt)
      const z1 = z * Math.cos(tilt)
      const x2 = x * Math.cos(spin) + z1 * Math.sin(spin)
      const z2 = -x * Math.sin(spin) + z1 * Math.cos(spin)
      vertices.push([x2, y1, z2])
    }
    for (let i = 0; i < seg; i++) edges.push([base + i, base + ((i + 1) % seg)])
  }
  // electrons: a small diamond marker on each ring
  for (let k = 0; k < 3; k++) {
    const [ex, ey, ez] = vertices[k * seg + ((k * 9 + 3) % seg)]
    const s = 0.08
    const b = vertices.length
    vertices.push([ex + s, ey, ez], [ex, ey + s, ez], [ex - s, ey, ez], [ex, ey - s, ez])
    edges.push([b, b + 1], [b + 1, b + 2], [b + 2, b + 3], [b + 3, b])
  }
  // nucleus: small octahedron
  const r = 0.22
  const nb = vertices.length
  const oct: Vec3[] = [[r, 0, 0], [-r, 0, 0], [0, r, 0], [0, -r, 0], [0, 0, r], [0, 0, -r]]
  for (const v of oct) vertices.push(v)
  const octEdges: Edge[] = [[0, 2], [0, 3], [0, 4], [0, 5], [1, 2], [1, 3], [1, 4], [1, 5], [2, 4], [4, 3], [3, 5], [5, 2]]
  for (const [a, c] of octEdges) edges.push([nb + a, nb + c])
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
  gear: { build: gear, rotate: (t) => [1.0, 0.3, t * 0.6] },
  aircraft: { build: aircraft, rotate: (t) => [0.3 + Math.sin(t * 0.5) * 0.08, t * 0.4, 0] },
  globe: { build: globe, rotate: (t) => [0.35, t * 0.35, 0] },
  atom: { build: atom, rotate: (t) => [0.3 + Math.sin(t * 0.4) * 0.12, t * 0.55, 0] },
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
