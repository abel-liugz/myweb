<template><div><h1 id="服务器端项目演进" tabindex="-1"><a class="header-anchor" href="#服务器端项目演进" aria-hidden="true">#</a> 服务器端项目演进</h1>
<h2 id="服务器初期状态" tabindex="-1"><a class="header-anchor" href="#服务器初期状态" aria-hidden="true">#</a> <strong>服务器初期状态</strong></h2>
<p>最早的服务器就是安装部署了一些静态页面</p>
<p>功能非常单一,只能做信息的呈现和输出</p>
<h2 id="服务器动态页面" tabindex="-1"><a class="header-anchor" href="#服务器动态页面" aria-hidden="true">#</a> <strong>服务器动态页面</strong></h2>
<p>后来因为业务和技术的发展,页面连接了数据库,页面中大部分数据来自于数据库中</p>
<p>用户的操作可以修改数据库的内容,这样在不修改页面代码的前提下,页面中的数据可能发生变化</p>
<p>这样的页面可以实现用户注册,登录,查询(基本增删改查)功能</p>
<h2 id="用户贡献网页内容" tabindex="-1"><a class="header-anchor" href="#用户贡献网页内容" aria-hidden="true">#</a> <strong>用户贡献网页内容</strong></h2>
<p>进入21世纪,随着互联网进入千家万户,个人多社交需求的提升</p>
<p>出现了很多主要由用户贡献信息的网站</p>
<p>现在也有很多这样的网站</p>
<p>微博,抖音,淘宝,大众点评或类似的网站</p>
<h2 id="微服务时代" tabindex="-1"><a class="header-anchor" href="#微服务时代" aria-hidden="true">#</a> <strong>微服务时代</strong></h2>
<p>随着用户量的增加,和各种新需求的出现,一个服务器应用程序不能支持网站的运行时</p>
<p>就需要多台服务器共同支持网站的运行</p>
<p>我们需要强大的服务器性能,支持各种网站的活动</p>
<p>达到&quot;三高&quot;的目标</p>
<p><strong>&quot;高并发,高可用,高性能&quot;</strong></p>
<h1 id="java服务器项目分类" tabindex="-1"><a class="header-anchor" href="#java服务器项目分类" aria-hidden="true">#</a> Java服务器项目分类</h1>
<p>现在市面上常见的java开发的项目可以分为两大类</p>
<ol>
<li>企业级应用</li>
</ol>
<p>一般指一个企业或机构内部使用的网站或服务器应用程序</p>
<p>包括的领域很多,包括并不限于:商业,企事业单位,医疗,军事,政府,金融等</p>
<p>这种项目的特征是访问人数不多,不是全国乃至全世界都需要使用的网站</p>
<p>因为人数比较少又没有替代品,所以不强烈要求三高</p>
<p>但是企业级项目一般会有比较复杂的权限设置和业务流程</p>
<ol start="2">
<li>互联网应用</li>
</ol>
<p>指对全国乃至全世界开放的网站或服务器引用程序</p>
<p>我们手机中安装的app大部分都是互联网应用</p>
<p>微信,支付宝,京东,淘宝,饿了么,美团,抖音,qq音乐,爱奇艺,高德地图等</p>
<p>他们因为商业竞争等各种原因,对服务器性能有要求,也就是前面提到的&quot;三高&quot;</p>
<p>及时并发量非常大,程序也要正常运行,迅速响应</p>
<p>互联网应用一般业务和权限相对简单,但是要求&quot;三高&quot;</p>
<p>因为上述java项目的分类偏重点不同</p>
<p>在当今java开发的业界中,有下面的基本规律</p>
<ul>
<li>如果开发的是企业级应用,使用单体架构的情况比较多</li>
<li>如果开发的是互联网应用,使用微服务架构的情况比较多</li>
</ul>
<h1 id="微服务概述" tabindex="-1"><a class="header-anchor" href="#微服务概述" aria-hidden="true">#</a> 微服务概述</h1>
<h2 id="什么是微服务" tabindex="-1"><a class="header-anchor" href="#什么是微服务" aria-hidden="true">#</a> 什么是微服务</h2>
<p>微服务的概念是由Martin Fowler（<strong>马丁·福勒</strong>）在2014年提出的</p>
<p><img src="/马丁福勒.png" alt="马丁福勒.png"></p>
<p>微服务是由以单一应用程序构成的小服务，自己拥有自己的行程与轻量化处理，服务依业务功能设计，以全自动的方式部署，与其他服务使用 HTTP API 通信。同时服务会使用最小的规模的集中管理能力，服务可以用不同的编程语言与数据库等组件实现。</p>
<p>简单来说,微服务就是将一个大型项目的各个业务代码,拆分成多个互不干扰的小项目,而这些小项目专心完成自己的功能,而且可以调用别的小项目的方法,从而完成整体功能</p>
<p>京东\淘宝这样的大型互联网应用程序,基本每个操作都是一个单独的微服务在支持:</p>
<ul>
<li>登录服务器</li>
<li>搜索服务器</li>
<li>商品信息服务器</li>
<li>购物车服务器</li>
<li>订单服务器</li>
<li>支付服务器</li>
<li>物流服务器</li>
<li>.....</li>
</ul>
<h2 id="为什么使用微服务" tabindex="-1"><a class="header-anchor" href="#为什么使用微服务" aria-hidden="true">#</a> 为什么使用微服务</h2>
<p><img src="/大小餐厅对比.png" alt="大小餐厅对比.png"></p>
<p>左侧小餐馆就像单体项目</p>
<p>一旦服务器忙,所有业务都无法快速响应</p>
<p>即使添加了服务器,也不能很好的解决这个问题</p>
<p>不能很好的实现&quot;高并发,高可用,高性能&quot;</p>
<p>但是因为服务器数量少,所以成本低,适合并发访问少的项目</p>
<p>右侧的大餐厅就是微服务项目</p>
<p>每个业务有专门一批人负责,业务之间互不影响</p>
<p>能够针对的在性能不足的业务上添加服务器来改善性能,同时万一一个服务器异常,不会影响整体功能</p>
<p>但是服务器数量多,成本高,适合要要求&quot;高并发,高可用,高性能&quot;的项目</p>
<h2 id="怎么搭建微服务项目" tabindex="-1"><a class="header-anchor" href="#怎么搭建微服务项目" aria-hidden="true">#</a> 怎么搭建微服务项目</h2>
<p>在微服务概念提出之前(2014年),每个厂商都有自己的解决方案</p>
<p>但是Martin Fowler（<strong>马丁·福勒</strong>）提出了微服务的标准之后,为了技术统一和兼容性,很多企业开始支持这个标准</p>
<p>现在业界中开发微服务项目,大多数都是在这个标准下的</p>
<p>如果我们自己编写支持这个标准的代码是不现实的,必须通过现成的框架或组件完成满足这个微服务标准的项目结构和格式</p>
<p>当今程序员要想快速完成微服务标准的程序,首选SpringCloud</p>
<h1 id="spring-cloud" tabindex="-1"><a class="header-anchor" href="#spring-cloud" aria-hidden="true">#</a> Spring Cloud</h1>
<h2 id="什么是spring-cloud" tabindex="-1"><a class="header-anchor" href="#什么是spring-cloud" aria-hidden="true">#</a> 什么是Spring Cloud</h2>
<p>SpringCloud是由Spring提供的一套能够快速搭建微服务架构程序的框架集</p>
<p>框架集表示SpringCloud不是一个框架,而是很多框架的统称</p>
<p>SpringCloud是为了搭建微服务架构的程序而出现的</p>
<p>有人将SpringCloud称之为&quot;Spring全家桶&quot;,广义上指代所有Spring的产品</p>
<h2 id="springcloud的内容" tabindex="-1"><a class="header-anchor" href="#springcloud的内容" aria-hidden="true">#</a> SpringCloud的内容</h2>
<p><strong>从内容提供者角度</strong></p>
<ul>
<li>Spring自己编写的框架和软件</li>
<li>Netflix(奈非):早期提供了很多(全套)微服务架构组件</li>
<li>alibaba(阿里巴巴):新版本SpringCloud推荐使用(正在迅速占领市场)</li>
</ul>
<p>课程中大量使用alibaba的微服务组件</p>
<p><strong>从功能上分类</strong></p>
<ul>
<li>微服务的注册中心</li>
<li>微服务间的调用</li>
<li>微服务的分布式事务</li>
<li>微服务的限流</li>
<li>微服务的网关</li>
<li>......</li>
</ul>
</div></template>
