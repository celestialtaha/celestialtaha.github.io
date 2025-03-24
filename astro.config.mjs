import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  site: "https://celestialtaha.github.io",
  integrations: [
    tailwind(), 
    sitemap({
      filter: (page) => !page.includes('/pagefind/'),
      changefreq: 'weekly',
      lastmod: new Date(),
      priority: 0.7,
      serialize: (item) => {
        // Customize priority based on path
        if (item.url === 'https://celestialtaha.github.io/') {
          return { ...item, priority: 1.0 };
        }
        if (item.url.includes('/research/')) {
          return { ...item, priority: 0.9, changefreq: 'monthly' };
        }
        if (item.url.includes('/blog/')) {
          return { ...item, priority: 0.8 };
        }
        return item;
      }
    }), 
    mdx(), 
    pagefind()
  ],
  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
  },
});
