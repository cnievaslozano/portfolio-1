// Build estático para el VPS (sin adaptador de Netlify/Vercel).
// Se copia a la raíz del proyecto durante el workflow de despliegue.
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import astroIcon from "astro-icon";
import mdx from "@astrojs/mdx";
import playformCompress from "@playform/compress";

export default defineConfig({
  integrations: [
    tailwind(),
    mdx(),
    astroIcon({ include: { mdi: ["*"], ri: ["*"], "simple-icons": ["*"] } }),
    playformCompress({
      CSS: false,
      Image: false,
      Action: { Passed: async () => true },
    }),
  ],
  output: "static",
  site: "https://portfolio.cnievaslozano.es",
});
