<template><div><h1 id="string-字符串类型" tabindex="-1"><a class="header-anchor" href="#string-字符串类型" aria-hidden="true">#</a> String：字符串类型</h1>
<ul>
<li>java.lang.String使用final修饰，不能被继承</li>
<li>java中的String在内存采用Unicode编码方式，任何一个字符占用两个字节的编码</li>
<li>字符串底层封装的是一个字符数组</li>
<li>字符串一但创建，对象内容永远无法改变，但字符串引用可以重新赋值</li>
</ul>
<h1 id="常量池" tabindex="-1"><a class="header-anchor" href="#常量池" aria-hidden="true">#</a> 常量池</h1>
<ul>
<li>java对字符串有一个优化措施：字符串常量池</li>
<li>java推荐我们使用字面量的方式来创建字符串，并且会缓存所有以字面量形式创建的字符串对象到常量池，当使用相同字面量再创建对象时将复用常量池中的对象以减少内存开销，从而避免内存中堆积大量内容相同的字符串对象</li>
</ul>
<h1 id="string常用方法" tabindex="-1"><a class="header-anchor" href="#string常用方法" aria-hidden="true">#</a> String常用方法：</h1>
<ul>
<li>length()：获取字符串的长度(字符个数)</li>
<li>trim()：去除当前字符串两边的空白字符</li>
<li>toUpperCase()和toLowerCase()：将当前字符串中的英文部分转为全大写/全小写</li>
<li>startsWith()和endsWith()：判断当前字符串是否是以给定的字符串开始/结尾的</li>
<li>charAt()：返回当前字符串指定位置上的字符------------------根据下标找字符</li>
<li>indexOf()和lastIndexOf()：检索给定字符串在当前字符串中的开始位置-------根据字符串找位置</li>
<li>substring()：截取当前字符串中指定范围内的字符串</li>
<li>String的静态方法valueOf()：将其它数据类型转换为String</li>
</ul>
<h1 id="stingbuilder类" tabindex="-1"><a class="header-anchor" href="#stingbuilder类" aria-hidden="true">#</a> StingBuilder类：</h1>
<ul>
<li>由于String是不变对象，每次修改内容要创建新对象，因此String不适合做频繁修改操作，为了解决这个问题，java提供了StringBuilder类。</li>
<li>StringBuilder是专门用于修改字符串的一个API，内部维护一个可变的char数组，修改都是在这个数组上进行的，修改速度、性能优秀，并且提供了修改字符串的常见的方法：增、删、改、插</li>
</ul>
<h1 id="stringbuilder常用方法" tabindex="-1"><a class="header-anchor" href="#stringbuilder常用方法" aria-hidden="true">#</a> StringBuilder常用方法</h1>
<ul>
<li>append()：追加内容</li>
<li>replace()：替换部分内容</li>
<li>delete()：删除部分内容</li>
<li>insert()：插入内容</li>
<li>reverse()：翻转内容</li>
</ul>
</div></template>
