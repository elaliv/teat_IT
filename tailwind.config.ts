/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "dark-blue": "#00236D",
          green: "#009C41",
        },
        "davys-grey": "#3F3F3F",
        "white-smoke": "#F5F5F5",
      },
      boxShadow: {
        nav: "0px 1px 14px 0px #021B2C",
        select: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      },
      backgroundImage: {
        food: "url('/assets/icons/food-background.svg')",
        email: "url('/assets/icons/mail.svg')",
        lock: "url('/assets/icons/lock.svg')",
      },
    },
  },
  plugins: [require('daisyui'),],
} satisfies Config;
