# Jackie's Engineering Portfolio Website

> Personal engineering portfolio for Jingkai (Jackie) Shao. Built with Next.js 14 and v0 by Vercel. Showcases engineering projects, internship experience, skills, and design team work.
>
> ---
>
> ## Overview
>
> This is Jackie's personal engineering portfolio website built with [Next.js 14](https://nextjs.org) and [v0](https://v0.app). The site showcases engineering background including internship experience at OPmobility and Chart Industries, CAD and software projects, academic coursework, and student design team involvement at the University of Waterloo.
>
> ---
>
> ## Tech Stack
>
> - **Framework:** Next.js 14 (App Router)
> - - **Language:** TypeScript
>   - - **Styling:** Tailwind CSS
>     - - **UI Components:** shadcn/ui (Radix UI primitives)
>       - - **Package Manager:** pnpm
>         - - **Deployment:** Vercel
>           - - **Dev Tool:** v0 by Vercel
>            
>             - ---
>
> ## Repository Structure
>
> ```
> jackie-personal-website/
> |-- app/
> |   |-- experience/        # Experience route/page
> |   |-- globals.css        # Global styles
> |   |-- layout.tsx         # Root layout with metadata
> |   `-- page.tsx           # Main page entry point
> |
> |-- components/
> |   |-- ui/                # shadcn/ui component library
> |   |-- about.tsx          # About me section
> |   |-- contact.tsx        # Contact info and links
> |   |-- design-team.tsx    # Student design team section
> |   |-- education.tsx      # Academic background
> |   |-- experience.tsx     # Work and internship history
> |   |-- footer.tsx         # Site footer
> |   |-- hero.tsx           # Hero/intro banner
> |   |-- loading-screen.tsx # Animated loading screen
> |   |-- navigation.tsx     # Responsive navigation bar
> |   |-- projects.tsx       # Engineering projects showcase
> |   |-- scroll-indicator.tsx  # Scroll progress indicator
> |   |-- skills.tsx         # Technical skills overview
> |   |-- theme-provider.tsx # Theme context provider
> |   `-- theme-toggle.tsx   # Dark/light mode toggle
> |
> |-- hooks/                 # Custom React hooks
> |-- lib/                   # Utility functions
> |-- public/                # Static assets (images, icons)
> |-- styles/                # Additional CSS
> |-- .claude/               # Claude AI dev config
> |-- components.json        # shadcn/ui config
> |-- next.config.mjs        # Next.js config
> `-- tsconfig.json          # TypeScript config
> ```
>
> ---
>
> ## Portfolio Sections
>
> - **Hero** - Introduction and name banner
> - - **About** - Personal background and engineering focus
>   - - **Experience** - Internship history (OPmobility, Chart Industries)
>     - - **Projects** - Engineering projects (Quad-X-Cage, KUKA.Sim, Triflex, Cryogenics, Tooling, WATFlight)
>       - - **Design Team** - Student team involvement at UW
>         - - **Education** - University of Waterloo MechE program
>           - - **Skills** - CAD, programming, simulation, manufacturing
>             - - **Contact** - LinkedIn, GitHub, email
>              
>               - ---
>
> ## Getting Started
>
> ```bash
> pnpm install
> pnpm dev
> ```
>
> Open [http://localhost:3000](http://localhost:3000) to view locally.
>
> ---
>
> ## Deployment
>
> Auto-deployed on [Vercel](https://vercel.com) on every push to `main`.
>
> ---
>
> ## Author
>
> **Jingkai (Jackie) Shao**
> MechE @ University of Waterloo | ex. OPmobility, Chart Industries
> [LinkedIn](https://www.linkedin.com/in/jingkai-shao3) | [GitHub](https://github.com/Jackie-lab-maker) | j66shao@uwaterloo.ca
