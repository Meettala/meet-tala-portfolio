"use client";

import { useState } from "react";
import Link from "next/link";

/*
 * A client-side re-enactment of the propose -> pending -> approve/reject
 * flow from jobpilot-ai's tracker (src/lib/tracker/store.ts +
 * suggestions.ts). The point of this demo is to make the approval gate
 * itself tangible: clicking "Approve" is the only thing that ever
 * changes state, exactly like the real app and the real tests.
 */

type QueueStatus = "pending" | "approved" | "rejected";

type QueueItem = {
  id: string;
  job: string;
  actionType: "Draft follow-up" | "Mark stale";
  content: string;
  status: QueueStatus;
};

const INITIAL_QUEUE: QueueItem[] = [
  {
    id: "aq_1",
    job: "Junior ML Engineer at Northwind Analytics",
    actionType: "Draft follow-up",
    content: "Hi, I wanted to follow up on my application for the Junior ML Engineer role. I remain very interested and would welcome any update on next steps.",
    status: "pending",
  },
  {
    id: "aq_2",
    job: "Data Scientist at Cascade Intelligence",
    actionType: "Mark stale",
    content: "Suggest marking this application as closed — no status change in 21+ days.",
    status: "pending",
  },
];

export default function AgenticTrackerDemo() {
  const [queue, setQueue] = useState<QueueItem[]>(INITIAL_QUEUE);
  const [log, setLog] = useState<string[]>([]);

  function resolve(id: string, decision: "approved" | "rejected") {
    setQueue((q) => q.map((item) => (item.id === id ? { ...item, status: decision } : item)));
    const item = queue.find((i) => i.id === id);
    if (item) {
      setLog((l) => [
        decision === "approved"
          ? `Approved: "${item.actionType}" for ${item.job}. ${item.actionType === "Draft follow-up" ? "Message is now ready for you to send yourself — nothing was sent automatically." : "Job marked closed."}`
          : `Rejected: "${item.actionType}" for ${item.job}. No change made.`,
        ...l,
      ]);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/projects/agentic-job-tracker" className="font-mono text-xs uppercase tracking-widest text-paper-dim hover:text-signal-amber">
        ← Back to case study
      </Link>

      <h1 className="mt-6 font-display text-3xl font-bold text-paper">Try the approval gate, live</h1>
      <p className="mt-3 text-paper-dim leading-relaxed">
        These two suggestions were generated the same way the real app generates them — a job past its
        follow-up date, and one stale with no activity in 21+ days. Nothing happens to either one until
        you click a button.
      </p>

      <div className="mt-8 space-y-4">
        {queue.map((item) => (
          <div key={item.id} className="rounded-sm border border-ink-line bg-ink-raised p-5">
            <div className="flex items-center justify-between">
              <p className="font-display text-sm font-bold text-paper">{item.job}</p>
              <span className={`tag ${item.status === "pending" ? "tag-progress" : item.status === "approved" ? "tag-verified" : "tag-blocked"}`}>
                {item.actionType} · {item.status}
              </span>
            </div>
            <p className="mt-3 text-sm italic text-paper-dim">&quot;{item.content}&quot;</p>
            {item.status === "pending" && (
              <div className="mt-4 flex gap-2">
                <button onClick={() => resolve(item.id, "approved")} className="rounded-sm bg-signal-amber px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-ink hover:opacity-90">
                  Approve
                </button>
                <button onClick={() => resolve(item.id, "rejected")} className="rounded-sm border border-ink-line px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-paper-dim hover:text-paper">
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {log.length > 0 && (
        <div className="mt-8">
          <h2 className="font-display text-sm font-bold uppercase tracking-widest text-signal-amber">Activity log</h2>
          <ul className="mt-3 space-y-2 text-sm text-paper-dim">
            {log.map((entry, i) => <li key={i}>· {entry}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
