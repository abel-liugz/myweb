<template><div><h2 id="sql" tabindex="-1"><a class="header-anchor" href="#sql" aria-hidden="true">#</a> SQL</h2>
<blockquote>
<p>Structuced Query Language：结构化查询语言，通过此语言让程序员和数据库软件进行交流</p>
</blockquote>
<h2 id="dbms" tabindex="-1"><a class="header-anchor" href="#dbms" aria-hidden="true">#</a> DBMS</h2>
<blockquote>
<p>DataBaseManagementSystem：数据库管理系统（数据库软件）</p>
</blockquote>
<ul>
<li>常见的集中DBMS：
<ul>
<li>MySQL：Oracle公司产品，08年被Sun公司收购，09年Sun公司被Oracle收购。开源产品，MariaDB实际上就是MySQL的一个分支，使用方式和MySQL一样，市占率排名第一</li>
<li>Oracle：Oracle公司产品，闭源产品，性能最强，价格最贵，市占率排名第二</li>
<li>SQLServer：微软公司昌平，闭源产品，市占率第三</li>
<li>DB2：IBM公司产品</li>
<li>SQLite：轻量级数据库，安装包几十K，只具备最基础的增删改查功能</li>
</ul>
</li>
</ul>
<h2 id="数据库和表的概念" tabindex="-1"><a class="header-anchor" href="#数据库和表的概念" aria-hidden="true">#</a> 数据库和表的概念</h2>
<ul>
<li>在MySQL数据库软件中保存数据，需要先建库，然后在库里面建表，然后把数据保存到表中!</li>
</ul>
<p><img src="/mysql.png" alt="mysql.png"></p>
<h2 id="sql语句格式" tabindex="-1"><a class="header-anchor" href="#sql语句格式" aria-hidden="true">#</a> SQL语句格式</h2>
<ol>
<li>以 ; 结尾</li>
<li>关键字不区分大小写</li>
<li>可以有空格或换行，但一定要以 ; 结尾</li>
</ol>
<h2 id="数据库相关的sql语句" tabindex="-1"><a class="header-anchor" href="#数据库相关的sql语句" aria-hidden="true">#</a> 数据库相关的SQL语句</h2>
<ul>
<li>
<p>查询所有数据库：show databases;</p>
</li>
<li>
<p>创建数据库：create database 数据库名 charset=utf8/gbk;</p>
</li>
<li>
<p>查看数据库信息：show create database 数据库名;</p>
</li>
<li>
<p>删除数据库：drop database 数据库名;</p>
</li>
<li>
<p>使用数据库：use 数据库名;</p>
<blockquote>
<p>执行表相关和数据相关的SQL语句之前必须使用了某个数据库</p>
</blockquote>
</li>
</ul>
<h2 id="表相关的sql语句" tabindex="-1"><a class="header-anchor" href="#表相关的sql语句" aria-hidden="true">#</a> 表相关的SQL语句</h2>
<ul>
<li>创建表：create table 表名(字段名1 类型,字段名2 类型,......);</li>
<li>查询所有表：show tables;</li>
<li>查询表信息：show create table 表名;</li>
<li>查询表字段：dese 表名;</li>
<li>修改表名：rename table 原名 to 新名;</li>
<li>删除表：drop table 表名;</li>
<li>添加表字段
<ul>
<li>最后面添加：alter table 表名 add 字段名 类型;</li>
<li>最前面添加：alter table 表名 add 字段名 类型 first;</li>
<li>在xxx字段后面添加：alter table 表名 add 字段名 类型 after xxx;</li>
</ul>
</li>
<li>删除表字段：alter table 表名 drop 字段名;</li>
<li>修改表字段：alter table 表名 change 原名 新名 新类型;</li>
</ul>
<h2 id="数据相关的sql语句" tabindex="-1"><a class="header-anchor" href="#数据相关的sql语句" aria-hidden="true">#</a> 数据相关的SQL语句</h2>
<blockquote>
<p>操作数据必须保证已经使用了某个数据库并且已经准备好了保存数据的表</p>
</blockquote>
<ul>
<li>插入数据
<ul>
<li>全表插入：insert into 表名 values(值1,值2);</li>
<li>指定字段插入：insert into 表名(字段名1,字段名2) values(值1,值2);</li>
</ul>
</li>
<li>查询数据：select 字段信息 from 表名 where 条件;</li>
<li>修改数据：update 表名 set 字段名=值 where 条件;</li>
<li>删除数据：delete from 表名 where 条件;</li>
</ul>
<h3 id="主键约束-自增" tabindex="-1"><a class="header-anchor" href="#主键约束-自增" aria-hidden="true">#</a> 主键约束+自增</h3>
<ul>
<li>主键：表示数据唯一性的字段称为主键</li>
<li>约束：创建表时给表字段添加的限制条件</li>
<li>主键约束：限制主键的值（唯一且非空）
<ul>
<li>格式：create table t1(主键名 主键类型 primary key,值1 类型1.....)</li>
</ul>
</li>
<li>自增规则：从历史最大值基础上+1
<ul>
<li>格式：create table t1(主键名 主键类型 primary key auto_increment,值1 类型1.....)</li>
</ul>
</li>
</ul>
<h2 id="sql语句分类" tabindex="-1"><a class="header-anchor" href="#sql语句分类" aria-hidden="true">#</a> SQL语句分类</h2>
<ul>
<li>DDL：数据定义语言，包括数据库相关和表相关的SQL语言</li>
<li>DML：数据操作语言，包括增删改查</li>
<li>DQL：数据查询语言，只包含select查询相关的SQL语言</li>
<li>TCL：事务控制语言</li>
<li>DCL：数据控制语言</li>
</ul>
<h2 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型" aria-hidden="true">#</a> 数据类型</h2>
<ul>
<li>整数：int(m)和bigint(m)；m代表显示长度</li>
<li>浮点数：double(m,d)；m代表显示长度，d代表小数长度</li>
<li>字符串：
<ul>
<li>char(m)；固定长度，执行效率略高，当保存数据的长度相对固定时使用，最大值255</li>
<li>varchar(m)；可变长度，更节省空间，最大值65535，但推荐保存短的数据（255以内）</li>
<li>text(m)；可变长度，最大值65535，建议保存长度大于255的</li>
</ul>
</li>
<li>日期：
<ul>
<li>date，只能保存年月日</li>
<li>time，只能保存时分秒</li>
<li>datetime，保存年月日时分秒，默认值null，最大值 9999-12-31</li>
<li>timestamp（时间戳，距离1970年1月1日的毫秒数），保存年月日时分秒，默认值为当前系统时间，最大值 2038-1-19</li>
</ul>
</li>
</ul>
<h2 id="去重distinct" tabindex="-1"><a class="header-anchor" href="#去重distinct" aria-hidden="true">#</a> 去重distinct</h2>
<ul>
<li>select distinct 字段 from 表名;</li>
</ul>
<h2 id="is-null和is-not-null" tabindex="-1"><a class="header-anchor" href="#is-null和is-not-null" aria-hidden="true">#</a> is null和is not null</h2>
<ol>
<li>
<p>查询有领导的员工姓名</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> name <span class="token keyword">from</span> emp <span class="token keyword">where</span> manager <span class="token operator">is</span> <span class="token operator">not</span> <span class="token boolean">null</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>查询没有领导的员工姓名</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> name <span class="token keyword">from</span> emp <span class="token keyword">where</span> manager <span class="token operator">is</span> <span class="token boolean">null</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ol>
<h2 id="and-和-or" tabindex="-1"><a class="header-anchor" href="#and-和-or" aria-hidden="true">#</a> and 和 or</h2>
<ol>
<li>
<p>查询1号部门工资高于2000的员工信息</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> emp <span class="token keyword">where</span> dept_id<span class="token operator">=</span><span class="token number">1</span> <span class="token operator">and</span> sal<span class="token operator">></span><span class="token number">2000</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>查询1号部门或者工资等于3000的员工信息</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> emp <span class="token keyword">where</span> dept_id<span class="token operator">=</span><span class="token number">1</span> <span class="token operator">or</span> sal<span class="token operator">=</span><span class="token number">3000</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ol>
<h2 id="比较运算符-和" tabindex="-1"><a class="header-anchor" href="#比较运算符-和" aria-hidden="true">#</a> 比较运算符 &gt;  &lt;  &gt;=  &lt;=  =  != 和 &lt;&gt;</h2>
<ol>
<li>查询工作不是程序员的员工信息
<ul>
<li>select * from emp where job!=&quot;程序员&quot;;</li>
<li>select * from emp where job&lt;&gt;&quot;程序员&quot;;</li>
</ul>
</li>
</ol>
<h2 id="between-x-and-y-两者之间" tabindex="-1"><a class="header-anchor" href="#between-x-and-y-两者之间" aria-hidden="true">#</a> between x and y 两者之间</h2>
<ol>
<li>查询工资在2000到3000之间的员工信息
<ul>
<li>select * from emp where sal&gt;=2000 and sal&lt;=3000;</li>
<li>select * from emp where sal between 2000 and 3000;</li>
</ul>
</li>
</ol>
<h2 id="in-关键字" tabindex="-1"><a class="header-anchor" href="#in-关键字" aria-hidden="true">#</a> in 关键字</h2>
<ol>
<li>查询工资等于5000,4000,3000的员工信息
<ul>
<li>select * from emp where sal=5000 or sal=4000 or sal=3000;</li>
<li>select * from emp where sal in(5000,4000,3000);</li>
</ul>
</li>
</ol>
<h2 id="模糊查询like" tabindex="-1"><a class="header-anchor" href="#模糊查询like" aria-hidden="true">#</a> 模糊查询like</h2>
<ul>
<li>
<p>%：代表0或多个未知字符</p>
</li>
<li>
<p>_：代表1个未知字符</p>
</li>
<li>
<p>举例：</p>
<ol>
<li>
<p>查询名字姓孙的员工信息</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> emp <span class="token keyword">where</span> name <span class="token operator">like</span> <span class="token string">"孙%"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>查询名字以精结尾的员工姓名</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select * from emp where name like &quot;%精&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>查询工作第二个字是售的员工信息</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select * from emp where job like &quot;_售%&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>查询名字中包含僧的员工信息</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select * from emp where name like &quot;%僧%&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ol>
</li>
</ul>
<h2 id="排序-order-by" tabindex="-1"><a class="header-anchor" href="#排序-order-by" aria-hidden="true">#</a> 排序 order by</h2>
<ul>
<li>
<p>格式：order by 字段名 asc(升序，默认)/desc(降序)</p>
</li>
<li>
<p>举例：</p>
<ol>
<li>
<p>查询所有员工信息并按照工资升序排序</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select *  from emp order by sal;

select * from emp order by sal asc;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>查询所有员工信息并按照工资降序排序</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select * from emp order by sal desc;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ol>
</li>
</ul>
<h2 id="分页查询" tabindex="-1"><a class="header-anchor" href="#分页查询" aria-hidden="true">#</a> 分页查询</h2>
<ul>
<li>
<p>格式：limit 跳过的条数,请求的条数(每页的条数)</p>
<blockquote>
<p>跳过的条数=(请求的页数-1)*请求的条数</p>
</blockquote>
</li>
<li>
<p>举例：</p>
<ul>
<li>
<p>查询第1页的5条数据</p>
<p>limit 0,5</p>
</li>
<li>
<p>查询第6页的8条数据</p>
<p>limit 40,8</p>
</li>
</ul>
</li>
</ul>
<h2 id="别名" tabindex="-1"><a class="header-anchor" href="#别名" aria-hidden="true">#</a> 别名</h2>
<ul>
<li>select name as &quot;姓名&quot; from emp;</li>
<li>select name &quot;姓名&quot; from emp;</li>
<li>select name 姓名 from emp;</li>
</ul>
<h2 id="聚合函数" tabindex="-1"><a class="header-anchor" href="#聚合函数" aria-hidden="true">#</a> 聚合函数</h2>
<blockquote>
<p>通过聚合函数可以对查询的多条数据进行统计查询</p>
</blockquote>
<ul>
<li>
<p>平均值：avg(字段名)</p>
<ul>
<li>
<p>查询1号部门的平均工资</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select avg(sal) from emp where dept_id=1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>最大值：max(字段名)</p>
<ul>
<li>
<p>查询1号部门的最高工资</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select max(sal) from emp where dept_id=1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>最小值：min(字段名)</p>
<ul>
<li>
<p>查询1号部门的最低工资</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select min(sal) from emp where dept_id=1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>求和：sum(字段名)</p>
<ul>
<li>
<p>查询1号部门所有员工的工资总和</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select sum(sal) from emp where dept_id=1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>计数：count(*)</p>
<ul>
<li>
<p>查询程序员的数量</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select count(*) from emp where job=&quot;程序员&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
<h2 id="数值计算" tabindex="-1"><a class="header-anchor" href="#数值计算" aria-hidden="true">#</a> 数值计算 + - * / %</h2>
<ol>
<li>
<p>查询每个员工的姓名，工资和年终奖（年终奖=5个月的工资）</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select name,sal,sal*5 年终奖 from emp;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>给1号部门的员工每人涨薪5元</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>update emp set sal=sal+5 where dept_id=1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ol>
<h2 id="分组查询-group-by" tabindex="-1"><a class="header-anchor" href="#分组查询-group-by" aria-hidden="true">#</a> 分组查询 group by</h2>
<ul>
<li>
<p>格式：group by 分组的字段名</p>
</li>
<li>
<p>举例：</p>
<ol>
<li>
<p>查询每个部门的平均工资</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select dept_id,avg(sal) from emp group by dept_id;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>查询每种工作的最高工资</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select job,max(sal) from emp group by job;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ol>
</li>
</ul>
<h2 id="having" tabindex="-1"><a class="header-anchor" href="#having" aria-hidden="true">#</a> having</h2>
<ul>
<li>
<p>where后面只能写普通字段的条件，不能包含聚合函数</p>
</li>
<li>
<p>having后面可以包含聚合函数的条件，需要和group by 结合使用，写在group by的后面</p>
</li>
<li>
<p>举例</p>
<ol>
<li>
<p>查询平均工资高于2000的部门</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select dept_id,avg(sal) from emp group by dept_id having avg(sal)&gt;2000;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>查询每个部门的工资总和，只查询有领导的员工，并且要求工资总和大于5400</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select dept_id,sum(sal) s from emp where manager is not null group by dept_id having s&gt;5400;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ol>
</li>
</ul>
<h2 id="各个关键字的书写顺序" tabindex="-1"><a class="header-anchor" href="#各个关键字的书写顺序" aria-hidden="true">#</a> 各个关键字的书写顺序</h2>
<ul>
<li>select 查询的字段信息 from 表名 where 普通字段条件 group by 分组字段名 having 聚合函数条件 order by 排序字段名 limit 跳过条数,请求条数;</li>
</ul>
<h2 id="子查询-嵌套查询" tabindex="-1"><a class="header-anchor" href="#子查询-嵌套查询" aria-hidden="true">#</a> 子查询（嵌套查询）</h2>
<ol>
<li>
<p>查询工资大于2号部门平均工资的员工信息</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select * from emp where sal&gt;(select avg(sal) from emp where dept_id=2);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>查询工资高于程序员最高工资的员工信息</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select * from emp where sal&gt;(select max(sal) from emp where job=&quot;程序员&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>查询拿最低工资员工的同事们的信息</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select * from emp where dept_id=(select dept_id from emp where sal=(select min(sal) from emp)) and sal != (select min(sal) from emp);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ol>
<h2 id="关联关系" tabindex="-1"><a class="header-anchor" href="#关联关系" aria-hidden="true">#</a> 关联关系</h2>
<ul>
<li>
<p>指创建的表和表之间存在的业务关系</p>
</li>
<li>
<p>有以下几种关系：</p>
<ul>
<li>
<p>一对一：有AB两张表，A表中的一条数据对应B表中的一条数据，同时B表中的一条数据也对应A表中的一条数据
<img src="/关联关系（一对一）.png" alt="关联关系（一对一）.png"></p>
</li>
<li>
<p>一对多：有AB两张表，A表中的一条数据对应B表中的多条数据，同时B表中的一条数据对应A表中的一条数据
<img src="/关联关系（一对多）.png" alt="关联关系（一对多）.png"></p>
</li>
<li>
<p>多对多：有AB两张表，A表中的一条数据对应B表中的多条数据，同时B表中的一条数据也对应A表中的多条数据
<img src="/关联关系（多对多）.png" alt="关联关系（多对多）.png"></p>
</li>
</ul>
</li>
<li>
<p>表和表之间通过外键字段建立关系</p>
<ul>
<li>一对一：在任意表中添加一个建立关系的字段指向另一张表的主键</li>
<li>一对多：在多的表中添加建立关系的字段（外键）指向另一张表的主键</li>
<li>多对多：需要创建一个单独的关系表，里面至少包含两个字段分别指向另外两个表的主键</li>
</ul>
</li>
</ul>
<h2 id="关联查询" tabindex="-1"><a class="header-anchor" href="#关联查询" aria-hidden="true">#</a> 关联查询</h2>
<ul>
<li>
<p>同时查询多张表数据的查询方式称为关联查询</p>
</li>
<li>
<p>关联查询包括：</p>
<ul>
<li>
<p>等值链接</p>
<ul>
<li>
<p>格式：select * from A,B where 关联关系</p>
</li>
<li>
<p>举例：查询工资高于2000的员工姓名和对应的部门名</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select e.name,d.name,sal from emp e,dipt d where e.dept_id=d.id and sal&gt;2000;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>内连接</p>
<ul>
<li>
<p>格式：select * from A join B on 关联关系</p>
</li>
<li>
<p>举例：查询工资高于2000的员工姓名和对应的部门名</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select e.name,d.name,sal from emp e join dept d on e.dept_id=d.id where sal&gt;2000;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>外连接</p>
<ul>
<li>
<p>等值链接和内连接查询到的都是两张表的交集数据</p>
</li>
<li>
<p>外连接查询的是一张表的全部和另外一张表的交集数据</p>
</li>
<li>
<p>格式：select * from A left/right join B on 关联关系</p>
</li>
<li>
<p>举例：</p>
<ul>
<li>
<p>查询所有员工姓名和对应的部门名</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select e.name,d.name from emp e left join dept d on e.dept_id=d.id;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>查询所有部门的名称，地点和对应的员工姓名和工资</p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>select d.name,loc,e.name,sal from emp e right join dept d on e.dept_id=d.id;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
<li>
<p>等值链接和内连接查询的是两张表的交集数据，推荐使用内连接</p>
</li>
<li>
<p>如果需要查询一张表的全部和另外一张表的交集时，使用外连接，只需要掌握左外即可，因为表的位置可以交换</p>
</li>
</ul>
<h2 id="jdbc" tabindex="-1"><a class="header-anchor" href="#jdbc" aria-hidden="true">#</a> JDBC</h2>
<ul>
<li>
<p>JavaDataBaseConnectivity：Java数据库链接</p>
</li>
<li>
<p>通过Java语言和MySQL数据库进行链接并执行SQL语句</p>
</li>
<li>
<p>JDBC是Sun公司提供的一套专门用于Java语言和数据库进行了解的API(Application Programma Interface应用程序编程接口)</p>
</li>
<li>
<p>Sun公司为了避免Java程序员，每一种数据库软件都学习一套全新的方法，通过JDBC接口将方法名定义好，让各个数据库厂商根据此接口中的方法名写各自的实现类（就是一个jar文件，称为数据库的驱动），这样Java程序员只需要掌握JDBC接口中方法的调用，即可访问任何数据库软件</p>
</li>
<li>
<p>如何通过JDBC连接数据库并执行SQL语句</p>
<ul>
<li>
<p>创建Maven工程</p>
</li>
<li>
<p>在工程的pom.xml文件中，添加MySQL驱动的依赖坐标</p>
</li>
<li>
<p>创建java文件，添加一下代码</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//1.创建链接对象（异常抛出）</span>
<span class="token class-name">Connection</span> conn <span class="token operator">=</span> <span class="token class-name">DriverManager</span><span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token string">"jdbc:mysql://localhost:3306/数据库名?charaterEncoding=utf8&amp;serverTimezone=Asia/Shanghai&amp;useSSL=false"</span><span class="token punctuation">,</span><span class="token string">"用户名"</span><span class="token punctuation">,</span><span class="token string">"密码"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//2.创建执行SQL语句的对象</span>
<span class="token class-name">Statement</span> s <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">createStatement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//3.执行SQL语句，execute执行</span>
s<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token string">"create table jdbct1(age int)"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//4.关闭资源</span>
conn<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
<h2 id="执行sql语句的对象statement" tabindex="-1"><a class="header-anchor" href="#执行sql语句的对象statement" aria-hidden="true">#</a> 执行SQL语句的对象Statement</h2>
<ul>
<li>execute(&quot;sql&quot;)；测方法可以执行任意SQL语句，但建议执行DDL（数据库相关和表相关的SQL语句）</li>
<li>int row = executeUpdate(&quot;sql&quot;)；此方法用来执行增删改相关的SQL语句，返回值表示生效的行数</li>
<li>ResultSet re = executeQuery(&quot;sql&quot;)；此方法用来执行查询相关的SQL语句，返回值ResultSet叫做结果集对象，查询到的数据都装在此对象中</li>
</ul>
<h2 id="dbcp-数据库连接池" tabindex="-1"><a class="header-anchor" href="#dbcp-数据库连接池" aria-hidden="true">#</a> DBCP 数据库连接池</h2>
<ul>
<li>
<p>DataBaseConnectionPool</p>
</li>
<li>
<p>作用：将连接重用，从而提高执行效率</p>
</li>
<li>
<p>如何使用数据库连接池</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">//创建连接池对象DruidDataSource ds = new DruidDataSource();</span>
<span class="token comment">//设置数据库连接信息 url 用户名 密码</span>
ds<span class="token punctuation">.</span><span class="token function">setUrl</span><span class="token punctuation">(</span><span class="token string">"jdbc:mysql://localhost:3306/empdb?characterEncoding=utf8&amp;serverTimezone=Asia/Shanghai&amp;useSSL=false"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
ds<span class="token punctuation">.</span><span class="token function">setUsername</span><span class="token punctuation">(</span><span class="token string">"root"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>ds<span class="token punctuation">.</span><span class="token function">setPassword</span><span class="token punctuation">(</span><span class="token string">"root"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//设置初始连接数量</span>
ds<span class="token punctuation">.</span><span class="token function">setInitialSize</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//设置最大连接数量</span>
ds<span class="token punctuation">.</span><span class="token function">setMaxActive</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//从连接池中获取连接   异常抛出</span>
<span class="token class-name">Connection</span> conn <span class="token operator">=</span> ds<span class="token punctuation">.</span><span class="token function">getConnection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h2 id="preparedstatement预编译的sql执行对象" tabindex="-1"><a class="header-anchor" href="#preparedstatement预编译的sql执行对象" aria-hidden="true">#</a> PreparedStatement预编译的SQL执行对象</h2>
<ul>
<li>此对象可以将编译SQL语句的时间点提前，提前候可以将SQL语句逻辑部分提前锁死，用户输入的内容将不能影响原有SQL语句的逻辑部分，从而解决了SQL注入的问题</li>
<li>如果SQL语句中存在变量，则必须使用PreparedStatement，解决SQL注入问题，而且可提高开发效率（避免了拼接字符串）</li>
<li>如果SQL语句中没有变量，可以使用Statement或PreparedStatement</li>
</ul>
<h2 id="数据库常见错误" tabindex="-1"><a class="header-anchor" href="#数据库常见错误" aria-hidden="true">#</a> 数据库常见错误</h2>
<table>
<thead>
<tr>
<th>异常名称</th>
<th>解释</th>
<th style="text-align:left">解决方法</th>
</tr>
</thead>
<tbody>
<tr>
<td>Access denied for user 'root'@'localhost' (using password:YES)</td>
<td>用户名或密码错误</td>
<td style="text-align:left">检查用户名或密码</td>
</tr>
<tr>
<td>Column count doesn't match value count at ...</td>
<td>值的数量和字段名数量不匹配</td>
<td style="text-align:left">检查表的字段是否正确，检查插入的值是否正确</td>
</tr>
<tr>
<td>Duplicate entry '1' for key 'PRIMARY'</td>
<td>主键值重复</td>
<td style="text-align:left"></td>
</tr>
<tr>
<td>Column 'id' cannot be null</td>
<td>值不能为null</td>
<td style="text-align:left"></td>
</tr>
<tr>
<td>Communications link failure</td>
<td>JDBC连接数据库错误</td>
<td style="text-align:left">启动MySQL服务</td>
</tr>
<tr>
<td>SSLException</td>
<td>SSL异常</td>
<td style="text-align:left">在连接数据库的url添加useSSL=false</td>
</tr>
<tr>
<td>SQLSyntaxErrorException</td>
<td>SQL语句错误</td>
<td style="text-align:left"></td>
</tr>
<tr>
<td>Parameter index out of range</td>
<td>参数位置超出范围</td>
<td style="text-align:left"></td>
</tr>
</tbody>
</table>
</div></template>
