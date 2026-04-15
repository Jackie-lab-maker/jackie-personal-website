"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

const GALLERY_IMAGES = [
  {
    src: "/images/wisa/flight-simulator.png",
    alt: "ALSIM Flight Simulator Cockpit",
    title: "ALSIM Flight Simulator",
    description: "Description coming soon...",
  },
]

export default function WISAExperiencePage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/#experience"
            className="font-mono text-xs text-accent hover:text-foreground transition-colors border border-border px-3 py-1 hover:bg-accent/10"
          >
            {"<"} back to portfolio
          </Link>
          <span className="font-mono text-xs text-muted-foreground">
            experience/wisa
          </span>
        </div>
      </header>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <div className="font-mono text-center mb-12">
            <div className="text-accent mb-4 flex flex-col items-center">
              <pre className="text-xs md:text-sm">╔══════════════════════════════════════════════════════════════════════════════╗</pre>
              <pre className="text-xs md:text-sm font-bold">║ WATERLOO INSTITUTE FOR SUSTAINABLE AERONAUTICS ║</pre>
              <pre className="text-xs md:text-sm">╚══════════════════════════════════════════════════════════════════════════════╝</pre>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              System Design Engineering Researcher
            </h1>
            <p className="text-muted-foreground text-sm">
              May 2026 - Present
            </p>
          </div>

          {/* Gallery Section */}
          <div className="font-mono text-accent mb-6">
            <span className="text-xs md:text-sm">{">"} project_gallery/</span>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_IMAGES.map((image, index) => (
              <div
                key={index}
                className="border border-border bg-card hover:border-accent transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedImage(index)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 font-mono">
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    {image.title}
                  </h3>
                  <p className="text-xs text-muted-foreground italic">
                    {image.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Placeholder for future images */}
            <div className="border border-dashed border-border bg-card/50 flex items-center justify-center aspect-video">
              <div className="text-center font-mono text-muted-foreground">
                <div className="text-2xl mb-2">+</div>
                <div className="text-xs">More images coming soon</div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="mt-12 border border-border bg-card p-6 font-mono">
            <div className="text-accent text-sm mb-4">
              {">"} about_this_position/
            </div>
            <div className="text-muted-foreground text-sm leading-relaxed">
              <p className="italic">Details coming soon...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 font-mono text-white hover:text-accent transition-colors text-xl"
            onClick={() => setSelectedImage(null)}
            aria-label="Close lightbox"
          >
            [X]
          </button>
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
            <Image
              src={GALLERY_IMAGES[selectedImage].src}
              alt={GALLERY_IMAGES[selectedImage].alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-white text-center">
            <p className="text-sm">{GALLERY_IMAGES[selectedImage].title}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {GALLERY_IMAGES[selectedImage].description}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
