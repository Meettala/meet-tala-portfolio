# Portfolio project status

_Last reviewed for JR01: 5 September 2026_

## Current state

The portfolio represents five public, repository-ready projects in recruiter-first order:

1. JobPilot AI, including its propose-only application tracker
2. LLM Business Insight Assistant
3. RAG Research Assistant
4. AI Job Market Skill Analyzer
5. ML Prediction App

Each project has a public GitHub repository plus documented engineering evidence, tests and limitations. Repository-ready does not automatically mean publicly deployed, and a public deployment does not establish production readiness.

## Portfolio site status

JR01 updates are being prepared on the `jr01/portfolio-foundation` branch rather than edited directly on `main`.

The foundation pass covers:

- correcting the Skill Analyzer repository link;
- making JobPilot the flagship project and adopting recruiter-first ordering;
- surfacing concise engineering highlights and a tests/evaluation signal on project pages;
- strengthening the homepage professional identity and flagship CTA;
- aligning README and status documentation with current implementation;
- adding the documented `npm run verify` command;
- keeping live-demo claims conservative unless a fresh core-interaction smoke test succeeds.

## Current verification status

PR #2 application verification is green: `npm ci`, TypeScript, zero-warning ESLint, 5 Vitest tests and the Next.js production build all passed on 5 September 2026.

The current OSV dependency scan is **not green**. It reports 7 fixable known vulnerabilities across 6 packages in `package-lock.json` (0 critical, 6 high, 1 medium). Because JR01 requires a current security/dependency result, the portfolio must not be treated as fully job-ready until the lockfile is regenerated with compatible patched dependency versions and the scan passes. The scan was not weakened or filtered to hide these new findings.

## Demo boundary

Historical repository metadata or README deployment URLs are not enough to mark a demo as freshly verified. `liveDemoAvailable` remains `false` unless the current URL is opened and the core project interaction is successfully exercised during the review.

The current review environment could inspect GitHub repository evidence but could not complete those interactive browser smoke tests. Therefore this branch intentionally makes no new live-demo claims.

## Portfolio deployment boundary

GitHub metadata lists `https://meet-tala-portfolio.vercel.app` as the repository homepage, but this JR01 review does not treat metadata alone as proof that the current deployment is healthy. The portfolio should be browser-smoke-tested after the branch is deployed or merged before it is used in applications.

## Contact boundary

The repository contains a verified GitHub profile link but no verified LinkedIn or professional email/contact URL. The site therefore uses GitHub as the current fallback contact/evidence path and does not invent a fuller application contact route.

## Visual evidence

The portfolio repository currently contains only generic framework SVG assets. No accurate current JobPilot screenshot was available through repository assets during this review, and the environment could not capture a live browser screenshot. A current JobPilot visual is therefore still required before final portfolio consolidation.

## Accuracy rule

Every public claim must be supported by repository code, tests, CI, a scoped evaluation report or a current smoke test. Unverified performance figures, deployment claims, screenshots, production-readiness claims and user outcomes must not be added.
