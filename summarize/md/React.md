### React 16

#### super

在ES6中，在子类的 `constructor` 中必须先调用 `super` 才能引用 `this` 。

#### setState (partialState, callback )

有两个参数

- 对象键值对
- 函数：可以获取最新值

在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout 中都是同步的。

setState的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数拿到更新后的结果。

setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次 setState ， setState 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 setState 多个不同的值，在更新时会对其进行合并批量更新。

问题：调用 setState 之后发生了什么

- 在 `setState` 的时候，React 会为当前节点创建一个 `updateQueue` 的更新列队。
- 然后会触发 `reconciliation` 过程，在这个过程中，会使用名为 Fiber 的调度算法，开始生成新的 Fiber 树， Fiber 算法的最大特点是可以做到异步可中断的执行。
- 然后 `React Scheduler` 会根据优先级高低，先执行优先级高的节点，具体是执行 `doWork` 方法。
- 在 `doWork` 方法中，React 会执行一遍 `updateQueue` 中的方法，以获得新的节点。然后对比新旧节点，为老节点打上 更新、插入、替换 等 Tag。
- 当前节点 `doWork` 完成后，会执行 `performUnitOfWork` 方法获得新节点，然后再重复上面的过程。
- 当所有节点都 `doWork` 完成后，会触发 `commitRoot` 方法，React 进入 commit 阶段。
- 在 commit 阶段中，React 会根据前面为各个节点打的 Tag，一次性更新整个 dom 元素。

#### 原生事件和合成事件

React 的合成事件利用事件冒泡的形式冒泡到document，将事件封装给正式的函数处理运行和处理，以提高性能

#### refs

Refs 是 React 提供给我们的安全访问 DOM 元素或者某个组件实例的句柄。例：

```jsx
<form onSubmit={this.handleSubmit}>
    <input type='text' ref={(input) => this.input = input} />
</form>
<!-- this.input.value  访问 -->
```

#### react-router

- 二级路由

    在一级路由内嵌套

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

  ```jsx
  <!-- 传入一个动态路由/:id -->
   <Route path = "/shopcar/:id" component ={ Shopcar } />   
  <!-- to属性增加pathname和search -->
  <Link to ={{pathname: '/shopcar/001',search: '?a=1&b=2',}}></Link>
  ```

- 路由组件守卫

  使用高阶组件的形式，将路由组件放在高阶组件返回，通过判断逻辑返回相应的组件
  
  每个路由都有`Enter`和`Leave`钩子，用户进入或离开该路由时触发。
  
- Route渲染方式   优先级： `children > component > render`

    -   children 
    
        ```jsx
        // 无论 location 是否匹配，都会渲染
        <Route 
            path='/a' 
            children={({ match }) => (
                <Link to='/a'> hello world </Link>
            )}
        />
        ```
    
    -   render 
    
        ```jsx
        // 避免重复的无必要的加载，匹配时渲染
        <Route
            path="/home"
            render={() => {
                return <div> home </div>
            }}
         />
        ```
    
    -   component
    
        ```jsx
        // 只有 path 匹配时，组件才呈现。
        <Route path="/user" component={ component } />
        ```
    
- `withRouter` 

    将一个组件包裹进`Route`里面, 然后`react-router`的三个对象`history, location, match`就会被放进这个组件的`props`属性中

#### 生命周期

15和16版本的区别

![image-20201121091647026](https://remons.gitee.io/feq/summarize/assets/img/image-20201121091647026.png)

- 挂载

  - ~~`componentWillMount()`~~

    > 在挂载之前被调用

  - `constructor()`

    > 组件挂载之前，会调用它的构造函数
    > 应在其他语句之前前调用 `super(props)` ,否则无法访问 `this`

  - `static getDerivedStateFromProps(props, state)`

    > 会在调用 render 方法之前调用，并且在初始挂载及后续更新时(挂载时，接收到新的props，调用了setState和forceUpdate)都会被调用
    >
    > 应返回一个对象来更新 state，如果返回 `null` 则不更新任何内容。

  - `render()`

    > `render()` 方法是 class 组件中唯一必须实现的方法。
    > 当 render 被调用时，它会检查 `this.props` 和 `this.state` 的变化

  - `componentDidMount()`

    > 在组件挂载后（插入 DOM 树中）立即调用，可以进行实例化请求

- 更新

  - `static getDerivedStateFromProps(props, state)`

  - ~~`componentWillReceiveProps(nextProps)`~~

    > 已挂载的组件接收新的 props 之前被调用
    >
    > 父组件导致组件重新渲染，即使 props 没有更改，也会触发此方法

  - `shouldComponentUpdate(nextProps, nextState)`

    > 当 `props` 或 `state` 发生变化时,会在渲染之前调用，默认返回 `true` ,如果返回 `false` ,则会跳过更新
    > 可以将 `this.state` 和 `nextState` , `this.props` 和 `nextProps` 比较
    > 此处可以通过返回 `true` 或 `false` 进行性能优化

  - `render()`

  - `getSnapshotBeforeUpdate(prevProps, prevState)`

    > 在最近一次渲染输出（提交到 DOM 节点）之前调用
    >
    > 任何返回值将作为参数传递给 `componentDidUpdate()`

  - `componentDidUpdate(prevProps, prevState, snapshot)`

    >  在更新后会被立即调用，首次渲染不会执行此方法。

- 卸载

  - `componentWillUnmount()`

    > 会在组件卸载及销毁之前直接调用

- 错误处理

  - `static getDerivedStateFromError(error)`

    > 在后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state

  - `componentDidCatch(error, info)`

    > 此生命周期在后代组件抛出错误后被调用

#### 高阶组件（HOC）

高阶组件是一个函数，接收一个组件作为参数，并返回一个组件，例如 `connect` 、 `withRouter`

原理？

如何在函数式组件中使用HOC

#### `suspense` 组件

Suspense 让组件“等待”某个异步操作，直到该异步操作结束即可渲染

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

更新 state 和 props 会触发哪些状态

```jsx
// 更改state : 
// getDerviedStateFromProps
// shouldComponentUpdate
// render
// getSnapshotBeforeUpdate
// componentDidUpdate


// 更改props
// getDerviedStateFromProps
// shouldComponentUpdate
// render
// getSnapshotBeforeUpdate
// componentDidUpdate

// 所触发的生命周期是相同的，但两者的区别是更改props时，生命周期的props和state都是有值的，更改state时，生命周期的第一个参数，也就是 props 值是空的
```



#### 受控组件和非受控组件

使用setState进行更新状态的称为受控组件

使用refs获取的称为非受控组件

大白话说就是需不需要干涉，不干涉的是非受控组件，干涉的是受控组件

表单中既是受控组件，又是非受控组件，怎么做？

#### context

- 第一种写法 (低版本)

  ```jsx
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

  ```jsx
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

  ```jsx
  // 用户通过导出的 ActiconCreators 触发action的方法，dispatch 将接收的数据给 reducer
  // 如果需要异步，引入中间件 redux-thunk 或 redux-saga
  changeLoading(data) {
     // return dispatch =>  //异步 
      const action = {
          type: type.LOADING,
          payload: data
      }
      store.dispatch(action)
     // }  //异步
  }
  ```

- `reducer`

  ```jsx
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

  ```jsx
  // 顾名思义，middleware是中间件的意思，那么 applyMiddleware 就是redux 的方法，用来将所有中间件组成一个数组，依次执行
  import { createStore, applyMiddleware } from 'redux'
  import thunk from 'redux-thunk'
  import reducer from './reducer'
  const store = createStore(reducer, applyMiddleware(thunk))
  export default store
  ```

- `combineReducers`

  ```jsx
  // 模块化，将多个 reducer 合成一个
  import { combineReducers } from 'redux'
  import Layout from './layout/reducer'
  const reducer = combineReducers({
    Layout
  })
  export default reducer
  ```

- `connect`  从 UI 组件生成容器组件

  ```jsx
  // 应用 API
  import { connect } from 'react-redux'
  const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
  )(TodoList)
  
  // mapStateToProps
  // 是一个函数，它接受state作为参数，返回一个对象,第二个参数是容器组件的props对象，其发生变化，UI界面也会发生变化，当state发生变化或者容器组件的props发生变化时，都会触发此方法进行重新计算
  
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
  
  // 原理： 在原应用组件上包裹一层，使原来整个应用成为Provider的子组件,接收Redux的store作为props，通过context对象传递给子孙组件上的connect,是一个高阶组件
  // 它真正连接 Redux 和 React，它包在我们的容器组件的外一层，它接收上面 Provider 提供的 store 里面的 state 和 dispatch，传给一个构造函数，返回一个对象，以属性形式传给我们的容器组件。
  
  // 参考链接 ： https://zhuanlan.zhihu.com/p/30671973
  ```

#### react-thunk 

可以在actionCreators内部编写逻辑，处理请求结果。而不只是单纯的返回一个action对象

#### Flux

#### Mobx

#### Redux、Flux、Mobx区别

#### 类组件中的优化

##### React.memo

- React.memo 为高阶组件，仅可在函数组件使用
- 仅检查 props 变更，当context变化时仍然会重新渲染
- 默认情况下其只会对复杂对象做浅层对比，如果想要控制对比过程，通过第二个参数传入来实现
- 与` shouldComponentUpdate() `返回值相反

##### `PureComponent`

-   `React.PureComponent` 中以浅层对比 prop 和 state，和`React.component`类似，仅在类组件使用

#### react-Hook

##### `useState()` 

```jsx
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

##### `useContext()`

```jsx
// 组件之间共享状态 ，类似于context
import React, { useState, useContext } from "react";
const MyContext = React.createContext("");
const Child = (props) => {
  const { count, setCount } = useContext(MyContext);
  return (
    <>
      count:{count}
      <button onClick={() => setCount((count) => (count += 1))}> + </button>
    </>
  );
};

export default function LayOut() {
  const [count, setCount] = useState(0);
  return (
    <MyContext.Provider value={{ count, setCount }}>
      <Child></Child>
    </MyContext.Provider>
  );
}
```

##### `useReducer()`

```jsx
import React, { useReducer } from "react";
const initialState = { count: 0 };
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}
 // 第三个参数，初始化数据
const init = (state) => {
   state.count ++
   return state
};
function Counter() {
   // 解构出来 dispatch 和 state ,和 Redux 类似
  const [state, dispatch] = useReducer(reducer, initialState, init);
  return (
    <>
     count:  {state.count} <br></br>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
}
export default function LayOut() {
  return (
    <>
      <Counter></Counter>
    </>
  );
}
```

##### `useReducer`  和 `useContext` 结合使用

```jsx
// Count.js
import React, { useReducer } from "react";
export const MyContext = React.createContext("");
export const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

export const Father = (props) => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {props.children}
    </MyContext.Provider>
  );
};

// Layout.js
import { Father } from "../Count";
import Area from "../../pages/Area";
import Buttons from "../../pages/Btn";
export default function LayOut() {
  return (
    <Father>
      <Area></Area>
      <Buttons></Buttons>
    </Father>
  );
}
// Area.js
import { useContext } from "react";
import { MyContext } from "../../components/Count";
export default function Area() {
  const { state } = useContext(MyContext);
  const { count } = state;
  return <div>count:{count}</div>;
}
// Buttons.js
import React, { useContext } from "react";
import { MyContext } from "../../components/Count";
const Buttons = () => {
  const { dispatch } = useContext(MyContext);

  return (
    <React.Fragment>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </React.Fragment>
  );
};

export default Buttons;

```

##### `useEffect()`

```jsx
// 接受两个参数，第一个参数是一个执行函数，第二个参数是依赖项，其变化时会执行函数
// 如果不传入第二个参数，则会每次重新渲染都会执行
useEffect(()  =>  {}) 
// 如果第二个参数为空数组，则相当于componentDidMount ,如果传入依赖项，则会在依赖项变化时执行
useEffect(()  =>  {}, [依赖项]) 
// 可以在函数内写return，则会在组价卸载的时候执行return的函数
```

##### `useCallback`  和  `useMemo`

```jsx
import { useState, useMemo, useCallback } from "react";
const set = new Set();
export default function LayOut() {
  const [count, setCount] = useState(0);
  const [val, setVal] = useState(0);

  const countRender = useMemo(() => {
    // 每次count改变触发
    console.log("changeCount");
    return count;
  }, [count]);   
  const valRender = useMemo(() => {
    // 每次 val 改变触发
    console.log("changeVal");
    return val;
  }, [val]);

  const callback = useCallback(() => {
    console.log("count");
  }, [count]);
  set.add(callback);
  return (
    <>
      count:{count}
      <br />
      <button onClick={() => setCount(count + 1)}>count + </button>
      ------------------------------------
      <br />
      <p>{set.size}</p>
      val:{val} <br />
      <button onClick={() => setVal(val + 1)}>val + </button>
      <p> countRender: {countRender}</p>
      <p> valRender: {valRender}</p>
    </>
  );
}
// useMemo 和 useCallback 类似，但 useMemo 返回值， useCallback 返回一个函数，都是为了避免不必要的更新
```

##### `useRef`

```jsx
import React, { useRef, useState } from "react";
export default function LayOut(params) {
  const [count, setCount] = useState(0);
  const useRefCount = useRef();
  const createRef = React.createRef();
  !useRefCount.current && (useRefCount.current = count);
  !createRef.current && (createRef.current = count);
  return (
    <>
      <p>useRefCount:{useRefCount.current}</p>  // 第一次变为1后，每次都是1
      <p>createRef:{createRef.current}</p> // 每次 + 1
      <button onClick={() => setCount((pre) => pre + 1)}>count + </button>
    </>
  );
}
// useRef 在 react hook 中的作用, 正如官网说的, 它像一个变量, 类似于 this , 它就像一个盒子, 你可以存放任何东西
// createRef 每次渲染都会返回一个新的引用，而 useRef 每次都会返回相同的引用

```



#### react-saga

#### 项目配置less

1. `webpack.config.js`

   ```jsx
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

3. 如果还是报错,请将`less-loader===>5.0.0`

#### 路径别名

```jsx
// webpack.config.js
// 1 .
const pathResolve = (url) => {
  return path.join(__dirname, url);
};

// 2. 例：
'@': pathResolve('../src')
```

#### 解决兼容性

```jsx
// 兼容IE浏览器
// npm i react-app-polyfill --save
// 入口文件中顶部
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
```

### React 17

### React和Vue的区别

##### 相同点

- 虚拟DOM，数据驱动，组件化

##### 不同点：

- react使用fiber算法，vue采用diff算法

- react  jsx语法，vue 推荐html模板

- react 是单向数据流，vue双向数据绑定

- react  MVC，vue MVVM

##### React-Hook和Vue compositionApi 的区别

### umi

### dva

[个人网站持续更新](http://remons.gitee.io/)