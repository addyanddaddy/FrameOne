/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark charcoal palette based on #222526
        navy: {
          950: "#222526",
          900: "#2A2D2E",
          800: "#333637",
          700: "#3D4041",
          600: "#4A4D4E",
          500: "#5A5D5E",
          400: "#6E7172",
          300: "#8A8D8E",
          200: "#A8ABAC",
          100: "#C8CBCC",
        },
        accent: {
          DEFAULT: "#6366F1",
          light: "#818CF8",
          dark: "#4F46E5",
          glow: "rgba(99, 102, 241, 0.15)",
        },
        brand: {
          gold: "#F59E0B",
          silver: "#94A3B8",
          teal: "#00D4AA",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        shimmer: "shimmer 2s infinite linear",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          from: { opacity: "0", transform: "translateY(-12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
