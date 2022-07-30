---
title: SpringSecurity
---



# Spring Security

Spring Security框架用于实现登录

同时还可以将当前登录用户的权限信息保存


我们在项目中要验证当前用户是否具备某个权限时

可以再控制器方法代码前添加@PreAuthorize("[权限名称]")SpringSecurity在运行该方法之前进行核查

如果不具备这个权限会返回403状态码

# 关于单点登录

## 微服务的会话保持问题

我们在微服务的架构下,完成登录,和单机模式的登录是有很大区别的

首先我们分析一下普通登录和微服务登录的区别

![普通登陆.png](/images/普通登陆.png)

上面的图片,表示我们在微服务系统中登录时遇到的问题

我们在用户模块中登录,只是将用户信息保存在用户模块的session中

而这个session不会和其他模块共享

所以在我们访问订单模块或其他模块时,通过sessionid并不能获得在用户模块中登录成功的信息

这样就丢失的用户信息,不能完成业务

市面上现在大多使用JWT来实现微服务架构下的会话保持

也就是在一个服务器上登录成功后,微服务的其他模块也能识别用户的登录信息

这个技术就是单点登录

## 单点登录解决方案

### Session共享

这种方式的核心思想是将用户的登录信息共享给其他模块

适用于小型的,用户量不大的微服务项目

![session共享.png](/images/session共享.png)

将登录成功的用户信息共享给Redis

其他模块根据sessionId获得Redis中保存的用户信息即可

* 这样做最大的缺点就是内存严重冗余,不适合大量用户的微服务项目

### JWT令牌

这种登录方式,最大的优点就是不占用内存

![jwt令牌.png](/images/jwt令牌.png)

生成的JWT由客户端自己保存,不占用服务器内存

在需要表明自己用户身份\信息时,将JWT信息保存到请求头中发送请求即可

## Jwt登录流程图

![jwt登陆流程.png](/images/jwt登陆流程.png)