"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { Tilt3D } from "@/components/motion/tilt-3d"
import { Wireframe3D } from "@/components/graphics/wireframe-3d"

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
]

export default function Projects() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const reducedMotion = useReducedMotion()

  return (
    <section className="container mx-auto px-4 py-12" id="projects">
      <div className="max-w-4xl mx-auto">
        <Reveal variant="fade">
          <div className="flex justify-center mb-4">
            <Wireframe3D shape="drone" label="> wireframe: quadcopter.stl" />
          </div>
        </Reveal>

        <Reveal variant="blur-up">
          <div className="font-mono text-accent mb-6 flex flex-col items-center">
            <pre className="text-xs md:text-sm">╔════════════════════════════════════════════════╗</pre>
            <pre className="text-xs md:text-sm font-bold">║ PROJECTS ║</pre>
            <pre className="text-xs md:text-sm">╚════════════════════════════════════════════════╝</pre>
          </div>
        </Reveal>

        <Reveal variant="tilt-up" delay={0.1}>
        <Tilt3D>
        <div className="border-2 border-border bg-card hover:border-accent transition-all duration-300 hover-lift">
          <div className="font-mono p-6 md:p-8">
            <div className="text-accent text-xs md:text-sm mb-2">╔═════════════════════════════════╗</div>
            <h3 className="text-foreground font-bold text-sm md:text-base mb-1 pl-2">║ Cryogenics Systems Modeling</h3>
            <p className="text-accent text-xs mb-2 pl-2">║ Completed — Baker Hughes (Chart Industries)</p>
            <p className="text-muted-foreground text-xs leading-relaxed mb-3 pl-2">
              ║ Designed 3D models of LNG cryogenic storage tanks and industrial bulk cryogenic tanks in
              SolidWorks, including external piping layouts (fill, withdrawal, pressure-building circuits)
              and section views of the internal vessel geometry, for clear visualization to clients and
              technicians.
            </p>
            <div className="text-accent text-xs md:text-sm mb-2">╚═════════════════════════════════╝</div>
            <div className="flex flex-wrap gap-2 mt-2 mb-6">
              <a
                href="https://github.com/Jackie-lab-maker/Cryogenics-Systems-Modeling"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-mono text-xs text-accent hover:text-foreground transition-all duration-200 border border-border px-3 py-1 hover:bg-accent/10 hover:-translate-y-0.5 active:translate-y-0"
              >
                [view repo →]
              </a>
            </div>

            <Stagger className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {GALLERY_ITEMS.map((item) => (
                <Tilt3D key={item.id} maxTilt={3}>
                <StaggerItem
                  variant="swing-in"
                  className="border border-border bg-background hover:border-accent transition-colors duration-300 overflow-hidden group"
                >
                  <div
                    className="relative aspect-video cursor-pointer overflow-hidden"
                    onClick={() => setSelectedImage(item.id)}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <span className="font-mono text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 px-2 py-1 text-center">
                        [click to enlarge]
                      </span>
                    </div>
                  </div>
                </StaggerItem>
                </Tilt3D>
              ))}
            </Stagger>
          </div>
        </div>
        </Tilt3D>
        </Reveal>

        <Reveal variant="tilt-up" delay={0.15}>
          <div className="mt-6 border border-dashed border-border p-8 text-center">
            <p className="font-mono text-xs md:text-sm text-muted-foreground">
              {"// More projects coming soon..."}
            </p>
          </div>
        </Reveal>
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
    </section>
  )
}
