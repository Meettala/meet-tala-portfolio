import Link from "next/link";

export default function Nav() {
  return (
    <header className="border-b border-ink-line">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-display text-sm font-bold tracking-tight text-paper"
        >
          MEET TALA
        </Link>
        <nav className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest text-paper-dim">
          <Link href="/#projects" className="hover:text-signal-amber transition-colors">
            Builds
          </Link>
          <Link href="/now" className="hover:text-signal-amber transition-colors">
            Now
          </Link>
          <a
            href="https://github.com/"
            className="hover:text-signal-amber transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
