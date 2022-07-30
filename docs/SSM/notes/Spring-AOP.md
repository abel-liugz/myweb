---
title: Spring-AOP
---

# Aop面向切面编程

## 什么是Aop

面向切面的程序设计(Aspect Oriented Programming)又译作**剖面导向程序设计**

和OOP(Object Oriented Programming)一样,也是计算机开发的一种程序设计思想

一句话概括面向切面编程

**就是在不修改现有程序代码的前提下,可以设置某个方法运行之前或运行之后新增额外代码的操作**

目标是将**横切关注点**与业务主体进行进一步分离，以提高程序代码的模块化程度。通过在现有代码基础上增加额外的**通知**（Advice）机制，能够对被声明为“**切点**（Pointcut）”的代码块进行统一管理与扩展

什么是切面

程序中的切面指的就是程序中方法的相互调用

![image-20220331151645477](/images/image-20220331151645477.png)

名词解释

- 切面(aspect):是一个可以加入额外代码运行的特定位置,一般指方法之间的调用,可以在不修改原代码的情况下,添加新的代码,对现有代码进行升级维护和管理
- 织入(weaving):选定一个切面,利用动态代理技术,为原有的方法的持有者生成动态对象,然后将它和切面关联,在运行原有方法时,就会按照织入之后的流程运行了

![捕获](/images/捕获.png)

* 通知(advice)

  通知要织入的代码的运行时机

  * 前置通知(before advice)
  * 后置通知(after advice)
  * 环绕通知(around advice)
  * 异常通知(after throwing advice)

## Spring实现Aop

之前我们明确了Spring框架的两大功能

- Ioc\DI
- AOP

实际上我们在项目开发的过程中,多处多次用到了AOP思想

它们都可以实现不修改代码就能新增各种功能

例如

- 过滤器
- Spring-Security(底层通过过滤器实现)
- SpringMvc统一异常处理类
- SpringValidation
- .....

实际上Spring只是实现Aop的方式之一

下面我们就使用Spring来实现Aop的功能

不必新建项目,使用任何SpringBoot项目都可以

我们使用csmall-business项目来测试Spring的AOP

```xml
<!--  支持SpringAop注解的依赖   -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aspects</artifactId>
</dependency>
```

SpringAop的优势是通用性更强

项目中的任何由Spring保存的对象的方法都可以是Aop的目标

包括不限于控制层\业务层\持久层\其他类

我们首先来确定我们要aop的目标

我们可以在BusinessController类中新增一个方法用于测试aop

```java
@GetMapping("/test")
@ApiOperation("Aop测试方法")
public JsonResult aopTest(){
    System.out.println("控制器方法运行");
    return JsonResult.ok("运行完成!");
}
```

要想添加aop的效果

我们可以新建一个包aspect

包中新建类DemoAspect

```java
// 当前DemoAspect类的功能是为指定的方法进行aop实现
// 必须将当前切面设置类也交由Spring管理
@Component
// 表示当前类不是普通类,是做切面功能设计的
@Aspect
public class DemoAspect {

    // 1.定义切面
    //  @Pointcut是指定切面方法的注解
    //  注解中通过固定的格式指定或统配添加切面的方法
    @Pointcut("execution(public * cn.tedu.csmall.business.controller" +
            ".BusinessController.aopTest(..))")
    // 我们需要在注解下定义一个方法,代表这个切面的定义
    // 这个方法不需要任何内容,方法名足矣
    public void pointCut(){}

    // 2.织入内容
    //   向确定好的切面中添加需要运行的额外代码
    //   我们需要设计它的运行时机,这里以前置运行为例
    //   在注解中配置上面切面的方法名,pointCut()是上面方法名,带()是固定要求
    @Before("pointCut()")
    public void before(){
        // 这个代码就会在aopTest方法运行之前运行
        System.out.println("前置advice运行");
    }
    
}
```

本地Nacos\seata

启动business

20000端口访问aop测试方法

运行后到控制台观察输出内容

## 各种advice和aop方法参数

正常的aop方法可能需要当前程序运行的一些状态

我们可以在advice方法的参数位置添加JoinPoint参数

在Before的方法参数中添加如下

```java
@Before("pointCut()")
public void before(JoinPoint joinPoint){
    // 这个代码就会在aopTest方法运行之前运行
    System.out.println("前置advice运行");
    // JoinPoint可以声明在任何织入方法的参数中
    // JoinPoint会包含当前切面方法的各种信息,主要都是反射获取的
    // 最常用的就是当前切面方法的方法信息,例如方法名
    String methodName=joinPoint.getSignature().getName();
    System.out.println("切面方法为:"+methodName);
}
```



后置异常和环绕Advice

```java
// 当前DemoAspect类的功能是为指定的方法进行aop实现
// 必须将当前切面设置类也交由Spring管理
@Component
// 表示当前类不是普通类,是做切面功能设计的
@Aspect
public class DemoAspect {

    // 1.定义切面
    //  @Pointcut是指定切面方法的注解
    //  注解中通过固定的格式指定或统配添加切面的方法
    @Pointcut("execution(public * cn.tedu.csmall.business.controller" +
            ".BusinessController.aopTest(..))")
    // 我们需要在注解下定义一个方法,代表这个切面的定义
    // 这个方法不需要任何内容,方法名足矣
    public void pointCut(){}

    // 2.织入内容
    //   向确定好的切面中添加需要运行的额外代码
    //   我们需要设计它的运行时机,这里以前置运行为例
    //   在注解中配置上面切面的方法名,pointCut()是上面方法名,带()是固定要求
    @Before("pointCut()")
    public void before(JoinPoint joinPoint){
        // 这个代码就会在aopTest方法运行之前运行
        System.out.println("前置advice运行");
        // JoinPoint可以声明在任何织入方法的参数中
        // JoinPoint会包含当前切面方法的各种信息,主要都是反射获取的
        // 最常用的就是当前切面方法的方法信息,例如方法名
        String methodName=joinPoint.getSignature().getName();
        System.out.println("切面方法为:"+methodName);
    }

    // 后置 Advice
    @After("pointCut()")
    public void after(){
        System.out.println("后置advice运行");
    }
    // 异常 Advice (只有切面的方法发生异常时才会运行)
    @AfterThrowing("pointCut()")
    public void throwing(){
        System.out.println("方法发生异常!");
    }

    // 环绕Advice
    @Around("pointCut()")
    // 环绕Advice要想正常执行,必须设置方法的返回值和参数
    // 它能够实现切面方法运行前后都添加代码
    // 参数类型必须是ProceedingJoinPoint,它是JoinPoint的子接口
    // 它拥有更多方法,其中包含针对环绕Advice调用方法返回值的功能
    // 环绕增强,参与到了原有方法代码的调用和返回值的接收工作
    // 所以环绕增强需要讲原有方法的返回值返回才能有保持原有的工作流程
    public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
        // 这个方法运行时,当前切面的目标方法还没有执行
        System.out.println("环绕Advice前置执行");
        // 环绕增强调用目标方法,并接收返回值(只有环绕增强有这个步骤)
        Object obj=joinPoint.proceed();
        // 这里目标方法已经执行完毕
        System.out.println("环绕Advice后置执行");
        // 千万别忘了要返回obj
        return obj;
    }


}
```



![1657769406601](/images/1657769406601.png)

## 切面语法定义规则

上面课程中使用的切面定义语法为:

```java
@Pointcut("execution(public * cn.tedu.csmall.business.controller" +
        ".BusinessController.aopTest(..))")
```

含义为public 修饰的,任何返回值的cn.tedu.csmall.business.controller包BusinessController类的aopTest方法

可以是任意参数

实际上这个定义切面的语法还有很多变化或通配,以满足各种切面定义需求

下面是详细语法规则的模板

```
execution(
modifier-pattern?
ret-type-pattern
declaring-type-pattern?
name-pattern(param-pattern)
throws-pattern?)
```

带?的是可选属性,不带?是必须写的

- modifier-pattern:访问修饰符(可选)
- ret-type-pattern:返回值类型(必写)
- declaring-type-pattern:全路径类名(可选)
- name-pattern:方法名(必写)
- param-pattern:参数列表(必写)
- throws-pattern:抛出的异常类型(可选)

分析下面的表达式设置切面的方法

```
execution(* *(..)):
匹配spring框架中(spring容器中)所有类得所有方法都定为切面
```

```
execution(public * com.test.TestController.*(..)):
匹配com.test.TestController类中的所有被public修饰方法定义为切面
```

```
execution(* cn.tedu.csmall.cart.mapper.*.*(..)):
匹配cn.tedu.csmall.cart.mapper包中所有接口\类的所有方法定义为切面
```

## Aop实现业务逻辑层性能记录

我们想了解酷鲨商城的业务运行用时

我们可以在需要测试用时的模块中添加aop环绕Advice

在运行前和运行后分别记录时间,将它们相减,获得的时间差就是用时

我们以mall-order-webapi模块为例

pom文件添加依赖

```xml
<!--  支持SpringAop注解的依赖   -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aspects</artifactId>
</dependency>
```

在创建aspect包

包中创建TimeAspect类

代码如下

```java
@Component
@Aspect
public class TimeAspect {
    // 定义切面,目标是当项目所有业务逻辑层方法
    @Pointcut("execution(public * cn.tedu.mall.order.service.*.*(..))")
    public void timer(){}
    // 使用环绕Advice计时比较合理
    @Around("timer()")
    public Object timeRecord(ProceedingJoinPoint joinPoint) throws Throwable {
        // 记录开始时间
        long start=System.currentTimeMillis();
        // 调用切面方法
        Object obj=joinPoint.proceed();
        // 记录结束时间
        long end=System.currentTimeMillis();
        // 计算时间差
        long time= end-start;
        // 获得方法名
        String methodName=joinPoint.getSignature().getName();
        // 输出方法用时
        System.out.println(methodName+"方法用时"+time+"ms");
        // 别忘了返回!
        return obj;

    }


}
```

