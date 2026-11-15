// ── Core enums ────────────────────────────────────────────────────────────────

export const ANNOUNCEMENT_CATEGORIES = [
  "results",
  "mna",
  "fund_raise",
  "management_change",
  "litigation",
  "insider_trading",
  "earnings_call",
  "investor_meetings",
  "credit_rating",
  "dividend",
  "bonus_split",
  "capex",
  "press_release",
  "postal_ballot",
  "agm_egm",
  "pledging",
  "unclassified",
] as const;
export type AnnouncementCategory = (typeof ANNOUNCEMENT_CATEGORIES)[number];

export const MATERIAL_CATEGORIES: AnnouncementCategory[] = [
  "results",
  "mna",
  "fund_raise",
  "management_change",
  "litigation",
  "insider_trading",
  "capex",
  "credit_rating",
  "pledging",
];

export type Verdict = "delivered" | "partial" | "missed" | "pending";
export type Degree = 1 | 2 | 3;

// ── Company ──────────────────────────────────────────────────────────────────

export interface Segment {
  name: string;
  pct: number; // share of revenue, %
}

export interface Company {
  ticker: string; // "TITAN"
  name: string; // "Titan Company Ltd"
  sector: string; // "Consumer & Retail"
  industry: string; // "Watches & Jewellery"
  marketCapCr: number;
  inPortfolio: boolean;
  competitors: string[]; // tickers
  suppliers: string[]; // free-text or tickers
  customers: string[];
  description: string; // 1-2 dense lines, business model
  segments: Segment[];
  domainTags: string[]; // for semantic network matching, e.g. ["jewellery retail", "luxury consumer"]
}

// ── Financials ───────────────────────────────────────────────────────────────

export interface QuarterRow {
  q: string; // "Q2FY27"
  revenue: number; // ₹ Cr
  ebitda: number;
  pbt: number;
  pat: number;
  eps?: number;
}

export interface AnnualRow {
  fy: string; // "FY25"
  revenue: number;
  ebitda: number;
  pbt: number;
  pat: number;
  cfo: number; // cash flow from operations
  capex: number;
  debt: number; // total borrowings
  equity: number; // shareholders' equity
  roce?: number; // % (as reported where known, else computed)
  roe?: number; // %
  fcf?: number; // computed = cfo - capex
}

export interface FinancialsFile {
  [ticker: string]: {
    quarterly: QuarterRow[]; // ascending: oldest → newest
    annual: AnnualRow[]; // ascending
  };
}

export interface MetricDelta {
  value: number;
  qoq: number | null; // % change vs previous quarter
  yoy: number | null; // % change vs same quarter last year
}

export interface ResultsFirstCut {
  quarter: string;
  revenue: MetricDelta;
  ebitda: MetricDelta;
  ebitdaMargin: { value: number; qoqBps: number | null; yoyBps: number | null };
  pbt: MetricDelta;
  pat: MetricDelta;
}

// ── EOD market data ──────────────────────────────────────────────────────────

export interface EodBar {
  date: string; // ISO date
  close: number; // ₹
  volume: number; // shares
}

export interface QuotesFile {
  [ticker: string]: EodBar[]; // ~30 sessions, ascending
}

export interface Anomaly {
  ticker: string;
  kind: "volume_spike" | "price_breakout";
  detail: string;
  volX?: number; // volume ÷ 20d avg
  dayPct?: number;
}

// ── Announcements ────────────────────────────────────────────────────────────

export interface ManagementChangeEnrichment {
  outgoing?: { name: string; title: string; tenure: string; oneLiner: string };
  incoming?: {
    name: string;
    title: string;
    careerArc: { company: string; role: string; years: string }[];
    education: string[];
    oneLiner: string;
  };
}

export interface Announcement {
  id: string;
  ticker: string;
  date: string; // ISO datetime
  category: AnnouncementCategory;
  isMaterial: boolean;
  headline: string;
  summary: string; // 1-2 dense lines
  rawText?: string;
  source: string; // "NSE" | "BSE" | "FINN/EOD"
  managementChange?: ManagementChangeEnrichment;
  capex?: { amountCr: number; purpose: string; timeline?: string };
  litigation?: { amountCr?: number; authority: string; matter: string };
  fundRaise?: { instrument: string; amountCr: number };
  creditRating?: { agency: string; action: "assigned" | "upgraded" | "downgraded" | "reaffirmed"; rating: string };
}

// ── Network ──────────────────────────────────────────────────────────────────

export interface WorkHistory {
  company: string; // display name, e.g. "Tata Motors"
  ticker?: string; // mapped ticker when listed
  role: string;
  startYear: number;
  endYear: number | null; // null = present
  sector: string;
}

export interface Person {
  id: string;
  name: string;
  headline: string; // "Head of Supply Chain, Dixon Technologies"
  currentCompany: string;
  currentTitle: string;
  location?: string;
  education: string[]; // ["B.Tech IIT Delhi 2014", "MBA IIM Ahmedabad"]
  expertiseTags: string[];
  lastContact: string; // ISO date
  relationship: string; // "Former colleague" | "College friend" | ...
  degree: 1 | 2; // degree from the investor (1 = direct contact)
  workHistory: WorkHistory[];
}

export interface Connection {
  a: string; // person id or "you"
  b: string;
  type: "former_colleague" | "alumni" | "mentor" | "industry_friend" | "investor_founder";
  strength: 1 | 2 | 3 | 4 | 5;
  context: string; // "Worked together at Tata Motors 2016-22"
}

export interface NetworkFile {
  people: Person[];
  connections: Connection[];
}

export interface PersonMatch {
  person: Person;
  degree: Degree;
  relevance: string; // why they matter for this context
  path?: string[]; // ["You", "Vikram Malhotra", "Prakash Menon"] when degree 2
  edgeContext?: string;
}

export interface WarmNudge {
  person: Person;
  lastContact: string;
  daysStale: number;
  trigger: string; // "Trent just reported Q2FY27 results"
  reason: string; // why reconnect now
}

// ── Narrative vs Numbers ─────────────────────────────────────────────────────

export interface PromiseRow {
  madeIn: string; // quarter of concall, e.g. "Q1FY26"
  horizon: string; // period promised for, e.g. "FY26" | "Q4FY26"
  metricKey: MetricKey;
  metricLabel: string;
  statement: string; // exact-ish quote from transcript
  target: string; // human-readable target, "15-18%" | "₹4,500 Cr"
  // machine-readable target for deterministic audit (financial-metric keys)
  targetLo?: number;
  targetHi?: number;
  tolerancePct?: number; // % tolerance band around target midpoint (default 5)
  // pre-computed actual for custom/non-financial promises (store adds, debt, etc.)
  actualOverride?: { display: string; num?: number; verdict: Verdict };
}

export type MetricKey =
  | "revenue_growth_yoy"
  | "revenue_growth_qoq"
  | "ebitda_margin_pct"
  | "pat_growth_yoy"
  | "capex_total_cr"
  | "cfo_pat_ratio"
  | "de_ratio"
  | "store_additions"
  | "custom";

export interface PromiseAuditRow extends PromiseRow {
  actual: string | null; // formatted actual, null if horizon not yet reported
  verdict: Verdict;
  gap: string; // "Delivered 12.3% vs guided 15-18%"
}

export interface ConcallFile {
  [ticker: string]: {
    promises: PromiseRow[];
    nextGuidance: PromiseRow[]; // explicit forward guidance from latest concall (pending)
    sourceNote: string; // provenance note
  };
}

// ── API payloads ─────────────────────────────────────────────────────────────

export interface FeedItem {
  announcement: Announcement;
  companyName: string;
  networkMatches: PersonMatch[];
  firstCut?: ResultsFirstCut; // for results category
  anomaly?: Anomaly; // attached when EOD anomaly fires same day
}

export interface FeedResponse {
  generatedAt: string;
  windowHours: number;
  material: FeedItem[];
  routine: FeedItem[];
  anomalies: Anomaly[];
  counts: { total: number; material: number; routine: number; anomalies: number };
}

export interface CompanyPayload {
  company: Company;
  quote: {
    close: number;
    prevClose: number;
    changePct: number;
    volume: number;
    avgVolume20d: number;
    high52w: number;
    low52w: number;
    spark: EodBar[];
  };
  firstCut: ResultsFirstCut | null;
  quarterly: QuarterRow[];
  annual: AnnualRow[];
  cashQuality: {
    fy: string;
    cfo: number;
    capex: number;
    fcf: number;
    cfoPatRatio: number | null;
    fcfConversion: number | null; // FCF / PAT %
    series: { fy: string; cfo: number; pat: number }[];
    applicable: boolean; // false for banks/NBFC
  } | null;
  balance: {
    fy: string;
    debt: number;
    equity: number;
    deRatio: number;
    deTrend: { fy: string; ratio: number }[];
  } | null;
  audits: PromiseAuditRow[];
  guidance: PromiseRow[]; // pending forward guidance
  narrative: {
    scorecard: { delivered: number; partial: number; missed: number; pending: number; note: string };
    note: string;
  } | null;
  bullBear: { bull: string[]; bear: string[] } | null;
  networkMatches: PersonMatch[];
  isKnownUniverse: boolean; // false for live-fetched unknown tickers
}
