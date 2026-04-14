interface HeroProps {
  data: {
    name: string
    occupation: string
  }
}

export default function Hero({ data }: HeroProps) {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24 relative scan-line">
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="font-mono leading-tight">
          <pre className="text-[10px] sm:text-xs md:text-sm lg:text-base neon-text">
            {`
 █████╗ ██╗     ███████╗██╗  ██╗    ██████╗ ██╗██╗   ██╗███████╗██████╗  █████╗ 
██╔══██╗██║     ██╔════╝╚██╗██╔╝    ██╔══██╗██║██║   ██║██╔════╝██╔══██╗██╔══██╗
███████║██║     █████╗   ╚███╔╝     ██████╔╝██║██║   ██║█████╗  ██████╔╝███████║
██╔══██║██║     ██╔══╝   ██╔██╗     ██╔══██╗██║╚██╗ ██╔╝██╔══╝  ██╔══██╗██╔══██║
██║  ██║███████╗███████╗██╔╝ ██╗    ██║  ██║██║ ╚████╔╝ ███████╗██║  ██║██║  ██║
╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝    ╚═╝  ╚═╝╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝
`}
          </pre>
        </div>

        <div className="text-center space-y-4">
          <h1 className="font-mono text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">{data.name}</h1>
          <div className="font-mono text-sm md:text-base text-muted-foreground border-t-2 border-b-2 pulse-border py-2 px-4">
            <span className="neon-cyan">{">"}</span> {data.occupation}
          </div>
        </div>
      </div>

      <div className="absolute top-4 left-4 text-accent/30 font-mono text-xs md:text-sm">╔═══</div>
      <div className="absolute top-4 right-4 text-accent/30 font-mono text-xs md:text-sm">═══╗</div>
      <div className="absolute bottom-4 left-4 text-accent/30 font-mono text-xs md:text-sm">╚═══</div>
      <div className="absolute bottom-4 right-4 text-accent/30 font-mono text-xs md:text-sm">═══╝</div>
    </section>
  )
}
