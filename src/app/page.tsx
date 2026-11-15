"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FeedResponse } from "@/types";
import FeedCard from "@/components/FeedCard";

const WINDOWS = [
  { h: 24, label: "24h" },
  { h: 48, label: "48h" },
  { h: 168, label: "7d" },
];

const FILTERS = [
  { key: "all", label: "All" },
  { key: "material", label: "Material" },
  { key: "results", label: "Results" },
  { key: "management_change", label: "Mgmt" },
  { key: "capex", label: "Capex" },
  { key: "litigation", label: "Risk" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

export default function FeedPage() {
  const [hours, setHours] = useState(24);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [feed, setFeed] = useState<FeedResponse | null>(null);
  const [routineOpen, setRoutineOpen] = useState(false);
  const [volX, setVolX] = useState(2.0);
  const [pricePct, setPricePct] = useState(3.0);
  const [thOpen, setThOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setFeed(null);
    fetch(`/api/feed?window=${hours}&volX=${volX}&pricePct=${pricePct}`)
      .then((r) => r.json())
      .then((d: FeedResponse) => {
        if (!cancelled) setFeed(d);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [hours, volX, pricePct]);

  const filtered = useMemo(() => {
    if (!feed) return [];
    const items = feed.material;
    if (filter === "all" || filter === "material") return items;
    return items.filter((it) => it.announcement.category === filter);
  }, [feed, filter]);

  return (
    <div>
      {/* Header */}
      <header className="flex items-end justify-between pt-1">
        <div>
          <h1 className="text-[26px] font-extrabold leading-none tracking-tight">
            <span className="bg-gradient-to-r from-ink to-accent bg-clip-text text-transparent">FINN</span>
          </h1>
          <p className="mt-1 text-[11.5px] text-muted">Your portfolio, filtered to what matters</p>
        </div>
        <Link href="/research" className="rounded-lg border border-border bg-surface px-3 py-1.5 text-[12px] font-medium text-accent">
          ◎ Research any ticker
        </Link>
      </header>

      {/* Anomaly strip */}
      {feed && feed.anomalies.length > 0 && (
        <section className="mt-3">
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-amber">⚡ EOD anomalies — Fri 13 Nov close</p>
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {feed.anomalies.map((an) => (
              <Link
                key={an.ticker + an.kind}
                href={`/company/${encodeURIComponent(an.ticker)}`}
                className="shrink-0 rounded-xl border border-amber/40 bg-amberbg px-3 py-2"
              >
                <p className="font-mono text-[11px] font-bold text-amber">{an.ticker}</p>
                <p className="text-[11px] text-ink/80">{an.kind === "volume_spike" ? `Vol ${an.volX}× 20d avg` : `${an.dayPct}% session move`}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Threshold control — the investor decides what "unusual" means */}
      <button
        onClick={() => setThOpen((o) => !o)}
        className="mt-2.5 flex w-full items-center justify-between rounded-lg border border-border/70 bg-surface/60 px-3 py-2 text-left"
      >
        <span className="text-[11.5px] text-muted">
          <span className="font-semibold text-ink">⚡ Alert thresholds:</span> volume ≥ <b className="text-amber">{volX.toFixed(1)}×</b> 20d avg · price ≥ <b className="text-amber">±{pricePct.toFixed(1)}%</b>
        </span>
        <span className="text-[11px] text-dim">{thOpen ? "done" : "adjust"}</span>
      </button>
      {thOpen && (
        <div className="mt-1.5 space-y-3 rounded-xl border border-border bg-surface p-3.5">
          <div>
            <div className="flex justify-between text-[11.5px]">
              <span className="text-muted">Volume spike ≥</span>
              <span className="tabular font-bold text-amber">{volX.toFixed(1)}× avg</span>
            </div>
            <input
              type="range" min={1.2} max={4} step={0.1} value={volX}
              onChange={(e) => setVolX(Number(e.target.value))}
              className="mt-1 w-full accent-amber"
            />
          </div>
          <div>
            <div className="flex justify-between text-[11.5px]">
              <span className="text-muted">Single-day price move ≥ ±</span>
              <span className="tabular font-bold text-amber">{pricePct.toFixed(1)}%</span>
            </div>
            <input
              type="range" min={1} max={10} step={0.5} value={pricePct}
              onChange={(e) => setPricePct(Number(e.target.value))}
              className="mt-1 w-full accent-amber"
            />
          </div>
          <div className="flex gap-1.5">
            {([[2, 3, "Default"], [1.5, 2, "Sensitive"], [3, 5, "Only big moves"]] as const).map(([v, p, label]) => (
              <button
                key={label}
                onClick={() => {
                  setVolX(v);
                  setPricePct(p);
                }}
                className="flex-1 rounded-lg border border-border bg-bg/60 py-1.5 text-[11px] font-medium text-muted active:bg-surface2"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Window selector */}
      <div className="mt-3 flex gap-1.5">
        {WINDOWS.map((w) => (
          <button
            key={w.h}
            onClick={() => setHours(w.h)}
            className={`rounded-lg px-3.5 py-1.5 text-[12px] font-semibold transition-colors ${
              hours === w.h ? "bg-accent text-bg" : "border border-border bg-surface text-muted"
            }`}
          >
            {w.label}
          </button>
        ))}
        {feed && (
          <span className="ml-auto self-center text-[10.5px] text-dim">
            {feed.counts.material} material · {feed.counts.routine} routine
          </span>
        )}
      </div>

      {/* Filter pills */}
      <div className="no-scrollbar mt-2 flex gap-1.5 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`shrink-0 rounded-full border px-3 py-1 text-[11.5px] font-medium transition-colors ${
              filter === f.key ? "border-accent bg-accentbg text-accent" : "border-border text-muted"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Material feed */}
      <section className="mt-3 space-y-2.5">
        {!feed && <Skeleton />}
        {feed && filtered.length === 0 && (
          <p className="rounded-xl border border-border bg-surface p-4 text-[13px] text-muted">
            No {filter === "all" ? "" : filter.replace("_", " ")} filings in this window.
          </p>
        )}
        {filtered.map((item) => (
          <FeedCard key={item.announcement.id} item={item} />
        ))}
      </section>

      {/* Routine accordion */}
      {feed && feed.routine.length > 0 && (
        <section className="mt-3">
          <button
            onClick={() => setRoutineOpen((o) => !o)}
            className="flex w-full items-center justify-between rounded-xl border border-border/60 bg-surface/40 px-3.5 py-2.5 text-left"
          >
            <span className="text-[12.5px] font-medium text-muted">
              {routineOpen ? "▾" : "▸"} {feed.routine.length} routine filings — collapsed
            </span>
            <span className="text-[10.5px] text-dim">compliance noise</span>
          </button>
          {routineOpen && (
            <ul className="mt-1.5 space-y-1">
              {feed.routine.map((it) => (
                <li key={it.announcement.id} className="rounded-lg border border-border/40 px-3 py-2">
                  <Link href={`/company/${encodeURIComponent(it.announcement.ticker)}`} className="font-mono text-[10.5px] font-bold text-dim">
                    {it.announcement.ticker}
                  </Link>
                  <p className="text-[12px] text-muted">{it.announcement.headline}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <p className="mt-4 text-center text-[10px] leading-relaxed text-dim">
        Digest as of Sat 14 Nov, 09:30 IST · EOD = Fri 13 Nov close<br />
        Synthetic demonstration dataset — methodology in repository README
      </p>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-2.5">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-36 animate-pulse rounded-2xl border border-border/60 bg-surface/40" />
      ))}
    </div>
  );
}
