<script setup lang="ts">
import { ref, getCurrentInstance } from "vue";
import backTop from "/@/assets/svg/back_top.svg?component";
import { usePermissionStoreHook } from "/@/store/modules/permission";

const props = defineProps({
  fixedHeader: Boolean
});
const keepAlive: Boolean = ref(
  getCurrentInstance().appContext.config.globalProperties.$config?.KeepAlive
);
</script>

<template>
  <section class="app-main">
    <router-view>
      <template #default="{ Component, route }">
        <el-scrollbar v-if="props.fixedHeader">
          <el-backtop title="回到顶部" target=".app-main .el-scrollbar__wrap">
            <backTop />
          </el-backtop>
          <keep-alive
            v-if="keepAlive"
            :include="usePermissionStoreHook().cachePageList"
          >
            <component
              :is="Component"
              :key="route.fullPath"
              class="main-content"
            />
          </keep-alive>
          <component
            v-else
            :is="Component"
            :key="route.fullPath"
            class="main-content"
          />
        </el-scrollbar>
        <div v-else>
          <keep-alive
            v-if="keepAlive"
            :include="usePermissionStoreHook().cachePageList"
          >
            <component
              :is="Component"
              :key="route.fullPath"
              class="main-content"
            />
          </keep-alive>
          <component
            v-else
            :is="Component"
            :key="route.fullPath"
            class="main-content"
          />
        </div>
      </template>
    </router-view>
  </section>
</template>

<style scoped>
.app-main {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow-x: hidden;
  margin-top: 86px;
}

.main-content {
  margin: 24px;
}
</style>
