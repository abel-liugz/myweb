---
title: Nacos
---

# Nacos注册中心

## 什么Nacos

Nacos是Spring Cloud Alibaba提供的一个软件

这个软件主要具有注册中心和配置中心的功能

我们先学习它注册中心的功能

微服务中所有项目都必须注册到注册中心才能成为微服务的一部分

注册中心和企业中的人力资源管理部门有相似

![nacos注册中心.png](/images/nacos注册中心.png)

## Nacos的启动

我们要启动Nacos必须保证当前系统配置了java环境变量

简单来说就是要环境变量中,有JAVA_HOME的配置,指向安装jdk的路径

确定了支持java后,可以通过下面路径下载

https://github.com/alibaba/nacos/releases/download/1.4.3/nacos-server-1.4.3.zip

国外网站,下载困难可以多试几次

或直接向项目经理老师索取

## 安装启动Nacos

将下载好的Nacos压缩包解压

将压缩包解压(注意不要有中文路径或空格)

打开解压得到的文件夹后打开bin目录会有如下内容

![nacos-bin目录.png](/images/nacos-bin目录.png)

cmd结尾的文件是windows版本的

sh结尾的文件是linux和mac版本的

startup是启动文件,shutdown是停止文件

**Windows下启动Nacos不能直接双击cmd文件**

需要进入dos命令运行

在当前资源管理器地址栏输入cmd

```
G:\pgm\nacos\bin>startup.cmd -m standalone
```

-m是设置启动方式参数

standalone翻译为标准的孤独的

意思是单机模式标准运行

运行成功默认占用8848端口,并且在代码中提示

如果不输入standalone运行会失败

```
startup.cmd -m standalone
```

验证Nacos的运行状态

打开浏览器输入http://localhost:8848/nacos

![nacos打开页面.png](/images/nacos打开页面.png)

如果是首次访问,会出现这个界面

登录系统

用户名:nacos

密码:nacos

登录之后可以进入后台列表
不能关闭启动nacos的dos窗口
我们要让我们编写的项目注册到Nacos,才能真正是微服务项目
在项目的pom文件中添加依赖:

~~~xml
<!-- Spring Cloud家族 -->
<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-dependencies</artifactId>
  <version>${spring-cloud.version}</version>
  <type>pom</type>
  <scope>import</scope>
</dependency>
<!-- Spring Cloud Alibaba -->
<dependency>
  <groupId>com.alibaba.cloud</groupId>
  <artifactId>spring-cloud-alibaba-dependencies</artifactId>
  <version>${spring-cloud-alibaba.version}</version>
  <type>pom</type>
  <scope>import</scope>
</dependency>
~~~

## 注册到Nacos

我们的项目要想称为微服务项目必须注册到nacos

- 首先在项目的pom文件中添加依赖

~~~xml
<dependency>
  <groupId>com.alibaba.cloud</groupId>
  <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
~~~

- 然后在application.yml中添加当前项目对nacos注册的配置

~~~yaml
spring:
  application:
    # 当前Springboot项目的名称,用作注册中心服务的名称
    name: nacos-business
  cloud:
    nacos:
      discovery:
        # 定义nacos运行的路径
        server-addr: localhost:8848
~~~

做完上面的配置

我们**在保证nacos已经启动的前提下**,我们启动项目

启动之后,business一切功能正常,而且可以在nacos的服务列表中看到nacos-business的名称
![注册服务.png](/images/注册服务.png)

## Nacos心跳机制

Nacos内部注册的服务分为两大类:

- 临时实例(默认)
- 持久化实例(永久实例)

我们可以通过设置属性来确定它是临时还是永久

~~~yaml
cloud:
  nacos:
    discovery:
      # ephemeral设置当前项目启动时注册到nacos的类型 true(默认):临时实例 false:永久实例
      ephemeral: true 
~~~

临时实例和永久实例的区别:

- **临时实例**
  默认情况下,启动服务后,每隔5秒会向nacos发送一个"心跳包",这个心跳包中包含了当前服务的基本信息,Nacos收到这个"心跳包"如果发现这个服务的信息不在注册列表中,就进行注册,如果这个服务的信息在注册列表中就表明这个服务还是健康的,如果Nacos15秒内没接收到某个服务的心跳包,Nacos会将这个服务标记为不健康的状态,如果30秒内没有接收到这个服务的心跳包,Nacos会将这个服务从注册列表中剔除,这些时间都是可以通过配置修改的.
- **持久化实例(永久实例)**
  持久化实例启动时向nacos注册,nacos会对这个实例进行持久化处理,心跳包的规则和临时实例一致,只是不会将该服务从列表中剔除

### 各类型使用时机

一般情况下,我们创建的服务都是临时实例

只有项目的主干业务才会设置为永久实例

# 配置中心

## 什么是配置中心

所谓配置中心:将项目需要的配置信息保存在配置中心,需要读取时直接从配置中心读取,方便配置管理的微服务工具

我们可以将部分yml文件的内容保存在配置中心

一个微服务项目有很多子模块,这些子模块可能在不同的服务器上,如果有一些统一的修改,我们要逐一修改这些子模块的配置,由于它们是不同的服务器,所以修改起来很麻烦

如果将这些子模块的配置集中在一个服务器上,我们修改这个服务器的配置信息,就相当于修改了所有子模块的信息,这个服务器就是配置中心

**使用配置中心的原因就是能够达到高效的修改各模块配置的目的**

## 配置中心的使用

Nacos既可以做注册中心,也可以做配置中心

Nacos做配置中心,支持各种格式\类型的配置文件

properties\yaml(yml)\txt\json\xml等

## Nacos数据结构

![nacos数据结构.png](/images/nacos数据结构.png)

namespace:命名空间

group:分组

Service/DataId:具体数据

**命名空间**

namespace是Nacos提供的最大的数据结构

一个Nacos可以创建多个命名空间

一个命名空间能够包含多个group

在nacos中创建命名空间

![nacos中创建命名空间.png](/images/nacos中创建命名空间.png)

在上图连接的位置可以新增命名空间,填写命名空间名称和描述即可

Nacos有默认的命名空间public不能删除和修改

添加命名空间后,我们在Nacos中注册的服务或添加的配置就可以指定命名空间了

因为多个命名空间可以隔离项目,每个项目使用自己的命名空间,互不干扰

**分组**

一个命名空间中可以有多个分组,进行进一步分离

我们使用时,如果不需要进一步分组,推荐使用group名称:DEFAULF_GROUP

**服务或配置**

确定了命名空间和分组之后

我们就可以添加服务或配置了

之前我们启动的各种模块都是服务,之前都是默认保存在public命名空间中

下面我们主要使用配置中心的功能,在命名空间中添加配置

添加配置就是设置DataId

实际在Nacos中定位一个配置的结构为

Namespace>Group>DataId

## Nacos添加配置

Nacos首页->配置管理->配置列表->添加配置(右侧的大"＋"号)

![nacos添加配置.png](/images/nacos添加配置.png)

添加cart模块数据库连接配置

![nacos添加模块数据库连接配置.png](/images/nacos添加模块数据库连接配置.png)

点击发布,nacos就保存这个配置了

## 项目读取配置

如果要读取配置中心的信心,首先要添加依赖

```xml
<!--  配置中心的依赖  -->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
</dependency>
<!--  支持SpringCloud加载系统配置文件的依赖   -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-bootstrap</artifactId>
</dependency>
```

像其他程序一样,在添加完依赖之后,还需要添加yml文件的配置

我们使用过application.properties和application.yml两种配置文件添加配置

实际上这两个配置文件加载是有顺序的

先加载yml

后加载properties

如果两个配置文件同时设置了同一个属性,后加载的覆盖掉先加载的

在SpringCloud环境下,实际上可以再多出一组配置文件

它们是bootstarp.yml和bootstarp.properties

这一组的加载时机整体早于application这一组

所以一个SpringCloud项目加载配置文件的顺序最终可能如下图

![springcloud项目加载配置文件的顺序.png](/images/springcloud项目加载配置文件的顺序.png)

bootstrap这组配置文件,一般用于配置加载一些系统级别的配置,这些配置的特征是一般不会轻易修改

我们再后面的学习过程中,会将配置中心的信息,加载到这组配置文件中

**必须是SpringCloud项目,才能支持bootstrap这组配置文件的加载**

支持这组配置的依赖就是上面我们添加的依赖

```xml
<!--  支持SpringCloud加载系统配置文件的依赖   -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-bootstrap</artifactId>
</dependency>
```

注意SpringCloud版本早于2020之前,添加的不是这个依赖,可以自行查询

下面我们就在cart-webapi项目中resources文件夹中添加bootstarp.yml文件

```yaml
spring:
  cloud:
    nacos:
      config:
        #  指定配置中心的位置
        server-addr: 192.168.137.150:8848
        # 指定配置文件所在的组名(命名空间默认public不需要指定)
        group: DEFAULT_GROUP
        # 设置配置文件的后缀名
        # 默认情况下会加载[服务器名].[后缀名]为DataId的配置
        # 当前项目名称为nacos-cart所以默认加载的DataId为:nacos-cart.yaml
        file-extension: yaml
```

如果一切顺利,那么是可以通过knife4j测试操作连接数据库的

我们可以新增购物车信息,或删除购物车信息后简单数据库是否有对应操作

因为我们已经删除了本地yml文件中数据库的配置,所以,它能连接操作数据库一定是配置中心生效了!



