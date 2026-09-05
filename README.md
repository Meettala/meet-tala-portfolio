# Meet Tala — Applied AI/ML Engineering Portfolio

A recruiter-facing Next.js portfolio for five public, repository-ready AI, ML and data projects. The portfolio emphasises evidence-grounded assistants, deterministic fallbacks, validated structured outputs, retrieval with refusal behaviour, end-to-end ML, testing, CI and Docker.

**Repository-ready, publicly deployed and production-ready are separate claims.** This repository only marks a project demo as live after a fresh smoke test verifies that the current public URL loads and the core interaction works.

## Recruiter-first project order

| # | Project | Repository status | Fresh public demo |
|---|---|---|---|
| 1 | JobPilot AI | Ready | Not claimed |
| 2 | LLM Business Insight Assistant | Ready | Not claimed |
| 3 | RAG Research Assistant | Ready | Not claimed |
| 4 | AI Job Market Skill Analyzer | Ready | Not claimed |
| 5 | ML Prediction App | Ready | Not claimed |

The propose-only application tracker is presented inside JobPilot AI because it is implemented in the same repository rather than as a sixth standalone project.

## What the portfolio demonstrates

- Evidence-grounded LLM workflows that block or disclose unsupported claims.
- Deterministic no-key paths and safe fallbacks after provider failure.
- Strict structured-output validation and allow-listed execution boundaries.
- RAG retrieval with citation validation and explicit low-evidence refusal.
- Reproducible data pipelines, baseline-vs-model ML evaluation and validated inference.
- Automated tests, CI, dependency scanning and non-root Docker packaging.

Each project page also states an important limitation so recruiter-facing claims stay scoped to what the repositories actually demonstrate.

## Contact and application path

The verified public contact path currently available in this repository is the GitHub profile: https://github.com/Meettala

No LinkedIn or email CTA is shown because no verified professional contact URL is currently stored in the repository. Add one only after the owner provides and confirms it.

## Stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Vitest
- GitHub Actions and Google OSV Scanner
- Standalone non-root Docker deployment

## Local development

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Set `NEXT_PUBLIC_SITE_URL` only when a real deployment origin is known. Local metadata falls back to `http://localhost:3000`.

## Quality gates

```bash
npm run verify
```

This runs:

- TypeScript without emitting files,
- ESLint with zero warnings,
- portfolio data-integrity tests,
- the production Next.js build.

GitHub Actions performs the same application checks and also scans `package-lock.json` with OSV Scanner.

## Deployment status

GitHub repository metadata currently lists `https://meet-tala-portfolio.vercel.app` as the portfolio homepage. That metadata alone is not treated as a fresh deployment verification. Before sharing the portfolio for applications, smoke-test the homepage, flagship project route and all outbound project links in a browser.

## Docker

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://your-verified-domain.example \
  -t meet-tala-portfolio .

docker run --rm -p 3000:3000 meet-tala-portfolio
```

The runtime image uses Next.js standalone output and a non-root user.

## Source of truth

`src/lib/projects.ts` is the single source of truth for project order, readiness, recruiter-facing highlights, verification signals, links, approach, safety notes and limitations. Tests guard the recruiter-first order, repository URLs and live-demo consistency.

## Main routes

- `/` — recruiter overview and project grid
- `/projects/[slug]` — individual case studies with engineering evidence
- `/now` — repository-readiness and deployment-status explanation
- `/sitemap.xml` and `/robots.txt` — environment-aware metadata routes

## Documentation

- [`PROJECT_STATUS.md`](PROJECT_STATUS.md)
- [`SECURITY.md`](SECURITY.md)
- [`CONTRIBUTING.md`](CONTRIBUTING.md)
- [`docs/PORTFOLIO_PRESENTATION_GUIDE.md`](docs/PORTFOLIO_PRESENTATION_GUIDE.md)
- [`AI_HANDOFF.md`](AI_HANDOFF.md)

Licensed under the MIT License.
