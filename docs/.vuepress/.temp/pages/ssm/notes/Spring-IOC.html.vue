<template><div><h1 id="spring框架" tabindex="-1"><a class="header-anchor" href="#spring框架" aria-hidden="true">#</a> Spring框架</h1>
<h3 id="关于spring框架" tabindex="-1"><a class="header-anchor" href="#关于spring框架" aria-hidden="true">#</a> 关于Spring框架</h3>
<ul>
<li>Spring框架主要解决了创建对象、管理对象的问题</li>
<li>在开发实践中，Spring框架的核心价值在于：开发者可以通过Spring框架提供的机制，将创建对象、管理对象的任务交给Spring来完成，以至于开发者不必再关系这些过程，当需要某个对象时，只需要通过Spring获取对象即可。
<ul>
<li>Spring框架也经常称之为：Spring容器</li>
</ul>
</li>
<li>在开发实践中，有许多类型的对象、配置值都需要常驻内存、需要有唯一性，或都需要多出使用，自行维护这些对象或值是非常繁琐的，通过Spring框架可以加大的简化这些操作。</li>
</ul>
<h3 id="在maven工程中使用spring" tabindex="-1"><a class="header-anchor" href="#在maven工程中使用spring" aria-hidden="true">#</a> 在Maven工程中使用Spring</h3>
<ul>
<li>
<p>当某个项目需要使用Spring框架时，推荐使用Maven工程。</p>
</li>
<li>
<p>使用Spring框架所需的依赖项是spring-context，依赖代码为：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-context<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>5.3.14<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>以上代码中版本号可以按需调整</p>
</blockquote>
</li>
</ul>
<h1 id="ioc-控制反转" tabindex="-1"><a class="header-anchor" href="#ioc-控制反转" aria-hidden="true">#</a> IOC-控制反转</h1>
<blockquote>
<p>将对象的创建权交由Spring去管理，我们需要使用某个对象时，直接从Spring框架中获取即可</p>
</blockquote>
<h2 id="创建对象的方式" tabindex="-1"><a class="header-anchor" href="#创建对象的方式" aria-hidden="true">#</a> 创建对象的方式</h2>
<ul>
<li>如果需要Spring管理对象，就必须先创建对象，然后Spring获取到对象才可以进行管理</li>
<li>被Spring管理的对象，通常也称之为Spring Bean</li>
<li>创建对象的方式有两种：
<ul>
<li>通过@Bean方法</li>
<li>通过组件扫描</li>
</ul>
</li>
</ul>
<h2 id="通过-bean方法创建对象-显示配置bean" tabindex="-1"><a class="header-anchor" href="#通过-bean方法创建对象-显示配置bean" aria-hidden="true">#</a> 通过@Bean方法创建对象（显示配置Bean）</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>使用<span class="token number">2</span>个注解配合使用，具体做法是：
    <span class="token number">1.</span> 在项目定义配置类 <span class="token operator">--</span> 通过注解<span class="token annotation punctuation">@Configuration</span>类定义配置类
    	<span class="token annotation punctuation">@Configuration</span>作用于类上方，则表明这个类是一个配置类
    <span class="token number">2.</span> 在配置类中定义<span class="token class-name">Bean</span> <span class="token operator">--</span> 告诉<span class="token class-name">Spring</span>容器需要去创建哪些<span class="token class-name">Bean</span>对象
    
判断<span class="token class-name">Spring</span>容器是否已经定义<span class="token class-name">Bean</span>对象的方式：从<span class="token class-name">Spring</span>容器获取该<span class="token class-name">Bean</span>对象

案例步骤：
    <span class="token number">1.</span> 创建<span class="token class-name">SpringBoot</span>项目
    <span class="token number">2.</span> 创建包：config用于放配置类    dao包用于保存一些定义的类
    <span class="token number">3.</span> 创建类：在config包下创建配置类，类名自定义
    		  在dao包下创建<span class="token class-name">UserDao</span>类
    <span class="token number">4.</span> 配置<span class="token class-name">Bean</span>
    	在配置类上方添加注解<span class="token annotation punctuation">@Configuration</span>
    	在配置类中定义一个方法用于返回<span class="token class-name">UserDao</span>实例，在该方法上方添加注解<span class="token annotation punctuation">@Bean</span>
    <span class="token number">5.</span> 测试<span class="token class-name">Spring</span>是否已经配置好了<span class="token class-name">Bean</span>对象
    	获取<span class="token class-name">ApplicationContext</span>对象，然后调用getBean方法获取<span class="token class-name">UserDao</span>实例，如果获取成功，表明<span class="token class-name">Spring</span>配置<span class="token class-name">UserDaoBean</span>成功
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>注意点：通过@Bean显示配置Bean对象，方法名即为Bean对象的name，通常叫做BeanId，BeanId是用于检索Bean对象的</p>
</li>
<li>
<p>通过@Bean装配Bean时，若需要注入其他Bean对象，可以使用参数注入Bean对象</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">PersonService</span> <span class="token function">personService</span><span class="token punctuation">(</span><span class="token class-name">PersonDao</span> personDao<span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">PersonServiceImpl</span><span class="token punctuation">(</span>personDao<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h2 id="通过组件扫描-隐式配置bean" tabindex="-1"><a class="header-anchor" href="#通过组件扫描-隐式配置bean" aria-hidden="true">#</a> 通过组件扫描（隐式配置Bean）</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token number">1.</span> 通过在类上方添加组件类注解来表名某个类是组件，交由<span class="token class-name">Spring</span>去管理
  		组件：<span class="token class-name">Spring</span>中定义的类，通过在类上方添加注解来表明是组件
<span class="token number">2.</span> 在配置类上方添加注解<span class="token annotation punctuation">@ComponentScan</span><span class="token punctuation">(</span><span class="token string">"指定包名"</span><span class="token punctuation">)</span>，通知<span class="token class-name">Spring</span>去哪里扫描添加了组件类注解的类并装配成<span class="token class-name">Bean</span>对象
  
组件类注解：
  <span class="token annotation punctuation">@Component</span>	通用组件注解
  <span class="token annotation punctuation">@Controller</span> <span class="token operator">/</span> <span class="token annotation punctuation">@RestController</span>	控制器组件
  <span class="token annotation punctuation">@Service</span>	业务层组件
  <span class="token annotation punctuation">@Repository</span>	持久化<span class="token operator">/</span>数据层组件
  <span class="token annotation punctuation">@Configuration</span>	表示配置类组件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>隐式配置的BeanId，默认情况下为：</p>
<ol>
<li>
<p>若类名首字母大写，第二个字母小写，则BeanId为类名首字母小写：</p>
<p>eg:<code v-pre>class UserDaoImpl...</code>对应的BeanId为：<code v-pre>userDaoImpl</code></p>
</li>
<li>
<p>否则，BeanId和类名保持一直</p>
<p>eg:<code v-pre>class USerDaoImpl...</code>对应的BeanId为：<code v-pre>USerDaoImpl</code></p>
</li>
</ol>
</li>
<li>
<p>隐式配置BeanId也可以通过注解<code v-pre>@Component(&quot;beanid&quot;)</code>指定BeanId</p>
</li>
<li>
<p>关于显示配置和隐式配置的选择：</p>
<ul>
<li>定义自己写的类是，建议使用隐式配置</li>
<li>将不是自己写的类装配成Bean时，建议使用显示配置</li>
</ul>
<blockquote>
<p>在一个项目中可以混合使用</p>
</blockquote>
</li>
</ul>
<h2 id="spring中所有bean的实例化时机" tabindex="-1"><a class="header-anchor" href="#spring中所有bean的实例化时机" aria-hidden="true">#</a> Spring中所有Bean的实例化时机</h2>
<blockquote>
<p>Spring框架中，所有的Bean对象都是在Spring程序启动时实例化好的。</p>
<p>因为以上操作，造成的现象：启动Spring程序，启动时间会长一些</p>
</blockquote>
<blockquote>
<p>问题：为什么Spring不采用懒加载机制？（即什么时候用某个Bean，再创建某个Bean对象）</p>
<ul>
<li>
<p>如果在程序启动时实例化所有的Bean，这种方式启动时间会长，但是后续使用Bean时无需再创建Bean，所以使用过程中程序的效率很高</p>
</li>
<li>
<p>如果采用懒加载方式，即程序启动时不实例化Bean，而是什么时候用个，什么时候在实例化，这种方式会降低程序的使用效率</p>
</li>
</ul>
</blockquote>
<h2 id="从spring容器中获取bean对象" tabindex="-1"><a class="header-anchor" href="#从spring容器中获取bean对象" aria-hidden="true">#</a> 从Spring容器中获取Bean对象</h2>
<ul>
<li>
<p>ApplicationContext -- 应用程序上下文对象</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>该对象代表<span class="token class-name">Spring</span>容器，会存在于整个项目生命周期。
所以可以通过该对象获取<span class="token class-name">Spring</span>容器中的所有<span class="token class-name">Bean</span>对象
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>如何获取到ApplicationContext对象</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">ApplicationContext</span> context <span class="token operator">=</span> <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">Config</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>如何通过ApplicationContext对象获取某个Bean对象 -- 三种方式</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token number">1.</span> 根据数据类型来获取某个<span class="token class-name">Bean</span>对象
  	<span class="token class-name">UserDao</span> dao <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">UserDao</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			注意点：这种获取方式要求：该类型的<span class="token class-name">Bean</span>对象只有一个
<span class="token number">2.</span> 根据<span class="token class-name">BeanId</span>来获取<span class="token class-name">Bean</span>对象
    <span class="token class-name">StudentDao</span> studentDao <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">StudentDao</span><span class="token punctuation">)</span> context<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token string">"studentDao"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			注意点：通过<span class="token class-name">BeanId</span>获取到的<span class="token class-name">Bean</span>对象类型为<span class="token class-name">Obj</span>，需要强转
<span class="token number">3.</span> 根据<span class="token class-name">BeanId</span>来获取<span class="token class-name">Bean</span>对象，可以指定数据类型，无需强转
    <span class="token class-name">UserDao</span> userDao <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token string">"userDao"</span><span class="token punctuation">,</span><span class="token class-name">UserDao</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h2 id="bean的作用域" tabindex="-1"><a class="header-anchor" href="#bean的作用域" aria-hidden="true">#</a> Bean的作用域</h2>
<ul>
<li>
<p>作用域是Bean的属性，可以单独对某个Bean的作用域进行修改</p>
</li>
<li>
<p>Spring容器配置Bean对象的时候，默认所有的Bean对象都是单例的</p>
</li>
<li>
<p>Spring容器中Bean的常见作用域</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>singleton	<span class="token operator">--</span> 单例		<span class="token class-name">Spring</span>容器默认的
prototype <span class="token operator">--</span> 原型   <span class="token class-name">Spring</span>容器中，每次获取<span class="token class-name">Bean</span>对象，都会重写实例化
request <span class="token operator">--</span> 每个request对象代表一次请求，每发起一次请求，都会重新实例化用到<span class="token class-name">Bean</span>对象
session <span class="token operator">--</span> 每次创建一个新的session对象，都会重新实例化用到的<span class="token class-name">Bean</span>对象
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>如何修改作用域：</p>
<ul>
<li>
<p>通过注解@Scope来定义，用法为：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token annotation punctuation">@Scope</span><span class="token punctuation">(</span><span class="token string">"prototype"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">UserDao</span> <span class="token function">userDao</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">UserDao</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
<h2 id="依赖注入" tabindex="-1"><a class="header-anchor" href="#依赖注入" aria-hidden="true">#</a> 依赖注入</h2>
<h3 id="autowired注入" tabindex="-1"><a class="header-anchor" href="#autowired注入" aria-hidden="true">#</a> @AutoWired注入</h3>
<ul>
<li>
<p>该注解是Spring框架提供的，默认会根据类型进行注入</p>
</li>
<li>
<p>三种注入方式：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token number">1.</span> 构造方法注入
  	若类中的构造方法只有一个，则<span class="token annotation punctuation">@AutoWired</span>注解可省略
  	<span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">public</span> <span class="token class-name">CatServiceImpl</span><span class="token punctuation">(</span><span class="token class-name">AnimalDao</span> animalDao<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>animalDao <span class="token operator">=</span> animalDao<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token number">2.</span> set方法注入
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setBearDao</span><span class="token punctuation">(</span><span class="token class-name">BearDao</span> bearDao<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>bearDao <span class="token operator">=</span> bearDao<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token number">3.</span> 字段注入
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">CatDao</span> catDao<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>注入规则:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>该注解是Spring框架提供的注解，默认按照数据类型注入Bean对象
  - 若没有匹配的数据类型，直接注入失败
  - 若该类型对应的Bean对象有多个时，此时会产生歧义
  	-产生歧义时，会自动根据beanId会查找是否有对应的Bean对象，若有则注入
  	-使用@Qualifier(name)指定BeanId/BeanName
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>@Autowired可能会产生歧义的问题</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>案例：
    <span class="token keyword">interface</span>  <span class="token class-name">UserDao</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
				<span class="token keyword">class</span> <span class="token class-name">UserDaoImpl</span> 实现 <span class="token class-name">UserDao</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
				<span class="token keyword">class</span> <span class="token class-name">UserDaoImpl1</span> 实现 <span class="token class-name">UserDao</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

				<span class="token keyword">class</span> <span class="token class-name">UserServiceImpl</span> 实现<span class="token class-name">UserService</span><span class="token punctuation">{</span>
        
        <span class="token annotation punctuation">@Autowried</span>
        <span class="token keyword">private</span> <span class="token class-name">UserDao</span> userDao<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>@Autowried消除歧义--2种解决办法</p>
<ul>
<li>
<p>使用注解@Qualifier</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>步骤：
    定义一个<span class="token class-name">UserDao</span>接口，两个实现类
    在<span class="token class-name">UserServiceImpl</span>中通过字段注入<span class="token class-name">UserDao</span>对象，看是否产生歧义
    测试<span class="token annotation punctuation">@Qualifier</span>注解是否可以解决歧义
    
注意：可以将三种注入方式全都测试
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>@Qualifier注解只能作用于set方法注入和字段注入</li>
</ul>
</li>
<li>
<p>解决歧义第二种办法：</p>
<ul>
<li>@Autowired若产生歧义，此时默认会自动根据beanid去找是否有对应的Bean，若有，则直接注入</li>
</ul>
</li>
</ul>
</li>
<li>
<p>@Resource注入</p>
<ul>
<li>
<p>注入规则：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>默认按照<span class="token class-name">BeanId</span>注入，若找不到匹配的<span class="token class-name">BeanId</span><span class="token punctuation">,</span>则回退到根据数据类型注入
  <span class="token annotation punctuation">@Resource</span>
  <span class="token keyword">private</span> <span class="token class-name">UserService</span> service<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>注入方法：注意不支持构造方法注入</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token number">1.</span> set方法注入
    注意：<span class="token function">setAccountDao</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span>从方法名中提取<span class="token class-name">BeanId</span>，为set后的名称首字母小写
<span class="token number">2.</span> 字段注入
  
注意：
    <span class="token number">1.</span> <span class="token annotation punctuation">@Resource</span><span class="token punctuation">(</span>name<span class="token operator">=</span><span class="token string">"...."</span><span class="token punctuation">)</span>可以通过name属性指定<span class="token class-name">BeanId</span>
	<span class="token number">2.</span> <span class="token annotation punctuation">@Resource</span>注解若没有指定name，则默认是先按照name查找，找不到则回退到类型查找；若指定了name，则只根据name查找，若找不到，则直接报错
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
<h3 id="stereotype注解和meta注解" tabindex="-1"><a class="header-anchor" href="#stereotype注解和meta注解" aria-hidden="true">#</a> Stereotype注解和Meta注解</h3>
<ul>
<li>
<p>Stereotype注解：合成注解/组成注解</p>
<blockquote>
<p>由其他若干个注解组合而成的注解</p>
</blockquote>
<ul>
<li>@Controller</li>
<li>@Service</li>
<li>@Repository</li>
<li>...</li>
</ul>
</li>
<li>
<p>Meta注解在；元注解</p>
<ul>
<li>定义：能够作用在其他注解商法的注解，称为元注解</li>
<li>注意：一个注解可能是合成注解，同时也可能是元注解</li>
</ul>
</li>
</ul>
<h2 id="bean的生命周期" tabindex="-1"><a class="header-anchor" href="#bean的生命周期" aria-hidden="true">#</a> Bean的生命周期</h2>
<blockquote>
<p>是指Bean对象从创建到销毁的过程</p>
</blockquote>
<ul>
<li>
<p>@PostConstruct和@PreDestory</p>
<ul>
<li>
<p>前提：使用以上注解定义自定义操作，要求方法必须无参且返回void</p>
</li>
<li>
<p>@PostConstruct</p>
<ul>
<li>该注解作用于方法上方，用于定义自定义初始化操作，该方法会在Bean初始化过程中被调用</li>
<li>作用时机：在Bean的初始化过程中，该注解标记的方法会在setter注入之后被调用</li>
</ul>
</li>
<li>
<p>@PreDestory</p>
<ul>
<li>该注解作用于方法上方，用于定义自定义操作，该方法会在Bean销毁之前被调用</li>
<li>注意点：
<ol>
<li>只有容器正常关闭时才会调用该注解标记的方法，若容器是意外关闭或强制关闭，则不会调用该注解标记的方法</li>
<li>System.exit(..)是强制关闭JVM，而JVM关闭时会自动关闭Spring容器，此时Spring容器并不是强制/意外终止，而是正常结束，所以@PreDestory的方法会被调用</li>
</ol>
</li>
</ul>
</li>
<li>
<p>通过@Bean的属性在Bean初始化和销毁前执行自定义操作</p>
<blockquote>
<p>显示配置Bean时，可以通过添加@Bean的属性initMethod和destoryMethod来指定对应的方法。</p>
<p>效果和@PostConstruct，@PreDestory是一样的</p>
</blockquote>
<ul>
<li>注意：两种方式选择的问题
<ol>
<li>若是自定义的类，则可以通过隐式配置Bean，此时可以使用@PostConstruct和@PreDestory</li>
<li>若配置的不是自己写的类，则可以通过显示配置Bean，此时可以使用属性initMethod和destoryMethod</li>
</ol>
</li>
</ul>
</li>
<li>
<p>构造注入，setter注入，字段注入的执行顺序</p>
<blockquote>
<p>构造注入--&gt;字段注入--&gt;setter注入</p>
</blockquote>
</li>
</ul>
</li>
</ul>
<h2 id="初始化" tabindex="-1"><a class="header-anchor" href="#初始化" aria-hidden="true">#</a> 初始化</h2>
<ol>
<li>
<p>加载并后处理Bean的定义</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>加载<span class="token class-name">Bean</span>的定义：
    检测<span class="token annotation punctuation">@Bean</span>注解和组件类注解，将<span class="token class-name">Bean</span>的定义加载到<span class="token class-name">BeanFactory</span>中（<span class="token class-name">ApplicationContext</span>就是一个<span class="token class-name">BeanFactory</span>），在<span class="token class-name">BeanFactory</span>中，bean的id和类型都会被索引
    
后处理<span class="token class-name">Bean</span>的定义： <span class="token operator">--</span> 调用BFPP
    <span class="token class-name">BeanFactoryPostProcessor</span>在这个节点会被调用，用于修改<span class="token class-name">Bean</span>定义的属性（比如作用域），这个阶段结束，<span class="token class-name">Bean</span>定义加载结束，即将开始实例化<span class="token class-name">Bean</span>
    
    <span class="token operator">-</span> <span class="token class-name">Spring</span>中已经定义好了一些BFPP的实现类，用于处理一些操作，常见的有：
    	从属性文件读取属性，修改<span class="token class-name">Bean</span>的作用域
    	<span class="token operator">-</span><span class="token class-name">PropertySourcesPlaceholderConfigurer</span>，该类实现了BFPP接口，用于完成读取属性
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<p><img src="/images/加载并后处理bean定义.png" alt="加载并后处理bean定义.png"></p>
<ol start="2">
<li>
<p>实例化</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token number">1.</span> 查找<span class="token class-name">Bean</span>的依赖
<span class="token number">2.</span> 实例化<span class="token class-name">Bean</span>
<span class="token number">3.</span> 构造方法注入
<span class="token number">4.</span> setter注入
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>初始化</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>会调用初始化器，可以在初始化之前和之后添加操作，通过接口<span class="token class-name">BeanPostProcessor</span>（BPP）完成<span class="token operator">--</span>该阶段叫做<span class="token class-name">Bean</span>的后处理过程
    
注意：BPP中重写两个方法后，两个方法会在每个<span class="token class-name">Bean</span>的初始化器之前和之后都调用
    
BPP的应用：若想在所有的<span class="token class-name">Bean</span>初始化之前和之后统一的执行一些操作，此时可以通过接口BPP完成。   
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<p><img src="/images/实例化以及初始化.png" alt="实例化以及初始化.png"></p>
</div></template>
