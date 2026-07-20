export type ProjectStatus = "verified" | "progress" | "planned";

export type Project = {
  slug: string;
  order: number;
  title: string;
  oneLiner: string;
  status: ProjectStatus;
  stack: string[];
  problem: string;
  approach: string[];
  safetyNotes: string[];
  links?: { label: string; href: string }[];
};

export const statusLabel: Record<ProjectStatus, string> = {
  verified: "Shipped",
  progress: "In progress",
  planned: "Planned",
};

export const statusClass: Record<ProjectStatus, string> = {
  verified: "tag-verified",
  progress: "tag-progress",
  planned: "tag-planned",
};

// Single source of truth for build status. Update this file as each
// project moves from planned -> progress -> verified; the whole site
// (home grid, /now, individual case-study pages) reads from here.
export const projects: Project[] = [
  {
    slug: "job-market-skill-analyzer",
    order: 1,
    title: "AI Job Market Skill Analyzer",
    oneLiner:
      "Pulls AI/ML job postings apart to show which skills actually matter right now, not which ones are assumed to.",
    status: "verified",
    stack: ["Python", "Pandas", "SQL", "Streamlit"],
    problem:
      "Job seekers guess which skills to prioritize from outdated advice. This tool answers it with data: what current AI/ML postings actually ask for, and how often.",
    approach: [
      "Load a set of AI/ML job postings (synthetic demo data — no scraping; see safety notes).",
      "Extract required skills with a zero-dependency rule-based taxonomy matcher, with an optional LLM-assisted pass layered on top once an API key is configured.",
      "Store postings and extracted skills in SQLite; aggregate frequency and co-occurrence with pandas/SQL.",
      "Produce a gap report comparing the market to a given candidate skill list.",
      "Ship two front ends: a Streamlit app for interactive local use, and a static results view on this site for a public demo link.",
    ],
    safetyNotes: [
      "No scraping of any platform — runs on clearly-labeled synthetic sample postings until a permitted real data source is wired up.",
      "Source URL and retrieval date stored with every posting for provenance.",
      "Optional LLM extraction treats posting text as untrusted input and is instructed never to follow embedded instructions.",
      "Works fully with zero API key configured (rule-based extraction is the default).",
    ],
    links: [{ label: "Live analysis results", href: "/demo/job-market-analyzer" }],
  },
  {
    slug: "ml-prediction-app",
    order: 2,
    title: "ML Prediction App",
    oneLiner:
      "A clean, end-to-end ML pipeline — data to trained model to a working demo anyone can try, not just a notebook.",
    status: "verified",
    stack: ["Python", "scikit-learn", "FastAPI", "Streamlit"],
    problem:
      "Notebooks show you can train a model. They don't show you can ship one. This project proves the full path: clean data, evaluated model, deployed demo.",
    approach: [
      "California Housing dataset (public, aggregate 1990 census data — no scraping, no personal data).",
      "Clean and split the data; train a Linear Regression baseline and a Random Forest, and report both honestly (RMSE, MAE, R²) rather than only the best number.",
      "Serve the Random Forest behind a FastAPI endpoint with input validation, fully tested.",
      "Ship a Streamlit demo using the real trained model, plus a genuinely live client-side demo on this site using the interpretable linear model's coefficients — clearly labeled as the simplified version, with the Random Forest's accuracy shown alongside for honesty.",
    ],
    safetyNotes: [
      "Every prediction surface states this is illustrative only, not financial or investment advice.",
      "Both models' evaluation metrics are always shown together, never just the best-looking one.",
      "Public, aggregate, block-group-level census data only — no personal or identifiable data.",
      "API input validation rejects out-of-range values rather than producing a nonsensical prediction.",
    ],
    links: [{ label: "Try the live predictor", href: "/demo/ml-prediction" }],
  },
  {
    slug: "rag-research-assistant",
    order: 3,
    title: "RAG Research Assistant",
    oneLiner:
      "Upload a document, ask it questions, get answers with citations — and an honest 'I don't know' when the document doesn't say.",
    status: "verified",
    stack: ["Next.js", "TF-IDF", "Vector search", "LLM API"],
    problem:
      "Most demo chatbots confidently answer questions their source material never covers. This one is built to refuse instead of hallucinate.",
    approach: [
      "Paragraph-aware chunking with overlap, then TF-IDF vectorization and cosine-similarity retrieval — a real, explainable vector-search technique that needs zero API key.",
      "Extractive answer mode by default: the answer is the retrieved passage itself, verbatim, with its citation — no generation, no hallucination risk.",
      "Optional LLM-generative mode once a key is configured: retrieved chunks are passed to the model, which must cite its source and is explicitly told never to follow instructions found inside the (untrusted) document text.",
      "Explicit 'not covered in this document' fallback below a confidence threshold, in both modes.",
    ],
    safetyNotes: [
      "Document text is always treated as untrusted input — delimited and never followed as instructions, enforced by construction in extractive mode and by prompt design in generative mode.",
      "11 automated tests pass, including two dedicated prompt-injection tests.",
      "Works fully with zero API key configured (extractive mode is the default).",
      "Every answer states which chunk it's based on.",
    ],
    links: [{ label: "Try the extractive mode, live", href: "/demo/rag-assistant" }],
  },
  {
    slug: "jobpilot-ai",
    order: 4,
    title: "JobPilot AI",
    oneLiner:
      "An evidence-grounded job application assistant: matches a CV to a job description, drafts truthful cover letters, and blocks any claim it can't prove.",
    status: "verified",
    stack: ["Next.js", "TypeScript", "Supabase", "LLM API"],
    problem:
      "Most 'AI resume tools' will happily invent experience to get a match. JobPilot AI is built around the opposite rule: every claim needs a receipt, or it gets blocked.",
    approach: [
      "Parse CV into an evidence bank, each item tagged with its source sentence and a confidence label.",
      "Match evidence against job requirements to produce matched / missing / weak-evidence lists and a match score.",
      "Draft cover letters that can only ever assemble sentences that already exist in the evidence bank — the default path has no generative step at all, so it's structurally incapable of inventing a claim, not just instructed not to.",
      "Unsupported requirements are always shown as a visible Blocked Claims list, never hidden or smoothed over.",
      "Generate interview questions and evidence-grounded LinkedIn suggestions; export the full analysis as Markdown.",
    ],
    safetyNotes: [
      "Never invents experience, dates, companies, or certificates — enforced structurally, not just by prompt, and proven by automated tests.",
      "All external actions (sending, applying, editing the live CV) require explicit human approval — this MVP has no send/apply functionality at all.",
      "CVs and job descriptions are treated as untrusted input; 3 dedicated prompt-injection tests pass.",
      "Supabase schema and Row Level Security policies are written and ready, scoping every table to the owning user.",
    ],
    links: [{ label: "Try the evidence engine, live", href: "/demo/jobpilot-ai" }],
  },
  {
    slug: "llm-business-insight-assistant",
    order: 5,
    title: "LLM Business Insight Assistant",
    oneLiner:
      "Upload a CSV, ask a business question in plain English, get a chart and a written answer grounded in the actual numbers.",
    status: "verified",
    stack: ["Python", "Pandas", "SQL", "LLM API"],
    problem:
      "Business stakeholders don't want to write SQL. This turns a plain-English question into a grounded, chart-backed answer instead of a plausible-sounding guess — without ever letting an LLM run arbitrary code against uploaded data.",
    approach: [
      "CSV upload with automatic schema and type detection.",
      "Every question — rule-based or LLM-parsed — resolves to a fixed, validated 'QuerySpec' naming a whitelisted operation (sum, mean, count, min, max, trend) and real columns, before anything touches the data.",
      "Execution uses a fixed set of pandas calls only — no eval, no exec, no dynamically-built SQL anywhere in the pipeline.",
      "Result rendered as chart + written explanation that states the exact numbers/columns it's based on, verified in tests against an independent pandas computation.",
    ],
    safetyNotes: [
      "No code execution from user or LLM input, ever — the single most important design decision in this project.",
      "A hostile CSV cell (SQL-injection-style text, formula injection) is treated as inert data, never as a command — proven with dedicated tests.",
      "Works fully with zero API key configured (rule-based parsing is the default).",
      "13 automated tests pass, including 3 dedicated injection-resistance tests.",
    ],
    links: [{ label: "Ask the sample data, live", href: "/demo/business-insight" }],
  },
  {
    slug: "agentic-job-tracker",
    order: 6,
    title: "Agentic Job Application Tracker",
    oneLiner:
      "Extends JobPilot AI: spots applications needing follow-up and proposes an action — but nothing ever sends or changes without explicit approval.",
    status: "verified",
    stack: ["Next.js", "Supabase", "n8n"],
    problem:
      "Automation for job hunting usually means auto-sending things you didn't review. This is the opposite: an agent that proposes, and a human who decides.",
    approach: [
      "Suggestion logic identifies jobs with a passed follow-up date or 21+ days of no status change — pure logic, no side effects.",
      "Suggestions become 'pending' approval-queue items; only an explicit Approve changes any job state, and even then a follow-up draft is never sent automatically, only marked ready.",
      "A ready-to-import n8n workflow runs the same check daily and writes to the same pending queue — it has no email, messaging, or LinkedIn node anywhere in the file.",
      "Interview prep reuses JobPilot AI's question generator directly rather than a second implementation that could drift.",
    ],
    safetyNotes: [
      "Three independent layers between 'a job needs attention' and 'anything actually changes' — each one only ever proposes until a human approves.",
      "No send/message/LinkedIn capability exists anywhere in this codebase or the n8n workflow file — enforced by what's built, not just by instruction.",
      "9 automated tests directly prove: adding a suggestion never changes state, rejecting never changes state, only explicit approval does, and re-approving is a no-op.",
    ],
    links: [{ label: "Try the approval gate, live", href: "/demo/agentic-tracker" }],
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
