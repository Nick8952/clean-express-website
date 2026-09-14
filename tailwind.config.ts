import type { Config } from "tailwindcss";

/**
 * Design-Tokens Clean-Express – Richtung «Klinisch-Frisch».
 * Kobalt #0132AF und Hellblau #628FFF 1:1 aus der Original-Website
 * (clean-express.ch, Tailwind-Klassen `commonBlue`/`gradientBlue`)
 * übernommen. Mint ist neu ergänzt – der Frischeakzent, der dem Original fehlte.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.md",
  ],
  theme: {
    extend: {
      colors: {
        ocean: "#0132AF", // Marke – aus dem Original-Logo/CSS
        "ocean-deep": "#081B44", // dunkle Farbblöcke, Footer
        sky: "#628FFF", // Original-Gradient-Blau, für Verläufe/Glanzlicht
        mint: "#17C9AA", // Frischeakzent – neu
        "mint-deep": "#0B8F79", // Mint, lesbar auf Papier (Kontrast)
        paper: "#FBFDFF", // Grundfläche, leicht blau angehaucht
        mist: "#E7EEF9", // Glaskarten, Kanten
        "mist-warm": "#EFF3FB",
        ink: "#0B1B33", // Fliesstext
        "ink-soft": "#4C5A70",
        foam: "#F3FBF9", // Mint-Tint für Badges
      },
      fontFamily: {
        // Eine Schriftfamilie für Fliesstext/Überschriften (Manrope, aus
        // app/layout.tsx) – display/sans zeigen bewusst auf dieselbe
        // Variable. `mono` bleibt ein echter Monospace-Stack (Codex-Review-
        // Fund: sonst verliert eine künftige tabellarische/Code-Stelle
        // stillschweigend ihre Festbreiten-Schrift).
        display: ["var(--font-primary)", "Manrope", "sans-serif"],
        sans: ["var(--font-primary)", "Manrope", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        // Fluide Skala – Schritt 0 ist der Fliesstext.
        "step--1": ["clamp(0.82rem, 0.79rem + 0.15vw, 0.9rem)", { lineHeight: "1.5" }],
        "step-0": ["clamp(1rem, 0.96rem + 0.2vw, 1.11rem)", { lineHeight: "1.65" }],
        "step-1": ["clamp(1.2rem, 1.12rem + 0.4vw, 1.5rem)", { lineHeight: "1.45" }],
        "step-2": ["clamp(1.5rem, 1.35rem + 0.75vw, 2.1rem)", { lineHeight: "1.25" }],
        "step-3": ["clamp(1.9rem, 1.6rem + 1.45vw, 3rem)", { lineHeight: "1.12" }],
        "step-4": ["clamp(2.4rem, 1.85rem + 2.7vw, 4.2rem)", { lineHeight: "1.03" }],
        "step-5": ["clamp(2.9rem, 1.75rem + 5.4vw, 6.4rem)", { lineHeight: "0.98" }],
      },
      spacing: {
        section: "clamp(4.5rem, 3rem + 7vw, 9rem)",
        gutter: "clamp(1.25rem, 0.6rem + 3vw, 3rem)",
      },
      maxWidth: {
        shell: "78rem",
        prose: "38rem",
      },
      borderRadius: {
        card: "20px",
        pill: "999px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(8,27,68,0.05), 0 16px 36px -20px rgba(8,27,68,0.35)",
        lift: "0 2px 6px rgba(8,27,68,0.08), 0 28px 56px -24px rgba(8,27,68,0.45)",
        glass: "0 1px 0 rgba(255,255,255,0.6) inset, 0 18px 44px -26px rgba(8,27,68,0.4)",
      },
      backdropBlur: {
        xs: "3px",
      },
      transitionTimingFunction: {
        calm: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
