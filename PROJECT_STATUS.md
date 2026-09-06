# Portfolio project status

_Last reviewed for JR06A: 6 September 2026_

## Current state

The portfolio represents five public, repository-ready projects in recruiter-first order:

1. JobPilot AI
2. LLM Business Insight Assistant
3. RAG Research Assistant
4. AI Job Market Skill Analyzer
5. ML Prediction App

Repository-ready, freshly deployed and production-ready are separate claims. All five source repositories were re-read at their current default-branch commits during JR06A; source-project `liveDemoAvailable` remains false unless a current hosted core interaction is actually observed.

## Source revisions synchronised

- JobPilot AI — `6cccc87eb36f779d71f021866f2f939c4d5bb133`
- LLM Business Insight Assistant — `cc909939a49ba6e1c8204b838c4089df84c9b333`
- RAG Research Assistant — `f024409cc95775933fcf78c9d31c484dcc981ef5`
- AI Job Market Skill Analyzer — `2db2b5ee870f154fc41fdfc5c54e93d44dcaa68d`
- ML Prediction App — `04aae0183f027d87ed24eb48b65787e81f608651`

## JR06A claim corrections

- JobPilot now surfaces the explicit default-off provider/privacy boundary and current 44-test/OSV evidence.
- Business Insight now surfaces the current 109-test Python 3.10–3.12 evidence while retaining 49/49 as a historical scoped benchmark.
- RAG exposes answer/refusal limitations alongside retrieval metrics rather than cherry-picking retrieval quality.
- Skill Analyzer uses dataset-scoped frequency/co-occurrence and entered-skill comparison language; its 40-posting sample is explicitly synthetic and non-representative.
- ML Prediction now reflects validation-based model selection, selected-model refit and one untouched final-test evaluation; R² is not described as accuracy.

## Deployment and media boundary

Recorded historical deployment candidates remain evidence to re-smoke, not automatic live claims. Embedded portfolio interactions are labelled as in-browser demonstrations rather than source-project hosted deployments. Current screenshots should use synthetic/public data and must not be presented as proof of deployment unless the running build is freshly verified.

## Accuracy rule

Every public claim must be supported by current source code, tests, CI, a scoped evaluation report or a fresh smoke test. Repositories are job-readiness verified; deployment freshness is a separate condition.
