---
title: 正则表达式(实践篇)
desc: 正则表达式(实践篇)
reward: true
date: 2017-05-15 14:03:44
summary: "继上一篇 [正则表达式-基础篇](http://www.yugasun.com/2017/04/24/正则表达式-基础篇) 总结了正则表达式常用的一些基础知识点，但是要学好正则表达式，还是要多动手去写，去研究一些常用的正则表达式例子，理解例子之后再自己对例子进行修改实践，举一反三，方能融会贯通。"
tags:
  - 正则表达式
---

继上一篇 [正则表达式-基础篇](http://www.yugasun.com/2017/04/24/正则表达式-基础篇) 总结了正则表达式常用的一些基础知识点，但是要学好正则表达式，还是要多动手去写，去研究一些常用的正则表达式例子，理解例子之后再自己对例子进行修改实践，举一反三，方能融会贯通。


## 创建一个 javascript 正则表达式

1. 使用一个正则表达式字面量，其由包含在斜杠之间的模式组成

```javascript
// /pattern/flags
const regex = /ab+c/;
const regex = /^[a-zA-Z]+[0-9]*\W?_$/gi;
```

2. 调用RegExp对象的构造函数

```javascript
// new RegExp(pattern [, flags])
let regex = new RegExp("ab+c");
let regex = new RegExp(/^[a-zA-Z]+[0-9]*\W?_$, "gi");
```

通过这两种方法创建的 RegExp 对象均有一下属性：

|    属性	    |       描述
| ---------- | -------------- 
| global	   | RegExp 对象是否具有标志 g
| ignoreCase | RegExp 对象是否具有标志 i
| lastIndex	 | 一个整数，标示开始下一次匹配的字符位置
| multiline	 | RegExp 对象是否具有标志 m
| source	   | 正则表达式的源文本。

RegExp 对象上有 `exec` 和 `test` 方法。
`test` 用来匹配符合正则模式的字符是否存在，此方法经常用来判断一些常用的字符串 (手机号码、邮箱等) 格式是否符合要求，如：

```javascript
var reg = /^yuga/g;
reg.test('yugasun'); // true
```

`exec` 执行后会返回一个匹配结果数组，如果未匹配到则返回 null, 如：

```javascript
var arr = /yuga(\w+)/g.exec("yugasun.com");;
console.log(arr); // ["yugasun", "sun", index: 4, input: "www.yugasun.com"]
```

函数 `exec` 正则表达式执行返回信息如下：

| 属性或索引	 |       描述	                           |  在例子中对应的值
| --------- | ------------------------------------- | --------------------
|           | 	匹配到的字符串和所有被记住的子字符串。	   |  ["yugasun", "sun"]
|   index   |   在输入的字符串中匹配到的以0开始的索引值。	|  4
|   input   |   初始字符串。	                       |  "www.yugasun.com"


当你想要知道在一个字符串中的一个匹配是否被找到，你可以使用test或search方法；
想得到更多的信息（但是比较慢）则可以使用exec或match方法。如果你使用exec或match方法并且匹配成功了，那么这些方法将返回一个数组并且更新相关的正则表达式对象的属性和预定义的正则表达式对象（详见下）。如果匹配失败，那么exec方法返回null（也就是false）

以上所有实例中，正则表达式的末尾 `/` 后面会有个字符 `g`, 这是正则表达式的匹配标识，通过匹配标识可以进行更加高级的匹配搜索：

| 标志	|     描述
| ---- | ---------------
| g	   | 全局搜索。
| i	   | 不区分大小写搜索。
| m	   | 多行搜索。
| y	   | 执行“粘性”搜索,匹配从目标字符串的当前位置开始，可以使用y标志。


以上是有关javascript中正则表达式的创建和使用，下面主要是介绍几道有关正则表达式的前端面试题和一些常用的正则表达式例子。

## 两道前端面试题

> 1.如何使用原生JavaScript实现 `trim()` 函数？

分析：

```text
函数 trim() 方法会从一个字符串的两端删除空白字符。在这个上下文中的空白字符是所有的空白字符 (space, tab, no-break space 等) 以及所有行终止符字符（如 LF，CR);
正好 \s 表示的就是空白字符，然后我们只需匹配字符串的开始 ^ 和 结尾 $;
```

实现：

```javascript
String.prototype.trim = function(){
  return this.replace(/(^\s)|(\s$)/g, '');
}
```

> 2.给数字加上千分符, 比如：把 `12345` 修改成 `12,345`，把 `1234567` 修改成 `1,234,567`

分析：

```text
添加千分符的规则就是，倒数每三个字符添加一个千分符， 可以通过 /\d(?!$)/g 来遍历每个字符，然后计算该字符是倒数第几个，如果是3的倍数则在其后添加千分符。
```

实现：

```javascript
var str = '1234567';
var newStr = str.replace(/\d(?!$)/g, function(a, b, c){
  // replace 自定义匹配规则，传递参数 a, b, c 分别为：捕获的结果，捕获位置，输入字符
  // 那么 当前捕获字符倒数的位置为：c.length - b - 1;
  if( (c.length - b - 1) % 3 === 0 ){
    return (a + ',');
  } else {
    return a;
  }
});
console.log(newStr); // "1,234,567"
```

正则 `/\d(?!$)/g` 括号中 `?!$` 匹配的是非结尾, `?!` 是 `正向否定查找`, 可以参看 [正则表达式-基础篇](http://www.yugasun.com/2017/04/24/正则表达式-基础篇) , `$` 表示末端，`\d` 表示数组，`g` 全局索索，所以整个正则的意思相当于，从第一个数组开始开始查找，直到结尾，相当于字符串遍历输出。

当然这里存在其他很多种解法，读者可以自己思考看看，如何实现~

## 常用正则表达式

以下实例仅供参考，有任何问题也可评论沟通。正则不一定唯一，也不一定就一成不变，毕竟时代在发展, 域名在进步, 到底能出啥, 谁也想不住。

### 校验数字的表达式

数字：`^[0-9]*$`
n位的数字：`^\d{n}$`
至少n位的数字：`^\d{n,}$`
m-n位的数字：`^\d{m,n}$`
零和非零开头的数字：`^(0|[1-9][0-9]*)$`
非零开头的最多带两位小数的数字：`^([1-9][0-9]*)+(.[0-9]{1,2})?$`
带1-2位小数的正数或负数：`^(\-)?\d+(\.\d{1,2})?$`
正数、负数、和小数：`^(\-|\+)?\d+(\.\d+)?$`
有两位小数的正实数：`^[0-9]+(.[0-9]{2})?$`
有1~3位小数的正实数：`^[0-9]+(.[0-9]{1,3})?$`
非零的正整数：`^[1-9]\d*$`
非零的负整数：`^-[1-9]\d*$`
非负整数：`^\d+$`
非正整数：`^-[1-9]\d*|0$`
非负浮点数：`^\d+(\.\d+)?$`
非正浮点数：`^((-\d+(\.\d+)?)|(0+(\.0+)?))$`
正浮点数：`^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$`
负浮点数：`^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$`
浮点数：`^(-?\d+)(\.\d+)?$`

### 校验字符的表达式

汉字：`^[\u4e00-\u9fa5]{0,}$`
英文和数字：`^[A-Za-z0-9]+$`
长度为3-20的所有字符：`^.{3,20}$`
由26个英文字母组成的字符串：`^[A-Za-z]+$`
由26个大写英文字母组成的字符串：`^[A-Z]+$`
由26个小写英文字母组成的字符串：`^[a-z]+$`
由数字和26个英文字母组成的字符串：`^[A-Za-z0-9]+$`
由数字、26个英文字母或者下划线组成的字符串：`^\w+$`
中文、英文、数字包括下划线：`^[\u4E00-\u9FA5A-Za-z0-9_]+$`
中文、英文、数字但不包括下划线等符号：`^[\u4E00-\u9FA5A-Za-z0-9]+$`

### 特殊需求表达式

Email地址：`^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$`
域名：`[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(/.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+/.?`
InternetURL：`^http(s)?://([\w-]+\.)+[\w-]+(/[\w-./?%&=]*)?$`
手机号码：`^1[3|4|5|7|8]\d{9}$`
电话号码：`^(\(\d{3,4}-)|\d{3.4}-)?\d{7,8}$`
国内电话号码(0511-4405222、021-87888822)：`\d{3}-\d{8}|\d{4}-\d{7}`
身份证号(15位、18位数字、末尾为X或x)：`(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)`
强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间)：`^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$`
日期格式：`^\d{4}-\d{1,2}-\d{1,2}`
中文字符的正则表达式：`[\u4e00-\u9fa5]`
双字节字符(包括汉字在内，可以用来计算字符串的长度(一个双字节字符长度计2，ASCII字符计1))：`[^\x00-\xff]`
HTML标记的正则表达式：`<(\S*?)[^>]*>.*?</\1>|<.*? />`
腾讯QQ号：`[1-9][0-9]{4,}`    (腾讯QQ号从10000开始)
中国邮政编码：[1-9]\d{5}(?!\d)  (中国邮政编码为6位数字)
IP地址：`\d+\.\d+\.\d+\.\d+`    (提取IP地址时有用)

## 相关文章

* [正则表达式 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)














