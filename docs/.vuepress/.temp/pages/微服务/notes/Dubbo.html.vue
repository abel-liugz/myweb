<template><div><h1 id="dubbo概述" tabindex="-1"><a class="header-anchor" href="#dubbo概述" aria-hidden="true">#</a> Dubbo概述</h1>
<h2 id="什么是rpc" tabindex="-1"><a class="header-anchor" href="#什么是rpc" aria-hidden="true">#</a> 什么是RPC</h2>
<p>RPC是Remote Procedure Call的缩写 翻译为:远程过程调用</p>
<p>目标是为了实现两台(多台)计算机\服务器,互相调用方法\通信的解决方案</p>
<p>RPC的概念主要定义了两部分内容</p>
<p>1.序列化协议</p>
<p>2.通信协议</p>
<p>为了方便大家理解RPC,下面的图片帮助理解</p>
<p><img src="/images/本地调用.png" alt="本地调用.png"></p>
<p>上面图是老婆和老公在家的时,老婆让老公洗碗的调用流程</p>
<p>但这个流程是本地的,</p>
<p>我们再换成远程调用的图片</p>
<p><img src="/images/远程调用.png" alt="远程调用.png"></p>
<p><strong>通信协议</strong></p>
<p>通信协议指的就是远程调用的通信方式</p>
<p>再上面图片调用中,老婆使用手机信息的方法通知老公去洗碗</p>
<p>实际上这个通知的方式可以有多种</p>
<p>例如:写信,飞鸽传书,闪送等等</p>
<p><strong>序列化协议</strong></p>
<p>序列化协议指通信内容的格式,双方都要理解这个格式</p>
<p>上面的图片中,老婆给老公发信息,一定是双方都能理解的信息</p>
<p>发送信息是序列化过程,接收信息需要反序列化</p>
<h2 id="什么是dubbo" tabindex="-1"><a class="header-anchor" href="#什么是dubbo" aria-hidden="true">#</a> 什么是Dubbo</h2>
<p>理解了RPC再学习Dubbo就会简单一些了</p>
<p>Dubbo是一套RPC框架。既然是框架，我们可以在框架结构高度，定义Dubbo中使用的通信协议，使用的序列化框架技术，而数据格式由Dubbo定义，我们负责配置之后直接通过客户端调用服务端代码。</p>
<p>简单来说,Dubbo就是RPC概念的实现</p>
<p>Dubbo是Spring Cloud Alibaba提供的一个框架</p>
<p>能够实现微服务项目的互相调用</p>
<h2 id="dubbo的发展历程" tabindex="-1"><a class="header-anchor" href="#dubbo的发展历程" aria-hidden="true">#</a> Dubbo的发展历程</h2>
<p><img src="/images/dubbo发展历程.png" alt="dubbo发展历程.png"></p>
<p>2012年底dubbo停止更新后到2017年dubbo继续更新之前</p>
<p>2015SpringCloud开始兴起,当时没有阿里的框架</p>
<p>国内公司要从SpringCloud和Dubbo中抉择使用哪个微服务方案</p>
<p>在2012年dubbo停止更新后国内的当当网在dubbo的基础上开发了dubboX框架,并进行维护</p>
<p>2019年后,SpringCloud和Dubbo才能共同使用</p>
<h2 id="dubbo的协议支持" tabindex="-1"><a class="header-anchor" href="#dubbo的协议支持" aria-hidden="true">#</a> Dubbo的协议支持</h2>
<p>RPC框架分通信协议和序列化协议</p>
<p>Dubbo框架支持多种通信协议和序列化协议,可以通过配置文件进行修改</p>
<p>支持的通信协议有</p>
<ul>
<li>dubbo协议(默认)</li>
<li>rmi协议</li>
<li>hessian协议</li>
<li>http协议</li>
<li>webservice</li>
<li>.....</li>
</ul>
<p>支持的序列化协议</p>
<ul>
<li>hessian2(默认)</li>
<li>java序列化</li>
<li>compactedjava</li>
<li>nativejava</li>
<li>fastjson</li>
<li>dubbo</li>
<li>fst</li>
<li>kryo</li>
</ul>
<p>Dubbo默认情况下,协议的特征如下</p>
<ul>
<li>采用NIO单一长连接</li>
<li>优秀的并发性能,但是大型文件的处理差</li>
<li>Dubbo开发简单,有助于提升开发效率</li>
</ul>
<h2 id="dubbo服务的注册与发现" tabindex="-1"><a class="header-anchor" href="#dubbo服务的注册与发现" aria-hidden="true">#</a> Dubbo服务的注册与发现</h2>
<p>在Dubbo的调用过程中,必须包含注册中心的支持</p>
<p>注册中心推荐使用Nacos,但是如果使用其他软件也能实现例如(Redis,zookeeper等)</p>
<p>服务发现，即消费端自动发现服务地址列表的能力，是微服务框架需要具备的关键能力，借助于自动化的服务发现，微服务之间可以在无需感知对端部署位置与 IP 地址的情况下实现通信。</p>
<p>上面的示例中,老婆就是服务器的发现者,它能够获取老公的所有功能列表</p>
<p>老婆一旦调用公的服务就完成了Dubbo的调用</p>
<p><img src="/images/dubbo注册与发现.png" alt="dubbo注册与发现.png"></p>
<p>consumer服务的消费者,指服务的调用者(使用者)也就是老婆的位置</p>
<p>provider服务的提供者,指服务的拥有者(生产者)也就是老公的位置</p>
<p>在Dubbo中,远程调用依据是服务的提供者在Nacos中注册的服务名称</p>
<p>一个服务名称,可能有多个运行的实例,任何一个空闲的实例都可以提供服务</p>
<blockquote>
<p>常见面试题:Dubbo的注册发现流程</p>
</blockquote>
<p>1.首先服务的提供者启动服务到注册中心注册,包括各种ip端口信息,Dubbo会同时注册该项目提供的远程调用的方法</p>
<p>2.服务的消费者(使用者)注册到注册中心,订阅发现</p>
<p>3.当有新的远程调用方法注册到注册中心时,注册中心会通知服务的消费者有哪些新的方法,如何调用的信息</p>
<p>4.RPC调用,在上面条件满足的情况下,服务的调用者无需知道ip和端口号,只需要服务名称就可以调用到服务提供者的方法</p>
<h1 id="dubbo实现微服务调用" tabindex="-1"><a class="header-anchor" href="#dubbo实现微服务调用" aria-hidden="true">#</a> Dubbo实现微服务调用</h1>
<h2 id="确定调用关系" tabindex="-1"><a class="header-anchor" href="#确定调用关系" aria-hidden="true">#</a> 确定调用关系</h2>
<p><img src="/images/dubbo确定调用关系.png" alt="dubbo确定调用关系.png"></p>
<p>在上面的模型中,以order调用stock减少库存的业务举例</p>
<p>order模块是消费者stock模块是生产者</p>
<p>在代码调用时,首先要对项目进行必要的配置</p>
<p>我们调用时一般会在消费者项目的代码业务逻辑层中,编写调用生产者业务逻辑层方法的代码</p>
<p>这样做的好处</p>
<p>我们的生成者正常编写mapper&gt;service&gt;controller这个开发流程不会因为Dubbo的介入而变化</p>
<h1 id="负载均衡" tabindex="-1"><a class="header-anchor" href="#负载均衡" aria-hidden="true">#</a> 负载均衡</h1>
<h2 id="什么是负载均衡" tabindex="-1"><a class="header-anchor" href="#什么是负载均衡" aria-hidden="true">#</a> 什么是负载均衡</h2>
<p><img src="/images/负载均衡.png" alt="负载均衡.png"></p>
<p>在实际开发中,一个服务基本都是集群模式的,也就是多个功能相同的项目在运行,这样才能承受更高的并发</p>
<p>这时一个请求到这个服务,就需要确定访问哪一个服务器</p>
<p>Dubbo框架内部支持负载均衡算法,能够尽可能的让请求在相对空闲的服务器上运行</p>
<p>我们要实现设置好负载均衡的策略算法,并设置好每个服务器的运行权重</p>
<p>才能更好的实现负载均衡的效果</p>
<p>Loadbalance:就是负载均衡的意思</p>
<h2 id="dubbo内置负载均衡策略算法" tabindex="-1"><a class="header-anchor" href="#dubbo内置负载均衡策略算法" aria-hidden="true">#</a> Dubbo内置负载均衡策略算法</h2>
<p>Dubbo内置4种负载均衡算法</p>
<ul>
<li><strong>random loadbalance:随机分配策略(默认)</strong></li>
<li>round Robin Loadbalance:权重平均分配</li>
<li>leastactive Loadbalance:活跃度自动感知分配</li>
<li>consistanthash Loadbalance:一致性hash算法分配</li>
</ul>
<p>实际运行过程中,每个服务器性能不同</p>
<p>在负载均衡时,都会有性能权重,这些策略算法都考虑权重问题</p>
<h2 id="随机分配策略-默认" tabindex="-1"><a class="header-anchor" href="#随机分配策略-默认" aria-hidden="true">#</a> 随机分配策略(默认)</h2>
<p><img src="/images/负载均衡随机分配策略.png" alt="负载均衡随机分配策略.png"></p>
<p>随机生成随机数</p>
<p>在哪个范围内让哪个服务器运行</p>
<p>优点:</p>
<p>算法简单,效率高,长时间运行下,任务分配比例准确</p>
<p>缺点:</p>
<p>偶然性高,如果连续的几个随机请求发送到性能弱的服务器,会导致异常甚至宕机</p>
<h2 id="权重平均分配" tabindex="-1"><a class="header-anchor" href="#权重平均分配" aria-hidden="true">#</a> 权重平均分配</h2>
<p>如果几个服务器权重一致,那么就是依次运行</p>
<p>3个服务器    1&gt;1   2&gt;2  3&gt;3  4&gt;1</p>
<p>但是服务器的性能权重一致的可能性很小</p>
<p>所以我们需要权重评价分配</p>
<p>Dubbo2.6.4之前平均分配权重算法是有问题的</p>
<p>如果3个服务器的权重比5:3:1</p>
<p>1&gt;1    2&gt;1     3&gt;1     4&gt;1    5&gt;1   6&gt;2     7&gt;2     8&gt;2     9&gt;3</p>
<p>10&gt;1</p>
<p>Dubbo2.7之后更新了这个算法使用&quot;<strong>平滑加权算法</strong>&quot;优化权重平均分配策略</p>
<p><img src="/images/负载均衡权重平均分配.png" alt="负载均衡权重平均分配.png"></p>
<h2 id="活跃度自动感知" tabindex="-1"><a class="header-anchor" href="#活跃度自动感知" aria-hidden="true">#</a> 活跃度自动感知</h2>
<p>记录每个服务器处理一次请求的时间</p>
<p>安装时间比例来分配任务数,运行一次需要时间多的分配的请求数较少</p>
<h2 id="一致性hash算法" tabindex="-1"><a class="header-anchor" href="#一致性hash算法" aria-hidden="true">#</a> 一致性Hash算法</h2>
<p>根据请求的参数进行hash运算</p>
<p>以后每次相同参数的请求都会访问固定服务器</p>
<p>因为根据参数选择服务器,不能平均分配到每台服务器上</p>
<p>使用的也不多</p>
<h2 id="dubbo生产者消费者配置小结" tabindex="-1"><a class="header-anchor" href="#dubbo生产者消费者配置小结" aria-hidden="true">#</a> Dubbo生产者消费者配置小结</h2>
<p>Dubbo生产者消费者相同的配置</p>
<p>pom文件添加dubbo依赖,yml文件配置dubbo信息</p>
<p><strong>生产者</strong></p>
<ul>
<li>
<p>要有service接口项目</p>
</li>
<li>
<p>提供服务的业务逻辑层实现类要添加@DubboService注解</p>
</li>
<li>
<p>SpringBoot启动类要添加@EnableDubbo注解</p>
</li>
</ul>
<p><strong>消费者</strong></p>
<ul>
<li>pom文件添加消费模块的service依赖</li>
<li>业务逻辑层远程调用前天模块时使用@DubboReference注解获取业务逻辑层实现类对象</li>
</ul>
</div></template>
