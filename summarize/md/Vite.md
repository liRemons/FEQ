[官网](https://vitejs.dev/)

#### 为什么 Vite 加载速度快，webpack 做不到吗

#### 创建应用

- `npm init @vitejs/app `   or   `yarn create @vitejs/app`
- `npm init @vitejs/app my-vue-app --template vue`   `npm 6+`
- `npm init @vitejs/app my-vue-app -- --template vue`  `npm 7+`
- 根据提示进入文件夹，`npm i`



#### vite配置

```javascript
// vite.config.js   2.0 beta （正式版本可能有变化）
import vue from "@vitejs/plugin-vue";
const { resolve } = require("path");
// 获取环境变量 ，目前我只能在生产环境中获取到
const NODE_ENV = process.env.NODE_ENV;
/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default {
  // 访问路径 , 默认 ./
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
        main: resolve(__dirname, "index.html"),
        // 其他入口
        nested: resolve(__dirname, 'xxxx.html')
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

[个人网站持续更新](http://remons.gitee.io/)