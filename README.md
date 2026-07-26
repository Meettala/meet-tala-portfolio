# Meet Tala — Applied AI & Data Science Portfolio

A recruiter-facing Next.js portfolio for five public, repository-ready AI and data science projects. Each case study presents the problem, implementation approach, safety boundaries, linked source code and honest limitations.

**Repository-ready is not the same as publicly deployed.** The site deliberately avoids live-demo claims until a verified URL and tested deployment exist.

## Featured repositories

| # | Project | Repository status | Public demo |
|---|---|---|---|
| 1 | AI Job Market Skill Analyzer | Ready | Not claimed |
| 2 | ML Prediction App | Ready | Not claimed |
| 3 | RAG Research Assistant | Ready | Not claimed |
| 4 | JobPilot AI | Ready | Not claimed |
| 5 | LLM Business Insight Assistant | Ready | Not claimed |

The propose-only application tracker is presented inside JobPilot AI because it is implemented in the same repository rather than as a sixth standalone project.

## Portfolio principles

- Claims must be supported by linked code, tests, CI or clearly labelled documentation.
- Repository readiness and deployment status remain separate fields.
- Every case study includes safety rules and limitations.
- No private CVs, API keys, analytics secrets or production credentials belong in this repository.
- The public site does not claim users, conversion rates, performance benchmarks or employment outcomes without evidence.

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

GitHub Actions also scans `package-lock.json` with OSV Scanner.

## Docker

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://your-verified-domain.example \
  -t meet-tala-portfolio .

docker run --rm -p 3000:3000 meet-tala-portfolio
```

The runtime image uses Next.js standalone output and a non-root user.

## Source of truth

`src/lib/projects.ts` is the single source of truth for project order, readiness, links, approach, safety notes and limitations. Tests prevent duplicate slugs, missing repository links and unverified live-demo claims.

## Main routes

- `/` — recruiter overview and project grid
- `/projects/[slug]` — individual case studies
- `/now` — repository-readiness and deployment-status explanation
- `/sitemap.xml` and `/robots.txt` — environment-aware metadata routes

## Documentation

- [`PROJECT_STATUS.md`](PROJECT_STATUS.md)
- [`SECURITY.md`](SECURITY.md)
- [`CONTRIBUTING.md`](CONTRIBUTING.md)
- [`docs/PORTFOLIO_PRESENTATION_GUIDE.md`](docs/PORTFOLIO_PRESENTATION_GUIDE.md)
- [`AI_HANDOFF.md`](AI_HANDOFF.md)

Licensed under the MIT License.
