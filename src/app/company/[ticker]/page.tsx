import { notFound } from "next/navigation";
import { buildCompanyPayload } from "@/lib/company";
import CompanyView from "@/components/company/CompanyView";

export const dynamic = "force-dynamic";

export default async function CompanyPage({ params }: { params: { ticker: string } }) {
  const payload = await buildCompanyPayload(decodeURIComponent(params.ticker));
  if (!payload) {
    notFound();
  }
  return <CompanyView payload={payload} />;
}
