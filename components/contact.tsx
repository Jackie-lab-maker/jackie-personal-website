"use client"

import { useState } from "react"

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message")
      }

      setStatus("success")
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      setStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Failed to send message")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section className="container mx-auto px-4 py-12" id="contact">
      <div className="max-w-4xl mx-auto">
        <div className="font-mono text-accent mb-6 flex flex-col items-center">
          <pre className="text-xs md:text-sm">╔════════════════════════════════════════════════╗</pre>
          <pre className="text-xs md:text-sm font-bold">║ CONTACT ║</pre>
          <pre className="text-xs md:text-sm">╚════════════════════════════════════════════════╝</pre>
        </div>

        <div className="border-2 border-border bg-card p-6 md:p-8 hover:border-accent transition-colors duration-300">
          <div className="font-mono text-xs md:text-sm space-y-6">
            <p className="text-muted-foreground leading-relaxed text-center">{data.contactmessage}</p>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-accent block">
                  {">"} name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-background border border-border px-4 py-2 text-foreground font-mono text-sm focus:outline-none focus:border-accent transition-colors"
                  placeholder="Enter your name..."
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-accent block">
                  {">"} email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-background border border-border px-4 py-2 text-foreground font-mono text-sm focus:outline-none focus:border-accent transition-colors"
                  placeholder="Enter your email..."
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-accent block">
                  {">"} message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-background border border-border px-4 py-2 text-foreground font-mono text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Type your message..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full border-2 border-accent text-accent hover:bg-accent hover:text-background px-6 py-3 font-mono text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-pulse">SENDING</span>
                    <span className="animate-spin">|</span>
                  </span>
                ) : (
                  "[SEND MESSAGE]"
                )}
              </button>

              {/* Status Messages */}
              {status === "success" && (
                <div className="text-center p-4 border border-accent bg-accent/10">
                  <span className="text-accent">{">"} Message sent successfully! I&apos;ll get back to you soon.</span>
                </div>
              )}

              {status === "error" && (
                <div className="text-center p-4 border border-red-500 bg-red-500/10">
                  <span className="text-red-500">{">"} Error: {errorMessage}</span>
                </div>
              )}
            </form>

            {/* Direct Email Link */}
            <div className="pt-4 border-t border-border text-center">
              <p className="text-muted-foreground mb-2">Or reach out directly:</p>
              <div className="text-accent mb-2">┌───────────────────────┐</div>
              <a
                href={`mailto:${data.email}`}
                className="text-foreground hover:text-accent transition-colors underline"
              >
                {data.email}
              </a>
              <div className="text-accent mt-2">└───────────────────────┘</div>
            </div>

            <div className="text-muted-foreground text-xs text-center">
              {data.address.city}, {data.address.state}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
