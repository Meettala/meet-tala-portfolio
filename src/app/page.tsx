import Link from "next/link";
import { projects } from "@/lib/projects";
import StatusTag from "@/components/StatusTag";

export default function Home() {
  return (
    <div>
      <section className="border-b border-ink-line">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <div className="mb-6 font-mono text-xs uppercase tracking-widest text-signal-amber">
            applied AI portfolio
          </div>
          <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.1] tracking-tight text-paper sm:text-5xl">
            I build AI systems that refuse to guess when they don&apos;t know.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-paper-dim">
            Five repository-ready projects spanning applied AI, machine learning,
            retrieval, evidence-grounded job tooling and validated business analysis.
            Each case study shows the engineering decisions, safety boundaries, tests
            and honest limitations behind the work.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="#projects"
              className="rounded-sm bg-signal-amber px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-widest text-ink transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
            >
              View the builds
            </Link>
            <Link
              href="/now"
              className="rounded-sm font-mono text-xs uppercase tracking-widest text-paper-dim underline decoration-ink-line underline-offset-4 hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-amber focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
            >
              Review project status →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-ink-line" aria-label="Portfolio summary">
        <div className="mx-auto grid max-w-5xl grid-cols-3 divide-x divide-ink-line px-6">
          {(
            [
              {
                n: projects.filter((project) => project.repositoryReady).length,
                label: "Repository ready",
              },
              {
                n: projects.filter((project) => project.liveDemoAvailable).length,
                label: "Public demos claimed",
              },
              { n: projects.length, label: "Case studies" },
            ] as const
          ).map((item) => (
            <div key={item.label} className="px-3 py-6 first:pl-0 last:pr-0 sm:px-6">
              <div className="font-display text-3xl font-bold text-paper">{item.n}</div>
              <div className="mt-1 font-mono text-[0.65rem] uppercase tracking-widest text-paper-dim sm:text-xs">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-5xl scroll-mt-8 px-6 py-20">
        <div className="mb-10 flex items-baseline justify-between gap-4">
          <h2 className="font-display text-xl font-bold text-paper">The builds</h2>
          <span className="font-mono text-xs text-paper-dim">
            {projects.length} verified repositories
          </span>
        </div>
        <div className="grid gap-px overflow-hidden rounded-sm border border-ink-line bg-ink-line sm:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group flex flex-col justify-between gap-6 bg-ink p-7 transition-colors hover:bg-ink-raised focus-visible:relative focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-signal-amber"
            >
              <div>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="font-mono text-xs text-paper-dim">
                    {String(project.order).padStart(2, "0")}
                  </span>
                  <StatusTag status={project.status} />
                </div>
                <h3 className="font-display text-lg font-bold text-paper transition-colors group-hover:text-signal-amber">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-paper-dim">
                  {project.oneLiner}
                </p>
                <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-wide text-paper-dim/80">
                  Public demo: {project.liveDemoAvailable ? "verified" : "not claimed"}
                </p>
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-2" aria-label="Technology stack">
                {project.stack.map((technology) => (
                  <span
                    key={technology}
                    className="font-mono text-[0.65rem] uppercase tracking-wide text-paper-dim/80"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-ink-line bg-ink-raised">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <p className="max-w-2xl font-display text-2xl font-bold leading-snug text-paper">
            No unsupported claims. No hidden limitations. No automated action without
            an explicit boundary.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-paper-dim">
            The portfolio applies one consistent rule: a claim must be supported by
            code, tests, repository history or clearly labelled evidence. Anything not
            verified is presented as a limitation or future step.
          </p>
        </div>
      </section>
    </div>
  );
}
