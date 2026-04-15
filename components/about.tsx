"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"

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

const INITIAL_MESSAGE = `Hey there! My name is Jackie and I am a Mechanical Engineering Undergraduate Student at the University of Waterloo. I grew up in Montreal, Quebec, Canada where I was a Cirrus SR-22 pilot, aviation flight safety enthusiast, and basketball player among many other things. In 2025, I left to explore my passion towards science and the engineering field at UWaterloo.

Passionate about innovation, design and creative freedom, I've the pleasure of developing a wide variety of skills and experience across automotive and aerospace industries. These projects encapsulate some of the work that I have done within those industries as well as additional personal projects.

Feel free to reach out and ask me anything I have done. I would love to have a conversation and will get back to you as quickly as I can!`

export default function About({ data }: AboutProps) {
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  return (
    <section className="container mx-auto px-4 py-12" id="about">
      <div className="max-w-4xl mx-auto">
        <div className="font-mono text-accent mb-6 flex flex-col items-center">
          <pre className="text-xs md:text-sm">╔════════════════════════════════════════════════╗</pre>
          <pre className="text-xs md:text-sm font-bold">║ CHAT WITH JACKIE ║</pre>
          <pre className="text-xs md:text-sm">╚════════════════════════════════════════════════╝</pre>
        </div>

        <div className="border-2 border-border bg-card hover:border-accent transition-colors duration-300">
          {/* Chat Messages Area */}
          <div className="h-80 md:h-96 overflow-y-auto p-4 md:p-6 space-y-4">
            {/* Initial greeting message */}
            <div className="font-mono text-xs md:text-sm leading-relaxed">
              <p className="text-foreground">
                <span className="text-accent">{">> "}</span>
                {INITIAL_MESSAGE}
              </p>
            </div>

            {/* Chat messages */}
            {messages.map((message) => (
              <div key={message.id} className="font-mono text-xs md:text-sm leading-relaxed">
                {message.role === "user" ? (
                  <p className="text-muted-foreground">
                    <span className="text-cyan-400">{"[you] >> "}</span>
                    {message.parts?.map((part, index) => {
                      if (part.type === "text") {
                        return <span key={index}>{part.text}</span>
                      }
                      return null
                    })}
                  </p>
                ) : (
                  <p className="text-foreground">
                    <span className="text-accent">{">> "}</span>
                    {message.parts?.map((part, index) => {
                      if (part.type === "text") {
                        return <span key={index}>{part.text}</span>
                      }
                      return null
                    })}
                  </p>
                )}
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && messages.length > 0 && messages[messages.length - 1].role === "user" && (
              <div className="font-mono text-xs md:text-sm text-accent animate-pulse">
                {">> typing..."}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="border-t border-border p-4">
            <div className="flex gap-2">
              <span className="font-mono text-xs md:text-sm text-accent self-center">{">"}</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="flex-1 bg-transparent font-mono text-xs md:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="font-mono text-xs text-accent hover:text-foreground transition-colors border border-border px-3 py-1 hover:bg-accent/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                [send]
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info */}
        <div className="mt-6 border-2 border-border p-4 md:p-6 bg-card">
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

          <div className="mt-4 flex flex-wrap gap-4">
            {data.social?.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-accent hover:text-foreground transition-colors border border-border px-3 py-1 hover:bg-accent/10"
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
                className="font-mono text-xs text-accent hover:text-foreground transition-colors border border-border px-3 py-1 hover:bg-accent/10"
              >
                [{profile.name}]
              </a>
            ))}
            <a
              href="/Jackie_Shao_Resume.pdf"
              download="Jackie_Shao_Resume.pdf"
              className="font-mono text-xs text-accent hover:text-foreground transition-colors border border-border px-3 py-1 hover:bg-accent/10"
            >
              [resume]
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
