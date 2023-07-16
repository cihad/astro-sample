import { defineConfig } from 'astro/config';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path'


// https://astro.build/config
const config = defineConfig({

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
        },
        // 'astro:server:setup': function(options) {
        //   console.log(options)
        //   const { server } = options
        //   const { middlewares } = server

        //   middlewares.use(function(req, res, next) {

        //     if (req.url?.startsWith('/editor')) {
        //       res.setHeader("x-custom", "cihad")
        //       res.end(readFileSync(new URL('./editor/index.html', import.meta.url), { encoding: 'utf-8' }))

        //     } else {
        //       next()

        //     }
        //   })
        // }
      }
    }
  ]

});



export default config