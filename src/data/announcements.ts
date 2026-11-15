import { Announcement } from "@/types";

// Demo clock: Saturday 14-Nov-2026, 09:30 IST — the weekend digest read.
// Latest EOD = Fri 13-Nov close (matches generated quote bars).
// Windowed digest reads this as the "live" feed. Synthetic NSE/BSE-style
// filings, structured to mirror real exchange-announcement formats.
export const DEMO_NOW = "2026-11-14T09:30:00+05:30";

export const ANNOUNCEMENTS: Announcement[] = [
  // ══ HERO 1 — Management change + network interception (TATAMOTORS) ════════
  {
    id: "a-tmmg-01", ticker: "TATAMOTORS", date: "2026-11-13T12:35:00+05:30",
    category: "management_change", isMaterial: true, source: "NSE",
    headline: "CFO P.B. Balaji to step down effective 31-Dec-26; Rohan Deshpande appointed CFO from 01-Jan-27",
    summary: "Balaji exits after 5 years to join a global EV venture. Deshpande moves up from JLR Group Financial Controller — continuity in the deleveraging playbook is the key question for FY27 guidance.",
    rawText: "Tata Motors Ltd has informed the Exchange that Mr. P.B. Balaji, Chief Financial Officer, has tendered his resignation effective close of business hours on December 31, 2026, to pursue an opportunity in a global electric-vehicle venture. The Board has approved the appointment of Mr. Rohan Deshpande as Chief Financial Officer effective January 1, 2027. Mr. Deshpande is currently Group Financial Controller, Jaguar Land Rover, and previously served as VP – Finance, Tata Motors (2014–2019).",
    managementChange: {
      outgoing: {
        name: "P.B. Balaji", title: "Chief Financial Officer", tenure: "Nov 2021 – Dec 2026 (5 yrs)",
        oneLiner: "Architect of the JLR 'Reimagine' funding reset and the ₹70,000 Cr → ₹42,000 Cr net-auto-debt glide path.",
      },
      incoming: {
        name: "Rohan Deshpande", title: "Chief Financial Officer (incoming)",
        careerArc: [
          { company: "Jaguar Land Rover", role: "Group Financial Controller", years: "2019–2026" },
          { company: "Tata Motors", role: "VP – Finance", years: "2014–2019" },
          { company: "EY (Transaction Advisory)", role: "Senior Manager", years: "2008–2014" },
        ],
        education: ["CA (ICAI), 2008", "MBA Finance, IIM Calcutta"],
        oneLiner: "17-year insider: JLR's numbers man through the EV pivot, with prior Tata Motors finance stint — low execution-risk hire, but a first-time CFO.",
      },
    },
  },

  // ══ HERO 2 — Results first-cut (TITAN) ════════════════════════════════════
  {
    id: "a-titres-01", ticker: "TITAN", date: "2026-11-13T17:45:00+05:30",
    category: "results", isMaterial: true, source: "NSE",
    headline: "Q2FY27 results: Revenue ₹21,100 Cr, PAT ₹1,290 Cr — beat on jewellery demand recovery",
    summary: "Festive-quarter beat with studded mix improving; EBITDA margin back above 11.9%. CaratLane turnaround and 40 net new Tanishq stores drove the top line.",
    rawText: "Titan Company Ltd has informed the Exchange regarding the Unaudited Financial Results for the quarter ended September 30, 2026.",
  },
  // Results wave (also first-cut eligible)
  {
    id: "a-tcsres-01", ticker: "TCS", date: "2026-11-12T17:20:00+05:30",
    category: "results", isMaterial: true, source: "NSE",
    headline: "Q2FY27 results: Revenue ₹68,000 Cr, PAT ₹13,700 Cr — demand commentary turns constructive",
    summary: "Second straight quarter of sequential acceleration; BFSI discretionary showing early recovery. Attrition stable at 12.1%.",
    rawText: "Results for the quarter ended September 30, 2026, approved and taken on record by the Board.",
  },
  {
    id: "a-infres-01", ticker: "INFY", date: "2026-11-12T17:05:00+05:30",
    category: "results", isMaterial: true, source: "NSE",
    headline: "Q2FY27 results: Revenue ₹44,900 Cr, PAT ₹9,100 Cr — FY27 guidance raised to 5.5-6.5%",
    summary: "Large-deal TCV $3.1bn; operating margin 26.1% despite wage hike. Guidance raise is the headline event.",
    rawText: "Results for the quarter and half-year ended September 30, 2026.",
  },
  {
    id: "a-cofres-01", ticker: "COFORGE", date: "2026-11-13T11:30:00+05:30",
    category: "results", isMaterial: true, source: "NSE",
    headline: "Q2FY27 results: Revenue ₹4,600 Cr (+13.4% YoY), PAT ₹525 Cr — insurance vertical leads",
    summary: "Margin up 130bps YoY to 17.8%; book-to-bill at 1.4x keeps Coforge on its mid-teens growth path.",
    rawText: "Unaudited financial results for the quarter ended September 30, 2026.",
  },
  {
    id: "a-hdfres-01", ticker: "HDFCBANK", date: "2026-11-12T16:40:00+05:30",
    category: "results", isMaterial: true, source: "NSE",
    headline: "Q2FY27 results: PAT ₹19,800 Cr, NIM 3.46% — LDR normalisation ahead of plan",
    summary: "Deposit growth 13% YoY vs credit growth 11% — the merger-era gap finally closed. Slippages contained at 1.2%.",
    rawText: "Financial results for the quarter ended September 30, 2026, reviewed by the Audit Committee.",
  },
  {
    id: "a-icires-01", ticker: "ICICIBANK", date: "2026-11-12T15:55:00+05:30",
    category: "results", isMaterial: true, source: "NSE",
    headline: "Q2FY27 results: PAT ₹15,200 Cr (+12.6% YoY), RoA 2.24%",
    summary: "Retail yields hold; corporate accretion continues. No fresh stress flags in the earnings call deck.",
    rawText: "Financial results for the quarter ended September 30, 2026.",
  },
  {
    id: "a-bajres-01", ticker: "BAJFINANCE", date: "2026-11-12T19:10:00+05:30",
    category: "results", isMaterial: true, source: "NSE",
    headline: "Q2FY27 results: PAT ₹7,000 Cr (+28.4% YoY), AUM +26% YoY",
    summary: "Cost-to-income at 37.4%; credit cost 1.05% — execution intact despite funding-cost drift.",
    rawText: "Unaudited financial results for the quarter ended September 30, 2026.",
  },
  {
    id: "a-sunres-01", ticker: "SUNPHARMA", date: "2026-11-12T18:00:00+05:30",
    category: "results", isMaterial: true, source: "NSE",
    headline: "Q2FY27 results: Revenue ₹14,750 Cr, PAT ₹3,290 Cr — specialty crosses 18% of sales",
    summary: "Ilumya + Winlevi run-rate strong; US generics pricing pressure manageable at -2% YoY.",
    rawText: "Financial results for the quarter and half year ended September 30, 2026.",
  },
  {
    id: "a-divres-01", ticker: "DIVISLAB", date: "2026-11-12T16:25:00+05:30",
    category: "results", isMaterial: true, source: "NSE",
    headline: "Q2FY27 results: Revenue ₹3,450 Cr (+9.5% YoY), PAT ₹630 Cr — CDMO order book swells",
    summary: "Two multi-year peptide CDMO wins booked; margin at 26.7% — the innovative book is now visibly re-rating the P&L.",
    rawText: "Financial results for the quarter ended September 30, 2026.",
  },
  {
    id: "a-mmres-01", ticker: "MANDM", date: "2026-11-12T17:35:00+05:30",
    category: "results", isMaterial: true, source: "NSE",
    headline: "Q2FY27 results: PAT ₹4,100 Cr (+17.8% YoY) — SUV pipeline 2.1 lakh units",
    summary: "Auto margins at 14.5%; tractor channel restocking visible. EV arm's losses narrowing.",
    rawText: "Unaudited financial results for the quarter ended September 30, 2026.",
  },
  {
    id: "a-eternal-01", ticker: "ETERNAL", date: "2026-11-12T19:15:00+05:30",
    category: "results", isMaterial: true, source: "NSE",
    headline: "Q2FY27 results: Revenue ₹10,900 Cr (+30.5% YoY), PAT ₹510 Cr — Blinkit GOV +94%",
    summary: "Blinkit contribution margin positive at +4.3%; dark-store additions back above 200/qtr.",
    rawText: "Financial results for the quarter ended September 30, 2026 (consolidated).",
  },

  // ══ HERO 3 — Mega capex + supplier intercept (RELIANCE) ═══════════════════
  {
    id: "a-rilcapex-01", ticker: "RELIANCE", date: "2026-11-13T19:30:00+05:30",
    category: "capex", isMaterial: true, source: "BSE",
    headline: "Board approves ₹12,400 Cr capex — giga-factory phase-2 (solar PV modules, cells & hydrogen electrolyzers)",
    summary: "Capex peak-year confirmation: takes RIL's FY27 spend toward ₹1.35L Cr. First 10GW module line commissioning pulled forward to Q4FY27; electrolyzer gigafactory site works to start Jan-27.",
    rawText: "Reliance Industries Ltd has informed the Exchange that the Board of Directors, at its meeting held on November 13, 2026, has approved capital expenditure of ₹12,400 crore towards Phase-2 of the New Energy Giga Complex at Jamnagar, covering integrated solar PV module and cell manufacturing and hydrogen electrolyser capacity.",
    capex: { amountCr: 12400, purpose: "New Energy giga-factory phase-2: 10GW solar module/cell lines + electrolyser capacity", timeline: "Commissioning from Q4FY27 through FY28" },
  },
  // ══ HERO 5 — Litigation (BAJFINANCE) ══════════════════════════════════════
  {
    id: "a-bajlit-01", ticker: "BAJFINANCE", date: "2026-11-13T14:20:00+05:30",
    category: "litigation", isMaterial: true, source: "NSE",
    headline: "RBI imposes ₹2.75 Cr monetary penalty for non-compliance with digital lending guidelines",
    summary: "Third supervisory action this year on outsourced LSP conduct. AUM impact nil; the watch item is whether it delays the pending SFB licence application.",
    rawText: "The Reserve Bank of India has, by an order dated November 13, 2026, imposed a monetary penalty of ₹2.75 crore on Bajaj Finance Ltd for non-compliance with certain provisions of the 'Guidelines on Digital Lending' and outsourcing norms.",
    litigation: { amountCr: 2.75, authority: "Reserve Bank of India", matter: "Digital lending & outsourcing (LSP) norm violations — conduct-related, no capital impact" },
  },

  // ── Other material filings ────────────────────────────────────────────────
  {
    id: "a-infec-01", ticker: "INFY", date: "2026-11-13T16:00:00+05:30",
    category: "earnings_call", isMaterial: true, source: "NSE",
    headline: "Transcript of Q2FY27 earnings conference call (held Nov 12, 2026)",
    summary: "CFO: 'We now see FY27 growth of 5.5-6.5% in cc terms, up from 4-5% guided in July' — second guidance raise this year.",
    rawText: "Pursuant to Regulation 30 of SEBI LODR, please find enclosed the transcript of the earnings conference call held on November 12, 2026.",
  },
  {
    id: "a-tmec-01", ticker: "TATAMOTORS", date: "2026-11-12T20:05:00+05:30",
    category: "earnings_call", isMaterial: true, source: "NSE",
    headline: "Transcript of Q2FY27 earnings call — management reaffirms FY27 net-auto-debt < ₹30,000 Cr",
    summary: "JLR order book intact; India EV revenue mix crosses 18%. CFO handover timing (Jan-01) flagged as 'clean, mid-cycle'.",
    rawText: "Transcript of the earnings conference call of Tata Motors Ltd held on November 12, 2026.",
  },
  {
    id: "a-ltorder-01", ticker: "LT", date: "2026-11-10T11:45:00+05:30",
    category: "press_release", isMaterial: true, source: "BSE",
    headline: "L&T Energy wins 'large' order (₹7,200 Cr) from NTPC for 2x800MW thermal package",
    summary: "Order book now ~2.4x FY26 revenue; Middle-East hydrocarbons still the margin drag. Defence vertical crossed ₹25,000 Cr book YTD.",
    rawText: "The Power Transmission & Distribution and Energy verticals of Larsen & Toubro have secured orders classified as 'large' aggregating to ₹7,200 crore from NTPC Ltd.",
  },
  {
    id: "a-tpqip-01", ticker: "TATAPOWER", date: "2026-11-11T17:50:00+05:30",
    category: "fund_raise", isMaterial: true, source: "NSE",
    headline: "Board approves QIP of up to ₹6,000 Cr to fund renewables & T&D capex",
    summary: "Equity raise de-risks the ₹1.25L Cr 3-yr capex plan; expect 5-6% dilution. First QIP since 2020.",
    rawText: "The Board of Directors of Tata Power Company Ltd has approved the raising of funds through a Qualified Institutions Placement for an amount not exceeding ₹6,000 crore.",
    fundRaise: { instrument: "Qualified Institutions Placement (QIP)", amountCr: 6000 },
  },
  {
    id: "a-bfcap-01", ticker: "BHARATFORG", date: "2026-11-10T13:30:00+05:30",
    category: "press_release", isMaterial: true, source: "BSE",
    headline: "Bharat Forge secures ₹1,150 Cr defence order for armoured vehicle systems",
    summary: "Third major MoD win this quarter — defence book now >₹9,000 Cr.Execution through FY28.",
    rawText: "Bharat Forge Ltd has received a purchase order aggregating ₹1,150 crore from the Ministry of Defence for supply of armoured vehicle systems.",
  },
  {
    id: "a-polrat-01", ticker: "POLYCAB", date: "2026-11-12T12:10:00+05:30",
    category: "credit_rating", isMaterial: true, source: "NSE",
    headline: "CRISIL upgrades Polycab to AA+ from AA; outlook stable",
    summary: "Upgrade reflects deleveraging (D/E 0.05) and market-share consolidation in W&C. Cost of funds to compress.",
    rawText: "CRISIL Ratings has upgraded the long-term rating of Polycab India Ltd to CRISIL AA+ from CRISIL AA, with stable outlook.",
    creditRating: { agency: "CRISIL", action: "upgraded", rating: "AA+ / Stable" },
  },
  {
    id: "a-mkmna-01", ticker: "MANKIND", date: "2026-11-11T18:40:00+05:30",
    category: "mna", isMaterial: true, source: "BSE",
    headline: "Mankind to acquire 100% of Rubor Consumer Health for ₹640 Cr — OTC portfolio bolt-on",
    summary: "Adds ₹210 Cr revenue run-rate in derma-OTC; 3.0x sales multiple vs 5.5x sector comps. Integrates with existing chemist-network moat.",
    rawText: "Mankind Pharma Ltd has entered into a definitive agreement to acquire 100% shareholding of Rubor Consumer Health Pvt Ltd for a consideration of ₹640 crore, on a cash-free debt-free basis.",
  },
  {
    id: "a-tmind-01", ticker: "TATACONSUM", date: "2026-11-11T10:05:00+05:30",
    category: "insider_trading", isMaterial: true, source: "NSE",
    headline: "Tata Sons acquires 0.4% stake in Tata Consumer worth ₹456 Cr (open-market purchase)",
    summary: "Rare promoter buy after 3 years — read as alignment signal ahead of the NourishCo demerger chatter.",
    rawText: "Tata Sons Pvt Ltd has acquired 40 lakh equity shares (0.4%) of Tata Consumer Products Ltd through open market transactions on November 9, 2026.",
  },
  {
    id: "a-divdiv-01", ticker: "DIVISLAB", date: "2026-11-11T15:45:00+05:30",
    category: "dividend", isMaterial: false, source: "NSE",
    headline: "Interim dividend of ₹12/share declared; record date Nov 21, 2026",
    summary: "Second interim this fiscal; annualised payout ~38% of FY27E EPS.",
    rawText: "Dividend of ₹12 per equity share declared; record date fixed as November 21, 2026.",
  },
  {
    id: "a-mmdiv-01", ticker: "MANDM", date: "2026-11-13T16:30:00+05:30",
    category: "dividend", isMaterial: false, source: "NSE",
    headline: "Interim dividend ₹28/share declared; record date Nov 24, 2026",
    summary: "Special element retained given SUV-cycle cash generation; yield ~0.8%.",
    rawText: "Interim dividend of ₹28 per share declared; record date November 24, 2026.",
  },
  {
    id: "a-dixorder-01", ticker: "DIXON", date: "2026-11-13T11:15:00+05:30",
    category: "press_release", isMaterial: true, source: "BSE",
    headline: "Dixon wins ₹1,800 Cr PLM order from global smartphone OEM; commences foldable assembly",
    summary: "New OEM onboarding diversifies beyond Xiaomi; foldable line commissioning Q4FY27. Volume surge on the stock today suggests institutional accumulation.",
    rawText: "Dixon Technologies (India) Ltd has informed the Exchange of a new order win of approximately ₹1,800 crore (annualised) from a leading global smartphone OEM, along with commencement of foldable smartphone assembly operations at its Chennai facility.",
  },

  // ── Routine noise (collapsed in digest) ───────────────────────────────────
  { id: "a-tcsagm-01", ticker: "TCS", date: "2026-11-14T08:20:00+05:30", category: "agm_egm", isMaterial: false, source: "BSE", headline: "AGM Proceedings & Annual Report FY26 — remote e-voting results published", summary: "All resolutions passed with >99% majority.", rawText: "Disclosure under Reg 44(3) of SEBI LODR — voting results of the 31st AGM." },
  { id: "a-infim-01", ticker: "INFY", date: "2026-11-14T08:55:00+05:30", category: "investor_meetings", isMaterial: false, source: "NSE", headline: "Schedule of analyst/institutional investor meetings (Nov 17-19)", summary: "CFO to attend 6 one-on-ones at Asia Tech Forum, Singapore.", rawText: "Schedule of meetings with institutional investors." },
  { id: "a-icim-01", ticker: "ICICIBANK", date: "2026-11-14T09:05:00+05:30", category: "investor_meetings", isMaterial: false, source: "BSE", headline: "Participation in investor conference — Nov 18, 2026", summary: "Group CFO panel discussion, no unpublished price-sensitive information to be shared.", rawText: "Intimation of participation in investor conference." },
  { id: "a-titpb-01", ticker: "TITAN", date: "2026-11-14T09:15:00+05:30", category: "postal_ballot", isMaterial: false, source: "NSE", headline: "Postal ballot notice — reappointment of Whole-time Director", summary: "Voting window Nov 20 - Dec 19, 2026.", rawText: "Notice of postal ballot with explanatory statement." },
  { id: "a-tcsesop-01", ticker: "TCS", date: "2026-11-13T10:15:00+05:30", category: "unclassified", isMaterial: false, source: "NSE", headline: "Allotment of 2.4 lakh equity shares under ESOP", summary: "Post-allotment paid-up capital revised marginally.", rawText: "Disclosure of share allotment under employee benefit schemes." },
  { id: "a-infesop-01", ticker: "INFY", date: "2026-11-12T09:30:00+05:30", category: "unclassified", isMaterial: false, source: "BSE", headline: "ESOP grant letter issued for FY27 cycle", summary: "Grants to be vested on performance conditions.", rawText: "ESOP administration disclosure." },
  { id: "a-bajad-01", ticker: "BAJFINANCE", date: "2026-11-13T08:20:00+05:30", category: "unclassified", isMaterial: false, source: "NSE", headline: "Newspaper advertisement — publication of financial results", summary: "Statutory ad in regional editions.", rawText: "Publication of financial results in newspapers as per LODR." },
  { id: "a-dixad-01", ticker: "DIXON", date: "2026-11-13T08:10:00+05:30", category: "unclassified", isMaterial: false, source: "BSE", headline: "Newspaper advertisement — publication of financial results", summary: "Statutory ad in Hindi & English dailies.", rawText: "Publication of financial results in newspapers as per LODR." },
  { id: "a-rilser-01", ticker: "RELIANCE", date: "2026-11-11T15:50:00+05:30", category: "unclassified", isMaterial: false, source: "BSE", headline: "Certificate under Reg 74(5) of SEBI (DP) Regulations", summary: "Routine half-year demat/RTA compliance certificate.", rawText: "Compliance certificate from RTA." },
  { id: "a-ltcomp-01", ticker: "LT", date: "2026-11-11T11:05:00+05:30", category: "unclassified", isMaterial: false, source: "NSE", headline: "Compliance certificate for quarter ended Sep 30, 2026", summary: "Reg 7(3) RTA certificate.", rawText: "Routine compliance filing." },
  { id: "a-tmmim-01", ticker: "TATAMOTORS", date: "2026-11-12T12:35:00+05:30", category: "investor_meetings", isMaterial: false, source: "NSE", headline: "Investor presentation for Q2FY27 uploaded", summary: "JLR SVA progress and EV mix slides appended.", rawText: "Investor presentation disclosure." },
  { id: "a-polgrant-01", ticker: "POLYCAB", date: "2026-11-13T09:20:00+05:30", category: "unclassified", isMaterial: false, source: "BSE", headline: "Employee stock option grant letter", summary: "Trust scheme grants logged.", rawText: "ESOP grant disclosure." },
  { id: "a-tpagm-01", ticker: "TATAPOWER", date: "2026-11-10T13:15:00+05:30", category: "agm_egm", isMaterial: false, source: "BSE", headline: "EGM results — borrowing limits resolution passed", summary: "Shareholders approve enhanced borrowing powers to ₹1.5L Cr.", rawText: "Voting results of the EGM held on November 11, 2026." },
  { id: "a-divim-01", ticker: "DIVISLAB", date: "2026-11-11T10:55:00+05:30", category: "investor_meetings", isMaterial: false, source: "NSE", headline: "One-on-one meetings with institutional investors", summary: "Management to meet 4 funds on Nov 18.", rawText: "Investor meeting intimation." },
  { id: "a-cofim-01", ticker: "COFORGE", date: "2026-11-13T16:05:00+05:30", category: "investor_meetings", isMaterial: false, source: "NSE", headline: "Participation in Citi Global TMT Conference", summary: "CEO fireside chat scheduled Nov 19.", rawText: "Conference participation intimation." },
  { id: "a-sunagm-01", ticker: "SUNPHARMA", date: "2026-11-08T17:25:00+05:30", category: "agm_egm", isMaterial: false, source: "BSE", headline: "AGM voting results published", summary: "Routine annual meeting outcomes.", rawText: "Reg 44(3) disclosure." },
  { id: "a-mkapm-01", ticker: "MANKIND", date: "2026-11-07T18:50:00+05:30", category: "agm_egm", isMaterial: false, source: "NSE", headline: "AGM notice & annual report FY26 circulated", summary: "AGM scheduled Dec 08, 2026 via VC.", rawText: "AGM notice disclosure." },
  { id: "a-mmim-01", ticker: "MANDM", date: "2026-11-12T09:45:00+05:30", category: "investor_meetings", isMaterial: false, source: "BSE", headline: "Analyst call for Farm Equipment SBU monthly volumes", summary: "Monthly volume call schedule disclosed.", rawText: "Investor communication intimation." },
  { id: "a-tctagm-01", ticker: "TATACONSUM", date: "2026-11-13T13:40:00+05:30", category: "agm_egm", isMaterial: false, source: "NSE", headline: "AGM proceedings & e-voting results", summary: "All 5 resolutions passed.", rawText: "Reg 44(3) voting results." },
  { id: "a-hdfesop-01", ticker: "HDFCBANK", date: "2026-11-13T11:55:00+05:30", category: "unclassified", isMaterial: false, source: "BSE", headline: "Allotment under Employee Stock Option Scheme", summary: "18,500 shares allotted on exercise.", rawText: "Allotment disclosure." },
  { id: "a-tpim-01", ticker: "TATAPOWER", date: "2026-11-12T15:25:00+05:30", category: "investor_meetings", isMaterial: false, source: "NSE", headline: "Investor call on QIP process — post-approval briefing", summary: "CFO to brief institutional holders on QIP mechanics.", rawText: "Investor call intimation." },
  { id: "a-eternal-02", ticker: "ETERNAL", date: "2026-11-11T09:05:00+05:30", category: "unclassified", isMaterial: false, source: "NSE", headline: "SAST compliance disclosure — promoter shareholding statement", summary: "Routine shareholding pattern certification.", rawText: "Routine disclosure under takeover regulations." },
  { id: "a-patim-01", ticker: "PATANJALI", date: "2026-11-12T10:40:00+05:30", category: "investor_meetings", isMaterial: false, source: "BSE", headline: "Management interaction with domestic institutional investors", summary: "6 MFs scheduled for one-on-ones this week.", rawText: "Investor meeting intimation." },
  { id: "a-ltim-01", ticker: "LT", date: "2026-11-13T09:15:00+05:30", category: "investor_meetings", isMaterial: false, source: "BSE", headline: "Investor meetings — London roadshow leg", summary: "Senior management to meet UK funds Nov 18-19.", rawText: "Investor meeting intimation." },
];

export const announcementsByTicker = (t: string) =>
  ANNOUNCEMENTS.filter((a) => a.ticker === t.toUpperCase());
