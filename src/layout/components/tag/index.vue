<script setup lang="ts">
import {
  ref,
  watch,
  unref,
  nextTick,
  computed,
  ComputedRef,
  CSSProperties,
  onBeforeMount,
  getCurrentInstance
} from "vue";

import { ArrowRight, ArrowLeft, CloseBold } from "@element-plus/icons-vue";

import { emitter } from "/@/utils/mitt";
import type { StorageConfigs } from "/#/index";
import { routerArrays } from "/@/layout/types";
import { useRoute, useRouter } from "vue-router";
import { isEqual } from "lodash-unified";
import { RouteConfigs } from "../../types";
import { handleAliveRoute, delAliveRoutes } from "/@/router/utils";
import { useMultiTagsStoreHook } from "/@/store/modules/multiTags";
import { templateRef, useResizeObserver, useDebounceFn } from "@vueuse/core";
import { storageLocal } from "@pureadmin/utils";

const route = useRoute();
const router = useRouter();
const translateX = ref<number>(0);
const activeIndex = ref<number>(-1);
const instance = getCurrentInstance();
const tabDom = templateRef<HTMLElement | null>("tabDom", null);
const containerDom = templateRef<HTMLElement | null>("containerDom", null);
const scrollbarDom = templateRef<HTMLElement | null>("scrollbarDom", null);
const showTags =
  ref(storageLocal.getItem<StorageConfigs>("responsive-configure").hideTabs) ??
  "false";
// @ts-expect-error
let multiTags: ComputedRef<Array<RouteConfigs>> = computed(() => {
  return useMultiTagsStoreHook()?.multiTags;
});

const linkIsActive = computed(() => {
  return item => {
    if (Object.keys(route.query).length === 0) {
      if (route.path === item.path) {
        return "is-active";
      } else {
        return "";
      }
    } else {
      if (isEqual(route?.query, item?.query)) {
        return "is-active";
      } else {
        return "";
      }
    }
  };
});

const scheduleIsActive = computed(() => {
  return item => {
    if (Object.keys(route.query).length === 0) {
      if (route.path === item.path) {
        return "schedule-active";
      } else {
        return "";
      }
    } else {
      if (isEqual(route?.query, item?.query)) {
        return "schedule-active";
      } else {
        return "";
      }
    }
  };
});

const iconIsActive = computed(() => {
  return (item, index) => {
    if (index === 0) return;
    if (Object.keys(route.query).length === 0) {
      if (route.path === item.path) {
        return true;
      } else {
        return false;
      }
    } else {
      if (isEqual(route?.query, item?.query)) {
        return true;
      } else {
        return false;
      }
    }
  };
});

const dynamicTagView = () => {
  const index = multiTags.value.findIndex(item => {
    if (item?.query) {
      return isEqual(route?.query, item?.query);
    } else {
      return item.path === route.path;
    }
  });
  moveToView(index);
};

watch([route], () => {
  activeIndex.value = -1;
  dynamicTagView();
});

useResizeObserver(
  scrollbarDom,
  useDebounceFn(() => {
    dynamicTagView();
  }, 200)
);

const tabNavPadding = 10;
const moveToView = (index: number): void => {
  if (!instance.refs["dynamic" + index]) {
    return;
  }
  const tabItemEl = instance.refs["dynamic" + index][0];
  const tabItemElOffsetLeft = (tabItemEl as HTMLElement)?.offsetLeft;
  const tabItemOffsetWidth = (tabItemEl as HTMLElement)?.offsetWidth;
  // 标签页导航栏可视长度（不包含溢出部分）
  const scrollbarDomWidth = scrollbarDom.value
    ? scrollbarDom.value?.offsetWidth
    : 0;
  // 已有标签页总长度（包含溢出部分）
  const tabDomWidth = tabDom.value ? tabDom.value?.offsetWidth : 0;

  if (tabDomWidth < scrollbarDomWidth || tabItemElOffsetLeft === 0) {
    translateX.value = 0;
  } else if (tabItemElOffsetLeft < -translateX.value) {
    // 标签在可视区域左侧
    translateX.value = -tabItemElOffsetLeft + tabNavPadding;
  } else if (
    tabItemElOffsetLeft > -translateX.value &&
    tabItemElOffsetLeft + tabItemOffsetWidth <
      -translateX.value + scrollbarDomWidth
  ) {
    // 标签在可视区域
    translateX.value = Math.min(
      0,
      scrollbarDomWidth -
        tabItemOffsetWidth -
        tabItemElOffsetLeft -
        tabNavPadding
    );
  } else {
    // 标签在可视区域右侧
    translateX.value = -(
      tabItemElOffsetLeft -
      (scrollbarDomWidth - tabNavPadding - tabItemOffsetWidth)
    );
  }
};

const handleScroll = (offset: number): void => {
  const scrollbarDomWidth = scrollbarDom.value
    ? scrollbarDom.value?.offsetWidth
    : 0;
  const tabDomWidth = tabDom.value ? tabDom.value.offsetWidth : 0;
  if (offset > 0) {
    translateX.value = Math.min(0, translateX.value + offset);
  } else {
    if (scrollbarDomWidth < tabDomWidth) {
      if (translateX.value >= -(tabDomWidth - scrollbarDomWidth)) {
        translateX.value = Math.max(
          translateX.value + offset,
          scrollbarDomWidth - tabDomWidth
        );
      }
    } else {
      translateX.value = 0;
    }
  }
};

// 显示模式，默认灵动模式显示
const showModel = ref(
  storageLocal.getItem<StorageConfigs>("responsive-configure")?.showModel ||
    "smart"
);
if (!showModel.value) {
  const configure = storageLocal.getItem<StorageConfigs>(
    "responsive-configure"
  );
  configure.showModel = "card";
  storageLocal.setItem("responsive-configure", configure);
}

let visible = ref(false);
function dynamicRouteTag(value: string, parentPath: string): void {
  const hasValue = multiTags.value.some(item => {
    return item.path === value;
  });

  function concatPath(arr: object[], value: string, parentPath: string) {
    if (!hasValue) {
      arr.forEach((arrItem: any) => {
        let pathConcat = parentPath + arrItem.path;
        if (arrItem.path === value || pathConcat === value) {
          useMultiTagsStoreHook().handleTags("push", {
            path: value,
            parentPath: `/${parentPath.split("/")[1]}`,
            meta: arrItem.meta,
            name: arrItem.name
          });
        } else {
          if (arrItem.children && arrItem.children.length > 0) {
            concatPath(arrItem.children, value, parentPath);
          }
        }
      });
    }
  }
  // @ts-expect-error
  concatPath(router.options.routes, value, parentPath);
}

function deleteDynamicTag(obj: any, current: any, tag?: string) {
  // 存放被删除的缓存路由
  let delAliveRouteList = [];
  let valueIndex: number = multiTags.value.findIndex((item: any) => {
    if (item.query) {
      if (item.path === obj.path) {
        return item.query === obj.query;
      }
    } else {
      return item.path === obj.path;
    }
  });

  const spliceRoute = (
    startIndex?: number,
    length?: number,
    other?: boolean
  ): void => {
    if (other) {
      useMultiTagsStoreHook().handleTags("equal", [routerArrays[0], obj]);
    } else {
      // @ts-ignore
      delAliveRouteList = useMultiTagsStoreHook().handleTags("splice", "", {
        startIndex,
        length
      });
    }
  };

  if (tag === "other") {
    spliceRoute(1, 1, true);
  } else if (tag === "left") {
    spliceRoute(1, valueIndex - 1);
  } else if (tag === "right") {
    spliceRoute(valueIndex + 1, multiTags.value.length);
  } else {
    // 从当前匹配到的路径中删除
    spliceRoute(valueIndex, 1);
  }
  let newRoute = useMultiTagsStoreHook().handleTags("slice");
  if (current === route.path) {
    // 删除缓存路由
    tag
      ? delAliveRoutes(delAliveRouteList)
      : handleAliveRoute(route.matched, "delete");
    // 如果删除当前激活tag就自动切换到最后一个tag
    if (tag === "left") return;
    nextTick(() => {
      router.push({
        path: newRoute[0].path,
        query: newRoute[0].query
      });
    });
  } else {
    // 删除缓存路由
    tag ? delAliveRoutes(delAliveRouteList) : delAliveRoutes([obj]);
    if (!multiTags.value.length) return;
    let isHasActiveTag = multiTags.value.some(item => {
      return item.path === route.path;
    });
    !isHasActiveTag &&
      router.push({
        path: newRoute[0].path,
        query: newRoute[0].query
      });
  }
}

function deleteMenu(item, tag?: string) {
  deleteDynamicTag(item, item.path, tag);
}

function closeMenu() {
  visible.value = false;
}

// 触发tags标签切换
function tagOnClick(item) {
  router.push({
    path: item?.path,
    query: item?.query
  });
  // showMenuModel(item?.path, item?.query);
}

watch(
  () => visible.value,
  val => {
    if (val) {
      document.body.addEventListener("click", closeMenu);
    } else {
      document.body.removeEventListener("click", closeMenu);
    }
  }
);

onBeforeMount(() => {
  if (!instance) return;
  // 触发隐藏标签页
  emitter.on("tagViewsChange", key => {
    // @ts-expect-error
    if (unref(showTags) === key) return;
    // @ts-expect-error
    showTags.value = key;
  });

  // 改变标签风格
  emitter.on("tagViewsShowModel", key => {
    showModel.value = key;
  });

  //  接收侧边栏切换传递过来的参数
  emitter.on("changLayoutRoute", ({ indexPath, parentPath }) => {
    dynamicRouteTag(indexPath, parentPath);
  });
});

const getTabStyle = computed((): CSSProperties => {
  return {
    transform: `translateX(${translateX.value}px)`
  };
});
</script>

<template>
  <div ref="containerDom" class="tags-view" v-if="!showTags">
    <div class="arrow-left">
      <el-icon @click="handleScroll(200)"><ArrowLeft /></el-icon>
    </div>
    <div ref="scrollbarDom" class="scroll-container">
      <div class="tab" ref="tabDom" :style="getTabStyle">
        <div
          :ref="'dynamic' + index"
          v-for="(item, index) in multiTags"
          :key="index"
          :class="[
            'scroll-item is-closable',
            linkIsActive(item),
            $route.path === item.path && showModel === 'card'
              ? 'card-active'
              : ''
          ]"
          @click="tagOnClick(item)"
        >
          <router-link
            :to="item.path"
            class="!dark:color-text_color_primary !dark:hover:color-primary"
          >
            {{ item.meta.title }}
          </router-link>
          <span
            v-if="
              iconIsActive(item, index) ||
              (index === activeIndex && index !== 0)
            "
            class="el-icon-close"
            @click.stop="deleteMenu(item)"
          >
            <el-icon @click="handleScroll(-200)"><CloseBold /></el-icon>
          </span>
          <div
            :ref="'schedule' + index"
            v-if="showModel !== 'card'"
            :class="[scheduleIsActive(item)]"
          />
        </div>
      </div>
    </div>
    <span class="arrow-right">
      <el-icon @click="handleScroll(-200)"><ArrowRight /></el-icon>
    </span>
  </div>
</template>

<style lang="scss" scoped>
@import "./index.scss";
</style>
