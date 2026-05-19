import { Resend } from "resend"
import { NextRequest, NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      )
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["j66shao@uwaterloo.ca"],
      subject: `Portfolio Contact: Message from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: monospace; padding: 20px; background: #0a0a0a; color: #e5e5e5;">
          <h2 style="color: #22c55e; border-bottom: 1px solid #333; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <p><strong style="color: #22c55e;">From:</strong> ${name}</p>
          <p><strong style="color: #22c55e;">Email:</strong> ${email}</p>
          <p><strong style="color: #22c55e;">Message:</strong></p>
          <div style="background: #1a1a1a; padding: 15px; border-left: 3px solid #22c55e; margin-top: 10px;">
            ${message.replace(/\n/g, "<br>")}
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("[v0] Resend error:", error)
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (error) {
    console.error("[v0] Contact API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
