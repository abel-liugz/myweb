<template><div><h1 id="redis" tabindex="-1"><a class="header-anchor" href="#redis" aria-hidden="true">#</a> Redis</h1>
<blockquote>
<p>Redis 是一种支持 key-value 等多种数据结构的存储系统。可用于缓存、事件发布或订阅，高速队列等长江。支持网络，提供字符串、哈希、列表、队列、集合结构直接存取，基于内存，可持久化。</p>
</blockquote>
<p><img src="/db-redis-overview.png" alt="db-redis-overview.png"></p>
<h2 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型" aria-hidden="true">#</a> 数据类型</h2>
<h3 id="基础数据类型" tabindex="-1"><a class="header-anchor" href="#基础数据类型" aria-hidden="true">#</a> 基础数据类型</h3>
<h3 id="tabset" tabindex="-1"><a class="header-anchor" href="#tabset" aria-hidden="true">#</a> {.tabset}</h3>
<h4 id="string-字符串" tabindex="-1"><a class="header-anchor" href="#string-字符串" aria-hidden="true">#</a> String 字符串</h4>
<ul>
<li><strong>结构存储的值：</strong> 可以是字符串、整数、浮点数</li>
<li><strong>结构的读写能力：</strong> 对整个字符串或字符串的一部分进行操作；对整数货浮点数进行自增或自减操作；
{.grid-list}</li>
</ul>
<h4 id="list-集合" tabindex="-1"><a class="header-anchor" href="#list-集合" aria-hidden="true">#</a> List 集合</h4>
<ul>
<li><strong>结构存储的值：</strong> 一个联保，链表上的每个节点都包含一个字符串</li>
<li><strong>结构的读写能力：</strong> 对链表的两端进行 push 或 pop 操作，读取单个或多个元素；根据值查找或删除元素；
{.grid-list}</li>
</ul>
<h4 id="set-集合" tabindex="-1"><a class="header-anchor" href="#set-集合" aria-hidden="true">#</a> Set 集合</h4>
<ul>
<li><strong>结构存储的值：</strong> 包含字符串的无序集合</li>
<li><strong>结构的读写能力：</strong> 字符串的集合，包含基础的方法有看是否存在、添加、获取、删除；还包含计算交集、并集、差集等
{.grid-list}</li>
</ul>
<h4 id="hash-散列" tabindex="-1"><a class="header-anchor" href="#hash-散列" aria-hidden="true">#</a> Hash 散列</h4>
<ul>
<li><strong>结构存储的值：</strong> 包含键值对的无序散列表</li>
<li><strong>结构的读写能力：</strong> 包含方法有添加、获取、删除单个元素
{.grid-list}</li>
</ul>
<h4 id="zset-有序集合" tabindex="-1"><a class="header-anchor" href="#zset-有序集合" aria-hidden="true">#</a> Zset 有序集合</h4>
<ul>
<li><strong>结构存储的值：</strong> 和散列一样，用于存储键值对</li>
<li><strong>结构的读写能力：</strong> 字符串成语与浮点数之间的有序映射；元素的排列顺序有分数的大小决定；包含方法有添加、获取、删除单个元素以及根据分值范围或成员来获取元素
{.grid-list}</li>
</ul>
<h3 id="特殊数据类型" tabindex="-1"><a class="header-anchor" href="#特殊数据类型" aria-hidden="true">#</a> 特殊数据类型</h3>
<ul>
<li>HyperLogLogs（基数统计）</li>
<li>Bitmap（位存储）</li>
<li>geospatial（地理位置）</li>
<li>Stream
{.grid-list}</li>
</ul>
<h2 id="缓存淘汰策略" tabindex="-1"><a class="header-anchor" href="#缓存淘汰策略" aria-hidden="true">#</a> 缓存淘汰策略</h2>
<p>Redis服务器繁忙时,有大量信息要保存</p>
<p>如果Redis服务器内存全满,再要往Redis中保存新的数据,就需要淘汰老数据,才能保存新数据</p>
<ul>
<li>noeviction：返回错误**(默认)**</li>
<li>allkeys-random：所有数据中随机删除数据</li>
<li>volatile-random：有过期时间的数据库中随机删除数据</li>
<li>volatile-ttl：删除剩余有效时间最少的数据</li>
<li>allkeys-lru：所有数据中删除上次使用时间最久的数据</li>
<li>volatile-lru：有过期时间的数据中删除上次使用时间最久的数据</li>
<li>allkeys-lfu：所有数据中删除使用频率最少的</li>
<li>volatile-lfu：有过期时间的数据中删除使用频率最少的</li>
</ul>
<h2 id="缓存穿透" tabindex="-1"><a class="header-anchor" href="#缓存穿透" aria-hidden="true">#</a> 缓存穿透</h2>
<p>正常业务下,从数据库查询出的数据可以保存在Redis中</p>
<p>下次查询时直接从Redis中获得,大幅提高响应速度,提高系统性能</p>
<p>所谓缓存穿透,就是查询了一个数据库中都不存在的数据</p>
<p>我们Redis中没有这个数据,它到数据库查,也没有</p>
<p>如果这样的请求多了,那么数据库压力就会很大</p>
<p>我们可以使用向Redis中保存null值,来防止一个查询反复穿透</p>
<p>但是这样的策略有问题</p>
<p>如果用户不断更换查询关键字,反复穿透,也是对数据库性能极大的威胁</p>
<p>使用布隆过滤器来解决这个问题</p>
<p>事先创建好布隆过滤器,它可以在进入业务逻辑层时判断用户查询的信息数据库中是否存在,如果不存在于数据库中,直接终止查询返回</p>
<h2 id="缓存击穿" tabindex="-1"><a class="header-anchor" href="#缓存击穿" aria-hidden="true">#</a> 缓存击穿</h2>
<p>正常运行的情况,我们设计的应该在Redis中保存的数据,如果有请求访问到Redis而Redis没有这个数据</p>
<p>导致请求从数据库中查询这种现象就是缓存击穿</p>
<p>但是这个情况也不是异常情况,因为我们大多数数据都需要设置过期时间,而过期时间到时这些数据一定会从数据库中同步</p>
<p>击穿只是这个现象的名称,并不是不允许的</p>
<p><img src="/缓存击穿.png" alt="缓存击穿.png"></p>
<h2 id="缓存雪崩" tabindex="-1"><a class="header-anchor" href="#缓存雪崩" aria-hidden="true">#</a> 缓存雪崩</h2>
<p>上面讲到击穿现象</p>
<p>同一时间发生少量击穿是正常的</p>
<p>但是如果出现同一时间大量击穿现象就会如下图</p>
<p><img src="/缓存雪崩.png" alt="缓存雪崩.png"></p>
<p>这种情况下,Mysql会短时间出现很多新的查询请求,这样就会发生性能问题</p>
<p>如何避免这样的问题?</p>
<p>因为出现这个问题的原因通常是同时加载的数据设置了相同的有效期</p>
<p>我们需要在设置有效期时添加一个随机数,大量数据就不会同时失效了,</p>
<h2 id="redis持久化" tabindex="-1"><a class="header-anchor" href="#redis持久化" aria-hidden="true">#</a> Redis持久化</h2>
<p>Redis将信息保存在内存</p>
<p>内存的特征就是一旦断电,所有信息都丢失,Redis来讲,所有数据丢失,就需要从数据库从新查询所有数据,这个是慢的</p>
<p>更有可能,Redis本身是有新数据的,还没有和数据库同步就断电了</p>
<p>所以Redis支持了持久化方案,在当前服务器将Redis中的数据保存在当地硬盘上</p>
<p>Redis恢复策略有两种</p>
<p><strong>RDB:</strong>(Redis Database Backup)</p>
<p>数据库快照,(将当前数据库转换为二进制的数据保存在硬盘上),Redis生成一个dump.rdb的文件</p>
<p>我们可以在Redis安装程序的配置文件中进行配置</p>
<p>空白位置编写如下内容</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>save 60 5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>60表示秒数,既1分钟</p>
<p>5表示key被修改的次数</p>
<p>配置效果:1分钟内如果有5个key以上被修改,就启动rdb数据库快照程序</p>
<p>优点:</p>
<ul>
<li>因为是整体Redis数据的二进制格式,数据恢复是整体恢复的</li>
</ul>
<p>缺点:</p>
<ul>
<li>
<p>生成的rdb文件是一个硬盘上的文件,读写效率是较低的</p>
</li>
<li>
<p>如果突然断电,只能恢复最后一次生成的rdb中的数据</p>
</li>
</ul>
<p><strong>AOF</strong>(Append Only File):</p>
<p>AOF策略是将Redis运行过的所有命令(日志)备份下来</p>
<p>这样即使信息丢失,我们也可能根据运行过的日志,恢复为断电前的样子</p>
<p>它的配置如下</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>appendonly yes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>特点:只保存命令不保存数据</p>
<p>理论上Redis运行过的命令都可以保存下来</p>
<p>但是实际情况下,Redis非常繁忙时,我们会将日志命令缓存之后,整体发送给备份,减少io次数以提高备份的性能和对Redis性能的影响</p>
<p>实际开发中,配置一般会采用每秒将日志文件发送一次的策略,断电最多丢失1秒数据</p>
<p>为了减少日志的大小</p>
<p>Redis支持AOF rewrite</p>
<p>将一些已经进行删除的数据的新增命令也从日志中移除,达到减少日志容量的目的</p>
<h2 id="redis存储原理" tabindex="-1"><a class="header-anchor" href="#redis存储原理" aria-hidden="true">#</a> Redis存储原理</h2>
<p>Redis将内存划分为16384个槽(类似hash槽)</p>
<p>将数据(key)使用CRC16算法计算出一个在0~16383之间的值</p>
<p>将数据存到这个槽中</p>
<p>当再次使用这个key计算时,直接从这个槽获取,大幅提高查询效率</p>
<p><img src="/基本散列算法.png" alt="基本散列算法.png"></p>
<p>实际上这就是最基本&quot;散列算法&quot;</p>
<h2 id="redis集群" tabindex="-1"><a class="header-anchor" href="#redis集群" aria-hidden="true">#</a> Redis集群</h2>
<p>最小状态Redis是一台服务器</p>
<p>这台服务器的状态直接决定的Redis的运行状态</p>
<p>如果它宕机了,那么Redis服务就没了</p>
<p>系统面临崩溃风险</p>
<p>我们可以在主机运行时使用一台备机</p>
<p><strong>主从复制</strong></p>
<p><img src="/主从复制.png" alt="主从复制.png"></p>
<p>也就是主机(master)工作时,安排一台备用机(slave)实时同步数据,万一主机宕机,我们可以切换到备机运行</p>
<p>缺点,这样的方案,slave节点没有任何实质作用,只要master不宕机它就和没有一样,没有体现价值</p>
<p><strong>读写分离</strong></p>
<p><img src="/读写分离.png" alt="读写分离.png"></p>
<p>这样slave在master正常工作时也能分担Master的工作了</p>
<p>但是如果master宕机,实际上主备机的切换,实际上还是需要人工介入的,这还是需要时间的</p>
<p>那么如果想实现故障是自动切换,一定是有配置好的固定策略的</p>
<p><strong>哨兵模式</strong>:故障自动切换</p>
<p><img src="/单哨兵.png" alt="单哨兵.png"></p>
<p>哨兵节点每隔固定时间向所有节点发送请求</p>
<p>如果正常响应认为该节点正常</p>
<p>如果没有响应,认为该节点出现问题,哨兵能自动切换主备机</p>
<p>如果主机master下线,自动切换到备机运行</p>
<p>但是这样的模式存在问题</p>
<p><img src="/哨兵误判.png" alt="哨兵误判.png"></p>
<p>但是如果哨兵判断节点状态时发生了误判,那么就会错误将master下线,降低整体运行性能</p>
<p><strong>哨兵集群</strong></p>
<p>上次课我们说了哨兵</p>
<p>如果哨兵服务器是一个节点,它误判master节点出现了故障,将master节点下线</p>
<p>但是master其实是正常工作的,整体系统效率就会大打折扣</p>
<p>我们可以将哨兵节点做成集群,由多个哨兵投票决定是否下线某一个节点</p>
<p><img src="/哨兵集群.png" alt="哨兵集群.png"></p>
<p>哨兵集群中,每个节点都会定时向master和slave发送ping请求</p>
<p>如果ping请求有2个(集群的半数节点)以上的哨兵节点没有收到正常响应,会认为该节点下线</p>
<p><strong>分片集群</strong></p>
<p>当业务不断扩展,并发不断增高时</p>
<p>有可能一个Master节点做写操作性能不足,称为了系统性能的瓶颈</p>
<p>这时,就可以部署多个Master节点,每个节点也支持主从复制</p>
<p>只是每个节点负责不同的分片</p>
<p>Redis0~16383号槽,</p>
<p>例如MasterA复制0~5000</p>
<p>MasterB复制5001~10000</p>
<p>MasterC复制10001~16383</p>
<p>一个key根据CRC16算法只能得到固定的结果,一定在指定的服务器上找到数据</p>
<p><img src="/哨兵分片集群.png" alt="哨兵分片集群.png"></p>
<p>有了这个集群结构,我们就能更加稳定和更加高效的处理业务请求了</p>
<p><strong>为了节省哨兵服务器的成本,有些工作在Redis集群中直接添加哨兵功能,既master/slave节点完成数据读写任务的同时也都互相检测它们的健康状态</strong></p>
<h1 id="布隆过滤器介绍" tabindex="-1"><a class="header-anchor" href="#布隆过滤器介绍" aria-hidden="true">#</a> 布隆过滤器介绍</h1>
<h2 id="什么是布隆过滤器" tabindex="-1"><a class="header-anchor" href="#什么是布隆过滤器" aria-hidden="true">#</a> 什么是布隆过滤器</h2>
<p>布隆过滤器能够实现使用较少的空间来判断一个指定的元素是否包含在一个集合中</p>
<p>布隆过滤器并不保存这些数据,所以只能判断是否存在,而并不能取出改元素</p>
<p>布隆过滤器常见使用场景</p>
<ol>
<li>idea中编写代码,一个单词是否包含在正确拼写的词库中(拼写不正确划绿线的提示)</li>
<li>公安系统,根据身份证号\人脸信息,判断该人是否在追逃名单中</li>
<li>爬虫检查一个网址是否被爬取过</li>
</ol>
<p>.....</p>
<p>宗旨凡是判断一个元素是否在一个集合中的操作,都可以使用它</p>
<h2 id="为什么使用布隆过滤器" tabindex="-1"><a class="header-anchor" href="#为什么使用布隆过滤器" aria-hidden="true">#</a> 为什么使用布隆过滤器</h2>
<p>常规的检查一个元素是否在一个集合中的思路是遍历集合,判断元素是否相等</p>
<p>这样的查询效率非常低下</p>
<p>要保证快速确定一个元素是否在一个集合中,我们可以使用HashMap</p>
<p>因为HashMap内部的散列机制,保证更快更高效的找到元素</p>
<p>所以当数据量较小时,用HashMap或HashSet保存对象然后使用它来判定元素是否存在是不错的选择</p>
<p>但是如果数据量太大,每个元素都要生成哈希值来保存,我们也要依靠哈希值来判定是否存在,一般情况下,我们为了保证尽量少的哈希值冲突需要8字节哈希值做保存</p>
<p>long取值范围:-9223372036854775808-----9223372036854775807</p>
<p>5亿条数据 每条8字节计算后结果为需要3.72G内存,随着内存数增长,这个数字可能更大</p>
<p>所以Hash散列或类似算法可以保证高效判断元素是否存在,但是消耗内存较多</p>
<p>所以我们使用布隆过滤器实现,高效判断是否存在的同时,还能节省内存的效果</p>
<p>但是布隆过滤器的算法天生会有误判情况,需要能够容忍,才能使用</p>
<h2 id="布隆过滤器原理" tabindex="-1"><a class="header-anchor" href="#布隆过滤器原理" aria-hidden="true">#</a> 布隆过滤器原理</h2>
<ul>
<li>巴顿.布隆于⼀九七零年提出</li>
<li>⼀个很长的⼆进制向量（位数组）</li>
<li>⼀系列随机函数 (哈希)</li>
<li>空间效率和查询效率⾼</li>
<li>有⼀定的误判率（哈希表是精确匹配）</li>
</ul>
<p><img src="/布隆过滤器原理.png" alt="布隆过滤器原理.png"></p>
<p>semlinker</p>
<p>我们使用不同的3个hash算法为例</p>
<p>算法1:semlinker--&gt;2</p>
<p>算法2:semlinker--&gt;6</p>
<p>算法3:semlinker--&gt;4</p>
<p>会在布隆过滤器中产生如下影响</p>
<p><img src="/semlinker.png" alt="semlinker.png"></p>
<p>查询&quot;Good&quot;在不在布隆过滤器中</p>
<p>算法1:Good--&gt;7</p>
<p>算法2:Good--&gt;3</p>
<p>算法3:Good--&gt;6</p>
<p>我们判断Good单词生成的3,6,7三个位置,只要有一个位置是0</p>
<p>就表示当前集合中没有Good这个单词</p>
<p>一个布隆过滤器不可能存一个单词,一般布隆过滤器都是保存大量数据的</p>
<p>如果有新的元素保存在布隆过滤器中</p>
<p>kakuqo</p>
<p>算法1:kakuqo--&gt;3</p>
<p>算法2:kakuqo--&gt;4</p>
<p>算法3:kakuqo--&gt;7</p>
<p><img src="/kakuqo.png" alt="kakuqo.png"></p>
<p>新的单词生成3,4,7个位置</p>
<p>那么现在这个布隆过滤器中2,3,4,6,7都是1了</p>
<p>如果又有单词bad</p>
<p>bad</p>
<p>算法1:bad--&gt;2</p>
<p>算法2:bad--&gt;3</p>
<p>算法3:bad--&gt;6</p>
<p>判断布隆过滤器2,3,6都是1,所以布隆过滤器会认为bad是存在于这个集合中的</p>
<p><strong>误判就是这样产生的</strong></p>
<p>布隆过滤器误判的效果:</p>
<ul>
<li>布隆过滤器判断不存在的,一定不在集合中</li>
<li>布隆过滤器判断存在的,有可能不在集合中</li>
</ul>
<p>过短的布隆过滤器如果保存了很多的数据,可能造成二进制位置值都是1的情况,一旦发送这种情况,布隆过滤器就会判断任何元素都在当前集合中,布隆过滤器也就失效了</p>
<p>所以我们要给布隆过滤器一个合适的大小才能让它更好的为程序服务</p>
<ul>
<li>优点</li>
</ul>
<p>​	空间效率和查询效率⾼，</p>
<ul>
<li>缺点
<ul>
<li>有⼀定误判率即可（在可接受范围内）。</li>
<li>删除元素困难(不能将该元素hash算法结果位置修改为0,因为可能会影响其他元素)</li>
<li>极端情况下,如果布隆过滤器所有为位置都是1,那么任何元素都会被判断为存在于集合中</li>
</ul>
</li>
</ul>
<h2 id="设计布隆过滤器" tabindex="-1"><a class="header-anchor" href="#设计布隆过滤器" aria-hidden="true">#</a> 设计布隆过滤器</h2>
<p>我们在启动布隆过滤器时,需要给它分配一个合理大小的内存</p>
<p>这个大小应该满足</p>
<p>1.一个可接受范围的大小</p>
<p>2.不能有太高的误判率</p>
<p>内存约节省,误判率越高</p>
<p>内存越大,误判率越低</p>
<p>数学家已经给我们了公式计算误判率</p>
<p><img src="/布隆过滤器误判率公式.png" alt="布隆过滤器误判率公式.png"></p>
<p>上面是根据误判率计算布隆过滤器长度的公式</p>
<p>n 是已经添加元素的数量；</p>
<p>k 哈希的次数；</p>
<p>m 布隆过滤器的长度(位数的大小)</p>
<p>计算结果就是误判率</p>
<p>如果我们已经确定可接受的误判率,想计算需要多少 布隆过滤器的长度</p>
<p><img src="/布隆过滤器长度计算.png" alt="布隆过滤器长度计算.png"></p>
<p>布隆过滤器计算器</p>
<p>https://hur.st/bloomfilter</p>
<p>windows安装redisbloom布隆过滤器</p>
<p>https://blog.csdn.net/weixin_44770915/article/details/107918770</p>
</div></template>
