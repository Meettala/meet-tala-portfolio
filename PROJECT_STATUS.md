# Portfolio project status

_Last verified: 26 July 2026_

## Current state

The portfolio represents five public, repository-ready projects:

1. AI Job Market Skill Analyzer
2. ML Prediction App
3. RAG Research Assistant
4. JobPilot AI, including its propose-only application tracker
5. LLM Business Insight Assistant

Each project has its own public GitHub repository, engineering documentation, automated tests and an AI handoff file. Repository-ready status does not automatically mean that a public live demo is deployed.

## Portfolio site status

The portfolio site is being professionalised in pull request #1. The work includes:

- verified project descriptions and repository links,
- removal of unsupported live-demo claims,
- accessibility and responsive-navigation improvements,
- metadata, sitemap and robots configuration,
- deterministic CI and dependency scanning,
- Docker and deployment documentation,
- recruiter-focused case-study presentation.

## Deployment boundary

No production URL is hard-coded or claimed. A deployment should set `NEXT_PUBLIC_SITE_URL` to the verified public origin. Only after the deployed site and individual demos are tested should `liveDemoAvailable` or public demo links be changed in `src/lib/projects.ts`.

## Accuracy rule

Every public claim must be supported by the linked repository, merged implementation, tests, CI or clearly labelled documentation. Unverified performance figures, deployment claims, screenshots and user outcomes must not be added.
