#### 数据的类型有哪些

- 数据类型	
  - 基本类型：undefined、NULL 、Number、Boolean、String、Symbol（es6 新增）
  - 复杂类型：Object

- 检测数据类型的方法

  1. typeof

     ```javascript
     console.log(typeof 123); //number
     console.log(typeof 'abc'); //string
     console.log(typeof true); //boolean
     console.log(typeof undefined); //undefined
     console.log(typeof null); //object
     console.log(typeof [1,2,3]); //object
     console.log(typeof {a:1,b:2,c:3}); //object
     console.log(typeof function(){}); //function
     console.log(typeof Symbol()); //symbol
     console.log(typeof BigInt('1'));//bigint(BigInt是ES2020新增内置对象)
     ```

  2. instanceof

     ```javascript
       function A(){}
       function B(){}
       var c = new A()
       console.log(c instaceof A) //true   Object.getProtypeOf(c) === A.prototype
       console.log(c instaceof B) //false   B.prototype 不在c 的原型链上
     ```
  
  3. constructor

     ```javascript
     let num = 123;
     console.log(num.constructor); //ƒ Number() { [native code] }
     console.log(''.constructor); //ƒ String() { [native code] }
     console.log(true.constructor); //ƒ Boolean() { [native code] }
     console.log([].constructor); //ƒ Array() { [native code] }
     console.log({}.constructor); //ƒ Object() { [native code] }
     console.log(function(){}.constructor); //ƒ Function() { [native code] }
     console.log(new Date().constructor); //ƒ Date() { [native code] }
     console.log(new RegExp().constructor); //ƒ RegExp() { [native code] }
     console.log(Symbol().constructor); //ƒ Symbol() { [native code] }
     ```
  
  4. Object.prototype.toString.call().slice(8,-1)
  
     ```javascript
     // 原理：
     const checkType = (val) => {
       let type = Object.prototype.toString.call(val).slice(8, -1);
       console.log(type)
     }
     checkType('')//String
     checkType(null)//Null
     checkType([])//Array
     checkType({})//Object
     checkType(function () { })//Function
     checkType(new RegExp())//RegExp
     checkType(new Date())//Date
     checkType(undefined)//Undefined
     checkType(1)//Number
     checkType(Symbol())//Symbol
     checkType(true)//Boolean
     ```

#### 堆栈的理解

栈存放的是基本类型数据，简单数据类型，堆存放的是引用类型的数据，复杂数据类型，当let 或者 const 时，会遍历栈，没有会添加，否则报错。当然，const定义的常量，也就是指针，指向栈中的地址，改变这个指针是不被允许的，但改变对象中的值并不会改变它的指针，是可以的

#### `object.is()`、"`==` " 、 " `===` "的区别

- "`==`"先进行类型转换，再判断是否相等
- "`===`",类型相等才相等
- `object.is()` 与"`===`"基本一致，不过有两点不同：(NAN和NAN相等)；+0和-0不相等

#### 数组的方法

##### `Array.from()`

```javascript
// 1.
Array.from('abc')//['a','b','c']
// 2.
let arr=[1,2,3];
Array.from(arr,(item)=>{console.log(item)})//1,2,3
```

<font size="2" face="arial">【**返回值**】：新的数组实例</font>

##### `Array.isArray()`

<font size="2" face="arial">【**作用**】：判断是否为数组.</font>

```javascript
Array.isArray([1]) //true
```

<font size="2" face="arial">【**返回值**】：布尔值.</font>

##### `Array.of()`

<font size="2" face="arial">【**作用**】：生成数组</font>

```javascript
Array.of(1)//[1]    创建新的数组，参数是任意类型
```

<font size="2" face="arial">【**返回值**】：新的数组实例</font>

##### `concat()`

<font size="2" face="arial">【**作用**】：合并数组</font>

```javascript
  let arr=[1,2],arr2=[3,4],arr3=[5,6];
  let newArr=arr.concat(arr2,arr3) //[1,2,3,4,5,6]
  console.log(arr) //[1,2]
```

<font size="2" face="arial">【**返回值**】：新的数组实例，不改变原数组</font>

##### `every()`

<font size="2" face="arial">【**作用**】：数组中所有元素是否都满足条件</font>

```javascript
let arr=[1,2,3];
arr.every(item => item > 1)//false
arr.every(item => item > 0)//true
```

<font size="2" face="arial">【**返回值**】：布尔值</font>

##### `filter()`

<font size="2" face="arial">【**作用**】：获取数组中满足条件的元素</font>

```javascript
let arr=[1,2,3];
let newArr=arr.filter(item => item > 1) //[2,3]
```

<font size="2" face="arial">【**返回值**】：满足条件的元素数组，不改变原数组</font>

##### `find()`

<font size="2" face="arial">【**作用**】：查找数组中符合条件第一个元素的值</font>

```javascript
let arr=[1,2,3],arr2=[{val:1},{val:2},{val:3}];
arr.find(item => item >= 1)//1
arr2.find(item => item.val > 1) //{val:2}
//和filter的区别：find方法返回符合条件的第一个元素，filter则是返回符合条件的所有元素，返回新的数组
```

<font size="2" face="arial">【**返回值**】：符合条件的元素，不改变原数组</font>

##### `findIndex()`

<font size="2" face="arial">【**作用**】：查找数组中满足条件的第一个元素的索引</font>

```javascript
let arr=[1,2,3];
arr.findIndex(item => item > 1) // 1
arr.findIdnex(item => item > 4) //-1
```

<font size="2" face="arial">【**返回值**】：第一个符合条件的索引，没有则返回 -1</font>

##### `flat()`

<font size="2" face="arial">【**作用**】：数组扁平化</font>

```javascript
let arr = [1, 2, [3, 4]];
arr.flat() //[1, 2, 3, 4]
let arr1=[1,[2,[3]]]
arr1.flat(2) // [1, 2, 3];
//使用 Infinity，可展开任意深度的嵌套数组
arr1.flat(Infinity) //[1, 2, 3]
```

<font size="2" face="arial">【**返回值**】：新的数组，不改变原数组</font>

##### `forEach()`

<font size="2" face="arial">【**作用**】：遍历数组</font>

<font size="2" face="arial">【**返回值**】：无返回值</font>

##### `includes()`

<font size="2" face="arial">【**作用**】：查找数组中是否包含某一项</font>

```javascript
let arr=[1,2,3];
arr.includes(2) //true
let arr2=[1,2,1,3,4,5,6];
// 第二个参数为查找的索引起始位置（包含），为负数则从后向前的绝对值
arr2.includes(2,1) //true
arr2.includes(2,2) //false
arr2.includes(2,-6) //true
let str='abc';
// 也可以查找字符串是否包含某个字符
str.includes('a') //true
```

<font size="2" face="arial">【**返回值**】：布尔值</font>

##### `indexOf()`

<font size="2" face="arial">【**作用**】：数组中（字符串）包含指定元素的第一个索引</font>

```javascript
// 特别说明
// indexOf的第二个参数,从第几个开始，为负数则从后向前
let arr=[1,2,3,2];
arr.indexOf(2,2) // 3 
arr.indexOf(2,5) // -1 为正数的时候，如果大于length，则返回-1
arr.indexOf(2,-3) // 1 
arr.indexOf(2,-5) // 1 如果绝对值大于length，则从数组第一项开始找
```

<font size="2" face="arial">【**返回值**】：索引值或 -1 </font>

##### `join()`

<font size="2" face="arial">【**作用**】：将数组分割成字符串并进行连接</font>

<font size="2" face="arial">【**返回值**】：字符串，不改变原数组</font>

##### `lastIndexOf()`

<font size="2" face="arial">【**作用**】：数组（字符串）中最后一个指定元素的索引</font>

```javascript
//特别说明
//lastIndexOf第二个参数
let arr=[1,2,3,2];
arr.lastIndexOf(2,2) // 1 正数为查找到第几个索引为止
arr.lastIndexOf(2,-3) //1 负数为从后向前，查找到第几个索引（绝对值），大于length则返回 -1 
```

<font size="2" face="arial">【**返回值**】：索引值或 -1 </font>

##### `map()`

<font size="2" face="arial">【**作用**】：遍历数组</font>

<font size="2" face="arial">【**返回值**】：元素执行函数后组成的新数组 </font>

##### `pop()`

<font size="2" face="arial">【**作用**】：删除数组的最后一项</font>

<font size="2" face="arial">【**返回值**】：删除的元素，改变原数组 </font>

##### `push()`

<font size="2" face="arial">【**作用**】：数组后添加一或多项</font>

<font size="2" face="arial">【**返回值**】：数组的长度，改变原数组 </font>

##### `shift()`

<font size="2" face="arial">【**作用**】：删除数组第一项</font>

<font size="2" face="arial">【**返回值**】：删除的元素，改变原数组 </font>

##### `unshift()`

<font size="2" face="arial">【**作用**】：数组前添加一项或多项</font>

<font size="2" face="arial">【**返回值**】：数组的长度，改变原数组 </font>

##### `reduce()`

##### `reverse()`

<font size="2" face="arial">【**作用**】：翻转数组</font>

<font size="2" face="arial">【**返回值**】：翻转后的数组，改变原数组 </font>

##### `slice()`

<font size="2" face="arial">【**作用**】：返回数组或字符串的一部分</font>

```javascript
let arr=[1,2,3,4]
arr.slice() // [1,2,3,4]
arr.slice(2) //[3]
arr.slice(4) // []
arr.slice(-2) // [3,4] 如果该参数为负数，表示从原数组中的倒数第几个元素开始提取到最后一个
arr.slice(2,3)//3 不包含end
```

<font size="2" face="arial">【**返回值**】：新数组或新的字符串，不改变原数组 </font>

##### `some()`

<font size="2" face="arial">【**作用**】：数组中是否有元素满足传入的函数条件</font>

<font size="2" face="arial">【**返回值**】：布尔值 </font>

##### `sort()`

<font size="2" face="arial">【**作用**】：数组排序</font>

> 如果指明了 fn，那么数组会按照调用该函数的返回值排序。即 a 和 b 是两个将要被比较的元素：
>
> 如果 fn(a, b) 小于 0 ，那么 a 会被排列到 b 之前；
> 如果 fn(a, b) 等于 0 ， a 和 b 的相对位置不变。
> 如果 fn(a, b) 大于 0 ， b 会被排列到 a 之前。
> fn(a, b) 必须总是对相同的输入返回相同的比较结果，否则排序的结果将是不确定的。

<font size="2" face="arial">【**返回值**】：新数组，改变原数组 </font>

##### `splice()`

<font size="2" face="arial">【**作用**】：删除或替换现有元素或者原地添加新的元素来修改数组</font>

```javascript
let arr = [1,2,3,4];
arr.splice(2) // [3,4] //arr:[1,2]
arr.splice(-2) // [3,4] //arr:[1,2]
arr.splice(2,2) // [3,4] //arr:[1,2]
arr.splice(2,0,2)//[] //arr:[1,2,2,3,4]
arr.splice(2,1,2) // [] arr:[1,2,2,4]
```

<font size="2" face="arial">【**返回值**】：被删除元素组成新数组，改变原数组 </font>

##### `toString()`

<font size="2" face="arial">【**作用**】：将数组转换成字符串</font>

`和join()的区别：join()可以指定连接符`

<font size="2" face="arial">【**返回值**】：字符串，不改变原数组</font>

#### 对象的方法

-  **`Object.assign()`**

  将一个或多个源对象复制到目标对象中，且源对象会随之改变

  当复制的对象的属性值为简单数据类型时，为深拷贝，当复制的属性值为复杂数据类型时，为浅拷贝

#### 函数提升和变量提升

es6之前没有块级作用域

- 变量提升

  ```javascript
  console.log(v1);       //undefined
  var v1 = 100;
  function foo() {
      console.log(v1);   //undefined
      var v1 = 200;     
      console.log(v1);   //200
  }
  foo();
  console.log(v1);       //100
  
  //其实类似于下面的
  var v1;
  console.log(v1);
  v1 = 100;
  function foo() {
      var v1;
      console.log(v1);
      v1 = 200;
      console.log(v1);
  }
  foo();
  console.log(v1); 
  ```

- 函数提升

  ```javascript
  //函数声明式
  function bar () {}    //  会提升到该作用域的最顶端，而且高于变量提升。
  //函数字面量式 
  var foo = function () {}  //没有函数提升
  ```

#### ES6新特性

##### let 和 const

区别：let 和 var都是声明变量，let 有块级作用域，同一作用域下不允许重复声明，var 可以；const声明常量，[不可改变](#堆栈的理解)
let 和const 不存在变量提升，var声明变量存在变量提升；

##### 扩展运算符

- `...`   将一个数组转为用逗号分隔的参数序列，可以用来深拷贝数组，合并数组等操作，也可以将字符串转成数组
- 和 `rest` 正好相反

##### 模板字符串

##### Symbol 类型
symbol（表示独一无二的值）
- 首字母大写
- symbol函数前不能使用new，否则会报错，原因在于symbol 是一个原始类型的值，不是对象。
##### Set和Map数据结构

- `Set` 
  - 成员值唯一，不会重复
  - 使用`new Set()`创建一个Set数据结构
  - 不会发生数据类型转换
- `WeakSet`
  - `WeakSet` 结构与 `Set` 类似，也是不重复的值的集合
-  `Map` 
  - 解决JS对象只能用字符串作为键的限制
  - get 和set 方法
- `WeakMap` 
  - `WeakMap`结构与`Map`结构类似，也是用于生成键值对的集合
- `WeakSet `与 `Set `的区别
  - `WeakSet `的成员只能是对象，而不能是其他类型的值
  - `WeakSet `中的对象都是弱引用
- `WeakMap`与`Map`的区别
  - `WeakMap`只接受对象作为键名（`null`除外），不接受其他类型的值作为键名
  - `WeakMap`的键名所指向的对象，不计入垃圾回收机制

##### 箭头函数

- 值得注意，箭头函数的[this](#this的指向)来自父级
- 不能使用arguments对象，该对象在函数体内不存在。
- 不能作为构造函数，不可以使用new命令，否则会抛出一个错误
- 不可使用 yield
- 箭头函数一定是匿名函数

##### 解构赋值

从数组和对象中提取值，对变量进行赋值

##### 函数默认参数

#### 柯里化函数

```javascript
// 柯里化就是把一个需要传入多个参数的函数变成多个嵌套的只要传入一个参数的函数
// 举个简单的例子
function add(a) { 
  return function(b){ 
    return a + b 
  }  
}

add(1)(2)  // 3
```



#### 构造函数

- new 函数名实例化对象的函数，一般首字母大写
- 通过this设置属性和方法
- new做了什么呢：
  - 创建一个新对象；
  - 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象） ；
  -  执行构造函数中的代码（为这个新对象添加属性） ；
  - 返回新对象。

#### 原型和原型链

- 每个对象都有一个`__proto__` ,指向它的 `prototype`原型对象，每个构造函数都有一个`prototype`原型对象，里面的`constructor` 指向这个构造函数本身，当寻找一个属性时，首先在对象上找，如果找不到，则顺着`__proto__`寻找它的 `prototype`对象，一层一层逐级寻找，直到找到并返回，原型链的终点为null
- 原型属性和实例属性



<img src="https://remons.gitee.io/feq/summarize/assets/img/原型.png" alt="原型" style="zoom:75%;" />

[传送门](https://zhuanlan.zhihu.com/p/35790971)

https://segmentfault.com/a/1190000008739672

#### Class

类的数据类型就是函数，类本身就指向构造函数。

class和构造函数使用的区别：

必须使用`new`命令，才能使用类

`static`关键字不会被实例继承

`constructor`方法是类的默认方法，默认返回实例对象（即`this`），通过`new`命令生成对象实例时，自动调用该方法。一个类必须有`constructor`方法，如果没有显式定义，一个空的`constructor`方法会被默认添加。

类里面共有的属性和方法必须使用this访问

class 和 构造函数？

super 关键字的理解

#### 继承

```javascript
function Father(name) {
    //属性
    this.name = name || 'Annie'
    //实例方法
    this.sleep = () => {
        console.log('名字：'+this.name)
    }
}
//原型方法
Father.prototype.eat = function (food) {
    console.log(this.name + '正在吃：' + food);
}
```

- 原型链继承

  ```javascript
  let Son = function () {};
  Son.prototype = new Father() // 创建实例时父类构造函数中传参数无效
  Son.prototype.name = 'Remons'
  let child = new Son() 
  child.sleep() // 名字：Remons
  ```

- 构造函数继承

  ```javascript
  function Son(name) {
      Father.call(this);
      this.name = name
  }
  let Child = new Son('Remons')
  Child.sleep() // 名字：Remons
  // 无法继承父级原型上的方法和属性  Child.eat is not a function
  ```

- 原型继承

  ```javascript
  function Son(name) {
      let this_ = new Father()
      this_.name = name;
      return this_
  }
  let Child = new Son('Remons') 
  Child.sleep() // 名字：Remons
  ```

- Class继承

  ```javascript
  class Father{
      constructor(x,y){
          this.x=x;
          this.y=y
      }
      sum(){
          return this.x + this.y
      }
  }
  class Son extends Father{
      constructor(x,y){
          super(x,y) // 必须先使用super，才能访问this，用来调用父类的属性和方法
      }
  }
  let sum=new Son(5,6)
  console.log(sum.sum()) // 11
  ```

#### this的指向

- 如果一个函数中有this，这个函数被上一级的对象所调用，this指向上一级的对象
- 如果一个函数中有this，这个函数中包含多个对象，尽管这个函数是被最外层的对象所调用，this指向上一级的对象
- this永远指向的是最后调用它的对象
- 箭头函数的this指向父级
- 如何改变this指向
  - call 、apply、bind  区别：call和bind挨个传值，apply传一个数组，call和apply会直接执行这个函数，bind 返回绑定this之后的函数，调用时执行

#### Event-loop、事件队列、微任务和宏任务

![](https://remons.gitee.io/feq/summarize/assets/img/异步任务队列.png)

常见的宏任务：setTimeout , setInterval

常见的微任务Promise.then,catch,finally

Even-loop:![](https://remons.gitee.io/feq/summarize/assets/img/事件循环.png)

在执行完同步任务后，会执行任务队列中的微任务，微任务执行完后，会执行任务队列中的宏任务，宏任务会一个一个的执行，重复过程

#### JS中的异步

- promise

  - `then()`

    ```javascript
    Promise.resolve().then(function success (res) {
      throw new Error('error')
    }, function fail1 (e) {
      console.error('fail1: ', e)
    })
    .catch(function fail2 (e) {
      console.error('fail2: ', e)
    })
    //then 可以接收两个参数，第一个是处理成功的函数，第二个是处理错误的函数。.catch 是 .then 第二个参数的简便写法，但是.then 的第二个处理错误的函数捕获不了第一个处理成功的函数抛出的错误，而后续的 .catch 可以捕获之前的错误。
    ```

  - `catch()`

  - `finally()` 无论状态如何，都会执行，且不接受任何参数

  - `all()`

    ```javascript
    let p1 = new Promise(resolve => {
        resolve('a')
    })
    let p2 = new Promise(resolve => {
        setTimeout(() => {
            resolve('b')
        }, 3000);
    })
    
    let p3 = new Promise((resolve, reject) => {
        reject('error')
    })
    function promiseFn(arr) {
        Promise.all(arr).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err)
        })
    }
    
    promiseFn([p1, p2, p3]) //error
    promiseFn([p1, p2]) //3s后：['a','b']
    //可以看出Promise.all接受一个由promise对象组成的数组，当所有状态都变为resolve时触发then(),参数为每个promise对象返回值组成的数组；有一个为reject的时候，都会触发catch回调
    // 问题：all 返回的顺序问题？
    ```

  - `allSettled()`

    ```javascript
    let p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('aaa')
        }, 1000);
    })
    
    let p2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('aaa')
        }, 2000);
    })
    
    Promise.all([p1, p2]).then(res => {
        console.log(res , 'then all');
    }).catch(res => {
        console.log(res, 'error all');   // error all
    })
    Promise.allSettled([p1, p2]).then(res => {
        console.log(res,'then allSettled');  // 数组
    }).catch(res => {
        console.log(res, 'error allSettled');
    })
    
    // 由此看出 allSettled 和 all 的区别：
    // allSettled : 无论每一个Promise状态如何，都会返回一个携带状态数组
    // all 都成功返回成功，否则 catch
    ```
    
  - `race()`

    ```javascript
    let p1 = new Promise(resolve => {
        setTimeout(() => {
            resolve('a')
        }, 10);
    })
    let p2 = new Promise(resolve => {
        resolve('b')
    })
    let p3 = new Promise((resolve, reject) => {
        reject('err')
    })
    function promiseFn(arr) {
        Promise.race(arr)
            .then(res => { console.log(res) }
            .catch(err => { console.log(err) })
    }
    promiseFn([p1, p3, p2]) //err
    promiseFn([p1, p2, p3]) //b
    //race接受一个promise对象组成的数组，里面谁的状态先改变就先触发回调（无论状态如何）
    ```

- async await

  ```javascript
  async function async1() {
       console.log('async1 start')
       await async2()
       console.log('async1 end')
  }
  async function async2() {
      console.log('async2')
  }
  console.log('script start')
  setTimeout(()=>{
      console.log('setTimeout')
  }, 0)
  async1();
  new Promise(resolve=> {
      console.log('promise1')
      resolve();
  }).then(()=> {
      console.log('promise2')
  })
  console.log('script end')
  //script start   async1 start  async2   promise1   script end   async1 end   promise2   setTimeout
  ```

  本质上是Generator和Promise的语法糖，将异步的变为同步的写法，更加优雅；await 关键字只在async函数内有效，且阻塞代码执行

- Generator/ yield

    ```javascript
    function* gen(x){
      let y = yield x + 2;
      return y;
    }
    // yield 会阻断代码执行
    // 直接调用 函数并不会返回计算结果，会返回一个指针
    // gen(1).next()   // 3
    ```

    

#### 跨域

- 跨域的产生

  浏览器的安全机制，阻止两个不同域进行交互，也就是同源策略，端口不同，域名不同，协议不同，三者都可造成跨域

- 如何解决跨域

  - JSONP
  - CORS
  - 代理（原理）
  - 后端配置

#### fetch、axios、ajax

- ajax(四部曲)

  ```javascript
  //1）创建ajax对象
  xhr = new XMLHttpRequest
  //2）规定请求地址
  xhr.open(method,url,async)
  //3）等待服务器相应
  xhr.onload
  //4）向服务器发送请求
  xhr.send()
  ```

  

#### 事件冒泡、事件捕获、事件委托

事件流分为三个阶段：事件捕获=>目标阶段=>事件冒泡

事件冒泡：从最具体的元素到最不具体的元素

事件捕获：从最不具体的元素到最具体的元素

当然，默认是事件冒泡

事件委托：将子元素的事件委托给父元素执行（当子元素过多时，委托为父元素执行，也可以提高性能，减少事件注册，节约内存）

#### 深浅拷贝

-   问题由来：深浅拷贝针对于引用类型来说的，基本类型的值是存放在栈内存中，当复制一个基本类型的值是，会额外开辟一个地址，赋予相同的值；而引用类型将地址存放在栈中，值存储在堆内存中，两者相互关联，当复制时，复制的是栈内存中的地址，它们指向同一堆内存中的值，所以当改变值时，原来的值也会改变。

- 常用的深拷贝：
  - `JSON.parse(JSON.stringify())`  缺点：属性值的类型为undifind，正则或者函数时，无法正确拷贝

```javascript
const deepCopy = (data) => {
    function checkType(val) {
        return Object.prototype.toString.call(val).slice(8, -1);
    }
    let BaseType = [
        'Null',
        'String',
        'Boolean',
        "Number",
        'Undefined',
        'Function'
    ]
    if (BaseType.includes(checkType(data))) {
        return data
    }
    if (checkType(data) === 'RegExp') return new RegExp(data);
    if (checkType(data) === 'Date') return new Date(data);
    let newData = checkType(data) === 'Array' ? [] : {}
    for (let key in data) {
        newData[key] = deepCopy(data[key])
    }
    return newData
}
```

- 浅拷贝
  - `concat()`
  - `slice()`
  - `Object.assign()`

#### 闭包

闭包让你可以在一个内层函数中访问到其外层函数的作用域

函数嵌套函数

可以避免全局变量的污染

但它的变量常驻内存，不会被垃圾回收机制回收，滥用闭包有可能造成内存泄露

#### 防抖节流

- 防抖（例：滚动条）

  ```javascript
  const debonce = (fn, delay) => {
      let time = null
      return () => {
          if (time) {
              clearTimeout(time)
          }
          time = setTimeout(fn, delay);
      }
  }
  const scroll = () => {
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      console.log(scrollTop)
  }
  window.onscroll = debonce(scroll, 1000) // 每隔 1s 输出
  ```

- 节流：一段时期内重复触发事件只会执行一次

#### Object.defineProperty和Proxy的区别

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

可以看出，Vue3.0对性能是有很大提升的，在Object.defineProperty方法中，需要对每个属性进行递归监听，不但浪费性能，而且如果初始值中没有定义相关属性，就无法进行监听，这也就是Vue2.0中新增属性不会在视图发生变化，从而必须使用$set进行新增属性的原因

#### 事件兼容

- 取消事件冒泡：
  - IE下取消冒泡： ev.cancelBubble=true;
  - 标准取消冒泡： ev.stopPropagation();

- 阻止浏览器默认行为：
  -  ev.preventDefault(); 标准浏览器阻止默认事件,DOM事件使用此方法取消默认事件。
  - ev.returnValue = false; 非标准浏览器（IE8）阻止默认事件
  -  return false;  退出执行, 所有触发事件和动作都不会被执行. 可以用来替代 preventDefault

- 事件监听器：（可以绑定多个函数在一个对象上）
  - target.addEventListener("事件类型", 函数, 是否捕获(布尔值))--标准浏览器事件监听
  - target.removeEventListener()--标准浏览器取消监听
  - target.attachEvent("事件类型",函数) --IE浏览器事件监听
  - target.detachEvent() --IE浏览器取消监听

> 注意：移除事件监听的参数和添加事件监听的参数是一致的。

- 滚动条距离
  - document.documentElement.scrollTop
  - document.body.scrollTop

#### 设计模式

#### 高阶函数

接受或返回另一个函数称为高阶函数，常见的map，filter......

#### 数组去重

- 基本数据类型可以用 `new Set()`
- 数组对象可以用 `reduce()`
- ES6之前可以用循环等方法

#### 数组排序

- `sort`
- 冒泡排序
- 快速排序

#### 数组扁平化

- `flat()`

#### DOM 

- 文档对象模型：用来描绘一个层次化的节点树，允许开发人员获取、添加、移除、修改页面的某一部分元素

  * 获取节点
    
  ```javascript
  getElementById('id') //：获取特定ID元素的节点
  getElementsByTagName('p') //：获取相同元素的节点列表，返回类数组，使用[0]来获取
  getElementsByClassName('class') //：获取相同类名的节点列表（IE8以下不支持），返回类数组
  querySelecter('.class') //：通过选择器获取元素
  querySelecterAll('.class') //：通过选择器获取元素，可获取多个元素
  firstChild() 
  llastChild()
  childNodes()
  previousSibling()
  nextSibling()
  document.documentElement //: 获取html标签元素
  document.body //：获取html标签元素
  ```


  * 节点操作

    ```javascript
    // 创建节点
    createElement
    createAttribute
    createTextNode
    //插入节点
    appendChild  
    insertBefore
    //替换节点
    repalceChild
    //删除节点
    removeChild
    //复制节点
    cloneNode
    ```

  * 属性操作

    ```javascript
    //获取属性
    getAttribute
    //设置属性
    setAttribute
    //删除属性
    removeAttribute
    ```

  * 文本操作
    
    ```javascript
    insertData(offset,String)
    appendData(string)
    deleteData(offset,count)
    replaceData(offset,count,string)
    splitData(offset)
    substring(offset,count)
    ```

#### BOM 

- 浏览器对象模型：用于描述与浏览器进行交互的方法和接口

  ```javascript
  document //对象
  location //对象
  href//属性：控制浏览器地址栏的内容
  	reload(true)//方法：刷新页面，如果参数为true，通过缓存刷新
  	navigator// 对象
  	userAgent//：用户代理信息，该属性可获取浏览器及操作系统信息
  screen// 对象
  window //对象（核心，既是通过js访问浏览器窗口的一个接口，又是ECMAScript规定的全局对象）
  //内置对象和方法：
  //常用事件：
  onload//：页面内容加载完成（DOM结构，图片）
  onscroll//: 拖动浏览器的滚动条触发此事件
  onresize//： 浏览器窗口缩放所触发的事件
  //可视区的宽高：
  document.documentElement.clientWidth
  document.documentElement.clientHeight
  ```

#### 一些JS新特性

##### `IntersectionObserver`

##### `scrollIntoView`

[个人网站持续更新](http://remons.gitee.io/)