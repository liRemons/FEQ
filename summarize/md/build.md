## webpack

以 vue 打包为例

```javascript
// vue.config.js
const path = require('path')
module.exports = {
  // 入口文件
  indexPath: "index.html",
  // 打包目录
  assetsDir: "./static",
  // publicPath: "/fe_mobile/", //文件访问路径
  productionSourceMap: false,  // 开启map
  publicPath: process.env.NODE_ENV === 'production' ? '././':'',
  // title
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'xxxx'
        return args
      })
  },
  // 代理
  devServer: {
    proxy: {
      '/api': {
        target: 'xxx',
        changeOrigin: true, // 允许跨域
        pathRewrite: { // 重写路径
          '^/api': '/'
        }
      }
    }
  },
  // 静态资源打包
  pluginOptions: {
    'copy-webpack-plugin': {
      patterns: [
        {
          from: path.join(__dirname, 'public/.spa'),
          to: 'dist/'
        }
      ],
    }
  }
}
```



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

