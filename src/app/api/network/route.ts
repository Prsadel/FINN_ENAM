import { NextRequest, NextResponse } from "next/server";
import { matchExpertise, warmNudges } from "@/lib/graph";
import { recentMaterialAnnouncements } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  if (q) {
    return NextResponse.json({ matches: matchExpertise(q) });
  }
  return NextResponse.json({ nudges: warmNudges(recentMaterialAnnouncements()) });
}
