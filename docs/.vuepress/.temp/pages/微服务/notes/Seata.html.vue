<template><div><h1 id="seata概述" tabindex="-1"><a class="header-anchor" href="#seata概述" aria-hidden="true">#</a> Seata概述</h1>
<h2 id="什么是seata" tabindex="-1"><a class="header-anchor" href="#什么是seata" aria-hidden="true">#</a> 什么是Seata</h2>
<p>Seata 是一款开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务</p>
<p>也是Spring Cloud Alibaba提供的组件</p>
<p>Seata官方文档</p>
<p>https://seata.io/zh-cn/</p>
<p>更多信息可以通过官方文档获取</p>
<h2 id="为什么需要seata" tabindex="-1"><a class="header-anchor" href="#为什么需要seata" aria-hidden="true">#</a> 为什么需要Seata</h2>
<p>我们首先简单复习一下事务的概念</p>
<blockquote>
<p>事务的4个特性:ACID特性</p>
<ul>
<li>原子性</li>
<li>一致性</li>
<li>隔离性</li>
<li>永久性</li>
</ul>
</blockquote>
<p>我们再业务中,必须保证数据库操作的原子性,也就是当前业务的所有数据库操作要么都成功,要么都失败</p>
<p>之前我们使用Spring声明式事务来解决本地的事务问题</p>
<p>但是现在是微服务环境,一个业务可能涉及多个模块的数据库操作</p>
<p>这种情况就需要专门的微服务状态下解决事务问题的&quot;分布式事务&quot;解决方案</p>
<p>我们学习的Seata就是这样的产品</p>
<p><strong>Seata将为用户提供了 AT、TCC、SAGA 和 XA 事务模式,为用户打造一站式的分布式解决方案。</strong></p>
<h2 id="seata的运行原理-at模式" tabindex="-1"><a class="header-anchor" href="#seata的运行原理-at模式" aria-hidden="true">#</a> Seata的运行原理(AT模式)</h2>
<p>观察下面事务模型</p>
<p><img src="/images/seata运行原理（at）.png" alt="seata运行原理（at）.png"></p>
<p>上面结构是比较典型的远程调用结构</p>
<p>如果account操作数据库失败需要让order模块和storage模块撤销(回滚)操作</p>
<p>声明式事务不能完成这个操作</p>
<p>需要Seata来解决</p>
<p>解决模型如下</p>
<p><img src="/images/seata模型.png" alt="seata模型.png"></p>
<p>Seata构成部分包含</p>
<ul>
<li>事务协调器TC</li>
<li>事务管理器TM</li>
<li>资源管理器RM</li>
</ul>
<p>我们项目使用AT(自动)模式完成分布式事务的解决</p>
<p>AT模式运行过程</p>
<p>1.事务的发起方(TM)会向事务协调器(TC)申请一个全局事务id,并保存</p>
<p>2.Seata会管理事务中所有相关的参与方的数据源,将数据操作之前和之后的镜像都保存在undo_log表中,这个表是seata框架规定的,方便提交(commit)或回滚(roll back)</p>
<p>3.事务的发起方(TM)会连同全局id一起通过远程调用运行资源管理器(RM)中的方法</p>
<p>4.资源管理器(RM)接收到全局id,并运行指定的方法,将运行的状态同步到事务协调器(TC)</p>
<p>5.如果运行整体没有发生异常,发起方(TM)会通过事务协调器通知所有分支,将本次事务所有对数据库的影响真正生效,反之如果任何一个RM运行发生异常,那么都会通知事务协调器,再由事务协调器通知所有分支,回滚数据中的数据</p>
<p>回滚时可以使用undo_log表中的数据来实现回滚</p>
<h2 id="其他模式简介" tabindex="-1"><a class="header-anchor" href="#其他模式简介" aria-hidden="true">#</a> 其他模式简介</h2>
<p>AT模式运行有一个非常明显的条件</p>
<p>就是事务分支都必须是操作关系型数据库(mysql\MariaDB\Oracle)</p>
<p>但是如果一个事务中有操作例如Redis这样的非关系型数据库时就不能使用AT模式了</p>
<p>除了AT模式之外还有TCC、SAGA 和 XA 事务模式</p>
<p><strong>TCC模式</strong></p>
<p>这个模式简单来说就是自己编写代码进行事务的提交和回滚</p>
<p>我们需要在各个分支业务逻辑层代码中编写一组三个方法(prepare\commit\rollback)</p>
<p>prepare:准备   commit:提交   rollback:回滚</p>
<p>prepare方法是无论事务成功与否都会运行的代码</p>
<p>commit当整体事务运行成功时运行的方法</p>
<p>rollback当整体事务运行失败是运行的方法</p>
<p>优点:虽然代码是自己写的,但是事务整体提交或回滚的机制仍然可用</p>
<p>缺点:每个业务都要编写3个方法来对应,代码冗余,而且业务入侵量大</p>
<p><strong>SAGA模式</strong></p>
<p>SAGA模式的思想是编写一个类,当指定的事务发生问题时,运行SAGA编写的回滚类</p>
<p>这样编写代码不影响已经编写好的业务逻辑代码</p>
<p>一般用于修改已经编写完成的老代码</p>
<p>缺点是每个事务分支都要编写一个类来回滚业务,</p>
<p>类数量多,开发量大</p>
<p>XA模式</p>
<p>支持XA协议的数据库分布式事务,使用比较少</p>
<h1 id="使用seata" tabindex="-1"><a class="header-anchor" href="#使用seata" aria-hidden="true">#</a> 使用Seata</h1>
<h2 id="配置seata" tabindex="-1"><a class="header-anchor" href="#配置seata" aria-hidden="true">#</a> 配置Seata</h2>
<p>cart\stock\order都是具备数据库操作的模块配置过程如下</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- seata和SpringBoot整合依赖 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>io.seata<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>seata-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!-- Seata完成分布式事务需要的两个相关依赖(Seata需要下面两个依赖中的资源) --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.github.pagehelper<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>pagehelper-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>fastjson<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面修改application-dev.yml</p>
<p>代码如下</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">seata</span><span class="token punctuation">:</span>
  <span class="token key atrule">tx-service-group</span><span class="token punctuation">:</span> csmall_group <span class="token comment">#定义分组名称</span>
  <span class="token key atrule">service</span><span class="token punctuation">:</span>
    <span class="token key atrule">vgroup-mapping</span><span class="token punctuation">:</span>
      <span class="token key atrule">csmall_group</span><span class="token punctuation">:</span> default  <span class="token comment"># 使用seata默认事务配置</span>
    <span class="token key atrule">grouplist</span><span class="token punctuation">:</span> 
      <span class="token key atrule">default</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">8091</span> <span class="token comment"># 8091是seata默认的地址</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意同一个事务必须在同一个tx-service-group中</p>
<p>同时指定相同的seata地址和端口</p>
<p>business模块配置更简单</p>
<p>因为它是服务的发起者,不需要数据库操作,所以配置更简单</p>
<p>但是它是TM的角色,不配置肯定是不行的</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>io.seata<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>seata-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>application-dev.yml是一样的</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">seata</span><span class="token punctuation">:</span>
  <span class="token key atrule">tx-service-group</span><span class="token punctuation">:</span> csmall_group <span class="token comment">#定义分组名称</span>
  <span class="token key atrule">service</span><span class="token punctuation">:</span>
    <span class="token key atrule">vgroup-mapping</span><span class="token punctuation">:</span>
      <span class="token key atrule">csmall_group</span><span class="token punctuation">:</span> default  <span class="token comment"># 使用seata默认事务配置</span>
    <span class="token key atrule">grouplist</span><span class="token punctuation">:</span>
      <span class="token key atrule">default</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">8091</span> <span class="token comment"># 8091是seata默认的地址</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>seata标记事务的开始有一个专用的注解</p>
<p>在事务模型中,TM(事务管理器)的业务逻辑层方法上添加这个注解即可</p>
<p>business的业务逻辑层buy方法上添加注解</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BusinessServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">IBusinessService</span> <span class="token punctuation">{</span>

    <span class="token comment">// Dubbo在获取order模块的业务逻辑层实现类</span>
    <span class="token annotation punctuation">@DubboReference</span>
    <span class="token keyword">private</span> <span class="token class-name">IOrderService</span> dubboOrderService<span class="token punctuation">;</span>

    <span class="token comment">// 一旦编写这个注解@GlobalTransactional</span>
    <span class="token comment">// seata就会将这个方法当做一个分布式事务的起点</span>
    <span class="token comment">// 之后所有远程Dubbo调用的数据库操作要么都成功,要么都失败</span>
    <span class="token annotation punctuation">@GlobalTransactional</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">buy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 暂时模拟一个下单业务</span>
        <span class="token comment">// 创建OrderAddDTO类,赋值并输出信息</span>
        <span class="token class-name">OrderAddDTO</span> orderAddDTO<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">OrderAddDTO</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        orderAddDTO<span class="token punctuation">.</span><span class="token function">setCommodityCode</span><span class="token punctuation">(</span><span class="token string">"PC100"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        orderAddDTO<span class="token punctuation">.</span><span class="token function">setUserId</span><span class="token punctuation">(</span><span class="token string">"UU100"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        orderAddDTO<span class="token punctuation">.</span><span class="token function">setMoney</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        orderAddDTO<span class="token punctuation">.</span><span class="token function">setCount</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 因为没有持久层,只能输出一下,表示运行正常</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"新增订单信息为:{}"</span><span class="token punctuation">,</span>orderAddDTO<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// dubbo调用生成订单方法</span>
        dubboOrderService<span class="token punctuation">.</span><span class="token function">orderAdd</span><span class="token punctuation">(</span>orderAddDTO<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 为了验证我们seata是有效果的</span>
        <span class="token comment">// 在当前业务逻辑层方法中随机发生异常</span>
        <span class="token comment">// 我们可以通过观察正常运行时数据是否提交和发生异常是数据是否回滚来判断seata是否工作</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">&lt;</span><span class="token number">0.5</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">CoolSharkServiceException</span><span class="token punctuation">(</span><span class="token class-name">ResponseCode</span><span class="token punctuation">.</span>INTERNAL_SERVER_ERROR<span class="token punctuation">,</span>
                                            <span class="token string">"发生随机异常"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="启动seata" tabindex="-1"><a class="header-anchor" href="#启动seata" aria-hidden="true">#</a> 启动seata</h2>
<p>seata也是java开发的,启动方式和nacos很像</p>
<p>只是启动命令不同</p>
<p>解压后路径不要用中文,不要用空格</p>
<p>也是解压之后的bin目录下</p>
<p><img src="/images/seata的bin目录.png" alt="seata的bin目录.png"></p>
<p>在路径上输入cmd进入dos窗口</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>G:\pgm\seata\seata-server-1.4.2\bin>seata-server.bat -h 127.0.0.1 -m file
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>要想启动,需要启动所有4个服务cart\stock\order\business</p>
<p>利用knife4j访问business模块,否则无法触发事务效果,business模块是seata事务的启动</p>
<p><strong>在windows系统中运行seata可能出现不稳定的情况,重启seata即可解决</strong></p>
<p>根据是否发生随机异常,来判断seata是否有效</p>
<h3 id="seata使用常见错误" tabindex="-1"><a class="header-anchor" href="#seata使用常见错误" aria-hidden="true">#</a> Seata使用常见错误</h3>
<p>Seata在开始工作时,会将方法相关对象序列化后保存在对应数据库的undo_log表中</p>
<p>但是Seata我们序列化的方式支持很多中,常见的jackson格式序列化的情况下,不支持java对象LocalDataTime类型的序列化,序列化运行时会发送错误:</p>
<p><img src="/images/seata常见错误1.png" alt="seata常见错误1.png"></p>
<p>如果见到这样的错误, 就是因为jackson不能序列化LocalDataTime导致的</p>
<p>要想解决,两方面思路,</p>
<p>1.将序列化过程中LocalDataTime类型转换为Date</p>
<p>2.将Seata序列化转换为kryo类型,但是需要在pom文件中添加依赖(我们的项目中有)</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!--解决seata序列化问题--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>io.seata<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>seata-serializer-kryo<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>yml文件配置</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment">#seata服务端</span>
<span class="token key atrule">seata</span><span class="token punctuation">:</span>
  <span class="token key atrule">tx-service-group</span><span class="token punctuation">:</span> csmall_group
  <span class="token key atrule">service</span><span class="token punctuation">:</span>
    <span class="token key atrule">vgroup-mapping</span><span class="token punctuation">:</span>
      <span class="token key atrule">csmall_group</span><span class="token punctuation">:</span> default
    <span class="token key atrule">grouplist</span><span class="token punctuation">:</span>
      <span class="token key atrule">default</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>my.server.addr<span class="token punctuation">}</span><span class="token punctuation">:</span><span class="token number">8091</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token key atrule">undo</span><span class="token punctuation">:</span>
      <span class="token key atrule">log-serialization</span><span class="token punctuation">:</span> kryo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
