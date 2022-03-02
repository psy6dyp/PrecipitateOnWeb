# 集合引用类型
## Array
### 基本API
```js

```

## Set
### 基本API
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
### 顺序与迭代
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

## WeakSet
### 基本API
```js
/*
新增是add() 查询是has() 删除是delete()
需要注意的是WeakSet只能以引用类型作为值，原始值可以包装成对象再用作值
WeakSet中，若某个值：没有指向这个对象的引用，代码执行完毕会被当作垃圾回收
然后这个值就从弱集合中消失，使其成为空集合
*/
```
*[@_@]:WeakSet的作用：使用弱集合（和WeakMap的DOM节点元数据异曲同工（给节点添加方法，如果节点删除，那么WeakMap中也垃圾回收））
## Map
### 基本API
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
### 顺序与迭代
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

## WeakMap
### 基本API
```js
/*
新增是set() 查询是has()和get() 删除是delete()
需要注意的是WeakMap只能以引用类型作为键，原始值可以包装成对象再用作键
WeakMap中，若某个键：没有指向这个对象的引用，代码执行完毕会被当作垃圾回收
然后这个键/值对就从弱映射中消失，使其成为空映射
值没被引用，当键/值对被破坏后，值也会被当作垃圾回收
*/
```
*[@_@]:WeakMap的作用：私有变量（防止从WeakMap访问）、DOM节点元数据（给节点添加方法，如果节点删除，那么WeakMap中也垃圾回收）