<template><div><h2 id="java开发环境" tabindex="-1"><a class="header-anchor" href="#java开发环境" aria-hidden="true">#</a> Java开发环境</h2>
<ul>
<li>编译运行过程：
<ul>
<li>编译器：java源文件，经过编译，生成class字节码文件</li>
<li>运行期：JVM加载class文件并运行</li>
</ul>
</li>
<li>JVM：java虚拟机
<ul>
<li>堆：
<ul>
<li>new出来的对象（包括实例变量）</li>
<li>垃圾：没有任何引用所指向的对象。垃圾回收期（GC）不定时到内存中清扫垃圾，回收过程是透明的，不一定一发现垃圾就立刻回收，通过调用System.gc()可以建议JVM尽快调度GC回收</li>
<li>实例变量的生命周期：
<ul>
<li>创建对象时存储在堆中，对象被回收是一并被回收</li>
<li>内存泄漏：不再使用的对象没有被及时的回收，严重的泄漏会导致系统的崩溃。建议：不再使用得对象应及时将引用设置为null</li>
</ul>
</li>
</ul>
</li>
<li>栈：
<ul>
<li>存储正在调用的方法中的局部变量（包括方法的参数）</li>
<li>调用方法时，会在栈中为该方法分配一块对象的栈帧，栈帧中存储局部变量（包括方法的参数），方法调用结束时，栈帧被自动清除，局部变量一并被清除</li>
<li>局部变量的生命周期：
<ul>
<li>调用方法是存储在栈中，方法调用结束是与栈帧一并被清除</li>
</ul>
</li>
</ul>
</li>
<li>方法区：
<ul>
<li>calss字节码文件（包括静态变量、所有方法）</li>
<li>方法只有一份，通过this来区分具体的访问对象</li>
</ul>
</li>
</ul>
</li>
<li>JRE：java运行环境</li>
<li>JDK：java开发工具包</li>
</ul>
<h2 id="八种基本数据类型" tabindex="-1"><a class="header-anchor" href="#八种基本数据类型" aria-hidden="true">#</a> 八种基本数据类型</h2>
<ul>
<li>boolean</li>
<li>byte</li>
<li>char</li>
<li>short</li>
<li>int</li>
<li>float</li>
<li>long</li>
<li>double</li>
</ul>
<h3 id="类型间的转换" tabindex="-1"><a class="header-anchor" href="#类型间的转换" aria-hidden="true">#</a> 类型间的转换</h3>
<ul>
<li>自动（隐式）类型转换：小类型到大类型</li>
<li>强制类型转换：大类型到小类型</li>
<li>两点规则：
<ul>
<li>整数直接量可以直接赋值给byte、short、char，但不能超出范围</li>
<li>byte、short、char型数据参与运算时，系统一律自动将其转换为int再做运算</li>
</ul>
</li>
</ul>
<h2 id="运算符" tabindex="-1"><a class="header-anchor" href="#运算符" aria-hidden="true">#</a> 运算符</h2>
<ul>
<li>算术：+，-，*，/，%，++，–</li>
<li>关系：&gt;，&lt;，&gt;=，&lt;=，==，!=</li>
<li>逻辑：&amp;&amp;，||，!</li>
<li>赋值：=，+=，-=，*=，/=，%=</li>
<li>字符串连接符：+</li>
<li>条件（三目）：(条件)?(true):(false)</li>
</ul>
<h2 id="分支结构" tabindex="-1"><a class="header-anchor" href="#分支结构" aria-hidden="true">#</a> 分支结构</h2>
<ul>
<li>
<p>if结构：1条路</p>
</li>
<li>
<p>if…else结构：2条路</p>
</li>
<li>
<p>if…else if结构：多条路</p>
<ul>
<li>语法</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">boolean</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  语句块<span class="token number">1</span>
  <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">boolean</span><span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      语句块<span class="token number">2</span>
      <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">boolean</span><span class="token operator">-</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
          语句块<span class="token number">3</span>
          <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
              语句块<span class="token number">4</span>
              <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>执行过程</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>判断<span class="token keyword">boolean</span><span class="token operator">-</span><span class="token number">1</span>，若为<span class="token boolean">true</span>则执行语句块<span class="token function">1</span><span class="token punctuation">(</span>结束<span class="token punctuation">)</span>，若为<span class="token boolean">false</span>则
再判断<span class="token keyword">boolean</span><span class="token operator">-</span><span class="token number">2</span>，若为<span class="token boolean">true</span>则执行语句块<span class="token function">2</span><span class="token punctuation">(</span>结束<span class="token punctuation">)</span>，若为<span class="token boolean">false</span>则
再判断<span class="token keyword">boolean</span><span class="token operator">-</span><span class="token number">3</span>，若为<span class="token boolean">true</span>则执行语句块<span class="token function">3</span><span class="token punctuation">(</span>结束<span class="token punctuation">)</span>，若为<span class="token boolean">false</span>则 执行语句块<span class="token function">4</span><span class="token punctuation">(</span>结束<span class="token punctuation">)</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>switch...case结构</p>
<ul>
<li>优点：效率高、结构清晰</li>
<li>缺点：只能对整数判断相等</li>
<li>break：跳出switch
<code v-pre>switch可以用于 byte,short,int,char,String,枚举类型</code></li>
</ul>
</li>
</ul>
<h2 id="循环结构" tabindex="-1"><a class="header-anchor" href="#循环结构" aria-hidden="true">#</a> 循环结构</h2>
<ul>
<li>循环：反复多次执行一段相同或相似的代码</li>
<li>循环三要素：
1.循环变量的初始化
2.循环的条件(以循环变量为基础)
3.循环变量的改变(向着循环的结束变)</li>
<li>while结构：先判断后执行，有可能一次都不执行</li>
<li>do…while结构：先执行后判断，至少执行一次</li>
<li>for结构：应用率高、与次数相关的循环</li>
<li>增强for循环
<ul>
<li>JDK5之后推出的新特性</li>
<li>java编译器认可的</li>
</ul>
</li>
<li>三种循环结构的选择规则：
<ul>
<li>先看循环是否与次数相关：
<ul>
<li>若相关-----直接上for</li>
<li>若无关，再看要素1与要素3是否相同：
<ul>
<li>若相同-----直接上do…while</li>
<li>若不同-----直接上while</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
<li>break：跳出循环</li>
<li>continue：跳过循环体中剩余语句而进入下一次循环</li>
<li>嵌套循环：
<ul>
<li>循环中套循环，常常多行多列时使用，一般外层控制行，内层控制列</li>
<li>执行过程：外层循环走一次，内层循环走所有次</li>
<li>建议：嵌套层数越少越好，能用一层就不用两层，能用两层就不用三层</li>
<li>break只能跳出当前一层循环</li>
</ul>
</li>
</ul>
<h2 id="方法" tabindex="-1"><a class="header-anchor" href="#方法" aria-hidden="true">#</a> 方法</h2>
<ul>
<li>封装一段特定的业务逻辑功能</li>
<li>尽可能的独立，一个方法只干一件事</li>
<li>方法可以被反复多次调用</li>
<li>减少代码重复，有利于代码复用，有利于代码维护</li>
</ul>
<h3 id="定义方法-五要素" tabindex="-1"><a class="header-anchor" href="#定义方法-五要素" aria-hidden="true">#</a> 定义方法：五要素</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>修饰词 返回值类型 方法名<span class="token punctuation">(</span>参数列表<span class="token punctuation">)</span> <span class="token punctuation">{</span>undefined
 方法体<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>具体的业务逻辑功能实现
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="调用方法" tabindex="-1"><a class="header-anchor" href="#调用方法" aria-hidden="true">#</a> 调用方法</h3>
<ul>
<li>无返回值：方法名(有参传参);</li>
<li>有返回值：数据类型 变量 = 方法名(有参传参);</li>
</ul>
<h3 id="return" tabindex="-1"><a class="header-anchor" href="#return" aria-hidden="true">#</a> return</h3>
<ul>
<li>return 值; //1)结束方法的执行 2)返回结果给调用方</li>
<li>return; //1)结束方法的执行</li>
</ul>
<h2 id="数组" tabindex="-1"><a class="header-anchor" href="#数组" aria-hidden="true">#</a> 数组</h2>
<ul>
<li>是一种数据类型(引用类型)</li>
<li>相同数据类型元素的集合</li>
<li>访问：访问的是数组中的元素
<ul>
<li>通过(数组名.length)可以获取数组的长度(元素的个数)</li>
<li>通过下标/索引来访问数组中的元素</li>
</ul>
</li>
<li>遍历/迭代：从头到尾挨个走一遍</li>
<li>复制
<ul>
<li>System.arraycopy(a,1,b,0,4);</li>
<li>int[ ] b = Arrays.copyOf(a,6);</li>
</ul>
</li>
<li>排序
<ul>
<li>Arrays.sort(arr); //升序排列(从小到大)</li>
</ul>
</li>
<li>引用类型数组
<ul>
<li>与基本类型数组的区别：
<ul>
<li>给数组元素赋值必须new</li>
<li>若想访问对象数据必须通过数组元素点</li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="集合" tabindex="-1"><a class="header-anchor" href="#集合" aria-hidden="true">#</a> 集合</h2>
<blockquote>
<p>集合与数组一样，可以保存一组元素，并且提供了操作元素的相关方法，使用更方便</p>
</blockquote>
<ul>
<li>集合只能存放引用类型元素，并且存放的是元素的引用（地址）</li>
</ul>
<h3 id="相关接口" tabindex="-1"><a class="header-anchor" href="#相关接口" aria-hidden="true">#</a> 相关接口</h3>
<ul>
<li>
<p>java.util.Collection</p>
<blockquote>
<p>是所有集合的顶级接口，有多种实现类</p>
</blockquote>
<ul>
<li>
<p>java.util.List</p>
<blockquote>
<p>线性表，可重复集合，有序
这里可重复指的是集合中的元素是否可以重复，而判定重复元素的标准是依靠元素自身equals比较的结果，为true就认为是重复元素</p>
<ul>
<li>常见实现类：
<ul>
<li>ArrayList：内部使用数组实现，查询性能更好</li>
<li>LinkedList：内部使用链表实现，首尾增删元素性能更好</li>
</ul>
</li>
<li>常见方法：
<ul>
<li>get(int index)：获取指定下标对应的元素</li>
<li>set(int index, E e)：将给定元素设置到指定位置，返回值为该位置原有的元素（替换元素操作）</li>
<li>add(int index,E e)：将给定的元素插入到指定位置</li>
<li>remove(int index)：删除并返回指定位置上的元素</li>
<li>subList(int start,int end)：获取当前集合中指定范围内的子集，两个参数为开始与结束的下标（含头不含尾）</li>
<li>int size()：返回当前集合的元素个数</li>
<li>boolean isEmpty()：判断当前集合是否为空集</li>
<li>clear()：清空集合</li>
</ul>
</li>
</ul>
</blockquote>
</li>
<li>
<p>java.util.Set</p>
<blockquote>
<p>不可重复集合，大部分实现类是无序的</p>
</blockquote>
</li>
</ul>
</li>
</ul>
<h3 id="集合与元素equals方法相关的方法" tabindex="-1"><a class="header-anchor" href="#集合与元素equals方法相关的方法" aria-hidden="true">#</a> 集合与元素equals方法相关的方法</h3>
<ul>
<li>boolean contains(Object o)：判断当前集合是否包含给定元素</li>
<li>remove()：从集合中删除给定元素。对于可以存放重复元素的集合而言，只删除一次</li>
</ul>
<h3 id="集合间的操作" tabindex="-1"><a class="header-anchor" href="#集合间的操作" aria-hidden="true">#</a> 集合间的操作</h3>
<blockquote>
<p>集合提供了如取并集，删交集，判断包含子集等操作</p>
</blockquote>
<ul>
<li>boolean addAll(Collection c)：将给定集合中的所有元素添加到当前集合中，集合发生改变返回true</li>
<li>boolean containsAll(Collection c)：判断当前集合是否包含给定集合中的所有元素</li>
<li>boolean removeAlle(Collection c)：删除当前集合中与给定集合中的共有元素</li>
</ul>
<h3 id="遍历" tabindex="-1"><a class="header-anchor" href="#遍历" aria-hidden="true">#</a> 遍历</h3>
<h4 id="collection提供了统一的遍历集合方式-迭代器模式" tabindex="-1"><a class="header-anchor" href="#collection提供了统一的遍历集合方式-迭代器模式" aria-hidden="true">#</a> Collection提供了统一的遍历集合方式：迭代器模式</h4>
<p>Iterator iteartor()：该方法会获取一个用于遍历当前集合元素的迭代器</p>
<h4 id="java-util-iterator接口" tabindex="-1"><a class="header-anchor" href="#java-util-iterator接口" aria-hidden="true">#</a> java.util.Iterator接口</h4>
<p>迭代器接口，定义了迭代器遍历集合的相关操作
不同的集合都实现了一个用于遍历自身元素的迭代器实现类，我们无需记住它们的名字，用多态的角度把它们看做为Iterator即可
迭代器遍历集合遵循的步骤为：问、取、删，其中删除元素不是必要操作</p>
<h4 id="迭代器遍历过程中不得通过集合的方法增删元素" tabindex="-1"><a class="header-anchor" href="#迭代器遍历过程中不得通过集合的方法增删元素" aria-hidden="true">#</a> 迭代器遍历过程中不得通过集合的方法增删元素</h4>
<p>会抛出异常：ConcurrntModificationException
remove()：迭代器的remove方法可以将通过next方法获取的元素从集合中删除</p>
<h3 id="泛型" tabindex="-1"><a class="header-anchor" href="#泛型" aria-hidden="true">#</a> 泛型</h3>
<blockquote>
<p>JDK5之后推出的新特性
泛型也称为参数化类型，允许我们在使用一个类是指定他当中属性，方法参数或返回值的类型</p>
</blockquote>
<ul>
<li>泛型在集合中被广泛使用，用来指定集合中的元素类型</li>
<li>有泛型支持的类在使用时若不指定法宁的具体类型则默认为Object</li>
</ul>
<h3 id="集合与数组的转换" tabindex="-1"><a class="header-anchor" href="#集合与数组的转换" aria-hidden="true">#</a> 集合与数组的转换</h3>
<h4 id="集合转换为数组" tabindex="-1"><a class="header-anchor" href="#集合转换为数组" aria-hidden="true">#</a> 集合转换为数组</h4>
<ul>
<li>
<p>toArray()：将当前集合转换为一个数组</p>
<blockquote>
<p>重载的toArray方法要求传入一个数组，内部会将集合所有元素存入该数组后将其返回（前提是该数组长度&gt;=集合的size）。如果给定的数组长度不足，则方法内部会自行根据给定数组类型创建一个与集合size一致长度的数组并将集合元素存入后返回。</p>
</blockquote>
</li>
</ul>
<h4 id="数组转换为list集合" tabindex="-1"><a class="header-anchor" href="#数组转换为list集合" aria-hidden="true">#</a> 数组转换为list集合</h4>
<ul>
<li>
<p>asList()：将数组转换为一个List集合</p>
<blockquote>
<p>对数组转换的集合进行元素操作就是对原数组对应的操作</p>
</blockquote>
</li>
</ul>
<h3 id="集合的排序" tabindex="-1"><a class="header-anchor" href="#集合的排序" aria-hidden="true">#</a> 集合的排序</h3>
<ul>
<li>Collections.sort(List list)：对List集合进行自然排序</li>
</ul>
<h5 id="排序自定义类型" tabindex="-1"><a class="header-anchor" href="#排序自定义类型" aria-hidden="true">#</a> 排序自定义类型</h5>
<p>重载Collections.sort(List list,Comparator c)方法</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SortListDemo2</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Point</span><span class="token punctuation">></span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Point</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Point</span><span class="token punctuation">(</span><span class="token number">97</span><span class="token punctuation">,</span><span class="token number">88</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Point</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Point</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">,</span><span class="token number">9</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Point</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Point</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">/*
            Collections.sort(List list)在排序List集合时要求集合元素必须实现了
            Comparable接口。实现了该接口的类必须重写一个方法compareTo用与定义比较
            大小的规则，从而进行元素间的比较后排序。否则编译不通过。

            侵入性:
            当我们调用某个API时，其反过来要求我们为其修改其他额外的代码，这种现象就
            称为侵入性。侵入性不利于程序后期的维护，尽可能避免。
            compare:比较
         */</span>
<span class="token comment">//        Collections.sort(list);</span>

        <span class="token comment">//匿名内部类的形式创建一个比较器</span>
<span class="token comment">//        Comparator&lt;Point> com = new Comparator&lt;Point>() {</span>
<span class="token comment">//            @Override</span>
<span class="token comment">//            /**</span>
<span class="token comment">//             * 实现比较器接口后必须重写方法compare.</span>
<span class="token comment">//             * 该方法用来定义参数o1与参数o2的比较大小规则</span>
<span class="token comment">//             * 返回值用来表示o1与o2的大小关系</span>
<span class="token comment">//             */</span>
<span class="token comment">//            public int compare(Point o1, Point o2) {</span>
<span class="token comment">//                int len1 = o1.getX() * o1.getX() + o1.getY() * o1.getY();</span>
<span class="token comment">//                int len2 = o2.getX() * o2.getX() + o2.getY() * o2.getY();</span>
<span class="token comment">//                return len1-len2;</span>
<span class="token comment">//            }</span>
<span class="token comment">//        };</span>
<span class="token comment">//        Collections.sort(list,com);//回调模式</span>

<span class="token comment">//        Collections.sort(list,new Comparator&lt;Point>() {</span>
<span class="token comment">//            public int compare(Point o1, Point o2) {</span>
<span class="token comment">//                int len1 = o1.getX() * o1.getX() + o1.getY() * o1.getY();</span>
<span class="token comment">//                int len2 = o2.getX() * o2.getX() + o2.getY() * o2.getY();</span>
<span class="token comment">//                return len1-len2;</span>
<span class="token comment">//            }</span>
<span class="token comment">//        });</span>

        <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>list<span class="token punctuation">,</span><span class="token punctuation">(</span>o1<span class="token punctuation">,</span>o2<span class="token punctuation">)</span><span class="token operator">-></span>
                o1<span class="token punctuation">.</span><span class="token function">getX</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> o1<span class="token punctuation">.</span><span class="token function">getX</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> o1<span class="token punctuation">.</span><span class="token function">getY</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> o1<span class="token punctuation">.</span><span class="token function">getY</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span>
                o2<span class="token punctuation">.</span><span class="token function">getX</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> o2<span class="token punctuation">.</span><span class="token function">getX</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> o2<span class="token punctuation">.</span><span class="token function">getY</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> o2<span class="token punctuation">.</span><span class="token function">getY</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>实际开发中，我们并不会让我们自己定义的类去实现Comparable接口，因为这对我们的程序有侵入性</li>
<li>侵入性：当我们调用某个API功能时，其要求我们为其修改其他额外的代码，这个现象就是侵入性，侵入性越强的API越不利于程序的后期可维护性，应当尽量避免</li>
</ul>
<h4 id="排序字符串" tabindex="-1"><a class="header-anchor" href="#排序字符串" aria-hidden="true">#</a> 排序字符串</h4>
<p>java中提供的类,如:String,包装类都实现了Comparable接口,但有时候这些比较规则不能满足我们的排序需求时,同样可以临时提供一种比较规则来进行排序.</p>
<h3 id="map查找表" tabindex="-1"><a class="header-anchor" href="#map查找表" aria-hidden="true">#</a> Map查找表</h3>
<blockquote>
<p>Map体现的结构是一个多行两列的表格，其中左列称为key，右列称为value</p>
</blockquote>
<ul>
<li>Map总是成对保存数据，并且总是根据Key获取对应的value，因此我们可以将查询的对应条件作为key，查询的对应结果作为value，保存到Map中</li>
<li>Map有一个要求，Key不允许重复，因此如果使用重复的key存入value，则是替换value操作</li>
</ul>
<h4 id="常用实现类" tabindex="-1"><a class="header-anchor" href="#常用实现类" aria-hidden="true">#</a> 常用实现类</h4>
<ul>
<li>java.util.HashMap：散列表，使用散列算法实现的Map，当今查询速度最快的数据接口</li>
<li>java.util.TreeMap：使用二叉树实现的Map</li>
</ul>
<h4 id="遍历-1" tabindex="-1"><a class="header-anchor" href="#遍历-1" aria-hidden="true">#</a> 遍历</h4>
<p>支持四种遍历方式：</p>
<ul>
<li>Set ketset()：遍历所有的key</li>
<li>Set&lt;Entry&gt; entrySet()：遍历所有的键值对，以一个Entry实例形式存入set集合后返回，每个实例用于便是Map中额一组键值对，常用方法：
<ul>
<li>getKey()</li>
<li>getValue</li>
</ul>
</li>
<li>Collection values()：遍历所有的value</li>
<li>map.forEach((k,v)-&gt;System.out.println(k+&quot;:&quot;+v));</li>
</ul>
</div></template>
