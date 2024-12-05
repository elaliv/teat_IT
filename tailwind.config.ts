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
      },
      boxShadow: {
        "nav-shadow": "0px 1px 14px 0px #021B2C",
      },
      backgroundImage: {
        food: "url('/assets/icons/food-background.svg')",
        email: "url('/assets/icons/mail.svg')",
        lock: "url('/assets/icons/lock.svg')",
      },
    },
  },
  plugins: [],
} satisfies Config;
