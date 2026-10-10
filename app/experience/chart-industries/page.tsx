"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { Tilt3D } from "@/components/motion/tilt-3d"

const GALLERY_ITEMS = [
  {
    id: 1,
    src: "/images/chart-industries/chart-facility.jpg",
    alt: "Row of Chart-branded bulk cryogenic storage tanks at a Chart Industries facility",
    description: "Photo courtesy of Chart Industries — bulk cryogenic storage tanks at a Chart facility.",
  },
  {
    id: 2,
    src: "/images/chart-industries/baker-hughes-lng-facility.webp",
    alt: "LNG facility at dusk with storage tanks and process piping",
    description: "Photo courtesy of Baker Hughes — an LNG production facility.",
  },
  {
    id: 3,
    src: "/images/chart-industries/vip-piping.jpg",
    alt: "Close-up of Chart Industries vacuum insulated cryogenic pipe",
    description: "Photo courtesy of Chart Industries — vacuum insulated (vacuum jacketed) cryogenic pipe.",
  },
  {
    id: 4,
    src: "/images/chart-industries/bulk-tank-closeup.jpg",
    alt: "Close-up view of a Chart Industries bulk cryogenic storage tank",
    description: "Photo courtesy of Chart Industries — a close-up of a bulk storage tank.",
  },
  {
    id: 5,
    src: "/images/chart-industries/hydrogen-test-site.jpg",
    alt: "Aerial view of a Chart Industries hydrogen test site with cryogenic trailers and storage tanks",
    description: "Photo courtesy of Chart Industries — a hydrogen test site with cryogenic storage and trailers.",
  },
  {
    id: 6,
    src: "/images/chart-industries/baker-hughes-refinery.webp",
    alt: "Technicians working among piping at a Baker Hughes refinery and petrochemical plant",
    description: "Photo courtesy of Baker Hughes — technicians at a downstream refinery and petrochemical plant.",
  },
]

export default function ChartIndustriesPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const reducedMotion = useReducedMotion()

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/experience"
            className="font-mono text-xs text-accent hover:text-foreground transition-colors inline-flex items-center gap-2 border border-border px-3 py-2 hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Navigate back to portfolio page"
            role="button"
          >
            <span aria-hidden="true">{"<"}</span>
            <span>Back to Portfolio</span>
          </Link>
        </div>
      </header>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <Reveal variant="blur-up">
          <div className="font-mono text-center mb-12">
            {/* Company Logos */}
            <div className="flex justify-center items-center gap-6 md:gap-10 mb-6">
              <div className="relative w-36 h-20 md:w-48 md:h-24">
                <Image
                  src="/images/chart-industries/chart-logo.png"
                  alt="Chart Industries Logo"
                  fill
                  className="object-contain dark:invert"
                  sizes="(max-width: 768px) 144px, 192px"
                  priority
                />
              </div>
              <div className="relative w-36 h-20 md:w-48 md:h-24 rounded-lg overflow-hidden">
                <Image
                  src="/images/chart-industries/baker-hughes-logo.jpg"
                  alt="Baker Hughes Logo"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 144px, 192px"
                  priority
                />
              </div>
            </div>
            <div className="text-accent mb-4 flex flex-col items-center">
              <pre className="text-xs md:text-sm">╔══════════════════════════════════════════════════════════════╗</pre>
              <pre className="text-xs md:text-sm font-bold">║ BAKER HUGHES (CHART INDUSTRIES, INC.) ║</pre>
              <pre className="text-xs md:text-sm">╚══════════════════════════════════════════════════════════════╝</pre>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              Mechanical Engineering Intern
            </h1>
            <p className="text-muted-foreground text-sm">
              Dec 2025 - Mar 2026
            </p>
          </div>
          </Reveal>

          {/* Company Info Section */}
          <Reveal variant="tilt-up" delay={0.05}>
          <Tilt3D>
          <div className="border border-border bg-card p-6 mb-6 hover-lift">
            <div className="font-mono text-xs md:text-sm">
              <div className="text-accent mb-2">{">"} COMPANY_INFO</div>
              <p className="text-muted-foreground pl-4 leading-relaxed">
                Chart Industries, Inc. (NYSE: GTLS) is a global leader in the design, engineering, and
                manufacturing of process technologies and equipment for gas and liquid molecule handling
                — including cryogenic bulk storage tanks, transport trailers, and liquefaction systems for
                hydrogen, LNG, and industrial gases. In 2025, Baker Hughes, a global industrial technology
                company operating in 120+ countries under the tagline &ldquo;Rewriting The Energy
                Equation™,&rdquo; agreed to acquire Chart in a $13.6 billion deal aimed at building fully
                integrated energy solutions from extraction to storage.
              </p>
              <div className="flex flex-wrap gap-2 mt-3 pl-4">
                <a
                  href="https://www.chartindustries.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-mono text-xs text-accent hover:text-foreground transition-all duration-200 border border-border px-3 py-1 hover:bg-accent/10 hover:-translate-y-0.5 active:translate-y-0"
                >
                  [visit chartindustries.com →]
                </a>
                <a
                  href="https://www.bakerhughes.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-mono text-xs text-accent hover:text-foreground transition-all duration-200 border border-border px-3 py-1 hover:bg-accent/10 hover:-translate-y-0.5 active:translate-y-0"
                >
                  [visit bakerhughes.com →]
                </a>
              </div>
            </div>
          </div>
          </Tilt3D>
          </Reveal>

          {/* Gallery Section */}
          <Reveal variant="blur-up">
          <div className="font-mono text-accent mb-6 flex flex-col items-center">
            <pre className="text-xs md:text-sm">╔════════════════════════════════════════════════╗</pre>
            <pre className="text-xs md:text-sm font-bold">║ PHOTO GALLERY ║</pre>
            <pre className="text-xs md:text-sm">╚════════════════════════════════════════════════╝</pre>
          </div>
          </Reveal>

          {/* Masonry Grid */}
          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GALLERY_ITEMS.map((item) => (
              <Tilt3D key={item.id} maxTilt={3}>
              <StaggerItem
                variant="swing-in"
                className="border border-border bg-card hover:border-accent transition-colors duration-300 overflow-hidden group hover-lift"
              >
                {/* Image Container */}
                <div 
                  className="relative aspect-[4/3] cursor-pointer overflow-hidden"
                  onClick={() => setSelectedImage(item.id)}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="font-mono text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 px-3 py-1">
                      [click to enlarge]
                    </span>
                  </div>
                </div>
                
                {/* Description Area */}
                <div className="p-4 font-mono text-xs md:text-sm">
                  <div className="text-accent mb-2">{">"} IMAGE_{item.id.toString().padStart(2, "0")}</div>
                  <p className="text-muted-foreground pl-4 italic">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
              </Tilt3D>
            ))}
          </Stagger>

          {/* Placeholder for more images */}
          <div className="mt-6 border border-dashed border-border p-8 text-center">
            <p className="font-mono text-xs text-muted-foreground">
              {"// More images coming soon..."}
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            className="absolute top-4 right-4 font-mono text-white hover:text-accent transition-colors text-sm"
            onClick={() => setSelectedImage(null)}
            aria-label="Close lightbox"
          >
            [close]
          </button>
          <motion.div
            className="relative max-w-5xl max-h-[90vh] w-full h-full"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.96, rotateX: 5, transformPerspective: 1200 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, transformPerspective: 1200 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={GALLERY_ITEMS.find((item) => item.id === selectedImage)?.src || ""}
              alt={GALLERY_ITEMS.find((item) => item.id === selectedImage)?.alt || ""}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </motion.div>
        </motion.div>
      )}
    </main>
  )
}
