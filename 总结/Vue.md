

## Vue

### Vue2.0和Vue3.0的变化

#### Vue2.0中Object.defineProperty 和 Vue3.0中proxy

```javascript
let obj = { name: [] };
// proxy
obj = new Proxy(obj, {
    get(target, prop) {
        return target[prop]
    },
    set(target, prop, val) {
        target[prop] = val
    }
})
// Object.defineProperty
let newObj = JSON.parse(JSON.stringify(obj))
Object.defineProperty(obj, 'name', {
    get() {
        return newObj.name
    },
    set(val) {
        newObj.name !== val && (obj.name = val)
    }
})
```

可以看出，Vue3.0对性能的提升是有很大提升的，在Object.defineProperty方法中，需要对每个属性进行递归监听，不但浪费性能，而且如果初始值中没有定义相关属性，就无法进行监听，这也就是Vue2.0中新增属性不会在视图发生变化，从而必须使用$set进行新增属性的原因

------

### Vue2.0

#### 为什么data是个函数

如果两个实例引用同一个对象，当其中一个实例的属性发生改变时，另一个实例属性也随之改变，只有当两个实例拥有自己的作用域时，才不会相互干扰，也就是不会有变量污染

#### 双向数据绑定的原理，如何自定义v-model

Vue2.0: 采用数据劫持结合发布者-订阅者模式的方式，通过`Object.defineProperty()`来劫持各个属性的`setter`，`getter`，在数据变动时发布消息给订阅者，触发相应的监听回调

[实现双向数据绑定](https://www.cnblogs.com/canfoo/p/6891868.html)

- 自定义v-model

  ```html
  <!-- 父组件注册并使用 -->
  <k-input v-model="search" placeholder="请输入搜索关键词"></k-input>
  <!-- 子组件 -->
  <input type="text" :value="value" @input="handleInput" />
  ```

  ```javascript
  //子组件
  export default {
    name: "kInput",
    model: {
      prop: "value",
      event: "input",
    },
    props: ["value"],
    methods: {
      handleInput(e) {
        this.$emit("input", e.target.value);
      },
    },
  };
  ```

#### watch和computed的区别

- watch：监听属性  依赖缓存，只有当依赖发生变化的时候才会重新计算，同时监听多个数据时推荐使用
  - immediate：立即执行
  - deep：深度监听
- computed：计算属性  数据改变立即触发

#### 组件通信

- 父子组件通信

  - 父----->子：props传值，子组件props接收
  - 子----->父：$emit()调用父组件传递的方法并携带参数给父组件

- 非父子组件通信

  - bus事件总线

  - provide / inject

    ```javascript
    //祖先组件
    provide:{
        provideData:"hello"
    }
    //后代组件
    //1.
    inject:["provideData"]
    //2. 
    inject:{
        provideData:{
            from:"provideData",
            default:"hello"
        }
    }
    ```

  - [Vuex](#Vuex)

#### 封装组件的思路

#### 路由的配置

#### 路由守卫及执行顺序

#### 如何进行权限管理

#### 路由模式有哪些，区别是什么

- hash
- history

#### route 和 router 的区别

#### mixin

#### 事件修饰符

#### 生命周期

#### v-if 和 v-show 的区别

v-if:不渲染，意思就是压根就没有这个元素

v-show:  `display:none`

#### v-if 和 v-for 的优先级（2.0版本）

v-for 的优先级更高，但一般不建议两者同时使用

#### v-for 中为什么传入 key 

#### Vue中进行跨域请求

#### 请求的封装

#### Vuex

#### diff算法

#### 封装自定义指令

#### slot

#### Vue性能优化

- 事件委托
- 路由懒加载
- 按需引入
- 组件复用

#### 环境变量配置

#### MVVM 和 MVC

- MVVM（[实现](#Vue2.0中Object.defineProperty 和 Vue3.0中proxy))
  - Model:数据模型
  - View:视图
  - ViewModel:模型与视图做了一层绑定关系
- MVC
  - Model:数据模型
  - View:视图
  - Controller:数据模型与View之间的桥梁层

#### keep-alive

#### component is

#### assets和static的区别

------

### Vue3.0

#### 组合 API

#### 生命周期的变化

------

### Vite

