"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

const GALLERY_ITEMS = [
  {
    id: 1,
    src: "/images/chart-industries/tank-installation-1.jpg",
    alt: "Cryogenic storage tank installation with crane",
    description: "Description coming soon...",
  },
  {
    id: 2,
    src: "/images/chart-industries/tank-installation-2.jpg",
    alt: "Cryogenic tank being lifted by multiple cranes",
    description: "Description coming soon...",
  },
]

export default function ChartIndustriesPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/#experience"
            className="font-mono text-xs text-accent hover:text-foreground transition-colors inline-flex items-center gap-2"
          >
            <span>{"<"}</span>
            <span>[back to portfolio]</span>
          </Link>
        </div>
      </header>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <div className="font-mono text-center mb-12">
            {/* Company Logos */}
            <div className="flex justify-center items-center gap-6 md:gap-10 mb-6">
              <div className="relative w-36 h-20 md:w-48 md:h-24">
                <Image
                  src="/images/chart-industries/chart-logo.png"
                  alt="Chart Industries Logo"
                  fill
                  className="object-contain"
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
              <pre className="text-xs md:text-sm font-bold">║ CHART INDUSTRIES, INC. ║</pre>
              <pre className="text-xs md:text-sm">╚══════════════════════════════════════════════════════════════╝</pre>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              Mechanical Engineering Intern
            </h1>
            <p className="text-muted-foreground text-sm">
              Dec 2025 - Mar 2026
            </p>
          </div>

          {/* Description Section */}
          <div className="border border-border bg-card p-6 mb-12">
            <div className="font-mono text-xs md:text-sm">
              <div className="text-accent mb-2">{">"} ROLE_OVERVIEW</div>
              <p className="text-muted-foreground pl-4 leading-relaxed">
                Description coming soon...
              </p>
            </div>
          </div>

          {/* Gallery Section */}
          <div className="font-mono text-accent mb-6 flex flex-col items-center">
            <pre className="text-xs md:text-sm">╔════════════════════════════════════════════════╗</pre>
            <pre className="text-xs md:text-sm font-bold">║ PROJECT GALLERY ║</pre>
            <pre className="text-xs md:text-sm">╚════════════════════════════════════════════════╝</pre>
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.id}
                className="border border-border bg-card hover:border-accent transition-colors duration-300 overflow-hidden group"
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
              </div>
            ))}
          </div>

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
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 font-mono text-white hover:text-accent transition-colors text-sm"
            onClick={() => setSelectedImage(null)}
            aria-label="Close lightbox"
          >
            [close]
          </button>
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
            <Image
              src={GALLERY_ITEMS.find((item) => item.id === selectedImage)?.src || ""}
              alt={GALLERY_ITEMS.find((item) => item.id === selectedImage)?.alt || ""}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </main>
  )
}
