<script setup lang="ts">
import { emitter } from "/@/utils/mitt";
import { h, defineComponent } from "vue";

import navbar from "./components/navbar.vue";
import tag from "./components/tag/index.vue";
import appMain from "./components/appMain.vue";
import Vertical from "./components/sidebar/vertical.vue";

// 监听容器
emitter.on("resize", () => {
  window.document.body.setAttribute("layout", "vertical");
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
