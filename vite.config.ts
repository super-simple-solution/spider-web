import dayjs from "dayjs";
import { resolve } from "path";
import pkg from "./package.json";
import { getPluginsList } from "./build/plugins";
import { UserConfigExport, ConfigEnv } from "vite";
import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";

// 当前执行node命令时文件夹的地址（工作目录）
const root: string = process.cwd();

// 路径查找
const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir);
};

// 设置别名
const alias: Record<string, string> = {
  "/@": pathResolve("src"),
  "@build": pathResolve("build")
};

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
};

const envStr = "test";

const evnPath = `http://baidu.com`;

const pathMap = {
  test: evnPath,
  pre: evnPath
};

export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    base: "/",
    root,
    resolve: {
      alias
    },
    // 服务端渲染
    server: {
      strictPort: false,
      port: 3020,
      proxy: {
        "/api": {
          target: pathMap[envStr],
          rewrite: path => path.replace(/^\/api/, "/bus/web_awesomed"),
          changeOrigin: true,
          ws: true
        }
      },
      hmr: {
        overlay: false
      }
    },
    plugins: getPluginsList(command),
    optimizeDeps: {
      include: ["pinia", "@vueuse/core", "dayjs"],
      exclude: ["@pureadmin/theme/dist/browser-utils"]
    },
    build: {
      sourcemap: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    css: {
      postcss: {
        plugins: [tailwind(), autoprefixer()]
      }
    }
  };
};
