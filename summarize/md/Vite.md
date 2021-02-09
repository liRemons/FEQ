## Vite

[官网](https://vitejs.dev/)

```javascript
// vite.config.js   2.0 beta （正式版本可能有变化）
import vue from "@vitejs/plugin-vue";
const { resolve } = require("path");
/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default {
  // 访问路径
  base: "/dist/",
  plugins: [vue()],
  // 路径别名
  alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
  build: {
    // 打包路径
    assetsDir: "./static",
    rollupOptions: {
      input: {
        // 入口文件
        main: resolve(__dirname, "mindex.html"),
      },
    },
  },
  // 代理
  server: {
    proxy: {
      "/api": {
        target: "xxxx",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/"),
      },
    },
  },
};

```

