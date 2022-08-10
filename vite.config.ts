import { resolve } from "path";
import { getPluginsList } from "./build/plugins";
import { UserConfigExport, ConfigEnv } from "vite";
import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";

// 路径查找
const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir);
};

// 设置别名
const alias: Record<string, string> = {
  "/@": pathResolve("src"),
  "@build": pathResolve("build")
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
    resolve: { alias },
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
      include: ["pinia", "@vueuse/core", "dayjs"]
    },
    build: {
      sourcemap: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000
    },
    css: {
      postcss: {
        plugins: [tailwind(), autoprefixer()]
      }
    }
  };
};
