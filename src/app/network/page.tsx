"use client";

import { useMemo, useState } from "react";
import { NETWORK } from "@/data/network";
import { ANNOUNCEMENTS, DEMO_NOW } from "@/data/announcements";
import { matchExpertise, warmNudges, degreeOf, prepFor } from "@/lib/graph";
import PersonDrawer from "@/components/PersonDrawer";
import type { PersonMatch, WarmNudge } from "@/types";

export default function NetworkPage() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [drawer, setDrawer] = useState<PersonMatch | null>(null);
  const [prepQuestions, setPrepQuestions] = useState<string[] | undefined>(undefined);

  const nudges: WarmNudge[] = useMemo(() => warmNudges(ANNOUNCEMENTS, 4), []);

  const topTags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of NETWORK.people) for (const t of p.expertiseTags) counts.set(t, (counts.get(t) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 14).map(([t]) => t);
  }, []);

  const results: PersonMatch[] = useMemo(() => {
    const q = tag ?? query;
    if (!q.trim()) return [];
    return matchExpertise(q, 12);
  }, [query, tag]);

  const everyone = useMemo(
    () =>
      NETWORK.people
        .map((person) => ({ person, deg: degreeOf(person.id).degree }))
        .sort((a, b) => a.deg - b.deg || a.person.name.localeCompare(b.person.name)),
    []
  );

  const openPerson = (personId: string) => {
    const p = NETWORK.people.find((x) => x.id === personId)!;
    const d = degreeOf(personId);
    setPrepQuestions(undefined);
    setDrawer({ person: p, degree: d.degree, path: d.path, edgeContext: d.edge?.context, relevance: p.headline });
  };

  const onSubmitQuery = () => {
    const prep = prepFor(query);
    if (prep) {
      setTag(null);
      setPrepQuestions(prep.questions);
      setDrawer(prep.match);
    }
  };

  return (
    <div>
      <h1 className="pt-1 text-[22px] font-extrabold tracking-tight">Network</h1>
      <p className="mt-1 text-[12px] text-muted">
        {NETWORK.people.length} people · 13 direct · the rest one call away
      </p>

      {/* Warm nudges */}
      <section className="mt-3">
        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-amber">Keeping it warm — reconnect now</p>
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {nudges.map((n) => (
            <button
              key={n.person.id}
              onClick={() => openPerson(n.person.id)}
              className="w-64 shrink-0 rounded-xl border border-amber/30 bg-amberbg/60 p-3 text-left active:bg-surface2"
            >
              <p className="text-[13px] font-bold">{n.person.name}</p>
              <p className="text-[11px] text-muted">{n.person.currentTitle}, {n.person.currentCompany}</p>
              <p className="mt-1.5 text-[11.5px] leading-snug text-ink/85">
                {n.daysStale}d since last touch · trigger: <span className="font-semibold">{n.trigger.slice(0, 64)}{n.trigger.length > 64 ? "…" : ""}</span>
              </p>
            </button>
          ))}
          {nudges.length === 0 && (
            <p className="rounded-xl border border-border bg-surface p-3 text-[12px] text-muted">All fresh — nobody going cold.</p>
          )}
        </div>
      </section>

      {/* Expertise search */}
      <section className="mt-4">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setTag(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSubmitQuery();
          }}
          placeholder="Who knows about…? or “Prep me for Sneha Kulkarni”"
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-[14px] placeholder:text-dim focus:border-accent focus:outline-none"
        />
        <div className="no-scrollbar mt-2 flex gap-1.5 overflow-x-auto pb-1">
          {topTags.map((t) => (
            <button
              key={t}
              onClick={() => {
                setTag(tag === t ? null : t);
                setQuery("");
              }}
              className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                tag === t ? "border-violet bg-violetbg text-violet" : "border-border text-muted"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {results.length > 0 && (
          <ul className="mt-2 space-y-1.5">
            {results.map((m) => (
              <li key={m.person.id}>
                <button onClick={() => setDrawer(m)} className="w-full rounded-xl border border-border bg-surface p-3 text-left active:bg-surface2">
                  <div className="flex items-center justify-between">
                    <p className="text-[13.5px] font-semibold">{m.person.name}</p>
                    <span className={`rounded px-1.5 py-0.5 text-[9.5px] font-bold ${m.degree === 1 ? "bg-greenbg text-green" : "bg-accentbg text-accent"}`}>
                      {m.degree}°
                    </span>
                  </div>
                  <p className="text-[11.5px] text-muted">{m.person.headline}</p>
                  <p className="mt-0.5 text-[11px] text-dim">{m.person.expertiseTags.join(" · ")}</p>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Full roster */}
      <section className="mt-4">
        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-dim">Full roster — by proximity</p>
        <ul className="space-y-1.5">
          {everyone.map(({ person, deg }) => (
            <li key={person.id}>
              <button onClick={() => openPerson(person.id)} className="w-full rounded-xl border border-border/60 bg-surface/50 p-3 text-left active:bg-surface2">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-semibold">{person.name}</p>
                  <span className={`rounded px-1.5 py-0.5 text-[9.5px] font-bold ${deg === 1 ? "bg-greenbg text-green" : "bg-accentbg text-accent"}`}>
                    {deg}°
                  </span>
                </div>
                <p className="text-[11.5px] text-muted">{person.headline}</p>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-4 text-center text-[10px] text-dim">
        Synthetic network (35 profiles) — methodology & real-deployment design in repo writeup · clock {DEMO_NOW.slice(0, 10)}
      </p>

      <PersonDrawer match={drawer} prepQuestions={prepQuestions} onClose={() => setDrawer(null)} />
    </div>
  );
}
