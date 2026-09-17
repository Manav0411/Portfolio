export const profile = {
  name: "Manav Goel",
  mark: "M. Goel",
  role: "Software developer — AI systems, end to end",
  location: "New Delhi, India",
  email: "me.manavgoel@gmail.com",
  phone: "+91 83446 03000",
  github: "https://github.com/Manav0411",
  githubHandle: "Manav0411",
  linkedin: "https://www.linkedin.com/in/manavgoel1104",
  linkedinHandle: "manavgoel1104",
  leetcode: "https://leetcode.com/u/Manav0411/",

  // The thesis. Everything on the page is built to support this sentence.
  thesis:
    "I build LLM systems end to end — retrieval, agent design, the FastAPI backend underneath, the eval harness that proves it works, and the deploy that keeps it up.",

  intro:
    "Final-year CS student at GGSIPU. Two AI engineering internships and a steady run of self-built agent and RAG products. The habit I care about most is measuring what I build: recall and MRR baselines, grading accuracy, citation checks, latency before and after. Numbers on this page come from a harness, not an estimate.",
} as const;

/** The signature: the routing decision at the center of Groundwork. */
export const routeDemo = {
  question: "what was the last commit by Manav0411?",
  branches: [
    {
      id: "exact",
      kind: "cold" as const,
      label: "Exact",
      path: "typed SQL over normalized identities",
      value: 21,
      unit: "ms",
      note: "zero model calls",
      delayMs: 240,
    },
    {
      id: "open",
      kind: "warm" as const,
      label: "Open-ended",
      path: "hybrid search → RRF → grade → cited synthesis",
      value: 1.8,
      unit: "s",
      note: "3 model calls",
      delayMs: 1500,
    },
  ],
  footnote:
    "Cosine similarity has no concept of max(commit_time). Routing an exact question through embeddings does not make the system more general — it makes it confidently wrong.",
};

export type Metric = { value: string; label: string };

export const work = [
  {
    company: "IntelGrader",
    title: "AI Engineer Intern",
    period: "Jun 2026 — Aug 2026",
    where: "Remote",
    summary:
      "Built the retrieval and generation pipeline behind an AI assessment product, then the multi-agent content pipeline that turned syllabus material into interactive lessons.",
    metrics: [
      { value: "95%+", label: "chapter classification" },
      { value: "92%", label: "grading benchmark" },
      { value: "1,200+", label: "questions automated" },
    ] as Metric[],
    points: [
      "Built a Python document-processing pipeline for AI-based assessment: ingested and chunked 50+ educational documents into a ChromaDB vector store, then served retrieval through hybrid semantic search, BM25 reranking and LLM-based query routing to reach 95%+ chapter-classification accuracy.",
      "Automated batch answer generation and evaluation for 1,200+ exam questions using structured retrieval, evaluation and grading workflows, reaching up to 92% benchmark accuracy and cutting manual content-review effort.",
      "Engineered a multi-agent content pipeline (Python LLM orchestration, Node.js, browser automation) converting Class 8–12 STEM content into interactive web pages across 12 visual families, with automated validation and self-repair that retries failed generations and cut recurring failures across 25+ outputs.",
    ],
    stack: ["Python", "Gemini", "LangChain", "ChromaDB", "BM25", "Node.js", "Browser automation"],
  },
  {
    company: "Hyrte",
    title: "Backend / AI Engineer Intern",
    period: "Dec 2025 — Feb 2026",
    where: "New Delhi, India",
    summary:
      "Owned the prompt orchestration layer behind an AI interview service's FastAPI endpoints, and the evaluation system that scored candidates.",
    metrics: [
      { value: "42%", label: "fewer LLM tokens" },
      { value: "2-layer", label: "evaluation system" },
    ] as Metric[],
    points: [
      "Restructured the LangChain prompt orchestration layer behind the interview service's FastAPI endpoints, improving conversational coherence and removing repetitive system responses across multi-turn sessions.",
      "Engineered a dual-layer evaluation system (heuristic + evidence-based) with adaptive difficulty progression and priority-based topic ordering, improving assessment accuracy across technical domains.",
      "Reduced LLM token usage by 42% and improved API response latency by restructuring prompts and adding rolling context windows in the FastAPI backend; validated endpoints with Postman.",
    ],
    stack: ["FastAPI", "LangChain", "Python", "Postman"],
  },
];

export const projects = [
  {
    name: "Groundwork",
    tagline: "Engineering knowledge, with evidence.",
    blurb:
      "A self-hosted agent that answers questions about your engineering work across GitHub, Jira and Slack — and cites every claim. Two question types, two mechanisms, on purpose: exact questions route to typed SQL and never touch a model; open-ended ones go to hybrid retrieval fused by reciprocal rank fusion, graded, then synthesised with per-marker citations.",
    metrics: [
      { value: "67.9s → 1.8s", label: "RAG turn, deployed" },
      { value: "0.941", label: "MRR" },
      { value: "0.807", label: "recall@8" },
      { value: "0.950", label: "sufficiency grader" },
      { value: "340+", label: "tests gating release" },
      { value: "8/8", label: "on an unseen project" },
    ] as Metric[],
    detail: [
      "20 REST endpoints over an 8-table Postgres schema (async SQLAlchemy, Alembic) with GIN full-text and pgvector HNSW indexes. Exact questions answer in under 25 ms with no model call.",
      "A bounded CRAG corrective loop driven by a model-based sufficiency grader, per-marker citation validation, and an entailment check that downgrades and discloses any claim its cited passage does not state.",
      "Ingestion built around a per-source sync state machine: cursor-based incremental syncs, a lock preventing concurrent runs, failed syncs that never advance the cursor, and content-hash upserts that re-embed only changed documents. An HMAC-verified webhook was added after polling silently skipped backdated commits.",
      "Deployed and hardened in production: Docker on AWS EC2 behind Caddy/TLS, Next.js on Vercel, API-key auth, sliding-window rate limiting, JSON logs with correlation IDs and a Prometheus metrics endpoint.",
    ],
    stack: ["Python", "FastAPI", "LangGraph", "PostgreSQL", "pgvector", "Docker", "AWS EC2", "Caddy", "Next.js"],
    repo: "https://github.com/Manav0411/Groundwork",
    live: "https://groundwork-mauve-two.vercel.app",
    year: "2026",
  },
  {
    name: "InsightGraph",
    tagline: "An autonomous daily briefing on the AI ecosystem.",
    blurb:
      "A six-agent LangGraph pipeline that aggregates, filters, analyses and delivers grounded briefings against a user's stated preferences — with a two-stage hallucination firewall and memory of every briefing it has written before.",
    metrics: [
      { value: "6", label: "agents in the graph" },
      { value: "15", label: "REST endpoints" },
      { value: "10+ min", label: "pipeline, behind an HTTP API" },
      { value: "384-dim", label: "pgvector memory" },
    ] as Metric[],
    detail: [
      "A two-stage hallucination firewall: a semantic validator that filters irrelevant signals pre-ingestion, and a final evaluator enforcing word-count and diversity constraints, with dynamic conditional retry routing to recover from failed generations.",
      "Made a 10+ minute LLM pipeline safe to run behind an HTTP API — an async endpoint returns a task ID immediately, the client polls for stage-level progress, and task state is persisted so jobs left running after a restart reconcile to failed instead of hanging the UI.",
      "15 REST endpoints across 7 routers over a 5-table Postgres schema (SQLAlchemy, Neon serverless), with Clerk JWT auth verified against remote JWKS, a signup webhook syncing user records, and per-user data isolation.",
      "Cut runtime and cost with bounded concurrency, fail-open handling of HTTP 429 that removed a six-minute rate-limit stall, and tiered model routing — a small model for parallel relevance filtering, a large one for deep analysis.",
    ],
    stack: ["Python", "FastAPI", "LangGraph", "LangSmith", "PostgreSQL", "pgvector", "Neon", "Clerk", "Next.js", "GitHub Actions"],
    repo: "https://github.com/Manav0411/InsightGraph-AI",
    live: "https://www.insightgraph.dev",
    year: "2026",
  },
  {
    name: "TeachersAid",
    tagline: "Upload a question paper and a handwritten answer sheet. Get a graded result in about a minute.",
    blurb:
      "A single-page app that extracts every question in printed order, transcribes a student's handwriting, maps answers to questions, highlights the exact ink behind any answer, grades it and writes a summary. Built as a hiring assignment; the bundled sample uses real handwriting, not synthesised ink.",
    metrics: [
      { value: "4", label: "pipeline stages" },
      { value: "~1 min", label: "full paper" },
      { value: "0", label: "server-side session state" },
    ] as Metric[],
    detail: [
      "A deterministic-then-semantic mapping engine: label matching first, positional and semantic fallbacks after — so the cheap, checkable path runs before the model does.",
      "Stages 1 and 2 run in parallel, concurrency capped at three in-flight page requests with exponential backoff on 429/5xx. All session state lives in the browser, so the API routes stay pure and stateless on serverless.",
      "Percentage-based highlight overlay ties each graded answer back to the exact region of the scan it came from.",
    ],
    stack: ["TypeScript", "Next.js", "Gemini (vision)", "Groq", "pdf.js", "Vitest"],
    repo: "https://github.com/Manav0411/TeachersAid",
    live: "https://teachers-aid.vercel.app",
    year: "2026",
  },
  {
    name: "Technical Blog Generator",
    tagline: "A LangGraph workflow that decides whether it needs to research before it writes.",
    blurb:
      "Router → research → orchestrator → parallel section workers → reducer. It plans an outline first, writes sections concurrently, generates and inserts diagrams, and ships the result as markdown or a zip bundle.",
    metrics: [
      { value: "5", label: "graph nodes" },
      { value: "conditional", label: "research routing" },
    ] as Metric[],
    detail: [
      "The router decides whether a topic is time-sensitive enough to need web evidence, so current topics get Tavily search and evergreen ones skip the cost entirely.",
      "An orchestrator/worker/reducer fan-out writes sections in parallel and merges them, with optional image generation folded into the reduce step.",
    ],
    stack: ["Python", "LangGraph", "Streamlit", "HuggingFace", "Tavily"],
    repo: "https://github.com/Manav0411/Technical-Blog-Generator",
    live: null,
    year: "2026",
  },
  {
    name: "AskBase",
    tagline: "An internal knowledge base with access control, not just retrieval.",
    blurb:
      "Admins upload policies and handbooks and grant access per user or per role; employees ask questions in natural language and only ever retrieve from documents they are permitted to see. Permissions are enforced at the retrieval layer, not the UI.",
    metrics: [
      { value: "4", label: "demo roles" },
      { value: "role-scoped", label: "retrieval" },
    ] as Metric[],
    detail: [
      "JWT auth with role-based access control, sliding rate limits, and a FAISS vector store scoped per-permission so an employee's query can only reach documents granted to them.",
      "React 19 + TypeScript front end on Vercel, FastAPI + Postgres backend on Render, Groq for inference and Cohere for embeddings — all on free tiers.",
    ],
    stack: ["FastAPI", "SQLAlchemy", "PostgreSQL", "FAISS", "LangChain", "Groq", "Cohere", "React", "TypeScript"],
    repo: "https://github.com/Manav0411/AskBase",
    live: "https://ask-base-kappa.vercel.app",
    year: "2026",
  },
] as const;

export const stack = [
  {
    group: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "SQL", "C++"],
  },
  {
    group: "Backend & data",
    items: [
      "FastAPI", "Django", "REST APIs", "Node.js", "SQLAlchemy", "Alembic",
      "Pydantic", "JWT / OAuth", "PostgreSQL", "pgvector", "ChromaDB", "FAISS",
    ],
  },
  {
    group: "AI & agents",
    items: [
      "LangGraph", "LangChain", "RAG", "Hybrid retrieval", "Reranking (RRF)",
      "Vector search", "Embeddings", "Structured outputs", "Prompt engineering",
      "Multi-agent orchestration", "Gemini", "Groq", "Ollama", "HuggingFace",
    ],
  },
  {
    group: "Evaluation",
    items: [
      "Eval-harness design", "recall@k / MRR", "Citation & entailment checks",
      "LLM-as-judge grading", "DeepEval", "LangSmith", "pytest",
    ],
  },
  {
    group: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    group: "Infra & DevOps",
    items: ["Docker", "AWS EC2", "GitHub Actions", "Caddy", "Vercel", "Render", "Neon", "Prometheus", "Git", "Postman"],
  },
  {
    group: "CS fundamentals",
    items: ["Data structures & algorithms", "OOP", "DBMS", "Operating systems", "Computer networks"],
  },
] as const;

export const education = {
  school: "University School of Information, Communication and Technology, GGSIPU",
  degree: "B.Tech, Computer Science Engineering",
  period: "2023 — Present",
  where: "New Delhi, India",
  detail: "CGPA 8.1 / 10",
};

export const ledger = [
  {
    kind: "Achievement",
    title: "700+ DSA problems solved",
    detail: "Across LeetCode, GeeksforGeeks and Coding Studio.",
    href: "https://leetcode.com/u/Manav0411/",
    hrefLabel: "Profile",
  },
  {
    kind: "Achievement",
    title: "Level 3 Conqueror — Coding Ninjas Slayground 2.0",
    detail: "Completed the full track and earned the Level 3 certificate.",
    href: null,
    hrefLabel: null,
  },
  {
    kind: "Leadership",
    title: "Lead, ACM ICPC Club — USICT, GGSIPU",
    detail:
      "2024 — 2026. Organised coding contests and DSA workshops; mentored 150+ junior students in algorithms and problem-solving, raising participation in national competitions.",
    href: null,
    hrefLabel: null,
  },
];

export const nav = [
  { id: "approach", label: "Approach" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];
