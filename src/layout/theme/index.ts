/**
 * @description ⚠️：此文件仅供主题插件使用，请不要在此文件中导出别的工具函数（仅在页面加载前运行）
 */

type MultipleScopeVarsItem = {
  scopeName: string;
  varsContent: string;
};

/** 将vxe默认主题色和ep默认主题色保持一致 */
const vxeColor = "#409EFF";
/** 预设主题色 */
const themeColors = {
  default: {
    vxeColor,
    subMenuActiveText: "#fff",
    menuBg: "#001529",
    menuHover: "#4091f7",
    subMenuBg: "#0f0303",
    subMenuActiveBg: "#4091f7",
    navTextColor: "#fff",
    menuText: "rgb(254 254 254 / 65%)",
    sidebarLogo: "#002140",
    menuTitleHover: "#fff",
    menuActiveBefore: "#4091f7"
  }
};

/**
 * @description 将预设主题色处理成主题插件所需格式
 */
export const genScssMultipleScopeVars = (): MultipleScopeVarsItem[] => {
  const result = [] as MultipleScopeVarsItem[];
  Object.keys(themeColors).forEach(key => {
    result.push({
      scopeName: `layout-theme-${key}`,
      varsContent: `
        $vxe-primary-color: ${themeColors[key].vxeColor} !default;
        $navTextColor: ${themeColors[key].navTextColor} !default;
      `
    } as MultipleScopeVarsItem);
  });
  return result;
};
