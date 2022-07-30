<template><div><h1 id="aop面向切面编程" tabindex="-1"><a class="header-anchor" href="#aop面向切面编程" aria-hidden="true">#</a> Aop面向切面编程</h1>
<h2 id="什么是aop" tabindex="-1"><a class="header-anchor" href="#什么是aop" aria-hidden="true">#</a> 什么是Aop</h2>
<p>面向切面的程序设计(Aspect Oriented Programming)又译作<strong>剖面导向程序设计</strong></p>
<p>和OOP(Object Oriented Programming)一样,也是计算机开发的一种程序设计思想</p>
<p>一句话概括面向切面编程</p>
<p><strong>就是在不修改现有程序代码的前提下,可以设置某个方法运行之前或运行之后新增额外代码的操作</strong></p>
<p>目标是将<strong>横切关注点</strong>与业务主体进行进一步分离，以提高程序代码的模块化程度。通过在现有代码基础上增加额外的<strong>通知</strong>（Advice）机制，能够对被声明为“<strong>切点</strong>（Pointcut）”的代码块进行统一管理与扩展</p>
<p>什么是切面</p>
<p>程序中的切面指的就是程序中方法的相互调用</p>
<p><img src="/image-20220331151645477.png" alt="image-20220331151645477"></p>
<p>名词解释</p>
<ul>
<li>切面(aspect):是一个可以加入额外代码运行的特定位置,一般指方法之间的调用,可以在不修改原代码的情况下,添加新的代码,对现有代码进行升级维护和管理</li>
<li>织入(weaving):选定一个切面,利用动态代理技术,为原有的方法的持有者生成动态对象,然后将它和切面关联,在运行原有方法时,就会按照织入之后的流程运行了</li>
</ul>
<p><img src="/捕获.png" alt="捕获"></p>
<ul>
<li>
<p>通知(advice)</p>
<p>通知要织入的代码的运行时机</p>
<ul>
<li>前置通知(before advice)</li>
<li>后置通知(after advice)</li>
<li>环绕通知(around advice)</li>
<li>异常通知(after throwing advice)</li>
</ul>
</li>
</ul>
<h2 id="spring实现aop" tabindex="-1"><a class="header-anchor" href="#spring实现aop" aria-hidden="true">#</a> Spring实现Aop</h2>
<p>之前我们明确了Spring框架的两大功能</p>
<ul>
<li>Ioc\DI</li>
<li>AOP</li>
</ul>
<p>实际上我们在项目开发的过程中,多处多次用到了AOP思想</p>
<p>它们都可以实现不修改代码就能新增各种功能</p>
<p>例如</p>
<ul>
<li>过滤器</li>
<li>Spring-Security(底层通过过滤器实现)</li>
<li>SpringMvc统一异常处理类</li>
<li>SpringValidation</li>
<li>.....</li>
</ul>
<p>实际上Spring只是实现Aop的方式之一</p>
<p>下面我们就使用Spring来实现Aop的功能</p>
<p>不必新建项目,使用任何SpringBoot项目都可以</p>
<p>我们使用csmall-business项目来测试Spring的AOP</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!--  支持SpringAop注解的依赖   --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-aspects<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>SpringAop的优势是通用性更强</p>
<p>项目中的任何由Spring保存的对象的方法都可以是Aop的目标</p>
<p>包括不限于控制层\业务层\持久层\其他类</p>
<p>我们首先来确定我们要aop的目标</p>
<p>我们可以在BusinessController类中新增一个方法用于测试aop</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/test"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ApiOperation</span><span class="token punctuation">(</span><span class="token string">"Aop测试方法"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">JsonResult</span> <span class="token function">aopTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"控制器方法运行"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">JsonResult</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token string">"运行完成!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要想添加aop的效果</p>
<p>我们可以新建一个包aspect</p>
<p>包中新建类DemoAspect</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 当前DemoAspect类的功能是为指定的方法进行aop实现</span>
<span class="token comment">// 必须将当前切面设置类也交由Spring管理</span>
<span class="token annotation punctuation">@Component</span>
<span class="token comment">// 表示当前类不是普通类,是做切面功能设计的</span>
<span class="token annotation punctuation">@Aspect</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DemoAspect</span> <span class="token punctuation">{</span>

    <span class="token comment">// 1.定义切面</span>
    <span class="token comment">//  @Pointcut是指定切面方法的注解</span>
    <span class="token comment">//  注解中通过固定的格式指定或统配添加切面的方法</span>
    <span class="token annotation punctuation">@Pointcut</span><span class="token punctuation">(</span><span class="token string">"execution(public * cn.tedu.csmall.business.controller"</span> <span class="token operator">+</span>
            <span class="token string">".BusinessController.aopTest(..))"</span><span class="token punctuation">)</span>
    <span class="token comment">// 我们需要在注解下定义一个方法,代表这个切面的定义</span>
    <span class="token comment">// 这个方法不需要任何内容,方法名足矣</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">pointCut</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment">// 2.织入内容</span>
    <span class="token comment">//   向确定好的切面中添加需要运行的额外代码</span>
    <span class="token comment">//   我们需要设计它的运行时机,这里以前置运行为例</span>
    <span class="token comment">//   在注解中配置上面切面的方法名,pointCut()是上面方法名,带()是固定要求</span>
    <span class="token annotation punctuation">@Before</span><span class="token punctuation">(</span><span class="token string">"pointCut()"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">before</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 这个代码就会在aopTest方法运行之前运行</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"前置advice运行"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>本地Nacos\seata</p>
<p>启动business</p>
<p>20000端口访问aop测试方法</p>
<p>运行后到控制台观察输出内容</p>
<h2 id="各种advice和aop方法参数" tabindex="-1"><a class="header-anchor" href="#各种advice和aop方法参数" aria-hidden="true">#</a> 各种advice和aop方法参数</h2>
<p>正常的aop方法可能需要当前程序运行的一些状态</p>
<p>我们可以在advice方法的参数位置添加JoinPoint参数</p>
<p>在Before的方法参数中添加如下</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Before</span><span class="token punctuation">(</span><span class="token string">"pointCut()"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">before</span><span class="token punctuation">(</span><span class="token class-name">JoinPoint</span> joinPoint<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// 这个代码就会在aopTest方法运行之前运行</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"前置advice运行"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// JoinPoint可以声明在任何织入方法的参数中</span>
    <span class="token comment">// JoinPoint会包含当前切面方法的各种信息,主要都是反射获取的</span>
    <span class="token comment">// 最常用的就是当前切面方法的方法信息,例如方法名</span>
    <span class="token class-name">String</span> methodName<span class="token operator">=</span>joinPoint<span class="token punctuation">.</span><span class="token function">getSignature</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"切面方法为:"</span><span class="token operator">+</span>methodName<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>后置异常和环绕Advice</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// 当前DemoAspect类的功能是为指定的方法进行aop实现</span>
<span class="token comment">// 必须将当前切面设置类也交由Spring管理</span>
<span class="token annotation punctuation">@Component</span>
<span class="token comment">// 表示当前类不是普通类,是做切面功能设计的</span>
<span class="token annotation punctuation">@Aspect</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DemoAspect</span> <span class="token punctuation">{</span>

    <span class="token comment">// 1.定义切面</span>
    <span class="token comment">//  @Pointcut是指定切面方法的注解</span>
    <span class="token comment">//  注解中通过固定的格式指定或统配添加切面的方法</span>
    <span class="token annotation punctuation">@Pointcut</span><span class="token punctuation">(</span><span class="token string">"execution(public * cn.tedu.csmall.business.controller"</span> <span class="token operator">+</span>
            <span class="token string">".BusinessController.aopTest(..))"</span><span class="token punctuation">)</span>
    <span class="token comment">// 我们需要在注解下定义一个方法,代表这个切面的定义</span>
    <span class="token comment">// 这个方法不需要任何内容,方法名足矣</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">pointCut</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment">// 2.织入内容</span>
    <span class="token comment">//   向确定好的切面中添加需要运行的额外代码</span>
    <span class="token comment">//   我们需要设计它的运行时机,这里以前置运行为例</span>
    <span class="token comment">//   在注解中配置上面切面的方法名,pointCut()是上面方法名,带()是固定要求</span>
    <span class="token annotation punctuation">@Before</span><span class="token punctuation">(</span><span class="token string">"pointCut()"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">before</span><span class="token punctuation">(</span><span class="token class-name">JoinPoint</span> joinPoint<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 这个代码就会在aopTest方法运行之前运行</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"前置advice运行"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// JoinPoint可以声明在任何织入方法的参数中</span>
        <span class="token comment">// JoinPoint会包含当前切面方法的各种信息,主要都是反射获取的</span>
        <span class="token comment">// 最常用的就是当前切面方法的方法信息,例如方法名</span>
        <span class="token class-name">String</span> methodName<span class="token operator">=</span>joinPoint<span class="token punctuation">.</span><span class="token function">getSignature</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"切面方法为:"</span><span class="token operator">+</span>methodName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 后置 Advice</span>
    <span class="token annotation punctuation">@After</span><span class="token punctuation">(</span><span class="token string">"pointCut()"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">after</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"后置advice运行"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 异常 Advice (只有切面的方法发生异常时才会运行)</span>
    <span class="token annotation punctuation">@AfterThrowing</span><span class="token punctuation">(</span><span class="token string">"pointCut()"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">throwing</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"方法发生异常!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 环绕Advice</span>
    <span class="token annotation punctuation">@Around</span><span class="token punctuation">(</span><span class="token string">"pointCut()"</span><span class="token punctuation">)</span>
    <span class="token comment">// 环绕Advice要想正常执行,必须设置方法的返回值和参数</span>
    <span class="token comment">// 它能够实现切面方法运行前后都添加代码</span>
    <span class="token comment">// 参数类型必须是ProceedingJoinPoint,它是JoinPoint的子接口</span>
    <span class="token comment">// 它拥有更多方法,其中包含针对环绕Advice调用方法返回值的功能</span>
    <span class="token comment">// 环绕增强,参与到了原有方法代码的调用和返回值的接收工作</span>
    <span class="token comment">// 所以环绕增强需要讲原有方法的返回值返回才能有保持原有的工作流程</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">around</span><span class="token punctuation">(</span><span class="token class-name">ProceedingJoinPoint</span> joinPoint<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>
        <span class="token comment">// 这个方法运行时,当前切面的目标方法还没有执行</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"环绕Advice前置执行"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 环绕增强调用目标方法,并接收返回值(只有环绕增强有这个步骤)</span>
        <span class="token class-name">Object</span> obj<span class="token operator">=</span>joinPoint<span class="token punctuation">.</span><span class="token function">proceed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 这里目标方法已经执行完毕</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"环绕Advice后置执行"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 千万别忘了要返回obj</span>
        <span class="token keyword">return</span> obj<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="/1657769406601.png" alt="1657769406601"></p>
<h2 id="切面语法定义规则" tabindex="-1"><a class="header-anchor" href="#切面语法定义规则" aria-hidden="true">#</a> 切面语法定义规则</h2>
<p>上面课程中使用的切面定义语法为:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Pointcut</span><span class="token punctuation">(</span><span class="token string">"execution(public * cn.tedu.csmall.business.controller"</span> <span class="token operator">+</span>
        <span class="token string">".BusinessController.aopTest(..))"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>含义为public 修饰的,任何返回值的cn.tedu.csmall.business.controller包BusinessController类的aopTest方法</p>
<p>可以是任意参数</p>
<p>实际上这个定义切面的语法还有很多变化或通配,以满足各种切面定义需求</p>
<p>下面是详细语法规则的模板</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>execution(
modifier-pattern?
ret-type-pattern
declaring-type-pattern?
name-pattern(param-pattern)
throws-pattern?)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>带?的是可选属性,不带?是必须写的</p>
<ul>
<li>modifier-pattern:访问修饰符(可选)</li>
<li>ret-type-pattern:返回值类型(必写)</li>
<li>declaring-type-pattern:全路径类名(可选)</li>
<li>name-pattern:方法名(必写)</li>
<li>param-pattern:参数列表(必写)</li>
<li>throws-pattern:抛出的异常类型(可选)</li>
</ul>
<p>分析下面的表达式设置切面的方法</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>execution(* *(..)):
匹配spring框架中(spring容器中)所有类得所有方法都定为切面
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>execution(public * com.test.TestController.*(..)):
匹配com.test.TestController类中的所有被public修饰方法定义为切面
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>execution(* cn.tedu.csmall.cart.mapper.*.*(..)):
匹配cn.tedu.csmall.cart.mapper包中所有接口\类的所有方法定义为切面
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="aop实现业务逻辑层性能记录" tabindex="-1"><a class="header-anchor" href="#aop实现业务逻辑层性能记录" aria-hidden="true">#</a> Aop实现业务逻辑层性能记录</h2>
<p>我们想了解酷鲨商城的业务运行用时</p>
<p>我们可以在需要测试用时的模块中添加aop环绕Advice</p>
<p>在运行前和运行后分别记录时间,将它们相减,获得的时间差就是用时</p>
<p>我们以mall-order-webapi模块为例</p>
<p>pom文件添加依赖</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!--  支持SpringAop注解的依赖   --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-aspects<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在创建aspect包</p>
<p>包中创建TimeAspect类</p>
<p>代码如下</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@Aspect</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TimeAspect</span> <span class="token punctuation">{</span>
    <span class="token comment">// 定义切面,目标是当项目所有业务逻辑层方法</span>
    <span class="token annotation punctuation">@Pointcut</span><span class="token punctuation">(</span><span class="token string">"execution(public * cn.tedu.mall.order.service.*.*(..))"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment">// 使用环绕Advice计时比较合理</span>
    <span class="token annotation punctuation">@Around</span><span class="token punctuation">(</span><span class="token string">"timer()"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">timeRecord</span><span class="token punctuation">(</span><span class="token class-name">ProceedingJoinPoint</span> joinPoint<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>
        <span class="token comment">// 记录开始时间</span>
        <span class="token keyword">long</span> start<span class="token operator">=</span><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 调用切面方法</span>
        <span class="token class-name">Object</span> obj<span class="token operator">=</span>joinPoint<span class="token punctuation">.</span><span class="token function">proceed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 记录结束时间</span>
        <span class="token keyword">long</span> end<span class="token operator">=</span><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 计算时间差</span>
        <span class="token keyword">long</span> time<span class="token operator">=</span> end<span class="token operator">-</span>start<span class="token punctuation">;</span>
        <span class="token comment">// 获得方法名</span>
        <span class="token class-name">String</span> methodName<span class="token operator">=</span>joinPoint<span class="token punctuation">.</span><span class="token function">getSignature</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 输出方法用时</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>methodName<span class="token operator">+</span><span class="token string">"方法用时"</span><span class="token operator">+</span>time<span class="token operator">+</span><span class="token string">"ms"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 别忘了返回!</span>
        <span class="token keyword">return</span> obj<span class="token punctuation">;</span>

    <span class="token punctuation">}</span>


<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
