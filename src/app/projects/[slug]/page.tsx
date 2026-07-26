import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import StatusTag from "@/components/StatusTag";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.title} | Meet Tala`,
    description: project.oneLiner,
  };
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
        className="font-mono text-xs uppercase tracking-widest text-paper-dim hover:text-signal-amber focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-amber"
      >
        ← All builds
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="font-mono text-xs text-paper-dim">
          {String(project.order).padStart(2, "0")}
        </span>
        <StatusTag status={project.status} />
        <span className="font-mono text-xs text-paper-dim">
          {project.liveDemoAvailable ? "Public demo verified" : "No public demo claimed"}
        </span>
      </div>

      <h1 className="mt-4 font-display text-3xl font-bold text-paper sm:text-4xl">
        {project.title}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-paper-dim">
        {project.oneLiner}
      </p>

      <div className="mt-6 flex flex-wrap gap-2" aria-label="Technology stack">
        {project.stack.map((technology) => (
          <span key={technology} className="tag tag-planned">
            {technology}
          </span>
        ))}
      </div>

      <section className="mt-12" aria-labelledby="problem-heading">
        <h2
          id="problem-heading"
          className="font-display text-sm font-bold uppercase tracking-widest text-signal-amber"
        >
          Problem
        </h2>
        <p className="mt-3 leading-relaxed text-paper-dim">{project.problem}</p>
      </section>

      <section className="mt-10" aria-labelledby="approach-heading">
        <h2
          id="approach-heading"
          className="font-display text-sm font-bold uppercase tracking-widest text-signal-amber"
        >
          Approach
        </h2>
        <ol className="mt-3 space-y-2">
          {project.approach.map((step, index) => (
            <li key={step} className="flex gap-3 leading-relaxed text-paper-dim">
              <span className="font-mono text-xs text-paper-dim/60" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10" aria-labelledby="safety-heading">
        <h2
          id="safety-heading"
          className="font-display text-sm font-bold uppercase tracking-widest text-verified-sage"
        >
          Safety and evidence rules
        </h2>
        <ul className="mt-3 space-y-2">
          {project.safetyNotes.map((note) => (
            <li key={note} className="flex gap-3 leading-relaxed text-paper-dim">
              <span className="dot mt-2 text-verified-sage" aria-hidden="true" />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="limitations-heading">
        <h2
          id="limitations-heading"
          className="font-display text-sm font-bold uppercase tracking-widest text-paper"
        >
          Honest limitations
        </h2>
        <ul className="mt-3 space-y-2">
          {project.limitations.map((limitation) => (
            <li key={limitation} className="flex gap-3 leading-relaxed text-paper-dim">
              <span aria-hidden="true">—</span>
              <span>{limitation}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 flex flex-wrap gap-4" aria-label="Project links">
        {project.links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noreferrer" : undefined}
            className="rounded-sm bg-signal-amber px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-widest text-ink transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper"
          >
            {link.label}
            {link.external ? " ↗" : " →"}
          </Link>
        ))}
      </section>
    </div>
  );
}
