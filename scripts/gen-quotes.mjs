// Build-time EOD bar generator: 30 sessions ending Fri 2026-11-13.
// Deterministic (seeded PRNG). Run: node scripts/gen-quotes.mjs
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "src", "data", "quotes.json");

// mulberry32 — deterministic PRNG
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SESSIONS = 30;
// Trading days ending 2026-11-13 (Fri), skipping weekends
const dates = (() => {
  const out = [];
  const d = new Date(Date.UTC(2026, 10, 13)); // Nov 13 2026
  while (out.length < SESSIONS) {
    const day = d.getUTCDay();
    if (day !== 0 && day !== 6) out.push(d.toISOString().slice(0, 10));
    d.setUTCDate(d.getUTCDate() - 1);
  }
  return out.reverse();
})();

// ticker: [lastClose, avgVolume (shares, in lakhs → store absolute), 52w high, 52w low, drift, volVolatility]
// Special tail behaviour handled per ticker below.
const PARAMS = {
  TCS: [3105, 32, 4385, 3040, -0.0004],
  INFY: [1562, 70, 2010, 1455, 0.0008],
  COFORGE: [1884, 9, 2200, 1510, 0.0012],
  HDFCBANK: [1022, 130, 1145, 870, 0.0010],
  ICICIBANK: [1387, 110, 1450, 1060, 0.0009],
  BAJFINANCE: [1052, 55, 1180, 780, 0.0010],
  TITAN: [3642, 12, 3910, 3010, 0.0006],
  TRENT: [5448, 8, 7390, 4820, -0.0006],
  TATACONSUM: [1152, 20, 1240, 930, 0.0005],
  SUNPHARMA: [1724, 30, 1930, 1470, 0.0007],
  DIVISLAB: [6148, 6, 6900, 5480, 0.0008],
  MANKIND: [2486, 10, 2920, 2210, 0.0006],
  TATAMOTORS: [721, 320, 1170, 640, -0.0015],
  MANDM: [3318, 28, 3720, 2620, 0.0010],
  BHARATFORG: [1342, 22, 1610, 1080, 0.0007],
  RELIANCE: [1512, 180, 1615, 1150, 0.0003],
  LT: [3892, 26, 4180, 3010, 0.0009],
  TATAPOWER: [404, 190, 515, 355, 0.0004],
  DIXON: [15846, 4, 19010, 11800, 0.0012],
  POLYCAB: [7118, 8, 7900, 5900, 0.0006],
  PATANJALI: [1832, 12, 2100, 1680, 0.0003],
  ETERNAL: [386, 340, 420, 205, 0.0014],
};

// Last-day overrides: engineered anomalies (Fri 13-Nov close)
// dayPct: % move on the last day; volX: last-day volume as multiple of 20d avg
const LAST_DAY = {
  TATAMOTORS: { dayPct: -3.9, volX: 1.7 },  // price breakout (down) on mgmt-change news
  DIXON: { dayPct: 1.8, volX: 2.4 },        // volume spike on order win
  COFORGE: { dayPct: 6.2, volX: 2.1 },      // breakout + spike after results
};

const quotes = {};
const meta = {};

for (const [tk, [lastClose, volLakh, high52, low52, drift]] of Object.entries(PARAMS)) {
  const rnd = mulberry32(
    [...tk].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 7)
  );
  const ld = LAST_DAY[tk] ?? null;
  // walk backwards from last close; day returns ~ N(drift, 1.1%)
  const closes = new Array(SESSIONS);
  closes[SESSIONS - 1] = lastClose;
  for (let i = SESSIONS - 2; i >= 0; i--) {
    let ret = drift + (rnd() - 0.5) * 0.022;
    if (ld && i === SESSIONS - 1) ret = 0; // handled via dayPct below
    closes[i] = closes[i + 1] / (1 + ret);
    if (ld && i === SESSIONS - 2) {
      // set day-before-last so that last day = ld.dayPct
      closes[SESSIONS - 2] = lastClose / (1 + ld.dayPct / 100);
    }
  }
  // volumes: 20d avg ≈ volLakh lakhs; last day engineered
  const avgVol = volLakh * 1e5;
  const bars = closes.map((close, i) => {
    let volume = avgVol * (0.75 + rnd() * 0.5);
    if (ld && i === SESSIONS - 1) volume = avgVol * ld.volX;
    return { date: dates[i], close: Math.round(close * 10) / 10, volume: Math.round(volume) };
  });
  quotes[tk] = bars;
  meta[tk] = { high52w: high52, low52w: low52 };
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify({ quotes, meta }, null, 0));
console.log(`Wrote ${Object.keys(quotes).length} tickers × ${SESSIONS} sessions → ${OUT}`);
