# Portfolio presentation guide

## Recruiter review path

A reviewer should be able to understand the portfolio in three minutes:

1. Read the homepage statement and repository-ready count.
2. Open one project matching the role.
3. Review the problem, approach, safety rules and limitations.
4. Open the linked GitHub repository and inspect its README, tests and CI.
5. Use `/now` to understand the difference between repository readiness and public deployment.

## Recommended project order

For applied AI or AI engineering roles:

1. JobPilot AI
2. RAG Research Assistant
3. LLM Business Insight Assistant
4. AI Job Market Skill Analyzer
5. ML Prediction App

For data science or machine-learning roles, lead with the ML Prediction App and AI Job Market Skill Analyzer.

## Before sharing the portfolio

- Deploy the site and set `NEXT_PUBLIC_SITE_URL` to the verified origin.
- Test the homepage, every case-study route, `/now`, sitemap and robots output.
- Test on a phone-sized viewport and with keyboard-only navigation.
- Verify all five GitHub links.
- Capture one real screenshot of the deployed homepage.
- Do not add demo buttons until those demo URLs are publicly accessible and tested.

## CV bullet

> Built and documented five safety-first applied AI and data science projects, including evidence-grounded RAG, validated natural-language data analysis, end-to-end ML delivery and approval-gated job tooling; added automated testing, CI, dependency scanning and recruiter-focused case studies.

## Interview explanation

Use a simple structure:

- **Problem:** what failure or user need the project addresses.
- **Boundary:** what the system deliberately refuses or validates.
- **Implementation:** the main pipeline and architecture.
- **Evidence:** tests, CI and repository documentation.
- **Limitation:** what remains intentionally unsupported or undeployed.

## Honest deployment language

Until a public URL is verified, say:

> The repository and deployment package are ready. I have not added a public-demo claim to the portfolio yet because I only publish deployment links after verifying the running build.
