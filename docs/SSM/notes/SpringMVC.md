---
title: SpringMVC
---

# SpringMVC

- Spring MVC是基于Spring框架基础上的，主要解决了后端服务器接受客户端提交的请求，并给予响应的相关问题

- MVC分别是：

  - Model：数据模型，通常是由业务逻辑层（Service Layer）和数据访问层（Data Access Object Layer）共同构成
  - View：视图
  - Controller：控制器

- Spring MVC框架只关心V-C之间的交互，与M其实没有任何关系

- Spring MVC的核心执行流程图如下：
  ![springmvc.png](/images/springmvc.png)

## 五大组件

  ~~~java
DispatcherServlet -- 前端控制器
HandlerMapping  -- 处理映射器
Controller
ModelAndView  -- 视图数据模型
ViewResolver  -- 视图解析器
  ~~~

### @RequestMapping注解

- 主要作用是配置请求路径与处理请求的方法的映射关系，可以将此注解添加在控制器中某个方法之前

- 除了方法之前，此注解还可以添加在控制器类之前

- 在类上添加了此注解并配置路径后，每个方法实际映射到的请求路径都是“类上的配置的路径+方法上的配置的路径”

- 通常，在开发实践中，推荐为每个控制器类都配置此注解，以指定某个URL前缀

- 在使用该注解配置路径时，无意义的/会被忽略，必要的/会被补充

- 在开发实践中，应该保持统一风格，例如：无论在类上，还是在方法上，配置的请求路径均以/作为第一个字符（某些特殊的URL配置例外）

- 在@RequestMapping还可以配置：

  - method：请求方式

    > 如果没有配置method属性，则表示可以使用任何请求方式，包括：GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS,TRACE

  - headers：请求头

  - params：请求参数

  - consumes：请求文档类型

  - produces：响应文档类型



### @响应正文

- @ResponseBody注解表示：响应正文
- 一单配置为“响应正文”，则处理请求的方法的返回值就会直接响应到客户端去
- 如果没有配置为“响应正文”，则处理请求的方法的返回值表示“视图组件的名称”，当方法返回后，服务器并不会直接响应，而是根据“视图组件的名称”在服务器端找到对应的视图组件，并处理，最后，将处理后的视图响应到客户端去，但这不是前后端分离的做法
- @ResponseBody注解可以添加在方法上，则仅作用于当前方法，也可以添加在类上，则作用于当前类的所有方法
- 在Spring MVC框架中，还提供了@RestController注解，它同时具有@Controller和@ResponseBody注解的效果，所以，在响应正文的控制器上，只需要使用@RestController即可
- Spring MVC内置了一系列的转换器（Converter），用于将方法的返回值转换为响应到客户端的数据（并补充其他必要数据），并且，Spring MVC会根据方法的返回值不用，自动选取某个转换去，例如，当方法的返回值是String时，会自动使用StringHttpMessageConverter，这个转换器的特点就是直接将方法返回的字符串作为响应的正文，并且，在许多版本的SpringMVC框架中，其默认的响应文档的字符集是ISO-8859-1，所以在许多版本的SpringMVC中响应String正文时默认不支持非ASCII字符（例如中文）

#### 响应JSON格式的正文

- 当需要响应JSON格式的正文时
  - 添加jackson-databind依赖
  - 在Spring MVC配置类上添加@EnableWebMvc注解
  - 自定义类，作为处理请求的方法的返回值类型
    - 类的属性必须添加Setter & Getter
  - 使得处理请求的方法是响应正文的



### 请求参数

- 可以将请求参数一个个的声明为处理请求方法的参数，也可以将多个参数封装到一个自定义类中，使用自定义类作为处理请求的方法的参数，Spring MVC框架会自动接受客户端提交的请求参数，并用于调用编写好的额处理请求的方法

  > 在大部分情况下，推荐使用将参数封装到自定义类的做法

- 需要保证非String类型的参数是Spring框架可以成功自动转换类型的，或者，对转换失败有进一步的处理，或可以接受转换失败带来的后果



### 统一处理异常

- Spring MVC框架提供了统一处理异常的机制，使得特定种类的异常对应一段特定的代码，后续，当编写代码时，无论在任何位置，都可以将异常直接抛出，有统一处理异常的代码进行处理
- 统一处理异常，需要自定义方法对异常进行处理，关于此方法：
  - 必须添加@ExceptionHandler注解
  - 访问权限：应该是公有的
  - 返回值类型：可以参考处理请求的方法的返回值类型
  - 方法名称：自定义
  - 参数列表：必须包含一个异常类型的参数，并且可以按需添加HttpServletRequest、HttpServletResponse等少量特定的类型的参数，不可以随意添加参数
  - 将处理异常的代码放在专门的类中
  - 在此类上添加@ControllerAdvice注解
    - 由于目前主流的响应方式都是“响应正文”的，则可以将@ControllerAdvice替换为@RestControllerAdvice



### 拦截器（Interceptor）

- 在Spring MVC框架中，拦截器是可以运行在所有控制器处理请求之前和之后的一种组件，并且如果拦截器运行在控制器处理请求之前，还可以选择对当前请求进行阻止或放行。

- 注意：拦截器的目的并不是“拦截下来后阻止运行”，更多的是“拦截下 来后执行某些代码”，其优势在于可作用于若干种不同请求的处理过程， 即写一个拦截器，就可以在很多种请求的处理过程中被执行。

- 只要是若干种不同的请求过程中都需要执行同样的或高度相似的代码，都 可以使用拦截器解决，典型的例如验证用户是否已经登录等等。

- 需要使用拦截器时，需要自定义类，实现HandlerInterceptor接口，例如

  ~~~java
  public class LoginInterceptor implements HandlerInterceptor {
    @Override public boolean preHandle(
      HttpServletRequest request, HttpServletResponse response, Object handler
    ) throws Exception {
      System.out.println("LoginInterceptor.preHandle()");
      return false;
    }
    @Override
    public void postHandle(
      HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView
    ) throws Exception {
      System.out.println("LoginInterceptor.postHandle()"); 
    }
    @Override public void afterCompletion(
      HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex
    ) throws Exception {
      System.out.println("LoginInterceptor.afterCompletion()"); 
    } 
  }
  ~~~

- 每个拦截器都必须注册才会被启用，注册过程通过重写 WebMvcConfigure接口中的addInterceptors()方法即可，例如：

  ~~~java
  @Configuration // 此注解不是必须的
  @EnableWebMvc
  @ComponentScan("cn.tedu.springmvc") // 必须配置在当前配置类，不可配置在Spring的配置类
  public class SpringMvcConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) { 
      registry.addInterceptor(new LoginInterceptor())
              .addPathPatterns("/user/login.do"); 
    } 
  }
  ~~~

  