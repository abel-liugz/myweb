<template><div><h2 id="分页查询的优点" tabindex="-1"><a class="header-anchor" href="#分页查询的优点" aria-hidden="true">#</a> 分页查询的优点</h2>
<p>所谓分页,就是查询结果数据较多时,采用按页显示的方法,而不是一次性全部显示</p>
<p>分页的优点:</p>
<ol>
<li>服务器:一次性查询所有信息,服务器压力大,分页查询服务器压力小</li>
<li>客户端:一次性显示所有信息,需要更多流量,加载时间也会更长,分页显示没有这个问题</li>
<li>用户体验上:一般最有价值的信息都会在前几页显示,也方便用户记忆,多查询出来的数据使用几率很低</li>
</ol>
<h2 id="pagehelper实现分页查询" tabindex="-1"><a class="header-anchor" href="#pagehelper实现分页查询" aria-hidden="true">#</a> PageHelper实现分页查询</h2>
<p>我们可以使用sql语句中添加limit关键字的方法实现分页查询</p>
<p>但是查询分页内容时,我们要自己计算相关的分页信息和参数</p>
<p>分页逻辑无论什么业务都是类似的,所以有框架帮助我们高效实现分页功能</p>
<p>PageHelper框架可以实现我们提供页码和每页条数,自动实现分页效果,收集分页信息</p>
<p>PageHelper的分页原理就是在程序运行时,在sql语句尾部添加limit关键字,并按照分页信息向limit后追加分页数据</p>
<p>要想使用,首先还是添加依赖</p>
<p>我们在之前搭建的微服务项目中先编写学习,建议使用csmall-order模块</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.github.pagehelper<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>pagehelper-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在添加seata支持时已经添加了pagehepler依赖</p>
<h2 id="pagehelper的基本使用" tabindex="-1"><a class="header-anchor" href="#pagehelper的基本使用" aria-hidden="true">#</a> PageHelper的基本使用</h2>
<p>我们在使用PageHelper框架进行分页查询时,先编写持久层代码(Mybatis框架将sql写在注解中或xml文件中效果相同)</p>
<p>例如我们在OrderMapper接口中添加查询订单的方法</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Select</span><span class="token punctuation">(</span><span class="token string">"select id,user_id,commodity_code,count,money from order_tbl"</span><span class="token punctuation">)</span>
<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Order</span><span class="token punctuation">></span></span> <span class="token function">findAllOrders</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>注意这个方法并不需要任何分页的参数或返回值,sql也不需要编写limit</p>
<p>都是在业务逻辑层中由PageHelper框架处理的</p>
<p>下面就转到业务逻辑层实现类,先编写一个方法使用PageHelper的功能</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 分页查询所有订单的方法</span>
<span class="token comment">// pageNum是要查询的页码</span>
<span class="token comment">// pageSize是每页的条数</span>
<span class="token keyword">public</span> <span class="token class-name">PageInfo</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Order</span><span class="token punctuation">></span></span> <span class="token function">getAllOrdersByPage</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> pageNum<span class="token punctuation">,</span><span class="token class-name">Integer</span> pageSize<span class="token punctuation">)</span><span class="token punctuation">{</span>

    <span class="token comment">// 利用PageHelper框架的功能,指定分页的查询的页码和每页条数</span>
    <span class="token comment">// pageNum为1时,就是查询第一页,和SpringData的分页不同(SpringData分页0表示第一页)</span>
    <span class="token class-name">PageHelper</span><span class="token punctuation">.</span><span class="token function">startPage</span><span class="token punctuation">(</span>pageNum<span class="token punctuation">,</span>pageSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 调用查询所有订单的方法</span>
    <span class="token comment">// 因为上面设置了分页查询的条件,所以下面的查询就会自动在sql语句后添加limit关键字</span>
    <span class="token comment">// 查询出的list就是需要查询的页码的数据</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Order</span><span class="token punctuation">></span></span> list<span class="token operator">=</span>orderMapper<span class="token punctuation">.</span><span class="token function">findAllOrders</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 我们完成了分页数据的查询,但是当前方法要求返回分页信息对象PageInfo</span>
    <span class="token comment">// PageInfo中可以包含分页数据和各种分页信息,这些信息都是自定计算出来的</span>
    <span class="token comment">// 要想获得这个对象,可以在执行分页查询后实例化PageInfo对象,所有分页信息会自动生成</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">PageInfo</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>PageInfo对象既包含查询数据结果,又包含分页信息</p>
<p>数据结构如下图</p>
<p><img src="/images/pageinfo结构.png" alt="pageinfo结构.png"></p>
<p>PageInfo具体的属性功能见下面列表</p>
<h2 id="pageinfo类中的分页信息解释" tabindex="-1"><a class="header-anchor" href="#pageinfo类中的分页信息解释" aria-hidden="true">#</a> PageInfo类中的分页信息解释</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//当前页</span>
<span class="token keyword">private</span> <span class="token keyword">int</span> pageNum<span class="token punctuation">;</span>
<span class="token comment">//每页的数量</span>
<span class="token keyword">private</span> <span class="token keyword">int</span> pageSize<span class="token punctuation">;</span>
<span class="token comment">//当前页的行数量</span>
<span class="token keyword">private</span> <span class="token keyword">int</span> size<span class="token punctuation">;</span>
<span class="token comment">//当前页面第一个元素在数据库中的行号</span>
<span class="token keyword">private</span> <span class="token keyword">int</span> startRow<span class="token punctuation">;</span>
<span class="token comment">//当前页面最后一个元素在数据库中的行号</span>
<span class="token keyword">private</span> <span class="token keyword">int</span> endRow<span class="token punctuation">;</span>
<span class="token comment">//总页数</span>
<span class="token keyword">private</span> <span class="token keyword">int</span> pages<span class="token punctuation">;</span>
<span class="token comment">//前一页页号</span>
<span class="token keyword">private</span> <span class="token keyword">int</span> prePage<span class="token punctuation">;</span>
<span class="token comment">//下一页页号</span>
<span class="token keyword">private</span> <span class="token keyword">int</span> nextPage<span class="token punctuation">;</span>
<span class="token comment">//是否为第一页</span>
<span class="token keyword">private</span> <span class="token keyword">boolean</span> isFirstPage<span class="token punctuation">;</span>
<span class="token comment">//是否为最后一页</span>
<span class="token keyword">private</span> <span class="token keyword">boolean</span> isLastPage<span class="token punctuation">;</span>
<span class="token comment">//是否有前一页</span>
<span class="token keyword">private</span> <span class="token keyword">boolean</span> hasPreviousPage<span class="token punctuation">;</span>
<span class="token comment">//是否有下一页</span>
<span class="token keyword">private</span> <span class="token keyword">boolean</span> hasNextPage<span class="token punctuation">;</span>
<span class="token comment">//导航条中页码个数</span>
<span class="token keyword">private</span> <span class="token keyword">int</span> navigatePages<span class="token punctuation">;</span>
<span class="token comment">//所有导航条中显示的页号</span>
<span class="token keyword">private</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> navigatepageNums<span class="token punctuation">;</span>
<span class="token comment">//导航条上的第一页页号</span>
<span class="token keyword">private</span> <span class="token keyword">int</span> navigateFirstPage<span class="token punctuation">;</span>
<span class="token comment">//导航条上的最后一页号</span>
<span class="token keyword">private</span> <span class="token keyword">int</span> navigateLastPage<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="控制层调用分页功能" tabindex="-1"><a class="header-anchor" href="#控制层调用分页功能" aria-hidden="true">#</a> 控制层调用分页功能</h2>
<p>在OrderController类中添加调用分页方法</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/page"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ApiOperation</span><span class="token punctuation">(</span><span class="token string">"分页查询订单"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ApiImplicitParams</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token annotation punctuation">@ApiImplicitParam</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"页码"</span><span class="token punctuation">,</span>name<span class="token operator">=</span><span class="token string">"pageNum"</span><span class="token punctuation">,</span>example <span class="token operator">=</span> <span class="token string">"1"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token annotation punctuation">@ApiImplicitParam</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"每页条数"</span><span class="token punctuation">,</span>name<span class="token operator">=</span><span class="token string">"pageSize"</span><span class="token punctuation">,</span>example <span class="token operator">=</span> <span class="token string">"10"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">JsonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">PageInfo</span><span class="token punctuation">&lt;</span><span class="token class-name">Order</span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token function">pageOrders</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> pageNum<span class="token punctuation">,</span><span class="token class-name">Integer</span> pageSize<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// 分页调用</span>
    <span class="token class-name">PageInfo</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Order</span><span class="token punctuation">></span></span> pageInfo<span class="token operator">=</span>orderService<span class="token punctuation">.</span><span class="token function">getAllOrdersByPage</span><span class="token punctuation">(</span>pageNum<span class="token punctuation">,</span>pageSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">JsonResult</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token string">"查询完成"</span><span class="token punctuation">,</span>pageInfo<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动Nacos\Seata</p>
<p>启动order</p>
<p>进行knife4j测试</p>
<p>可以观察控制台输出的运行的sql语句(会自动添加limit关键字)</p>
<h2 id="使用jsonpage返回结果" tabindex="-1"><a class="header-anchor" href="#使用jsonpage返回结果" aria-hidden="true">#</a> 使用JsonPage返回结果</h2>
<p>当前我们分页查询返回的类型是PageInfo</p>
<p>如果用这个类型就会出现任何调用这个方法的模块都需要添加PageHelper的依赖,这是不合理的</p>
<p>所以我们可以添加一个专门返回分页结果的类,代替PageInfo</p>
<p>我们定义一个JsonPage类型代替PageInfo,并编写一个PageInfo转换成JsonPage对象的方法在需要时使用</p>
<p>对应的模块添加依赖</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.github.pagehelper<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>pagehelper<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>5.2.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在restful包中新建一个JsonPage类</p>
<p>代码如下</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 通用支持分页查询的结果对象类型</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JsonPage</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>

    <span class="token comment">// 按照实际需求,定义这个类中的属性</span>
    <span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"当前页码"</span><span class="token punctuation">,</span>name <span class="token operator">=</span> <span class="token string">"pageNum"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> pageNum<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"每页条数"</span><span class="token punctuation">,</span>name <span class="token operator">=</span> <span class="token string">"pageSize"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> pageSize<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"总条数"</span><span class="token punctuation">,</span>name <span class="token operator">=</span> <span class="token string">"totalCount"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> totalCount<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"总页数"</span><span class="token punctuation">,</span>name <span class="token operator">=</span> <span class="token string">"totalPages"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> totalPages<span class="token punctuation">;</span>
    <span class="token comment">// 声明一个属性,来承载查询到的分页数据结果</span>
    <span class="token annotation punctuation">@ApiModelProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"分页数据"</span><span class="token punctuation">,</span>name <span class="token operator">=</span> <span class="token string">"list"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> list<span class="token punctuation">;</span>

    <span class="token comment">// 所有属性写完了,下面要编写将其他框架的分页结果转换成当前类对象的方法</span>
    <span class="token comment">// SpringDataElasticsearch或PageHelper等具有分页功能的框架,均有类似PageInfo的对象</span>
    <span class="token comment">// 我们可以分别编写方法,将它们转换成JsonPage对象,我们先只编写PageHelper的转换</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token class-name">JsonPage</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token function">restPage</span><span class="token punctuation">(</span><span class="token class-name">PageInfo</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> pageInfo<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 下面开始将pageInfo对象的属性赋值给JsonPage对象</span>
        <span class="token class-name">JsonPage</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> result<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">JsonPage</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        result<span class="token punctuation">.</span><span class="token function">setPageNum</span><span class="token punctuation">(</span>pageInfo<span class="token punctuation">.</span><span class="token function">getPageNum</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        result<span class="token punctuation">.</span><span class="token function">setPageSize</span><span class="token punctuation">(</span>pageInfo<span class="token punctuation">.</span><span class="token function">getPageSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        result<span class="token punctuation">.</span><span class="token function">setTotalCount</span><span class="token punctuation">(</span>pageInfo<span class="token punctuation">.</span><span class="token function">getTotal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        result<span class="token punctuation">.</span><span class="token function">setTotalPages</span><span class="token punctuation">(</span>pageInfo<span class="token punctuation">.</span><span class="token function">getPages</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        result<span class="token punctuation">.</span><span class="token function">setList</span><span class="token punctuation">(</span>pageInfo<span class="token punctuation">.</span><span class="token function">getList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 返回赋值完毕的JsonPage对象</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面去使用这个类</p>
<p>业务逻辑层接口项目添加方法</p>
<p>返回值使用JsonPage</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 分页查询所有订单的方法</span>
<span class="token class-name">JsonPage</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Order</span><span class="token punctuation">></span></span> <span class="token function">getAllOrdersByPage</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> pageNum<span class="token punctuation">,</span><span class="token class-name">Integer</span> pageSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>项目实现类中进行修改</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//     ↓↓↓↓↓↓↓↓</span>
<span class="token keyword">public</span> <span class="token class-name">JsonPage</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Order</span><span class="token punctuation">></span></span> <span class="token function">getAllOrdersByPage</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> pageNum<span class="token punctuation">,</span> <span class="token class-name">Integer</span> pageSize<span class="token punctuation">)</span><span class="token punctuation">{</span>

    <span class="token comment">// 利用PageHelper框架的功能,指定分页的查询的页码和每页条数</span>
    <span class="token comment">// pageNum为1时,就是查询第一页,和SpringData的分页不同(SpringData分页0表示第一页)</span>
    <span class="token class-name">PageHelper</span><span class="token punctuation">.</span><span class="token function">startPage</span><span class="token punctuation">(</span>pageNum<span class="token punctuation">,</span>pageSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 调用查询所有订单的方法</span>
    <span class="token comment">// 因为上面设置了分页查询的条件,所以下面的查询就会自动在sql语句后添加limit关键字</span>
    <span class="token comment">// 查询出的list就是需要查询的页码的数据</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Order</span><span class="token punctuation">></span></span> list<span class="token operator">=</span>orderMapper<span class="token punctuation">.</span><span class="token function">findAllOrders</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 我们完成了分页数据的查询,但是当前方法要求返回分页信息对象PageInfo</span>
    <span class="token comment">// PageInfo中可以包含分页数据和各种分页信息,这些信息都是自定计算出来的</span>
    <span class="token comment">// 要想获得这个对象,可以在执行分页查询后实例化PageInfo对象,所有分页信息会自动生成</span>
    <span class="token comment">//     ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓</span>
    <span class="token keyword">return</span> <span class="token class-name">JsonPage</span><span class="token punctuation">.</span><span class="token function">restPage</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">PageInfo</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>业务逻辑层返回值的修改影响控制器方法的调用</p>
<p>再去修改控制器类中方法调用的位置</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>
<span class="token comment">//      ↓↓↓↓↓↓↓↓↓↓↓↓</span>
<span class="token keyword">private</span> <span class="token class-name">IOrderService</span> orderService<span class="token punctuation">;</span>

<span class="token comment">//...</span>
<span class="token comment">//                ↓↓↓↓↓↓↓↓</span>
<span class="token keyword">public</span> <span class="token class-name">JsonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">JsonPage</span><span class="token punctuation">&lt;</span><span class="token class-name">Order</span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token function">pageOrders</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> pageNum<span class="token punctuation">,</span> <span class="token class-name">Integer</span> pageSize<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token comment">// 分页调用</span>
      <span class="token comment">//↓↓↓↓↓↓        ↓↓↓↓↓↓↓↓↓  </span>
      <span class="token class-name">JsonPage</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Order</span><span class="token punctuation">></span></span> jsonPage<span class="token operator">=</span>orderService<span class="token punctuation">.</span><span class="token function">getAllOrdersByPage</span><span class="token punctuation">(</span>pageNum<span class="token punctuation">,</span>pageSize<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">//                            ↓↓↓↓↓↓↓↓↓↓</span>
      <span class="token keyword">return</span> <span class="token class-name">JsonResult</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token string">"查询完成"</span><span class="token punctuation">,</span>jsonPage<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
