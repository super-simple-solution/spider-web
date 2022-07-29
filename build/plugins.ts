import { resolve } from "path";
import Unocss from "unocss/vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { viteMockServe } from "vite-plugin-mock";
import VueI18n from "@intlify/vite-plugin-vue-i18n";
import themePreprocessorPlugin from "@pureadmin/theme";
import { genScssMultipleScopeVars } from "/@/layout/theme";
import DefineOptions from "unplugin-vue-define-options/vite";

export function getPluginsList(command) {
  const prodMock = true;
  return [
    vue(),
    // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [resolve("locales/**")]
    }),
    // jsx、tsx语法支持
    vueJsx(),
    Unocss(),
    DefineOptions(),
    // 自定义主题
    themePreprocessorPlugin({
      scss: {
        multipleScopeVars: genScssMultipleScopeVars(),
        // 在生产模式是否抽取独立的主题css文件，extract为true以下属性有效
        extract: true,
        // 会选取defaultScopeName对应的主题css文件在html添加link
        themeLinkTagId: "head",
        // "head"||"head-prepend" || "body" ||"body-prepend"
        themeLinkTagInjectTo: "head",
        // 是否对抽取的css文件内对应scopeName的权重类名移除
        removeCssScopeName: false
      }
    }),
    // svg组件化支持
    svgLoader(),
    // mock支持
    viteMockServe({
      mockPath: "mock",
      localEnabled: command === "serve",
      prodEnabled: command !== "serve" && prodMock,
      injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
      logger: false
    })
  ];
}
