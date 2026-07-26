# AI Handoff — Meet Tala Portfolio

> Paste this file into another AI assistant to continue the project without restarting it. Always verify the live repository, active pull requests, branch head, dependencies and CI before editing.

## Continuation instruction

You are continuing `Meettala/meet-tala-portfolio`, a public portfolio site owned by Meet Tala.

Present completed engineering work accurately. Never invent deployments, screenshots, users, customers, metrics, testimonials or capabilities. Verify project claims against the linked repositories before publishing them. Do not commit private CV data, contact details not approved for publication, immigration or employer documents, API keys, analytics secrets or infrastructure credentials.

## Repository state

- Default branch: `main`
- Working branch: `agent/professional-repository-foundation`
- Pull request: #1, `Professionalize Meet Tala portfolio`
- Starting commit: `9710f0347ff5c0c81deda18d83347e5f4103a197`
- Visibility: public
- Stack: Next.js 16.2.11, React 19, TypeScript, Tailwind CSS 4, Vitest, Docker
- Last updated: 26 July 2026

## Portfolio scope

The site presents five public, repository-ready projects:

1. `ai-job-market-skill-analyzer`
2. `ml-prediction-app`
3. `rag-research-assistant`
4. `jobpilot-ai`, including its propose-only tracker
5. `llm-business-insight-assistant`

The tracker is not presented as a sixth repository because it is implemented inside JobPilot AI.

## Completed professionalisation work

- Replaced stale project claims with a five-project source of truth in `src/lib/projects.ts`.
- Added verified GitHub links and separate `repositoryReady` and `liveDemoAvailable` fields.
- Removed unsupported live-demo links and claims.
- Added safety notes, limitations and recruiter-focused descriptions for every case study.
- Added data-integrity tests for unique order/slug values, repository links, deployment claims and case-study completeness.
- Upgraded Next.js and `eslint-config-next` to 16.2.11.
- Added PostCSS 8.5.18 and Sharp 0.35.3 overrides and regenerated `package-lock.json`.
- Added TypeScript, zero-warning ESLint, Vitest and production-build scripts.
- Added read-only GitHub Actions CI and Google OSV Scanner.
- Improved homepage, project pages, `/now`, navigation and footer accessibility.
- Added skip navigation, semantic labels, keyboard focus and reduced-motion support.
- Added environment-aware metadata, sitemap, robots and generated Open Graph image.
- Added standalone Next.js output and a non-root Docker image.
- Added MIT licence, security policy, contribution guide, public-safe status file, recruiter README and presentation guide.

## Accuracy and deployment boundary

- Repository-ready does not mean publicly deployed.
- No public demo is currently claimed by `src/lib/projects.ts`.
- Production must set `NEXT_PUBLIC_SITE_URL` to a verified origin.
- Only change `liveDemoAvailable` or add demo links after testing the real public URL.
- Do not hard-code a guessed Vercel or custom-domain URL.

## Finalisation checklist

1. Verify the exact current PR head passes `npm ci`, TypeScript, zero-warning ESLint, Vitest, production build and OSV scanning.
2. Resolve any scanner finding without weakening the gate; document only narrow unavoidable development-only exceptions.
3. Update PR #1 with the final scope and exact green workflow run.
4. Mark the PR ready and squash-merge into `main`.
5. After merge, deploy manually or through an approved platform, set `NEXT_PUBLIC_SITE_URL`, test every route and only then add a public site URL to GitHub and professional profiles.

## Decisions to preserve

- Accuracy is more important than visual hype.
- Do not claim deployment without a working verified URL.
- Do not use fake screenshots, logos or metrics as evidence.
- Link only to public repositories and material owned by Meet Tala.
- Keep personal contact details out of the public site unless explicitly approved.
- Every case study must retain at least one honest limitation.
