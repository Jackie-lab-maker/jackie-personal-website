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
    src: "/images/opmobility/kuka-controller.png",
    alt: "KUKA robot teach pendant displaying KRL programming code",
    description: "Description coming soon...",
  },
  {
    id: 2,
    src: "/images/opmobility/kuka-robot.png",
    alt: "KUKA industrial robot arm in manufacturing cell",
    description: "Description coming soon...",
  },
  {
    id: 3,
    src: "/images/opmobility/hydrogen-tank.png",
    alt: "Composite hydrogen pressure vessel with filament winding",
    description: "Description coming soon...",
  },
  {
    id: 4,
    src: "/images/opmobility-manufacturing/manufacturing-line.jpg",
    alt: "Automated OPmobility manufacturing line handling a fuel tank with robotic gripper tooling",
    description: "Photo courtesy of OPmobility — automated tooling on a manufacturing line.",
  },
]

export default function OPmobilityManufacturingPage() {
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

      {/* OPmobility Banner */}
      <div className="relative w-full h-32 md:h-48 overflow-hidden">
        <Image
          src="/images/opmobility/opmobility-banner.jpeg"
          alt="OPmobility - Always on the Move"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <Reveal variant="blur-up">
          <div className="font-mono text-center mb-12">
            <div className="text-accent mb-4 flex flex-col items-center">
              <pre className="text-xs md:text-sm">╔══════════════════════════════════════════════════════════════╗</pre>
              <pre className="text-xs md:text-sm font-bold">║ OPMOBILITY ║</pre>
              <pre className="text-xs md:text-sm">╚══════════════════════════════════════════════════════════════╝</pre>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              Manufacturing Engineering Intern
            </h1>
            <p className="text-muted-foreground text-sm">
              April 2026 - May 2026
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
                OPmobility is a world leader in sustainable mobility and a technology partner to mobility
                players worldwide, formed from Plastic Omnium in 2024 under the tagline &ldquo;Always on
                the Move.&rdquo; The group designs intelligent exterior systems, complex modules, lighting,
                and energy storage solutions, with deep expertise in high-pressure Type IV hydrogen vessels
                built from a polymer liner encased in a carbon-fiber shell.
              </p>
              <div className="flex flex-wrap gap-2 mt-3 pl-4">
                <a
                  href="https://www.opmobility.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-mono text-xs text-accent hover:text-foreground transition-all duration-200 border border-border px-3 py-1 hover:bg-accent/10 hover:-translate-y-0.5 active:translate-y-0"
                >
                  [visit opmobility.com →]
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
          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_ITEMS.map((item) => (
              <Tilt3D key={item.id} maxTilt={3}>
              <StaggerItem
                variant="swing-in"
                className="border border-border bg-card hover:border-accent transition-colors duration-300 overflow-hidden group hover-lift"
              >
                {/* Image Container */}
                <div 
                  className="relative aspect-[3/4] cursor-pointer overflow-hidden"
                  onClick={() => setSelectedImage(item.id)}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
