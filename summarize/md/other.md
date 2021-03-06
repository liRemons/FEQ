### 性能优化

#### HTML 和 CSS

精灵图、雪碧图、回流和重绘，少用计算属性

#### 通用

- CDN引入，虚拟长列表，路由懒加载，图片及组件懒加载

- 打包优化，压缩CSS、JS、图片，去除console及注释

- 首屏优化，减少首屏加载时间，预加载

- 合理使用缓存，减少http请求

- 常用函数封装，减少冗余代码

- 加载 loading 及骨架屏，优化用户体验

- 避免过多操作DOM

- 定时器等操作及时销毁

- 唯一 id 作为 key


#### Vue

- 路由懒加载
- 按需引入
- keep-alive

#### React

- 使用纯组件 `PureComponent` 作为基类
- 使用 `React.memo` 高阶函数包装组件
- 使用 `shouldComponentUpdate` 生命周期函数来自定义渲染逻辑
- 使用 `useMemo`
- 使用 `useCallBack`

### 状态码

<a href="https://blog.csdn.net/banana960531/article/details/85621865" target="_blank">参考资料</a>

### 缓存

https://juejin.cn/post/6844903593275817998

浏览器和服务器使用缓存的原理

### 浏览器的渲染过程

#### 输入URL后发生了什么

- 解析URL，查看是否有缓存
- DNS解析域名
  - 浏览器缓存解析
  - 本地文件解析
  - ......
- TCP链接建立(三次握手)
- 客户端发起请求
- 渲染页面
- TCP链接释放（四次挥手）

#### 解析和渲染过程

浏览器接收到请求的文件后，会进行解析

构建DOM，解析CSS和执行JS脚本，注意,CSS会阻塞JS的解析，JS会阻塞DOM的解析，也就是说，当遇到script标签时，会暂停DOM的解析，直至JS脚本解析完成才会继续。

- 解析DOM节点，生成DOM树
- 解析CSSOM，生成CSS规则树
- 渲染阻塞，解析JS脚本
- 渲染层布局和绘制

#### 重绘和回流

- 回流(重排)：渲染树中的元素尺寸布局或位置等改变需要重新构建
- 重绘：渲染树中的属性更新，但仅仅只影响外观风格而不影响布局
- 回流必将引起重绘，而重绘不一定会引起回流
- 触发回流：添加或删除元素、元素位置或尺寸变化、窗口尺寸变化、元素内容变化

### 请求

#### 三次握手和四次挥手

<a href="https://juejin.cn/post/6844904194764177416" target="_blank">参考资料</a>

- 三次握手(TCP链接建立)

  - 客户端发送请求报文到服务端：服务端接收后表示两者连接正常
  - 服务端发送请求报文，表示自己收到了客户端发送的请求报文：但此刻服务端无法得知客户端接收是否正常
  - 客户端发送请求报文：表示接收正常，此时双发收发都是正常的

- 四次挥手(TCP链接释放)

  - 客户端断开连接，向服务端发送报文准备关闭
  - 服务端收到连接，向客户端发送请求报文，表示自己收到了断开的请求，同时将自己的状态变为关闭等待
  - 等待一段时间，向客户端发送一个报文，自身进入确认状态，等待客户端
  - 客户端收到服务端关闭的确认，向服务端发送报文，将自身关闭，此时，客户端和服务端断开连接

  

### AMD 、CMD 、CommonJS

#### CommonJS 

- 模块必须通过 module.exports 导出对外的变量或者接口
- 浏览器外部环境，通过 require() 来导入
- node.js 遵循的是 CommonJS 的规范
-  对模块的加载时同步的

#### AMD

- AMD 主要是为前端 js 的表现指定的一套规范

- 采用的是异步的方式进行模块的加载
- 也是采用 require() 语句加载模块
- requireJs 遵循的就是 AMD 规范；
- 依赖前置、提前执行

#### CMD

- CMD 的加载就近规则、延迟执行

### 如何理解函数式编程

### 如何进行人员权限的管理

### 前端安全问题

#### XSS

跨站脚本攻击

#### CSRF 

跨站请求伪造

### 移动端兼容问题

#### 300ms延迟

```javascript
import Fastclick from "fastclick";
FastClick.attach(document.body);
```

#### IOS `fixed`定位失效

```css
/** 使用 flex + absolute **/
.box {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.nav {
  background: rgba(255, 255, 255, 0.363);
}
.main {
  flex: 1;
  overflow-y: auto;
}
```

#### 软键盘弹起遮挡

封装公共方法，使用 JS 设置高度，使元素滚动到相应位置

```javascript
window.addEventListener('resize', function () {
  if (
    document.activeElement.tagName === 'INPUT' ||
    document.activeElement.tagName === 'TEXTAREA'
  ) {
    window.setTimeout(function () {
      if ('scrollIntoView' in document.activeElement) {
        document.activeElement.scrollIntoView();
      } else {
        document.activeElement.scrollIntoViewIfNeeded();
      }
    }, 0);
  }
});
```

#### 点击边框

```css
-webkit-user-drag: none;
-webkit-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
-webkit-tap-highlight-color: rgba(0,0,0,0);
-webkit-tap-highlight-color: transparent; /* For some Androids */
-webkit-user-modify: read-write-plaintext-only;  /* android 4.0.4 */
```

#### 1px边框

```css
.elem {
    position: relative;
    width: 200px;
    height: 80px;
    &::after {
        position: absolute;
        left: 0;
        top: 0;
        border: 1px solid #f66;
        width: 200%;
        height: 200%;
        content: "";
        transform: scale(.5);
        transform-origin: left top;
    }
}
```

#### `input`的`placeholder`偏上

```css
input {
    line-height: normal;
}
```



[个人网站持续更新](http://remons.gitee.io/)