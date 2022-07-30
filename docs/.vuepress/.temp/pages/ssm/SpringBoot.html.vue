<template><div><h2 id="关于spring-boot" tabindex="-1"><a class="header-anchor" href="#关于spring-boot" aria-hidden="true">#</a> 关于Spring Boot</h2>
<p>Spring Boot是Spring官方的一个产品，其本质上是一个基于Maven的、以Spring框架作为基础的进阶框架，很好的支持了主流的其它框架，并默认完成了许多的配置，其核心思想是“约定大于配置”。</p>
<h2 id="创建spring-boot工程" tabindex="-1"><a class="header-anchor" href="#创建spring-boot工程" aria-hidden="true">#</a> 创建Spring Boot工程</h2>
<p>在IntelliJ IDEA中，在创建向导中选择Spring Initializer即可开始创建Spring Boot工程，在创建向导的界面中，需要关注的部分有：</p>
<ul>
<li>Group Id</li>
<li>Artifact Id</li>
</ul>
<p>以上2个值会共同构成一个Package name，如果Artifact Id的名字中有减号，在Package name中会去除，推荐手动添加小数点进行分隔。</p>
<p>由于Spring Boot官方更新版本的频率非常高，在创建项目时，随便选取某个版本均可，当项目创建成功后，推荐打开<code v-pre>pom.xml</code>，将<code v-pre>&lt;parent&gt;</code>中的<code v-pre>&lt;version&gt;</code>（即Spring Boot父项目的版本）改成熟悉的版本，例如：<code v-pre>2.5.9</code></p>
<p>在创建过程中，还可以在创建向导的界面中勾选所需要依赖项，如果创建时没有勾选，也可以在创建工程之后手动在<code v-pre>pom.xml</code>中添加。</p>
<h2 id="spring-boot工程的结构" tabindex="-1"><a class="header-anchor" href="#spring-boot工程的结构" aria-hidden="true">#</a> Spring Boot工程的结构</h2>
<p>由于Spring Boot工程本质上就是一个Maven工程，所以，目录结构基本上没有区别。</p>
<p>与普通Maven工程最大的不同在于：Spring Boot工程在<code v-pre>src\main\java</code>和<code v-pre>src\test\java</code>下默认已经存在Package，是创建项目时指定的Package，**需要注意：此Package已经被配置为Spring执行组件扫描的根包，所以，在编写代码时，所有的组件类都必须放在此包或其子孙包中！**通常，推荐将所有的类（及接口）都创建在此包及其子孙包下。</p>
<p>在<code v-pre>src\main\java</code>下的根包下，默认就已经存在某个类，其类名是创建项目时指定的Artifact与<code v-pre>Application</code>单词的组合，例如<code v-pre>BootDemoApplication</code>，此类中有<code v-pre>main()</code>方法，执行此类的<code v-pre>main()</code>就会启动整个项目，如果当前项目是Web项目，还会自动将项目部署到Web服务器并启动服务器，所以，此类通常也称之为“启动类”。</p>
<p>在启动类上，默认添加了<code v-pre>@SpringBootApplication</code>注解，此注解的元注解中包含<code v-pre>@SpringBootConfiguration</code>，而<code v-pre>@SpringBootConfiguration</code>的元注解中包含<code v-pre>@Configuration</code>，所以，启动类本身也是配置类！所以，允许将<code v-pre>@Bean</code>方法写在此类中，或者某些与配置相关的注解也可以添加在此类上！</p>
<p>在<code v-pre>src\test\java</code>下的根包下，默认就已经存在某个类，其类名是在启动类的名称基础上添加了<code v-pre>Tests</code>单词的组合，例如<code v-pre>BootDemoApplicationTests</code>，此类默认没有添加<code v-pre>public</code>权限，甚至其内部的默认的测试方法也是默认权限的，此测试类上添加了<code v-pre>@SpringBootTest</code>注解，其元注解中包含<code v-pre>@ExtendWith(SpringExtension.class)</code>，与使用<code v-pre>spring-test</code>时的<code v-pre>@SpringJUnitTest</code>注解中的元注解相同，所以，<code v-pre>@SpringBootTest</code>注解也会使得当前测试类在执行测试方法之前是加载了Spring环境的，在实际编写测试时，可以通过自动装配得到任何已存在于Spring容器中的对象，在各测试方法中只需要关注被测试的目标即可。</p>
<p>在<code v-pre>pom.xml</code>中，默认已经添加了<code v-pre>spring-boot-starter</code>和<code v-pre>spring-boot-starter-test</code>依赖，分别是<strong>Spring Boot的基础依赖</strong>和<strong>基于Spring Boot的测试的依赖</strong>。</p>
<p>另外，如果在创建工程时，勾选依赖项时选中了<code v-pre>Web</code>项，在<code v-pre>src\main\resources</code>下默认就已经创建了<code v-pre>static</code>和<code v-pre>templates</code>文件夹，如果没有勾选<code v-pre>Web</code>则没有这2个文件夹，可以后续自行补充创建。</p>
<p>在<code v-pre>src\main\resources</code>文件夹下，默认就已经存在<code v-pre>application.properties</code>文件，用于编写配置，Spring Boot会自动读取此文件（利用<code v-pre>@PropertySource</code>注解）。</p>
<p>小结：</p>
<ul>
<li>创建项目后默认的Package不要修改，避免出错</li>
<li>在编码过程中，自行创建的所有类、接口均放在默认的Package或其子孙包中</li>
<li>在<code v-pre>src\main\java</code>下默认已存在<code v-pre>XxxApplication</code>是启动类，执行此类中的<code v-pre>main()</code>方法就会启动整个项目</li>
<li>启动类本身也是配置类</li>
<li>配置都应该编写到<code v-pre>src\main\resources</code>下的<code v-pre>application.properties</code>中，Spring Boot会自动读取</li>
<li>测试类也必须放在<code v-pre>src\test\java</code>下的默认Package或其子孙包中</li>
<li>在测试类上添加<code v-pre>@SpringBootTest</code>注解，则其中的测试方法执行之前会自动加载Spring环境及当前项目的配置，可以在测试类中使用自动装配</li>
</ul>
<h2 id="在spring-boot工程中使用mybatis" tabindex="-1"><a class="header-anchor" href="#在spring-boot工程中使用mybatis" aria-hidden="true">#</a> 在Spring Boot工程中使用Mybatis</h2>
<p>需要添加相关依赖项：</p>
<ul>
<li><code v-pre>mysql-connector-java</code></li>
<li><code v-pre>mybatis-spring-boot-starter</code></li>
</ul>
<p>其依赖的代码为：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>mysql<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mysql-connector-java<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>runtime<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.mybatis.spring.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mybatis-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.2.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>说明：在Spring Boot工程，许多依赖项都是不需要显式的指定版本号的，因为在父项目中已经对这些依赖项的版本进行了管理（配置版本号），如果一定需要使用特定的版本，也可以自行添加<code v-pre>&lt;version&gt;</code>节点进行配置</p>
<p>说明：在依赖项的源代码中，当<code v-pre>&lt;scope&gt;</code>的值为<code v-pre>runtime</code>时，表示此依赖项是运行过程中需要的，但是，在编译时并不需要参与编译</p>
<p>需要注意：当添加了以上数据库编程的依赖后，如果启动项目，将失败！</p>
<p>因为添加了数据库编程的依赖项后，Spring Boot就会尝试自动装配数据源（<code v-pre>DataSource</code>）等对象，装配时所需的连接数据库的配置信息（例如URL、登录数据库的用户名和密码）应该是配置在<code v-pre>application.properties</code>中的，但是，如果尚未配置，就会导致失败！</p>
<p>关于连接数据库的配置信息，Spring Boot要求对应的属性名是：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># 连接数据库的URL
spring.datasource.url=???
# 登录数据库的用户名
spring.datasource.username=???
# 登录数据库的密码
spring.datasource.password=???
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在配置时，也必须使用以上属性名进行配置，则Spring Boot会自动读取这些属性对应的值，用于创建数据源对象！</p>
<p>例如，配置为：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># 连接数据库的URL
spring.datasource.url=jdbc:mysql://localhost:3306/mall_ams?useUnicode=true&amp;characterEncoding=UTF-8&amp;serverTimezone=Asia/Shanghai
# 登录数据库的用户名
spring.datasource.username=root
# 登录数据库的密码
spring.datasource.password=1234
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于Spring Boot在启动时只是加载以上配置，并不会实际的连接到数据库，所以，当以上配置存在时，启动就不会报错，但是，无法检验以上配置的值是否正确！</p>
<p>可以在测试类中添加测试方法，尝试连接数据库，以检验以上配置值是否正确：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">class</span> <span class="token class-name">BootDemoApplicationTests</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token class-name">DataSource</span> dataSource<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">testGetConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>dataSource<span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果以上测试通过，则表示配置值无误，可以正确连接到数据库，如果测试失败，则表示配置值错误，需检查配置值及本地环境（例如MySQL是否启动、是否已创建对应的数据库等）。</p>
<h2 id="关于profile配置" tabindex="-1"><a class="header-anchor" href="#关于profile配置" aria-hidden="true">#</a> 关于Profile配置</h2>
<p>在Spring Boot中，对Profile配置有很好的支持，开发人员可以在<code v-pre>src\main\resources</code>下创建更多的配置文件，这些配置文件的名称应该是<code v-pre>application-???.properties</code>（其中的<code v-pre>???</code>是某个名称，是自定义的）。</p>
<p>例如：</p>
<ul>
<li>仅在开发环境中使用的配置值可以写在<code v-pre>application-dev.properties</code>中</li>
<li>仅在测试环境中使用的配置值可以写在<code v-pre>application-test.properties</code>中</li>
<li>仅在生产环境（项目上线的环境）中使用的配置值可以写在<code v-pre>application-prod.properties</code>中</li>
</ul>
<p>当把配置写在以上这类文件后，Spring Boot默认并不会应用以上这些文件中的配置，当需要应用某个配置时，需要在<code v-pre>application.properties</code>中激活某个Profile配置，例如：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># 激活Profile配置
spring.profiles.active=dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>提示：以上配置值中的<code v-pre>dev</code>是需要激活的配置文件的文件名后缀，当配置为<code v-pre>dev</code>时，就会激活<code v-pre>application-dev.properties</code>，同理，如果以上配置值为<code v-pre>test</code>，就会激活<code v-pre>application-test.properties</code>。</p>
<h2 id="关于yaml配置" tabindex="-1"><a class="header-anchor" href="#关于yaml配置" aria-hidden="true">#</a> 关于YAML配置</h2>
<p>Spring Boot也支持使用YAML配置，在开发实践中，YAML的配置也使用得比较多。</p>
<p>YAML配置就是把原有的<code v-pre>.properties</code>配置的扩展改为<code v-pre>yml</code>。</p>
<p>YAML配置原本并不是Spring系列框架内置的配置语法，如果在项目中需要使用这种语法进行配置，解析这类文件需要添加相关依赖，在Spring Boot中默认已添加此依赖。</p>
<p>在YAML配置中，原本在<code v-pre>.properties</code>的配置表现为使用多个小数点分隔的配置将改为<strong>换行</strong>并<strong>使用2个空格缩进</strong>的语法，换行前的部分使用<strong>冒号</strong>表示结束，最后的属性名与值之间使用<strong>冒号和1个空格</strong>进行分隔，如果有多条属性在<code v-pre>.properties</code>文件中属性名有重复的前缀，在<code v-pre>yml</code>中不必也不能重复写。</p>
<p>例如，原本在<code v-pre>.properties</code>中配置为：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>spring.datasource.username=root
spring.datasource.password=123456
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>则在<code v-pre>yml</code>文件中配置为：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>spring:
  datasource:
    username: root
    password: 123456
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>提示：在IntelliJ IDEA中编写<code v-pre>yml</code>时，当需要缩进2个空格时，仍可以使用键盘上的TAB键进行缩进，IntelliJ IDEA会自动将其转换为2个空格。</p>
<p>无论是<code v-pre>.properties</code>还是<code v-pre>yml</code>，只是配置文件的扩展名和文件内部的配置语法有区别，对于Spring Boot最终的执行其实没有任何表现上的不同。</p>
<h2 id="使用druid数据库连接池" tabindex="-1"><a class="header-anchor" href="#使用druid数据库连接池" aria-hidden="true">#</a> 使用Druid数据库连接池</h2>
<p>Druid数据库连接是阿里巴巴团队研发的，在Spring Boot项目中，如果需要显式的指定使用此连接池，首先，需要在项目中添加依赖：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>druid<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.1.20<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当添加了此依赖，在项目中需要应用时，需要在配置文件中指定<code v-pre>spring.datasource.type</code>属性，取值为以上依赖项的jar包中的<code v-pre>DruidDataSource</code>类型的全限定名。</p>
<p>例如，在<code v-pre>yml</code>中配置为：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># Spring系列框架的配置
spring:
  # 连接数据库的相关配置
  datasource:
    # 使用的数据库连接池类型
    type: com.alibaba.druid.pool.DruidDataSource
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="编写持久层-数据访问层-代码" tabindex="-1"><a class="header-anchor" href="#编写持久层-数据访问层-代码" aria-hidden="true">#</a> 编写持久层（数据访问层）代码</h2>
<p>数据持久化：在开发领域中，讨论数据时，通常指定是正在执行或处理的数据，这些数据都是在内存中的，而内存（RAM）的特征包含”一旦断电，数据将全部丢失“，为了让数据永久保存下来，通常会将数据存储到能够永久存储数据的介质中，通常是计算机的硬盘，硬盘上的数据都是以文件的形式存在的，所以，当需要永久保存数据时，可以将数据存储到文本文件中，或存储到XML文件中，或存储到数据库中，这些保存的做法就是数据持久化，而文本文件、XML文件都不利于实现增删改查中的所有数据访问操作，而数据库是实现增删改查这4种操作都比较便利的，所以，一般在讨论数据持久化时，默认指的都是使用数据库存储数据。</p>
<p>在项目中，会将代码（各类、接口）划分一些层次，各层用于解决不同的问题，其中，持久层就是用于解决数据持久化问题的，甚至，简单来说，持久层对应的就是数据库编程的相关文件或代码。</p>
<p>目前，使用Mybatis技术实现持久层编程，需要：</p>
<ul>
<li>编写一次性的基础配置
<ul>
<li>使用<code v-pre>@MapperScan</code>指定接口所在的Base Package</li>
<li>指定配置SQL语句的XML文件的位置</li>
</ul>
</li>
<li>编写每个数据访问功能的代码
<ul>
<li>在接口中添加必须的抽象方法
<ul>
<li>可能需要创建相关的POJO类</li>
</ul>
</li>
<li>在XML文件中配置抽象方法映射的SQL语句</li>
</ul>
</li>
</ul>
<p>关于一次性的配置，<code v-pre>@MapperScan</code>注解需要添加在配置类上，有2种做法：</p>
<ul>
<li>直接将此注解添加在启动类上，因为启动类本身也是配置类</li>
<li>自行创建配置类，在此配置类上添加<code v-pre>@MapperScan</code></li>
</ul>
<p>如果采用以上的第2种做法，则应该在<code v-pre>src\main\java</code>的根包下，创建<code v-pre>config.MybatisConfig</code>类，并在此类使用<code v-pre>@MapperScan</code>注解</p>
<p>另外，关于指定配置SQL语句的XML文件的位置，需要在<code v-pre>application.yml</code>（或<code v-pre>application.properties</code>）中配置<code v-pre>mybatis.mapper-locations</code>属性，例如：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># Mybatis相关配置</span>
<span class="token key atrule">mybatis</span><span class="token punctuation">:</span>
  <span class="token comment"># 用于配置SQL语句的XML文件的位置</span>
  <span class="token key atrule">mapper-locations</span><span class="token punctuation">:</span> classpath<span class="token punctuation">:</span>mapper/<span class="token important">*.xml</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>基于以上的配置值，还应该在<code v-pre>src/main/resources</code>下自行创建名为<code v-pre>mapper</code>的文件夹。</p>
<p>至此，关于使用Mybatis实现数据库编程的一次性配置结束！</p>
<h2 id="关于业务逻辑层-service层" tabindex="-1"><a class="header-anchor" href="#关于业务逻辑层-service层" aria-hidden="true">#</a> 关于业务逻辑层（Service层）</h2>
<p>业务逻辑层是被Controller直接调用的层（Controller不允许直接调用持久层），通常，在业务逻辑层中编写的代码是为了<strong>保证数据的完整性和安全性</strong>，使得数据是随着我们设定的规则而产生或发生变化。</p>
<p>通常，在业务逻辑层的代码会由接口和实现类组件，其中，接口被视为是必须的</p>
<ul>
<li>推荐使用基于接口的编程方式</li>
<li>部分框架在处理某些功能时，会使用基于接口的代理模式，例如Spring  JDBC框架在处理事务时</li>
</ul>
<p>在接口中，声明抽象方法时，仅以操作成功为前提来设计返回值类型（不考虑失败），如果业务在执行过程可能出现某些失败（不符合所设定的规则），可以通过抛出异常来表示！</p>
<p>关于抛出的异常，通常是自定义的异常，并且，自定义异常通常是<code v-pre>RuntimeException</code>的子类，主要原因：</p>
<ul>
<li>不必显式的抛出或捕获，因为业务逻辑层的异常永远是抛出的，而控制器层会调用业务逻辑层，在控制器层的Controller中其实也是永远抛出异常的，这些异常会通过Spring MVC统一处理异常的机制进行处理，关于异常的整个过程都是固定流程，所以，没有必要显式抛出或捕获</li>
<li>部分框架在处理某些事情时，默认只对<code v-pre>RuntimeException</code>的子孙类进行识别并处理，例如Spring  JDBC框架在处理事务时</li>
</ul>
<p>所以，在实际编写业务逻辑层之前，应该先规划异常，例如先创建<code v-pre>ServiceException</code>类</p>
<h2 id="使用lombok框架" tabindex="-1"><a class="header-anchor" href="#使用lombok框架" aria-hidden="true">#</a> 使用Lombok框架</h2>
<p>在编写POJO类型（包括实体类、VO、DTO等）时，都有统一的编码规范，例如：</p>
<ul>
<li>属性都是私有的</li>
<li>所有属性都有对应的Setter &amp; Getter方法</li>
<li>应该重写<code v-pre>equals()</code>和<code v-pre>hashCode()</code>方法，以保证：如果2个对象的字面值完全相同，则<code v-pre>equals()</code>对比结果为<code v-pre>true</code>，且<code v-pre>hashCode()</code>返回值相同，如果2个对象的字面值不相同，则<code v-pre>equals()</code>对比结果为<code v-pre>false</code>，且<code v-pre>hashCode()</code>返回值不同</li>
<li>实现<code v-pre>Serializable</code>接口</li>
</ul>
<p>另外，为了便于观察对象的各属性值，通常还会重写<code v-pre>toString()</code>方法。</p>
<p>由于以上操作方式非常固定，且涉及的代码量虽然不难，但是篇幅较长，并且，当类中的属性需要修改时（包括修改原有属性、或增加新属性、删除原有属性），对应的其它方法都需要修改（或重新生成），管理起来比较麻烦。</p>
<p>使用Lombok框架可以极大的简化这些操作，此框架可以通过注解的方式，在<strong>编译期</strong>来生成Setters &amp; Getters、<code v-pre>equals()</code>、<code v-pre>hashCode()</code>、<code v-pre>toString()</code>，甚至生成构造方法等，所以，一旦使用此框架，开发人员就只需要在类中声明各属性、实现<code v-pre>Serializable</code>、添加Lombok指定的注解即可。</p>
<p>在Spring Boot中，添加Lombok依赖，可以在创建项目时勾选，也可以后期自行添加，依赖项的代码为：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完成后，在各POJO类型中，将不再需要在源代码添加Setters &amp; Getters、<code v-pre>equals()</code>、<code v-pre>hashCode()</code>、<code v-pre>toString()</code>这些方法，只需要在POJO类上添加<code v-pre>@Data</code>注解即可！</p>
<p>当添加<code v-pre>@Data</code>注解，且删除相关方法后，由于源代码中没有相关方法，则调用了相关代码的方法可能会报错，但是，并不影响程序运行！</p>
<p>为了避免IntelliJ IDEA判断失误而提示了警告和错误，推荐安装Lombok插件</p>
<h2 id="slf4j日志框架" tabindex="-1"><a class="header-anchor" href="#slf4j日志框架" aria-hidden="true">#</a> Slf4j日志框架</h2>
<p>在开发实践中，<strong>不允许</strong>使用<code v-pre>System.out.println()</code>或类似的输出语句来输出显示关键数据（核心数据、敏感数据等），因为，如果是这样使用，无论是在开发环境，还是测试环境，还是生产环境中，这些输出语句都将输出相关信息，而删除或添加这些输出语句的操作成本比较高，操作可行性低。</p>
<p>推荐的做法是使用日志框架来输出相关信息！</p>
<p>当添加了Lombok依赖后，可以在需要使用日志的类上添加<code v-pre>@Slf4j</code>注解，然后，在类的任意中，均可使用名为<code v-pre>log</code>的变量，且调用其方法来输出日志（名为<code v-pre>log</code>的变量也是Lombok框架在编译期自动补充的声明并创建对象）！</p>
<p>在Slf4j日志框架中，将日志的可显示级别根据其重要程度（严重程度）由低到高分为：</p>
<ul>
<li>trace：跟踪信息</li>
<li>debug：调试信息</li>
<li>info：一般信息，通常不涉及关键流程和敏感数据</li>
<li>warn：警告信息，通常代码可以运行，但不够完美，或不规范</li>
<li>error：错误信息</li>
</ul>
<p>在配置文件中，可以通过<code v-pre>logging.level.包名.类名</code>来设置当前类的日志显示级别，例如：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">logging.level.cn.tedu.boot.demo.service.impl.AdminServiceImpl</span><span class="token punctuation">:</span> info
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当设置了显示的日志级别后，仅显示设置级别和更重要的级别的日志，例如，设置为<code v-pre>info</code>时，只显示<code v-pre>info</code>、<code v-pre>warn</code>、<code v-pre>error</code>，不会显示<code v-pre>debug</code>、<code v-pre>trace</code>级别的日志！</p>
<p>当输出日志时，通过<code v-pre>log</code>变量调用<code v-pre>trace()</code>方法输出的日志就是<code v-pre>trace</code>级别的，调用<code v-pre>debug()</code>方法输出的日志就是<code v-pre>debug()</code>级别的，以此类推，可调用的方法还有<code v-pre>info()</code>、<code v-pre>warn()</code>、<code v-pre>error()</code>。</p>
<p><strong>在开发实践中，关键数据和敏感数据都应该通过<code v-pre>trace()</code>或<code v-pre>debug()</code>进行输出，在开发环境中，可以将日志的显示级别设置为<code v-pre>trace</code>，则会显示所有日志，当需要交付到生产环境中时，只需要将日志的显示级别调整为<code v-pre>info</code>即可！</strong></p>
<p>默认情况下，日志的显示级别是<code v-pre>info</code>，所以，即使没有在配置文件中进行正确的配置，所有info、warn、error级别的日志都会输出显示。</p>
<p>在配置时，属性名称中的<code v-pre>logging.level</code>部分是必须的，在其后，必须写至少1级包名，例如：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">logging.level.cn</span><span class="token punctuation">:</span> trace
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>以上配置表示<code v-pre>cn</code>包及其子孙包下的所有类中的日志都按照<code v-pre>trace</code>级别进行显示！</p>
<p>在开发实践中，属性名称通常配置为<code v-pre>logging.level.项目根包</code>，例如：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">logging.level.cn.tedu.boot.demo</span><span class="token punctuation">:</span> trace
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在使用Slf4j时，通过<code v-pre>log</code>调用的每种级别的方法都被重载了多次（各级别对应除了方法名称不同，重载的次数和参数列表均相同），推荐使用的方法是参数列表为<code v-pre>(String format, Object... arguments)</code>的，例如：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">trace</span><span class="token punctuation">(</span><span class="token class-name">String</span> format<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">debug</span><span class="token punctuation">(</span><span class="token class-name">String</span> format<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">info</span><span class="token punctuation">(</span><span class="token class-name">String</span> format<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">warn</span><span class="token punctuation">(</span><span class="token class-name">String</span> format<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">error</span><span class="token punctuation">(</span><span class="token class-name">String</span> format<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> arguments<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上方法中，第1个参数是将要输出的字符串的模式（模版），在此字符串中，如果需要包含某个变量值，则使用<code v-pre>{}</code>表示，如果有多个变量值，均是如此，然后，再通过第2个参数（是可变参数）依次表示各<code v-pre>{}</code>对应的值，例如：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"加密前的密码：{}，加密后的密码：{}"</span><span class="token punctuation">,</span> password<span class="token punctuation">,</span> encodedPassword<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用这种做法，可以避免多变量时频繁的拼接字符串，另外，日志框架会将第1个参数进行缓存，以此提高后续每一次的执行效率。</p>
<p>在开发实践中，应该对程序执行关键位置添加日志的输出，通常包括：</p>
<ul>
<li>每个方法的第1行有效语句，表示代码已经执行到此方法内，或此方法已经被成功调用
<ul>
<li>如果方法是有参数的，还应该输出参数的值</li>
</ul>
</li>
<li>关键数据或核心数据在改变之前和之后
<ul>
<li>例如对密码加密时，应该通过日志输出加密前和加密后的密码</li>
</ul>
</li>
<li>重要的操作执行之前
<ul>
<li>例如尝试插入数据之前、修改数据之前，应该通过日志输出相关值</li>
</ul>
</li>
<li>程序走到某些重要的分支时
<ul>
<li>例如经过判断，走向抛出异常之前</li>
</ul>
</li>
</ul>
<p>其实，Slf4j日志框架只是日志的一种标准，并不是具体的实现（感觉上与Java中的接口有点相似），常见有具体实现了日志功能的框架有log4j、logback等，为了统一标准，所以才出现了Slf4j，同时，由于log4j、logback等框架实现功能并不统一，所以，Slf4j提供了对主流日志框架的兼容，在Spring Boot工程中，<code v-pre>spring-boot-starter</code>就已经依赖了<code v-pre>spring-boot-starter-logging</code>，而在此依赖下，通常包括Slf4j、具体的日志框架、Slf4j对具体日志框架的兼容。</p>
<h2 id="控制器层开发" tabindex="-1"><a class="header-anchor" href="#控制器层开发" aria-hidden="true">#</a> 控制器层开发</h2>
<p>Spring MVC是用于处理控制器层开发的，在使用Spring Boot时，在<code v-pre>pom.xml</code>中添加<code v-pre>spring-boot-starter-web</code>即可整合Spring MVC框架及相关的常用依赖项（包含<code v-pre>jackson-databind</code>），可以将已存在的<code v-pre>spring-boot-starter</code>直接改为<code v-pre>spring-boot-starter-web</code>，因为在<code v-pre>spring-boot-starter-web</code>中已经包含了<code v-pre>spring-boot-starter</code>。</p>
<p>先在项目的根包下创建<code v-pre>controller</code>子包，并在此子包下创建<code v-pre>AdminController</code>，此类应该添加<code v-pre>@RestController</code>和<code v-pre>@RequestMapping(value = &quot;/admins&quot;, produces = &quot;application/json; charset=utf-8&quot;)</code>注解</p>
<p>由于已经决定了服务器端响应时，将响应JSON格式的字符串，为保证能够响应JSON格式的结果，处理请求的方法返回值应该是自定义的数据类型。</p>
<h2 id="validation框架" tabindex="-1"><a class="header-anchor" href="#validation框架" aria-hidden="true">#</a> Validation框架</h2>
<p>当客户端向服务器提交请求时，如果请求数据出现明显的问题（例如关键数据为<code v-pre>null</code>、字符串的长度不在可接受范围内、其它格式错误），应该直接响应错误，而不是将明显错误的请求参数传递到Service！</p>
<blockquote>
<p>关于判断错误，只有涉及数据库中的数据才能判断出结果的，都由Service进行判断，而基本的格式判断，都由Controller进行判断。</p>
</blockquote>
<p>Validation框架是专门用于解决<strong>检查数据基本格式有效性</strong>的，最早并不是Spring系列的框架，目前，Spring Boot提供了更好的支持，所以，通常结合在一起使用。</p>
<p>在Spring Boot项目中，需要添加<code v-pre>spring-boot-starter-validation</code>依赖项，例如：</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-validation<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在控制器中，首先，对需要检查数据格式的请求参数添加<code v-pre>@Valid</code>或<code v-pre>@Validated</code>注解（这2个注解没有区别），例如：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span><span class="token string">"/add-new"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">JsonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">></span></span> <span class="token function">addNew</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Validated</span> <span class="token class-name">AdminAddNewDTO</span> adminAddNewDTO<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    adminService<span class="token punctuation">.</span><span class="token function">addNew</span><span class="token punctuation">(</span>adminAddNewDTO<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">JsonResult</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>真正需要检查的是<code v-pre>AdminAddNewDTO</code>中各属性的值，所以，接下来需要在此类的各属性上通过注解来配置检查的规则，例如：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AdminAddNewDTO</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@NotNull</span> <span class="token comment">// 验证规则为：不允许为null</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> username<span class="token punctuation">;</span>
    
    <span class="token comment">// ===== 原有其它代码 =====</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启项目，通过不提交用户名的URL（例如：http://localhost:8080/admins/add-new）进行访问，在浏览器上会出现400错误页面，并且，在IntelliJ IDEA的控制台会出现以下警告：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>2022-06-07 11:37:53.424  WARN 6404 --- [nio-8080-exec-8] .w.s.m.s.DefaultHandlerExceptionResolver : Resolved [
org.springframework.validation.BindException: 
org.springframework.validation.BeanPropertyBindingResult: 1 errors&lt;EOL>Field error in object 'adminAddNewDTO' on field 'username': rejected value [null]; codes [NotNull.adminAddNewDTO.username,NotNull.username,NotNull.java.lang.String,NotNull]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [adminAddNewDTO.username,username]; arguments []; default message [username]]; default message [不能为null]]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从警告信息中可以看到，当验证失败时（不符合所使用的注解对应的规则时），会出现<code v-pre>org.springframework.validation.BindException</code>异常，则自行处理此异常即可！</p>
<p>如果有多个属性需要验证，则多个属性都需要添加注解，例如：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AdminAddNewDTO</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@NotNull</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> username<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@NotNull</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> password<span class="token punctuation">;</span>
    
    <span class="token comment">// ===== 原有其它代码 =====</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，在<code v-pre>State</code>中添加新的枚举：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">State</span> <span class="token punctuation">{</span>

    <span class="token function">OK</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">ERR_USERNAME</span><span class="token punctuation">(</span><span class="token number">201</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">ERR_PASSWORD</span><span class="token punctuation">(</span><span class="token number">202</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">ERR_BAD_REQUEST</span><span class="token punctuation">(</span><span class="token number">400</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// 新增</span>
    <span class="token function">ERR_INSERT</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
    <span class="token comment">// ===== 原有其它代码 =====</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，在<code v-pre>GlobalExceptionHandler</code>中添加新的处理异常的方法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@ExceptionHandler</span><span class="token punctuation">(</span><span class="token class-name">BindException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">JsonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">></span></span> <span class="token function">handleBindException</span><span class="token punctuation">(</span><span class="token class-name">BindException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">JsonResult</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token class-name">State</span><span class="token punctuation">.</span>ERR_BAD_REQUEST<span class="token punctuation">,</span> e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完成后，再次重启项目，继续使用为<code v-pre>null</code>的用户名提交请求时，可以看到异常已经被处理，此时，响应的JSON数据例如：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"state"</span><span class="token operator">:</span><span class="token number">400</span><span class="token punctuation">,</span>
    <span class="token property">"message"</span><span class="token operator">:</span><span class="token string">"org.springframework.validation.BeanPropertyBindingResult: 2 errors\nField error in object 'adminAddNewDTO' on field 'username': rejected value [null]; codes [NotNull.adminAddNewDTO.username,NotNull.username,NotNull.java.lang.String,NotNull]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [adminAddNewDTO.username,username]; arguments []; default message [username]]; default message [不能为null]\nField error in object 'adminAddNewDTO' on field 'password': rejected value [null]; codes [NotNull.adminAddNewDTO.password,NotNull.password,NotNull.java.lang.String,NotNull]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [adminAddNewDTO.password,password]; arguments []; default message [password]]; default message [不能为null]"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于错误提示信息，以上内容中出现了<code v-pre>不能为null</code>的字样，是默认的提示文本，可以通过<code v-pre>@NotNull</code>注解的<code v-pre>message</code>属性进行配置，例如：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AdminAddNewDTO</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@NotNull</span><span class="token punctuation">(</span>message <span class="token operator">=</span> <span class="token string">"添加管理员失败，请提交用户名！"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> username<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@NotNull</span><span class="token punctuation">(</span>message <span class="token operator">=</span> <span class="token string">"添加管理员失败，请提交密码！"</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> password<span class="token punctuation">;</span>
    
    <span class="token comment">// ===== 原有其它代码 =====</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，在处理异常时，通过异常信息获取自定义的提示文本：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@ExceptionHandler</span><span class="token punctuation">(</span><span class="token class-name">BindException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">JsonResult</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Void</span><span class="token punctuation">></span></span> <span class="token function">handleBindException</span><span class="token punctuation">(</span><span class="token class-name">BindException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">BindingResult</span> bindingResult <span class="token operator">=</span> e<span class="token punctuation">.</span><span class="token function">getBindingResult</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> defaultMessage <span class="token operator">=</span> bindingResult<span class="token punctuation">.</span><span class="token function">getFieldError</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDefaultMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">JsonResult</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token class-name">State</span><span class="token punctuation">.</span>ERR_BAD_REQUEST<span class="token punctuation">,</span> defaultMessage<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再次运行，在不提交用户名和密码的情况下，会随机的提示用户名或密码验证失败的提示文本中的某1条。</p>
<p>在Validation框架中，还有其它许多注解，用于进行不同格式的验证，例如：</p>
<ul>
<li><code v-pre>@NotEmpty</code>：只能添加在<code v-pre>String</code>类型上，不许为空字符串，例如<code v-pre>&quot;&quot;</code>即视为空字符串</li>
<li><code v-pre>@NotBlank</code>：只能添加在<code v-pre>String</code>类型上，不允许为空白，例如普通的空格可视为空白，使用TAB键输入的内容也是空白，（虽然不太可能在此处出现）换行产生的空白区域也是空白</li>
<li><code v-pre>@Size</code>：限制大小</li>
<li><code v-pre>@Min</code>：限制最小值</li>
<li><code v-pre>@Max</code>：限制最大值</li>
<li><code v-pre>@Range</code>：可以配置<code v-pre>min</code>和<code v-pre>max</code>属性，同时限制最小值和最大值</li>
<li><code v-pre>@Pattern</code>：只能添加在<code v-pre>String</code>类型上，自行指定正则表达式进行验证</li>
<li>其它</li>
</ul>
<p>以上注解，包括<code v-pre>@NotNull</code>是允许叠加使用的，即允许在同一个参数属性上添加多个注解！</p>
<p>以上注解均可以配置<code v-pre>message</code>属性，用于指定验证失败的提示文本。</p>
<p>通常：</p>
<ul>
<li>对于必须提交的属性，都会添加<code v-pre>@NotNull</code></li>
<li>对于数值类型的，需要考虑是否添加<code v-pre>@Range</code>（则不需要使用<code v-pre>@Min</code>和<code v-pre>@Max</code>）</li>
<li>对于字符串类型，都添加<code v-pre>@Pattern</code>注解进行验证</li>
</ul>
<h2 id="解决跨域问题" tabindex="-1"><a class="header-anchor" href="#解决跨域问题" aria-hidden="true">#</a> 解决跨域问题</h2>
<p>在使用前后端分离的开发模式下，前端项目和后端项目可能是2个完全不同的项目，并且，各自己独立开发，独立部署，在这种做法中，如果前端直接向后端发送异步请求，默认情况下，在前端会出现类似以下错误：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Access to XMLHttpRequest at 'http://localhost:8080/admins/add-new' from origin 'http://localhost:8081' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>以上错误信息的关键字是<code v-pre>CORS</code>，通常称之为“跨域问题”。</p>
<p>在基于Spring MVC框架的项目中，当需要解决跨域问题时，需要一个Spring MVC的配置类（实现了<code v-pre>WebMvcConfigurer</code>接口的类），并重写其中的方法，以允许指定条件的跨域访问，例如：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">cn<span class="token punctuation">.</span>tedu<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>demo<span class="token punctuation">.</span>config</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Configuration</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>config<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">CorsRegistry</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>config<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">WebMvcConfigurer</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SpringMvcConfig</span> <span class="token keyword">implements</span> <span class="token class-name">WebMvcConfigurer</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addCorsMappings</span><span class="token punctuation">(</span><span class="token class-name">CorsRegistry</span> registry<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        registry<span class="token punctuation">.</span><span class="token function">addMapping</span><span class="token punctuation">(</span><span class="token string">"/**"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">allowedOriginPatterns</span><span class="token punctuation">(</span><span class="token string">"*"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">allowedMethods</span><span class="token punctuation">(</span><span class="token string">"*"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">allowedHeaders</span><span class="token punctuation">(</span><span class="token string">"*"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">allowCredentials</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">maxAge</span><span class="token punctuation">(</span><span class="token number">3600</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="关于客户端提交请求参数的格式" tabindex="-1"><a class="header-anchor" href="#关于客户端提交请求参数的格式" aria-hidden="true">#</a> 关于客户端提交请求参数的格式</h2>
<p>通常，客户端向服务器端发送请求时，请求参数可以有2种形式，第1种是直接通过<code v-pre>&amp;</code>拼接各参数与值，例如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// FormData</span>
<span class="token comment">// username=root&amp;password=123456&amp;nickname=jackson&amp;phone=13800138001&amp;email=jackson@baidu.com&amp;description=none</span>
<span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token string">'username='</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ruleForm<span class="token punctuation">.</span>username
              <span class="token operator">+</span> <span class="token string">'&amp;password='</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ruleForm<span class="token punctuation">.</span>password
              <span class="token operator">+</span> <span class="token string">'&amp;nickname='</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ruleForm<span class="token punctuation">.</span>nickname
              <span class="token operator">+</span> <span class="token string">'&amp;phone='</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ruleForm<span class="token punctuation">.</span>phone
              <span class="token operator">+</span> <span class="token string">'&amp;email='</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ruleForm<span class="token punctuation">.</span>email
              <span class="token operator">+</span> <span class="token string">'&amp;description='</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ruleForm<span class="token punctuation">.</span>description<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第2种方式是使用JSON语法来组织各参数与值，例如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string-property property">'username'</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ruleForm<span class="token punctuation">.</span>username<span class="token punctuation">,</span> <span class="token comment">// 'root'</span>
    <span class="token string-property property">'password'</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ruleForm<span class="token punctuation">.</span>password<span class="token punctuation">,</span> <span class="token comment">// '123456'</span>
    <span class="token string-property property">'nickname'</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ruleForm<span class="token punctuation">.</span>nickname<span class="token punctuation">,</span> <span class="token comment">// 'jackson'</span>
    <span class="token string-property property">'phone'</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ruleForm<span class="token punctuation">.</span>phone<span class="token punctuation">,</span> <span class="token comment">// '13800138001'</span>
    <span class="token string-property property">'email'</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ruleForm<span class="token punctuation">.</span>email<span class="token punctuation">,</span> <span class="token comment">// 'jackson@baidu.com'</span>
    <span class="token string-property property">'description'</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>ruleForm<span class="token punctuation">.</span>description <span class="token comment">// 'none'</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>具体使用哪种做法，取决于服务器端的设计：</p>
<ul>
<li>如果服务器端处理请求的方法中，在参数前添加了<code v-pre>@RequestBody</code>，则允许使用以上第2种做法（JSON数据）提交请求参数，不允许使用以上第1种做法（使用<code v-pre>&amp;</code>拼接）</li>
<li>如果没有使用<code v-pre>@RequestBody</code>，则只能使用以上第1种做法</li>
</ul>
</div></template>
