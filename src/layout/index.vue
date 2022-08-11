<template>
  <div class="app-wrapper">
    <left-menu v-if="childRouteStore.hasRoute" class="sidebar-container" />
    <div :class="{ 'has-tags-view': needTagsView }" class="main-container" :style="mainStyle">
      <div class="header-wrapper">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <div class="height-placeholder"></div>
      <app-main />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Navbar, AppMain, TagsView, LeftMenu } from './components'
import { useChildRouteStore } from '@/store/childRoute'
import { useSettingsStore } from '@/store/settings'

type obj = {
  [key: string]: string | number
}

const childRouteStore = useChildRouteStore()

const mainStyle = computed(() => {
  let obj: obj = {}
  if (!childRouteStore.hasRoute) {
    obj.marginLeft = 0
  }
  return obj
})

const { tagsView: needTagsView } = useSettingsStore()
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.height-placeholder {
  height: 82px;
  visibility: hidden;
}

.header-wrapper {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
