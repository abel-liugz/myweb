---
title: Quartz
---

# Quartz

## 什么是Quartz

quartz:石英钟的意思

是一个当今市面上流行的高效的任务调用管理工具

由OpenSymphony开源组织开发

Symphony:交响乐

是java编写的,我们使用费时需要导入依赖即可

## 为什么需要Quartz

什么是任务调度

所谓任务调用,就是执行某些具体动作的时间计划

我们使用过的最简单的调度方法就是Timer

但是Timer的调度功能过于单一,只能是指定时间的延时调用和周期运行

而Quartz可以更详细的指定时间,进行计划调用

## Quartz核心组件

![quartz核心组建.png](/images/quartz核心组建.png)

调度器:Scheduler

任务:Job

触发器:Trigger

调度器来配置\计划什么时间触发什么任务

简单来说就是调度器规定什么时间做什么事情

- job(工作\任务):Quartz 实现过程中是一个接口,接口中有一个方法execute(执行的意思)

我们创建一个类,实现这个接口,在方法中编写要进行的操作(执行具体任务)

我们还需要一个JobDetail的类型的对象,Quartz每次执行job时

会实例化job类型对象,去调用这个方法,JobDetail是用来描述Job实现类

的静态信息,	比如任务运行时在Quartz中的名称

- Trigger(触发器):能够描述触发指定job的规则,分为简单触发和复杂触发

  简单触发可以使用SimplTrigger实现类.功能类似timer

  复杂触发可以使用CronTrigger实现类,内部利用cron表达式描述各种复杂的时间调度计划

- Scheduler(调度器):一个可以规定哪个触发器绑定哪个job的容器

  在调度器中保存全部的Quartz 保存的任务

  SpringBoot框架下,添加Quartz依赖后,调度器由SpringBoot管理,我们不需要编写

## Cron表达式

![cron表达式.png](/images/cron表达式.png)

- \* 表示任何值,如果在分的字段上编写*,表示每分钟都会触发

- , 是个分割符如果秒字段我想20秒和40秒时触发两次就写  20,40

- \- 表示一个区间 秒字段5-10 表示 5,6,7,8,9,10

- / 表示递增触发 秒字段 5/10表示5秒开始每隔10秒触发一次

  日字段编写1/3表示从每月1日起每隔3天触发一次

- ? 表示不确定值, 因为我们在定日期时,一般确定日期就不确定是周几,相反确定周几时就不确定日期

- L 表示last最后的意思,我们可以设置当月的最后一天,就会在日字段用L表示,

  周字段使用L表示最后一周,一般会和1-7的数字组合

  例如6L表示本月最后一周的周五

- W 表示最近的工作日(单纯的周一到周五) 如果日字段编写15W表示

  每月15日最近的工作日触发,如果15日是周六就14日触发,如果15日是周日就16日触发

​	LW通常一起使用,表示本月的最后一个工作日

- \# 表示第几个,只能使用在周字段上 6#3表示每月的第三个周五

  如果#后面数字写大了,是一个不存在的日期,那就不运行了

  适合设计在母亲节或父亲节这样的日期运行

双11的触发

如果是11月11日0时触发

"0 0 0 11 11 ?"

每个月10日最近的工作日早上9点发工资

0 0 9 10W * ?

网络上可用的Cron表达式生成器很多

推荐一个http://cron.ciding.cc/

0 0 0 5/3 * ?

## SpringBoot使用Quartz

SpringBoot框架下使用Quartz格式还是非常固定的

我们选用之前学习微服务的项目csmall减少对大项目的影响

首先添加依赖

模块pom文件中添加依赖

```xml
<!--  SpringBoot Quartz依赖  -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-quartz</artifactId>
</dependency>
```

先编写要执行的任务

当前项目模块中创建quartz包

包中创建一个QuartzJob的类,实现Job接口

代码如下

```java
public class QuartzJob implements Job {
    
    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        //输出当前时间
        System.out.println("--------------"+ LocalDateTime.now() +"---------------");
    }
}
```

在quartz包下,继续创建一个类QuartzConfig

这个类是一个SpringBoot配置类,它实际上是Quartz调度器的配置

代码的编写基本格式个固定的,同学们需要使用时直接套用这个格式

```java
// 这个配置类就是在配置已经保存在Spring容器中的调度器Scheduler
// 我们需要按下面格式进行配置,才能让Scheduler正常工作
@Configuration
public class QuartzConfig {
    // 创建一个JobDetail(工作详情)类对象,保存到Spring容器中,这个类用于封装我们编写的job接口实现类
    // @Bean注解标记的方法的返回值会自动保存到Spring容器中(方法名随意)
    @Bean
    public JobDetail showTime(){
        System.out.println("showTime方法运行");
        return JobBuilder.newJob(QuartzJob.class)   // 绑定要运行的任务类的反射
                .withIdentity("date")               // 设置这个job的名称
                .storeDurably()                     //
                .build();
    }

    // 下面要声明触发器,Trigger,触发器决定我们的工作\任务何时触发
    @Bean
    public Trigger showTimeTrigger(){
        System.out.println("showTime触发器运行");
        // 定义Cron表达式   每分钟触发一次的定义
        CronScheduleBuilder cronScheduleBuilder=
                CronScheduleBuilder.cronSchedule("0 0/1 * * * ?");
        return TriggerBuilder.newTrigger()
                .forJob(showTime())        // 绑定JobDetail JobDetail对象已经在Spring容器中
                .withIdentity("dateTrigger")       // 定义触发器名称
                .withSchedule(cronScheduleBuilder) // 绑定Cron表达式
                .build();
    }

}
```