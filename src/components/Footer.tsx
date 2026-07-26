export default function Footer() {
  return (
    <footer className="border-t border-ink-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-8 font-mono text-xs text-paper-dim sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Meet Tala. Built and documented in public.</span>
        <a
          href="https://github.com/Meettala"
          target="_blank"
          rel="noreferrer"
          className="rounded-sm underline decoration-ink-line underline-offset-4 transition-colors hover:text-signal-amber focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-amber focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
        >
          Review the GitHub evidence<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </footer>
  );
}
