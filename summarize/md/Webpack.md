#### webpack 动态加载的原理

#### webpack 热更新的原理

webpack-dev-server 启动后，使用`express`框架启动本地`server`，让浏览器可以请求本地的静态资源，浏览器端和服务端由websocket进行长连接，会监听本地文件的变化，文件变化后进行编译，通知浏览器进行更新

#### babel

#### plugins

#### chunk

#### 打包优化、分包

```javascript
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

[个人网站持续更新](http://remons.gitee.io/)