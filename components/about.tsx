import Link from "next/link"
import { Reveal } from "@/components/motion/reveal"
import { Tilt3D } from "@/components/motion/tilt-3d"
import { Wireframe3D } from "@/components/graphics/wireframe-3d"

interface AboutProps {
  data: {
    bio: string
    email: string
    phone: string
    social: Array<{
      name: string
      url: string
      className: string
    }>
    profiles?: Array<{
      name: string
      url: string
      className: string
    }>
  }
}

export default function About({ data }: AboutProps) {
  return (
    <section className="container mx-auto px-4 py-12" id="about">
      <div className="max-w-4xl mx-auto">
        <Reveal variant="fade">
          <div className="flex justify-center mb-4">
            <Wireframe3D shape="icosahedron" label="> wireframe: icosahedron.obj" />
          </div>
        </Reveal>

        <Reveal variant="blur-up">
          <div className="font-mono text-accent mb-6 flex flex-col items-center">
            <pre className="text-xs md:text-sm">╔════════════════════════════════════════════════╗</pre>
            <pre className="text-xs md:text-sm font-bold">║ ABOUT ME ║</pre>
            <pre className="text-xs md:text-sm">╚════════════════════════════════════════════════╝</pre>
          </div>
        </Reveal>

        <Reveal variant="tilt-up" delay={0.1}>
        <Tilt3D>
        <div className="border-2 border-border p-6 md:p-8 bg-card hover:border-accent transition-colors duration-300 hover-lift">
          <div className="font-mono text-xs md:text-sm leading-relaxed space-y-4">
            <p className="text-foreground">
              <span className="text-accent">{">> "}</span>
              {data.bio}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs md:text-sm">
              <div>
                <span className="text-accent">email:</span>{" "}
                <a
                  href={`mailto:${data.email}`}
                  className="text-muted-foreground hover:text-accent transition-colors underline"
                >
                  {data.email}
                </a>
              </div>
              <div>
                <span className="text-accent">phone:</span> <span className="text-muted-foreground">{data.phone}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              {data.social?.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-accent hover:text-foreground transition-all duration-200 border border-border px-3 py-1 hover:bg-accent/10 hover:-translate-y-0.5 active:translate-y-0"
                >
                  [{social.name}]
                </a>
              ))}
              {data.profiles?.map((profile) => (
                <a
                  key={profile.name}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-accent hover:text-foreground transition-all duration-200 border border-border px-3 py-1 hover:bg-accent/10 hover:-translate-y-0.5 active:translate-y-0"
                >
                  [{profile.name}]
                </a>
              ))}
              <Link
                href="/instagram"
                className="font-mono text-xs text-accent hover:text-foreground transition-all duration-200 border border-border px-3 py-1 hover:bg-accent/10 hover:-translate-y-0.5 active:translate-y-0"
              >
                [instagram]
              </Link>
            </div>
          </div>
        </div>
        </Tilt3D>
        </Reveal>
      </div>
    </section>
  )
}
