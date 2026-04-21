import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./services/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--color-ink)",
        muted: "var(--color-muted)",
        surface: "var(--color-surface)",
        line: "var(--color-line)",
        brand: {
          DEFAULT: "var(--color-brand)",
          soft: "var(--color-brand-soft)",
        },
        accent: "var(--color-accent)",
      },
      boxShadow: {
        soft: "0 20px 60px rgba(15, 23, 42, 0.08)",
        card: "0 16px 40px rgba(15, 23, 42, 0.08)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "\"Segoe UI\"",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        display: [
          "var(--font-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "\"Segoe UI\"",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top left, rgba(15, 118, 110, 0.18), transparent 35%), radial-gradient(circle at 80% 10%, rgba(252, 211, 77, 0.14), transparent 22%)",
      },
    },
  },
  plugins: [],
};

export default config;
