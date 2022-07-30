<template><div><h1 id="spring-security" tabindex="-1"><a class="header-anchor" href="#spring-security" aria-hidden="true">#</a> Spring Security</h1>
<p>Spring Security框架用于实现登录</p>
<p>同时还可以将当前登录用户的权限信息保存</p>
<p>我们在项目中要验证当前用户是否具备某个权限时</p>
<p>可以再控制器方法代码前添加@PreAuthorize(&quot;[权限名称]&quot;)SpringSecurity在运行该方法之前进行核查</p>
<p>如果不具备这个权限会返回403状态码</p>
<h1 id="关于单点登录" tabindex="-1"><a class="header-anchor" href="#关于单点登录" aria-hidden="true">#</a> 关于单点登录</h1>
<h2 id="微服务的会话保持问题" tabindex="-1"><a class="header-anchor" href="#微服务的会话保持问题" aria-hidden="true">#</a> 微服务的会话保持问题</h2>
<p>我们在微服务的架构下,完成登录,和单机模式的登录是有很大区别的</p>
<p>首先我们分析一下普通登录和微服务登录的区别</p>
<p><img src="/images/普通登陆.png" alt="普通登陆.png"></p>
<p>上面的图片,表示我们在微服务系统中登录时遇到的问题</p>
<p>我们在用户模块中登录,只是将用户信息保存在用户模块的session中</p>
<p>而这个session不会和其他模块共享</p>
<p>所以在我们访问订单模块或其他模块时,通过sessionid并不能获得在用户模块中登录成功的信息</p>
<p>这样就丢失的用户信息,不能完成业务</p>
<p>市面上现在大多使用JWT来实现微服务架构下的会话保持</p>
<p>也就是在一个服务器上登录成功后,微服务的其他模块也能识别用户的登录信息</p>
<p>这个技术就是单点登录</p>
<h2 id="单点登录解决方案" tabindex="-1"><a class="header-anchor" href="#单点登录解决方案" aria-hidden="true">#</a> 单点登录解决方案</h2>
<h3 id="session共享" tabindex="-1"><a class="header-anchor" href="#session共享" aria-hidden="true">#</a> Session共享</h3>
<p>这种方式的核心思想是将用户的登录信息共享给其他模块</p>
<p>适用于小型的,用户量不大的微服务项目</p>
<p><img src="/images/session共享.png" alt="session共享.png"></p>
<p>将登录成功的用户信息共享给Redis</p>
<p>其他模块根据sessionId获得Redis中保存的用户信息即可</p>
<ul>
<li>这样做最大的缺点就是内存严重冗余,不适合大量用户的微服务项目</li>
</ul>
<h3 id="jwt令牌" tabindex="-1"><a class="header-anchor" href="#jwt令牌" aria-hidden="true">#</a> JWT令牌</h3>
<p>这种登录方式,最大的优点就是不占用内存</p>
<p><img src="/images/jwt令牌.png" alt="jwt令牌.png"></p>
<p>生成的JWT由客户端自己保存,不占用服务器内存</p>
<p>在需要表明自己用户身份\信息时,将JWT信息保存到请求头中发送请求即可</p>
<h2 id="jwt登录流程图" tabindex="-1"><a class="header-anchor" href="#jwt登录流程图" aria-hidden="true">#</a> Jwt登录流程图</h2>
<p><img src="/images/jwt登陆流程.png" alt="jwt登陆流程.png"></p>
</div></template>
