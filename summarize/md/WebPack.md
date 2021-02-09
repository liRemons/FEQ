## WebPack

```javascript
// 以vue.config.js为例
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

