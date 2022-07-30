<template><div><h1 id="docker-简介" tabindex="-1"><a class="header-anchor" href="#docker-简介" aria-hidden="true">#</a> Docker 简介</h1>
<h2 id="linux简介" tabindex="-1"><a class="header-anchor" href="#linux简介" aria-hidden="true">#</a> Linux简介</h2>
<p>Linux和windows一样,都是操作系统</p>
<p>只不过windows更易用,适合家庭和非编程人员使用</p>
<p>如果用作服务器,尤其是java项目的服务器,Linux会更加合适</p>
<p>Linux有更全面的权限系统,更安全,更稳定,速度也更快</p>
<p>原生Linux功能较少,有很多功能都不具备,使用起来不方便</p>
<p>所以市面上出现很多Linux的加强版,对Linux进行了一些加强,或默认安装了很多工具</p>
<p>例如</p>
<p>CentOS</p>
<p>ubuntu</p>
<p>RockyLinux</p>
<p>RedHatLinux</p>
<p>等</p>
<p>甚至有的Linux系统都配置了类似windows系统的桌面界面</p>
<h2 id="什么是docker" tabindex="-1"><a class="header-anchor" href="#什么是docker" aria-hidden="true">#</a> 什么是Docker</h2>
<p>我们要学习在Linux(RockyLinux)中安装使用Docker来配置软件的功能</p>
<p>Docker是一个用来开发、运输和运行应用程序的开放平台。使用Docker可以将应用程序与基础结构分离，以便快速交付软件。使用Docker，您可以以管理应用程序的方式管理基础架构。通过利用Docker的方法快速传送、测试和部署代码，可以显著减少编写代码和在生产中运行代码之间的延迟。</p>
<p>![docker.png](/docker.png =500x)</p>
<h2 id="为什么使用docker" tabindex="-1"><a class="header-anchor" href="#为什么使用docker" aria-hidden="true">#</a> 为什么使用Docker</h2>
<ul>
<li>更快速的应用交付和部署：</li>
</ul>
<p>传统的应用开发完成后，需要提供一堆安装程序和配置说明文档，安装部署后需根据配置文档进行繁杂的配置才能正常运行。Docker化之后只需要交付少量容器镜像文件，在正式生产环境加载镜像并运行即可，应用安装配置在镜像里已经内置好，大大节省部署配置和测试验证时间。</p>
<ul>
<li>更便捷的升级和扩缩容：</li>
</ul>
<p>随着微服务架构和Docker的发展，大量的应用会通过微服务方式架构，应用的开发构建将变成搭乐高积木一样，每个Docker容器将变成一块“积木”，应用的升级将变得非常容易。当现有的容器不足以支撑业务处理时，可通过镜像运行新的容器进行快速扩容，使应用系统的扩容从原先的天级变成分钟级甚至秒级。</p>
<ul>
<li>更简单的系统运维：</li>
</ul>
<p>应用容器化运行后，生产环境运行的应用可与开发、测试环境的应用高度一致，容器会将应用程序相关的环境和状态完全封装起来，不会因为底层基础架构和操作系统的不一致性给应用带来影响，产生新的BUG。当出现程序异常时，也可以通过测试环境的相同容器进行快速定位和修复。</p>
<ul>
<li>更高效的计算资源利用：</li>
</ul>
<p>Docker是内核级虚拟化，其不像传统的虚拟化技术一样需要额外的Hypervisor [管理程序] 支持，所以在一台物理机上可以运行很多个容器实例，可大大提升物理服务器的CPU和内存的利用率。</p>
<p><strong>Docker运行架构图</strong></p>
<p><img src="/docker运行架构图.png" alt="docker运行架构图.png"></p>
<h2 id="docker相关资料" tabindex="-1"><a class="header-anchor" href="#docker相关资料" aria-hidden="true">#</a> Docker相关资料</h2>
<p>Docker官网：http://www.docker.com</p>
<p>Docker Hub官网（镜像仓库）：https://hub.docker.com</p>
<p>所有步骤，均参考官方文档：https://docs.docker.com/engine/install/centos/</p>
<h2 id="安装docker" tabindex="-1"><a class="header-anchor" href="#安装docker" aria-hidden="true">#</a> 安装Docker</h2>
<p>官方网站提供的3种安装方式</p>
<ul>
<li>设置docker仓库，并且从仓库安装所需内容。</li>
<li>下载RPM安装包，手动更新安装。</li>
<li>为测试和开发环境使用自定义脚本安装。</li>
</ul>
<p>三种方式中第一种,从docker仓库中安装是比较简单的</p>
<p>这种方式需要当前虚拟机有网络环境</p>
<p>确定具备网络环境再运行下面命令</p>
<p>RockyLinux支持使用yum命令安装各种程序</p>
<blockquote>
<p>yum命令安装程序类似手机中的应用商店一样</p>
</blockquote>
<p>先安装yum-utils包,实现更方便的安装&quot;应用商店&quot;中提供的程序</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>yum install -y yum-utils
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>指定docker仓库路径</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>阿里仓库路径</p>
<p>http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo</p>
<p>执行安装Docker</p>
<p>也是使用yum命令</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>yum -y install docker-ce docker-ce-cli containerd.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>下载和安装需要一些时间,如果下载慢,配置上面的阿里Docker仓库地址</p>
<p>运行完成后,当前Linux系统就安装好的Docker</p>
<p>我们需要输入启动Docker的命令,真正让Docker运作起来</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>systemctl start docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="测试docker" tabindex="-1"><a class="header-anchor" href="#测试docker" aria-hidden="true">#</a> 测试Docker</h2>
<p>为了保证我们Docker运行的正常</p>
<p>Docker提供了一个专门测试Docker功能的镜像</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run hello-world
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>运行可能需要较短时间</p>
<p>运行结果中出现如下内容,表示一切正常</p>
<blockquote>
<p>Hello from Docker!
This message shows that your installation appears to be working correctly.</p>
</blockquote>
<h2 id="docker名词解释" tabindex="-1"><a class="header-anchor" href="#docker名词解释" aria-hidden="true">#</a> docker名词解释</h2>
<ul>
<li>容器（container）</li>
</ul>
<p>首先需要了解什么是容器，容器就是一个进程，内部是独立运行的一个或者是一组应用。它可以被启动、开始、停止、删除。每个容器都是相互隔离的，保证安全的平台。</p>
<ul>
<li>镜像（image）</li>
</ul>
<p>镜像（Image）就是一个只读的模板文件。镜像可以用来创建 Docker 容器，一个镜像可以创建很多容器。 就好似 Java 中的 类和对象，类就是镜像，容器就是对象！也可以把镜像看成是模具，而镜像创建出来的容器就是通过这个模具创建的一个一个的实际产品。</p>
<ul>
<li>宿主机（host）</li>
</ul>
<p>宿主机就是我们调用命令使用镜像创建容器的服务器。</p>
<ul>
<li>镜像仓库（repository）</li>
</ul>
<p>一个用来容纳多个镜像的仓库，可以链接仓库获取你想要的内部镜像，一般一个镜像仓库中包含多个不同tag的镜像。</p>
<ul>
<li>镜像服务器（registry）</li>
</ul>
<p>镜像仓库占用的服务器，这里注意一个镜像服务器未必只有一个仓库，可以有很多仓库，每个仓库又保管的是不同镜像。</p>
<ul>
<li>客户端（docker-client）</li>
</ul>
<p>调用docker命令，操作镜像，容器的进程。只要能链接宿主机，操作docker的进程都是docker-client。</p>
<h1 id="docker基础命令" tabindex="-1"><a class="header-anchor" href="#docker基础命令" aria-hidden="true">#</a> Docker基础命令</h1>
<h2 id="docker命令格式" tabindex="-1"><a class="header-anchor" href="#docker命令格式" aria-hidden="true">#</a> Docker命令格式</h2>
<p>Docker命令的语法结构</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker 子命令 [选项]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>docker都有哪些子命令呢,我们可以使用docker的helper子命令查看</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker --help
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果想查询具体的子命令的使用方式</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker 子命令 --help
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们最常用的子命令之一:启动docker容器的run的相关帮助可以</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run --help
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当然也可以查询官方文档或百度了解更多内容</p>
<p>https://docs.docker.com/reference/</p>
<h2 id="images命令" tabindex="-1"><a class="header-anchor" href="#images命令" aria-hidden="true">#</a> images命令</h2>
<p>docker images命令主要能够完成查看当前本地镜像仓库的功能</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker images
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个命令的返回结果显示：</p>
<ul>
<li>REPOSITORY:镜像仓库名，也叫作镜像名。</li>
<li>TAG：标签，常用版本号标识仓库，如果是latest就是最新版本。</li>
<li>IMAGE ID：镜像id。</li>
<li>CREATED:创建镜像时间。</li>
<li>SIZE:大小。</li>
</ul>
<p>docker images命令的常用选项如下</p>
<ul>
<li>-a: 显示所有信息</li>
<li>-q: 只显示镜像id,在镜像较多的时候比较常用</li>
</ul>
<h2 id="search命令" tabindex="-1"><a class="header-anchor" href="#search命令" aria-hidden="true">#</a> search命令</h2>
<p>在拉取镜像之前,我们要先明确正确的镜像名称</p>
<p>我们可以输入查询关键字,对镜像仓库进行搜索</p>
<p>search命令,可以搜索当前系统绑定的远程镜像服务器中的内容</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker search mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个命令的返回结果显示：</p>
<ul>
<li>NAME:镜像名称。</li>
<li>DESCRIPTION:镜像描述。</li>
<li>STARS：镜像星级，越高表示越热，使用人越多。</li>
<li>OFFICIAL:是否官方镜像。</li>
<li>AUTOMATED：是否支持自动化部署。</li>
</ul>
<h2 id="pull命令" tabindex="-1"><a class="header-anchor" href="#pull命令" aria-hidden="true">#</a> pull命令</h2>
<p>根据我们上面搜索得到的结果</p>
<p>确认关键字之后</p>
<p>我们就可以使用pull命令将我们查询出的软件拉取到本地仓库了</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker pull [镜像名称]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker pull mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>默认下载最新版本</p>
<p>如果要指定版本号可以在名称后指定</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker pull mysql:5.7.35
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>至于要指定的版本号有什么</p>
<p>可以在相关的官方网站查询</p>
<h2 id="rmi命令" tabindex="-1"><a class="header-anchor" href="#rmi命令" aria-hidden="true">#</a> rmi命令</h2>
<p>删除本地镜像的命令</p>
<p>一般当本地镜像较多,过多的占用空间时,可以删除一些不会再使用的镜像文件,节省空间</p>
<p>删除镜像需要明确镜像的id,所以一般都会配置docker images使用</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker rmi feb5d9fea6a5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果当前要删除的镜像有实例正在运行,使用上面命令删除会有报错</p>
<p>意思就是正在使用的镜像无法删除</p>
<p>我们如果需要强制将当前镜像删除,并同时停止这个服务的话,就需要加-f选项</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker rmi feb5d9fea6a5 -f
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>rmi命令的选项：</p>
<ul>
<li>-f:强制删除这个镜像，无论是否正在使用。</li>
</ul>
<h2 id="run命令" tabindex="-1"><a class="header-anchor" href="#run命令" aria-hidden="true">#</a> run命令</h2>
<p>docker run命令,可以指定当前本地镜像文件启动,</p>
<p>启动镜像文件会在Docker中生成新的容器,容器中来运行镜像中包含的软件</p>
<p>docker run的命令,选项比较多,例如设置端口号,设置运行模式,调整运行参数,运行位置等</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run --name mysql -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -v /root/data:/var/lib/mysql mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>1: --name mysql:该容器启动后的名字：（自定义命名）如果没有设置，系统会自动设置一个，毕竟如果开启太多的容器，记不住就很尴尬，建议加上见名知意。</p>
<p>2：-d 代表后台启动该服务</p>
<p>3：-p 3306(这是liunx的端口号，我习惯说成宿主机，如果我们想要远程服务的话，访问的端口就是这个端口):3306（docker容器的端口，每一个容器都是独立的，可理解成操作系统层面的系统），访问这个端口就是先通过远程访问宿主机的端口，再映射到docker容器的端口访问mysql。</p>
<p>4：-e MYSQL_ROOT_PASSWORD=123456  这是说mysql启动需要的开机密码，默认的账号是root ，密码就是上面设置的：123456</p>
<p>5：-v  /root/data:/var/lib/mysql  /root/data/:这是宿主机的数据存放路径（你也可以自定义），   /var/lib/mysql:这是mysql容器存放数据的地方。也是为了同步数据，防止，容器被删除以后，数据就不存在了。</p>
<p>6：启动成功后就返回一个容器ID</p>
<p>启动之后,我们就可以使用数据库连接工具访问数据库了</p>
<h2 id="ps命令" tabindex="-1"><a class="header-anchor" href="#ps命令" aria-hidden="true">#</a> ps命令</h2>
<p>docker ps</p>
<p>可以查看当前docker中运行的所有容器的状态</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker ps
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>container id：容器id，很多操作容器命令都需要用到的参数。</li>
<li>image：容器创建使用的镜像。</li>
<li>command：容器中在运行的进程或者命令。</li>
<li>created：创建时间。</li>
<li>status：容器状态。</li>
<li>ports：容器的端口映射情况，这里没有用到端口。</li>
<li>names：容器的名字，启动没有指定--name选项，会默认使用一个名字。</li>
</ul>
<p><strong>ps命令中常见的选项如下：</strong></p>
<ul>
<li>-a：显示所有容器，如果不加只显示正在启动运行的容器，停止的不会显示。</li>
<li>-l：显示最近的启动创建的容器。</li>
<li>-n=[数字]：显示最近n个容器。</li>
<li>-q：只显示容器id。经常和-a一起使用，获得当前宿主机所有容器id参数集合。</li>
</ul>
<h2 id="stop-rm命令" tabindex="-1"><a class="header-anchor" href="#stop-rm命令" aria-hidden="true">#</a> stop\rm命令</h2>
<p>docker stop 可以停止正在运行的容器</p>
<p>stop只是停止容器.并不会删除容器</p>
<p>如果想删除容器需要使用rm命令</p>
<p>注意:<strong>这里rm删除的是容器,不是本地镜像,和rmi命令要区分</strong></p>
<p>首先使用docker ps命令查询所有正在运行的容器</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker stop [容器id]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker rm [容器id]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>rm的选项有：</p>
<p>-f:强制删除容器，无论是否运行，如果不加，运行的容器无法删除。</p>
<p>课堂作业 自己用docker安装运行一个redis</p>
<p>建议从search开始</p>
<p>自己搜docker启动Redis的命令</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run -itd --name redis-test -p 6379:6379 redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker exec -it redis-test redis-cli
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="关闭防火墙" tabindex="-1"><a class="header-anchor" href="#关闭防火墙" aria-hidden="true">#</a> 关闭防火墙</h2>
<p>如果当前windows系统要连接Linux中的资源</p>
<p>一般都要关闭Linux的防火墙</p>
<p>实际开发中,不会彻底关闭防火墙,而是开发指定的端口号</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>systemctl stop firewalld
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>system系统</p>
<p>ctl:control:控制</p>
</div></template>
