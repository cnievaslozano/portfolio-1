import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import astroIcon from 'astro-icon';
import mdx from '@astrojs/mdx';
import playformCompress from "@playform/compress";
import netlify from "@astrojs/netlify";

export default defineConfig({
  integrations: [
    tailwind(),
    mdx(),
    astroIcon({
      include: {
        mdi: ["*"],
        ri: ['*'],
        'simple-icons': ['*'],
      },
    }),
    playformCompress({
      CSS: false,
      Image: false,
      Action: {
        Passed: async () => true,
      },
    })
  ],
  output: "hybrid",
  adapter: netlify(),
  site: "https://portfolio.cnievaslozano.es"
});
