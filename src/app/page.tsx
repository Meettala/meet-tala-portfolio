import Link from "next/link";
import { projects } from "@/lib/projects";
import StatusTag from "@/components/StatusTag";

export default function Home() {
  return (
    <div>
      {/* Hero — a log entry, not a headline-and-gradient template */}
      <section className="border-b border-ink-line">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <div className="mb-6 font-mono text-xs uppercase tracking-widest text-signal-amber">
            build log — entry 001
          </div>
          <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.1] tracking-tight text-paper sm:text-5xl">
            I build AI systems that refuse to guess when they don&apos;t
            know.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-paper-dim">
            Applied AI / Data Science portfolio — five working projects, each
            one built around evidence over invention: a job market analyzer,
            an ML pipeline, a RAG assistant, an evidence-grounded job
            application assistant, and a business insight tool.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="#projects"
              className="rounded-sm bg-signal-amber px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-widest text-ink transition-opacity hover:opacity-90"
            >
              View the builds
            </Link>
            <Link
              href="/now"
              className="font-mono text-xs uppercase tracking-widest text-paper-dim underline decoration-ink-line underline-offset-4 hover:text-paper"
            >
              See what&apos;s live right now →
            </Link>
          </div>
        </div>
      </section>

      {/* Ledger row — status counts, structural device that encodes real state */}
      <section className="border-b border-ink-line">
        <div className="mx-auto grid max-w-5xl grid-cols-3 divide-x divide-ink-line px-6">
          {(
            [
              { n: projects.filter((p) => p.status === "verified").length, label: "Shipped" },
              { n: projects.filter((p) => p.status === "progress").length, label: "In progress" },
              { n: projects.filter((p) => p.status === "planned").length, label: "Planned" },
            ] as const
          ).map((s) => (
            <div key={s.label} className="px-6 py-6 first:pl-0 last:pr-0">
              <div className="font-display text-3xl font-bold text-paper">
                {s.n}
              </div>
              <div className="mt-1 font-mono text-xs uppercase tracking-widest text-paper-dim">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project grid */}
      <section id="projects" className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-10 flex items-baseline justify-between">
          <h2 className="font-display text-xl font-bold text-paper">
            The builds
          </h2>
          <span className="font-mono text-xs text-paper-dim">
            {projects.length} projects
          </span>
        </div>
        <div className="grid gap-px overflow-hidden rounded-sm border border-ink-line bg-ink-line sm:grid-cols-2">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group flex flex-col justify-between gap-6 bg-ink p-7 transition-colors hover:bg-ink-raised"
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-xs text-paper-dim">
                    {String(p.order).padStart(2, "0")}
                  </span>
                  <StatusTag status={p.status} />
                </div>
                <h3 className="font-display text-lg font-bold text-paper group-hover:text-signal-amber transition-colors">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-paper-dim">
                  {p.oneLiner}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[0.65rem] uppercase tracking-wide text-paper-dim/80"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Principle strip */}
      <section className="border-t border-ink-line bg-ink-raised">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <p className="max-w-2xl font-display text-2xl font-bold leading-snug text-paper">
            No invented experience. No unsupported claims. No action taken
            without approval.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-paper-dim">
            Every project on this site follows the same rule the JobPilot AI
            assistant enforces on itself: a claim without evidence doesn&apos;t
            ship — it gets flagged instead.
          </p>
        </div>
      </section>
    </div>
  );
}
