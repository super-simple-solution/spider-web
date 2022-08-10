import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { viteMockServe } from "vite-plugin-mock";
import DefineOptions from "unplugin-vue-define-options/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";

export function getPluginsList(command) {
  const prodMock = true;
  return [
    vue(),
    // jsx、tsx语法支持
    vueJsx(),
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
      localEnabled: command === "serve",
      prodEnabled: command !== "serve" && prodMock,
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
      imports: [
        // presets
        "vue"
      ],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      resolvers: [() => null],
      dts: "./auto-imports.d.ts"
    })
  ];
}
