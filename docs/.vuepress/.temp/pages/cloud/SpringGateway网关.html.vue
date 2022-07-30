<template><div><h1 id="springgateway-网关" tabindex="-1"><a class="header-anchor" href="#springgateway-网关" aria-hidden="true">#</a> SpringGateway 网关</h1>
<h2 id="奈非框架简介" tabindex="-1"><a class="header-anchor" href="#奈非框架简介" aria-hidden="true">#</a> 奈非框架简介</h2>
<p>早期(2020年前)奈非提供的微服务组件和框架受到了很多开发者的欢迎</p>
<p>这些框架和Spring Cloud Alibaba的对应关系我们要知道</p>
<p>Nacos对应Eureka 都是注册中心</p>
<p>Dubbo对应ribbon+feign都是实现微服务间调用</p>
<p>Sentinel对应Hystrix都是项目限流熔断降级组件</p>
<p>Gateway对应zuul都是项目的网关</p>
<p>Gateway不是阿里巴巴的而是Spring提供的</p>
<h2 id="什么是网关" tabindex="-1"><a class="header-anchor" href="#什么是网关" aria-hidden="true">#</a> 什么是网关</h2>
<p>&quot;网关&quot;网是网络,关是关口\关卡</p>
<p>关口\关卡的意思就是&quot;统一入口&quot;</p>
<p>网关:就是网络中的统一入口</p>
<p>程序中的网关就是微服务项目提供的外界所有请求统一访问的微服务项目</p>
<p>因为提供了统一入口之后,方便对所有请求进行统一的检查和管理</p>
<p><img src="/什么是网关.png" alt="什么是网关.png">
网关的主要功能有</p>
<ul>
<li>将所有请求统一由经过网关</li>
<li>网关可以对这些请求进行检查</li>
<li>网关方便记录所有请求的日志</li>
<li>网关可以统一将所有请求路由到正确的模块\服务上</li>
</ul>
<p>路由的近义词就是&quot;分配&quot;</p>
<h2 id="spring-gateway简介" tabindex="-1"><a class="header-anchor" href="#spring-gateway简介" aria-hidden="true">#</a> Spring Gateway简介</h2>
<p>我们使用Spring Gateway作为当前项目的网关框架</p>
<p>Spring Gateway是Spring自己编写的,也是SpringCloud中的组件</p>
<p>SpringGateway官网</p>
<p>https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/</p>
<p>网关项目git地址</p>
<p>https://gitee.com/jtzhanghl/gateway-demo.git</p>
<h2 id="简单网关演示" tabindex="-1"><a class="header-anchor" href="#简单网关演示" aria-hidden="true">#</a> 简单网关演示</h2>
<p>网关是一个我们创建的项目,不是一个需要安装的软件</p>
<p>网关也是当前微服务项目的一员,也要注册到Nacos,所以保证Nacos的运行</p>
<p>运行之前,我们看一下网关演示项目已经存在的基本结构</p>
<p>beijing和shanghai是编写好的两个项目</p>
<p>gateway没有编写yml文件配置</p>
<p>要想实现网关的路由效果需要修改yml文件如下</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">9000</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> gateway
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">8848</span>
    <span class="token key atrule">gateway</span><span class="token punctuation">:</span>
      <span class="token key atrule">routes</span><span class="token punctuation">:</span>  <span class="token comment"># gateway开始配置路由信息</span>
        <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> gateway<span class="token punctuation">-</span>shanghai
          <span class="token key atrule">uri</span><span class="token punctuation">:</span> lb<span class="token punctuation">:</span>//shanghai
          <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> Path=/sh/<span class="token important">**</span>
        <span class="token comment"># 如果java访问这个数字元素的方式:spring.cloud.gateway.routes[0].predicates[0]</span>
        <span class="token comment"># routes属性实际上是一个数组,yml文件中出现 "- ...."配置时表示当前配置时一个数组元素</span>
        <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> gateway<span class="token punctuation">-</span>beijing <span class="token comment"># 这个配置指定这个路由的名称,这个名称和其他任何位置没有关联</span>
                              <span class="token comment"># 只需要注意不能再和其他路由名称重复</span>
          <span class="token comment"># uri设置路由的目标</span>
          <span class="token comment"># lb是LoadBalance(负载均衡)的缩写,beijing是注册到nacos的服务名称</span>
          <span class="token key atrule">uri</span><span class="token punctuation">:</span> lb<span class="token punctuation">:</span>//beijing
          <span class="token comment"># 我们需要设置一个条件,当访问路径满足特定条件是,使用当前路由规则</span>
          <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
            <span class="token comment"># predicates翻译为断言,所谓断言就是判断一个条件是否满足</span>
            <span class="token comment"># Path 是路径断言,意思是满足路径为XXX时使用这个路由</span>
            <span class="token punctuation">-</span> Path=/bj/<span class="token important">**</span>
            <span class="token comment"># http://localhost:9000/bj/show 会路由到 9001/bj/show</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="内置断言" tabindex="-1"><a class="header-anchor" href="#内置断言" aria-hidden="true">#</a> 内置断言</h2>
<p>断言就是判断一个条件,如果条件满足就执行某个操作</p>
<p>predicates就是断言的意思</p>
<p>我们前面章节使用的Path就是内置断言中的一种,指访问的路径是否满足条件</p>
<p>除了路径断言之外,还有很多内置断言常见的内置断言列表</p>
<ul>
<li>after</li>
<li>before</li>
<li>between</li>
<li>cookie</li>
<li>header</li>
<li>host</li>
<li>method</li>
<li>path</li>
<li>query</li>
<li>remoteaddr</li>
</ul>
<p><strong>时间相关</strong></p>
<p>after,before,between</p>
<p>在指定时间之后,之前或之间</p>
<p>判断是否满足时间条件,如果满足才允许访问</p>
<p>我们先使用下面代码获得当前包含时区的系统时间表</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">ZonedDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用After设置必须在指定时间之后访问</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> gateway<span class="token punctuation">-</span>shanghai
  <span class="token key atrule">uri</span><span class="token punctuation">:</span> lb<span class="token punctuation">:</span>//shanghai
  <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Path=/sh/<span class="token important">**</span>
    <span class="token punctuation">-</span> After=2022<span class="token punctuation">-</span>06<span class="token punctuation">-</span>24T15<span class="token punctuation">:</span>30<span class="token punctuation">:</span>30.999+08<span class="token punctuation">:</span>00<span class="token punctuation">[</span>Asia/Shanghai<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用Before设置必须在指定时间之后访问</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> gateway<span class="token punctuation">-</span>shanghai
  <span class="token key atrule">uri</span><span class="token punctuation">:</span> lb<span class="token punctuation">:</span>//shanghai
  <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Path=/sh/<span class="token important">**</span>
    <span class="token punctuation">-</span> Before=2022<span class="token punctuation">-</span>06<span class="token punctuation">-</span>24T15<span class="token punctuation">:</span>34<span class="token punctuation">:</span>00.999+08<span class="token punctuation">:</span>00<span class="token punctuation">[</span>Asia/Shanghai<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用Between设置必须在指定时间之间访问</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> gateway<span class="token punctuation">-</span>shanghai
  <span class="token key atrule">uri</span><span class="token punctuation">:</span> lb<span class="token punctuation">:</span>//shanghai
  <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Path=/sh/<span class="token important">**</span>
    <span class="token punctuation">-</span> Between=2022<span class="token punctuation">-</span>06<span class="token punctuation">-</span>24T15<span class="token punctuation">:</span>34<span class="token punctuation">:</span>00.999+08<span class="token punctuation">:</span>00<span class="token punctuation">[</span>Asia/Shanghai<span class="token punctuation">]</span><span class="token punctuation">,</span>2022<span class="token punctuation">-</span>06<span class="token punctuation">-</span>24T15<span class="token punctuation">:</span>36<span class="token punctuation">:</span>20.999+08<span class="token punctuation">:</span>00<span class="token punctuation">[</span>Asia/Shanghai<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>要求指定参数</strong></p>
<p>Query断言,要求必须包含指定的参数才能访问资源</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> gateway<span class="token punctuation">-</span>shanghai
  <span class="token key atrule">uri</span><span class="token punctuation">:</span> lb<span class="token punctuation">:</span>//shanghai
  <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Path=/sh/<span class="token important">**</span>
    <span class="token punctuation">-</span> Query=name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="内置过滤器" tabindex="-1"><a class="header-anchor" href="#内置过滤器" aria-hidden="true">#</a> 内置过滤器</h2>
<p>Gateway还提供的内置过滤器</p>
<p>不要filter混淆</p>
<p>内置过滤器允许我们在路由请求到目标资源的同时,对这个请求进行一些加工或处理</p>
<p>下面我们使用AddRequestParameter过滤器,想请求中添加参数</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> gateway<span class="token punctuation">-</span>shanghai
  <span class="token key atrule">uri</span><span class="token punctuation">:</span> lb<span class="token punctuation">:</span>//shanghai
  <span class="token key atrule">predicates</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> Path=/sh/<span class="token important">**</span>
    <span class="token punctuation">-</span> Query=name
  <span class="token key atrule">filters</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> AddRequestParameter=age<span class="token punctuation">,</span><span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>shanghai项目的控制器接收这个参数</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/show"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span><span class="token class-name">Integer</span> age<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">"这里是上海！"</span><span class="token operator">+</span>name<span class="token operator">+</span><span class="token string">","</span><span class="token operator">+</span>age<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启网关和shanghai项目</p>
<p>例如输入如下路径</p>
<p>http://localhost:9000/sh/show?name=tom</p>
<p>因为过滤器的存在,控制可以获取网关过滤器添加的参数值</p>
<p>其他内置过滤器和自定义过滤器的使用,可以查阅相关文档自己了解</p>
<h2 id="动态路由" tabindex="-1"><a class="header-anchor" href="#动态路由" aria-hidden="true">#</a> 动态路由</h2>
<p>如果项目微服务数量多</p>
<p>那么gateway项目yml文件配置也会越来越冗余,维护的工作量也会越来越大</p>
<p>所谓我们希望能够根据固定特征自动的路由到每个微服务模块</p>
<p>这个功能就是SpringGateway的动态路由功能</p>
<p>只需要在配置文件中配置开启动态路由功能即可</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> gateway
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">8848</span>
    <span class="token key atrule">gateway</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">locator</span><span class="token punctuation">:</span>
          <span class="token comment"># 开启Spring Gateway的动态路由功能</span>
          <span class="token comment"># 规则是根据注册到Nacos的项目名称作为路径的前缀,就可以访问到指定项目了</span>
          <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>开启之后访问项目的格式以beijing为例</p>
<p>localhost:9000/beijing/bj/show</p>
<h2 id="gateway和springmvc依赖冲突问题和解决" tabindex="-1"><a class="header-anchor" href="#gateway和springmvc依赖冲突问题和解决" aria-hidden="true">#</a> Gateway和SpringMvc依赖冲突问题和解决</h2>
<p>网关依赖</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-gateway<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>SpringMvc依赖</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这两个依赖在同一个项目中时,默认情况下启动会报错</p>
<p>SpringMvc依赖中自带一个Tomcat服务器</p>
<p>而Gateway依赖中自带一个Netty服务器</p>
<p>因为在启动服务时这个两个服务器都想启动,会因为争夺端口号和主动权而发生冲突</p>
<p>我们需要在yml文件中添加配置解决</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">main</span><span class="token punctuation">:</span>
    <span class="token key atrule">web-application-type</span><span class="token punctuation">:</span> reactive
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
