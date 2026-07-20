import Link from "next/link";
import { projects } from "@/lib/projects";
import StatusTag from "@/components/StatusTag";

export const metadata = { title: "Now — Meet Tala" };

export default function NowPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="font-mono text-xs uppercase tracking-widest text-signal-amber">
        live status
      </div>
      <h1 className="mt-4 font-display text-3xl font-bold text-paper">
        What&apos;s happening right now
      </h1>
      <p className="mt-4 text-paper-dim leading-relaxed">
        This page mirrors the build log I keep while working through this
        program. Updated as each project moves.
      </p>

      <div className="mt-10 divide-y divide-ink-line border-y border-ink-line">
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="flex items-center justify-between gap-4 py-4 hover:bg-ink-raised px-2 -mx-2 transition-colors"
          >
            <div>
              <div className="font-display text-sm font-bold text-paper">
                {p.title}
              </div>
              <div className="text-xs text-paper-dim">{p.stack.join(" · ")}</div>
            </div>
            <StatusTag status={p.status} />
          </Link>
        ))}
      </div>

      <p className="mt-8 font-mono text-xs text-paper-dim">
        Last updated manually — see repo commit history for exact dates.
      </p>
    </div>
  );
}
