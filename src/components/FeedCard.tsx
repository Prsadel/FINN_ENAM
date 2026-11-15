"use client";

import { useState } from "react";
import Link from "next/link";
import { FeedItem, AnnouncementCategory } from "@/types";
import { fmtCr, fmtPct, fmtBps } from "@/lib/metrics";
import PersonDrawer from "@/components/PersonDrawer";

const CAT_META: Record<AnnouncementCategory, { label: string; cls: string }> = {
  results: { label: "RESULTS", cls: "bg-greenbg text-green" },
  management_change: { label: "MGMT CHANGE", cls: "bg-violetbg text-violet" },
  mna: { label: "M&A", cls: "bg-accentbg text-accent" },
  fund_raise: { label: "FUND RAISE", cls: "bg-accentbg text-accent" },
  litigation: { label: "LITIGATION", cls: "bg-redbg text-red" },
  insider_trading: { label: "INSIDER", cls: "bg-redbg text-red" },
  capex: { label: "CAPEX", cls: "bg-amberbg text-amber" },
  credit_rating: { label: "RATING", cls: "bg-greenbg text-green" },
  pledging: { label: "PLEDGING", cls: "bg-redbg text-red" },
  bonus_split: { label: "BONUS/SPLIT", cls: "bg-amberbg text-amber" },
  earnings_call: { label: "CONCALL", cls: "bg-surface2 text-muted" },
  dividend: { label: "DIVIDEND", cls: "bg-surface2 text-muted" },
  press_release: { label: "PRESS", cls: "bg-surface2 text-muted" },
  postal_ballot: { label: "POSTAL BALLOT", cls: "bg-surface2 text-dim" },
  agm_egm: { label: "AGM/EGM", cls: "bg-surface2 text-dim" },
  investor_meetings: { label: "INVESTOR MEET", cls: "bg-surface2 text-dim" },
  unclassified: { label: "ROUTINE", cls: "bg-surface2 text-dim" },
};

const fmtTime = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", hour12: false });

const Delta = ({ v, digits = 1, suffix = "%" }: { v: number | null; digits?: number; suffix?: string }) => {
  if (v === null) return <span className="text-dim">—</span>;
  return (
    <span className={`tabular font-semibold ${v > 0 ? "text-green" : "text-red"}`}>
      {fmtPct(v, digits).replace("%", suffix)}
    </span>
  );
};

function ResultsTable({ item }: { item: FeedItem }) {
  const fc = item.firstCut!;
  const rows: { label: string; value: string; qoq: number | null; yoy: number | null }[] = [
    { label: "Revenue", value: fmtCr(fc.revenue.value), qoq: fc.revenue.qoq, yoy: fc.revenue.yoy },
    { label: "EBITDA", value: `${fmtCr(fc.ebitda.value)} · ${fc.ebitdaMargin.value.toFixed(1)}%`, qoq: fc.ebitda.qoq, yoy: fc.ebitda.yoy },
    { label: "PBT", value: fmtCr(fc.pbt.value), qoq: fc.pbt.qoq, yoy: fc.pbt.yoy },
    { label: "PAT", value: fmtCr(fc.pat.value), qoq: fc.pat.qoq, yoy: fc.pat.yoy },
  ];
  return (
    <div className="mt-3 rounded-xl border border-border bg-bg/60 p-3">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-dim">
        First cut — {fc.quarter} <span className="text-dim/70">· computed from filing</span>
      </p>
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
          {rows.map((r) => (
            <tr key={r.label} className="border-t border-border/60">
              <td className="py-1.5 pr-2 text-muted">{r.label}</td>
              <td className="tabular py-1.5 text-right font-semibold">{r.value}</td>
              <td className="py-1.5 text-right"><Delta v={r.qoq} /></td>
              <td className="py-1.5 text-right"><Delta v={r.yoy} /></td>
            </tr>
          ))}
          <tr className="border-t border-border/60">
            <td className="py-1.5 pr-2 text-muted">EBITDA margin Δ</td>
            <td className="py-1.5" />
            <td className="py-1.5 text-right"><Delta v={fc.ebitdaMargin.qoqBps} suffix="bps" digits={0} /></td>
            <td className="py-1.5 text-right"><Delta v={fc.ebitdaMargin.yoyBps} suffix="bps" digits={0} /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function MgmtChangeCard({ item, onChip }: { item: FeedItem; onChip: (i: number) => void }) {
  const mc = item.announcement.managementChange!;
  return (
    <div className="mt-3 space-y-2 rounded-xl border border-violet/30 bg-violetbg/40 p-3">
      {mc.outgoing && (
        <div className="flex items-start gap-2 text-[12.5px]">
          <span className="mt-0.5 rounded bg-redbg px-1.5 py-0.5 text-[10px] font-bold text-red">OUT</span>
          <p className="text-muted">
            <span className="font-semibold text-ink">{mc.outgoing.name}</span> ({mc.outgoing.tenure}) — {mc.outgoing.oneLiner}
          </p>
        </div>
      )}
      {mc.incoming && (
        <div className="flex items-start gap-2 text-[12.5px]">
          <span className="mt-0.5 rounded bg-greenbg px-1.5 py-0.5 text-[10px] font-bold text-green">IN</span>
          <div>
            <p className="text-muted">
              <span className="font-semibold text-ink">{mc.incoming.name}</span> — {mc.incoming.oneLiner}
            </p>
            <ul className="mt-1 space-y-0.5">
              {mc.incoming.careerArc.map((c) => (
                <li key={c.company + c.years} className="text-dim">
                  · {c.company} — {c.role} ({c.years})
                </li>
              ))}
              <li className="text-dim">· {mc.incoming.education.join(" · ")}</li>
            </ul>
          </div>
        </div>
      )}
      {item.networkMatches.length > 0 && (
        <div className="border-t border-violet/20 pt-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-violet">Your network can brief you</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {item.networkMatches.map((m, i) => (
              <button
                key={m.person.id}
                onClick={() => onChip(i)}
                className="rounded-full border border-violet/40 bg-bg px-2.5 py-1 text-[11.5px] font-medium text-ink active:bg-violet active:text-bg"
              >
                ⌬ {m.person.name} <span className="text-violet">{m.degree}°</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function GenericEnrich({ item, onChip }: { item: FeedItem; onChip: (i: number) => void }) {
  const a = item.announcement;
  return (
    <>
      {(a.capex || a.litigation || a.fundRaise || a.creditRating) && (
        <div className="mt-2.5 rounded-xl border border-border bg-bg/60 p-3 text-[12.5px]">
          {a.capex && (
            <p className="text-muted">
              <span className="font-semibold text-ink">{fmtCr(a.capex.amountCr)}</span> — {a.capex.purpose}
              {a.capex.timeline && <span className="block text-dim">{a.capex.timeline}</span>}
            </p>
          )}
          {a.litigation && (
            <p className="text-muted">
              <span className="font-semibold text-ink">{a.litigation.authority}</span>
              {a.litigation.amountCr ? ` · ${fmtCr(a.litigation.amountCr)} penalty` : ""} — {a.litigation.matter}
            </p>
          )}
          {a.fundRaise && (
            <p className="text-muted">
              <span className="font-semibold text-ink">{fmtCr(a.fundRaise.amountCr)}</span> via {a.fundRaise.instrument}
            </p>
          )}
          {a.creditRating && (
            <p className="text-muted">
              <span className="font-semibold text-ink">{a.creditRating.agency}</span> {a.creditRating.action} →{" "}
              <span className="font-semibold text-ink">{a.creditRating.rating}</span>
            </p>
          )}
        </div>
      )}
      {item.anomaly && (
        <p className="mt-2 rounded-lg bg-amberbg px-2.5 py-1.5 text-[11.5px] font-medium text-amber">
          ⚡ {item.anomaly.detail}
        </p>
      )}
      {item.networkMatches.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {item.networkMatches.map((m, i) => (
            <button
              key={m.person.id}
              onClick={() => onChip(i)}
              className="rounded-full border border-accent/30 bg-accentbg px-2.5 py-1 text-[11.5px] font-medium text-accent active:bg-accent active:text-bg"
            >
              ⌬ {m.person.name} <span className="opacity-70">{m.degree}°</span>
            </button>
          ))}
        </div>
      )}
    </>
  );
}

export default function FeedCard({ item }: { item: FeedItem }) {
  const [drawerIdx, setDrawerIdx] = useState<number | null>(null);
  const a = item.announcement;
  const cat = CAT_META[a.category] ?? CAT_META.unclassified;
  const isHero = ["results", "management_change"].includes(a.category);
  const match = drawerIdx !== null ? item.networkMatches[drawerIdx] : null;

  return (
    <article className={`rounded-2xl border p-3.5 ${isHero ? "border-border bg-surface" : "border-border/70 bg-surface/60"}`}>
      <div className="flex items-center gap-2">
        <Link
          href={`/company/${encodeURIComponent(a.ticker)}`}
          className="rounded-md bg-accentbg px-2 py-0.5 font-mono text-[11px] font-bold tracking-wide text-accent"
        >
          {a.ticker}
        </Link>
        <span className={`rounded px-1.5 py-0.5 font-mono text-[9.5px] font-bold tracking-wider ${cat.cls}`}>{cat.label}</span>
        <span className="ml-auto text-[10.5px] text-dim">{fmtTime(a.date)}</span>
      </div>

      <h3 className="mt-2 text-[14.5px] font-semibold leading-snug">{a.headline}</h3>
      <p className="mt-1 text-[12.5px] leading-snug text-muted">{a.summary}</p>

      {a.category === "results" && item.firstCut && <ResultsTable item={item} />}
      {a.category === "results" && !item.firstCut && item.anomaly && (
        <p className="mt-2 rounded-lg bg-amberbg px-2.5 py-1.5 text-[11.5px] font-medium text-amber">⚡ {item.anomaly.detail}</p>
      )}
      {a.category === "management_change" && item.announcement.managementChange && (
        <MgmtChangeCard item={item} onChip={setDrawerIdx} />
      )}
      {!["results", "management_change"].includes(a.category) && <GenericEnrich item={item} onChip={setDrawerIdx} />}
      {a.category === "results" && item.networkMatches.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {item.networkMatches.map((m, i) => (
            <button
              key={m.person.id}
              onClick={() => setDrawerIdx(i)}
              className="rounded-full border border-accent/30 bg-accentbg px-2.5 py-1 text-[11.5px] font-medium text-accent active:bg-accent active:text-bg"
            >
              ⌬ {m.person.name} <span className="opacity-70">{m.degree}°</span>
            </button>
          ))}
        </div>
      )}

      <PersonDrawer match={match} onClose={() => setDrawerIdx(null)} />
    </article>
  );
}
