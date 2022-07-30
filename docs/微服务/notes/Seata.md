---
title: Seata
---

# Seata概述

## 什么是Seata

Seata 是一款开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务

也是Spring Cloud Alibaba提供的组件

Seata官方文档

https://seata.io/zh-cn/

更多信息可以通过官方文档获取

## 为什么需要Seata

我们首先简单复习一下事务的概念

> 事务的4个特性:ACID特性
>
> - 原子性
> - 一致性
> - 隔离性
> - 永久性

我们再业务中,必须保证数据库操作的原子性,也就是当前业务的所有数据库操作要么都成功,要么都失败

之前我们使用Spring声明式事务来解决本地的事务问题

但是现在是微服务环境,一个业务可能涉及多个模块的数据库操作

这种情况就需要专门的微服务状态下解决事务问题的"分布式事务"解决方案

我们学习的Seata就是这样的产品

**Seata将为用户提供了 AT、TCC、SAGA 和 XA 事务模式,为用户打造一站式的分布式解决方案。**

## Seata的运行原理(AT模式)

观察下面事务模型

![seata运行原理（at）.png](/images/seata运行原理（at）.png)

上面结构是比较典型的远程调用结构

如果account操作数据库失败需要让order模块和storage模块撤销(回滚)操作

声明式事务不能完成这个操作

需要Seata来解决

解决模型如下

![seata模型.png](/images/seata模型.png)

Seata构成部分包含

* 事务协调器TC
* 事务管理器TM
* 资源管理器RM

我们项目使用AT(自动)模式完成分布式事务的解决

AT模式运行过程

1.事务的发起方(TM)会向事务协调器(TC)申请一个全局事务id,并保存

2.Seata会管理事务中所有相关的参与方的数据源,将数据操作之前和之后的镜像都保存在undo_log表中,这个表是seata框架规定的,方便提交(commit)或回滚(roll back)

3.事务的发起方(TM)会连同全局id一起通过远程调用运行资源管理器(RM)中的方法

4.资源管理器(RM)接收到全局id,并运行指定的方法,将运行的状态同步到事务协调器(TC)

5.如果运行整体没有发生异常,发起方(TM)会通过事务协调器通知所有分支,将本次事务所有对数据库的影响真正生效,反之如果任何一个RM运行发生异常,那么都会通知事务协调器,再由事务协调器通知所有分支,回滚数据中的数据

回滚时可以使用undo_log表中的数据来实现回滚

## 其他模式简介

AT模式运行有一个非常明显的条件

就是事务分支都必须是操作关系型数据库(mysql\MariaDB\Oracle)

但是如果一个事务中有操作例如Redis这样的非关系型数据库时就不能使用AT模式了

除了AT模式之外还有TCC、SAGA 和 XA 事务模式

**TCC模式**

这个模式简单来说就是自己编写代码进行事务的提交和回滚

我们需要在各个分支业务逻辑层代码中编写一组三个方法(prepare\commit\rollback)

prepare:准备   commit:提交   rollback:回滚

prepare方法是无论事务成功与否都会运行的代码

commit当整体事务运行成功时运行的方法

rollback当整体事务运行失败是运行的方法

优点:虽然代码是自己写的,但是事务整体提交或回滚的机制仍然可用

缺点:每个业务都要编写3个方法来对应,代码冗余,而且业务入侵量大

**SAGA模式**

SAGA模式的思想是编写一个类,当指定的事务发生问题时,运行SAGA编写的回滚类

这样编写代码不影响已经编写好的业务逻辑代码

一般用于修改已经编写完成的老代码

缺点是每个事务分支都要编写一个类来回滚业务,

类数量多,开发量大

XA模式

支持XA协议的数据库分布式事务,使用比较少

# 使用Seata

## 配置Seata

cart\stock\order都是具备数据库操作的模块配置过程如下

```xml
<!-- seata和SpringBoot整合依赖 -->
<dependency>
    <groupId>io.seata</groupId>
    <artifactId>seata-spring-boot-starter</artifactId>
</dependency>
<!-- Seata完成分布式事务需要的两个相关依赖(Seata需要下面两个依赖中的资源) -->
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper-spring-boot-starter</artifactId>
</dependency>
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
</dependency>
```

下面修改application-dev.yml

代码如下

```yaml
seata:
  tx-service-group: csmall_group #定义分组名称
  service:
    vgroup-mapping:
      csmall_group: default  # 使用seata默认事务配置
    grouplist: 
      default: localhost:8091 # 8091是seata默认的地址
```

注意同一个事务必须在同一个tx-service-group中

同时指定相同的seata地址和端口

business模块配置更简单

因为它是服务的发起者,不需要数据库操作,所以配置更简单

但是它是TM的角色,不配置肯定是不行的

```xml
<dependency>
    <groupId>io.seata</groupId>
    <artifactId>seata-spring-boot-starter</artifactId>
</dependency>
```

application-dev.yml是一样的

```yaml
seata:
  tx-service-group: csmall_group #定义分组名称
  service:
    vgroup-mapping:
      csmall_group: default  # 使用seata默认事务配置
    grouplist:
      default: localhost:8091 # 8091是seata默认的地址
```

seata标记事务的开始有一个专用的注解

在事务模型中,TM(事务管理器)的业务逻辑层方法上添加这个注解即可

business的业务逻辑层buy方法上添加注解

```java
@Service
@Slf4j
public class BusinessServiceImpl implements IBusinessService {

    // Dubbo在获取order模块的业务逻辑层实现类
    @DubboReference
    private IOrderService dubboOrderService;

    // 一旦编写这个注解@GlobalTransactional
    // seata就会将这个方法当做一个分布式事务的起点
    // 之后所有远程Dubbo调用的数据库操作要么都成功,要么都失败
    @GlobalTransactional
    @Override
    public void buy() {
        // 暂时模拟一个下单业务
        // 创建OrderAddDTO类,赋值并输出信息
        OrderAddDTO orderAddDTO=new OrderAddDTO();
        orderAddDTO.setCommodityCode("PC100");
        orderAddDTO.setUserId("UU100");
        orderAddDTO.setMoney(500);
        orderAddDTO.setCount(8);
        // 因为没有持久层,只能输出一下,表示运行正常
        log.info("新增订单信息为:{}",orderAddDTO);
        // dubbo调用生成订单方法
        dubboOrderService.orderAdd(orderAddDTO);
        // 为了验证我们seata是有效果的
        // 在当前业务逻辑层方法中随机发生异常
        // 我们可以通过观察正常运行时数据是否提交和发生异常是数据是否回滚来判断seata是否工作
        if(Math.random()<0.5){
            throw new CoolSharkServiceException(ResponseCode.INTERNAL_SERVER_ERROR,
                                            "发生随机异常");
        }
    }
}
```

## 启动seata

seata也是java开发的,启动方式和nacos很像

只是启动命令不同

解压后路径不要用中文,不要用空格

也是解压之后的bin目录下

![seata的bin目录.png](/images/seata的bin目录.png)

在路径上输入cmd进入dos窗口

```
G:\pgm\seata\seata-server-1.4.2\bin>seata-server.bat -h 127.0.0.1 -m file
```

要想启动,需要启动所有4个服务cart\stock\order\business

利用knife4j访问business模块,否则无法触发事务效果,business模块是seata事务的启动

**在windows系统中运行seata可能出现不稳定的情况,重启seata即可解决**

根据是否发生随机异常,来判断seata是否有效

### Seata使用常见错误

 Seata在开始工作时,会将方法相关对象序列化后保存在对应数据库的undo_log表中

但是Seata我们序列化的方式支持很多中,常见的jackson格式序列化的情况下,不支持java对象LocalDataTime类型的序列化,序列化运行时会发送错误:

![seata常见错误1.png](/images/seata常见错误1.png)

如果见到这样的错误, 就是因为jackson不能序列化LocalDataTime导致的

要想解决,两方面思路,

1.将序列化过程中LocalDataTime类型转换为Date

2.将Seata序列化转换为kryo类型,但是需要在pom文件中添加依赖(我们的项目中有)

```xml
<!--解决seata序列化问题-->
<dependency>
    <groupId>io.seata</groupId>
    <artifactId>seata-serializer-kryo</artifactId>
</dependency>
```

yml文件配置

```yml
#seata服务端
seata:
  tx-service-group: csmall_group
  service:
    vgroup-mapping:
      csmall_group: default
    grouplist:
      default: ${my.server.addr}:8091
  client:
    undo:
      log-serialization: kryo
```

