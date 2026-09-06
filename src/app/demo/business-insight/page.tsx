"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

/*
 * Client-side port of the QuerySpec + rule-based parser + executor from
 * the llm-business-insight repo, over a small embedded sample dataset.
 * This is an embedded portfolio interaction rather than evidence of the source repository's hosted deployment. It is genuinely
 * interactive, no server needed. The safety property (fixed whitelisted
 * operations, no eval of anything derived from the question) is
 * preserved exactly.
 */

type Row = { date: string; region: string; product: string; revenue: number; units_sold: number };

const SAMPLE_DATA: Row[] = [
  { date: "2026-01-08", region: "South", product: "Gadget X", revenue: 4588.13, units_sold: 31 },
  { date: "2026-01-21", region: "North", product: "Widget A", revenue: 4553.21, units_sold: 31 },
  { date: "2026-01-09", region: "South", product: "Widget B", revenue: 4978.66, units_sold: 31 },
  { date: "2026-01-18", region: "West", product: "Gadget Y", revenue: 3231.43, units_sold: 10 },
  { date: "2026-01-08", region: "South", product: "Gadget Y", revenue: 3732.13, units_sold: 43 },
  { date: "2026-01-25", region: "North", product: "Widget B", revenue: 3815.33, units_sold: 38 },
  { date: "2026-01-02", region: "East", product: "Widget A", revenue: 4135.5, units_sold: 18 },
  { date: "2026-01-16", region: "West", product: "Gadget Y", revenue: 2035.32, units_sold: 37 },
  { date: "2026-01-15", region: "South", product: "Gadget X", revenue: 577.53, units_sold: 9 },
  { date: "2026-01-16", region: "South", product: "Gadget X", revenue: 4830.85, units_sold: 28 },
  { date: "2026-01-25", region: "East", product: "Gadget Y", revenue: 2585.49, units_sold: 25 },
  { date: "2026-01-19", region: "East", product: "Gadget Y", revenue: 2962.83, units_sold: 22 },
  { date: "2026-01-22", region: "North", product: "Gadget X", revenue: 4955.85, units_sold: 43 },
  { date: "2026-01-23", region: "South", product: "Gadget X", revenue: 4826.7, units_sold: 37 },
  { date: "2026-01-19", region: "North", product: "Widget B", revenue: 3201.58, units_sold: 37 },
  { date: "2026-01-09", region: "East", product: "Widget A", revenue: 410.96, units_sold: 41 },
  { date: "2026-01-16", region: "North", product: "Gadget X", revenue: 4022.92, units_sold: 27 },
  { date: "2026-01-05", region: "North", product: "Gadget X", revenue: 2192.99, units_sold: 27 },
  { date: "2026-01-28", region: "North", product: "Widget A", revenue: 3064.44, units_sold: 49 },
  { date: "2026-01-02", region: "West", product: "Gadget X", revenue: 2799.17, units_sold: 18 },
  { date: "2026-02-17", region: "South", product: "Widget A", revenue: 1617.38, units_sold: 5 },
  { date: "2026-02-04", region: "North", product: "Widget B", revenue: 4860.0, units_sold: 19 },
  { date: "2026-02-20", region: "East", product: "Widget B", revenue: 3479.69, units_sold: 22 },
  { date: "2026-02-11", region: "East", product: "Widget B", revenue: 4493.63, units_sold: 25 },
  { date: "2026-02-13", region: "West", product: "Gadget Y", revenue: 3255.05, units_sold: 39 },
  { date: "2026-02-22", region: "North", product: "Gadget X", revenue: 2212.84, units_sold: 47 },
  { date: "2026-02-23", region: "South", product: "Gadget X", revenue: 2243.48, units_sold: 17 },
  { date: "2026-02-17", region: "East", product: "Gadget X", revenue: 156.14, units_sold: 27 },
  { date: "2026-02-19", region: "East", product: "Widget A", revenue: 1944.93, units_sold: 38 },
  { date: "2026-02-21", region: "South", product: "Widget A", revenue: 3204.31, units_sold: 22 },
];

const NUMERIC_COLUMNS = ["revenue", "units_sold"] as const;
const CATEGORICAL_COLUMNS = ["region", "product"] as const;

type Operation = "sum" | "mean" | "count" | "min" | "max";
const OPERATION_KEYWORDS: Record<Operation, string[]> = {
  sum: ["total", "sum of", "how much"],
  mean: ["average", "mean", "avg"],
  count: ["how many", "count of", "number of"],
  min: ["lowest", "minimum", "smallest"],
  max: ["highest", "maximum", "largest", "biggest"],
};
const GROUP_MARKERS = ["by ", "per ", "grouped by", "for each"];

function parseAndRun(question: string) {
  const qLower = question.toLowerCase();
  let operation: Operation = "count";
  for (const [op, keywords] of Object.entries(OPERATION_KEYWORDS)) {
    if (keywords.some((k) => qLower.includes(k))) { operation = op as Operation; break; }
  }

  const valueColumn = operation !== "count"
    ? (NUMERIC_COLUMNS.find((c) => qLower.includes(c)) ?? NUMERIC_COLUMNS[0])
    : undefined;

  const groupBy = GROUP_MARKERS.some((m) => qLower.includes(m))
    ? CATEGORICAL_COLUMNS.find((c) => qLower.includes(c))
    : undefined;

  // --- validation: only whitelisted operations and real columns ---
  const WHITELIST: Operation[] = ["sum", "mean", "count", "min", "max"];
  if (!WHITELIST.includes(operation)) throw new Error("Operation not whitelisted");
  if (valueColumn && !NUMERIC_COLUMNS.includes(valueColumn as typeof NUMERIC_COLUMNS[number])) throw new Error("Invalid column");

  // --- execution: fixed operations only, no eval of anything ---
  if (groupBy) {
    const groups = new Map<string, number[]>();
    for (const row of SAMPLE_DATA) {
      const key = String(row[groupBy]);
      const val = valueColumn ? (row[valueColumn as keyof Row] as number) : 1;
      groups.set(key, [...(groups.get(key) ?? []), val]);
    }
    const data: Record<string, number> = {};
    for (const [key, vals] of groups.entries()) {
      data[key] = operation === "sum" ? vals.reduce((a, b) => a + b, 0)
        : operation === "mean" ? vals.reduce((a, b) => a + b, 0) / vals.length
        : operation === "count" ? vals.length
        : operation === "min" ? Math.min(...vals)
        : Math.max(...vals);
    }
    return { type: "grouped" as const, data, operation, groupBy, valueColumn };
  }

  const vals = valueColumn ? SAMPLE_DATA.map((r) => r[valueColumn as keyof Row] as number) : SAMPLE_DATA.map(() => 1);
  const value = operation === "sum" ? vals.reduce((a, b) => a + b, 0)
    : operation === "mean" ? vals.reduce((a, b) => a + b, 0) / vals.length
    : operation === "count" ? vals.length
    : operation === "min" ? Math.min(...vals)
    : Math.max(...vals);
  return { type: "scalar" as const, value, operation, valueColumn };
}

export default function BusinessInsightDemo() {
  const [question, setQuestion] = useState("What is the total revenue by region?");
  const [asked, setAsked] = useState("What is the total revenue by region?");

  const result = useMemo(() => {
    try {
      return { ok: true as const, data: parseAndRun(asked) };
    } catch (e) {
      return { ok: false as const, error: e instanceof Error ? e.message : "Error" };
    }
  }, [asked]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/projects/llm-business-insight-assistant" className="font-mono text-xs uppercase tracking-widest text-paper-dim hover:text-signal-amber">
        ← Back to case study
      </Link>

      <h1 className="mt-6 font-display text-3xl font-bold text-paper">Ask the sample sales data in-browser</h1>
      <p className="mt-3 text-paper-dim leading-relaxed">
        Runs entirely in your browser over a small embedded sample dataset (30 rows). Every answer only
        ever comes from a fixed set of whitelisted operations — sum, average, count, min, max, optionally
        grouped — never generated or executed code, matching the repo&apos;s core safety design.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {["What is the total revenue by region?", "What is the average revenue?", "How many units_sold by product?", "What is the highest revenue?"].map((q) => (
          <button
            key={q}
            onClick={() => { setQuestion(q); setAsked(q); }}
            className="rounded-sm border border-ink-line px-3 py-1.5 font-mono text-xs text-paper-dim hover:border-signal-amber hover:text-signal-amber"
          >
            {q}
          </button>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          className="flex-1 rounded-sm border border-ink-line bg-ink-raised p-3 text-sm text-paper"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && setAsked(question)}
        />
        <button onClick={() => setAsked(question)} className="rounded-sm bg-signal-amber px-5 py-3 font-mono text-xs font-medium uppercase tracking-widest text-ink hover:opacity-90">
          Ask
        </button>
      </div>

      <div className="mt-8 rounded-sm border border-ink-line bg-ink-raised p-6">
        {!result.ok && <p className="text-blocked-rose">{result.error}</p>}
        {result.ok && result.data.type === "scalar" && (
          <>
            <p className="font-mono text-xs uppercase tracking-widest text-paper-dim">
              {result.data.operation}{result.data.valueColumn ? ` of ${result.data.valueColumn}` : ""}
            </p>
            <p className="mt-1 font-display text-4xl font-bold text-signal-amber">
              {result.data.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </p>
          </>
        )}
        {result.ok && result.data.type === "grouped" && (
          <div className="space-y-2">
            {Object.entries(result.data.data).sort((a, b) => b[1] - a[1]).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between text-sm">
                <span className="text-paper-dim">{key}</span>
                <span className="font-mono text-paper">{val.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
