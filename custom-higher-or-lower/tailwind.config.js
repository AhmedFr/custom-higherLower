/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "skew-scroll-top-to-bottom": {
          "0%": {
            transform:
              "rotatex(20deg) rotateZ(20deg) skewX(10deg) translateZ(0) translateY(-100%)",
          },
          "100%": {
            transform:
              "rotatex(20deg) rotateZ(20deg) skewX(10deg) translateZ(0) translateY(0)",
          },
        },
        "skew-scroll-bottom-to-top": {
          "0%": {
            transform:
              "rotatex(20deg) rotateZ(20deg) skewX(10deg) translateZ(0) translateY(0)",
          },
          "100%": {
            transform:
              "rotatex(20deg) rotateZ(20deg) skewX(10deg) translateZ(0) translateY(-100%)",
          },
        },
        "infinite-scroll-r-to-l": {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-100%)",
          },
        },
        "infinite-scroll-l-to-r": {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        gradient: {
          to: {
            "background-position": "200% center",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "skew-scroll-top-to-bottom":
          "skew-scroll-top-to-bottom 20s linear infinite",
        "skew-scroll-bottom-to-top":
          "skew-scroll-bottom-to-top 20s linear infinite",
        gradient: "gradient 8s linear infinite",
        "top-to-bottom": "top-to-bottom 0.5s ease-out",
        "bottom-to-top": "bottom-to-top 0.5s ease-out",
        "infinite-scroll-r-to-l": "infinite-scroll-r-to-l 25s linear infinite",
        "infinite-scroll-l-to-r": "infinite-scroll-l-to-r 25s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
