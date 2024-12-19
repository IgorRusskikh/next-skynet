import type { Config } from "tailwindcss";
import tailwind3d from "tailwindcss-3d";
import plugin from "tailwindcss/plugin";

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
      },
    },
  },
  plugins: [
    tailwind3d({ legacy: true }),
    plugin(function ({ addUtilities, addComponents }) {
      addUtilities({
        ".section-title": {
          "@apply uppercase text-[#898C98] text-[2.78vw] leading-[2.78vw]": {},
          "@apply md:text-[10px] md:leading-[10px] md:translate-y-[6px]": {},
          "@apply lg:text-[10px] lg:leading-[10px] lg:translate-y-[8px]": {},
          "@apply xl:text-[10px] xl:leading-[10px] xl:translate-y-[10px]": {},
          "@apply 3xl:text-[0.73vw] 3xl:leading-[0.73vw] 3xl:translate-y-[0.5vw]": {},
        },
        ".section-subtitle": {
          "@apply font-medium text-[5.56vw] leading-[6.11vw]": {},
          "@apply md:text-[26px] md:leading-[28.6px]": {},
          "@apply lg:text-[32px] lg:leading-[35.2px]": {},
          "@apply xl:text-[38px] xl:leading-[41.8px]": {},
          "@apply 3xl:text-[2.4vw] 3xl:leading-[2.64vw]": {},
        },
      });
      addComponents({
        ".container": {
          "margin": "0 auto",
          "@media (max-width: 767px)": {
            "max-width": "90.83vw",
          },
          "@media (min-width: 768px) and (max-width: 1023px)": {
            "max-width": "728px",
          },
          "@media (min-width: 1024px) and (max-width: 1279px)": {
            "max-width": "964px",
          },
          "@media (min-width: 1280px) and (max-width: 1799px)": {
            "max-width": "1220px",
          },
          "@media (min-width: 1800px)": {
            "max-width": "84.38vw",
          }
        }
      })
    }),
  ],
} satisfies Config;
