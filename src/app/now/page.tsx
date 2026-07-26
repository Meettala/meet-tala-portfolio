import Link from "next/link";
import { projects } from "@/lib/projects";
import StatusTag from "@/components/StatusTag";

export const metadata = {
  title: "Project status — Meet Tala",
  description:
    "Repository readiness and public-demo availability for Meet Tala's applied AI and data science portfolio.",
};

export default function NowPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="font-mono text-xs uppercase tracking-widest text-signal-amber">
        verified portfolio status
      </div>
      <h1 className="mt-4 font-display text-3xl font-bold text-paper">
        Five repositories ready for review
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-paper-dim">
        Repository-ready means the project has passed its documented engineering,
        testing, security and presentation checks. It does not automatically mean a
        public live demo is deployed.
      </p>

      <div className="mt-10 divide-y divide-ink-line border-y border-ink-line">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="-mx-2 flex items-center justify-between gap-4 rounded-sm px-2 py-5 transition-colors hover:bg-ink-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-amber focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            <div>
              <div className="font-display text-sm font-bold text-paper">
                {project.title}
              </div>
              <div className="mt-1 text-xs text-paper-dim">
                {project.stack.join(" · ")}
              </div>
              <div className="mt-2 font-mono text-[0.65rem] uppercase tracking-wide text-paper-dim/80">
                Public demo: {project.liveDemoAvailable ? "verified" : "not claimed"}
              </div>
            </div>
            <StatusTag status={project.status} />
          </Link>
        ))}
      </div>

      <p className="mt-8 text-sm leading-relaxed text-paper-dim">
        Each case study links to its public GitHub repository. Commit history and CI
        runs provide the most precise evidence of completion.
      </p>
    </div>
  );
}
