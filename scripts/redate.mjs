// One-off: re-date announcements to the Sat-14-Nov-2026 morning digest timeline.
// DEMO_NOW = 2026-11-14T09:30 IST; EOD bars end Fri 2026-11-13.
import { readFileSync, writeFileSync } from "node:fs";

const FILE = "src/data/announcements.ts";
const MAP = {
  // ── 24h window (Fri 13 Nov, from 09:30) — all 5 heroes + pairing anomalies ──
  "a-tmmg-01": "2026-11-13T12:35:00+05:30", // intraday filing; pairs -3.9% breakout + 1.7x vol
  "a-titres-01": "2026-11-13T17:45:00+05:30",
  "a-rilcapex-01": "2026-11-13T19:30:00+05:30",
  "a-bajlit-01": "2026-11-13T14:20:00+05:30",
  "a-dixorder-01": "2026-11-13T11:15:00+05:30", // pairs 2.4x volume spike
  "a-cofres-01": "2026-11-13T11:30:00+05:30", // pairs +6.2% breakout / 2.1x vol
  "a-infec-01": "2026-11-13T16:00:00+05:30",
  "a-mmdiv-01": "2026-11-13T16:30:00+05:30",
  // ── 48h window (Thu 12 Nov) ──
  "a-tcsres-01": "2026-11-12T17:20:00+05:30",
  "a-infres-01": "2026-11-12T17:05:00+05:30",
  "a-hdfres-01": "2026-11-12T16:40:00+05:30",
  "a-icires-01": "2026-11-12T15:55:00+05:30",
  "a-bajres-01": "2026-11-12T19:10:00+05:30",
  "a-sunres-01": "2026-11-12T18:00:00+05:30",
  "a-divres-01": "2026-11-12T16:25:00+05:30",
  "a-mmres-01": "2026-11-12T17:35:00+05:30",
  "a-eternal-01": "2026-11-12T19:15:00+05:30",
  "a-tmec-01": "2026-11-12T20:05:00+05:30",
  "a-polrat-01": "2026-11-12T12:10:00+05:30",
  "a-infesop-01": "2026-11-12T09:30:00+05:30",
  "a-tmmim-01": "2026-11-12T12:35:00+05:30",
  "a-mmim-01": "2026-11-12T09:45:00+05:30",
  "a-tpim-01": "2026-11-12T15:25:00+05:30",
  "a-patim-01": "2026-11-12T10:40:00+05:30",
  // ── 7d window ──
  "a-mkmna-01": "2026-11-11T18:40:00+05:30",
  "a-tmind-01": "2026-11-11T10:05:00+05:30",
  "a-tpqip-01": "2026-11-11T17:50:00+05:30",
  "a-ltorder-01": "2026-11-10T11:45:00+05:30",
  "a-bfcap-01": "2026-11-10T13:30:00+05:30",
  "a-divdiv-01": "2026-11-11T15:45:00+05:30",
  "a-rilser-01": "2026-11-11T15:50:00+05:30",
  "a-ltcomp-01": "2026-11-11T11:05:00+05:30",
  "a-divim-01": "2026-11-11T10:55:00+05:30",
  "a-tpagm-01": "2026-11-10T13:15:00+05:30",
  "a-eternal-02": "2026-11-11T09:05:00+05:30",
  "a-sunagm-01": "2026-11-08T17:25:00+05:30",
  "a-mkapm-01": "2026-11-07T18:50:00+05:30",
  // ── Saturday-morning routine (24h, feeds the collapsed accordion) ──
  "a-tcsagm-01": "2026-11-14T08:20:00+05:30",
  "a-infim-01": "2026-11-14T08:55:00+05:30",
  "a-icim-01": "2026-11-14T09:05:00+05:30",
  "a-titpb-01": "2026-11-14T09:15:00+05:30",
  "a-tcsesop-01": "2026-11-13T10:15:00+05:30",
  "a-bajad-01": "2026-11-13T08:20:00+05:30",
  "a-dixad-01": "2026-11-13T08:10:00+05:30",
  "a-polgrant-01": "2026-11-13T09:20:00+05:30",
  "a-cofim-01": "2026-11-13T16:05:00+05:30",
  "a-tctagm-01": "2026-11-13T13:40:00+05:30",
  "a-hdfesop-01": "2026-11-13T11:55:00+05:30",
  "a-ltim-01": "2026-11-13T09:15:00+05:30",
};

let src = readFileSync(FILE, "utf8");
let missed = [];
for (const [id, date] of Object.entries(MAP)) {
  const re = new RegExp(`(id: "${id}"[^\\n]*?date: ")[^"]*(")`);
  if (!re.test(src)) {
    missed.push(id);
    continue;
  }
  src = src.replace(re, `$1${date}$2`);
}
writeFileSync(FILE, src);
console.log(missed.length ? `MISSED: ${missed.join(", ")}` : "All dates updated");
