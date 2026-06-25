// tailwind.config.ts
import fluid, { extract, fontSize, screens } from 'fluid-tailwind';
import utils from 'tailwind-custom-utilities'; // <-- Declaration of this package was added
import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

export default {
  content: {
    files: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/utils/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
      "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
      './src/plugins/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    extract, // from fluid-tailwind
  },
  theme: {
    screens,
    fontSize,
    extend: {
      boxShadow: {
        'custom-green': '0px 10px 19px 0px rgba(168,106,69, 0.28)',
      },
      container: {
        center: true,
        screens: {
          md: '820px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
        padding: '1rem',
      },
      colors: {
        gradientFromBooking: {
          DEFAULT: "#A86A45",
          5: "rgba(168,106,69, 0.05)",
          10: "rgba(168,106,69, 0.1)",
          15: "rgba(168,106,69, 0.15)",
          20: "rgba(168,106,69, 0.2)",
          30: "rgba(168,106,69, 0.3)",
          40: "rgba(168,106,69, 0.4)",
          50: "rgba(168,106,69, 0.5)",
        },
        gradientToBooking: {
          DEFAULT: "#D8BFA6",
          5: "rgba(216,191,166, 0.05)",
          10: "rgba(216,191,166, 0.1)",
          20: "rgba(216,191,166, 0.2)",
        },
        hoverBooking: "rgb(245,239,231)",
        borderBooking: "rgb(245,239,231)",
        textColorInBg: "#ffffff",
        textColorSelectText: "#45597c",
        sectionColor: "#F4EEE3",
        textColorMain: "#33281F",
        background: "#fff",
        popover: "#fff",
        ring: "rgba(168,106,69,0.4)",
        white: '#ffffff',
        cream: "#F4EEE3",
        sand: "#E7DAC6",
        taupe: "#8A7257",
        ink: "#33281F",
        accent: { DEFAULT: "#A86A45", soft: "#D8BFA6", deep: "#7E4A2E" },
      },
      borderRadius: {
        "4xl": "2rem",
        "7xl": "3rem",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        marquee: 'marquee var(--duration) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
        'card-bounce': 'card-bounce 0.8s ease-in-out infinite',
        'card-spin': 'card-spin 1s linear infinite',
        'card-pulse': 'card-pulse 1.2s ease-in-out infinite',
        'card-slide': 'card-slide 1s ease-in-out forwards',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
        'card-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10%)' },
        },
        'card-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'card-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'card-slide': {
          from: { transform: 'translateX(-100%)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [fluid, animate, utils],
} satisfies Config;


