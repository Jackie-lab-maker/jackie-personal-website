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
    src: "/images/cryogenics-systems-modeling/bulk-isometric-view.png",
    alt: "Isometric view of an industrial bulk cryogenic storage tank",
    description: "Bulk cryogenic tank — isometric view.",
  },
  {
    id: 2,
    src: "/images/cryogenics-systems-modeling/bulk-section-view.png",
    alt: "Section view of a bulk cryogenic storage tank showing internal geometry",
    description: "Bulk cryogenic tank — section view.",
  },
  {
    id: 3,
    src: "/images/cryogenics-systems-modeling/bulk-external-pipelines-1.png",
    alt: "External piping layout of a bulk cryogenic storage tank",
    description: "Bulk cryogenic tank — external piping layout.",
  },
  {
    id: 4,
    src: "/images/cryogenics-systems-modeling/bulk-external-pipelines-2.png",
    alt: "External piping layout of a bulk cryogenic storage tank, alternate angle",
    description: "Bulk cryogenic tank — external piping, alternate angle.",
  },
  {
    id: 5,
    src: "/images/cryogenics-systems-modeling/lng-isometric-view-1.png",
    alt: "Isometric view of an LNG cryogenic storage tank, configuration 1",
    description: "LNG storage tank — isometric view (1).",
  },
  {
    id: 6,
    src: "/images/cryogenics-systems-modeling/lng-isometric-view-2.png",
    alt: "Isometric view of an LNG cryogenic storage tank, configuration 2",
    description: "LNG storage tank — isometric view (2).",
  },
  {
    id: 7,
    src: "/images/cryogenics-systems-modeling/triflex-pipe-modeling.png",
    alt: "TRIFLEX 3D pipe stress model of the bulk tank's internal piping",
    description: "TRIFLEX pipe stress model — bulk tank internal piping routing and node layout.",
  },
  {
    id: 8,
    src: "/images/cryogenics-systems-modeling/triflex-calc-conditions.png",
    alt: "TRIFLEX thermal stress calculation input conditions for the bulk tank internal piping",
    description: "TRIFLEX calculation conditions — thermal stress inputs for the bulk tank's internal piping.",
  },
]

export default function CryogenicsSystemsModelingPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const reducedMotion = useReducedMotion()

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/projects"
            className="font-mono text-xs text-accent hover:text-foreground transition-colors inline-flex items-center gap-2 border border-border px-3 py-2 hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Navigate back to projects page"
            role="button"
          >
            <span aria-hidden="true">{"<"}</span>
            <span>Back to Projects</span>
          </Link>
        </div>
      </header>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <Reveal variant="blur-up">
          <div className="font-mono text-center mb-12">
            <div className="text-accent mb-4 flex flex-col items-center">
              <pre className="text-xs md:text-sm">╔══════════════════════════════════════════════════════════════╗</pre>
              <pre className="text-xs md:text-sm font-bold">║ CRYOGENICS SYSTEMS MODELING ║</pre>
              <pre className="text-xs md:text-sm">╚══════════════════════════════════════════════════════════════╝</pre>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              Completed — Baker Hughes (Chart Industries)
            </h1>
          </div>
          </Reveal>

          {/* Project Info Section */}
          <Reveal variant="tilt-up" delay={0.05}>
          <Tilt3D>
          <div className="border border-border bg-card p-6 mb-6 hover-lift">
            <div className="font-mono text-xs md:text-sm">
              <div className="text-accent mb-2">{">"} PROJECT_INFO</div>
              <p className="text-muted-foreground pl-4 leading-relaxed">
                A collection of cryogenic storage system design and analysis projects completed during an
                internship at Chart Industries, one of the world&rsquo;s leading manufacturers of industrial
                equipment and cryogenic systems, now part of Baker Hughes. The work spans 3D modeling of
                liquefied natural gas (LNG) and industrial bulk cryogenic storage tanks, plus a TRIFLEX
                thermal stress analysis of the bulk tank&rsquo;s internal piping.
              </p>
            </div>
          </div>
          </Tilt3D>
          </Reveal>

          {/* Description Section */}
          <Reveal variant="tilt-up" delay={0.1}>
          <Tilt3D>
          <div className="border border-border bg-card p-6 mb-12 hover-lift">
            <div className="font-mono text-xs md:text-sm">
              <div className="text-accent mb-2">{">"} PROJECT_OVERVIEW</div>
              <p className="text-muted-foreground pl-4 leading-relaxed">
                Designed 3D models of LNG cryogenic storage tanks and industrial bulk cryogenic tanks in
                SolidWorks, including external piping layouts (fill, withdrawal, and pressure-building
                circuits) and section views of the internal vessel geometry, to give clients and
                technicians clear engineering visualization of the completed systems. Also performed a
                TRIFLEX pipe stress analysis on the bulk tank&rsquo;s internal piping, evaluating thermal
                expansion, sustained loads, and displacement against ASME B31.3 allowable stress criteria.
              </p>
            </div>
          </div>
          </Tilt3D>
          </Reveal>

          {/* Gallery Section */}
          <Reveal variant="blur-up">
          <div className="font-mono text-accent mb-6 flex flex-col items-center">
            <pre className="text-xs md:text-sm">╔════════════════════════════════════════════════╗</pre>
            <pre className="text-xs md:text-sm font-bold">║ PROJECT GALLERY ║</pre>
            <pre className="text-xs md:text-sm">╚════════════════════════════════════════════════╝</pre>
          </div>
          </Reveal>

          {/* Gallery Grid */}
          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_ITEMS.map((item) => (
              <Tilt3D key={item.id} maxTilt={3}>
              <StaggerItem
                variant="swing-in"
                className="border border-border bg-card hover:border-accent transition-colors duration-300 overflow-hidden group hover-lift"
              >
                {/* Image Container */}
                <div
                  className="relative aspect-video cursor-pointer overflow-hidden"
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
