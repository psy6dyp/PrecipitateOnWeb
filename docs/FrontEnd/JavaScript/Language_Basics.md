# 语言基础

## 语法
### 区分大小写
### 标识符
### 注释
### 严格模式
### 语句

## 关键字与保留字

## 变量
### var关键字
### let声明
### const声明
### 声明风格及最佳实践

## 数据类型
### typeof操作符
### Undefined类型
### Null类型
### Boolean类型
### Number类型
### String类型
### Symbol类型
### Object类型

#### valueOf() [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)
```js
// Array：返回数组对象本身
var array = ["ABC", true, 12, -5];
console.log(array.valueOf() === array);   // true

// Date：当前时间距1970年1月1日午夜的毫秒数
var date = new Date(2013, 7, 18, 23, 11, 59, 230);
console.log(date.valueOf());   // 1376838719230

// Number：返回数字值
var num =  15.26540;
console.log(num.valueOf());   // 15.2654

// 布尔：返回布尔值true或false
var bool = true;
console.log(bool.valueOf() === bool);   // true

// new一个Boolean对象
var newBool = new Boolean(true);
// valueOf()返回的是true，两者的值相等
console.log(newBool.valueOf() == newBool);   // true
// 但是不全等，两者类型不相等，前者是boolean类型，后者是object类型
console.log(newBool.valueOf() === newBool);   // false

// Function：返回函数本身
function foo(){}
console.log( foo.valueOf() === foo );   // true
var foo2 =  new Function("x", "y", "return x + y;");
console.log( foo2.valueOf() );
/*
ƒ anonymous(x,y
) {
return x + y;
}
*/

// Object：返回对象本身
var obj = {name: "张三", age: 18};
console.log( obj.valueOf() === obj );   // true

// String：返回字符串值
var str = "http://www.xyz.com";
console.log( str.valueOf() === str );   // true

// new一个字符串对象
var str2 = new String("http://www.xyz.com");
// 两者的值相等，但不全等，因为类型不同，前者为string类型，后者为object类型
console.log( str2.valueOf() === str2 );   // false
```



## 操作符
### 一元操作符
### 位操作符
### 布尔操作符
### 乘性操作符
### 指数操作符
### 加性操作符
### 关系操作符
### 相等操作符
### 条件操作符
### 赋值操作符
### 逗号操作符

## 语句
### if语句
### do-while语句
### while语句
### for语句
### for-in语句
### for-of语句
### 标签语句
### break和continue语句
### with语句
### switch语句

## 函数

## 小结

