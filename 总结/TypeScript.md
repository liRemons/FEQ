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
// 也可以用接口定义数组
interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
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
  return `${name}：${age}岁`
}
console.log(getInfo('Remons', 20))
```

#### 类

