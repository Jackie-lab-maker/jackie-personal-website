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
    subject: "",
    message: "",
  })
  const [isSending, setIsSending] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)

    // Build mailto link with form data
    const mailtoLink = `mailto:j66shao@uwaterloo.ca?subject=${encodeURIComponent(
      formData.subject || "Portfolio Contact"
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`

    // Open email client
    window.location.href = mailtoLink

    // Reset after a short delay
    setTimeout(() => {
      setIsSending(false)
    }, 1000)
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-accent">
                    {">"} Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-background border border-border px-3 py-2 text-foreground font-mono text-xs focus:outline-none focus:border-accent transition-colors"
                    placeholder="Enter your name..."
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-accent">
                    {">"} Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-background border border-border px-3 py-2 text-foreground font-mono text-xs focus:outline-none focus:border-accent transition-colors"
                    placeholder="Enter your email..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-accent">
                  {">"} Subject:
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-background border border-border px-3 py-2 text-foreground font-mono text-xs focus:outline-none focus:border-accent transition-colors"
                  placeholder="Enter subject..."
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-accent">
                  {">"} Message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-background border border-border px-3 py-2 text-foreground font-mono text-xs focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="Type your message here..."
                />
              </div>

              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  disabled={isSending}
                  className="font-mono text-xs border-2 border-accent px-6 py-3 text-accent hover:bg-accent hover:text-background transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSending ? "[ OPENING EMAIL CLIENT... ]" : "[ SEND MESSAGE ]"}
                </button>
              </div>
            </form>

            {/* Direct Email Link */}
            <div className="pt-4 border-t border-border text-center">
              <p className="text-muted-foreground mb-2">Or email directly:</p>
              <div className="text-accent mb-2">┌───────────────────────┐</div>
              <a
                href="mailto:j66shao@uwaterloo.ca"
                className="text-foreground hover:text-accent transition-colors underline"
              >
                j66shao@uwaterloo.ca
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
