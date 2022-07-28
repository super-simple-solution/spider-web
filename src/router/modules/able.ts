import { $t } from "/@/plugins/i18n";
const Layout = () => import("/@/layout/index.vue");

const ableRouter = {
  path: "/able",
  component: Layout,
  redirect: "/able/cascader",
  meta: {
    icon: "ubuntu-fill",
    title: $t("menus.hsAble"),
    rank: 4
  },
  children: [
    {
      path: "/able/cascader",
      name: "Cascader",
      component: () => import("/@/views/able/cascader.vue"),
      meta: {
        title: $t("menus.hsCascader")
      }
    }
  ]
};

export default ableRouter;
