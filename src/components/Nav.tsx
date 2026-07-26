import Link from "next/link";

const focusClass =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-amber focus-visible:ring-offset-4 focus-visible:ring-offset-ink";

export default function Nav() {
  return (
    <header className="border-b border-ink-line">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-5">
        <Link
          href="/"
          className={`font-display text-sm font-bold tracking-tight text-paper ${focusClass}`}
          aria-label="Meet Tala portfolio home"
        >
          MEET TALA
        </Link>
        <nav
          aria-label="Primary navigation"
          className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-paper-dim sm:gap-6"
        >
          <Link
            href="/#projects"
            className={`transition-colors hover:text-signal-amber ${focusClass}`}
          >
            Builds
          </Link>
          <Link
            href="/now"
            className={`transition-colors hover:text-signal-amber ${focusClass}`}
          >
            Status
          </Link>
          <a
            href="https://github.com/Meettala"
            target="_blank"
            rel="noreferrer"
            className={`transition-colors hover:text-signal-amber ${focusClass}`}
          >
            GitHub<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
