import Link from "next/link";
import { projects } from "@/lib/projects";
import StatusTag from "@/components/StatusTag";

export default function Home() {
  const flagship = projects[0];

  return (
    <div>
      <section className="border-b border-ink-line">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <div className="mb-6 font-mono text-xs uppercase tracking-widest text-signal-amber">
            applied AI / ML engineering portfolio
          </div>
          <h1 className="max-w-4xl font-display text-4xl font-bold leading-[1.1] tracking-tight text-paper sm:text-5xl">
            Applied AI/ML engineer building evidence-grounded, testable systems instead of uncontrolled model output.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-paper-dim">
            The strongest work combines deterministic fallbacks, validated structured outputs,
            retrieval with refusal behaviour, end-to-end machine learning, data pipelines,
            automated testing, CI and Docker. Each case study separates what is implemented,
            what is verified and what remains a limitation.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={`/projects/${flagship.slug}`}
              className="rounded-sm bg-signal-amber px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-widest text-ink transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
            >
              Explore JobPilot
            </Link>
            <Link
              href="#projects"
              className="rounded-sm font-mono text-xs uppercase tracking-widest text-paper-dim underline decoration-ink-line underline-offset-4 hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-amber focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
            >
              View all projects →
            </Link>
            <a
              href="https://github.com/Meettala"
              target="_blank"
              rel="noreferrer"
              className="rounded-sm font-mono text-xs uppercase tracking-widest text-paper-dim underline decoration-ink-line underline-offset-4 hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-amber focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
            >
              GitHub evidence ↗
            </a>
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
                label: "Fresh demos verified",
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
          <div>
            <h2 className="font-display text-xl font-bold text-paper">Selected engineering work</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-paper-dim">
              Ordered for recruiter review: product and evidence boundaries first, then retrieval,
              data-pipeline and foundational ML engineering.
            </p>
          </div>
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
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-paper-dim">
                  {project.highlights.slice(0, 2).map((highlight) => (
                    <li key={highlight} className="flex gap-2">
                      <span aria-hidden="true">—</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-wide text-paper-dim/80">
                  Public demo: {project.liveDemoAvailable ? "freshly verified" : "not claimed"}
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
          <p className="max-w-3xl font-display text-2xl font-bold leading-snug text-paper">
            Engineering judgement is visible in the boundaries: unsupported claims are blocked,
            provider output is validated, low-evidence retrieval refuses, and model results are scoped to their evaluation.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-paper-dim">
            Repository readiness, public deployment and production readiness are treated as separate claims.
            No LinkedIn or email contact is surfaced because no verified professional contact URL is currently present in the repository.
          </p>
        </div>
      </section>
    </div>
  );
}
