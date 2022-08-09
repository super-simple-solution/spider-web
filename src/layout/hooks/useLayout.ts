import { routerArrays } from "../types";
import { computed, getCurrentInstance } from "vue";
import { useMultiTagsStore } from "/@/store/modules/multiTags";

export function useLayout() {
  const instance = getCurrentInstance().appContext.app.config.globalProperties;

  const initStorage = () => {
    // 路由
    if (
      useMultiTagsStore().multiTagsCache &&
      (!instance.$storage.tags || instance.$storage.tags.length === 0)
    ) {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      instance.$storage.tags = routerArrays;
    }
    instance.$storage.locale = { locale: "zh" };
    instance.$storage.layout = {
      layout: "vertical",
      theme: "default",
      darkMode: false,
      sidebarStatus: true,
      epThemeColor: "#409EFF"
    };
    // 灰色模式、色弱模式、隐藏标签页
    if (!instance.$storage.configure) {
      // eslint-disable-next-line
      instance.$storage.configure = {
        grey: instance.$config?.Grey ?? false,
        weak: instance.$config?.Weak ?? false,
        hideTabs: instance.$config?.HideTabs ?? false,
        showLogo: instance.$config?.ShowLogo ?? true,
        showModel: instance.$config?.ShowModel ?? "smart",
        multiTagsCache: instance.$config?.MultiTagsCache ?? false
      };
    }
  };
  // 清空缓存后从serverConfig.json读取默认配置并赋值到storage中
  const layout = computed(() => {
    return instance.$storage?.layout.layout;
  });
  return {
    layout,
    instance,
    initStorage
  };
}
