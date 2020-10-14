## JS（非框架）

#### 数据的类型有哪些

- 数据类型	
  - 基本类型：undefined、NULL 、Number、Boolean、String
  - 复杂类型：Object、Symbol

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
     ```

  2. instanceof

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

     [^]: 觉得这是最好的方式

     ```javascript
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

- "`===`"先进行类型转换，再判断是否相等
- "`===`",类型相等才相等
- `object.is()` 与"`===`"基本一致，不过有两点不同：(NAN和NAN相等)；+0和-0不相等

#### 数组的方法

- **Array.from()**  

  ```javascript
  // 1.
  Array.from('abc')//['a','b','c']
  // 2.
  let arr=[1,2,3];
  Array.from(arr,(item)=>{console.log(item)})//1,2,3
  ```

  <font size="2" face="arial" color="#666">【**返回值**】：新的数组实例</font>

- **Array.isArray()** 

  <font size="2" face="arial" color="#666">【**作用**】：判断是否为数组.</font>

  ```javascript
  Array.isArray([1]) //true
  ```

  <font size="2" face="arial" color="#666">【**返回值**】：布尔值.</font>

- **Array.of()**   

  <font size="2" face="arial" color="#666">【**作用**】：生成数组</font>

  ```javascript
  Array.of(1)//[1]    创建新的数组，参数是任意类型
  ```

  <font size="2" face="arial" color="#666">【**返回值**】：新的数组实例</font>

- **concat()**

  <font size="2" face="arial" color="#666">【**作用**】：合并数组</font>
  
```javascript
  let arr=[1,2],arr2=[3,4],arr3=[5,6];
  let newArr=arr.concat(arr2,arr3) //[1,2,3,4,5,6]
  console.log(arr) //[1,2]
  ```
  
<font size="2" face="arial" color="#666">【**返回值**】：新的数组实例，不改变原数组</font>
  
- **every()**

  <font size="2" face="arial" color="#666">【**作用**】：数组中所有元素是否都满足条件</font>

  ```javascript
  let arr=[1,2,3];
  arr.every(item => item > 1)//false
  arr.every(item => item > 0)//true
  ```

  <font size="2" face="arial" color="#666">【**返回值**】：布尔值</font>

- **filter()**

  <font size="2" face="arial" color="#666">【**作用**】：获取数组中满足条件的元素</font>

  ```javascript
  let arr=[1,2,3];
  let newArr=arr.filter(item => item > 1) //[2,3]
  ```

  <font size="2" face="arial" color="#666">【**返回值**】：满足条件的元素数组，不改变原数组</font>

- **find()**

  <font size="2" face="arial" color="#666">【**作用**】：查找数组中符合条件第一个元素的值</font>

  ```javascript
  let arr=[1,2,3],arr2=[{val:1},{val:2},{val:3}];
  arr.find(item => item >= 1)//1
  arr.find(item => item.val > 1) //{val:2}
  //和filter的区别：find方法返回符合条件的第一个元素，filter则是返回符合条件的所有元素，返回新的数组
  ```

  <font size="2" face="arial" color="#666">【**返回值**】：符合条件的元素，不改变原数组</font>

- **findIndex()**

  <font size="2" face="arial" color="#666">【**作用**】：查找数组中满足条件的第一个元素的索引</font>

  ```javascript
  let arr=[1,2,3];
  arr.findIndex(item => item > 1) // 1
  arr.findIdnex(item => item > 4) //-1
  ```

  <font size="2" face="arial" color="#666">【**返回值**】：第一个符合条件的索引，没有则返回 -1</font>

- **flat()**

  <font size="2" face="arial" color="#666">【**作用**】：数组扁平化</font>

  ```javascript
  let arr = [1, 2, [3, 4]];
  arr.flat() //[1, 2, 3, 4]
  let arr1=[1,[2,[3]]]
  arr1.flat(2) // [1, 2, 3];
  //使用 Infinity，可展开任意深度的嵌套数组
  arr1.flat(Infinity) //[1, 2, 3]
  ```

  <font size="2" face="arial" color="#666">【**返回值**】：新的数组，不改变原数组</font>

- **forEach()**

  <font size="2" face="arial" color="#666">【**作用**】：遍历数组</font>

  <font size="2" face="arial" color="#666">【**返回值**】：无返回值</font>

- **includes()**

  <font size="2" face="arial" color="#666">【**作用**】：查找数组中是否包含某一项</font>

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

  <font size="2" face="arial" color="#666">【**返回值**】：布尔值</font>

- **indexOf()**

  <font size="2" face="arial" color="#666">【**作用**】：数组中（字符串）包含指定元素的第一个索引</font>

  ```javascript
  // 特别说明
  // indexOf的第二个参数,从第几个开始，为负数则从后向前
  let arr=[1,2,3,2];
  arr.indexOf(2,2) // 3 
  arr.indexOf(2,5) // -1 为正数的时候，如果大于length，则返回-1
  arr.indexOf(2,-3) // 1 
  arr.indexOf(2,-5) // 1 如果绝对值大于length，则从数组第一项开始找
  ```

  <font size="2" face="arial" color="#666">【**返回值**】：索引值或 -1 </font>

- **join()**

  <font size="2" face="arial" color="#666">【**作用**】：将数组分割成字符串并进行连接</font>

  <font size="2" face="arial" color="#666">【**返回值**】：字符串，不改变原数组</font>

- **lastIndexOf()**

  <font size="2" face="arial" color="#666">【**作用**】：数组（字符串）中最后一个指定元素的索引</font>

  ```javascript
  //特别说明
  //lastIndexOf第二个参数
  let arr=[1,2,3,2];
  arr.lastIndexOf(2,2) // 1 正数为查找到第几个索引为止
  arr.lastIndexOf(2,-3) //1 负数为从后向前，查找到第几个索引（绝对值），大于length则返回 -1 
  ```

  <font size="2" face="arial" color="#666">【**返回值**】：索引值或 -1 </font>

- **map()**

  <font size="2" face="arial" color="#666">【**作用**】：遍历数组</font>

  <font size="2" face="arial" color="#666">【**返回值**】：元素执行函数后组成的新数组 </font>

- **pop()**

  <font size="2" face="arial" color="#666">【**作用**】：删除数组的最后一项</font>

  <font size="2" face="arial" color="#666">【**返回值**】：删除的元素，改变原数组 </font>

- **push()**

  <font size="2" face="arial" color="#666">【**作用**】：数组后添加一或多项</font>

  <font size="2" face="arial" color="#666">【**返回值**】：数组的长度，改变原数组 </font>

- **shift()**

  <font size="2" face="arial" color="#666">【**作用**】：删除数组第一项</font>

  <font size="2" face="arial" color="#666">【**返回值**】：删除的元素，改变原数组 </font>

- **unshift()**

  <font size="2" face="arial" color="#666">【**作用**】：数组前添加一项或多项</font>

  <font size="2" face="arial" color="#666">【**返回值**】：数组的长度，改变原数组 </font>

#### 字符串的方法

#### ES6新特性

#### 微任务和宏任务

#### 柯里化函数

#### 继承

#### 原型和原型链

#### 构造函数

#### new运算符

#### this的指向

#### JS中的异步

- promise
- async await
- Generators/ yield

#### 跨域

- 跨域的产生
- 如何解决跨域

#### fetch、axios、ajax

#### 事件冒泡和事件委托

#### 深浅拷贝

#### 模块化

#### 闭包

#### Object.defineProperty和Proxy的区别

#### Event-loop

#### 事件兼容

#### HTTP和HTTPS的区别及建立连接的过程

#### HTTP状态码

#### 浏览器存储

#### webpack 热更新原理

#### 设计模式