<template><div><h2 id="什么是sentinel" tabindex="-1"><a class="header-anchor" href="#什么是sentinel" aria-hidden="true">#</a> 什么是Sentinel</h2>
<p>Sentinel也是Spring Cloud Alibaba的组件</p>
<p>Sentinel英文翻译&quot;哨兵\门卫&quot;</p>
<p>随着微服务的流行，服务和服务之间的稳定性变得越来越重要。Sentinel 以流量为切入点，从流量控制、熔断降级、系统负载保护等多个维度保护服务的稳定性。</p>
<p>官网地址</p>
<p>https://sentinelguard.io/zh-cn/</p>
<p>下载地址</p>
<p>https://github.com/alibaba/Sentinel/releases</p>
<h2 id="为什么需要sentinel" tabindex="-1"><a class="header-anchor" href="#为什么需要sentinel" aria-hidden="true">#</a> 为什么需要Sentinel</h2>
<ul>
<li>
<p>丰富的应用场景</p>
<p>双11,秒杀,12306抢火车票</p>
</li>
<li>
<p>完备的实时状态监控</p>
<p>可以支持显示当前项目各个服务的运行和压力状态,分析出每台服务器处理的秒级别的数据</p>
</li>
<li>
<p>广泛的开源生态</p>
<p>很多技术可以和Sentinel进行整合,SpringCloud,Dubbo,而且依赖少配置简单</p>
</li>
<li>
<p>完善的SPI扩展</p>
<p>Sentinel支持程序设置各种自定义的规则</p>
</li>
</ul>
<h2 id="基本配置" tabindex="-1"><a class="header-anchor" href="#基本配置" aria-hidden="true">#</a> 基本配置</h2>
<p>我们找一个相对简单的模块测试和观察限流效果</p>
<p>以csmall-stock-webapi模块为例</p>
<p>添加pom依赖如下</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-sentinel<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>application-dev.yml修改配置如下</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">8848</span>
    <span class="token key atrule">sentinel</span><span class="token punctuation">:</span>
      <span class="token key atrule">transport</span><span class="token punctuation">:</span>
        <span class="token key atrule">dashboard</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">8080</span> <span class="token comment"># 配置Sentinel仪表台的位置</span>
        <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8721</span> <span class="token comment"># 真正执行限流的端口也要设置一下,注意这个端口其他微服务项目不能相同</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>sentinel.transport.port每个微服务项目不能相同</p>
<h2 id="流控与降级" tabindex="-1"><a class="header-anchor" href="#流控与降级" aria-hidden="true">#</a> 流控与降级</h2>
<p>Sentinel限流针对控制层方法，也就是说我们要到Controller类中的方法上去做设置</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">"/reduce/count"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ApiOperation</span><span class="token punctuation">(</span><span class="token string">"减少商品库存业务"</span><span class="token punctuation">)</span>
<span class="token comment">// @SentinelResource标记的方法会被Sentinel监控</span>
<span class="token comment">// ()里面的内容是这个监控的名称,我们可以在"仪表台"中看到</span>
<span class="token comment">// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓</span>
<span class="token annotation punctuation">@SentinelResource</span><span class="token punctuation">(</span><span class="token string">"减少库存方法(控制器)"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">JsonResult</span> <span class="token function">reduceCommodityCount</span><span class="token punctuation">(</span><span class="token class-name">StockReduceCountDTO</span> stockReduceCountDTO<span class="token punctuation">)</span><span class="token punctuation">{</span>
    stockService<span class="token punctuation">.</span><span class="token function">reduceCommodityCount</span><span class="token punctuation">(</span>stockReduceCountDTO<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">JsonResult</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token string">"商品库存减少完成!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是被流控的请求只有一个错误,没有错误提示,不方便给用户反馈</p>
<p>我们应该在开发时,对于被流控的请求给与相关提示</p>
<p>StockController中编写代码如下</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>
<span class="token keyword">private</span> <span class="token class-name">IStockService</span> stockService<span class="token punctuation">;</span>
<span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">"/reduce/count"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ApiOperation</span><span class="token punctuation">(</span><span class="token string">"减少商品库存业务"</span><span class="token punctuation">)</span>
<span class="token comment">// @SentinelResource标记的方法会被Sentinel监控</span>
<span class="token comment">// value的值是这个监控的名称,我们可以在"仪表台"中看到</span>
<span class="token comment">// blockHandler的值指定了请求被限流时运行的方法名称</span>
<span class="token annotation punctuation">@SentinelResource</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"减少库存方法(控制器)"</span><span class="token punctuation">,</span>blockHandler <span class="token operator">=</span> <span class="token string">"blockError"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">JsonResult</span> <span class="token function">reduceCommodityCount</span><span class="token punctuation">(</span><span class="token class-name">StockReduceCountDTO</span> stockReduceCountDTO<span class="token punctuation">)</span><span class="token punctuation">{</span>
    stockService<span class="token punctuation">.</span><span class="token function">reduceCommodityCount</span><span class="token punctuation">(</span>stockReduceCountDTO<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">JsonResult</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token string">"商品库存减少完成!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// Sentinel 限流方法应该满足如下要求</span>
<span class="token comment">// 1.必须是public修改</span>
<span class="token comment">// 2.返回值类型必须和控制方法一致(JsonResult)</span>
<span class="token comment">// 3.方法名称要和控制器方法限流注解中规定的名称一致(blockError)</span>
<span class="token comment">// 4.参数列表必须和控制器一致,可以在所以参数后声明BlockException来获得限流异常</span>
<span class="token keyword">public</span> <span class="token class-name">JsonResult</span> <span class="token function">blockError</span><span class="token punctuation">(</span><span class="token class-name">StockReduceCountDTO</span> stockReduceCountDTO<span class="token punctuation">,</span>
                             <span class="token class-name">BlockException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">JsonResult</span><span class="token punctuation">.</span><span class="token function">failed</span><span class="token punctuation">(</span><span class="token class-name">ResponseCode</span><span class="token punctuation">.</span>BAD_REQUEST<span class="token punctuation">,</span><span class="token string">"服务器忙,请稍后再试"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>降级功能和我们之前学习的统一异常处理类有相似的地方</p>
<p>但是降级是Sentinel的功能</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">"/reduce/count"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ApiOperation</span><span class="token punctuation">(</span><span class="token string">"减少商品库存业务"</span><span class="token punctuation">)</span>
<span class="token comment">// @SentinelResource标记的方法会被Sentinel监控</span>
<span class="token comment">// value的值是这个监控的名称,我们可以在"仪表台"中看到</span>
<span class="token comment">// blockHandler的值指定了请求被限流时运行的方法名称</span>
<span class="token annotation punctuation">@SentinelResource</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"减少库存方法(控制器)"</span><span class="token punctuation">,</span>blockHandler <span class="token operator">=</span> <span class="token string">"blockError"</span><span class="token punctuation">,</span>
                    fallback <span class="token operator">=</span> <span class="token string">"fallbackError"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">JsonResult</span> <span class="token function">reduceCommodityCount</span><span class="token punctuation">(</span><span class="token class-name">StockReduceCountDTO</span> stockReduceCountDTO<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// 生成随机出触发降级流程</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">&lt;</span><span class="token number">0.5</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> 
          <span class="token class-name">CoolSharkServiceException</span><span class="token punctuation">(</span><span class="token class-name">ResponseCode</span><span class="token punctuation">.</span>INTERNAL_SERVER_ERROR<span class="token punctuation">,</span><span class="token string">"异常"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    stockService<span class="token punctuation">.</span><span class="token function">reduceCommodityCount</span><span class="token punctuation">(</span>stockReduceCountDTO<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">JsonResult</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token string">"商品库存减少完成!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 这个方法是Sentinel注解中fallback属性指定的降级方法</span>
<span class="token comment">// 当前控制器方法运行发生异常时,Sentinel会运行下面的降级方法</span>
<span class="token comment">// 降级方法中,可以不直接结束请求,而去运行一些代替代码或者补救措施</span>
<span class="token comment">// 让用户获得最低限度的响应</span>
<span class="token keyword">public</span> <span class="token class-name">JsonResult</span> <span class="token function">fallbackError</span><span class="token punctuation">(</span><span class="token class-name">StockReduceCountDTO</span> stockReduceCountDTO<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">JsonResult</span><span class="token punctuation">.</span><span class="token function">failed</span><span class="token punctuation">(</span><span class="token class-name">ResponseCode</span><span class="token punctuation">.</span>BAD_REQUEST<span class="token punctuation">,</span><span class="token string">"因为运行异常,服务降级"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>blockHandler和fallback的区别</strong>
两者都是不能正常调用资源返回值的顶替处理逻辑.
blockHander只能处理BlockException 流控限制之后的逻辑.
fallback处理的是资源调用异常的降级逻辑.</p>
</blockquote>
</div></template>
