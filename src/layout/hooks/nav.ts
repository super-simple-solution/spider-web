import { computed } from "vue";
import { router } from "/@/router";
import { getConfig } from "/@/config";
import { emitter } from "/@/utils/mitt";
import { routeMetaType } from "../types";
import { remainingPaths } from "/@/router";
import type { StorageConfigs } from "/#/index";
import { routerArrays } from "/@/layout/types";
import { storageSession } from "@pureadmin/utils";
import { useAppStoreHook } from "/@/store/modules/app";
import { useEpThemeStoreHook } from "/@/store/modules/epTheme";
import { useMultiTagsStoreHook } from "/@/store/modules/multiTags";

const errorInfo = "当前路由配置不正确，请检查配置";

export function useNav() {
  const pureApp = useAppStoreHook();
  // 用户名
  const username: string =
    storageSession.getItem<StorageConfigs>("info")?.username;

  // 设置国际化选中后的样式
  const getDropdownItemStyle = computed(() => {
    return (locale, t) => {
      return {
        background: locale === t ? useEpThemeStoreHook().epThemeColor : "",
        color: locale === t ? "#f4f4f5" : "#000"
      };
    };
  });
  const getDropdownItemClass = computed(() => {
    return (locale, t) => {
      return locale === t ? "" : "!dark:hover:color-primary";
    };
  });

  const isCollapse = computed(() => {
    return !pureApp.getSidebarStatus;
  });

  // 动态title
  function changeTitle(meta: routeMetaType) {
    const Title = getConfig().Title;
    if (Title) document.title = `${meta.title} | ${Title}`;
    else document.title = meta.title;
  }

  // 退出登录
  function logout() {
    useMultiTagsStoreHook().handleTags("equal", [...routerArrays]);
    storageSession.removeItem("info");
    router.push("/login");
  }

  function backHome() {
    router.push("/welcome");
  }

  function onPanel() {
    emitter.emit("openPanel");
  }

  function toggleSideBar() {
    pureApp.toggleSideBar();
  }

  function handleResize(menuRef) {
    menuRef.handleResize();
  }

  function resolvePath(route) {
    if (!route.children) return console.error(errorInfo);
    const httpReg = /^http(s?):\/\//;
    const routeChildPath = route.children[0]?.path;
    if (httpReg.test(routeChildPath)) {
      return route.path + "/" + routeChildPath;
    } else {
      return routeChildPath;
    }
  }

  function menuSelect(indexPath: string, routers): void {
    if (isRemaining(indexPath)) return;
    let parentPath = "";
    const parentPathIndex = indexPath.lastIndexOf("/");
    if (parentPathIndex > 0) {
      parentPath = indexPath.slice(0, parentPathIndex);
    }
    // 找到当前路由的信息
    function findCurrentRoute(indexPath: string, routes) {
      if (!routes) return console.error(errorInfo);
      return routes.map(item => {
        if (item.path === indexPath) {
          if (item.redirect) {
            findCurrentRoute(item.redirect, item.children);
          } else {
            // 切换左侧菜单 通知标签页
            emitter.emit("changLayoutRoute", {
              indexPath,
              parentPath
            });
          }
        } else {
          if (item.children) findCurrentRoute(indexPath, item.children);
        }
      });
    }
    findCurrentRoute(indexPath, routers);
  }

  // 判断路径是否参与菜单
  function isRemaining(path: string): boolean {
    return remainingPaths.includes(path);
  }

  return {
    logout,
    backHome,
    onPanel,
    changeTitle,
    toggleSideBar,
    menuSelect,
    handleResize,
    resolvePath,
    isCollapse,
    pureApp,
    username,
    getDropdownItemStyle,
    getDropdownItemClass
  };
}
