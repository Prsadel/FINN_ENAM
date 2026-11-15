import { NextRequest, NextResponse } from "next/server";
import { buildFeed } from "@/lib/data";

export const dynamic = "force-dynamic";

const clamp = (v: number, lo: number, hi: number, dflt: number) =>
  Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : dflt;

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const hours = Number(sp.get("window") ?? "24");
  const windowHours = [24, 48, 168].includes(hours) ? hours : 24;
  // Configurable anomaly thresholds (the investor decides what "unusual" means)
  const thresholds = {
    volumeX: clamp(Number(sp.get("volX")), 1.2, 4, 2.0),
    pricePct: clamp(Number(sp.get("pricePct")), 1, 10, 3.0),
  };
  const feed = buildFeed(windowHours, thresholds);
  return NextResponse.json({ ...feed, thresholds });
}
