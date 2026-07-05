import Link from "next/link"
import { Reveal } from "@/components/motion/reveal"
import { Tilt3D } from "@/components/motion/tilt-3d"
import { Wireframe3D } from "@/components/graphics/wireframe-3d"

interface ContactProps {
  data: {
    contactmessage: string
    email: string
    social: Array<{
      name: string
      url: string
      className: string
    }>
    address: {
      city: string
      state: string
    }
  }
}

export default function Contact({ data }: ContactProps) {
  return (
    <section className="container mx-auto px-4 py-12" id="contact">
      <div className="max-w-4xl mx-auto">
        <Reveal variant="fade">
          <div className="flex justify-center mb-4">
            <Wireframe3D shape="globe" label="> wireframe: globe.obj" />
          </div>
        </Reveal>

        <Reveal variant="blur-up">
          <div className="font-mono text-accent mb-6 flex flex-col items-center">
            <pre className="text-xs md:text-sm">╔════════════════════════════════════════════════╗</pre>
            <pre className="text-xs md:text-sm font-bold">║ CONTACT ║</pre>
            <pre className="text-xs md:text-sm">╚════════════════════════════════════════════════╝</pre>
          </div>
        </Reveal>

        <Reveal variant="tilt-up" delay={0.1}>
        <Tilt3D>
        <div className="border-2 border-border bg-card p-6 md:p-8 text-center hover:border-accent transition-colors duration-300 hover-lift">
          <div className="font-mono text-xs md:text-sm space-y-4">
            <p className="text-muted-foreground leading-relaxed">{data.contactmessage}</p>

            <div className="pt-4 border-t border-border">
              <div className="text-accent mb-2">┌───────────────────────┐</div>
              <a
                href={`mailto:${data.email}`}
                className="text-foreground hover:text-accent transition-colors underline"
              >
                {data.email}
              </a>
              <div className="text-accent mt-2">└───────────────────────┘</div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {data.social?.filter((social) => social.name === "linkedin").map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-foreground hover:text-accent transition-all duration-200 border border-border px-3 py-1 hover:bg-accent/10 hover:-translate-y-0.5 active:translate-y-0"
                >
                  [{social.name}]
                </a>
              ))}
              <Link
                href="/instagram"
                className="font-mono text-xs text-foreground hover:text-accent transition-all duration-200 border border-border px-3 py-1 hover:bg-accent/10 hover:-translate-y-0.5 active:translate-y-0"
              >
                [instagram]
              </Link>
            </div>

            <div className="text-muted-foreground text-xs">
              {data.address.city}, {data.address.state}
            </div>
          </div>
        </div>
        </Tilt3D>
        </Reveal>
      </div>
    </section>
  )
}
