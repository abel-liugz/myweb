<template><div><h2 id="双向链表" tabindex="-1"><a class="header-anchor" href="#双向链表" aria-hidden="true">#</a> 双向链表</h2>
<h3 id="什么是双向链表" tabindex="-1"><a class="header-anchor" href="#什么是双向链表" aria-hidden="true">#</a> 什么是双向链表</h3>
<blockquote>
<p>双向链表是一种数据结构，由诺干个节点构成，其中每个节点均有三部分构成，分别是前驱接节点，元素，后继节点。双向链表中的节点在内存中是游离状态
{.is-info}</p>
</blockquote>
<p><img src="/images/双向链表.png" alt="双向链表.png"></p>
<ul>
<li>
<p>双向链表的应用：LinkedList</p>
<blockquote>
<p>双向链表中的元素部分保存的都是对象，实际上保存的是元素对象的地址。</p>
</blockquote>
</li>
</ul>
<h3 id="对双向链表的操作" tabindex="-1"><a class="header-anchor" href="#对双向链表的操作" aria-hidden="true">#</a> 对双向链表的操作</h3>
<ul>
<li>添加元素
<ul>
<li>add(E) -- 在链表尾部添加元素
将元素封装到节点中，创建新节点，让新节点和前一个节点建立双向链表的关系。</li>
<li>add(int index,E e) -- 在指定位置插入元素
其过程实际上就是断开链，重新构建链的过程</li>
</ul>
</li>
<li>删除元素
<ul>
<li>remove(int index) -- 删除指定位置的元素
其过程实际上依然是断开链，重新构建链的过程</li>
</ul>
</li>
<li>查询元素
<ul>
<li>get(int index) - E
查询方式：对半查找
若查找的位置小于链表长度的一半，则从头节点开始循序查找；否则，从未接地爱你开始逆序查找，这样做可以提高查询效率。</li>
</ul>
</li>
</ul>
<blockquote>
<p>注意点：双向链表中没有下标，index表示的是节点从头开始的顺序位置，indiex并是不双向链表中的属性 {.is-warning}</p>
</blockquote>
<ul>
<li>修改元素
<ul>
<li>set(in index,E e) -- 将新元素替换指定位置的元素</li>
</ul>
</li>
</ul>
<h2 id="递归" tabindex="-1"><a class="header-anchor" href="#递归" aria-hidden="true">#</a> 递归</h2>
<blockquote>
<p>递归是一种思想，应用在边恒中体现为方法调用方法本身。{.is-info}</p>
</blockquote>
<h3 id="案例" tabindex="-1"><a class="header-anchor" href="#案例" aria-hidden="true">#</a> 案例</h3>
<ul>
<li>实现求某个数的阶乘</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token number">1</span><span class="token operator">!</span> <span class="token operator">=</span> <span class="token number">1</span>           
<span class="token number">2</span><span class="token operator">!</span> <span class="token operator">=</span> <span class="token number">2</span><span class="token operator">*</span><span class="token number">1</span>         <span class="token number">2</span><span class="token operator">*</span><span class="token number">1</span><span class="token operator">!</span>
<span class="token number">3</span><span class="token operator">!</span> <span class="token operator">=</span> <span class="token number">3</span><span class="token operator">*</span><span class="token number">2</span><span class="token operator">*</span><span class="token number">1</span>       <span class="token number">3</span><span class="token operator">*</span><span class="token number">2</span><span class="token operator">!</span>
<span class="token number">4</span><span class="token operator">!</span> <span class="token operator">=</span> <span class="token number">4</span><span class="token operator">*</span><span class="token number">3</span><span class="token operator">*</span><span class="token number">2</span><span class="token operator">*</span><span class="token number">1</span>     <span class="token number">4</span><span class="token operator">*</span><span class="token number">3</span><span class="token operator">!</span>
<span class="token number">5</span><span class="token operator">!</span> <span class="token operator">=</span> <span class="token number">5</span><span class="token operator">*</span><span class="token number">4</span><span class="token operator">*</span><span class="token number">3</span><span class="token operator">*</span><span class="token number">2</span><span class="token operator">*</span><span class="token number">1</span>   <span class="token number">5</span><span class="token operator">*</span><span class="token number">4</span><span class="token operator">!</span>
    
    
<span class="token comment">//f方法用于求出某个数的阶乘   </span>
<span class="token keyword">long</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span><span class="token punctuation">{</span>
   <span class="token keyword">if</span><span class="token punctuation">(</span>n<span class="token operator">==</span><span class="token number">1</span><span class="token punctuation">)</span>
       <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
   <span class="token keyword">return</span> n<span class="token operator">*</span><span class="token function">f</span><span class="token punctuation">(</span>n<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="/images/递归.png" alt="递归.png"></p>
<ul>
<li>斐波那契数列</li>
</ul>
<blockquote>
<p>斐波那契数列（Fibonacci）是这样一组数列：1 1 2 3 5 8 13 21 34 55...
第一位和第二位为1，从第三位开始，每一位的值等于前两位之和{.is-info}</p>
</blockquote>
<ol>
<li>求出斐波那契数列中第n个位置的值是多少</li>
</ol>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token function">f</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">==</span> <span class="token number">1</span> <span class="token operator">||</span> i <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token function">f</span><span class="token punctuation">(</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">f</span><span class="token punctuation">(</span>i <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>将斐波那契数列前n个数字输出</li>
</ol>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>i<span class="token operator">&lt;=</span>n<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token function">f</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">==</span> <span class="token number">1</span> <span class="token operator">||</span> i <span class="token operator">==</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token function">f</span><span class="token punctuation">(</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">f</span><span class="token punctuation">(</span>i <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="递归注意点" tabindex="-1"><a class="header-anchor" href="#递归注意点" aria-hidden="true">#</a> 递归注意点</h3>
<ol>
<li>递归必须有出口，否则会栈内存溢出（SOF）</li>
<li>递归是有深度的，若深度太深，可能会造成SOF</li>
</ol>
<p>栈内存回顾：
用法：当调用某个方式时，会在栈中为这个方法分配属于这个方法的栈帧区域，某个方法的栈帧中保存这个方法中的所有局部变量</p>
<h2 id="树-tree" tabindex="-1"><a class="header-anchor" href="#树-tree" aria-hidden="true">#</a> 树 - tree</h2>
<ul>
<li>树是数据结构，又若干个节点构成，其中有且仅有一个根节点。</li>
<li>树的术语：
<ul>
<li>高度：树的层次</li>
<li>根节点：有且仅有一个</li>
<li>度：树种节点的最大子节点数</li>
<li>叶子节点：度为0的节点
<img src="/images/树.png" alt="树.png"></li>
</ul>
</li>
</ul>
<h2 id="二叉树" tabindex="-1"><a class="header-anchor" href="#二叉树" aria-hidden="true">#</a> 二叉树</h2>
<ul>
<li>度为2的树，则为二叉树</li>
</ul>
<h3 id="二叉排序树" tabindex="-1"><a class="header-anchor" href="#二叉排序树" aria-hidden="true">#</a> 二叉排序树</h3>
<blockquote>
<p>二叉排序树（Binary Sort Tree）,又称为二叉查找树（Binary Search Tree），亦称二叉搜索树。
是数据结构中的一类。在一般情况下，查询效率比链表结构要高。{.is-info}</p>
</blockquote>
<ul>
<li>
<p>特点</p>
<ol>
<li>元素不能重复</li>
<li>左子树中的节点均小于根节点</li>
<li>右子树种的节点均大于根节点
<img src="/images/二叉排序树.png" alt="二叉排序树.png"></li>
</ol>
</li>
<li>
<p>二叉排序树的查询效率高于单向链表
单向链表中，查询元素，最差的情况要查询n次；而在二叉排序树中，每次比较，均可以排除将近一半的数据，所以查询次数会大大减少。</p>
</li>
<li>
<p>二叉排序树中的元素可以是其他引用类型，但要求改引用类型的对象之间是可比较大小的，如何保证对象之间能比较大小？
实现Comparable接口，在类中定义比较规则，则对象之间是可比较大小的。</p>
</li>
<li>
<p>如何保证二叉排序树中的元素是可比较大小的</p>
<ul>
<li>
<p>让元素所属的类实现接口Comparable</p>
</li>
<li>
<p>比较器：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">Comparable</span>：内比较器，类实现该接口后，需要重写其中的抽象方法，在类的内部定义比较规则
  观察<span class="token class-name">String</span>对象之间的比较
<span class="token class-name">Comparator</span>：外比较器，比较规则定义在类的外部
  通常用于：不改变原有比较规则，要使用新的、临时的比较规则，此时就可以在类的外部实现该接口，定义新的比较规则
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
<h4 id="定义二叉排序树" tabindex="-1"><a class="header-anchor" href="#定义二叉排序树" aria-hidden="true">#</a> 定义二叉排序树</h4>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BinarySearchTree</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span> <span class="token keyword">extends</span> <span class="token class-name">Comparable</span><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
    <span class="token comment">// 根节点</span>
    <span class="token keyword">private</span> <span class="token class-name">Node</span> root<span class="token punctuation">;</span>
    
    <span class="token comment">// 定义内部类表示节点</span>
    <span class="token keyword">private</span> <span class="token keyword">class</span> <span class="token class-name">Node</span> <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">E</span> ele<span class="token punctuation">;</span> <span class="token comment">// 节点中保存的元素对象</span>
        <span class="token keyword">private</span> <span class="token class-name">Node</span> left<span class="token punctuation">;</span> <span class="token comment">// 左子树指向的节点</span>
        <span class="token keyword">private</span> <span class="token class-name">Node</span> right<span class="token punctuation">;</span> <span class="token comment">// 右子树指向的节点</span>
        
        <span class="token comment">// 定义有参构造方法，用于创建节点</span>
        <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token class-name">E</span> ele<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>ele <span class="token operator">=</span> ele<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>添加元素
思路：</p>
<ul>
<li>判断root是否为null
<ul>
<li>为null，则将元素封装成节点，成为root，返回true</li>
<li>不为null，和root进行比较，比较的目的是将元素尝试添加为root的left/right子树
<ul>
<li>和root相等，添加失败，返回false，结束</li>
<li>大于root，尝试添加为root的right，判断right是否为null
<ul>
<li>为null，则让新元素封装成节点，成为right，添加成功，返回true</li>
<li>不为null，继续喝right的节点进行比较，尝试将元素添加为right的left/right子树</li>
</ul>
</li>
<li>小于，同理</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
<li>
<p>查询元素</p>
<ul>
<li>判断root是否为null
<ul>
<li>为null，则树中没有节点，返回null</li>
<li>不为null，以root节点为基准，判断root是否为要找的目标节点
<ul>
<li>判断e是否和root的ele相等 -- compareTo
<ul>
<li>若相等，说明root为要找的节点，返回当前节点，结束</li>
<li>若e&gt;ele,则到节点的right去查找目标节点
<ul>
<li>若right为null，说明目标元素不存在于树中，返回null</li>
<li>若right不为null，判断right纸箱的接地爱你是否为要找的目标节点，重复上述过程</li>
</ul>
</li>
<li>若e&lt;ele,同理</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
<li>
<p>删除元素</p>
<ol>
<li>删除叶子节点：让其父节点指向它的引用为null</li>
<li>删除有一颗子树的节点：让父节点指向它的引用指向删除节点的子节点</li>
<li>删除有两棵子树的节点：可以选择让删除节点的前驱节点或后继节点上来替换该节点</li>
</ol>
</li>
</ul>
<h4 id="遍历二叉排序树中的元素" tabindex="-1"><a class="header-anchor" href="#遍历二叉排序树中的元素" aria-hidden="true">#</a> 遍历二叉排序树中的元素</h4>
<ul>
<li>
<p>二叉树的遍历：</p>
<ul>
<li>先序遍历：根 左 右</li>
<li>中序遍历：左 根 右 -- 得到升序排列的结果</li>
<li>后序遍历：左 右 根
<img src="/images/遍历二叉树.png" alt="遍历二叉树.png"></li>
</ul>
</li>
<li>
<p>重写toString</p>
</li>
</ul>
<blockquote>
<p>目的：实现输出引用，将二叉排序树中的元素遍历，并以以下格式返回：
若树中没有节点，返回[]；若树不为空，则返回[1,2,3,45,78]</p>
</blockquote>
<ol>
<li>定义方法完成中序遍历，要求该方法返回遍历后元素拼接成的字符串</li>
<li>重写toString方法，其中调用中序遍历的方法，用于获取所有元素</li>
</ol>
<blockquote>
<p>注意点：非static成员变量属于对象的，会随着对象的重新创建而重新初始化
{.is-warning}</p>
</blockquote>
<h4 id="二叉排序树在极端情况下存在的问题" tabindex="-1"><a class="header-anchor" href="#二叉排序树在极端情况下存在的问题" aria-hidden="true">#</a> 二叉排序树在极端情况下存在的问题</h4>
<ul>
<li>二叉排序树在极端情况下会产生失衡二叉树
<img src="/images/失衡二叉树.png" alt="失衡二叉树.png"></li>
<li>失衡二叉树其实是不希望存在的，因为它失去了二叉排序树的查询优势，现在这种失衡二叉树的查询效率和单向链表一样，此时它就是单向链表</li>
<li>数据结构在设计时已经考虑到了这个问题，所以出现了对二叉排序树的优化，产生了两种新的数据结构。这两种数据结构是基于二叉排序树的，保留了二叉排序树的优势，且避免了缺陷，分别是：
<ul>
<li>AVL树</li>
<li>红黑树</li>
</ul>
</li>
</ul>
<h3 id="avl树" tabindex="-1"><a class="header-anchor" href="#avl树" aria-hidden="true">#</a> AVL树</h3>
<blockquote>
<p>平衡二叉树
AVL树通过旋转（左旋、右旋）来保证二叉排序树的平衡状态，AVL树会保证树的左右子树高度差始终是≤1，AVL树达到的平衡状态是绝对平衡（左右字数的高度差≤1）
{.is-info}</p>
</blockquote>
<p><img src="/images/avl树.png" alt="avl树.png"></p>
<h3 id="红黑树" tabindex="-1"><a class="header-anchor" href="#红黑树" aria-hidden="true">#</a> 红黑树</h3>
<blockquote>
<p>红黑树是实现了自平衡的二叉排序树，红黑树达到的是相对平衡状态，而不是绝对平衡状态。
相对平衡状态是指左右子树的高度差可以大于1，红黑树中所有节点的颜色要么是黑色要么是红色{.is-info}</p>
</blockquote>
<h4 id="红黑树是怎么实现平衡状态的" tabindex="-1"><a class="header-anchor" href="#红黑树是怎么实现平衡状态的" aria-hidden="true">#</a> 红黑树是怎么实现平衡状态的</h4>
<p>通过旋转和调节节点的颜色，两种操作来保证书的平衡状态</p>
<h4 id="红黑树中节点的颜色" tabindex="-1"><a class="header-anchor" href="#红黑树中节点的颜色" aria-hidden="true">#</a> 红黑树中节点的颜色</h4>
<p>有两种节点颜色固定</p>
<ul>
<li>根节点必然是黑色的</li>
<li>新添加的节点颜色必然是红色的，不过添加成功后，节点的颜色可能被改变</li>
</ul>
<h4 id="红黑树保证平衡的规则" tabindex="-1"><a class="header-anchor" href="#红黑树保证平衡的规则" aria-hidden="true">#</a> 红黑树保证平衡的规则</h4>
<p>红黑树是通过旋转（左旋、右旋）和改变节点的颜色来保持树的平衡的
红黑树满足以下5大原则，则认为红黑树达到了平衡状态</p>
<ol>
<li>节点是红色或黑色</li>
<li>根节点是黑色的</li>
<li>所有叶子节点是黑色（叶子节点是NIL节点）</li>
<li>每个红色节点的两个子节点都是黑色（从每个叶子到根的所有路径上不能有两个连续的红色节点）</li>
<li>从任意一个节点到其每个叶子锁经历的简单路径行包含的黑色节点的个数相同
<img src="/images/红黑树.png" alt="红黑树.png"></li>
</ol>
<h4 id="应用1-treemap" tabindex="-1"><a class="header-anchor" href="#应用1-treemap" aria-hidden="true">#</a> 应用1：TreeMap</h4>
<p>TreeMap其实就是红黑树，其实现即为红黑树的视线</p>
<ol>
<li>通过debug观察红黑树数据结构</li>
<li>输出引用，观察toString是如何实现的？
结果是根据key升序排序的结果，即toString中使用了中序排序</li>
</ol>
<h4 id="应用2-treeset" tabindex="-1"><a class="header-anchor" href="#应用2-treeset" aria-hidden="true">#</a> 应用2：TreeSet</h4>
<p>TreeSet底层调用了TreeMap，其实质为想map中key的那一列保存元素，所以TreeSet也是红黑树的应用</p>
<h4 id="所有的set和map都有这样的关系" tabindex="-1"><a class="header-anchor" href="#所有的set和map都有这样的关系" aria-hidden="true">#</a> 所有的set和map都有这样的关系</h4>
<ul>
<li>HashSet -- HashMap  数据结构为散列表，输出引用，得到的结果为无序结果</li>
<li>TreeSet -- TreeMap  数据结构为红黑树，输出引用，得到的结果为中序遍历的结果</li>
<li>LinkedHashSet -- LinkedHashMap  输出引用，得到的结果为有序结果</li>
</ul>
<h3 id="散列表" tabindex="-1"><a class="header-anchor" href="#散列表" aria-hidden="true">#</a> 散列表</h3>
<ul>
<li>
<p>应用类：HashMap</p>
</li>
<li>
<p>散列表是一种数据结构，这种数据结构的实现：</p>
<ul>
<li>JDK1.8之前，散列表的数据结构为：数组+链表</li>
<li>JDK1.8开始，散列表的数据结构为：数组+链表+红黑树
<img src="/images/散列表.png" alt="散列表.png"></li>
</ul>
</li>
</ul>
</div></template>
