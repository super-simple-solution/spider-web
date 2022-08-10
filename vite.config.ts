import { resolve } from "path";
import { defineConfig } from "vite";
import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { viteMockServe } from "vite-plugin-mock";
import DefineOptions from "unplugin-vue-define-options/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";

// 路径查找
const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir);
};

// 设置别名
const alias: Record<string, string> = {
  "/@": pathResolve("src")
};

const envStr = "test";

const evnPath = `http://baidu.com`;

const pathMap = {
  test: evnPath,
  pre: evnPath
};

export default defineConfig({
  base: "/",
  resolve: { alias },
  // 服务端渲染
  server: {
    strictPort: false,
    port: 3020,
    proxy: {
      "/api": {
        target: pathMap[envStr],
        rewrite: path => path.replace(/^\/api/, "/bus/web_awesomed"),
        changeOrigin: true,
        ws: true
      }
    },
    hmr: {
      overlay: false
    }
  },
  plugins: [
    vue(),
    vueJsx(), // jsx、tsx语法支持
    DefineOptions(),
    Components({
      dts: true,
      dirs: ["src/components"],
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass"
        })
      ]
    }),
    // svg组件化支持
    svgLoader(),
    // mock支持
    viteMockServe({
      mockPath: "mock",
      localEnabled: true,
      prodEnabled: true,
      injectCode: `
          setupProdMockServer();
        `,
      logger: false
    }),
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
        /\.json$/ // .json
      ],
      // global imports to register
      imports: ["vue"], // presets
      eslintrc: {
        enabled: true, // Default `false`
        filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      resolvers: [() => null],
      dts: "./auto-imports.d.ts"
    })
  ],
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  }
});
