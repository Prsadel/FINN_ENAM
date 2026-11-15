"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { COMPANIES } from "@/data/companies";

interface SearchResult {
  ticker: string;
  name: string;
  sector: string;
  inPortfolio: boolean;
  inUniverse: boolean;
}

export default function ResearchPage() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (q.trim().length < 1) {
      setResults([]);
      return;
    }
    let cancelled = false;
    setSearching(true);
    const t = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(q)}`)
        .then((r) => r.json())
        .then((d) => {
          if (!cancelled) setResults(d.results ?? []);
        })
        .finally(() => !cancelled && setSearching(false));
    }, 300);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [q]);

  const portfolio = COMPANIES.filter((c) => c.inPortfolio);
  const adhoc = COMPANIES.filter((c) => !c.inPortfolio);

  return (
    <div>
      <h1 className="pt-1 text-[22px] font-extrabold tracking-tight">Research</h1>
      <p className="mt-1 text-[12px] text-muted">Any NSE ticker. Unknown symbols fetch live from Yahoo Finance.</p>

      <div className="sticky top-0 z-30 -mx-4 bg-bg/95 px-4 pb-2 pt-3 backdrop-blur">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="e.g. TRENT, DIXON, KOTAKBANK, HAL…"
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-[14px] text-ink placeholder:text-dim focus:border-accent focus:outline-none"
          autoFocus
          inputMode="search"
        />
        {searching && <p className="mt-1.5 text-[11px] text-dim">Searching universe + Yahoo Finance…</p>}
      </div>

      {results.length > 0 && (
        <ul className="mt-2 space-y-1.5">
          {results.map((r) => (
            <li key={r.ticker}>
              <Link href={`/company/${encodeURIComponent(r.ticker)}`} className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3 active:bg-surface2">
                <span className="rounded-md bg-accentbg px-2 py-0.5 font-mono text-[11px] font-bold text-accent">{r.ticker}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold">{r.name}</p>
                  <p className="text-[11px] text-dim">{r.sector}</p>
                </div>
                <span className={`rounded px-1.5 py-0.5 text-[9.5px] font-bold uppercase ${r.inUniverse ? "bg-surface2 text-muted" : "bg-amberbg text-amber"}`}>
                  {r.inUniverse ? (r.inPortfolio ? "Portfolio" : "Ad-hoc") : "Live fetch"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {results.length === 0 && !searching && (
        <>
          <p className="mb-1.5 mt-4 text-[10px] font-bold uppercase tracking-widest text-dim">Portfolio — 18 companies</p>
          <div className="flex flex-wrap gap-1.5">
            {portfolio.map((c) => (
              <Link key={c.ticker} href={`/company/${encodeURIComponent(c.ticker)}`} className="rounded-lg border border-border bg-surface px-2.5 py-1.5 font-mono text-[11.5px] font-semibold text-ink active:bg-surface2">
                {c.ticker}
              </Link>
            ))}
          </div>
          <p className="mb-1.5 mt-4 text-[10px] font-bold uppercase tracking-widest text-dim">Ad-hoc research set</p>
          <div className="flex flex-wrap gap-1.5">
            {adhoc.map((c) => (
              <Link key={c.ticker} href={`/company/${encodeURIComponent(c.ticker)}`} className="rounded-lg border border-accent/30 bg-accentbg px-2.5 py-1.5 font-mono text-[11.5px] font-semibold text-accent active:bg-surface2">
                {c.ticker}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
