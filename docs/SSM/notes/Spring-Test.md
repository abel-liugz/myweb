---
title: Spring-Test
---



# 测试  

## 分类：

  ~~~java
单元测试：用于测试一个功能单元，用于测试业务层的(不带持久层)，不需要使用Spring容器
集成测试：用于测试多层，测试业务层+持久层属于集成，测试控制器+业务层+持久层也是属于集成测试。通常集成测试都需要使用SPring容器
  ~~~

## Junit5测试

  ~~~java
从SpringBoot2.2版本开始的默认JUnit
需要Java8环境，可以使用lambda表达式
  ~~~

### Junit5常用测试注解

  ~~~java
@Test - 放在测试方法上方，可以直接启动该方法
@BeforeEach -- 作用于测试方法上方，表示在每个测试方法执行之前都会调用该方法
@AfterEach -- 作用于测试方法上方，表示在每个测试方法执行之后都会调用该方法
@BeforeAll  -- 作用于方法上方，表示在所有测试方法执行之前执行，且只执行一次，要求该方法为static
@AfterAll  -- 作用于方法上方，表示在所有测试方法执行之后执行，且只执行一次，要求该方法为static
  ~~~

## 断言 -- 自动化测试会使用

  ~~~java
1. 静态导入断言库
    import static org.junit.jupiter.api.Assertions.*;
2. 方法：
    assertEquals(expect,actual)
    assertNull(result)
    assertNotNull(result)
    assertTrue(result)
    assertFalse(result)
    assertThrows(Exception.class,()->{})
  ~~~

## mock测试，应用于单元测试中的 -- 模拟测试

  ~~~java
如果不想让对业务层的测试对数据库的真实数据造成影响，此时可以采用mock测试，可以对持久层对象进行模拟并训练，从而解决对数据库的影响问题。
  ~~~

  ![模拟bean测试.png](/images/模拟bean测试.png)



### mock测试使用的步骤

  ~~~java
1. 静态导入模拟库
    static org.mockito.Mockito.*;
2. 获取模拟对象
    mock(Class) -- 得到对应的mockBean对象
3. 对mock Bean进行训练
    when(userDao.addUser(User)).thenReturn(1);
4. 进行单元测试，根据训练的结果进行一些自动化测试（断言）
  ~~~

## Spring集成测试

  ~~~java
在测试类上放添加注解
	@ExtendWith(SpringExtension.class)
	@ContextConfiguration(classes = Config.class)
    
或者
    @SpringJUnitConfig(Config.class)
    
则可以使用上下文对象，也可以注入对象，直接使用。
  ~~~

  - 注意点：上下文

    ~~~java
    测试过程中，如果需要，可以在某个测试方法结束后，选择关闭上下文，使用注解@DirtiesContext即可，其他测试方法执行时，会重新获取新的上下文对象
        
    如何测试上下文对象是一个还是两个？
        写两个测试方法，分别输出同一个Bean对象，观察输出的引用
        	- 结果一致，说明是从同一个上下文对象获取
        	- 结果不一致，说明是从两个上下文对象获取到的
    ~~~

## SpringBoot集成测试

  ~~~java
SpringBoot进行集成测试，使用注解@SpringBootTest即可，无需指定配置文件，其他操作和Spring集成测试一致。
  ~~~

  - 业务层+持久层的集成测试

  - web测试

    - TestRestTemplate集成测试  - 启动web容器

    ~~~java
    1. SpringBoot测试框架会自动启动内嵌服务器
    2. 通过SpringBoot自动配置的TestRestTemplate Bean对象来发起请求
        - 发送get请求，调用方法 getForObject(....)
        - 发送post请求，调用postForObject(.....)
    3. web集成测试的时候，webEnvironment支持以下模式
        RANDOM_PORT, DEFINED_PORT, MOCK, NONE
    ~~~

    - 注意点：

      ~~~java
      发送get请求：
          //get请求传参是在请求后通过？拼接参数
              String url = "/users/login?userName={username}&pwd={password}";
              String mes = template.getForObject(url,String.class,"tom","123");
              assertEquals("登录成功！",mes);
      发送post请求：
           //定义相对路径
              String url = "/users/regist";
              //post请求传参，参数必须是MultiValueMap类型
              MultiValueMap<String,Object> map = new LinkedMultiValueMap<>();
              map.add("userName","张三");
              map.add("pwd","123");
              //发起post请求
              String mes = template.postForObject(url,map,String.class);
              assertEquals("注册成功！",mes);
      ~~~

      