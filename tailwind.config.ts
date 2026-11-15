import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0e14",
        surface: "#111721",
        surface2: "#161e2b",
        border: "#1e2836",
        ink: "#e6ebf2",
        muted: "#8b97a8",
        dim: "#5c6a7d",
        green: "#22c55e",
        greenbg: "rgba(34,197,94,0.12)",
        red: "#ef4444",
        redbg: "rgba(239,68,68,0.12)",
        amber: "#f59e0b",
        amberbg: "rgba(245,158,11,0.12)",
        accent: "#4d9fff",
        accentbg: "rgba(77,159,255,0.12)",
        violet: "#c084fc",
        violetbg: "rgba(192,132,252,0.12)",
      },
      fontFamily: {
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      maxWidth: { app: "28rem" },
    },
  },
  plugins: [],
};
export default config;
