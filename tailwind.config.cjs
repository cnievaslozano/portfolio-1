/** @type {import('tailwindcss').Config} */
import scrollbar from "tailwind-scrollbar";
function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

module.exports = {
  // El modo oscuro sigue prefers-color-scheme salvo que <html data-theme> lo
  // fuerce (ver src/globals.css), así que `dark:` respeta ambos.
  darkMode: [
    "variant",
    [
      '@media (prefers-color-scheme: dark) { &:not([data-theme="light"] *) }',
      '&:is([data-theme="dark"] *)',
    ],
  ],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        skin: {
          hue: withOpacity("--color"),
          muted: withOpacity("--muted"),
        },
      },
      textColor: {
        skin: {
          base: withOpacity("--color-text-base"),
          muted: withOpacity("--color-text-muted"),
          inverted: withOpacity("--color-text-inverted"),
        },
      },
      backgroundColor: {
        skin: {
          fill: withOpacity("--color-fill"),
          "button-accent": withOpacity("--color-button-accent"),
          "button-accent-hover": withOpacity("--color-button-accent-hover"),
          "button-muted": withOpacity("--color-button-muted"),
        },
      },
      ringColor: {
        skin: {
          fill: withOpacity("--color-fill"),
        },
      },
      gradientColorStops: {
        skin: {
          hue: withOpacity("--color-fill"),
        },
      },
      fontFamily: {
        // Fuentes autoalojadas con @fontsource (ver Layout.astro); detrás van
        // las del sistema, que se ven mientras cargan o si falla la descarga.
        sans: [
          '"Geist Variable"',
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
        ],
        // Serifa de display: nombre, títulos de sección y cargo (en cursiva).
        display: [
          '"Instrument Serif"',
          "ui-serif",
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "serif",
        ],
        // Fechas, ubicación, tecnologías y menú.
        mono: [
          '"Geist Mono Variable"',
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "Liberation Mono",
          "monospace",
        ],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    scrollbar,
  ],
};