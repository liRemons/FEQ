#### webpack 动态加载的原理

#### webpack 热更新的原理

webpack-dev-server 启动后，使用`express`框架启动本地`server`，让浏览器可以请求本地的静态资源，浏览器端和服务端由websocket进行长连接，会监听本地文件的变化，文件变化后进行编译，通知浏览器进行更新

#### babel

Babel 通过语法转换器来支持新版本的 js 语法

#### loader

loader 用于对模块的源代码进行转换，使用见[示例](#示例)

#### plugins

目的在于解决 loader 无法实现的其他事

#### chunk

webpack打包的过程中，生成的JS文件，每一个JS文件我们都把它叫做Chunk

#### 按需加载

#### 打包优化、分包

##### 打包优化

```js
// 首先，可以安装 webpack-bundle-analyzer 进行分析，找出比较大的模块
// 去除 node_modules
exclude: /node_modules/
// 使用 uglifyjs-webpack-plugin 压缩js
// 使用 optimization.splitChunks( webpack v4 +) 分离第三方包
// 使用 html-webpack-plugin 压缩html
// ......
```

##### 分包

```js
// 主要是为了解决首屏加载速度过慢的问题
// 对于比较大的依赖包通过 cacheGroups 实现拆分
// 对于webpack v4 + ，使用 splitChunks 分离第三方包
// https://juejin.cn/post/6844904201072574472
```

#### 示例

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 访问内置的插件
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
  },
  // loader的使用
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
    ],
  },
  // plugins
  plugins: [
    new webpack.ProgressPlugin(), // 自定义编译过程中的进度报告
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ]
}
```

[个人网站持续更新](http://remons.gitee.io/)