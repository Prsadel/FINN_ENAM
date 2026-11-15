import type { Metadata, Viewport } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "FINN — Financial Investment Network Navigator",
  description:
    "Mobile-first AI intelligence layer for public-markets investors: Push digest, primary-source Pull research, and a network intelligence layer.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0e14",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg text-ink">
        <div className="mx-auto min-h-screen w-full max-w-app px-4 pb-24 pt-4">
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
