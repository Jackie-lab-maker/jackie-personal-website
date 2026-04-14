export default function Footer() {
  return (
    <footer className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="font-mono text-accent text-center">
          <pre className="text-xs md:text-sm">
            {`╔════════════════════════════════════╗
║  crafted_with_love_by_harsha   ║
╚════════════════════════════════════╝`}
          </pre>
          <p className="text-muted-foreground text-xs mt-4">
            © {new Date().getFullYear()} • Built with Next.js & TailwindCSS
          </p>
        </div>
      </div>
    </footer>
  )
}
