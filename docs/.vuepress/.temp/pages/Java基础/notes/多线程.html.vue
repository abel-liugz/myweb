<template><div><h1 id="多线程" tabindex="-1"><a class="header-anchor" href="#多线程" aria-hidden="true">#</a> 多线程</h1>
<blockquote>
<p>线程：一个顺序的单一的程序执行流程就是一个程序。</p>
<p>多线程：多个单一顺序执行的流程并发运行</p>
</blockquote>
<ul>
<li>并发：
<ul>
<li>多个线程实际运行是走走停停的。线程调度程序会将CPU运行时间划分为若干个时间片段并尽可能均匀的分配给每个线程，拿到时间片的线程被CPU执行这段时间。当超时后线程调度程序会再次分配一个时间片段给一个线程使得CPU执行它。如此反复。由于CPU执行时间在纳秒级别，我们感觉不到切换线程运行的过程。所以微观上走走停停，宏观上感觉一起运行的现象成为并发运行!</li>
</ul>
</li>
<li>用途：
<ul>
<li>当出现多个代码片段执行顺序有冲突时，希望它们各干各的时就应当放在不同的线程上</li>
<li>一个线程可以运行，但是多个线程可以更快是，也已使用多线程运行</li>
</ul>
</li>
</ul>
<h2 id="线程的生命周期" tabindex="-1"><a class="header-anchor" href="#线程的生命周期" aria-hidden="true">#</a> 线程的生命周期：</h2>
<ul>
<li>new</li>
<li>runnable</li>
<li>running</li>
<li>block</li>
<li>dead</li>
</ul>
<h2 id="创建线程的三种方式" tabindex="-1"><a class="header-anchor" href="#创建线程的三种方式" aria-hidden="true">#</a> 创建线程的三种方式</h2>
<ul>
<li>继承Thread并重写run方法
<ul>
<li>优点：结构简单，便于匿名内部类形式创建</li>
<li>缺点：
<ul>
<li>直接继承线程，会导致不能在继承其他类去复用发放</li>
<li>定义线程的同时重写了run方法，会导致线程与线程任务绑定在了一起，不利于线程的重用</li>
</ul>
</li>
</ul>
</li>
<li>实现Runnale接口单独定义线程任务</li>
<li>匿名内部类形式的线程创建</li>
</ul>
<h2 id="线程api" tabindex="-1"><a class="header-anchor" href="#线程api" aria-hidden="true">#</a> 线程API</h2>
<ul>
<li>currentThread()：获取运行这个方法的线程</li>
<li>getName()：获取线程的名字</li>
<li>getId()：获取该线程的唯一标识</li>
<li>getPriority()：获取该线程的优先级</li>
<li>isAlive()：该线程是否活着</li>
<li>isDaemon()：是否守护线程</li>
<li>isInterrupted()：是否被中断</li>
<li>static void sleep(long ms)：使该线程进入阻塞状态指定的毫秒，超时后自动回到RUNNABLE状态</li>
<li>static void yield()：让执行该放阿飞的线程主动放弃本次时间片</li>
</ul>
<h3 id="线程优先级" tabindex="-1"><a class="header-anchor" href="#线程优先级" aria-hidden="true">#</a> 线程优先级</h3>
<p>线程start后会纳入到线程调度器中统一管理，线程只能被动的被分配时间片并发运行，而无法主动索取时间片，线程调度器尽可能均匀的酱时间片分配给每个线程</p>
<p>线程有10个优先级，1-10表示</p>
<ul>
<li>1为最小优先级，10为最大优先级，5为默认值</li>
<li>调整线程的优先级可以最大成都的干涉获取时间片的几率，优先级越高的线程获取时间片的次数越多，反之则越少</li>
</ul>
<h3 id="sleep阻塞" tabindex="-1"><a class="header-anchor" href="#sleep阻塞" aria-hidden="true">#</a> sleep阻塞</h3>
<p>线程提供了一个静态方法：</p>
<ul>
<li>static void sleep(long ms)</li>
<li>使运行该方法的线程进入阻塞状态指定的毫秒，超时后线程会自动回到RUNNABLE状态等待再次获取时间片并发运行</li>
</ul>
<p>sleep方法处理异常：InterruptedException</p>
<p>当一个线程调用sleep方法处于睡眠阻塞的过程中，该线程的interrupt()方法被调用时，sleep方法会抛出异常从而打断睡眠阻塞。</p>
<h3 id="守护线程" tabindex="-1"><a class="header-anchor" href="#守护线程" aria-hidden="true">#</a> 守护线程</h3>
<p>守护线程又称为后台线程</p>
<ul>
<li>守护线程是通过普通线程调用setDeamonn(boolean on)方法设置</li>
<li>守护线程的结束时机：进程结束</li>
<li>进程结束：当一个进程中的所有普通线程都结束时，进程就会结束，此时会杀掉所有正在运行的守护线程</li>
</ul>
<blockquote>
<p>通常当我们不关心某个线程的任务什么时候停下来，它可以一直运行，但是程序主要的工作都结束时，它应当跟着结束时，这样的任务就适合放在守护线程上执行，比如GC就是在手误线程上运行的</p>
</blockquote>
<h2 id="多线程并发安全问题" tabindex="-1"><a class="header-anchor" href="#多线程并发安全问题" aria-hidden="true">#</a> 多线程并发安全问题</h2>
<blockquote>
<p>当多个线程并发操作同一临界资源，由于线程切换时机不确定，导致操作临界资源的顺序出现混乱元中式可能导致系统瘫痪</p>
<p>临界资源：操作该资源的全过程同时只能被单个线程完成</p>
</blockquote>
<h3 id="synchronized关键字" tabindex="-1"><a class="header-anchor" href="#synchronized关键字" aria-hidden="true">#</a> synchronized关键字</h3>
<ul>
<li>在方法上修饰，此时该方法变为一个同步方法</li>
<li>同步块，可以更准确的锁定需要排队的代码片段</li>
</ul>
<h3 id="同步方法" tabindex="-1"><a class="header-anchor" href="#同步方法" aria-hidden="true">#</a> 同步方法</h3>
<p>当一个方法使用synchronized修饰后,这个方法称为&quot;同步方法&quot;,即:多个线程不能同时 在方法内部执行.只能有先后顺序的一个一个进行. 将并发操作同一临界资源的过程改为同步执行就可以有效的解决并发安全问题.</p>
<h3 id="同步块" tabindex="-1"><a class="header-anchor" href="#同步块" aria-hidden="true">#</a> 同步块</h3>
<p>有效的缩小同步范围可以在保证并发安全的前提下尽可能的提高并发效率.同步块可以更准确的控制需要多个线程排队执行的代码片段.</p>
<p>语法：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">synchronized</span><span class="token punctuation">(</span>同步监视器对象<span class="token punctuation">)</span><span class="token punctuation">{</span>
  需要多线程同步执行的代码片段
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同步监视器对象即上锁的对象，要想保证同步块中的代码被多个线程同步运行，则要求多个线程看到的同步监视器对象是同一个</p>
<h3 id="在静态方法上使用synchronized" tabindex="-1"><a class="header-anchor" href="#在静态方法上使用synchronized" aria-hidden="true">#</a> 在静态方法上使用synchronized</h3>
<p>当在静态方法上使用synchronized后,该方法是一个同步方法.由于静态方法所属类,所以一定具有同步效果.</p>
<p>静态方法使用的同步监视器对象为当前类的类对象(Class的实例).</p>
<h3 id="互斥锁" tabindex="-1"><a class="header-anchor" href="#互斥锁" aria-hidden="true">#</a> 互斥锁</h3>
<p>当多个线程执行不同的代码片段,但是这些代码片段之间不能同时运行时就要设置为互斥的.</p>
<p>使用synchronized锁定多个代码片段,并且指定的同步监视器是同一个时,这些代码片段之间就是互斥的.</p>
<h3 id="死锁" tabindex="-1"><a class="header-anchor" href="#死锁" aria-hidden="true">#</a> 死锁</h3>
<p>两个线程各自持有一个锁对象的同时等待对方先释放锁对象，此时会出现僵持状态。这个现象就是死锁。</p>
<p>解决死锁：</p>
<ul>
<li>
<p>尽量避免在持有一个锁的同时去等待持有另一个锁(避免synchronized嵌套)</p>
</li>
<li>
<p>当无法避免synchronized嵌套时，就必须保证多个线程锁对象的持有顺序必须一致。</p>
<blockquote>
<p>即:A线程在持有锁1的过程中去持有锁2时,B线程也要以这样的持有顺序进行。</p>
</blockquote>
</li>
</ul>
</div></template>
