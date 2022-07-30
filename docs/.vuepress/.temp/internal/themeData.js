export const themeData = JSON.parse("{\"logo\":\"/images/JAVA.png\",\"logoDark\":\"/images/java-2.png\",\"repo\":\"/\",\"navbar\":[{\"text\":\"Java基础\",\"children\":[\"/Java基础/notes/基础知识.md\",\"/Java基础/notes/面向对象.md\",\"/Java基础/notes/IO流.md\",\"/Java基础/notes/String.md\",\"/Java基础/notes/异常处理机制.md\",\"/Java基础/notes/多线程.md\",\"/Java基础/notes/反射机制.md\"]},{\"text\":\"Web&HTTP\",\"children\":[\"/Web&HTTP/notes/前端基础.md\",\"/Web&HTTP/notes/HTTP.md\"]},{\"text\":\"数据库\",\"children\":[\"/数据库/notes/数据库基础.md\",\"/数据库/notes/数据库进阶.md\",\"/数据库/notes/复杂SQL语句.md\",\"/数据库/notes/Redis.md\"]},{\"text\":\"框架\",\"children\":[\"/SSM/notes/Spring-IOC.md\",\"/SSM/notes/Spring-AOP.md\",\"/SSM/notes/Spring-Test.md\",\"/SSM/notes/SpringBoot.md\",\"/SSM/notes/SpringMVC.md\",\"/SSM/notes/MyBatis.md\",\"/SSM/notes/基于MyBatis的分页查询.md\",\"/SSM/notes/SpringSecurity.md\"]},{\"text\":\"微服务\",\"children\":[\"/微服务/notes/微服务概念.md\",\"/微服务/notes/Nacos.md\",\"/微服务/notes/Dubbo.md\",\"/微服务/notes/Seata.md\",\"/微服务/notes/Sentinel.md\",\"/微服务/notes/SpringGateway网关.md\",\"/微服务/notes/ELK.md\",\"/微服务/notes/Quartz.md\",\"/微服务/notes/消息队列.md\"]},{\"text\":\"数据结构与算法\",\"children\":[\"/数据结构与算法/notes/数据结构.md\",\"/数据结构与算法/notes/算法.md\"]},{\"text\":\"其他\",\"children\":[\"/其他/notes/docker.md\",\"/其他/notes/面试题.md\",\"/其他/notes/各类工具、开发文档、常用下载.md\"]}],\"sidebar\":\"auto\",\"editLink\":true,\"editLinkText\":\"编辑此页\",\"collapsible\":true,\"lastUpdated\":true,\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebarDepth\":2,\"lastUpdatedText\":\"Last Updated\",\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
