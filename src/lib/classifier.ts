import { AnnouncementCategory } from "@/types";

// Tier-3 keyword classifier for raw filings of unknown tickers (generalizer).
// Seed data ships pre-classified; this runs only on live-fetched filings.

const KEYWORDS: [AnnouncementCategory, RegExp, boolean][] = [
  ["management_change", /resign|appoint|cessation|re-appoint|reappoint|change in director|chief financial officer|chief executive/i, true],
  ["results", /financial results|quarterly result|unaudited financial|audited financial results/i, true],
  ["earnings_call", /conference call|earnings call|transcript of/i, true],
  ["mna", /acquisition|acquire|merger|demerger|joint venture|stake (purchase|sale)|slump sale/i, true],
  ["fund_raise", /rights issue|qualified institutions placement|qip|preferential allotment|buy-?back|commercial paper|non-convertible debenture/i, true],
  ["litigation", /penalt(y|ies)|sebi order|insolvency|show cause|legal proceeding|writ|adjudication/i, true],
  ["insider_trading", /acquisition under sebi \(sast\)|promoter.*(purchase|sale)|insider trading|disclosure under reg\. 7\(2\)/i, true],
  ["capex", /capital expenditure|new plant|capacity expansion|greenfield|gigafactory/i, true],
  ["credit_rating", /credit rating|crisil|icra|india ratings|care ratings|rating (assign|upgrade|downgrade|reaffirm)/i, true],
  ["pledging", /pledge|encumbrance|release of shares/i, true],
  ["dividend", /dividend.*(declared|record date)|record date.*dividend/i, false],
  ["bonus_split", /bonus issue|stock split|sub-division|subdivision/i, true],
  ["postal_ballot", /postal ballot|e-?voting result/i, false],
  ["agm_egm", /annual general meeting|extraordinary general meeting|voting results/i, false],
  ["investor_meetings", /investor meeting|analyst meet|one-?on-?one|conference participation|roadshow|investor presentation/i, false],
  ["press_release", /order win|secures order|new product|partnership|signs (mou|agreement)/i, true],
];

export interface Classification {
  category: AnnouncementCategory;
  isMaterial: boolean;
  confidence: "high" | "low";
}

export function classifyFiling(text: string): Classification {
  for (const [category, re, material] of KEYWORDS) {
    if (re.test(text)) {
      return { category, isMaterial: material, confidence: "high" };
    }
  }
  return { category: "unclassified", isMaterial: false, confidence: "low" };
}

// Priority weight for feed ordering (higher = more urgent)
const PRIORITY: Partial<Record<AnnouncementCategory, number>> = {
  management_change: 100,
  results: 95,
  mna: 90,
  litigation: 85,
  capex: 80,
  fund_raise: 78,
  insider_trading: 70,
  credit_rating: 62,
  pledging: 60,
  bonus_split: 55,
  earnings_call: 52,
  dividend: 45,
  press_release: 40,
};

export function priorityOf(category: AnnouncementCategory, isMaterial: boolean): number {
  if (!isMaterial) return 0;
  return PRIORITY[category] ?? 30;
}
