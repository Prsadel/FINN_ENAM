import { NextRequest, NextResponse } from "next/server";
import { buildCompanyPayload } from "@/lib/company";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, ctx: { params: { ticker: string } }) {
  const payload = await buildCompanyPayload(ctx.params.ticker);
  if (!payload) {
    return NextResponse.json({ error: "Ticker not found on Yahoo Finance (NSE/BSE)" }, { status: 404 });
  }
  return NextResponse.json(payload);
}
