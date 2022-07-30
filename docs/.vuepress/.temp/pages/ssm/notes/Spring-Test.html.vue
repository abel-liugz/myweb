<template><div><h1 id="测试" tabindex="-1"><a class="header-anchor" href="#测试" aria-hidden="true">#</a> 测试</h1>
<h2 id="分类" tabindex="-1"><a class="header-anchor" href="#分类" aria-hidden="true">#</a> 分类：</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>单元测试：用于测试一个功能单元，用于测试业务层的<span class="token punctuation">(</span>不带持久层<span class="token punctuation">)</span>，不需要使用<span class="token class-name">Spring</span>容器
集成测试：用于测试多层，测试业务层<span class="token operator">+</span>持久层属于集成，测试控制器<span class="token operator">+</span>业务层<span class="token operator">+</span>持久层也是属于集成测试。通常集成测试都需要使用<span class="token class-name">SPring</span>容器
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="junit5测试" tabindex="-1"><a class="header-anchor" href="#junit5测试" aria-hidden="true">#</a> Junit5测试</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>从<span class="token class-name">SpringBoot2</span><span class="token number">.2</span>版本开始的默认<span class="token class-name">JUnit</span>
需要<span class="token class-name">Java8</span>环境，可以使用lambda表达式
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="junit5常用测试注解" tabindex="-1"><a class="header-anchor" href="#junit5常用测试注解" aria-hidden="true">#</a> Junit5常用测试注解</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Test</span> <span class="token operator">-</span> 放在测试方法上方，可以直接启动该方法
<span class="token annotation punctuation">@BeforeEach</span> <span class="token operator">--</span> 作用于测试方法上方，表示在每个测试方法执行之前都会调用该方法
<span class="token annotation punctuation">@AfterEach</span> <span class="token operator">--</span> 作用于测试方法上方，表示在每个测试方法执行之后都会调用该方法
<span class="token annotation punctuation">@BeforeAll</span>  <span class="token operator">--</span> 作用于方法上方，表示在所有测试方法执行之前执行，且只执行一次，要求该方法为<span class="token keyword">static</span>
<span class="token annotation punctuation">@AfterAll</span>  <span class="token operator">--</span> 作用于方法上方，表示在所有测试方法执行之后执行，且只执行一次，要求该方法为<span class="token keyword">static</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="断言-自动化测试会使用" tabindex="-1"><a class="header-anchor" href="#断言-自动化测试会使用" aria-hidden="true">#</a> 断言 -- 自动化测试会使用</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token number">1.</span> 静态导入断言库
  <span class="token keyword">import</span> <span class="token keyword">static</span> <span class="token import static"><span class="token namespace">org<span class="token punctuation">.</span>junit<span class="token punctuation">.</span>jupiter<span class="token punctuation">.</span>api<span class="token punctuation">.</span></span><span class="token class-name">Assertions</span><span class="token punctuation">.</span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token number">2.</span> 方法：
  <span class="token function">assertEquals</span><span class="token punctuation">(</span>expect<span class="token punctuation">,</span>actual<span class="token punctuation">)</span>
  <span class="token function">assertNull</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
  <span class="token function">assertNotNull</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
  <span class="token function">assertTrue</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
  <span class="token function">assertFalse</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>
  <span class="token function">assertThrows</span><span class="token punctuation">(</span><span class="token class-name">Exception</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mock测试-应用于单元测试中的-模拟测试" tabindex="-1"><a class="header-anchor" href="#mock测试-应用于单元测试中的-模拟测试" aria-hidden="true">#</a> mock测试，应用于单元测试中的 -- 模拟测试</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>如果不想让对业务层的测试对数据库的真实数据造成影响，此时可以采用mock测试，可以对持久层对象进行模拟并训练，从而解决对数据库的影响问题。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="/images/模拟bean测试.png" alt="模拟bean测试.png"></p>
<h3 id="mock测试使用的步骤" tabindex="-1"><a class="header-anchor" href="#mock测试使用的步骤" aria-hidden="true">#</a> mock测试使用的步骤</h3>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token number">1.</span> 静态导入模拟库
  <span class="token keyword">static</span> <span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>mockito<span class="token punctuation">.</span></span>Mockito</span><span class="token punctuation">.</span>*<span class="token punctuation">;</span>
<span class="token number">2.</span> 获取模拟对象
  <span class="token function">mock</span><span class="token punctuation">(</span><span class="token class-name">Class</span><span class="token punctuation">)</span> <span class="token operator">--</span> 得到对应的mockBean对象
<span class="token number">3.</span> 对mock <span class="token class-name">Bean</span>进行训练
  <span class="token function">when</span><span class="token punctuation">(</span>userDao<span class="token punctuation">.</span><span class="token function">addUser</span><span class="token punctuation">(</span><span class="token class-name">User</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenReturn</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token number">4.</span> 进行单元测试，根据训练的结果进行一些自动化测试（断言）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="spring集成测试" tabindex="-1"><a class="header-anchor" href="#spring集成测试" aria-hidden="true">#</a> Spring集成测试</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>在测试类上放添加注解
  <span class="token annotation punctuation">@ExtendWith</span><span class="token punctuation">(</span><span class="token class-name">SpringExtension</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
  <span class="token annotation punctuation">@ContextConfiguration</span><span class="token punctuation">(</span>classes <span class="token operator">=</span> <span class="token class-name">Config</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
  
或者
  <span class="token annotation punctuation">@SpringJUnitConfig</span><span class="token punctuation">(</span><span class="token class-name">Config</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
  
则可以使用上下文对象，也可以注入对象，直接使用。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>注意点：上下文</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>测试过程中，如果需要，可以在某个测试方法结束后，选择关闭上下文，使用注解<span class="token annotation punctuation">@DirtiesContext</span>即可，其他测试方法执行时，会重新获取新的上下文对象
    
如何测试上下文对象是一个还是两个？
    写两个测试方法，分别输出同一个<span class="token class-name">Bean</span>对象，观察输出的引用
    	<span class="token operator">-</span> 结果一致，说明是从同一个上下文对象获取
    	<span class="token operator">-</span> 结果不一致，说明是从两个上下文对象获取到的
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h2 id="springboot集成测试" tabindex="-1"><a class="header-anchor" href="#springboot集成测试" aria-hidden="true">#</a> SpringBoot集成测试</h2>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">SpringBoot</span>进行集成测试，使用注解<span class="token annotation punctuation">@SpringBootTest</span>即可，无需指定配置文件，其他操作和<span class="token class-name">Spring</span>集成测试一致。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>业务层+持久层的集成测试</p>
</li>
<li>
<p>web测试</p>
<ul>
<li>TestRestTemplate集成测试  - 启动web容器</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token number">1.</span> <span class="token class-name">SpringBoot</span>测试框架会自动启动内嵌服务器
<span class="token number">2.</span> 通过<span class="token class-name">SpringBoot</span>自动配置的<span class="token class-name">TestRestTemplate</span> <span class="token class-name">Bean</span>对象来发起请求
    <span class="token operator">-</span> 发送get请求，调用方法 <span class="token function">getForObject</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span>
    <span class="token operator">-</span> 发送post请求，调用<span class="token function">postForObject</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span>
<span class="token number">3.</span> web集成测试的时候，webEnvironment支持以下模式
    RANDOM_PORT<span class="token punctuation">,</span> DEFINED_PORT<span class="token punctuation">,</span> MOCK<span class="token punctuation">,</span> NONE
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>注意点：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>发送get请求：
    <span class="token comment">//get请求传参是在请求后通过？拼接参数</span>
        <span class="token class-name">String</span> url <span class="token operator">=</span> <span class="token string">"/users/login?userName={username}&amp;pwd={password}"</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> mes <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">getForObject</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span><span class="token string">"tom"</span><span class="token punctuation">,</span><span class="token string">"123"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">"登录成功！"</span><span class="token punctuation">,</span>mes<span class="token punctuation">)</span><span class="token punctuation">;</span>
发送post请求：
     <span class="token comment">//定义相对路径</span>
        <span class="token class-name">String</span> url <span class="token operator">=</span> <span class="token string">"/users/regist"</span><span class="token punctuation">;</span>
        <span class="token comment">//post请求传参，参数必须是MultiValueMap类型</span>
        <span class="token class-name">MultiValueMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedMultiValueMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        map<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"userName"</span><span class="token punctuation">,</span><span class="token string">"张三"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        map<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"pwd"</span><span class="token punctuation">,</span><span class="token string">"123"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//发起post请求</span>
        <span class="token class-name">String</span> mes <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">postForObject</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span>map<span class="token punctuation">,</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token string">"注册成功！"</span><span class="token punctuation">,</span>mes<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
</div></template>
