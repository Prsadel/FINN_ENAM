import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-mono text-[42px] font-extrabold text-border">404</p>
      <p className="mt-2 text-[14px] font-semibold">Ticker not found</p>
      <p className="mt-1 max-w-56 text-[12px] text-muted">
        Couldn&apos;t resolve that symbol on Yahoo Finance (NSE/BSE). Try a valid NSE ticker like TCS, TRENT or HAL.
      </p>
      <Link href="/research" className="mt-4 rounded-xl bg-accentbg px-4 py-2 text-[13px] font-semibold text-accent">
        ◎ Search again
      </Link>
    </div>
  );
}
