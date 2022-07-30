<template><div><h1 id="nacos注册中心" tabindex="-1"><a class="header-anchor" href="#nacos注册中心" aria-hidden="true">#</a> Nacos注册中心</h1>
<h2 id="什么nacos" tabindex="-1"><a class="header-anchor" href="#什么nacos" aria-hidden="true">#</a> 什么Nacos</h2>
<p>Nacos是Spring Cloud Alibaba提供的一个软件</p>
<p>这个软件主要具有注册中心和配置中心的功能</p>
<p>我们先学习它注册中心的功能</p>
<p>微服务中所有项目都必须注册到注册中心才能成为微服务的一部分</p>
<p>注册中心和企业中的人力资源管理部门有相似</p>
<p><img src="/nacos注册中心.png" alt="nacos注册中心.png"></p>
<h2 id="nacos的启动" tabindex="-1"><a class="header-anchor" href="#nacos的启动" aria-hidden="true">#</a> Nacos的启动</h2>
<p>我们要启动Nacos必须保证当前系统配置了java环境变量</p>
<p>简单来说就是要环境变量中,有JAVA_HOME的配置,指向安装jdk的路径</p>
<p>确定了支持java后,可以通过下面路径下载</p>
<p>https://github.com/alibaba/nacos/releases/download/1.4.3/nacos-server-1.4.3.zip</p>
<p>国外网站,下载困难可以多试几次</p>
<p>或直接向项目经理老师索取</p>
<h2 id="安装启动nacos" tabindex="-1"><a class="header-anchor" href="#安装启动nacos" aria-hidden="true">#</a> 安装启动Nacos</h2>
<p>将下载好的Nacos压缩包解压</p>
<p>将压缩包解压(注意不要有中文路径或空格)</p>
<p>打开解压得到的文件夹后打开bin目录会有如下内容</p>
<p><img src="/nacos-bin目录.png" alt="nacos-bin目录.png"></p>
<p>cmd结尾的文件是windows版本的</p>
<p>sh结尾的文件是linux和mac版本的</p>
<p>startup是启动文件,shutdown是停止文件</p>
<p><strong>Windows下启动Nacos不能直接双击cmd文件</strong></p>
<p>需要进入dos命令运行</p>
<p>在当前资源管理器地址栏输入cmd</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>G:\pgm\nacos\bin>startup.cmd -m standalone
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>-m是设置启动方式参数</p>
<p>standalone翻译为标准的孤独的</p>
<p>意思是单机模式标准运行</p>
<p>运行成功默认占用8848端口,并且在代码中提示</p>
<p>如果不输入standalone运行会失败</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>startup.cmd -m standalone
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>验证Nacos的运行状态</p>
<p>打开浏览器输入http://localhost:8848/nacos</p>
<p><img src="/nacos打开页面.png" alt="nacos打开页面.png"></p>
<p>如果是首次访问,会出现这个界面</p>
<p>登录系统</p>
<p>用户名:nacos</p>
<p>密码:nacos</p>
<p>登录之后可以进入后台列表
不能关闭启动nacos的dos窗口
我们要让我们编写的项目注册到Nacos,才能真正是微服务项目
在项目的pom文件中添加依赖:</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- Spring Cloud家族 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-dependencies<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${spring-cloud.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>type</span><span class="token punctuation">></span></span>pom<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>type</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>import<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!-- Spring Cloud Alibaba --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-alibaba-dependencies<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${spring-cloud-alibaba.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>type</span><span class="token punctuation">></span></span>pom<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>type</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>import<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="注册到nacos" tabindex="-1"><a class="header-anchor" href="#注册到nacos" aria-hidden="true">#</a> 注册到Nacos</h2>
<p>我们的项目要想称为微服务项目必须注册到nacos</p>
<ul>
<li>首先在项目的pom文件中添加依赖</li>
</ul>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-nacos-discovery<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>然后在application.yml中添加当前项目对nacos注册的配置</li>
</ul>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token comment"># 当前Springboot项目的名称,用作注册中心服务的名称</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> nacos<span class="token punctuation">-</span>business
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
        <span class="token comment"># 定义nacos运行的路径</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">8848</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>做完上面的配置</p>
<p>我们<strong>在保证nacos已经启动的前提下</strong>,我们启动项目</p>
<p>启动之后,business一切功能正常,而且可以在nacos的服务列表中看到nacos-business的名称
<img src="/注册服务.png" alt="注册服务.png"></p>
<h2 id="nacos心跳机制" tabindex="-1"><a class="header-anchor" href="#nacos心跳机制" aria-hidden="true">#</a> Nacos心跳机制</h2>
<p>Nacos内部注册的服务分为两大类:</p>
<ul>
<li>临时实例(默认)</li>
<li>持久化实例(永久实例)</li>
</ul>
<p>我们可以通过设置属性来确定它是临时还是永久</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">cloud</span><span class="token punctuation">:</span>
  <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
    <span class="token key atrule">discovery</span><span class="token punctuation">:</span>
      <span class="token comment"># ephemeral设置当前项目启动时注册到nacos的类型 true(默认):临时实例 false:永久实例</span>
      <span class="token key atrule">ephemeral</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>临时实例和永久实例的区别:</p>
<ul>
<li><strong>临时实例</strong>
默认情况下,启动服务后,每隔5秒会向nacos发送一个&quot;心跳包&quot;,这个心跳包中包含了当前服务的基本信息,Nacos收到这个&quot;心跳包&quot;如果发现这个服务的信息不在注册列表中,就进行注册,如果这个服务的信息在注册列表中就表明这个服务还是健康的,如果Nacos15秒内没接收到某个服务的心跳包,Nacos会将这个服务标记为不健康的状态,如果30秒内没有接收到这个服务的心跳包,Nacos会将这个服务从注册列表中剔除,这些时间都是可以通过配置修改的.</li>
<li><strong>持久化实例(永久实例)</strong>
持久化实例启动时向nacos注册,nacos会对这个实例进行持久化处理,心跳包的规则和临时实例一致,只是不会将该服务从列表中剔除</li>
</ul>
<h3 id="各类型使用时机" tabindex="-1"><a class="header-anchor" href="#各类型使用时机" aria-hidden="true">#</a> 各类型使用时机</h3>
<p>一般情况下,我们创建的服务都是临时实例</p>
<p>只有项目的主干业务才会设置为永久实例</p>
<h1 id="配置中心" tabindex="-1"><a class="header-anchor" href="#配置中心" aria-hidden="true">#</a> 配置中心</h1>
<h2 id="什么是配置中心" tabindex="-1"><a class="header-anchor" href="#什么是配置中心" aria-hidden="true">#</a> 什么是配置中心</h2>
<p>所谓配置中心:将项目需要的配置信息保存在配置中心,需要读取时直接从配置中心读取,方便配置管理的微服务工具</p>
<p>我们可以将部分yml文件的内容保存在配置中心</p>
<p>一个微服务项目有很多子模块,这些子模块可能在不同的服务器上,如果有一些统一的修改,我们要逐一修改这些子模块的配置,由于它们是不同的服务器,所以修改起来很麻烦</p>
<p>如果将这些子模块的配置集中在一个服务器上,我们修改这个服务器的配置信息,就相当于修改了所有子模块的信息,这个服务器就是配置中心</p>
<p><strong>使用配置中心的原因就是能够达到高效的修改各模块配置的目的</strong></p>
<h2 id="配置中心的使用" tabindex="-1"><a class="header-anchor" href="#配置中心的使用" aria-hidden="true">#</a> 配置中心的使用</h2>
<p>Nacos既可以做注册中心,也可以做配置中心</p>
<p>Nacos做配置中心,支持各种格式\类型的配置文件</p>
<p>properties\yaml(yml)\txt\json\xml等</p>
<h2 id="nacos数据结构" tabindex="-1"><a class="header-anchor" href="#nacos数据结构" aria-hidden="true">#</a> Nacos数据结构</h2>
<p><img src="/nacos数据结构.png" alt="nacos数据结构.png"></p>
<p>namespace:命名空间</p>
<p>group:分组</p>
<p>Service/DataId:具体数据</p>
<p><strong>命名空间</strong></p>
<p>namespace是Nacos提供的最大的数据结构</p>
<p>一个Nacos可以创建多个命名空间</p>
<p>一个命名空间能够包含多个group</p>
<p>在nacos中创建命名空间</p>
<p><img src="/nacos中创建命名空间.png" alt="nacos中创建命名空间.png"></p>
<p>在上图连接的位置可以新增命名空间,填写命名空间名称和描述即可</p>
<p>Nacos有默认的命名空间public不能删除和修改</p>
<p>添加命名空间后,我们在Nacos中注册的服务或添加的配置就可以指定命名空间了</p>
<p>因为多个命名空间可以隔离项目,每个项目使用自己的命名空间,互不干扰</p>
<p><strong>分组</strong></p>
<p>一个命名空间中可以有多个分组,进行进一步分离</p>
<p>我们使用时,如果不需要进一步分组,推荐使用group名称:DEFAULF_GROUP</p>
<p><strong>服务或配置</strong></p>
<p>确定了命名空间和分组之后</p>
<p>我们就可以添加服务或配置了</p>
<p>之前我们启动的各种模块都是服务,之前都是默认保存在public命名空间中</p>
<p>下面我们主要使用配置中心的功能,在命名空间中添加配置</p>
<p>添加配置就是设置DataId</p>
<p>实际在Nacos中定位一个配置的结构为</p>
<p>Namespace&gt;Group&gt;DataId</p>
<h2 id="nacos添加配置" tabindex="-1"><a class="header-anchor" href="#nacos添加配置" aria-hidden="true">#</a> Nacos添加配置</h2>
<p>Nacos首页-&gt;配置管理-&gt;配置列表-&gt;添加配置(右侧的大&quot;＋&quot;号)</p>
<p><img src="/nacos添加配置.png" alt="nacos添加配置.png"></p>
<p>添加cart模块数据库连接配置</p>
<p><img src="/nacos添加模块数据库连接配置.png" alt="nacos添加模块数据库连接配置.png"></p>
<p>点击发布,nacos就保存这个配置了</p>
<h2 id="项目读取配置" tabindex="-1"><a class="header-anchor" href="#项目读取配置" aria-hidden="true">#</a> 项目读取配置</h2>
<p>如果要读取配置中心的信心,首先要添加依赖</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!--  配置中心的依赖  --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-alibaba-nacos-config<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!--  支持SpringCloud加载系统配置文件的依赖   --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-bootstrap<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>像其他程序一样,在添加完依赖之后,还需要添加yml文件的配置</p>
<p>我们使用过application.properties和application.yml两种配置文件添加配置</p>
<p>实际上这两个配置文件加载是有顺序的</p>
<p>先加载yml</p>
<p>后加载properties</p>
<p>如果两个配置文件同时设置了同一个属性,后加载的覆盖掉先加载的</p>
<p>在SpringCloud环境下,实际上可以再多出一组配置文件</p>
<p>它们是bootstarp.yml和bootstarp.properties</p>
<p>这一组的加载时机整体早于application这一组</p>
<p>所以一个SpringCloud项目加载配置文件的顺序最终可能如下图</p>
<p><img src="/springcloud项目加载配置文件的顺序.png" alt="springcloud项目加载配置文件的顺序.png"></p>
<p>bootstrap这组配置文件,一般用于配置加载一些系统级别的配置,这些配置的特征是一般不会轻易修改</p>
<p>我们再后面的学习过程中,会将配置中心的信息,加载到这组配置文件中</p>
<p><strong>必须是SpringCloud项目,才能支持bootstrap这组配置文件的加载</strong></p>
<p>支持这组配置的依赖就是上面我们添加的依赖</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!--  支持SpringCloud加载系统配置文件的依赖   --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-cloud-starter-bootstrap<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意SpringCloud版本早于2020之前,添加的不是这个依赖,可以自行查询</p>
<p>下面我们就在cart-webapi项目中resources文件夹中添加bootstarp.yml文件</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
    <span class="token key atrule">nacos</span><span class="token punctuation">:</span>
      <span class="token key atrule">config</span><span class="token punctuation">:</span>
        <span class="token comment">#  指定配置中心的位置</span>
        <span class="token key atrule">server-addr</span><span class="token punctuation">:</span> 192.168.137.150<span class="token punctuation">:</span><span class="token number">8848</span>
        <span class="token comment"># 指定配置文件所在的组名(命名空间默认public不需要指定)</span>
        <span class="token key atrule">group</span><span class="token punctuation">:</span> DEFAULT_GROUP
        <span class="token comment"># 设置配置文件的后缀名</span>
        <span class="token comment"># 默认情况下会加载[服务器名].[后缀名]为DataId的配置</span>
        <span class="token comment"># 当前项目名称为nacos-cart所以默认加载的DataId为:nacos-cart.yaml</span>
        <span class="token key atrule">file-extension</span><span class="token punctuation">:</span> yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果一切顺利,那么是可以通过knife4j测试操作连接数据库的</p>
<p>我们可以新增购物车信息,或删除购物车信息后简单数据库是否有对应操作</p>
<p>因为我们已经删除了本地yml文件中数据库的配置,所以,它能连接操作数据库一定是配置中心生效了!</p>
</div></template>
