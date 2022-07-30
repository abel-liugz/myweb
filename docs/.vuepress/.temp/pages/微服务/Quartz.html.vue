<template><div><h1 id="quartz" tabindex="-1"><a class="header-anchor" href="#quartz" aria-hidden="true">#</a> Quartz</h1>
<h2 id="什么是quartz" tabindex="-1"><a class="header-anchor" href="#什么是quartz" aria-hidden="true">#</a> 什么是Quartz</h2>
<p>quartz:石英钟的意思</p>
<p>是一个当今市面上流行的高效的任务调用管理工具</p>
<p>由OpenSymphony开源组织开发</p>
<p>Symphony:交响乐</p>
<p>是java编写的,我们使用费时需要导入依赖即可</p>
<h2 id="为什么需要quartz" tabindex="-1"><a class="header-anchor" href="#为什么需要quartz" aria-hidden="true">#</a> 为什么需要Quartz</h2>
<p>什么是任务调度</p>
<p>所谓任务调用,就是执行某些具体动作的时间计划</p>
<p>我们使用过的最简单的调度方法就是Timer</p>
<p>但是Timer的调度功能过于单一,只能是指定时间的延时调用和周期运行</p>
<p>而Quartz可以更详细的指定时间,进行计划调用</p>
<h2 id="quartz核心组件" tabindex="-1"><a class="header-anchor" href="#quartz核心组件" aria-hidden="true">#</a> Quartz核心组件</h2>
<p><img src="/quartz核心组建.png" alt="quartz核心组建.png"></p>
<p>调度器:Scheduler</p>
<p>任务:Job</p>
<p>触发器:Trigger</p>
<p>调度器来配置\计划什么时间触发什么任务</p>
<p>简单来说就是调度器规定什么时间做什么事情</p>
<ul>
<li>job(工作\任务):Quartz 实现过程中是一个接口,接口中有一个方法execute(执行的意思)</li>
</ul>
<p>​	我们创建一个类,实现这个接口,在方法中编写要进行的操作(执行具体任务)</p>
<p>​    我们还需要一个JobDetail的类型的对象,Quartz每次执行job时</p>
<p>​	会实例化job类型对象,去调用这个方法,JobDetail是用来描述Job实现类</p>
<p>​	的静态信息,	比如任务运行时在Quartz中的名称</p>
<ul>
<li>
<p>Trigger(触发器):能够描述触发指定job的规则,分为简单触发和复杂触发</p>
<p>简单触发可以使用SimplTrigger实现类.功能类似timer</p>
<p>复杂触发可以使用CronTrigger实现类,内部利用cron表达式描述各种复杂的时间调度计划</p>
</li>
<li>
<p>Scheduler(调度器):一个可以规定哪个触发器绑定哪个job的容器</p>
<p>在调度器中保存全部的Quartz 保存的任务</p>
<p>SpringBoot框架下,添加Quartz依赖后,调度器由SpringBoot管理,我们不需要编写</p>
</li>
</ul>
<h2 id="cron表达式" tabindex="-1"><a class="header-anchor" href="#cron表达式" aria-hidden="true">#</a> Cron表达式</h2>
<p><img src="/cron表达式.png" alt="cron表达式.png"></p>
<ul>
<li>
<p>* 表示任何值,如果在分的字段上编写*,表示每分钟都会触发</p>
</li>
<li>
<p>, 是个分割符如果秒字段我想20秒和40秒时触发两次就写  20,40</p>
</li>
<li>
<p>- 表示一个区间 秒字段5-10 表示 5,6,7,8,9,10</p>
</li>
<li>
<p>/ 表示递增触发 秒字段 5/10表示5秒开始每隔10秒触发一次</p>
<p>日字段编写1/3表示从每月1日起每隔3天触发一次</p>
</li>
<li>
<p>? 表示不确定值, 因为我们在定日期时,一般确定日期就不确定是周几,相反确定周几时就不确定日期</p>
</li>
<li>
<p>L 表示last最后的意思,我们可以设置当月的最后一天,就会在日字段用L表示,</p>
<p>周字段使用L表示最后一周,一般会和1-7的数字组合</p>
<p>例如6L表示本月最后一周的周五</p>
</li>
<li>
<p>W 表示最近的工作日(单纯的周一到周五) 如果日字段编写15W表示</p>
<p>每月15日最近的工作日触发,如果15日是周六就14日触发,如果15日是周日就16日触发</p>
</li>
</ul>
<p>​	LW通常一起使用,表示本月的最后一个工作日</p>
<ul>
<li>
<p># 表示第几个,只能使用在周字段上 6#3表示每月的第三个周五</p>
<p>如果#后面数字写大了,是一个不存在的日期,那就不运行了</p>
<p>适合设计在母亲节或父亲节这样的日期运行</p>
</li>
</ul>
<p>双11的触发</p>
<p>如果是11月11日0时触发</p>
<p>&quot;0 0 0 11 11 ?&quot;</p>
<p>每个月10日最近的工作日早上9点发工资</p>
<p>0 0 9 10W * ?</p>
<p>网络上可用的Cron表达式生成器很多</p>
<p>推荐一个http://cron.ciding.cc/</p>
<p>0 0 0 5/3 * ?</p>
<h2 id="springboot使用quartz" tabindex="-1"><a class="header-anchor" href="#springboot使用quartz" aria-hidden="true">#</a> SpringBoot使用Quartz</h2>
<p>SpringBoot框架下使用Quartz格式还是非常固定的</p>
<p>我们选用之前学习微服务的项目csmall减少对大项目的影响</p>
<p>首先添加依赖</p>
<p>模块pom文件中添加依赖</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!--  SpringBoot Quartz依赖  --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-quartz<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>先编写要执行的任务</p>
<p>当前项目模块中创建quartz包</p>
<p>包中创建一个QuartzJob的类,实现Job接口</p>
<p>代码如下</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">QuartzJob</span> <span class="token keyword">implements</span> <span class="token class-name">Job</span> <span class="token punctuation">{</span>
    
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token class-name">JobExecutionContext</span> jobExecutionContext<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JobExecutionException</span> <span class="token punctuation">{</span>
        <span class="token comment">//输出当前时间</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"--------------"</span><span class="token operator">+</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span><span class="token string">"---------------"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在quartz包下,继续创建一个类QuartzConfig</p>
<p>这个类是一个SpringBoot配置类,它实际上是Quartz调度器的配置</p>
<p>代码的编写基本格式个固定的,同学们需要使用时直接套用这个格式</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 这个配置类就是在配置已经保存在Spring容器中的调度器Scheduler</span>
<span class="token comment">// 我们需要按下面格式进行配置,才能让Scheduler正常工作</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">QuartzConfig</span> <span class="token punctuation">{</span>
    <span class="token comment">// 创建一个JobDetail(工作详情)类对象,保存到Spring容器中,这个类用于封装我们编写的job接口实现类</span>
    <span class="token comment">// @Bean注解标记的方法的返回值会自动保存到Spring容器中(方法名随意)</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">JobDetail</span> <span class="token function">showTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"showTime方法运行"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">JobBuilder</span><span class="token punctuation">.</span><span class="token function">newJob</span><span class="token punctuation">(</span><span class="token class-name">QuartzJob</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>   <span class="token comment">// 绑定要运行的任务类的反射</span>
                <span class="token punctuation">.</span><span class="token function">withIdentity</span><span class="token punctuation">(</span><span class="token string">"date"</span><span class="token punctuation">)</span>               <span class="token comment">// 设置这个job的名称</span>
                <span class="token punctuation">.</span><span class="token function">storeDurably</span><span class="token punctuation">(</span><span class="token punctuation">)</span>                     <span class="token comment">//</span>
                <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 下面要声明触发器,Trigger,触发器决定我们的工作\任务何时触发</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Trigger</span> <span class="token function">showTimeTrigger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"showTime触发器运行"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 定义Cron表达式   每分钟触发一次的定义</span>
        <span class="token class-name">CronScheduleBuilder</span> cronScheduleBuilder<span class="token operator">=</span>
                <span class="token class-name">CronScheduleBuilder</span><span class="token punctuation">.</span><span class="token function">cronSchedule</span><span class="token punctuation">(</span><span class="token string">"0 0/1 * * * ?"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">TriggerBuilder</span><span class="token punctuation">.</span><span class="token function">newTrigger</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">forJob</span><span class="token punctuation">(</span><span class="token function">showTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>        <span class="token comment">// 绑定JobDetail JobDetail对象已经在Spring容器中</span>
                <span class="token punctuation">.</span><span class="token function">withIdentity</span><span class="token punctuation">(</span><span class="token string">"dateTrigger"</span><span class="token punctuation">)</span>       <span class="token comment">// 定义触发器名称</span>
                <span class="token punctuation">.</span><span class="token function">withSchedule</span><span class="token punctuation">(</span>cronScheduleBuilder<span class="token punctuation">)</span> <span class="token comment">// 绑定Cron表达式</span>
                <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
