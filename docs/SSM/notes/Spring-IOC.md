---
title: Spring-IOC
---

# Spring框架

### 关于Spring框架

- Spring框架主要解决了创建对象、管理对象的问题
- 在开发实践中，Spring框架的核心价值在于：开发者可以通过Spring框架提供的机制，将创建对象、管理对象的任务交给Spring来完成，以至于开发者不必再关系这些过程，当需要某个对象时，只需要通过Spring获取对象即可。
  - Spring框架也经常称之为：Spring容器
- 在开发实践中，有许多类型的对象、配置值都需要常驻内存、需要有唯一性，或都需要多出使用，自行维护这些对象或值是非常繁琐的，通过Spring框架可以加大的简化这些操作。



### 在Maven工程中使用Spring

- 当某个项目需要使用Spring框架时，推荐使用Maven工程。

- 使用Spring框架所需的依赖项是spring-context，依赖代码为：

  ~~~xml
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.3.14</version>
  </dependency>
  ~~~

  > 以上代码中版本号可以按需调整



# IOC-控制反转

> 将对象的创建权交由Spring去管理，我们需要使用某个对象时，直接从Spring框架中获取即可

## 创建对象的方式

- 如果需要Spring管理对象，就必须先创建对象，然后Spring获取到对象才可以进行管理
- 被Spring管理的对象，通常也称之为Spring Bean
- 创建对象的方式有两种：
  - 通过@Bean方法
  - 通过组件扫描

## 通过@Bean方法创建对象（显示配置Bean）

~~~java
使用2个注解配合使用，具体做法是：
    1. 在项目定义配置类 -- 通过注解@Configuration类定义配置类
    	@Configuration作用于类上方，则表明这个类是一个配置类
    2. 在配置类中定义Bean -- 告诉Spring容器需要去创建哪些Bean对象
    
判断Spring容器是否已经定义Bean对象的方式：从Spring容器获取该Bean对象

案例步骤：
    1. 创建SpringBoot项目
    2. 创建包：config用于放配置类    dao包用于保存一些定义的类
    3. 创建类：在config包下创建配置类，类名自定义
    		  在dao包下创建UserDao类
    4. 配置Bean
    	在配置类上方添加注解@Configuration
    	在配置类中定义一个方法用于返回UserDao实例，在该方法上方添加注解@Bean
    5. 测试Spring是否已经配置好了Bean对象
    	获取ApplicationContext对象，然后调用getBean方法获取UserDao实例，如果获取成功，表明Spring配置UserDaoBean成功
~~~

- 注意点：通过@Bean显示配置Bean对象，方法名即为Bean对象的name，通常叫做BeanId，BeanId是用于检索Bean对象的

- 通过@Bean装配Bean时，若需要注入其他Bean对象，可以使用参数注入Bean对象

  ~~~java
  @Bean
  public PersonService personService(PersonDao personDao){
    return new PersonServiceImpl(personDao);
  }
  ~~~

## 通过组件扫描（隐式配置Bean）

~~~java
1. 通过在类上方添加组件类注解来表名某个类是组件，交由Spring去管理
  		组件：Spring中定义的类，通过在类上方添加注解来表明是组件
2. 在配置类上方添加注解@ComponentScan("指定包名")，通知Spring去哪里扫描添加了组件类注解的类并装配成Bean对象
  
组件类注解：
  @Component	通用组件注解
  @Controller / @RestController	控制器组件
  @Service	业务层组件
  @Repository	持久化/数据层组件
  @Configuration	表示配置类组件
~~~

- 隐式配置的BeanId，默认情况下为：

  1. 若类名首字母大写，第二个字母小写，则BeanId为类名首字母小写：

     eg:`class UserDaoImpl...`对应的BeanId为：`userDaoImpl`

  2. 否则，BeanId和类名保持一直

     eg:`class USerDaoImpl...`对应的BeanId为：`USerDaoImpl`

- 隐式配置BeanId也可以通过注解`@Component("beanid")`指定BeanId

- 关于显示配置和隐式配置的选择：

  - 定义自己写的类是，建议使用隐式配置
  - 将不是自己写的类装配成Bean时，建议使用显示配置

  > 在一个项目中可以混合使用

## Spring中所有Bean的实例化时机

> Spring框架中，所有的Bean对象都是在Spring程序启动时实例化好的。
>
> 因为以上操作，造成的现象：启动Spring程序，启动时间会长一些

> 问题：为什么Spring不采用懒加载机制？（即什么时候用某个Bean，再创建某个Bean对象）
>
> - 如果在程序启动时实例化所有的Bean，这种方式启动时间会长，但是后续使用Bean时无需再创建Bean，所以使用过程中程序的效率很高
>
> - 如果采用懒加载方式，即程序启动时不实例化Bean，而是什么时候用个，什么时候在实例化，这种方式会降低程序的使用效率

## 从Spring容器中获取Bean对象

- ApplicationContext -- 应用程序上下文对象

  ```java
  该对象代表Spring容器，会存在于整个项目生命周期。
  所以可以通过该对象获取Spring容器中的所有Bean对象
  ```

- 如何获取到ApplicationContext对象

  ```java
  ApplicationContext context = SpringApplication.run(Config.class)
  ```

- 如何通过ApplicationContext对象获取某个Bean对象 -- 三种方式

  ~~~java
  1. 根据数据类型来获取某个Bean对象
    	UserDao dao = context.getBean(UserDao.class);
  			注意点：这种获取方式要求：该类型的Bean对象只有一个
  2. 根据BeanId来获取Bean对象
      StudentDao studentDao = (StudentDao) context.getBean("studentDao");
  			注意点：通过BeanId获取到的Bean对象类型为Obj，需要强转
  3. 根据BeanId来获取Bean对象，可以指定数据类型，无需强转
      UserDao userDao = context.getBean("userDao",UserDao.class)
  ~~~

## Bean的作用域

- 作用域是Bean的属性，可以单独对某个Bean的作用域进行修改

- Spring容器配置Bean对象的时候，默认所有的Bean对象都是单例的

- Spring容器中Bean的常见作用域

  ```java
  singleton	-- 单例		Spring容器默认的
  prototype -- 原型   Spring容器中，每次获取Bean对象，都会重写实例化
  request -- 每个request对象代表一次请求，每发起一次请求，都会重新实例化用到Bean对象
  session -- 每次创建一个新的session对象，都会重新实例化用到的Bean对象
  ```

- 如何修改作用域：

  - 通过注解@Scope来定义，用法为：

    ```java
    @Bean
    @Scope("prototype")
    public UserDao userDao(){
      return new UserDao();
    }
    ```

## 依赖注入

### @AutoWired注入

- 该注解是Spring框架提供的，默认会根据类型进行注入

- 三种注入方式：

  ```java
  1. 构造方法注入
    	若类中的构造方法只有一个，则@AutoWired注解可省略
    	@Autowired
      public CatServiceImpl(AnimalDao animalDao){
          this.animalDao = animalDao;
      }
  2. set方法注入
      @Autowired
      public void setBearDao(BearDao bearDao){
          this.bearDao = bearDao;
      }
  3. 字段注入
      @Autowired
      private CatDao catDao;
  ```

- 注入规则:

  ```
  该注解是Spring框架提供的注解，默认按照数据类型注入Bean对象
    - 若没有匹配的数据类型，直接注入失败
    - 若该类型对应的Bean对象有多个时，此时会产生歧义
    	-产生歧义时，会自动根据beanId会查找是否有对应的Bean对象，若有则注入
    	-使用@Qualifier(name)指定BeanId/BeanName
  ```

- @Autowired可能会产生歧义的问题

  ```java
  案例：
      interface  UserDao{}
  				class UserDaoImpl 实现 UserDao{}
  				class UserDaoImpl1 实现 UserDao{}
  
  				class UserServiceImpl 实现UserService{
          
          @Autowried
          private UserDao userDao;
      }
  ```

- @Autowried消除歧义--2种解决办法

  - 使用注解@Qualifier

    ```java
    步骤：
        定义一个UserDao接口，两个实现类
        在UserServiceImpl中通过字段注入UserDao对象，看是否产生歧义
        测试@Qualifier注解是否可以解决歧义
        
    注意：可以将三种注入方式全都测试
    ```

    - @Qualifier注解只能作用于set方法注入和字段注入

  - 解决歧义第二种办法：

    - @Autowired若产生歧义，此时默认会自动根据beanid去找是否有对应的Bean，若有，则直接注入

- @Resource注入

  - 注入规则：

    ~~~java
    默认按照BeanId注入，若找不到匹配的BeanId,则回退到根据数据类型注入
      @Resource
      private UserService service;
    ~~~

  - 注入方法：注意不支持构造方法注入

    ~~~java
    1. set方法注入
        注意：setAccountDao(...)从方法名中提取BeanId，为set后的名称首字母小写
    2. 字段注入
      
    注意：
        1. @Resource(name="....")可以通过name属性指定BeanId
    	2. @Resource注解若没有指定name，则默认是先按照name查找，找不到则回退到类型查找；若指定了name，则只根据name查找，若找不到，则直接报错
    ~~~



### Stereotype注解和Meta注解

- Stereotype注解：合成注解/组成注解

  > 由其他若干个注解组合而成的注解

  - @Controller
  - @Service
  - @Repository
  - ...

- Meta注解在；元注解

  - 定义：能够作用在其他注解商法的注解，称为元注解
  - 注意：一个注解可能是合成注解，同时也可能是元注解



## Bean的生命周期

> 是指Bean对象从创建到销毁的过程

- @PostConstruct和@PreDestory

  - 前提：使用以上注解定义自定义操作，要求方法必须无参且返回void

  - @PostConstruct

    - 该注解作用于方法上方，用于定义自定义初始化操作，该方法会在Bean初始化过程中被调用
    - 作用时机：在Bean的初始化过程中，该注解标记的方法会在setter注入之后被调用

  - @PreDestory

    - 该注解作用于方法上方，用于定义自定义操作，该方法会在Bean销毁之前被调用
    - 注意点：
      1. 只有容器正常关闭时才会调用该注解标记的方法，若容器是意外关闭或强制关闭，则不会调用该注解标记的方法
      2. System.exit(..)是强制关闭JVM，而JVM关闭时会自动关闭Spring容器，此时Spring容器并不是强制/意外终止，而是正常结束，所以@PreDestory的方法会被调用

  - 通过@Bean的属性在Bean初始化和销毁前执行自定义操作

    > 显示配置Bean时，可以通过添加@Bean的属性initMethod和destoryMethod来指定对应的方法。
    >
    > 效果和@PostConstruct，@PreDestory是一样的

    - 注意：两种方式选择的问题
      1. 若是自定义的类，则可以通过隐式配置Bean，此时可以使用@PostConstruct和@PreDestory
      2. 若配置的不是自己写的类，则可以通过显示配置Bean，此时可以使用属性initMethod和destoryMethod

  - 构造注入，setter注入，字段注入的执行顺序

    > 构造注入-->字段注入-->setter注入

## 初始化

1. 加载并后处理Bean的定义

   ~~~java
   加载Bean的定义：
       检测@Bean注解和组件类注解，将Bean的定义加载到BeanFactory中（ApplicationContext就是一个BeanFactory），在BeanFactory中，bean的id和类型都会被索引
       
   后处理Bean的定义： -- 调用BFPP
       BeanFactoryPostProcessor在这个节点会被调用，用于修改Bean定义的属性（比如作用域），这个阶段结束，Bean定义加载结束，即将开始实例化Bean
       
       - Spring中已经定义好了一些BFPP的实现类，用于处理一些操作，常见的有：
       	从属性文件读取属性，修改Bean的作用域
       	-PropertySourcesPlaceholderConfigurer，该类实现了BFPP接口，用于完成读取属性
   ~~~

  ![加载并后处理bean定义.png](/images/加载并后处理bean定义.png)

2. 实例化

   ~~~java
   1. 查找Bean的依赖
   2. 实例化Bean
   3. 构造方法注入
   4. setter注入
   ~~~

3. 初始化

   ~~~java
   会调用初始化器，可以在初始化之前和之后添加操作，通过接口BeanPostProcessor（BPP）完成--该阶段叫做Bean的后处理过程
       
   注意：BPP中重写两个方法后，两个方法会在每个Bean的初始化器之前和之后都调用
       
   BPP的应用：若想在所有的Bean初始化之前和之后统一的执行一些操作，此时可以通过接口BPP完成。   
   ~~~

  ![实例化以及初始化.png](/images/实例化以及初始化.png)