---
title: String
---

## String：字符串类型

  - java.lang.String使用final修饰，不能被继承
  - java中的String在内存采用Unicode编码方式，任何一个字符占用两个字节的编码
  - 字符串底层封装的是一个字符数组
  - 字符串一但创建，对象内容永远无法改变，但字符串引用可以重新赋值

## 常量池

  - java对字符串有一个优化措施：字符串常量池
  - java推荐我们使用字面量的方式来创建字符串，并且会缓存所有以字面量形式创建的字符串对象到常量池，当使用相同字面量再创建对象时将复用常量池中的对象以减少内存开销，从而避免内存中堆积大量内容相同的字符串对象

## String常用方法：

  - length()：获取字符串的长度(字符个数)
  - trim()：去除当前字符串两边的空白字符
  - toUpperCase()和toLowerCase()：将当前字符串中的英文部分转为全大写/全小写
  - startsWith()和endsWith()：判断当前字符串是否是以给定的字符串开始/结尾的
  - charAt()：返回当前字符串指定位置上的字符------------------根据下标找字符
  - indexOf()和lastIndexOf()：检索给定字符串在当前字符串中的开始位置-------根据字符串找位置
  - substring()：截取当前字符串中指定范围内的字符串
  - String的静态方法valueOf()：将其它数据类型转换为String

## StingBuilder类：

  - 由于String是不变对象，每次修改内容要创建新对象，因此String不适合做频繁修改操作，为了解决这个问题，java提供了StringBuilder类。
  - StringBuilder是专门用于修改字符串的一个API，内部维护一个可变的char数组，修改都是在这个数组上进行的，修改速度、性能优秀，并且提供了修改字符串的常见的方法：增、删、改、插

## StringBuilder常用方法

  - append()：追加内容
  - replace()：替换部分内容
  - delete()：删除部分内容
  - insert()：插入内容
  - reverse()：翻转内容