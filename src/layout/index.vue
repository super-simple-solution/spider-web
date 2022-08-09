<script setup lang="ts">
import { emitter } from "/@/utils/mitt";
import { useLayout } from "./hooks/useLayout";
import { useAppStoreHook } from "/@/store/modules/app";
import { h, defineComponent } from "vue";

import navbar from "./components/navbar.vue";
import tag from "./components/tag/index.vue";
import appMain from "./components/appMain.vue";
import Vertical from "./components/sidebar/vertical.vue";

const { instance } = useLayout();

function setTheme() {
  window.document.body.setAttribute("layout", "vertical");
  instance.$storage.layout = {
    layout: "vertical",
    theme: "default",
    darkMode: false,
    sidebarStatus: true,
    epThemeColor: "#409EFF"
  };
}

function toggle(device: string, bool: boolean) {
  useAppStoreHook().toggleDevice(device);
  useAppStoreHook().toggleSideBar(bool, "resize");
}

// 监听容器
emitter.on("resize", () => {
  setTheme();
  toggle("desktop", true);
});

const layoutHeader = defineComponent({
  render() {
    return h(
      "div",
      {
        class: { "fixed-header": true }
      },
      {
        default: () => [h(navbar), h(tag, {})]
      }
    );
  }
});
</script>

<template>
  <div class="app-wrapper openSidebar withoutAnimation" v-resize>
    <Vertical />
    <div class="main-container">
      <div>
        <layout-header />
        <!-- 主体内容 -->
        <app-main :fixed-header="true" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin clearfix {
  &::after {
    content: "";
    display: table;
    clear: both;
  }
}

.app-wrapper {
  @include clearfix;

  position: relative;
  height: 100%;
  width: 100%;
}

.main-hidden {
  margin-left: 0 !important;
}
</style>
