## React

### React 16

#### react-router

#### 生命周期

- react 性能优化是哪个周期函数

#### 高阶组件（HOC）

#### 组件通信

#### 无状态组件和类组件

#### 属性(props)和状态(state)

#### 受控组件和非受控组件

#### context

#### Redux

#### Flux

#### Mobx

#### Redux、Flux、Mobx区别

#### react-thunk

#### react-Hook

#### react-saga

#### 项目配置less

1. `webpack.config.js`

   ```javascript
   // 1 . 
   const lessRegex = /\.less$/;
   const lessModuleRegex = /\.module\.less$/;
   
   // 2 .getStyleLoaders 函数，不要忘了传参lessOptions
   {
       loader: require.resolve('less-loader'),
       options: lessOptions,
   },
       
   // 3. 
   {
       test: lessRegex, 
           exclude: lessModuleRegex, 
               use: getStyleLoaders( 
                   {
                       importLoaders: 1, 
                       sourceMap: isEnvProduction && shouldUseSourceMap, 
                   }, 
                   'less-loader' 
               ), 
                   sideEffects: true, 
   }, 
       {
           test: lessModuleRegex, 
               use: getStyleLoaders(
                   {
                       importLoaders: 1, 
                       sourceMap: isEnvProduction && shouldUseSourceMap,
                       module: true,
                       getLocalIdent: getCSSModuleLocalIdent
                   },
                   'less-loader'
               ),
       },
   
   ```

2. `npm i less less-loader --save`

3. 如果还是报错,请将less-loader===>5.0.0

#### 路径别名

```javascript
// webpack.config.js
// 1 .
const pathResolve = (url) => {
  return path.join(__dirname, url);
};

// 2. 例：
'@': pathResolve('../src')
```

#### 解决兼容性

### React 17

### React和Vue的区别

##### 相同点

- 虚拟DOM，数据驱动，组件化

##### 不同点：

- react使用fiber算法，vue采用diff算法
- react  jsx语法，vue 推荐html模板
- react 是单向数据流，vue双向数据绑定
- react  MVC，vue MVVM

### umi

### dva

