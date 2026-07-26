# Contributing

## Before changing portfolio claims

Verify the linked repository, merged implementation and current CI. Do not add deployment status, screenshots, performance numbers, test counts or outcomes unless they are supported by current evidence.

## Development workflow

1. Create a focused branch.
2. Install with `npm ci`.
3. Update `src/lib/projects.ts` when project facts change.
4. Add or update tests for data-contract changes.
5. Run `npm run verify`.
6. Document accessibility, security or deployment effects in the pull request.

## Content rules

- Keep repository-ready and live-demo status separate.
- Preserve honest limitations for every case study.
- Use public, non-sensitive links only.
- Do not commit private CVs, API keys, analytics secrets or infrastructure credentials.
- External links must use HTTPS and open with safe `rel` attributes.

## Accessibility

Maintain semantic headings, labelled navigation, visible keyboard focus, reduced-motion support and readable text contrast. New interactive controls must work without a mouse.
