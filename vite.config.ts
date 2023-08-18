import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(),
  dts({
    entryRoot: "./packages",
    outputDir: "lib"
  })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'lib',
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'packages/index.ts'),
      name: 'LgUi',
      fileName: `lg-ui`,
      // formats: ['es', 'umd'],
      // sourcemap: true,
      // minify: true,
      // cssCodeSplit: true,
      // extractCSS: true,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].mjs',
          preserveModules: true,
          exports: 'named',
          dir: 'lib'
        }
      ]
    }
  }
})
