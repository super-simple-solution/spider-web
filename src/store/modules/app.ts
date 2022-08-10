import { store } from "/@/store";
import { appType } from "./types";
import { defineStore } from "pinia";
import { getConfig } from "/@/config";
import type { StorageConfigs } from "/#/index";
import { storageLocal } from "@pureadmin/utils";

export const useAppStore = defineStore({
  id: "pure-app",
  state: (): appType => ({
    sidebar: {
      opened:
        storageLocal.getItem<StorageConfigs>("responsive-layout")
          ?.sidebarStatus ?? getConfig().SidebarStatus,
      withoutAnimation: false,
      isClickHamburger: false
    },
    // 这里的layout用于监听容器拖拉后恢复对应的导航模式
    layout:
      storageLocal.getItem<StorageConfigs>("responsive-layout")?.layout ??
      getConfig().Layout,
    device: "desktop"
  }),
  getters: {
    getSidebarStatus() {
      return this.sidebar.opened;
    },
    getDevice() {
      return this.device;
    }
  },
  actions: {
    TOGGLE_SIDEBAR(opened?: boolean, resize?: string) {
      const layout = storageLocal.getItem<StorageConfigs>("responsive-layout");
      if (opened && resize) {
        this.sidebar.withoutAnimation = true;
        this.sidebar.opened = true;
        layout.sidebarStatus = true;
      } else if (!opened && resize) {
        this.sidebar.withoutAnimation = true;
        this.sidebar.opened = false;
        layout.sidebarStatus = false;
      } else if (!opened && !resize) {
        this.sidebar.withoutAnimation = false;
        this.sidebar.opened = !this.sidebar.opened;
        this.sidebar.isClickHamburger = !this.sidebar.opened;
        layout.sidebarStatus = this.sidebar.opened;
      }
      storageLocal.setItem("responsive-layout", layout);
    },
    toggleDevice(device: string) {
      this.device = device;
    },
    setLayout(layout) {
      this.layout = layout;
    }
  }
});

export function useAppStoreHook() {
  return useAppStore(store);
}
