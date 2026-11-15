import { NetworkFile, Person, Connection, PersonMatch, WarmNudge, Announcement, Degree } from "@/types";
import { NETWORK } from "@/data/network";
import { COMPANIES, companyByTicker } from "@/data/companies";
import { ANNOUNCEMENTS as ANNOUNCEMENTS_DATA, DEMO_NOW } from "@/data/announcements";

// ── Graph construction ───────────────────────────────────────────────────────

const peopleById = new Map<string, Person>(NETWORK.people.map((p) => [p.id, p]));
const connections: Connection[] = NETWORK.connections;

const adjacency = new Map<string, { to: string; conn: Connection }[]>();
function addEdge(a: string, b: string, conn: Connection) {
  if (!adjacency.has(a)) adjacency.set(a, []);
  adjacency.get(a)!.push({ to: b, conn });
}
for (const c of connections) {
  addEdge(c.a, c.b, c);
  addEdge(c.b, c.a, c);
}

/** BFS from "you" — returns degree (hops) for every reachable person + the path. */
const degreeCache = new Map<string, { degree: Degree; path: string[]; edge: Connection | null }>();
function bfsFromYou(): void {
  const start = { id: "you", degree: 0, path: ["You"], edge: null as Connection | null };
  const visited = new Map<string, { degree: number; path: string[]; edge: Connection | null }>();
  visited.set("you", { degree: 0, path: ["You"], edge: null });
  const queue = [start];
  while (queue.length) {
    const cur = queue.shift()!;
    for (const { to, conn } of adjacency.get(cur.id) ?? []) {
      if (visited.has(to)) continue;
      const rec = {
        degree: cur.degree + 1,
        path: [...cur.path, nameOf(to)],
        edge: conn,
      };
      visited.set(to, rec);
      queue.push({ id: to, ...rec });
    }
  }
  for (const [id, rec] of visited) {
    if (id === "you") continue;
    degreeCache.set(id, {
      degree: Math.min(rec.degree, 3) as Degree,
      path: rec.path,
      edge: rec.edge,
    });
  }
}
bfsFromYou();

function nameOf(id: string): string {
  if (id === "you") return "You";
  return peopleById.get(id)?.name ?? id;
}

export function degreeOf(personId: string): { degree: Degree; path: string[]; edge: Connection | null } {
  return degreeCache.get(personId) ?? { degree: 3, path: ["You", personId], edge: null };
}

export const personById = (id: string) => peopleById.get(id);

// ── Company ↔ person matching ────────────────────────────────────────────────

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();

interface CompanyMatch {
  score: number;
  relevance: string;
}

function scorePersonForCompany(person: Person, ticker: string): CompanyMatch | null {
  const company = companyByTicker(ticker);
  if (!company) return null;
  const t = norm(company.name);
  let best: CompanyMatch | null = null;

  const consider = (score: number, relevance: string) => {
    if (!best || score > best.score) best = { score, relevance };
  };

  for (const wh of person.workHistory) {
    const whName = norm(wh.company);
    // direct employer match (by ticker or name)
    const direct = (wh.ticker && wh.ticker === ticker) || whName === t || whName.includes(t) || t.includes(whName);
    if (direct) {
      const role = wh.role.toLowerCase().includes("cfo") || wh.role.toLowerCase().includes("chief")
        ? `was ${wh.role} at ${wh.company}`
        : `worked at ${wh.company} (${wh.role}, ${wh.startYear}–${wh.endYear ?? "present"})`;
      consider(10, role);
      continue;
    }
    // competitor / supplier / customer linkage
    const c = companyByTicker(wh.ticker ?? "");
    if (c && company.competitors.includes(c.ticker)) {
      consider(5, `worked at ${c.name} — a direct ${company.name} competitor`);
    }
    if (
      company.suppliers.some((s) => norm(s).includes(whName) || whName.includes(norm(s))) ||
      company.customers.some((s) => norm(s).includes(whName) || whName.includes(norm(s)))
    ) {
      consider(4, `worked at ${wh.company} — in ${company.name}'s supply/customer chain`);
    }
    // sector-level insight
    if (wh.sector && norm(wh.sector) === norm(company.sector)) {
      consider(2, `${wh.sector} sector veteran (${wh.company})`);
    }
  }

  // domain-tag semantic overlap (the "failsafe" for indirect relevance)
  const personTags = new Set(person.expertiseTags.map(norm));
  const companyTags = company.domainTags.map(norm);
  const overlap = companyTags.filter((tg) => personTags.has(tg));
  if (overlap.length > 0) {
    consider(2 + overlap.length, `expert in: ${overlap.join(", ")}`);
  }

  return best;
}

// Yahoo sector/industry strings → network expertise vocabulary
const SECTOR_SYNONYMS: Record<string, string[]> = {
  "financial services": ["banking", "nbfc", "financial services"],
  banks: ["banking", "financial services"],
  insurance: ["banking", "financial services"],
  healthcare: ["pharma", "healthcare"],
  drug: ["pharma"],
  technology: ["it services", "platform tech"],
  "information technology": ["it services"],
  software: ["it services", "platform tech"],
  "consumer cyclical": ["consumer", "retail"],
  "consumer defensive": ["fmcg", "consumer", "staples"],
  retailing: ["retail", "consumer"],
  energy: ["power", "refining", "green energy"],
  oil: ["refining", "o2c"],
  utilities: ["power utilities", "renewables"],
  industrials: ["epc", "manufacturing", "industrial"],
  "building products": ["epc", "infrastructure"],
  machinery: ["manufacturing"],
  "auto components": ["auto components", "automotive"],
  automobile: ["automotive"],
  materials: ["manufacturing", "chemicals"],
  "communication services": ["telecom", "platform tech"],
};

export interface SectorHint {
  sector?: string;
  industry?: string;
}

function sectorTokensFromHint(hint: SectorHint): string[] {
  const raw = `${hint.sector ?? ""} ${hint.industry ?? ""}`.toLowerCase();
  const tokens: string[] = [];
  for (const [key, syn] of Object.entries(SECTOR_SYNONYMS)) {
    if (raw.includes(key)) tokens.push(...syn);
  }
  // raw word fallbacks ("specialty chemicals" → "chemicals")
  const words = raw.split(/[^a-z&]+/).filter((w) => w.length > 4);
  tokens.push(...words);
  return [...new Set(tokens)];
}

function scorePersonForSectorHint(person: Person, hint: SectorHint): CompanyMatch | null {
  const tokens = sectorTokensFromHint(hint);
  if (tokens.length === 0) return null;
  const tagSet = new Set(person.expertiseTags.map(norm));
  const sectorSet = new Set(person.workHistory.map((wh) => norm(wh.sector)));
  let score = 0;
  const hits: string[] = [];
  for (const tk of tokens) {
    for (const tag of tagSet) {
      if (tag.includes(tk) || tk.includes(tag)) {
        score += 4;
        hits.push(tag);
        break;
      }
    }
    for (const sec of sectorSet) {
      if (sec && (sec.includes(norm(tk)) || norm(tk).includes(sec))) {
        score += 3;
        hits.push(person.workHistory.find((w) => norm(w.sector) === sec)!.company);
        break;
      }
    }
  }
  if (score === 0) return null;
  return {
    score,
    relevance: `sector expertise for ${hint.industry ?? hint.sector}: ${[...new Set(hits)].slice(0, 3).join(", ")}`,
  };
}

export function matchCompany(ticker: string, opts?: { limit?: number } & SectorHint): PersonMatch[] {
  const limit = opts?.limit ?? 3;
  const hint: SectorHint = { sector: opts?.sector, industry: opts?.industry };
  const knownCompany = companyByTicker(ticker);
  const out: PersonMatch[] = [];
  for (const person of NETWORK.people) {
    const m = knownCompany ? scorePersonForCompany(person, ticker) : scorePersonForSectorHint(person, hint);
    if (!m) continue;
    const { degree, path, edge } = degreeOf(person.id);
    const strengthBoost = person.degree === 1 ? 1.15 : 1;
    out.push({
      person,
      degree,
      relevance: m.relevance,
      path: path,
      edgeContext: edge?.context,
      // composite rank: relevance strength × path strength
    });
    void strengthBoost;
  }
  const rank = (pm: PersonMatch): number => {
    const base = knownCompany
      ? pm.person.workHistory.some(
          (wh) => (wh.ticker && wh.ticker === ticker) || norm(wh.company) === norm(knownCompany.name)
        )
        ? 100
        : 50
      : 40; // sector-hint matches rank below direct employer matches
    const degPenalty = pm.degree === 1 ? 0 : pm.degree === 2 ? 10 : 25;
    return base - degPenalty + (pm.edgeContext ? 2 : 0);
  };
  return out.sort((a, b) => rank(b) - rank(a)).slice(0, limit);
}

// ── Management-change intercept ──────────────────────────────────────────────

interface IncomingBio {
  name: string;
  careerArc: { company: string; role: string; years: string }[];
  education: string[];
}

const educationSchools = (edu: string[]): string[] =>
  edu
    .map((e) => e.replace(/^[^,]+,\s*/, "").replace(/\b(19|20)\d{2}\b/g, "").trim())
    .map(norm)
    .filter((s) => s.length > 3);

const overlapYears = (arc: { years: string }): [number, number] => {
  const nums = arc.years.match(/(19|20)\d{2}/g)?.map(Number) ?? [];
  if (nums.length === 0) return [0, 9999];
  return [nums[0], nums[nums.length - 1]];
};

export function matchIncomingPerson(bio: IncomingBio, limit = 3): PersonMatch[] {
  const bioCompanies = bio.careerArc.map((a) => ({ ...a, key: norm(a.company) }));
  const bioSchools = educationSchools(bio.education);
  const out: PersonMatch[] = [];

  for (const person of NETWORK.people) {
    const reasons: string[] = [];
    let score = 0;

    for (const wh of person.workHistory) {
      const whKey = norm(wh.company);
      for (const arc of bioCompanies) {
        if (whKey === arc.key || whKey.includes(arc.key) || arc.key.includes(whKey)) {
          const [s, e] = overlapYears(arc);
          const whEnd = wh.endYear ?? 2027;
          if (s <= whEnd && e >= wh.startYear) {
            score += 8;
            reasons.push(`worked at ${wh.company} in overlapping years with ${bio.name} (${arc.years})`);
          } else {
            score += 4;
            reasons.push(`knows ${wh.company} from the inside (${wh.role})`);
          }
        }
      }
    }
    const personSchools = educationSchools(person.education);
    for (const school of bioSchools) {
      if (personSchools.some((s) => s === school)) {
        score += 6;
        const pretty = bio.education.find((e) => norm(e.replace(/^[^,]+,\s*/, "").replace(/\b(19|20)\d{2}\b/g, "").trim()) === school);
        reasons.push(`alumni: ${pretty ?? school}`);
      }
    }
    if (reasons.length === 0) continue;

    const { degree, path, edge } = degreeOf(person.id);
    out.push({
      person,
      degree,
      relevance: reasons.slice(0, 2).join("; "),
      path: path,
      edgeContext: edge?.context,
    });
  }
  return out.sort((a, b) => b.person.degree - a.person.degree || b.degree - a.degree).slice(0, limit);
}

// ── Expertise search ─────────────────────────────────────────────────────────

export function matchExpertise(query: string, limit = 8): PersonMatch[] {
  const q = norm(query);
  const terms = q.split(/\s+/).filter(Boolean);
  const out: PersonMatch[] = [];
  for (const person of NETWORK.people) {
    let score = 0;
    for (const tag of person.expertiseTags) {
      const nt = norm(tag);
      if (q.includes(nt) || nt.includes(q)) score += 10;
      else for (const term of terms) if (nt.includes(term) && term.length > 2) score += 4;
    }
    for (const wh of person.workHistory) {
      if (q.includes(norm(wh.company)) || norm(wh.company).includes(q)) score += 6;
      if (q.includes(norm(wh.sector)) || norm(wh.sector).includes(q)) score += 3;
    }
    if (score <= 0) continue;
    const { degree, path, edge } = degreeOf(person.id);
    out.push({ person, degree, relevance: person.expertiseTags.join(" · "), path, edgeContext: edge?.context });
  }
  return out.sort((a, b) => b.degree - a.degree).slice(0, limit);
}

// ── Warm nudges ──────────────────────────────────────────────────────────────

const daysSince = (iso: string): number =>
  Math.floor((new Date(DEMO_NOW).getTime() - new Date(iso).getTime()) / 86400000);

const personTickers = (p: Person): string[] => {
  const set = new Set<string>();
  for (const wh of p.workHistory) if (wh.ticker) set.add(wh.ticker);
  const cur = COMPANIES.find(
    (c) => norm(c.name) === norm(p.currentCompany) || norm(c.name).includes(norm(p.currentCompany)) || norm(p.currentCompany).includes(norm(c.name))
  );
  if (cur) set.add(cur.ticker);
  return [...set];
};

export function warmNudges(recent: Announcement[], limit = 4): WarmNudge[] {
  const STALE_DAYS = 120;
  const out: WarmNudge[] = [];
  for (const person of NETWORK.people) {
    const stale = daysSince(person.lastContact);
    if (stale < STALE_DAYS) continue;
    const tickers = personTickers(person);
    const triggerAnn = recent
      .filter((a) => a.isMaterial && tickers.includes(a.ticker))
      .sort((a, b) => (a.date < b.date ? 1 : -1))[0];
    if (!triggerAnn) continue;
    out.push({
      person,
      lastContact: person.lastContact,
      daysStale: stale,
      trigger: triggerAnn.headline,
      reason: `${person.name.split(" ")[0]} spent ${person.workHistory[0].endYear ? `${person.workHistory[0].startYear}–${person.workHistory[0].endYear}` : `${person.workHistory[0].startYear}–present`} at ${person.workHistory[0].company}. A natural excuse to reconnect — and get ground truth.`,
    });
  }
  return out.sort((a, b) => a.daysStale - b.daysStale).slice(0, limit);
}

// ── "Prep me for X" — deterministic diligence intent parser ──────────────────

const normName = (s: string) => s.toLowerCase().replace(/[^a-z ]/g, "").trim();

export interface PrepDossier {
  match: PersonMatch;
  questions: string[];
}

/** Detects "prep me for <name/role/company>" queries and resolves the target. */
export function prepFor(query: string): PrepDossier | null {
  if (!/\bprep\b|\bdiligence\b|\bmeeting with\b/i.test(query)) return null;
  const target = normName(
    query.replace(/prep me for|prep for|prep|diligence on|diligence|meeting with|meeting/gi, "")
  );
  if (target.length < 3) return null;

  let best: { person: Person; score: number } | null = null;
  for (const person of NETWORK.people) {
    let score = 0;
    const name = normName(person.name);
    if (name === target) score += 20;
    if (name.includes(target) || target.includes(name)) score += 12;
    for (const tok of target.split(/\s+/)) {
      if (tok.length < 3) continue;
      if (name.includes(tok)) score += 5;
      if (normName(person.currentCompany).includes(tok)) score += 4;
      if (normName(person.headline).includes(tok)) score += 3;
      for (const wh of person.workHistory) if (normName(wh.company).includes(tok)) score += 3;
      for (const tag of person.expertiseTags) if (norm(tag).includes(tok)) score += 2;
    }
    if (score > 0 && (!best || score > best.score)) best = { person, score };
  }
  if (!best) return null;

  const person = best.person;
  const questions: string[] = [];
  for (const wh of person.workHistory.slice(0, 2)) {
    questions.push(
      `At ${wh.company} (${wh.startYear}–${wh.endYear ?? "present"}) they were ${wh.role} — ask what the org optimises for that outsiders never see.`
    );
  }
  const tickers = personTickers(person);
  const hook = ANNOUNCEMENTS_DATA.filter((a) => a.isMaterial && tickers.includes(a.ticker)).sort((x, y) => (x.date < y.date ? 1 : -1))[0];
  if (hook) questions.push(`Open with the live event: “${hook.headline}” — then ask what the filing leaves out.`);
  const stale = daysSince(person.lastContact);
  if (stale > 120) questions.push(`${stale} days since last touch — lead with the catch-up before the ask; don't open cold with a favour.`);
  questions.push(`Their lens: ${person.expertiseTags.slice(0, 3).join(", ")} — bring one contrarian view to test against it.`);
  questions.push(`Close by asking who else they'd speak to on this — a name beats a week of desk research.`);

  const { degree, path, edge } = degreeOf(person.id);
  return {
    match: {
      person,
      degree,
      relevance: `Diligence prep — ${person.headline}`,
      path,
      edgeContext: edge?.context,
    },
    questions: questions.slice(0, 4),
  };
}

// ── Dossier (drawer content) ─────────────────────────────────────────────────

export interface Dossier {
  person: Person;
  degree: Degree;
  path: string[];
  edgeContext?: string;
  lines: string[]; // deterministic "what they can tell you" bullets
}

export function dossierFor(personId: string, recent?: Announcement[]): Dossier | null {
  const person = peopleById.get(personId);
  if (!person) return null;
  const { degree, path, edge } = degreeOf(personId);
  const lines: string[] = [];
  for (const wh of person.workHistory) {
    if (wh.ticker && companyByTicker(wh.ticker)) {
      lines.push(
        `${wh.company} — ${wh.role} (${wh.startYear}–${wh.endYear ?? "present"}). First-hand read on strategy, culture and execution.`
      );
      const c = companyByTicker(wh.ticker)!;
      for (const comp of c.competitors.slice(0, 2)) {
        const cc = companyByTicker(comp);
        if (cc) lines.push(`Can compare notes on ${cc.name} — direct competitor of ${c.name} in ${c.sector}.`);
      }
    } else {
      lines.push(`${wh.company} — ${wh.role} (${wh.startYear}–${wh.endYear ?? "present"}).`);
    }
  }
  const linked = person.expertiseTags.slice(0, 3).join(", ");
  lines.push(`Domain depth: ${linked}.`);
  const tickers = personTickers(person);
  const recentHit = recent?.find((a) => a.isMaterial && tickers.includes(a.ticker));
  if (recentHit) lines.push(`Live hook: just surfaced on ${recentHit.ticker} — “${recentHit.headline}”.`);
  return { person, degree, path, edgeContext: edge?.context ?? undefined, lines: lines.slice(0, 5) };
}
