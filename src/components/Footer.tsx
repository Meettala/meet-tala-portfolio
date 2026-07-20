export default function Footer() {
  return (
    <footer className="border-t border-ink-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 font-mono text-xs text-paper-dim sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Meet Tala. Built in the open.</span>
        <span>Every claim on this site is one I can point to evidence for.</span>
      </div>
    </footer>
  );
}
