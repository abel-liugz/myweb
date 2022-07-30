<template><div><p>反射是java中的动态机制，它允许我们在程序运行期间再确定类的实例化，方法的调用，属性的调用等，而不是传统意义上的在编码期间确定。因此，反射可以大大的提高代码的灵活度，但是随之而来的是更多的系统开销和较慢的运行速度，因此不能过度的依赖反射。</p>
<h2 id="class类" tabindex="-1"><a class="header-anchor" href="#class类" aria-hidden="true">#</a> class类</h2>
<p>Class的每一个实例用于表示JVM加载的一个类，所以我们也称Class的实例 为类的类对象。 当JVM加载一个类时会同时实例化一个Class的实例与之对应，这个Class实例 中会保存该类的一切信息(类名，有哪些方法，构造器，属性，注解等等) 我们在程序运行期间通过某个类的类对象来操作这个类。因此使用反射操作某个 类的第一件事就是获取该类的类对象</p>
<h2 id="获取一个类的类对象有三种方式" tabindex="-1"><a class="header-anchor" href="#获取一个类的类对象有三种方式" aria-hidden="true">#</a> 获取一个类的类对象有三种方式：</h2>
<ul>
<li>类名.class 例如: Class cls = String.class; Class cls = int.class (基本类型只能通过这种方式获取类对象)</li>
<li>Class.forName(String className) 通过Class的静态方法forName，传入对应类的完全限定名(包名.类名)的 形式获取类对象 Class cls = Class.forName(&quot;java.lang.String&quot;);</li>
<li>通过类加载器ClassLoader加载类对象</li>
</ul>
<h2 id="使用反射机制进行对象的实例化" tabindex="-1"><a class="header-anchor" href="#使用反射机制进行对象的实例化" aria-hidden="true">#</a> 使用反射机制进行对象的实例化</h2>
<ul>
<li>
<p>Class提供的方法</p>
<ul>
<li>Object newInstance()：该方法可以使用其表示的类的无参构造器进行对象实例化</li>
</ul>
</li>
<li>
<p>使用有参构造器实例化对象</p>
<ul>
<li>加载类对象</li>
<li>获取指定的构造器：Person(String name,int age)</li>
</ul>
</li>
<li>
<p>使用反射机制调用方法</p>
<ul>
<li>调用无参数方法
<ul>
<li>通过类对象获取要调用的方法</li>
<li>通过方法对象执行该方法</li>
</ul>
</li>
<li>调用有参方法</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ReflectDemo5</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
      <span class="token class-name">Class</span> cls <span class="token operator">=</span> <span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span><span class="token string">"reflect.Person"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">Object</span> o <span class="token operator">=</span> cls<span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token comment">//say(String info)</span>
      <span class="token class-name">Method</span> m <span class="token operator">=</span> cls<span class="token punctuation">.</span><span class="token function">getMethod</span><span class="token punctuation">(</span><span class="token string">"say"</span><span class="token punctuation">,</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      m<span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span>o<span class="token punctuation">,</span><span class="token string">"hello~~"</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//p.say("hello~~")</span>

      <span class="token comment">//say(String info,int sum)</span>
      <span class="token class-name">Method</span> m2 <span class="token operator">=</span> cls<span class="token punctuation">.</span><span class="token function">getMethod</span><span class="token punctuation">(</span><span class="token string">"say"</span><span class="token punctuation">,</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span><span class="token keyword">int</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      m2<span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span>o<span class="token punctuation">,</span><span class="token string">"嘿嘿"</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>访问私有方法</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ReflectDemo6</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
      <span class="token class-name">Person</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//        p.hehe();//编译不通过!</span>

      <span class="token class-name">Class</span> cls <span class="token operator">=</span> <span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span><span class="token string">"reflect.Person"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">Object</span> o <span class="token operator">=</span> cls<span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token comment">//获取私有方法:private void hehe()</span>
<span class="token comment">//        Method m = cls.getMethod("hehe");</span>
      <span class="token comment">//获取私有方法不能用getMethod,(这用来获取公开方法)</span>
      <span class="token class-name">Method</span> m <span class="token operator">=</span> cls<span class="token punctuation">.</span><span class="token function">getDeclaredMethod</span><span class="token punctuation">(</span><span class="token string">"hehe"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      m<span class="token punctuation">.</span><span class="token function">setAccessible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//强制访问</span>
      m<span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//o.hehe()</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</div></template>
