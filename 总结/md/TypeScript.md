## TypeScript

#### 数据类型

- `boolean`

- `number`

- `string`

- `array`

  ```javascript
  // 两种创建方式
  // 1. 
  let list: number[] = [1, 2, 3];
  // 2. 
  let list: Array<number> = [1, 2, 3];
  ```

- `tuple`

  ```javascript
  // 元组:表示一个已知元素数量和类型的数组，各元素的类型不必相同
  let x: [string, number];
  x = ['hello', 10]; // OK
  x = [10, 'hello']; // Error
  ```

- `enum`

  ```javascript
  // 1.
  enum Color {Red, Green, Blue}
  let c: Color = Color.Green;  // 1
  // 2.
  enum Color { Red = 1, Green = 2, Blue = 3 }
  let colorName:string=Color[2]
  console.log(colorName)  // Green
  
  ```

- `any` : 任意类型

- `void` 

  ```javascript
  // 没有返回值
  function warnUser(): void {
      console.log("This is my warning message");
  }
  // 声明变量只能赋予 undefined 、null
  let unusable: void = undefined;
  ```

- `null`  、`undefined`

- `never` ：永不存在的值的类型

- `object`

#### 接口

- 普通接口

  ```javascript
  interface Person {
    readonly name: string, // 只读属性
    age?: number,  // 可选
    [propName: string]: any // 可以接受任意的属性 
  }
  // 一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
  let num: Person;
  num = {
    name: 'Remons',
    sex: '男'
  }
  // 也可以用接口定义数组或对象
  interface NumberArray {
      [index: number]: number;
     // [index: string]:any // 对象
  }
  let fibonacci: NumberArray = [1, 1, 2, 3, 5];
  ```

- 类的接口及接口继承

  ```javascript
  interface fatherInterface {
    name: string,
    eat(str?: string): void
  }
  // 接口继承
  interface childInterface extends fatherInterface {
    age: number,
    work(str?: string): void
  }
  
  class Person implements childInterface {
    name: string
    age: number
    constructor(name: string, age: number) {
      this.name = name
      this.age = age
    }
    eat(food?: string) {
      console.log(this.name + '吃' + food)
    }
    work(work?: string) {
      console.log(this.name + '做' + work)
    }
  }
  // 类的继承
  class Web extends Person implements childInterface {
    constructor(name: string, age: number) {
      super(name, age)
    }
  }
  let web = new Web('小明',25)
  web.eat('屎')  //小明吃屎
  web.work('代码') // 小明做代码
  ```

#### 函数

```javascript
// 不同于js ,  => 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
// 也可以用接口描述函数
interface SearchFunc {
    (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
// 默认参数、可选参，可以用 rest 获取剩余参数，rest只能位于最后，且不能有可选参
function getInfo(name: string = '54', age?: number): string {
  return ${name}：${age}岁
}
console.log(getInfo('Remons', 20))
```

#### 类

- `public`:共有的， ts中，成员默认都是public

- `private`：私有的，子类或类外部无法访问

  ```javascript
  class Animal {
      private name: string;
      constructor(theName: string) { this.name = theName; }
  }
  new Animal("Cat").name; // 错误: 'name' 是私有的.
  ```

- `protected`：保护类型，在子类或类中可以访问，类外部无法访问

- `readonly`：只读

- `static` ：静态方法，不需要实例化，直接通过类来调用

- `abstract`：抽象类

  ```javascript
  abstract class Animal {
    public name;
    public constructor(name) {
      this.name = name;
    }
    public abstract sayHi();
  }
  
  class Cat extends Animal {
    // 抽象类中的抽象方法必须被子类实现：如果没有下面的内容，会报错
    public sayHi() {
      console.log(Meow, My name is ${this.name});
    }
  }
  // let animal = new Animal('Tom') // 不允许被实例化,报错
  let cat = new Cat('Tom');
  ```

#### 泛型

泛型代表的是泛指某一类型，更像是一个类型变量。由尖括号包裹

主要作用是创建逻辑可复用的组件。

泛型可以作用在函数、类、接口上。