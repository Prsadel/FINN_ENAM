"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/", label: "Feed", icon: "≋" },
  { href: "/research", label: "Research", icon: "◎" },
  { href: "/network", label: "Network", icon: "⌬" },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-app items-stretch justify-around px-4 pb-[max(env(safe-area-inset-bottom),8px)] pt-2">
        {ITEMS.map((it) => {
          const active = it.href === "/" ? pathname === "/" : pathname.startsWith(it.href);
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`flex min-w-16 flex-col items-center gap-0.5 rounded-lg px-4 py-1 text-[11px] font-medium transition-colors ${
                active ? "text-accent" : "text-muted"
              }`}
            >
              <span className="text-lg leading-none">{it.icon}</span>
              {it.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
