import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        brand: ["var(--font-brand)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ab: {
          /* ── Deep obsidian base ── */
          void:     "#04040a",
          obsidian: "#0a0a0a",
          charcoal: "#111111",
          graphite: "#1c1c1c",
          deep:     "#07070f",
          surface:  "#0c0c18",
          raised:   "#111120",
          card:     "#161628",
          /* ── Aged gold accent ── */
          gold:     "#c9a84c",
          goldMid:  "#b8962e",
          goldSoft: "#e8d5a0",
          goldDim:  "rgba(201,168,76,0.14)",
          goldBorder:"rgba(201,168,76,0.22)",
          /* ── Platinum silver accent ── */
          silver:   "#c8cdd8",
          silverMid:"#a0a8ba",
          silverDim:"rgba(200,205,216,0.12)",
          /* ── Crimson brand ── */
          brand:    "#8b0000",
          brandDeep:"#5a0000",
          /* ── Text ── */
          ink:      "#ede8df",
          muted:    "#7a7a9a",
          dim:      "#3a3a55",
          /* ── Borders ── */
          border:   "rgba(255,255,255,0.07)",
          line:     "rgba(201,168,76,0.18)",
          /* ── Legacy ── */
          page:     "#07070f",
          cream:    "#0c0c18",
          marble:   "#0f0f1e",
        },
      },
      backgroundImage: {
        marble:
          "linear-gradient(145deg, rgba(201,168,76,0.04) 0%, transparent 42%), radial-gradient(ellipse 90% 50% at 50% 0%, rgba(139,0,0,0.06) 0%, transparent 55%), linear-gradient(180deg, #07070f 0%, #0c0c18 100%)",
        "grid-fade":
          "linear-gradient(to right, rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(201,168,76,0.03) 1px, transparent 1px)",
      },
      boxShadow: {
        temple:
          "0 4px 40px -8px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.14), inset 0 1px 0 rgba(255,255,255,0.04)",
        "temple-gold":
          "0 8px 32px rgba(201,168,76,0.18), 0 0 0 1px rgba(201,168,76,0.3)",
        "temple-inset":
          "inset 0 2px 12px rgba(0,0,0,0.3)",
        /** Rim light + grounded lift */
        luxury:
          "0 24px 64px -20px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,168,76,0.12), inset 0 1px 0 rgba(255,255,255,0.06)",
        "luxury-glow":
          "0 0 0 1px rgba(201,168,76,0.2), 0 0 40px rgba(201,168,76,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
      },
      keyframes: {
        "marquee-ref": {
          to: { transform: "translateX(-50%)" },
        },
        "scroll-line": {
          "0%, 100%": { transform: "scaleY(1)", opacity: "1" },
          "50%": { transform: "scaleY(0.3)", opacity: "0.4" },
        },
      },
      animation: {
        "marquee-ref": "marquee-ref 25s linear infinite",
        "scroll-line": "scroll-line 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;