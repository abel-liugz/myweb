<template><div><blockquote>
<p>Mybatis的主要作用是快速实现对关系型数据库中的数据进行访问的框架。
{.is-info}</p>
</blockquote>
<h2 id="创建整合了spring与mybatis的工程" tabindex="-1"><a class="header-anchor" href="#创建整合了spring与mybatis的工程" aria-hidden="true">#</a> 创建整合了Spring与Mybatis的工程</h2>
<p>Mybatis可以不依赖于Spring等框架直接使用的，但是，就需要进行大量的配置，前期配置工作量较大，基于Spring框架目前是业内使用的标准之一，所以，通常会整合Spring与Mybatis，以减少配置。</p>
<p>在创建工程时，创建普通的Maven工程即可（不需要选择特定的骨架）。</p>
<p>在<code v-pre>pom.xml</code>中，需要添加几个依赖项，分别是：</p>
<p>Mybatis的依赖项：<code v-pre>mybatis</code></p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- https://mvnrepository.com/artifact/org.mybatis/mybatis --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.mybatis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mybatis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>3.5.6<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Mybatis整合Spring的依赖项：<code v-pre>mybatis-spring</code></p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- https://mvnrepository.com/artifact/org.mybatis/mybatis-spring --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.mybatis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mybatis-spring<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.0.6<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Spring的依赖项：<code v-pre>spring-context</code></p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- https://mvnrepository.com/artifact/org.springframework/spring-context --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-context<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>5.3.14<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Spring JDBC的依赖项：<code v-pre>spring-jdbc</code></p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-jdbc<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>5.3.14<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>MySQL连接的依赖项：<code v-pre>mysql-connector-java</code></p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- https://mvnrepository.com/artifact/mysql/mysql-connector-java --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>mysql<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mysql-connector-java<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>8.0.21<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>数据库连接池的依赖项：<code v-pre>commons-dbcp2</code></p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- https://mvnrepository.com/artifact/org.apache.commons/commons-dbcp2 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.commons<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>commons-dbcp2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.8.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>JUnit测试的依赖项：<code v-pre>junit-jupiter-api</code></p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- https://mvnrepository.com/artifact/org.junit.jupiter/junit-jupiter-api --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.junit.jupiter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>junit-jupiter-api<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>5.7.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mybatis的基本使用" tabindex="-1"><a class="header-anchor" href="#mybatis的基本使用" aria-hidden="true">#</a> Mybatis的基本使用</h2>
<p>当使用Mybatis实现数据访问时，主要：</p>
<ul>
<li>编写数据访问的抽象方法</li>
<li>配置抽象方法对应的SQL语句</li>
</ul>
<p>关于抽象方法：</p>
<ul>
<li>必须定义在某个接口中，这样的接口通常使用<code v-pre>Mapper</code>作为名称的后缀，例如<code v-pre>AdminMapper</code>
<ul>
<li>Mybatis框架底层将通过接口代理模式来实现</li>
</ul>
</li>
<li>方法的返回值类型：如果要执行的数据操作是增、删、改类型的，统一使用<code v-pre>int</code>作为返回值类型，表示“受影响的行数”，也可以使用<code v-pre>void</code>，但是不推荐；如果要执行的是查询操作，返回值类型只需要能够装载所需的数据即可</li>
<li>方法的名称：自定义，不要重载，建议风格如下：
<ul>
<li>插入数据使用<code v-pre>insert</code>作为方法名称中的前缀或关键字</li>
<li>删除数据使用<code v-pre>delete</code>作为方法名称中的前缀或关键字</li>
<li>更新数据使用<code v-pre>update</code>作为方法名称中的前缀或关键字</li>
<li>查询数据时：
<ul>
<li>如果是统计，使用<code v-pre>count</code>作为方法名称中的前缀或关键字</li>
<li>如果是单个数据，使用<code v-pre>get</code>或<code v-pre>find</code>作为方法名称中的前缀或关键字</li>
<li>如果是列表，使用<code v-pre>list</code>作为方法名称中的前缀或关键字</li>
</ul>
</li>
<li>如果操作数据时有条件，可在以上前缀或关键字右侧添加<code v-pre>by字段名</code>，例如<code v-pre>deleteById</code></li>
</ul>
</li>
<li>方法的参数列表：取决于需要执行的SQL语句中有哪些参数，如果有多个参数，可将这些参数封装到同一个类型中，使用封装的类型作为方法的参数类型</li>
</ul>
<p>所有用于Mybatis处理数据的接口都必须被Mybatis识别，有2种做法：</p>
<ul>
<li>在每个接口上添加<code v-pre>@Mapper</code>注解</li>
<li>推荐：在配置类上添加<code v-pre>@MapperScan</code>注解，指定接口所在的根包</li>
</ul>
<h2 id="动态sql-foreach" tabindex="-1"><a class="header-anchor" href="#动态sql-foreach" aria-hidden="true">#</a> 动态SQL -- foreach</h2>
<p>Mybatis中的动态SQL表现为：根据参数不同，生成不同的SQL语句</p>
<p>目标：根据若干个id一次性删除若干条管理数据</p>
<p>要实现此目标，需要执行的SQL语句大致是：</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>delete from ams_admin where id in (?,?)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>以上SQL语句中，id值的数量（以上<code v-pre>?</code>的数量）对于开发人员而言是未知的！</p>
<p>然后，在<code v-pre>AdminMapper</code>接口中添加抽象方法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">int</span> <span class="token function">deleteByIds</span><span class="token punctuation">(</span><span class="token class-name">Long</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> ids<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">int</span> <span class="token function">deleteByIds</span><span class="token punctuation">(</span><span class="token class-name">Long</span><span class="token punctuation">[</span><span class="token punctuation">]</span> ids<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">int</span> <span class="token function">deleteByIds</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">></span></span> ids<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，在<code v-pre>AdminMapper.xml</code>中配置以上抽象方法映射的SQL语句：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- int deleteByIds(List&lt;Long> ids); --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>delete</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>deleteByIds<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    delete from ams_admin where id in (
    	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>foreach</span> <span class="token attr-name">collection</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>list<span class="token punctuation">"</span></span> <span class="token attr-name">item</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>id<span class="token punctuation">"</span></span> <span class="token attr-name">separator</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>,<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
          #{id}
    	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>foreach</span><span class="token punctuation">></span></span>
    )
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>delete</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上代码中：</p>
<ul>
<li><code v-pre>&lt;foreach&gt;</code>标签：用于遍历集合或数组类型的参数对象</li>
<li><code v-pre>collection</code>属性：被遍历的参数对象，当抽象方法的参数只有1个且没有添加<code v-pre>@Param</code>注解时，如果参数是<code v-pre>List</code>类型则此属性值为<code v-pre>list</code>，如果参数是数组类型（包括可变参数）则此属性值为<code v-pre>array</code>；当抽象方法的参数有多个或添加了<code v-pre>@Param</code>注解时，则此属性值为<code v-pre>@Param</code>注解中配置的值</li>
<li><code v-pre>item</code>属性：自定义的名称，表示遍历过程中每个元素的变量名，可在<code v-pre>&lt;foreach&gt;</code>子级使用<code v-pre>#{变量名}</code>表示数据</li>
<li><code v-pre>separator</code>属性：分隔符号，会自动添加在遍历到的各元素之间</li>
</ul>
<p>最后，编写并执行测试：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testDeleteByIds</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">AnnotationConfigApplicationContext</span> ac
            <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AnnotationConfigApplicationContext</span><span class="token punctuation">(</span><span class="token class-name">SpringConfig</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">AdminMapper</span> adminMapper <span class="token operator">=</span> ac<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token class-name">AdminMapper</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">></span></span> ids <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    ids<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">16L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    ids<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">18L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    ids<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">19L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> rows <span class="token operator">=</span> adminMapper<span class="token punctuation">.</span><span class="token function">deleteByIds</span><span class="token punctuation">(</span>ids<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"受影响的行数为："</span> <span class="token operator">+</span> rows<span class="token punctuation">)</span><span class="token punctuation">;</span>

    ac<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="关于-sql注解" tabindex="-1"><a class="header-anchor" href="#关于-sql注解" aria-hidden="true">#</a> 关于@sql注解</h2>
<p>当添加了<code v-pre>spring-test</code>依赖后，可以在测试时使用<code v-pre>@Sql</code>注解，以加载某些<code v-pre>.sql</code>脚本，使得测试之前或之后将执行这些脚本！</p>
<p>使用此注解主要是为了保障可以反复测试，并且得到预期的结果！例如执行删除的测试时，假设数据是存在的，第1次删除可以成功，但是在这之后的测试将不会成功，因为数据在第1次测试时就已经被删除！则可以编写一个<code v-pre>.sql</code>脚本，通过脚本向数据表中插入数据，并在每次测试之前执行此脚本，即可保证每次测试都是成功的！</p>
<p>此注解可以添加在测试类上，则对当前测试类的每个测试方法都是有效的。</p>
<p>此注解也可以添加在测试方法上，则只对当前测试方法是有效的。</p>
<p>如果测试类和测试方法上都添加了此注解，则仅测试方法上的注解会生效。</p>
<p>此注解除了配置需要执行的<code v-pre>.sql</code>脚本以外，还可以通过<code v-pre>executionPhase</code>属性配置其执行阶段，例如取值为<code v-pre>Sql.ExecutionPhase.AFTER_TEST_METHOD</code>时将使得<code v-pre>.sql</code>脚本会在测试方法之后被执行。</p>
<p>每个测试方法可以添加多个<code v-pre>@Sql</code>注解。</p>
<h2 id="关于rbac" tabindex="-1"><a class="header-anchor" href="#关于rbac" aria-hidden="true">#</a> 关于RBAC</h2>
<p><strong>RBAC</strong> = <strong>R</strong>ole <strong>B</strong>ased <strong>A</strong>ccess <strong>C</strong>ontrol（基于角色的访问控制）</p>
<p>RBAC是经典的用户权限管理的设计思路。在这样的设计中，会存在3种类型：用户、角色、权限，权限将分配到各种角色上，用户可以关联某种角色，进而实现用户与权限相关。使用这样的设计，更加利于统一管理若干个用户的权限。</p>
<p>在RBAC的设计思路中，用户与角色一般是多对多的关系，而在数据库中，仅仅只是使用“用户”和“角色”这2张表是不利于维护多对多关系的，通常会增加一张中间表，专门记录对应关系，同理，角色和权限也是多对多的关系，也需要使用中间表来记录对应关系！</p>
<h2 id="mybatis的缓存机制" tabindex="-1"><a class="header-anchor" href="#mybatis的缓存机制" aria-hidden="true">#</a> Mybatis的缓存机制</h2>
<p>缓存：通常是一个临时存储的数据，在未来的某个时间点可能会被删除，通常，存储缓存数据的位置通常是读写效率较高的，相比其它“非缓存”的数据有更高的处理效率。由于缓存的数据通常并不是必须的，则需要额外消耗一定的存储空间，同时由于从缓存获取数据的效率更高，所以是一种牺牲空间、换取时间的做法！另外，你必须知道，从数据库读取数据的效率是非常低下的！</p>
<p>Mybatis有2种缓存机制，分别称之一级缓存和二级缓存，其中，一级缓存是基于<code v-pre>SqlSession</code>的缓存，也称之为“会话缓存”，仅当是同一个会话、同一个Mapper、同一个抽象方法（同一个SQL语句）、同样的参数值时有效，一级缓存在集成框架的应用中默认是开启的，且整个过程不由人为控制（如果是自行得到<code v-pre>SqlSession</code>后的操作，可自行清理一级缓存），另外，二级缓存默认是全局开启的，它是基于namespace的，所以也称之为“namespace缓存”，需要在配置SQL语句的XML中添加<code v-pre>&lt;cache /&gt;</code>节点，以表示当前XML中的所有查询都允许开通二级缓存，并且，在<code v-pre>&lt;select&gt;</code>节点上配置<code v-pre>useCache=&quot;true&quot;</code>，则对应的<code v-pre>&lt;select&gt;</code>节点的查询结果将被二级缓存处理，并且，此查询返回的结果的类型必须是实现了<code v-pre>Serializable</code>接口的，如果使用了<code v-pre>&lt;resultMap&gt;</code>配置如何封装查询结果，则必须使用<code v-pre>&lt;id&gt;</code>节点来封装主键的映射，满足以上条件后，二级缓存将可用，只要是当前namespace中查询出来的结果，都会根据所执行的SQL语句及参数进行结果的缓存。无论是一级缓存还是二级缓存，只要数据发生了写操作（增、删、改），缓存数据都将被自动清理。</p>
<p>由于Mybatis的缓存清理机制过于死板，所以，一般在开发实践中并不怎么使用！更多的是使用其它的缓存工具并自行制定缓存策略。</p>
</div></template>
