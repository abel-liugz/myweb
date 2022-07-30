---
title: MyBatis
---

# MyBatis

> Mybatis的主要作用是快速实现对关系型数据库中的数据进行访问的框架。

## 创建整合了Spring与Mybatis的工程

Mybatis可以不依赖于Spring等框架直接使用的，但是，就需要进行大量的配置，前期配置工作量较大，基于Spring框架目前是业内使用的标准之一，所以，通常会整合Spring与Mybatis，以减少配置。

在创建工程时，创建普通的Maven工程即可（不需要选择特定的骨架）。

在`pom.xml`中，需要添加几个依赖项，分别是：

Mybatis的依赖项：`mybatis`

```xml
<!-- https://mvnrepository.com/artifact/org.mybatis/mybatis -->
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.6</version>
</dependency>
```

Mybatis整合Spring的依赖项：`mybatis-spring`

```xml
<!-- https://mvnrepository.com/artifact/org.mybatis/mybatis-spring -->
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis-spring</artifactId>
    <version>2.0.6</version>
</dependency>
```

Spring的依赖项：`spring-context`

```xml
<!-- https://mvnrepository.com/artifact/org.springframework/spring-context -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.3.14</version>
</dependency>
```

Spring JDBC的依赖项：`spring-jdbc`

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>5.3.14</version>
</dependency>
```

MySQL连接的依赖项：`mysql-connector-java`

```xml
<!-- https://mvnrepository.com/artifact/mysql/mysql-connector-java -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.21</version>
</dependency>
```

数据库连接池的依赖项：`commons-dbcp2`

```xml
<!-- https://mvnrepository.com/artifact/org.apache.commons/commons-dbcp2 -->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-dbcp2</artifactId>
    <version>2.8.0</version>
</dependency>
```

JUnit测试的依赖项：`junit-jupiter-api`

```xml
<!-- https://mvnrepository.com/artifact/org.junit.jupiter/junit-jupiter-api -->
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter-api</artifactId>
    <version>5.7.0</version>
    <scope>test</scope>
</dependency>
```

## Mybatis的基本使用

当使用Mybatis实现数据访问时，主要：

- 编写数据访问的抽象方法
- 配置抽象方法对应的SQL语句

关于抽象方法：

- 必须定义在某个接口中，这样的接口通常使用`Mapper`作为名称的后缀，例如`AdminMapper`
  - Mybatis框架底层将通过接口代理模式来实现
- 方法的返回值类型：如果要执行的数据操作是增、删、改类型的，统一使用`int`作为返回值类型，表示“受影响的行数”，也可以使用`void`，但是不推荐；如果要执行的是查询操作，返回值类型只需要能够装载所需的数据即可
- 方法的名称：自定义，不要重载，建议风格如下：
  - 插入数据使用`insert`作为方法名称中的前缀或关键字
  - 删除数据使用`delete`作为方法名称中的前缀或关键字
  - 更新数据使用`update`作为方法名称中的前缀或关键字
  - 查询数据时：
    - 如果是统计，使用`count`作为方法名称中的前缀或关键字
    - 如果是单个数据，使用`get`或`find`作为方法名称中的前缀或关键字
    - 如果是列表，使用`list`作为方法名称中的前缀或关键字
  - 如果操作数据时有条件，可在以上前缀或关键字右侧添加`by字段名`，例如`deleteById`
- 方法的参数列表：取决于需要执行的SQL语句中有哪些参数，如果有多个参数，可将这些参数封装到同一个类型中，使用封装的类型作为方法的参数类型

所有用于Mybatis处理数据的接口都必须被Mybatis识别，有2种做法：

- 在每个接口上添加`@Mapper`注解
- 推荐：在配置类上添加`@MapperScan`注解，指定接口所在的根包

## 动态SQL -- foreach

Mybatis中的动态SQL表现为：根据参数不同，生成不同的SQL语句

目标：根据若干个id一次性删除若干条管理数据

要实现此目标，需要执行的SQL语句大致是：

```mysql
delete from ams_admin where id in (?,?)
```

以上SQL语句中，id值的数量（以上`?`的数量）对于开发人员而言是未知的！

然后，在`AdminMapper`接口中添加抽象方法：

```java
int deleteByIds(Long... ids);
```

或

```java
int deleteByIds(Long[] ids);
```

或

```java
int deleteByIds(List<Long> ids);
```

接下来，在`AdminMapper.xml`中配置以上抽象方法映射的SQL语句：

```xml
<!-- int deleteByIds(List<Long> ids); -->
<delete id="deleteByIds">
    delete from ams_admin where id in (
    	<foreach collection="list" item="id" separator=",">
          #{id}
    	</foreach>
    )
</delete>
```

以上代码中：

- `<foreach>`标签：用于遍历集合或数组类型的参数对象
- `collection`属性：被遍历的参数对象，当抽象方法的参数只有1个且没有添加`@Param`注解时，如果参数是`List`类型则此属性值为`list`，如果参数是数组类型（包括可变参数）则此属性值为`array`；当抽象方法的参数有多个或添加了`@Param`注解时，则此属性值为`@Param`注解中配置的值
- `item`属性：自定义的名称，表示遍历过程中每个元素的变量名，可在`<foreach>`子级使用`#{变量名}`表示数据
- `separator`属性：分隔符号，会自动添加在遍历到的各元素之间

最后，编写并执行测试：

```java
@Test
public void testDeleteByIds() {
    AnnotationConfigApplicationContext ac
            = new AnnotationConfigApplicationContext(SpringConfig.class);

    AdminMapper adminMapper = ac.getBean(AdminMapper.class);

    List<Long> ids = new ArrayList<>();
    ids.add(16L);
    ids.add(18L);
    ids.add(19L);
    int rows = adminMapper.deleteByIds(ids);
    System.out.println("受影响的行数为：" + rows);

    ac.close();
}
```



## 关于@sql注解

当添加了`spring-test`依赖后，可以在测试时使用`@Sql`注解，以加载某些`.sql`脚本，使得测试之前或之后将执行这些脚本！

使用此注解主要是为了保障可以反复测试，并且得到预期的结果！例如执行删除的测试时，假设数据是存在的，第1次删除可以成功，但是在这之后的测试将不会成功，因为数据在第1次测试时就已经被删除！则可以编写一个`.sql`脚本，通过脚本向数据表中插入数据，并在每次测试之前执行此脚本，即可保证每次测试都是成功的！

此注解可以添加在测试类上，则对当前测试类的每个测试方法都是有效的。

此注解也可以添加在测试方法上，则只对当前测试方法是有效的。

如果测试类和测试方法上都添加了此注解，则仅测试方法上的注解会生效。

此注解除了配置需要执行的`.sql`脚本以外，还可以通过`executionPhase`属性配置其执行阶段，例如取值为`Sql.ExecutionPhase.AFTER_TEST_METHOD`时将使得`.sql`脚本会在测试方法之后被执行。

每个测试方法可以添加多个`@Sql`注解。



## 关于RBAC

**RBAC** = **R**ole **B**ased **A**ccess **C**ontrol（基于角色的访问控制）

RBAC是经典的用户权限管理的设计思路。在这样的设计中，会存在3种类型：用户、角色、权限，权限将分配到各种角色上，用户可以关联某种角色，进而实现用户与权限相关。使用这样的设计，更加利于统一管理若干个用户的权限。

在RBAC的设计思路中，用户与角色一般是多对多的关系，而在数据库中，仅仅只是使用“用户”和“角色”这2张表是不利于维护多对多关系的，通常会增加一张中间表，专门记录对应关系，同理，角色和权限也是多对多的关系，也需要使用中间表来记录对应关系！



## Mybatis的缓存机制

缓存：通常是一个临时存储的数据，在未来的某个时间点可能会被删除，通常，存储缓存数据的位置通常是读写效率较高的，相比其它“非缓存”的数据有更高的处理效率。由于缓存的数据通常并不是必须的，则需要额外消耗一定的存储空间，同时由于从缓存获取数据的效率更高，所以是一种牺牲空间、换取时间的做法！另外，你必须知道，从数据库读取数据的效率是非常低下的！

Mybatis有2种缓存机制，分别称之一级缓存和二级缓存，其中，一级缓存是基于`SqlSession`的缓存，也称之为“会话缓存”，仅当是同一个会话、同一个Mapper、同一个抽象方法（同一个SQL语句）、同样的参数值时有效，一级缓存在集成框架的应用中默认是开启的，且整个过程不由人为控制（如果是自行得到`SqlSession`后的操作，可自行清理一级缓存），另外，二级缓存默认是全局开启的，它是基于namespace的，所以也称之为“namespace缓存”，需要在配置SQL语句的XML中添加`<cache />`节点，以表示当前XML中的所有查询都允许开通二级缓存，并且，在`<select>`节点上配置`useCache="true"`，则对应的`<select>`节点的查询结果将被二级缓存处理，并且，此查询返回的结果的类型必须是实现了`Serializable`接口的，如果使用了`<resultMap>`配置如何封装查询结果，则必须使用`<id>`节点来封装主键的映射，满足以上条件后，二级缓存将可用，只要是当前namespace中查询出来的结果，都会根据所执行的SQL语句及参数进行结果的缓存。无论是一级缓存还是二级缓存，只要数据发生了写操作（增、删、改），缓存数据都将被自动清理。

由于Mybatis的缓存清理机制过于死板，所以，一般在开发实践中并不怎么使用！更多的是使用其它的缓存工具并自行制定缓存策略。