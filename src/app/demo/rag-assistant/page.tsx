"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

/*
 * A self-contained client-side re-implementation of the extractive path
 * from the rag-research-assistant repo (chunk.ts + retrieval.ts +
 * answer.ts's extractive branch) so this demo runs entirely in the
 * browser with no server call — same reasoning as the ML Prediction
 * demo: genuinely live, clearly labeled as the simplified path. The
 * repo's LLM-generative mode isn't reproduced here since it needs a
 * server-side API key.
 */

const STOPWORDS = new Set([
  "the", "a", "an", "and", "or", "but", "is", "are", "was", "were", "be",
  "been", "being", "to", "of", "in", "on", "at", "for", "with", "by",
  "from", "as", "that", "this", "it", "its", "these", "those", "i", "you",
  "he", "she", "we", "they", "what", "which", "who", "whom", "if", "then",
  "than", "so", "not", "no", "do", "does", "did", "have", "has", "had",
]);

function tokenize(text: string): string[] {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

function chunkDocument(text: string): { id: string; text: string }[] {
  const paragraphs = text.replace(/\r\n/g, "\n").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  return paragraphs.length > 0
    ? paragraphs.map((p, i) => ({ id: `chunk_${i}`, text: p }))
    : [{ id: "chunk_0", text: text.trim() }];
}

function retrieve(chunks: { id: string; text: string }[], question: string) {
  const tokenizedChunks = chunks.map((c) => tokenize(c.text));
  const df = new Map<string, number>();
  for (const tokens of tokenizedChunks) {
    for (const term of new Set(tokens)) df.set(term, (df.get(term) ?? 0) + 1);
  }
  const N = chunks.length;
  const idf = new Map<string, number>();
  for (const [term, count] of df.entries()) idf.set(term, Math.log((N + 1) / (count + 1)) + 1);

  const vectors = tokenizedChunks.map((tokens) => {
    const tf = new Map<string, number>();
    for (const t of tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
    const vec = new Map<string, number>();
    for (const [term, count] of tf.entries()) vec.set(term, (count / tokens.length) * (idf.get(term) ?? 0));
    return vec;
  });

  const qTokens = tokenize(question);
  const qtf = new Map<string, number>();
  for (const t of qTokens) qtf.set(t, (qtf.get(t) ?? 0) + 1);
  const qVec = new Map<string, number>();
  for (const [term, count] of qtf.entries()) if (idf.has(term)) qVec.set(term, (count / qTokens.length) * (idf.get(term) ?? 0));

  const cosine = (a: Map<string, number>, b: Map<string, number>) => {
    let dot = 0;
    for (const [term, w] of a.entries()) { const o = b.get(term); if (o) dot += w * o; }
    const normA = Math.sqrt(Array.from(a.values()).reduce((s, v) => s + v * v, 0));
    const normB = Math.sqrt(Array.from(b.values()).reduce((s, v) => s + v * v, 0));
    return normA === 0 || normB === 0 ? 0 : dot / (normA * normB);
  };

  return chunks
    .map((chunk, i) => ({ chunk, score: cosine(qVec, vectors[i]) }))
    .sort((a, b) => b.score - a.score);
}

const NO_ANSWER_THRESHOLD = 0.08;

const SAMPLE_DOC = `The Apollo 11 mission launched on July 16, 1969, carrying astronauts Neil Armstrong, Buzz Aldrin, and Michael Collins. It was the first crewed mission to land on the Moon.

Armstrong and Aldrin descended to the lunar surface in the Lunar Module "Eagle" on July 20, 1969, while Collins remained in lunar orbit aboard the Command Module "Columbia."

Armstrong became the first person to step onto the Moon, famously saying "That's one small step for man, one giant leap for mankind." The astronauts spent about two and a half hours outside the spacecraft.

The mission returned to Earth on July 24, 1969, splashing down in the Pacific Ocean.`;

export default function RagDemo() {
  const [doc, setDoc] = useState(SAMPLE_DOC);
  const [question, setQuestion] = useState("");
  const [asked, setAsked] = useState("");

  const chunks = useMemo(() => chunkDocument(doc), [doc]);
  const results = useMemo(() => (asked ? retrieve(chunks, asked) : []), [chunks, asked]);
  const top = results[0];

  const answer =
    !asked
      ? null
      : !top || top.score < NO_ANSWER_THRESHOLD
      ? "This document doesn't appear to cover that. I'm not going to guess — try rephrasing, or ask something the document actually discusses."
      : top.chunk.text;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/projects/rag-research-assistant" className="font-mono text-xs uppercase tracking-widest text-paper-dim hover:text-signal-amber">
        ← Back to case study
      </Link>

      <h1 className="mt-6 font-display text-3xl font-bold text-paper">Try the extractive mode, live</h1>
      <p className="mt-3 text-paper-dim leading-relaxed">
        This runs entirely in your browser — TF-IDF retrieval, zero API key, zero server call.
        It only ever quotes the source text back to you, never generates. The repo also has an{" "}
        <strong className="text-paper">LLM-generative mode</strong> (cited, synthesized answers) that
        activates once an API key is configured server-side — not reproduced here since that part
        needs a server.
      </p>

      <label className="mt-8 block font-mono text-xs uppercase tracking-widest text-paper-dim">Document text</label>
      <textarea
        className="mt-2 w-full rounded-sm border border-ink-line bg-ink-raised p-3 text-sm text-paper"
        rows={8}
        value={doc}
        onChange={(e) => setDoc(e.target.value)}
      />

      <label className="mt-6 block font-mono text-xs uppercase tracking-widest text-paper-dim">Your question</label>
      <div className="mt-2 flex gap-2">
        <input
          className="flex-1 rounded-sm border border-ink-line bg-ink-raised p-3 text-sm text-paper"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g. Who was the first person on the Moon?"
          onKeyDown={(e) => e.key === "Enter" && setAsked(question)}
        />
        <button
          onClick={() => setAsked(question)}
          className="rounded-sm bg-signal-amber px-5 py-3 font-mono text-xs font-medium uppercase tracking-widest text-ink hover:opacity-90"
        >
          Ask
        </button>
      </div>

      {answer && (
        <div className="mt-8 rounded-sm border border-ink-line bg-ink-raised p-5">
          <p className="tag tag-verified mb-2">
            {top && top.score >= NO_ANSWER_THRESHOLD ? "Extractive answer" : "No answer"}
          </p>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-paper">{answer}</p>
          {top && top.score >= NO_ANSWER_THRESHOLD && (
            <p className="mt-3 font-mono text-xs text-paper-dim">
              Cited: {top.chunk.id} · confidence {top.score.toFixed(2)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
