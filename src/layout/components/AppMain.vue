<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </section>
</template>

<script lang="ts">
export default {
  name: 'AppMain',
}
</script>

<style lang="scss">
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 82px);
  position: relative;
  overflow: hidden;
  padding: 24px;
  border-radius: 10px;
  background-color: #f5f7fd;
  &.full-screen {
    padding: 0;
  }
}
.page-content-height {
  display: flex;
  height: 100%;
  min-height: calc(100vh - 132px);
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
