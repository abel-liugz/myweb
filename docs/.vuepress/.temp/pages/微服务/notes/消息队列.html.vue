<template><div><h1 id="消息队列" tabindex="-1"><a class="header-anchor" href="#消息队列" aria-hidden="true">#</a> 消息队列</h1>
<h2 id="dubbo远程调用的性能问题" tabindex="-1"><a class="header-anchor" href="#dubbo远程调用的性能问题" aria-hidden="true">#</a> Dubbo远程调用的性能问题</h2>
<p>Dubbo调用在微服务项目中普遍存在</p>
<p>这些Dubbo调用都是同步的</p>
<p>&quot;同步&quot;指:A(消费者)调用B(生产者)的服务A在发起调用后,在B返回之前只能等待</p>
<p>直到B返回结果后A才能运行</p>
<p><img src="/images/dubbo远程调用的性能问题.png" alt="dubbo远程调用的性能问题.png"></p>
<p>Dubbo消费者发送调用后进入阻塞状态,这个状态表示改线程仍占用内存资源,但是什么动作都不做</p>
<p>如果生产者运行耗时较久,消费者就一直等待,如果消费者利用这个时间,那么可以处理更多请求,业务整体效率</p>
<p>实际情况下,Dubbo有些必要的返回值必须等待,但是不必要等待的服务返回值,我们可以不等待去做别的事情</p>
<p>这种情况下我们就要使用消息队列</p>
<h2 id="什么是消息队列" tabindex="-1"><a class="header-anchor" href="#什么是消息队列" aria-hidden="true">#</a> 什么是消息队列</h2>
<p>消息队列(Message Queue)简称MQ</p>
<p>消息队列是采用&quot;异步(两个微服务项目并不需要同时完成请求)&quot;的方式来传递数据完成业务操作流程的业务处理方式</p>
<h2 id="消息队列的特征" tabindex="-1"><a class="header-anchor" href="#消息队列的特征" aria-hidden="true">#</a> 消息队列的特征</h2>
<p><img src="/images/消息队列的特征.png" alt="消息队列的特征.png"></p>
<blockquote>
<p>常见面试题:消息队列的特征</p>
</blockquote>
<ul>
<li>利用异步的特性,提高服务器的运行效率,减少因为远程调用出现的线程等待\阻塞</li>
<li>削峰填谷:在并发峰值超过当前系统处理能力时,我们将没处理的信息保存在消息队列中,在后面出现的较闲的时间中去处理,直到所有数据依次处理完成,能够防止在并发峰值时短时间大量请求而导致的系统不稳定</li>
<li>消息队列的延时:因为是异步执行,请求的发起者并不知道消息何时能处理完,如果业务不能接收这种延迟,就不要使用消息队列</li>
</ul>
<h3 id="常见消息队列" tabindex="-1"><a class="header-anchor" href="#常见消息队列" aria-hidden="true">#</a> 常见消息队列</h3>
<ul>
<li>Kafka:性能好\功能弱:适合大数据量,高并发的情况,大数据领域使用较多</li>
<li>RabbitMQ:功能强\性能一般:适合发送需求复杂的消息队列,java业务中使用较多</li>
<li>RocketMQ:阿里的</li>
<li>ActiveMQ:前几年流行的,老项目可能用到</li>
</ul>
<blockquote>
<p>常见面试题:消息队列异常处理</p>
</blockquote>
<p>如果我们真的将上面生成订单业务里,减少库存的操作从正常流程中剥离到消息队列</p>
<p>那么如果库存减少过程中发送异常,就不能由Seata接收了,因为异步的处理无法和Seata通信</p>
<p>意思是如果使用了消息队列,队列中处理数据过程发送异常,那么就要用特殊的方法处理问题</p>
<p>处理方式就是手写代码进行回滚,一般情况就是在stock,模块再向order模块发送消息,order模块接收到消息后进行进一步处理</p>
<p>如果order模块进一步处理时又发生异常,我们可以再向一个实现设置好的消息队列中发送消息</p>
<p>这个消息队列没有处理者,我们称之为&quot;死信队列&quot;,一个正常运行的程序,会定期有人处理死信队列信息</p>
<h1 id="kafka" tabindex="-1"><a class="header-anchor" href="#kafka" aria-hidden="true">#</a> Kafka</h1>
<h2 id="什么是kafka" tabindex="-1"><a class="header-anchor" href="#什么是kafka" aria-hidden="true">#</a> 什么是Kafka</h2>
<p>Kafka是由Apache软件基金会开发的一个开源流处理平台，由Scala和Java编写。该项目的目标是为处理实时数据提供一个统一、高吞吐、低延迟的平台。Kafka最初是由LinkedIn开发，并随后于2011年初开源。</p>
<p>kafka软件结构</p>
<p><img src="/images/kafka软件结构.png" alt="kafka软件结构.png"></p>
<p>Kafka Cluster(Kafka集群)</p>
<p>Partition(分片)</p>
<p>Producer:消息的发送方,也就是消息的来源,Kafka中的生产者</p>
<p>Consumer:消息的接收方,也是消息的目标,Kafka中的消费者</p>
<p>Topic:话题或主题的意思,消息的收发双方要依据同一个话题名称,才不会将信息错发给别人</p>
<p>Record:消息记录,就是生产者和消费者传递的信息内容,保存在指定的Topic中</p>
<h2 id="kafka的特征与优势" tabindex="-1"><a class="header-anchor" href="#kafka的特征与优势" aria-hidden="true">#</a> Kafka的特征与优势</h2>
<p>Kafka作为消息队列,它和其他同类产品相比,突出的特点就是性能强大</p>
<p>Kafka将消息队列中的信息保存在硬盘中</p>
<p>Kafka对硬盘的读取规则进行优化后,效率能够接近内存</p>
<p>硬盘的优化规则主要依靠&quot;顺序读写,零拷贝,日志压缩等技术&quot;</p>
<p>Kafka处理队列中数据的默认设置:</p>
<ul>
<li>
<p>Kafka队列信息能够一直向硬盘中保存(理论上没有大小限制)</p>
</li>
<li>
<p>Kafka默认队列中的信息保存7天,可以配置这个时间,缩短这个时间可以减少Kafka的磁盘消耗</p>
</li>
</ul>
<h2 id="kafka的安装和配置" tabindex="-1"><a class="header-anchor" href="#kafka的安装和配置" aria-hidden="true">#</a> Kafka的安装和配置</h2>
<p>最好将我们kafka软件的解压位置设置在一个根目录</p>
<p>然后路径不要有空格和中文</p>
<p><img src="/images/kafka安装.png" alt="kafka安装.png"></p>
<p>我们要创建一个空目录用于保存Kafka运行过程中产生的数据</p>
<p>本次创建名称为data的空目录</p>
<p>下面开始配置启动信息</p>
<p>先到G:\kafka\config下配置有文件zookeeper.properties</p>
<p>找到dataDir属性修改如下</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>dataDir=G:/data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意G盘和data文件夹名称,匹配自己电脑的真实路径和文件夹名称</p>
<p>还要修改server.properties配置文件</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>log.dirs=G:/data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改注意事项和上面相同</p>
<h2 id="zookeeper简介" tabindex="-1"><a class="header-anchor" href="#zookeeper简介" aria-hidden="true">#</a> Zookeeper简介</h2>
<p>我们在启动kafka前必须先启动Zookeeper</p>
<p>zoo:动物园</p>
<p>keeper:园长</p>
<p>可以引申为管理动物的人</p>
<p>早期,每个服务器系统中的软件在安装后运行都需要一些配置</p>
<p>那么软件多了,配置会比较复杂</p>
<p>我们使用Zookeeper之后,可以创建一个新的管理各种软件配置的文件管理系统</p>
<p>在Zookeeper中,可以修改服务器系统中的所有软件配置</p>
<p>长此以往,很多软件就删除了自己写配置文件的功能,而直接从Zookeeper中获取</p>
<p>Kafka就是需要将配置编写在Zookeeper中的软件之一</p>
<h2 id="kafka的启动" tabindex="-1"><a class="header-anchor" href="#kafka的启动" aria-hidden="true">#</a> Kafka的启动</h2>
<p><strong>启动Zookeeper</strong></p>
<p>进入路径G:\kafka\bin\windows</p>
<p>输入cmd进入dos命令行</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>G:\kafka\bin\windows>zookeeper-server-start.bat ..\..\config\zookeeper.properties
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>启动kafka</strong></p>
<p>总体方式一样,输入不同指令</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>G:\kafka\bin\windows>kafka-server-start.bat ..\..\config\server.properties
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>附录</strong></p>
<p>Mac系统启动Kafka服务命令（参考）：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># 进入Kafka文件夹
cd Documents/kafka_2.13-2.4.1/bin/
# 动Zookeeper服务
./zookeeper-server-start.sh -daemon ../config/zookeeper.properties 
# 启动Kafka服务
./kafka-server-start.sh -daemon ../config/server.properties 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Mac系统关闭Kafka服务命令（参考）：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># 关闭Kafka服务
./kafka-server-stop.sh 
# 启动Zookeeper服务
./zookeeper-server-stop.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在启动kafka时有一个常见错误</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>wmic不是内部或外部命令
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这样的提示,需要安装wmic命令,安装方式参考</p>
<p>https://zhidao.baidu.com/question/295061710.html</p>
<h2 id="kafka使用demo" tabindex="-1"><a class="header-anchor" href="#kafka使用demo" aria-hidden="true">#</a> Kafka使用Demo</h2>
<p>不要关闭Zookeeper和Kafka的dos窗口</p>
<p>我们再csmall项目中编写一个简单的Demo学习Kafka的使用</p>
<p>添加依赖</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.google.code.gson<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>gson<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.kafka<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-kafka<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改yml文件配置</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">kafka</span><span class="token punctuation">:</span>
    <span class="token comment"># 定义kafka的位置</span>
    <span class="token key atrule">bootstrap-servers</span><span class="token punctuation">:</span> localhost<span class="token punctuation">:</span><span class="token number">9092</span>
    <span class="token comment"># 话题的分组名称,是必须配置的</span>
    <span class="token comment"># 为了区分当前项目和其他项目使用的,防止了不同项目相同话题的干扰或错乱</span>
    <span class="token comment"># 本质是在话题名称前添加项目名称为前缀来防止的</span>
    <span class="token key atrule">consumer</span><span class="token punctuation">:</span>
      <span class="token key atrule">group-id</span><span class="token punctuation">:</span> csmall
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>SpringBoot启动类中添加注解</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableDubbo</span>
<span class="token comment">// 启动kafka的功能</span>
<span class="token annotation punctuation">@EnableKafka</span>
<span class="token comment">// 为了测试kafka,我们可以周期性的发送消息到消息队列</span>
<span class="token comment">// 使用SpringBoot自带的调度工具即可</span>
<span class="token annotation punctuation">@EnableScheduling</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CsmallCartWebapiApplication</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">CsmallCartWebapiApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面我们就可以实现周期性的向kafka发送消息并接收的操作了</p>
<p>编写消息的发送</p>
<p>创建kafka包，包中创建Producer类来发送消息</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 我们需要周期性的向Kafka发送消息</span>
<span class="token comment">// 需要将具备SpringBoot调度功能的类保存到Spring容器才行</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Producer</span> <span class="token punctuation">{</span>

    <span class="token comment">// 能够实现将消息发送到Kafka的对象</span>
    <span class="token comment">// 只要Kafka配置正确,这个对象会自动保存到Spring容器中,我们直接装配即可</span>
    <span class="token comment">// KafkaTemplate&lt;[话题名称的类型],[传递消息的类型]></span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">KafkaTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">String</span><span class="token punctuation">></span></span> kafkaTemplate<span class="token punctuation">;</span>

    <span class="token comment">// 每隔10秒向Kafka发送信息</span>
    <span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token comment">// fixedRate是周期运行,单位毫秒 10000ms就是10秒</span>
    <span class="token annotation punctuation">@Scheduled</span><span class="token punctuation">(</span>fixedRate <span class="token operator">=</span> <span class="token number">10000</span><span class="token punctuation">)</span>
    <span class="token comment">// 这个方法只要启动SpringBoot项目就会按上面设置的时间运行</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sendMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 实例化一个Cart类型对象,用于发送消息</span>
        <span class="token class-name">Cart</span> cart<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Cart</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        cart<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        cart<span class="token punctuation">.</span><span class="token function">setCommodityCode</span><span class="token punctuation">(</span><span class="token string">"PC100"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        cart<span class="token punctuation">.</span><span class="token function">setPrice</span><span class="token punctuation">(</span><span class="token class-name">RandomUtils</span><span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        cart<span class="token punctuation">.</span><span class="token function">setCount</span><span class="token punctuation">(</span><span class="token class-name">RandomUtils</span><span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        cart<span class="token punctuation">.</span><span class="token function">setUserId</span><span class="token punctuation">(</span><span class="token string">"UU100"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 将cart对象转换为json格式字符串</span>
        <span class="token class-name">Gson</span> gson<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Gson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 执行转换</span>
        <span class="token class-name">String</span> json<span class="token operator">=</span>gson<span class="token punctuation">.</span><span class="token function">toJson</span><span class="token punctuation">(</span>cart<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"本次发送的消息为:"</span><span class="token operator">+</span>json<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 执行发送</span>
        <span class="token comment">// send([话题名称],[发送的消息]),需要遵循上面kafkaTemplate声明的泛型类型</span>
        kafkaTemplate<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">"myCart"</span><span class="token punctuation">,</span>json<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建一个叫Consumer的类来接收消息</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 因为Kafka接收消息是自动的,所以这个类也必须交由Spring容器管理0</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Consumer</span> <span class="token punctuation">{</span>

    <span class="token comment">// SpringKafka框架接收Kafka中的消息使用监听机制</span>
    <span class="token comment">// SpringKafka框架提供一个监听器,专门负责关注指定的话题名称</span>
    <span class="token comment">// 只要该话题名称中有消息,会自动获取该消息,并调用下面方法</span>
    <span class="token annotation punctuation">@KafkaListener</span><span class="token punctuation">(</span>topics <span class="token operator">=</span> <span class="token string">"myCart"</span><span class="token punctuation">)</span>
    <span class="token comment">// 上面注解和下面方法关联,方法的参数就是接收到的消息</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">received</span><span class="token punctuation">(</span><span class="token class-name">ConsumerRecord</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">String</span><span class="token punctuation">></span></span> record<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 方法参数类型必须是ConsumerRecord</span>
        <span class="token comment">// ConsumerRecord&lt;[话题名称类型],[消息类型]></span>
        <span class="token comment">// 获取消息内容</span>
        <span class="token class-name">String</span> json<span class="token operator">=</span>record<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 要想在java中使用,需要转换为java对象</span>
        <span class="token class-name">Gson</span> gson<span class="token operator">=</span><span class="token keyword">new</span> <span class="token class-name">Gson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 将json转换为java对象,需要提供转换目标类型的反射</span>
        <span class="token class-name">Cart</span> cart<span class="token operator">=</span>gson<span class="token punctuation">.</span><span class="token function">fromJson</span><span class="token punctuation">(</span>json<span class="token punctuation">,</span><span class="token class-name">Cart</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"接收到对象为:"</span><span class="token operator">+</span>cart<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="rabbitmq" tabindex="-1"><a class="header-anchor" href="#rabbitmq" aria-hidden="true">#</a> RabbitMQ</h1>
<h2 id="什么是rabbitmq" tabindex="-1"><a class="header-anchor" href="#什么是rabbitmq" aria-hidden="true">#</a> 什么是RabbitMQ</h2>
<p>RabbitMQ 是一个由 Erlang 语言开发的 AMQP 的开源实现。  AMQP ：Advanced Message Queue，高级消息队列协议。它是应用层协议的一个开放标准，为面向消息的中间件设计，基于此协议的客户端与消息中间件可传递消息，并不受产品、开发语言等条件的限制。  RabbitMQ 最初起源于金融系统，用于在分布式系统中存储转发消息，在易用性、扩展性、高可用性等方面表现不俗。</p>
<h2 id="rabbitmq特征" tabindex="-1"><a class="header-anchor" href="#rabbitmq特征" aria-hidden="true">#</a> RabbitMQ特征</h2>
<ol>
<li>
<p>可靠性（Reliability）  RabbitMQ 使用一些机制来保证可靠性，如持久化、传输确认、发布确认。</p>
</li>
<li>
<p>灵活的路由（Flexible Routing）  在消息进入队列之前，通过 Exchange 来路由消息的。对于典型的路由功能，RabbitMQ已经提供了一些内置的 Exchange 来实现。针对更复杂的路由功能，可以将多个Exchange 绑定在一起，也通过插件机制实现自己的 Exchange 。</p>
</li>
<li>
<p>消息集群（Clustering）  多个 RabbitMQ 服务器可以组成一个集群，形成一个逻辑 Broker</p>
</li>
<li>
<p>高可用（Highly Available Queues）  队列可以在集群中的机器上进行镜像，使得在部分节点出问题的情况下队列仍然可用。</p>
</li>
<li>
<p>多种协议（Multi-protocol）  RabbitMQ 支持多种消息队列协议，比如 STOMP、MQTT 等等。</p>
</li>
<li>
<p>多语言客户端（Many Clients）  RabbitMQ 几乎支持所有常用语言，比如 Java、.NET、Ruby 等等。</p>
</li>
<li>
<p>管理界面（Management UI）  RabbitMQ 提供了一个易用的用户界面，使得用户可以监控和管理消息 Broker 的许多方面。</p>
</li>
<li>
<p>跟踪机制（Tracing）  如果消息异常，RabbitMQ 提供了消息跟踪机制，使用者可以找出发生了什么。</p>
</li>
<li>
<p>插件机制（Plugin System）  RabbitMQ 提供了许多插件，来从多方面进行扩展，也可以编写自己的插件。</p>
</li>
</ol>
<h2 id="下载软件" tabindex="-1"><a class="header-anchor" href="#下载软件" aria-hidden="true">#</a> 下载软件</h2>
<p>RabbitMQ是Erlang语言开发的,所以要先安装Erlang语言的运行环境</p>
<p>下载Erlang的官方路径</p>
<p>https://erlang.org/download/otp_versions_tree.html</p>
<p><img src="/images/erlang下载.png" alt="erlang下载.png"></p>
<p>安装的话就是双击</p>
<p><strong>不要安装在中文路径和有空格的路径下!!!</strong></p>
<p>下载RabbitMQ</p>
<p>https://www.rabbitmq.com/install-windows.html</p>
<p><img src="/images/rabbitmq下载.png" alt="rabbitmq下载.png"></p>
<p>安装也是双击即可</p>
<p><strong>不要安装在中文路径和有空格的路径下!!!</strong></p>
<h2 id="rabbitmq的结构" tabindex="-1"><a class="header-anchor" href="#rabbitmq的结构" aria-hidden="true">#</a> RabbitMQ的结构</h2>
<p><img src="/images/rabbitmq结构.png" alt="rabbitmq结构.png"></p>
<p>和Kafka不同,Kafka是使用话题名称来收发信息,结构简单</p>
<p>RabbitMQ是使用交换机\路由key指定要发送消息的队列</p>
<p>消息的发送者发送消息时,需要指定交换机和路由key名称</p>
<p>消息的接收方接收消息时,只需要指定队列的名称</p>
<p>在编写代码上,相比于Kafka,每个业务要编写一个配置类</p>
<p>这个配置类中要绑定交换机和路由key的关系,以及路由Key和队列的关系</p>
<h2 id="配置erlang的环境变量" tabindex="-1"><a class="header-anchor" href="#配置erlang的环境变量" aria-hidden="true">#</a> 配置Erlang的环境变量</h2>
<p>要想运行RabbitMQ必须保证系统有Erlang的环境变量</p>
<p>配置Erlang环境变量</p>
<p>把安装Erlang的bin目录配置在环境变量Path的属性中</p>
<p><img src="/images/erlang环境变量.png" alt="erlang环境变量.png"></p>
<h2 id="启动rabbitmq" tabindex="-1"><a class="header-anchor" href="#启动rabbitmq" aria-hidden="true">#</a> 启动RabbitMQ</h2>
<p>找到RabbitMQ的安装目录</p>
<p>可能是:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>G:\pgm\rabbit\rabbitmq_server-3.10.1\sbin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>具体路径根据自己的情况寻找</p>
<p>地址栏运行cmd</p>
<p>输入启动指令如下</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>G:\pgm\rabbit\rabbitmq_server-3.10.1\sbin>rabbitmq-plugins enable rabbitmq_management
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>rabbitmq-plugins enable rabbitmq_management
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>结果如下</p>
<p><img src="/images/rabbitmq启动.png" alt="rabbitmq启动.png"></p>
<p>运行完成后</p>
<p>可以在Window任务管理器中的服务选项卡里找到RabbitMQ的服务(Ctrl+Shift+ESC)</p>
<p>另外的验证方法:</p>
<p>打开浏览器访问http://localhost:15672</p>
<p>登录界面用户名密码</p>
<p>guest</p>
<p>guest</p>
<p>登录成功后看到RabbitMQ运行的状态</p>
<p>如果启动失败,需要重新安装</p>
<p>参考路径如下</p>
<p>https://baijiahao.baidu.com/s?id=1720472084636520996&amp;wfr=spider&amp;for=pc</p>
<h2 id="利用rabbitmq完成消息的收发" tabindex="-1"><a class="header-anchor" href="#利用rabbitmq完成消息的收发" aria-hidden="true">#</a> 利用RabbitMQ完成消息的收发</h2>
<p>csmall-stock-webapi项目中测试RabbitMQ</p>
<p>可以利用之前我们使用Quartz实现的每隔一段时间输出当前日期信息的方法改为发送消息</p>
<p><strong>添加依赖</strong></p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-amqp<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>yml文件配置</strong></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">rabbitmq</span><span class="token punctuation">:</span>
    <span class="token key atrule">host</span><span class="token punctuation">:</span> localhost
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">5672</span>
    <span class="token key atrule">username</span><span class="token punctuation">:</span> guest
    <span class="token key atrule">password</span><span class="token punctuation">:</span> guest
    <span class="token key atrule">virtual-host</span><span class="token punctuation">:</span> /
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>交换机\路由Key\队列的配置类</strong></p>
<p>RabbitMQ要求我们再java代码级别设置交换机\路由Key\队列的关系</p>
<p>我们再quartz包下,创建config包</p>
<p>包中创建配置信息类</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// SpringBoot整合RabbitMQ之后</span>
<span class="token comment">// 这些配置信息要保存在Spring容器中,所以这些配置也要交给SpringBoot管理</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RabbitMQConfig</span> <span class="token punctuation">{</span>
    <span class="token comment">// 声明需要使用的交换机\路由Key\队列的名称</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> STOCK_EX<span class="token operator">=</span><span class="token string">"stock_ex"</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> STOCK_ROUT<span class="token operator">=</span><span class="token string">"stock_rout"</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> STOCK_QUEUE<span class="token operator">=</span><span class="token string">"stock_queue"</span><span class="token punctuation">;</span>

    <span class="token comment">// 声明交换机,需要几个声明几个,这里就一个</span>
    <span class="token comment">// 方法中实例化交换机对象,确定名称,保存到Spring容器</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">DirectExchange</span> <span class="token function">stockDirectExchange</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">DirectExchange</span><span class="token punctuation">(</span>STOCK_EX<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 声明队列,需要几个声明几个,这里就一个</span>
    <span class="token comment">// 方法中实例化队列对象,确定名称,保存到Spring容器</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Queue</span> <span class="token function">stockQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Queue</span><span class="token punctuation">(</span>STOCK_QUEUE<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 声明路由Key(交换机和队列的关系),需要几个声明几个,这里就一个</span>
    <span class="token comment">// 方法中实例化路由Key对象,确定名称,保存到Spring容器</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Binding</span> <span class="token function">stockBinding</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">BindingBuilder</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token function">stockQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">to</span><span class="token punctuation">(</span><span class="token function">stockDirectExchange</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token keyword">with</span><span class="token punctuation">(</span>STOCK_ROUT<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>RabbitMQ发送消息</strong></p>
<p>我们再QuartzJob类中输出时间的代码后继续编写代码</p>
<p>实现RabbitMQ消息的发送</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">QuartzJob</span> <span class="token keyword">implements</span> <span class="token class-name">Job</span> <span class="token punctuation">{</span>


    <span class="token comment">// RabbitTemplate就是amqp框架提供的发送消息的对象</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">RabbitTemplate</span> rabbitTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token class-name">JobExecutionContext</span> jobExecutionContext<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JobExecutionException</span> <span class="token punctuation">{</span>
        <span class="token comment">//输出当前时间</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"--------------"</span><span class="token operator">+</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span><span class="token string">"---------------"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 先简单的发送一个字符串</span>
        rabbitTemplate<span class="token punctuation">.</span><span class="token function">convertAndSend</span><span class="token punctuation">(</span><span class="token class-name">RabbitMQConfig</span><span class="token punctuation">.</span>STOCK_EX<span class="token punctuation">,</span>
                <span class="token class-name">RabbitMQConfig</span><span class="token punctuation">.</span>STOCK_ROUT<span class="token punctuation">,</span><span class="token string">"接收到减少库存的消息"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们可以通过修改QuartzConfig类中的Cron表达式修改调用的周期</strong></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">CronScheduleBuilder</span> cronScheduleBuilder<span class="token operator">=</span>
        <span class="token class-name">CronScheduleBuilder</span><span class="token punctuation">.</span><span class="token function">cronSchedule</span><span class="token punctuation">(</span><span class="token string">"0/10 * * * * ?"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>接收RabbitMQ的消息</strong></p>
<p>quartz包下再创建一个新的类用于接收信息</p>
<p>RabbitMQConsumer代码如下</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 这个对象也是需要交由Spring容器管理的,才能实现监听Spring容器中保存的队列的效果</span>
<span class="token annotation punctuation">@Component</span>
<span class="token comment">// 和Kafka不同的是Kafka在一个方法上声明监听器</span>
<span class="token comment">// 而RabbitMQ是在类上声明,监听具体的队列名称</span>
<span class="token annotation punctuation">@RabbitListener</span><span class="token punctuation">(</span>queues <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token class-name">RabbitMQConfig</span><span class="token punctuation">.</span>STOCK_QUEUE<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RabbitMQConsumer</span> <span class="token punctuation">{</span>

    <span class="token comment">// 监听了类,但是运行代码的一定是个方法</span>
    <span class="token comment">// 框架要求这个类中只允许一个方法包含下面这个注解</span>
    <span class="token comment">// 表示这个方法是处理消息的方法</span>
    <span class="token comment">// 方法的参数就是消息的值</span>
    <span class="token annotation punctuation">@RabbitHandler</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">process</span><span class="token punctuation">(</span><span class="token class-name">String</span> str<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"接收到的消息为:"</span><span class="token operator">+</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动Nacos\RabbitMQ\Seata</p>
<p>启动stock-webapi</p>
<p>根据Cron表达式,消息会在0/10/20/30/40/50秒数时运行</p>
<p>测试成功表示一切正常</p>
</div></template>
