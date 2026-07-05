"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { Reveal } from "@/components/motion/reveal"
import Footer from "@/components/footer"

export default function InstagramPage() {
  const reducedMotion = useReducedMotion()

  return (
    <motion.main
      className="min-h-screen bg-background"
      initial={reducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 border border-border bg-card px-3 py-1.5 text-xs text-foreground hover:bg-secondary hover:text-accent transition-all mb-10"
          >
            &lt; Back to About
          </Link>

          <Reveal variant="blur-up">
            <div className="font-mono text-accent mb-6 flex flex-col items-center">
              <pre className="text-xs md:text-sm">╔════════════════════════════════════════════════╗</pre>
              <pre className="text-xs md:text-sm font-bold">║ INSTAGRAM ║</pre>
              <pre className="text-xs md:text-sm">╚════════════════════════════════════════════════╝</pre>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border-2 border-border p-6 md:p-8 bg-card hover-lift flex flex-col items-center gap-6">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <Image
                  src="/images/social/instagram-qr.png"
                  alt="Instagram QR code for @jackieeeshao66"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 256px, 320px"
                  priority
                />
              </div>
              <a
                href="https://www.instagram.com/jackieeeshao66"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-accent hover:text-foreground transition-all duration-200 border border-border px-4 py-2 hover:bg-accent/10 hover:-translate-y-0.5 active:translate-y-0"
              >
                [@jackieeeshao66]
              </a>
            </div>
          </Reveal>
        </div>
      </section>
      <Footer />
    </motion.main>
  )
}
