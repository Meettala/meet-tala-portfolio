# Meet Tala — AI/ML Portfolio Program: PROJECT_STATUS.md

_Last updated: 20 July 2026_

## How to use this file
Paste this whole file into a new chat with Claude and say "continue from
here" — no need to re-explain the program.

## Goal
Get hired as Junior Applied AI / Data Science Engineer by early September
2026 by shipping 7 linked, portfolio-ready AI/ML projects, fully engineered
by Claude.

## ALL 7 PROJECTS ARE CODE-COMPLETE.
None are live yet — deploy tooling has been down 4 sessions running (see
below). Everything is tested, built, and packaged, ready to go live the
moment either the connector comes back or the user runs the manual deploy.

## The 7 projects
1. **Portfolio + GitHub setup** — code complete, 6 case-study pages, 6
   live demos embedded. NOT LIVE — pending deploy.
2. **AI Job Market Skill Analyzer** — SHIPPED (was live on last
   successful deploy, several sessions ago).
3. **ML Prediction App** — code complete, 8/8 tests. Pending redeploy.
4. **RAG Research Assistant** — code complete, 11/11 tests incl. 2
   prompt-injection tests. Pending redeploy.
5. **JobPilot AI** — code complete, 11/11 tests incl. 3 prompt-injection
   tests. Core honesty guarantee (template cover-letter path has no
   generative step — structurally cannot invent a claim) proven by
   tests. Pending redeploy.
6. **LLM Business Insight Assistant** — code complete, 13/13 tests incl.
   3 injection-resistance tests. Core safety guarantee: every question
   resolves to a validated `QuerySpec` from a whitelisted operation set —
   no `eval`/`exec`/dynamic code anywhere in the pipeline, proven by
   tests (including a hostile CSV cell test). Pending redeploy.
7. **Agentic Job Application Tracker / n8n Automation** — code complete,
   9/9 tests, built as an extension inside the `jobpilot-ai` repo
   (`/jobs` page + API routes), reusing Project 5's interview-question
   generator directly. Core guarantee: three independent layers between
   "a job needs attention" and "anything changes" — proven by tests
   (adding a suggestion never changes state; only explicit approval
   does; a follow-up draft approval never auto-sends). n8n workflow JSON
   + import guide delivered (`jobpilot-ai/n8n/`) — genuinely needs the
   user's own n8n account to actually run; I built and tested everything
   up to that boundary. Pending redeploy.

**Combined: jobpilot-ai (Project 5 + 7) has 20/20 tests passing.**

## Stack
Next.js 16 (App Router) + TypeScript + Tailwind v4, Supabase, Vercel,
Python/Pandas/SQL/Streamlit/scikit-learn/FastAPI, LLM APIs, n8n.

## Environment / accounts status
- **Vercel deploy tool: unavailable for 4 sessions running** (only
  read-only tools exposed). Check once at the start of next session; if
  still down, don't retry — go straight to the zip + manual steps.
- **Manual deploy steps**: download `jobpilot-portfolio-deploy.zip` →
  unzip → `npm install` → `npx vercel login` → `npx vercel link` (scope
  "meettalas-projects", link to existing "meet-tala-portfolio" project)
  → `npx vercel --prod`. This single deploy covers all 6 live demos.
- **Supabase write tools (apply_migration/execute_sql): also
  unavailable.** Org `ykmhciarertxjipzwiqi`, project
  `dnzdmjqchaupukxafbwi` (eu-north-1). Schema for JobPilot AI + the
  tracker's `approval_queue` table is fully written in
  `jobpilot-ai/supabase/schema.sql` + `rls-policies.sql`, not yet
  applied. Both apps currently run fully in-memory — no functionality
  lost for demo purposes, just not persisted.
- OpenAI/Anthropic API key guide: delivered. User doesn't have keys yet.
  Not blocking anything — every project degrades gracefully to zero-key
  mode.
- GitHub: still no connector. All 6 project folders live under
  `/home/claude/` in the build environment, none pushed to GitHub yet.
- n8n: not connected — genuinely requires the user's own account signup.
  Workflow file is ready to import once they have one.

## Immediate next steps (pick up here)
1. Check Vercel deploy tool AND Supabase write tools at the start of the
   session — both down 4 sessions running, worth one check, then move on
   if still unavailable.
2. If Vercel is back: push the current portfolio build live — one deploy
   makes all 6 demos public.
3. If Supabase is back: apply `jobpilot-ai/supabase/schema.sql` +
   `rls-policies.sql`, then wire the tracker's in-memory store
   (`src/lib/tracker/store.ts`) to real Supabase calls.
4. All 7 projects are code-complete — remaining work is deployment,
   GitHub pushes, and optional persistence, not new features.
5. Once live: hand user `git init/add/commit` + push commands for all 6
   repos, and help write the portfolio case-study text (template already
   in `docs/product/portfolio-case-study.md`) and the CV bullets /
   LinkedIn post drafts from the original spec doc.
6. Keep updating this file after every meaningful chunk of work.

## Working agreement
- Claude does all engineering (code, docs, tests, schemas, README, case
  studies).
- User does: account signups, providing API keys, `git push`, approving
  deploys (or doing the manual deploy when connectors are down).
- Claude proactively saves progress here + to memory so no context is
  lost between sessions or if usage limits are hit.
