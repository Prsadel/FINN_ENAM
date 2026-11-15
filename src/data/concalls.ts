import { ConcallFile } from "@/types";

// Narrative-vs-Numbers extraction "cache" — statements from (synthetic) concall
// transcripts. In production these rows are produced by the Tier-1 extraction
// LLM from real transcripts and cached; the audit itself stays deterministic.
export const CONCALLS: ConcallFile = {
  TCS: {
    sourceNote: "Synthetic concall extracts, Q1FY26 (Jul 2025) & Q4FY26 (Apr 2026) calls",
    promises: [
      {
        madeIn: "Q1FY26", horizon: "FY26", metricKey: "revenue_growth_yoy", metricLabel: "Revenue growth (FY26, cc)",
        statement: "We expect FY26 revenue growth in the mid-single digits in constant currency as discretionary spend stabilises.",
        target: "mid-single-digit (≈5-7%)", targetLo: 5, targetHi: 7, tolerancePct: 10,
      },
      {
        madeIn: "Q1FY26", horizon: "FY26", metricKey: "ebitda_margin_pct", metricLabel: "EBITDA margin (FY26)",
        statement: "Margins will stay in a tight 26-27% band through FY26 despite the wage cycle.",
        target: "26-27%", targetLo: 26, targetHi: 27, tolerancePct: 5,
      },
      {
        madeIn: "Q4FY26", horizon: "FY27", metricKey: "revenue_growth_yoy", metricLabel: "Revenue growth (FY27, cc)",
        statement: "FY27 should see a return to mid-single-digit growth with BFSI discretionary recovering.",
        target: "mid-single-digit (≈5-7%)", targetLo: 5, targetHi: 7, tolerancePct: 10,
      },
    ],
    nextGuidance: [
      {
        madeIn: "Q2FY27", horizon: "FY27", metricKey: "revenue_growth_yoy", metricLabel: "Revenue growth (FY27, cc)",
        statement: "We reiterate mid-single-digit growth for FY27; H2 should be stronger than H1 on BFSI momentum.",
        target: "mid-single-digit",
      },
    ],
  },
  TITAN: {
    sourceNote: "Synthetic concall extracts, Q1FY26 (Jul 2025), Q2FY26 (Oct 2025) & Q4FY26 (Apr 2026) calls",
    promises: [
      {
        madeIn: "Q1FY26", horizon: "FY26", metricKey: "revenue_growth_yoy", metricLabel: "Jewellery-led revenue growth (FY26)",
        statement: "We guide to 15% jewellery revenue growth for FY26 on studded recovery and store additions.",
        target: "≈15%", targetLo: 15, targetHi: 15, tolerancePct: 10,
      },
      {
        madeIn: "Q2FY26", horizon: "FY26", metricKey: "store_additions", metricLabel: "Net new stores (H2FY26)",
        statement: "We will open 60 net new stores across Tanishq and CaratLane in H2FY26.",
        target: "60 stores", targetLo: 60, targetHi: 60, tolerancePct: 5,
        actualOverride: { display: "71 net new stores (opened)", num: 71, verdict: "delivered" },
      },
      {
        madeIn: "Q4FY26", horizon: "FY27", metricKey: "ebitda_margin_pct", metricLabel: "EBITDA margin (FY27)",
        statement: "FY27 margins should recover toward 12% as studded mix and CaratLane scale up.",
        target: "≈12%", targetLo: 12, targetHi: 12, tolerancePct: 8,
      },
    ],
    nextGuidance: [
      {
        madeIn: "Q2FY27", horizon: "FY27", metricKey: "revenue_growth_yoy", metricLabel: "Revenue growth (FY27)",
        statement: "With festive momentum, we now see FY27 revenue growth of 10-12%.",
        target: "10-12%",
      },
    ],
  },
  TATAMOTORS: {
    sourceNote: "Synthetic concall extracts, Q2FY26 (Oct 2025) & Q4FY26 (Apr 2026) calls",
    promises: [
      {
        madeIn: "Q2FY26", horizon: "FY26", metricKey: "ebitda_margin_pct", metricLabel: "EBITDA margin (FY26)",
        statement: "FY26 consolidated EBITDA margins should be about 13% as JLR pricing holds and India CV recovers.",
        target: "≈13%", targetLo: 13, targetHi: 13, tolerancePct: 8,
      },
      {
        madeIn: "Q2FY26", horizon: "FY26", metricKey: "custom", metricLabel: "JLR China sales (FY26)",
        statement: "China returns to full-year growth in FY26 as Model Discovery refresh lands.",
        target: "positive YoY growth",
        actualOverride: { display: "+4% YoY (delivered)", verdict: "delivered" },
      },
      {
        madeIn: "Q4FY26", horizon: "FY27", metricKey: "ebitda_margin_pct", metricLabel: "EBITDA margin (FY27)",
        statement: "We target 12.5%+ margins in FY27 on volume leverage, despite tariff noise in the US.",
        target: "≥12.5%", targetLo: 12.5, targetHi: 12.5, tolerancePct: 5,
      },
    ],
    nextGuidance: [
      {
        madeIn: "Q2FY27", horizon: "FY27", metricKey: "custom", metricLabel: "Net auto debt (FY27-end)",
        statement: "Net automotive debt to fall below ₹30,000 Cr by FY27-end despite the capex programme.",
        target: "< ₹30,000 Cr",
      },
      {
        madeIn: "Q2FY27", horizon: "H2FY27", metricKey: "custom", metricLabel: "CFO transition continuity",
        statement: "The CFO transition on Jan 1 is 'clean and mid-cycle'; guidance framework unchanged.",
        target: "guidance unchanged",
      },
    ],
  },
  TRENT: {
    sourceNote: "Synthetic concall extracts, Q3FY26 (Jan 2026) & Q4FY26 (Apr 2026) calls",
    promises: [
      {
        madeIn: "Q3FY26", horizon: "FY26", metricKey: "revenue_growth_yoy", metricLabel: "Revenue growth (FY26)",
        statement: "FY26 revenue growth should be around 35% as Zudio accelerates through the year.",
        target: "≈35%", targetLo: 35, targetHi: 35, tolerancePct: 10,
      },
      {
        madeIn: "Q3FY26", horizon: "FY26", metricKey: "store_additions", metricLabel: "Store additions (FY26)",
        statement: "Over 200 store additions across Zudio and Westside in FY26.",
        target: "200+ stores", targetLo: 200, targetHi: 200, tolerancePct: 5,
        actualOverride: { display: "214 stores (opened)", num: 214, verdict: "delivered" },
      },
      {
        madeIn: "Q4FY26", horizon: "FY27", metricKey: "revenue_growth_yoy", metricLabel: "Revenue growth (FY27)",
        statement: "Growth returns to 25%+ in FY27 as the Zudio fleet matures and grocery scales.",
        target: "≈25%", targetLo: 25, targetHi: 25, tolerancePct: 10,
      },
    ],
    nextGuidance: [
      {
        madeIn: "Q2FY27", horizon: "FY27", metricKey: "store_additions", metricLabel: "Store additions (FY27)",
        statement: "FY27 store additions to exceed 220, weighted to Zudio and Star.",
        target: "220+ stores",
      },
    ],
  },
  DIXON: {
    sourceNote: "Synthetic concall extracts, Q1FY26 (Jul 2025) & Q2FY27 (Oct 2026) calls",
    promises: [
      {
        madeIn: "Q1FY26", horizon: "FY26", metricKey: "revenue_growth_yoy", metricLabel: "Revenue (FY26, absolute)",
        statement: "FY26 revenue will cross ₹47,000 Cr on mobile PLI volumes and IT hardware onboarding.",
        target: "≥ ₹47,000 Cr", targetLo: 47000, targetHi: 47000, tolerancePct: 2,
      },
      {
        madeIn: "Q1FY26", horizon: "FY26", metricKey: "custom", metricLabel: "Mobile EMS margin (FY26)",
        statement: "Mobile EMS margins improve ~30bps in FY26 as component localisation deepens.",
        target: "+30bps vs FY25",
        actualOverride: { display: "4.5% vs 4.2% (+30bps)", verdict: "delivered" },
      },
      {
        madeIn: "Q2FY27", horizon: "FY27", metricKey: "revenue_growth_yoy", metricLabel: "Revenue (FY27, absolute)",
        statement: "We target ₹62,000 Cr revenue in FY27 with the new OEM ramping from Q3.",
        target: "₹62,000 Cr",
      },
    ],
    nextGuidance: [
      {
        madeIn: "Q2FY27", horizon: "FY27", metricKey: "custom", metricLabel: "Foldable line commissioning",
        statement: "Foldable smartphone assembly line commissions by Q4FY27 with the ₹1,800 Cr OEM order.",
        target: "Q4FY27",
      },
    ],
  },
  POLYCAB: {
    sourceNote: "Synthetic concall extracts, Q2FY26 (Oct 2025) & Q4FY26 (Apr 2026) calls",
    promises: [
      {
        madeIn: "Q2FY26", horizon: "FY26", metricKey: "revenue_growth_yoy", metricLabel: "Revenue growth (FY26)",
        statement: "FY26 revenue growth of 18-20% with exports contributing meaningfully.",
        target: "18-20%", targetLo: 18, targetHi: 20, tolerancePct: 8,
      },
      {
        madeIn: "Q2FY26", horizon: "FY26", metricKey: "ebitda_margin_pct", metricLabel: "EBITDA margin (FY26)",
        statement: "Consolidated EBITDA margins to hold in the 13-14% band for FY26.",
        target: "13-14%", targetLo: 13, targetHi: 14, tolerancePct: 8,
      },
      {
        madeIn: "Q4FY26", horizon: "FY27", metricKey: "custom", metricLabel: "Export revenue (FY27)",
        statement: "Export revenue should grow 30%+ in FY27 on US and Middle-East project wins.",
        target: "+30%",
      },
    ],
    nextGuidance: [
      {
        madeIn: "Q2FY27", horizon: "FY27", metricKey: "revenue_growth_yoy", metricLabel: "Revenue growth (FY27)",
        statement: "We reiterate FY27 growth of 16-18% with margin band intact.",
        target: "16-18%",
      },
    ],
  },
  BAJFINANCE: {
    sourceNote: "Synthetic concall extracts, Q1FY26 (Jul 2025) & Q3FY26 (Jan 2026) calls",
    promises: [
      {
        madeIn: "Q1FY26", horizon: "FY26", metricKey: "pat_growth_yoy", metricLabel: "PAT growth (FY26)",
        statement: "FY26 PAT growth should exceed 30% on the merged base with AUM growth of ~25%.",
        target: "≥30%", targetLo: 30, targetHi: 30, tolerancePct: 10,
      },
      {
        madeIn: "Q3FY26", horizon: "FY26", metricKey: "custom", metricLabel: "Cost-to-income ratio (FY26)",
        statement: "Cost-to-income ratio to remain below 38% for FY26 despite technology spend.",
        target: "<38%",
        actualOverride: { display: "37.1%", num: 37.1, verdict: "delivered" },
      },
      {
        madeIn: "Q3FY26", horizon: "FY27", metricKey: "custom", metricLabel: "AUM growth (FY27)",
        statement: "FY27 AUM growth guided at 26-28% with credit costs under 1.1%.",
        target: "26-28%",
      },
    ],
    nextGuidance: [
      {
        madeIn: "Q2FY27", horizon: "FY27", metricKey: "custom", metricLabel: "SFB licence progress",
        statement: "Small-finance-bank licence application is on track despite the RBI penalty; capital plan unaffected by the ₹6,000 Cr QIP at Tata Power — our own funding is deposit-led.",
        target: "application on track",
      },
    ],
  },
  ETERNAL: {
    sourceNote: "Synthetic concall extracts, Q2FY26 (Oct 2025) & Q4FY26 (Apr 2026) calls",
    promises: [
      {
        madeIn: "Q2FY26", horizon: "FY26", metricKey: "revenue_growth_yoy", metricLabel: "Adjusted revenue growth (FY26)",
        statement: "FY26 adjusted revenue growth of ~70% as Blinkit GOV nearly doubles.",
        target: "≈70%", targetLo: 70, targetHi: 70, tolerancePct: 12,
      },
      {
        madeIn: "Q2FY26", horizon: "FY26", metricKey: "custom", metricLabel: "Blinkit contribution margin (by Q4FY26)",
        statement: "Blinkit reaches positive contribution margin by Q4FY26.",
        target: "positive CM",
        actualOverride: { display: "+4.1% contribution margin in Q4FY26", verdict: "delivered" },
      },
      {
        madeIn: "Q4FY26", horizon: "FY27", metricKey: "store_additions", metricLabel: "Dark-store additions (FY27)",
        statement: "1,000 net new dark stores in FY27, keeping contribution margin positive through the expansion.",
        target: "1,000 stores",
      },
    ],
    nextGuidance: [
      {
        madeIn: "Q2FY27", horizon: "FY27", metricKey: "custom", metricLabel: "Consolidated PAT (FY27)",
        statement: "Management now expects consolidated PAT profitability for full FY27.",
        target: "full-year PAT positive",
      },
    ],
  },
};
