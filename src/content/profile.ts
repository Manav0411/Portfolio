export const profile = {
  name: "Manav Goel",
  firstName: "Manav",
  lastName: "Goel",
  title: "Software Engineer | AI/ML & Backend",
  tagline:
    "Building agentic AI and LLM-powered systems end to end. Final-year CS at GGSIPU, New Delhi.",

  email: "me.manavgoel@gmail.com",
  phone: "+91 83446 03000",
  github: "https://github.com/Manav0411",
  linkedin: "https://www.linkedin.com/in/manavgoel1104",
  leetcode: "https://leetcode.com/u/Manav0411/",

  location: "New Delhi, India · Open to relocate",
  status: "Open to Software Engineer / AI Engineer roles · Full-time 2027",
} as const;

export const about = {
  lead: "I build AI-powered systems and the backends that carry them, from LLM and agent pipelines to production APIs.",
  paragraphs: [
    "I'm a final-year Computer Science student working across agentic AI and backend engineering. Two AI engineering internships, and a steady run of self-built RAG and multi-agent products — retrieval pipelines, LangGraph agents, FastAPI services, and the deploys that keep them running.",
    "My work spans generative AI and agent orchestration (LangGraph, LangChain, RAG, hybrid retrieval, reranking), production backends (FastAPI, PostgreSQL, pgvector, Docker, AWS), and the evaluation harnesses that tell me whether any of it actually works.",
    "I pick the right tool for the problem: Python for AI/ML and APIs, Next.js and React for the web, Postgres for anything that has to be correct. I'm finishing my B.Tech at USICT, GGSIPU and looking for a full-time role in 2027.",
  ],
  stats: [
    { value: "6+", label: "Projects" },
    { value: "2", label: "Internships" },
    { value: "700+", label: "DSA Problems" },
    { value: "25+", label: "Technologies" },
  ],
};

export const technologies = [
  "Python", "TypeScript", "JavaScript", "SQL", "C++",
  "LangGraph", "LangChain", "RAG", "Hybrid Retrieval", "Reranking (RRF)",
  "Multi-Agent Systems", "Prompt Engineering", "Gemini", "Groq", "Ollama", "HuggingFace",
  "FastAPI", "Django", "Node.js", "REST APIs", "SQLAlchemy", "Pydantic",
  "PostgreSQL", "pgvector", "ChromaDB", "FAISS",
  "React", "Next.js", "Tailwind CSS",
  "Docker", "AWS EC2", "GitHub Actions", "Vercel", "Caddy",
  "pytest", "DeepEval", "LangSmith", "Postman", "Git",
];

export const experience = [
  {
    role: "AI Engineer Intern",
    company: "IntelGrader",
    period: "Jun 2026 — Aug 2026",
    where: "Remote",
    description:
      "Built the RAG pipeline behind an AI assessment product: 50+ educational documents chunked into ChromaDB, served through hybrid semantic search, BM25 reranking and LLM-based query routing to reach 95%+ chapter-classification accuracy. Automated answer generation and grading for 1,200+ exam questions at up to 92% benchmark accuracy. Engineered a multi-agent pipeline turning Class 8–12 STEM content into interactive web pages across 12 visual families, with automated validation and self-repair that retried failed generations.",
    tags: ["Python", "Gemini", "LangChain", "ChromaDB", "BM25", "Node.js"],
  },
  {
    role: "AI / Backend Engineer Intern",
    company: "Hyrte",
    period: "Dec 2025 — Feb 2026",
    where: "New Delhi, India",
    description:
      "Redesigned the LangChain prompt orchestration behind an AI interview service's FastAPI endpoints, improving conversational coherence across multi-turn sessions. Built a dual-layer evaluation system (heuristic + evidence-based) with adaptive difficulty progression and priority-based topic ordering. Cut LLM token usage by 42% and improved response latency with restructured prompts and rolling context windows.",
    tags: ["FastAPI", "LangChain", "Python", "Postman"],
  },
];

export const projects = [
  {
    name: "Groundwork — Cited Engineering Q&A Agent",
    description:
      "A self-hosted agent that answers questions about your engineering work across GitHub, Jira and Slack, and cites every claim. Exact questions route to typed SQL and answer in under 25 ms with no model call; open-ended ones go to hybrid full-text + pgvector retrieval fused by reciprocal rank fusion. A sufficiency grader drives a bounded corrective loop, and an entailment check discloses any claim its cited passage doesn't state. Deployed on EC2 behind Caddy/TLS with the front end on Vercel, cutting the RAG turn from 67.9 s to 1.8 s.",
    tags: ["Python", "FastAPI", "LangGraph", "PostgreSQL", "pgvector", "Docker", "AWS EC2"],
    repo: "https://github.com/Manav0411/Groundwork",
    live: "https://groundwork-mauve-two.vercel.app",
  },
  {
    name: "InsightGraph — Autonomous AI Briefing",
    description:
      "A six-agent LangGraph pipeline that aggregates, filters and analyses the AI ecosystem into a personalised daily briefing. A two-stage hallucination firewall filters irrelevant signals before ingestion and enforces diversity constraints after generation, with conditional retry routing to recover failed runs. A 10+ minute pipeline made safe behind an HTTP API through async task IDs, stage-level progress polling and persisted task state. Memory-augmented RAG over pgvector lets agents query past briefings for trend context.",
    tags: ["Python", "FastAPI", "LangGraph", "LangSmith", "pgvector", "Neon", "Next.js"],
    repo: "https://github.com/Manav0411/InsightGraph-AI",
    live: "https://www.insightgraph.dev",
  },
  {
    name: "TeachersAid — AI Assessment & Answer Mapping",
    description:
      "Upload a question paper and a student's handwritten answer sheet; get every question extracted in order, the handwriting transcribed, answers mapped to questions, the exact ink highlighted on the scan, and the whole thing graded in about a minute. A deterministic-then-semantic mapping engine runs label matching before the model does, and all session state lives in the browser so the API routes stay stateless on serverless.",
    tags: ["TypeScript", "Next.js", "Gemini Vision", "Groq", "pdf.js"],
    repo: "https://github.com/Manav0411/TeachersAid",
    live: "https://teachers-aid.vercel.app",
  },
  {
    name: "AskBase — Internal Knowledge Base",
    description:
      "An AI knowledge base for companies where permissions are enforced at the retrieval layer, not the UI. Admins upload policies and handbooks and grant access per user or per role; employees ask natural-language questions and can only ever retrieve from documents they're permitted to see. JWT auth with role-based access control, FAISS vector search scoped per permission, and sliding-window rate limiting.",
    tags: ["FastAPI", "PostgreSQL", "FAISS", "LangChain", "Groq", "React", "TypeScript"],
    repo: "https://github.com/Manav0411/AskBase",
    live: "https://ask-base-kappa.vercel.app",
  },
  {
    name: "Technical Blog Generator",
    description:
      "A LangGraph workflow that decides whether it needs to research before it writes. A router judges whether a topic is time-sensitive enough to warrant web search, an orchestrator plans the outline, parallel workers write each section, and a reducer merges them and generates diagrams. Ships the result as markdown or a zip bundle with images.",
    tags: ["Python", "LangGraph", "Streamlit", "HuggingFace", "Tavily"],
    repo: "https://github.com/Manav0411/Technical-Blog-Generator",
    live: null,
  },
];

export const education = {
  degree: "B.Tech, Computer Science Engineering",
  school: "University School of Information, Communication and Technology, GGSIPU",
  period: "2023 — Present",
  detail: "CGPA 8.1 / 10 · New Delhi, India",
};

export const achievements = [
  {
    title: "700+ DSA problems solved",
    detail: "Across LeetCode, GeeksforGeeks and Coding Studio.",
    href: "https://leetcode.com/u/Manav0411/",
  },
  {
    title: "Level 3 Conqueror — Coding Ninjas Slayground 2.0",
    detail: "Completed the full track and earned the Level 3 certificate.",
    href: null,
  },
  {
    title: "Lead, ACM ICPC Club — USICT, GGSIPU",
    detail:
      "2024 — 2026. Organised coding contests and DSA workshops; mentored 150+ junior students in algorithms and problem-solving.",
    href: null,
  },
];

export const nav = [
  { id: "about", label: "About Me" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];
