export type ProjectStatus = "verified" | "progress" | "planned";

export type ProjectLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type Project = {
  slug: string;
  order: number;
  title: string;
  oneLiner: string;
  status: ProjectStatus;
  repositoryReady: boolean;
  liveDemoAvailable: boolean;
  stack: string[];
  problem: string;
  highlights: string[];
  verificationSignal: string;
  approach: string[];
  safetyNotes: string[];
  limitations: string[];
  links: ProjectLink[];
};

export const statusLabel: Record<ProjectStatus, string> = {
  verified: "Repository ready",
  progress: "In progress",
  planned: "Planned",
};

export const statusClass: Record<ProjectStatus, string> = {
  verified: "tag-verified",
  progress: "tag-progress",
  planned: "tag-planned",
};

export const projects: Project[] = [
  {
    slug: "jobpilot-ai",
    order: 1,
    title: "JobPilot AI",
    oneLiner:
      "An evidence-grounded job application assistant that matches a CV to a role, drafts truthful material and keeps automation behind explicit approval.",
    status: "verified",
    repositoryReady: true,
    liveDemoAvailable: false,
    stack: ["Next.js", "TypeScript", "Vitest", "Docker", "Optional OpenAI / Anthropic"],
    problem:
      "Application assistants can improve wording while quietly inventing experience or taking unwanted actions. JobPilot AI is designed around evidence traceability and human approval.",
    highlights: [
      "Builds an evidence bank from CV statements and assembles the default cover letter from supported evidence instead of unrestricted generation.",
      "Constrains optional providers to selecting allow-listed evidence identifiers, with deterministic fallback for malformed or unsupported output.",
      "Uses a propose-only tracker where actions require explicit approval, rejected actions never execute and replayed approvals are rejected.",
    ],
    verificationSignal:
      "44 Vitest tests pass on the verified main commit; CI also runs typecheck, zero-warning lint, the production build and OSV scanning with no issues found.",
    approach: [
      "Convert CV statements into an evidence bank and match those items against extracted job requirements.",
      "Assemble the default cover letter deterministically from real evidence text and list unsupported requirements separately.",
      "Restrict optional providers to selecting bounded, allow-listed evidence identifiers rather than writing unrestricted claims.",
      "Generate interview and LinkedIn suggestions while preserving the same evidence boundary.",
      "Use a propose-only tracker: pending actions require explicit approval, replayed approvals are rejected and no sending capability exists.",
    ],
    safetyNotes: [
      "Unsupported experience is reported rather than invented.",
      "Provider mode requires an explicit ENABLE_PROVIDER_MODE=true flag plus a key; repository defaults are off, and the analysis UI shows a pre-submit beta privacy notice.",
      "Tracker suggestions have no side effects until a user explicitly approves them.",
      "Supabase and n8n files are documented design examples and are not presented as wired production services.",
    ],
    limitations: [
      "The public tracker uses in-memory state and resets when the server restarts.",
      "Taxonomy-based matching may miss unusual wording or specialised requirements.",
      "The tool does not auto-apply, message recruiters or guarantee interviews or employment; no current public JobPilot deployment is claimed.",
    ],
    links: [
      {
        label: "View GitHub repository",
        href: "https://github.com/Meettala/jobpilot-ai",
        external: true,
      },
    ],
  },
  {
    slug: "llm-business-insight-assistant",
    order: 2,
    title: "LLM Business Insight Assistant",
    oneLiner:
      "A CSV analysis assistant where every natural-language question resolves to a validated operation instead of generated code.",
    status: "verified",
    repositoryReady: true,
    liveDemoAvailable: false,
    stack: ["Python", "pandas", "Streamlit", "Validated QuerySpec", "pytest"],
    problem:
      "Allowing a model to generate and execute arbitrary Python or SQL against uploaded business data creates avoidable security and correctness risks.",
    highlights: [
      "Resolves natural-language requests to a typed, whitelisted QuerySpec rather than generated Python, SQL or pandas expressions.",
      "Validates operations, columns and inferred types before a fixed pandas executor can run the requested analysis.",
      "Returns grounded answers, chart-ready results and downloadable audits while keeping CSV cell content inert.",
    ],
    verificationSignal:
      "109 tests pass across Python 3.10–3.12 with Ruff, dependency auditing and a non-root Docker smoke; the historical 49/49 approved benchmark remains scoped evidence, not universal CSV accuracy.",
    approach: [
      "Inspect uploaded CSV columns and types without executing cell contents.",
      "Resolve questions to a fixed QuerySpec containing a whitelisted aggregation or trend operation and real column names.",
      "Validate the QuerySpec before executing a fixed pandas implementation—without eval, exec or dynamically generated SQL.",
      "Return charts and explanations grounded in the computed result.",
      "Test malformed requests, injection-style cell values and calculation correctness independently.",
    ],
    safetyNotes: [
      "No generated code path exists in the analysis pipeline.",
      "CSV cells containing formula or SQL-like text remain inert data.",
      "Operations and columns must pass a fixed whitelist before execution.",
      "Narrative answers are tied to the validated numerical result.",
    ],
    limitations: [
      "The supported question set is intentionally narrower than arbitrary exploratory analysis.",
      "Automatic type inference can require manual correction for unusual CSV formats.",
      "No verified public live deployment is currently claimed by this portfolio.",
    ],
    links: [
      {
        label: "View GitHub repository",
        href: "https://github.com/Meettala/llm-business-insight-assistant",
        external: true,
      },
    ],
  },
  {
    slug: "rag-research-assistant",
    order: 3,
    title: "RAG Research Assistant",
    oneLiner:
      "A document question-answering assistant with explainable local retrieval, citations and an explicit refusal when evidence is insufficient.",
    status: "verified",
    repositoryReady: true,
    liveDemoAvailable: false,
    stack: ["Next.js", "TypeScript", "TF-IDF", "Vitest", "Docker"],
    problem:
      "Many document chat demos produce confident answers beyond their source material. This project prioritises grounded retrieval, visible evidence and safe fallback behaviour.",
    highlights: [
      "Builds a deterministic local TF-IDF retrieval path with cited extractive answers that works without an API key.",
      "Returns an explicit not-covered response when retrieval confidence is too low instead of fabricating an answer.",
      "Restricts optional provider output to a strict schema and retrieved citation allow-list, with safe extractive fallback on failure.",
    ],
    verificationSignal:
      "68 tests plus a 57-case synthetic evaluation report 94.6% Hit@1, 73.0% answer accuracy and 79.0% overall accuracy, with 10.0% false answers and 24.3% over-refusal; CI also runs build, OSV and non-root Docker checks.",
    approach: [
      "Chunk documents and build an explainable local TF-IDF retrieval index without requiring an API key.",
      "Return cited extractive answers by default and refuse when retrieval confidence is too low.",
      "Treat provider output, when enabled, as untrusted and restrict citations to retrieved chunks.",
      "Validate request shapes, sizes and provider responses at every boundary.",
      "Ship deterministic CI, dependency scanning and a non-root standalone Docker image.",
    ],
    safetyNotes: [
      "Document text is escaped and treated as untrusted data rather than instructions.",
      "Every accepted answer must resolve to an allow-listed source chunk.",
      "Low-confidence questions return a refusal rather than a fabricated answer.",
      "Provider failures fall back safely to the local extractive path.",
    ],
    limitations: [
      "TF-IDF retrieval is lexical and may miss semantically related wording.",
      "The 57-case evaluation still contains known answer/refusal failures inside its committed threshold envelope; the assistant is not a substitute for reviewing the original document.",
      "No public live deployment is claimed until a verified URL and genuine demo are added.",
    ],
    links: [
      {
        label: "View GitHub repository",
        href: "https://github.com/Meettala/rag-research-assistant",
        external: true,
      },
    ],
  },
  {
    slug: "job-market-skill-analyzer",
    order: 4,
    title: "AI Job Market Skill Analyzer",
    oneLiner:
      "A reproducible Python/SQLite analytics pipeline for extracting and aggregating skills from a defined synthetic or permitted posting dataset.",
    status: "verified",
    repositoryReady: true,
    liveDemoAvailable: false,
    stack: ["Python", "pandas", "SQLite", "Streamlit", "pytest"],
    problem:
      "Skill-analysis claims can become misleading when a small sample is presented as the labour market. This project keeps frequency, co-occurrence and entered-skill comparisons scoped to a clearly defined dataset.",
    highlights: [
      "Uses deterministic taxonomy matching as the no-key default, with a strictly validated optional provider-assisted extraction path.",
      "Stores posting and skill records with parameterised SQLite, foreign keys and duplicate protection.",
      "Uses the true posting-count denominator for skill frequency, dataset-scoped co-occurrence and a literal entered-skill comparison without treating absence as a personal deficiency.",
    ],
    verificationSignal:
      "55 tests pass across Python 3.10–3.12, including a 9-case deterministic extraction regression set; CI also runs pip check, Ruff, pip-audit and a non-root Streamlit Docker smoke.",
    approach: [
      "Load the 40 deterministic synthetic postings or other explicitly permitted data; the public repository does not scrape restricted platforms.",
      "Use the curated AI/ML taxonomy as the deterministic default; ESCO is a verified broad reference/lookup artefact rather than the active all-domain extractor.",
      "Store posting and skill records with parameterised SQLite and duplicate protection, then calculate sample frequency, co-occurrence and entered-skill comparison outputs.",
      "Expose the analysis through a Streamlit dashboard and exportable report files.",
      "Verify repeat runs, malformed inputs, provider failures and report calculations through Python 3.10–3.12 CI.",
    ],
    safetyNotes: [
      "Public examples use synthetic or explicitly permitted data.",
      "Provider output is treated as untrusted and validated before use.",
      "The deterministic extractor remains a first-class no-key mode.",
      "Reports describe the analysed sample rather than claiming complete market coverage.",
    ],
    limitations: [
      "Taxonomy matching cannot cover every new role title, synonym or specialist skill.",
      "The committed 40-posting sample is synthetic and non-representative; the project does not provide real-time or population-wide labour-market coverage.",
      "The repository is ready for local use; no public live deployment is currently claimed.",
    ],
    links: [
      {
        label: "View GitHub repository",
        href: "https://github.com/Meettala/job-market-skill-analyzer",
        external: true,
      },
    ],
  },
  {
    slug: "ml-prediction-app",
    order: 5,
    title: "ML Prediction App",
    oneLiner:
      "An end-to-end machine-learning application with reproducible training, honest evaluation, validated inference and a deployable interface.",
    status: "verified",
    repositoryReady: true,
    liveDemoAvailable: false,
    stack: ["Python", "scikit-learn", "FastAPI", "Streamlit", "pytest"],
    problem:
      "A notebook alone does not demonstrate production-minded ML engineering. This project covers data preparation, model comparison, artefact validation, API inference and user-facing delivery.",
    highlights: [
      "Compares fixed Linear Regression and Random Forest candidates on validation RMSE, then refits the selected Random Forest and evaluates it once on an untouched final test set.",
      "Persists a versioned model bundle with canonical feature order and rejects missing, corrupt or incompatible artefacts.",
      "Validates API and UI inputs before inference and exposes the model through FastAPI, Streamlit and a non-root Docker image.",
    ],
    verificationSignal:
      "36 tests pass across Python 3.10–3.12; real-data CI regenerates committed metrics byte-for-byte, while pip check, Ruff, pip-audit, artifact compatibility and non-root Docker/API smoke gates also pass.",
    approach: [
      "Clean 20,640 historical California Housing rows to 20,597 and split deterministically into 12,357 train, 4,120 validation and 4,120 final-test rows.",
      "Select Random Forest on validation RMSE (0.5356 vs 0.6877), refit it on train + validation, then report final-test RMSE 0.4771, MAE 0.3202 and R² 0.8290.",
      "Persist model metadata and reject incompatible or malformed artefacts at load time.",
      "Validate request ranges before prediction and return safe user-facing errors.",
      "Run tests, Ruff and dependency auditing across Python 3.10–3.12 in CI.",
    ],
    safetyNotes: [
      "Predictions are explicitly illustrative and are not financial, investment or housing advice.",
      "The final test does not select the model; R² 0.8290 means variance explained on this historical split, not 82.9% prediction accuracy.",
      "The dataset is aggregate and does not contain personal applicant records.",
      "Inference inputs are bounded and validated before reaching the model.",
    ],
    limitations: [
      "The target is a historical 1990 median block-group value, not a current individual-property valuation.",
      "Final evidence comes from one deterministic held-out split; it does not establish temporal or population-wide generalisation.",
      "The repository is deployment-ready, but this portfolio does not claim a currently public demo URL.",
    ],
    links: [
      {
        label: "View GitHub repository",
        href: "https://github.com/Meettala/ml-prediction-app",
        external: true,
      },
    ],
  },
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);
