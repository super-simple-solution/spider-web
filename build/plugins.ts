import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { viteMockServe } from "vite-plugin-mock";
import DefineOptions from "unplugin-vue-define-options/vite";

export function getPluginsList(command) {
  const prodMock = true;
  return [
    vue(),
    // jsx、tsx语法支持
    vueJsx(),
    DefineOptions(),
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
    })
  ];
}
