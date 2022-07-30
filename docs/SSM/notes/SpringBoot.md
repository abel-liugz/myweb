---
title: SpringBoot
---

## 关于Spring Boot

Spring Boot是Spring官方的一个产品，其本质上是一个基于Maven的、以Spring框架作为基础的进阶框架，很好的支持了主流的其它框架，并默认完成了许多的配置，其核心思想是“约定大于配置”。

## 创建Spring Boot工程

在IntelliJ IDEA中，在创建向导中选择Spring Initializer即可开始创建Spring Boot工程，在创建向导的界面中，需要关注的部分有：

- Group Id
- Artifact Id

以上2个值会共同构成一个Package name，如果Artifact Id的名字中有减号，在Package name中会去除，推荐手动添加小数点进行分隔。

由于Spring Boot官方更新版本的频率非常高，在创建项目时，随便选取某个版本均可，当项目创建成功后，推荐打开`pom.xml`，将`<parent>`中的`<version>`（即Spring Boot父项目的版本）改成熟悉的版本，例如：`2.5.9`

在创建过程中，还可以在创建向导的界面中勾选所需要依赖项，如果创建时没有勾选，也可以在创建工程之后手动在`pom.xml`中添加。

## Spring Boot工程的结构

由于Spring Boot工程本质上就是一个Maven工程，所以，目录结构基本上没有区别。

与普通Maven工程最大的不同在于：Spring Boot工程在`src\main\java`和`src\test\java`下默认已经存在Package，是创建项目时指定的Package，**需要注意：此Package已经被配置为Spring执行组件扫描的根包，所以，在编写代码时，所有的组件类都必须放在此包或其子孙包中！**通常，推荐将所有的类（及接口）都创建在此包及其子孙包下。

在`src\main\java`下的根包下，默认就已经存在某个类，其类名是创建项目时指定的Artifact与`Application`单词的组合，例如`BootDemoApplication`，此类中有`main()`方法，执行此类的`main()`就会启动整个项目，如果当前项目是Web项目，还会自动将项目部署到Web服务器并启动服务器，所以，此类通常也称之为“启动类”。

在启动类上，默认添加了`@SpringBootApplication`注解，此注解的元注解中包含`@SpringBootConfiguration`，而`@SpringBootConfiguration`的元注解中包含`@Configuration`，所以，启动类本身也是配置类！所以，允许将`@Bean`方法写在此类中，或者某些与配置相关的注解也可以添加在此类上！

在`src\test\java`下的根包下，默认就已经存在某个类，其类名是在启动类的名称基础上添加了`Tests`单词的组合，例如`BootDemoApplicationTests`，此类默认没有添加`public`权限，甚至其内部的默认的测试方法也是默认权限的，此测试类上添加了`@SpringBootTest`注解，其元注解中包含`@ExtendWith(SpringExtension.class)`，与使用`spring-test`时的`@SpringJUnitTest`注解中的元注解相同，所以，`@SpringBootTest`注解也会使得当前测试类在执行测试方法之前是加载了Spring环境的，在实际编写测试时，可以通过自动装配得到任何已存在于Spring容器中的对象，在各测试方法中只需要关注被测试的目标即可。

在`pom.xml`中，默认已经添加了`spring-boot-starter`和`spring-boot-starter-test`依赖，分别是**Spring Boot的基础依赖**和**基于Spring Boot的测试的依赖**。

另外，如果在创建工程时，勾选依赖项时选中了`Web`项，在`src\main\resources`下默认就已经创建了`static`和`templates`文件夹，如果没有勾选`Web`则没有这2个文件夹，可以后续自行补充创建。

在`src\main\resources`文件夹下，默认就已经存在`application.properties`文件，用于编写配置，Spring Boot会自动读取此文件（利用`@PropertySource`注解）。

小结：

- 创建项目后默认的Package不要修改，避免出错
- 在编码过程中，自行创建的所有类、接口均放在默认的Package或其子孙包中
- 在`src\main\java`下默认已存在`XxxApplication`是启动类，执行此类中的`main()`方法就会启动整个项目
- 启动类本身也是配置类
- 配置都应该编写到`src\main\resources`下的`application.properties`中，Spring Boot会自动读取
- 测试类也必须放在`src\test\java`下的默认Package或其子孙包中
- 在测试类上添加`@SpringBootTest`注解，则其中的测试方法执行之前会自动加载Spring环境及当前项目的配置，可以在测试类中使用自动装配

## 在Spring Boot工程中使用Mybatis

需要添加相关依赖项：

- `mysql-connector-java`
- `mybatis-spring-boot-starter`

其依赖的代码为：

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.2.2</version>
</dependency>
```

说明：在Spring Boot工程，许多依赖项都是不需要显式的指定版本号的，因为在父项目中已经对这些依赖项的版本进行了管理（配置版本号），如果一定需要使用特定的版本，也可以自行添加`<version>`节点进行配置

说明：在依赖项的源代码中，当`<scope>`的值为`runtime`时，表示此依赖项是运行过程中需要的，但是，在编译时并不需要参与编译

需要注意：当添加了以上数据库编程的依赖后，如果启动项目，将失败！

因为添加了数据库编程的依赖项后，Spring Boot就会尝试自动装配数据源（`DataSource`）等对象，装配时所需的连接数据库的配置信息（例如URL、登录数据库的用户名和密码）应该是配置在`application.properties`中的，但是，如果尚未配置，就会导致失败！

关于连接数据库的配置信息，Spring Boot要求对应的属性名是：

```
# 连接数据库的URL
spring.datasource.url=???
# 登录数据库的用户名
spring.datasource.username=???
# 登录数据库的密码
spring.datasource.password=???
```

在配置时，也必须使用以上属性名进行配置，则Spring Boot会自动读取这些属性对应的值，用于创建数据源对象！

例如，配置为：

```
# 连接数据库的URL
spring.datasource.url=jdbc:mysql://localhost:3306/mall_ams?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai
# 登录数据库的用户名
spring.datasource.username=root
# 登录数据库的密码
spring.datasource.password=1234
```

由于Spring Boot在启动时只是加载以上配置，并不会实际的连接到数据库，所以，当以上配置存在时，启动就不会报错，但是，无法检验以上配置的值是否正确！

可以在测试类中添加测试方法，尝试连接数据库，以检验以上配置值是否正确：

```java
@SpringBootTest
class BootDemoApplicationTests {

    @Autowired
    DataSource dataSource;

    @Test
    void testGetConnection() throws Exception {
        System.out.println(dataSource.getConnection());
    }

}
```

如果以上测试通过，则表示配置值无误，可以正确连接到数据库，如果测试失败，则表示配置值错误，需检查配置值及本地环境（例如MySQL是否启动、是否已创建对应的数据库等）。

## 关于Profile配置

在Spring Boot中，对Profile配置有很好的支持，开发人员可以在`src\main\resources`下创建更多的配置文件，这些配置文件的名称应该是`application-???.properties`（其中的`???`是某个名称，是自定义的）。

例如：

- 仅在开发环境中使用的配置值可以写在`application-dev.properties`中
- 仅在测试环境中使用的配置值可以写在`application-test.properties`中
- 仅在生产环境（项目上线的环境）中使用的配置值可以写在`application-prod.properties`中

当把配置写在以上这类文件后，Spring Boot默认并不会应用以上这些文件中的配置，当需要应用某个配置时，需要在`application.properties`中激活某个Profile配置，例如：

```
# 激活Profile配置
spring.profiles.active=dev
```

提示：以上配置值中的`dev`是需要激活的配置文件的文件名后缀，当配置为`dev`时，就会激活`application-dev.properties`，同理，如果以上配置值为`test`，就会激活`application-test.properties`。

## 关于YAML配置

Spring Boot也支持使用YAML配置，在开发实践中，YAML的配置也使用得比较多。

YAML配置就是把原有的`.properties`配置的扩展改为`yml`。

YAML配置原本并不是Spring系列框架内置的配置语法，如果在项目中需要使用这种语法进行配置，解析这类文件需要添加相关依赖，在Spring Boot中默认已添加此依赖。

在YAML配置中，原本在`.properties`的配置表现为使用多个小数点分隔的配置将改为**换行**并**使用2个空格缩进**的语法，换行前的部分使用**冒号**表示结束，最后的属性名与值之间使用**冒号和1个空格**进行分隔，如果有多条属性在`.properties`文件中属性名有重复的前缀，在`yml`中不必也不能重复写。

例如，原本在`.properties`中配置为：

```
spring.datasource.username=root
spring.datasource.password=123456
```

则在`yml`文件中配置为：

```
spring:
  datasource:
    username: root
    password: 123456
```

提示：在IntelliJ IDEA中编写`yml`时，当需要缩进2个空格时，仍可以使用键盘上的TAB键进行缩进，IntelliJ IDEA会自动将其转换为2个空格。

无论是`.properties`还是`yml`，只是配置文件的扩展名和文件内部的配置语法有区别，对于Spring Boot最终的执行其实没有任何表现上的不同。

## 使用Druid数据库连接池

Druid数据库连接是阿里巴巴团队研发的，在Spring Boot项目中，如果需要显式的指定使用此连接池，首先，需要在项目中添加依赖：

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>1.1.20</version>
</dependency>
```

当添加了此依赖，在项目中需要应用时，需要在配置文件中指定`spring.datasource.type`属性，取值为以上依赖项的jar包中的`DruidDataSource`类型的全限定名。

例如，在`yml`中配置为：

```
# Spring系列框架的配置
spring:
  # 连接数据库的相关配置
  datasource:
    # 使用的数据库连接池类型
    type: com.alibaba.druid.pool.DruidDataSource
```

## 编写持久层（数据访问层）代码

数据持久化：在开发领域中，讨论数据时，通常指定是正在执行或处理的数据，这些数据都是在内存中的，而内存（RAM）的特征包含”一旦断电，数据将全部丢失“，为了让数据永久保存下来，通常会将数据存储到能够永久存储数据的介质中，通常是计算机的硬盘，硬盘上的数据都是以文件的形式存在的，所以，当需要永久保存数据时，可以将数据存储到文本文件中，或存储到XML文件中，或存储到数据库中，这些保存的做法就是数据持久化，而文本文件、XML文件都不利于实现增删改查中的所有数据访问操作，而数据库是实现增删改查这4种操作都比较便利的，所以，一般在讨论数据持久化时，默认指的都是使用数据库存储数据。

在项目中，会将代码（各类、接口）划分一些层次，各层用于解决不同的问题，其中，持久层就是用于解决数据持久化问题的，甚至，简单来说，持久层对应的就是数据库编程的相关文件或代码。

目前，使用Mybatis技术实现持久层编程，需要：

- 编写一次性的基础配置
  - 使用`@MapperScan`指定接口所在的Base Package
  - 指定配置SQL语句的XML文件的位置 
- 编写每个数据访问功能的代码
  - 在接口中添加必须的抽象方法
    - 可能需要创建相关的POJO类
  - 在XML文件中配置抽象方法映射的SQL语句

关于一次性的配置，`@MapperScan`注解需要添加在配置类上，有2种做法：

- 直接将此注解添加在启动类上，因为启动类本身也是配置类
- 自行创建配置类，在此配置类上添加`@MapperScan`

如果采用以上的第2种做法，则应该在`src\main\java`的根包下，创建`config.MybatisConfig`类，并在此类使用`@MapperScan`注解

另外，关于指定配置SQL语句的XML文件的位置，需要在`application.yml`（或`application.properties`）中配置`mybatis.mapper-locations`属性，例如：

```yml
# Mybatis相关配置
mybatis:
  # 用于配置SQL语句的XML文件的位置
  mapper-locations: classpath:mapper/*.xml
```

基于以上的配置值，还应该在`src/main/resources`下自行创建名为`mapper`的文件夹。

至此，关于使用Mybatis实现数据库编程的一次性配置结束！


## 关于业务逻辑层（Service层）

业务逻辑层是被Controller直接调用的层（Controller不允许直接调用持久层），通常，在业务逻辑层中编写的代码是为了**保证数据的完整性和安全性**，使得数据是随着我们设定的规则而产生或发生变化。

通常，在业务逻辑层的代码会由接口和实现类组件，其中，接口被视为是必须的

- 推荐使用基于接口的编程方式
- 部分框架在处理某些功能时，会使用基于接口的代理模式，例如Spring  JDBC框架在处理事务时

在接口中，声明抽象方法时，仅以操作成功为前提来设计返回值类型（不考虑失败），如果业务在执行过程可能出现某些失败（不符合所设定的规则），可以通过抛出异常来表示！

关于抛出的异常，通常是自定义的异常，并且，自定义异常通常是`RuntimeException`的子类，主要原因：

- 不必显式的抛出或捕获，因为业务逻辑层的异常永远是抛出的，而控制器层会调用业务逻辑层，在控制器层的Controller中其实也是永远抛出异常的，这些异常会通过Spring MVC统一处理异常的机制进行处理，关于异常的整个过程都是固定流程，所以，没有必要显式抛出或捕获
- 部分框架在处理某些事情时，默认只对`RuntimeException`的子孙类进行识别并处理，例如Spring  JDBC框架在处理事务时

所以，在实际编写业务逻辑层之前，应该先规划异常，例如先创建`ServiceException`类

## 使用Lombok框架

在编写POJO类型（包括实体类、VO、DTO等）时，都有统一的编码规范，例如：

- 属性都是私有的
- 所有属性都有对应的Setter & Getter方法
- 应该重写`equals()`和`hashCode()`方法，以保证：如果2个对象的字面值完全相同，则`equals()`对比结果为`true`，且`hashCode()`返回值相同，如果2个对象的字面值不相同，则`equals()`对比结果为`false`，且`hashCode()`返回值不同
- 实现`Serializable`接口

另外，为了便于观察对象的各属性值，通常还会重写`toString()`方法。

由于以上操作方式非常固定，且涉及的代码量虽然不难，但是篇幅较长，并且，当类中的属性需要修改时（包括修改原有属性、或增加新属性、删除原有属性），对应的其它方法都需要修改（或重新生成），管理起来比较麻烦。

使用Lombok框架可以极大的简化这些操作，此框架可以通过注解的方式，在**编译期**来生成Setters & Getters、`equals()`、`hashCode()`、`toString()`，甚至生成构造方法等，所以，一旦使用此框架，开发人员就只需要在类中声明各属性、实现`Serializable`、添加Lombok指定的注解即可。

在Spring Boot中，添加Lombok依赖，可以在创建项目时勾选，也可以后期自行添加，依赖项的代码为：

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>
```

完成后，在各POJO类型中，将不再需要在源代码添加Setters & Getters、`equals()`、`hashCode()`、`toString()`这些方法，只需要在POJO类上添加`@Data`注解即可！

当添加`@Data`注解，且删除相关方法后，由于源代码中没有相关方法，则调用了相关代码的方法可能会报错，但是，并不影响程序运行！

为了避免IntelliJ IDEA判断失误而提示了警告和错误，推荐安装Lombok插件

## Slf4j日志框架

在开发实践中，**不允许**使用`System.out.println()`或类似的输出语句来输出显示关键数据（核心数据、敏感数据等），因为，如果是这样使用，无论是在开发环境，还是测试环境，还是生产环境中，这些输出语句都将输出相关信息，而删除或添加这些输出语句的操作成本比较高，操作可行性低。

推荐的做法是使用日志框架来输出相关信息！

当添加了Lombok依赖后，可以在需要使用日志的类上添加`@Slf4j`注解，然后，在类的任意中，均可使用名为`log`的变量，且调用其方法来输出日志（名为`log`的变量也是Lombok框架在编译期自动补充的声明并创建对象）！

在Slf4j日志框架中，将日志的可显示级别根据其重要程度（严重程度）由低到高分为：

- trace：跟踪信息
- debug：调试信息
- info：一般信息，通常不涉及关键流程和敏感数据
- warn：警告信息，通常代码可以运行，但不够完美，或不规范
- error：错误信息

在配置文件中，可以通过`logging.level.包名.类名`来设置当前类的日志显示级别，例如：

```yml
logging.level.cn.tedu.boot.demo.service.impl.AdminServiceImpl: info
```

当设置了显示的日志级别后，仅显示设置级别和更重要的级别的日志，例如，设置为`info`时，只显示`info`、`warn`、`error`，不会显示`debug`、`trace`级别的日志！

当输出日志时，通过`log`变量调用`trace()`方法输出的日志就是`trace`级别的，调用`debug()`方法输出的日志就是`debug()`级别的，以此类推，可调用的方法还有`info()`、`warn()`、`error()`。

**在开发实践中，关键数据和敏感数据都应该通过`trace()`或`debug()`进行输出，在开发环境中，可以将日志的显示级别设置为`trace`，则会显示所有日志，当需要交付到生产环境中时，只需要将日志的显示级别调整为`info`即可！**

默认情况下，日志的显示级别是`info`，所以，即使没有在配置文件中进行正确的配置，所有info、warn、error级别的日志都会输出显示。

在配置时，属性名称中的`logging.level`部分是必须的，在其后，必须写至少1级包名，例如：

```yml
logging.level.cn: trace
```

以上配置表示`cn`包及其子孙包下的所有类中的日志都按照`trace`级别进行显示！

在开发实践中，属性名称通常配置为`logging.level.项目根包`，例如：

```yml
logging.level.cn.tedu.boot.demo: trace
```

在使用Slf4j时，通过`log`调用的每种级别的方法都被重载了多次（各级别对应除了方法名称不同，重载的次数和参数列表均相同），推荐使用的方法是参数列表为`(String format, Object... arguments)`的，例如：

```java
public void trace(String format, Object... arguments);
public void debug(String format, Object... arguments);
public void info(String format, Object... arguments);
public void warn(String format, Object... arguments);
public void error(String format, Object... arguments);
```

以上方法中，第1个参数是将要输出的字符串的模式（模版），在此字符串中，如果需要包含某个变量值，则使用`{}`表示，如果有多个变量值，均是如此，然后，再通过第2个参数（是可变参数）依次表示各`{}`对应的值，例如：

```java
log.debug("加密前的密码：{}，加密后的密码：{}", password, encodedPassword);
```

使用这种做法，可以避免多变量时频繁的拼接字符串，另外，日志框架会将第1个参数进行缓存，以此提高后续每一次的执行效率。

在开发实践中，应该对程序执行关键位置添加日志的输出，通常包括：

- 每个方法的第1行有效语句，表示代码已经执行到此方法内，或此方法已经被成功调用
  - 如果方法是有参数的，还应该输出参数的值
- 关键数据或核心数据在改变之前和之后
  - 例如对密码加密时，应该通过日志输出加密前和加密后的密码
- 重要的操作执行之前
  - 例如尝试插入数据之前、修改数据之前，应该通过日志输出相关值
- 程序走到某些重要的分支时
  - 例如经过判断，走向抛出异常之前

其实，Slf4j日志框架只是日志的一种标准，并不是具体的实现（感觉上与Java中的接口有点相似），常见有具体实现了日志功能的框架有log4j、logback等，为了统一标准，所以才出现了Slf4j，同时，由于log4j、logback等框架实现功能并不统一，所以，Slf4j提供了对主流日志框架的兼容，在Spring Boot工程中，`spring-boot-starter`就已经依赖了`spring-boot-starter-logging`，而在此依赖下，通常包括Slf4j、具体的日志框架、Slf4j对具体日志框架的兼容。

## 控制器层开发

Spring MVC是用于处理控制器层开发的，在使用Spring Boot时，在`pom.xml`中添加`spring-boot-starter-web`即可整合Spring MVC框架及相关的常用依赖项（包含`jackson-databind`），可以将已存在的`spring-boot-starter`直接改为`spring-boot-starter-web`，因为在`spring-boot-starter-web`中已经包含了`spring-boot-starter`。

先在项目的根包下创建`controller`子包，并在此子包下创建`AdminController`，此类应该添加`@RestController`和`@RequestMapping(value = "/admins", produces = "application/json; charset=utf-8")`注解

由于已经决定了服务器端响应时，将响应JSON格式的字符串，为保证能够响应JSON格式的结果，处理请求的方法返回值应该是自定义的数据类型。

## Validation框架

当客户端向服务器提交请求时，如果请求数据出现明显的问题（例如关键数据为`null`、字符串的长度不在可接受范围内、其它格式错误），应该直接响应错误，而不是将明显错误的请求参数传递到Service！

> 关于判断错误，只有涉及数据库中的数据才能判断出结果的，都由Service进行判断，而基本的格式判断，都由Controller进行判断。

Validation框架是专门用于解决**检查数据基本格式有效性**的，最早并不是Spring系列的框架，目前，Spring Boot提供了更好的支持，所以，通常结合在一起使用。

在Spring Boot项目中，需要添加`spring-boot-starter-validation`依赖项，例如：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

在控制器中，首先，对需要检查数据格式的请求参数添加`@Valid`或`@Validated`注解（这2个注解没有区别），例如：

```java
@RequestMapping("/add-new")
public JsonResult<Void> addNew(@Validated AdminAddNewDTO adminAddNewDTO) {
    adminService.addNew(adminAddNewDTO);
    return JsonResult.ok();
}
```

真正需要检查的是`AdminAddNewDTO`中各属性的值，所以，接下来需要在此类的各属性上通过注解来配置检查的规则，例如：

```java
@Data
public class AdminAddNewDTO implements Serializable {

    @NotNull // 验证规则为：不允许为null
    private String username;
    
    // ===== 原有其它代码 =====
    
}
```

重启项目，通过不提交用户名的URL（例如：http://localhost:8080/admins/add-new）进行访问，在浏览器上会出现400错误页面，并且，在IntelliJ IDEA的控制台会出现以下警告：

```
2022-06-07 11:37:53.424  WARN 6404 --- [nio-8080-exec-8] .w.s.m.s.DefaultHandlerExceptionResolver : Resolved [
org.springframework.validation.BindException: 
org.springframework.validation.BeanPropertyBindingResult: 1 errors<EOL>Field error in object 'adminAddNewDTO' on field 'username': rejected value [null]; codes [NotNull.adminAddNewDTO.username,NotNull.username,NotNull.java.lang.String,NotNull]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [adminAddNewDTO.username,username]; arguments []; default message [username]]; default message [不能为null]]
```

从警告信息中可以看到，当验证失败时（不符合所使用的注解对应的规则时），会出现`org.springframework.validation.BindException`异常，则自行处理此异常即可！

如果有多个属性需要验证，则多个属性都需要添加注解，例如：

```java
@Data
public class AdminAddNewDTO implements Serializable {

    @NotNull
    private String username;

    @NotNull
    private String password;
    
    // ===== 原有其它代码 =====
    
}
```

首先，在`State`中添加新的枚举：

```java
public enum State {

    OK(200),
    ERR_USERNAME(201),
    ERR_PASSWORD(202),
    ERR_BAD_REQUEST(400), // 新增
    ERR_INSERT(500);
 
    // ===== 原有其它代码 =====
}
```

然后，在`GlobalExceptionHandler`中添加新的处理异常的方法：

```java
@ExceptionHandler(BindException.class)
public JsonResult<Void> handleBindException(BindException e) {
    return JsonResult.fail(State.ERR_BAD_REQUEST, e.getMessage());
}
```

完成后，再次重启项目，继续使用为`null`的用户名提交请求时，可以看到异常已经被处理，此时，响应的JSON数据例如：

```json
{
    "state":400,
    "message":"org.springframework.validation.BeanPropertyBindingResult: 2 errors\nField error in object 'adminAddNewDTO' on field 'username': rejected value [null]; codes [NotNull.adminAddNewDTO.username,NotNull.username,NotNull.java.lang.String,NotNull]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [adminAddNewDTO.username,username]; arguments []; default message [username]]; default message [不能为null]\nField error in object 'adminAddNewDTO' on field 'password': rejected value [null]; codes [NotNull.adminAddNewDTO.password,NotNull.password,NotNull.java.lang.String,NotNull]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [adminAddNewDTO.password,password]; arguments []; default message [password]]; default message [不能为null]"
}
```

关于错误提示信息，以上内容中出现了`不能为null`的字样，是默认的提示文本，可以通过`@NotNull`注解的`message`属性进行配置，例如：

```java
@Data
public class AdminAddNewDTO implements Serializable {

    @NotNull(message = "添加管理员失败，请提交用户名！")
    private String username;

    @NotNull(message = "添加管理员失败，请提交密码！")
    private String password;
    
    // ===== 原有其它代码 =====
    
}
```

然后，在处理异常时，通过异常信息获取自定义的提示文本：

```java
@ExceptionHandler(BindException.class)
public JsonResult<Void> handleBindException(BindException e) {
    BindingResult bindingResult = e.getBindingResult();
    String defaultMessage = bindingResult.getFieldError().getDefaultMessage();
    return JsonResult.fail(State.ERR_BAD_REQUEST, defaultMessage);
}
```

再次运行，在不提交用户名和密码的情况下，会随机的提示用户名或密码验证失败的提示文本中的某1条。

在Validation框架中，还有其它许多注解，用于进行不同格式的验证，例如：

- `@NotEmpty`：只能添加在`String`类型上，不许为空字符串，例如`""`即视为空字符串
- `@NotBlank`：只能添加在`String`类型上，不允许为空白，例如普通的空格可视为空白，使用TAB键输入的内容也是空白，（虽然不太可能在此处出现）换行产生的空白区域也是空白
- `@Size`：限制大小
- `@Min`：限制最小值
- `@Max`：限制最大值
- `@Range`：可以配置`min`和`max`属性，同时限制最小值和最大值
- `@Pattern`：只能添加在`String`类型上，自行指定正则表达式进行验证
- 其它

以上注解，包括`@NotNull`是允许叠加使用的，即允许在同一个参数属性上添加多个注解！

以上注解均可以配置`message`属性，用于指定验证失败的提示文本。

通常：

- 对于必须提交的属性，都会添加`@NotNull`
- 对于数值类型的，需要考虑是否添加`@Range`（则不需要使用`@Min`和`@Max`）
- 对于字符串类型，都添加`@Pattern`注解进行验证

## 解决跨域问题

在使用前后端分离的开发模式下，前端项目和后端项目可能是2个完全不同的项目，并且，各自己独立开发，独立部署，在这种做法中，如果前端直接向后端发送异步请求，默认情况下，在前端会出现类似以下错误：

```
Access to XMLHttpRequest at 'http://localhost:8080/admins/add-new' from origin 'http://localhost:8081' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

以上错误信息的关键字是`CORS`，通常称之为“跨域问题”。

在基于Spring MVC框架的项目中，当需要解决跨域问题时，需要一个Spring MVC的配置类（实现了`WebMvcConfigurer`接口的类），并重写其中的方法，以允许指定条件的跨域访问，例如：

```java
package cn.tedu.boot.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SpringMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }

}
```

## 关于客户端提交请求参数的格式

通常，客户端向服务器端发送请求时，请求参数可以有2种形式，第1种是直接通过`&`拼接各参数与值，例如：

```javascript
// FormData
// username=root&password=123456&nickname=jackson&phone=13800138001&email=jackson@baidu.com&description=none
let data = 'username=' + this.ruleForm.username
              + '&password=' + this.ruleForm.password
              + '&nickname=' + this.ruleForm.nickname
              + '&phone=' + this.ruleForm.phone
              + '&email=' + this.ruleForm.email
              + '&description=' + this.ruleForm.description;
```

第2种方式是使用JSON语法来组织各参数与值，例如：

```javascript
let data = {
    'username': this.ruleForm.username, // 'root'
    'password': this.ruleForm.password, // '123456'
    'nickname': this.ruleForm.nickname, // 'jackson'
    'phone': this.ruleForm.phone, // '13800138001'
    'email': this.ruleForm.email, // 'jackson@baidu.com'
    'description': this.ruleForm.description // 'none'
};
```

具体使用哪种做法，取决于服务器端的设计：

- 如果服务器端处理请求的方法中，在参数前添加了`@RequestBody`，则允许使用以上第2种做法（JSON数据）提交请求参数，不允许使用以上第1种做法（使用`&`拼接）
- 如果没有使用`@RequestBody`，则只能使用以上第1种做法