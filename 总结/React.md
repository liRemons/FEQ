## React

### React 16

#### super

在ES6中，在子类的 `constructor` 中必须先调用 `super` 才能引用 `this` 。

#### setState

有两个参数

- 对象键值对
- 函数：可以获取最新值

异步更新state，将短时间内的多个setState合并成一个,将其放入到队列中，一起更新，节约性能

问题:`this.state.a='11'` 为何不会更新

也可以使用一个函数作为参数，上一个 state 作为第一个参数，此次更新的 props 第二个参数

#### refs

Refs 是 React 提供给我们的安全访问 DOM 元素或者某个组件实例的句柄。例：

```html
<form onSubmit={this.handleSubmit}>
    <input type='text' ref={(input) => this.input = input} />
</form>
<!-- this.input.value  访问 -->
```

#### react-router

- 二级路由

- 路由匹配和重定向

  ```html
  <!-- SWitch 包裹，例 -->
  <Switch>
      <!-- 重定向 -->
  	<Redirect from="/" to="/home" exact></Redirect>
      <!-- 如果都没匹配到，则跳转到下面的 -->
  	<Route component={Error}></Route>
  </Switch>
  ```

- 路由传参和动态路由

  ```html
  <!-- 传入一个动态路由/:id -->
   <Route path = "/shopcar/:id" component ={ Shopcar } />   
  <!-- to属性增加pathname和search -->
  <Link to ={{pathname: '/shopcar/001',search: '?a=1&b=2',}}></Link>
  ```

#### 生命周期

- 创建
- 挂载
- 更新
- 卸载

#### 高阶组件（HOC）

高阶组件是一个函数，接收一个组件作为参数，并返回一个组件，例如 `connect` 、 `withRouter`

#### 组件通信

- 父子组件：通过props传递给子组件，子组件通过props接收；子组件通过父组件传递的函数传参给父组件。
- 跨组件通信
  - 层层传递
  - [Context](#context)
- 非嵌套组件
  - 发布订阅模式
  - Redux、Mobx

#### 无状态组件和有状态组件

无状态组件：使用函数直接创建组件，使用方便，易于书写。应避免使用this

有状态组件：通过class创建组件，有生命周期，可以通过this接收状态和属性

#### 属性(props)和状态(state)

组件不可修改属性，但可以修改自己的状态

| Conditions           | States | Props |
| :------------------- | :----: | :---: |
| 可从父组件接收初始值 |   是   |  是   |
| 可在父组件中改变其值 |   否   |  是   |
| 在组件内设置默认值   |   是   |  是   |
| 在组件内可改变       |   是   |  否   |
| 可作为子组件的初始值 |   是   |  是   |

#### 受控组件和非受控组件

使用setState进行更新状态的称为受控组件

使用refs获取的称为非受控组件

#### 业务组件和UI组件

#### context

- 第一种写法

  ```javascript
  //App.js
  import React from 'react';
  import Son from './son';//引入子组件
  // 创建一个 theme Context,
  export const { Provider, Consumer } = React.createContext("默认名称");
  export default class App extends React.Component {
    render() {
      let name = "小人头"
      return (
        //Provider共享容器 接收一个name属性
        <Provider value={name}>
          <p>父组件定义的值:{name}</p>
          <Son />
        </Provider>
      );
    }
  }
  
  //son.js 子类
  import React from 'react';
  import { Consumer } from "./App";//引入父组件的Consumer容器
  import Grandson from "./grandson.js";//引入子组件
  function Son(props) {
    return (
      //Consumer容器,可以拿到上文传递下来的name属性,并可以展示对应的值
      <Consumer>
        {(name) =>
          <div>
            <p>子组件。获取父组件的值:{name}</p>
            {/* 孙组件内容 */}
            <Grandson />
          </div>
        }
      </Consumer>
    );
  }
  export default Son;
  
  //grandson.js 孙类
  import React from 'react';
  import { Consumer } from "./App";//引入父组件的Consumer容器
  function Grandson(props) {
    return (
      //Consumer容器,可以拿到上文传递下来的name属性,并可以展示对应的值
      <Consumer>
        { (name) => <p>孙组件。获取传递下来的值:{name}</p>}
      </Consumer>
    );
  }
  export default Grandson;
  ```

- 第二种写法

  ```javascript
  // 新建global.js
  import React from 'react'
  export const ThemeContext = React.createContext('light');
  
  //App.js
  import React from 'react';
  import Toolbar from './toolbar';//引入子组件
  import { ThemeContext } from './global'
  class App extends React.Component {
    render() {
      return (
        <ThemeContext.Provider value="dark">
          <Toolbar />
        </ThemeContext.Provider>
      );
    }
  }
  
  export default App
  
  // Toolbar.js
  import  ThemedButton from './ThemedButton'
  function Toolbar() {
    return (
      <div>
        <ThemedButton />
      </div>
    );
  }
  export default Toolbar
  
  //ThemedButton.js
  import React from 'react'
  import { ThemeContext } from './global'
  
  class ThemedButton extends React.Component {
    static contextType = ThemeContext;
    render() {
      return <p>{this.context}</p>;
    }
  }
  export default ThemedButton
  ```

#### Redux

#### Flux

#### Mobx

#### Redux、Flux、Mobx区别

#### react-thunk

#### react-Hook

- `useState()` 

  ```javascript
  // useState()这个函数接受状态的初始值作为参数，该函数返回一个数组，数组的第一个成员是一个变量，指向状态的当前值。第二个成员是一个函数，用来更新状态，约定是set前缀加上状态的变量名。例如下面：
  import React, { useState } from 'react';
  function Example() {
    // 声明一个叫 “count” 的 state 变量。
    const [count, setCount] = useState(0);
  
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
  }
  ```

- `useContext()`

  ```javascript
  // 组件之间共享状态 
  import React, { useContext } from "react";
  import ReactDOM from "react-dom";
  const AppContext = React.createContext({});
  
  const Navbar = () => {
    const { username } = useContext(AppContext)
    return (
      <div className="navbar">
        <p>{username}</p>
      </div>
    )
  }
  
  const Messages = () => {
    const { username } = useContext(AppContext)
    return (
      <p>1 message for {username}</p>
    )
  }
  
  function App() {
    return (
      <AppContext.Provider value={{
        username: 'superawesome'
      }}>
        <div className="App">
          <Navbar />
          <Messages />
        </div>
      </AppContext.Provider>
    );
  }
  
  const rootElement = document.getElementById("root");
  ReactDOM.render(<App />, rootElement);
  
  ```

  

- `useReducer()`

- `useEffect()`

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

