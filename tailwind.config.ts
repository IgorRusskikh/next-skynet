import type { Config } from "tailwindcss";
import tailwind3d from "tailwindcss-3d";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "tt-norms": ["var(--font-tt-norms)"],
      },
      colors: {
        "gray-light": "#E0E2E9",
        "primary-red": "#D02E27",
      },
      screens: {
        "3xl": "1800px",
      }
    },
  },
  plugins: [tailwind3d({ legacy: true })],
} satisfies Config;
