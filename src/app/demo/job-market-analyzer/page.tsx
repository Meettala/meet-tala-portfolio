import Link from "next/link";
import analysis from "@/lib/job-market-analysis.json";

export const metadata = { title: "Job Market Skill Analyzer — Demo Results" };

type SkillRow = { skill: string; category: string; postings_mentioning: number; pct_of_postings: number };
type CoocRow = { skill_a: string; skill_b: string; co_occurrences: number };

const freq = analysis.skill_frequency as SkillRow[];
const cooc = analysis.skill_cooccurrence as CoocRow[];
const gap = analysis.gap_report as {
  matched_skills: { skill: string; category: string; pct_of_postings: number }[];
  missing_skills: { skill: string; category: string; pct_of_postings: number }[];
  match_rate_pct: number;
};
const maxCount = Math.max(...freq.map((f) => f.postings_mentioning));

export default function JobMarketDemoPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/projects/job-market-skill-analyzer"
        className="font-mono text-xs uppercase tracking-widest text-paper-dim hover:text-signal-amber"
      >
        ← Back to case study
      </Link>

      <h1 className="mt-6 font-display text-3xl font-bold text-paper">
        Live analysis output
      </h1>
      <p className="mt-3 text-paper-dim leading-relaxed">
        Precomputed by the Python pipeline against{" "}
        <strong className="text-paper">{analysis.postings_analyzed} synthetic sample postings</strong>{" "}
        ({analysis.generated_from}). Run it yourself with real data via the
        Streamlit app in the repo.
      </p>

      <section className="mt-12">
        <h2 className="font-display text-sm font-bold uppercase tracking-widest text-signal-amber">
          Most in-demand skills
        </h2>
        <div className="mt-4 space-y-2">
          {freq.slice(0, 12).map((row) => (
            <div key={row.skill} className="flex items-center gap-3">
              <div className="w-40 shrink-0 truncate text-sm text-paper-dim">
                {row.skill}
              </div>
              <div className="h-4 flex-1 rounded-sm bg-ink-raised">
                <div
                  className="h-4 rounded-sm bg-signal-amber"
                  style={{ width: `${(row.postings_mentioning / maxCount) * 100}%` }}
                />
              </div>
              <div className="w-16 shrink-0 text-right font-mono text-xs text-paper-dim">
                {row.pct_of_postings}%
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-sm font-bold uppercase tracking-widest text-signal-amber">
          Skills that appear together most often
        </h2>
        <div className="mt-4 divide-y divide-ink-line border-y border-ink-line">
          {cooc.slice(0, 8).map((row) => (
            <div key={`${row.skill_a}-${row.skill_b}`} className="flex items-center justify-between py-2 text-sm">
              <span className="text-paper-dim">
                {row.skill_a} <span className="text-paper-dim/50">+</span> {row.skill_b}
              </span>
              <span className="font-mono text-xs text-paper-dim">{row.co_occurrences}×</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-sm font-bold uppercase tracking-widest text-verified-sage">
          Sample gap report
        </h2>
        <p className="mt-2 text-xs text-paper-dim">
          Against an example skill set: {(analysis.candidate_skills_used as string[]).join(", ")}
        </p>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="tag tag-verified mb-2">Matched</p>
            <ul className="space-y-1 text-sm text-paper-dim">
              {gap.matched_skills.map((s) => (
                <li key={s.skill}>{s.skill}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="tag tag-blocked mb-2">Missing (high demand)</p>
            <ul className="space-y-1 text-sm text-paper-dim">
              {gap.missing_skills.map((s) => (
                <li key={s.skill}>{s.skill} <span className="text-paper-dim/50">— {s.pct_of_postings}%</span></li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-6 font-mono text-xs text-paper-dim">
          Coverage of high-demand skills: {gap.match_rate_pct}%
        </p>
      </section>
    </div>
  );
}
