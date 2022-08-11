import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import eslintPlugin from 'vite-plugin-eslint'

const envStr = 'test'

const pathMap = {
  test: 'https://baidu.com',
}

export default defineConfig({
  base: '/spider/',
  publicDir: '/spider',
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, './src')}/`,
    },
  },
  server: {
    strictPort: false,
    port: 3020,
    proxy: {
      '/api': {
        target: pathMap[envStr],
        rewrite: (path) => path.replace(/^\/api/, '/spider/'),
        changeOrigin: true,
        ws: true,
      },
    },
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    vue(),
    Components({
      dts: true,
      dirs: ['src/components'],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
    }),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/svg')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    }),
    eslintPlugin(),
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
        /\.json$/, // .json
      ],
      // global imports to register
      imports: [
        // presets
        'vue',
      ],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      resolvers: [() => null],
      dts: './auto-imports.d.ts',
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
})
