"use client";

import { useState } from "react";
import Link from "next/link";

interface Beat {
  tag: string;
  tagCls: string;
  title: string;
  action: string;
  href?: string;
  cta?: string;
  points: string[];
}

const BEATS: Beat[] = [
  {
    tag: "PUSH",
    tagCls: "bg-greenbg text-green",
    title: "The digest — 45 filings, 5 that matter",
    action: "You're looking at it. This feed triages a week of exchange filings.",
    points: [
      "Material events on top with full context; 12 routine filings collapsed below",
      "Window pills (24h / 48h / 7d) and category filter pills",
      "Every material card is enriched — not just a headline",
    ],
  },
  {
    tag: "PUSH · HERO",
    tagCls: "bg-violetbg text-violet",
    title: "CFO change → who in my network can brief me?",
    action: "Open the Tata Motors card, then tap the “⌬ Alok Verma” chip.",
    href: "/",
    cta: "Go to feed",
    points: [
      "Incoming CFO's career arc + education, pulled into the card",
      "FINN matched him: worked with Alok at Tata Motors 2016–19, both IIM Calcutta",
      "The drawer shows the path, why he matters, and drafts the outreach message",
    ],
  },
  {
    tag: "PUSH · HERO",
    tagCls: "bg-greenbg text-green",
    title: "Results first-cut — math done by code, never a model",
    action: "Open the Titan or Coforge results card.",
    points: [
      "Revenue / EBITDA / PBT / PAT with QoQ and YoY deltas",
      "EBITDA margin in bps — computed deterministically from the filing",
      "Anomaly strip on top: Dixon volume 2.4× its 20-day average",
    ],
  },
  {
    tag: "PUSH · CONTROL",
    tagCls: "bg-amberbg text-amber",
    title: "You decide what “unusual” means",
    action: "Tap the “Alert thresholds” bar and drag the sliders.",
    points: [
      "Volume ≥ N× 20-day average, price ≥ ±N% in a session",
      "Watch the anomaly strip react live as you tighten or loosen",
      "Presets: Default / Sensitive / Only big moves",
    ],
  },
  {
    tag: "PULL",
    tagCls: "bg-accentbg text-accent",
    title: "Research any NSE ticker — then audit management",
    action: "Search “TRENT”, “DIXON”, or anything unlisted like “SBIN”, “HAL”.",
    href: "/research",
    cta: "Open research",
    points: [
      "Known universe: full deep-dive — Overview, Narrative, Financials, Network",
      "Narrative vs. Numbers: concall promises vs delivery, 4-state verdicts",
      "Bull vs. Bear computed from primary data; unknown tickers fetch live from Yahoo",
    ],
  },
  {
    tag: "NETWORK",
    tagCls: "bg-violetbg text-violet",
    title: "The quiet advantage — a contact list that thinks",
    action: "Open the Network tab. Then try “Prep me for Vikram Malhotra”.",
    href: "/network",
    cta: "Open network",
    points: [
      "Warm-reconnect nudges: 123 days since Ananya Roy — RIL just announced capex",
      "“Prep me for X” builds a meeting dossier with angles that land",
      "Expertise map: who knows CDMO, NBFC, EMS — one hop away",
    ],
  },
];

export default function TourButton() {
  const [open, setOpen] = useState(false);
  const [beat, setBeat] = useState(0);
  const b = BEATS[beat];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-3 flex w-full items-center gap-2.5 rounded-xl border border-accent/40 bg-accentbg px-4 py-3 text-left active:bg-accent/25"
      >
        <span className="text-[16px]">✦</span>
        <span className="flex-1">
          <span className="block text-[13.5px] font-bold text-accent">Take the 60-second tour</span>
          <span className="block text-[11px] text-muted">Everything FINN does, in six moves</span>
        </span>
        <span className="text-muted">→</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-app rounded-t-2xl border-t border-border bg-surface p-5 pb-8 shadow-2xl">
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />
            <div className="flex items-center justify-between">
              <span className={`rounded px-2 py-0.5 font-mono text-[9.5px] font-bold tracking-wider ${b.tagCls}`}>
                {b.tag}
              </span>
              <span className="text-[11px] text-dim">
                {beat + 1} / {BEATS.length}
              </span>
            </div>

            <h3 className="mt-2 text-[17px] font-bold leading-tight">{b.title}</h3>
            <p className="mt-1 text-[13px] text-accent">{b.action}</p>

            <ul className="mt-3 space-y-1.5">
              {b.points.map((p, i) => (
                <li key={i} className="flex gap-2 text-[12.5px] leading-snug text-muted">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex gap-2">
              {b.href && (
                <Link
                  href={b.href}
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-xl bg-accent py-2.5 text-center text-[13px] font-bold text-bg"
                >
                  {b.cta ?? "Show me"}
                </Link>
              )}
              {beat > 0 && (
                <button
                  onClick={() => setBeat(beat - 1)}
                  className="rounded-xl border border-border px-4 py-2.5 text-[13px] font-semibold text-muted"
                >
                  ←
                </button>
              )}
              {beat < BEATS.length - 1 ? (
                <button
                  onClick={() => setBeat(beat + 1)}
                  className="flex-1 rounded-xl border border-accent/50 bg-bg py-2.5 text-[13px] font-bold text-accent"
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-xl border border-green/50 bg-greenbg py-2.5 text-[13px] font-bold text-green"
                >
                  ✓ Start using FINN
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
