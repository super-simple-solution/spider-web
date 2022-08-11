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

const evnPath = `http://gongyi-${envStr}.zhcslyg.com`

const pathMap = {
  online: 'https://online.zhcslyg.com', // online环境，打开以后一定要小心操作！！！谁打开谁对后果买单！！！
  test: evnPath,
  pre: evnPath,
}

export default defineConfig({
  base: '/custom/',
  publicDir: '/custom',
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
        rewrite: (path) => path.replace(/^\/api/, '/bus/web_awesomed'),
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
