"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

/*
 * Self-contained client-side port of the template cover-letter path from
 * the jobpilot-ai repo (evidence extraction + matching + blocked-claims
 * enforcement) so this demo runs entirely in the browser. Same reasoning
 * as the other two live demos on this site.
 */

const SKILL_TAXONOMY: Record<string, string[]> = {
  Python: ["python"],
  SQL: ["sql", "postgresql", "mysql"],
  "Machine Learning": ["machine learning", "ml model", "scikit-learn", "sklearn"],
  Pandas: ["pandas"],
  "LLM APIs": ["openai api", "anthropic api", "claude api", "llm api"],
  RAG: ["rag", "retrieval augmented generation"],
  Docker: ["docker"],
  Kubernetes: ["kubernetes", "k8s"],
  "Cloud (AWS)": ["aws", "amazon web services"],
  Git: ["git", "github", "version control"],
  "Next.js/React": ["next.js", "react", "nextjs"],
  TypeScript: ["typescript"],
  "Data Visualization": ["tableau", "power bi", "data visualization"],
};

function findSkillMentions(text: string) {
  const normalized = ` ${text.toLowerCase().replace(/[^a-z0-9+./#& ]/g, " ")} `;
  const found: { skill: string }[] = [];
  for (const [skill, variants] of Object.entries(SKILL_TAXONOMY)) {
    if (variants.some((v) => normalized.includes(v))) found.push({ skill });
  }
  return found;
}

type Evidence = { skill: string; text: string; confidence: "high" | "medium" | "low" };

function buildEvidenceBank(cv: string): Evidence[] {
  const sentences = cv.split(/(?<=[.!?])\s+|\n+/).map((s) => s.trim()).filter((s) => s.length > 8);
  const actionVerbs = ["built", "developed", "led", "designed", "implemented", "deployed", "created", "shipped"];
  const items: Evidence[] = [];
  for (const sentence of sentences) {
    for (const { skill } of findSkillMentions(sentence)) {
      if (items.some((i) => i.skill === skill)) continue;
      const hasVerb = actionVerbs.some((v) => sentence.toLowerCase().includes(v));
      items.push({ skill, text: sentence, confidence: hasVerb ? "high" : "medium" });
    }
  }
  return items;
}

function extractRequiredSkills(jd: string): string[] {
  const sentences = jd.split(/(?<=[.!?])\s+|\n+/);
  const required = new Set<string>();
  for (const s of sentences) for (const { skill } of findSkillMentions(s)) required.add(skill);
  return Array.from(required);
}

const SAMPLE_CV = `Experience
Built a machine learning pipeline in Python using pandas and scikit-learn.
Developed a RAG system using retrieval augmented generation and the OpenAI API.
Deployed services with Docker and used Git for version control.`;

const SAMPLE_JD = `We need a Python engineer with machine learning and pandas experience.
Kubernetes experience is required. AWS is preferred.`;

export default function JobPilotDemo() {
  const [cv, setCv] = useState(SAMPLE_CV);
  const [jd, setJd] = useState(SAMPLE_JD);

  const evidence = useMemo(() => buildEvidenceBank(cv), [cv]);
  const required = useMemo(() => extractRequiredSkills(jd), [jd]);

  const matched = required.filter((s) => evidence.some((e) => e.skill === s));
  const missing = required.filter((s) => !evidence.some((e) => e.skill === s));
  const matchScore = required.length > 0 ? Math.round((matched.length / required.length) * 100) : 0;

  const letterLines = matched
    .map((skill) => evidence.find((e) => e.skill === skill))
    .filter((e): e is Evidence => e !== undefined && e.confidence !== "low")
    .map((e) => `- ${e.text}`);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/projects/jobpilot-ai" className="font-mono text-xs uppercase tracking-widest text-paper-dim hover:text-signal-amber">
        ← Back to case study
      </Link>

      <h1 className="mt-6 font-display text-3xl font-bold text-paper">Try the evidence-grounding engine, live</h1>
      <p className="mt-3 text-paper-dim leading-relaxed">
        Runs entirely in your browser. Edit the CV or job description below and watch the match score,
        the cover letter, and the blocked claims update — notice that a required skill with no evidence
        in the CV never makes it into the letter, it only ever shows up as a blocked claim.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <label className="font-mono text-xs uppercase tracking-widest text-paper-dim">Your CV</label>
          <textarea className="mt-2 w-full rounded-sm border border-ink-line bg-ink-raised p-3 text-xs text-paper" rows={7} value={cv} onChange={(e) => setCv(e.target.value)} />
        </div>
        <div>
          <label className="font-mono text-xs uppercase tracking-widest text-paper-dim">Job description</label>
          <textarea className="mt-2 w-full rounded-sm border border-ink-line bg-ink-raised p-3 text-xs text-paper" rows={7} value={jd} onChange={(e) => setJd(e.target.value)} />
        </div>
      </div>

      <div className="mt-8 rounded-sm border border-ink-line bg-ink-raised p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-paper-dim">Match score</p>
        <p className="mt-1 font-display text-4xl font-bold text-signal-amber">{matchScore}%</p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="tag tag-verified mb-2">Matched</p>
          <ul className="space-y-1 text-sm text-paper-dim">{matched.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
        <div>
          <p className="tag tag-blocked mb-2">Missing / blocked claims</p>
          <ul className="space-y-1 text-sm text-paper-dim">{missing.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="font-display text-sm font-bold uppercase tracking-widest text-signal-amber">Cover letter (evidence-only)</h2>
        <div className="mt-3 rounded-sm border border-ink-line bg-ink-raised p-5 text-sm leading-relaxed text-paper">
          <p>Dear Hiring Manager,</p>
          <p className="mt-2">Based on the role&apos;s requirements, here is directly relevant experience from my background:</p>
          <div className="mt-2 whitespace-pre-line">{letterLines.join("\n") || "(No matched, high-confidence evidence found for this job yet.)"}</div>
          {missing.length > 0 && (
            <p className="mt-4 text-xs text-blocked-rose">
              Blocked claims (not mentioned above — no evidence found): {missing.join(", ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
