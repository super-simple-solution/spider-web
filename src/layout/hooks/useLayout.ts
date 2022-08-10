import { routerArrays } from "../types";
import { getCurrentInstance } from "vue";
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
  };
  return {
    layout: "vertical",
    instance,
    initStorage
  };
}
