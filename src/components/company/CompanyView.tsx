"use client";

import { useState } from "react";
import Link from "next/link";
import { CompanyPayload } from "@/types";
import { fmtCr, fmtPct } from "@/lib/metrics";
import Sparkline from "@/components/Sparkline";
import PersonDrawer from "@/components/PersonDrawer";

const TABS = ["Overview", "Narrative", "Financials", "Network"] as const;
type Tab = (typeof TABS)[number];

const VerdictBadge = ({ v }: { v: string }) => {
  const map: Record<string, { label: string; cls: string }> = {
    delivered: { label: "DELIVERED", cls: "bg-greenbg text-green" },
    partial: { label: "PARTIAL", cls: "bg-amberbg text-amber" },
    missed: { label: "MISSED", cls: "bg-redbg text-red" },
    pending: { label: "PENDING", cls: "bg-surface2 text-dim" },
  };
  const m = map[v] ?? map.pending;
  return <span className={`rounded px-1.5 py-0.5 font-mono text-[9.5px] font-bold ${m.cls}`}>{m.label}</span>;
};

const DeltaCell = ({ v }: { v: number | null }) =>
  v === null ? (
    <span className="text-dim">—</span>
  ) : (
    <span className={`tabular font-semibold ${v > 0 ? "text-green" : "text-red"}`}>{fmtPct(v)}</span>
  );

export default function CompanyView({ payload: p }: { payload: CompanyPayload }) {
  const [tab, setTab] = useState<Tab>("Overview");
  const [drawerIdx, setDrawerIdx] = useState<number | null>(null);
  const q = p.quote;
  const up = q.changePct >= 0;

  return (
    <div>
      {/* Sticky header */}
      <div className="sticky top-0 z-30 -mx-4 border-b border-border bg-bg/95 px-4 pb-3 pt-2 backdrop-blur">
        <Link href="/" className="text-[11px] text-muted">← Feed</Link>
        <div className="mt-1 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-mono text-[18px] font-extrabold tracking-tight">{p.company.ticker}</h1>
              {!p.company.inPortfolio && (
                <span className="rounded bg-surface2 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-dim">
                  {p.isKnownUniverse ? "Ad-hoc" : "Live"}
                </span>
              )}
            </div>
            <p className="text-[11.5px] text-muted">{p.company.name}</p>
          </div>
          <div className="text-right">
            <p className="tabular text-[20px] font-bold leading-none">₹{q.close.toLocaleString("en-IN")}</p>
            <p className={`tabular text-[12px] font-semibold ${up ? "text-green" : "text-red"}`}>
              {up ? "▲" : "▼"} {fmtPct(q.changePct)} <span className="text-dim">Fri close</span>
            </p>
          </div>
        </div>
        <div className="mt-1.5 flex items-center justify-between text-[10.5px] text-dim">
          <span>
            52w ₹{q.low52w.toLocaleString("en-IN")} – ₹{q.high52w.toLocaleString("en-IN")}
          </span>
          <Sparkline points={q.spark.map((b) => b.close)} width={90} height={22} />
        </div>
        {/* Tabs */}
        <div className="no-scrollbar mt-2 flex gap-1 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`shrink-0 rounded-lg px-3 py-1 text-[12px] font-semibold transition-colors ${
                tab === t ? "bg-accent text-bg" : "border border-border bg-surface text-muted"
              }`}
            >
              {t}
              {t === "Network" && p.networkMatches.length > 0 && (
                <span className={`ml-1 ${tab === t ? "text-bg/80" : "text-accent"}`}>{p.networkMatches.length}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="mt-3 space-y-2.5 pb-4">
        {tab === "Overview" && <OverviewTab p={p} />}
        {tab === "Narrative" && <NarrativeTab p={p} />}
        {tab === "Financials" && <FinancialsTab p={p} />}
        {tab === "Network" && <NetworkTab p={p} onChip={setDrawerIdx} />}
      </div>

      <PersonDrawer match={drawerIdx !== null ? p.networkMatches[drawerIdx] : null} onClose={() => setDrawerIdx(null)} />
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-border bg-surface p-3.5 ${className}`}>{children}</div>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-dim">{children}</p>;
}

function OverviewTab({ p }: { p: CompanyPayload }) {
  const fc = p.firstCut;
  const bal = p.balance;
  return (
    <>
      {!p.isKnownUniverse && (
        <Card className="border-amber/30">
          <p className="text-[12px] leading-snug text-amber">
            Live-fetched ticker (outside curated universe). Market data is real-time from Yahoo Finance; deep primary-source
            research builds as filings & transcripts index.
          </p>
        </Card>
      )}

      <Card>
        <SectionLabel>Business</SectionLabel>
        <p className="text-[13px] leading-snug text-muted">{p.company.description}</p>
        {p.company.segments.length > 0 && (
          <div className="mt-3 space-y-1.5">
            {p.company.segments.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-[11.5px]">
                  <span className="text-muted">{s.name}</span>
                  <span className="tabular font-semibold text-ink">{s.pct}%</span>
                </div>
                <div className="mt-0.5 h-1 rounded-full bg-surface2">
                  <div className="h-1 rounded-full bg-accent" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {fc && (
        <Card>
          <SectionLabel>First cut — {fc.quarter}</SectionLabel>
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-dim">
                <th className="text-left font-semibold">Metric</th>
                <th className="text-right font-semibold">₹ Cr</th>
                <th className="text-right font-semibold">QoQ</th>
                <th className="text-right font-semibold">YoY</th>
              </tr>
            </thead>
            <tbody>
              {(
                [
                  ["Revenue", fmtCr(fc.revenue.value), fc.revenue.qoq, fc.revenue.yoy],
                  ["EBITDA", `${fmtCr(fc.ebitda.value)} · ${fc.ebitdaMargin.value.toFixed(1)}%`, fc.ebitda.qoq, fc.ebitda.yoy],
                  ["PBT", fmtCr(fc.pbt.value), fc.pbt.qoq, fc.pbt.yoy],
                  ["PAT", fmtCr(fc.pat.value), fc.pat.qoq, fc.pat.yoy],
                ] as const
              ).map(([label, val, qoq, yoy]) => (
                <tr key={label} className="border-t border-border/60">
                  <td className="py-1.5 pr-2 text-muted">{label}</td>
                  <td className="tabular py-1.5 text-right font-semibold">{val}</td>
                  <td className="py-1.5 text-right"><DeltaCell v={qoq} /></td>
                  <td className="py-1.5 text-right"><DeltaCell v={yoy} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      <Card>
        <SectionLabel>Key ratios — {p.annual[p.annual.length - 1]?.fy ?? "latest FY"}</SectionLabel>
        <div className="grid grid-cols-3 gap-2 text-center">
          {(
            [
              ["ROCE", p.annual[p.annual.length - 1]?.roce != null ? `${p.annual[p.annual.length - 1].roce!.toFixed(1)}%` : "—"],
              ["ROE", p.annual[p.annual.length - 1]?.roe != null ? `${p.annual[p.annual.length - 1].roe!.toFixed(1)}%` : "—"],
              ["D/E", bal ? bal.deRatio.toFixed(2) : "—"],
              ["Mkt Cap", p.company.marketCapCr ? fmtCr(p.company.marketCapCr) : "—"],
              ["Debt", bal ? fmtCr(bal.debt) : "—"],
              ["Equity", bal ? fmtCr(bal.equity) : "—"],
            ] as const
          ).map(([label, value]) => (
            <div key={label} className="rounded-xl border border-border/60 bg-bg/60 p-2">
              <p className="text-[9.5px] font-bold uppercase tracking-widest text-dim">{label}</p>
              <p className="tabular mt-0.5 text-[15px] font-bold">{value}</p>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

function NarrativeTab({ p }: { p: CompanyPayload }) {
  if (!p.narrative || p.audits.length === 0) {
    return (
      <Card>
        <p className="text-[13px] text-muted">
          No narrative audit yet — promise extraction indexes from concall transcripts as they publish.
        </p>
      </Card>
    );
  }
  const sc = p.narrative.scorecard;
  return (
    <>
      <Card className="border-accent/30">
        <SectionLabel>Management integrity scorecard</SectionLabel>
        <div className="flex gap-1.5 text-center">
          {(
            [
              ["Delivered", sc.delivered, "text-green"],
              ["Partial", sc.partial, "text-amber"],
              ["Missed", sc.missed, "text-red"],
              ["Pending", sc.pending, "text-dim"],
            ] as const
          ).map(([label, n, cls]) => (
            <div key={label} className="flex-1 rounded-xl border border-border/60 bg-bg/60 p-2">
              <p className={`text-[18px] font-extrabold ${cls}`}>{n}</p>
              <p className="text-[9.5px] font-bold uppercase tracking-widest text-dim">{label}</p>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[12.5px] text-muted">{sc.note}</p>
      </Card>

      {p.audits.map((a, i) => (
        <Card key={i}>
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-dim">
              {a.madeIn} call → <span className="text-ink">{a.horizon}</span>
            </p>
            <VerdictBadge v={a.verdict} />
          </div>
          <p className="mt-1.5 border-l-2 border-accent/50 pl-2.5 text-[12.5px] italic leading-snug text-muted">
            “{a.statement}”
          </p>
          <div className="mt-2 flex items-center justify-between text-[12px]">
            <span className="text-muted">Guided: <span className="font-semibold text-ink">{a.target}</span></span>
            <span className="text-muted">
              Delivered: <span className="font-semibold text-ink">{a.actual ?? "—"}</span>
            </span>
          </div>
          <p className="mt-1 text-[11.5px] text-dim">{a.gap}</p>
        </Card>
      ))}

      {p.guidance.length > 0 && (
        <Card>
          <SectionLabel>Forward guidance — latest concall (verdict pending)</SectionLabel>
          <ul className="space-y-2">
            {p.guidance.map((g, i) => (
              <li key={i} className="text-[12.5px] leading-snug">
                <span className="font-semibold text-ink">{g.metricLabel}: </span>
                <span className="text-muted">{g.target}</span>
                <span className="block border-l-2 border-amber/50 pl-2.5 text-[12px] italic text-dim">“{g.statement}”</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
      {p.bullBear && (p.bullBear.bull.length > 0 || p.bullBear.bear.length > 0) && (
        <Card>
          <SectionLabel>Bull vs Bear — computed from primary data</SectionLabel>
          <div className="grid grid-cols-1 gap-2">
            <div className="rounded-xl border border-green/30 bg-greenbg/40 p-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-green">▲ Bull — what the filings support</p>
              <ul className="mt-1.5 space-y-1.5">
                {p.bullBear.bull.map((b, i) => (
                  <li key={i} className="flex gap-2 text-[12.5px] leading-snug text-muted">
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-green" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-red/30 bg-redbg/40 p-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-red">▼ Bear — computed red flags</p>
              <ul className="mt-1.5 space-y-1.5">
                {p.bullBear.bear.map((b, i) => (
                  <li key={i} className="flex gap-2 text-[12.5px] leading-snug text-muted">
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-red" />
                    {b}
                  </li>
                ))}
                {p.bullBear.bear.length === 0 && (
                  <li className="text-[12.5px] text-muted">No computed red flags in the current financials.</li>
                )}
              </ul>
            </div>
          </div>
          <p className="mt-2 text-[10px] leading-relaxed text-dim">
            Deterministic synthesis from reported financials & concall extracts — no model invention, no broker notes.
          </p>
        </Card>
      )}
      <p className="px-1 text-[10px] leading-relaxed text-dim">Source: {p.narrative.note}</p>
    </>
  );
}

function FinancialsTab({ p }: { p: CompanyPayload }) {
  const cq = p.cashQuality;
  const bal = p.balance;
  return (
    <>
      <Card>
        <SectionLabel>Quarterly trend (₹ Cr)</SectionLabel>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] text-[11.5px]">
            <thead>
              <tr className="text-[9.5px] uppercase tracking-widest text-dim">
                <th className="text-left font-semibold">Qtr</th>
                <th className="text-right font-semibold">Rev</th>
                <th className="text-right font-semibold">EBITDA</th>
                <th className="text-right font-semibold">Mgn%</th>
                <th className="text-right font-semibold">PBT</th>
                <th className="text-right font-semibold">PAT</th>
              </tr>
            </thead>
            <tbody>
              {[...p.quarterly].reverse().map((r) => (
                <tr key={r.q} className={`border-t border-border/60 ${r.q === p.quarterly[p.quarterly.length - 1].q ? "text-ink font-semibold" : "text-muted"}`}>
                  <td className="py-1.5">{r.q}</td>
                  <td className="tabular py-1.5 text-right">{r.revenue.toLocaleString("en-IN")}</td>
                  <td className="tabular py-1.5 text-right">{r.ebitda.toLocaleString("en-IN")}</td>
                  <td className="tabular py-1.5 text-right">{((r.ebitda / r.revenue) * 100).toFixed(1)}</td>
                  <td className="tabular py-1.5 text-right">{r.pbt.toLocaleString("en-IN")}</td>
                  <td className="tabular py-1.5 text-right">{r.pat.toLocaleString("en-IN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {cq && cq.applicable && (
        <Card>
          <SectionLabel>Cash quality — {cq.fy}</SectionLabel>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="rounded-xl border border-border/60 bg-bg/60 p-2">
              <p className="text-[9.5px] font-bold uppercase tracking-widest text-dim">CFO / PAT</p>
              <p className={`tabular mt-0.5 text-[17px] font-extrabold ${(cq.cfoPatRatio ?? 0) >= 1 ? "text-green" : "text-red"}`}>
                {cq.cfoPatRatio?.toFixed(2)}×
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-bg/60 p-2">
              <p className="text-[9.5px] font-bold uppercase tracking-widest text-dim">FCF conversion</p>
              <p className={`tabular mt-0.5 text-[17px] font-extrabold ${(cq.fcfConversion ?? 0) >= 60 ? "text-green" : (cq.fcfConversion ?? 0) >= 0 ? "text-amber" : "text-red"}`}>
                {cq.fcfConversion?.toFixed(0)}%
              </p>
            </div>
          </div>
          <div className="mt-3 space-y-1.5">
            {cq.series.map((s) => {
              const max = Math.max(...cq.series.map((x) => Math.max(x.cfo, x.pat)));
              return (
                <div key={s.fy} className="flex items-center gap-2 text-[11px]">
                  <span className="w-9 text-dim">{s.fy}</span>
                  <div className="flex-1">
                    <div className="h-1.5 rounded-full bg-green/70" style={{ width: `${(s.cfo / max) * 100}%` }} />
                    <div className="mt-0.5 h-1.5 rounded-full bg-accent/70" style={{ width: `${(s.pat / max) * 100}%` }} />
                  </div>
                  <span className="tabular w-24 text-right text-dim">
                    CFO {fmtCr(s.cfo)} · PAT {fmtCr(s.pat)}
                  </span>
                </div>
              );
            })}
            <p className="text-[10px] text-dim">green = CFO · blue = PAT</p>
          </div>
          <p className="mt-2 text-[12px] text-muted">
            CFO {fmtCr(cq.cfo)} − capex {fmtCr(cq.capex)} = FCF <span className="font-semibold text-ink">{fmtCr(cq.fcf)}</span>
          </p>
        </Card>
      )}
      {cq && !cq.applicable && (
        <Card>
          <SectionLabel>Cash quality</SectionLabel>
          <p className="text-[12.5px] text-muted">Not meaningful for lenders/banks — profitability read via PAT & RoA instead.</p>
        </Card>
      )}

      {bal && (
        <Card>
          <SectionLabel>Balance sheet — leverage</SectionLabel>
          <p className="text-[12.5px] text-muted">
            D/E <span className="font-semibold text-ink">{bal.deRatio.toFixed(2)}×</span> on debt {fmtCr(bal.debt)} / equity {fmtCr(bal.equity)} ({bal.fy})
          </p>
          <div className="mt-2 space-y-1.5">
            {bal.deTrend.map((t) => {
              const max = Math.max(...bal.deTrend.map((x) => x.ratio));
              return (
                <div key={t.fy} className="flex items-center gap-2 text-[11px]">
                  <span className="w-9 text-dim">{t.fy}</span>
                  <div className="h-1.5 flex-1 rounded-full bg-surface2">
                    <div className="h-1.5 rounded-full bg-amber/80" style={{ width: `${(t.ratio / max) * 100}%` }} />
                  </div>
                  <span className="tabular w-10 text-right text-muted">{t.ratio.toFixed(2)}×</span>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      <Card>
        <SectionLabel>Annual (₹ Cr)</SectionLabel>
        <table className="w-full text-[11.5px]">
          <thead>
            <tr className="text-[9.5px] uppercase tracking-widest text-dim">
              <th className="text-left font-semibold">FY</th>
              <th className="text-right font-semibold">Rev</th>
              <th className="text-right font-semibold">EBITDA</th>
              <th className="text-right font-semibold">PAT</th>
              <th className="text-right font-semibold">CFO</th>
              <th className="text-right font-semibold">Capex</th>
            </tr>
          </thead>
          <tbody>
            {[...p.annual].reverse().map((r) => (
              <tr key={r.fy} className="border-t border-border/60 text-muted">
                <td className="py-1.5">{r.fy}</td>
                <td className="tabular py-1.5 text-right">{(r.revenue / 1000).toFixed(1)}K</td>
                <td className="tabular py-1.5 text-right">{(r.ebitda / 1000).toFixed(1)}K</td>
                <td className="tabular py-1.5 text-right">{(r.pat / 1000).toFixed(1)}K</td>
                <td className="tabular py-1.5 text-right">{r.cfo ? (r.cfo / 1000).toFixed(1) + "K" : "—"}</td>
                <td className="tabular py-1.5 text-right">{r.capex ? (r.capex / 1000).toFixed(1) + "K" : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}

function NetworkTab({ p, onChip }: { p: CompanyPayload; onChip: (i: number) => void }) {
  if (p.networkMatches.length === 0) {
    return (
      <Card>
        <p className="text-[13px] text-muted">
          No direct network matches for {p.company.ticker}. FINN would extend coverage here via sector-expertise matching —
          see the Network tab for who knows this industry.
        </p>
        <Link href="/network" className="mt-2 inline-block rounded-lg bg-accentbg px-3 py-1.5 text-[12px] font-semibold text-accent">
          ⌬ Open expertise map
        </Link>
      </Card>
    );
  }
  return (
    <>
      <Card>
        <SectionLabel>Who can brief you on {p.company.ticker}</SectionLabel>
        <ul className="space-y-2">
          {p.networkMatches.map((m, i) => (
            <li key={m.person.id}>
              <button
                onClick={() => onChip(i)}
                className="w-full rounded-xl border border-border/70 bg-bg/50 p-3 text-left active:bg-surface2"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[13.5px] font-semibold">{m.person.name}</p>
                  <span className={`rounded px-1.5 py-0.5 text-[9.5px] font-bold ${m.degree === 1 ? "bg-greenbg text-green" : "bg-accentbg text-accent"}`}>
                    {m.degree}°
                  </span>
                </div>
                <p className="text-[11.5px] text-muted">{m.person.headline}</p>
                <p className="mt-1 text-[12px] text-ink/80">{m.relevance}</p>
                {m.path && <p className="mt-1 text-[10.5px] text-dim">{m.path.join(" → ")}</p>}
              </button>
            </li>
          ))}
        </ul>
      </Card>
      <Card className="border-violet/30">
        <SectionLabel>Structural edges considered</SectionLabel>
        <p className="text-[12px] leading-snug text-muted">
          Ranked by: direct employer → competitor → supplier/customer chain → sector & domain-tag overlap, weighted by
          relationship strength. Competitors on file: {p.company.competitors.join(", ") || "—"}.
        </p>
      </Card>
    </>
  );
}
