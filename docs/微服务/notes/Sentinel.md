---
title: Sentinel
---

## 什么是Sentinel

Sentinel也是Spring Cloud Alibaba的组件

Sentinel英文翻译"哨兵\门卫"

随着微服务的流行，服务和服务之间的稳定性变得越来越重要。Sentinel 以流量为切入点，从流量控制、熔断降级、系统负载保护等多个维度保护服务的稳定性。

官网地址

https://sentinelguard.io/zh-cn/

下载地址

https://github.com/alibaba/Sentinel/releases

## 为什么需要Sentinel

- 丰富的应用场景

  双11,秒杀,12306抢火车票

- 完备的实时状态监控

  可以支持显示当前项目各个服务的运行和压力状态,分析出每台服务器处理的秒级别的数据

- 广泛的开源生态

  很多技术可以和Sentinel进行整合,SpringCloud,Dubbo,而且依赖少配置简单

- 完善的SPI扩展

  Sentinel支持程序设置各种自定义的规则

## 基本配置

我们找一个相对简单的模块测试和观察限流效果

以csmall-stock-webapi模块为例

添加pom依赖如下

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
```

application-dev.yml修改配置如下

```yaml
spring:
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848
    sentinel:
      transport:
        dashboard: localhost:8080 # 配置Sentinel仪表台的位置
        port: 8721 # 真正执行限流的端口也要设置一下,注意这个端口其他微服务项目不能相同
```

sentinel.transport.port每个微服务项目不能相同

## 流控与降级

Sentinel限流针对控制层方法，也就是说我们要到Controller类中的方法上去做设置

```java
@PostMapping("/reduce/count")
@ApiOperation("减少商品库存业务")
// @SentinelResource标记的方法会被Sentinel监控
// ()里面的内容是这个监控的名称,我们可以在"仪表台"中看到
// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
@SentinelResource("减少库存方法(控制器)")
public JsonResult reduceCommodityCount(StockReduceCountDTO stockReduceCountDTO){
    stockService.reduceCommodityCount(stockReduceCountDTO);
    return JsonResult.ok("商品库存减少完成!");
}
```

但是被流控的请求只有一个错误,没有错误提示,不方便给用户反馈

我们应该在开发时,对于被流控的请求给与相关提示

StockController中编写代码如下

```java
@Autowired
private IStockService stockService;
@PostMapping("/reduce/count")
@ApiOperation("减少商品库存业务")
// @SentinelResource标记的方法会被Sentinel监控
// value的值是这个监控的名称,我们可以在"仪表台"中看到
// blockHandler的值指定了请求被限流时运行的方法名称
@SentinelResource(value = "减少库存方法(控制器)",blockHandler = "blockError")
public JsonResult reduceCommodityCount(StockReduceCountDTO stockReduceCountDTO){
    stockService.reduceCommodityCount(stockReduceCountDTO);
    return JsonResult.ok("商品库存减少完成!");
}
// Sentinel 限流方法应该满足如下要求
// 1.必须是public修改
// 2.返回值类型必须和控制方法一致(JsonResult)
// 3.方法名称要和控制器方法限流注解中规定的名称一致(blockError)
// 4.参数列表必须和控制器一致,可以在所以参数后声明BlockException来获得限流异常
public JsonResult blockError(StockReduceCountDTO stockReduceCountDTO,
                             BlockException e){
    return JsonResult.failed(ResponseCode.BAD_REQUEST,"服务器忙,请稍后再试");
}
```

降级功能和我们之前学习的统一异常处理类有相似的地方

但是降级是Sentinel的功能

```java
@PostMapping("/reduce/count")
@ApiOperation("减少商品库存业务")
// @SentinelResource标记的方法会被Sentinel监控
// value的值是这个监控的名称,我们可以在"仪表台"中看到
// blockHandler的值指定了请求被限流时运行的方法名称
@SentinelResource(value = "减少库存方法(控制器)",blockHandler = "blockError",
                    fallback = "fallbackError")
public JsonResult reduceCommodityCount(StockReduceCountDTO stockReduceCountDTO){
    // 生成随机出触发降级流程
    if(Math.random()<0.5){
        throw new 
          CoolSharkServiceException(ResponseCode.INTERNAL_SERVER_ERROR,"异常");
    }
    stockService.reduceCommodityCount(stockReduceCountDTO);
    return JsonResult.ok("商品库存减少完成!");
}
// 这个方法是Sentinel注解中fallback属性指定的降级方法
// 当前控制器方法运行发生异常时,Sentinel会运行下面的降级方法
// 降级方法中,可以不直接结束请求,而去运行一些代替代码或者补救措施
// 让用户获得最低限度的响应
public JsonResult fallbackError(StockReduceCountDTO stockReduceCountDTO){
    return JsonResult.failed(ResponseCode.BAD_REQUEST,"因为运行异常,服务降级");
}
```

> **blockHandler和fallback的区别**
> 两者都是不能正常调用资源返回值的顶替处理逻辑.
> blockHander只能处理BlockException 流控限制之后的逻辑.
> fallback处理的是资源调用异常的降级逻辑.