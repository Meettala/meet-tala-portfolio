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
    slug: "job-market-skill-analyzer",
    order: 1,
    title: "AI Job Market Skill Analyzer",
    oneLiner:
      "A reproducible Python and Streamlit pipeline for extracting, ranking and comparing AI/ML skills from permitted job-posting data.",
    status: "verified",
    repositoryReady: true,
    liveDemoAvailable: false,
    stack: ["Python", "pandas", "SQLite", "Streamlit", "pytest"],
    problem:
      "Career advice often relies on anecdote. This project demonstrates a transparent way to measure skill frequency, co-occurrence and candidate gaps from a clearly defined dataset.",
    approach: [
      "Load synthetic or explicitly permitted job postings; the public repository does not scrape restricted platforms.",
      "Use deterministic taxonomy matching as the no-key default, with an optional strictly validated provider-assisted extraction path.",
      "Store posting and skill records in SQLite, then calculate frequency, co-occurrence and candidate-gap reports with pandas.",
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
      "Results depend on the representativeness and freshness of the supplied dataset.",
      "The repository is ready for local use; no public live deployment is currently claimed.",
    ],
    links: [
      {
        label: "View GitHub repository",
        href: "https://github.com/Meettala/ai-job-market-skill-analyzer",
        external: true,
      },
    ],
  },
  {
    slug: "ml-prediction-app",
    order: 2,
    title: "ML Prediction App",
    oneLiner:
      "An end-to-end machine-learning application with reproducible training, honest evaluation, validated inference and a deployable interface.",
    status: "verified",
    repositoryReady: true,
    liveDemoAvailable: false,
    stack: ["Python", "scikit-learn", "FastAPI", "Streamlit", "pytest"],
    problem:
      "A notebook alone does not demonstrate production-minded ML engineering. This project covers data preparation, model comparison, artefact validation, API inference and user-facing delivery.",
    approach: [
      "Prepare a public aggregate housing dataset with reproducible train/test handling.",
      "Train and compare a transparent baseline with a stronger tree-based model using RMSE, MAE and R².",
      "Persist model metadata and reject incompatible or malformed artefacts at load time.",
      "Validate request ranges before prediction and return safe user-facing errors.",
      "Run tests, Ruff and dependency auditing across Python 3.10–3.12 in CI.",
    ],
    safetyNotes: [
      "Predictions are explicitly illustrative and are not financial, investment or housing advice.",
      "Evaluation reports include the baseline and selected model instead of hiding weaker results.",
      "The dataset is aggregate and does not contain personal applicant records.",
      "Inference inputs are bounded and validated before reaching the model.",
    ],
    limitations: [
      "Historical aggregate data cannot represent every present-day local housing condition.",
      "Model quality is limited by the original feature set and sampling assumptions.",
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
    approach: [
      "Chunk documents and build an explainable local TF-IDF retrieval index without requiring an API key.",
      "Return cited extractive answers by default and refuse when retrieval confidence is too low.",
      "Treat provider output, when enabled, as untrusted and restrict citations to retrieved chunks.",
      "Validate request shapes, sizes and provider responses at every boundary.",
      "Ship deterministic CI, OSV scanning and a non-root standalone Docker image.",
    ],
    safetyNotes: [
      "Document text is escaped and treated as untrusted data rather than instructions.",
      "Every accepted answer must resolve to an allow-listed source chunk.",
      "Low-confidence questions return a refusal rather than a fabricated answer.",
      "Provider failures fall back safely to the local extractive path.",
    ],
    limitations: [
      "TF-IDF retrieval is lexical and may miss semantically related wording.",
      "The assistant is not a substitute for reviewing the original document.",
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
    slug: "jobpilot-ai",
    order: 4,
    title: "JobPilot AI",
    oneLiner:
      "An evidence-grounded job application assistant that matches a CV to a role, drafts truthful material and keeps automation behind explicit approval.",
    status: "verified",
    repositoryReady: true,
    liveDemoAvailable: false,
    stack: ["Next.js", "TypeScript", "Vitest", "Supabase design", "n8n design"],
    problem:
      "Application assistants can improve wording while quietly inventing experience or taking unwanted actions. JobPilot AI is designed around evidence traceability and human approval.",
    approach: [
      "Convert CV statements into an evidence bank and match those items against extracted job requirements.",
      "Assemble the default cover letter deterministically from real evidence text and list unsupported requirements separately.",
      "Restrict optional providers to selecting bounded, allow-listed evidence identifiers rather than writing unrestricted claims.",
      "Generate interview and LinkedIn suggestions while preserving the same evidence boundary.",
      "Use a propose-only tracker: pending actions require explicit approval, replayed approvals are rejected and no sending capability exists.",
    ],
    safetyNotes: [
      "Unsupported experience is reported rather than invented.",
      "Provider-selected evidence must exist in the candidate evidence bank.",
      "Tracker suggestions have no side effects until a user explicitly approves them.",
      "Supabase and n8n files are documented design examples and are not presented as wired production services.",
    ],
    limitations: [
      "The public tracker uses in-memory state and resets when the server restarts.",
      "Taxonomy-based matching may miss unusual wording or specialised requirements.",
      "The tool does not auto-apply, message recruiters or guarantee interviews or employment.",
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
    order: 5,
    title: "LLM Business Insight Assistant",
    oneLiner:
      "A CSV analysis assistant where every natural-language question resolves to a validated operation instead of generated code.",
    status: "verified",
    repositoryReady: true,
    liveDemoAvailable: false,
    stack: ["Python", "pandas", "Validated QuerySpec", "pytest"],
    problem:
      "Allowing a model to generate and execute arbitrary Python or SQL against uploaded business data creates avoidable security and correctness risks.",
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
      "No verified public live deployment is currently claimed.",
    ],
    links: [
      {
        label: "View GitHub repository",
        href: "https://github.com/Meettala/llm-business-insight-assistant",
        external: true,
      },
    ],
  },
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);
