import localFont from "next/font/local";

export const ttNorms = localFont({
  src: [
    {
      path: "../app/fonts/TT Norms Expanded Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../app/fonts/TT Norms Expanded Demibold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../app/fonts/TT Norms Expanded Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../app/fonts/TT Norms Expanded Normal.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-tt-norms",
});
