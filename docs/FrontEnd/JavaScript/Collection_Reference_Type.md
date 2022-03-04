# 集合引用类型

---
## Array
### 创建数组
```js
//创建数组（使用Array构造函数）
let colors = new Array(); // []
let colors = new Array(20); // 每个都是 undefined 共计20个 undefined
let colors = new Array('red', 'blue', 'green'); // ['red', 'blue', 'green']
//事实上省略new操作符也是一样的
let colors = Array(); // []
let colors = Array(20); // 每个都是 undefined 共计20个 undefined
let colors = Array('red', 'blue', 'green'); // ['red', 'blue', 'green']

//使用数组字面量表示法
let colors = ['red', 'blue', 'green']; // ['red', 'blue', 'green']
let name = []; // []
let values = [1, 2, ]; // [1, 2]

//构造函数还有两个创建数组的静态方法from() of()。
//from()用于将数组结构转换为数组实例，of()用于将一组参数转换为数组实例
console.log(Array.from("Matt")); // ['M', 'a', 't', 't']
const m = new Map([
  ['key1', 'val1'],
  ['key2', 'val2'],
  ['key3', 'val3']
])
console.log(Array.from(m));
// [['key1', 'val1'], ['key2', 'val2'], ['key3', 'val3']]
const s = new Set(['val1', 'val2', 'val3']);
console.log(Array.from(s)); // ['val1', 'val2', 'val3']

//复制现有对象(浅复制)
const a1 = [{}, 2, 3, 4];
const a2 = Array.from(a1);
console.log(a2); // [{}, 2, 3, 4]
console.log(a1 === a2); // false
a1[0].name = 'aaa';
console.log(a2[0]); // {name: 'aaa'}

//可以转换任何可迭代对象
const a = {
  *[Symbol.iterator]() {
    yield 1,
    yield 2,
    yield 3
  }
}
// const a = {
//   [Symbol.iterator]: function* () {
//     yield 1,
//     yield 2,
//     yield 3
//   }
// }
console.log(Array.from(a)); // [1, 2, 3]

// 也能转换带有必要属性的自定义对象
const obj = {
  0: 1,
  1: 2,
  2: 3,
  length: 3
};
console.log(Array.from(obj)); // [1, 2, 3]

//也能转换arguments对象
function getArr() {
  return Array.from(arguments);
}
console.log(getArr(1, 2, 3));

//from()第二个参数可以增强值(传入一个映射函数) 第三个参数是指定映射函数的this
const a1 = [1, 2, 3, 4];
const a2 = Array.from(a1, x => x**2);
console.log(a2); // [1, 4, 9, 16]
const a3 = Array.from(a1, function(y) {return y * this.mul}, {mul: 3}); 
// 这里因为function和箭头函数的this不一样,这里箭头函数的this是window。
console.log(a3); // [3, 6, 9, 12]

// Array.of()可以把一组参数转换为数组
console.log(Array.of(1, 2, 3, 4)); // [1, 2, 3, 4]
console.log(Array.of(undefined)); // [undefined]
```

### 数组空位
```js
let a = [,,,];
console.log(a.length); // 3
console.log(a); // [undefined, undefined, undefined]

let a1 = [1,,,,5];
console.log(a1.length); // 5
console.log(a1); // [1, undefined, undefined, undefined, 5]

console.log(Array.from([,,,])); // [undefined, undefined, undefined]
console.log(Array.of(...[,,,])); // [undefined, undefined, undefined]

const b = [1,,,,5];
for(const [index, value] of b.entries()) {
  console.log(value);
}
// 1
// undefined
// undefined
// undefined
// 5

//不同方法处理方式不一样
const d = [1,,,,5];
const c = d.map(()=>6);
console.log(c); // [6, undefined, undefined, undefined, 6] map跳过
console.log(d.join('-')); // 1----5 join视为空字符串

//因行为不一致和存在性能隐患，开发中尽量避免使用数组空位，确实需要的话可显性使用 undefined
```

### 数组索引
```js
//可以通过length来删除或增加元素
const d = [1, 2, 3];
d.length = 4;
console.log(d); // [1, 2, 3, undefined];
d.length = 2;
console.log(d); // [1, 2];

//使用length属性很方便在数组末尾添加元素
const a = [1, 2, 3];
a[a.length] = 4;
console.log(a); // [1, 2, 3, 4];
a[a.length] = 5;
console.log(a); // [1, 2, 3, 4, 5]

// 这样会填充其余位置为 undefined
const a = [1, 2, 3];
a[5] = 6;
console.log(a); // [1, 2, 3, undefined, undefined, 6]
console.log(a.length); // 6
```
### 检测数组
```js
//使用Array.isArray()方法
const a = [1, 2, 3];
const b = {
  0: 1,
  1: 2,
  2: 3,
  length: 3
}
console.log(Array.isArray(a)); // true
console.log(Array.isArray(b)); // false
```
### 数组迭代
```js
  const a = ['foo', 'bar', 'baz', 'qux'];
  const aKeys = Array.from(a.keys());
  const aValues = Array.from(a.values());
  const aEntries = Array.from(a.entries());
  console.log(aKeys); // [0, 1, 2, 3]
  console.log(aValues); // ['foo', 'bar', 'baz', 'qux']
  console.log(aEntries); // [[0, 'foo'], [1, 'bar'], [2, 'baz'], [3, 'qux']]
  //其中，可以用结构拆分entries()方法循环的键/值对
```
### 复制和填充
```js
//fill()

const zeros = [0, 0, 0, 0, 0];
//用5填充数组
zeros.fill(5);
console.log(zeros); // [ 5, 5, 5, 5, 5 ]
zeros.fill(0); //重置 [0, 0, 0, 0, 0]

//用6填充索引大于等于3的元素
zeros.fill(6, 3);
console.log(zeros); // [ 0, 0, 0, 6, 6 ]
zeros.fill(0); //重置 [0, 0, 0, 0, 0]

//用7填充索引大于等于1且小于3的元素
zeros.fill(7, 1, 3);
console.log(zeros); // [ 0, 7, 7, 0, 0 ]
zeros.fill(0); //重置 [0, 0, 0, 0, 0]

//用8填充索引大于等于1且小于4的元素
zeros.fill(8, -4, -1); // 也就是zeros.fill(8, 1, 4);
// -4会变成 zeros.length - 4 = 5 - 4 = 1
// -1会变成 zeros.length - 1 = 5 - 1 = 4 
console.log(zeros); // [ 0, 8, 8, 8, 0 ]
zeros.fill(0); //重置 [0, 0, 0, 0, 0]

//以下会忽略，数组不变
zeros.fill(1, -10, -6); // zeros.fill(1, -5, -1);索引过低 忽略
zeros.fill(1, 10, 15); // 索引过高 忽略
zeros.fill(1, 4, 2); // 索引反向 忽略

//以下部分可填充
zeros.fill(1, 3, 10); // 超出部分忽略
console.log(zeros); // [ 0, 0, 0, 1, 1 ]
```

```js
//copyWithin()

// 第一个参数是插入开始的索引，第二个是要复制的开始索引(默认0),第三个是结束(默认到数组结尾)。
let a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

a.copyWithin(5); // a.copyWithin(5, 0, 9);
console.log(a); // [0, 1, 2, 3, 4, 0, 1, 2, 3, 4]
a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // 重置

a.copyWithin(0, 5); // a.copyWithin(0, 5, 9);
console.log(a); // [5, 6, 7, 8, 9, 5, 6, 7, 8, 9]
a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // 重置

a.copyWithin(4, 0, 3);
console.log(a); // [0, 1, 2, 3, 0, 1, 2, 7, 8, 9]
a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // 重置

//负值的操作与fill无异，也是数组长度加上负值
a.copyWithin(-4, -7, -3); // a.copyWithin(6, 3, 7);
console.log(a); // [0, 1, 2, 3, 4, 5, 3, 4, 5, 6]
a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // 重置

//以下会忽略，数组不变
a.copyWithin(1, -15, -12); // a.copyWithin(1, -5, -2);索引过低 忽略
a.copyWithin(1, 12, 15); // 索引过高 忽略
a.copyWithin(2, 4, 2); // 索引反向 忽略

//以下部分可填充
a.copyWithin(4, 7, 10);
console.log(a); // [0, 1, 2, 3, 7, 8, 9, 7, 8, 9]
```

### 转换方法
```js
let a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log(a.valueOf()); // 输出数组本身 [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(a.toString()); // 0,1,2,3,4,5,6,7,8,9

//调用c的toString()，会是逗号连接a和b，然后调用a和b的toString()，返回Nic,Las
let a = {
  toString() {
    return 'Nic'
  }
}
let b = {
  toString() {
    return 'Las'
  }
}
let c = [a, b]
console.log(c.toString()); // Nic,Las
//如果想改变逗号分隔符，则可以调用join方法,join()中不传参数或传入undefined则依然是逗号
console.log(c.join('-')); // Nic-Las
//如果某一项是null或者undefined，则为空字符串拼接上去这一项
```
### 栈方法
```js
//push() 末尾加入元素，返回数组最新的长度
const a = [];
let b = a.push('red', 'green'); // 就像入栈一样
console.log(a); // [ 'red', 'green' ]
console.log(b); // 2
let c = a.push('blue'); // 就像入栈一样
console.log(a); // [ 'red', 'green', 'blue' ]
console.log(c); // 3

//pop() 弹出最后一个元素并返回这个元素
let a = [1, 2, 3];
let p = a.pop();
console.log(a); // [ 1, 2 ]
console.log(p); // 3
```
### 队列方法
```js
let a = [1, 2, 3];
let p = a.unshift(0); // 从头插入一个元素0
console.log(a); // [ 0, 1, 2, 3 ]
console.log(p); // 4 返回新的数组长度

let c = a.shift(); // 删除头个元素0
console.log(a); // [ 1, 2, 3 ]
console.log(c); // 0 删除的是0 返回这个元素 
```
### 排序方法
```js
// 反向排列reverse()
let a = [1, 2, 3, 10, 5];
a.reverse();
console.log(a); // [ 5, 10, 3, 2, 1 ]

//排序方法sort()
let a = [1, 2, 3, 10, 5];
a.sort()
console.log(a); // [ 1, 10, 2, 3, 5 ] 排序错误
//为什么会排序错误？因为sort()方法把每个元素转换为字符串再进行比较，使用后10会在前面
//所以要设计一个比较函数作为sort的参数，判断哪个值排在前面
//排序函数接收两个参数，若是val1在val2前面，则返回负值，相同返回0，val1在val2后面，则返回正值
let a = [1, 2, 3, 10, 5];
a.sort(function(val1, val2) {
  if(val1 < val2) {
    return -1;
  } else if (val1 > val2) {
    return 1;
  } else {
    return 0;
  }
})
console.log(a); // [ 1, 2, 3, 5, 10 ] 这样就正确了
// 从大到小
let a = [1, 2, 3, 10, 5];
a.sort(function(val1, val2) {
  if(val1 > val2) {
    return -1;
  } else if (val1 < val2) {
    return 1;
  } else {
    return 0;
  }
})
console.log(a); // [ 10, 5, 3, 2, 1 ]
```
### 操作方法
```js
//concat
let colors = ['red', 'green', 'blue'];
let colors2 = colors.concat('yellow', ['black', 'white']); // 数组默认全部会被打平
console.log(colors); // [ 'red', 'green', 'blue' ] 不改变原数组
console.log(colors2); // [ 'red', 'green', 'blue', 'yellow', 'black', 'white' ]

//slice
let colors = ['red', 'green', 'blue', 'yellow'];
let colors2 = colors.slice(1); // 从索引 1 到 结束
let colors3 = colors.slice(1, 3); // 从索引 1 到 3的前一个 也就是 索引 1 与 索引 2
let colors4 = colors.slice(-3, -1); // colors.slice(1, 3); 数组长度减去负值
let colors5 = colors.slice(2, 1); // 结束位置比开始小 返回空数组
console.log(colors); // ['red', 'green', 'blue', 'yellow']
console.log(colors2); // ['green', 'blue', 'yellow']
console.log(colors3); // ['green', 'blue']
console.log(colors4); // ['green', 'blue']
console.log(colors5); // []

//splice Array方法中的至强 可以删除、替换、插入元素
let colors = ['red', 'green', 'blue', 'yellow'];
//删除
let colors1 = colors.splice(0, 2); // 第一个参数要删除的开始位置，第二个参数是删除个数
console.log(colors); // ['blue', 'yellow']
console.log(colors1); // ['red', 'green'] 返回删掉的元素

```
### 搜索和位置方法
```js
```
### 迭代方法
```js
```
### 归并方法
```js
```
---

## Set
### Set基本API
```js
//初始化
const s = new Set();

const s1 = new Set(['val1', 'val2', 'val3']);

const s2 = new Set({
  [Symbol.iterator]: function* (){
    yield "val1",
    yield "val2",
    yield "val3"
  }
}); // 使用自定义迭代器初始化集合
console.log(s2.size); // 3

//增加与删除
s.add('val4'); // 返回实例s

s.delete('val4'); // 有这个key就删除并返回true，没有则返回false

s.clear(); // 销毁集合实例中的所有值

//判断和获取元素数量
s.has('val4'); //返回true / false

console.log(s.size); // 输出s的元素数量

```
### Set顺序与迭代
```js
//迭代器（已插入顺序取得集合内容），values()方法取得迭代器，或者别名方法keys()
//或者Symbol.iterator属性，它引用values()
const s = new Set(['val1', 'val2', 'val3']);

console.log(s.values === s[Symbol.iterator]); // true

console.log(s.keys === s[Symbol.iterator]); // true

console.log(s.keys === s.values); // true

for(let val of s.values()) {
  console.log(val);
} // val1 val2 val3

//因为values()是默认迭代器，可以对集合实例使用扩展操作，将其转换为数组
console.log([...s]) //[ 'val1', 'val2', 'val3' ]

//也可以这样（数组去重）
console.log(Array.from(s)) //[ 'val1', 'val2', 'val3' ]

//entries()方法返回键/值对，是每个元素重复两次
for(let pair of s.entries()) {
  console.log(pair);
}
// [ 'val1', 'val1' ]
// [ 'val2', 'val2' ]
// [ 'val3', 'val3' ]

//也可以用回调的方式 使用forEach()传入一个函数
s.forEach((val, dupVal) => console.log(`键${val}对应的值是${dupVal}`))
// 键val1对应的值是val1
// 键val2对应的值是val2
// 键val3对应的值是val3

```

---

## WeakSet
### WeakSet基本API
```js
/*
新增是add() 查询是has() 删除是delete()
需要注意的是WeakSet只能以引用类型作为值，原始值可以包装成对象再用作值
WeakSet中，若某个值：没有指向这个对象的引用，代码执行完毕会被当作垃圾回收
然后这个值就从弱集合中消失，使其成为空集合
*/
```
WeakSet的作用：使用弱集合（和WeakMap的DOM节点元数据异曲同工（给节点添加方法，如果节点删除，那么WeakMap中也垃圾回收））

---

## Map
### Map基本API
```js
//初始化 获取元素数量
const m = new Map();
const m1 = new Map([
  ['key1', 'val1'],
  ['key2', 'val2'],
  ['key3', 'val3']
]);
const m2 = new Map({
  [Symbol.iterator]:function*() {
    yield ['key1', 'val1'],
    yield ['key2', 'val2'],
    yield ['key3', 'val3']
  }
})

console.log(m1.size); // 3

//查询与删除
const m = new Map([
  ['key1', 'val1'],
  ['key2', 'val2'],
  ['key3', 'val3']
]);

//获取
console.log(m.get('key4')); // undefined
console.log(m.get('key1')); // val1

//判断
console.log(m.has('key4')); // false
console.log(m.has('key1')); // true

//删除单个
console.log(m.delete('key4')); // false
console.log(m.delete('key1')); // true

//清除映射实例中的所有键/值对
m.clear()

```
### Map顺序与迭代
```js
const m = new Map([
  ['key1', 'val1'],
  ['key2', 'val2'],
  ['key3', 'val3'],
]);
console.log(m[Symbol.iterator] === m.entries); // true Symbol.iterator引用entries()
for(let pair of m.entries()) {
  console.log(pair);
}
// [ 'key1', 'val1' ]
// [ 'key2', 'val2' ]
// [ 'key3', 'val3' ]
console.log(...m); //[ 'key1', 'val1' ] [ 'key2', 'val2' ] [ 'key3', 'val3' ]
m.forEach((val, key)=>{
  console.log(`${key}对应${val}`);
})
// key1对应val1
// key2对应val2
// key3对应val3

//单独迭代键/值
for(let key of m.keys()) {
  console.log(key);
} 
// key1
// key2
// key3
for(let value of m.values()) {
  console.log(value);
} 
// val1
// val2
// val3
```
### 选择Map还是Object
对于多数 Web 开发任务来说，选择 Object 还是 Map 只是个人偏好问题，影响不大。不过，对于 在乎内存和性能的开发者来说，对象和映射之间确实存在显著的差别。
<font face="微软雅黑" size=3>
<p>1.内存占用<br/>
Object 和 Map 的工程级实现在不同浏览器间存在明显差异，但存储单个键/值对所占用的内存数量都会随键的数量线性增加。批量添加或删除键/值对则取决于各浏览器对该类型内存分配的工程实现。 不同浏览器的情况不同，但给定固定大小的内存，Map 大约可以比 Object 多存储 50%的键/值对。<br/>

2.插入性能<br/>
向 Object 和 Map 中插入新键/值对的消耗大致相当，不过插入 Map 在所有浏览器中一般会稍微快 一点儿。对这两个类型来说，插入速度并不会随着键/值对数量而线性增加。如果代码涉及大量插入操 作，那么显然 Map 的性能更佳。<br/>

3.查找速度<br/>
与插入不同，从大型 Object 和 Map 中查找键/值对的性能差异极小，但如果只包含少量键/值对， 则Object 有时候速度更快。在把 Object 当成数组使用的情况下(比如使用连续整数作为属性)，浏 览器引擎可以进行优化，在内存中使用更高效的布局。这对 Map 来说是不可能的。对这两个类型而言， 查找速度不会随着键/值对数量增加而线性增加。如果代码涉及大量查找操作，那么某些情况下可能选 择 Object 更好一些。<br/>

4.删除性能<br/>
使用 delete 删除 Object 属性的性能一直以来饱受诟病，目前在很多浏览器中仍然如此。为此，出现了一些伪删除对象属性的操作，包括把属性值设置为undefined或null。但很多时候，这都是一种讨厌的或不适宜的折中。而对大多数浏览器引擎来说，Map 的 delete()操作都比插入和查找更快。 如果代码涉及大量删除操作，那么毫无疑问应该选择 Map。</p>
</font>

---

## WeakMap
### WeakMap基本API
```js
/*
新增是set() 查询是has()和get() 删除是delete()
需要注意的是WeakMap只能以引用类型作为键，原始值可以包装成对象再用作键
WeakMap中，若某个键：没有指向这个对象的引用，代码执行完毕会被当作垃圾回收
然后这个键/值对就从弱映射中消失，使其成为空映射
值没被引用，当键/值对被破坏后，值也会被当作垃圾回收
*/
```
WeakMap的作用：私有变量（防止从WeakMap访问）、DOM节点元数据（给节点添加方法，如果节点删除，那么WeakMap中也垃圾回收）