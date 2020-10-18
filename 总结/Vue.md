

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

#### 为什么data中定义初始值是对象而不是其他值

#### 双向数据绑定的原理

#### watch和computed的区别

- watch：监听属性
- computed：计算属性

#### 组件通信

- 父子组件通信
- 非父子组件通信

#### 封装组件的思路

#### 路由的配置

#### 路由守卫及执行顺序

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

#### keep-alive

#### component is

#### assets和static的区别

------

### Vue3.0

#### 组合 API

#### 生命周期的变化

------

### Vite

