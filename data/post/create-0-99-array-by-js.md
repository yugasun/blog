---
title: 如何用JS创建包含0-99整数的数组
desc: Javascript 有关数组创建的几种方法介绍
reward: true
date: 2017-03-28 22:29:43
summary: 'Javascript 有关数组创建的几种方法介绍'
tags:
  - Javascript
---

在考验面试者 JS 基本功的时候，很多面试官会提出此类问题来考验面试者对数组生成以及操作的熟练程度。

> 但是个人觉得没什么卵用，顶多用来装逼教学而已，所以接下来我要装逼了，你准备好了吗?

先来一个最直接的方式：

```javascript
var arr = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
  27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
  51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74,
  75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99,
]
```

我想任何一个优雅的程序员是不愿意看到上面的那段代码的，囧......

Let's turn to the mutton!

## 传统的 `for` 循环

```javascript
var arr = []
for (var i = 0; i < 100; i++) {
  arr.push(i)
}
```

使用 `for` 循环是很快就能想到的，那么如何不用 `for` 循环语法呢？

## ES5 方法

```javascript
Object.keys(Array.apply(null, { length: 100 }))
```

`Object.keys` 是获取对象所有键值得方法，通过 `Array.apply` 来创建含有长度为 100 的数组，然后返回其键值为数组，但是此方法获得的键值均是字符串类型。所以还需要类型转换，于是可以改成:

```javascript
Object.keys(Array.apply(null, { length: 100 })).map(function (item) {
  return +item
})
```

当然如果你喜欢使用 `parseInt` 来转换类型，也是可以的。

## ES6 方法

如果了解 ES6 数组相关方法的同学，可以知道可以通过 [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) 方法来从数组或可迭代对象创建一个新的 Array 实例。

```javascript
Array.from(new Array(100).keys())
```

读到这里，你觉得已经足够了吗？

## ES6 方法之扩展运算符 `...`

扩展语法允许在需要多个参数（用于函数调用）或多个元素（用于数组文本）或多个变量（用于解构分配）的位置扩展表达式, 当然更详尽的解释，请看 [扩展运算符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) 官方文档。

```javascript
[...Array(100).keys()]
[...Array.from({length:100}).keys()]
```

好了，装逼到此为止，但是学习永无止境，既然提到了 `扩展运算符` 就在这里提醒下大家把：

> 扩展运算符非常强大
> 扩展运算符非常强大
> 扩展运算符非常强大

重要的事情说三遍，以前如果你需要合并两个数组，你会需要用到 `concat` 函数，但是现在你只需要像下面这样写：

```javascript
;[...arr1, ...arr2]
```

当然更详尽的用法大家可以去看 [扩展运算符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) 官方文档。

看完本文，下次如果你去面试正好你的面试官问到了这个问题，希望你能记起我~

## 相关文章

- [Array - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
