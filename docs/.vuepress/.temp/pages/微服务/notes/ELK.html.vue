<template><div><h1 id="elk简介" tabindex="-1"><a class="header-anchor" href="#elk简介" aria-hidden="true">#</a> ELK简介</h1>
<h2 id="什么是elk" tabindex="-1"><a class="header-anchor" href="#什么是elk" aria-hidden="true">#</a> 什么是ELK</h2>
<p>ELK:</p>
<p>E:Elasticsearch         全文搜索引擎</p>
<p>L:logstash		   日志采集工具</p>
<p>K:Kibana	           ES的可视化工具</p>
<p>ELK是当今业界非常流行的日志采集保存和查询的系统</p>
<p>我们编写的程序,会有很多日志信息,但是日志信息的保存和查询是一个问题</p>
<p>idea控制台是临时显示的位置,我们可以将它保存在文件中</p>
<p>但是即使保存在文件中,海量日志信息要想查询需要的条目也是问题</p>
<p>所以我们使用ELK来保存</p>
<h2 id="为什么需要elk" tabindex="-1"><a class="header-anchor" href="#为什么需要elk" aria-hidden="true">#</a> 为什么需要ELK</h2>
<p>保存并能够快速便捷的查询查看日志信息就是新出现的需求了</p>
<p>ELK这个组合可以完成这个任务</p>
<p>Elasticsearch负责将日志信息保存,查询时可以按关键字快速查询</p>
<p>那么这些日志怎么收集呢?</p>
<p>利用logstash这个软件可以监听一个文件,将这个文件中出现的内容经过处理发送到指定端口</p>
<p>我们就可以监听我们程序输出的日志文件,然后将新增的日志信息保存到ES中</p>
<p>Kibana来负责进行查询和查看结果</p>
<blockquote>
<p>日志的管理工具还有一套叫链路追踪</p>
<p>和ELK有类似的效果,感兴趣的同学可以自己搜索</p>
</blockquote>
<h1 id="elasticsearch" tabindex="-1"><a class="header-anchor" href="#elasticsearch" aria-hidden="true">#</a> Elasticsearch</h1>
<h2 id="什么是elasticsearch" tabindex="-1"><a class="header-anchor" href="#什么是elasticsearch" aria-hidden="true">#</a> 什么是Elasticsearch</h2>
<p>elastic:富有弹性的</p>
<p>search:搜索</p>
<p>在计算机开发界简称ES</p>
<p>这个软件不是SpringCloud的组件,甚至其他语言都可以使用它</p>
<p>是一个java开发的软件,所以启动需要java环境变量</p>
<p>功能是从大量数据中根据指定的关键字搜索出匹配的结果</p>
<p>这样的软件有一个名称<strong>全文搜索引擎</strong></p>
<p>使用它的方式是访问它提供的控制器方法,它开发了多种控制器方法</p>
<p>访问不同方法实现对数据的增删改查</p>
<p>ES也是将数据保存在硬盘上的</p>
<blockquote>
<p>常见面试题ES的实现结构
java有一套名为Lucene的API
是搜索引擎的核心支持,Elasticsearch在Lucene的基础上开发出了一个功能全面的开箱即用的全文搜索引擎
市面上ES的竞品有
Solr/MongoDB</p>
</blockquote>
<h2 id="为什么使用elasticsearch" tabindex="-1"><a class="header-anchor" href="#为什么使用elasticsearch" aria-hidden="true">#</a> 为什么使用Elasticsearch</h2>
<p>所有关系型数据库都有一个严重的性能缺陷</p>
<p>mysql\mariaDB\oracle\DB2等</p>
<p>就是前模糊的模糊查询不能使用索引</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>select * from spu where spu_name like '%鼠标%'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>测试证明<strong>一张千万级别的数据库表进行模糊查询需要20秒以上</strong></p>
<p>当今需求&quot;三高&quot;的需求下,不能接受这样的性能</p>
<p>我们使用ES来优化后同样的查询我们能将效率提高100倍</p>
<p>将大型的查询也能控制在毫秒级别</p>
<h2 id="elasticsearch查询原理" tabindex="-1"><a class="header-anchor" href="#elasticsearch查询原理" aria-hidden="true">#</a> Elasticsearch查询原理</h2>
<p>如果不使用ES让数据库查询,没有索引加持的模糊查询就是全表搜索性能差</p>
<p>但是Elasticsearch可以利用添加数据库完成对数据的分词倒排索引形成索引库</p>
<p>在查询时直接查询索引库,获得符合查询条件的数据信息</p>
<p><img src="/images/elasticsearch查询原理.png" alt="elasticsearch查询原理.png"></p>
<h2 id="关于数据库的索引" tabindex="-1"><a class="header-anchor" href="#关于数据库的索引" aria-hidden="true">#</a> 关于数据库的索引</h2>
<p>所谓索引其实就是数据库中数据的目录</p>
<p>目的是能够提高查询的效率</p>
<p>数据库索引分类</p>
<ul>
<li>聚集索引</li>
<li>非聚集索引</li>
</ul>
<p>聚集索引就是数据库保存数据的物理顺序,一般都是id,所以按物理顺序查询也就是按id查询效率非常高</p>
<p>如果再定义其他索引,就是非聚集索引了</p>
<p>如果数据表中有一个姓名列,我们为姓名列创建索引</p>
<p>例如有&quot;张三&quot;这个姓名,添加索引后,查询的话效率会明显提升</p>
<p>但是如果不创建索引,去查询张三,就只能逐行检索姓名列是否为张三,查询效率低</p>
<blockquote>
<p>常见面试题:索引的使用规则和注意事项</p>
<ol>
<li>索引会占用数据库空间</li>
<li>对数据进行增删改操作,可能会引起索引的更新,效率会低</li>
<li>操作数据库时先添加数据,再创建索引</li>
<li>不要对数据样本少的列添加索引</li>
<li>每次查询从数据库中查询结果越多,索引的效果越低</li>
<li>使用where字句查询时,将具有索引的列放在第一个条件</li>
</ol>
</blockquote>
<p>经过我们对索引的简单了解,我们需要知道索引的基本概念和使用</p>
<p>所有关系型数据库都有一个缺陷,就是模糊查询时(查询条件前模糊),是不能利用索引进行查询的</p>
<p>一定会引起全表搜索,查询效率非常低</p>
<h2 id="elasticsearch的启动" tabindex="-1"><a class="header-anchor" href="#elasticsearch的启动" aria-hidden="true">#</a> Elasticsearch的启动</h2>
<p>官方下载链接</p>
<p>https://www.elastic.co/cn/downloads/past-releases#elasticsearch</p>
<p>课程中使用7.6.2版本</p>
<p>压缩包280M左右,复制到没有中文,没有空格的目录下解压</p>
<p>双击elasticsearch.bat运行</p>
<p><img src="/images/es的bin目录.png" alt="es的bin目录.png"></p>
<p>运行之后可能看到下面界面</p>
<p><img src="/images/es启动后的dos窗口.png" alt="es启动后的dos窗口.png"></p>
<p>这个界面不能关闭,一旦关闭ES就停止了</p>
<p>我们启动ES双击这个bat文件即可,当然也可以设置Idea的shell script</p>
<p>验证ES是否在运行</p>
<p>浏览器输入地址:localhost:9200看到如下内容即可</p>
<p><img src="/images/浏览器访问es.png" alt="浏览器访问es.png"></p>
<p>mac系统启动</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>tar -xvf elasticsearch-7.6.2-darwin-x86_64.tar.gz 
cd elasticsearch-7.6.2/bin 
./elasticsearch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>linux:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>tar -xvf elasticsearch-7.6.2-linux-x86_64.tar.gz
cd elasticsearch-7.6.2/bin
./elasticsearch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="es基本使用" tabindex="-1"><a class="header-anchor" href="#es基本使用" aria-hidden="true">#</a> ES基本使用</h1>
<p>我们创建一个项目search,在这个子项目中创建一个专门发送各种类型请求的文件来操作ES</p>
<p>然后项目pom文件如下</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8"?></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>project</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://maven.apache.org/POM/4.0.0<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">xmlns:</span>xsi</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.w3.org/2001/XMLSchema-instance<span class="token punctuation">"</span></span>
   <span class="token attr-name"><span class="token namespace">xsi:</span>schemaLocation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>modelVersion</span><span class="token punctuation">></span></span>4.0.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>modelVersion</span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>parent</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>cn.tedu<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>csmall<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>0.0.1-SNAPSHOT<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>parent</span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>cn.tedu<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>search<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>0.0.1-SNAPSHOT<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">></span></span>search<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>description</span><span class="token punctuation">></span></span>Demo project for Spring Boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>description</span><span class="token punctuation">></span></span>

   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
         <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
         <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>project</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面创建文件类型叫HTTP Request文件(http客户端)</p>
<p><img src="/images/idea中创建http_request.png" alt="idea中创建http_request.png"></p>
<p>创建完毕之后,我们向ES发送一个最简单的请求</p>
<p>GET http://localhost:9200</p>
<p>获得的结果和之前浏览器响应结果一致,表示当前http client文件正常运行</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>### 注释和分隔符<span class="token punctuation">,</span>每次编写请求前<span class="token punctuation">,</span>都要先编写<span class="token number">3</span>个#
<span class="token constant">GET</span> <span class="token literal-property property">http</span><span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>localhost<span class="token operator">:</span><span class="token number">9200</span>

### <span class="token constant">ES</span>分词测试  <span class="token function">analyze</span><span class="token punctuation">(</span>分析<span class="token punctuation">)</span>
<span class="token constant">POST</span> <span class="token literal-property property">http</span><span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>localhost<span class="token operator">:</span><span class="token number">9200</span><span class="token operator">/</span>_analyze
Content<span class="token operator">-</span>Type<span class="token operator">:</span> application<span class="token operator">/</span>json

<span class="token punctuation">{</span>
  <span class="token string-property property">"text"</span><span class="token operator">:</span> <span class="token string">"罗技激光无线游戏鼠标"</span><span class="token punctuation">,</span>
  <span class="token string-property property">"analyzer"</span><span class="token operator">:</span> <span class="token string">"standard"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="/images/http_request界面注解.png" alt="http_request界面注解.png"></p>
<p>我们代码中编写的&quot;analyzer&quot;: &quot;standard&quot;是默认分词器</p>
<p>如果不写出这行,也时默认这个分词器得</p>
<p>这个分词器只能对英文等西文字符(有空格的),进行分词</p>
<p>但是中文分词不能按空格分</p>
<p>下面我们要安装中文分词插件,实现中文分词效果</p>
<p>我们使用开源的分词词库IK实现中文分词</p>
<p><img src="/images/安装ik.png" alt="安装ik.png"></p>
<p>安装插件之后要重启ES才能生效</p>
<p>关闭ES窗口之后再启动ES即可</p>
<p>ES启动之后,将中文分词器插件设置完成,在运行分词</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token string-property property">"text"</span><span class="token operator">:</span> <span class="token string">"罗技激光无线游戏鼠标"</span><span class="token punctuation">,</span>
  <span class="token string-property property">"analyzer"</span><span class="token operator">:</span> <span class="token string">"ik_smart"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再次运行分词测试,应该看到正常的中文分词效果</p>
<h2 id="ik分词插件的使用" tabindex="-1"><a class="header-anchor" href="#ik分词插件的使用" aria-hidden="true">#</a> ik分词插件的使用</h2>
<p>我们安装的ik实际上不只一个分词器</p>
<p>实际上除了ik_smart之外还有ik_max_word</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>### <span class="token constant">ES</span>分词测试  <span class="token function">analyze</span><span class="token punctuation">(</span>分析<span class="token punctuation">)</span>
<span class="token constant">POST</span> <span class="token literal-property property">http</span><span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>localhost<span class="token operator">:</span><span class="token number">9200</span><span class="token operator">/</span>_analyze
Content<span class="token operator">-</span>Type<span class="token operator">:</span> application<span class="token operator">/</span>json

<span class="token punctuation">{</span>
  <span class="token string-property property">"text"</span><span class="token operator">:</span> <span class="token string">"北京顺利举办了冬季奥林匹克运动会"</span><span class="token punctuation">,</span>
  <span class="token string-property property">"analyzer"</span><span class="token operator">:</span> <span class="token string">"ik_smart"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>### <span class="token constant">ES</span>分词测试  <span class="token function">analyze</span><span class="token punctuation">(</span>分析<span class="token punctuation">)</span>
<span class="token constant">POST</span> <span class="token literal-property property">http</span><span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>localhost<span class="token operator">:</span><span class="token number">9200</span><span class="token operator">/</span>_analyze
Content<span class="token operator">-</span>Type<span class="token operator">:</span> application<span class="token operator">/</span>json

<span class="token punctuation">{</span>
  <span class="token string-property property">"text"</span><span class="token operator">:</span> <span class="token string">"北京顺利举办了冬季奥林匹克运动会"</span><span class="token punctuation">,</span>
  <span class="token string-property property">"analyzer"</span><span class="token operator">:</span> <span class="token string">"ik_max_word"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的运行会有不同的分词效果</p>
<p>总体来说区别如下</p>
<p><strong>ik_smart</strong></p>
<ul>
<li>优点:特征是粗略快速的将文字进行分词,占用空间小,查询速度快</li>
<li>缺点:分词的颗粒度大,可能跳过一些分词,导致查询结果不全面</li>
</ul>
<p><strong>ik_max_word</strong></p>
<ul>
<li>优点:特征是详细的文字片段进行分词,查询时查全率高,不容易遗漏数据</li>
<li>缺点:因为分词太过详细,导致有一些无用分词,占用空间较大,查询速度慢</li>
</ul>
<h2 id="使用es操作数据" tabindex="-1"><a class="header-anchor" href="#使用es操作数据" aria-hidden="true">#</a> 使用ES操作数据</h2>
<p>我们先了解一下ES保存数据的结构</p>
<p><img src="/images/es保存数据的结构.png" alt="es保存数据的结构.png"></p>
<ul>
<li>
<p>ES启动后,可以创建多个index(索引),index相当于数据库中表的概念</p>
</li>
<li>
<p>一个index可以创建保存多个document(文档),一个document相当于表中的一行数据</p>
</li>
<li>
<p>一个document中可以有多个属性和对应的值,相当于一行数据中字段和字段的值</p>
</li>
</ul>
<h1 id="spring-boot操作-elasticsearch" tabindex="-1"><a class="header-anchor" href="#spring-boot操作-elasticsearch" aria-hidden="true">#</a> Spring Boot操作 Elasticsearch</h1>
<h2 id="spring-data简介" tabindex="-1"><a class="header-anchor" href="#spring-data简介" aria-hidden="true">#</a> Spring Data简介</h2>
<p>原生状态下,我们使用JDBC连接数据库,因为代码过于繁琐,所以改为使用Mybatis框架</p>
<p>在ES的原生状态下,我们java代码需要使用socket访问ES,但是也是过于繁琐,我们可以使用SpringData框架简化</p>
<p>Spring Data是Spring提供的一套连接各种第三方数据源的框架集</p>
<p>我们需要使用的是其中连接ES的Spring Data Elasticseatrch</p>
<p>官方网站:https://spring.io/projects/spring-data</p>
<p><img src="/images/springdata页面.png" alt="springdata页面.png"></p>
<p>官网中列出了它可以操作的数据源列表</p>
<p>每个列表中都包含一些使用的介绍</p>
<p>要想实现Spring Boot操作ES添加依赖后,按照要求编写代码即可</p>
<h2 id="添加依赖" tabindex="-1"><a class="header-anchor" href="#添加依赖" aria-hidden="true">#</a> 添加依赖</h2>
<p>在search模块中添加依赖如下</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>      <span class="token comment">&lt;!-- Spring Data Elasticsearch依赖 --></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
         <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
         <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-data-elasticsearch<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>application.properties添加配置</p>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token comment"># 设置连接ES的ip地址和端口号</span>
<span class="token key attr-name">spring.elasticsearch.rest.uris</span><span class="token punctuation">=</span><span class="token value attr-value">http://localhost:9200</span>

<span class="token comment"># 为了观察运行状态信息,将日志输出门槛设置为debug</span>
<span class="token key attr-name">logging.level.cn.tedu.search</span><span class="token punctuation">=</span><span class="token value attr-value">debug</span>
<span class="token key attr-name">logging.level.org.elasticsearch.client.RestClient</span><span class="token punctuation">=</span><span class="token value attr-value">debug</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建一个操作es的数据类" tabindex="-1"><a class="header-anchor" href="#创建一个操作es的数据类" aria-hidden="true">#</a> 创建一个操作ES的数据类</h2>
<p>和数据库一样</p>
<p>我们操作ES时也需要一个类似实体类的数据类,作为操作ES的数据载体</p>
<p>search项目创建entity包</p>
<p>在包中创建Item(商品)类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@Accessors</span><span class="token punctuation">(</span>chain <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>    <span class="token comment">// 生成和链式赋值的set方法</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>         <span class="token comment">// 自动生成包含全部参数的构造方法</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>          <span class="token comment">// 自动生成无参构造方法</span>
<span class="token comment">// SpringData要求我们在"实体类"中使用特定注解标记</span>
<span class="token comment">// @Document注解标记当前类和ES关联</span>
<span class="token comment">// indexName指定索引名称,我们这里叫items,当操作这个索引时,如果索引不存在,会自动创建</span>
<span class="token annotation punctuation">@Document</span><span class="token punctuation">(</span>indexName <span class="token operator">=</span> <span class="token string">"items"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Item</span>  <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>

    <span class="token comment">// SpingData标记这个字段为当前类主键</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>
    <span class="token comment">// SpringData使用@Field标记文档中属性的类型和各种特征</span>
    <span class="token annotation punctuation">@Field</span><span class="token punctuation">(</span>type <span class="token operator">=</span> <span class="token class-name">FieldType<span class="token punctuation">.</span>Text</span><span class="token punctuation">,</span>
            analyzer <span class="token operator">=</span> <span class="token string">"ik_max_word"</span><span class="token punctuation">,</span>
            searchAnalyzer <span class="token operator">=</span> <span class="token string">"ik_max_word"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> title<span class="token punctuation">;</span>     <span class="token comment">//商品名称</span>
    <span class="token annotation punctuation">@Field</span><span class="token punctuation">(</span>type <span class="token operator">=</span> <span class="token class-name">FieldType<span class="token punctuation">.</span>Keyword</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> category<span class="token punctuation">;</span>  <span class="token comment">//分类</span>
    <span class="token annotation punctuation">@Field</span><span class="token punctuation">(</span>type <span class="token operator">=</span> <span class="token class-name">FieldType<span class="token punctuation">.</span>Keyword</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> brand<span class="token punctuation">;</span>     <span class="token comment">//品牌</span>
    <span class="token annotation punctuation">@Field</span><span class="token punctuation">(</span>type <span class="token operator">=</span> <span class="token class-name">FieldType<span class="token punctuation">.</span>Double</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">Double</span> price<span class="token punctuation">;</span>     <span class="token comment">//价格</span>
    <span class="token comment">// 图片地址不会称为搜索条件,所以设置index=false</span>
    <span class="token comment">// 效果是imgPath字段不会生成索引库,节省空间</span>
    <span class="token annotation punctuation">@Field</span><span class="token punctuation">(</span>type <span class="token operator">=</span> <span class="token class-name">FieldType<span class="token punctuation">.</span>Keyword</span><span class="token punctuation">,</span>index <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> imgPath<span class="token punctuation">;</span>   <span class="token comment">//图片地址</span>

    <span class="token comment">// images/hjdsf-ahsa-qwezx-jashjdas.png</span>
    <span class="token comment">// Text和Keyword都是字符串类型,只是Text会分词,而Keyword不会!</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建操作es的持久层" tabindex="-1"><a class="header-anchor" href="#创建操作es的持久层" aria-hidden="true">#</a> 创建操作ES的持久层</h2>
<p>我们使用SpringData连接操作ES</p>
<p>需要使用SpringData框架对持久层的命名规则</p>
<p>创建repository包,在包中创建接口ItemRepository</p>
<p>代码如下</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// Spring 家族下持久层名称都叫repository</span>
<span class="token annotation punctuation">@Repository</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ItemRepository</span> <span class="token keyword">extends</span> <span class="token class-name">ElasticsearchRepository</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">,</span><span class="token class-name">Long</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
    <span class="token comment">// 当前接口继承ElasticsearchRepository父接口后</span>
    <span class="token comment">// 会自动在类中生成基本的增删改查方法,直接可以使用</span>
    <span class="token comment">// 它自动识别或自动生成的规则,是我们定义的两个泛型ElasticsearchRepository&lt;[实体类名],[主键类型]></span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="测试操作es" tabindex="-1"><a class="header-anchor" href="#测试操作es" aria-hidden="true">#</a> 测试操作ES</h2>
<p>打开test测试类进行测试</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">class</span> <span class="token class-name">SearchApplicationTests</span> <span class="token punctuation">{</span>

   <span class="token comment">// 注入SpringData操作Es的持久层对象</span>
   <span class="token annotation punctuation">@Autowired</span>
   <span class="token keyword">private</span> <span class="token class-name">ItemRepository</span> itemRepository<span class="token punctuation">;</span>

   <span class="token comment">// 单增</span>
   <span class="token annotation punctuation">@Test</span>
   <span class="token keyword">void</span> <span class="token function">addOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 实例化Item对象,赋值并新增到ES</span>
      <span class="token class-name">Item</span> item<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Item</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">setTitle</span><span class="token punctuation">(</span><span class="token string">"罗技激光无线游戏鼠标"</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">setCategory</span><span class="token punctuation">(</span><span class="token string">"鼠标"</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">setBrand</span><span class="token punctuation">(</span><span class="token string">"罗技"</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">setPrice</span><span class="token punctuation">(</span><span class="token number">128.0</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">setImgPath</span><span class="token punctuation">(</span><span class="token string">"/1.jpg"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// 利用自动生成的方法将item新增到ES,索引不存在会自动创建</span>
      itemRepository<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"ok"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>

   <span class="token comment">// 按id查询</span>
   <span class="token annotation punctuation">@Test</span>
   <span class="token keyword">void</span> <span class="token function">getOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token comment">// SpringData框架自带的按id查询的方法</span>
      <span class="token comment">// Optional是一个类似包装类的概念,查询的结果封装到了这个类型中</span>
      <span class="token class-name">Optional</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">></span></span> optional<span class="token operator">=</span>itemRepository<span class="token punctuation">.</span><span class="token function">findById</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// 需要使用查询内容时使用optional.get()即可</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>optional<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>

   <span class="token comment">// 批量增</span>
   <span class="token annotation punctuation">@Test</span>
   <span class="token keyword">void</span> <span class="token function">addList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token comment">// 实例化一个List集合</span>
      <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">></span></span> list<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// 将要新增的Item对象保存到这个List中</span>
      list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Item</span><span class="token punctuation">(</span><span class="token number">2L</span><span class="token punctuation">,</span><span class="token string">"罗技激光有线办公鼠标"</span><span class="token punctuation">,</span><span class="token string">"鼠标"</span><span class="token punctuation">,</span>
            <span class="token string">"罗技"</span><span class="token punctuation">,</span><span class="token number">89.0</span><span class="token punctuation">,</span><span class="token string">"/2.jpg"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Item</span><span class="token punctuation">(</span><span class="token number">3L</span><span class="token punctuation">,</span><span class="token string">"雷蛇机械无线游戏键盘"</span><span class="token punctuation">,</span><span class="token string">"键盘"</span><span class="token punctuation">,</span>
            <span class="token string">"雷蛇"</span><span class="token punctuation">,</span><span class="token number">299.0</span><span class="token punctuation">,</span><span class="token string">"/3.jpg"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Item</span><span class="token punctuation">(</span><span class="token number">4L</span><span class="token punctuation">,</span><span class="token string">"微软有线静音办公鼠标"</span><span class="token punctuation">,</span><span class="token string">"鼠标"</span><span class="token punctuation">,</span>
            <span class="token string">"微软"</span><span class="token punctuation">,</span><span class="token number">208.0</span><span class="token punctuation">,</span><span class="token string">"/4.jpg"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Item</span><span class="token punctuation">(</span><span class="token number">5L</span><span class="token punctuation">,</span><span class="token string">"罗技有线机械背光键盘"</span><span class="token punctuation">,</span><span class="token string">"键盘"</span><span class="token punctuation">,</span>
            <span class="token string">"罗技"</span><span class="token punctuation">,</span><span class="token number">266.0</span><span class="token punctuation">,</span><span class="token string">"/5.jpg"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// 下面使用SpringData提供的方法执行批量新增</span>
      itemRepository<span class="token punctuation">.</span><span class="token function">saveAll</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"ok"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

   <span class="token punctuation">}</span>

   <span class="token comment">// 全查</span>
   <span class="token annotation punctuation">@Test</span>
   <span class="token keyword">void</span> <span class="token function">getAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token comment">// 利用SpringData的方法从ES中查询所有数据</span>
      <span class="token class-name">Iterable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">></span></span> items<span class="token operator">=</span>itemRepository<span class="token punctuation">.</span><span class="token function">findAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//    for(Item item: items){</span>
<span class="token comment">//       System.out.println(item);</span>
<span class="token comment">//    }</span>
      items<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>item <span class="token operator">-></span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

   <span class="token punctuation">}</span>


<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="springdata自定义查询" tabindex="-1"><a class="header-anchor" href="#springdata自定义查询" aria-hidden="true">#</a> SpringData自定义查询</h2>
<p>SpringData框架提供基本增删改查方法</p>
<p>但是如果有具体的针对性的查询逻辑,一定还是需要我们自己编写代码</p>
<p>例如实现类似数据库中的模糊查询</p>
<h3 id="单条件查询" tabindex="-1"><a class="header-anchor" href="#单条件查询" aria-hidden="true">#</a> 单条件查询</h3>
<p>我们的查询需求是查询title属性中包含&quot;游戏&quot;这个分词的商品信息</p>
<blockquote>
<p>参考模糊查询代码</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> item <span class="token keyword">where</span> title <span class="token operator">like</span> <span class="token string">'%游戏%'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote>
<p>我们使用ES查询,本质上运行的就是我们在es.http文档中编写的查询语句</p>
<p>但是SpringData框架下,编写查询语句更加简单</p>
<p>我们在ItemRepository接口中添加如下代码</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// SpringData自定义查询</span>
<span class="token comment">// 遵循SpringData框架规定的格式的前提下,编写方法名会自动生成查询逻辑</span>
<span class="token comment">// query: 表示当前方法是一个查询功能,类似sql中的select</span>
<span class="token comment">// Item\Items: 表示查询结果的实体类,带s的返回集合</span>
<span class="token comment">// By:标识开始设置条件,类似sql的where</span>
<span class="token comment">// Title: 要查询的字段名称</span>
<span class="token comment">// Matches: 是要执行的查询操作,这里是分词查询,类似sql的like</span>
<span class="token class-name">Iterable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">></span></span> <span class="token function">queryItemsByTitleMatches</span><span class="token punctuation">(</span><span class="token class-name">String</span> title<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再测试类中进行测试</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//单条件自定义查询</span>
<span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">queryOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
   <span class="token comment">// 查询 ES中title字段包含"游戏"分词的数据</span>
   <span class="token class-name">Iterable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">></span></span> items<span class="token operator">=</span>itemRepository<span class="token punctuation">.</span><span class="token function">queryItemsByTitleMatches</span><span class="token punctuation">(</span><span class="token string">"游戏"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   items<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>item <span class="token operator">-></span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码运行时底层运行的查询语句为:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>### 单条件搜索
<span class="token constant">POST</span> <span class="token literal-property property">http</span><span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>localhost<span class="token operator">:</span><span class="token number">9200</span><span class="token operator">/</span>items<span class="token operator">/</span>_search
Content<span class="token operator">-</span>Type<span class="token operator">:</span> application<span class="token operator">/</span>json

<span class="token punctuation">{</span>
  <span class="token string-property property">"query"</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token string-property property">"match"</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token string-property property">"title"</span><span class="token operator">:</span>  <span class="token string">"游戏"</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="多条件查询" tabindex="-1"><a class="header-anchor" href="#多条件查询" aria-hidden="true">#</a> 多条件查询</h3>
<p>在相对复杂的查询逻辑下</p>
<p>经常使用多个条件来定位查询需要的数据</p>
<p>这样就需要逻辑运算符&quot;and&quot;/&quot;or&quot;</p>
<p>ItemRepository接口中添加多条件的查询方法</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 多条件查询</span>
<span class="token comment">// 两个或多个条件之间直接编写And或Or表示查询逻辑</span>
<span class="token comment">// 参数名称实际上没有要求必须和字段名称匹配,底层代码是按照参数顺序赋值的</span>
<span class="token class-name">Iterable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">></span></span> <span class="token function">queryItemsByTitleMatchesAndBrandMatches</span><span class="token punctuation">(</span><span class="token class-name">String</span> title<span class="token punctuation">,</span><span class="token class-name">String</span> brand<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的查询添加了品牌作为条件</p>
<p>逻辑关系是and(与)</p>
<p>测试代码如下</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 多条件自定义查询</span>
<span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">queryTwo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
   <span class="token class-name">Iterable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">></span></span> items<span class="token operator">=</span>itemRepository
         <span class="token punctuation">.</span><span class="token function">queryItemsByTitleMatchesAndBrandMatches</span><span class="token punctuation">(</span><span class="token string">"游戏"</span><span class="token punctuation">,</span><span class="token string">"雷蛇"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   items<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>item <span class="token operator">-></span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>底层运行的请求</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>### 多字段搜索
<span class="token constant">POST</span> <span class="token literal-property property">http</span><span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>localhost<span class="token operator">:</span><span class="token number">9200</span><span class="token operator">/</span>items<span class="token operator">/</span>_search
Content<span class="token operator">-</span>Type<span class="token operator">:</span> application<span class="token operator">/</span>json

<span class="token punctuation">{</span>
  <span class="token string-property property">"query"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">"bool"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">"must"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span> <span class="token string-property property">"match"</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token string-property property">"title"</span><span class="token operator">:</span> <span class="token string">"游戏"</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span> <span class="token string-property property">"match"</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token string-property property">"brand"</span><span class="token operator">:</span> <span class="token string">"雷蛇"</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当查询条件关系为And时,查询语句关键字为must</p>
<p>当查询条件关系为Or时,查询语句关键字为should</p>
<h2 id="自定义查询" tabindex="-1"><a class="header-anchor" href="#自定义查询" aria-hidden="true">#</a> 自定义查询</h2>
<h3 id="排序查询" tabindex="-1"><a class="header-anchor" href="#排序查询" aria-hidden="true">#</a> 排序查询</h3>
<p>上次课我们完成了单条件查询和多条件查询</p>
<p>但是条件的变化只是查询的需求之一</p>
<p>我们还需要像排序等需求的查询</p>
<p>如果实施排序需求,就在Repository接口中添加方法如下</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 排序查询</span>
<span class="token comment">// 默认情况下,ES查询结果按score排序,如果想按其他的规则排序可以加OrderBy</span>
<span class="token comment">// 和数据库一样,默认升序排序 Desc结尾会降序</span>
<span class="token class-name">Iterable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">></span></span> <span class="token function">queryItemsByTitleMatchesOrBrandMatchesOrderByPriceDesc</span><span class="token punctuation">(</span>
                                <span class="token class-name">String</span> title<span class="token punctuation">,</span> <span class="token class-name">String</span> brand<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试代码如下</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 排序查询</span>
<span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">queryOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
   <span class="token class-name">Iterable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">></span></span> items<span class="token operator">=</span>itemRepository
      <span class="token punctuation">.</span><span class="token function">queryItemsByTitleMatchesOrBrandMatchesOrderByPriceDesc</span><span class="token punctuation">(</span><span class="token string">"游戏"</span><span class="token punctuation">,</span><span class="token string">"罗技"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   items<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>item <span class="token operator">-></span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>底层代码逻辑</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>### 多字段搜索
POST http<span class="token operator">:</span><span class="token comment">//localhost:9200/items/_search</span>
Content-Type<span class="token operator">:</span> application/json

<span class="token punctuation">{</span>
  <span class="token property">"query"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"bool"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"should"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span> <span class="token property">"match"</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">"title"</span><span class="token operator">:</span> <span class="token string">"游戏"</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span> <span class="token property">"match"</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">"brand"</span><span class="token operator">:</span> <span class="token string">"罗技"</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token property">"sort"</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token property">"price"</span><span class="token operator">:</span><span class="token string">"desc"</span><span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="分页查询" tabindex="-1"><a class="header-anchor" href="#分页查询" aria-hidden="true">#</a> 分页查询</h3>
<p>SpringData框架支持分页查询</p>
<p>只需要修改参数和返回值就能实现自动分页的效果</p>
<p>修改ItemRepository接口代码如下</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 分页查询</span>
<span class="token comment">// 当查询数据较多时,我们可以利用SpringData的分页功能,按用户要求的页码查询需要的数据</span>
<span class="token comment">// 返回值修改为Page类型,这个类型对象除了包含Iterable能够包含的集合信息之外,还包含分页信息</span>
<span class="token class-name">Page</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">></span></span> <span class="token function">queryItemsByTitleMatchesOrBrandMatchesOrderByPriceDesc</span><span class="token punctuation">(</span>
        <span class="token class-name">String</span> title<span class="token punctuation">,</span> <span class="token class-name">String</span> brand<span class="token punctuation">,</span> <span class="token class-name">Pageable</span> pageable<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试代码如下</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 分页查询</span>
<span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">queryPage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
   <span class="token keyword">int</span> pageNum<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>  <span class="token comment">//页码</span>
   <span class="token keyword">int</span> pageSize<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">;</span> <span class="token comment">//每页条数</span>
   <span class="token class-name">Page</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">></span></span> page<span class="token operator">=</span> itemRepository
      <span class="token punctuation">.</span><span class="token function">queryItemsByTitleMatchesOrBrandMatchesOrderByPriceDesc</span><span class="token punctuation">(</span>
            <span class="token string">"游戏"</span><span class="token punctuation">,</span><span class="token string">"罗技"</span><span class="token punctuation">,</span> <span class="token class-name">PageRequest</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>pageNum<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span>pageSize<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   page<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>item <span class="token operator">-></span> <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token comment">// page对象中还包含了一些基本的分页信息</span>
   <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"总页数:"</span><span class="token operator">+</span>page<span class="token punctuation">.</span><span class="token function">getTotalPages</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"当前页:"</span><span class="token operator">+</span>page<span class="token punctuation">.</span><span class="token function">getNumber</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"每页条数:"</span><span class="token operator">+</span>page<span class="token punctuation">.</span><span class="token function">getSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"当前页是不是首页:"</span><span class="token operator">+</span>page<span class="token punctuation">.</span><span class="token function">isFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"当前页是不是末页:"</span><span class="token operator">+</span>page<span class="token punctuation">.</span><span class="token function">isLast</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="logstash" tabindex="-1"><a class="header-anchor" href="#logstash" aria-hidden="true">#</a> Logstash</h1>
<h2 id="什么是logstash" tabindex="-1"><a class="header-anchor" href="#什么是logstash" aria-hidden="true">#</a> 什么是logstash</h2>
<p>Logstash是一款开源的日志采集,处理,输出的软件,每秒可以处理数以万计条数据,可以同时从多个来源采集数据,转换数据,然后将数据输出至自己喜欢的存储库中(官方推荐的存储库为Elasticsearch)</p>
<p><img src="/images/logstash.png" alt="logstash.png"></p>
<p>上面图片数据源可以是任何产生数据的介质,数据库,redis,java的日志文件均可</p>
<p>输出目标一般也是能够保存数据的媒体,数据库,redis,ES等</p>
<p>LogStash内部有3个处理数据的步骤</p>
<ul>
<li>input    将数据源的数据采集到Logstash</li>
<li>filter     (非必要)如果需要可以对采集到的数据进行处理</li>
<li>output 将处理好的数据保存到目标(一般就是ES)</li>
</ul>
<p>其中采集数据的用法比较多样,还支持各种插件</p>
</div></template>
