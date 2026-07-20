# Meet Tala — Applied AI / Data Science Portfolio

Portfolio site for a set of five evidence-grounded AI/ML projects, built to
demonstrate real, working systems rather than notebooks — plus the
engineering process, safety design, and honest limitations behind each one.

## Live builds

| # | Project | Status |
|---|---|---|
| 1 | AI Job Market Skill Analyzer | Planned |
| 2 | ML Prediction App | Planned |
| 3 | RAG Research Assistant | Planned |
| 4 | JobPilot AI (evidence-grounded job application assistant) | Planned |
| 5 | LLM Business Insight Assistant | Planned |

Status is tracked live at `/now` on the deployed site, and in
`PROJECT_STATUS.md` at the repo root.

## Principle

Every project here follows one rule: **a claim without evidence doesn't
ship — it gets flagged instead.** See `docs/security/safety-rules.md`.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Supabase ·
deployed on Vercel.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in values as each project needs them
npm run dev
```

## Repo structure

```text
src/
  app/            routes: /, /projects/[slug], /now
  components/      shared UI (Nav, Footer, StatusTag)
  lib/projects.ts  single source of truth for project data + status
docs/
  product/         specs, scope docs per project
  security/         privacy, safety, and security rules
  testing/          prompt-injection and hostile-input test docs
PROJECT_STATUS.md   live build log across the whole 7-project program
```

## Docs

- [`docs/security/safety-rules.md`](docs/security/safety-rules.md)
- [`docs/security/privacy-by-design.md`](docs/security/privacy-by-design.md)
- [`docs/product/portfolio-case-study.md`](docs/product/portfolio-case-study.md)
