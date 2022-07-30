---
title: SpringGateway网关
---

# SpringGateway 网关

## 奈非框架简介

早期(2020年前)奈非提供的微服务组件和框架受到了很多开发者的欢迎

这些框架和Spring Cloud Alibaba的对应关系我们要知道

Nacos对应Eureka 都是注册中心

Dubbo对应ribbon+feign都是实现微服务间调用

Sentinel对应Hystrix都是项目限流熔断降级组件

Gateway对应zuul都是项目的网关

Gateway不是阿里巴巴的而是Spring提供的

## 什么是网关

"网关"网是网络,关是关口\关卡

关口\关卡的意思就是"统一入口"

网关:就是网络中的统一入口

程序中的网关就是微服务项目提供的外界所有请求统一访问的微服务项目

因为提供了统一入口之后,方便对所有请求进行统一的检查和管理

![什么是网关.png](/images/什么是网关.png)
网关的主要功能有

* 将所有请求统一由经过网关
* 网关可以对这些请求进行检查
* 网关方便记录所有请求的日志
* 网关可以统一将所有请求路由到正确的模块\服务上

路由的近义词就是"分配"

## Spring Gateway简介

我们使用Spring Gateway作为当前项目的网关框架

Spring Gateway是Spring自己编写的,也是SpringCloud中的组件

SpringGateway官网

https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/

网关项目git地址

https://gitee.com/jtzhanghl/gateway-demo.git

## 简单网关演示

网关是一个我们创建的项目,不是一个需要安装的软件

网关也是当前微服务项目的一员,也要注册到Nacos,所以保证Nacos的运行

运行之前,我们看一下网关演示项目已经存在的基本结构

beijing和shanghai是编写好的两个项目

gateway没有编写yml文件配置

要想实现网关的路由效果需要修改yml文件如下

```yml
server:
  port: 9000
spring:
  application:
    name: gateway
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
    gateway:
      routes:  # gateway开始配置路由信息
        - id: gateway-shanghai
          uri: lb://shanghai
          predicates:
            - Path=/sh/**
        # 如果java访问这个数字元素的方式:spring.cloud.gateway.routes[0].predicates[0]
        # routes属性实际上是一个数组,yml文件中出现 "- ...."配置时表示当前配置时一个数组元素
        - id: gateway-beijing # 这个配置指定这个路由的名称,这个名称和其他任何位置没有关联
                              # 只需要注意不能再和其他路由名称重复
          # uri设置路由的目标
          # lb是LoadBalance(负载均衡)的缩写,beijing是注册到nacos的服务名称
          uri: lb://beijing
          # 我们需要设置一个条件,当访问路径满足特定条件是,使用当前路由规则
          predicates:
            # predicates翻译为断言,所谓断言就是判断一个条件是否满足
            # Path 是路径断言,意思是满足路径为XXX时使用这个路由
            - Path=/bj/**
            # http://localhost:9000/bj/show 会路由到 9001/bj/show
```

## 内置断言

断言就是判断一个条件,如果条件满足就执行某个操作

predicates就是断言的意思

我们前面章节使用的Path就是内置断言中的一种,指访问的路径是否满足条件

除了路径断言之外,还有很多内置断言常见的内置断言列表

- after
- before
- between
- cookie
- header
- host
- method
- path
- query
- remoteaddr

**时间相关**

after,before,between

在指定时间之后,之前或之间

判断是否满足时间条件,如果满足才允许访问

我们先使用下面代码获得当前包含时区的系统时间表

```java
ZonedDateTime.now()
```

使用After设置必须在指定时间之后访问

```yaml
- id: gateway-shanghai
  uri: lb://shanghai
  predicates:
    - Path=/sh/**
    - After=2022-06-24T15:30:30.999+08:00[Asia/Shanghai]
```

使用Before设置必须在指定时间之后访问

```yaml
- id: gateway-shanghai
  uri: lb://shanghai
  predicates:
    - Path=/sh/**
    - Before=2022-06-24T15:34:00.999+08:00[Asia/Shanghai]
```

使用Between设置必须在指定时间之间访问

```yaml
- id: gateway-shanghai
  uri: lb://shanghai
  predicates:
    - Path=/sh/**
    - Between=2022-06-24T15:34:00.999+08:00[Asia/Shanghai],2022-06-24T15:36:20.999+08:00[Asia/Shanghai]
```

**要求指定参数**

Query断言,要求必须包含指定的参数才能访问资源

```yaml
- id: gateway-shanghai
  uri: lb://shanghai
  predicates:
    - Path=/sh/**
    - Query=name
```

## 内置过滤器

Gateway还提供的内置过滤器

不要filter混淆

内置过滤器允许我们在路由请求到目标资源的同时,对这个请求进行一些加工或处理

下面我们使用AddRequestParameter过滤器,想请求中添加参数

```yaml
- id: gateway-shanghai
  uri: lb://shanghai
  predicates:
    - Path=/sh/**
    - Query=name
  filters:
    - AddRequestParameter=age,80
```

shanghai项目的控制器接收这个参数

```java
@GetMapping("/show")
public String show(String name,Integer age){
    return "这里是上海！"+name+","+age;
}
```

重启网关和shanghai项目

例如输入如下路径

http://localhost:9000/sh/show?name=tom

因为过滤器的存在,控制可以获取网关过滤器添加的参数值

其他内置过滤器和自定义过滤器的使用,可以查阅相关文档自己了解

## 动态路由

如果项目微服务数量多

那么gateway项目yml文件配置也会越来越冗余,维护的工作量也会越来越大

所谓我们希望能够根据固定特征自动的路由到每个微服务模块

这个功能就是SpringGateway的动态路由功能

只需要在配置文件中配置开启动态路由功能即可

```yaml
spring:
  application:
    name: gateway
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
    gateway:
      discovery:
        locator:
          # 开启Spring Gateway的动态路由功能
          # 规则是根据注册到Nacos的项目名称作为路径的前缀,就可以访问到指定项目了
          enabled: true
```

开启之后访问项目的格式以beijing为例

localhost:9000/beijing/bj/show

## Gateway和SpringMvc依赖冲突问题和解决

网关依赖

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>
```

SpringMvc依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

这两个依赖在同一个项目中时,默认情况下启动会报错

SpringMvc依赖中自带一个Tomcat服务器

而Gateway依赖中自带一个Netty服务器

因为在启动服务时这个两个服务器都想启动,会因为争夺端口号和主动权而发生冲突

我们需要在yml文件中添加配置解决

```yml
spring:
  main:
    web-application-type: reactive
```

