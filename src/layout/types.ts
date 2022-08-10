import { Component } from "vue";
export const routerArrays: Array<RouteConfigs> = [
  {
    path: "/welcome",
    parentPath: "/",
    meta: {
      title: "首页",
      icon: "home-filled"
    }
  }
];

export type routeMetaType = {
  title?: string;
  icon?: string;
  showLink?: boolean;
  savedPosition?: boolean;
  authority?: Array<string>;
};

export type RouteConfigs = {
  path?: string;
  parentPath?: string;
  query?: object;
  meta?: routeMetaType;
  children?: RouteConfigs[];
  name?: string;
};

export type multiTagsType = {
  tags: Array<RouteConfigs>;
};

export type tagsViewsType = {
  icon: Component;
  text: string;
  divided: boolean;
  disabled: boolean;
  show: boolean;
};

export type childrenType = {
  path?: string;
  noShowingChildren?: boolean;
  children?: childrenType[];
  value: unknown;
  meta?: {
    icon?: string;
    title?: string;
    showParent?: boolean;
    extraIcon?: {
      svg?: boolean;
      name?: string;
    };
  };
  showTooltip?: boolean;
  parentId?: number;
  pathList?: number[];
};
