"use client";

import { useEffect, useState } from "react";
import { PersonMatch } from "@/types";
import { dossierFor } from "@/lib/graph";

export default function PersonDrawer({
  match,
  prepQuestions,
  onClose,
}: {
  match: PersonMatch | null;
  prepQuestions?: string[];
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [match]);

  if (!match) return null;
  const { person } = match;
  const dossier = dossierFor(person.id);

  const draft = `Hi ${person.name.split(" ")[0]}, — noticed the recent developments at ${person.workHistory[0]?.company ?? "your former employer"}. Would love 15 minutes this week to get your read on it. — Sent via FINN`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-app rounded-t-2xl border-t border-border bg-surface p-5 pb-8 shadow-2xl animate-[slideUp_.22s_ease-out]">
        <style>{`@keyframes slideUp{from{transform:translateY(24px);opacity:.4}to{transform:translateY(0);opacity:1}}`}</style>
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold leading-tight">{person.name}</h3>
            <p className="mt-0.5 text-[13px] text-muted">{person.headline}</p>
          </div>
          <button onClick={onClose} className="rounded-md px-2 py-1 text-muted hover:text-ink" aria-label="Close">
            ✕
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px]">
          <span className={`rounded-md px-2 py-0.5 font-semibold ${match.degree === 1 ? "bg-greenbg text-green" : "bg-accentbg text-accent"}`}>
            {match.degree}° connection
          </span>
          {match.path && (
            <span className="rounded-md bg-surface2 px-2 py-0.5 text-muted">
              {match.path.join(" → ")}
            </span>
          )}
        </div>

        {match.edgeContext && (
          <p className="mt-2 rounded-lg bg-surface2 px-3 py-2 text-[12.5px] text-muted">
            <span className="font-semibold text-ink">Your link: </span>
            {match.edgeContext}
          </p>
        )}

        <div className="mt-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-dim">Why they matter here</p>
          <p className="mt-1 text-[13.5px] leading-snug text-ink">{match.relevance}</p>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 text-[12px]">
          <div className="rounded-lg border border-border p-2.5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-dim">Education</p>
            {person.education.map((e) => (
              <p key={e} className="mt-1 text-muted">{e}</p>
            ))}
          </div>
          <div className="rounded-lg border border-border p-2.5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-dim">Relationship</p>
            <p className="mt-1 text-muted">{person.relationship}</p>
            <p className="text-dim">Last spoke {person.lastContact}</p>
          </div>
        </div>

        <div className="mt-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-dim">What they can tell you</p>
          <ul className="mt-1 space-y-1">
            {(dossier?.lines ?? []).map((l, i) => (
              <li key={i} className="flex gap-2 text-[13px] leading-snug text-muted">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {l}
              </li>
            ))}
          </ul>
        </div>

        {prepQuestions && prepQuestions.length > 0 && (
          <div className="mt-3 rounded-xl border border-violet/30 bg-violetbg/40 p-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-violet">Meeting prep — angles that land</p>
            <ol className="mt-1.5 space-y-1.5">
              {prepQuestions.map((q, i) => (
                <li key={i} className="flex gap-2 text-[12.5px] leading-snug text-ink/85">
                  <span className="font-mono text-[11px] font-bold text-violet">{i + 1}.</span>
                  {q}
                </li>
              ))}
            </ol>
          </div>
        )}

        <button
          onClick={copy}
          className="mt-4 w-full rounded-xl bg-accentbg py-3 text-[13px] font-semibold text-accent active:bg-accent active:text-bg"
        >
          {copied ? "✓ Draft copied to clipboard" : "Draft outreach message"}
        </button>
      </div>
    </div>
  );
}
