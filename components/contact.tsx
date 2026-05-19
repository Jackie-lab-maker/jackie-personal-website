interface ContactProps {
  data: {
    contactmessage: string
    email: string
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
        <div className="font-mono text-accent mb-6 flex flex-col items-center">
          <pre className="text-xs md:text-sm">╔════════════════════════════════════════════════╗</pre>
          <pre className="text-xs md:text-sm font-bold">║ CONTACT ║</pre>
          <pre className="text-xs md:text-sm">╚════════════════════════════════════════════════╝</pre>
        </div>

        <div className="border-2 border-border bg-card p-6 md:p-8 text-center hover:border-accent transition-colors duration-300">
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

            <div className="text-muted-foreground text-xs">
              {data.address.city}, {data.address.state}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
