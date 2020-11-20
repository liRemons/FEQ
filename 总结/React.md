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

也可以使用一个函数作为参数，上一个 state 作为函数第一个参数，此次更新的 props 函数第二个参数

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

store是整个数据中心，用户通过界面触发`ActionCreator` ,携带着旧的 `state`,传递给 `action`,`action`通过 `dispatch` 传递并触发 `reducer` , `reducer` 改变 `state` 并返回，界面更新

- `action`

  ```javascript
  // 用户通过导出的 ActiconCreators 触发action的方法，dispatch 将接收的数据给 reducer
  // 如果需要异步，引入中间件 redux-thunk 或 redux-saga
  changeLoading(data) {
     // return dispatch =>  //异步 
          const action = {
              type: type.LOADING,
              payload: data
          }
     0.0.     store.dispatch(action)
     // }  //异步
  }
  ```

- `reducer`

  ```javascript
  // 接收 action 传递的值，并返回一个新的 state ，直接改变state并不会更新，一般会这么写
  const reducer = (previousState = state, action) => {
    let newState = {
      ...previousState,
    };
     switch (action.type) {
      case type.IMG_BANNER:
        newState.bannerList = action.payload;
        break;
    }
    return newState;
  }
  ```

- `type`：用来标识各个数据及方法

- `state` ： 定义数据

- `applyMiddleware`

  ```javascript
  // 顾名思义，middleware是中间件的意思，那么 applyMiddleware 就是redux 的方法，用来将所有中间件组成一个数组，依次执行
  import { createStore, applyMiddleware } from 'redux'
  import thunk from 'redux-thunk'
  import reducer from './reducer'
  const store = createStore(reducer, applyMiddleware(thunk))
  export default store
  ```

- `combineReducers`

  ```javascript
  // 模块化，将多个 reducer 合成一个
  import { combineReducers } from 'redux'
  import Layout from './layout/reducer'
  const reducer = combineReducers({
    Layout
  })
  export default reducer
  ```

- `connect`  从 UI 组件生成容器组件

  ```javascript
  // 应用 API
  import { connect } from 'react-redux'
  const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
  )(TodoList)
  
  // mapStateToProps
  // 是一个函数，它接受state作为参数，返回一个对象,第二个参数是容器组件的props对象，其发生变化，UI界面也会发生变化
  
  // mapDispatchToProps 
  // 建立 UI 组件的参数到store.dispatch方法的映射,可以是对象或者函数
  // 如果mapDispatchToProps是一个函数，会得到dispatch和ownProps（容器组件的props对象）两个参数。这个函数返回一个对象，对象中键是action的名字，值是进行dispatch处理的函数,例如下面的写法：
  mapDispatchToProps((dispatch)=>{
  　　return {
  　　　　action:(data) => dispatch( actioncreator(data) )  
     }
  })
  // 通常，和 bindActionCreators 一起使用，它有 2 个参数，将actionCreators批量传递给UI组件
  // 第一个参数 actionCreators
  // 第二个参数 dispatch： 一个由 Store 实例提供的 dispatch 函数。
  mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch)
  }
  ```

#### react-thunk

#### Flux

#### Mobx

#### Redux、Flux、Mobx区别

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
  // 组件之间共享状态 ，类似于context
  // 新建global.js
  import React from 'react'
  export const AppContext = React.createContext({});
  // App.js
  import React from "react";
  import Navbar from "./Navbar";
  import Messages from "./Messages";
  import { AppContext } from "./global";
  function App() {
    return (
      <AppContext.Provider
        value={{
          username: "superawesome",
        }}
      >
        <Navbar />
        <Messages />
      </AppContext.Provider>
    );
  }
  
  export default App;
  // Messages
  import React, { useContext } from "react";
  import { AppContext } from "./global";
  const Messages = () => {
    const { username } = useContext(AppContext);
    return <h1>Messages :{username}</h1>;
  };
  
  export default Messages;
  // Navbar
  import React, { useContext } from "react";
  import { AppContext } from "./global";
  const Navbar = () => {
    const { username } = useContext(AppContext);
    return <p>AwesomeSite :{username}</p>;
  };
  export default Navbar;
  ```

- `useReducer()`

- `useEffect()`

  ```javascript
  // 接受两个参数，第一个参数是一个执行函数，第二个参数是依赖项，其变化时会执行函数
  useEffect(()  =>  {}, [依赖项])
  ```

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

