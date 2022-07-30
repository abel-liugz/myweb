<template><div><h1 id="异常处理机制" tabindex="-1"><a class="header-anchor" href="#异常处理机制" aria-hidden="true">#</a> 异常处理机制</h1>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>java中所有错误的超类为Throwable，其下有两个子类：Error和Exception<br>
Error的子类描述的都是系统错误，比如虚拟机内存溢出等<br>
Exception的子类描述的都是程序错误，比如空指针、下标越界<br>
通常程序中处理的异常都是Exception</p>
</div>
<h2 id="异常处理机制中的try-catch" tabindex="-1"><a class="header-anchor" href="#异常处理机制中的try-catch" aria-hidden="true">#</a> 异常处理机制中的try-catch</h2>
<ul>
<li>
<p>语法</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">try</span><span class="token punctuation">{</span>
  可能出现异常的代码片段
<span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">XXXException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
  出现异常后的处理代码
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>try语句不能独立存在，后面必须跟catch或者finally</p>
</div>
</li>
</ul>
<h2 id="异常处理机制中的finally" tabindex="-1"><a class="header-anchor" href="#异常处理机制中的finally" aria-hidden="true">#</a> 异常处理机制中的finally</h2>
<ul>
<li>finally块定义在异常处理机制中的最后一块。它可恶意直接跟在try之后，或者最后一个catch之后</li>
<li>finally可以保证只要程序执行到try语句块中，无论try语句块中的代码是否出现异常，最终finally都必定执行</li>
<li>finally通常用来释放资源这类操作</li>
</ul>
<h2 id="自动关闭特性" tabindex="-1"><a class="header-anchor" href="#自动关闭特性" aria-hidden="true">#</a> 自动关闭特性</h2>
<blockquote>
<p>JDK7之后，java提供了一个新的特性：自动关闭。指在IO操作中可以更简洁的使用异常处理机制完成最后的close操作</p>
</blockquote>
<ul>
<li>
<p>语法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">try</span><span class="token punctuation">(</span>
  定义需要在<span class="token keyword">finally</span>中调用close方法关闭的对象
<span class="token punctuation">)</span><span class="token punctuation">{</span>
  IO操作
<span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">XXXException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
  ···
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>上述语法中可以在try的“()”中定义的并初始化的对象必须实现了java.io.AutoCloseable接口，否则编译不通过</p>
</blockquote>
</li>
</ul>
<h2 id="throw关键字" tabindex="-1"><a class="header-anchor" href="#throw关键字" aria-hidden="true">#</a> throw关键字</h2>
<p>throw用来对外主动抛出一个异常，通常下面两种情况主动对外抛出：</p>
<ul>
<li>当程序遇到一个满足语法，但是不满足业务要求是，可以抛出一个异常给调用者</li>
<li>程序执行遇到一个异常，但是该异常不应当在当前代码片段被解决时可以抛出给调用者</li>
</ul>
<h2 id="throws关键字" tabindex="-1"><a class="header-anchor" href="#throws关键字" aria-hidden="true">#</a> throws关键字</h2>
<p>当一个方法中使用throw抛出一个非RuntimeException异常时，就要在给方法上使用throws声明这个异常的抛出，此时调用该方法的代码就必须处理这个异常，否则编译不通过，处理手段有两种：</p>
<ul>
<li>
<p>使用try-catch捕获并处理这个异常</p>
</li>
<li>
<p>在当前方法上继续使用throws声明该异常的抛出给调用者解决</p>
<blockquote>
<p>永远不应当在main方法上使用throws</p>
</blockquote>
</li>
</ul>
<h2 id="java异常可以分为两种" tabindex="-1"><a class="header-anchor" href="#java异常可以分为两种" aria-hidden="true">#</a> Java异常可以分为两种：</h2>
<ul>
<li>可检测异常：可检测异常经编译器验证，对于声明抛出异常的任何方法，编译器将强制执行处理或声明规则，不捕捉这个异常，编译器就通不过，不允许编译</li>
<li>非检测异常：非检测异常不遵循处理或声明规则。在生产次类异常时，不一定非要采取任何适当操作，编译器不会检查是否已经解决了这样一个异常</li>
<li>RuntimeException类属于非检测异常</li>
</ul>
<h2 id="常见的runtimeexception子类" tabindex="-1"><a class="header-anchor" href="#常见的runtimeexception子类" aria-hidden="true">#</a> 常见的RuntimeException子类</h2>
<ul>
<li>IllegalArgumentException：抛出的异常表明箱方法传递了一个不合法的参数</li>
<li>NullPointException：当应用程序试图在需要对象的地方使用null时，抛出该异常</li>
<li>ArrayIndexOutOfBoundsExcetion：当使用的数组下班超出数组允许范围是，抛出该异常</li>
<li>ClassCastException：当试图将对象强转为不是实例的子类是，抛出该异常</li>
<li>NumberFormatException：当应用程序视图将字符串转换成一种数值类型，但该字符串不能转换为适当格式是，抛出该异常</li>
</ul>
<h2 id="自定义异常" tabindex="-1"><a class="header-anchor" href="#自定义异常" aria-hidden="true">#</a> 自定义异常</h2>
<p>自定义异常通常用来定义哪些业务上的异常问题</p>
<p>定义自定义异常需要注意的问题：</p>
<ul>
<li>异常的类名要做到见名知意</li>
<li>需要是Exception的子类</li>
<li>提供超类异常提供的所有种类构造器</li>
</ul>
</div></template>
