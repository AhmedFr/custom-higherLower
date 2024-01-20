import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "skew-scroll": "skew-scroll 20s linear infinite",
      },
      keyframes: {
        "skew-scroll": {
          "0%": {
            transform:
              "rotatex(20deg) rotateZ(-20deg) skewX(20deg) translateZ(0) translateY(0)",
          },
          "100%": {
            transform:
              "rotatex(20deg) rotateZ(-20deg) skewX(20deg) translateZ(0) translateY(-100%)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
