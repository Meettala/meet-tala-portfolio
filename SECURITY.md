# Security policy

## Supported version

Security fixes are applied to the current `main` branch.

## Reporting a vulnerability

Do not open a public issue containing secrets, personal information or an exploitable proof of concept. Contact the repository owner privately through the GitHub profile and include:

- the affected route or file,
- the expected and observed behaviour,
- reproduction steps with non-sensitive sample data,
- the potential impact.

## Security boundaries

This repository is a public portfolio site. It should not store CV files, API keys, provider credentials, Supabase service keys, analytics secrets or private application data.

Project descriptions and links are trusted source-controlled content. A future content-management system, contact form or analytics integration would introduce new input and privacy boundaries and must receive separate validation, rate limiting, logging and data-retention review.

## Dependency policy

GitHub Actions runs deterministic installation, TypeScript, zero-warning ESLint, tests, the production build and OSV dependency scanning. Any scanner exception must be narrowly scoped, documented and removed once a compatible upstream fix is available.
