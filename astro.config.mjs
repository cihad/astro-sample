import { defineConfig } from 'astro/config';
import { readFileSync } from 'node:fs';

// https://astro.build/config
export default defineConfig({

  integrations: [
    {
      name: "deneme",
      hooks: {
        "astro:config:setup": function (options) {
          const { injectScript } = options

          injectScript(
            'head-inline',
            readFileSync(new URL('./integrations/custom.js', import.meta.url), { encoding: 'utf-8' })
          );
        }
      }
    }
  ]

});
