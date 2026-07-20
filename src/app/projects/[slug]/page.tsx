import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, projects } from "@/lib/projects";
import StatusTag from "@/components/StatusTag";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/#projects"
        className="font-mono text-xs uppercase tracking-widest text-paper-dim hover:text-signal-amber"
      >
        ← All builds
      </Link>

      <div className="mt-6 flex items-center gap-3">
        <span className="font-mono text-xs text-paper-dim">
          {String(project.order).padStart(2, "0")}
        </span>
        <StatusTag status={project.status} />
      </div>

      <h1 className="mt-4 font-display text-3xl font-bold text-paper sm:text-4xl">
        {project.title}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-paper-dim">
        {project.oneLiner}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span key={s} className="tag tag-planned">
            {s}
          </span>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="font-display text-sm font-bold uppercase tracking-widest text-signal-amber">
          Problem
        </h2>
        <p className="mt-3 leading-relaxed text-paper-dim">{project.problem}</p>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-sm font-bold uppercase tracking-widest text-signal-amber">
          Approach
        </h2>
        <ol className="mt-3 space-y-2">
          {project.approach.map((step, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-paper-dim">
              <span className="font-mono text-xs text-paper-dim/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-sm font-bold uppercase tracking-widest text-verified-sage">
          Safety &amp; evidence rules
        </h2>
        <ul className="mt-3 space-y-2">
          {project.safetyNotes.map((note, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-paper-dim">
              <span className="dot mt-2 text-verified-sage" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </section>

      {project.links && project.links.length > 0 && (
        <section className="mt-10 flex flex-wrap gap-4">
          {project.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-sm bg-signal-amber px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-widest text-ink transition-opacity hover:opacity-90"
            >
              {l.label} →
            </Link>
          ))}
        </section>
      )}

      {project.status === "planned" && (
        <div className="mt-12 rounded-sm border border-ink-line bg-ink-raised p-5">
          <p className="font-mono text-xs uppercase tracking-widest text-paper-dim">
            Status
          </p>
          <p className="mt-2 text-sm text-paper-dim">
            This build hasn&apos;t started yet. Check{" "}
            <Link href="/now" className="text-signal-amber underline underline-offset-4">
              /now
            </Link>{" "}
            for current progress across all projects.
          </p>
        </div>
      )}
    </div>
  );
}
